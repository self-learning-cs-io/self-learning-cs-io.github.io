---
title: CS143 P107Week916 01 Register Allocation
---

1
00:00:00,000 --> 00:00:07,600
In this video, we're going to begin a discussion of red-estral location, which is one of the

2
00:00:07,600 --> 00:00:12,439
most sophisticated things that compilers do to optimize performance, and also involves

3
00:00:12,439 --> 00:00:18,440
many of the concepts that we've been discussing in global flow analysis.

4
00:00:18,440 --> 00:00:23,519
Recall that intermediate code can use unlimited numbers of temporaries, and this simplifies

5
00:00:23,519 --> 00:00:27,560
a number of things, in particular it simplifies optimization because we don't have to worry

6
00:00:27,559 --> 00:00:33,119
about preserving the right number of registers in the code, but it does complicate the final

7
00:00:33,119 --> 00:00:37,799
translation into a assembly code because we might be using too many temporaries.

8
00:00:37,799 --> 00:00:43,320
And this is actually a problem in practice, so it's not uncommon at all for intermediate

9
00:00:43,320 --> 00:00:49,560
code to use more temporaries and there are registers on the target machine.

10
00:00:49,560 --> 00:00:55,519
The problem then is to rewrite the intermediate code to use no more temporaries than there

11
00:00:55,520 --> 00:00:57,480
are machine registers.

12
00:00:57,480 --> 00:01:01,120
And the way we're going to do that is we're going to assign multiple temporaries to each

13
00:01:01,120 --> 00:01:08,719
register, so we're going to have a many one mapping, many to one mapping from temporaries

14
00:01:08,719 --> 00:01:12,359
to registers.

15
00:01:12,359 --> 00:01:18,280
And clearly there's a little bit of an issue here, if we really are using many temporaries,

16
00:01:18,280 --> 00:01:21,680
we will not be able to fit them all into a single register.

17
00:01:21,680 --> 00:01:25,840
So there needs to be some kind of a trick and we'll say what that trick is in a few minutes,

18
00:01:25,840 --> 00:01:28,600
and there'll be situations actually when this will fail and we'll have to have some kind

19
00:01:28,600 --> 00:01:30,080
of backup plan.

20
00:01:30,080 --> 00:01:36,880
But our default plan is to try to put as many temporaries as possible into the same machine

21
00:01:36,880 --> 00:01:45,200
register and doing all this without changing the behavior of the program.

22
00:01:45,200 --> 00:01:46,520
So how can we do this?

23
00:01:46,520 --> 00:01:47,520
Magic thing.

24
00:01:47,520 --> 00:01:50,800
How can we actually make a single register hold multiple values?

25
00:01:50,799 --> 00:01:55,640
Well the trick is that it's fine for a register to have multiple values as long as it only

26
00:01:55,640 --> 00:01:58,239
has one value at a time.

27
00:01:58,239 --> 00:02:01,239
So let's consider this program, and I'm going to switch colors here.

28
00:02:01,239 --> 00:02:03,920
It's a simple three statement program.

29
00:02:03,920 --> 00:02:09,000
And notice here that A is used in the first two statements, so it's written in the first

30
00:02:09,000 --> 00:02:14,400
statement, red in the second statement, E is written in the second statement and red

31
00:02:14,400 --> 00:02:17,319
in the third statement, and F is only written in the third statement.

32
00:02:17,319 --> 00:02:22,039
And actually these three values, A, E, and F, they don't ever really coexist at the

33
00:02:22,039 --> 00:02:23,039
same time.

34
00:02:23,039 --> 00:02:26,120
By the time we've read A, we're really done with it.

35
00:02:26,120 --> 00:02:28,919
We've had all the uses of A we're going to have in this little code fragment.

36
00:02:28,919 --> 00:02:32,079
Here I'm assuming that A, E, and F are not used anywhere else.

37
00:02:32,079 --> 00:02:36,759
And so it turns out that A, E, and F could all actually live in the same register.

38
00:02:36,759 --> 00:02:42,280
All right, and that's assuming that A and E are dead after their uses.

39
00:02:42,280 --> 00:02:43,280
And what would that look like?

40
00:02:43,280 --> 00:02:48,719
Well let's allocate them all to a particular register R1, and let's assign CD and B to

41
00:02:48,719 --> 00:02:50,680
their own individual registers.

42
00:02:50,680 --> 00:02:52,000
Then the code would look like this.

43
00:02:52,000 --> 00:02:58,680
R1 would be R2 plus R3, and then R1 would be R1 plus R4, and R1 would be R1 minus 1.

44
00:02:58,680 --> 00:03:05,080
All right, so now notice how this is just a transliteration of the code over here, inter-registers,

45
00:03:05,080 --> 00:03:12,840
but there is a many one mapping of names on the left to register names on the right.

