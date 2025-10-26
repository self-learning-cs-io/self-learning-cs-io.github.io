---
title: MIT6042J P24191StateMachinesInvariantsVideo
---

1
00:00:00,000 --> 00:00:09,839
So we're going to talk about state machines, which is a topic that you're going to see on

2
00:00:09,839 --> 00:00:16,440
many further courses because state machines model step-by-step processes.

3
00:00:16,440 --> 00:00:20,480
And of course, if you think about a computation, the normal way you think about it is that it's

4
00:00:20,480 --> 00:00:26,320
doing instructions step-by-step one after another until it finally reaches termination.

5
00:00:26,320 --> 00:00:35,320
Likewise, various digital circuits move through stages or states until they produce a final answer.

6
00:00:35,320 --> 00:00:38,920
So state machines come up in at least those circumstances and many others.

7
00:00:38,920 --> 00:00:43,719
Now the general model of state machine involves the idea that you can give it input and response to them,

8
00:00:43,719 --> 00:00:47,480
but we don't really need that for our purposes.

9
00:00:47,480 --> 00:00:50,480
So let's look at our example of a state machine.

10
00:00:50,480 --> 00:00:53,280
Here's a particular simple one.

11
00:00:53,280 --> 00:00:59,200
This is a description of a state machine that counts to 99.

12
00:00:59,200 --> 00:01:02,039
So the circles are indicating what its states are.

13
00:01:02,039 --> 00:01:05,519
We've named them from 0 through 99.

14
00:01:05,519 --> 00:01:08,079
And then there's a final state called overflow.

15
00:01:08,079 --> 00:01:17,640
And that funny arc is an indication that if you're in overflow mode and you make another step by following the arc,

16
00:01:17,640 --> 00:01:19,480
you get back to overflow mode.

17
00:01:19,480 --> 00:01:22,280
But if you're in 0, you can make a step to 1.

18
00:01:22,280 --> 00:01:25,120
And if you're in 1, you can make a step to 2 and so on.

19
00:01:25,120 --> 00:01:35,359
So starting off at the start state, which is generally indicated by that double mark,

20
00:01:35,359 --> 00:01:43,920
so to indicate where to start, then the description of this machine consists in complete description is a set of states,

21
00:01:43,920 --> 00:01:47,640
which are pictured as 0 through 99 plus overflow.

22
00:01:47,640 --> 00:01:54,799
A set of transitions, which are indicated by the arrows, which is how one state can move to another state.

23
00:01:54,799 --> 00:02:02,840
And the transitions can be summarized by saying that there of the form i to i plus 1 for i between 0 and 99.

24
00:02:02,840 --> 00:02:09,400
And then there's a 99 transition to overflow and once you're in overflow, you stay in overflow.

25
00:02:09,400 --> 00:02:15,759
So the picture at the top is saying exactly the same thing as we've said here in mathematical notation,

26
00:02:15,759 --> 00:02:18,959
explicitly describing what the transitions are.

27
00:02:18,959 --> 00:02:22,959
So this is a machine that if you really built something that behaved this way,

28
00:02:22,959 --> 00:02:27,639
it wouldn't be much used because once it's overflowed, it's dead because it stays there.

29
00:02:27,639 --> 00:02:32,439
Real machine to be useful would have a reset transition, which took overflow back to 0.

30
00:02:32,439 --> 00:02:37,159
But this illustrates the basic idea.

31
00:02:37,159 --> 00:02:41,199
So let's look at a fun example from a diehard movie,

32
00:02:41,199 --> 00:02:43,519
I've forgotten which one it was.

33
00:02:43,519 --> 00:02:51,519
But there was one with Bruce Willis and Samuel Jackson playing a detective and a friend that he meets who helps him.

34
00:02:51,519 --> 00:02:58,519
Deal with a madman, as is the case in all these movies, this time the madman's name is Simon.

35
00:02:58,519 --> 00:03:04,639
And what Simon says to them as they stand behind the fountain in the park shown on the previous slide is

36
00:03:04,639 --> 00:03:06,560
that on the fountain there should be two jugs.

37
00:03:06,560 --> 00:03:07,679
Do you see them?

38
00:03:07,679 --> 00:03:09,799
A five gallon and a three gallon.

39
00:03:09,800 --> 00:03:16,040
Fill one of these jugs with exactly four gallons of water and place it on the scale and the timer will stop.

40
00:03:16,040 --> 00:03:21,040
The timer and the scale are not shown in that picture, but there's a scale and a timer nearby.

