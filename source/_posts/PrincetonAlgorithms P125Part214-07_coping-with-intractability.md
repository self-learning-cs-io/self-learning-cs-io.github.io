---
title: PrincetonAlgorithms P125Part214 07_coping With Intractability
---

1
00:00:00,000 --> 00:00:09,960
Okay, we're going to finish up by talking a little bit about different approaches to dealing

2
00:00:09,960 --> 00:00:14,560
with meaning to solve intractable problems.

3
00:00:14,560 --> 00:00:21,240
There's actually a lot of different ways to proceed when you run into an intractable problem.

4
00:00:21,240 --> 00:00:23,240
One idea is to exploit it.

5
00:00:23,240 --> 00:00:29,640
In fact, an example of this, a very successful example of this is modern cryptography.

6
00:00:29,640 --> 00:00:38,359
So, and people using the internet for commerce or for interaction through digital signatures

7
00:00:38,359 --> 00:00:48,480
and other mechanisms are absolutely relying on modern cryptography for security and privacy.

8
00:00:48,480 --> 00:00:53,120
And that's all based on the RSA cryptosystem or much of it.

9
00:00:53,119 --> 00:01:03,079
And it's based on the idea that multiplying to in-bit integers is relatively easy as brute force

10
00:01:03,079 --> 00:01:07,679
multiplication algorithm to get the done in quadratic time in this faster way.

11
00:01:07,679 --> 00:01:10,519
So, that's polynomial time.

12
00:01:10,519 --> 00:01:13,679
So, in order to encrypt something, you need to multiply things.

13
00:01:13,679 --> 00:01:17,120
When in order to break something, you would need to factor things.

14
00:01:17,120 --> 00:01:20,599
So, that's exploiting intractability.

15
00:01:20,599 --> 00:01:24,000
Nobody knows a good way to factor.

16
00:01:24,000 --> 00:01:26,559
The factor is not in peak complete, by the way.

17
00:01:26,559 --> 00:01:28,359
Not known to be incomplete.

18
00:01:28,359 --> 00:01:36,239
So, it's not quite as hard as other problems, but still nobody knows a fast way.

19
00:01:36,239 --> 00:01:45,879
So, this is an example of exploiting suspected problem that's suspected to be intractable.

20
00:01:46,280 --> 00:01:50,679
In fact, there's other ways to make money.

21
00:01:50,679 --> 00:02:00,879
Revesht Shavir and Aylman put up some challenges and go ahead and factor this number towards $30,000.

22
00:02:00,879 --> 00:02:06,319
Some of these things have been prices have already been claimed, but that's maybe easier.

23
00:02:06,319 --> 00:02:10,599
I had to go up to this and after the million.

24
00:02:10,599 --> 00:02:21,159
And actually, Revesht Shavir and Aylman were just not just, but they were professors at MIT when they came up with this.

25
00:02:21,159 --> 00:02:36,240
And they realized that the important commercial potential of this in actually created a company based on the difficulty of factoring that sold for $2.1 billion.

26
00:02:36,240 --> 00:02:41,240
Not that long ago, in a some basis for internet commerce.

27
00:02:41,240 --> 00:02:52,240
So, these possibilities for making a lot of money out of understanding the difficulty of computation are not imaginary.

28
00:02:52,240 --> 00:02:56,240
They're quite real.

29
00:02:56,240 --> 00:03:03,240
So, I talked briefly about the complexity of factor.

30
00:03:03,240 --> 00:03:07,240
That's another problem like LP.

31
00:03:07,240 --> 00:03:13,240
It's current status is what LP was in the 70s.

32
00:03:13,240 --> 00:03:16,240
We're using it, a lot of people were doing it.

33
00:03:16,240 --> 00:03:20,240
We knew that the worst case of simplex was exponential.

34
00:03:20,240 --> 00:03:25,240
I would like to classify like the no-fis of polym at the time algorithm, but nobody knew one.

35
00:03:25,240 --> 00:03:32,240
And then the big surprise for LP was that catching came up with a polym at the time algorithm.

36
00:03:32,240 --> 00:03:37,240
And then people went to work for factor.

37
00:03:37,240 --> 00:03:40,240
We're kind of in the same situation.

38
00:03:40,240 --> 00:03:45,240
It's in NP, as we saw, it's just a search problem.

39
00:03:45,240 --> 00:03:50,240
But it's not known or believed to be either NP or NP complete.

40
00:03:50,240 --> 00:03:53,240
But again, who knows?

