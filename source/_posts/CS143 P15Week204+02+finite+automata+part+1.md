---
title: CS143 P15Week204+02+finite+automata+part+1
---

1
00:00:00,000 --> 00:00:05,600
Welcome back.

2
00:00:05,600 --> 00:00:09,720
In this video, we're going to talk about finite automata, which we'll see in future videos

3
00:00:09,720 --> 00:00:17,600
are a good implementation model for regular expressions.

4
00:00:17,600 --> 00:00:21,519
So in the last few videos, we've been talking about regular expressions, which we use as

5
00:00:21,519 --> 00:00:24,879
the specification language for lexical analysis.

6
00:00:24,879 --> 00:00:27,240
And in this video, we're going to start something new.

7
00:00:27,239 --> 00:00:34,159
We're going to talk about finite automata, which are the very convenience as an implementation

8
00:00:34,159 --> 00:00:37,679
mechanism for regular expressions.

9
00:00:37,679 --> 00:00:40,479
And so, regular expressions in finite automata are very closely related.

10
00:00:40,479 --> 00:00:46,599
It turns out that they can specify exactly the same languages called the regular languages.

11
00:00:46,599 --> 00:00:50,679
We won't prove that in this course, but we'll certainly make use of that fact.

12
00:00:50,679 --> 00:00:53,200
So moving right along, what is a finite automata?

13
00:00:53,200 --> 00:00:59,080
Well, here is a typical definition, as you might see it in a automata theory textbook.

14
00:00:59,080 --> 00:01:01,640
Finite automaton consists of an input alphabet.

15
00:01:01,640 --> 00:01:06,400
So these are the set of characters that it can read.

16
00:01:06,400 --> 00:01:10,520
It has a finite set of states, should probably emphasize that.

17
00:01:10,520 --> 00:01:16,079
This is what makes it a finite automaton, that has some set of states that it can be in.

18
00:01:16,079 --> 00:01:20,000
One of those states is special and is designated as the start state.

19
00:01:20,000 --> 00:01:22,520
Some subset of the states are accepting states.

20
00:01:22,519 --> 00:01:28,840
So these are the states that, well, we'll just find them more in a minute, but intuitively,

21
00:01:28,840 --> 00:01:34,039
if the automaton terminates after reading some input in one of these states, then it accepts

22
00:01:34,039 --> 00:01:36,599
the input, otherwise it rejects the input.

23
00:01:36,599 --> 00:01:39,759
And finally, the automaton has some set of state transitions.

24
00:01:39,759 --> 00:01:45,359
That is, if it's in one state, it can read some input and go to another state.

25
00:01:45,359 --> 00:01:48,199
So let's look at that in a little more detail.

26
00:01:48,199 --> 00:01:52,479
So a transition in a finite automaton, if I'm in this case, I've written out,

27
00:01:52,480 --> 00:01:58,040
one particular transition here, with we're in state one, and we read the input A,

28
00:01:58,040 --> 00:02:01,480
then the automaton can move to state two.

29
00:02:01,480 --> 00:02:06,960
And there could be lots of different transitions for the automaton from different states and different inputs.

30
00:02:06,960 --> 00:02:08,599
And it's read the following way.

31
00:02:08,599 --> 00:02:14,240
If we're in state one, on input A, we will go to state two.

32
00:02:14,240 --> 00:02:19,680
And if the automaton ends in an accepting state, when it gets to the end of the input,

33
00:02:19,680 --> 00:02:23,599
then it's going to do what's called accepting the string, meaning that it will say yes,

34
00:02:23,599 --> 00:02:27,439
that string was in the language of this machine.

35
00:02:27,439 --> 00:02:34,280
So intuitively, the automaton starts in the start state, and it repeatedly reads inputs.

36
00:02:34,280 --> 00:02:37,080
One input character at time makes a transition.

37
00:02:37,080 --> 00:02:40,680
So it'll see what kind of transition it can make out of its current state,

38
00:02:40,680 --> 00:02:42,640
based on that input to another state.

39
00:02:42,640 --> 00:02:49,480
And if one is done reading the input, is in one of the final states, then it will accept.

40
00:02:49,479 --> 00:02:52,039
Otherwise, it's going to reject the input.

41
00:02:52,039 --> 00:02:54,879
Now, what are the situations in which it rejects?

42
00:02:54,879 --> 00:03:07,239
Well, if it terminates in a state S, that's not one of the final or accepting states.

