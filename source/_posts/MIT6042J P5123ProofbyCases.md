---
title: MIT6042J P5123ProofbyCases
---

1
00:00:00,000 --> 00:00:12,080
Another basic proof technique is called proof by cases, in which we prove something by breaking

2
00:00:12,080 --> 00:00:18,519
it up into pieces that are easy to prove, but that together cover all possibilities.

3
00:00:18,519 --> 00:00:22,120
Let's look at an explicit simple example from computer science.

4
00:00:22,120 --> 00:00:24,960
Here's a Java logical expression.

5
00:00:24,960 --> 00:00:34,079
The way to decipher this is that the double vertical bar means OR in Java, and the double

6
00:00:34,079 --> 00:00:36,399
ampersand means AND in Java.

7
00:00:36,399 --> 00:00:45,240
So this is a conditional test, an if test that is the guard on a bunch of code to be executed

8
00:00:45,240 --> 00:00:48,000
if this test comes out to be true.

9
00:00:48,000 --> 00:00:49,000
Let's read the test.

10
00:00:49,000 --> 00:00:54,920
If x is greater than 0, or if x is less than or equal to 0 and y is greater than 100,

11
00:00:54,920 --> 00:01:01,160
go ahead and do the code that's in there indicated by the vertical dots.

12
00:01:01,160 --> 00:01:06,280
We're going to assume here that x and y are variables there declared to be of type,

13
00:01:06,280 --> 00:01:09,640
float at a point, or real number, or integers for that matter.

14
00:01:09,640 --> 00:01:15,920
OK, now what I claim is that this code can be improved, and if it's rewritten in the following

15
00:01:15,920 --> 00:01:24,480
way, namely, if x is greater than 0 or y is greater than 100.

16
00:01:24,480 --> 00:01:30,320
So the claim is that these two hunks of code, if I just replace this test, which has three

17
00:01:30,320 --> 00:01:39,439
components that require an extra step to evaluate in some cases, by this code, the programs

18
00:01:39,439 --> 00:01:43,540
are going to behave exactly the same way, and therefore it's just more efficient, and

19
00:01:43,540 --> 00:01:48,240
easier to understand once one's one step faster if I replace this longer expression by this

20
00:01:48,240 --> 00:01:49,240
shorter expression.

21
00:01:49,719 --> 00:01:54,919
Now how do I argue that these two pieces of code are going to behave in exactly the same

22
00:01:54,919 --> 00:01:57,839
way, or come up with the same final output?

23
00:01:57,839 --> 00:02:00,879
They won't behave exactly the same, because one will be faster than the other, but they're

24
00:02:00,879 --> 00:02:02,959
going to yield the same results.

25
00:02:02,959 --> 00:02:07,319
OK, let's consider how these two behave in two cases.

26
00:02:07,319 --> 00:02:12,879
The first case will be that the number x really is positive that it's greater than 0.

27
00:02:12,879 --> 00:02:14,280
What happens then?

28
00:02:14,280 --> 00:02:20,879
Well, the first test above in the OR comes out to be true, and that means that the whole

29
00:02:20,879 --> 00:02:24,840
OR expression is true, because when you have a true OR anything at all, it comes out

30
00:02:24,840 --> 00:02:29,479
to be true, and you go ahead and execute the code that follows.

31
00:02:29,479 --> 00:02:35,080
Likewise, the second expression starts with x greater than 0 OR, so it comes out to

32
00:02:35,080 --> 00:02:36,240
be true.

33
00:02:36,240 --> 00:02:41,159
So in this case, if x is greater than 0, both conditional expressions will allow the

34
00:02:41,159 --> 00:02:46,599
code that follows them to be executed, and because they both evaluate to true.

35
00:02:46,599 --> 00:02:51,519
OK, the next case is that x is less than or equal to 0.

36
00:02:51,519 --> 00:02:53,719
Let's see what happens then.

37
00:02:53,719 --> 00:02:59,639
Well, in the top expression, since x is less than or equal to 0, that first expression

38
00:02:59,639 --> 00:03:05,800
x greater than 0, whenever it's evaluated returns false, and the same thing in the second

39
00:03:05,800 --> 00:03:10,120
expression, the initial test x greater than 0 returns false.

40
00:03:10,120 --> 00:03:15,599
Now one of the things that the way OR works is that if you have an OR of a bunch of things,

41
00:03:15,599 --> 00:03:22,400
if the first thing is false, you ignore it and just proceed to the other things to see

42
00:03:22,400 --> 00:03:23,960
how they come out.

43
00:03:23,960 --> 00:03:29,040
So what that means is that in both of these expressions, since the first test in the sequence

44
00:03:29,040 --> 00:03:34,240
of things that are being OR'd together came out to be false, I can just ignore the code

45
00:03:34,240 --> 00:03:35,240
is going to behave.

