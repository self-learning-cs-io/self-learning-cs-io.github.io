---
title: CS143 P59Week509 06 A+Type+Environments
---

1
00:00:00,000 --> 00:00:06,799
In this video, we're going to continue our development of cool type checking with a discussion

2
00:00:06,799 --> 00:00:11,359
of type environments.

3
00:00:11,359 --> 00:00:13,679
Let's begin by doing some more type rules.

4
00:00:13,679 --> 00:00:16,800
So here's one for the constant false.

5
00:00:16,800 --> 00:00:22,039
So it's provable that the constant false has the type Boole and that's not too surprising.

6
00:00:22,039 --> 00:00:26,519
If I have a string literal, S, then it's provable that that has type string.

7
00:00:26,519 --> 00:00:30,719
And that's also not very surprising.

8
00:00:30,719 --> 00:00:36,560
The expression new T produces an object of type T. And the type rule for that is very

9
00:00:36,560 --> 00:00:37,719
straightforward.

10
00:00:37,719 --> 00:00:42,240
New T has type T. And we're just going to ignore self type for now.

11
00:00:42,240 --> 00:00:46,679
As I mentioned in an earlier video, we'll deal with self type later in a video all its

12
00:00:46,679 --> 00:00:49,679
own.

13
00:00:49,679 --> 00:00:51,320
Here are a couple of more rules.

14
00:00:51,320 --> 00:00:55,640
If it's provable that an expression E has type Boole, then the Boolean complement of

15
00:00:55,640 --> 00:00:59,200
E not E also has type Boole.

16
00:00:59,200 --> 00:01:04,000
And finally, our perhaps our most complex rule so far, the rule for a while loop.

17
00:01:04,000 --> 00:01:07,200
And we call that the E1 here is the predicate of the loop.

18
00:01:07,200 --> 00:01:10,319
This is what determines if we keep executing the loop or not.

19
00:01:10,319 --> 00:01:12,519
And E2 is the body of the loop.

20
00:01:12,519 --> 00:01:15,079
And so E1 is required to have type Boole.

21
00:01:15,079 --> 00:01:17,920
It needs to be provable that E1 has type Boole.

22
00:01:17,920 --> 00:01:21,400
And we allow E2 the body of the loop to have an arbitrary type.

23
00:01:21,400 --> 00:01:23,599
It can have any type T. It has to have some type.

24
00:01:23,599 --> 00:01:28,399
So it has to be typeable under some rules.

25
00:01:28,399 --> 00:01:30,199
We don't care what the type is.

26
00:01:30,199 --> 00:01:32,640
Because the type of the entire expression is just object.

27
00:01:32,640 --> 00:01:34,759
We don't actually return.

28
00:01:34,759 --> 00:01:38,560
This expression doesn't return an interesting value, doesn't produce an interesting value.

29
00:01:38,560 --> 00:01:42,679
And to discourage people from trying to rely on it, we just type the whole thing as object.

30
00:01:42,679 --> 00:01:44,840
And this is a little bit of a design decision.

31
00:01:44,840 --> 00:01:50,799
We could have designed a language, for example, where the type of a while loop was type T.

32
00:01:50,799 --> 00:01:56,879
And that you would get the last value of the loop that was executed.

33
00:01:56,879 --> 00:02:02,159
But the problem is that if E1, the predicate of the loop is false, entry to the loop the

34
00:02:02,159 --> 00:02:06,679
first time, then you never evaluate E2 and no value is produced.

35
00:02:06,679 --> 00:02:11,840
In that case, you would get a void value, which if somebody tried to dereference it, would

36
00:02:11,840 --> 00:02:13,680
result in a runtime error.

37
00:02:13,680 --> 00:02:18,240
And so the discourage program is from relying on the loop producing a meaningful value.

38
00:02:18,240 --> 00:02:19,719
We could just type it as object.

