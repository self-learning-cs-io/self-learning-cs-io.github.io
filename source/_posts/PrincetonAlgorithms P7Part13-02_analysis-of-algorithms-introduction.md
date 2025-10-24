---
title: PrincetonAlgorithms P7Part13 02_analysis Of Algorithms Introduction
---

1
00:00:00,000 --> 00:00:03,600
Welcome back.

2
00:00:03,600 --> 00:00:06,360
Today we're going to do some math and some science.

3
00:00:06,360 --> 00:00:10,200
Not a lot, but we need to have a scientific basis for

4
00:00:10,200 --> 00:00:12,519
understanding the performance of our algorithms to

5
00:00:12,519 --> 00:00:14,759
properly deploy them in practice.

6
00:00:14,759 --> 00:00:18,320
So today we're going to talk about how to observe

7
00:00:18,320 --> 00:00:20,679
performance characteristics of algorithms.

8
00:00:20,679 --> 00:00:23,039
We're going to look at how to make mathematical models and

9
00:00:23,039 --> 00:00:25,920
how to classify algorithms according to the order of

10
00:00:25,920 --> 00:00:27,679
growth of their running time.

11
00:00:27,679 --> 00:00:29,839
We'll talk a bit about the theory of algorithms and

12
00:00:29,839 --> 00:00:34,079
also how to analyze memory usage.

13
00:00:34,079 --> 00:00:38,119
So to put this all in perspective, we're going to think

14
00:00:38,119 --> 00:00:42,679
about these issues from a point of view of different types

15
00:00:42,679 --> 00:00:44,240
of characters.

16
00:00:44,240 --> 00:00:47,640
So the first one is a programmer who needs to solve a

17
00:00:47,640 --> 00:00:51,079
problem and get it working and get it deployed.

18
00:00:51,079 --> 00:00:55,480
Second one is the client who wants to use the whatever the

19
00:00:55,480 --> 00:00:58,679
program did to get the job done.

20
00:00:58,679 --> 00:01:00,600
Third one is the theoretician.

21
00:01:00,600 --> 00:01:05,879
That's somebody who really wants to understand what's going on.

22
00:01:05,879 --> 00:01:09,719
And the last one is kind of the team, this basic blocking

23
00:01:09,719 --> 00:01:14,120
and tackling sometimes necessary to get all these things done.

24
00:01:14,120 --> 00:01:18,560
So there's a little bit of each one of these in today's

25
00:01:18,560 --> 00:01:19,079
lecture.

26
00:01:19,079 --> 00:01:22,719
And actually, when you're a student, you have to think that

27
00:01:22,719 --> 00:01:26,359
you might be playing any or all of these roles someday.

28
00:01:26,359 --> 00:01:28,959
And so it's pretty important to understand the different

29
00:01:28,959 --> 00:01:32,079
points of view.

30
00:01:32,079 --> 00:01:36,200
So the key that we'll focus on is running time.

31
00:01:36,200 --> 00:01:41,120
And actually, the idea of understanding the running time of

32
00:01:41,120 --> 00:01:45,200
computation goes way back even to Babbage and probably

33
00:01:45,200 --> 00:01:46,680
before.

34
00:01:46,680 --> 00:01:48,640
Here's a quote from Babbage.

35
00:01:48,640 --> 00:01:51,120
As soon as an analytic engine exists, it won't

36
00:01:51,120 --> 00:01:54,480
necessarily guide the future of the course of the science.

37
00:01:54,480 --> 00:01:57,040
Whenever any result is sought by its aid, the question

38
00:01:57,040 --> 00:01:57,920
will arise.

39
00:01:57,920 --> 00:02:01,640
By what course of calculation can these results be arrived at

40
00:02:01,640 --> 00:02:04,719
by the machine in the shortest time?

41
00:02:04,719 --> 00:02:07,840
If you look at Babbage's machine called the analytic engine,

42
00:02:07,840 --> 00:02:09,680
it's got a crank on it.

43
00:02:09,680 --> 00:02:15,120
And literally, the concern that Babbage had in knowing how long

44
00:02:15,120 --> 00:02:18,680
a computation would take is how many times do we have to turn

45
00:02:18,680 --> 00:02:21,199
the crank?

46
00:02:21,199 --> 00:02:24,679
Not that different in today's world.

47
00:02:24,679 --> 00:02:28,639
The crank may be something electronic that's happening a

48
00:02:28,639 --> 00:02:30,479
billion times a second.

49
00:02:30,479 --> 00:02:33,239
But still, we're looking for how many times does some