41
00:03:21,040 --> 00:03:22,280
You must be precise.

42
00:03:22,280 --> 00:03:25,120
One ounce more or less will result in that nation.

43
00:03:25,120 --> 00:03:29,320
If you're still alive in five minutes, we'll speak.

44
00:03:29,320 --> 00:03:34,720
Okay, so let's think about formalizing this as a state machine to see what's going on.

45
00:03:34,719 --> 00:03:47,360
So the first of all to understand the specification informally what there is is a three gallon jug and a five gallon jug that is capable of holding water.

46
00:03:47,360 --> 00:03:52,280
And an unlimited supply of water that you can get from a fountain.

47
00:03:52,280 --> 00:03:56,319
And the basic moves that you can make.

48
00:03:56,319 --> 00:04:03,719
So with this setup, the kind of moves that you can make would be say you fill up the three gallon jug with water.

49
00:04:03,719 --> 00:04:07,159
And then you could pour the three gallon jug into the five gallon jugs.

50
00:04:07,159 --> 00:04:14,560
So the three gallon jug was empty and the five gallon jug you knew had exactly three gallons in it.

51
00:04:14,560 --> 00:04:20,399
And then you can do other things like empty a jug and fill a jug and empty them into each other.

52
00:04:20,399 --> 00:04:23,759
So let's model this as a state machine.

53
00:04:23,759 --> 00:04:27,600
And the first decision we need to make is what's the state going to be?

54
00:04:27,600 --> 00:04:32,680
Well, the state of the obvious model for the state is the amount of water in each of the jugs.

55
00:04:32,680 --> 00:04:36,800
So B is the amount in the big jug and L is the amount in the little jug.

56
00:04:36,800 --> 00:04:44,800
And what we know about B and L is that there going to be some amount between zero and five for B and zero and three for L.

57
00:04:44,800 --> 00:04:48,759
Where we're going to quickly realize that we need them to be integers.

58
00:04:48,759 --> 00:04:57,879
But offhand, we can allow them to be real numbers because after all, you could just pour some arbitrary amount of water into the big jug.

59
00:04:57,879 --> 00:05:04,600
Any amount that will hold between zero and five, although that will be dangerous because as soon as you do that,

60
00:05:04,600 --> 00:05:10,600
you're going to lose track of exactly how much is in there and you won't know when you have four gallons or not.

61
00:05:10,600 --> 00:05:14,800
So let's formalize the possible moves that we can have.

62
00:05:14,800 --> 00:05:19,399
So first of all, the start state is zero zero because we start with both jugs empty.

63
00:05:19,399 --> 00:05:24,120
And then what are the possible transitions of how B and L moves?

64
00:05:24,120 --> 00:05:25,600
Well, let's see.

65
00:05:25,600 --> 00:05:32,720
The fill the little jug move amounts to saying that if you have an amount of B in big and L in little,

66
00:05:32,720 --> 00:05:42,480
then you can make a transition called fill the little jug into B in big, still unchanged and three in little for L less than three.

67
00:05:42,480 --> 00:05:48,639
I'm going to forbid the vacuous move where the little jug is already full and you try to fill it.

68
00:05:48,639 --> 00:05:49,560
That doesn't count.

69
00:05:49,560 --> 00:05:53,959
So L has to be less than three and you can make it three by filling the little jug.

70
00:05:53,959 --> 00:05:59,919
Similarly, you can fill the big jug if B is less than five than you can turn it into five by filling it.

71
00:05:59,919 --> 00:06:02,759
And then you can empty the little jug, which is easy.

72
00:06:02,759 --> 00:06:05,719
If you go from B, L, you go to B zero.

73
00:06:05,719 --> 00:06:07,319
And likewise, you can empty the big jug.

74
00:06:07,319 --> 00:06:09,199
Those are the easy moves.

75
00:06:09,199 --> 00:06:13,799
A slightly more complicated move is pour the big jug into the little jug.

76
00:06:13,799 --> 00:06:19,279
Well, if there's no overflow, what that means is that there's L in the little jug and B in the big jug.

77
00:06:19,279 --> 00:06:26,519
And after you've poured the big jug into the little jug, there's B plus L in the little one and nothing in the big one.

78
00:06:26,519 --> 00:06:29,239
But let's be careful here about what exactly we're doing.

79
00:06:29,239 --> 00:06:32,719
Math, we're not sort of trying to get away from the metaphor.

