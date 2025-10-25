---
title: CS143 P16Week204+02+finite+automata+part+2
---

1
00:00:00,000 --> 00:00:11,720
Up to this point, a finite automaton consumes a character of input every time it makes a move.

2
00:00:11,720 --> 00:00:15,480
So if you can make any move at all, the input pointer advances.

3
00:00:15,480 --> 00:00:19,559
Now we're going to talk about a new kind of move, the epsilon move.

4
00:00:19,559 --> 00:00:24,320
And the idea behind epsilon moves is that the machine can make a state transition without

5
00:00:24,320 --> 00:00:26,240
consuming input.

6
00:00:26,239 --> 00:00:37,159
So for example, if I have my state, and I'm in state A and my input, and let's just

7
00:00:37,159 --> 00:00:48,000
say that we have x1, x2, x3, and for some reason we're about to read x2, when we make an epsilon

8
00:00:48,000 --> 00:00:55,079
move, the machine changes state, but the input pointer stays in exactly the same place.

9
00:00:55,079 --> 00:00:58,759
So the new configuration of the machine would be that we're in state B, but our input

10
00:00:58,759 --> 00:01:01,119
pointer is still waiting to read x2.

11
00:01:01,119 --> 00:01:04,640
So you can think of an epsilon move as a kind of free move for the machine.

12
00:01:04,640 --> 00:01:09,280
It can move to a different state without consuming any input.

13
00:01:09,280 --> 00:01:12,959
And just to be clear here, the machine does not have to make the epsilon move.

14
00:01:12,959 --> 00:01:13,959
It's a choice.

15
00:01:13,959 --> 00:01:22,159
So we can decide whether to make the epsilon move or not.

16
00:01:22,159 --> 00:01:26,200
Now epsilon moves are the first time we've mentioned the possibility that a finite automaton

17
00:01:26,200 --> 00:01:28,840
might have a choice in what moves it makes.

18
00:01:28,840 --> 00:01:32,959
And there's actually an important distinction between a automaton that have choices in those

19
00:01:32,959 --> 00:01:33,959
that don't.

20
00:01:33,959 --> 00:01:37,439
So deterministic finite automaton have two properties.

21
00:01:37,439 --> 00:01:43,959
First of all, they have no epsilon moves, so they must always consume input.

22
00:01:43,959 --> 00:01:48,280
And second, they only have one transition per input per state.

23
00:01:48,280 --> 00:01:49,920
What do I mean by that?

24
00:01:49,920 --> 00:01:55,200
That means that if I look at any state in a deterministic automaton, they can never have

25
00:01:55,200 --> 00:02:00,560
something like this where they have two possible moves for the same input.

26
00:02:00,560 --> 00:02:08,599
All the outgoing edges in a deterministic automaton must have different input labels.

27
00:02:08,599 --> 00:02:12,960
And then non-deterministic finite automaton are just those that are not deterministic.

28
00:02:12,960 --> 00:02:18,480
So in particular, a non-deterministic automaton can have epsilon moves, so it can choose to move

29
00:02:18,479 --> 00:02:20,719
to another state without consuming input.

30
00:02:20,719 --> 00:02:24,560
And they can also have multiple transitions for one input in a given state.

31
00:02:24,560 --> 00:02:31,639
So something like this is okay for a non-deterministic automaton.

32
00:02:31,639 --> 00:02:37,079
Now let me just point out that really epsilon moves are enough to create non-deterministic

33
00:02:37,079 --> 00:02:38,079
automaton.

34
00:02:38,079 --> 00:02:43,239
And at this second case where you have multiple transitions on the same input can be simulated

35
00:02:43,239 --> 00:02:46,679
just by a slightly more complicated machine with epsilon moves.

36
00:02:46,680 --> 00:02:51,080
So for example, I can draw this machine in the following way.

37
00:02:51,080 --> 00:02:55,920
I can have or I can simulate the machine that circled there in the following way.

38
00:02:55,920 --> 00:03:03,920
I can have a state with two epsilon moves and then each of those states has a move on

39
00:03:03,920 --> 00:03:09,480
A. So if I were to label these states one, two, and three, then this would be the state

40
00:03:09,480 --> 00:03:13,480
that corresponds to one and this would be the state that corresponds to two and this

41
00:03:13,480 --> 00:03:16,280
would be the state that corresponds to three.

42
00:03:16,280 --> 00:03:21,319
So anytime that we have multiple moves out of a state on a single input, we could always

