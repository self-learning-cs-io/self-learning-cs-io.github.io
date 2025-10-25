---
title: CS143 P76Week611 02 A+Activations
---

1
00:00:00,000 --> 00:00:08,439
In this video, we're going to begin our discussion of runtime structures with the notion of procedure

2
00:00:08,439 --> 00:00:13,519
activations.

3
00:00:13,519 --> 00:00:18,519
Before we begin the discussion of activations, it's worth being explicit that we have two

4
00:00:18,519 --> 00:00:20,960
overall goals in code generation.

5
00:00:20,960 --> 00:00:26,039
One is to be correct to generate code that actually faithfully implements the programmers

6
00:00:26,039 --> 00:00:27,359
program.

7
00:00:27,359 --> 00:00:32,039
And the second is to be efficient that that code should make good use of resources and

8
00:00:32,039 --> 00:00:36,399
in particular, we often care that it run quickly.

9
00:00:36,399 --> 00:00:40,119
And it's very easy to solve these problems in isolation.

10
00:00:40,119 --> 00:00:45,280
If all we care about is correctness, it's not a hard problem to generate code that's

11
00:00:45,280 --> 00:00:50,760
very simple but also very slow and correctly implements the program.

12
00:00:50,760 --> 00:00:54,079
If all we care about is speed and we don't care about getting the right answer, the problem

13
00:00:54,079 --> 00:00:55,079
is even easier.

14
00:00:55,079 --> 00:01:01,119
We can generate extremely fast programs that generate the wrong answer for any problem

15
00:01:01,119 --> 00:01:03,159
that you care to name.

16
00:01:03,159 --> 00:01:08,079
And so really all the complications in code generation arise from trying to solve these

17
00:01:08,079 --> 00:01:10,959
two problems simultaneously.

18
00:01:10,959 --> 00:01:15,959
And what has grown up over time is a fairly elaborate framework for how a code generator

19
00:01:15,959 --> 00:01:23,039
and the corresponding runtime structures should be done to achieve both of these goals.

20
00:01:23,040 --> 00:01:28,719
And the first step in talking about that is to talk about activations.

21
00:01:28,719 --> 00:01:32,520
We're going to make two assumptions about the kinds of programming languages for which

22
00:01:32,520 --> 00:01:34,200
we're generating code.

23
00:01:34,200 --> 00:01:37,920
The first assumption is that execution is sequential.

24
00:01:37,920 --> 00:01:42,760
Given that we execute a statement, the next statement that will be executed is easy to

25
00:01:42,760 --> 00:01:43,760
predict.

26
00:01:43,760 --> 00:01:46,840
In fact, it's just a function of the statement that we just executed.

27
00:01:46,840 --> 00:01:51,080
So control is going to move from one point in a program to another in some well-defined

28
00:01:51,080 --> 00:01:52,080
order.

29
00:01:52,079 --> 00:01:56,879
Now the second assumption is that when a procedure is called, control will always return to

30
00:01:56,879 --> 00:01:59,120
the point immediately after the call.

31
00:01:59,120 --> 00:02:04,719
That is, if I execute a procedure F, and once F is done executing, control will always

32
00:02:04,719 --> 00:02:09,879
return to the statement that followed the point where F was called.

33
00:02:09,879 --> 00:02:14,599
And there are certainly programming languages and programming language features that violate

34
00:02:14,599 --> 00:02:15,599
these assumptions.

35
00:02:15,599 --> 00:02:21,120
So the most important class of programming languages that violate assumption one are ones

36
00:02:21,159 --> 00:02:23,920
that have concurrency.

37
00:02:23,920 --> 00:02:29,120
So in a concurring program, just because I execute one statement, there's no easy way to predict

38
00:02:29,120 --> 00:02:33,039
what the next statement is that it will be executed because it might be in a completely

39
00:02:33,039 --> 00:02:35,560
different thread.

40
00:02:35,560 --> 00:02:46,759
And for assumption two, advanced control constructs, things like exceptions and call CC.

41
00:02:46,759 --> 00:02:51,040
If you happen to know what call CC is, it's not important if you don't.

42
00:02:51,039 --> 00:02:57,079
These kinds of constructs that affect the flow of control in fairly dramatic ways can

43
00:02:57,079 --> 00:02:58,359
violate assumption two.

