---
title: CS143 P18Week204 04 Nfa To Dfa Quizupdate
---

1
00:00:00,000 --> 00:00:05,080
Welcome back.

2
00:00:05,080 --> 00:00:10,040
In this video, we're going to talk about converting non-deterministic finite atowata into deterministic

3
00:00:10,040 --> 00:00:12,560
finite atowata.

4
00:00:12,560 --> 00:00:21,080
Here again is our little diagram of the pipeline of a lexical analyzer.

5
00:00:21,080 --> 00:00:22,559
How one is constructed.

6
00:00:22,559 --> 00:00:26,519
So beginning with the lexical specification, we write our regular expressions.

7
00:00:26,519 --> 00:00:31,399
Last time we talked about this step, the conversion of regular expressions into non-deterministic

8
00:00:31,399 --> 00:00:33,119
finite atowata.

9
00:00:33,119 --> 00:00:35,799
This time we're going to talk about this step.

10
00:00:35,799 --> 00:00:40,159
As you might guess, in the final video in this series, we'll talk about the final step,

11
00:00:40,159 --> 00:00:45,600
which is the implementation of DFA.

12
00:00:45,600 --> 00:00:47,920
Here's the non-deterministic finite atowata.

13
00:00:47,920 --> 00:00:49,960
We finished up with last time.

14
00:00:49,960 --> 00:00:54,960
The first thing we're going to discuss today is an important idea called the epsilon closure

15
00:00:54,960 --> 00:00:56,719
of a state.

16
00:00:56,719 --> 00:01:00,840
The basic idea of the epsilon closure is that I pick a state and it could be a set of

17
00:01:00,840 --> 00:01:03,480
states, but we'll just do it for a single state.

18
00:01:03,480 --> 00:01:09,240
Then I look at all the states that I can reach by following only epsilon moves.

19
00:01:09,240 --> 00:01:13,719
So B is the state that we're starting with, so B would be included in the set, and then

20
00:01:13,719 --> 00:01:17,799
there's an epsilon move to C. So C would be included in the set, and there's another

21
00:01:17,799 --> 00:01:21,240
epsilon move to D. So D would be included in the set.

22
00:01:21,239 --> 00:01:29,679
We would say the epsilon closure of B is equal to the set BCD.

23
00:01:29,679 --> 00:01:33,280
And let's do one more as an example.

24
00:01:33,280 --> 00:01:40,959
Let's take the epsilon closure of G. When we switch colors, I'll do this one.

25
00:01:40,959 --> 00:01:46,239
I'll erase that and do this one in pink or purplish pink.

26
00:01:46,239 --> 00:01:52,079
So the epsilon closure of G, well we have to follow all the epsilon transitions out of G.

27
00:01:52,079 --> 00:01:58,119
So H would be in the epsilon closure of G, but it's not just a single epsilon move.

28
00:01:58,119 --> 00:01:59,119
This is recursive.

29
00:01:59,119 --> 00:02:03,419
So any number of epsilon moves that I can take, all of those states are included in the

30
00:02:03,419 --> 00:02:10,819
epsilon closure of G. So in fact, I would also be included, A would be included, and B,

31
00:02:10,819 --> 00:02:14,199
and C, and D would also be included.

32
00:02:14,199 --> 00:02:20,119
And now, if I look at all of these states that have been colored in the light purple color,

33
00:02:20,119 --> 00:02:25,379
I can see that I can't reach any new states from those states using only epsilon moves.

34
00:02:25,379 --> 00:02:32,799
And so the epsilon closure of G would be equal to, and let's write down the mall out.

35
00:02:32,799 --> 00:02:40,759
Here it's A, B, C, D, G, H, I.

36
00:02:40,759 --> 00:02:47,479
Okay? So that is the epsilon closure of a state.

37
00:02:47,479 --> 00:02:52,120
We call it from the last video that an NFA may be in many states at any given point in time.

38
00:02:52,120 --> 00:02:58,280
That is because of the choices it can make for a given input, an NFA may reach multiple different states.

39
00:02:58,280 --> 00:03:03,319
And the question we want to address now is how many different states can it be in?

40
00:03:03,319 --> 00:03:11,560
Well, if a non-deterministic automaton has N states, and it winds up in some subset of those states S,

41
00:03:11,560 --> 00:03:17,519
how big can that subset be? Well, clearly the cardinality of that set has to be less than equal to N.

42
00:03:17,519 --> 00:03:21,919
So the NFA can get into at most N different states.

43
00:03:21,919 --> 00:03:25,919
Now, if instead I want to know the number of different subsets.

44
00:03:25,919 --> 00:03:28,959
Well, how many different subsets are there of N things?

