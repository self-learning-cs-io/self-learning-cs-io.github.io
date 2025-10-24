---
title: PrincetonAlgorithms P120Part214 02_introduction To Intractability
---

1
00:00:00,000 --> 00:00:08,160
Today we're going to talk about interactability in our last lecture.

2
00:00:08,160 --> 00:00:13,759
This is an appropriate topic to close the course on because it really lays out for us some

3
00:00:13,759 --> 00:00:17,039
of the big challenges of the future.

4
00:00:17,039 --> 00:00:21,559
Most people are taking this course because they're going to want to be involved with algorithms

5
00:00:21,559 --> 00:00:23,039
in the future.

6
00:00:23,039 --> 00:00:29,719
And this topic really helps us lay out what they had.

7
00:00:29,719 --> 00:00:38,119
As an introduction, we'll review some very basic questions about computation.

8
00:00:38,119 --> 00:00:41,399
Some of you may be familiar with this subject area.

9
00:00:41,399 --> 00:00:42,560
Others may not be at all.

10
00:00:42,560 --> 00:00:46,280
So it will just be a brief review in either case.

11
00:00:46,280 --> 00:00:51,879
But some of the concepts are relatively easy to understand.

12
00:00:51,879 --> 00:00:57,039
And so they lay a good background first starting with computation, with interactability.

13
00:00:57,039 --> 00:01:01,079
We need to think about computation itself first.

14
00:01:01,079 --> 00:01:06,879
And there are these kinds of questions that came up actually about the same time or even

15
00:01:06,879 --> 00:01:11,480
before computers actually were invented or came into use.

16
00:01:11,480 --> 00:01:13,039
What is a general purpose computer?

17
00:01:13,039 --> 00:01:14,960
What does that mean?

18
00:01:14,960 --> 00:01:18,560
Are there limits on the power of digital computers?

19
00:01:18,560 --> 00:01:20,960
That's another interesting question.

20
00:01:20,960 --> 00:01:26,120
Are there limits on the power of any machine that we can build?

21
00:01:26,120 --> 00:01:33,079
This kind of question was the outgrowth of similar questions on mathematics that were

22
00:01:33,079 --> 00:01:38,200
posed by David Hilbert in the beginning of the 20th century.

23
00:01:38,200 --> 00:01:44,360
And there were some very profound thinking going on around Hilbert's questions.

24
00:01:44,360 --> 00:01:50,640
And then later around the questions on computers that initially were related but then took

25
00:01:50,640 --> 00:01:54,520
on a new life of their own.

26
00:01:54,519 --> 00:02:00,840
Now to take a look at the idea of what these mathematicians were thinking about in the

27
00:02:00,840 --> 00:02:08,879
middle of the 20th century, recall the simple model of computation that we looked at when

28
00:02:08,879 --> 00:02:12,439
we were working with the Knuth-Morris Pratt algorithm.

29
00:02:12,439 --> 00:02:20,919
So what we did was we imagined a machine, an abstract machine called a discrete finite

30
00:02:20,919 --> 00:02:25,679
automaton or an FSA finite state of automaton.

31
00:02:25,679 --> 00:02:30,399
That is a very simple machine where we imagine that it's got a tape that has the input.

32
00:02:30,399 --> 00:02:32,879
That's just a long strip that's divided into cells.

33
00:02:32,879 --> 00:02:35,879
We've got a finite alphabet of symbols.

34
00:02:35,879 --> 00:02:43,000
And it had a tape head that could read one symbol from one cell of the tape and then based

35
00:02:43,000 --> 00:02:45,119
on what it saw it would move to a different state.

36
00:02:45,119 --> 00:02:49,079
It would move one cell at a time and read up all the tape, all the input.

37
00:02:49,080 --> 00:02:51,800
And I forgot to the right state would say it accepted.

38
00:02:51,800 --> 00:02:53,800
That's what we did with Knuth-Morris Pratt.

39
00:02:53,800 --> 00:03:00,520
We imagined this machine and then we built a program that constructed a table which just

40
00:03:00,520 --> 00:03:07,840
said what to do, which state to go to for each symbol on the tape for each state.

41
00:03:07,840 --> 00:03:12,720
And then that was a way that we got this problem solved.

42
00:03:13,719 --> 00:03:20,080
The natural question arises when mathematicians and theoretical computer scientists first started

