---
title: CS143 P97Week814 01 Intermediate Code
---

1
00:00:00,000 --> 00:00:08,240
In this video, I'm going to give a very brief introduction to intermediate code and its use

2
00:00:08,240 --> 00:00:13,000
in compilers.

3
00:00:13,000 --> 00:00:18,480
So the first question to address is what is intermediate code or an intermediate language.

4
00:00:18,480 --> 00:00:22,199
And as the name suggests, an intermediate language is just that.

5
00:00:22,199 --> 00:00:27,440
It's a language that's intermediate between the source language and the target language.

6
00:00:27,440 --> 00:00:29,800
So keep in mind what a compiler does.

7
00:00:29,800 --> 00:00:37,719
So a compiler takes a program written in some source language and it provides a translation

8
00:00:37,719 --> 00:00:42,439
of that program into some target language.

9
00:00:42,439 --> 00:00:47,320
And so in this class, for example, where often our source language is cool and our target

10
00:00:47,320 --> 00:00:49,840
language is MIPS assembly code.

11
00:00:49,840 --> 00:00:56,000
Now an intermediate language actually lives in between these two and a compiler that uses

12
00:00:56,000 --> 00:00:57,000
an intermediate language.

13
00:00:57,000 --> 00:01:01,679
We'll first translate its source language into the intermediate language and then later

14
00:01:01,679 --> 00:01:08,200
translate the intermediate code into the target language.

15
00:01:08,200 --> 00:01:15,640
And you might wonder why make life so difficult, why do something in two steps if you can

16
00:01:15,640 --> 00:01:17,159
do it in one step.

17
00:01:17,159 --> 00:01:22,599
And it turns out that for many purposes, this intermediate level here is actually quite

18
00:01:22,599 --> 00:01:27,519
useful precisely because it provides an intermediate level of abstraction.

19
00:01:27,519 --> 00:01:33,399
So in particular, the intermediate language might have more details in it than the source

20
00:01:33,399 --> 00:01:35,199
language.

21
00:01:35,199 --> 00:01:42,359
So for example, if we want to optimize register usage, a source language like cool has no

22
00:01:42,359 --> 00:01:44,840
notion of registers at the source level.

23
00:01:44,840 --> 00:01:49,439
And so there's no way to even express the kinds of optimizations you might want to do with

24
00:01:49,439 --> 00:01:50,439
registers.

25
00:01:50,439 --> 00:01:54,799
So an intermediate language that exposes that at that amount of detail, least has registers

26
00:01:54,799 --> 00:02:01,840
in it, would allow you to talk about and write algorithms that could try to improve the

27
00:02:01,840 --> 00:02:04,159
use of registers in the program.

28
00:02:04,159 --> 00:02:09,879
The other hand, the intermediate language will also have fewer details than the target.

29
00:02:09,879 --> 00:02:13,840
And so it might be, for example, that the intermediate language is a little bit above the

30
00:02:13,840 --> 00:02:17,680
level of the particular instruction set of a particular machine.

31
00:02:17,680 --> 00:02:22,840
And therefore, it's easier to retarget that intermediate level of code to lots of different

32
00:02:22,840 --> 00:02:28,640
kinds of machines precisely because it doesn't have all the grubby details in it of a particular

33
00:02:28,640 --> 00:02:29,840
machine.

34
00:02:29,840 --> 00:02:33,840
And experience has shown that this is actually a pretty good idea to have intermediate

35
00:02:33,840 --> 00:02:35,000
language.

36
00:02:35,000 --> 00:02:39,760
And almost all compilers have an intermediate language, in fact, in their implementation.

37
00:02:39,760 --> 00:02:41,439
And some compilers have more than one.

38
00:02:41,439 --> 00:02:46,920
Some compilers actually translate through an entire series of intermediate languages between

39
00:02:46,919 --> 00:02:49,039
the source and the target language.

40
00:02:49,039 --> 00:02:55,759
Now we're only going to consider one intermediate language for the rest of this course.

41
00:02:55,759 --> 00:03:00,359
The kind of intermediate language we're going to look at is going to be a high-level assembly.

42
00:03:00,359 --> 00:03:05,759
So as I suggested on the previous slide, this language is going to use register names,

43
00:03:05,759 --> 00:03:07,079
but it will have an unlimited number.

44
00:03:07,079 --> 00:03:09,159
So we can use any number of registers that we like.

