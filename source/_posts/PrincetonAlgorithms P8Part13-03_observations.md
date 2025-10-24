---
title: PrincetonAlgorithms P8Part13 03_observations
---

1
00:00:00,000 --> 00:00:14,640
Okay, so the first step is to be able to make some observations about the running time

2
00:00:14,640 --> 00:00:16,539
of the programs.

3
00:00:16,539 --> 00:00:21,480
And for analysis of algorithms, that's easier than in a lot of scientific disciplines, as

4
00:00:21,480 --> 00:00:23,440
we'll see.

5
00:00:23,440 --> 00:00:28,560
For an example, we're going to use the so-called three-some problem.

6
00:00:28,559 --> 00:00:30,599
That's an easy to state problem.

7
00:00:30,599 --> 00:00:36,799
If you've got in distinct integers, how many triples sum to exactly zero?

8
00:00:36,799 --> 00:00:47,280
For example, in this file 8-ins.tech, which has eight integers in it, there's four triples

9
00:00:47,280 --> 00:00:54,439
that sum to zero, 30 minus 40-10, 30 minus 20 minus 10, and so forth.

10
00:00:54,439 --> 00:01:03,000
And so our goal is to write a program that can compute this quantity for any input file,

11
00:01:03,000 --> 00:01:05,400
any set of end integers.

12
00:01:05,400 --> 00:01:12,280
This is actually an extremely important computation that's deeply related to many problems

13
00:01:12,280 --> 00:01:20,159
in computational geometry, which is a branch of computer science that covers the algorithms

14
00:01:20,159 --> 00:01:27,479
and underlying science related to graphics and movies and geometric models of all sort.

15
00:01:27,479 --> 00:01:31,200
So this is actually an important practical problem.

16
00:01:31,200 --> 00:01:35,879
But it's a simple one to write code for.

17
00:01:35,879 --> 00:01:41,280
Any of you could write down this program without much effort.

18
00:01:41,280 --> 00:01:54,280
It's a got a static method count that is going to go ahead and take an integer array as argument.

19
00:01:54,280 --> 00:01:56,040
And that's the number of integers.

20
00:01:56,040 --> 00:01:57,640
That's the length of the array.

21
00:01:57,640 --> 00:02:01,400
We'll start with a variable count equals zero.

22
00:02:01,400 --> 00:02:06,840
And then a triple-for loop that checks each triple ijk.

23
00:02:06,840 --> 00:02:13,960
We go i from 1 to nj from i plus 1 to n and k from j plus 1 to n so that we get each triple just once.

24
00:02:13,960 --> 00:02:19,400
And then if i plus j, a i plus a j plus a k equals zero, we increment the count.

25
00:02:19,400 --> 00:02:23,159
And after that triple-for loop, we return the count.

26
00:02:23,159 --> 00:02:31,400
And then the main method in this simple class just reads in all the integers and prints out the count.

27
00:02:31,400 --> 00:02:37,000
That's a brute force algorithm that is a fine method for solving the three-some problem.

28
00:02:37,000 --> 00:02:43,240
Now what we're interested in is how much time does this take as a function of n?

29
00:02:43,240 --> 00:02:48,520
Well, one way to time a program is to just look at the watch.

30
00:02:48,520 --> 00:02:53,840
If you have a stopwatch or look at the clock or your phone, whatever you might need,

31
00:02:53,840 --> 00:02:58,280
you can just go ahead and time it if you want.

32
00:02:58,280 --> 00:03:11,159
Or we have Java has as part of its standard library, a stopwatch class that will go ahead and compute a lapse time.

33
00:03:11,159 --> 00:03:19,280
So, or anytime you run a program, if it's set up to easily take input of different sizes,

34
00:03:19,280 --> 00:03:24,039
a natural thing to do is just run it for bigger sizes.

35
00:03:24,039 --> 00:03:29,319
So, for eight-inch, this program takes not too much time.

36
00:03:29,319 --> 00:03:33,079
For thousand-incent takes half a second.

37
00:03:33,079 --> 00:03:38,519
For two thousand takes more time.

38
00:03:38,519 --> 00:03:41,079
That's three point seven seconds.

39
00:03:41,079 --> 00:03:42,199
Run it again.

40
00:03:42,199 --> 00:03:46,120
Still takes three point seven seconds for four thousand.

41
00:03:46,120 --> 00:03:53,959
So each time we're doubling the size of the input and it's definitely taking more time each time.

42
00:03:54,680 --> 00:04:04,200
And actually, as we'll see, if programmers who get in the habit of testing the running time in their program in this way,

43
00:04:04,200 --> 00:04:12,840
can get so that you can actually pretty easily and quickly evaluate when it's going to finish.

44
00:04:12,840 --> 00:04:18,360
In fact, while you're waiting for it to finish, you can often figure it out.

45
00:04:18,439 --> 00:04:23,080
So that one took 30 seconds for four K.

46
00:04:23,080 --> 00:04:31,160
And definitely, we could figure out how long it's going to take for eight K before it finishes.

47
00:04:31,160 --> 00:04:34,520
And you'll see how in just a second, I'm not going to wait right now.

48
00:04:34,520 --> 00:04:37,960
You can think about what you think.

49
00:04:37,960 --> 00:04:43,560
Okay, so that's empirical analysis.

50
00:04:43,560 --> 00:04:47,480
Run it for various input sizes and measure the running time.

51
00:04:47,480 --> 00:04:55,560
Now, if this were some scientific problem where we were counting something that happened in the natural world,

52
00:04:55,560 --> 00:05:01,800
the number of ants on an antile or whatever, then we'd have only a few data points.

