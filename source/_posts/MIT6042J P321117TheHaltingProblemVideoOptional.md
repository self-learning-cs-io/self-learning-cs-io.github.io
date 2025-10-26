---
title: MIT6042J P321117TheHaltingProblemVideoOptional
---

1
00:00:00,000 --> 00:00:08,640
The arguments are elegant and infinite sets.

2
00:00:08,640 --> 00:00:14,120
Some people think are romantic, but you could legitimately ask, what is all this weird

3
00:00:14,120 --> 00:00:17,760
infinite stuff doing in a course that's math for computer science?

4
00:00:17,760 --> 00:00:22,800
And the reason is that diagonal arguments turn out to play a fundamental role in the theory

5
00:00:22,800 --> 00:00:23,800
of computing.

6
00:00:23,800 --> 00:00:28,359
And what we're going to talk about now is the application of diagonal arguments to show

7
00:00:28,359 --> 00:00:34,880
that there are non-computable sets and examine a particular one.

8
00:00:34,880 --> 00:00:42,359
So let's look at the class of infinite binary strengths.

9
00:00:42,359 --> 00:00:48,760
Now, we've seen that there are an uncountable number of infinite binary strengths, and that's

10
00:00:48,760 --> 00:00:54,439
because there was a simple bijection between the infinite binary strengths and the subsets

11
00:00:54,439 --> 00:00:55,439
of the natural numbers.

12
00:00:55,439 --> 00:00:58,120
That is the power set of n.

13
00:00:58,119 --> 00:01:04,719
Let's look at the infinite binary strengths that we might think of in a computable string.

14
00:01:04,719 --> 00:01:08,879
So what I mean by a computable string is that there's simply a procedure that will tell

15
00:01:08,879 --> 00:01:10,479
me what its digits are.

16
00:01:10,479 --> 00:01:16,039
So what I mean is that the procedure applied to argument n will return the n's digit

17
00:01:16,039 --> 00:01:17,879
of the string s.

18
00:01:17,879 --> 00:01:20,560
That's the definition of what I mean by saying s is computable.

19
00:01:20,560 --> 00:01:24,000
I can compute its digits, whichever digits are needed.

20
00:01:25,000 --> 00:01:30,920
Now, we saw that there were only a countable number of finite binary sequences.

21
00:01:30,920 --> 00:01:35,480
And I mentioned that now because I want to think about sequences over the slightly larger

22
00:01:35,480 --> 00:01:40,519
alphabet instead of 0, 1, the 256 ASCII characters.

23
00:01:40,519 --> 00:01:45,960
And by the same argument, the set of finite ASCII strings is also countable.

24
00:01:45,960 --> 00:01:50,760
You just list them in order of length, same argument that we used for the binary strengths.

25
00:01:50,760 --> 00:01:57,040
Now, the point of looking at the ASCII strings, the 256 keyboard characters, is that every

26
00:01:57,040 --> 00:02:04,400
procedure that we enter into a computer, we type in an ASCII string.

27
00:02:04,400 --> 00:02:08,719
Every procedure can be represented by an ASCII string.

28
00:02:08,719 --> 00:02:14,080
And since there are only countably many finite ASCII strings, it follows that there are

29
00:02:14,080 --> 00:02:18,000
only countably many computable procedures.

30
00:02:18,000 --> 00:02:23,240
Now, since in order to be a computable infinite binary string, there has to be a procedure which

31
00:02:23,240 --> 00:02:29,759
computes its digits, we can immediately conclude that there are only countably many infinite

32
00:02:29,759 --> 00:02:36,719
binary sequences that are computable, only countably many computable infinite binary sequences.

33
00:02:36,719 --> 00:02:41,159
But I already said there are an uncountable number of those infinite binary sequences.

34
00:02:41,159 --> 00:02:46,560
So it has to be that there are non-computable sequences, non-computable infinite binary

35
00:02:46,560 --> 00:02:49,080
strings that exist.

36
00:02:49,080 --> 00:02:54,680
So we can conclude that as a matter of fact, since the set of infinite binary strings is uncountable

37
00:02:54,680 --> 00:03:01,360
and the computable ones are a countable subset, there have to be an uncountable number of

38
00:03:01,360 --> 00:03:04,680
non-computable infinite binary sequences.

39
00:03:04,680 --> 00:03:09,039
Most infinite binary sequences are actually not computable.

40
00:03:09,039 --> 00:03:12,599
Okay, that's kind of abstract thing to know.

41
00:03:12,599 --> 00:03:16,400
You're out there and you can't get a hold of them computationally, but the reasonable

42
00:03:16,400 --> 00:03:20,159
question to ask is what do they look like?

