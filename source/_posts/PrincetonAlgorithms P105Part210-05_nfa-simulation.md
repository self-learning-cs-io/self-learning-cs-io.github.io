---
title: PrincetonAlgorithms P105Part210 05_nfa Simulation
---

1
00:00:00,000 --> 00:00:09,000
First, we're going to look at the process of simulating the operation of an NFA.

2
00:00:09,000 --> 00:00:14,000
In order to do that, we have to look at the representation.

3
00:00:14,000 --> 00:00:21,000
So, for state names, we're just going to use the integers from 0 to M.

4
00:00:21,000 --> 00:00:26,000
And those are just indexes into the regular expression string,

5
00:00:26,000 --> 00:00:29,000
with one extra one for the except state.

6
00:00:29,000 --> 00:00:35,000
So, if the RE has M characters, we've got M plus 1 states.

7
00:00:35,000 --> 00:00:38,000
And then we've got the match transitions.

8
00:00:38,000 --> 00:00:45,000
So, we'll just keep the regular expression in an array.

9
00:00:45,000 --> 00:00:55,000
And then for characters that are not meta characters that are just characters from the alphabet,

10
00:00:55,000 --> 00:01:00,000
there's a match transition just to the next element, just add 1.

11
00:01:00,000 --> 00:01:05,000
So, that's an implicit representation of the match transitions.

12
00:01:05,000 --> 00:01:09,000
And then the next thing is the epsilon transitions.

13
00:01:09,000 --> 00:01:15,000
So, since there might be multiple edges leaving from any given state,

14
00:01:15,000 --> 00:01:19,000
and it's directed, it always says go from this state to another one,

15
00:01:19,000 --> 00:01:22,000
we'll use a directed graph.

16
00:01:22,000 --> 00:01:27,000
So, we just have a bunch of edges with given vertex names.

17
00:01:27,000 --> 00:01:31,000
And that's convenient. That's what we use for our graph processing algorithms,

18
00:01:31,000 --> 00:01:34,000
was indexes for vertex names.

19
00:01:34,000 --> 00:01:42,000
So, this is totally well suited to building a di-graph using the basic di-graph processing methods

20
00:01:42,000 --> 00:01:45,000
that we talked about when doing graph processing.

21
00:01:45,000 --> 00:01:48,000
So, that's the representation.

22
00:01:48,000 --> 00:01:57,000
And then given that representation, it's very straightforward to find out for any state,

23
00:01:57,000 --> 00:02:00,000
what of the possible next state.

24
00:02:00,000 --> 00:02:03,000
If it's got a character in the possible next state,

25
00:02:03,000 --> 00:02:06,000
it's the match character angle up one.

26
00:02:06,000 --> 00:02:14,000
Otherwise, it's the vertices that are pointed to by the edges in its adjacency list,

27
00:02:14,000 --> 00:02:17,000
those of the epsilon transitions.

28
00:02:17,000 --> 00:02:24,000
So, let's take a look at just given that basic idea that we can always get to the transitions

29
00:02:24,000 --> 00:02:28,000
from any given state how we're going to do a simulation.

30
00:02:28,000 --> 00:02:35,000
And so, the idea is summarized by this diagram here.

31
00:02:35,000 --> 00:02:43,000
What we're going to do is, at every step, each text character that the machine does read,

32
00:02:43,000 --> 00:02:49,000
we're going to keep track of the set of all possible states where the NFA could be

33
00:02:49,000 --> 00:02:52,000
after reading in the i-text character.

34
00:02:52,000 --> 00:02:57,000
So, say we've done that, and this is just a schematic.

35
00:02:57,000 --> 00:03:03,000
So, there's a bunch of states that we could get to after reading i-characters.

36
00:03:03,000 --> 00:03:10,000
Now, in some of those states, they are labeled with characters.

37
00:03:10,000 --> 00:03:16,000
And if that character matches our text character, they can take us to another state.

38
00:03:16,000 --> 00:03:19,000
So, say in this case, there's three of them that matches.

39
00:03:19,000 --> 00:03:24,000
And the other one has a medic character or a different character,