43
00:03:21,319 --> 00:03:26,280
replace that by a few more states with epsilon moves and have every state in the machine

44
00:03:26,280 --> 00:03:30,039
only have a single transition for every possible input.

45
00:03:30,039 --> 00:03:35,520
So really the only fundamental difference between deterministic automaton and non-deterministic

46
00:03:35,520 --> 00:03:41,400
automaton is whether they have epsilon moves or not.

47
00:03:41,400 --> 00:03:45,759
A key property of a deterministic automaton is that it can only take one path through the

48
00:03:45,759 --> 00:03:48,039
state graph per input.

49
00:03:48,039 --> 00:03:51,599
So this is per input.

50
00:03:51,599 --> 00:03:52,599
What do I mean by that?

51
00:03:52,599 --> 00:03:56,439
Well, the automaton always begins in the start state and let's take a very simple input

52
00:03:56,439 --> 00:03:57,759
string like ABC.

53
00:03:57,759 --> 00:04:06,359
And if we look at the sequence of states that the deterministic automaton will take for

54
00:04:06,359 --> 00:04:11,919
that input, this path through the state graph is completely determined by the input because

55
00:04:11,919 --> 00:04:13,079
again it has no choice.

56
00:04:13,480 --> 00:04:16,800
In a given state there's only going to be one transition label day and it's going to

57
00:04:16,800 --> 00:04:20,280
take you to a state that only has one transition label B and that goes to another state that

58
00:04:20,280 --> 00:04:22,840
only has one transition label to C.

59
00:04:22,840 --> 00:04:28,480
And so every input determines the path through the state graph that the automaton will take.

60
00:04:28,480 --> 00:04:32,040
And this is not true for non-deterministic automaton.

61
00:04:32,040 --> 00:04:39,360
So it might be for example that beginning in the start state and on input A that there

62
00:04:39,360 --> 00:04:47,840
is some state I can go to on that input A but there may be another transition label

63
00:04:47,840 --> 00:04:49,800
A that would take me to a different state.

64
00:04:49,800 --> 00:04:53,639
So the automaton might be able to go to one of two different states and again there might

65
00:04:53,639 --> 00:04:55,639
also be epsilon transitions.

66
00:04:55,639 --> 00:05:02,400
And so what happens with non-deterministic automaton is that in general as they proceed through

67
00:05:02,400 --> 00:05:07,199
the state graph is they execute on the input they could wind up in any number of different

68
00:05:07,199 --> 00:05:08,199
states.

69
00:05:09,199 --> 00:05:10,199
Okay.

70
00:05:10,199 --> 00:05:16,240
And the rule with a non-deterministic automaton about when it accepts is that it accepts if

71
00:05:16,240 --> 00:05:18,279
any path accepts.

72
00:05:18,279 --> 00:05:37,759
So an NFA accepts if some choices lead to an accepting state at the end of the input.

73
00:05:38,759 --> 00:05:44,480
That is the non-deterministic automaton can choose what move to make and as long as there

74
00:05:44,480 --> 00:05:47,599
is some choice it could make that we get it to an accepting state.

75
00:05:47,599 --> 00:05:52,360
So let's say switching colors here that you know this was an accepting state down here

76
00:05:52,360 --> 00:05:56,800
and it took this path then it would accept.

77
00:05:56,800 --> 00:06:00,680
And maybe all these other paths are rejecting paths that doesn't matter as long as there

78
00:06:00,680 --> 00:06:06,319
is one path, one set of choices the NFA could make to get it to an accepting state at

79
00:06:06,319 --> 00:06:14,519
the end of the input then we say that that string is in the language of the NFA.

80
00:06:14,519 --> 00:06:18,240
The fact that NFAs can get into multiple different states depending on the choices they

81
00:06:18,240 --> 00:06:24,560
make during a run is important and will actually play a central role in a future video.

82
00:06:24,560 --> 00:06:29,000
So we're going to do a quick example here to just make sure that this is clear.

83
00:06:29,000 --> 00:06:34,120
So here's a little automaton and note that it is non-deterministic from the start state

84
00:06:34,120 --> 00:06:40,160
there are two possible moves on input zero and what we're going to do is just walk through

85
00:06:40,160 --> 00:06:45,720
an execution of this machine on a sample input and see what different states it can get

86
00:06:45,720 --> 00:06:47,120
into.

87
00:06:47,120 --> 00:06:51,840
So we begin to the start state and we should probably label our states actually so that

88
00:06:51,840 --> 00:06:53,519
we can refer to them.

