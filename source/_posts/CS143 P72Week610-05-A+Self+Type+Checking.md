---
title: CS143 P72Week610 05 A+Self+Type+Checking
---

1
00:00:00,000 --> 00:00:08,040
In this video, we're going to use what we've learned so far about self-type to incorporate

2
00:00:08,040 --> 00:00:13,839
self-type into the type-checking rules for cool.

3
00:00:13,839 --> 00:00:18,240
First let's remind ourselves what the type-checking rules for cool actually prove.

4
00:00:18,240 --> 00:00:23,719
So the sentences in the type logic look like this and they prove things of the form that

5
00:00:23,719 --> 00:00:26,080
some expression has some type.

6
00:00:26,079 --> 00:00:30,399
When they do that under the assumption that object identifiers have some types given

7
00:00:30,399 --> 00:00:36,039
by O, methods have signatures given by M, and the enclosing class, the current class

8
00:00:36,039 --> 00:00:40,960
in which E sits and in which we're doing our type-checking is class C.

9
00:00:40,960 --> 00:00:45,759
And the whole reason for this additional piece here, we haven't actually discussed this

10
00:00:45,759 --> 00:00:50,920
before, why we needed this C, it is because self-types meaning depends on the enclosing

11
00:00:50,920 --> 00:00:51,920
class.

12
00:00:51,920 --> 00:01:01,240
So if you recall that we introduced this notation, self-type, sub C to record in what class,

13
00:01:01,240 --> 00:01:06,320
a particular occurrence of self-type sits, and this C in the environment is exactly that

14
00:01:06,320 --> 00:01:07,319
subscript.

15
00:01:07,319 --> 00:01:08,920
It is tracking what class we are in.

16
00:01:08,920 --> 00:01:13,560
So when we see occurrence in occurrence of self-type, we know what kind of self-type

17
00:01:13,560 --> 00:01:16,840
we're talking about.

18
00:01:16,840 --> 00:01:20,719
So now we're ready to actually give the type rules that use self-type.

19
00:01:20,719 --> 00:01:25,760
And for the most part, this is really easy because the rules just remain the same.

20
00:01:25,760 --> 00:01:29,760
That is they look the same, but they are actually a little bit different because they use

21
00:01:29,760 --> 00:01:34,680
the new sub-typing and least upper bound operations that we defined before.

22
00:01:34,680 --> 00:01:40,760
So for example, here is the rule for assignment, and this looks identical to the rule for

23
00:01:40,760 --> 00:01:44,760
assignment that we discussed several videos ago.

24
00:01:44,760 --> 00:01:50,560
But notice that this use of sub-typing here is now the extended definition of sub-typing

25
00:01:50,560 --> 00:01:55,400
to incorporate self-type, and so now this rule works with self-type as well as with the

26
00:01:55,400 --> 00:01:59,040
normal class names.

27
00:01:59,040 --> 00:02:02,880
Now there are some rules that have to change in the presence of self-type, and in particular

28
00:02:02,880 --> 00:02:05,600
the dispatch rules need to be updated.

29
00:02:05,600 --> 00:02:12,319
So here is the old rule for dynamic dispatch, and this rule, this part of the rule actually

30
00:02:12,319 --> 00:02:14,959
doesn't change, it stays the same.

31
00:02:14,959 --> 00:02:18,439
But I just want to point out the essential restriction in this rule is that the return

32
00:02:18,439 --> 00:02:21,280
type of the method could not be self-type.

33
00:02:21,280 --> 00:02:23,799
And that's actually the place where self-type buys us something.

34
00:02:23,799 --> 00:02:29,079
So the whole purpose of having self-type is to have methods whose return type is self-type,

35
00:02:29,079 --> 00:02:32,919
because that's where we actually get the extra expressive power.

36
00:02:32,919 --> 00:02:37,079
And now we have to consider the case, now that we have self-type and we've done all this

37
00:02:37,079 --> 00:02:40,639
work, what if the method's return type is self-type?

38
00:02:40,639 --> 00:02:42,519
How are we going to type check that?

39
00:02:42,519 --> 00:02:44,119
Well, here is the rule.

40
00:02:44,119 --> 00:02:50,039
So as usual, we type check the expression that we're dispatching to, that's E0, and all

41
00:02:50,039 --> 00:02:53,679
of the arguments, and we just get their types, and they're just type checked in the same

42
00:02:53,679 --> 00:02:57,359
environment as the entire expression.

43
00:02:57,359 --> 00:03:03,759
And now, just like before, we look up in class T0, the type of E0, the method F, and we

44
00:03:03,759 --> 00:03:07,039
get its signature.

45
00:03:07,039 --> 00:03:11,599
And then we have to check that the arguments conform that every actual argument, E1 through

46
00:03:11,599 --> 00:03:16,680
EN, has a type that's compatible with the corresponding formal parameter in the method

47
00:03:16,680 --> 00:03:17,680
signature.

48
00:03:17,680 --> 00:03:22,799
And if all of that works out, then we can say that this dispatch is going to have type,

49
00:03:22,799 --> 00:03:25,319
oh look, T0.

50
00:03:25,319 --> 00:03:26,599
So where did that come from?

