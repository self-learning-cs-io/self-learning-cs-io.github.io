---
title: MIT6042J P11144TruthTablesVideo
---

1
00:00:00,000 --> 00:00:10,560
Just as truth tables provide a simple, direct way to define the meanings of the individual

2
00:00:10,560 --> 00:00:12,300
propositional.

3
00:00:12,300 --> 00:00:13,660
Connectives are propositional operators.

4
00:00:13,660 --> 00:00:18,359
They also provide a methodical way to understand the behavior of formulas, and in particular,

5
00:00:18,359 --> 00:00:22,859
whether two formulas are equivalent, or whether a formula is valid, meaning that it's always

6
00:00:22,859 --> 00:00:23,859
true.

7
00:00:23,859 --> 00:00:26,780
So let's take a look at that.

8
00:00:26,780 --> 00:00:32,579
To begin with, if I'm thinking about a propositional formula that's a composite one that's built

9
00:00:32,579 --> 00:00:36,439
out of lots of more atomic primitive ones, then in order to figure out the value of the

10
00:00:36,439 --> 00:00:40,780
whole thing, I need to know the values of the individual components.

11
00:00:40,780 --> 00:00:46,180
So if we think of a formula involving p's and q's and r's that are true, false value,

12
00:00:46,180 --> 00:00:51,659
propositional variables, then I need a truth assignment to know the values of those variables

13
00:00:51,659 --> 00:00:56,280
in order to know whether or not the formula is true or false.

14
00:00:56,280 --> 00:01:02,380
So in computer science, you are going to have this process of assigning values to variables

15
00:01:02,380 --> 00:01:06,480
is called an environment, although logicians would call it a truth assignment.

16
00:01:06,480 --> 00:01:11,400
So an environment tells you given a variable whether or not it's true or false.

17
00:01:11,400 --> 00:01:19,560
Let's look at an example of three variables, p, q, and r, they're true, false value,

18
00:01:19,560 --> 00:01:24,599
and I'm going to tell you that this, I've got an environment v in which p is true and q

19
00:01:24,599 --> 00:01:27,179
is true and r is false.

20
00:01:27,179 --> 00:01:28,839
So v of p is t, et cetera.

21
00:01:28,839 --> 00:01:35,719
So I'm thinking of v as a function that maps a variable to its value.

22
00:01:35,719 --> 00:01:41,759
Now let's see how I would use this particular environment to figure out the value of this

23
00:01:41,759 --> 00:01:48,599
composite formula whose atomic parts are p and q and r and q again.

24
00:01:48,599 --> 00:01:49,599
Okay.

25
00:01:49,599 --> 00:01:54,479
Let's take a look at how we would go about figuring out the value of this whole formula given

26
00:01:54,480 --> 00:01:59,840
the values of p, q and r is pretty straightforward but the methodical way to do it is sort of from

27
00:01:59,840 --> 00:02:01,240
inside out.

28
00:02:01,240 --> 00:02:07,480
Let's begin by attaching the truth values that were given to those particular variables.

29
00:02:07,480 --> 00:02:08,480
Okay.

30
00:02:08,480 --> 00:02:14,439
Now notice here that I've got both arms of the and have been assigned truth values and

31
00:02:14,439 --> 00:02:15,640
they're both true.

32
00:02:15,640 --> 00:02:21,599
That means I can assign true to the conjunction formula and I do that by putting the t under

33
00:02:21,599 --> 00:02:26,719
that and which is the principal connective of this sub formula.

34
00:02:26,719 --> 00:02:33,400
Now looking back at this q, I've got its true which means the knot of q is false so I can

35
00:02:33,400 --> 00:02:36,439
put a false under the knot.

36
00:02:36,439 --> 00:02:40,359
Now notice I've got both arms of this x or are defined.

37
00:02:40,359 --> 00:02:41,919
They're both false.

38
00:02:41,919 --> 00:02:45,560
That means that the x or is false because it's only supposed to be true if exactly one

39
00:02:45,560 --> 00:02:47,199
of them is true.

40
00:02:47,199 --> 00:02:54,439
And next I had this true for n that means the knot of that formula is false.

