---
title: CS143 P71Week610 04 Self Type Usage
---

1
00:00:00,000 --> 00:00:07,759
Now that we've seen some of the operations on self-type, in this video we're going to

2
00:00:07,759 --> 00:00:14,519
talk about where self-type can be used in Cool.

3
00:00:14,519 --> 00:00:18,280
The parser checks that self-type appears only where types are permitted, but that's in

4
00:00:18,280 --> 00:00:21,039
fact a little bit too permissive.

5
00:00:21,039 --> 00:00:24,800
There are places where other types can appear, but self-type cannot.

6
00:00:24,800 --> 00:00:29,719
And so the purpose of this particular video is to go over the various rules for the usage

7
00:00:29,719 --> 00:00:31,719
of self-type.

8
00:00:31,719 --> 00:00:34,079
So let's begin with a very simple rule.

9
00:00:34,079 --> 00:00:38,640
So self-type is not a class name, and so it can't appear in a class definition.

10
00:00:38,640 --> 00:00:45,560
It can either be the name of the class, nor the class that is inherited from.

11
00:00:45,560 --> 00:00:49,759
In attribute declarations, the type of an attribute, in this case we have an attribute

12
00:00:49,759 --> 00:00:54,120
X and it's declared to have type T, it is okay for T to be self-type.

13
00:00:54,119 --> 00:00:59,839
So it's fine to have attributes that are declared to be the self-type of the class.

14
00:00:59,839 --> 00:01:08,400
Similarly, it's fine to have local let bound variables that have type self-type, and it's

15
00:01:08,400 --> 00:01:11,719
fine to allocate a new object of type self-type.

16
00:01:11,719 --> 00:01:17,759
And what this actually does is that it allocates an object that has the same dynamic type as

17
00:01:17,759 --> 00:01:19,200
the self-object.

18
00:01:19,200 --> 00:01:24,079
So whatever the type of the self-object happens to be, which is not necessarily the type

19
00:01:24,079 --> 00:01:31,359
of the enclosing class at runtime, the new T operation will create a new object of that

20
00:01:31,359 --> 00:01:34,000
dynamic type.

21
00:01:34,000 --> 00:01:38,680
The type named an aesthetic dispatch cannot be self-type, again because it has to be an

22
00:01:38,680 --> 00:01:41,680
actual class name.

23
00:01:41,680 --> 00:01:45,960
Finally, let's consider method definitions.

24
00:01:45,959 --> 00:01:50,399
So here's a very simple method definition as one-foral parameter X of type T and the

25
00:01:50,399 --> 00:01:53,639
method returns something of type T prime.

26
00:01:53,639 --> 00:01:58,479
It turns out that only T prime, only the return type can be of type self-type.

27
00:01:58,479 --> 00:02:02,479
No argument type can be of type self-type.

28
00:02:02,479 --> 00:02:06,039
And to see why, let's, I can show it actually two different ways.

29
00:02:06,039 --> 00:02:12,159
Why this has to be the case, and we'll do both because this is actually important.

30
00:02:12,159 --> 00:02:16,120
So let's think about a dispatch to this method.

31
00:02:16,120 --> 00:02:21,759
So let's say we have some expression E and we call method M and we have some argument

32
00:02:21,759 --> 00:02:23,400
E prime.

33
00:02:23,400 --> 00:02:29,199
And now let's say the argument E prime has the type T zero.

34
00:02:29,199 --> 00:02:35,400
So if you recall the rule for method calls, T zero is going to have to be a subtype of

35
00:02:35,400 --> 00:02:36,800
the type of the form parameter.

36
00:02:36,800 --> 00:02:39,319
We're going to be passing this in.

37
00:02:39,560 --> 00:02:44,039
So whatever type X is declared to have here has to be a super type of the type of the

38
00:02:44,039 --> 00:02:45,039
actual argument.

39
00:02:45,039 --> 00:02:50,840
So that means that T zero is going to have to be a subtype of, and now let's assume that

40
00:02:50,840 --> 00:02:53,560
the argument can be of type self-type.

41
00:02:53,560 --> 00:02:58,560
So it would be that the T zero has to be a subtype of self-type and this is in some class

42
00:02:58,560 --> 00:03:01,479
C wherever this method is defined.

43
00:03:01,479 --> 00:03:06,959
And remember that we said this was always false, that you couldn't have self-type on the