41
00:03:53,240 --> 00:03:57,240
So, what if it turns out that P equals NP?

42
00:03:57,240 --> 00:04:00,240
So, that would mean that factors NP.

43
00:04:00,240 --> 00:04:04,240
And that would not just the math.

44
00:04:04,240 --> 00:04:10,240
That would mean there would be an easy way to break the RSA-cryptal system, which is NYD use.

45
00:04:10,240 --> 00:04:15,240
People could break codes by just by factoring in that.

46
00:04:15,240 --> 00:04:19,240
That would not be a good thing for the modern economy.

47
00:04:19,240 --> 00:04:27,240
Actually, something that attracted a lot of attention, although it's almost 20 years ago now,

48
00:04:27,240 --> 00:04:39,240
was a result by Peter Shore that said that there's a device, not quite a real device called a quantum computer.

49
00:04:40,240 --> 00:04:48,240
At least one that you could imagine building, that solves factoring in a polynomial time.

50
00:04:48,240 --> 00:04:55,240
So, that raises the question of, do we still believe the extended church-turning thesis?

51
00:04:55,240 --> 00:05:06,240
There are plenty of people that are not so sure and are working hard on trying to build devices that might have a big impact on this kind of theory.

52
00:05:07,240 --> 00:05:17,240
Well, actually, what we create, and has created a new theory based on how difficult is it to do things with these sorts of devices.

53
00:05:17,240 --> 00:05:24,240
Okay, but in general, suppose you have an intractable problem, what are you going to do to cope with it?

54
00:05:24,240 --> 00:05:29,240
Well, there's a number of things that people have done really successfully.

55
00:05:30,240 --> 00:05:33,240
So, remember what it means to be intractable.

56
00:05:33,240 --> 00:05:45,240
So, problems intractable, if in the sense that we don't know a polynomial time problem that's guaranteed to solve any instance.

57
00:05:45,240 --> 00:05:53,240
Now, so maybe you can give up on one of the three key features of that statement.

58
00:05:54,240 --> 00:05:58,240
Maybe we don't care if we can solve every possible instance.

59
00:05:58,240 --> 00:06:04,240
Maybe it's only the instances that are going to arrive in the real world, arise in the real world that matter.

60
00:06:06,240 --> 00:06:13,240
So, or maybe you can even simplify the problem, and that's the one that you really need to solve.

61
00:06:13,240 --> 00:06:22,240
So, for example, if you restrict satisfiability to have at most two literals per equation, you can solve in linear time.

62
00:06:22,240 --> 00:06:31,240
Or even if you just insist that there be at most one of the literals per equation be not negated.

63
00:06:31,240 --> 00:06:35,240
That's called a horn set with linear time algorithm for that.

64
00:06:35,240 --> 00:06:42,240
So, maybe your problem is you're trying to solve too hard a problem, and you can come up with a more special case of the problem.

65
00:06:42,240 --> 00:06:45,240
It's actually the one you want to solve that you could solve.

66
00:06:45,240 --> 00:06:49,240
So, it's definitely one way to cope with interactability.

67
00:06:50,240 --> 00:06:54,240
Another thing is optimality.

68
00:06:54,240 --> 00:07:11,240
We've been talking about search problems, but this is more a statement about optimization problems, or looking for the best solution, or looking for approximate solutions.

69
00:07:11,240 --> 00:07:16,240
Where you take away the guarantee that the solution is perfect in some way.

70
00:07:16,240 --> 00:07:26,240
So, for example, the Travelling Salesperson Problem, people can find ways to get tours that are close to the best possible tour, but maybe not the best.

71
00:07:26,240 --> 00:07:34,240
In this many, many other examples of this, where people are looking for good solutions without trying to guarantee that they're optimal.

72
00:07:35,240 --> 00:07:43,240
Maybe those solutions are very close to optimal, or at least close enough that can use the solution and move on.

73
00:07:43,240 --> 00:07:48,240
If you understand the quality of the solution that you have, that might be good enough.

74
00:07:48,240 --> 00:07:53,240
And again, the idea of approximation algorithm where you really can prove what the quality is.

75
00:07:54,240 --> 00:08:03,240
So, for example, there's a max 3 set that guarantees to satisfy 7, 8s of the clauses.

76
00:08:03,240 --> 00:08:12,240
And actually, these algorithms, they're really coming at a fine line between what's tractable and intractable.

77
00:08:13,240 --> 00:08:20,240
So, for example, if you want to do 7, 8s plus anything, then it means that it's equal to mp.

