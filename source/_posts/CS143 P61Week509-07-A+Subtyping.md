---
title: CS143 P61Week509 07 A+Subtyping
---

1
00:00:00,000 --> 00:00:10,000
In this video, we're going to talk about subtyping, another important idea in cool and other object-oriented languages.

2
00:00:14,000 --> 00:00:19,000
Let's begin by taking a look at the typing rule for let with initialization.

3
00:00:19,000 --> 00:00:22,000
So last time we looked at the let rule but didn't have the initializer,

4
00:00:22,000 --> 00:00:26,000
and so let's just see how adding the initializer right here changes things.

5
00:00:27,000 --> 00:00:33,000
So what's going to happen here? Well, first of all, notice that the body of the rule is almost the same.

6
00:00:33,000 --> 00:00:40,000
So we type check E1 in an environment where x has type T0, the type it's declared to have in the let,

7
00:00:40,000 --> 00:00:46,000
and all the other variables have whatever type, so it gives them, and we get out some type T1,

8
00:00:46,000 --> 00:00:51,000
and that will be the type of the whole thing. So this piece right here is exactly the same as before.

9
00:00:52,000 --> 00:00:57,000
So what's new is this line where we type check the initializer.

10
00:00:57,000 --> 00:01:03,000
And so how does that work? Well, first of all, under the assumptions, oh, we type check E0 and we get some type T0.

11
00:01:03,000 --> 00:01:10,000
And now this is really an aside from the main point, but notice that we use the environment, oh, in particular x,

12
00:01:10,000 --> 00:01:14,000
the new definition of x is not available in E0.

13
00:01:15,000 --> 00:01:23,000
So if E0 uses the name x, that means it uses the name of some other x that's defined outside of the let,

14
00:01:23,000 --> 00:01:29,000
because we didn't include this definition of x in the environment for type checking E0.

15
00:01:29,000 --> 00:01:35,000
All right, now, but the main point, the thing I want to point out on this slide, is that E0 here has type T0,

16
00:01:35,000 --> 00:01:40,000
which is exactly the same type as x. And that's a requirement of this rule.

17
00:01:40,000 --> 00:01:50,000
It says that E0 has to have the same type as x. And that's actually fairly weak, because there's really no problem if E0 has a type,

18
00:01:50,000 --> 00:01:58,000
which is a subtype of T0. T0 can hold any subtype of T0, and that would be absolutely fine.

19
00:01:58,000 --> 00:02:07,000
But here we've limited ourselves to only allowing initializers that exactly match the type of x.

20
00:02:07,000 --> 00:02:12,000
So we can do better if we introduce the subtyping relation on classes.

21
00:02:12,000 --> 00:02:22,000
And the most obvious form of subtyping is that if x is a class, and it inherits directly from y, meaning there's a line in the code that says x inherits from y,

22
00:02:22,000 --> 00:02:32,000
then x should be a subtype of y. And furthermore, this relationship is transitive. So if x is a subtype of y, and y is a subtype of z, then x is a subtype of z.

23
00:02:32,000 --> 00:02:38,000
And finally, as you might expect, it's also reflexive. So every class is a subtype of itself.

24
00:02:38,000 --> 00:02:44,000
And using subtyping, we can write out a better version of the let rule with initialization.

25
00:02:44,000 --> 00:02:52,000
So once again, the part of the rule that deals with the body of the let is exactly the same as before. So let's not look at that.

26
00:02:52,000 --> 00:02:57,000
And now what we're going to do is we're going to type check E0, and we get some type T0 out.

27
00:02:57,000 --> 00:03:03,000
And then T0 now is only required to be a subtype of t. So this line here is another hypothesis.

28
00:03:03,000 --> 00:03:09,000
And it just says that T0 has to be a subtype of t. And what is t? Well, t is now the type that x is declared to be.

29
00:03:09,000 --> 00:03:19,000
So this allows E0 to have a type that's different from the type of x. And the only issue here is that more programs will type check with this rule in the previous one.

30
00:03:19,000 --> 00:03:25,000
The previous rule we had was certainly correct. Any program that compiled with that rule would run correctly.

31
00:03:25,000 --> 00:03:34,000
But this is a more permissive and still correct rule. More programs will compile and type check correctly using this rule.

32
00:03:34,000 --> 00:03:43,000
Subtyping shows up in a number of places in the cool type system. Here's the rule for assignment, which is in many ways similar to the rule for let.

