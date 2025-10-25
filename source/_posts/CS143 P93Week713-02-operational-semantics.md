---
title: CS143 P93Week713 02 Operational Semantics
---

1
00:00:00,000 --> 00:00:13,500
In this video, we're going to begin our discussion of formal operational semantics.

2
00:00:13,500 --> 00:00:18,679
Just as we did with electrical analysis, parsing, and type checking, the first step in defining

3
00:00:18,679 --> 00:00:23,800
what we mean by a formal operational semantics is to introduce the notation.

4
00:00:23,800 --> 00:00:28,719
And it turns out that the notation we want to use for operational semantics is the same

5
00:00:28,719 --> 00:00:31,359
we're very similar to the notation we use in type checking.

6
00:00:31,359 --> 00:00:36,600
We're going to be using logical rules of inference.

7
00:00:36,600 --> 00:00:42,379
So in the case of type checking, the kinds of inference rules we presented prove things

8
00:00:42,379 --> 00:00:47,679
of the form that in some context, we could show that some expression had a particular type

9
00:00:47,679 --> 00:00:54,679
in this case, the type C. And for evaluation, we're going to be doing something quite similar.

10
00:00:54,679 --> 00:00:59,600
We will show that in some context, now this is going to be a different kind of context

11
00:00:59,600 --> 00:01:00,600
than we had in typing.

12
00:01:00,600 --> 00:01:04,159
So this is going to be an evaluation context as opposed to a type context.

13
00:01:04,159 --> 00:01:06,960
And so what goes in the context will actually be different.

14
00:01:06,960 --> 00:01:11,159
But for the moment, all that really matters is there's some kind of a context.

15
00:01:11,159 --> 00:01:21,439
And in that context, we're going to be able to show that some expression evaluates to a particular value v.

16
00:01:21,439 --> 00:01:27,480
So as an example, let's take a look at this simple expression, e1 plus e2.

17
00:01:27,480 --> 00:01:31,799
And let's say that using our rules, which I haven't shown you yet, but let's say we had a bunch of rules,

18
00:01:31,799 --> 00:01:40,719
and we could show that in the initial context, that e1 in that same context,

19
00:01:40,719 --> 00:01:45,719
okay, so these contexts are going to be the same, that e1 evaluated to the value 5,

20
00:01:45,719 --> 00:01:49,959
and e2 also in that same context, evaluate to the value 7,

21
00:01:49,959 --> 00:01:54,039
then we could prove that e1 plus e2 evaluated to the value 12.

22
00:01:54,039 --> 00:02:00,319
And if you think about it, what this rule is saying is that if e1 evaluates to 5 and e2 evaluates to 7,

23
00:02:00,319 --> 00:02:05,439
then if you evaluate the expression e1 plus e2, you're going to get the value 12.

24
00:02:05,439 --> 00:02:07,119
And now what's the context doing?

25
00:02:07,119 --> 00:02:11,799
Well, it doesn't do a whole lot in this particular rule.

26
00:02:11,799 --> 00:02:14,599
But remember what the context was for in type checking.

27
00:02:14,599 --> 00:02:19,639
The context was for giving values to the free variables of the expression.

28
00:02:19,639 --> 00:02:25,119
And so we need for an expression like e1 plus e2 to say something about what the values are,

29
00:02:25,119 --> 00:02:30,319
the variables that might appear in e1 and in e2 in order to say what they evaluate to.

30
00:02:30,319 --> 00:02:38,919
And therefore to say what the entire expression e1 plus e2 will evaluate to.

31
00:02:38,919 --> 00:02:42,319
Now, let's be a little more precise about what's going to go in the context.

32
00:02:42,319 --> 00:02:48,919
So let's consider the evaluation of an expression or a statement like why gets x plus 1, okay?

33
00:02:48,919 --> 00:02:52,639
So we're going to assign y the value x plus 1.

34
00:02:52,639 --> 00:03:00,199
And there are two things that we have to know in order to evaluate this expression.

35
00:03:00,199 --> 00:03:06,279
First of all, we have to know where in memory a variable is stored.

36
00:03:06,279 --> 00:03:12,879
So for example, the variable x here, we're going to have to go and look up x's value and then add 1 to it.

37
00:03:12,879 --> 00:03:19,359
And then that value is going to have to be stored in whatever memory location holds the value for y.

38
00:03:19,359 --> 00:03:29,719
Okay? So there is a mapping from variables to memory locations.

39
00:03:29,719 --> 00:03:34,800
Okay? And that is called in operational semantics the environment.

40
00:03:34,800 --> 00:03:38,919
And this is a little confusing maybe because we've used environment for other things.

41
00:03:38,919 --> 00:03:42,120
Okay, so now let's forget about this other uses of the word environment.

42
00:03:42,120 --> 00:03:45,439
We're talking about the operational semantics.

43
00:03:45,439 --> 00:03:53,520
What the environment means is the mapping the association between variables and where that variable is stored in memory.

44
00:03:53,520 --> 00:03:59,480
And then in addition, we're going to need a store and that's going to tell us what is in the memory.

