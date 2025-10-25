---
title: CS143 P55Week509 03 Symbol Tables
---

1
00:00:00,000 --> 00:00:07,799
In this video, we're going to talk about simple tables, an important data structure in many

2
00:00:07,799 --> 00:00:10,080
pillars.

3
00:00:10,080 --> 00:00:18,000
Before we talk about what a simple table is, I want to talk about a generic algorithm that

4
00:00:18,000 --> 00:00:22,719
we're going to be seeing instances of over and over again for the rest of the course.

5
00:00:22,719 --> 00:00:27,519
So a lot of semantic analysis, and in fact, a lot of code generation, can be expressed as

6
00:00:27,519 --> 00:00:30,600
a recursive descent of an abstract syntax tree.

7
00:00:30,600 --> 00:00:36,039
And the basic idea is that at each step, we do the following three things.

8
00:00:36,039 --> 00:00:38,879
We're always processing a particular node in the tree.

9
00:00:38,879 --> 00:00:44,719
So if I draw a picture of the abstract syntax tree, we might have a node and some subtrees

10
00:00:44,719 --> 00:00:46,760
hanging off of it.

11
00:00:46,760 --> 00:00:51,879
And we may do some processing of the node before we do anything else.

12
00:00:51,879 --> 00:00:53,840
We arrive at the node, say, from the parent.

13
00:00:53,840 --> 00:00:54,960
We come in to hear from the parent.

14
00:00:54,960 --> 00:00:56,359
We do some processing of the node.

15
00:00:56,359 --> 00:00:58,719
And I'm just indicating that by coloring it blue.

16
00:00:58,719 --> 00:01:00,719
I indicate that we did something here.

17
00:01:00,719 --> 00:01:05,519
And then we go off and we process the children.

18
00:01:05,519 --> 00:01:11,560
And after we process the children, after we come back to the node, we do something else.

19
00:01:11,560 --> 00:01:14,239
We may do some post-processing of the node.

20
00:01:14,239 --> 00:01:15,640
And then we return.

21
00:01:15,640 --> 00:01:20,079
And of course, at the same time, when we've got off and processed the children, we're processing

22
00:01:20,079 --> 00:01:23,000
all their nodes in the same pre and post-fashion.

23
00:01:23,000 --> 00:01:27,640
So they're getting the same treatment with some stuff being done before each node is

24
00:01:27,640 --> 00:01:33,719
touched and some stuff being done after all their children have been processed.

25
00:01:33,719 --> 00:01:38,000
And there are many, many examples of this kind of an algorithm.

26
00:01:38,000 --> 00:01:41,719
This is called a recursive descent traversal of a tree.

27
00:01:41,719 --> 00:01:46,120
There are some instances in which we'll only process each node before we process the children.

28
00:01:46,120 --> 00:01:49,760
Some of them we only process each node after we process all the children.

29
00:01:49,760 --> 00:01:53,840
And we do both as illustrated here in this little diagram.

30
00:01:53,840 --> 00:01:58,840
And returning to the main topic of this particular video, when we're performing semantic analysis

31
00:01:58,840 --> 00:02:03,760
on a portion of the abstract syntax tree, we're going to need to know which identifiers

32
00:02:03,760 --> 00:02:08,120
are defined, which identifiers are in scope.

33
00:02:08,120 --> 00:02:11,719
An example of this kind of recursive descent strategy is how we can process lead bindings

34
00:02:11,719 --> 00:02:15,159
to track the set of variables that are in scope.

35
00:02:15,159 --> 00:02:20,039
So we have our lead node in the abstract syntax tree.

36
00:02:20,039 --> 00:02:24,919
And in one subtree we have the initialization.

37
00:02:24,919 --> 00:02:29,120
And in the other subtree we have e, the body of the lead.

38
00:02:29,120 --> 00:02:32,159
And then this is a lead for some particular variable.

39
00:02:32,159 --> 00:02:37,639
And let's just write that variable inside the apparent node here.

