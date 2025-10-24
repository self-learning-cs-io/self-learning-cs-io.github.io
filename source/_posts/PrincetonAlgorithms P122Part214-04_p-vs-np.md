---
title: PrincetonAlgorithms P122Part214 04_p Vs Np
---

1
00:00:00,000 --> 00:00:09,480
Now we're going to talk about P and NP, the two major classes of problems that form the

2
00:00:09,480 --> 00:00:13,839
basis for the theory of interactability.

3
00:00:13,839 --> 00:00:19,679
And so we talked about search problems, and what we're going to do is just name that class

4
00:00:19,679 --> 00:00:20,679
of problems.

5
00:00:20,679 --> 00:00:23,679
And that's what we call NP.

6
00:00:23,679 --> 00:00:27,679
NP is the class of all search problems.

7
00:00:27,679 --> 00:00:33,899
And now I just want to mention again that the classic definition that's often used in

8
00:00:33,899 --> 00:00:39,200
many books and papers that you'll read about this topic, the classic definition limits

9
00:00:39,200 --> 00:00:41,280
NP to yes, no problems.

10
00:00:41,280 --> 00:00:47,600
But again, the major conclusions that we draw are exactly the same.

11
00:00:47,600 --> 00:00:54,240
So we just listed a bunch of problems that are in NP.

12
00:00:54,240 --> 00:01:01,200
And the way that we know is we had a very concrete definition of what we mean by a search

13
00:01:01,200 --> 00:01:02,200
problem.

14
00:01:02,200 --> 00:01:04,400
You have to be able to give a solution.

15
00:01:04,400 --> 00:01:10,520
You have to be able to verify and guarantee polynomial time that you have a solution.

16
00:01:10,520 --> 00:01:18,719
And for satisfiability problems that we consider, in fact, are all in the class NP.

17
00:01:18,719 --> 00:01:24,640
So we're using the concept of a search problem to classify some problems.

18
00:01:24,640 --> 00:01:31,200
One way to think of NP is it's really what we would like to be able to compute.

19
00:01:31,200 --> 00:01:37,960
We'd like to have algorithms that solve all of these problems.

20
00:01:37,960 --> 00:01:43,280
And it's a very, very general class of problems.

21
00:01:43,280 --> 00:01:52,599
It's almost articulating in as general a way as possible what we mean by a problem that

22
00:01:52,599 --> 00:01:54,200
we want to solve computationally.

23
00:01:54,200 --> 00:01:57,120
So these are the problems that we'd like to solve.

24
00:01:57,120 --> 00:02:00,079
Some of them we can, we know how to solve some of them.

25
00:02:00,079 --> 00:02:01,319
We don't.

26
00:02:01,319 --> 00:02:04,840
That's NP.

27
00:02:04,840 --> 00:02:12,080
Now by contrast, there's another class P where we add a restriction.

28
00:02:13,080 --> 00:02:18,520
That's the class of search problems that we know how to solve in polynomial time.

29
00:02:18,520 --> 00:02:25,680
That is we have, generally, we have, we prove that a problem is NP by demonstrating the

30
00:02:25,680 --> 00:02:32,280
algorithm that is guaranteed to run in polynomial time for any instance of that problem.

31
00:02:32,280 --> 00:02:36,600
And again, the classic definition is about yes, no problems.

32
00:02:36,600 --> 00:02:41,200
So here's a bunch of problems that are NP.

33
00:02:41,199 --> 00:02:47,000
And so we already showed L solve because Gaussian elimination runs in polynomial time.

34
00:02:47,000 --> 00:02:51,799
And we already talked about LP because it's gotcha in the algorithm that works for linear

35
00:02:51,799 --> 00:02:52,799
programming.

36
00:02:52,799 --> 00:02:59,560
And then pretty much all the algorithms that we've covered in this course are cast as search

37
00:02:59,560 --> 00:03:06,319
problems and also have polynomial time solutions.

38
00:03:06,319 --> 00:03:13,319
We've been talking about programs that are polynomial time solutions and just a little