41
00:02:54,439 --> 00:03:00,399
And now that I have both arms of the or this one is false and that one is false I can conclude

42
00:03:00,399 --> 00:03:07,280
that the entire expression is false by putting that final truth value under the principal connective

43
00:03:07,280 --> 00:03:08,560
of the whole formula.

44
00:03:08,560 --> 00:03:11,639
So that's actually an easily defined recursive process.

45
00:03:11,639 --> 00:03:16,679
I've described it from inside out but if you were programming it you would be doing it recursively

46
00:03:16,680 --> 00:03:23,719
top down in order to evaluate the truth value of a formula given the truth values of its

47
00:03:23,719 --> 00:03:28,040
constituent variables given and environment.

48
00:03:28,040 --> 00:03:33,760
Now a basic idea about propositional formulas is to two of them are one.

49
00:03:33,760 --> 00:03:38,840
If and only if they have the same truth values in all environments, in all environments.

50
00:03:38,840 --> 00:03:43,040
No matter what the values of the of the p's and q's and r's are no matter what the truth

51
00:03:43,039 --> 00:03:46,719
value is these two formulas come out to the same truth value.

52
00:03:46,719 --> 00:03:47,879
That's what makes them equivalent.

53
00:03:47,879 --> 00:03:51,799
Let's look at an important example known as de Morgan's law.

54
00:03:51,799 --> 00:03:57,799
So de Morgan's law says that if I look at this formula the knot of p or q, the negation

55
00:03:57,799 --> 00:04:04,879
of p or q, I claim that that's equivalent to knot p and knot q.

56
00:04:04,879 --> 00:04:07,879
And let's check that with a truth table.

57
00:04:07,879 --> 00:04:13,479
Okay, so here's going to be the truth table for the first formula not p or q.

58
00:04:13,479 --> 00:04:16,719
So let's write out the four possible values for p and q.

59
00:04:16,719 --> 00:04:20,000
These are the four possible environments one per row.

60
00:04:20,000 --> 00:04:23,600
And there is the formula of the whose value I'm trying to compute.

61
00:04:23,600 --> 00:04:25,680
So we do it in the usual way.

62
00:04:25,680 --> 00:04:29,000
I'm not going to repeat the truth values of p and q because they're given here but I can

63
00:04:29,000 --> 00:04:34,719
fill in the values of the or because I know the truth table for or and I discover that

64
00:04:34,720 --> 00:04:39,240
the first three rows this sub or sub formula is true in the last place's false when both

65
00:04:39,240 --> 00:04:40,240
of them are false.

66
00:04:40,240 --> 00:04:44,120
And that means that I know the value of the whole formula which is the negation, the knot

67
00:04:44,120 --> 00:04:50,360
of all those values just flips the truth and false and that is the final truth values for

68
00:04:50,360 --> 00:04:53,800
this dot p or q in all possible environments.

69
00:04:53,800 --> 00:04:56,440
Let's do the same thing for not p and not q.

70
00:04:56,440 --> 00:05:00,760
Well, this time I'll fill in the values of not p and not q because they're not just

71
00:05:00,760 --> 00:05:01,760
repeated there.

72
00:05:02,360 --> 00:05:08,920
So the knot p is the flip of the p column and the knot q is the flip of the q column and

73
00:05:08,920 --> 00:05:14,519
now I can fill in the values of the and and of course the end is going to be true only

74
00:05:14,519 --> 00:05:17,719
when they're both true and otherwise it's going to be false.

75
00:05:17,719 --> 00:05:20,039
And look what I've got.

76
00:05:20,039 --> 00:05:27,159
The possible truth values of the first formula not p or q in all possible environments is

77
00:05:27,160 --> 00:05:33,840
exactly the same as the possible truth values of not p and not q in those corresponding

78
00:05:33,840 --> 00:05:34,840
environments.

79
00:05:34,840 --> 00:05:40,120
The columns are the same and that means these two formulas are equivalent which is the

80
00:05:40,120 --> 00:05:41,640
proof by truth table.

81
00:05:41,640 --> 00:05:45,960
We just examine all possible environments and verify that in fact they get the same truth

82
00:05:45,960 --> 00:05:47,960
value.