43
00:03:07,239 --> 00:03:12,439
Okay, so if it ends in any other state besides one of the accepting states, then it's going to reject.

44
00:03:12,439 --> 00:03:19,079
If the machine gets stuck, meaning it finds itself in a state,

45
00:03:19,080 --> 00:03:21,840
and there's no transition out of that state on the input.

46
00:03:21,840 --> 00:03:27,400
So in particular, let's say that it's in some state S, and the input is A, and there's no transition.

47
00:03:27,400 --> 00:03:32,840
There's no transition specified for state S on input A, so the machine can't move anywhere and it gets stuck.

48
00:03:32,840 --> 00:03:36,040
And that's also a rejecting state.

49
00:03:36,040 --> 00:03:41,439
And so in these two situations, if either it gets to the end of the input and is not in a final state,

50
00:03:41,439 --> 00:03:45,560
or if it never reaches the end of the input because it gets stuck,

51
00:03:45,560 --> 00:03:47,640
in both of those cases, it rejects the string.

52
00:03:47,639 --> 00:03:55,119
That string is not in the language of the finite automaton.

53
00:03:55,119 --> 00:03:57,879
Now, there's an alternative notation for finite automaton.

54
00:03:57,879 --> 00:04:00,279
I think is more intuitive, for example.

55
00:04:00,279 --> 00:04:04,879
And so we're going to emphasize that way of writing them out.

56
00:04:04,879 --> 00:04:10,679
In this notation, a state is represented as a node in a graph, which we just draw as a big circle.

57
00:04:10,719 --> 00:04:18,240
The start state is represented as a node that has an edge or an arrow into it with no source.

58
00:04:18,240 --> 00:04:24,199
So this is a transition into the node, but no source node that it comes from,

59
00:04:24,199 --> 00:04:26,840
and that indicates the unique start state.

60
00:04:26,840 --> 00:04:31,720
An accepting state is drawn as a node with just double circles like this.

61
00:04:31,720 --> 00:04:35,600
And finally, a transition is drawn as an edge between two nodes of the graph.

62
00:04:35,600 --> 00:04:40,160
So what this says is if I'm in this state that I'm circling in blue,

63
00:04:40,160 --> 00:04:50,480
and I read the input A, well, then I can move to this state at the tail of the arrow.

64
00:04:50,480 --> 00:04:52,000
So now let's do a simple example.

65
00:04:52,000 --> 00:04:57,480
Let's try to write out the automaton that accepts only the single digit one.

66
00:04:57,480 --> 00:05:05,720
So we'll need to start state, and we'll probably want an accepting state as well.

67
00:05:05,720 --> 00:05:08,320
And now the question is, what do we put in between the two?

68
00:05:08,319 --> 00:05:13,399
Well, there'll be some kind of a transition here, and it's a good guess that we should take that transition

69
00:05:13,399 --> 00:05:16,000
if the machine reads a one.

70
00:05:16,000 --> 00:05:21,040
And now let me take a moment here to talk about how the machines execute.

71
00:05:21,040 --> 00:05:22,360
So let's label these states.

72
00:05:22,360 --> 00:05:28,360
Let's call this state A, and let's call this state B.

73
00:05:28,360 --> 00:05:36,079
So the machine will have some input, and we can write that input out over here.

74
00:05:36,079 --> 00:05:40,800
So let's just say we have the single character one, and it begins in some state, namely the start state.

75
00:05:40,800 --> 00:05:49,039
And so one configuration of the machine is the state it is in, and the input.

76
00:05:49,039 --> 00:05:54,759
And typically we would indicate where it is in the input by just a pointer saying what position it is in the input.

77
00:05:54,759 --> 00:06:01,159
And the important thing to know about input in, for finite time, it's us that the input pointer always advances.

78
00:06:01,159 --> 00:06:03,680
So when we, or it only advances.

79
00:06:03,680 --> 00:06:09,800
So when we read a character of input, the input pointer moves to the right, and it never moves back.

80
00:06:09,800 --> 00:06:12,600
Alright, so from state A, we have a rule.

81
00:06:12,600 --> 00:06:14,600
We can see that we're in state A.

82
00:06:14,600 --> 00:06:19,000
The next input character is a one, and that allows us to take a transition to state B.

83
00:06:19,000 --> 00:06:23,480
And so now we're being state B, and where's our input pointer?

84
00:06:23,480 --> 00:06:27,160
Well, it's beyond the end of the input, indicating we are at the end of the input.