43
00:03:20,080 --> 00:03:24,280
taking a look at abstract models of computation like this.

44
00:03:24,280 --> 00:03:26,120
Can you make them more powerful?

45
00:03:26,120 --> 00:03:30,759
Is there a more powerful model of computation than a DFA?

46
00:03:30,759 --> 00:03:36,639
Well it didn't take long to realize, of course, there's a more powerful model.

47
00:03:36,639 --> 00:03:40,520
And actually the progress was almost incremental.

48
00:03:40,520 --> 00:03:42,640
You could think of it as being almost incremental.

49
00:03:42,640 --> 00:03:46,240
We just add a little bit of power to the DFA.

50
00:03:46,240 --> 00:03:48,840
Now you can show that.

51
00:03:48,840 --> 00:03:53,600
That makes that more powerful, but what's the limit?

52
00:03:53,600 --> 00:04:03,600
And actually the limit was proposed very early on by Turing in here Princeton in the 1930s.

53
00:04:03,599 --> 00:04:11,859
It's a universal model of computation where just like the DFA, we imagine a machine that

54
00:04:11,859 --> 00:04:14,719
has a finite set of states.

55
00:04:14,719 --> 00:04:20,439
But instead of just reading the tape, it can write on the tape as well and it can move

56
00:04:20,439 --> 00:04:22,879
in both directions.

57
00:04:22,879 --> 00:04:28,480
So it can store intermediate results on the tape.

58
00:04:28,480 --> 00:04:35,600
But other than that, it's very similar to what we imagined for the FSA.

59
00:04:35,600 --> 00:04:41,280
And now the question is, is there a more powerful model of computation than this one?

60
00:04:41,280 --> 00:04:50,300
And the remarkable fact is that Turing, the answer to this question in the 1930s, actually

61
00:04:50,300 --> 00:04:56,000
did the work just before he got here to Princeton and then finished the paper, is that no,

62
00:04:56,000 --> 00:04:58,560
there's no more powerful model of computation.

63
00:04:58,560 --> 00:05:05,240
In fact, many have hailed this as the most important scientific result of the 20th century.

64
00:05:05,240 --> 00:05:11,319
Because it tells us really what we need to know about the power of the machines that we

65
00:05:11,319 --> 00:05:13,519
build.

66
00:05:13,519 --> 00:05:21,720
So with church who was Turing's advisor here at Princeton, we have the thesis that there's

67
00:05:21,720 --> 00:05:23,760
no more powerful machine.

68
00:05:23,760 --> 00:05:29,400
Turing machines can compute any function that can be computed by a physically harnessable

69
00:05:29,400 --> 00:05:31,960
process of a natural world.

70
00:05:31,960 --> 00:05:36,960
Now this is not a mathematical theorem because it's a statement about the natural world.

71
00:05:36,960 --> 00:05:42,880
It's not something that you can prove from basic principles, but it is something that you

72
00:05:42,880 --> 00:05:48,160
can falsify and run experiments and show it not to be true.

73
00:05:48,160 --> 00:05:55,920
And the whole idea behind this thesis and behind Turing's proof of our abstract models

74
00:05:55,920 --> 00:06:01,160
of computation is that, and we've seen it many, many times, we can use simulation to

75
00:06:01,160 --> 00:06:03,080
prove models equivalent.

76
00:06:03,080 --> 00:06:07,840
So we wrote a Java program to simulate a discrete finite automaton.

77
00:06:07,840 --> 00:06:12,440
That means that Java's at least as powerful as that.

78
00:06:12,439 --> 00:06:19,439
You can write people have shown you can write Turing machines that simulate the operation

79
00:06:19,439 --> 00:06:24,639
of store program computers like the ones that we use.

80
00:06:24,639 --> 00:06:28,920
Or if you use an iPhone and you're running an app that's written for the Android or vice

81
00:06:28,920 --> 00:06:33,959
versa, that's simulation that proves models or equivalents, demonstrates that models are

82
00:06:33,959 --> 00:06:34,959
equivalent.

83
00:06:34,959 --> 00:06:40,159
And that's been an extremely effective way for us to understand that different computers

84
00:06:40,159 --> 00:06:42,399
have similar capabilities.

