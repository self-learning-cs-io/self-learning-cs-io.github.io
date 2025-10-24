---
title: PrincetonAlgorithms P124Part214 06_np Completeness
---

1
00:00:00,000 --> 00:00:10,400
Now we're going to look at NP completeness, which is another idea that gives us even stronger

2
00:00:10,400 --> 00:00:17,679
evidence that the problems that we can reduce that to are difficult.

3
00:00:17,679 --> 00:00:21,160
NP completeness is a simple idea.

4
00:00:21,160 --> 00:00:23,760
It sounds almost crazy.

5
00:00:23,760 --> 00:00:27,080
It's asking for a lot.

6
00:00:27,079 --> 00:00:36,280
And NP problem is NP complete if every single problem in NP polynomial time reduces to that

7
00:00:36,280 --> 00:00:37,280
problem.

8
00:00:37,280 --> 00:00:42,119
That sounds like a fairly abstract concept.

9
00:00:42,119 --> 00:00:49,599
But in 1970s, right about the same time that carp was working, cook proved, just before

10
00:00:49,599 --> 00:00:57,039
actually, cook proved, and later 11, a few years later independently, that SAT is

11
00:00:57,039 --> 00:01:00,519
NP complete.

12
00:01:00,519 --> 00:01:06,120
Every problem in NP polynomial time reduces to SAT.

13
00:01:06,120 --> 00:01:10,480
Now that has profound implications that I'll talk about on the next slide.

14
00:01:10,480 --> 00:01:15,599
But first, let's take a look at cook leaven theorem.

15
00:01:15,599 --> 00:01:18,319
This is an extremely brief proof sketch.

16
00:01:18,319 --> 00:01:26,000
But the idea of a theorem is I can describe the idea of a theorem, the execution of it,

17
00:01:26,000 --> 00:01:32,000
the derivative force in both cases, but the idea I can describe.

18
00:01:32,000 --> 00:01:38,280
So a problem in NP is one that can be solved in polynomial time by a non-deterministic

19
00:01:38,280 --> 00:01:39,280
turning machine.

20
00:01:39,280 --> 00:01:42,760
Well, what's a non-deterministic turning machine, exactly?

21
00:01:42,760 --> 00:01:48,519
Well, it's just a set of states and symbols.

22
00:01:48,519 --> 00:01:53,159
If you in a table, basically, that says if you have a certain symbol in a certain state,

23
00:01:53,159 --> 00:01:55,159
you go to another state.

24
00:01:55,159 --> 00:02:00,519
So actually, in actually at the beginning, the way mathematicians thought of turning machines

25
00:02:00,519 --> 00:02:09,759
is now with diagrams, but just as a couple says a list of every state is a list of other

26
00:02:09,759 --> 00:02:14,159
states and symbols and things, just following certain rules.

27
00:02:14,159 --> 00:02:20,960
So description of a turning machine is a formal description of a bunch of rules, logically

28
00:02:20,960 --> 00:02:24,960
saying what happens and there's not much that happens.

29
00:02:24,960 --> 00:02:29,159
If you're in a state, you see a symbol, go to another state, move the tape head and so

30
00:02:29,159 --> 00:02:32,520
forth, a simple formal rule.

31
00:02:32,520 --> 00:02:41,159
So what the cook found was that anything that you can compute with a non-deterministic

32
00:02:41,159 --> 00:02:47,080
turning machine, anything that you can compute, you can write down a non-deterministic

33
00:02:47,080 --> 00:02:49,320
turning machine for it.

34
00:02:49,320 --> 00:02:55,900
And what cook found was a way to encode a non-deterministic turning machine as an instance

35
00:02:55,900 --> 00:02:58,640
of SAT.

36
00:02:58,640 --> 00:03:00,720
And so what does that mean?

37
00:03:00,720 --> 00:03:05,000
It's just writing down what a turning machine is in kind of different notation as an instance

38
00:03:05,000 --> 00:03:06,000
of SAT.

39
00:03:06,000 --> 00:03:07,600
And what does that apply?