39
00:02:21,800 --> 00:02:27,439
So far, it's been pretty straightforward to define reasonable type rules for every construct

40
00:02:27,439 --> 00:02:28,439
that we've looked at.

41
00:02:28,439 --> 00:02:30,640
But now we actually come to a problem.

42
00:02:30,640 --> 00:02:34,640
Let's say we have an expression, which consists just of a single variable name.

43
00:02:34,640 --> 00:02:37,400
And that's a perfectly valid, cool expression.

44
00:02:37,400 --> 00:02:40,040
And the question is, what is the type of that variable?

45
00:02:40,040 --> 00:02:41,720
Call it x.

46
00:02:41,720 --> 00:02:47,880
And as you can see, when we're just looking at x by itself, we don't have enough information

47
00:02:47,879 --> 00:02:49,519
to give x a type.

48
00:02:49,519 --> 00:02:55,719
This local structural rule does not carry any information about the type of x.

49
00:02:55,719 --> 00:03:00,039
And stepping back one level, inference rules have the property that all the information

50
00:03:00,039 --> 00:03:01,519
needs to be local.

51
00:03:01,519 --> 00:03:07,319
Everything we need to know to carry out the function of the rule has to be present in the

52
00:03:07,319 --> 00:03:08,319
rule itself.

53
00:03:08,319 --> 00:03:10,000
There are no external data structures.

54
00:03:10,000 --> 00:03:13,759
There's nothing we're passing around here that's on the side.

55
00:03:13,759 --> 00:03:15,680
Everything has to be encoded in this rule.

56
00:03:15,680 --> 00:03:21,280
And so far, at least, we just don't know enough to say what the type of a variable should

57
00:03:21,280 --> 00:03:23,680
be.

58
00:03:23,680 --> 00:03:27,680
So the solution to this problem is just to put more information in the rules.

59
00:03:27,680 --> 00:03:29,200
And that's what we're going to do.

60
00:03:29,200 --> 00:03:34,319
So a type environment gives types for free variables.

61
00:03:34,319 --> 00:03:35,520
So what is a free variable?

62
00:03:35,520 --> 00:03:41,800
A variable is free in an expression if it is not defined within that expression.

63
00:03:41,800 --> 00:03:47,640
So for example, in the expression x, x is free.

64
00:03:47,640 --> 00:03:52,960
In the expression x plus y, well, here this expression uses both x and y.

65
00:03:52,960 --> 00:03:57,120
And there's no definition of either x or y in that expression.

66
00:03:57,120 --> 00:04:01,560
So x and y are free in that expression.

67
00:04:01,560 --> 00:04:10,560
If I have let y dot that dot, so I'm declaring a variable y in x plus y, well, what's free

68
00:04:10,560 --> 00:04:12,120
in this expression?

69
00:04:12,120 --> 00:04:18,160
Well, this expression uses x and y, but the use of y is governed by a definition of y that

70
00:04:18,160 --> 00:04:20,399
occurs within the expression itself.

71
00:04:20,399 --> 00:04:23,280
So we say here that y is bound.

72
00:04:23,280 --> 00:04:28,120
Y is a bound variable in this expression, but x is still free.

73
00:04:28,120 --> 00:04:32,000
So only x is free in that expression.

74
00:04:32,000 --> 00:04:37,120
And the idea here is that if I have an expression with free variables and you want me to type

75
00:04:37,120 --> 00:04:40,840
you check it, you have to tell me what the types of those variables are.

76
00:04:40,840 --> 00:04:44,519
So I can type check x if you tell me what the type of x is.

77
00:04:44,519 --> 00:04:49,280
I can type check x plus y if you tell me the types of x and y.

78
00:04:49,280 --> 00:04:53,160
And I can type check this expression, this lead expression, if you tell me the type of

79
00:04:53,160 --> 00:04:57,759
it's one free variable x, the type of y will be given by the declaration in the lead, but

80
00:04:57,759 --> 00:05:01,079
you still have to tell me what the type of x is.