39
00:03:13,319 --> 00:03:20,879
bit has to be done to convince yourself that or to cast the problem as a search problem.

40
00:03:20,879 --> 00:03:26,319
Many of them are explicit search problems like ST connectivity, you're searching for

41
00:03:26,319 --> 00:03:32,560
a path in a graph, you know, in TCS in the miniatur, you know, showed if you are given

42
00:03:32,560 --> 00:03:35,240
a path, you can check that it's a path easily.

43
00:03:35,240 --> 00:03:37,360
So it's a search problem.

44
00:03:37,360 --> 00:03:42,319
So a piece of the class of search problems that can be solvable in polynomial time.

45
00:03:42,319 --> 00:03:48,039
So the significance of P is those are the ones that we actually do compute feasibly.

46
00:03:48,039 --> 00:03:53,199
So NP is the ones, all the ones we would like to and P is all the ones that we actually

47
00:03:53,199 --> 00:03:55,840
do compute feasibly.

48
00:03:55,840 --> 00:04:01,120
And those are perfectly well defined classes of problems.

49
00:04:01,120 --> 00:04:03,680
Now what is the N and N to P for?

50
00:04:03,680 --> 00:04:08,879
Well, just a brief moment to talk about that.

51
00:04:08,879 --> 00:04:12,920
The N and N piece stands for non-determinism.

52
00:04:12,920 --> 00:04:20,439
And the idea of a non-deterministic machine is one that can guess the desired solution.

53
00:04:20,439 --> 00:04:22,199
And that's an abstract machine.

54
00:04:22,199 --> 00:04:28,840
As far as we know, we don't have non-determinism in real life devices.

55
00:04:28,839 --> 00:04:32,479
But for this, find to have an abstract machine of that sort.

56
00:04:32,479 --> 00:04:38,279
Remember for our implementation for regular expression pattern matching.

57
00:04:38,279 --> 00:04:44,239
The way that we solved that practical problem was to imagine a non-deterministic machine

58
00:04:44,239 --> 00:04:53,120
and then write a program that would simulate that machine by trying all different possibilities.

59
00:04:53,120 --> 00:05:01,959
And in fact, that whole exercise really gets at the difference between polynomial and exponential

60
00:05:01,959 --> 00:05:03,639
time.

61
00:05:03,639 --> 00:05:11,360
First approach is a naive approach to simulating that machine turns out to be an algorithm

62
00:05:11,360 --> 00:05:13,920
that can run an exponential time for some inputs.

63
00:05:13,920 --> 00:05:19,360
And we actually saw that today there's implementations like that out there that hackers can exploit

64
00:05:19,360 --> 00:05:21,759
to deny service.

65
00:05:21,759 --> 00:05:26,439
And implementation we show had guarantees polynomial time.

66
00:05:26,439 --> 00:05:32,800
So non-determinism was an abstract device that we used to help us try to get to a real

67
00:05:32,800 --> 00:05:34,599
practical solution.

68
00:05:34,599 --> 00:05:36,519
And that's what we're doing again.

69
00:05:36,519 --> 00:05:42,439
So let's imagine we have a non-deterministic machine that can guess the solution.

70
00:05:42,439 --> 00:05:52,639
So like if you're in a deterministic machine, if you make a array and create an array of

71
00:05:52,639 --> 00:06:00,839
size n, then Java, we know deterministically, initializes the entries to all zero.

72
00:06:00,839 --> 00:06:06,519
But what if that array A is supposed to be our solution to an integer linear programming

73
00:06:06,519 --> 00:06:08,399
problem?

74
00:06:08,399 --> 00:06:12,079
We could have a non-deterministic machine initialize the entries to the solution.

75
00:06:12,079 --> 00:06:15,399
And it could just guess what the right answer is and initialize it.

76
00:06:15,399 --> 00:06:20,639
Who seems like a really, really powerful capability.

77
00:06:20,639 --> 00:06:27,120
So for example, for an integer linear programming, we could just tell the non-deterministic machine