85
00:06:42,399 --> 00:06:48,239
That you're not going to compute more by building some new machine.

86
00:06:48,239 --> 00:06:55,959
So these had profound implications and it's really amazing that Turing came up with this

87
00:06:55,959 --> 00:07:00,560
so long ago when I read it before, computers came into use at all.

88
00:07:00,560 --> 00:07:06,719
And it means that we don't have to try to invent a more powerful machine or language.

89
00:07:06,720 --> 00:07:13,440
And it really enables a rigorous study of the computation that we can expect to do in

90
00:07:13,440 --> 00:07:15,960
a natural world.

91
00:07:15,960 --> 00:07:19,400
So that's the basis for the theory of computation.

92
00:07:19,400 --> 00:07:27,360
And it's related to the study of algorithms because it gives us a simple and universal model

93
00:07:27,360 --> 00:07:28,680
of computation.

94
00:07:28,680 --> 00:07:32,640
But we haven't talked about efficiency.

95
00:07:32,639 --> 00:07:39,360
How long does it take a simulator on the Android to simulate an iPhone and so forth?

96
00:07:39,360 --> 00:07:41,759
So what about cost?

97
00:07:41,759 --> 00:07:42,759
What about time?

98
00:07:42,759 --> 00:07:46,120
That's been our focus when developing algorithms.

99
00:07:46,120 --> 00:07:52,519
And what we want to think about next is how to deal with that cost.

100
00:07:52,519 --> 00:07:58,079
But first, I just want to lay out the evidence that we have for the Church Turing thesis.

101
00:07:58,079 --> 00:08:04,800
It's been eight decades and nobody found a machine that can compute more than we've

102
00:08:04,800 --> 00:08:07,680
been computing with the machines that we have.

103
00:08:07,680 --> 00:08:12,399
And the other thing that was really convincing to the mathematicians in the mid-20th century

104
00:08:12,399 --> 00:08:18,240
is that people tried all different types of models of computation.

105
00:08:18,240 --> 00:08:22,639
There was a church was working on something called the Untiped Limb that calculus, which

106
00:08:22,639 --> 00:08:26,319
actually is the basis for modern programming languages.

107
00:08:26,319 --> 00:08:32,480
And there were other mathematicians working on recursive function theory and on grammars

108
00:08:32,480 --> 00:08:33,919
and other things.

109
00:08:33,919 --> 00:08:42,600
And eventually, essentially, they were all able to use these languages to express the formalism

110
00:08:42,600 --> 00:08:47,399
of another one and then therefore prove them to be all equivalent.

111
00:08:47,399 --> 00:08:52,159
And that comes in through to the modern day with all programming languages.

112
00:08:52,159 --> 00:08:58,000
You can write a simulator or compiler for one programming language and another or a different

113
00:08:58,000 --> 00:09:06,639
random access machine, simple machines like cellular automata and even computing using biological

114
00:09:06,639 --> 00:09:12,759
operations on DNA or quantum computers that you may have heard about.

115
00:09:12,759 --> 00:09:15,839
All of these things have turned out to be equivalent.

116
00:09:15,840 --> 00:09:24,240
So there's a lot of confidence that the church turned these as whole.

117
00:09:24,240 --> 00:09:26,040
But what about efficiency?

118
00:09:26,040 --> 00:09:30,800
So this is a similar starting point for the study of algorithms.

119
00:09:30,800 --> 00:09:34,600
What algorithms are useful in practice?

120
00:09:34,600 --> 00:09:40,639
So in order to know what useful we're going to consider time and we're going to say that

121
00:09:40,639 --> 00:09:47,480
it's an algorithm that it's not just that it's in theory would complete the problem

122
00:09:47,480 --> 00:09:53,639
and say it actually would solve the problem in other time that we have available.

123
00:09:53,639 --> 00:10:03,679
And just to set a dividing line, a clear, bright line, we're going to say is that we'll

124
00:10:03,679 --> 00:10:07,240
consider to be useful in practice or efficient.

125
00:10:07,240 --> 00:10:12,799
If it's running time, it's guaranteed to be bounded by some polynomial in the size

126
00:10:12,799 --> 00:10:15,919
of the input for all inputs.

127
00:10:15,919 --> 00:10:20,799
And for the purpose of this theory, we don't even care what the exponent is.