33
00:03:43,000 --> 00:03:49,000
So how does an assignment work? Well, on the left hand side is a variable. On the right hand side is an expression.

34
00:03:49,000 --> 00:03:55,000
We're going to evaluate the expression and assign whatever value we get back to the variable on the left hand side.

35
00:03:55,000 --> 00:04:03,000
And so what how is this type check? Well, first of all, we have to look up the type of x in the environment. And we discovered has some type T0.

36
00:04:03,000 --> 00:04:08,000
And then we type check E1 in the same environment. So this set of variables here is not changing.

37
00:04:08,000 --> 00:04:15,000
And so we type check E1 environment. Oh, and we get some type T1. And now what has to be true for this assignment to be correct?

38
00:04:15,000 --> 00:04:25,000
Well, it has to be possible for x to hold the value of type T1. So x is type T0 has to be a super type, as we bigger than the type of T1.

39
00:04:25,000 --> 00:04:32,000
So if this constraint is satisfied, then the assignment is correct.

40
00:04:32,000 --> 00:04:41,000
Another example that uses subtyping is the rule for attribute initialization, which except for the scope of identifiers is very, very similar to the rule for normal assignment.

41
00:04:41,000 --> 00:04:52,000
So recall what a class looks like. You can declare a class in cool. And it has at the top level some set of attributes and methods.

42
00:04:53,000 --> 00:05:03,000
And what does an attribute definition look like? Well, it looks like one of these things. It's a variable declared to have some type. And it can have an initializer on the right hand side.

43
00:05:03,000 --> 00:05:15,000
And so in what environment then is this initializer type check? Well, it's a type check in this special environment of sub C, which just consists of the types of all the attributes that are declared in class C.

44
00:05:15,000 --> 00:05:29,000
So that means we have to make a pass over the class definition, pull out all the attribute definitions, all the names of the variables and their types, build an environment that records all that information, and then we can type check the initializer.

45
00:05:29,000 --> 00:05:35,000
Because remember, the initializer for an attribute can refer to any of the attributes of the class.

46
00:05:35,000 --> 00:05:52,000
So let's take a look at how this works. First, we look up the type of X in the environment that some type T zero. Now we type check E1 in the same environment that some type T1. And then just as with assignment, T1 needs to be a subset or a sub type of the type T zero.

47
00:05:53,000 --> 00:06:05,000
Now we come to another interesting example, how we type check and if then else. And the important thing about if then else is that when we're doing type checking, we don't know which branch is going to be taken.

48
00:06:05,000 --> 00:06:18,000
We don't know whether the program is going to execute E1 or E2. And in general, actually this if statement may or this if expression may execute multiple times during a run of the program. And sometimes it may execute E1 other times it may execute E2.

49
00:06:19,000 --> 00:06:29,000
And so what that means that the resulting type of an if then else is either the type of E1 or the type of E2. And we don't know at compile time which one is going to be.

50
00:06:29,000 --> 00:06:39,000
So the best we can do is to say the type of the entire if then else is the smallest super type larger than the type of either E1 or E2.

51
00:06:39,000 --> 00:06:51,000
The need to compute an upper bound over two or more types comes up often enough that we're going to give the operation a special name. We'll call it the love or least upper bound of X and Y.

52
00:06:51,000 --> 00:06:58,000
And the least upper bound of X and Y is going to be Z if Z is an upper bound. So meaning it's bigger than both X and Y.

53
00:06:58,000 --> 00:07:11,000
And also if it is the least among all possible upper bound. So what this line here says that if there is some other Z prime that's bigger than X and Y well then Z has to be smaller than Z prime.

54
00:07:11,000 --> 00:07:25,000
So Z is the least. It is the smallest of all the possible upper bounds of X and Y. And in cool and in most obvict oriented languages, the least upper bound of two types is just their least common ancestor in the inheritance tree.

55
00:07:25,000 --> 00:07:35,000
So typically inheritance tree is rooted at object or some similarly named class that incorporates that includes all the possible classes of the program.

56
00:07:35,000 --> 00:07:52,000
And then there's some kind of a hierarchy which is a tree that descends from object. And if I want to find the least upper bound of two types say this type and this type, I just have to walk back through the tree until I find their least common ancestor.

57
00:07:52,000 --> 00:07:59,000
So in this case, if I pick these two types out of my tree, this would be the least upper bound of those two types.

