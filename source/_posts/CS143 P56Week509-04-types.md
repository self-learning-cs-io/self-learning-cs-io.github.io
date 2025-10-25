---
title: CS143 P56Week509 04 Types
---

1
00:00:00,000 --> 00:00:05,320
Welcome back.

2
00:00:05,320 --> 00:00:12,400
In this video, we're going to have an introduction to types.

3
00:00:12,400 --> 00:00:16,640
So a very basic question to ask is what is a type anyway?

4
00:00:16,640 --> 00:00:21,480
And this question is worth asking because the notion of type, what a type is, does vary

5
00:00:21,480 --> 00:00:24,000
from programming language to programming language.

6
00:00:24,000 --> 00:00:29,980
Now roughly speaking, the consensus is that a type is a set of values and also perhaps

7
00:00:29,980 --> 00:00:34,560
more importantly, a set of operations that are unique to those values, a set of operations

8
00:00:34,560 --> 00:00:36,539
that are defined on those values.

9
00:00:36,539 --> 00:00:42,340
So for example, if I look at the type of integers, there are some operations that you can

10
00:00:42,340 --> 00:00:47,100
do on integers, you can do things like you can add and you can subtract integers and you

11
00:00:47,100 --> 00:00:51,380
can compare integers where the zirc greater than or equal or less than.

12
00:00:51,380 --> 00:00:54,700
And then these operations are, you know, no-bound numbers.

13
00:00:54,700 --> 00:00:58,140
And then there are operations on strings.

14
00:00:58,140 --> 00:00:59,420
And strings are a different type.

15
00:00:59,420 --> 00:01:05,680
They have operations like concatenation and testing whether a string is an MP string or

16
00:01:05,680 --> 00:01:06,879
not.

17
00:01:06,879 --> 00:01:11,780
And the other is very a variety of other functions that are defined on strings.

18
00:01:11,780 --> 00:01:15,359
And the important thing is that these operations are different from the operations defined on

19
00:01:15,359 --> 00:01:17,859
integers and we don't want to mix them up.

20
00:01:17,859 --> 00:01:21,780
It would be bad if we started doing string operations on integers, for example.

21
00:01:21,780 --> 00:01:23,900
We would just get nonsense.

22
00:01:23,900 --> 00:01:28,820
So in modern programming languages, types are expressed in a number of different ways.

23
00:01:28,820 --> 00:01:34,740
In object-oriented languages, often we see classes being the notion of type.

24
00:01:34,740 --> 00:01:38,380
So particularly in cool, the class names are the types.

25
00:01:38,380 --> 00:01:42,420
They're all with one exception called self-type.

26
00:01:42,420 --> 00:01:44,900
The class names are exactly the types.

27
00:01:44,900 --> 00:01:47,660
And I just want to point out that this need not be the case.

28
00:01:47,660 --> 00:01:53,060
It happens that it's often convenient to object-oriented languages to equate classes and types.

29
00:01:53,060 --> 00:01:57,420
But there are other designs that where the classes are not the only kinds of types or

30
00:01:57,420 --> 00:02:01,579
whether they're in some languages where there's no notion of class, the types are completely

31
00:02:01,579 --> 00:02:02,659
different things.

32
00:02:02,659 --> 00:02:07,700
So classes and types are really two different things that happen to be identified in a lot

33
00:02:07,700 --> 00:02:09,500
of object-oriented language designs.

34
00:02:09,500 --> 00:02:16,580
And I just want you to be aware that that's not necessarily the only way to do it.

35
00:02:16,580 --> 00:02:21,659
So consider the assembly language fragment, add R1, R2, R3.

36
00:02:21,979 --> 00:02:23,539
What does this actually do?

37
00:02:23,539 --> 00:02:28,259
Well, it takes the contents of register R2 and the contents of register R3.

38
00:02:28,259 --> 00:02:32,500
It adds them together and it puts the result in register R1.

39
00:02:32,500 --> 00:02:37,019
And the question is, what are the types of R1, R2, and R3?

40
00:02:37,019 --> 00:02:41,740
And you might hope that they're integers, but in fact, this is a trick question.

41
00:02:41,740 --> 00:02:44,620
Because at the assembly language level, I can't tell.

42
00:02:44,620 --> 00:02:49,340
There's nothing that prevents R1, R2, and R3 from having arbitrary types.

43
00:02:49,340 --> 00:02:52,780
They could be representatives of any kind of type.

