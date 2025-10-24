---
title: PrincetonAlgorithms P123Part214 05_classifying Problems
---

1
00:00:00,000 --> 00:00:11,439
Okay, so next we'll look at what the idea of the class is P and N P, a mean in terms of

2
00:00:11,439 --> 00:00:17,519
the actual problems we're looking at solving. We want to classify our problems the same way

3
00:00:17,519 --> 00:00:24,000
it's which scientists classify elements and the key technique that we're going to use

4
00:00:24,000 --> 00:00:33,920
is reduction. So the problem that we're going to start with that is the key to this theory is the

5
00:00:33,920 --> 00:00:40,640
Boolean-Satisfy-Builded problem. And we talked about at the beginning it's not that different

6
00:00:40,640 --> 00:00:46,240
than Gaussian and then systems of linear equations just that everything has to be Boolean variables.

7
00:00:46,240 --> 00:00:56,960
And so given a system of Boolean equations find a solution. And even on its own it's a very

8
00:00:56,960 --> 00:01:05,680
significant problem. It has come it comes up and people solve huge and face huge

9
00:01:05,680 --> 00:01:13,280
satisfiability problems in trying to understand whether trying to prove whether software to verify

10
00:01:13,280 --> 00:01:23,359
software works correctly. Also hardware for design automation people model what's going on with

11
00:01:23,359 --> 00:01:32,960
huge satisfiability problems in solving. It's so basic that it even arises in physics and

12
00:01:32,960 --> 00:01:39,439
scientific studies in the so-called mean field deluded spin glass model. That's a very fundamental

13
00:01:40,319 --> 00:01:49,679
problem that is just about logical reasoning about what's going on in some complex system.

14
00:01:51,439 --> 00:01:57,439
Now the question is so it's a search problem we know of that and what that means is that

15
00:01:59,200 --> 00:02:02,879
if we have a solution we can efficiently check that we have a solution.

16
00:02:02,959 --> 00:02:12,560
But the question is is it in P? Can we find an algorithm that guarantees to find a solution

17
00:02:12,560 --> 00:02:21,519
in polynomial time? Now people solve huge problems but in some sense maybe they're lucky because

18
00:02:21,519 --> 00:02:27,359
the instances that they're trying to solve don't cause the algorithm to run in polynomial time.

19
00:02:28,160 --> 00:02:33,360
But the real question is can we guarantee that we'll get done in a polynomial time?

20
00:02:34,800 --> 00:02:44,240
So well what do we do? Well for satisfiability as I mentioned it's pretty easy to use exhaustive

21
00:02:44,240 --> 00:02:50,720
search. Just try all the truth assignments. And really what that means is they have an algorithm

22
00:02:50,720 --> 00:02:56,720
that if it doesn't find the right truth assignment it might wind up trying all of them. But you might

23
00:02:56,719 --> 00:03:03,520
find one earlier and that's what happens in practice. But the big question is can we do anything that's

24
00:03:03,520 --> 00:03:11,520
really substantially more clever than SAT and the brute force algorithm that is an algorithm run

25
00:03:11,520 --> 00:03:18,960
brute force in the worst case. That's a pretty stringent definition of substantially. But that's the

26
00:03:18,960 --> 00:03:26,320
one that we're talking about. Can we get less than exponential worst case performance?

27
00:03:27,120 --> 00:03:32,480
And some people have worked on this for long enough now that most people agree that

28
00:03:33,920 --> 00:03:40,960
there's no polynomial time algorithm for SAT. To start classifying problems what we're going to do is

29
00:03:42,240 --> 00:03:46,960
kind of adopt that as an assumption or at least we'll classify problems

30
00:03:47,760 --> 00:03:55,120
according to the difficulty of SAT. And what that means is we're going to use reduction from SAT.

31
00:03:55,760 --> 00:04:04,080
So if we reduce SAT to some problem as we talked about in the reduction letter lecture that means if

32
00:04:04,080 --> 00:04:08,719
we could solve that problem efficiently we also could solve SAT efficiently and we're going to

33
00:04:09,680 --> 00:04:16,000
call a problem like that intractable. If we could solve it efficiently we could solve SAT

34
00:04:16,000 --> 00:04:21,759
efficiently. We don't think we can solve SAT efficiently. That problem is intractable. That's our

35
00:04:21,759 --> 00:04:27,519
meaning of the word intractable. All right so now what are we going to do to classify problems?