40
00:03:07,600 --> 00:03:14,000
Well, if you could solve that instance of SAT in polynomial time, you're simulating

41
00:03:14,000 --> 00:03:19,000
the operation of that turning machine and you could solve the computation of that turning

42
00:03:19,000 --> 00:03:22,159
machine trying to do in polynomial time.

43
00:03:22,159 --> 00:03:26,759
That's the sketch of the cook leaven theorem.

44
00:03:26,759 --> 00:03:32,360
Anything that you can compute in a non-deterministic turning machine in polynomial time, you can

45
00:03:32,360 --> 00:03:37,120
write as a SAT instance that you could solve in polynomial time.

46
00:03:37,120 --> 00:03:41,199
If you could solve the SAT instance quickly, you can do the non-deterministic turning machine

47
00:03:41,199 --> 00:03:42,560
computation quickly.

48
00:03:42,560 --> 00:03:47,800
So any problem in NP polynomial time reduces to SAT.

49
00:03:47,800 --> 00:03:50,560
That's the cook leaven theorem.

50
00:03:50,560 --> 00:04:01,039
And if you combine that, which was done immediately with Carp's observation, first of all, it means

51
00:04:01,039 --> 00:04:08,599
that there's a polynomial time algorithm for SAT if and only if P equals NP.

52
00:04:08,599 --> 00:04:13,159
So that is not, if only if non-deterministic turns of in health, do you have the polynomial

53
00:04:13,159 --> 00:04:15,799
time algorithm for SAT?

54
00:04:15,799 --> 00:04:21,360
Because polynomial time algorithm for SAT immediately means you could solve all problems

55
00:04:21,360 --> 00:04:23,399
in NP in polynomial time.

56
00:04:23,399 --> 00:04:27,000
That's what cook leaven theorem is about.

57
00:04:27,000 --> 00:04:34,719
So NP completes getting into the popular culture as well.

58
00:04:34,720 --> 00:04:36,160
And what is the implications?

59
00:04:36,160 --> 00:04:43,440
It means all of these thousands and thousands of problems, all of a sudden reduced to SAT.

60
00:04:43,440 --> 00:04:48,480
And that means they're all equivalent.

61
00:04:48,480 --> 00:04:53,320
They're all manifestations of the same problem.

62
00:04:53,320 --> 00:04:58,080
If you could solve any one of these problems in polynomial time, then it means that you

63
00:04:58,080 --> 00:05:00,920
could solve them all in polynomial time.

64
00:05:00,920 --> 00:05:07,680
That's a very profound result, particularly because thousands and thousands and thousands

65
00:05:07,680 --> 00:05:16,480
of important scientific problems, all the problems that we aspire to compute with feasible

66
00:05:16,480 --> 00:05:17,480
algorithms.

67
00:05:17,480 --> 00:05:20,600
They're all in the same class.

68
00:05:20,600 --> 00:05:25,160
If we could solve any one of them in polynomial time, we could solve all of them in polynomial

69
00:05:25,160 --> 00:05:27,160
time.

70
00:05:27,160 --> 00:05:31,120
So what are the implications of NP completeness?

71
00:05:31,120 --> 00:05:39,400
So it's the idea that SAT captures the difficulty of the whole class NP.

72
00:05:39,400 --> 00:05:46,800
And either way, if you can prove that there's some problem in NP that there's no polynomial

73
00:05:46,800 --> 00:05:50,760
time algorithm for then, it's not going to be for SAT.

74
00:05:50,760 --> 00:05:55,960
And the other thing, as I mentioned, you can replace SAT with any problem that has been

75
00:05:55,959 --> 00:06:02,319
reduced down from SAT, not just carp's problems, but any of the thousands.

76
00:06:02,319 --> 00:06:09,639
So now, nowadays, proving a problem in NP complete was actually many examples where it's

77
00:06:09,639 --> 00:06:18,839
actually guided what scientists do because it is saying something profoundly important

78
00:06:18,839 --> 00:06:21,039
about the problem.

