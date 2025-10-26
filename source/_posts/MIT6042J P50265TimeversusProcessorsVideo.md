---
title: MIT6042J P50265TimeversusProcessorsVideo
---

1
00:00:00,000 --> 00:00:07,000
The example of scheduling courses in terms is really a special case of a general problem

2
00:00:07,000 --> 00:00:13,000
that you can probably see of scheduling a bunch of tasks or jobs under constraints of which

3
00:00:13,000 --> 00:00:19,000
ones have to be done before other ones, which is a topic that comes up actually in lots of applications,

4
00:00:19,000 --> 00:00:25,000
but you can see applications in computer science where you might have a complex calculation,

5
00:00:25,000 --> 00:00:29,000
pieces of which could be done in parallel and other parts had to be done in order,

6
00:00:29,000 --> 00:00:33,000
and later results depended on the results of an earlier computation.

7
00:00:33,000 --> 00:00:36,000
It leads us to the general discussion of parallel scheduling,

8
00:00:36,000 --> 00:00:42,000
and we've already worked out some theory of that really, just from the example.

9
00:00:42,000 --> 00:00:46,000
Namely, if we look at the minimum number of terms to graduate,

10
00:00:46,000 --> 00:00:51,000
this corresponds to the minimum amount of number of stages,

11
00:00:51,000 --> 00:00:55,000
or the minimum amount of time that it takes to process a bunch of tasks,

12
00:00:55,000 --> 00:01:02,000
assuming that you can do tasks in parallel and as many in parallel as you need to,

13
00:01:02,000 --> 00:01:05,000
that there's no limit on the amount of parallelism allowed.

14
00:01:05,000 --> 00:01:12,000
In that case, what we can say is that the minimum parallel time for a bunch of constrained tasks

15
00:01:12,000 --> 00:01:17,000
is simply the maximum chain size in the constraint graph.

16
00:01:17,000 --> 00:01:22,000
We saw that example with the course prerequisites where we had five,

17
00:01:23,000 --> 00:01:25,000
and in general, this is the theorem.

18
00:01:25,000 --> 00:01:31,000
Minimum parallel time is exactly equal to maximum chain size for chains in the graph

19
00:01:31,000 --> 00:01:35,000
that constrains the order in which tasks can be completed.

20
00:01:35,000 --> 00:01:38,000
Now, what about the maximum term load?

21
00:01:38,000 --> 00:01:47,000
Well, that corresponds to the number of processors you need to be doing tasks in parallel.

22
00:01:48,000 --> 00:01:54,000
For the course scheduling example, it means how many subjects can you take in one term,

23
00:01:54,000 --> 00:02:04,000
but if you were doing computations, how many separate CPUs would you need in order to be able to fully utilize the parallelism

24
00:02:04,000 --> 00:02:10,000
to as much in parallel as you possibly could, and a bound on the number of processors that are needed

25
00:02:10,000 --> 00:02:14,000
for minimum time is simply the maximum anti-chain size,

26
00:02:15,000 --> 00:02:21,000
which in the example from the previous segment on course scheduling turns out there were five courses you could take in one term,

27
00:02:21,000 --> 00:02:25,000
the second term, and that was, in fact, the maximum anti-chain size.

28
00:02:25,000 --> 00:02:29,000
So that's an upper bound on the number of processes that you need,

29
00:02:29,000 --> 00:02:32,000
the number of processors that you need to achieve minimum time,

30
00:02:32,000 --> 00:02:39,000
but in fact, it's a course upper bound because although the number of processors needed to achieve minimum parallel time

31
00:02:40,000 --> 00:02:42,000
is at most the maximum anti-chain size.

32
00:02:42,000 --> 00:02:46,000
In fact, in the previous example, it turns out you could get away with three processes.

33
00:02:46,000 --> 00:02:54,000
It was possible to schedule the subjects, so you only took three courses a term and still finished in minimum time.

