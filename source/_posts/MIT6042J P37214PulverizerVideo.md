---
title: MIT6042J P37214PulverizerVideo
---

1
00:00:00,000 --> 00:00:06,200
Let's continue our examination of GCDs and linear combinations and Euclidean algorithm.

2
00:00:06,200 --> 00:00:11,359
By examining what's often called the extended Euclidean algorithm, it's a good name for it.

3
00:00:11,359 --> 00:00:16,160
Its ancient name, dating back to ancient India, is the polvarizer.

4
00:00:16,160 --> 00:00:18,839
And we will see what that does in a moment.

5
00:00:18,839 --> 00:00:25,519
So the theorem that is the combination that we're aiming for is that the GCD of two numbers

6
00:00:25,519 --> 00:00:27,920
is an integer linear combination of the two numbers.

7
00:00:27,920 --> 00:00:33,880
That is the GCD of A and B is simply SA plus TB where S and T are integers.

8
00:00:33,880 --> 00:00:38,840
And what the polvarizer enables us to do is given A and B, we can find S and T. In fact,

9
00:00:38,840 --> 00:00:43,520
we can find S and T virtually as efficiently as the Euclidean algorithm.

10
00:00:43,520 --> 00:00:49,200
It's just by performing Euclidean algorithm and keeping track of some additional side information

11
00:00:49,200 --> 00:00:51,160
as it progresses.

12
00:00:51,160 --> 00:00:55,760
Now, the corollary of this fact is that we now know that the, if we want to characterize

13
00:00:55,759 --> 00:01:02,000
the linear combinations of A and B, they're precisely the multiples of the GCD of A and B.

14
00:01:02,000 --> 00:01:08,959
That's because we know that every factor of both A and B divides any linear combination

15
00:01:08,959 --> 00:01:14,840
of A and B and therefore the GCD, which is a factor of A and B, divides any linear combination.

16
00:01:14,840 --> 00:01:19,680
Once we know, so that means that any linear, any linear combination is a multiple of the

17
00:01:19,680 --> 00:01:25,120
GCD of A and B. Of course, once we know the GCD of A and B is itself a linear combination,

18
00:01:25,120 --> 00:01:32,200
it means that you've got all of the linear combinations by taking multiples of the GCD.

19
00:01:32,200 --> 00:01:33,200
Okay.

20
00:01:33,200 --> 00:01:36,040
How do we get S and T?

21
00:01:36,040 --> 00:01:41,480
Well, the basic idea is that we're going to find these coefficients by applying the Euclidean

22
00:01:41,480 --> 00:01:48,439
algorithm and as we go, we're going to be calculating a coefficient and eventually when we're

23
00:01:48,439 --> 00:01:52,880
all finished, we'll wind up with the S and T. Specifically, let's remember the Euclidean

24
00:01:52,879 --> 00:01:59,519
algorithm starts off with A and B and then it has two registers or numbers x and y that

25
00:01:59,519 --> 00:02:05,799
it keeps updating and the invariant is that the GCD of the x and y that are being continually

26
00:02:05,799 --> 00:02:12,000
updated by the Euclidean algorithm is stays the same as always the GCD of A and B. So what

27
00:02:12,000 --> 00:02:18,879
we're going to do is just keep track of coefficients called them C, D, E, and F such that the x,

28
00:02:18,879 --> 00:02:24,599
whatever we're up to, we know how to express this linear combination of A and B and the y

29
00:02:24,599 --> 00:02:30,479
that whatever y we're up to, we can also express as a linear combination of A and B. So we're

30
00:02:30,479 --> 00:02:35,800
going to be keeping track of these four coefficients, C, D, E, and F that have this property.

31
00:02:35,800 --> 00:02:42,840
This property is going to be another invariant of our extended Euclidean algorithm or pulverizer.

32
00:02:42,840 --> 00:02:47,680
Well, how do we get initial values for a C, D, and F? Well, that's easy. At the start,

33
00:02:47,680 --> 00:02:59,800
x is A and so C is 1 and D is 0 because A is 1A plus 0B. Similarly, y is 0A plus 1B. So

34
00:02:59,800 --> 00:03:04,800
we know what these values of C, D, E, and F are at the start of the algorithm. Question is

35
00:03:04,800 --> 00:03:10,159
how do we update them? Well, how does Euclidean, how does Euclidean work? Well, remember, at

36
00:03:10,159 --> 00:03:16,200
the next step, the value of x is the old value of y. So if I had the old value of y as EA plus

37
00:03:16,199 --> 00:03:26,599
FB, then I clearly have the next value of x as the same linear combination that y had previously.

38
00:03:26,599 --> 00:03:32,759
What about y next? Well, at the next step, the value of y is simply the remainder of x and y.