36
00:04:27,519 --> 00:04:33,279
So the first thing is which search problems in P. So there's no really easy answers for that

37
00:04:33,279 --> 00:04:40,560
except for devising algorithms. But we do have this reduction technique that is going to help us.

38
00:04:41,519 --> 00:04:46,959
It's now we can be a little more general than when we were actually designing algorithms

39
00:04:46,959 --> 00:04:53,519
they were going to use. And we could have the reduction take polynomial amount of time before

40
00:04:53,519 --> 00:04:59,680
we're insisting linear time. And not only that we can take a polynomial number of calls to

41
00:05:01,199 --> 00:05:09,279
the one that we're reducing to. And again all of this is about is that if you have a polynomial

42
00:05:09,279 --> 00:05:15,599
time algorithm for y then the reduction gives you a polynomial time algorithm for x. We're just

43
00:05:15,599 --> 00:05:23,199
trying to have the most general definition that preserves that property. And so the consequences

44
00:05:23,199 --> 00:05:30,719
that if we have a polynomial time reduction from SAT to a given problem y then we can conclude that

45
00:05:31,359 --> 00:05:37,919
y is well it's intractable by our definition. That is it's as difficult as SAT and we think that

46
00:05:37,920 --> 00:05:43,680
there's no polynomial time algorithm for it. So that's the main tool that we're going to start out with

47
00:05:43,680 --> 00:05:54,160
to use for classifying problems. So let's look at an example. So actually you can work with simpler

48
00:05:54,160 --> 00:06:00,240
versions of SAT. Now you can actually reduce any SAT problem to just the form where you have a

49
00:06:00,240 --> 00:06:07,439
bunch of equations using literal certain negation connected with ORIES. So usually we use a simpler

50
00:06:07,439 --> 00:06:12,879
example like that. So given that SAT, given the system of Boolean equations find a solution.

51
00:06:14,160 --> 00:06:21,120
So now we have another problem, ILP, given a system of linear inequalities find a solution.

52
00:06:21,920 --> 00:06:34,959
So what we want to do is characterize SAT as an ILP problem. So that is if we had an efficient

53
00:06:34,959 --> 00:06:42,639
solution to ILP it'd give us a solution to SAT. So let's take a look at this example. So whatever

54
00:06:42,639 --> 00:06:48,799
SAT problem we have we put it in this form. And now we're going to introduce a variable C1

55
00:06:50,000 --> 00:06:59,919
and for every literal in the SAT problem we're going to put C1 greater than or equal to

56
00:07:00,319 --> 00:07:08,879
either the literal if it's not negated or 1 minus the literal if it is negated. So in this case

57
00:07:11,840 --> 00:07:16,960
so we have C1 greater than or equal to 1 minus x1 greater than or equal to x3 like that.

58
00:07:18,480 --> 00:07:24,400
And then we're going to have a fourth inequality that says that it has to be less than or equal to

59
00:07:25,039 --> 00:07:34,239
the sum of those three. So what this construction does is if the equation is satisfied,

60
00:07:34,239 --> 00:07:41,759
if there's somewhere to satisfy this equation then it's going to be C1 equals 1.

61
00:07:43,279 --> 00:07:52,399
So that is if there's a way to make each one of these terms 1 say by setting x1 to 0,

62
00:07:53,359 --> 00:08:02,719
x2 to 1 and x3 to 1 then this thing will all be, those things will all be true.

63
00:08:04,159 --> 00:08:12,560
And then this one also will be true. And all four of these are true if and only if

64
00:08:13,359 --> 00:08:20,000
the equation is satisfied. And we make a little group like that for all four of the SAT equations.

65
00:08:20,959 --> 00:08:29,120
And then we do a similar thing with a variable that's true if and only if all of the C's are true.

66
00:08:29,120 --> 00:08:34,399
So this variable has got to be less than or four of these. And the only way that this thing is

67
00:08:34,399 --> 00:08:40,879
going to be one is if all the equations are satisfied. So this system has a solution.

68
00:08:41,759 --> 00:08:47,600
If and only if there's a SAT solution and from the solution this system you can find the SAT

69
00:08:47,600 --> 00:08:55,519
solution. So that's a reduction from SAT to integer linear programming. Because of this reduction

70
00:08:55,519 --> 00:09:01,360
we feel that we don't we're not going to have a polynomial time solution to integer linear programming.