81
00:05:01,079 --> 00:05:05,360
And so the free variables are just those variables where you have to give me the information.

82
00:05:05,360 --> 00:05:07,840
And then I can carry out the type checking.

83
00:05:07,840 --> 00:05:10,759
And the type environment encodes this information.

84
00:05:10,759 --> 00:05:18,800
So a type environment is a function from object identifiers from variable names to types.

85
00:05:18,800 --> 00:05:24,879
So let O be a type environment, one of these functions from object identifier names types.

86
00:05:24,879 --> 00:05:29,639
And now we're going to extend the kinds of logical statements that we prove to look like

87
00:05:29,639 --> 00:05:30,639
this.

88
00:05:30,639 --> 00:05:34,400
And the way this is going to be read is that under the assumptions that variables have the

89
00:05:34,399 --> 00:05:39,279
types given by O. So the assumptions go over here on the left side of the turn style.

90
00:05:39,279 --> 00:05:43,599
These are the assumptions that we're making about the free variables in E. So on the assumption

91
00:05:43,599 --> 00:05:49,159
that, excuse me, free variables have the types given by O is provable.

92
00:05:49,159 --> 00:05:57,439
That's this turn style here that the expression E has type T. And so this notation very nicely

93
00:05:57,439 --> 00:05:59,439
separates what we're assuming.

94
00:05:59,439 --> 00:06:05,079
This is input to our process of figuring out what the type is from what we're proving.

95
00:06:05,079 --> 00:06:10,160
So if you tell me the types of the free variables that's given by O, then I can tell you the

96
00:06:10,160 --> 00:06:15,040
type of E.

97
00:06:15,040 --> 00:06:19,879
The type environment has to be added to all the rules that we've gone through so far.

98
00:06:19,879 --> 00:06:24,959
So for example, for integer literals, if I have some set of assumptions about the types

99
00:06:24,959 --> 00:06:27,799
of variables, that doesn't really change.

100
00:06:27,799 --> 00:06:31,599
In fact, it doesn't change what the type is of an integer literal.

101
00:06:31,599 --> 00:06:33,799
Any integer literal will still have type int.

102
00:06:33,799 --> 00:06:39,279
And so in this case, for this particular kind of expression, I, we don't use any of our

103
00:06:39,279 --> 00:06:42,679
assumptions about the types of variables.

104
00:06:42,679 --> 00:06:46,439
Now it's a little bit different with the case of some expression.

105
00:06:46,439 --> 00:06:51,879
So if I have the expression E1 plus E2 and I have some assumptions, O, about the types

106
00:06:51,879 --> 00:06:57,279
of variables, well, then I want to prove that E1 has type int.

107
00:06:57,279 --> 00:07:03,199
And I'm going to do that using the types of the variables given by O. So E1 might contain

108
00:07:03,199 --> 00:07:04,199
free variables.

109
00:07:04,199 --> 00:07:07,560
And I'll need to look at O to figure out what the types of those variables are.

110
00:07:07,560 --> 00:07:12,439
And similarly for E2, I will type E2 under the same set of assumptions.

111
00:07:12,439 --> 00:07:17,439
And if E1 has type int under the assumptions O and E2 has type int under the assumptions

112
00:07:17,439 --> 00:07:23,240
O, well, then I can conclude that E1 plus E2 has type int under the same set of assumptions

113
00:07:23,240 --> 00:07:27,759
O. And we can also write new rules.

114
00:07:27,759 --> 00:07:32,879
So now our big problem with free variables becomes a very easy problem.

115
00:07:32,879 --> 00:07:38,839
If I want to know what the type of X is and there's a missing O here, if I want to know

116
00:07:38,839 --> 00:07:42,959
what the type of X is, I simply look it up in my object environment.

117
00:07:42,959 --> 00:07:47,699
So under the assumption that the variables have the types given by O, what is the type