45
00:03:28,960 --> 00:03:36,080
Well, there, that means there are two to the N minus one possible subsets of N states.

46
00:03:36,080 --> 00:03:39,120
And there's something very interesting about this number.

47
00:03:39,120 --> 00:03:40,560
First of all, it's a very big number.

48
00:03:40,560 --> 00:03:44,200
So clearly the NFA can get into lots of different configurations,

49
00:03:44,200 --> 00:03:47,360
particularly one that has a lot of different states.

50
00:03:47,360 --> 00:03:54,600
But the important thing is that this is a finite set of possible configurations.

51
00:03:59,960 --> 00:04:11,159
And this is going to give us the seed of the idea for converting an NFA into a DFA or deterministic automaton.

52
00:04:11,159 --> 00:04:18,160
Because all we have to be able to do to convert a non-deterministic automaton into a deterministic automaton

53
00:04:18,160 --> 00:04:24,360
is come up with a way for the deterministic automaton to simulate the behavior of the non-deterministic automaton.

54
00:04:24,360 --> 00:04:30,560
And the fact that the non-deterministic automaton can only get into a finite set of configurations,

55
00:04:30,560 --> 00:04:36,560
even if that set of configurations is very large, is exactly what we will exploit in the construction.

56
00:04:39,560 --> 00:04:45,160
Now we're ready to give the construction, showing how to map an arbitrary non-deterministic finite automaton

57
00:04:45,160 --> 00:04:47,960
to an equivalent deterministic finite automaton.

58
00:04:47,960 --> 00:04:51,560
So let's begin by saying what's in our NFA.

59
00:04:51,560 --> 00:04:58,360
So we'll have a set of states, which we'll call S, and these are the states of the non-deterministic machine.

60
00:04:58,360 --> 00:05:08,160
There's a start state, a little S, which is one of the states, and there's a set of final states, capital F.

61
00:05:08,160 --> 00:05:10,160
And then we also have to give the transition function.

62
00:05:10,160 --> 00:05:14,560
And I want to write out the state transition function.

63
00:05:14,560 --> 00:05:22,560
I want to use the state transition function to define a operator that we're going to find handy for defining our DFA.

64
00:05:22,560 --> 00:05:26,759
So let's say that A applied to a set of states.

65
00:05:26,759 --> 00:05:31,759
So X here is a set of states, and A is a character in the input language.

66
00:05:31,759 --> 00:05:43,160
So A of X is equal to those states Y, such that there is some X, little X here, a single state in the set of states,

67
00:05:43,160 --> 00:05:50,760
such that there's a transition from X to Y on input A.

68
00:05:50,760 --> 00:05:55,360
So this is just a way of saying, of giving the transition function at the set level.

69
00:05:55,360 --> 00:06:03,760
It says for a given set of states X, show me all the states that you can reach on input A.

70
00:06:03,760 --> 00:06:11,560
And then the other operation that we need is the Epsilon closure operation that we defined a couple of slides ago.

71
00:06:11,560 --> 00:06:18,160
And I'm just going to abbreviate that as Epsilon dash CLOS, Epsilon closure.

72
00:06:18,160 --> 00:06:22,560
Alright, so now we're ready to define our DFA.

73
00:06:22,560 --> 00:06:24,160
So what will the DFA be?

74
00:06:24,160 --> 00:06:26,060
Well, it's going to have to have all of these things.

75
00:06:26,060 --> 00:06:27,160
It's going to have to have a set.

76
00:06:27,160 --> 00:06:33,160
We have to say what the states are, what the start state is, what the final states are, and what the transition function is.

77
00:06:33,160 --> 00:06:35,160
So let's begin with the set of states.

78
00:06:35,160 --> 00:06:43,360
The states will be the subsets of S.

79
00:06:43,360 --> 00:06:49,960
So the states of the DFA will be all possible subsets of the states of the NFA.

80
00:06:49,960 --> 00:06:56,160
So there'll be one state of the DFA for each subset of possible, each possible subset of states of the NFA.

81
00:06:56,160 --> 00:06:59,860
And of course this is potentially a very big number, but it's still finite.

82
00:06:59,860 --> 00:07:08,460
And so we can use that set of subsets of states as the state space of the deterministic machine.

83
00:07:08,460 --> 00:07:12,960
So now what's the start state of the DFA?

84
00:07:12,960 --> 00:07:19,460
Well, that's going to be the Epsilon closure of the start state of the non-deterministic machine.

85
00:07:19,460 --> 00:07:22,759
A state of the DFA corresponds to a different subset of states.

86
00:07:22,759 --> 00:07:29,160
So each individual state of the DFA tells us a particular set of states the NFA might be in.