46
00:03:13,840 --> 00:03:17,080
A register allocation is an old problem.

47
00:03:17,080 --> 00:03:23,520
In fact, it was first recognized way back in the 1950s in the original Fortran project.

48
00:03:23,520 --> 00:03:27,960
But originally, a register allocation was done with fairly crude algorithms.

49
00:03:27,960 --> 00:03:33,879
And it was rapidly or very quickly noticed that this was actually a bottleneck in the quality

50
00:03:33,879 --> 00:03:35,560
of code generation.

51
00:03:35,560 --> 00:03:39,719
That actually limitations on the ability of register allocation to do a good job had a really

52
00:03:39,719 --> 00:03:44,120
significant effect on the overall quality, overall quality of the code that compiler

53
00:03:44,120 --> 00:03:45,560
is good to produce.

54
00:03:45,560 --> 00:03:51,639
And then about 30 years later, in 1980, a breakthrough occurred where people discovered

55
00:03:51,639 --> 00:03:56,280
or the group of researchers at IBM discovered a register allocation scheme based on graph

56
00:03:56,280 --> 00:03:57,479
coloring.

57
00:03:57,479 --> 00:03:59,879
And the great thing about this scheme is that it's pretty simple.

58
00:03:59,879 --> 00:04:01,800
It's easy to explain.

59
00:04:01,800 --> 00:04:06,120
It's global, meaning it takes advantage of information from the entire control flow graph

60
00:04:06,120 --> 00:04:07,439
at the same time.

61
00:04:07,439 --> 00:04:11,439
It also happens to work well in practice.

62
00:04:11,439 --> 00:04:20,160
And here's the basic principle that underlies the modern register allocation algorithms.

63
00:04:20,160 --> 00:04:25,519
So if I have two temporaries, T1 and T2, I want to know when they can share a register.

64
00:04:25,519 --> 00:04:27,920
So they're allowed to share a register.

65
00:04:27,920 --> 00:04:33,560
They're allowed to be in the same register if they are not live at the same time.

66
00:04:33,560 --> 00:04:38,439
So if at any point in the program, it most one of T1 or T2 is live.

67
00:04:38,439 --> 00:04:44,639
And the more concise way, which I already said, at least partially, is that if T1 and T2

68
00:04:44,639 --> 00:04:50,560
are live at the same time, meaning that there's some program point where both are live,

69
00:04:50,560 --> 00:04:53,519
then they cannot share a register.

70
00:04:53,519 --> 00:04:56,480
So this is the negative form of the statement.

71
00:04:56,480 --> 00:05:00,680
And it just tells you that if you need to values at the same moment in time, then they have

72
00:05:00,680 --> 00:05:05,040
to be in separate registers.

73
00:05:05,040 --> 00:05:07,600
Let's take a look at a control flow graph.

74
00:05:07,600 --> 00:05:11,519
And now we know that in order to do the register allocation, to solve the register allocation

75
00:05:11,519 --> 00:05:15,199
at least in this way, we're going to need live-ness information.

76
00:05:15,199 --> 00:05:20,360
So let's compute the live variables for each point of this program.

77
00:05:20,360 --> 00:05:22,360
So here it is.

78
00:05:22,360 --> 00:05:24,840
And I'll just walk through it very quickly.

79
00:05:24,840 --> 00:05:29,439
Let's assume that on exit from this loop, it only be as live.

80
00:05:29,439 --> 00:05:34,040
So B is the output of this piece of the code, and it's used elsewhere, but none of the other

81
00:05:34,040 --> 00:05:35,040
variables are live.

82
00:05:35,040 --> 00:05:41,000
So now if we work backwards, remember that that line is a backwards analysis.

83
00:05:41,000 --> 00:05:43,120
We'll see here that B is written.

84
00:05:43,120 --> 00:05:46,000
And so it's not live before this statement, but F and C are read.

85
00:05:46,000 --> 00:05:50,399
So both C and F are live before this basic block.

86
00:05:50,399 --> 00:05:56,120
And similarly, if we go up another level here, here we see that E is now live, and F is

87
00:05:56,120 --> 00:05:59,680
dead because F was written here, and E was read.

88
00:05:59,680 --> 00:06:04,639
And over on this path, here we have another exit where B is live.

89
00:06:04,639 --> 00:06:10,280
And now at this point here, right after this basic block, the set of variables that are

90
00:06:10,280 --> 00:06:16,180
live is B, C, and F, because B is live on one path, and C and F are live on the other

91
00:06:16,180 --> 00:06:17,180
path.

92
00:06:17,180 --> 00:06:22,759
Remember, for something to be live, it only has to be live on some, in some future possible

93
00:06:22,759 --> 00:06:24,160
evolution of the execution.

94
00:06:24,160 --> 00:06:29,320
So on some path out of this node, if a variable is live, then it's live at the exit from

