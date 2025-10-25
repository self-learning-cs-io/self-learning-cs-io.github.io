---
title: CS143 P68Week610 02 Self Type
---

1
00:00:00,000 --> 00:00:07,440
In the last video, we talked about the difference between static and dynamic typing and how one

2
00:00:07,440 --> 00:00:11,919
trend in static typing is towards increasingly expressive type systems.

3
00:00:11,919 --> 00:00:15,320
In this lecture, we're going to talk about self-type, which will give you a taste of what

4
00:00:15,320 --> 00:00:21,320
those more expressive type systems can look like.

5
00:00:21,320 --> 00:00:25,000
To begin with, let's motivate the problem that self-type solves by looking at a simple

6
00:00:25,000 --> 00:00:26,480
class definition.

7
00:00:26,480 --> 00:00:30,480
So here we have a class count, and it has a single field i, which is an integer

8
00:00:30,480 --> 00:00:34,320
initialized to zero, and it has one method increment.

9
00:00:34,320 --> 00:00:37,640
And essentially, the class count just increments a counter.

10
00:00:37,640 --> 00:00:41,640
So you, initially, when you allocate a new count object, the counter is zero, and then

11
00:00:41,640 --> 00:00:46,280
every time you call ink, the counter's value is increased by one.

12
00:00:46,280 --> 00:00:52,760
And notice that this can be thought of as a base class that provides counter functionality.

13
00:00:52,759 --> 00:00:58,320
So whenever I wanted a counter for some specific purpose, I could define a new subclass, and

14
00:00:58,320 --> 00:01:03,560
that of count, and that subclass would automatically inherit the ink method, thereby allowing me

15
00:01:03,560 --> 00:01:07,039
to have counter without having to re-implement the code.

16
00:01:07,039 --> 00:01:08,879
And in this case, the amount of code is very, very small.

17
00:01:08,879 --> 00:01:10,359
And why is that?

18
00:01:10,359 --> 00:01:12,280
Well, let's think about it for a minute.

19
00:01:12,280 --> 00:01:15,239
So what is the signature of ink?

20
00:01:15,239 --> 00:01:21,959
So ink, remember, was declared to return things of type count.

21
00:01:21,959 --> 00:01:28,519
And when the ink method is inherited by the stock class, this signature doesn't change.

22
00:01:28,519 --> 00:01:30,959
It still returns things of type count.

23
00:01:30,959 --> 00:01:33,359
So here we have a new stock object.

24
00:01:33,359 --> 00:01:39,079
We call the increment method, but the type of this whole thing is a count.

25
00:01:39,079 --> 00:01:45,119
And then we try to assign that to a stock, but that doesn't work because count is not

26
00:01:45,119 --> 00:01:46,919
a subtype of stock.

27
00:01:46,920 --> 00:01:53,799
A variable of type stock can't hold a value of type count.

28
00:01:53,799 --> 00:01:59,519
And so the type system will report an error right here at the assignment statement.

29
00:01:59,519 --> 00:02:03,240
And you can see that this is actually a serious problem because it's made the inheritance

30
00:02:03,240 --> 00:02:06,120
of the increment method pretty useless.

31
00:02:06,120 --> 00:02:12,800
I can define new subclasses of stock, but I can never use the increment method on them,

32
00:02:12,800 --> 00:02:16,840
at least not without getting back something of the parent type.

33
00:02:16,840 --> 00:02:21,240
And so it's not as the inheritance of the increment method is not as useful as one might

34
00:02:21,240 --> 00:02:24,640
have hoped.

35
00:02:24,640 --> 00:02:32,600
So just to review, the incremented new stock will have dynamic type stock that will actually

36
00:02:32,600 --> 00:02:34,400
be a stock object that is returned.

37
00:02:34,400 --> 00:02:35,840
Okay, so don't get confused here.

38
00:02:35,840 --> 00:02:39,120
This is the dynamic type I'm talking about.