40
00:03:24,000 --> 00:03:27,000
and it couldn't take us to another state.

41
00:03:27,000 --> 00:03:35,000
So, that gives us all the possible states that you could be in just after reading the i-plus for a symbol.

42
00:03:35,000 --> 00:03:43,000
And now, what we do is take a look at the possible naltransitions that we could go to from those states.

43
00:03:43,000 --> 00:03:46,000
And that might take us to lots of other states.

44
00:03:46,000 --> 00:03:48,000
But that's all the machine could do.

45
00:03:48,000 --> 00:03:53,000
It could read a character, and then it can take a bunch of naltransitions.

46
00:03:53,000 --> 00:04:01,000
But that's all it knows how to do, and that'll give us all the possible states that it could be in after reading i-plus-1 symbols.

47
00:04:01,000 --> 00:04:05,000
And then we just continue in that from everyone of those states.

48
00:04:05,000 --> 00:04:10,000
Some of them match the character, match the character, and then look at all the epsilon transitions.

49
00:04:10,000 --> 00:04:21,000
So, that's the basic idea is to simply keep track of all possible states the NFA could be in after reading the first i-text characters.

50
00:04:21,000 --> 00:04:29,000
So, the only thing that's complicated is how do we get all the states that we could reach by epsilon transitions.

51
00:04:29,000 --> 00:04:33,000
And we'll look at that in just a second. It's actually very straightforward.

52
00:04:33,000 --> 00:04:36,000
But let's look at a demo first.

53
00:04:36,000 --> 00:04:42,000
So, this is our machine for a star b or a c followed by d.

54
00:04:42,000 --> 00:04:49,000
And let's suppose it has this input. So, let's do this demo.

55
00:04:49,000 --> 00:04:52,000
Okay, so we're going to check if the input matches the pattern.

56
00:04:52,000 --> 00:04:56,000
We're going to start the machine in state zero.

57
00:04:56,000 --> 00:05:01,000
And so, the zeroes of the states you could reach from the start.

58
00:05:01,000 --> 00:05:09,000
And then now we want to get to all the states that you could reach by epsilon transitions from the start.

59
00:05:09,000 --> 00:05:13,000
And so, there's a bunch of them. So, we could go to one.

60
00:05:13,000 --> 00:05:20,000
And from one, we could get to go to two or six. From two, we could go to three. From three, we could go to two or four.

61
00:05:20,000 --> 00:05:26,000
So, we can get to all of those places from the start without scanning a single character.

62
00:05:26,000 --> 00:05:30,000
So, zero, one, two, three, four, and six.

63
00:05:30,000 --> 00:05:35,000
The machine could be in any one of those states before it scans a single character.

64
00:05:35,000 --> 00:05:38,000
So, that's where it could be after zero characters.

65
00:05:38,000 --> 00:05:41,000
But what about now after the first character?

66
00:05:41,000 --> 00:05:47,000
Well, out of those states, only two and six involved matching an a.

67
00:05:47,000 --> 00:05:53,000
So, the only thing that could happen next to the machine could do next is to read the a.

68
00:05:53,000 --> 00:05:56,000
Either state two or state six.

69
00:05:56,000 --> 00:05:59,000
And those are going to be matched transitions.

70
00:05:59,000 --> 00:06:06,000
So, in the first case, it goes to three. And in the second case, it goes to seven.

71
00:06:06,000 --> 00:06:10,000
So, the state of states, it can be reachable just after matching the a.

72
00:06:10,000 --> 00:06:13,000
It's just three and seven.

73
00:06:13,000 --> 00:06:17,000
But now from those states, it might get somewhere with epsilon transitions.

74
00:06:17,000 --> 00:06:20,000
We have to look at the epsilon transition graph.

75
00:06:20,000 --> 00:06:25,000
And what states could it go to from epsilon transitions from these two?

76
00:06:25,000 --> 00:06:33,000
Well, from three, seven is nowhere to go. And from three, it can go either to two or four.

77
00:06:33,000 --> 00:06:35,000
From two, it could go back to three.