44
00:02:52,780 --> 00:02:57,819
And because they're just a bunch of registers with zeros and ones in them, the add operation

45
00:02:57,819 --> 00:03:01,900
will be happy to take them and add them up, even if it doesn't make sense, and produce

46
00:03:01,900 --> 00:03:05,180
a bit pattern that it stores into R1.

47
00:03:05,180 --> 00:03:10,659
So to make this a little clear, perhaps, it's useful to think about certain operations

48
00:03:10,659 --> 00:03:12,900
that are legal for values of each type.

49
00:03:12,900 --> 00:03:15,860
So for example, it would make perfect sense to add two integers.

50
00:03:15,860 --> 00:03:20,100
If I have two bit patterns that represent integers, then when I sum them up, I will get

51
00:03:20,100 --> 00:03:23,860
a bit pattern that represents the sum of those two integers.

52
00:03:23,860 --> 00:03:28,100
But on the other hand, if I take a function pointer and an integer and I add them together,

53
00:03:28,100 --> 00:03:29,820
I really don't get anything.

54
00:03:29,820 --> 00:03:33,540
This is another function pointer, the integer is a bit pattern.

55
00:03:33,540 --> 00:03:37,740
I can take those two bit patterns, I can run them through and add, and I do get out and

56
00:03:37,740 --> 00:03:41,500
use that a bit, but there is no useful interpretation of that result.

57
00:03:41,500 --> 00:03:44,620
The resulting thing I get doesn't mean anything.

58
00:03:44,620 --> 00:03:49,219
But the problem is that both of these have the same assembly language implementation.

59
00:03:49,219 --> 00:03:54,780
Nothing at the assembly language level, these two operations look exactly the same.

60
00:03:54,780 --> 00:03:59,780
So I can't tell at the assembly language level which one of these I'm doing.

61
00:03:59,780 --> 00:04:06,500
If I want there to be types, if I want to make sure that I only do operations on the

62
00:04:06,500 --> 00:04:11,460
correct, that I only do certain operations on their correct types, then I need some kind

63
00:04:11,460 --> 00:04:17,500
of type description and some sort of type system to enforce those distinctions.

64
00:04:17,500 --> 00:04:20,139
So perhaps I'm belaboring this point, but I think it's important.

65
00:04:20,139 --> 00:04:21,300
So one more time.

66
00:04:21,300 --> 00:04:25,780
A language's type system specifies which operations are valid for which types.

67
00:04:25,780 --> 00:04:32,579
And then the goal of type checking is to ensure that operations are used only with the correct

68
00:04:32,579 --> 00:04:34,180
types.

69
00:04:34,180 --> 00:04:38,699
And by doing this, type checking enforces the intended interpretation of values.

70
00:04:38,699 --> 00:04:40,699
Because nothing else is going to check.

71
00:04:40,699 --> 00:04:45,060
Once we get down to the machine code level, it's all just a lot of zeros and ones.

72
00:04:45,060 --> 00:04:48,659
And the machine will be happy to do whatever operations we tell it to on those zeros and

73
00:04:48,659 --> 00:04:51,579
ones, whether or not those operations make sense.

74
00:04:51,579 --> 00:04:58,339
So the purpose of type systems is to enforce the intended interpretations of those bit patterns.

75
00:04:58,339 --> 00:05:03,500
And make sure that if I have a bit pattern for integers that I don't do any non integer

76
00:05:03,500 --> 00:05:08,740
operation on that and get something that is meaningless.

77
00:05:08,740 --> 00:05:13,180
Today, programming languages fall into three different categories with respect to how they

78
00:05:13,180 --> 00:05:14,420
treat types.

79
00:05:14,420 --> 00:05:18,460
There are the statically type languages where all or almost all the checking of types is done

80
00:05:18,460 --> 00:05:20,620
as part of compilation.

81
00:05:20,620 --> 00:05:25,579
And cool is one of these and other languages that you've probably seen like C and Java are

82
00:05:25,579 --> 00:05:27,620
also statically typed.

83
00:05:27,620 --> 00:05:31,540
Then there are the dynamically typed languages where almost all of the checking of types is

84
00:05:31,540 --> 00:05:34,220
done as part of program execution.

85
00:05:34,220 --> 00:05:39,460
And the list family of languages like Scheme and Listbitself are in this category as our

86
00:05:39,460 --> 00:05:44,060
languages like Python and Pearl.

87
00:05:44,060 --> 00:05:48,660
So you probably used or heard of at least some of those languages.