79
00:06:21,040 --> 00:06:23,720
So here's an example.

80
00:06:23,720 --> 00:06:27,760
Getting to that icing spin model that I referred to.

81
00:06:27,760 --> 00:06:30,120
It was introduced in the 20s.

82
00:06:30,120 --> 00:06:36,200
And people liked the model and they wanted to apply it and try to compute with it.

83
00:06:36,200 --> 00:06:39,400
But it's one thing to have a model.

84
00:06:39,400 --> 00:06:43,000
It's another thing to apply the model, try to say something about the real world and I might

85
00:06:43,000 --> 00:06:45,040
involve some computation.

86
00:06:45,040 --> 00:06:51,200
So in the 40s, the mathematical solution was found in a two- to four paper, which is

87
00:06:51,200 --> 00:06:52,600
fine.

88
00:06:52,600 --> 00:06:54,960
But in the real world, it's 3D.

89
00:06:54,960 --> 00:07:02,520
In a lot of smart people looked for 3D solutions to this problem.

90
00:07:02,520 --> 00:07:07,920
Turns out to be in 2000, it was proven to be NP complete.

91
00:07:07,920 --> 00:07:16,000
So people worked for 50 years trying to solve this problem.

92
00:07:16,000 --> 00:07:23,200
Now we understand why they were unsuccessful because if they had been successful, it would

93
00:07:23,200 --> 00:07:29,840
imply that all those other problems are going to be running in polyurethane.

94
00:07:29,840 --> 00:07:36,840
Or it would imply that P equals NP and nobody believes that P equals NP.

95
00:07:36,839 --> 00:07:38,560
So here we are.

96
00:07:38,560 --> 00:07:46,879
We're still with this overwhelming consensus that P is not equal to NP.

97
00:07:46,879 --> 00:07:52,039
And not only that, if P is not equal to NP, then NP complete problems are some other

98
00:07:52,039 --> 00:07:55,079
subset of NP.

99
00:07:55,079 --> 00:08:02,359
And there's, as I mentioned, the zoo of complexity classes at the end of the reduction lecture.

100
00:08:02,360 --> 00:08:05,840
A lot of them are starting from this diagram.

101
00:08:05,840 --> 00:08:11,360
You can come up with many, many other ideas to try to get it.

102
00:08:11,360 --> 00:08:16,800
And there's not a lot of problems that people even have any kind of conjecture for falling

103
00:08:16,800 --> 00:08:18,000
outside.

104
00:08:18,000 --> 00:08:24,120
Even though it seems like, obviously, there ought to be lots of problems in NP that are not

105
00:08:24,120 --> 00:08:25,120
important.

106
00:08:25,120 --> 00:08:32,159
And it's quite a frustrating situation for people working in the field.

107
00:08:32,159 --> 00:08:33,840
So the right-hand diagram is simple.

108
00:08:33,840 --> 00:08:38,080
The left-hand diagram gets more and more complicated as people work on it.

109
00:08:38,080 --> 00:08:44,440
But really, the fundamental reason that we believe that P equals NP gets back to that creativity.

110
00:08:44,440 --> 00:08:52,120
And I'd like to read a quote from Obby Grigerson, who's at the Institute for Math Science here

111
00:08:52,120 --> 00:08:53,519
in Princeton.

112
00:08:53,519 --> 00:08:58,960
We admire a wild proof of Fermat's last theorem and the scientific theories of Newton, Einstein,

113
00:08:58,960 --> 00:09:03,879
Darwin, Watson and Crick, the design of the Golden Gate Bridge and the pyramids, precisely

114
00:09:03,879 --> 00:09:08,720
because they seem to require a leap, which cannot be made by everyone, let alone by simple

115
00:09:08,720 --> 00:09:10,720
mechanical device.

116
00:09:10,720 --> 00:09:17,319
It's all about, it's a lot more difficult to create something than to check that it's

117
00:09:17,319 --> 00:09:19,240
good.

118
00:09:19,240 --> 00:09:21,480
So here's the summary.

