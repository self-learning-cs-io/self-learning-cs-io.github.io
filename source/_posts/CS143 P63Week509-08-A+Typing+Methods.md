---
title: CS143 P63Week509 08 A+Typing+Methods
---

1
00:00:00,000 --> 00:00:08,120
In this video, we're going to continue our discussion of type checking in cool with the rules for

2
00:00:08,120 --> 00:00:14,839
type checking methods and method calls.

3
00:00:14,839 --> 00:00:17,679
So here's the situation we want to type check a method call.

4
00:00:17,679 --> 00:00:21,879
Let's say that we have a dispatch on some expression easier and we're calling some method

5
00:00:21,879 --> 00:00:25,640
named F and we have some arguments E1 through EN.

6
00:00:25,640 --> 00:00:29,800
Well so clearly we're going to type check E0 and it's going to have some type T0 and similarly

7
00:00:29,800 --> 00:00:34,160
we're going to type check all of the arguments and they're going to have some types.

8
00:00:34,160 --> 00:00:37,880
And the question is what is the return type of this method call?

9
00:00:37,880 --> 00:00:41,920
What value, what kind of value do we get back as we call this method?

10
00:00:41,920 --> 00:00:47,040
And as you can probably see we're in a very similar situation here that we were in before

11
00:00:47,040 --> 00:00:49,719
when we were trying to type check a variable reference.

12
00:00:49,719 --> 00:00:54,200
We have this name F and we don't know anything about what it does.

13
00:00:54,200 --> 00:00:58,760
We don't know what the behavior of F is unless we have some information about S behavior,

14
00:00:58,759 --> 00:01:04,959
we can't really say what kind of value it is going to return.

15
00:01:04,959 --> 00:01:10,519
And added wrinkle in cool is that method and object identifiers live in different namespaces.

16
00:01:10,519 --> 00:01:15,640
That is it's possible in the same scope to have a method called Foo and also an object called

17
00:01:15,640 --> 00:01:18,159
Foo and we won't get the two confused.

18
00:01:18,159 --> 00:01:23,120
They are different enough and used differently enough in the language that we can always tell

19
00:01:23,120 --> 00:01:27,239
when we're talking about the object Foo and when we're talking about the method Foo.

20
00:01:27,239 --> 00:01:32,280
And what this means in effect is that there's two different environments in cool one for objects

21
00:01:32,280 --> 00:01:34,000
and one for methods.

22
00:01:34,000 --> 00:01:37,759
And so in the type rules this is going to be reflected by having a separate mapping,

23
00:01:37,759 --> 00:01:44,119
a separate method environment that's going to record the signature of each of the methods.

24
00:01:44,119 --> 00:01:49,319
And a signature as is a standard name that you'll probably hear used in other contexts.

25
00:01:49,319 --> 00:01:54,159
But the signature of a function is just its input and output types.

26
00:01:54,159 --> 00:02:00,719
And so this table M is going to take a name of a class, it's going to take the name of a method in that class.

27
00:02:00,719 --> 00:02:04,719
And it's just going to tell us what are the argument types of the method.

28
00:02:04,719 --> 00:02:09,800
So all but the last type in the list here is one of the argument types of the method.

29
00:02:09,800 --> 00:02:12,319
And then the last type is the result type.

30
00:02:12,319 --> 00:02:15,319
That's the type of the return value.

31
00:02:15,319 --> 00:02:20,199
So the way we're going to write the method signature is just as a tuple or a list of types.

32
00:02:20,199 --> 00:02:25,639
The first, all but the last one taken together are the types of the arguments in order.

33
00:02:25,639 --> 00:02:28,759
And then the very last one is a type of the result.

34
00:02:28,759 --> 00:02:35,799
And so an entry like this in our method environment just means that F has a signature that looks like this.

35
00:02:35,799 --> 00:02:41,239
It takes an arguments with the respective types and returns something of type Tn plus 1.

36
00:02:44,280 --> 00:02:49,199
So with the method environment added to our rules, now we can write a rule for dispatch.

37
00:02:49,199 --> 00:02:58,359
So notice first of all that we have these two mappings, one for object identifiers and one for method names on the left hand side of the turn style.

38
00:02:58,359 --> 00:03:04,599
We have to propagate that method environment through all of the typings for the sub expressions.

39
00:03:04,599 --> 00:03:15,759
And for the case of method dispatch, we just type the type of the expression that we're dispatching to E0 and all of the arguments and get types T1 through Tn.

40
00:03:15,759 --> 00:03:21,000
And then we look up the type of F in the class T0.

41
00:03:21,000 --> 00:03:26,159
So what class are we dispatching to? Well, that's going to be to the class of E0.

42
00:03:26,159 --> 00:03:33,479
And so where do we look up M in our environment with a better be a method called F to find in class T0.

43
00:03:33,479 --> 00:03:37,560
And it must have some signature with the right number of arguments.

44
00:03:37,560 --> 00:03:45,519
And then the actual arguments that we're passing, the E1 through En, their types have to be subtypes of the declared formal parameters.

45
00:03:45,520 --> 00:03:52,920
So here the signature of F says that for example, the first argument of F has type T1 prime.

46
00:03:52,920 --> 00:04:00,320
And so we're going to require that the type of V1 be some type T1 such that T1 is a subtype of T1 prime.

47
00:04:00,320 --> 00:04:04,879
And similarly for all the other arguments of the method call.

48
00:04:04,879 --> 00:04:14,160
And if all of that checks out, if F has a signature like this and all of these subtype requirements on the actual arguments and the formal arguments match,

49
00:04:14,159 --> 00:04:25,279
then we're going to say that the entire expression, this dispatch, return something of type Tn plus 1, the return type of the method.

50
00:04:25,279 --> 00:04:30,040
The typing rule for static dispatch is very similar to the rule for regular dispatch.

51
00:04:30,040 --> 00:04:38,439
So recall this and tactically, the only thing that's different is that the programmer writes the name of the class at which they wish to run the method.

52
00:04:38,439 --> 00:04:50,600
So instead of running the method F as defined in the class E0, whatever that class happens to be, we're going to run whatever the method F happens to be in some ancestor class of the class of E0.

53
00:04:50,600 --> 00:04:53,079
And how is that expressed in the type rules?

54
00:04:53,079 --> 00:04:57,120
Well, once again, we type E0 and all of the arguments.

55
00:04:57,120 --> 00:05:04,720
And now we require that whatever the type was we discovered for E0, it has to be a subtype of T.

56
00:05:04,720 --> 00:05:11,440
So T has to be a ancestor type in the class hierarchy of the type of E0.

57
00:05:11,440 --> 00:05:28,480
And moreover, that class T had better have a method called F that has the right number of arguments with the right kind of types such that all the type constraints work out that the actual argument types are some types of the corresponding formal argument types.

58
00:05:28,480 --> 00:05:38,480
And then if all of that is true, we'll be able to conclude that the entire dispatch expression has a type Tn plus 1, which is the return type of the method.

