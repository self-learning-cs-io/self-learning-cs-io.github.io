---
title: CS143 P47Week408 03 Recognizing Viable Prefixes
---

1
00:00:00,000 --> 00:00:08,359
In this video, we're finally going to come to the technical highlight of bottom-up parsing.

2
00:00:08,359 --> 00:00:11,919
So after all the definitions of the previous videos, now we're actually going to be able

3
00:00:11,919 --> 00:00:15,320
to give the algorithm for recognizing viable prefixes.

4
00:00:15,320 --> 00:00:20,440
So let's dive straight into the algorithm.

5
00:00:20,440 --> 00:00:27,560
The first step really is just a very technical point and it's not that important, but we're

6
00:00:27,559 --> 00:00:30,759
going to do it anyway because it makes things simpler.

7
00:00:30,759 --> 00:00:36,399
Is to add a dummy production, s prime goes to s to our grammar of interest g.

8
00:00:36,399 --> 00:00:40,840
So just to set the stage here, we're trying to compute the viable prefixes of g.

9
00:00:40,840 --> 00:00:46,239
We're trying to come up with an algorithm for recognizing the viable prefixes of g.

10
00:00:46,239 --> 00:00:50,039
If s is the start symbol, we're just going to make up a new start symbol, s prime.

11
00:00:50,039 --> 00:00:52,719
So s prime will be the new start symbol of the augmented grammar.

12
00:00:52,719 --> 00:00:55,960
And there's just one production for s prime, s prime goes to s.

13
00:00:55,960 --> 00:01:00,240
So this just allows us to know exactly where our start symbol is used.

14
00:01:00,240 --> 00:01:04,760
In particular, our new start symbol s prime is only used in one place on the left hand side

15
00:01:04,760 --> 00:01:06,079
of this one production.

16
00:01:06,079 --> 00:01:09,920
And that just makes things a little bit simpler.

17
00:01:09,920 --> 00:01:15,280
Now recall what we are trying to do, which we claim that the set of viable prefixes for

18
00:01:15,280 --> 00:01:18,799
a given grammar is regular.

19
00:01:18,799 --> 00:01:23,040
And so what we're going to do is we're going to construct in non-deterministic finite automaton

20
00:01:23,040 --> 00:01:25,960
that recognizes the viable prefixes.

21
00:01:25,960 --> 00:01:31,120
And the states of this NFA are going to be the items of the grammar.

22
00:01:31,120 --> 00:01:34,480
Now the input to the NFA is the stack.

23
00:01:34,480 --> 00:01:38,000
So the NFA reads the stack.

24
00:01:38,000 --> 00:01:40,640
And then it, so let's just indicate this.

25
00:01:40,640 --> 00:01:43,160
So the NFA is going to take the stack as an argument.

26
00:01:43,160 --> 00:01:46,760
And it's either going to say yes, that's a viable prefix or no.

27
00:01:46,760 --> 00:01:48,920
And it's going to read the stack from bottom to top.

28
00:01:48,920 --> 00:01:53,000
So it's going to start at the bottom of the stack and read towards the top of the stack.

29
00:01:53,000 --> 00:01:58,120
And our goal here is to write a non-deterministic finite automaton that recognizes the valid

30
00:01:58,120 --> 00:01:59,840
stack, so the parser.

31
00:01:59,840 --> 00:02:05,359
So that is how we'll know that our parser hasn't encountered any pars errors because this

32
00:02:05,359 --> 00:02:10,400
automaton that we're going to construct will always output either yes, this stack is okay,

33
00:02:10,400 --> 00:02:17,520
meaning it could wind up parsing the input or know what we've got on the stack now doesn't

34
00:02:17,520 --> 00:02:24,520
resemble any valid stack for any possible parse of any input string for this grammar.

35
00:02:24,520 --> 00:02:31,800
Okay, so let's think about what we need the moves of this machine to be.