39
00:03:32,759 --> 00:03:39,639
Well, the remainder of x and y, remember, is just x minus the quotient times y where the quotient

40
00:03:39,639 --> 00:03:48,119
is the quotient of x divided by y. So this is equal to the remainder of x and y. And that means

41
00:03:48,119 --> 00:03:56,919
that since I have y, since I also have x expressed as a linear combination, this x minus qy is simply

42
00:03:56,919 --> 00:04:03,159
this linear combination for x minus the quotient number times the linear combination for y. Well,

43
00:04:03,159 --> 00:04:08,039
the difference of two linear combinations is a linear combination. So just combining coefficients,

44
00:04:08,039 --> 00:04:14,120
what I discover is that the way to express y next as a linear combination of a and b is just

45
00:04:14,120 --> 00:04:22,199
to combine the previous coefficients, c, d, e and f with the quotient in this way. And that's all

46
00:04:22,199 --> 00:04:28,839
the risk to it. Well, let's work out an example to see how it goes. Suppose that a is 899 and b is

47
00:04:28,839 --> 00:04:33,480
493. This was a number that we had pre, these were numbers that we had previously applied the Euclidean

48
00:04:33,480 --> 00:04:38,920
algorithm to. So now what we're doing is observing, I need to, I'm going to begin by calculating

49
00:04:38,920 --> 00:04:43,720
the remainder, but this time when calculating the remainder, let's keep track of the quotient. So

50
00:04:43,720 --> 00:04:51,640
I'm going to find the remainder of 899 divided by 493. It's 406 and the quotient is 1. That is 899

51
00:04:51,640 --> 00:05:00,920
is 1 times 493 plus 406. What does that tell me? Well, 406 then is, remember, 899 is a and 493 is b,

52
00:05:00,920 --> 00:05:08,360
where I'm discovering that the first remainder, 406 is 1 times a plus minus 1 times b. So now I

53
00:05:08,360 --> 00:05:14,680
have that first remainder expressed as the desired linear combination of a and b. Well, what's next?

54
00:05:14,680 --> 00:05:23,639
Well, now that I've got 406 and 493, I'm supposed to take the remainder of 493 divided by 406,

55
00:05:23,639 --> 00:05:31,879
well, that's 87. In fact, 493 has a quotient of 1 times 406 plus 87. So that tells me that 87

56
00:05:31,879 --> 00:05:43,800
is this number minus that number. 87 is 493 minus 406. Well, remember, 493 is b. So 87 is 1 times

57
00:05:43,800 --> 00:05:49,639
b minus 1 times 406. But wait, wait, wait, look up here. 406, I know how to express it as a linear

58
00:05:49,639 --> 00:05:57,240
combination of a and b. So let's replace the 406 by 1a plus minus 1b. And what I'm going to wind up

59
00:05:57,240 --> 00:06:06,919
with, remember, it's a minus minus. So I wind up contributing an a and an extra b and I wind up with

60
00:06:06,919 --> 00:06:13,719
a minus a plus 2b. Said that wrongly. The a is getting negated, but you can check my algebra.

61
00:06:13,719 --> 00:06:18,759
So there we are with the linear combination of expresses. The next remainder 87.

62
00:06:18,759 --> 00:06:25,079
All right, let's continue. After this, what we're supposed to do is find the quotient of 406 by

63
00:06:26,279 --> 00:06:34,360
by 87 and the remainder. So when you divide 406 by 87, you get a quotient of 4 and a remainder of 58,

64
00:06:34,360 --> 00:06:42,279
which means the remainder 58 is 406 minus 4 times 87. But now, looking above, I have the

65
00:06:42,279 --> 00:06:49,319
coefficients of 406 for a and b. And I have the coefficients for 87 for a and b here.

66
00:06:50,199 --> 00:06:55,559
And so I have to multiply those by 4 and a and I wind up that the way to express 58 in terms of

67
00:06:55,559 --> 00:07:03,239
a and b is its 5a plus minus 9b. And now, next, I'm supposed to find the remainder of

68
00:07:03,959 --> 00:07:10,279
of 87 divided by 58. The quotient's 1. The remainder is 29. And that means that 29 is

69
00:07:11,239 --> 00:07:19,559
1 times 87 minus 1 times 58. Looking back, I see how to express 87 in terms of a and b and 58 in

70
00:07:19,559 --> 00:07:28,599
terms of a and b, I can just combine those expressions to wind up with 29 is minus 6 times a plus 11 times b.

71
00:07:29,479 --> 00:07:36,919
Next, I have to take the quotient of 58 divided by 29. All the quotient is 2, but the cool thing

