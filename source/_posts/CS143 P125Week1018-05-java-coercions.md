---
title: CS143 P125Week1018 05 Java Coercions
---

1
00:00:00,000 --> 00:00:08,640
In this video, we're going to talk about coercions, which is a feature of type systems that

2
00:00:08,640 --> 00:00:18,800
appears in many languages, and we'll be looking specifically at how coercions are done in Java.

3
00:00:18,800 --> 00:00:23,879
Java allows primitive types to be co-wurst in certain contexts, and co-urst means converted

4
00:00:23,879 --> 00:00:25,760
from one type to another.

5
00:00:25,760 --> 00:00:30,120
So here's an example. Let's take the expression 1 plus 2.0.

6
00:00:30,120 --> 00:00:38,040
And the difficulty with this expression is that the one here is an integer, and the 2.0 is

7
00:00:38,040 --> 00:00:39,760
a floating point number.

8
00:00:39,760 --> 00:00:43,600
And there is no way to add an integer to a float directly.

9
00:00:43,600 --> 00:00:48,560
We either have to convert the integer to a float, and then do the add as floating point

10
00:00:48,560 --> 00:00:52,960
numbers or convert the floating point number to an integer, and then do the addition as

11
00:00:52,960 --> 00:00:53,960
integer additions.

12
00:00:53,960 --> 00:00:59,079
So they have to be converted to a common representation before we can actually do the operation.

13
00:00:59,079 --> 00:01:04,280
And the normal thing to do, and the thing that Java does, is to convert the integer to

14
00:01:04,280 --> 00:01:07,359
the floating point number 1.0.

15
00:01:07,359 --> 00:01:11,879
Now a coercion, the right way I think to think of coercions, is that they're really just

16
00:01:11,879 --> 00:01:14,960
primitive functions that the compiler inserts for you.

17
00:01:14,960 --> 00:01:19,560
So it's like you left out a function call, and the compiler notices that, and puts it

18
00:01:19,560 --> 00:01:20,560
in.

19
00:01:20,560 --> 00:01:22,719
So for example, what would be a function call?

20
00:01:22,719 --> 00:01:27,159
Well, we can think of there being a primitive function that converts integers to floating

21
00:01:27,159 --> 00:01:29,840
point numbers in the obvious way.

22
00:01:29,840 --> 00:01:36,120
And so really, this expression here gets converted to the expression into float applied to

23
00:01:36,120 --> 00:01:40,359
the number 1 plus 2.0.

24
00:01:40,359 --> 00:01:47,439
So coercions are probably best thought of as a convenience for you, the programmer, to let

25
00:01:47,439 --> 00:01:51,159
you avoid having to write some function calls.

26
00:01:51,159 --> 00:01:56,519
So where it is obvious that a type conversion is going on, the compiler can insert the

27
00:01:56,519 --> 00:01:59,840
function that performs that type conversion for you.

28
00:01:59,840 --> 00:02:03,000
And most languages really have extensive coercions.

29
00:02:03,000 --> 00:02:08,240
So the coercions are very, very common, particularly between numeric types.

30
00:02:08,240 --> 00:02:10,639
And so this is not just Java.

31
00:02:10,639 --> 00:02:16,439
This is really many different programming languages of all styles have lots of different

32
00:02:16,439 --> 00:02:20,159
kinds of coercions.

33
00:02:20,159 --> 00:02:24,079
Now Java in particular, just in which is two kinds of coercions and casts.

34
00:02:24,079 --> 00:02:27,319
You have widening coercions, and these will always succeed.

35
00:02:27,319 --> 00:02:31,359
All right, so that means that Java will always put them in, and they'll never be any complaining

36
00:02:31,359 --> 00:02:33,479
from the compiler or the runtime system about them.

37
00:02:33,479 --> 00:02:38,280
And we already saw one of those, so the conversion from into float is an example of a widening

38
00:02:38,280 --> 00:02:39,280
cast.