44
00:02:58,359 --> 00:03:04,639
So in particular, if you're familiar with catch and throw style exceptions in job and C++,

45
00:03:04,639 --> 00:03:09,599
when we throw an exception, that exception might escape from multiple procedures before

46
00:03:09,599 --> 00:03:10,759
it is caught.

47
00:03:10,759 --> 00:03:13,840
And so there's no guarantee when you call a procedure.

48
00:03:13,840 --> 00:03:18,239
If that procedure can throw an exception, the control will ever return to the point immediately

49
00:03:18,239 --> 00:03:19,479
after the procedure.

50
00:03:19,479 --> 00:03:24,079
So now we're going to keep these assumptions for the rest of the class.

51
00:03:24,079 --> 00:03:31,799
We may later on in future videos briefly discuss how we would accommodate some of these

52
00:03:31,799 --> 00:03:33,959
more advanced features.

53
00:03:33,959 --> 00:03:43,319
The material that we're going to cover is basic to all implementations and even languages

54
00:03:43,319 --> 00:03:48,479
that have concurrency and exceptions built upon the ideas that we're going to discuss here.

55
00:03:50,479 --> 00:03:53,079
So first a definition.

56
00:03:53,079 --> 00:03:57,759
When we invoke a procedure P, we're going to say that is an activation of the procedure

57
00:03:57,759 --> 00:04:04,560
P. And the lifetime of an activation of P is going to be all the steps that are involved

58
00:04:04,560 --> 00:04:10,679
in executing the procedure P and including all the steps in the procedures that P calls.

59
00:04:10,679 --> 00:04:15,879
So it's going to be all the statements that are executed between the moment that P is

60
00:04:15,919 --> 00:04:22,879
called and the moment that P returns, including all the functions or procedures that P itself calls.

61
00:04:26,600 --> 00:04:30,199
We can define an analogous notion of the lifetime of a variable.

62
00:04:30,199 --> 00:04:36,800
So the lifetime of a variable X is going to be the portion of the execution in which X is defined.

63
00:04:36,800 --> 00:04:41,879
That means that it's all the steps of execution from the time that X is first created until

64
00:04:41,879 --> 00:04:45,839
the time when X is destroyed or deallocated.

65
00:04:45,839 --> 00:04:49,199
And just note here that lifetime is a dynamic concept.

66
00:04:49,199 --> 00:04:52,279
So this is something that applies to the executing program.

67
00:04:52,279 --> 00:04:56,599
We're talking about the time when the variable first comes into existence until the moment

68
00:04:56,599 --> 00:04:58,839
in time when it goes out of existence.

69
00:04:58,839 --> 00:05:03,959
And scope on the other hand is a static concept that scope refers to that portion of the

70
00:05:03,959 --> 00:05:07,679
program text in which the variable is visible.

71
00:05:07,679 --> 00:05:12,639
Okay, so this is a very different idea from the lifetime of the variable.

72
00:05:12,639 --> 00:05:18,319
And again, it's very important to keep these two times what happens at runtime and what

73
00:05:18,319 --> 00:05:23,719
happens at compile time or what is associated with the static properties of the program distinct

74
00:05:23,719 --> 00:05:27,000
in your mind.

75
00:05:27,000 --> 00:05:31,959
From the assumptions that we gave a couple of slides ago, we can make a simple observation.

76
00:05:31,959 --> 00:05:39,279
And that is that when a procedure P calls a procedure Q, then Q is going to return before

77
00:05:39,279 --> 00:05:41,199
P returns.

78
00:05:41,199 --> 00:05:46,279
And what that means is that the lifetimes of procedures are going to be properly nested.

79
00:05:46,279 --> 00:05:55,159
And furthermore, that means that we can illustrate or represent activation lifetimes as a tree.

80
00:05:55,159 --> 00:05:58,519
Let's illustrate activations with a simple example.

81
00:05:58,519 --> 00:06:00,519
So here's a little cool program.

82
00:06:00,519 --> 00:06:05,480
And as usual, it will begin running by executing the main method in the main class.

83
00:06:05,480 --> 00:06:11,400
So the first activation and the root of our activation tree for this program is the method

84
00:06:11,400 --> 00:06:13,240
main.

85
00:06:13,240 --> 00:06:22,160
And main is going to call the method G. And so G's lifetime, the set of instructions where