78
00:06:35,000 --> 00:06:42,000
So, the total number of states that it could be after matching a is two, three, four, and seven.

79
00:06:43,000 --> 00:06:48,000
And so, that's one step. We've matched one character.

80
00:06:48,000 --> 00:06:55,000
And we have kept track of all possible states the machine could be in after matching that character.

81
00:06:55,000 --> 00:06:57,000
Now, what about the next character?

82
00:06:57,000 --> 00:06:59,000
And you see, these four states take us all different ways.

83
00:06:59,000 --> 00:07:02,000
You could have an a, a, b, or a c next, and it could get somewhere.

84
00:07:02,000 --> 00:07:04,000
But it happens we have an a.

85
00:07:04,000 --> 00:07:08,000
And the only one of these states that matches an a is two.

86
00:07:09,000 --> 00:07:16,000
So, after matching the second a, the only place it could get to is three.

87
00:07:16,000 --> 00:07:20,000
And so, now we have only one state to work with.

88
00:07:20,000 --> 00:07:25,000
But where could we get with via epsilon transitions from three?

89
00:07:25,000 --> 00:07:31,000
And so, well, you can go from three to four or two while we did this before and then from two back to three.

90
00:07:31,000 --> 00:07:36,000
So, we could be in two, three or four after matching two ways.

91
00:07:37,000 --> 00:07:42,000
So, that's all the possible states we could be in after matching the two a's.

92
00:07:42,000 --> 00:07:46,000
Now, what's next is the b, only state four matches the b.

93
00:07:46,000 --> 00:07:51,000
So, the only place we could be right after matching the b is in state five.

94
00:07:51,000 --> 00:07:56,000
And that's after matching the b, now what about epsilon transitions?

95
00:07:56,000 --> 00:08:03,000
Well, state five has an epsilon transition to state eight.

96
00:08:04,000 --> 00:08:09,000
So, we could take that one and eight's got one to nine.

97
00:08:09,000 --> 00:08:18,000
So, it could be in either five, eight, or nine after matching a a b and then following all the epsilon transitions.

98
00:08:18,000 --> 00:08:23,000
But it's really important to keep in mind there's no other state the machine could be in.

99
00:08:23,000 --> 00:08:27,000
It doesn't have any other way to get through after matching a a b.

100
00:08:27,000 --> 00:08:30,000
It couldn't get to state seven or six or two.

101
00:08:30,000 --> 00:08:33,000
Those are the only possible states it could be in.

102
00:08:33,000 --> 00:08:40,000
And since we're each time progressing through the input, now we're making progress to the end for sure.

103
00:08:40,000 --> 00:08:49,000
So, now to finish up this example, the only state out of those three that matches d is state nine.

104
00:08:49,000 --> 00:08:57,000
And so, that's a match transition that reads the d and the only place you could be after matching a a b d is state ten.

105
00:08:57,000 --> 00:09:00,000
And then now we follow epsilon transitions.

106
00:09:00,000 --> 00:09:05,000
And that epsilon transition could take us to eleven.

107
00:09:05,000 --> 00:09:10,000
So, the only place the machine could be after matching a a b d is ten or eleven.

108
00:09:10,000 --> 00:09:18,000
Now, our condition on whether we accept the string or not is whether we could get to the accept state.

109
00:09:18,000 --> 00:09:26,000
And in this case, we could, it is possible for the machine to get from zero to the accept state and read all the input characters.

110
00:09:26,000 --> 00:09:35,000
So, that simulation is a proof that the machine accepts the input a a b d.

111
00:09:35,000 --> 00:09:43,000
We simulated its operation all possible ways and we managed to find the accept state.

112
00:09:43,000 --> 00:09:51,000
Of course, if we tried some input that the machine doesn't recognize, we'd get stuck somewhere and either not get through the input,

113
00:09:51,000 --> 00:09:54,000
or have no possible states it could be in.

114
00:09:54,000 --> 00:10:00,000
And that would be approved that it does not accept since we try all possibilities.

115
00:10:00,000 --> 00:10:05,000
So, the only thing that's complicated in this computation is reachability.