40
00:02:37,639 --> 00:02:42,840
And so when we begin processing of this node, let's imagine that we're coming from above.

41
00:02:42,840 --> 00:02:45,520
So we're doing this. We're processing the abstract syntax tree recursively.

42
00:02:45,520 --> 00:02:48,319
And so we reach this point from some parent.

43
00:02:48,319 --> 00:02:53,960
And there's going to be a set of symbols that are currently in scope.

44
00:02:53,960 --> 00:02:56,879
That's some data structure that lives off to the side.

45
00:02:56,879 --> 00:02:59,680
In fact, that's going to be our symbol table.

46
00:02:59,680 --> 00:03:01,400
And what is going to happen here?

47
00:03:01,400 --> 00:03:06,840
Well, the first thing we're going to have to do is we're going to have to process the initializer.

48
00:03:06,840 --> 00:03:10,520
We're going to need to know whether that's whatever function we're doing on this

49
00:03:10,520 --> 00:03:12,200
type checking or whatever.

50
00:03:12,200 --> 00:03:13,560
We might get out and process that first.

51
00:03:13,560 --> 00:03:16,920
And we'll pass the symbol table in.

52
00:03:16,920 --> 00:03:21,320
And then we're going to process the body of the lead.

53
00:03:21,320 --> 00:03:25,240
But when we do that, we're going to pass in the set of symbols that are in scope.

54
00:03:25,240 --> 00:03:27,320
But also X is now going to be in scope.

55
00:03:27,320 --> 00:03:32,439
So X is going to be added before we process e to the set of symbols.

56
00:03:32,439 --> 00:03:36,280
And then when we return from the sub expression e, it's going to be removed.

57
00:03:36,280 --> 00:03:40,280
And so we'll restore the symbol table to its previous state.

58
00:03:40,280 --> 00:03:45,400
So that after we leave this subtree of the abstract syntax tree,

59
00:03:45,400 --> 00:03:50,680
we only have the same set of symbols to find that we had before we entered it.

60
00:03:50,680 --> 00:03:57,240
So in the terminology of the three-part algorithm for a recursive descent that we had on the first slide,

61
00:03:57,240 --> 00:03:58,159
what are we doing here?

62
00:03:58,159 --> 00:04:03,719
Well, before we process e, we're going to add the definition of X to our list of current definitions,

63
00:04:03,719 --> 00:04:09,199
overwriting any other definition of X that might have been visible outside of the lead expression.

64
00:04:09,199 --> 00:04:10,199
Then we're going to recurse.

65
00:04:10,199 --> 00:04:15,839
We're going to process all of the abstract syntax tree nodes in the body of the lead inside of e.

66
00:04:15,839 --> 00:04:22,399
And after we finish processing e, we're going to remove the definition of X and restore whatever old definition of X we had.

67
00:04:22,399 --> 00:04:27,039
And a symbol table is just a data structure that accomplishes these things.

68
00:04:27,039 --> 00:04:33,279
It tracks the current bindings of identifiers at each point in the abstract syntax tree.

69
00:04:33,279 --> 00:04:35,879
For a very simple symbol table, we could just use a stack.

70
00:04:35,879 --> 00:04:39,480
And they would have just say the following three operations.

71
00:04:39,480 --> 00:04:45,240
We can add a symbol to the symbol table, and that will just push the symbol,

72
00:04:45,240 --> 00:04:49,959
push the variable onto the stack and whatever other information we want, like its type.

73
00:04:49,959 --> 00:04:55,719
We'll have a fine symbol operation that will look up the current definition for a symbol.

74
00:04:55,719 --> 00:05:03,000
And that can be done simply by searching the stack starting from the top for the first occurrence of the variable name.

75
00:05:03,000 --> 00:05:07,560
And this will automatically take care of the hiding of old definitions.

76
00:05:07,560 --> 00:05:13,560
So for example, if we have a stack that say has X, Y, and Z on it,