46
00:03:35,240 --> 00:03:41,360
So after the false was detected, it's just going to behave in the same way that the rest

47
00:03:41,360 --> 00:03:44,200
of the test says to behave.

48
00:03:44,200 --> 00:03:50,640
Well, in the top case, the expression to be checked now is that x is less than or equal

49
00:03:50,640 --> 00:03:55,080
to 0, and y is greater than 100.

50
00:03:55,080 --> 00:03:56,080
But what do we know?

51
00:03:56,080 --> 00:03:59,560
Well, x is greater than or equal to 0, less than or equal to 0 in this case.

52
00:03:59,560 --> 00:04:05,200
So this test comes out to be true, and we have something of the form true and something

53
00:04:05,199 --> 00:04:06,519
of the same or other.

54
00:04:06,519 --> 00:04:11,919
That means that the net outcome of this expression depends entirely on something of other.

55
00:04:11,919 --> 00:04:16,639
That is, it depends entirely on whether y is greater than 0, because the x is less than

56
00:04:16,639 --> 00:04:17,920
or equal to 0.

57
00:04:17,920 --> 00:04:19,879
And so this expression can be simplified.

58
00:04:19,879 --> 00:04:25,159
It's going to behave exactly according to whether or not y is greater than 100.

59
00:04:25,159 --> 00:04:26,639
So look what I've just done.

60
00:04:26,639 --> 00:04:33,839
I've argued that in this case, both of these test cards act like y is the test y greater

61
00:04:33,839 --> 00:04:38,879
than 100, which is they behave the same in this case as well.

62
00:04:38,879 --> 00:04:46,959
So what I just figured out was that in both cases, these two expressions yield the same

63
00:04:46,959 --> 00:04:53,839
result, which means, and the only possible cases are that x is less than 0 or the x is

64
00:04:53,839 --> 00:04:57,159
greater than 0 or less than or equal to 0.

65
00:04:57,159 --> 00:04:59,039
So in all cases, they're the same.

66
00:04:59,039 --> 00:05:00,039
And we're done.

67
00:05:00,039 --> 00:05:03,759
That's why it's safe to replace the upper complicated expression.

68
00:05:03,759 --> 00:05:07,439
By the lower less complicated expression.

69
00:05:07,439 --> 00:05:11,120
So in general, as I said, reasoning by cases breaks complicated problems.

70
00:05:11,120 --> 00:05:14,120
It's easier subproblems, which is what we just saw there.

71
00:05:14,120 --> 00:05:18,599
It wouldn't be clear how to prove that these two things were equivalent, but I chose those

72
00:05:18,599 --> 00:05:24,599
cases, and it made each case easy to figure out that the two things were the same.

73
00:05:24,599 --> 00:05:30,399
Now the truth is that there are some philosophers who worry about reasoning by cases for kind

74
00:05:30,399 --> 00:05:32,879
of subtle reasons.

75
00:05:32,879 --> 00:05:36,279
They're called intuitionists, and here's what bothers them.

76
00:05:36,279 --> 00:05:38,120
Let me illustrate it.

77
00:05:38,120 --> 00:05:47,019
There's a million dollar Clay Institute question, one of a dozen or so questions that are

78
00:05:47,019 --> 00:05:51,479
considered to be the major open problems in various disciplines of mathematics.

79
00:05:51,479 --> 00:05:56,399
And one of the disciplines of mathematics is complexity theory in computer science,

80
00:05:56,399 --> 00:05:58,159
computational complexity theory.

81
00:05:58,160 --> 00:06:00,960
This question is known as the P equals NP question.

82
00:06:00,960 --> 00:06:06,360
And we're actually going to talk about a fair amount in just the coming few lectures.

83
00:06:06,360 --> 00:06:08,120
But for now, it doesn't matter what it means.

84
00:06:08,120 --> 00:06:09,480
Well, I'll tell you what it means.

85
00:06:09,480 --> 00:06:12,080
P stands for polynomial time.

86
00:06:12,080 --> 00:06:16,200
And NP stands for non-deterministic polynomial time.

87
00:06:16,200 --> 00:06:21,760
I'm not going to define non-deterministic polynomial time, but it would be momentous if those

88
00:06:21,760 --> 00:06:24,000
two things were equal.

89
00:06:24,000 --> 00:06:28,600
And everyone expects that they're not equal, but no one knows how to prove that.

90
00:06:28,600 --> 00:06:33,720
So the million dollar question is, is P equal to NP?

91
00:06:33,720 --> 00:06:35,879
Yes or no?

92
00:06:35,879 --> 00:06:41,399
And you get a million dollars for settling this question.

93
00:06:41,399 --> 00:06:47,759
Now I claim that in fact, the answer to this question is on my lecture table.

94
00:06:47,759 --> 00:06:52,279
And I will show it to you in class tomorrow.

