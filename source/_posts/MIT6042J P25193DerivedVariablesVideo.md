---
title: MIT6042J P25193DerivedVariablesVideo
---

1
00:00:00,000 --> 00:00:11,240
The technique of derived variables comes up in analyzing state machines.

2
00:00:11,240 --> 00:00:14,480
So let's just take a quick look at it together.

3
00:00:14,480 --> 00:00:20,679
So a derived variable is simply a function on the states of a state machine that assigns

4
00:00:20,679 --> 00:00:23,640
some value to the states.

5
00:00:23,640 --> 00:00:27,960
So it's just a kind of a function mapping.

6
00:00:27,960 --> 00:00:31,960
If the values happen to be, say, the non-negative integers, it's called non-negative integer

7
00:00:31,960 --> 00:00:39,000
valued, but it could be real value, complex valued, and even take on other kinds of odd

8
00:00:39,000 --> 00:00:41,079
kinds of values, not necessarily numerical.

9
00:00:41,079 --> 00:00:45,799
No pun there, not odd numbers, but unusual values.

10
00:00:45,799 --> 00:00:48,640
So let's look at the example of the robot on the grid.

11
00:00:48,640 --> 00:00:54,640
The states were pairs of non-negative integers, giving the coordinates away the robot was.

12
00:00:54,640 --> 00:00:59,640
And one of the derived variables that we found was really useful was the sum of values

13
00:00:59,640 --> 00:01:05,920
sigma of a state, which is defined to be x plus y.

14
00:01:05,920 --> 00:01:10,640
And this would be a non-negative integer valued derived variable.

15
00:01:10,640 --> 00:01:14,400
So the word derived comes because we're making it up.

16
00:01:14,400 --> 00:01:19,920
It's not part of the specification of the state machine or part of the program that defines

17
00:01:19,920 --> 00:01:22,719
the state machine.

18
00:01:22,719 --> 00:01:28,239
So in the robot example, the actual states were composed of the two coordinates x and y,

19
00:01:28,239 --> 00:01:33,039
but the derived variable that we made up was their sum of sigma.

20
00:01:33,039 --> 00:01:41,439
Another useful derived variable for that robot example was the parity of sigma, whether

21
00:01:41,439 --> 00:01:45,920
or not the number was even or odd.

22
00:01:45,920 --> 00:01:54,200
So sigma is a 0, 1 valued variable, which takes the value 0 if the sum is even and 1 if

23
00:01:54,200 --> 00:01:57,200
the sum is odd.

24
00:01:57,200 --> 00:02:05,120
So in the case of fast exponentiation, we looked at the actual variable z, which was part

25
00:02:05,120 --> 00:02:07,200
of the invariant and a crucial part of the program.

26
00:02:07,200 --> 00:02:16,000
And what we noticed about z was that z was a strictly decreasing and natural number

27
00:02:16,000 --> 00:02:17,159
valued variables.

28
00:02:17,159 --> 00:02:21,360
Matter of fact, we noticed that it halved at each step, but its values were non-negative

29
00:02:21,360 --> 00:02:27,240
integers and it's strictly decreasing at every step.

30
00:02:27,240 --> 00:02:34,800
So that implies, by the well ordering principle, that it will take a minimum value.

31
00:02:34,800 --> 00:02:40,439
And what we know about the minimum value of a strictly decreasing variable is that the

32
00:02:40,439 --> 00:02:48,719
algorithm is stuck because once z has reached its minimum value, if the machine took another

33
00:02:48,719 --> 00:02:51,280
step, then it would get smaller.

34
00:02:51,280 --> 00:02:52,280
So it can't.

35
00:02:52,280 --> 00:02:56,040
It means that the algorithm has to terminate.

36
00:02:56,040 --> 00:03:02,480
So this gives you a general methodology for proving termination, find a non-negative integer

37
00:03:02,479 --> 00:03:08,079
valued strictly decreasing variable, guarantees the program stops.

38
00:03:08,079 --> 00:03:13,000
As a matter of fact, you can say sometimes how long it will take for the program to stop,

39
00:03:13,000 --> 00:03:18,560
as we saw with fast exponentiation, it took not z, which was the obvious bound, but in