88
00:05:48,660 --> 00:05:53,060
And then finally, there are the untied languages where no type checking is done at all, either

89
00:05:53,060 --> 00:05:55,740
at compile time or at runtime.

90
00:05:55,740 --> 00:05:57,940
And this is basically what machine code does.

91
00:05:57,940 --> 00:06:04,140
So machine code has no notion of types and enforces no abstraction boundaries when it

92
00:06:04,139 --> 00:06:06,060
executes.

93
00:06:06,060 --> 00:06:09,899
For decades, there has been a debate about the relative merits of static versus dynamic

94
00:06:09,899 --> 00:06:10,979
typing.

95
00:06:10,979 --> 00:06:16,099
And without taking sides, let me lay out for you what the various proponents on each side

96
00:06:16,099 --> 00:06:17,099
say.

97
00:06:17,099 --> 00:06:21,339
So the people who believe in static typing say that static checking catches many programming

98
00:06:21,339 --> 00:06:23,060
errors at compile time.

99
00:06:23,060 --> 00:06:25,419
And it also avoids the overhead of runtime type checks.

100
00:06:25,419 --> 00:06:29,419
If I've done all the type checking at compile time, well, I don't have to check the types

101
00:06:29,419 --> 00:06:30,419
at runtime.

102
00:06:30,420 --> 00:06:34,860
I just check when I go to do an operation that the arguments are of the correct type because

103
00:06:34,860 --> 00:06:38,220
I already did that check once and for all at compile time.

104
00:06:38,220 --> 00:06:40,340
And these things are both definitely true.

105
00:06:40,340 --> 00:06:43,340
These are the two big advantages of static checking.

106
00:06:43,340 --> 00:06:46,340
First of all, it proves that some errors can never happen.

107
00:06:46,340 --> 00:06:47,580
Those are called a compile time.

108
00:06:47,580 --> 00:06:50,300
And so I never have to worry about those errors at runtime.

109
00:06:50,300 --> 00:06:53,500
And also, it's faster.

110
00:06:53,500 --> 00:06:58,340
Dynamic typing proponents counter that static types items are restrictive.

111
00:06:58,339 --> 00:07:02,979
So essentially, a static type system has to prove that the program is well typed.

112
00:07:02,979 --> 00:07:04,539
That all the types make sense.

113
00:07:04,539 --> 00:07:07,659
And it does this by restricting what kinds of programs you can write.

114
00:07:07,659 --> 00:07:13,139
There are some programs that are more difficult to write in a statically typed language because

115
00:07:13,139 --> 00:07:17,219
the compiler has a hard time proving them correct.

116
00:07:17,219 --> 00:07:23,219
And there's also a belief that I've commonly stated that rapid prototyping is more

117
00:07:23,219 --> 00:07:24,779
difficult with a static type system.

118
00:07:24,779 --> 00:07:30,079
I think the idea here is that if you're prototyping something, if you're exploring some idea,

119
00:07:30,079 --> 00:07:34,919
you may not actually know exactly what all the types are at that point in time and having

120
00:07:34,919 --> 00:07:38,939
to commit to something that's going to work in all cases.

121
00:07:38,939 --> 00:07:43,619
To having a type correct program when you're just trying to fiddle around and figure out

122
00:07:43,619 --> 00:07:48,259
what it is you're trying to do that that's very constraining and makes the work go quite

123
00:07:48,259 --> 00:07:52,019
a bit slower.

124
00:07:52,019 --> 00:07:54,579
So what's the actual situation in practice today?

125
00:07:54,579 --> 00:07:58,839
Well, an awful lot of code is written in statically typed languages and the practical statically

126
00:07:58,839 --> 00:08:03,939
typed languages that people use a lot always have some kind of escape mechanism.

127
00:08:03,939 --> 00:08:09,139
So in C and Java and C++, you have some notion of unsafe cast.

128
00:08:09,139 --> 00:08:12,500
In C and unsafe cast can just result in a runtime crash.

129
00:08:12,500 --> 00:08:19,419
In Java, it results in an uncod exception runtime when you have an unsafe or failed downcast.

130
00:08:19,819 --> 00:08:25,259
The fact is that you can get runtime errors for type reasons.

131
00:08:25,259 --> 00:08:30,500
Now on the dynamic typing side, the people who program in dynamic languages, they always

132
00:08:30,500 --> 00:08:35,259
end up or seem to end up retrofitting static typing to these dynamically typed languages.