77
00:05:13,560 --> 00:05:19,240
and then we come into a scope that introduces a new Y, we would push Y on top.

78
00:05:19,240 --> 00:05:25,720
And now if we search through the stack, we would find this Y first that effectively hiding the old definition of Y.

79
00:05:25,720 --> 00:05:29,959
And then when we leave a scope, we can remove a symbol simply by popping the stack.

80
00:05:29,959 --> 00:05:36,599
We'll just pop the current variable off of the stack that will get rid of the most recent definition.

81
00:05:36,599 --> 00:05:42,919
And leave the stack, leave the set of definitions in the same state it was before we entered the node at all.

82
00:05:42,919 --> 00:05:46,759
So in this example, if we left the scope where the outer Y was defined,

83
00:05:46,759 --> 00:05:49,319
and that was popped off the stack, so that was gone.

84
00:05:49,319 --> 00:05:57,240
Now, when we search for Y, we'll find the outer definition, the one that was defined outside of that inner scope.

85
00:05:57,240 --> 00:06:01,720
So this simple symbol table works well for let, because the symbols are at one at a time,

86
00:06:01,720 --> 00:06:04,199
and because declarations are perfectly nested.

87
00:06:04,199 --> 00:06:12,199
And in fact, the fact that declarations are perfectly nested is really the whole reason that we can use a stack.

88
00:06:12,199 --> 00:06:15,800
So take a look at this little example.

89
00:06:15,800 --> 00:06:18,280
Let's say we have three nested lets.

90
00:06:18,280 --> 00:06:22,360
And here I'm not showing the initializers in the left subtrees.

91
00:06:22,360 --> 00:06:26,519
They don't matter for what I want to illustrate.

92
00:06:26,599 --> 00:06:34,039
So if you think about it as we walk from the root here down to the inner bindings,

93
00:06:34,039 --> 00:06:39,159
and we're pushing things on the stack, we'll push things on the stack in the order X, Y, and then Z.

94
00:06:39,159 --> 00:06:44,439
And then as we leave, if we've processed this subtrees, and we're leaving it walking back out,

95
00:06:44,439 --> 00:06:48,759
we're going to encounter these let'scopes in exactly the reverse order,

96
00:06:48,759 --> 00:06:53,319
and popping them off the stack is exactly the order in which we want to remove them,

97
00:06:53,319 --> 00:06:56,279
and that's why a stack works well.

98
00:06:56,279 --> 00:07:05,799
So this structure works fine for lets, but for some other constructs, it's not quite as good as it could be.

99
00:07:05,799 --> 00:07:13,399
So for example, consider the following piece of code, illegal piece of code I should add.

100
00:07:13,399 --> 00:07:17,719
Let's say we're declaring a method, and it has two arguments named X.

101
00:07:17,719 --> 00:07:22,519
Now that's not legal, but in order to detect that's not legal, or why is it not legal?

102
00:07:22,519 --> 00:07:26,039
It's not legal because they're both defined in the same scope.

103
00:07:26,120 --> 00:07:33,080
So functions or methods have the property that they introduce multiple names at once into the same scope,

104
00:07:33,080 --> 00:07:37,879
and it's not quite so easy to use a stack where we only add one thing at a time,

105
00:07:37,879 --> 00:07:42,439
or one name at a time, to model simultaneous definition in a scope.

106
00:07:43,720 --> 00:07:47,240
So this problem is easily solved with just a slightly fancy or simple table.

107
00:07:47,240 --> 00:07:51,240
Here is the revised interface now with five methods instead of three.

108
00:07:52,120 --> 00:07:57,240
The biggest change is that we now have explicit enter and exit scope functions,

109
00:07:57,240 --> 00:08:00,920
and so these functions start at a nested scope and exit a current scope.

110
00:08:00,920 --> 00:08:05,319
And the way to think about this is that our new structure is a stack of scopes.