78
00:06:27,120 --> 00:06:31,279
I guess the solution and would be done.

79
00:06:31,279 --> 00:06:35,519
In the same concept goes all the way down to a Turing machine.

80
00:06:35,519 --> 00:06:41,839
The whole idea of a finite state machine or if any computation that people think about

81
00:06:41,839 --> 00:06:47,120
is the machine's in some state and it's fully determined what the next state will be.

82
00:06:47,120 --> 00:06:53,879
And Turing machines, the simplest type of imaginary machine with that kind of capability.

83
00:06:53,879 --> 00:06:58,799
But it's very simple to make a Turing machine non-deterministic the same way that we made

84
00:06:58,799 --> 00:07:01,719
finite atomita non-deterministic.

85
00:07:01,720 --> 00:07:06,160
We just let it go to more than one possible state.

86
00:07:06,160 --> 00:07:12,520
So when you think about non-determinism in this way, it's pretty clear almost immediately

87
00:07:12,520 --> 00:07:19,520
that NP is the class of search problems that are solvable in polynomial time on a non-deterministic

88
00:07:19,520 --> 00:07:21,600
Turing machine.

89
00:07:21,600 --> 00:07:26,640
Even if the machine gives the solution what we're requiring is that we have to be able to

90
00:07:26,640 --> 00:07:30,360
check that it's a solution in polynomial time.

91
00:07:30,360 --> 00:07:32,680
And that's NP.

92
00:07:32,680 --> 00:07:43,680
So what we have are led to immediately is what's called the extended church Turing thesis.

93
00:07:43,680 --> 00:07:52,580
And that's the idea that P is the ones that we know how to solve but it's the class of

94
00:07:52,580 --> 00:07:58,199
problems that we're ever going to be able to solve in the natural world.

95
00:07:58,199 --> 00:08:04,240
And again, evidence for supporting the thesis is that all the computers that we know about

96
00:08:04,240 --> 00:08:08,680
we simulate them in polynomial time.

97
00:08:08,680 --> 00:08:14,439
People wondered and have wondered and still wonder, is it possible that there are computers

98
00:08:14,439 --> 00:08:21,599
out there that work differently or more efficiently than the computers that we've built?

99
00:08:21,599 --> 00:08:25,279
Here's an interesting and simple example.

100
00:08:25,279 --> 00:08:29,399
There's a thing called a Steiner Tree which is like an MST except you're not restricted

101
00:08:29,399 --> 00:08:32,879
to have your lines go through the points that are given.

102
00:08:32,879 --> 00:08:37,959
Steiner Tree you're given some points and what you're supposed to do is find a set of lines

103
00:08:37,959 --> 00:08:41,319
of minimal length that connect the end points.

104
00:08:41,319 --> 00:08:45,799
Now this is quite a bit of math and geometry even to prove that a given set of lines is a

105
00:08:45,799 --> 00:08:51,480
Steiner Tree but like for four points it's known like this in a rectangular array.

106
00:08:51,480 --> 00:08:53,959
That's what the Steiner Tree looks like.

107
00:08:53,960 --> 00:08:57,120
And we write a program to compute Steiner Tree.

108
00:08:57,120 --> 00:08:59,160
It's a search problem.

109
00:08:59,160 --> 00:09:07,680
Although it's not completely easy to characterize as a search problem that anybody is.

110
00:09:07,680 --> 00:09:15,639
But anyway the point for now is that people wondered actually if you put soap in between

111
00:09:15,639 --> 00:09:22,560
two glasses of film formed by the soap or soap bubbles is another way to think about it.

112
00:09:22,559 --> 00:09:26,519
This is a tube making it two-dimensional.

113
00:09:26,519 --> 00:09:31,199
If you put four points and put soap and people have done this experiment that's the photo

114
00:09:31,199 --> 00:09:35,759
off the web, you get a Steiner Tree.

115
00:09:35,759 --> 00:09:41,119
And you know who knows what kind of computation is involved to make that.