45
00:03:59,480 --> 00:04:04,960
So just knowing the location for a variable isn't quite enough.

46
00:04:04,960 --> 00:04:09,759
When we, if we know the value of x, if we know the location for x, for example,

47
00:04:09,759 --> 00:04:12,120
well, that's important because we're going to get the value of x.

48
00:04:12,120 --> 00:04:15,679
But we also have to know exactly what value is stored there.

49
00:04:15,679 --> 00:04:23,639
And so a store is going to be a mapping from memory locations to values.

50
00:04:23,639 --> 00:04:26,159
These are the values that are actually stored in the memory.

51
00:04:26,159 --> 00:04:27,920
So it's two levels of mapping.

52
00:04:27,920 --> 00:04:34,159
We associate with each variable a memory location and then each memory location will have a value in it.

53
00:04:34,160 --> 00:04:42,800
So let's talk about the notation that we're going to use for writing down the environment and the store.

54
00:04:42,800 --> 00:04:46,320
So as we said, the variable environment maps variables to locations.

55
00:04:46,320 --> 00:04:50,320
And we're going to write that out in the following way.

56
00:04:50,320 --> 00:04:56,120
We're going to just have it as a list of variables and location pairs separated by a colon.

57
00:04:56,120 --> 00:05:03,879
So this environment, for example, says at variable a is at location l1 and variable b is at location l2.

58
00:05:03,879 --> 00:05:10,159
And another aspect of the environment is that it's going to keep track of the variables that are in scope.

59
00:05:10,159 --> 00:05:19,360
So the only variables that will be mentioned in the environment are those that are currently in scope and the expression that we're evaluating.

60
00:05:19,360 --> 00:05:25,639
Now, as we said, stores map memory locations to values and we'll also write out stores as lists of pairs.

61
00:05:25,639 --> 00:05:33,639
So in this case, the memory location l1 in this store contains the value 5 and the memory location l2

62
00:05:33,639 --> 00:05:36,199
contains the value 7.

63
00:05:36,199 --> 00:05:47,399
And we will also separate these pairs by an arrow just to make the stores look a little bit different from the environment so that we won't confuse the two.

64
00:05:47,399 --> 00:05:51,800
There's an operation on stores, which is to replace a value or update a value.

65
00:05:51,800 --> 00:05:59,199
So in this case, we're taking the store s and we're updating the value at location l1 to be 12.

66
00:05:59,199 --> 00:06:02,399
And this defines a new store as prime.

67
00:06:02,399 --> 00:06:06,359
So keep in mind here, the stores are just functions, at least in our model.

68
00:06:06,359 --> 00:06:14,000
And so we can define a new store by taking the old function, the old store s and modifying it at one point.

69
00:06:14,000 --> 00:06:22,719
So this defines a new store as prime such that if I apply s prime to the new to the location l1, I get out the new value 12.

70
00:06:22,720 --> 00:06:32,640
And if I apply s prime to any other location, any location different from l1, I get out the value that the store held in s.

71
00:06:32,640 --> 00:06:40,480
Sorry, I get out the value of the location in store s.

72
00:06:40,480 --> 00:06:43,960
Now in cool, we have more complicated values and integers in particular.

73
00:06:43,960 --> 00:06:48,120
We have objects and all the objects, of course, are instances of some class.

74
00:06:48,120 --> 00:06:52,959
And we're going to need a notation for representing objects in our operational semantics.

75
00:06:52,959 --> 00:06:57,079
So we'll use the following way of writing down objects.

76
00:06:57,079 --> 00:07:02,120
An object will begin with its class name, in this case the class name x.

77
00:07:02,120 --> 00:07:06,280
And it'll be followed by a list of the attributes.

78
00:07:06,280 --> 00:07:10,519
In this case, the class x has n attributes a1 through a n.

79
00:07:10,519 --> 00:07:14,600
And associated with each attribute will be the memory location where the attribute is stored.

80
00:07:14,600 --> 00:07:23,000
So attribute a1 is stored at location l1 up through attribute a n, which is stored at location ln.

81
00:07:23,000 --> 00:07:27,000
And this will be a complete description of the object.

82
00:07:27,000 --> 00:07:37,200
Because once we know where in memory the object is stored, we can use the store to look up the value of each of those attributes.

83
00:07:38,199 --> 00:07:46,199
There are a few special classes in cool that don't have attribute names and will have a special way of writing them.

84
00:07:46,199 --> 00:07:55,199
So integers only have a value and that will be written as int with a single value in perenns, the value of the integer.

85
00:07:55,199 --> 00:07:59,199
Similarly for Booleans, they have a single value true or false.

86
00:07:59,199 --> 00:08:04,199
And strings have two properties, the length of the string and the string constant.

87
00:08:05,199 --> 00:08:12,199
There's also a special value void of type object and we'll use the term void in our operational semantics to represent it.

88
00:08:12,199 --> 00:08:21,199
And briefly here, so void is a special in that there are no operations that can be performed on void except for the test is void.

89
00:08:21,199 --> 00:08:26,199
So in particular, you can't dispatch the void even though it has type object that will generate runtime error.