80
00:06:32,719 --> 00:06:36,239
So what is no overflow means, it simply means that B plus L will fit.

81
00:06:36,239 --> 00:06:39,000
B plus L is less than or equal to three.

82
00:06:39,000 --> 00:06:39,759
All right.

83
00:06:39,759 --> 00:06:43,799
What's the other case of pouring the big jug into the little jug?

84
00:06:43,799 --> 00:06:46,959
Well, that's when B plus L won't fit.

85
00:06:46,959 --> 00:06:50,519
In which case, you pour into the little jug.

86
00:06:50,519 --> 00:06:54,680
It's got L, so you pour in three minus L to fill it up.

87
00:06:54,680 --> 00:06:59,680
And then what's left in B is B minus the three minus little L that you poured.

88
00:06:59,680 --> 00:07:03,959
So that's the otherwise case when there is overflow.

89
00:07:03,959 --> 00:07:09,199
And similarly, there are moves for pouring the little jug into the big jug.

90
00:07:09,199 --> 00:07:16,439
So that then is a formal specification of the dieharc machine and the moves that we're going to allow.

91
00:07:16,439 --> 00:07:20,560
Now you could allow other moves like randomly pouring out a little water or randomly filling

92
00:07:20,560 --> 00:07:21,759
up a little water.

93
00:07:21,759 --> 00:07:25,399
But if you did that again, you'll lose track of how much water is in the jug.

94
00:07:25,399 --> 00:07:29,959
So these are the only safe moves and they're the only ones we're going to model.

95
00:07:29,959 --> 00:07:30,959
All right.

96
00:07:30,959 --> 00:07:32,959
So let's go back to Simon's challenge.

97
00:07:32,959 --> 00:07:39,759
He wants to disarm the bomb by getting exactly four gallons of water in a jug and measure

98
00:07:39,759 --> 00:07:43,720
it on the scale or things will blow up.

99
00:07:43,720 --> 00:07:45,480
And how do you do it?

100
00:07:45,560 --> 00:07:53,319
Well, why don't you take a moment to think about it before I proceed to the next set of slides

101
00:07:53,319 --> 00:07:55,080
or before you let me proceed.

102
00:07:55,080 --> 00:07:59,319
But just to understand the rules again and watch the work, here's how.

103
00:07:59,319 --> 00:08:04,400
We're going to start off with both jugs empty.

104
00:08:04,400 --> 00:08:06,759
So we start off in state zero zero.

105
00:08:06,759 --> 00:08:12,720
And the first move is going to be to fill the big jug, which takes us to state five zero,

106
00:08:12,720 --> 00:08:16,640
where the big jug has five and the little jug is still empty.

107
00:08:16,640 --> 00:08:20,040
Then we're going to pour from the big into the little.

108
00:08:20,040 --> 00:08:23,120
So now the little jug has three.

109
00:08:23,120 --> 00:08:24,680
We're filling up the little one.

110
00:08:24,680 --> 00:08:28,040
That leaves two in the big jug.

111
00:08:28,040 --> 00:08:29,400
Now we're going to empty the little one.

112
00:08:29,400 --> 00:08:32,680
We still have two left in the big one.

113
00:08:32,680 --> 00:08:36,399
And now we're going to pour from the big one into the little one.

114
00:08:36,399 --> 00:08:40,519
So the little one has two gallons and the big one is empty.

115
00:08:40,519 --> 00:08:46,399
Now we fill the big jug and there's still two gallons in the little one and five gallons

116
00:08:46,399 --> 00:08:47,399
in the big one.

117
00:08:47,399 --> 00:08:53,840
Now we pour off from the five gallon jug until the one gallon jug is full.

118
00:08:53,840 --> 00:08:59,319
That's removing the one gallon that the three gallon jug still has capacity for.

119
00:08:59,319 --> 00:09:04,600
We reduce to full three gallons in the little jug and four gallons are target in the big

120
00:09:04,600 --> 00:09:06,000
jug.

121
00:09:06,000 --> 00:09:09,319
And so we've accomplished it.

122
00:09:09,319 --> 00:09:10,439
And we're done.

123
00:09:10,440 --> 00:09:12,040
So the bomb doesn't go off.

124
00:09:12,040 --> 00:09:13,040
All right.

125
00:09:13,040 --> 00:09:17,040
So the point of this exercise is really just to practice how the moves work and what the

126
00:09:17,040 --> 00:09:18,520
states are.