119
00:09:21,480 --> 00:09:25,560
P's the class of search problems that are solvable and polynomial time.

120
00:09:25,560 --> 00:09:32,159
NP's the class of all search problems, some of which seem pretty hard and people have tried

121
00:09:32,159 --> 00:09:34,919
to re-hard to work on them.

122
00:09:34,919 --> 00:09:42,919
NP complete, in a sense, are the hardest problems in NP, as all the problems in NP reduce to those

123
00:09:42,919 --> 00:09:45,320
problems.

124
00:09:45,320 --> 00:09:53,640
We talk about a problem having no polynomial time algorithm that's intractable or, and we

125
00:09:53,640 --> 00:09:59,120
know that lots and lots of fundamental problems are NP complete.

126
00:09:59,120 --> 00:10:06,920
So what we want to do is use theory as a guide when we're confronting problems.

127
00:10:06,920 --> 00:10:11,440
Everyone has to realize that a polynomial time for algorithm for an NP-complete problem

128
00:10:11,440 --> 00:10:16,960
would be a stunning scientific breakthrough, a win the million dollars in as many of

129
00:10:16,960 --> 00:10:19,040
the things you could do with it.

130
00:10:19,040 --> 00:10:23,440
Certainly you will confront NP complete problems sometime.

131
00:10:23,440 --> 00:10:28,040
There's thousands and thousands and thousands of them out there.

132
00:10:28,040 --> 00:10:34,400
And probably a good idea, safe bet, is to assume that P is not equal to NP because it's

133
00:10:34,400 --> 00:10:37,080
almost everyone believes that.

134
00:10:37,080 --> 00:10:40,720
And therefore that those NP complete problems are intractable.

135
00:10:40,720 --> 00:10:46,320
You're not going to be able to guarantee polynomial running time for an algorithm.

136
00:10:46,320 --> 00:10:50,960
So you better know about those situations and proceed accordingly.

137
00:10:50,960 --> 00:10:56,160
And we'll look at a couple of things to do.

138
00:10:56,160 --> 00:11:02,279
Around in the 1980s came to Princeton to start the computer science department and we built

139
00:11:02,279 --> 00:11:03,440
this building.

140
00:11:03,440 --> 00:11:08,160
And they asked, you know, a lot of the buildings, they're nobody asked.

141
00:11:08,159 --> 00:11:12,639
A lot of the buildings, Princeton have gargoyles and I want to have something in our building

142
00:11:12,639 --> 00:11:15,759
that could stand the test of time.

143
00:11:15,759 --> 00:11:19,480
And this is what we wound up with, you know, pattern on the brick up on the top of the

144
00:11:19,480 --> 00:11:21,279
building.

145
00:11:21,279 --> 00:11:28,639
Now I could just leave that there and maybe this solution will get edited out so that

146
00:11:28,639 --> 00:11:31,399
you can work on figuring out what that means.

147
00:11:31,399 --> 00:11:34,399
But anyway, here's the solution.

148
00:11:34,399 --> 00:11:43,000
The indented bricks are ones and ones that aren't indented are zeros in this little pattern.

149
00:11:43,000 --> 00:11:46,039
And they're just to ask including.

150
00:11:46,039 --> 00:11:53,199
So the top row is asking for P. And then the second one is asking for equals.

151
00:11:53,199 --> 00:11:59,879
And then another P. And then a question mark.

152
00:11:59,879 --> 00:12:06,399
So it seemed to me like that pattern would stand the test of time and that was over 25

153
00:12:06,399 --> 00:12:08,039
years ago.

154
00:12:08,039 --> 00:12:17,720
Now if everyone asks, what do you do if somebody proves that in fact P equals Np?

155
00:12:17,720 --> 00:12:21,559
While in that case we can put an explanation point on there.

156
00:12:21,559 --> 00:12:27,000
If somebody proves that P is not equal Np then we're going to have to remove a lot of bricks.

157
00:12:27,000 --> 00:12:29,399
That's an introduction to the theory of interactability.