95
00:06:29,320 --> 00:06:30,320
this node.

96
00:06:30,320 --> 00:06:38,600
All right, working backwards here, B, C, and F are live here, because E is read, and B,

97
00:06:38,600 --> 00:06:41,400
C, and F are not referred to in this statement.

98
00:06:41,400 --> 00:06:44,360
And so they just propagate upwards.

99
00:06:44,360 --> 00:06:49,920
Here B is removed from the life step because it's written, but D is added in this set here,

100
00:06:49,920 --> 00:06:52,879
and similarly for the other edges in this graph.

101
00:06:52,879 --> 00:06:57,980
If you go and check all the other edges, you will see that the life set is correct, and

102
00:06:57,980 --> 00:07:04,040
it just follows from the simple rules we gave in the previous video.

103
00:07:04,040 --> 00:07:07,360
Now how are we going to use the liveness information to do red-estralication?

104
00:07:07,360 --> 00:07:12,680
Well, we're going to construct an undirected graph, and in this graph there will be a node

105
00:07:12,680 --> 00:07:17,060
for each temporary, so each variable will have a node in the graph, and there'll be an

106
00:07:17,060 --> 00:07:22,620
edge between two temporaries if they are live simultaneously at some point in the

107
00:07:22,620 --> 00:07:23,620
program.

108
00:07:23,620 --> 00:07:30,259
All right, so backing up, and looking at our little example here, we can see, for example,

109
00:07:30,259 --> 00:07:35,100
at this point in the program C and E are both live, they're both in the live set after

110
00:07:35,100 --> 00:07:41,259
this basic blocks executes, so C and E cannot be in the same register.

111
00:07:41,259 --> 00:07:47,740
All right, continuing on, this is called this data structure, this graph is called the

112
00:07:47,740 --> 00:07:54,980
register interference graph or rig for short, and again, the basic idea is that two temporaries

113
00:07:54,980 --> 00:07:59,540
can be allocated in the same register if there is no edge connecting them in the register

114
00:07:59,540 --> 00:08:00,900
interference graph.

115
00:08:00,900 --> 00:08:05,780
So here's the register interference graph for our example.

116
00:08:05,780 --> 00:08:12,860
This is the graph constructed from the code and the liveness analysis that were given a

117
00:08:12,860 --> 00:08:17,579
few slides ago, and it's easy to read off from the graph what the constraints are.

118
00:08:17,579 --> 00:08:23,060
So for example, B and C cannot be in the same register because B and C are connected by

119
00:08:23,060 --> 00:08:28,459
an edge, saying that they're live simultaneously at some point in the program, and so they have

120
00:08:28,459 --> 00:08:30,099
to live in different registers.

121
00:08:30,099 --> 00:08:35,939
On the other hand, notice that there is no edge between B and D, okay, so this edge is missing,

122
00:08:35,939 --> 00:08:40,379
and therefore it's possible that B and D could be allocated in the same register.

123
00:08:40,379 --> 00:08:47,659
Their live ranges or the times at which they are live do not overlap.

124
00:08:47,659 --> 00:08:52,419
So the great thing about the register interference graph is that it extracts exactly the information

125
00:08:52,419 --> 00:08:54,980
needed to characterize the legal register assignment.

126
00:08:54,980 --> 00:08:59,460
So it gives us a representation of all the possible legal register assignments.

127
00:08:59,460 --> 00:09:02,899
Now I haven't said how we actually get a register assignment out of the register interference

128
00:09:02,899 --> 00:09:07,860
graph, but the first step is to characterize the problem in some kind of precise way, and

129
00:09:08,419 --> 00:09:13,740
the graph of cannot live in the same register constraints does that for us.

130
00:09:13,740 --> 00:09:19,180
The other thing that's good about is it gives a global view of the register requirements,

131
00:09:19,180 --> 00:09:21,300
meaning it's over the entire control flow graph.

132
00:09:21,300 --> 00:09:25,220
So it takes into account information from every part of the control flow graph, which will

133
00:09:25,220 --> 00:09:30,060
help us to make good global decisions about what values are important to live in registers.

134
00:09:30,060 --> 00:09:35,940
And finally, the other thing to notice is that after reconstruction, the register allocation

135
00:09:35,940 --> 00:09:39,060
algorithm is going is architecture independent.

136
00:09:39,060 --> 00:09:42,220
Now I haven't shown you the algorithm, so you just have to believe this statement for the

137
00:09:42,220 --> 00:09:43,220
moment.

138
00:09:43,220 --> 00:09:46,740
But it's going to turn out that we're not going to depend on any property of the machine,

139
00:09:46,740 --> 00:09:48,580
except for the number of registers.

140
00:09:48,580 --> 00:09:53,060
That's the only thing we'll need to know about the machine in order to take a rig and do

141
00:09:53,060 --> 00:09:54,540
register allocation using it.