51
00:03:26,599 --> 00:03:32,959
Well, the return type is self-type, and so the result of this entire dispatch is going

52
00:03:32,960 --> 00:03:34,840
to be the type of whatever E0 was.

53
00:03:34,840 --> 00:03:42,520
E0 is the self-parameter, whatever type we got for E0, that is a sound static type for

54
00:03:42,520 --> 00:03:45,200
the result of the entire expression.

55
00:03:45,200 --> 00:03:54,159
So we simply use the type of E0 as the type of the entire dynamic dispatch.

56
00:03:54,159 --> 00:04:01,760
Now, recall the four parameters of a function cannot have type, self-type, but the actual

57
00:04:01,759 --> 00:04:06,479
arguments can have type, self-type, and the extended sub-typing relationship will handle

58
00:04:06,479 --> 00:04:08,759
that case just fine.

59
00:04:08,759 --> 00:04:14,759
One interesting detail is that the dispatch expression itself could have a type, self-type.

60
00:04:14,759 --> 00:04:16,319
And so what do I mean by that?

61
00:04:16,319 --> 00:04:26,319
Well, let's think about E0, dispatching to method F, and then what happens if E0 has type,

62
00:04:26,319 --> 00:04:27,319
self-type?

63
00:04:27,319 --> 00:04:31,879
And we can improve that E0 has type, self-type.

64
00:04:31,879 --> 00:04:37,800
And the problem here is that we need to look up in the, in the M environment, in the method

65
00:04:37,800 --> 00:04:44,560
environment, in some class, the definition of, or the signature of method F. We have to

66
00:04:44,560 --> 00:04:48,319
get back that type signature so that we can do the rest of the type checking.

67
00:04:48,319 --> 00:04:53,000
And if E0 has type, self-type, normally we use the type of E0 to do that, to do that

68
00:04:53,000 --> 00:04:55,560
look up, what type do we use here?

69
00:04:55,560 --> 00:05:00,480
Well, if this whole thing is occurring in class C, if we have, if we're type checking

70
00:05:00,480 --> 00:05:08,120
in class C, let me just put the line there, then it's safe, then this is a self-type sub-C.

71
00:05:08,120 --> 00:05:13,680
And as always, it's safe to replace self-type sub-C by C. And so we'll just use the class

72
00:05:13,680 --> 00:05:21,560
C there, the current class that we are type checking in to look up the method name F.

73
00:05:22,560 --> 00:05:28,680
We have to make similar changes to the rule for static dispatch. So here is the original

74
00:05:28,680 --> 00:05:34,079
rule for static dispatch. And again, this part of the rule will not change. This is, this

75
00:05:34,079 --> 00:05:42,160
handles the case where the return type of the method is not self-type. But if the return

76
00:05:42,160 --> 00:05:46,920
type of the method is self-type, then the rule looks a little bit different. So we, once

77
00:05:46,920 --> 00:05:52,280
again, we type check the expression that we're dispatching to and all the arguments in the

78
00:05:52,280 --> 00:05:58,800
same environment as that of the entire expression. Oh, we have to check that the class we're

79
00:05:58,800 --> 00:06:06,120
dispatching to, the type T0 is a sub-type of the class, the name in the static dispatch.

80
00:06:06,120 --> 00:06:10,840
We have to look up the method. It has to exist in that class that we're statically dispatching

81
00:06:10,840 --> 00:06:15,600
to. So we have to look up in class T, the method F, and get its signature. And then we have

82
00:06:15,600 --> 00:06:20,840
to check that the actual arguments conform to the formal parameters of their types, the types

83
00:06:20,840 --> 00:06:25,800
of the arguments match the types, the declared types of the formal parameters. And then the

84
00:06:25,800 --> 00:06:31,240
only thing that's kind of curious about this rule is that the result type here is again T0.

85
00:06:31,240 --> 00:06:39,280
And why is that right? It could have been a T. It could have been the type to which we

86
00:06:39,279 --> 00:06:46,279
statically dispatched. And it's not because self-type is the type of the self-parameter. And even

87
00:06:46,279 --> 00:06:51,879
though we're dispatching to a method in class T, the self-parameter still has type T0. And we

88
00:06:51,879 --> 00:06:57,679
call it T0 is a sub-type of T. So we use the static dispatch to reach a method definition

89
00:06:57,679 --> 00:07:03,599
that's hidden potentially by overwritten methods in the sub-classes. But that doesn't change

90
00:07:03,599 --> 00:07:08,000
the type of the self-parameter. The self-parameter still has type T0, even though we're running

91
00:07:08,000 --> 00:07:16,639
a method in a superclass of T0. There are two new rules for self-type. One involves

92
00:07:16,639 --> 00:07:21,639
the self-object. So the self-object has type self-type sub-c. And notice that this is one

93
00:07:21,639 --> 00:07:26,240
of those places where we need to know the enclosing class so we know what kind of self-type we're

94
00:07:26,240 --> 00:07:31,639
referring to. And similarly, there's a rule for allocating something of type-self-type.

95
00:07:31,639 --> 00:07:36,959
So the expression new self-type also produces something of type-self-type sub-c.