127
00:09:18,520 --> 00:09:25,120
But the question that I want to raise is suppose that we want to have a die hard once

128
00:09:25,120 --> 00:09:29,880
in for all scenario, in which we're tired of the remakes of these movies.

129
00:09:29,880 --> 00:09:36,680
And we propose that in the next movie that Simon, if he's still around, offers an alternative

130
00:09:36,679 --> 00:09:41,120
challenge, or instead of a three gallon and a five gallon jug, there's a three gallon

131
00:09:41,120 --> 00:09:44,399
jug and a nine gallon jug.

132
00:09:44,399 --> 00:09:52,399
And now the question is, can you get four gallons into the big jug by pouring back and forth

133
00:09:52,399 --> 00:09:58,120
with rules like these or can't show and can you prove it?

134
00:09:58,120 --> 00:10:04,919
Well my guess is that you probably can figure out what's going on because what's happening

135
00:10:04,919 --> 00:10:11,159
is if you start off with nothing in either jug and you do these moves of filling up a

136
00:10:11,159 --> 00:10:18,919
jug, pouring one jug into another, you'll discover that the amount of water in any jug is always

137
00:10:18,919 --> 00:10:21,000
divisible by three.

138
00:10:21,000 --> 00:10:23,240
This is a preserved invariant.

139
00:10:23,240 --> 00:10:28,439
Any state that you can get to starting off from zero zero, three will divide the number

140
00:10:28,439 --> 00:10:31,120
of gallons in each jug.

141
00:10:31,120 --> 00:10:32,399
We could state it this way.

142
00:10:32,399 --> 00:10:38,200
There's a property of states, property of B and L, which is the state, which is that three

143
00:10:38,200 --> 00:10:43,720
divides be that vertical line is a shorthand for the simple divides.

144
00:10:43,720 --> 00:10:48,960
So three divides be or B is a multiple of three, three divides L, sin and L is a multiple

145
00:10:48,960 --> 00:10:49,960
of three.

146
00:10:49,960 --> 00:10:54,039
And the claim is that that's always going to be true.

147
00:10:54,039 --> 00:10:58,159
So in case that's not obvious, you might not have all the rules in your head.

148
00:10:58,159 --> 00:11:00,959
Let's just take a look at one of the more complicated rules.

149
00:11:00,959 --> 00:11:06,240
This was the rule where you're pouring the big jug into the little jug up until the

150
00:11:06,240 --> 00:11:09,399
little jug is full.

151
00:11:09,399 --> 00:11:15,759
And that transition is that if you're in state, B L, you move to B minus three minus L and

152
00:11:15,759 --> 00:11:17,360
three.

153
00:11:17,360 --> 00:11:23,959
And if you look at this now clearly, if three divides both B and L, both components of

154
00:11:23,959 --> 00:11:28,120
the state you're at, then in the new state, well three obviously divides the contents

155
00:11:28,120 --> 00:11:33,120
of the little jug, which is three, but three also divides the contents of the big jug,

156
00:11:33,120 --> 00:11:38,200
which is a multiple of three, namely B minus three, which is a multiple of three minus

157
00:11:38,200 --> 00:11:40,399
double, which is a multiple of three.

158
00:11:40,399 --> 00:11:45,000
When you take a linear combination of multiples of three, you get a multiple of three.

159
00:11:45,000 --> 00:11:48,279
And you look at all the other transitions and they check equally well.

160
00:11:48,279 --> 00:11:55,000
If you're in a state, B L, and you move to a new state, B prime L prime, if three divides

161
00:11:55,000 --> 00:11:58,960
B and L, then three divides B prime and L prime.

162
00:11:58,960 --> 00:12:04,799
So this is what's called a preserved invariant.

163
00:12:04,799 --> 00:12:09,039
And of course, the corollary is that in the diehard ones, and for all game with the three

164
00:12:09,039 --> 00:12:14,320
jug, three gallon jug, and the nine gallon jug, you can't get to any state of the form

165
00:12:14,320 --> 00:12:21,759
4x because 4 is not divisible by 3, and therefore Bruce is going to die.

166
00:12:21,759 --> 00:12:27,759
Now what we illustrated here is an argument that's known as Floyd's invariant principle,

167
00:12:27,759 --> 00:12:31,600
and it's really nothing but induction reformulated for state machines.

168
00:12:31,600 --> 00:12:38,000
The statement of Floyd's invariant principle is that we're going to define a preserved invariant

