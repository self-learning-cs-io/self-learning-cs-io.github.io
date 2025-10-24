---
title: PrincetonAlgorithms P2Part12 03_dynamic Connectivity
---

1
00:00:00,000 --> 00:00:06,440
Welcome back to algorithms. Today we're going to talk about the union fine problem.

2
00:00:06,440 --> 00:00:11,160
Set of algorithms for solving the so-called dynamic connectivity problem,

3
00:00:11,160 --> 00:00:15,419
we'll look at two classic algorithms, quick find and quick union and some

4
00:00:15,419 --> 00:00:19,320
applications and improvements of those algorithms.

5
00:00:19,320 --> 00:00:25,800
The subtext of today's lecture really is to go through the steps that will

6
00:00:25,800 --> 00:00:31,039
follow over and over again to develop a useful algorithm. The first step is to

7
00:00:31,039 --> 00:00:36,079
model the problem, try to understand basically what are the main elements of the

8
00:00:36,079 --> 00:00:40,240
problem that needs to be solved. Then we'll find some algorithm to solve the

9
00:00:40,240 --> 00:00:44,840
problem. In many cases the first algorithm we come up with would be fast enough,

10
00:00:44,840 --> 00:00:50,400
maybe fits in memory and we go ahead and use it and be off and running. But in

11
00:00:50,400 --> 00:00:54,760
many other cases maybe it's not fast enough or there's not enough memory. So

12
00:00:54,759 --> 00:00:59,399
what we do is try to figure out why, find a way to address whatever is

13
00:00:59,399 --> 00:01:04,159
causing that problem, find a new algorithm and iterate until we're satisfied.

14
00:01:04,159 --> 00:01:10,200
This is a scientific approach to designing and analyzing algorithms where we

15
00:01:10,200 --> 00:01:15,039
build mathematical models to try to understand what's going on and then we do

16
00:01:15,039 --> 00:01:20,640
experiments to validate those models and help us improve things. So first we'll

17
00:01:20,640 --> 00:01:24,719
talk about the dynamic connectivity problem, the model of the problem for

18
00:01:24,719 --> 00:01:31,959
union find. So here's the idea. They're going to have a set of n objects. It

19
00:01:31,959 --> 00:01:36,039
doesn't really matter what they are. We're going to use the numbers 0 through n to

20
00:01:36,039 --> 00:01:41,879
model our objects. And then we have the idea of a connection between two objects

21
00:01:41,879 --> 00:01:47,000
and we'll postulate that there's going to be a command that says connect two

22
00:01:47,000 --> 00:01:51,000
objects, given two objects provide a connection between them. And then the key

23
00:01:51,000 --> 00:01:56,040
part of the problem is the find query or the connected query, which just asks is

24
00:01:56,040 --> 00:02:02,280
there a path connecting the two objects? So for example in this set of 10 objects

25
00:02:02,280 --> 00:02:09,000
we've performed already a bunch of union commands connecting 4 and 3 and 3 and

26
00:02:09,000 --> 00:02:15,400
8 and 6 and 5, 9 and 4 and 2 and 1. And now we might have a connected query that

27
00:02:15,400 --> 00:02:20,920
says is 0 connected to 7. Well in this case there's no connection so we say no

28
00:02:20,919 --> 00:02:27,919
but if we ask is 8 connected to 9 we're going to say yes even though we don't have

29
00:02:27,919 --> 00:02:34,000
a direct connection between 8 and 9 there's a path from 8 to 3 to 4 to 9. So

30
00:02:34,000 --> 00:02:39,919
that's our problem. To be able to efficiently support these two commands for

31
00:02:39,919 --> 00:02:48,279
given set of objects. Now let's say we add a union 5 0 so that creates a

32
00:02:48,280 --> 00:02:55,479
connection between 5 and 0. 7 and 2 creates a connection between 7 and 2 and 6

33
00:02:55,479 --> 00:03:02,080
and 1 between 6 and 1. So now if we ask are 0 connected to 7 well 1 and 0 we can