40
00:03:18,560 --> 00:03:22,199
fact log of z because z only went down at every step.

41
00:03:22,199 --> 00:03:25,000
It got, have that every step.

42
00:03:25,000 --> 00:03:30,000
So in general, the concept of a strictly decreasing variable is one as shown here that at every

43
00:03:30,000 --> 00:03:36,199
step of the state machine in each transition, it gets strictly smaller.

44
00:03:36,199 --> 00:03:40,319
A related idea is a weekly decreasing variable.

45
00:03:40,319 --> 00:03:46,960
These are not necessarily useful for proving termination, but they are often useful, as you

46
00:03:46,960 --> 00:03:53,360
see, as we progress through the term, examples where it helps you analyze the behavior of the

47
00:03:53,360 --> 00:03:54,360
algorithm.

48
00:03:54,360 --> 00:03:59,920
A weekly decreasing variable is one which goes down or stays constant.

49
00:03:59,920 --> 00:04:03,720
It never gets larger.

50
00:04:03,720 --> 00:04:09,600
So if we looked at the example of sigma, the sum of the coordinates, that's up and down

51
00:04:09,600 --> 00:04:10,760
all over the place.

52
00:04:10,760 --> 00:04:13,160
It's neither increasing nor decreasing.

53
00:04:13,160 --> 00:04:20,000
The other extreme is the parity variable pi, which was the zero or one according to whether

54
00:04:20,000 --> 00:04:25,439
or not the sum of the coordinates was even or odd, and pi is a constant.

55
00:04:25,439 --> 00:04:30,720
And that means that it's both weekly increasing and weekly decreasing in the degenerate sense

56
00:04:30,720 --> 00:04:34,319
that weekly increasing is allowed to say the same.

57
00:04:34,319 --> 00:04:39,680
In fact, something is weekly increasing and weekly decreasing if and only if it's a constant.

58
00:04:39,680 --> 00:04:45,639
By the way, we used to call weekly decreasing variables non-increasing, which is the standard

59
00:04:45,639 --> 00:04:50,199
terminology in the field in calculus talk about non-increasing functions.

60
00:04:50,199 --> 00:04:58,479
And we just found that it caused a lot of confusion because you have to remember that non-increasing

61
00:04:58,479 --> 00:05:01,800
is not the same as not increasing.

62
00:05:01,800 --> 00:05:09,360
So there's an example of a function that is not increasing, but it's certainly not non-increasing.

63
00:05:09,360 --> 00:05:12,479
And if that didn't register, I'll let you think about it.

64
00:05:12,480 --> 00:05:19,319
By the way, this method of proving termination by finding a strictly decreasing natural number

65
00:05:19,319 --> 00:05:25,879
value variable generalizes straight forwardly to a variable which takes on values from a well-ordered

66
00:05:25,879 --> 00:05:27,759
set of real numbers.

67
00:05:27,759 --> 00:05:30,680
Remember a well-ordered set of real numbers.

68
00:05:30,680 --> 00:05:35,920
One of the definitions of it is that it's a set of numbers where it's impossible to find

69
00:05:35,920 --> 00:05:42,280
an infinite decreasing sequence of values w0 less than w1 less than w2 less than w1 going

70
00:05:42,279 --> 00:05:43,799
on forever.

71
00:05:43,799 --> 00:05:49,119
If that can't happen, then the set is called well-ordered.

72
00:05:49,119 --> 00:05:53,000
Of course, the non-negative integers are the most obvious basic case, but there are a

73
00:05:53,000 --> 00:05:57,239
bunch of others described in the notes.

74
00:05:57,239 --> 00:06:04,479
And in general, the termination principle is that if you can find a strictly decreasing

75
00:06:04,479 --> 00:06:12,159
variable of derived variable whose values always come from a well-ordered set, that also

76
00:06:12,160 --> 00:06:14,600
is a way to prove termination.

77
00:06:14,600 --> 00:06:18,960
That's going to guarantee termination for the same reason that the variable will have

78
00:06:18,960 --> 00:06:20,680
to take a minimum value.

79
00:06:20,680 --> 00:06:23,360
That's the other definition of well-ordered.

80
00:06:23,360 --> 00:06:25,640
And when it does, the machine can't move anymore.