169
00:12:38,000 --> 00:12:42,840
as a property of states, and a preserved invariant means it has the property that if you're in

170
00:12:42,840 --> 00:12:50,639
a state that has property P, and it's possible to make a single transition to a state R, then

171
00:12:50,639 --> 00:12:54,679
R will also have property P. This is just like the induction step.

172
00:12:54,679 --> 00:12:58,720
You have to prove that P of N implies P of N plus 1.

173
00:12:58,720 --> 00:13:08,399
So if you have a preserved invariant, then if the property holds at the start state,

174
00:13:08,399 --> 00:13:14,319
then it's obvious that the property will hold for all of the states that you can possibly

175
00:13:14,319 --> 00:13:18,120
get to, that P of R will hold for all reachable states.

176
00:13:18,120 --> 00:13:21,560
You can prove this by induction on the number of states, but I think it's clear that if

177
00:13:21,560 --> 00:13:26,039
you have a property that you begin with and it doesn't change making a step, it's never

178
00:13:26,039 --> 00:13:27,399
going to change.

179
00:13:27,399 --> 00:13:30,679
And that's all that Floyd's invariant principle states.

180
00:13:30,679 --> 00:13:36,460
So in particular, since the property P holds in all reachable states, if there is any

181
00:13:36,460 --> 00:13:42,759
final state which the machine reaches, then P is going to hold in that state.

182
00:13:42,759 --> 00:13:48,200
And what we saw was that, and so we're using the word preserved invariant to distinguish

183
00:13:48,200 --> 00:13:55,759
the definition here from another usage that's co-opted the word invariant to mean a property

184
00:13:55,759 --> 00:13:58,319
that's true in all states.

185
00:13:58,319 --> 00:14:03,240
And while it's nice to know that some property is true in all states, the way you prove that

186
00:14:03,240 --> 00:14:04,960
is by having a preserved invariant.

187
00:14:04,960 --> 00:14:06,480
So you want it distinguished it to.

188
00:14:06,480 --> 00:14:11,679
Technically, if you look at this, the predicate that's always false is a preserved invariant

189
00:14:11,679 --> 00:14:16,839
because of the condition, as usual, the way implication works if the antecedent is

190
00:14:16,839 --> 00:14:20,120
false, then the entire implication is true.

191
00:14:20,120 --> 00:14:26,279
So if you're always false, then it's always the case that if false held in a state which

192
00:14:26,279 --> 00:14:32,039
it never does, then it has to hold in any state you can get to so that implication is true.

193
00:14:32,039 --> 00:14:38,039
So just remember that preserved invariants that are constantly false exist.

194
00:14:38,039 --> 00:14:42,360
They are good preserved invariants, but they're not what other people would call an invariant.

195
00:14:42,360 --> 00:14:47,879
We use preserved invariants to prove that a property is true in all states.

196
00:14:47,879 --> 00:14:52,039
It's a methodology.

197
00:14:52,039 --> 00:14:54,480
So let's do one more example to wrap this up.

198
00:14:54,480 --> 00:15:00,399
Suppose I have a robot on a grid and the integer grid, and we can think then of the coordinates

199
00:15:00,399 --> 00:15:05,480
of the integer as a pair, the coordinates of the robot as the coordinates of the square

200
00:15:05,480 --> 00:15:09,600
that it's in a pair of non-negative integers.

201
00:15:09,600 --> 00:15:14,840
Now the way this robot can move is it can make a diagonal move in one step.

202
00:15:14,840 --> 00:15:20,480
So it can move one step to the northeast or southeast or northwest or southwest, and that's

203
00:15:20,480 --> 00:15:21,480
it.

204
00:15:21,480 --> 00:15:26,080
And the question that I want to ask is suppose you start the robot off at the origin at

205
00:15:26,080 --> 00:15:27,759
0, 0.

206
00:15:27,759 --> 00:15:33,159
Is there some way that it can wander around following its moves and get to a net state where it's

207
00:15:33,159 --> 00:15:34,519
moved one square over?

208
00:15:34,519 --> 00:15:40,079
That is, it gets to the square 0, 1.

209
00:15:40,079 --> 00:15:44,639
And the answer to that is settled again by a preserved invariant.

210
00:15:44,639 --> 00:15:48,919
I don't know whether it's obvious to you yet, but it will be in a moment.

211
00:15:48,919 --> 00:15:52,079
I'm claiming you can't get to the square 0, 1.