78
00:08:20,240 --> 00:08:23,240
If you can do that in polynomial time, it's equal to mp.

79
00:08:23,240 --> 00:08:27,240
There's lots and lots of amazing results of this sort out there.

80
00:08:27,240 --> 00:08:36,240
But anyway, in practice, relaxing the condition that you find the perfect solution sometimes can get a long way in practice.

81
00:08:37,240 --> 00:08:41,240
And then the other thing is guaranteed polynomial time.

82
00:08:41,240 --> 00:08:47,240
We were talking about worst case behavior, but there's solutions out there.

83
00:08:47,240 --> 00:08:56,240
For example, there's a fat solver that was done here at Princeton that can solve 10,000 variables, fat instances.

84
00:08:56,240 --> 00:09:05,240
Or as I mentioned, there's solvers out there for integer linear programming that will solve huge instances of real-world problems.

85
00:09:06,240 --> 00:09:12,240
Worst case behavior may not be observed in the real-world, might even be hard to find real-world problems.

86
00:09:12,240 --> 00:09:21,240
This is definitely a lot of room here to find solutions that might be efficient for the class of problems that you want to solve.

87
00:09:21,240 --> 00:09:30,240
And I just want to finish up with one of the most famous np-complete problems, which is a so-called Hamilton-Path problem.

88
00:09:31,240 --> 00:09:34,240
And so that's given a graph.

89
00:09:34,240 --> 00:09:39,240
You want to find a path that visits every vertex exactly once.

90
00:09:41,240 --> 00:09:44,240
In simple path, so I can't reuse any edge.

91
00:09:44,240 --> 00:09:49,240
So that's a solution to the Hamilton-Path problem for this graph.

92
00:09:49,240 --> 00:09:56,240
Another way to characterize it is the longest path problem, longer simple path problem, in a graph.

93
00:09:57,240 --> 00:10:03,240
If you have one of the very edge exactly once, that's not difficult.

94
00:10:03,240 --> 00:10:08,240
It's actually in the book, but Hamilton-Path is np-complete.

95
00:10:08,240 --> 00:10:14,240
So that's a natural problem that's np-complete.

96
00:10:14,240 --> 00:10:25,240
And actually, this is np-complete, but here's a really simple exponential time algorithm for computing the Hamilton-Path.

97
00:10:26,240 --> 00:10:40,240
It's just our depth-first search algorithm where we mark nodes and recursively go through all the vertices adjacent to the current vertex.

98
00:10:40,240 --> 00:10:49,240
And if they're not marked, go ahead and visit them recursively, marking all the nodes that we see.

99
00:10:50,240 --> 00:11:03,240
The only difference from the depth-first search is this thing here where when we're done with our recursive call-on-a-node, we unmark it.

100
00:11:03,240 --> 00:11:10,240
And what that does is make this code try all possible paths, and there's an exponential number of paths.

101
00:11:10,240 --> 00:11:17,240
So I find program for doing it for small graphs, but it's going to take exponential time for a big graph.

102
00:11:17,240 --> 00:11:20,240
But the longest path problem is np-complete.

103
00:11:20,240 --> 00:11:31,240
We're going to finish up with a song that was composed by a John Hopkins students one time when he was having trouble thinking about this idea.

104
00:11:47,240 --> 00:12:02,240
There would still be papers left to write. I have a weakness. I look addicted to completeness and I keep searching for the longest path.

105
00:12:02,240 --> 00:12:13,240
The algorithm I would like to see is a polymiumeal decree.

106
00:12:13,240 --> 00:12:24,240
But it's illusive. Nobody has found conclusive evidence that we can find the longest path.

107
00:12:24,240 --> 00:12:35,240
I have been hard working for so long. I swear it's right and he marks it wrong.

108
00:12:35,240 --> 00:12:40,240
I'm not some how I'll feel sorry when it's done.

109
00:12:40,240 --> 00:12:50,240
GPA 2.1 is more than a hope for Gary Johnson, carp and other men.

110
00:12:50,240 --> 00:12:56,240
And women try to make it order and again.

111
00:12:56,240 --> 00:13:07,240
I am mad. If I spend my life in grad school forever following the longest path.

112
00:13:07,240 --> 00:13:30,240
Oh, find the longest path.

113
00:13:31,240 --> 00:13:45,240
That's a fine sentiment in this class on algorithms. I hope that all of you are out there or inspired to face the computational challenges of the future with the algorithms and concepts that you've learned in this class.

114
00:13:45,240 --> 00:13:48,240
That's all. Keep searching.