116
00:09:41,119 --> 00:09:49,199
If you put lots of points people have done I don't know what number but they can get Steiner

117
00:09:49,200 --> 00:09:53,080
Tree for substantial numbers of points.

118
00:09:53,080 --> 00:09:55,879
Can we really compute Steiner Tree that way?

119
00:09:55,879 --> 00:10:02,879
Well you can construct things where it doesn't actually get the actual Steiner Tree so it

120
00:10:02,879 --> 00:10:04,800
doesn't really work.

121
00:10:04,800 --> 00:10:07,120
And that's just one example of an attempt.

122
00:10:07,120 --> 00:10:11,480
There's plenty of other examples out there.

123
00:10:11,480 --> 00:10:17,940
But the extended search during thesis hasn't been with us for as long as the search

124
00:10:17,940 --> 00:10:25,300
during thesis and maybe it's not quite as strong but it's held for quite a long time.

125
00:10:25,300 --> 00:10:30,620
And people are assuming that there's not going to be a design that's going to make the

126
00:10:30,620 --> 00:10:36,020
difference between polynomial time in this natural world.

127
00:10:36,020 --> 00:10:40,140
If we're going to make future computers more efficient we're just going to improve our

128
00:10:40,140 --> 00:10:41,140
existing design.

129
00:10:41,140 --> 00:10:45,860
That's the extended search during thesis.

130
00:10:45,860 --> 00:10:51,940
But all of this leads us with the basic question does P equal Np?

131
00:10:51,940 --> 00:10:55,980
So P is all the problems we can solve in the natural world.

132
00:10:55,980 --> 00:10:59,860
Np is all the search problems that I would like to solve.

133
00:10:59,860 --> 00:11:05,060
If we had non-determinism in the natural world, do we have non-determinism in the natural

134
00:11:05,060 --> 00:11:06,060
world?

135
00:11:06,060 --> 00:11:08,060
Does non-determinism help?

136
00:11:08,060 --> 00:11:09,060
That's the question.

137
00:11:09,060 --> 00:11:11,060
Does P equals Np?

138
00:11:11,059 --> 00:11:17,379
This question has been around for a long time and has even made it into the popular culture.

139
00:11:17,379 --> 00:11:23,459
And I think it will make it into the popular culture much more when we start having because

140
00:11:23,459 --> 00:11:28,979
we're starting to have massive online courses where many more people are learning about

141
00:11:28,979 --> 00:11:30,379
these fabulous concepts.

142
00:11:30,379 --> 00:11:36,859
And here's another way to think about P versus Np.

143
00:11:36,860 --> 00:11:40,539
Like the idea of automating creativity.

144
00:11:40,539 --> 00:11:43,139
There's one thing to be creative.

145
00:11:43,139 --> 00:11:46,940
It's another thing to appreciate creativity.

146
00:11:46,940 --> 00:11:50,659
So Mozart comes up with a piece of music.

147
00:11:50,659 --> 00:11:54,019
Once that thing is created, we can appreciate it.

148
00:11:54,019 --> 00:12:00,700
Where Andrew Wiles proved from us last year in however he came up with it, there's a way

149
00:12:00,700 --> 00:12:01,700
to check it.

150
00:12:01,700 --> 00:12:09,060
Or somebody designs them in an airfoil or airplane wing.

151
00:12:09,060 --> 00:12:13,500
We can verify that it has the properties that it's supposed to.

152
00:12:13,500 --> 00:12:15,300
Or Einstein proposes a theory.

153
00:12:15,300 --> 00:12:17,340
Somebody can validate it.

154
00:12:17,340 --> 00:12:19,980
So there's the creative.

155
00:12:19,980 --> 00:12:23,740
Let's make something or come up with something.

156
00:12:23,740 --> 00:12:25,580
That's the antelogue.

157
00:12:25,580 --> 00:12:31,340
To that is a solution to a problem, a search problem.

158
00:12:31,340 --> 00:12:34,860
And the ordinary thing to do is to check it.