34
00:02:54,000 --> 00:02:56,000
So can you do better than three subjects?

35
00:02:56,000 --> 00:03:01,000
Well, there's a trivial argument that says no, you can't because in that previous example,

36
00:03:01,000 --> 00:03:04,000
we had 13 subjects to schedule.

37
00:03:04,000 --> 00:03:09,000
The maximum chain size was five, so it was going to take at least five terms.

38
00:03:09,000 --> 00:03:14,000
So that means you have to distribute these 13 subjects among five terms.

39
00:03:14,000 --> 00:03:22,000
There has to be some term that has at least the average number of subjects, namely 13 divided by five.

40
00:03:22,000 --> 00:03:28,000
So that means there has to be a term in which you're taking 13 divided by five subjects.

41
00:03:28,000 --> 00:03:31,000
Of course, you round up because it has to be an integer.

42
00:03:31,000 --> 00:03:40,000
So the minimum number of terms to finish and graduate finishing these 13 subjects in five terms is three,

43
00:03:40,000 --> 00:03:43,000
because 13 divided by five rounded up is three.

44
00:03:43,000 --> 00:03:47,000
This is a general phenomenon that applies.

45
00:03:47,000 --> 00:03:56,000
What we can say is that if you have a dag with n vertices and the maximum chain size is C,

46
00:03:56,000 --> 00:03:59,000
so that's how deep it can be at most.

47
00:03:59,000 --> 00:04:06,000
And the maximum anti-chain size is A, that's the largest number of things that you could ever possibly do in parallel.

48
00:04:06,000 --> 00:04:13,000
Then clearly the total number of vertices is C times A at most.

49
00:04:13,000 --> 00:04:25,000
So the total number of tasks that you can do where you are going to finish in C steps using at most A processors is bounded by C times A.

50
00:04:25,000 --> 00:04:32,000
So what that tells you is that you can't both have the anti-chain size and the chain size be too small,

51
00:04:32,000 --> 00:04:34,000
because their product has to be at least n.

52
00:04:34,000 --> 00:04:39,000
That can be rephrased as a little lemma that is credited to a guy named Dilworth.

53
00:04:39,000 --> 00:04:44,000
Dilworth is actually famous for Dilworth's theorem of which this Dilworth's lemma is a special case,

54
00:04:44,000 --> 00:04:46,000
but we don't need the general theorem.

55
00:04:46,000 --> 00:04:52,000
Dilworth's lemma says that if you have an n vertex dag, then for any number T,

56
00:04:52,000 --> 00:04:59,000
it either has a chain of size bigger than T, or it has an anti-chain of size greater than or equal to n over T,

57
00:04:59,000 --> 00:05:05,000
and we proved that this on the previous slide, the product of these two things has to be at least n,

58
00:05:05,000 --> 00:05:10,000
and the general case is T times n over T is greater than or equal to n.

59
00:05:10,000 --> 00:05:13,000
And this holds for all T between 1 and n.

60
00:05:13,000 --> 00:05:16,000
Well, let's think of a simple application of that.

61
00:05:16,000 --> 00:05:23,000
I choose the T that balances anti-chain size from a chain size, then I choose T to be the square root of n.

62
00:05:23,000 --> 00:05:28,000
So over here I have square root of n, and here I have n divided by the square root of n, which is also square root of n.

63
00:05:28,000 --> 00:05:37,000
And what we can conclude is that every n vertex dag has either a chain of size at least a square root of n,

64
00:05:37,000 --> 00:05:40,000
or an anti-chain of size at least square root of n.

65
00:05:40,000 --> 00:05:47,000
This turns out to actually have a few applications, but we're just going to look at a fun application of this remark

66
00:05:47,000 --> 00:05:52,000
that you have to have a chain or an anti-chain of size at least square root of n.

67
00:05:52,000 --> 00:06:00,000
You might have only one of these, you might have both, but one or the other has to be at least as big a square root of n.