133
00:08:35,259 --> 00:08:39,860
So typically, if I dynamically type language becomes popular enough, then people start trying

134
00:08:39,860 --> 00:08:42,139
to write optimizing compilers for them.

135
00:08:42,139 --> 00:08:47,500
And the first thing that people want to have in an optimizing compiler is some type information

136
00:08:47,500 --> 00:08:50,419
because it helps to generate much better code.

137
00:08:50,419 --> 00:08:54,899
And so people wind up going back and trying to figure out how to get as many types as they

138
00:08:54,899 --> 00:08:59,899
can from these dynamically typed languages as soon as they start trying to build serious

139
00:08:59,899 --> 00:09:05,139
tools to improve the programs written in these languages.

140
00:09:05,139 --> 00:09:09,220
And in my opinion, it's really debatable whether either compromise because both of these

141
00:09:09,220 --> 00:09:15,500
are compromises on either strict static or strict dynamic point of view, whether either

142
00:09:15,500 --> 00:09:18,820
one of these represents the best or the worst of both worlds.

143
00:09:18,820 --> 00:09:24,860
But this is certainly where we are today in practice.

144
00:09:24,860 --> 00:09:27,259
Now cool is a statically typed language.

145
00:09:27,259 --> 00:09:30,100
And the types that are available in cool are the class names.

146
00:09:30,100 --> 00:09:33,340
So every time you define a class, you define a new type.

147
00:09:33,340 --> 00:09:38,500
And the special reserve symbol self type, which we'll be talking about in a separate video

148
00:09:38,500 --> 00:09:40,259
all of its own.

149
00:09:40,259 --> 00:09:44,139
And the way cool works is that the user declares the types for identifiers.

150
00:09:44,139 --> 00:09:47,819
So for every identifier, you have to say what the type is.

151
00:09:47,819 --> 00:09:49,419
But then the compiler does the rest of the work.

152
00:09:49,419 --> 00:09:52,259
The compiler refers the type for expressions.

153
00:09:52,259 --> 00:09:58,220
And in particular, the compiler assigns a type to every single expression in the program.

154
00:09:58,220 --> 00:10:03,419
So it will go through the entire abstract syntax tree and using the declared types for identifiers,

155
00:10:03,419 --> 00:10:09,700
it will calculate a type for every expression and sub-expression.

156
00:10:09,700 --> 00:10:13,259
To wrap up, it's worth mentioning that there's a couple of different terms that people use

157
00:10:13,259 --> 00:10:15,659
for the process of computing types.

158
00:10:15,659 --> 00:10:17,819
And then they mean slightly different things.

159
00:10:17,819 --> 00:10:21,299
So the simpler problem is what is known as type checking.

160
00:10:21,299 --> 00:10:25,659
Here we have a fully typed program, meaning we have an abstract syntax tree with all the

161
00:10:25,659 --> 00:10:27,539
types filled in on every node.

162
00:10:27,539 --> 00:10:30,659
And our only job is to check that the types are correct.

163
00:10:30,659 --> 00:10:34,980
So we can just look at each node in its neighbors and confirm that the types are correct in

164
00:10:34,980 --> 00:10:36,939
that part of the tree.

165
00:10:36,939 --> 00:10:39,299
And we can do this for every part of the tree.

166
00:10:39,299 --> 00:10:43,500
And check that the program is type correct.

167
00:10:43,500 --> 00:10:47,740
Type inference, on the other hand, is the process of filling in missing type information.

168
00:10:47,740 --> 00:10:52,219
So here, the view is that we have an abstract syntax tree with no types on it, or perhaps

169
00:10:52,219 --> 00:10:56,659
just a few types in key locations on it, say, on the declared variables.

170
00:10:56,659 --> 00:10:58,740
And then we want to fill in missing types.

171
00:10:58,740 --> 00:11:01,859
We have some nodes in there with absolutely no type information at all.

172
00:11:01,859 --> 00:11:05,099
And it's not just a question of confirming or checking that the types are correct.

173
00:11:05,099 --> 00:11:08,740
We actually have to fill in the missing type information.

174
00:11:08,740 --> 00:11:10,379
And these two things are different.

175
00:11:10,379 --> 00:11:14,100
Actually, there are actually, in many languages, they're actually very, very different.

176
00:11:14,100 --> 00:11:16,580
But people often use the terms interchangeably.

177
00:11:16,580 --> 00:11:20,980
And I will not be particularly careful in my videos about which term I'm using either.