45
00:03:09,159 --> 00:03:13,599
We're not bound to 32 or 64 registers.

46
00:03:13,599 --> 00:03:16,119
The control structures will look a lot like assembly language.

47
00:03:16,120 --> 00:03:21,800
In particular, there will be explicit jumps and labels on instructions.

48
00:03:21,800 --> 00:03:24,520
And the language will also have op codes in it.

49
00:03:24,520 --> 00:03:27,960
So it will look like assembly language level op codes, but some of these op codes will be

50
00:03:27,960 --> 00:03:29,120
higher level.

51
00:03:29,120 --> 00:03:34,240
So for example, we might have an op code called push and push which end up translating into

52
00:03:34,240 --> 00:03:42,120
several concrete assembly language instructions for a particular target machine.

53
00:03:42,120 --> 00:03:45,319
In the intermediate code that we'll be looking at, every instruction will have one of two

54
00:03:45,319 --> 00:03:46,319
forms.

55
00:03:46,319 --> 00:03:52,039
It will either be a binary operation or it will be a unary operation.

56
00:03:52,039 --> 00:03:57,039
And always the arguments on the right-hand side, in this case the Y and the Z, will be

57
00:03:57,039 --> 00:03:59,040
either registers or constants.

58
00:03:59,040 --> 00:04:03,200
They could also be immediate values.

59
00:04:03,200 --> 00:04:05,759
And this is a very, very common form of intermediate code.

60
00:04:05,759 --> 00:04:06,759
So widely used.

61
00:04:06,759 --> 00:04:07,759
It's so widely used.

62
00:04:07,759 --> 00:04:09,319
It actually has a name.

63
00:04:09,319 --> 00:04:14,039
It's called three address code.

64
00:04:14,039 --> 00:04:18,360
Because every instruction has it most three addresses in it.

65
00:04:18,360 --> 00:04:24,519
Two arguments, the most two arguments, and then a destination.

66
00:04:24,519 --> 00:04:31,560
Now to see that this code is actually low level, noticed at higher level expressions that

67
00:04:31,560 --> 00:04:36,439
involve multiple operations will have to be translated into a sequence of instructions

68
00:04:36,439 --> 00:04:38,759
that do only one operation at a time.

69
00:04:38,759 --> 00:04:46,000
So for example, if I have the expression x equals, sorry, x plus y times z, and let me put

70
00:04:46,000 --> 00:04:47,959
in perennz here to show the association.

71
00:04:47,959 --> 00:04:50,759
So the times binds more tightly than the plus.

72
00:04:50,759 --> 00:04:54,839
We're going to have this can't be written directly in an intermediate language of this

73
00:04:54,839 --> 00:04:55,839
form.

74
00:04:55,839 --> 00:04:58,040
Instead we would have to write it something like the following.

75
00:04:58,040 --> 00:05:03,680
We'd have to first compute y times z and assign that to a new register or a temporary

76
00:05:03,680 --> 00:05:08,400
or a new register t1 to hold the intermediate value.

77
00:05:08,400 --> 00:05:14,120
And then we would have to use t1 to compute x plus t1, which of course is the value of

78
00:05:14,120 --> 00:05:15,120
the entire expression.

79
00:05:15,120 --> 00:05:17,759
And that would end up getting stored in another register.

80
00:05:17,759 --> 00:05:23,319
And notice that one effect of forcing you to use only one operation at a time.

81
00:05:23,319 --> 00:05:27,240
Basically you can do one primitive operation at a time.

82
00:05:27,240 --> 00:05:29,639
And then the result of that has to be stored in a register.

83
00:05:29,639 --> 00:05:34,519
What an effect of that is to give every sub expression of the program a name.

84
00:05:34,519 --> 00:05:41,240
So if I look back at this expression here, I see you know, like y times z is anonymous.

85
00:05:41,240 --> 00:05:46,599
That in this expression x plus y times z, the expression y times z itself doesn't have

86
00:05:46,599 --> 00:05:47,959
a name.

87
00:05:47,959 --> 00:05:51,839
And by rewriting it like this, I actually named that intermediate result.

88
00:05:51,839 --> 00:06:00,399
So again, just to summarize this point, one consequence of having to write out compound

89
00:06:00,399 --> 00:06:05,599
expressions as a sequence of instructions that do a single operation at a time is that