36
00:02:31,800 --> 00:02:36,320
So let's say that we're in the state e aero alpha dot x beta.

37
00:02:36,320 --> 00:02:37,640
Now what does that say?

38
00:02:37,640 --> 00:02:42,040
So that says that so far we've seen alpha on the stack.

39
00:02:42,040 --> 00:02:47,480
Okay, so remember the machine is reading the stack from bottom to top.

40
00:02:47,479 --> 00:02:51,879
This records the fact that the machine has already seen alpha on the stack.

41
00:02:51,879 --> 00:02:54,479
So what would be an okay thing to see next on the stack?

42
00:02:54,479 --> 00:02:58,799
Well if this is a valid stack, if having alpha on the stack of this point is valid, well

43
00:02:58,799 --> 00:03:02,319
then certainly it would be okay if the next thing on the stack was an x.

44
00:03:02,319 --> 00:03:07,479
So we have a transition that if we're in this state where we're working on this production

45
00:03:07,479 --> 00:03:12,719
and we've seen alpha on the stack, if the next thing is an x on input x then we can go

46
00:03:12,719 --> 00:03:17,319
to this state where now we record the fact that we've seen alpha x on the stack and we're

47
00:03:17,319 --> 00:03:21,239
waiting to see the remaining portion beta of that production.

48
00:03:21,239 --> 00:03:27,840
Okay, so this is one kind of move that the non-deterministic finite atomic can make.

49
00:03:27,840 --> 00:03:31,280
And again we do, we add this kind of a move for every item.

50
00:03:31,280 --> 00:03:36,439
So for every item in the grammar, if the dot is not all the way at the right end then

51
00:03:36,439 --> 00:03:40,799
there will be a move like this where the dot moves over for whatever symbol happens to

52
00:03:40,799 --> 00:03:44,519
come to the right of the dot.

53
00:03:44,520 --> 00:03:49,800
The other class of transitions are the following and these are the more interesting ones.

54
00:03:49,800 --> 00:03:56,820
So let's say that we're in this configuration here where again we've seen alpha and then

55
00:03:56,820 --> 00:04:03,760
the next thing on the stack is x and here x is a non-terminal.

56
00:04:03,760 --> 00:04:09,520
And I should have said that in the previous case x was either a terminal or non-terminal.

57
00:04:09,520 --> 00:04:13,240
So this x here is any grammar symbol, not just a non-terminal.

58
00:04:13,240 --> 00:04:18,560
But this number four here, the move here at part four are specifically for non-terminals.

59
00:04:18,560 --> 00:04:25,040
Okay, so anyway, if x is not on the stack, okay, let's assume that we've seen alpha and

60
00:04:25,040 --> 00:04:27,800
then the next thing on the stack is not x.

61
00:04:27,800 --> 00:04:33,800
Well, is it possible that there could be a valid configuration of the parser where we saw

62
00:04:33,800 --> 00:04:36,400
alpha but then x didn't appear next?

63
00:04:36,400 --> 00:04:42,240
And the answer is yes because as we said before, the stack is a sequence of partial right-hand

64
00:04:42,240 --> 00:04:43,240
side.

65
00:04:43,240 --> 00:04:47,800
So it could be that all that's on the stack right now for this production is alpha.

66
00:04:47,800 --> 00:04:51,879
And the next thing on the stack is eventually going to reduce stacks.

67
00:04:51,879 --> 00:04:55,720
Might not be x itself, it might be something that will eventually reduce stacks.

68
00:04:55,720 --> 00:04:57,199
But what does that mean?

69
00:04:57,199 --> 00:05:01,079
Well, that means that whatever is there on the stack has to be derived from x.

70
00:05:01,079 --> 00:05:07,199
It has to be something that can be generated by using a sequence of x productions because

71
00:05:07,199 --> 00:05:09,240
eventually it's going to reduce stacks.

72
00:05:09,240 --> 00:05:15,079
So for every item that looks like this and every production for x now, we're going to add