71
00:09:01,360 --> 00:09:08,159
If we did we'd have a fast solution to SAT. So that's an important piece of knowledge. We

72
00:09:08,159 --> 00:09:13,120
focus on this one hard problem that we know about and that tells us another problem.

73
00:09:13,200 --> 00:09:16,720
Is it is the reduction tells us another problem is at least as hard.

74
00:09:18,399 --> 00:09:24,080
And that by itself is interesting. Intrusting integer linear programming is a very important

75
00:09:24,080 --> 00:09:33,279
computation with lots of applications. But the amazing thing that was shown by Dick Carp

76
00:09:34,240 --> 00:09:45,039
in the 70s is that there are lots and lots of problems that you can reduce satisfiability to.

77
00:09:46,319 --> 00:09:52,879
And actually Carp reduced SAT to the so-called independent set problem and then reduced that

78
00:09:52,879 --> 00:09:57,120
one to ILP. But if you do two reductions it still works.

79
00:09:57,519 --> 00:10:06,399
I could solve ILP quickly. I could solve independent set quickly and then I could use that to solve SAT quickly.

80
00:10:07,440 --> 00:10:14,159
So if you can prove any problem on this set if you can reduce any problem on this set to

81
00:10:15,039 --> 00:10:24,480
your new problem then that's like proving that SAT reduces to it. So if we adopt the idea that SAT

82
00:10:24,480 --> 00:10:33,120
is intractable means all of these problems are intractable. In these are lots of important problems

83
00:10:33,120 --> 00:10:39,840
that people were looking for solutions and couldn't find good solutions to. And what Carp

84
00:10:39,840 --> 00:10:46,080
showed was including traveling salesman problem in so-called Hamilton Path problem which is the

85
00:10:46,639 --> 00:10:51,120
like probably finding the that's the problem of finding a path on the graph that visits all the

86
00:10:51,120 --> 00:11:01,840
vertices. So what Carp showed is that all of these problems are intractable. They're all at least

87
00:11:01,840 --> 00:11:09,120
as difficult to SAT as SAT. If we had a efficient, if we had a polynomial of time solution to any one

88
00:11:09,120 --> 00:11:18,159
of them would have a polynomial of time solution to SAT. That was quite a powerful idea of

89
00:11:19,039 --> 00:11:27,439
using polynomial time reduction to classify problems in this way. In fact it's such a powerful idea

90
00:11:27,439 --> 00:11:37,679
that nowadays there's maybe 6,000 papers per year with reductions from some problem that has

91
00:11:37,679 --> 00:11:46,319
been shown to reduce from SAT to some new problem. And these are important problems in all fields of

92
00:11:46,320 --> 00:11:53,680
a human endeavor. So for example the so-called protein folding problem which in biochemistry

93
00:11:54,560 --> 00:12:01,600
where people are trying to understand what's going on in living organisms has been reduced from

94
00:12:01,600 --> 00:12:06,720
SAT would like to solve that problem. But that would help us understand what's going on in

95
00:12:06,720 --> 00:12:12,800
living organisms much better. But if we had an efficient solution for a guaranteed polynomial

96
00:12:12,799 --> 00:12:19,039
of time solution to that problem would have a guaranteed polynomial of time solution to SAT.

97
00:12:19,039 --> 00:12:27,439
And so we don't think so. Or economics with if you just make the arbitrage problem a little more

98
00:12:27,439 --> 00:12:35,919
complicated and a little more realistic where there's a little cost involved with doing things turns

99
00:12:35,919 --> 00:12:42,799
out to be that you can't have an efficient solution to that one unless because it would imply

100
00:12:42,799 --> 00:12:50,079
an efficient solution to SAT. In many many other examples of voting power and politics,

101
00:12:51,120 --> 00:12:59,519
experimental design and statistics, thousands and thousands of papers per year involving reductions

102
00:12:59,600 --> 00:13:09,279
from SAT. A very very powerful concept that the idea of reducing from SAT. So now we have two ways

103
00:13:09,279 --> 00:13:16,639
to classify problems. We can find a polynomial time algorithm and then we know problems in P

104
00:13:17,600 --> 00:13:26,639
or we can develop a polynomial time reduction from SAT. And that'll prove that at least if you believe

105
00:13:26,639 --> 00:13:31,360
that SAT is difficult you should believe that it'll be difficult to find a solution to your problem.

106
00:13:32,240 --> 00:13:35,199
So that's the first step in classifying problems.

