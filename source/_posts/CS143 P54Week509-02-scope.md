---
title: CS143 P54Week509 02 Scope
---

1
00:00:00,000 --> 00:00:04,480
Welcome back.

2
00:00:04,480 --> 00:00:13,740
In this video, we're going to begin our discussion of semantic analysis with the topic of scope.

3
00:00:13,740 --> 00:00:18,039
The motivating problem for talking about scope is that we want to be able to match identifier

4
00:00:18,039 --> 00:00:21,400
declarations with the uses of those identifiers.

5
00:00:21,400 --> 00:00:26,440
We need to know which variable we're talking about when we say variable x if variable x

6
00:00:26,440 --> 00:00:29,800
might have more than one definition in the program.

7
00:00:29,800 --> 00:00:34,359
This is an important static analysis step in most programming languages, including in

8
00:00:34,359 --> 00:00:36,480
cool.

9
00:00:36,480 --> 00:00:39,520
So here are a couple of examples taken from cool.

10
00:00:39,520 --> 00:00:43,880
This definition of y, this declaration of y that it's a string, will be matched with

11
00:00:43,880 --> 00:00:44,880
this use.

12
00:00:44,880 --> 00:00:49,640
So we'll know at this point here that y is supposed to be a string and you'll get some kind

13
00:00:49,640 --> 00:00:54,400
of an error from the compiler because you're trying to add a string and a number.

14
00:00:54,399 --> 00:01:01,719
In the second example, here's a declaration of y and then in the body of the let, we don't

15
00:01:01,719 --> 00:01:04,319
see any use of y and that by itself is not an error.

16
00:01:04,319 --> 00:01:08,239
It's perfectly fine to declare a variable that you don't use, although you can imagine

17
00:01:08,239 --> 00:01:12,759
generating a warning for that that doesn't actually cause the program to behave badly.

18
00:01:12,759 --> 00:01:17,079
But instead, what we see here is a use of x and there's no matching definition.

19
00:01:17,079 --> 00:01:20,280
So the question is where is the definition of x?

20
00:01:20,280 --> 00:01:24,200
We can't see it and if there is no outer definition of x and we'll get an undefined

21
00:01:24,200 --> 00:01:30,480
or undeclared variable error here at this point.

22
00:01:30,480 --> 00:01:32,879
So these two examples illustrate the idea of scope.

23
00:01:32,879 --> 00:01:39,040
The scope of an identifier is that portion of a program in which the identifier is accessible.

24
00:01:39,040 --> 00:01:42,840
And this knows that the same identifier may refer to different things in different parts

25
00:01:42,840 --> 00:01:47,079
of the program and different scopes for the same name can't overlap.

26
00:01:47,079 --> 00:01:53,120
So whatever the variable x, for example, means it can only refer to one thing in any given

27
00:01:53,120 --> 00:01:54,719
part of the program.

28
00:01:54,719 --> 00:01:56,480
And identifiers can have restricted scope.

29
00:01:56,480 --> 00:02:00,240
There are lots of examples, and I'm sure you're familiar with them, of identifiers whose

30
00:02:00,240 --> 00:02:05,040
scope is less than the entire program.

31
00:02:05,040 --> 00:02:09,680
Most programming languages today have what is called static scope and cool as an example

32
00:02:09,680 --> 00:02:11,599
of a statically-scoped language.

33
00:02:11,599 --> 00:02:15,520
The characteristic of static scoping is that the scope of a variable depends only on the

34
00:02:15,520 --> 00:02:18,920
program text, not on any kind of runtime behavior.

35
00:02:18,920 --> 00:02:22,080
So what the program actually does at runtime doesn't matter.

36
00:02:22,080 --> 00:02:28,080
That scope is defined purely syntactically from the way you wrote the program.

37
00:02:28,080 --> 00:02:32,160
Now it may come as a surprise that there's any alternative to static scoping.

38
00:02:32,160 --> 00:02:37,520
In fact, probably every language that you have used up to now has had static scoping.

39
00:02:37,520 --> 00:02:41,680
But there are a few languages that are what are called dynamically-scoped.

40
00:02:41,680 --> 00:02:45,320
And for a long time, actually, there was an argument about whether static scoping was

41
00:02:45,320 --> 00:02:47,360
better than dynamic scoping.

42
00:02:47,360 --> 00:02:54,240
Although today I think it's pretty clear that the static scoping camp has won this discussion.

43
00:02:54,240 --> 00:03:00,080
But historically at least, Lisp was an example of a dynamically-scoped language.

44
00:03:00,080 --> 00:03:02,400
And it has switched in the meantime.

45
00:03:02,400 --> 00:03:07,320
This is actually a long time ago now that it changed to static scoping.

46
00:03:07,320 --> 00:03:11,360
Another language, which is now mostly of historical interests, isn't it really used anymore,

47
00:03:11,360 --> 00:03:15,000
called snowball, also had dynamic scoping.

48
00:03:15,000 --> 00:03:19,400
And the characteristic of dynamic scoping is that the scope of a variable depends on the

49
00:03:19,400 --> 00:03:23,879
execution behavior of the program.

50
00:03:23,879 --> 00:03:26,039
So let's take a look at an example of static scoping.

51
00:03:26,039 --> 00:03:32,319
So here we have some cool code and a couple of different declarations of x.

52
00:03:32,319 --> 00:03:35,599
And also some different uses of x.

53
00:03:35,599 --> 00:03:40,800
Let me erase these underlines so that I can use the colored indicate binding.