83
00:05:47,960 --> 00:05:52,000
Well, this brings us to a useful other connected we haven't talked about yet called if and

84
00:05:52,000 --> 00:05:53,160
only if.

85
00:05:53,160 --> 00:05:58,920
So the value of the if and only if connective p if and only if q is true if and only if

86
00:05:58,920 --> 00:06:00,360
p and q have the same truth value.

87
00:06:00,360 --> 00:06:03,760
Now this if and only if is an English word that you're supposed to understand what it

88
00:06:03,760 --> 00:06:05,480
means.

89
00:06:05,480 --> 00:06:10,320
And that if and only if is an operator on truth values that we're defining.

90
00:06:10,320 --> 00:06:13,720
Since the English now can be confusing between that if and only if and this if and only

91
00:06:13,720 --> 00:06:18,080
if let's disambiguate by having the truth table for if and only if here it is.

92
00:06:18,079 --> 00:06:22,919
What it says is that when both of them are true p if and only if q is true when both

93
00:06:22,919 --> 00:06:30,039
of them are false p if and only if q is true and otherwise it's false you can check that

94
00:06:30,039 --> 00:06:33,439
p if and only if it's true.

95
00:06:33,439 --> 00:06:39,919
Oh exactly when the complement of px or q is true.

96
00:06:39,919 --> 00:06:46,639
So now we come to two crucial properties of formulas called satisfiability and validity

97
00:06:46,639 --> 00:06:49,439
and let's examine what those are.

98
00:06:49,439 --> 00:06:54,839
So a formula is satisfiable if and only if it's true in some environment that is it's

99
00:06:54,839 --> 00:06:59,719
satisfiable if there's some way to set the values of the variables p and q to be truth

100
00:06:59,719 --> 00:07:04,159
values in such a way that the formula comes out to be true.

101
00:07:04,159 --> 00:07:07,240
And a related idea is that a formula is valid.

102
00:07:07,240 --> 00:07:11,680
It's also called a totology if and only if it's true in all environments.

103
00:07:11,680 --> 00:07:15,519
No matter what you set the variables to it's going to come out to be true.

104
00:07:15,519 --> 00:07:18,799
Let's look at some examples to solidify those two concepts.

105
00:07:18,799 --> 00:07:24,959
So the formula p all by itself is satisfiable because it can be true if p is true but it's

106
00:07:24,959 --> 00:07:27,759
not always true because p might be false.

107
00:07:27,759 --> 00:07:33,839
Symetically not p is also satisfiable because it can be true if p is false but it's not always

108
00:07:33,839 --> 00:07:40,159
true it's not valid because p might be true in which case not p will be false.

109
00:07:40,160 --> 00:07:43,080
Two formulas of formula that's not satisfiable.

110
00:07:43,080 --> 00:07:48,560
Formule that means that there is no truth value that makes it true which is the same as saying

111
00:07:48,560 --> 00:07:53,080
that it's always false is the formula p and not p.

112
00:07:53,080 --> 00:07:57,920
It's probably the simplest not satisfiable formula or unsatisfiable formula.

113
00:07:57,920 --> 00:08:03,480
So this is clearly false because either p or not p has got to be false in the end.

114
00:08:03,480 --> 00:08:05,600
Well then we'll definitely come out to be false.

115
00:08:05,600 --> 00:08:10,760
There is no value of for p that makes this formula true it's unsatisfiable.

116
00:08:10,760 --> 00:08:17,720
A valid formula actually bites the Morgan's law applied to the p and not p is p or not

117
00:08:17,720 --> 00:08:23,720
p is going to be valid because no matter what true value p has it comes out to be true.

118
00:08:23,720 --> 00:08:28,640
That is one of p and not p is true and therefore the or is going to get at least one true

119
00:08:28,639 --> 00:08:36,399
exactly one true really and going to come out to be true so this is valid.

120
00:08:36,399 --> 00:08:41,919
Now we can connect up the pieces that we've just set up of related relating validity

121
00:08:41,919 --> 00:08:43,080
and equivalence.

122
00:08:43,080 --> 00:08:50,039
Two formulas G and H are equivalent is the same as saying that G if and only if H is valid.

123
00:08:50,039 --> 00:08:56,319
So G if and only if H comes out to be true when G and H have the same truth value and