73
00:05:15,079 --> 00:05:16,079
the following move.

74
00:05:16,079 --> 00:05:20,600
We're going to say that if there's no x on the stack, well then we can make an epsilon move.

75
00:05:20,600 --> 00:05:25,199
We can just shift to a state where we try to recognize the right-hand side of something

76
00:05:25,199 --> 00:05:27,600
derived from x.

77
00:05:27,600 --> 00:05:29,480
And these are the only two kinds of moves.

78
00:05:29,480 --> 00:05:36,199
Either the grammar symbols we're looking for are there on the stack and we extend the

79
00:05:36,199 --> 00:05:37,639
prefix of our right-hand side.

80
00:05:37,639 --> 00:05:43,319
So this rule here extends a prefix, says yes, we see more of that production on the stack.

81
00:05:43,319 --> 00:05:47,599
Or it tries to guess or tries to discover where the ends of the prefix is are.

82
00:05:47,599 --> 00:05:52,120
So if alpha is as much of the production that is on the stack currently, well then this

83
00:05:52,120 --> 00:05:57,519
must be this x here, this point here must mark the start of another right-hand side in

84
00:05:57,519 --> 00:05:58,800
our stack of right-hand sides.

85
00:05:58,800 --> 00:06:06,279
And we would expect to see something derived from some production for x.

86
00:06:06,279 --> 00:06:10,759
Two more rules, every state in this automaton is going to be an accepting state.

87
00:06:10,759 --> 00:06:17,039
That means that if the automaton manages to successfully consume the entire stack, then

88
00:06:17,039 --> 00:06:20,839
the stack is viable.

89
00:06:20,839 --> 00:06:25,719
And just notice that not every state is going to have a transition on every possible symbol.

90
00:06:25,719 --> 00:06:30,359
So there will be plenty of possible stacks that are rejected simply because the automaton

91
00:06:30,359 --> 00:06:32,159
gets stuck.

92
00:06:32,160 --> 00:06:37,360
And finally, the start state of this automaton is the item s prime goes to .s.

93
00:06:37,360 --> 00:06:40,920
So remember the states of the machine are the items of the grammar.

94
00:06:40,920 --> 00:06:46,200
And this is why we added this dummy production is just so that we could conveniently name

95
00:06:46,200 --> 00:06:50,040
the start state.

96
00:06:50,040 --> 00:06:54,120
So now let's consider one of our grammars we've been using a lot.

97
00:06:54,120 --> 00:06:55,600
So this is the grammar.

98
00:06:55,600 --> 00:07:00,480
And now we're going to augment it with the extra production s prime goes to e.

99
00:07:00,480 --> 00:07:06,120
And let's take a look at the automaton for that recognizes the viable prefixes of this

100
00:07:06,120 --> 00:07:07,600
grammar.

101
00:07:07,600 --> 00:07:08,600
And here it is.

102
00:07:08,600 --> 00:07:10,600
And as you can see, it's rather large.

103
00:07:10,600 --> 00:07:13,840
It has a lot of states and a lot of transitions.

104
00:07:13,840 --> 00:07:18,439
And I just want to show it to you here before we describe how we calculated it just so you

105
00:07:18,439 --> 00:07:24,960
can get an idea that these automaton for recognizing viable prefixes for grammars are actually

106
00:07:24,960 --> 00:07:27,280
quite elaborate.

107
00:07:27,279 --> 00:07:32,639
But now let's break this down and see how it was produced.

108
00:07:32,639 --> 00:07:35,199
So let's begin with the start state for this machine.

109
00:07:35,199 --> 00:07:37,359
So we have s prime goes to .e.

110
00:07:37,359 --> 00:07:41,759
And remember what this says is we want to be able to reduce to the start symbol to our

111
00:07:41,759 --> 00:07:43,039
new start symbol.

112
00:07:43,039 --> 00:07:46,919
And so we're reading the stack and we're hoping to see an e on the stack.

