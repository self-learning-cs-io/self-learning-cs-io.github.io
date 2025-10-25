---
title: CS143 P92Week713 01 Semantics Overview
---

1
00:00:00,000 --> 00:00:08,560
This is the first of a series of videos on programming language semantics, and in particular,

2
00:00:08,560 --> 00:00:10,400
on the semantics of cool.

3
00:00:10,400 --> 00:00:14,519
Before we dive into the technical details, though, I want to spend a few minutes talking

4
00:00:14,519 --> 00:00:21,960
about what programming language semantics are and why we need them.

5
00:00:21,960 --> 00:00:27,839
The problem we have to address is that we need some way to say what behavior we expect

6
00:00:27,839 --> 00:00:29,640
when we run a cool program.

7
00:00:29,640 --> 00:00:35,560
So for every kind of cool expression for everyone, we have to say what happens when it's

8
00:00:35,560 --> 00:00:36,960
evaluated.

9
00:00:36,960 --> 00:00:39,640
And we can regard this as the meaning of the expression.

10
00:00:39,640 --> 00:00:44,799
We somehow give rules that specify what a particular, what kind of computation a particular

11
00:00:44,799 --> 00:00:46,840
expression does.

12
00:00:46,840 --> 00:00:54,760
And I think it's useful to look back and see how we dealt with this with similar problems

13
00:00:54,759 --> 00:01:01,640
in defining other parts of cool, the earlier things that we looked at in this course.

14
00:01:01,640 --> 00:01:09,640
So for example, for lexical analysis, we defined a family of tokens using regular expressions.

15
00:01:09,640 --> 00:01:17,039
And for the syntax of the language, we use context-free grammars to specify the structure

16
00:01:17,039 --> 00:01:23,959
of the how words could be strung together to form valid senses in cool.

17
00:01:23,959 --> 00:01:30,280
And then for the semantic analysis, we gave formal typing rules.

18
00:01:30,280 --> 00:01:34,439
And now we're to the point where we have to talk about how the program is actually run.

19
00:01:34,439 --> 00:01:37,679
So we have to give some evaluation rules.

20
00:01:37,679 --> 00:01:41,639
And these are going to guide how we do code generation and optimization.

21
00:01:41,639 --> 00:01:45,439
They're going to determine what the program should do and what kinds of transformations

22
00:01:45,439 --> 00:01:52,599
we can do on programs to make them run faster or use less space or any other kind of optimization

23
00:01:52,599 --> 00:01:55,599
that we would like to perform.

24
00:01:55,599 --> 00:01:59,319
So so far we've been specifying the evaluation rules somewhat indirectly.

25
00:01:59,319 --> 00:02:05,359
We've been doing it by giving a complete compilation strategy down to stack machine code.

26
00:02:05,359 --> 00:02:10,759
And then we've been talking about the evaluation rules for the stack machine or actually translating

27
00:02:10,759 --> 00:02:13,719
the stack machine code into assembly code.

28
00:02:13,719 --> 00:02:15,719
And that is certainly a complete description.

29
00:02:15,719 --> 00:02:21,359
You can take the generated assembly code and go and run it on the machine and see what

30
00:02:21,360 --> 00:02:22,360
the program does.

31
00:02:22,360 --> 00:02:29,320
And that would be a legitimate description of the behavior of the program.

32
00:02:29,320 --> 00:02:32,040
And the question then is, you know, why isn't that good enough?

33
00:02:32,040 --> 00:02:35,800
Why isn't just having a code generator for the language?

34
00:02:35,800 --> 00:02:42,360
Why isn't that already a good enough description of what how the code is supposed to be executed?

35
00:02:42,360 --> 00:02:48,560
And the answer to that is maybe a little hard to appreciate without having written a few

36
00:02:48,560 --> 00:02:49,560
compilers.

37
00:02:49,560 --> 00:02:55,199
But in a nutshell, people have learned through hard experience that assembly language descriptions

38
00:02:55,199 --> 00:03:01,560
of language implementations have a lot of irrelevant detail.

39
00:03:01,560 --> 00:03:06,800
And there's a lot of things that you have to say when you give such a complete executable

40
00:03:06,800 --> 00:03:13,680
description that was not necessary to say about how the program executes.

41
00:03:13,680 --> 00:03:19,520
So for example, the fact that we use a stack machine, that's not intrinsic to the

42
00:03:19,520 --> 00:03:22,800
implementation of any particular program in language.

43
00:03:22,800 --> 00:03:25,400
There are other code generation strategies that we could have used.

44
00:03:25,400 --> 00:03:29,040
So, you know, the fact you don't have to use a stack machine to implement the language,