68
00:06:00,000 --> 00:06:04,000
Let's think of a new dag that I'm going to construct as follows.

69
00:06:04,000 --> 00:06:13,000
I'm going to draw an edge between students in the class, and I'm going to think of one student as having a direct edge to another student,

70
00:06:13,000 --> 00:06:21,000
if the first student is both shorter and younger, actually, meaning no taller than and no older than the other.

71
00:06:21,000 --> 00:06:27,000
Let's just say shorter, meaning shorter, or possibly the same height, younger, or possibly the same edge.

72
00:06:27,000 --> 00:06:34,000
The rule is that if I think of a student as being represented by their shortness s and their age a,

73
00:06:34,000 --> 00:06:44,000
then a student with height s1 and age a1 has a direct arrow to another student with height s2 and age a2,

74
00:06:44,000 --> 00:06:51,000
providing that the first pair is less than or equal to the second pair in both coordinates.

75
00:06:51,000 --> 00:06:56,000
s1 is less than or equal to s2, and a1 is less than or equal to a2.

76
00:06:56,000 --> 00:07:03,000
Now we don't want ties here because that would break the dag property if I have two students with exactly the same age and height.

77
00:07:03,000 --> 00:07:12,000
So let's assume that we are measuring age and microseconds and height in micrometers, and with that kind of fineness, the likelihood of a tie is pretty low.

78
00:07:12,000 --> 00:07:15,000
So then it becomes a dag again.

79
00:07:15,000 --> 00:07:27,000
So this is the definition of taking a dag built out of pairs of, there's a pure dag for height and there's a pure dag for age,

80
00:07:27,000 --> 00:07:33,000
and I combine them into pairs and I get a new dag by looking at how the coordinates behave together.

81
00:07:33,000 --> 00:07:44,000
This is called the product graph. It's a general construction that comes up, and we will talk a little bit more about when we re-examine dag's in the context of the language of relation.

82
00:07:44,000 --> 00:07:49,000
So this is the product graph.

83
00:07:49,000 --> 00:08:05,000
According to Dilworth's lemma in a class like ours of 141 students, it means that we're going to have a chain or an anti-chain in this product dag of size, square root of 141 rounded up or 12.

84
00:08:06,000 --> 00:08:17,000
So what would, according to Dilworth's lemma in this particular age height graph, what does it mean for this to be an anti-chain?

85
00:08:17,000 --> 00:08:26,000
Suppose I take a bunch of students and I line them up in order of size with the bigger, the tallest on the left and the shortest on the right.

86
00:08:26,000 --> 00:08:35,000
If this is going to be an anti-chain, it means that they have to be getting older as they get shorter.

87
00:08:35,000 --> 00:08:45,000
Because if I ever had a case where somebody to the right was both shorter and younger than somebody to the left, it wouldn't be an anti-chain because they'd be comparable.

88
00:08:45,000 --> 00:08:55,000
So this is an anti-chain, according to Dilworth's lemma, if you sort the students by height, they have to be getting older as they get shorter.

89
00:08:55,000 --> 00:09:01,000
If it was a chain, they would be getting younger as they got shorter.

90
00:09:01,000 --> 00:09:08,000
But the more interesting one is when they get is the anti-chain in this height birthday example.

91
00:09:08,000 --> 00:09:15,000
So we should be looking at, well, will either have a chain or an anti-chain in this class, according to this product dag.

92
00:09:15,000 --> 00:09:22,000
As a matter of fact, we really had an anti-chain that here's a quick list of a dozen students.

93
00:09:22,000 --> 00:09:38,000
And indeed, if you look at the birthdays, there's somebody who's six-one was born in August, 94, and then somebody who was born in April, 94, and is six-o, all the way down to somebody who was born in 1991, and who's five feet tall.

94
00:09:38,000 --> 00:09:44,000
So we looked out, we could have only had the chain, but we actually had the anti-chain in this case.