39
00:02:39,280 --> 00:02:45,000
Now narrowing casts may fail if the data can't be converted to the desired type.

40
00:02:45,000 --> 00:02:50,120
So in particular, a float to int, well, this will work fine.

41
00:02:50,120 --> 00:02:56,080
Something like 2.0 can be converted in obvious way to 2.

42
00:02:56,080 --> 00:02:58,879
But if you're converting something that doesn't have an integer representation, something

43
00:02:58,879 --> 00:03:03,360
say like 2.5, there's a question of what we should do here.

44
00:03:03,360 --> 00:03:04,360
Okay.

45
00:03:04,360 --> 00:03:09,080
And for such narrowing casts where there isn't a clear mapping whether we should go, whether

46
00:03:09,080 --> 00:03:14,960
we should truncate here or round up or whatever, then Java will actually complain.

47
00:03:14,960 --> 00:03:17,680
It's not, let you do it.

48
00:03:17,680 --> 00:03:19,680
Okay.

49
00:03:19,680 --> 00:03:26,680
I know it perhaps better example of the kind of narrowing cast that Java will complain about

50
00:03:26,680 --> 00:03:29,000
is something like a downcast.

51
00:03:29,000 --> 00:03:37,200
So if I have two classes, A and B, and B is a subtype of A, and then I have something

52
00:03:37,200 --> 00:03:41,960
of type A, well, I can cast it to a B, I can say.

53
00:03:41,960 --> 00:03:46,159
I have X, which is of type A. Okay.

54
00:03:46,159 --> 00:03:50,680
And then I can have an expression where I try to convert X to a B object.

55
00:03:50,680 --> 00:03:52,159
So here I have a cast.

56
00:03:52,159 --> 00:03:57,319
I've indicated that I want to treat this expression X as a B object.

57
00:03:57,319 --> 00:03:58,800
And this will type check.

58
00:03:58,800 --> 00:03:59,800
Okay.

59
00:03:59,800 --> 00:04:03,560
So the compiler will let this through since B is a subtype of A.

60
00:04:03,560 --> 00:04:07,439
But at runtime, it's actually going to check whether X is actually a B object.

61
00:04:07,439 --> 00:04:09,719
And if it's not, you're going to get an exception.

62
00:04:09,719 --> 00:04:14,479
So this can fail at runtime if the object that X actually holds at the point of the cast

63
00:04:14,479 --> 00:04:16,079
is not a B object.

64
00:04:16,079 --> 00:04:17,079
All right.

65
00:04:17,079 --> 00:04:20,160
So the rule in Java is that narrowing cast must be explicit.

66
00:04:20,160 --> 00:04:22,040
You have to actually put the function in yourself.

67
00:04:22,040 --> 00:04:27,000
You have to put in the type cast in the code so that it's obvious that you really want

68
00:04:27,000 --> 00:04:28,000
to do it.

69
00:04:28,000 --> 00:04:31,040
But widening cast and coercion can be implicit.

70
00:04:31,040 --> 00:04:32,040
So it's all right.

71
00:04:32,040 --> 00:04:37,399
If you're widening, if you're promoting to a supertype or you're converting between integer

72
00:04:37,399 --> 00:04:42,719
types, whereas clear that the one type embeds in the other, then those can be filled in

73
00:04:42,719 --> 00:04:47,719
for you by the compiler.

74
00:04:47,719 --> 00:04:49,519
Now here's a little Java trivia question.

75
00:04:49,519 --> 00:04:54,079
So it turns out that there is one type in Java for which there are no coercions or cast

76
00:04:54,079 --> 00:04:55,079
defined.

77
00:04:55,079 --> 00:05:02,239
So there are no implicit conversions or even explicit conversions from that type to any

78
00:05:02,239 --> 00:05:03,479
other type.

79
00:05:03,480 --> 00:05:07,080
And the answer to the question, which is the only one, is Boole.