124
00:08:56,400 --> 00:09:02,280
G and H are equivalent says that they do have the same truth value no matter what the environment is.

125
00:09:02,280 --> 00:09:08,680
So that's the same as saying that if G and H are equivalent no matter what the environment is G if and only if H comes out to be true.

126
00:09:08,680 --> 00:09:15,160
So if G and H are equivalent G if and only if H is valid and the converse argument works the same way.

127
00:09:15,160 --> 00:09:26,280
A very important problem that comes up in multiple ways and we're going to examine some of them later is the problem of whether or not a formula is valid.

128
00:09:26,279 --> 00:09:32,799
Checking that or proving that it's valid and checking whether or not a formula is satisfiable.

129
00:09:32,799 --> 00:09:38,759
Now there's a simple way to do that the truth table tells it to you if you want to know whether the formula is satisfiable.

130
00:09:38,759 --> 00:09:45,720
You just look at its truth table try every possible environment and see whether one of them yields the value true.

131
00:09:45,720 --> 00:09:55,039
The problem with that approach which theoretically is sound but pragmatically the truth table size doubles with each additional variable.

132
00:09:55,039 --> 00:10:06,679
So with two variables you got four rows with three variables you got eight rows with four variables you got 16 rows and this very rapidly gets out of hand once the number of variables gets to be moderate size.

133
00:10:06,679 --> 00:10:10,240
This is exponential growth it's doubling each time you add a variable.

134
00:10:10,240 --> 00:10:16,639
So really when you start having hundreds of variables truth tables are out of the question you just can't write them down they're too big.

135
00:10:16,639 --> 00:10:32,639
And in fact in modern digital circuits when you think back about how we designed the adder if you look at what's going on and all those different wires corresponding to different truth values to different variables there are millions of those in a typical modern digital circuit.

136
00:10:32,639 --> 00:10:40,279
So truth table approach is just not going to be work workable it's hopeless.

137
00:10:40,279 --> 00:10:58,279
Now one of the central problems in theoretical computer science is the question of whether or not there is a way to test for sat that's more efficient than this impossible way of trying to come up with a truth table that's too big to fit in the universe when there are hundreds and thousands of variables.

138
00:10:58,279 --> 00:11:09,639
So we're interested in the question of is there some other way to check a formula for satisfiability than exhaustively trying to generate its whole truth table to see if some row yields true.

139
00:11:09,639 --> 00:11:16,360
This is the abstract version of the pickles NP problem. So we've talked about this before.

140
00:11:16,360 --> 00:11:26,639
Peacals NP question mark is the considered to be the most important open problem in theoretical computer science in the theory of computation.

141
00:11:26,639 --> 00:11:36,639
And it's simply saying is there some fast or efficient way to solve to tell whether or not a formula is satisfiable.

142
00:11:36,639 --> 00:11:47,639
That's more efficient than the truth table approach. Efficiency has a technical definition which is that the number of steps grows much less than exponentially with the number of variables.

143
00:11:47,639 --> 00:11:51,639
Let's say it grows polynomial like a quadratic or a cubic.

144
00:11:51,639 --> 00:11:58,639
But you're trying to beat exponential growth which is what ruins things quickly.

145
00:11:58,639 --> 00:12:07,639
And this is an open problem. No one knows if there is some fast way to check for satisfiability or sat that's the sat problem.

146
00:12:07,639 --> 00:12:18,639
By the way, very closely related to sat is validity because if I wanted to know whether a formula G is valid, well valid means that it's always true.

147
00:12:18,639 --> 00:12:26,639
That means it's complement not G is always false which is the same as saying it's complement is not satisfiable.

148
00:12:26,639 --> 00:12:39,639
So to check that G is valid all I need to do is check that not G is satisfiable and vice versa not G is not satisfiable if and only if G is valid.

149
00:12:39,639 --> 00:12:48,639
And the point is that sat and valid stand and fall together. If you had a fast way to do one you would very quickly get a fast way to do the other one.

150
00:12:48,639 --> 00:13:00,639
So checking for one is just as difficult as checking for the other. And we're going to examine in some lectures why it is that this problem is so important.