116
00:10:05,000 --> 00:10:12,000
But actually, from our study of the digraphs, this is one of the simplest problems that we discussed.

117
00:10:12,000 --> 00:10:15,000
What we really discussed was single source reachability.

118
00:10:15,000 --> 00:10:21,000
That is, given the source, can you find all vertices that are reachable from that source?

119
00:10:21,000 --> 00:10:24,000
And that was depth-first search.

120
00:10:24,000 --> 00:10:28,000
So, we had very simple depth-first search.

121
00:10:28,000 --> 00:10:39,000
But also, in that API, we put vertices reachable from a set of sources, so an iterable of sources.

122
00:10:40,000 --> 00:10:51,000
And so, can we get what we really need is all vertices reachable from a given source, from a source set of vertices.

123
00:10:51,000 --> 00:10:59,000
And it's easy using DFS. You just run it from each of the sources and you don't unmark the ones that you get to.

124
00:10:59,000 --> 00:11:07,000
And that stops DFS from revisiting any vertices and it marks all the vertices that you can get to from that set.

125
00:11:07,000 --> 00:11:13,000
So, it's just a simple extension of our DFS implementation.

126
00:11:13,000 --> 00:11:20,000
It's going to run in time proportional to the number of edges plus and over vertices in the digraph.

127
00:11:20,000 --> 00:11:24,000
And it's a very simple computation, digraph reachability.

128
00:11:24,000 --> 00:11:30,000
So, given that capability, which we discussed in graph processing,

129
00:11:30,000 --> 00:11:38,000
the implementation of the NFA simulation is very straightforward.

130
00:11:38,000 --> 00:11:44,000
So, this is a data type that implements the NFA.

131
00:11:44,000 --> 00:11:51,000
So, we have a constructor that takes regular expression as its argument.

132
00:11:51,000 --> 00:11:56,000
And it's going to build the NFA.

133
00:11:56,000 --> 00:12:05,000
And it's got a method to build the digraph that we'll talk about later.

134
00:12:05,000 --> 00:12:15,000
But it's also got a client method recognizes where the client can after the NFA is constructed.

135
00:12:15,000 --> 00:12:25,000
It can take a text string and return true or false by simulating the operation.

136
00:12:25,000 --> 00:12:31,000
So, we'll take a look at the building the digraph in a second.

137
00:12:31,000 --> 00:12:42,000
But the one that we're talking about now is simulating the operation of the NFA once it's built for a given text string.

138
00:12:42,000 --> 00:12:45,000
And this is the complete code.

139
00:12:45,000 --> 00:12:51,000
And it expresses in code what we talked about in English during the demo.

140
00:12:51,000 --> 00:12:59,000
It's amazingly compact implementation of this idea of simulating the operation of an NFA.

141
00:12:59,000 --> 00:13:05,000
So, we keep a bag of integers or set of integers called PC.

142
00:13:05,000 --> 00:13:08,000
That's kind of like program counter.

143
00:13:08,000 --> 00:13:15,000
So, that's the set of all possible states that the NFA could be in.

144
00:13:15,000 --> 00:13:21,000
So, we build a DFS from our F-Land transition graph.

145
00:13:21,000 --> 00:13:30,000
So, the first thing that we do is do it a...

146
00:13:30,000 --> 00:13:34,000
For...

147
00:13:34,000 --> 00:13:43,000
We put on to the PC all the states that you can get to from state zero.

148
00:13:43,000 --> 00:13:49,000
So, that's build a DFS that marks all the states you can get to from state zero.

149
00:13:49,000 --> 00:13:52,000
And then go through and put all of the states onto the PC.

150
00:13:52,000 --> 00:14:00,000
So, that's our starting point is all the places that you get to via epsilon transitions from state zero.

151
00:14:00,000 --> 00:14:09,000
So, now during the execution of this for loop, PC is the thing that we have.

152
00:14:09,000 --> 00:14:13,000
All the states you can reach after scanning past the I-the character.

153
00:14:13,000 --> 00:14:16,000
So, we initialize for the zero character.