85
00:06:27,160 --> 00:06:33,319
And so now this is, we are in an accepting state, and we're past the end of the input.

86
00:06:33,319 --> 00:06:34,639
And so we accept.

87
00:06:36,719 --> 00:06:39,800
Okay, so let's do another execution.

88
00:06:39,800 --> 00:06:48,959
So we start in state A, and let's take as our input the string zero.

89
00:06:48,959 --> 00:06:54,000
Okay, and I'd like to draw the pointer, actually I should have drawn it before the input.

90
00:06:54,000 --> 00:06:58,519
So we'll always put the pointer between two input elements.

91
00:06:58,519 --> 00:07:02,079
In this case, and it's immediately to the left of the one we're about to read.

92
00:07:02,079 --> 00:07:03,560
So in this case, we're about to read zero.

93
00:07:03,560 --> 00:07:06,199
So we're in state A, our input is zero.

94
00:07:06,199 --> 00:07:07,959
We look at our machine.

95
00:07:07,959 --> 00:07:11,680
We see that there is no transition on zero.

96
00:07:11,680 --> 00:07:14,159
Alright, and so the machine stays stuck.

97
00:07:14,159 --> 00:07:19,079
It doesn't make any move at all, and this is our final configuration.

98
00:07:19,079 --> 00:07:24,079
And we can see that we're not at the end of the input, and so this is a reject.

99
00:07:26,919 --> 00:07:32,039
Okay, so in this case, the machine rejects that string as not being in the language of the machine.

100
00:07:33,040 --> 00:07:35,040
Let's do one more example.

101
00:07:35,040 --> 00:07:40,840
Let's say that we're in state, while we're always beginning in state A in the start state.

102
00:07:40,840 --> 00:07:46,400
And let's say our input this time is the string one zero.

103
00:07:46,400 --> 00:07:49,920
Okay, and our input pointer is there.

104
00:07:49,920 --> 00:07:57,840
Alright, so again, we're in state A, the input is a one, and so we'll move to state B.

105
00:07:57,879 --> 00:08:03,679
And now the input doesn't change just the input pointer changes, but I'll just copy the input over to show the difference.

106
00:08:03,679 --> 00:08:10,319
So now the input pointer has advanced because we've read one character of input, and now we're in another state.

107
00:08:10,319 --> 00:08:13,759
And now we can see that we're in state B.

108
00:08:13,759 --> 00:08:19,959
Our next input is zero, and there is no transition on zero from state B.

109
00:08:19,959 --> 00:08:25,799
And so even though we're in an accepting state, B is a final state is one of the accept states.

110
00:08:25,799 --> 00:08:27,519
We haven't consumed the entire input.

111
00:08:27,519 --> 00:08:31,279
And so this, the machine also rejects this string.

112
00:08:31,279 --> 00:08:33,519
So this is also a reject.

113
00:08:33,519 --> 00:08:55,519
And in general, we can talk about the language of a finite automata that is equal to the set of accepted strings.

114
00:08:55,519 --> 00:09:04,960
So the language of a finite automaton, when I talk about the language of a finite automaton, I mean the set of strings that the automaton accepts.

115
00:09:04,960 --> 00:09:06,759
So now let's do a more complex example.

116
00:09:06,759 --> 00:09:13,919
Let's try to write out an automaton that accepts any number of ones followed by a single zero.

117
00:09:13,919 --> 00:09:20,439
So once again, we'll need a start state, and we'll also need a final state.

118
00:09:20,440 --> 00:09:28,120
And now let's start by thinking about what the shortest string is that's in the language of this machine.

119
00:09:28,120 --> 00:09:32,040
So in this case, we know it has to end in a single zero.

120
00:09:32,040 --> 00:09:36,480
So a zero definitely has to be a zero transition has to be the last move.

121
00:09:36,480 --> 00:09:40,560
And before that zero can come any number of ones.

122
00:09:40,560 --> 00:09:42,640
And in particular, there could be no ones.

123
00:09:42,640 --> 00:09:48,640
So one transition in this machine is that from the start state, on input zero,

124
00:09:48,639 --> 00:09:55,439
we can definitely go to the final state because the string consisting of a single zero is in the language of this machine.

125
00:09:55,439 --> 00:10:01,159
And now the only question is how do we encode the fact that any number of ones can proceed this zero?

126
00:10:01,159 --> 00:10:03,199
Well, there's an easy way to do that.