50
00:02:33,239 --> 00:02:35,959
discrete operation have to be performed in order to get

51
00:02:35,959 --> 00:02:38,519
a computation done?

52
00:02:38,519 --> 00:02:41,519
So there's a lot of reasons to analyze algorithms.

53
00:02:41,519 --> 00:02:44,959
In the context of this course, we're mainly interested in

54
00:02:44,959 --> 00:02:46,679
performance prediction.

55
00:02:46,679 --> 00:02:49,280
We also want to compare the performance of different

56
00:02:49,280 --> 00:02:52,520
algorithms for the same task and to be able to provide some

57
00:02:52,520 --> 00:02:55,319
guarantees on how well they perform.

58
00:02:55,319 --> 00:03:00,400
Along with this is understanding some theoretical basis for

59
00:03:00,400 --> 00:03:02,639
how algorithms perform.

60
00:03:02,639 --> 00:03:06,840
But primarily, the practical reason that we want to be

61
00:03:06,840 --> 00:03:09,840
analyzing algorithms and understanding them is to avoid

62
00:03:09,840 --> 00:03:12,039
performance bugs.

63
00:03:12,039 --> 00:03:14,479
We want to have some confidence that our algorithm is going

64
00:03:14,479 --> 00:03:17,680
to complete the job in the amount of time that we think it

65
00:03:17,680 --> 00:03:18,920
will.

66
00:03:18,920 --> 00:03:23,400
And it's very, very frequent to see in today's computational

67
00:03:23,400 --> 00:03:27,000
infrastructure a situation where the client gets bad

68
00:03:27,000 --> 00:03:30,040
performance because the programmer did not understand the

69
00:03:30,040 --> 00:03:33,080
performance characteristics of the algorithm.

70
00:03:33,080 --> 00:03:36,520
And today's lecture is about trying to avoid that.

71
00:03:39,680 --> 00:03:43,800
Now, we're going to focus on performance and comparing

72
00:03:43,800 --> 00:03:46,240
algorithms in this course.

73
00:03:46,320 --> 00:03:49,800
There's later courses in typical computer science

74
00:03:49,800 --> 00:03:53,960
curricula that have more information about the theoretical

75
00:03:53,960 --> 00:03:55,159
basis of algorithms.

76
00:03:55,159 --> 00:03:58,280
And I'll mention a little bit about that later on.

77
00:03:58,280 --> 00:04:00,800
But our focus is on being able to predict performance in

78
00:04:00,800 --> 00:04:03,920
comparing algorithms.

79
00:04:03,920 --> 00:04:10,040
Now, there's a long list of success stories in designing

80
00:04:10,040 --> 00:04:12,760
algorithms with better performance in enabling the

81
00:04:12,759 --> 00:04:17,279
solution of problems that would otherwise not be solved.

82
00:04:17,279 --> 00:04:19,879
And I'll just give a couple of examples.

83
00:04:19,879 --> 00:04:23,399
One of the first and most famous is the so-called FFT

84
00:04:23,399 --> 00:04:24,480
algorithm.

85
00:04:24,480 --> 00:04:28,879
That's an algorithm for breaking down the wave form of

86
00:04:28,879 --> 00:04:33,759
N samples of a signal into periodic components.

87
00:04:33,759 --> 00:04:38,759
And that's at the basis for DVDs and JPEGs and many

88
00:04:38,759 --> 00:04:40,680
other applications.

89
00:04:40,680 --> 00:04:43,720
There's an easy way to do it that takes time proportional to N

90
00:04:43,720 --> 00:04:44,600
squared.

91
00:04:44,600 --> 00:04:49,400
But the FFT algorithm takes only N log N steps.

92
00:04:49,400 --> 00:04:52,439
And the difference between N log N and N squared is the

93
00:04:52,439 --> 00:04:55,000
difference between being able to solve a large problem and

94
00:04:55,000 --> 00:04:56,720
not being able to solve it.

95
00:04:56,720 --> 00:05:00,399
A lot of the digital technology, digital media technology that

96
00:05:00,399 --> 00:05:05,399
we have today is enabled by that fast algorithm.

97
00:05:05,399 --> 00:05:10,079
Another example was actually developed by Andrew Appell, who's

98
00:05:10,079 --> 00:05:12,719
now the chair of computer science here at Princeton.

99
00:05:12,719 --> 00:05:15,519
And it was developed when he was an undergraduate for a senior

100
00:05:15,519 --> 00:05:17,319
thesis.

101
00:05:17,319 --> 00:05:21,959
It's a fast algorithm for the N body simulation problem.