45
00:03:29,040 --> 00:03:32,760
which way the stack grows, whether it grows towards high addresses or low addresses, you

46
00:03:32,760 --> 00:03:35,719
could implement it either way.

47
00:03:35,719 --> 00:03:41,800
How the exact representation of integers, the particular instructions that you use to execute

48
00:03:41,800 --> 00:03:44,560
or to implement certain language constructs.

49
00:03:44,560 --> 00:03:52,120
All of these things are one way, or one particular way to implement the language, but we don't

50
00:03:52,120 --> 00:03:58,680
want them to be taken as the only way that the language could be implemented.

51
00:03:58,680 --> 00:04:03,640
So what we really want then is a complete description, but one that is not overly restrictive,

52
00:04:03,640 --> 00:04:08,159
one that would allow a variety of different implementations.

53
00:04:08,159 --> 00:04:14,960
And when people have not done this, when people have not tried to find some relatively

54
00:04:14,960 --> 00:04:20,079
high level way of describing the behavior of languages, they have inevitably gotten into

55
00:04:20,079 --> 00:04:27,560
the situation where people just have to go and run the program on a reference implementation

56
00:04:27,560 --> 00:04:29,680
in order to decide what it does.

57
00:04:29,680 --> 00:04:36,360
And so on, this is not a very satisfying situation because often the reference implementation

58
00:04:36,360 --> 00:04:38,199
is not completely correct itself.

59
00:04:38,199 --> 00:04:42,439
It will have bugs and there will be artifacts of the particular way it was implemented,

60
00:04:42,439 --> 00:04:46,879
that you didn't mean to be part of the language, but because there is no better definition,

61
00:04:46,879 --> 00:04:53,480
wind up becoming fixed and sort of accidents of the way the language was implemented the

62
00:04:53,480 --> 00:04:56,639
first time.

63
00:04:56,639 --> 00:05:02,120
So there are many ways to actually specify semantics that it would be suitable for our task, and

64
00:05:02,120 --> 00:05:08,000
it turns out that these are all equally powerful, but some of them are more suited to various

65
00:05:08,000 --> 00:05:10,160
tasks than others.

66
00:05:10,160 --> 00:05:14,519
So the one that we're going to be using is called operational semantics.

67
00:05:14,519 --> 00:05:19,000
So operational semantics describes program evaluation by execution rules on an abstract

68
00:05:19,000 --> 00:05:20,000
machine.

69
00:05:20,000 --> 00:05:24,600
We just give a bunch of rules that say, you know, for particular expression, how it should

70
00:05:24,600 --> 00:05:25,600
be executed.

71
00:05:25,600 --> 00:05:30,000
You can think of this as a very, very high level kind of code generation.

72
00:05:30,000 --> 00:05:35,800
And this is most useful for specifying implementations and it's what we're going to use to describe

73
00:05:35,800 --> 00:05:38,120
the semantics of cool.

74
00:05:38,120 --> 00:05:44,920
I want to mention two other ways of specifying programming language semantics because they're

75
00:05:44,920 --> 00:05:50,480
important and you may come across them at some point outside of this class.

76
00:05:50,480 --> 00:05:55,879
One is denotational semantics and here the program's meaning is actually given as a mathematical

77
00:05:55,879 --> 00:05:56,879
function.

78
00:05:56,879 --> 00:06:05,759
So the program text is mapped to a function that goes from inputs to outputs and this

79
00:06:05,759 --> 00:06:10,959
function is an actual function that exists in the mathematical sense.

80
00:06:10,959 --> 00:06:17,839
And this is a very elegant approach, but it introduces complexities in defining an appropriate

81
00:06:17,839 --> 00:06:23,560
class of functions that we don't really need to consider for the purposes of just describing

82
00:06:23,560 --> 00:06:26,600
an implementation.

83
00:06:26,600 --> 00:06:32,080
And another important approach is axiomatic semantics and here program behaviors described

84
00:06:32,080 --> 00:06:34,320
in some kind of logic.

85
00:06:34,320 --> 00:06:39,840
And the basic kinds of statements that you write in this language or in an axiomatic

86
00:06:39,840 --> 00:06:45,920
semantics is that if execution begins in a state satisfying x, then it ends in a state

87
00:06:45,920 --> 00:06:51,480
satisfying y where x and y are formulas in some logic.

88
00:06:51,480 --> 00:06:56,400
And this is a very common foundation for systems that analyze programs automatically that

89
00:06:56,399 --> 00:07:02,279
try to prove facts about programs either to prove that they're correct or to discover bugs

90
00:07:02,279 --> 00:07:03,199
in programs.