128
00:10:20,799 --> 00:10:23,440
It could be into the 100th.

129
00:10:23,440 --> 00:10:29,639
Now you might argue that's not a very useful dividing line, but it is a useful starting point.

130
00:10:29,639 --> 00:10:34,799
And as you'll see, even this starting point has told us a great deal about the kinds

131
00:10:34,799 --> 00:10:38,919
of algorithms that are useful in practice.

132
00:10:38,919 --> 00:10:47,719
And this work was started in the 50s, also here at Princeton.

133
00:10:47,719 --> 00:10:57,159
And many, many people looked at models for trying to understand what this meant.

134
00:10:57,159 --> 00:11:05,719
The dividing line is between polynomial, as I said, an exponential is a 2 to the

135
00:11:05,719 --> 00:11:09,759
nth power, some constant greater than 1 to the nth power.

136
00:11:09,759 --> 00:11:13,360
And we'll talk about that in just a second.

137
00:11:13,360 --> 00:11:15,600
So sorting is useful.

138
00:11:15,600 --> 00:11:20,039
It's running time is bounded by a polynomial.

139
00:11:20,039 --> 00:11:30,000
But here's another one, which is finding the best traveling salesperson tour on endpoints.

140
00:11:30,000 --> 00:11:35,360
If you're going to try all possible tours, that algorithm is not useful in practice because

141
00:11:35,360 --> 00:11:42,319
the n factorial is not bounded by a polynomial in an it's running time actually grows like

142
00:11:42,319 --> 00:11:44,399
n to the nth.

143
00:11:44,399 --> 00:11:50,919
So this is a useful starting point for our theory because it's very broad and robust.

144
00:11:50,919 --> 00:11:56,319
And if we can put some algorithms in the class with sorting and other algorithms in the class

145
00:11:56,319 --> 00:12:01,679
with traveling salesperson using brute brute force search, that's going to be useful.

146
00:12:01,679 --> 00:12:04,519
It'll tell us which algorithms we want to use.

147
00:12:04,519 --> 00:12:08,519
We definitely can use the think about using the first, but we can't think about using the

148
00:12:08,519 --> 00:12:11,960
second.

149
00:12:11,960 --> 00:12:18,080
And actually, unlike touring machines where we wouldn't actually contemplate using a

150
00:12:18,080 --> 00:12:23,840
touring machine to solve a practical problem in this theory, it's often the case that

151
00:12:23,840 --> 00:12:29,840
polynomial time algorithms will scale to help us solve large problems because the constants

152
00:12:29,840 --> 00:12:32,840
usually tend to be small.

153
00:12:32,840 --> 00:12:37,519
But the key is the idea of exponential growth.

154
00:12:37,519 --> 00:12:44,439
And I just want to be sure to convince everybody that it's not about when it comes to exponential

155
00:12:44,439 --> 00:12:47,159
growth, it's not about the technology.

156
00:12:47,159 --> 00:12:52,079
That is a dividing line that no matter how fast your computer is, you can't be running

157
00:12:52,079 --> 00:12:56,240
an exponential algorithm and expect to be solving a large problem.

158
00:12:56,240 --> 00:13:00,279
And just a thought experiment to re-convince everybody of that.

159
00:13:00,279 --> 00:13:06,720
So let's suppose that imagine that we had a huge giant parallel computing device.

160
00:13:06,720 --> 00:13:14,720
This thing is so big that it's got as many processors as there are electrons in the universe.

161
00:13:14,720 --> 00:13:18,560
So we have a supercomputer on every electron.

162
00:13:18,560 --> 00:13:24,080
And we'll put the most powerful supercomputer we can imagine today on every electron in

163
00:13:24,080 --> 00:13:25,759
the universe.

164
00:13:25,759 --> 00:13:32,480
And then we'll also run each processor for the life time, estimated lifetime of the universe.

165
00:13:32,480 --> 00:13:35,200
So how big a problem can we solve?

166
00:13:35,200 --> 00:13:41,080
Well, it's estimated there's 10 to the 79 electrons in the universe in supercomputers

167
00:13:41,080 --> 00:13:42,080
nowadays.

168
00:13:42,080 --> 00:13:45,560
Maybe we can do 10 to the 13th instructions per second.

169
00:13:45,560 --> 00:13:50,120
And you can quote about these numbers and make it 10 to the 20th if you want.