102
00:05:21,959 --> 00:05:25,279
The easy algorithm takes time proportional to N squared.

103
00:05:25,279 --> 00:05:29,719
But Appell's algorithm was an N log N algorithm that again

104
00:05:29,719 --> 00:05:33,199
meant that scientists can do N body simulation for huge

105
00:05:33,199 --> 00:05:38,279
values of N in that enables new research.

106
00:05:38,359 --> 00:05:44,919
So the challenge is, usually, faces, will my program be able to

107
00:05:44,919 --> 00:05:49,199
solve a large practical input?

108
00:05:49,199 --> 00:05:51,959
Actually, the working programmer is actually faced with that

109
00:05:51,959 --> 00:05:53,000
all the time.

110
00:05:53,000 --> 00:05:54,879
Why is my program running so slowly?

111
00:05:54,879 --> 00:05:58,000
Why does it run out of memory?

112
00:05:58,000 --> 00:06:01,919
And that's faced programmers for a really long time.

113
00:06:01,919 --> 00:06:08,159
And the insight to address this due to Knuth in the 1970s was

114
00:06:08,160 --> 00:06:12,040
that we really can use the scientific method to understand

115
00:06:12,040 --> 00:06:16,040
the performance of algorithms in operation.

116
00:06:16,040 --> 00:06:20,120
Maybe we're not unlocking new secrets of the universe, but

117
00:06:20,120 --> 00:06:25,280
we can use the scientific method and treat the computer as

118
00:06:25,280 --> 00:06:28,840
something to be studied in that way and come to an

119
00:06:28,840 --> 00:06:32,000
understanding of how our programs are going to perform.

120
00:06:32,000 --> 00:06:35,360
And let's take a look at that in more detail.

121
00:06:35,360 --> 00:06:38,360
So this is just a quick summary of what we mean by the

122
00:06:38,360 --> 00:06:42,920
scientific method, which has been successful for a couple

123
00:06:42,920 --> 00:06:44,680
of centuries now.

124
00:06:44,680 --> 00:06:48,000
So what we're going to do is observe from some feature of

125
00:06:48,000 --> 00:06:50,840
the natural world, in this case, it's going to be the running

126
00:06:50,840 --> 00:06:53,639
time of our program on a computer.

127
00:06:53,639 --> 00:06:56,480
Then we're going to develop hypothesis, some model that's

128
00:06:56,480 --> 00:06:58,720
consistent with the observations.

129
00:06:58,720 --> 00:07:01,960
And we're going to hope that hypothesis is good enough that

130
00:07:01,960 --> 00:07:04,960
it will allow us to predict something, usually predict the

131
00:07:04,959 --> 00:07:08,279
running time for larger problem size or on a different

132
00:07:08,279 --> 00:07:09,279
computer.

133
00:07:09,279 --> 00:07:11,919
And then we'll verify the predictions by making more

134
00:07:11,919 --> 00:07:15,359
observations and validate until we're comfortable that our

135
00:07:15,359 --> 00:07:18,479
model hypothesis and observations all agree.

136
00:07:18,479 --> 00:07:21,199
That's a way to get comfort that we understand the

137
00:07:21,199 --> 00:07:24,399
performance of our programs.

138
00:07:24,399 --> 00:07:29,079
Now, within the scientific method, there's some basic

139
00:07:29,079 --> 00:07:30,079
principles.

140
00:07:30,079 --> 00:07:33,679
And the first is that if you're going to run experiments, you

141
00:07:33,680 --> 00:07:35,560
should expect that somebody else should be able to run

142
00:07:35,560 --> 00:07:38,800
experiments and get the same result.

143
00:07:38,800 --> 00:07:43,240
And also, the hypotheses have to have a specific property

144
00:07:43,240 --> 00:07:47,120
that the experiment can show the hypothesis to be wrong.

145
00:07:47,120 --> 00:07:50,680
So it has to be carefully crafted and we'll be sure to

146
00:07:50,680 --> 00:07:53,120
try to do that.

147
00:07:53,120 --> 00:07:55,639
So and again, the future of the natural world that we're

148
00:07:55,639 --> 00:07:59,280
studying is some particular computer that exists in the

149
00:07:59,280 --> 00:08:00,519
natural world.

150
00:08:00,519 --> 00:08:03,600
It changes the algorithm from an abstraction to

151
00:08:03,840 --> 00:08:09,840
some kind of actual physical thing happening like electrons

152
00:08:09,840 --> 00:08:11,360
racing around inside the computer.