90
00:06:05,599 --> 00:06:12,039
every intermediate value will be given its own name.

91
00:06:12,039 --> 00:06:16,519
Generating intermediate code is very similar to generating assembly code.

92
00:06:16,519 --> 00:06:20,199
And we're not going to go into this in any detail because it is so similar, but I will sketch

93
00:06:20,199 --> 00:06:23,360
it for you briefly.

94
00:06:23,360 --> 00:06:29,039
The main difference between generating assembly code and generating intermediate code is that

95
00:06:29,039 --> 00:06:37,560
we can use any number of registers in intermediate language to hold intermediate results.

96
00:06:37,560 --> 00:06:42,000
To generate intermediate code, we could write a function called iGen for intermediate code

97
00:06:42,000 --> 00:06:43,800
generation that takes two arguments.

98
00:06:43,800 --> 00:06:46,480
So it takes the expression for which we're generating code.

99
00:06:46,480 --> 00:06:51,840
And it takes the register into which the result of that expression should be stored.

100
00:06:51,840 --> 00:06:56,280
And to give you just one example, and this is the only example that I'll do, let's take

101
00:06:56,280 --> 00:06:59,840
a look at generating intermediate code for a plus expression.

102
00:06:59,840 --> 00:07:04,920
So I want to generate code for e1 plus e2, and I want the results of that to be stored

103
00:07:04,920 --> 00:07:07,280
in the register t.

104
00:07:07,280 --> 00:07:10,480
So the first thing I'm going to do is I'm going to generate code for the sub-expressions.

105
00:07:10,480 --> 00:07:13,360
And I need some place to store the results of the sub-expressions.

106
00:07:13,360 --> 00:07:17,560
So I'm just going to make up new register names for those results.

107
00:07:17,560 --> 00:07:22,080
So I'll generate code for e1 and store that in some register t1, and I'll generate code

108
00:07:22,080 --> 00:07:25,960
for e2, and I'll store the result of that in some register t2.

109
00:07:25,960 --> 00:07:27,800
And then we can just compute the sum.

110
00:07:27,800 --> 00:07:31,319
So t will be equal to the sum of t1 and t2.

111
00:07:31,319 --> 00:07:34,400
And notice that this is a three-address instruction.

112
00:07:34,400 --> 00:07:39,800
So we're sticking to the rules here, and only using three-address instructions in our

113
00:07:39,800 --> 00:07:41,800
intermediate code generator.

114
00:07:42,800 --> 00:07:48,439
And also notice that because we have an unlimited number of registers, this actually leads

115
00:07:48,439 --> 00:07:51,199
to a very simple code generation of intermediate code.

116
00:07:51,199 --> 00:07:55,360
In fact, it's even a little bit simpler than generating code for a stack machine.

117
00:07:55,360 --> 00:08:01,000
Recall that in a stack machine, we had to save the intermediate result here of e1 on the

118
00:08:01,000 --> 00:08:06,980
stack, and that involved more than one instruction to actually push the result and adjust the

119
00:08:06,980 --> 00:08:10,040
stack pointer and things like that.

120
00:08:10,040 --> 00:08:16,700
And here we can just save it in a register, and then just use that register name later

121
00:08:16,700 --> 00:08:19,400
on.

122
00:08:19,400 --> 00:08:23,879
So that is actually all I have to say about intermediate code for this course.

123
00:08:23,879 --> 00:08:27,740
You should be able to use intermediate code at the level in which we're going to be using

124
00:08:27,740 --> 00:08:29,960
it in lectures.

125
00:08:29,960 --> 00:08:34,039
In future videos, we'll actually be looking at intermediate code quite a bit, and using

126
00:08:34,039 --> 00:08:38,480
it especially to express certain kinds of optimizations.

127
00:08:38,480 --> 00:08:42,620
We should also be able to write simple intermediate code programs, and you should be able to write

128
00:08:42,620 --> 00:08:45,680
algorithms that work on intermediate code.

129
00:08:45,680 --> 00:08:49,440
But I'm not going to expect you to know how to generate intermediate code because we're

130
00:08:49,440 --> 00:08:53,840
not going to discuss it any further, and quite frankly, it doesn't introduce any new ideas.

131
00:08:53,840 --> 00:09:00,320
It's really just a variation on the code generation ideas that we've already discussed in quite

132
00:09:00,320 --> 00:09:01,320
a bit of detail.