127
00:10:03,199 --> 00:10:05,240
We can just add a self loop on the start state.

128
00:10:07,240 --> 00:10:09,759
And take that transition if we read a one.

129
00:10:09,759 --> 00:10:10,759
And what does this mean?

130
00:10:10,759 --> 00:10:13,879
This means that we'll stay in the start state as long as we're reading one.

131
00:10:13,879 --> 00:10:20,320
And then as soon as we read a zero, I will move to the final state because that has to be the end of the string.

132
00:10:20,320 --> 00:10:23,799
If this if the machine is going to accept it.

133
00:10:23,799 --> 00:10:27,519
So let's do a couple of examples to convince ourselves that this works.

134
00:10:27,519 --> 00:10:28,879
Let me label these states again.

135
00:10:28,879 --> 00:10:33,000
So this is state a and that state B.

136
00:10:33,000 --> 00:10:33,759
So.

137
00:10:37,039 --> 00:10:39,480
Let's write out here state and input.

138
00:10:40,480 --> 00:10:46,320
So we'll begin in state a and let's take as input 1 1 0.

139
00:10:46,320 --> 00:10:50,480
Okay, so let's do an accepting case first.

140
00:10:50,480 --> 00:10:55,320
Alright, so our input pointer begins to the left of the first character.

141
00:10:55,320 --> 00:10:58,600
So we're in state a start state, we're reading a one.

142
00:10:58,600 --> 00:11:02,279
And that says we should take a transition to put us back in state a.

143
00:11:02,279 --> 00:11:04,960
And so we advance the input pointer.

144
00:11:04,960 --> 00:11:07,280
Okay, now we've consumed the first one.

145
00:11:07,280 --> 00:11:10,400
And and again, we're in state a and the next input is a one.

146
00:11:10,400 --> 00:11:17,480
So we'll make another transition to state a and the input pointer will advance.

147
00:11:17,480 --> 00:11:21,000
Okay, so now we're in state a and the next input is a zero.

148
00:11:21,000 --> 00:11:24,519
And so we'll take the transition to be.

149
00:11:24,519 --> 00:11:26,400
And now we're in this configuration.

150
00:11:26,400 --> 00:11:29,560
So the input pointer has reached the end of the input.

151
00:11:29,560 --> 00:11:31,440
We're in an accepting state.

152
00:11:31,560 --> 00:11:37,360
And so the machine accepts 1 1 0 is in the language of this machine.

153
00:11:39,040 --> 00:11:42,600
So now let's do an example where we will reject the input.

154
00:11:45,400 --> 00:11:50,880
And what configuration do we begin in and again, a configuration for a finite automaton.

155
00:11:50,880 --> 00:11:55,360
That just means that you know, I point in the execution and it always consists of a state.

156
00:11:55,360 --> 00:11:58,520
And a position of the input pointer.

157
00:11:58,519 --> 00:12:03,519
So our initial state is a and now let's just choose the string.

158
00:12:03,519 --> 00:12:04,120
Oh, I don't know.

159
00:12:04,120 --> 00:12:07,799
Let's take 1 0 0.

160
00:12:07,799 --> 00:12:10,519
And let's confirm that this is not in the language of the machine.

161
00:12:11,639 --> 00:12:15,759
All right, so we begin in state a and our input pointer is there.

162
00:12:15,759 --> 00:12:20,759
Now we read a one and that means we'll, you know, so it's from state a transition of one.

163
00:12:20,759 --> 00:12:25,399
We stay in state a and the input pointer advances.

164
00:12:25,399 --> 00:12:26,399
And now we see a zero.

165
00:12:26,399 --> 00:12:29,639
So from state a and input zero, we make a transition to state b.

166
00:12:31,600 --> 00:12:32,840
Now the input pointer is here.

167
00:12:32,840 --> 00:12:41,360
So now we're in state b and we have an input of zero, but there is no transition out of b on zero.

168
00:12:41,360 --> 00:12:44,279
There are no transitions out of b at all.

169
00:12:44,279 --> 00:12:45,600
And so the machine gets stuck.

170
00:12:45,600 --> 00:12:47,439
It can't get to the end of the input.

171
00:12:47,439 --> 00:12:51,759
And again, even though we're in an accepting state, we haven't read the entire input yet.

172
00:12:51,759 --> 00:12:54,240
And so that means the machine will reject.

173
00:12:54,240 --> 00:12:58,480
And so 1 0 0 is not in the language of this machine.