54
00:03:40,800 --> 00:03:43,280
So let's take a look at this definition.

55
00:03:43,280 --> 00:03:45,319
The question is which of these uses of x?

56
00:03:45,319 --> 00:03:49,199
If you have three uses of x here actually refer to that definition.

57
00:03:49,199 --> 00:03:51,199
So it is in fact these two.

58
00:03:51,199 --> 00:03:55,800
The ones that are outside of the interlet, these actually refer to this definition.

59
00:03:55,800 --> 00:04:00,520
So here if you refer to x, you get the value zero.

60
00:04:00,520 --> 00:04:09,240
But this other definition here, the inter definition of x, is used by this use of x.

61
00:04:09,240 --> 00:04:14,920
So this use of x gets this meaning of x which in this case returns the value one.

62
00:04:14,920 --> 00:04:18,680
And what's going on here is that what you use the most closely was called the most closely

63
00:04:18,680 --> 00:04:19,879
nested rule.

64
00:04:19,879 --> 00:04:26,600
So a variable binds to the definition that is most closely enclosing it of the same name.

65
00:04:26,600 --> 00:04:30,000
So this x, the closest and closing definition of x is this one.

66
00:04:30,000 --> 00:04:39,220
But for these two x's, the closest and only enclosing definition of x is this outer one.

67
00:04:39,220 --> 00:04:44,980
So at an anemonescope language, a variable would refer to the closest binding in the execution

68
00:04:44,980 --> 00:04:48,660
of the program, meaning the most recent binding of the variable.

69
00:04:48,660 --> 00:04:49,940
So here's an example.

70
00:04:49,940 --> 00:04:53,940
Let's say we have a function g and g defines a variable a and here it's initialized say

71
00:04:53,940 --> 00:04:54,940
to four.

72
00:04:54,940 --> 00:04:58,900
And then it calls another function, another function that isn't in the same syntactic scope.

73
00:04:58,900 --> 00:05:02,780
So here I've written f right next to g, but actually f could be in some completely other

74
00:05:02,780 --> 00:05:06,340
part of the code and f refers to a.

75
00:05:06,339 --> 00:05:09,099
And the question is, what is the value of a here?

76
00:05:09,099 --> 00:05:13,500
Well, if it's, if we're dynamically scoped, then it's going to be the value that was defined

77
00:05:13,500 --> 00:05:17,659
in g and here f of x will actually return four.

78
00:05:17,659 --> 00:05:23,259
That'll be the result of this call because this reference to a will refer to this binding

79
00:05:23,259 --> 00:05:26,379
or this definition of a in g.

80
00:05:26,379 --> 00:05:30,419
And we can't say much more about how dynamics scope works until we talk in a little more

81
00:05:30,419 --> 00:05:33,739
detail about how languages are implemented.

82
00:05:33,740 --> 00:05:41,139
So we'll talk about dynamics scope again a little bit later on in the course.

83
00:05:41,139 --> 00:05:44,980
In cool, identifier bindings are introduced by a variety of mechanisms.

84
00:05:44,980 --> 00:05:49,540
There are class declarations, which introduce class names, method definitions, which introduce

85
00:05:49,540 --> 00:05:50,780
method names.

86
00:05:50,780 --> 00:05:55,500
And then there's several different ways to introduce object identifiers.

87
00:05:55,500 --> 00:06:00,139
And these are the lead expressions, formal parameters of functions, attribute definitions

88
00:06:00,139 --> 00:06:04,939
in classes, and finally in the branches of case expressions.

89
00:06:04,939 --> 00:06:10,939
Now, it's important to understand that not all identifiers follow the most closely nested

90
00:06:10,939 --> 00:06:13,379
rule that we outlined before.

91
00:06:13,379 --> 00:06:19,459
So for example, a rather large exception to this rule is class definitions in cool.

92
00:06:19,459 --> 00:06:22,060
So class definitions cannot be nested.

93
00:06:22,060 --> 00:06:25,379
And in fact, they are globally visible throughout the program.

94
00:06:25,379 --> 00:06:26,379
And what does that mean?

95
00:06:26,379 --> 00:06:28,539
That means that a class name is defined everywhere.

96
00:06:28,540 --> 00:06:32,780
If it's defined anywhere in the program, that class name is available for use anywhere

97
00:06:32,780 --> 00:06:34,980
in the program or everywhere in the program.

98
00:06:34,980 --> 00:06:38,900
And in particular, a class name can be used before it is defined.

99
00:06:38,900 --> 00:06:42,860
So as an example, take a look at this fragment of cool code here.

100
00:06:42,860 --> 00:06:47,540
And here we see that in class foo, we declare y to be of type bar.

101
00:06:47,540 --> 00:06:49,820
And then later on, we declare class bar.

102
00:06:49,820 --> 00:06:51,860
And this is perfectly fine, cool code.

103
00:06:51,860 --> 00:06:58,100
The fact that bar is used before it is defined has no effect on whether the program is correct.

104
00:06:58,100 --> 00:07:02,820
This is a completely legal, cool code.

105
00:07:02,820 --> 00:07:06,740
Similarly, with attribute names, attribute names are global within the class in which they

106
00:07:06,740 --> 00:07:07,900
are defined.

107
00:07:07,900 --> 00:07:12,100
So that means they can be used again before they are defined.

108
00:07:12,100 --> 00:07:17,580
So for example, I can define a class foo, and I can define a method that uses attribute

109
00:07:17,580 --> 00:07:18,580
a.

110
00:07:18,579 --> 00:07:19,979
And then later on, only later.