90
00:08:26,199 --> 00:08:30,199
The only thing you can do is to test whether the value is void or not.

91
00:08:30,199 --> 00:08:35,200
And concrete implementations would typically use a null pointer to represent void.

92
00:08:38,200 --> 00:08:43,200
Now we're ready to talk about in more detail what the judgments will look like in our operational semantics.

93
00:08:43,200 --> 00:08:46,200
So the context will consist of three pieces.

94
00:08:46,200 --> 00:08:49,200
The first piece is the current self object.

95
00:08:50,200 --> 00:08:57,200
The second piece is the environment which is again the mapping from variables to the locations where those variables are stored.

96
00:08:57,200 --> 00:09:06,200
And the third piece is the memory, the store, the mapping from memory locations to the values held at those locations.

97
00:09:06,200 --> 00:09:12,200
So in some context an expression E will evaluate to two things.

98
00:09:12,200 --> 00:09:14,200
First of all, E will produce a value.

99
00:09:14,200 --> 00:09:20,200
So for example, we saw before that the expression 7 plus 5 would produce the value 12.

100
00:09:20,200 --> 00:09:22,200
That's one result of evaluation.

101
00:09:22,200 --> 00:09:26,200
But the second thing is that it will produce a modified store.

102
00:09:26,200 --> 00:09:32,200
So the expression E may be a complicated piece of code, maybe a whole program in its own right.

103
00:09:32,200 --> 00:09:36,200
And it may have assignment statements in it that update the contents of the memory.

104
00:09:37,200 --> 00:09:43,200
And so after it has evaluated there will be a new memory state that we have to represent.

105
00:09:43,200 --> 00:09:47,200
And so as prime here represents the state of memory after evaluation.

106
00:09:47,200 --> 00:09:49,200
So now notice a couple of things here.

107
00:09:49,200 --> 00:09:56,200
First of all, the current self object and the environment don't change.

108
00:09:56,200 --> 00:09:58,200
They are not changed by evaluation.

109
00:09:58,200 --> 00:10:05,200
So which object is the self parameter and to the current method and why the mapping between variables and the memory

110
00:10:05,200 --> 00:10:11,200
locations that is not modified by running an expression.

111
00:10:11,200 --> 00:10:12,200
And that makes sense.

112
00:10:12,200 --> 00:10:20,200
I mean you can't update the self object in cool and you don't have access in any form to the memory locations where variables are stored.

113
00:10:20,200 --> 00:10:23,200
And so those two things are invariant.

114
00:10:23,200 --> 00:10:26,200
They don't, they're invariant under evaluation.

115
00:10:26,200 --> 00:10:28,200
They don't change when you run a piece of code.

116
00:10:28,200 --> 00:10:30,200
However, the store does change.

117
00:10:30,200 --> 00:10:32,200
So the contents of the memory may be modified.

118
00:10:33,200 --> 00:10:38,200
So that's why we need a store for both before evaluation and after evaluation.

119
00:10:38,200 --> 00:10:40,200
And one more detail.

120
00:10:40,200 --> 00:10:49,200
These judgments of this form always have a qualification that the judgment only holds if the evaluation of E terminates.

121
00:10:49,200 --> 00:10:55,200
So if E goes into an infinite loop, then you're not going to get a value and you're not going to get a new store.

122
00:10:55,200 --> 00:11:04,200
So this kind of a judgment should always be read as saying that if E terminates, then E produces a value V and a new store S.

123
00:11:04,200 --> 00:11:07,200
Price.

124
00:11:07,200 --> 00:11:13,200
To summarize, the result of evaluation is a value and a new store.

125
00:11:13,200 --> 00:11:18,200
And where the new store models the side effects of the expression.

126
00:11:19,200 --> 00:11:22,200
And notice again that some things don't change as a result of evaluation.

127
00:11:22,200 --> 00:11:29,200
And this is actually important for compilation because we'll be able to take advantage of the fact that they don't change to generate efficient code.

128
00:11:29,200 --> 00:11:35,200
So the variable environment doesn't change the value of self, which object we're talking about doesn't change.

129
00:11:35,200 --> 00:11:42,200
And notice here is another detail that the contents of the self object, the attributes inside the self object might change.

130
00:11:42,200 --> 00:11:44,200
They might get updated.

131
00:11:44,200 --> 00:11:49,200
But the locations where the attributes are stored do not change.

132
00:11:49,200 --> 00:11:52,200
So the layout of the object, where the object is stored doesn't change.

133
00:11:52,200 --> 00:11:54,200
And that's all we're saying here.

134
00:11:54,200 --> 00:12:02,200
The actual contents of the object, which of course are part of the mapping of the store, those might get updated by evaluation.

135
00:12:02,200 --> 00:12:07,200
And also, the operational semantics allows for non-terminating evaluations.

136
00:12:07,200 --> 00:12:09,200
That's the last point here.

137
00:12:09,200 --> 00:12:18,200
And so they're quite meaning that those judgments only hold on the assumption that the expression actually completes.