212
00:15:52,079 --> 00:15:58,039
And the reason is that there's a preserved invariant of that set of robot moves.

213
00:15:58,039 --> 00:16:03,000
Similarly, the sum of the coordinates is even, is an invariant.

214
00:16:03,000 --> 00:16:06,559
If the sum of the coordinates is even, it stays even.

215
00:16:06,559 --> 00:16:07,559
And why is that?

216
00:16:07,559 --> 00:16:17,120
Well, any move adds plus or minus 1 to the coordinates of both x and y.

217
00:16:17,120 --> 00:16:23,839
Maybe x and y both go up by 1, in which case the sum of x and y increases by 2.

218
00:16:23,839 --> 00:16:28,000
So if it was even, it stays even, or they both go down by 1, or maybe 1 goes up in

219
00:16:28,000 --> 00:16:31,279
the other goes down, in which case the sum doesn't change.

220
00:16:31,279 --> 00:16:35,840
In every case, if x plus y was even, it stays even.

221
00:16:35,840 --> 00:16:39,200
And as a matter of fact, if it was odd, it stays odd.

222
00:16:39,200 --> 00:16:41,879
Moves actually preserve the parity of x plus y.

223
00:16:41,879 --> 00:16:46,639
But the invariant is that x plus y is even.

224
00:16:46,639 --> 00:16:48,519
Now, what else is the case?

225
00:16:48,519 --> 00:16:54,360
Well, 0, 0, 0, 0 plus 0 is 0, which is even.

226
00:16:54,360 --> 00:17:00,840
And so we're in a Floyd invariant principle case, where all the positions you can get

227
00:17:00,840 --> 00:17:07,000
to from the origin 0, 0, which has an even sum, have to have an even sum.

228
00:17:07,000 --> 00:17:15,319
And since 1 plus 0 is odd, you can't get to that square, 1, 0.

229
00:17:15,319 --> 00:17:20,000
It's not reachable.

230
00:17:20,000 --> 00:17:27,319
So the parity invariant of the diagonally moving robot will set us up for an analysis of

231
00:17:27,319 --> 00:17:29,000
the 15 puzzle game.

232
00:17:29,000 --> 00:17:36,160
That's this logo that we've had on every slide in 6042 so far with 6 blank 42 on the diagonal.

233
00:17:36,160 --> 00:17:42,039
This is a game where there are these little numbered tiles that slide into the blank square.

234
00:17:42,039 --> 00:17:47,839
And the question is how to permute, how to get from one permutation of the numbers to another.

235
00:17:47,839 --> 00:17:53,559
And it turns out that the analysis of that game depends on a parity invariant reminiscent

236
00:17:53,559 --> 00:17:58,839
of a slightly more sophisticated than the diagonally moving robot.

237
00:17:58,839 --> 00:18:04,799
Let's look at one more example of using the invariant to verify a little algorithm.

238
00:18:04,799 --> 00:18:08,919
They actually will be quite important as the course progresses, and that is fast

239
00:18:08,919 --> 00:18:10,399
exponentiation.

240
00:18:10,399 --> 00:18:14,599
So in this setup, a is a real number, and b is a non-negative integer.

241
00:18:14,599 --> 00:18:16,439
And I want to compute the beef power of a.

242
00:18:16,439 --> 00:18:25,039
Let's say b was 128, and I want to compute the 128th power of some real number a.

243
00:18:25,039 --> 00:18:28,519
Well, I can multiply a by itself 127 times.

244
00:18:28,519 --> 00:18:29,919
That would work fine.

245
00:18:29,919 --> 00:18:35,159
But if you think about it, suppose I square a, and then I square it again, and I square

246
00:18:35,159 --> 00:18:42,279
it again, then in about 8 squareings instead of 99 multiplications, I'm going to get to

247
00:18:42,279 --> 00:18:44,960
a to 128th.

248
00:18:44,960 --> 00:18:51,759
Now if b is not a power of two, you adjust it slightly, and using that idea, you can compute

249
00:18:51,759 --> 00:18:57,920
the beef power of a much more rapidly than if you just naively multiplied out b minus

250
00:18:57,920 --> 00:18:59,119
one times.

251
00:18:59,119 --> 00:19:02,519
So let's look at the pseudo code for this algorithm.

252
00:19:02,519 --> 00:19:06,920
Here x, y, z, and r are temporary registers.

253
00:19:06,920 --> 00:19:14,320
y and z hold, y, z and r, all hold integers, and x holds this real number a.