159
00:12:34,860 --> 00:12:37,900
But if P equals Np, there's no difference.

160
00:12:37,900 --> 00:12:44,180
We can really like automating creativity.

161
00:12:44,180 --> 00:12:47,620
That's the computational antelogue to P equals Np.

162
00:12:47,620 --> 00:12:52,740
Question is a computational antelogue to automating creativity.

163
00:12:52,740 --> 00:12:54,100
This P equals Np.

164
00:12:54,100 --> 00:12:57,700
That's the central question.

165
00:12:57,700 --> 00:13:02,419
Can you always avoid brute force searching in Dubeter?

166
00:13:02,419 --> 00:13:07,840
For search problems, since we have a small solution that can be checked in polynomial

167
00:13:07,840 --> 00:13:15,299
time, there's always an exponential time solution, which is trial possible solutions.

168
00:13:15,299 --> 00:13:17,419
But that's not the question.

169
00:13:17,419 --> 00:13:19,259
Can you always do better than that?

170
00:13:19,259 --> 00:13:27,659
Really, the essence of the P equals Np question.

171
00:13:27,659 --> 00:13:29,419
So there's two possibilities.

172
00:13:29,419 --> 00:13:32,899
If P is not, so P is a search problem.

173
00:13:32,899 --> 00:13:38,700
So certainly Np, any problem Np is also on P.

174
00:13:38,700 --> 00:13:46,939
So the question is, are there some search problems that we can't solve in polynomial time?

175
00:13:46,940 --> 00:13:55,620
So if the answer to the question is yes, then all the problems that I've mentioned that nobody

176
00:13:55,620 --> 00:14:00,780
knows the solution to despite people working on them for many decades.

177
00:14:00,780 --> 00:14:06,740
If P is equal to Np, there's polynomial times algorithms for those out there.

178
00:14:06,740 --> 00:14:10,980
We just haven't found them yet.

179
00:14:10,980 --> 00:14:16,139
The answer to that is no.

180
00:14:16,139 --> 00:14:25,779
That's really something fundamental about our universe.

181
00:14:25,779 --> 00:14:33,019
Something that says something profound about the power of non-determinism.

182
00:14:33,019 --> 00:14:43,019
If P equals Np, non-determinism actually doesn't help, P not equal Np, it would.

183
00:14:43,019 --> 00:14:47,980
Now, the overwhelming consensus is that P equals not equal to Np.

184
00:14:47,980 --> 00:14:54,340
And we'll talk some more about some reasons that people believe that.

185
00:14:54,340 --> 00:15:05,300
But thinking about it, you can really convince yourself that it really seems as though having a machine,

186
00:15:05,300 --> 00:15:14,980
a machine that can, when you initialize an array, initialize it with solution to integer linear programming problem,

187
00:15:14,980 --> 00:15:22,740
really would seem that a machine like that is going to be more powerful than the machines that we're using.

188
00:15:22,740 --> 00:15:27,419
And that's why people believe that P is not equal to Np.

189
00:15:27,419 --> 00:15:33,820
But the frustrating thing is that theoretical computer scientists and mathematicians have been working on this for many, many years,

190
00:15:33,820 --> 00:15:37,899
and no one has been able to prove it.

191
00:15:37,899 --> 00:15:41,740
Actually, there's the millennium prize.

192
00:15:41,740 --> 00:15:50,259
You can earn a million dollars from playing mathematics if you resolve P equals Np.

193
00:15:50,259 --> 00:15:57,220
Actually, there's other math problems on that list.

194
00:15:57,220 --> 00:16:04,819
But people who know algorithms, first of all, you could learn way more than a million dollars if you resolve this problem.

195
00:16:04,819 --> 00:16:10,980
Second of all, if you're expert in algorithms, there's lots of other ways to earn a million dollars.

196
00:16:10,980 --> 00:16:14,059
So it's not about the million dollars it's about.

197
00:16:14,059 --> 00:16:22,379
This is some would argue one of the most important open mathematical questions that faces us right now.