113
00:07:46,919 --> 00:07:50,279
But if we don't, then we'll be happy to see something derived for me.

114
00:07:50,279 --> 00:07:52,439
So what transitions can we make from the state?

115
00:07:52,439 --> 00:07:57,560
Well, one possibility is that we do in fact see an e on the stack.

116
00:07:57,560 --> 00:08:03,480
And in that case, the dot simply moves over saying yes, we've read the first item on the

117
00:08:03,480 --> 00:08:06,040
stack or we've read the e on the stack.

118
00:08:06,040 --> 00:08:09,680
And so we've seen the full right hand side of this production.

119
00:08:09,680 --> 00:08:12,399
Now that would indicate that we were probably done with parsing.

120
00:08:12,399 --> 00:08:16,120
This is the state that you would reach if you'd read the entire input and successfully

121
00:08:16,120 --> 00:08:17,120
parsed it.

122
00:08:17,120 --> 00:08:22,159
You would have reduced to the old start symbol and be about to reduce to the augmented

123
00:08:23,160 --> 00:08:25,960
the new start symbol.

124
00:08:25,960 --> 00:08:30,360
But if you're not so fortunate as to see an e on the stack, then you need to hope that

125
00:08:30,360 --> 00:08:31,560
you'll see something derived for me.

126
00:08:31,560 --> 00:08:33,800
And there are a couple of possibilities there.

127
00:08:33,800 --> 00:08:38,120
One is that is that we could see something that would eventually use this production.

128
00:08:38,120 --> 00:08:39,639
E goes to t.

129
00:08:39,639 --> 00:08:43,519
And since we haven't seen any of it yet, we put the dot all the way at the left

130
00:08:43,519 --> 00:08:47,519
indicating that we're hoping to see a t, which could then reduce to e, which could

131
00:08:47,519 --> 00:08:50,720
then reduce to s prime.

132
00:08:50,720 --> 00:08:54,680
Now if we don't see a t on the stack by itself, the other possibility is that we could

133
00:08:54,680 --> 00:08:58,480
be working on this production e goes to t plus e.

134
00:08:58,480 --> 00:08:59,759
And again, we haven't seen any of it.

135
00:08:59,759 --> 00:09:02,120
So the dot goes on the left hand side.

136
00:09:02,120 --> 00:09:08,440
And now notice how we're crucially using the power of non deterministic automata.

137
00:09:08,440 --> 00:09:12,560
So here we don't know which production is going to, which right hand side of a production

138
00:09:12,560 --> 00:09:13,800
is going to appear on the stack.

139
00:09:13,800 --> 00:09:19,680
And in fact, I noticed that these productions are not even, are not even left factored.

140
00:09:19,679 --> 00:09:24,239
So we don't know whether it's going to be just a t there or a t plus e.

141
00:09:24,239 --> 00:09:27,439
But we just use the guessing power of the non deterministic automaton.

142
00:09:27,439 --> 00:09:31,079
Let it choose which one to use.

143
00:09:31,079 --> 00:09:36,199
Remember the non deterministic automaton accepts if any possible choice accepts.

144
00:09:36,199 --> 00:09:38,319
So it can always guess correctly.

145
00:09:38,319 --> 00:09:40,679
So intuitively it will be able to pick the right one.

146
00:09:40,679 --> 00:09:45,519
Now of course, we can compile this down to a deterministic machine that won't have to

147
00:09:45,519 --> 00:09:47,000
make any guesses.

148
00:09:47,000 --> 00:09:49,320
But at this level we're writing the non deterministic machine.

149
00:09:49,320 --> 00:09:53,960
It's extremely useful not to have to figure out which of these two productions to use.

150
00:09:53,960 --> 00:09:59,360
We can just try both and see what happens.

151
00:09:59,360 --> 00:10:03,279
Now let's focus on this state.

152
00:10:03,279 --> 00:10:05,039
E goes to dot t.

153
00:10:05,039 --> 00:10:06,440
What are the possibilities there?