254
00:19:14,320 --> 00:19:19,519
And you can read the code if you wish, but in fact, I'm going to immediately jump to

255
00:19:19,519 --> 00:19:24,279
the slightly more abstract and easier to understand version of it as a state machine.

256
00:19:24,279 --> 00:19:29,440
So what matters about this fast exponentiation algorithm as a state machine is that first

257
00:19:29,440 --> 00:19:39,640
of all, there are three states, two real numbers and a non-negative integer.

258
00:19:39,640 --> 00:19:46,080
And the start state is going to be that the number a is in the first register, or in the

259
00:19:46,080 --> 00:19:49,080
first location, first coordinate of the states.

260
00:19:49,080 --> 00:19:55,320
One is the real number in the second coordinate, and b, the target exponent, is the non-negative

261
00:19:55,320 --> 00:19:59,240
integer in the third component.

262
00:19:59,240 --> 00:20:01,120
The transitions are going to be as follows.

263
00:20:01,120 --> 00:20:02,960
Here's a simple one.

264
00:20:02,960 --> 00:20:10,799
If I have an amount x in the first location, y in the second location, z in the third, then

265
00:20:10,799 --> 00:20:20,039
if z is positive and even, then I'm going to square x, leave y alone, and divide z by

266
00:20:20,039 --> 00:20:21,880
totally.

267
00:20:21,880 --> 00:20:23,640
And that's the new state that I get at.

268
00:20:23,640 --> 00:20:29,200
On the other hand, if z is odd and positive, then I'm going to square x.

269
00:20:29,600 --> 00:20:37,600
Multiply y by x, and again, take the quotient of z, divide z by two.

270
00:20:37,600 --> 00:20:42,000
Okay, why does this state machine do fast exponentiation?

271
00:20:42,000 --> 00:20:42,840
Why is it correct?

272
00:20:42,840 --> 00:20:46,920
And the insight is that there's a preserved invariant of this machine.

273
00:20:46,920 --> 00:20:53,840
And the preserved invariant is that y times x to the z is always a to the b.

274
00:20:53,839 --> 00:21:00,119
So let's see how to verify that, that y x to the z is equal to a to the b.

275
00:21:00,119 --> 00:21:06,279
Well, let's just look at maybe this like the more interesting of the two transition rules,

276
00:21:06,279 --> 00:21:13,799
which is when z is positive and odd, the x, y, z state moves to a new state indicated

277
00:21:13,799 --> 00:21:18,720
in green, where the new value of x is x squared, the new value of y is x, y.

278
00:21:18,720 --> 00:21:22,119
And the new value of z is z minus 1 over 2.

279
00:21:22,119 --> 00:21:27,359
Remember, you went to the quotient of z divided by 2, and when z is odd, that means z minus,

280
00:21:27,359 --> 00:21:29,719
it's literally z minus 1 over 2.

281
00:21:29,719 --> 00:21:36,239
Well, do the new values satisfy the invariant if I plug in the green values of x squared

282
00:21:36,239 --> 00:21:44,759
for y and x squared for x, x, y for y and z minus 1 over 2 for z.

283
00:21:44,759 --> 00:21:47,199
Well, let's see what happens.

284
00:21:47,200 --> 00:21:56,200
If I take the new value of y, which is x, y, and I multiply it by the new value of x,

285
00:21:56,200 --> 00:22:01,960
which is x squared, raised to the new value of z, which is z minus 1 over 2,

286
00:22:01,960 --> 00:22:04,840
let's do a little algebraic simplification of that.

287
00:22:04,840 --> 00:22:10,039
Well, the x squared to the z minus 1 over 2 becomes x to the z minus 1,

288
00:22:10,039 --> 00:22:13,120
and I'm just carrying over the x, y.

289
00:22:13,119 --> 00:22:21,199
And then that simplifies to simply y times x times x to the z minus 1, or y x to the z,

290
00:22:21,199 --> 00:22:23,799
which we assumed was equal to a to the b.

291
00:22:23,799 --> 00:22:28,719
So sure enough, the new values of x, y, and z satisfy the invariant.

292
00:22:28,719 --> 00:22:34,079
It is a preserved invariant, and an even simpler argument applies to the other transition

293
00:22:34,079 --> 00:22:36,439
when z is positive and even.

294
00:22:36,439 --> 00:22:40,239
So we've verified that this is a preserved invariant.