86
00:06:22,160 --> 00:06:27,160
G exists or the period of time of the execution where G exists is going to be properly contained

87
00:06:27,160 --> 00:06:30,040
within the execution of this call to main.

88
00:06:30,040 --> 00:06:33,080
And so we can illustrate that by making G a child of main.

89
00:06:33,079 --> 00:06:38,759
So this indicates the fact that G is a direct child of main indicates that main calls G.

90
00:06:38,759 --> 00:06:45,120
And also that G's lifetime is properly contained within the lifetime of main.

91
00:06:45,120 --> 00:06:54,319
After G returns, main will call F. And so F will also be a child of main.

92
00:06:54,319 --> 00:06:58,680
And then F is itself going to call G again.

93
00:06:58,680 --> 00:07:02,000
So it's going to have another activation of G.

94
00:07:02,000 --> 00:07:08,600
So G will also be a child of F. And this tree, that is actually the complete tree for this

95
00:07:08,600 --> 00:07:11,360
particular example, illustrates a number of things.

96
00:07:11,360 --> 00:07:15,079
First of all, as we've already said, it shows the containment of lifetime.

97
00:07:15,079 --> 00:07:19,240
So again, for example, G's lifetime is contained within main.

98
00:07:19,240 --> 00:07:22,759
But it also shows some other interesting lifetime relationships.

99
00:07:22,759 --> 00:07:28,120
For example, the lifetime of this activation of G and the lifetime of that activation of

100
00:07:28,120 --> 00:07:31,480
F are completely disjoint because there's siblings in the tree.

101
00:07:31,480 --> 00:07:34,560
And so there are lifetime's do not overlap at all.

102
00:07:34,560 --> 00:07:39,080
And another thing to notice here is that there can be multiple occurrences of the same

103
00:07:39,080 --> 00:07:40,879
method in the activation tree.

104
00:07:40,879 --> 00:07:45,200
So every time the method is called, that is a separate activation.

105
00:07:45,200 --> 00:07:52,080
So in this particular activation tree, there are two activations of G.

106
00:07:52,080 --> 00:07:57,319
So here's a somewhat more complicated example that involves a recursive function.

107
00:07:57,319 --> 00:08:03,839
Let's begin here at the first call, so the call to main.

108
00:08:03,839 --> 00:08:07,040
And all main does is call F with the argument 3.

109
00:08:07,040 --> 00:08:12,199
So there is an activation of F from main.

110
00:08:12,199 --> 00:08:13,839
And then what does F do?

111
00:08:13,839 --> 00:08:16,439
Well F asks if it's argument is zero.

112
00:08:16,439 --> 00:08:19,759
And if it is, it calls G, while the initial argument is 3.

113
00:08:19,759 --> 00:08:23,079
So that's not going to be true on the first call to F.

114
00:08:23,079 --> 00:08:28,159
And otherwise it calls F with the argument minus 1.

115
00:08:28,159 --> 00:08:32,439
So I'll just make a note over here on the side about what the argument is because we'll

116
00:08:32,439 --> 00:08:34,399
need to keep track of that.

117
00:08:34,399 --> 00:08:38,879
So F is called with 3, clearly that is not zero.

118
00:08:38,879 --> 00:08:43,360
And so then F is going to be called again with the argument 2.

119
00:08:43,360 --> 00:08:48,439
That will result in F being called yet another time with the argument 1.

120
00:08:48,440 --> 00:09:01,960
And finally F will be called with the argument 0, which will then result in a call to G.

121
00:09:01,960 --> 00:09:07,240
And so this is the activation tree for this particular program.

122
00:09:07,240 --> 00:09:12,360
And again notice that there can be multiple activations of a procedure in the same run of

123
00:09:12,360 --> 00:09:13,360
the program.

124
00:09:13,360 --> 00:09:17,200
It just indicates that the same procedure can be called multiple times.

125
00:09:17,200 --> 00:09:22,840
And also note that a recursive procedure will result in nesting of activations of the

126
00:09:22,840 --> 00:09:24,240
same function within itself.

127
00:09:24,240 --> 00:09:26,080
So F calls itself.

128
00:09:26,080 --> 00:09:30,840
And so the lifetime, say of the second call to F, is properly contained within the lifetime

129
00:09:30,840 --> 00:09:32,080
of the first call to F.