87
00:07:29,160 --> 00:07:31,960
Well, which set of states might we be in at the beginning?

88
00:07:31,960 --> 00:07:38,160
Well, clearly the NFA starts in its own start state, but then before it reads any input, it can make Epsilon moves.

89
00:07:38,160 --> 00:07:47,660
And so the actual set of states that could be in before it reads the first input symbol is exactly the Epsilon closure of its start state.

90
00:07:47,660 --> 00:07:50,160
Now, what are the set of final states?

91
00:07:50,160 --> 00:07:53,360
Well, the set of final states will be consistent of those states X.

92
00:07:53,360 --> 00:07:59,759
And remember, the states of the DFA are sets of states of the NFA, so that X is a set.

93
00:07:59,759 --> 00:08:10,560
And it's going to be every X such that X intersected with the set of final states of the NFA is not empty.

94
00:08:10,560 --> 00:08:20,759
So any state of the DFA that has at least one state of the NFA, one final state, excuse me, of the NFA in it, is good enough as a final state for the DFA.

95
00:08:20,759 --> 00:08:27,159
Because remember, the goal of the NFA is just that it has some computation which accepts the input.

96
00:08:27,159 --> 00:08:29,360
That means there's some way to get to a final state.

97
00:08:29,360 --> 00:08:34,960
And so if any of the states is a final state, we're happy.

98
00:08:34,960 --> 00:08:44,360
And we can capture that here by just considering every state that has at least one final state of the non-interimistic machine as a final state of the DFA.

99
00:08:44,360 --> 00:08:47,759
And finally, we need to define the transition function.

100
00:08:47,960 --> 00:08:58,960
And how do we do that? Well, we need to say that for a given state X and another state Y, when is there a transition between them on some input A?

101
00:08:58,960 --> 00:09:05,159
Well, that there will be such a transition under what conditions.

102
00:09:05,159 --> 00:09:10,360
And well, let's write them out. So remember, we're in state X.

103
00:09:10,360 --> 00:09:12,159
And what do we need to know?

104
00:09:12,159 --> 00:09:16,960
Well, we need to know the set of states that we can reach on input A.

105
00:09:16,960 --> 00:09:19,660
And we just define that. That's A of X.

106
00:09:19,660 --> 00:09:29,360
And then once we've gotten to one of these states, once we've seen where we can go from the set of states X on input A, there's also a possibility of making epsilon moves after that.

107
00:09:29,360 --> 00:09:35,960
So furthermore, we have to take the epsilon closure of that set of states.

108
00:09:36,960 --> 00:09:48,160
And so we'll say that there is a transition from X to Y if Y is equal to this set of states.

109
00:09:48,160 --> 00:09:53,360
And notice that there's only one such set of states for any X.

110
00:09:53,360 --> 00:09:55,759
And that guarantees that this is a deterministic machine.

111
00:09:55,759 --> 00:10:00,560
Each state will only have one possible move on each input.

112
00:10:00,759 --> 00:10:05,759
So we can just now go through our checklist and see if we have a deterministic machine.

113
00:10:05,759 --> 00:10:07,759
We have a finite set of states.

114
00:10:07,759 --> 00:10:09,959
We have a start state.

115
00:10:09,959 --> 00:10:16,759
We have a set of final states and we have a transition function with only one move per input and no epsilon moves.

116
00:10:16,759 --> 00:10:19,359
And so that is in fact a deterministic machine.

117
00:10:19,359 --> 00:10:30,159
And the property that it maintains is that each step of the computation, the state of the DFA records the set of possible states that the NFA could have gotten into on the same input.

118
00:10:31,559 --> 00:10:38,559
So let's work through an example of constructing a deterministic machine from a non deterministic machine.

119
00:10:38,559 --> 00:10:43,559
Here's the non deterministic finite of Tom and Tom that we built in the last video.

120
00:10:43,559 --> 00:10:48,559
And again, this is the one I use at the beginning of the video to define epsilon closure.

121
00:10:48,559 --> 00:10:54,559
So we're going to do the example slightly differently than the construction I gave on the previous slide.

122
00:10:55,559 --> 00:11:00,559
If we actually had to write out all the subsets of this many states, it would take us a very, very long time.

123
00:11:00,559 --> 00:11:04,559
And it turns out that not all of the subsets are actually used by the DFA.

124
00:11:04,559 --> 00:11:07,559
So we're just going to enumerate the states that we actually need.

125
00:11:07,559 --> 00:11:13,559
And we'll do that by beginning with the start state of the DFA and then working out which additional states are required.

126
00:11:13,559 --> 00:11:15,559
So how do we do that?