118
00:07:47,699 --> 00:07:48,699
of X?

119
00:07:48,699 --> 00:07:51,639
Well, I look up in O, what the type of X is assumed to be.

120
00:07:51,639 --> 00:08:00,199
And then I can prove that X has that type T. So now let's take a look at a rule that

121
00:08:00,199 --> 00:08:05,199
actually does something interesting with the variables from the point of view of the environments.

122
00:08:05,199 --> 00:08:08,719
So here is a let expression.

123
00:08:08,719 --> 00:08:10,479
And let's remind ourselves what this does.

124
00:08:10,480 --> 00:08:13,080
This is a let expression that has no initialization.

125
00:08:13,080 --> 00:08:16,520
So it says that X is going to be a new variable.

126
00:08:16,520 --> 00:08:21,420
It's going to have type T0 and that variable is going to be visible in the sub-expression

127
00:08:21,420 --> 00:08:22,720
E1.

128
00:08:22,720 --> 00:08:24,520
And so now how am I going to type check that?

129
00:08:24,520 --> 00:08:28,439
Well, I'm going to type check E1 in some kind of environment.

130
00:08:28,439 --> 00:08:30,439
And this is a new notation here.

131
00:08:30,439 --> 00:08:32,800
So let me define what it means.

132
00:08:32,800 --> 00:08:38,360
So remember, always a function, it maps variable names to types.

133
00:08:38,360 --> 00:08:43,480
And O, T slash X, this notation here is also a function.

134
00:08:43,480 --> 00:08:50,279
And what this is is the function O modified at the single point X to return T. So in particular,

135
00:08:50,279 --> 00:08:53,519
this function, this whole thing here is one function.

136
00:08:53,519 --> 00:08:55,919
This whole thing I'm underlining here is a function.

137
00:08:55,919 --> 00:09:02,639
That applied to X is returns T. So that says that this set of assumptions says that X

138
00:09:02,639 --> 00:09:11,159
has type T. And for any other variable, if I apply it to some other variable Y, where

139
00:09:11,159 --> 00:09:18,559
X is different from Y, well, then I just get whatever type Y has a no.

140
00:09:18,559 --> 00:09:24,960
So what this rule then says is I'm going to type check E1 in the same environment O except

141
00:09:24,960 --> 00:09:28,960
that at point X, it's going to have the type T0.

142
00:09:28,960 --> 00:09:32,400
So we're going to change just the type of X to have type T0 because that's the type

143
00:09:32,400 --> 00:09:35,040
of the new identifier that's bound in E1.

144
00:09:35,040 --> 00:09:36,480
And all the other types will be the same.

145
00:09:36,480 --> 00:09:39,639
And using those assumptions, I'll try to prove that E1 has some type.

146
00:09:39,639 --> 00:09:42,200
I will get a type E1.

147
00:09:42,200 --> 00:09:47,200
And then that will be the type of the entire let expression.

148
00:09:47,200 --> 00:09:50,879
Now notice something about the type environment.

149
00:09:50,879 --> 00:09:57,240
What this says is that before we type check E1, we need to modify our set of assumptions,

150
00:09:57,240 --> 00:10:01,639
modify our type environment to include a new assumption about X.

151
00:10:01,639 --> 00:10:03,120
Then we type check E1.

152
00:10:03,120 --> 00:10:09,159
And then of course when we leave type checking E1, we're going to remove that assumption about

153
00:10:09,159 --> 00:10:14,919
X, that new assumption because outside of the let, we just have the original set of assumptions

154
00:10:14,919 --> 00:10:20,600
O. And so hope that that terminology in that description reminds you something we talked

155
00:10:20,600 --> 00:10:25,639
about earlier because this type environment is really implemented by the simple table.

156
00:10:25,639 --> 00:10:32,000
So in our rules, the type environment carries around the information that will be stored

157
00:10:32,000 --> 00:10:35,240
or is typically stored in the simple table of a compiler.