43
00:03:20,159 --> 00:03:27,240
And what we're going to see is that if you consider a particular sensible, concrete, computational

44
00:03:27,240 --> 00:03:34,680
problem of giving a procedure, figuring out whether it will run forever, it returns an

45
00:03:34,680 --> 00:03:37,519
error, we don't get a satisfactory value out.

46
00:03:37,520 --> 00:03:39,000
And if it does, it's satisfactory.

47
00:03:39,000 --> 00:03:42,000
It turns something, we say it holds.

48
00:03:42,000 --> 00:03:48,040
And what I'm going to argue is that the whole thing problem is not decidable.

49
00:03:48,040 --> 00:03:55,200
That is, there's no procedure which, given an input that describes a procedure, the fixed

50
00:03:55,200 --> 00:03:57,760
procedure can figure out what its input is doing.

51
00:03:57,760 --> 00:04:00,719
Let's look at that in more detail.

52
00:04:00,719 --> 00:04:04,240
So let's think about string procedures because we're thinking about procedures being

53
00:04:04,240 --> 00:04:06,200
represented by ASCII strings.

54
00:04:06,199 --> 00:04:08,759
So let's think about procedures that take a string argument.

55
00:04:08,759 --> 00:04:12,759
So an example of a procedure paid, it might be that when you apply paid to the string,

56
00:04:12,759 --> 00:04:18,079
no, it returns to, when you apply it to the string, Albert, it returns buyer.

57
00:04:18,079 --> 00:04:25,000
When you apply it to this string of weird symbols, that causes an error and you apply it to

58
00:04:25,000 --> 00:04:29,639
the sequence of characters what now and it actually runs forever.

59
00:04:29,639 --> 00:04:35,240
These are just illustrations of the kind of behavior that some weird string procedure might

60
00:04:35,240 --> 00:04:37,600
exhibit.

61
00:04:37,600 --> 00:04:43,960
So what I want to think about is suppose that I have an ASCII string, ASCII string, that's

62
00:04:43,960 --> 00:04:46,079
the one that defines this procedure paid.

63
00:04:46,079 --> 00:04:50,879
When I'm trying to run P on the computer, I have to type in S in order to give the computer

64
00:04:50,879 --> 00:04:53,680
the definition of P to tell it what to do.

65
00:04:53,680 --> 00:04:59,639
And I'm going to say that S holds the string has this property called Holt-Think or Holtz.

66
00:04:59,639 --> 00:05:06,800
If and only if this procedure P that S describes returns successfully when it's applied to S,

67
00:05:06,800 --> 00:05:09,959
this is where we're counting, this is where we're really doing a diagonal argument.

68
00:05:09,959 --> 00:05:17,319
We're taking the S object, the procedure that's described by S and applying it to S.

69
00:05:17,319 --> 00:05:25,279
And that's kind of going down the diagonal of S applied to S where the end of the end

70
00:05:25,279 --> 00:05:28,039
is going to throw in the pictorial diagonal argument.

71
00:05:28,039 --> 00:05:29,679
That's the idea that we're going here.

72
00:05:29,679 --> 00:05:31,399
But let's just go back to the definition.

73
00:05:31,399 --> 00:05:37,959
A string is said to Holt if when you interpret it as the description of a procedure that

74
00:05:37,959 --> 00:05:43,119
takes a string argument and you apply that string procedure to that very same thing you

75
00:05:43,119 --> 00:05:45,959
S, you successfully return.

76
00:05:45,959 --> 00:05:48,599
That's the Holting problem.

77
00:05:48,599 --> 00:05:54,399
And what I want to argue is that it's impossible that there could be a procedure Q that

78
00:05:54,399 --> 00:05:58,319
decided the property Holtz of string.

79
00:05:58,319 --> 00:06:05,519
That is to say, Q applied to a string returns yes if S does return successfully if S holds.

80
00:06:05,519 --> 00:06:07,479
And it returns no otherwise.

81
00:06:07,479 --> 00:06:14,839
Q applied to S will say no if S runs forever or if S has a type error or S does anything

82
00:06:14,839 --> 00:06:18,120
other than successfully return a value.

83
00:06:18,120 --> 00:06:23,000
Let's suppose for the sake of contradiction that there was this Holtz decider, I claim

84
00:06:23,000 --> 00:06:27,720
there can't be such a Q first sake of contribution of contradiction.

85
00:06:27,720 --> 00:06:30,000
Let's assume there was none.

86
00:06:30,000 --> 00:06:32,279
Then this is the trick that I'm going to do.

87
00:06:32,279 --> 00:06:39,000
I'm going to modify Q to be a to act as though it was complementing the diagonal.

88
00:06:39,000 --> 00:06:40,800
More precisely this is what I'm going to do with Q.