154
00:10:06,440 --> 00:10:09,320
Well, one possibility is that we see a t on the stack.

155
00:10:09,320 --> 00:10:11,799
And then we've seen a complete right hand side.

156
00:10:11,799 --> 00:10:16,519
And notice how when the dot moves all the way to the right hand side, that is going to

157
00:10:16,519 --> 00:10:18,519
indicate that we're ready to do a reduce.

158
00:10:18,519 --> 00:10:20,519
So we'll talk about that a little bit later.

159
00:10:20,519 --> 00:10:22,399
But essentially that's how we're going to recognize handles.

160
00:10:22,399 --> 00:10:25,960
When we finally reach a state where the dot is all the way to the right hand side, that's

161
00:10:25,960 --> 00:10:32,079
going to say, this could be a handle that you might want to reduce.

162
00:10:32,079 --> 00:10:36,120
Now if we don't see a t on the stack, then we need to see something derived from t.

163
00:10:36,120 --> 00:10:39,480
And there's a couple of possibilities, a few possibilities there.

164
00:10:39,480 --> 00:10:42,039
One possibility is that it's going to be the production t goes to int.

165
00:10:42,039 --> 00:10:45,679
So since we're just starting on this production again, we just put the dot all the way at the

166
00:10:45,679 --> 00:10:46,679
left.

167
00:10:46,679 --> 00:10:52,319
Another possibility is that we're working on t goes to open parent e close parent.

168
00:10:52,319 --> 00:10:55,479
And the third possibility is that we're working on t goes to int times t.

169
00:10:55,479 --> 00:10:59,559
And in each case here, notice that that does all the way to the left indicating that we're

170
00:10:59,559 --> 00:11:00,559
just getting started.

171
00:11:00,559 --> 00:11:06,799
We haven't actually seen any of the right hand side yet.

172
00:11:06,799 --> 00:11:09,000
Now let's shift our focus to this production.

173
00:11:09,000 --> 00:11:11,959
E goes to dot t plus e.

174
00:11:11,959 --> 00:11:14,479
This item, excuse me.

175
00:11:14,480 --> 00:11:21,000
One possibility is that we see an t on the stack, which case the dot just moves over.

176
00:11:21,000 --> 00:11:25,360
And the other possibility is that we see something derived from t, which case we will go to one

177
00:11:25,360 --> 00:11:27,360
of the states that begins a t production.

178
00:11:27,360 --> 00:11:31,159
And notice here that we already have all three of those items in our automaton.

179
00:11:31,159 --> 00:11:36,480
We're just going to states that we went to from the item e goes to dot t.

180
00:11:36,480 --> 00:11:46,039
So this item e goes to dot t plus e can also move to those three states.

181
00:11:46,039 --> 00:11:48,360
Now let's focus on this item here.

182
00:11:48,360 --> 00:11:51,320
T goes to dot open parent e close parent.

183
00:11:51,320 --> 00:11:53,159
Well, there's only one possible move here.

184
00:11:53,159 --> 00:11:55,399
So this is only a terminal.

185
00:11:55,399 --> 00:11:57,000
There's not a non terminal.

186
00:11:57,000 --> 00:12:00,680
So there's not going to be any possibility of having something derived from open parent.

187
00:12:00,680 --> 00:12:03,320
We just have to see the open parent and the input.

188
00:12:03,320 --> 00:12:06,840
So there's only one possible transition here, which is that we see the open parent, excuse

189
00:12:06,840 --> 00:12:11,440
me, on the stack and the dot just moves over.

190
00:12:11,440 --> 00:12:17,000
Now from this state, once again, the dot is next to a or just to the left of a non terminal.

191
00:12:17,000 --> 00:12:20,440
So here we might either see that non terminal on the stack or we might see something derived

192
00:12:20,440 --> 00:12:21,680
from that non terminal.

193
00:12:21,680 --> 00:12:25,840
Well, if we see the non terminal on the stack and the dot just moves over and we get t