34
00:03:02,080 --> 00:03:06,400
do that too and that's a redundant connection and now if we ask is 0 connected to

35
00:03:06,400 --> 00:03:13,360
7 we're going to answer yes. So that's our problem. Interim mix union commands

36
00:03:13,360 --> 00:03:16,800
and connected queries and we need to be able to efficiently

37
00:03:16,800 --> 00:03:22,439
support those commands for a large number of objects. So here's a much bigger

38
00:03:22,439 --> 00:03:27,120
example and you can see that we're going to need a fish and algorithms for this.

39
00:03:27,120 --> 00:03:30,080
First of all you can see we're going to need a computer for this. I would take

40
00:03:30,080 --> 00:03:35,320
quite some time for a human to figure out whether there's a connection. In this

41
00:03:35,320 --> 00:03:41,200
case there is a connection. Now the algorithms that we're looking at today are

42
00:03:41,200 --> 00:03:45,480
not going to actually give the path connecting the two objects. It's just going to

43
00:03:45,479 --> 00:03:49,719
be able to answer the question is there a path. In part two of the course we'll

44
00:03:49,719 --> 00:03:55,280
consider algorithms that explicitly find paths. They're not as efficient as

45
00:03:55,280 --> 00:04:03,759
union fine because they have more work to do. Now applications of this these

46
00:04:03,759 --> 00:04:09,159
algorithms involve objects of all types. These are used for digital photos where

47
00:04:09,159 --> 00:04:13,919
the objects are pixels. They're used for networks where the objects are computers.

48
00:04:13,919 --> 00:04:18,800
Social networks where it's people or computer chips where it's circuit

49
00:04:18,800 --> 00:04:25,560
elements or abstract things like variable names in a program or elements in a

50
00:04:25,560 --> 00:04:31,479
mathematical set or physical things like metallic sites in a composite system.

51
00:04:31,479 --> 00:04:36,519
So all different types of objects. But for programming we're going to

52
00:04:36,519 --> 00:04:41,240
associate each object with a name and we'll just name the objects with the

53
00:04:41,240 --> 00:04:46,960
number of integers from zero to n minus one. That's a very convenient

54
00:04:46,960 --> 00:04:52,800
initial starting point for our programs because we can use integers as an

55
00:04:52,800 --> 00:04:58,480
index into an array then and then quickly access information relevant to each

56
00:04:58,480 --> 00:05:03,800
object. And it also just suppresses a lot of details that are not relevant to

57
00:05:03,800 --> 00:05:09,000
union fine. In fact to make this mapping from an object name to the integers

58
00:05:09,000 --> 00:05:13,839
zero through n minus one is a fine application of a symbol table or searching

59
00:05:13,839 --> 00:05:17,879
algorithm which is one of the things that we'll be studying later in this course.

60
00:05:17,879 --> 00:05:25,040
Algorithms and data structures for solving that problem. Now the connections

61
00:05:25,040 --> 00:05:31,959
well we need a few abstract properties that these connections have to satisfy

62
00:05:31,959 --> 00:05:39,759
and they're all quite natural and intuitive. So we assume that is connected to

63
00:05:39,759 --> 00:05:45,399
is an equivalence relation. That is every object is connected to itself. It's

64
00:05:45,399 --> 00:05:51,039
symmetric. If P's connected to Q then Q's connected to P and it's transitive. If

65
00:05:51,039 --> 00:05:56,919
P's connected to Q and Q's connected to R then P's connected to R. Now these

66
00:05:56,920 --> 00:06:02,840
properties are very intuitive but it's worthwhile to state them explicitly and

67
00:06:02,840 --> 00:06:08,560
make sure that our algorithms maintain them. When we have an equivalence

68
00:06:08,560 --> 00:06:16,520
relation a set of objects and connections divide into subsets called connected

69
00:06:16,520 --> 00:06:21,520
components. Connected component is a maximal set of objects that's mutually