127
00:11:15,559 --> 00:11:20,559
Well, we begin with the start state of the NFA, which is just this state A.

128
00:11:20,559 --> 00:11:25,559
And then recall the start state of the DFA is the epsilon closure of that state.

129
00:11:25,559 --> 00:11:29,559
So that corresponds to this purple set here.

130
00:11:29,559 --> 00:11:38,559
So the first state of the DFA, the start state, is the subset of states A, B, C, D, H, I.

131
00:11:38,559 --> 00:11:44,559
And now we have to work out from this particular state, from the start state, what happens on each of the impossible input values?

132
00:11:45,559 --> 00:11:54,559
So the alphabet of this machine is 1 and 0. So we have to have two transitions out of this state, one for an input of 1 and one for an input of 0.

133
00:11:54,559 --> 00:11:57,559
So let's do input 0 first.

134
00:11:57,559 --> 00:12:02,559
And we can see looking at the purple set that there's only one possible transition.

135
00:12:02,559 --> 00:12:07,559
And that's from the state D to the state F.

136
00:12:07,559 --> 00:12:13,559
So certainly the state F is included in the set of states that the NFA can reach.

137
00:12:13,559 --> 00:12:17,559
But then once we get the state F, there's a lot of epsilon moves that we could take.

138
00:12:17,559 --> 00:12:21,559
And so in fact, the second state of the DFA corresponds to a much larger set.

139
00:12:21,559 --> 00:12:24,559
It's all the, it's the epsilon closure of F.

140
00:12:24,559 --> 00:12:30,559
And that is this set of states, F, G, H, I, A, B, C, and D.

141
00:12:30,559 --> 00:12:39,559
Okay, so this is the set of possible states that the NFA could be in after reading a single zero.

142
00:12:39,559 --> 00:12:42,559
Next, let's consider what happens from the start state on an input of 1.

143
00:12:42,559 --> 00:12:45,559
Which possible states can the NFA reach?

144
00:12:45,559 --> 00:12:52,559
And if we look at the transition function, we see there are two possible moves that the NFA could take.

145
00:12:52,559 --> 00:12:59,559
It could be in state C, in which case it would move to state E, or it could have been in state I.

146
00:12:59,559 --> 00:13:04,559
That's also part of the purple set, in which case it would move to state J.

147
00:13:04,559 --> 00:13:10,559
So there are two possible states that the NFA can get into as a result of reading a 1.

148
00:13:10,559 --> 00:13:14,559
And then after that, there's a bunch of epsilon moves that can take place.

149
00:13:14,559 --> 00:13:22,559
And in fact, it turns out that after reading a 1, the machine could be in any state except for state F.

150
00:13:22,559 --> 00:13:24,559
And that's this set of states.

151
00:13:24,559 --> 00:13:31,559
And you'll notice that this particular set of states, the red set, includes the final state of the NFA.

152
00:13:31,559 --> 00:13:38,559
So this is also a final state, indicating that after reading a 1, the NFA could be in an accepting state.

153
00:13:38,559 --> 00:13:42,559
And so this will be an accepting state of the DFA.

154
00:13:42,559 --> 00:13:51,559
Well, we still have to fill in for both of the two states that we've added here, the two states on the right of the machine.

155
00:13:51,559 --> 00:13:56,559
What they do on input 0, what they do on input 1. So let's figure that out.

156
00:13:56,559 --> 00:14:01,559
So beginning with the red state, on input 0, what can happen?

157
00:14:01,559 --> 00:14:11,559
Well, look, the red state includes state D, and it can move to state F, but we've already computed what happens on the epsilon closure of F is that's just the green state.

158
00:14:11,559 --> 00:14:17,559
And so if I'm in the red state and I read a 0, I move to the green state.

159
00:14:18,559 --> 00:14:27,559
If I'm in the red state and I read a 1, you'll see that both states, NFA states C and I are in the red set.

160
00:14:27,559 --> 00:14:30,559
And so let's just take this back to the red set.

161
00:14:30,559 --> 00:14:35,559
And similarly for the green state, if I read a 1, I move to the red state.

162
00:14:35,559 --> 00:14:38,559
And if I read a 0, I stay in the green state.

163
00:14:38,559 --> 00:14:41,559
And so this then is our deterministic machine.

164
00:14:41,559 --> 00:14:44,559
Down here, this is the deterministic machine.

165
00:14:44,559 --> 00:14:47,559
And again, it simulates the NFA.

166
00:14:47,559 --> 00:14:53,559
So on every move that deterministic machine, it records the set of possible states that the NFA could be in.

167
00:14:53,559 --> 00:14:59,559
And it will accept a string if and only if the NFA could accept the string.