72
00:07:36,920 --> 00:07:42,840
now is the remainder is 0. That's the stopping condition for the Euclidean algorithm. It means

73
00:07:42,840 --> 00:07:51,400
that the answer is 29. There's no remainder anymore. So the GCD of 29 and 0 is 29. The final GCD

74
00:07:51,400 --> 00:07:59,000
then we finished is 29. But look what we got. In the last step, I had expressed that GCD as a linear

75
00:07:59,000 --> 00:08:05,319
combination of a and b. And that's the polvarizer. I've just figured out that possible values for

76
00:08:05,319 --> 00:08:13,160
S and T are minus 6 and 11. And this is a perfectly general procedure that will always give you

77
00:08:14,040 --> 00:08:22,680
coefficients S and T that express the GCD of a and b in terms of a and b. Now, sometimes it's

78
00:08:22,680 --> 00:08:28,840
technically convenient to be able to control which of the coefficients are positive and which negative.

79
00:08:28,840 --> 00:08:37,080
Clearly, if you're going to combine a and b that are both positive numbers and wind up with a positive

80
00:08:37,080 --> 00:08:45,480
number by adding multiples of them, one of those coefficients has to be negative. So in this case,

81
00:08:45,480 --> 00:08:53,159
we had the coefficient of 89 was minus 6 and the coefficient of b was 11. And suppose that I

82
00:08:53,159 --> 00:08:59,960
wanted though the first coefficient of a to be the positive number and the other one to be negative,

83
00:08:59,960 --> 00:09:04,440
why how can I do that? Well, there's a pretty trivial little trick for doing that's ingenious,

84
00:09:04,440 --> 00:09:10,360
but it's immediately verifiable. How do I get a positive coefficient for 899? Well, there's a

85
00:09:10,360 --> 00:09:19,000
general way to get new coefficients. If you look at minus 689 plus 11, 493, if I add any multiple

86
00:09:19,000 --> 00:09:26,120
of 493 to the first coordinate and I subtract the same multiple of 899 from the second coordinate,

87
00:09:26,120 --> 00:09:37,399
all I'm doing is adding 493 times k times 899 to the first term and I'm subtracting 493 times 899

88
00:09:37,399 --> 00:09:43,480
times k from the second term they cancel out. So this linear combination is going to be the same

89
00:09:43,480 --> 00:09:49,159
as that one. It's going to be the same GCD, but now I'll buy adding in any multiple, by the way,

90
00:09:49,159 --> 00:09:55,480
k could be positive or negative of 493. I can make the positive, I can make the first coefficient

91
00:09:55,480 --> 00:10:00,679
as big or as small as I like in particular. If I wanted to be positive, might as well take the

92
00:10:00,679 --> 00:10:06,600
smallest value of k that works, which is one. So if I let k be one, I discover that I add 493 to

93
00:10:06,600 --> 00:10:17,800
minus 6 I get 487 and I subtract 899 from 11, I get minus 888 and there we are with another

94
00:10:17,800 --> 00:10:25,080
expression for this time s is 47 and t is minus 888 and the second one is negative and the first

95
00:10:25,080 --> 00:10:32,360
one is positive. It's going to turn out that this little trick will enable us in a next video to

96
00:10:32,440 --> 00:10:38,440
come up with a general solution to the diehard bucket problem, which is fun. But let's finish up

97
00:10:38,440 --> 00:10:45,399
the current story. And the remark is that the pulverizer is really another very efficient algorithm,

98
00:10:45,399 --> 00:10:50,039
exactly the way that Euclidean algorithm is efficient. It's basically got the same number of

99
00:10:50,039 --> 00:10:56,840
transitions when you update the pair xy to get a new pair y remainder of x divided by y. So it's

100
00:10:56,920 --> 00:11:03,800
taking twice log to the base two number of transitions log to the base two b transitions. So it's

101
00:11:03,800 --> 00:11:10,200
exponentially efficient working in the binary, the length and binary of the number b. Of course,

102
00:11:10,200 --> 00:11:17,240
there's a few more additions and multiplications per transition for the extended GCD that were the

103
00:11:17,240 --> 00:11:22,920
pulverizer than the ordinary Euclidean algorithm. So big deal, it means that the number of total

104
00:11:22,919 --> 00:11:31,559
arithmetic operations of ads and multiplies is proportional to the log to the base two of b.

105
00:11:31,559 --> 00:11:37,240
I said here six, I think it's actually like 10, but the main thing is it's a small constant times

106
00:11:37,240 --> 00:11:43,240
the log to the base two of b. The pulverizer is a very efficient algorithm as well as the Euclidean

107
00:11:43,240 --> 00:11:53,240
algorithm and those are going to be crucial facts that we'll build on.