70
00:06:21,520 --> 00:06:26,040
connected. For example in this small example here there's three connected

71
00:06:26,040 --> 00:06:32,760
components. One consisting of just object zero, second one objects one four and

72
00:06:32,760 --> 00:06:38,680
five and third one the other four objects. And these components have the

73
00:06:38,680 --> 00:06:44,800
property that if any two objects in them are connected and there's no object

74
00:06:44,800 --> 00:06:48,879
outside that's connected to those objects. It's connected components. Our

75
00:06:48,879 --> 00:06:54,840
algorithms will gain efficiency by maintaining connected components and using

76
00:06:54,839 --> 00:07:02,599
that knowledge to efficiently answer the query that they're presented with.

77
00:07:02,599 --> 00:07:08,719
Okay so to implement the operations we have the fine query and the union

78
00:07:08,719 --> 00:07:13,719
command. We're going to maintain the connected components. The find is going to

79
00:07:13,719 --> 00:07:17,639
have to check if two objects are in the same component and the union command is

80
00:07:17,639 --> 00:07:22,679
going to have to replace components containing two objects with their union.

81
00:07:22,680 --> 00:07:28,560
So for example if we have these components and we get the command to

82
00:07:28,560 --> 00:07:35,439
connect two and five essentially we need to merge the connected components

83
00:07:35,439 --> 00:07:40,199
containing the one containing two with the one containing five to get a big

84
00:07:40,199 --> 00:07:46,800
connected components and now we have only two connected components. All of that

85
00:07:46,800 --> 00:07:55,199
leads up to in a programming world to specifying a data type which is simply a

86
00:07:55,199 --> 00:07:59,639
specification of the methods that we're going to want to implement in order to

87
00:07:59,639 --> 00:08:08,199
solve this problem. So in our typical Java model what we'll do is create a class

88
00:08:08,199 --> 00:08:14,879
called UF that contains two methods one to implement union the other one to

89
00:08:14,879 --> 00:08:20,839
implement connected which returns a Boolean. The constructor takes as

90
00:08:20,839 --> 00:08:25,959
argument the number of objects so it can build data structures based on that

91
00:08:25,959 --> 00:08:32,720
number of objects. So and we have to bear in mind as we're building our algorithms

92
00:08:32,720 --> 00:08:38,480
that both the number of objects can be huge but also the number of operations.

93
00:08:38,480 --> 00:08:43,679
We can have a very large number of union and connected operations and our

94
00:08:43,679 --> 00:08:50,039
algorithms are going to have to be efficient under those conditions. One of

95
00:08:50,039 --> 00:08:55,799
the practices that we'll follow often in this course is to check our API

96
00:08:55,799 --> 00:09:01,959
design before getting too far into dealing with the problem by building a

97
00:09:01,959 --> 00:09:09,079
client that is going to use the data type that we develop. So for this example

98
00:09:09,080 --> 00:09:18,320
we've got a client that will read information from standard input. First an

99
00:09:18,320 --> 00:09:24,520
integer which is the number of objects that are going to be processed and then a

100
00:09:24,520 --> 00:09:34,840
series of pairs of object names and what the client does is it'll first it'll

101
00:09:34,840 --> 00:09:41,440
read the integer from standard input and create a UF object and then as long

102
00:09:41,440 --> 00:09:46,920
as standard input is not empty it's going to read two integers from the input and

103
00:09:46,920 --> 00:09:52,200
if they're not connected then it'll connect them and print them out. If they are

104
00:09:52,200 --> 00:09:57,560
connected it'll ignore them. So that's our test client and that's a fine test

105
00:09:57,560 --> 00:10:03,920
client to make sure that any implementation does what we expect that it will. So

106
00:10:03,919 --> 00:10:08,839
that's the setup. We've described the operations we want to implement all the

107
00:10:08,839 --> 00:10:14,360
way down to code and we have client code that we're going to have to be able to

108
00:10:14,360 --> 00:10:18,039
service with our implementations.