170
00:13:50,120 --> 00:13:53,120
It's estimated the age of the universe in seconds is 10 to the 17th.

171
00:13:53,120 --> 00:13:56,560
And if you don't like that, make it 10 to the 30th.

172
00:13:56,560 --> 00:14:00,240
You multiply all those numbers together.

173
00:14:00,240 --> 00:14:07,600
We're going to get a relatively small number to say 1,000 factorial.

174
00:14:07,600 --> 00:14:15,560
10 to the 17th times 10 to the 17th times 10 to the 79th is only 10 to the 10 to the 109th

175
00:14:15,560 --> 00:14:16,560
or something.

176
00:14:16,560 --> 00:14:20,200
Where's 1,000 factorial is way bigger than 10 to the 1000th?

177
00:14:20,200 --> 00:14:23,200
It's more like 1,000 to the 1000th.

178
00:14:23,200 --> 00:14:29,560
So there's no way that you can imagine solving 1,000 city TSP problem using that brute force

179
00:14:29,559 --> 00:14:30,559
algorithm.

180
00:14:30,559 --> 00:14:35,000
You can let your computer run, but it's not going to finish.

181
00:14:35,000 --> 00:14:38,119
Technology is out of the picture when we have exponential growth.

182
00:14:38,119 --> 00:14:42,479
So that's why it's so important to know which algorithms are going to require exponential

183
00:14:42,479 --> 00:14:44,959
time and which ones aren't.

184
00:14:44,959 --> 00:14:52,319
In this theory, it would seem, let's at least get that classification done.

185
00:14:52,319 --> 00:14:54,159
So which problems can we solve in practice?

186
00:14:54,159 --> 00:14:58,759
We're just going to say that the polynomial time algorithms are the ones that we can solve

187
00:14:58,759 --> 00:15:03,159
in practice and that guaranteed polynomial time performance.

188
00:15:03,159 --> 00:15:08,799
So that brings us right to the question which problems have polynomial time algorithms.

189
00:15:08,799 --> 00:15:13,879
And unfortunately, it's not so easy to know that.

190
00:15:13,879 --> 00:15:19,600
It's stuck right away on trying to do that classification.

191
00:15:19,600 --> 00:15:25,399
And that's what today's lecture is all about.

192
00:15:25,399 --> 00:15:34,319
So this is a similar bird's eye view to when we introduced a classifying algorithms when

193
00:15:34,319 --> 00:15:35,519
we were talking about reduction.

194
00:15:35,519 --> 00:15:39,840
And reduction is a very important tool in this theory as well.

195
00:15:39,840 --> 00:15:44,279
So what we're going to say is a problem is interactable if you can't guarantee the

196
00:15:44,279 --> 00:15:46,919
insolven polynomial time.

197
00:15:46,919 --> 00:15:51,199
So what we want to do is prove that a problem is interactable.

198
00:15:51,200 --> 00:15:57,400
There have been a couple of problems that have been proven to require exponential times.

199
00:15:57,400 --> 00:16:00,200
But they're a bit artificial.

200
00:16:00,200 --> 00:16:02,080
Well, so here's one.

201
00:16:02,080 --> 00:16:08,120
Given the constant size program, does it halt in at most case steps?

202
00:16:08,120 --> 00:16:11,040
Or is another one given an N by N checkers board?

203
00:16:11,040 --> 00:16:15,160
Can the first player force a win if you have the force capture rule?

204
00:16:15,159 --> 00:16:21,319
Well, N by N checkers board for large N is again, that's certainly a toy problem.

205
00:16:21,319 --> 00:16:26,639
But for many of the real problems that we actually would write this like the solve, unfortunately,

206
00:16:26,639 --> 00:16:32,279
there's been very few successes in proving that a problem is interactable.

207
00:16:32,279 --> 00:16:37,659
So even though it would seem that you should be able to be able to separate problems that

208
00:16:37,659 --> 00:16:43,240
can guarantee polynomial time solutions from problems that require exponential times for

209
00:16:43,240 --> 00:16:44,959
some input.

210
00:16:44,960 --> 00:16:49,200
And there's been very little success in proving that.

211
00:16:49,200 --> 00:16:52,680
But that's an introduction and a motivation for the theory of interactability.