39
00:02:39,120 --> 00:02:44,159
So when we allocate the new stock object, and then we call the increment method, remember

40
00:02:44,159 --> 00:02:46,560
the increment method returns self.

41
00:02:46,560 --> 00:02:49,480
So the increment method was implemented something like this.

42
00:02:49,480 --> 00:02:55,680
I'm going to leave out the types, but it was I gets I plus one, and then it returned

43
00:02:55,680 --> 00:02:56,680
the self object.

44
00:02:56,680 --> 00:03:00,800
All right, so it's definitely returning whatever object is passed in here at the dispatch

45
00:03:00,800 --> 00:03:01,800
point.

46
00:03:01,800 --> 00:03:04,719
So it's returning something of dynamic type stock.

47
00:03:04,719 --> 00:03:07,840
And a clear type of the self parameter.

48
00:03:07,840 --> 00:03:14,599
And so it could be anyone of the subtypes in this case of the count class.

49
00:03:14,599 --> 00:03:18,840
And to do this, we're actually going to have to introduce a new keyword called self type

50
00:03:18,840 --> 00:03:23,920
that is going to be used as the return the type of the return value of such functions.

51
00:03:23,920 --> 00:03:30,800
And we're going to have to modify our typing rules to handle this new kind of type.

52
00:03:30,800 --> 00:03:35,759
So the idea behind self type is that it's going to allow the type to change when ink

53
00:03:35,759 --> 00:03:41,239
is inherited or allow us to reason about how the actual return type dynamically of the

54
00:03:41,239 --> 00:03:45,039
increment method changes when the increment method is inherited.

55
00:03:45,039 --> 00:03:47,159
So we changed the declaration of ink to read as follows.

56
00:03:47,159 --> 00:03:52,840
We declare the return type now to be self type, meaning the return value of the increment

57
00:03:52,840 --> 00:03:58,000
method has whatever type is the type of the original self parameter.

58
00:03:58,000 --> 00:04:01,479
And when we do that, now we can see that it's possible.

59
00:04:01,479 --> 00:04:04,560
We haven't said how we do it, but you should be able to see that it intuitively makes sense

60
00:04:04,560 --> 00:04:07,120
that we could prove facts of the following form.

61
00:04:07,120 --> 00:04:11,920
So when the self parameter has the type count, remember that the thing we dispatch to,

62
00:04:11,920 --> 00:04:14,960
the thing we call ink on is the self parameter.

63
00:04:14,960 --> 00:04:19,040
So when we dispatch to a count object, we get back something of type count.

64
00:04:19,040 --> 00:04:23,680
And when we dispatch on a stock object, when we call increment on a stock object,

65
00:04:23,680 --> 00:04:29,240
well, what's the type of self, the type of stock, and we get back something of type stock.

66
00:04:29,240 --> 00:04:33,360
And now the program that we had before with this one change is well typed and would be

67
00:04:33,360 --> 00:04:38,680
accepted by the cool type system.

68
00:04:38,680 --> 00:04:42,840
Now it's a very important to remember that self type is not a dynamic type.

69
00:04:42,840 --> 00:04:47,840
It is very much a static type and part of the static type system.

70
00:04:47,840 --> 00:04:52,080
It's also important to realize itself type is not a class name.

71
00:04:52,080 --> 00:04:57,040
So unlike all the other static types in cool, it is not the name of a class.

72
00:04:57,040 --> 00:04:58,280
It's its own special thing.

73
00:04:58,280 --> 00:05:02,639
And we'll see more about exactly what it is in future videos.

74
00:05:02,639 --> 00:05:06,360
But the purpose of self type, as we've seen, is to enable the type checker to accept

75
00:05:06,360 --> 00:05:07,879
more correct programs.

76
00:05:07,879 --> 00:05:12,439
And effectively, what self type does is to increase the expressive power of the type system.