44
00:03:06,960 --> 00:03:14,080
right hand side and a regular type on the left hand side because that would lead the

45
00:03:14,080 --> 00:03:21,600
problems that we would never be able to prove that in general for that a type is actually

46
00:03:21,600 --> 00:03:26,620
a subtype of self-type because self-type can vary over all the subtypes of the class

47
00:03:26,620 --> 00:03:27,620
C.

48
00:03:27,620 --> 00:03:32,760
So that's one way to see that we can't allow method parameters to be type self-type.

49
00:03:32,759 --> 00:03:38,319
It's also helpful to just think about executing the code or some example code and see what

50
00:03:38,319 --> 00:03:39,840
can go wrong.

51
00:03:39,840 --> 00:03:47,079
So here's an example and let me just walk you through what happens if we allow a parameter

52
00:03:47,079 --> 00:03:51,519
to have type self-type in this particular example.

53
00:03:51,519 --> 00:03:53,280
So there are two class definitions.

54
00:03:53,280 --> 00:04:00,399
Class A has a method comp for comparison and it takes one argument of type self-type and

55
00:04:00,399 --> 00:04:01,399
it returns a boole.

56
00:04:01,400 --> 00:04:06,520
So the idea here is that the comparison operation probably compares the this parameter with the

57
00:04:06,520 --> 00:04:09,640
argument and returns to her false.

58
00:04:09,640 --> 00:04:14,819
Then there's a second class B and B is a subtype of A and inherits from A and it has one

59
00:04:14,819 --> 00:04:20,560
new field B, a little B here of type B.

60
00:04:20,560 --> 00:04:25,680
And now the comparison function in class B is over written.

61
00:04:25,680 --> 00:04:31,199
It has the same signature as the comparison function or the comp function in class A but

62
00:04:31,199 --> 00:04:37,120
the method body here accesses the field B.

63
00:04:37,120 --> 00:04:42,519
And now let's take a look at what happens with a piece of code that uses these two classes.

64
00:04:42,519 --> 00:04:47,759
So here X is going to be declared to be of type A but we're going to assign it something

65
00:04:47,759 --> 00:04:52,960
of type B and here we're notice that there's a gap between the static type which will be

66
00:04:52,959 --> 00:04:58,799
A and the dynamic type which will be B and that's actually key to the problem.

67
00:04:58,799 --> 00:05:06,159
And now we invoke the comp method on X and we pass it a new A object.

68
00:05:06,159 --> 00:05:07,159
And so what happens?

69
00:05:07,159 --> 00:05:13,120
Well this type checks just fine because X is in class A, X is of type A and this argument

70
00:05:13,120 --> 00:05:14,919
is also of type A.

71
00:05:14,919 --> 00:05:18,799
So if self type, if having argument of type self type is ever going to work, it has

72
00:05:18,800 --> 00:05:25,879
to work for this example where the two static types of the dispatch of the this parameter

73
00:05:25,879 --> 00:05:28,800
and the formal parameter are exactly the same.

74
00:05:28,800 --> 00:05:34,720
So that clearly has to be allowed if we allow self type as a type of the argument.

75
00:05:34,720 --> 00:05:38,040
And now let's think about what happens when it actually executes.

76
00:05:38,040 --> 00:05:45,759
So it's going to invoke the method, the comp method in the B class because X is of dynamic

77
00:05:45,759 --> 00:05:47,080
type B.

78
00:05:47,079 --> 00:05:52,319
And then it's going to take the argument and it's going to access its B field.

79
00:05:52,319 --> 00:05:56,800
But the argument is of dynamic type A and has no B field.

80
00:05:56,800 --> 00:05:59,639
And so this is actually going to cause a runtime crash.

81
00:05:59,639 --> 00:06:04,079
So and just to go over that one more time just to make sure that it's clear here, X has

82
00:06:04,079 --> 00:06:10,199
type A but dynamic type B, the argument has static type A and dynamic type A.

83
00:06:10,199 --> 00:06:16,799
And when this method gets invoked, the argument that which is of dynamic type A does not

84
00:06:16,800 --> 00:06:24,079
have the operations, all the fields and methods of the class B and it results in a runtime

85
00:06:24,079 --> 00:06:25,720
undefined behavior at runtime.