80
00:05:07,080 --> 00:05:08,080
Okay.

81
00:05:08,080 --> 00:05:16,480
So only the type Boolean has no coercions or cast to another type.

82
00:05:16,480 --> 00:05:20,879
Now personally, I'm not a big fan of coercions.

83
00:05:20,879 --> 00:05:24,400
I think that it's clearly a convenience for programmers.

84
00:05:24,400 --> 00:05:29,360
It's clearly something that is widely accepted as being necessary in programming languages

85
00:05:29,360 --> 00:05:35,319
because implicit cast and conversions are so ubiquitous.

86
00:05:35,319 --> 00:05:41,400
But I do think that it tends to lead to programs that have behavior that's different from what

87
00:05:41,400 --> 00:05:43,920
the programmer probably expected.

88
00:05:43,920 --> 00:05:48,319
And here's a good example from the language PL1, which calls for programming language

89
00:05:48,319 --> 00:05:53,400
ones designed by IBM in the 1960s, and had many, many features in it.

90
00:05:53,400 --> 00:05:57,120
We've talked about PL1 a few times in this class.

91
00:05:57,240 --> 00:06:02,240
One thing PL1 had was very extensive cast and coercions.

92
00:06:02,240 --> 00:06:04,160
And this could lead to some surprising behavior.

93
00:06:04,160 --> 00:06:05,959
So here's an example.

94
00:06:05,959 --> 00:06:09,319
We have A, B, and C are strings of three characters.

95
00:06:09,319 --> 00:06:13,600
So it's important to know here that the length, three, is part of the type.

96
00:06:13,600 --> 00:06:16,759
So B is a string 1, 2, 3.

97
00:06:16,759 --> 00:06:18,519
So you use a string 4, 5, 6.

98
00:06:18,519 --> 00:06:20,280
And then A is going to be B plus C.

99
00:06:20,280 --> 00:06:22,840
And the question is, what is A?

100
00:06:23,799 --> 00:06:29,399
And you probably won't guess, so let me show you what I think is the right answer.

101
00:06:29,399 --> 00:06:33,959
So first of all, the question is, what happens with this plus operation here?

102
00:06:33,959 --> 00:06:37,199
Well, so that is going to be interpreted as an integer plus.

103
00:06:37,199 --> 00:06:45,279
So B and C are both going to be cast to integers, and this will be done as an integer arithmetic.

104
00:06:45,279 --> 00:06:48,679
So B will get converted to the number 1, 2, 3.

105
00:06:48,679 --> 00:06:52,439
C will get converted to the number 4, 5, 6.

106
00:06:52,439 --> 00:06:55,120
And then we'll add them.

107
00:06:55,120 --> 00:06:59,719
And we'll get out the number 5, 7, 9.

108
00:06:59,719 --> 00:07:02,480
So the result of this expression is 5, 7, 9.

109
00:07:02,480 --> 00:07:05,639
But A is also a string of three characters.

110
00:07:05,639 --> 00:07:08,560
So this has to be cast back to a string.

111
00:07:08,560 --> 00:07:11,360
Now, turns out that this cast happens in two steps.

112
00:07:11,360 --> 00:07:18,040
First, this number here is cast to a string of the default length.

113
00:07:18,040 --> 00:07:22,279
And the default length happens to be 6.

114
00:07:22,279 --> 00:07:25,559
So this is cast to a string that looks like this.

115
00:07:25,559 --> 00:07:29,879
There's three blanks followed by 5, 7, 9.

116
00:07:29,879 --> 00:07:34,879
And then that string of six characters is converted to a string of three characters.

117
00:07:34,879 --> 00:07:37,079
And we just take the first three characters.

118
00:07:37,079 --> 00:07:39,719
And so we get out that.

119
00:07:39,719 --> 00:07:45,839
And so the answer is that this program stores a string of three blanks in A,

120
00:07:45,839 --> 00:07:48,399
which is probably not what was expected.

