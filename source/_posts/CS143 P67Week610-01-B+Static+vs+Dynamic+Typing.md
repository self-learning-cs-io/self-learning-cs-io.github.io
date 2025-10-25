---
title: CS143 P67Week610 01 B+Static+vs+Dynamic+Typing
---

1
00:00:00,000 --> 00:00:06,360
What this means is that the sound is theorem for the cool type system is a bit more complicated

2
00:00:06,360 --> 00:00:08,960
than the one for simple type systems.

3
00:00:08,960 --> 00:00:14,919
So in the presence of subtyping, the property that we want is that the static type computed

4
00:00:14,919 --> 00:00:21,960
by the compiler for an expression E is going to be a correct predictor of all the possible

5
00:00:21,960 --> 00:00:23,559
dynamic types that you could have.

6
00:00:23,559 --> 00:00:27,000
And we do that by using the subtyping relationship right here.

7
00:00:27,000 --> 00:00:32,159
So we say that whatever dynamic type E could have, whatever types E can take on at runtime,

8
00:00:32,159 --> 00:00:39,960
they have to be a subtype of the single static type that is predicted for E.

9
00:00:39,960 --> 00:00:44,159
What this means is that all the operations that can be used on an object of type C have

10
00:00:44,159 --> 00:00:50,159
to also be able to be used on any object of type C prime that's a subtype of C. So C defines

11
00:00:50,159 --> 00:00:55,320
certain attributes and methods, and all of those attributes and methods have to be available

12
00:00:55,320 --> 00:00:59,119
in C prime.

13
00:00:59,119 --> 00:01:04,000
And therefore subclasses can only add attributes or methods.

14
00:01:04,000 --> 00:01:10,640
So whatever attributes and methods a subclass will have, what C prime in this case, those

15
00:01:10,640 --> 00:01:13,680
are all in addition to whatever C has.

16
00:01:13,680 --> 00:01:18,560
So C prime, a subclass will never remove an attribute or remove a method, it will only

17
00:01:18,560 --> 00:01:24,000
extend or add methods and attributes to the class it is inheriting from.

18
00:01:24,000 --> 00:01:27,359
And note that you're allowed to redefine methods in cool and in most object oriented

19
00:01:27,359 --> 00:01:30,560
languages, but you cannot change the type.

20
00:01:30,560 --> 00:01:35,200
So even though you can redefine the code that goes with that method, it still has a type

21
00:01:35,200 --> 00:01:38,319
check according to the original type that you declared.

22
00:01:38,319 --> 00:01:42,879
And so whatever type the method has in the first class in which it's defined, it's going

23
00:01:42,879 --> 00:01:46,960
to have that same type, that same argument and result, the same types for the method

24
00:01:46,960 --> 00:01:51,000
arguments and the same type for the method result in all of the subclasses.

25
00:01:51,000 --> 00:01:56,000
And that's a pretty standard design point for a lot of object oriented languages.