89
00:06:53,519 --> 00:07:00,680
Let's call them A, B and C. And let's say the first input is one and so what does that

90
00:07:00,680 --> 00:07:01,680
mean?

91
00:07:01,680 --> 00:07:05,639
That means we'll take this transition, we'll just go from the start state and come back

92
00:07:05,639 --> 00:07:10,439
to the start state and so the set of states that the machine could be in after the first

93
00:07:10,439 --> 00:07:15,560
transition is just the set A. So it's guaranteed to still be in the start state.

94
00:07:15,560 --> 00:07:19,480
So there's no choices with the first move.

95
00:07:19,480 --> 00:07:23,199
Now let's say the second input character is a zero and now we do have a choice.

96
00:07:23,199 --> 00:07:27,920
We could either go to state B or we could go to state A.

97
00:07:28,439 --> 00:07:37,080
We could think of this as a set of possibilities that after we execute this move, this transition,

98
00:07:37,080 --> 00:07:40,280
the machine could be in any one of a set of states.

99
00:07:40,280 --> 00:07:44,360
And actually this completely characterizes the possibilities for the machine.

100
00:07:44,360 --> 00:07:49,840
We've know we've read the second input character and now we could be in a set of states.

101
00:07:49,840 --> 00:07:54,480
We could be either in state A or in state B.

102
00:07:54,480 --> 00:08:00,520
And so now let's say we read another zero and where could we go then?

103
00:08:00,520 --> 00:08:07,520
Well, if we're in state B, we could make the transition to state C, but if we're in state A,

104
00:08:07,520 --> 00:08:13,920
then we'll make the transition either to state B or again to state A.

105
00:08:13,920 --> 00:08:18,360
So in fact, we could be in any one of the three states if we read another zero.

106
00:08:18,360 --> 00:08:25,560
And now I think you can see what the rule is.

107
00:08:25,560 --> 00:08:32,680
So at every step, a non-deterministic atauenton is in a set of states of the machine.

108
00:08:32,680 --> 00:08:38,159
And when it reads another input, we consider all the possible moves it could make to compute the complete set of states

109
00:08:38,159 --> 00:08:41,399
it could be in at the next step of the machine.

110
00:08:42,120 --> 00:08:46,279
And then finally, how does we decide whether the machine accepts?

111
00:08:46,279 --> 00:08:50,199
Well, we look at the final state after the last bit of input is read.

112
00:08:50,199 --> 00:08:56,559
And if there's any, sorry, we look at the last set of states after the last input character is read.

113
00:08:56,559 --> 00:08:59,799
And if there's any final state in that set, then the machine accepts.

114
00:08:59,799 --> 00:09:07,840
And in this case, after we read zero, we see that an accepting state C is in this set of possible states.

115
00:09:07,840 --> 00:09:13,639
And what that means is that there was some set of choices that the machine could make that we get it into a final state at the end of the input.

116
00:09:13,639 --> 00:09:17,040
And so the machine accepts this input.

117
00:09:17,040 --> 00:09:23,720
Okay, so if there is a final state in the final set of possible states, then the non-deterministic machine accepts.

118
00:09:25,879 --> 00:09:32,160
It turns out that NFAs and DFA's are recognized exactly the same languages, in particular the regular languages.

119
00:09:32,159 --> 00:09:36,679
So NFAs, DFA's, and regular expressions all have equivalent power.

120
00:09:36,679 --> 00:09:39,399
They can only specify regular languages.

121
00:09:39,399 --> 00:09:45,360
DFA's are definitely faster to execute primarily or entirely because there are no choices to consider.

122
00:09:45,360 --> 00:09:49,360
So a DFA can just follow a single path through the state graph.

123
00:09:49,360 --> 00:09:55,360
Whereas with an NFA, we have to keep track potentially of the set of choices in the NFA and we might be in a set of states.

124
00:09:56,360 --> 00:09:58,560
However, there are some advantages to NFAs.

125
00:09:58,560 --> 00:10:02,399
They are in general much smaller than DFA's.

126
00:10:02,399 --> 00:10:05,519
In fact, they can be exponentially smaller.

127
00:10:05,519 --> 00:10:18,680
So the smallest NFA may be much, much smaller than the smallest equivalent DFA for the same language.

128
00:10:18,680 --> 00:10:23,960
And there's, so essentially there's a space time trade off between NFAs and DFA's.

129
00:10:23,960 --> 00:10:28,759
NFAs might be more compact, but DFA's will be faster to execute.