154
00:14:16,000 --> 00:14:20,000
And then all we do is for every one of those states,

155
00:14:20,000 --> 00:14:24,000
well, first thing we do is test if we reach the accept state.

156
00:14:24,000 --> 00:14:29,000
If we reach the accept state, we're going to have nothing...

157
00:14:29,000 --> 00:14:32,000
We're going to claim we have nothing left to do.

158
00:14:33,000 --> 00:14:47,000
If we have a match, that is, if the character in the RE at that state position matches our I-the-the-tex character,

159
00:14:47,000 --> 00:14:51,000
then we're going to keep another set of possible states called match.

160
00:14:51,000 --> 00:14:55,000
So, those are the ones you can get to just after matching a text character.

161
00:14:55,000 --> 00:14:58,000
And so, we'll just add B plus one.

162
00:14:58,000 --> 00:15:02,000
So, if we find a matching character at B, we just go to B plus one.

163
00:15:02,000 --> 00:15:05,000
That's the implicit match transition.

164
00:15:05,000 --> 00:15:11,000
And here we'll throw in don't care because it's so easy to do after regular expressions as I don't care

165
00:15:11,000 --> 00:15:14,000
what character matches, then throw that one and two.

166
00:15:14,000 --> 00:15:19,000
So, this just adds don't care to the implementation.

167
00:15:19,000 --> 00:15:27,000
And so, we do that for all states in our PC and the states that we could be in

168
00:15:27,000 --> 00:15:37,000
just before, just while looking at the I-the-tex character, if we have a match, then we put the next states into match.

169
00:15:37,000 --> 00:15:44,000
So, now, what we have to do is follow the epsilon transitions from match.

170
00:15:44,000 --> 00:15:55,000
So, now we build another DFS, which gives us marks all the states that you could reach by starting with any of the states in match.

171
00:15:55,000 --> 00:15:58,000
And now, we'll rebuild a new PC.

172
00:15:58,000 --> 00:16:04,000
We'll just set Bc to a new bag and put all the marked states for that search.

173
00:16:04,000 --> 00:16:10,000
So, those are all the ones that you could get to via epsilon transitions right after a match and put that in the PC.

174
00:16:10,000 --> 00:16:21,000
Now, we have a new PC and we've read the I-the-te character and we go to the I-plus-first character and simply continue.

175
00:16:21,000 --> 00:16:32,000
So, when we're done with all of the text, then we can test if we made it to the accept state.

176
00:16:32,000 --> 00:16:38,000
That is, if any of the states in our current set of states is the accept state, we return true.

177
00:16:38,000 --> 00:16:42,000
And if we didn't get to the accept state, after all of that, we return false.

178
00:16:42,000 --> 00:17:03,000
Very compact code that takes advantage of our implementation of reachability for diagrams in a reasonable way to simulate the operation of an NFA by keeping track of all reachable states.

179
00:17:04,000 --> 00:17:24,000
So, what about the analysis? Well, it's easy to see that the not difficult to see that if our text is N characters and we have an M character pattern, the worst that could happen is that we take time proportional to M times N.

180
00:17:25,000 --> 00:17:36,000
And that's just because for every one of the characters, we have a set of states and set of all possible states and we iterate through that set of possible states a few times.

181
00:17:36,000 --> 00:17:40,000
We even run DFS on it, but that's linear.

182
00:17:40,000 --> 00:17:53,000
And there's the extra point that the number of edges that we have is less than 3M. No node has more than 3 edges leaving it.

183
00:17:53,000 --> 00:18:03,000
So, the total amount of time for each character is proportional to M and there's M characters, so there are any times proportional to M times N.

184
00:18:03,000 --> 00:18:06,000
That's the cost of the simulation.

185
00:18:06,000 --> 00:18:12,000
Of course, a lot of times the size of the set of the states is much smaller than that.

186
00:18:12,000 --> 00:18:19,000
So, in many real world problems, it's closer to linear. That's an NFA simulation.

187
00:18:23,000 --> 00:18:24,000
So, we have a set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and set of states and