89
00:06:40,800 --> 00:06:46,800
I'm going to modify Q to be another procedure Q prime which just behaves a little bit differently.

90
00:06:46,800 --> 00:06:51,920
Namely, Q prime of S returns yes when Q of S returns no.

91
00:06:51,920 --> 00:06:55,360
Q prime of S returns nothing.

92
00:06:55,360 --> 00:06:59,360
That is, it doesn't hold if Q of S returns yes.

93
00:06:59,360 --> 00:07:04,720
So Q prime is like complementing the bits on the diagonal, but here's the precise definition.

94
00:07:04,720 --> 00:07:12,240
Q of S says no, Q of prime of S says yes, Q of S says yes, S holds successfully.

95
00:07:12,240 --> 00:07:17,360
Q prime then does not hold successfully and returns nothing at all.

96
00:07:17,360 --> 00:07:18,439
Let's go ahead.

97
00:07:18,439 --> 00:07:25,560
If and only if the string S prime makes a runtime type error, because remember the interpreter,

98
00:07:25,560 --> 00:07:31,680
which is what S prime was behaving like, was watching what S simulating what S did.

99
00:07:31,680 --> 00:07:36,240
And if S was going to hold successfully, S prime makes a runtime type error.

100
00:07:36,240 --> 00:07:42,319
That means that C is going to say S, yes, to S prime, yes, it has a runtime type error.

101
00:07:42,319 --> 00:07:46,800
And by definition of H, that means that H of S says yes.

102
00:07:46,800 --> 00:07:50,319
Because H of S constructed S prime fed it to C.

103
00:07:50,319 --> 00:07:51,319
Okay.

104
00:07:51,319 --> 00:07:59,680
On the other hand, if S does not hold, that means that something else goes wrong with S.

105
00:07:59,680 --> 00:08:02,160
It's not going to successfully return.

106
00:08:02,160 --> 00:08:09,480
Then S prime, when it's simulating S, is never going to make a runtime type error because

107
00:08:09,480 --> 00:08:13,280
that's the way S prime goes whenever it detects that there would be about to be a runtime

108
00:08:13,280 --> 00:08:14,280
type error.

109
00:08:14,280 --> 00:08:15,280
It skips it.

110
00:08:15,279 --> 00:08:19,719
So, the runtime is likely to keep running forever because it's simulating this program S that

111
00:08:19,719 --> 00:08:23,679
doesn't hold, but it won't make a type error.

112
00:08:23,679 --> 00:08:27,679
And that means that C of S prime is going to say no, no type error.

113
00:08:27,679 --> 00:08:30,479
And H of S is going to say no.

114
00:08:30,479 --> 00:08:35,240
And that means that when S does not hold H of S properly says no.

115
00:08:35,240 --> 00:08:40,559
In other words, I've just walked through the argument that this procedure H that I've

116
00:08:40,559 --> 00:08:44,600
described actually is a decider for H.

117
00:08:44,600 --> 00:08:46,080
And that's a contradiction.

118
00:08:46,080 --> 00:08:51,159
H, the H that I gave you would solve the whole thing problem if there was a perfect type

119
00:08:51,159 --> 00:08:56,840
checker and there can't be a whole thing problem decider so there can't be a perfect type

120
00:08:56,840 --> 00:08:57,840
checker.

121
00:08:57,840 --> 00:08:59,320
C must make a mistake.

122
00:08:59,320 --> 00:09:03,840
It can't accurately predict runtime errors.

123
00:09:03,840 --> 00:09:11,000
And that is an example of how you reasoned from this kind of contrived whole thing problem

124
00:09:11,000 --> 00:09:18,440
that's sort of self-referential, whether the string procedure applied to its own definition

125
00:09:18,440 --> 00:09:19,720
holds or not.

126
00:09:19,720 --> 00:09:24,080
And we can apply it to all sorts of questions and properties of procedures that we really

127
00:09:24,080 --> 00:09:25,080
care about.

128
00:09:25,080 --> 00:09:27,960
And in fact, the same reason really shows that it's not just type checking.

129
00:09:27,960 --> 00:09:29,759
That's a kind of arbitrary example.

130
00:09:29,759 --> 00:09:35,759
But there's more or less no perfect checker for any kind of property that procedure outcomes

131
00:09:35,759 --> 00:09:37,480
might exhibit.

132
00:09:37,480 --> 00:09:42,639
Which is why computer scientists, a theoretical computer scientist, interested in the theory

133
00:09:42,639 --> 00:09:48,680
of computation have great respect and interest in diagonal arguments because they crystallize

134
00:09:48,680 --> 00:09:55,879
a whole set of absolutely logical intrinsic limitations on the power of computation.

