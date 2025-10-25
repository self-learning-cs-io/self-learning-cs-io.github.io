---
title: CS143 P66Week610 01 A+Static+vs+Dynamic+Typing
---

1
00:00:00,000 --> 00:00:10,540
In this video, we're going to talk about static typing versus dynamic typing.

2
00:00:10,540 --> 00:00:14,519
One way to think about the purpose of static type systems is to prevent common programming

3
00:00:14,519 --> 00:00:15,519
errors.

4
00:00:15,519 --> 00:00:17,019
They do this at compile times.

5
00:00:17,019 --> 00:00:20,480
They do this when the program is compiled.

6
00:00:20,480 --> 00:00:24,000
In particular, they do it without knowing any input to the program.

7
00:00:24,000 --> 00:00:26,960
The only thing that is available is the program text.

8
00:00:26,960 --> 00:00:30,800
That's why we call them static because they don't involve any of the dynamic behavior,

9
00:00:30,800 --> 00:00:34,079
the actual execution behavior of the program.

10
00:00:34,079 --> 00:00:38,719
Now any type system that is correct, any static type system that actually does the right

11
00:00:38,719 --> 00:00:41,560
thing, is going to have to just allow some correct programs.

12
00:00:41,560 --> 00:00:46,880
It can't reason completely precisely at compile time about everything that could happen

13
00:00:46,880 --> 00:00:48,439
when the program runs.

14
00:00:48,439 --> 00:00:52,280
What this means is that some correct programs, by that I mean some programs that would actually

15
00:00:52,280 --> 00:00:56,920
run correctly if you executed them, are going to have to be disallowed by the program.

16
00:00:56,920 --> 00:00:58,920
For the type checker.

17
00:00:58,920 --> 00:01:02,000
For this reason, some people argue for dynamic type checking instead.

18
00:01:02,000 --> 00:01:06,120
This is type checking that's done solely when the program runs.

19
00:01:06,120 --> 00:01:11,960
At runtime, we check whether the actual operations were executing or appropriate for the actual

20
00:01:11,960 --> 00:01:16,400
data that arises when the program executes.

21
00:01:16,400 --> 00:01:20,920
Other people say, well, the problem is really just that the type systems aren't expressive

22
00:01:20,920 --> 00:01:26,879
enough and that we should work on fancier static type checking systems.

23
00:01:26,879 --> 00:01:31,159
Over time, there's been considerable development in both camps.

24
00:01:31,159 --> 00:01:34,679
We see a lot of new dynamically ticked checked languages coming out.

25
00:01:34,679 --> 00:01:38,759
So a lot of the modern scripting-like languages and domain-specific languages have some

26
00:01:38,759 --> 00:01:41,280
form dynamic type checking.

27
00:01:41,280 --> 00:01:46,640
Other people have been working on fancier and fancier type systems and actually has been

28
00:01:46,640 --> 00:01:51,479
a lot of progress in static checking.

29
00:01:51,479 --> 00:01:55,239
The disadvantage of the more expressive static type checking systems is they do tend to get

30
00:01:55,239 --> 00:01:59,199
more complicated though and not all of these features that people have developed have

31
00:01:59,199 --> 00:02:05,079
actually found their way yet in domain stream languages.

32
00:02:05,079 --> 00:02:10,319
One important idea that this discussion suggests is that there are two different notions

33
00:02:10,319 --> 00:02:11,319
of type.

34
00:02:11,319 --> 00:02:13,359
There is the dynamic type.

35
00:02:13,359 --> 00:02:17,840
That is the type that the object or the value that we're talking about actually has it

36
00:02:17,840 --> 00:02:20,079
run time.

37
00:02:20,160 --> 00:02:25,560
And there is the static type, which is the compile time notion, what the type checker

38
00:02:25,560 --> 00:02:28,240
knows about the object.

39
00:02:28,240 --> 00:02:32,439
And there is some relationship that has to exist between the static type and the dynamic

40
00:02:32,439 --> 00:02:41,160
type if the static type checker is to be correct.

41
00:02:41,160 --> 00:02:45,720
And this relationship can be formalized by some kind of a theorem that proves something

42
00:02:45,719 --> 00:02:46,719
like the following.

43
00:02:46,719 --> 00:02:51,599
What we'd like to know is that for every expression e, for every program expression e that

44
00:02:51,599 --> 00:02:57,680
you can write in the programming language, the static type that the compiler says that

45
00:02:57,680 --> 00:03:02,759
expression is going to have is equal to the dynamic type of that expression.

46
00:03:02,759 --> 00:03:07,520
Another way of saying that is that if you actually run the program, then you get something

47
00:03:07,520 --> 00:03:11,599
that is consistent with what you expected to get from the static type checker.

48
00:03:11,599 --> 00:03:17,280
The static type checker is actually able to correctly predict what values will arise

49
00:03:17,280 --> 00:03:19,280
at run time.

50
00:03:19,280 --> 00:03:23,079
And in fact, in the early days of programming languages, these were exactly the kinds of

51
00:03:23,079 --> 00:03:29,719
theorems we had for the very simple type systems in the languages at that time.

52
00:03:29,719 --> 00:03:33,280
Now the situation is a little more complicated for a language like cool.

53
00:03:33,280 --> 00:03:37,319
So let's take a look at the execution of a typical cool program.

54
00:03:37,319 --> 00:03:42,759
So here's a couple of classes, class A, and a class B then herds from A. So B is going

55
00:03:42,759 --> 00:03:46,000
to be a subtype of A, which we'll write like that.

56
00:03:46,000 --> 00:03:53,719
And now we have a declaration here of X having type A. And this is the static type of X.

57
00:03:53,719 --> 00:04:02,840
So the static type of X is A. And that's what the compiler knows about X's value.

58
00:04:02,840 --> 00:04:09,200
And then here, when we execute this line of code, we can see that we assign a new A object

59
00:04:09,200 --> 00:04:11,080
to X. And the fact that it's new is not important.

60
00:04:11,080 --> 00:04:13,439
And all this importance, the fact that it's an A object.

61
00:04:13,439 --> 00:04:19,800
And so at this point, the dynamic type of X is also A. So at this line of code, when it

62
00:04:19,800 --> 00:04:24,920
actually executes A, which was declared to have static type A actually holds an object

63
00:04:24,920 --> 00:04:30,399
of class A. But a little bit later on down this line of code, the dynamic type is actually

64
00:04:30,399 --> 00:04:39,639
different. The dynamic type here of X is going to be B. When this line of code executes,

65
00:04:39,639 --> 00:04:43,719
X holds a B object, even though it's declared to have a different type.

66
00:04:43,719 --> 00:04:47,199
And this is a very, very important distinction to keep in mind.

67
00:04:47,199 --> 00:04:49,839
So there's a static type. There's a type that the compiler knows about.

68
00:04:49,839 --> 00:04:55,679
And that's invariant. X has type A. It always has type A. All the uses of X for the entire

69
00:04:55,680 --> 00:05:02,759
scope of X are typed with class A by the compiler. But at runtime, because we have assignments,

70
00:05:02,759 --> 00:05:08,000
and we can assign different objects to X, X can actually take on objects of different types

71
00:05:08,000 --> 00:05:12,800
and different runtime types. So here's an object of type A. And here's an object of class

72
00:05:12,800 --> 00:05:16,199
or type B. That's assigned to X when the program executes.