53
00:05:01,800 --> 00:05:07,960
And we would try to understand what's going on by doing a plot of our running time.

54
00:05:07,960 --> 00:05:13,400
Quantity we're interested in on the y-axis and the problem size on the x-axis.

55
00:05:13,399 --> 00:05:16,199
Now, we get a curve like this.

56
00:05:16,199 --> 00:05:28,120
And actually, what scientists usually do because so many problems fall into this class is do the plot as a log log plot.

57
00:05:28,120 --> 00:05:33,719
If you do it as a log log plot, very often you'll get a straight line.

58
00:05:33,719 --> 00:05:36,519
In the slope of the straight line is the key to what's going on.

59
00:05:36,519 --> 00:05:40,679
In this case, the slope of the straight line is three.

60
00:05:40,680 --> 00:05:47,560
And so you can run what's called a regression to fit a straight line through the data points.

61
00:05:47,560 --> 00:05:57,399
And then it's not difficult to do the math to show that if you get a straight line and the slope is B,

62
00:05:57,399 --> 00:06:05,000
then your function is proportional to A n to the B. That's called a power law.

63
00:06:05,000 --> 00:06:10,600
And that's true of many, many scientific problems, including most algorithms.

64
00:06:10,600 --> 00:06:14,520
So here's a little bit of the math for that.

65
00:06:14,520 --> 00:06:22,680
So the straight line means that since we did a log log plot with powers at two,

66
00:06:22,680 --> 00:06:28,680
that log base two of T of n equals B log log of n plus C.

67
00:06:28,680 --> 00:06:31,720
And we have our empirical values of B and C.

68
00:06:31,720 --> 00:06:36,360
And then if you raise both sides of that equation to two to that power,

69
00:06:36,360 --> 00:06:41,560
then you get T of n equals a constant times n to the B.

70
00:06:41,560 --> 00:06:49,400
So right away, just from observation, we have a pretty good model for the running time of our program.

71
00:06:49,400 --> 00:06:55,480
We can figure, we can do the math and figure out that it seems as though the running time is about

72
00:06:55,480 --> 00:06:59,960
10 to the minus 10 times n cubed seconds.

73
00:06:59,960 --> 00:07:03,960
And we can use that hypothesis to go ahead and make predictions.

74
00:07:04,039 --> 00:07:11,399
Just plug in for different values of n and it says it ought to take us 400 seconds for 16,000.

75
00:07:11,399 --> 00:07:17,560
And 400 seconds is plenty of time, but now we can go ahead and invest and run that experiment

76
00:07:17,560 --> 00:07:23,240
and sure enough, we're pretty close to that 408 seconds when we run it.

77
00:07:23,240 --> 00:07:29,799
And now we can make a prediction for 32,000 or for whatever else we might be interested in.

78
00:07:29,879 --> 00:07:34,120
The model helps us do predictions without investing the expense to run the experiments.

79
00:07:35,960 --> 00:07:41,160
In fact, in this situation, if there is a power law and again,

80
00:07:41,960 --> 00:07:48,680
in a very great majority of computer algorithm running times, it's going to be a power law.

81
00:07:48,680 --> 00:07:53,000
What we can do is just double the size of the input each time, the way we were,

82
00:07:53,000 --> 00:07:57,560
and then take the ratio of the running times for n and 2n.

83
00:07:58,519 --> 00:08:02,199
And if you do that, that ratio is going to converge to a constant.

84
00:08:03,079 --> 00:08:07,480
And in fact, the log of the ratio is going to converge to that constant, which is the

85
00:08:07,480 --> 00:08:13,399
exponent of n in the running time. And just need a little math to check that one,

86
00:08:13,959 --> 00:08:20,199
but that's a very easy and natural way to go ahead and predict running times.

87
00:08:20,920 --> 00:08:25,639
So that's what I said before is, so we have this quick way to estimate B in the power law

88
00:08:25,639 --> 00:08:31,560
relationship. How do we estimate A? Well, we can just run it and solve for A.

89
00:08:32,439 --> 00:08:37,000
So once we've decided that that exponent is 3, let's run it for some big N,

90
00:08:37,960 --> 00:08:42,840
and we get a pretty close model to the one we had from plotting things.

91
00:08:44,279 --> 00:08:51,639
So it's almost identical hypothesis, and we just got it by running the program doubling in each time.

92
00:08:56,360 --> 00:09:05,159
Okay, so there's a lot of effects in trying to understand the running time of a program on your

93
00:09:05,159 --> 00:09:13,159
machine. So key effects are independent of what computer it is, and that's the algorithm you're

94
00:09:13,159 --> 00:09:18,120
using and what's the data. And that's going to really determine the exponent in the power law.

95
00:09:19,399 --> 00:09:24,360
And then there's a lot of system dependent effects. What kind of hardware do you have? Do you have a

96
00:09:24,360 --> 00:09:29,560
fast computer or a slow one? What kind of software? What's going on in your computer? All of those

97
00:09:29,560 --> 00:09:38,840
things really determine the constant A in the power law. So in modern systems, it's so much going

98
00:09:38,840 --> 00:09:44,759
on in the hardware and software, it's sometimes difficult to get a really precise measurements.

99
00:09:45,399 --> 00:09:51,080
But on the other hand, we don't have to sacrifice animals or fly to another planet the way they

100
00:09:51,080 --> 00:09:57,879
do in other sciences. We can just run a huge number of experiments and usually take care of

101
00:09:57,879 --> 00:10:00,280
understanding these kinds of effects.