295
00:22:40,240 --> 00:22:47,640
Now, at the start, remember, we start off with the real number a and register x,

296
00:22:47,640 --> 00:22:54,400
the real number b in z, and the real number 1 in y, which is the accumulator,

297
00:22:54,400 --> 00:22:57,559
and one times a to the b is equal to a to the b.

298
00:22:57,559 --> 00:23:01,839
So this preserved invariant is true of the start state.

299
00:23:01,839 --> 00:23:08,079
And that means by Floyd's invariant principle that it is true at the final state,

300
00:23:08,079 --> 00:23:10,039
if and when the thing stops.

301
00:23:10,039 --> 00:23:12,240
Well, when does this machine stop?

302
00:23:12,240 --> 00:23:14,960
As long as z is positive, it can keep moving.

303
00:23:14,960 --> 00:23:18,159
So it gets stuck when z is 0.

304
00:23:18,159 --> 00:23:22,559
What happens if it ever gets to z is 0, if it gets stuck?

305
00:23:22,559 --> 00:23:29,159
Then the invariant says that y x to the 0 has to equal to a to the b.

306
00:23:29,159 --> 00:23:32,480
But of course, y x to the 0 is nothing but y.

307
00:23:32,480 --> 00:23:37,960
And what we conclude is that sure enough, this machine leaves the desired exponential

308
00:23:37,960 --> 00:23:42,440
value in the register y, which is where we get the answer.

309
00:23:42,440 --> 00:23:47,440
And that's why this algorithm is correct.

310
00:23:47,440 --> 00:23:54,960
Now, another aspect of what's going on here is proving that the algorithm does terminate.

311
00:23:54,960 --> 00:24:01,440
So let me just say a word that Floyd distinguished sort of these two aspects of program

312
00:24:01,440 --> 00:24:02,960
correctness that typically come up.

313
00:24:02,960 --> 00:24:05,680
One is showing that if you get an answer, it's correct.

314
00:24:05,680 --> 00:24:07,279
And that's what we just did.

315
00:24:07,279 --> 00:24:13,319
If this machine stops, if it ever gets to the case where z is 0, then y has the right

316
00:24:13,319 --> 00:24:14,319
answer.

317
00:24:14,319 --> 00:24:16,319
But we haven't proved that it stops.

318
00:24:16,319 --> 00:24:21,399
So we've shown that it's partially correct like a partial function.

319
00:24:21,399 --> 00:24:23,000
It might not be defined everywhere.

320
00:24:23,000 --> 00:24:24,000
We haven't shown that yet.

321
00:24:24,000 --> 00:24:26,079
But when it is defined, it gives the right answer.

322
00:24:26,079 --> 00:24:31,680
And the other aspect of correctness is termination, showing in effect that the function is total,

323
00:24:31,680 --> 00:24:33,920
that the program always does stop.

324
00:24:33,920 --> 00:24:40,000
Well, in this case, there's an easy way to see why it always stops because in every transition,

325
00:24:40,000 --> 00:24:42,920
z is being halved or more.

326
00:24:42,920 --> 00:24:48,920
Z is a non-negative integer valued variable.

327
00:24:48,920 --> 00:24:55,200
And since we're having it or making it even smaller than half of it at every step, it

328
00:24:55,200 --> 00:25:02,440
means that since it starts with the value z, it can't get smaller more than log to the

329
00:25:02,440 --> 00:25:06,240
base 2 of b times because by then it would have hit 0.

330
00:25:06,240 --> 00:25:12,759
And so we can be sure that this machine makes it most log to the base 2 of b transitions.

331
00:25:12,759 --> 00:25:17,680
And then it has to get stuck at the only place that it can stuck, which is when z equals

332
00:25:17,680 --> 00:25:19,360
0.

333
00:25:19,360 --> 00:25:27,360
And there is a picture of my friend and early colleague, Bob Floyd, whom I met at the very

334
00:25:27,360 --> 00:25:31,480
beginning of my career at Carnegie Mellon University.

335
00:25:31,480 --> 00:25:35,039
We worked together for about one year before he went off to Stanford.

336
00:25:35,039 --> 00:25:44,120
And you can read much more about his life in a warm and detailed eulogy written by his best

337
00:25:44,120 --> 00:25:46,799
friend, Don Knuth.

338
00:25:46,799 --> 00:25:53,319
Floyd won the Touring Award and made his major contributions, both to program correctness

339
00:25:53,319 --> 00:25:56,160
and to programming language parsing.