111
00:08:05,319 --> 00:08:11,240
So it is on the stack as an entire scope, and then in a scope are all the variables that are defined

112
00:08:11,240 --> 00:08:14,040
at the same level within that single scope.

113
00:08:14,840 --> 00:08:19,400
So just like before, we have a fine symbol operation that will look up a variable name,

114
00:08:19,399 --> 00:08:23,959
and it will return the current definition, or know if there is no definition in any scope that's

115
00:08:23,959 --> 00:08:31,239
currently available. We'll have an add symbol operation that adds a new symbol to the table,

116
00:08:31,239 --> 00:08:36,360
and it adds it in the current scope, so whatever scope is at the top of our scope stack.

117
00:08:36,360 --> 00:08:42,919
And then one more new operation, check scope, will return true if x is already defined in the current

118
00:08:42,919 --> 00:08:49,319
scope. So this just to be clear on what this does, this returns true if x is defined in exactly

119
00:08:49,320 --> 00:08:55,240
the top scope. It doesn't return true unless x is defined in the scope at the very, very top of the

120
00:08:55,240 --> 00:09:01,160
stack, and this allows you to check for double definitions. So for example, in the code that I had

121
00:09:01,160 --> 00:09:08,840
before, on the previous slide, if we had two declarations of x, how would we check this? Well,

122
00:09:08,840 --> 00:09:14,760
we would add x to the symbol table in the current scope, and then we would ask, well, is x already

123
00:09:14,759 --> 00:09:19,399
defined in this scope for the second one, and this interface would return true, we would know to

124
00:09:19,399 --> 00:09:27,000
raise an error saying that x had been multiplied defined. Finally, let me just add that this is the

125
00:09:27,000 --> 00:09:32,120
symbol table interface, or something very close to this, is a symbol table interface that is supplied

126
00:09:32,120 --> 00:09:36,919
with the cool project, and there's already implementation of this interface provided if you don't want

127
00:09:36,919 --> 00:09:43,080
to write your own. So let's wrap up this video by talking a little bit about class names, which

128
00:09:43,080 --> 00:09:48,440
behave quite differently from the variables introduced in let bindings and in function parameters.

129
00:09:48,440 --> 00:09:54,920
In particular, class names can be used before they are defined as we discussed a few videos ago.

130
00:09:55,480 --> 00:10:00,680
And what that means is that we can't check class names in a single pass. We can't just walk over

131
00:10:00,680 --> 00:10:06,280
the program once and check whether every class that is used is defined because we don't know that we

132
00:10:06,280 --> 00:10:11,240
see all the definitions of the classes until we reach the very end of the program. And so there is

133
00:10:11,240 --> 00:10:17,000
a solution to this. We have to make two passes over the program. In the first pass, we gather all

134
00:10:17,000 --> 00:10:22,200
the class definitions. We go through and we find every place where a class is defined, we record all

135
00:10:22,200 --> 00:10:26,360
of those names, and in the second pass, we go through and look at the bodies of the classes and make

136
00:10:26,360 --> 00:10:31,799
sure they only use classes that were defined. And the lesson here, this is actually not complicated

137
00:10:31,799 --> 00:10:37,240
to implement. I think it's quite clear or should be quite clear how this will work, but the message

138
00:10:37,240 --> 00:10:42,519
here is that semantic analysis is going to require multiple passes and probably more than two.

139
00:10:42,519 --> 00:10:47,320
And in fact, you should not be afraid when structuring your compiler to add lots and lots of simple

140
00:10:47,320 --> 00:10:53,879
passes if that makes your life easier. So it's better to break something up into say three or four

141
00:10:53,879 --> 00:10:58,519
simple passes rather than to have one very, very complicated pass where all the code is entangled.

142
00:10:58,519 --> 00:11:03,879
I think you'll find it much easier to debug your compilers if you're willing to make multiple passes

143
00:11:03,879 --> 00:11:13,879
over the input.