194
00:12:25,840 --> 00:12:30,680
open parent e dot close parent indicating that we've seen both an open parent and e on

195
00:12:30,679 --> 00:12:34,599
the stack and we're still waiting to see the close parent.

196
00:12:34,599 --> 00:12:37,599
But we might also see something derived from me.

197
00:12:37,599 --> 00:12:44,439
And so we have these two transitions to the two items that begin productions for me.

198
00:12:44,439 --> 00:12:45,439
All right.

199
00:12:45,439 --> 00:12:47,239
Now let's focus on this state.

200
00:12:47,239 --> 00:12:52,799
T goes to open parent e dot close parent again, because it's a terminal that the dot is next

201
00:12:52,799 --> 00:12:54,319
to is only one possible move.

202
00:12:54,319 --> 00:12:57,559
We have to see that open parent if we see anything at all.

203
00:12:57,719 --> 00:13:01,759
And we'll wind up with the item t goes to open parent e close parent dot and now we've

204
00:13:01,759 --> 00:13:07,000
recognized the entire right hand side of that production on the stack.

205
00:13:07,000 --> 00:13:09,000
Let's take a look at this item.

206
00:13:09,000 --> 00:13:13,639
So we're here because a terminal symbol, the only possibility is to read that terminal

207
00:13:13,639 --> 00:13:14,639
symbol on the stack.

208
00:13:14,639 --> 00:13:22,639
So this would be the next item e goes to t plus dot e focusing on that item again.

209
00:13:22,639 --> 00:13:25,599
We could possibly see an e on the stack.

210
00:13:26,440 --> 00:13:29,759
In which case we would have recognized the entire right hand side of this production.

211
00:13:29,759 --> 00:13:34,399
We'd have e goes to t plus e dot or we could see something derived for me in which case

212
00:13:34,399 --> 00:13:40,000
we'll make a transition back to one of those two states.

213
00:13:40,000 --> 00:13:44,639
Now where we got productions left to go or items left to go here.

214
00:13:44,639 --> 00:13:47,279
We got t goes to dot int.

215
00:13:47,279 --> 00:13:51,120
So we would have to see int next on the stack and that would be the full right hand side

216
00:13:51,120 --> 00:13:54,440
of that production.

217
00:13:54,440 --> 00:13:58,320
And down here we still have t goes to dot int times t.

218
00:13:58,320 --> 00:14:01,920
So again, there's a terminal symbol here int.

219
00:14:01,920 --> 00:14:06,240
And so that would be the next thing we would need to see on the stack for this production

220
00:14:06,240 --> 00:14:09,120
to remain viable.

221
00:14:09,120 --> 00:14:13,920
And once we've seen the int, we would like to see the times.

222
00:14:13,920 --> 00:14:17,920
So we wind up in this state and now we've got dot next to t.

223
00:14:17,920 --> 00:14:22,360
So again, one possibility is that we see the t on the stack and then we've seen the

224
00:14:22,360 --> 00:14:24,560
full right hand side of this production.

225
00:14:24,560 --> 00:14:27,560
But we might only see something derived from t.

226
00:14:27,560 --> 00:14:29,879
The t might not be there yet.

227
00:14:29,879 --> 00:14:34,279
It might be in a state where we're still waiting for the t to appear through some sequence

228
00:14:34,279 --> 00:14:35,279
of reductions.

229
00:14:35,279 --> 00:14:37,320
But then we would need to see something derived from t.

230
00:14:37,320 --> 00:14:43,080
In this case, we would make a transition to one of the three states that begin the

231
00:14:43,080 --> 00:14:46,759
productions for t.

232
00:14:46,759 --> 00:14:48,399
And that's the full automaton.

233
00:14:48,399 --> 00:14:53,799
And those are all the states and all the transitions for the automaton that recognizes the

234
00:14:53,799 --> 00:14:55,480
viable prefixes of this grammar.

