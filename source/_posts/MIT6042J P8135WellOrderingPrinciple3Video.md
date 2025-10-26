---
title: MIT6042J P8135WellOrderingPrinciple3Video
---

1
00:00:00,000 --> 00:00:09,720
So let's look at a last example of applying the well-ordering principle.

2
00:00:09,720 --> 00:00:14,320
This time to something that we actually care about, a theorem that really does require

3
00:00:14,320 --> 00:00:15,960
some.

4
00:00:15,960 --> 00:00:21,800
The theorem is the following famous formula for the sum of a geometric sum, for a geometric

5
00:00:21,800 --> 00:00:23,559
series or a geometric sum.

6
00:00:23,559 --> 00:00:29,039
So the numbers on the left, the powers of r starting at 1, which is r to the 0, followed

7
00:00:29,039 --> 00:00:33,920
by r, which is r to the 1, followed by r squared up through the nth power of r.

8
00:00:33,920 --> 00:00:35,719
Yeah, all those numbers up.

9
00:00:35,719 --> 00:00:40,240
And it turns out that there's a nice, simple fixed formula that doesn't have those three

10
00:00:40,240 --> 00:00:44,799
dots in it that tells you exactly what the value of that sum is.

11
00:00:44,799 --> 00:00:48,359
And the formula, as you can read, is r to the n plus 1 minus 1.

12
00:00:48,359 --> 00:00:53,399
It's the numerator and r minus 1 is the denominator.

13
00:00:53,399 --> 00:01:00,320
And the claim is that this identity holds for all non-negative integers n.

14
00:01:00,320 --> 00:01:04,759
And for all real numbers, all of it aren't 1 because I don't want the denominator to

15
00:01:04,759 --> 00:01:07,239
be 0.

16
00:01:07,239 --> 00:01:08,759
So how are we going to prove this?

17
00:01:08,759 --> 00:01:12,519
Well, I'm going to prove it by using the well-ordering principle.

18
00:01:12,519 --> 00:01:18,960
And let's suppose that this identity didn't hold for some non-negative integer n.

19
00:01:18,959 --> 00:01:26,079
So we'll apply the well-ordering principle and we'll let m be the smallest number n where

20
00:01:26,079 --> 00:01:27,639
this equality fails.

21
00:01:27,639 --> 00:01:31,039
It becomes an inequality.

22
00:01:31,039 --> 00:01:37,000
Now what I know about m immediately is that this equality, if you look at it, when n is

23
00:01:37,000 --> 00:01:43,199
0, the left hand side comes down that degenerates to just r to the 0 or 1.

24
00:01:43,200 --> 00:01:49,359
The right hand side, if you check it, is r minus 1 over r minus 1, which is also 1.

25
00:01:49,359 --> 00:01:56,600
So equality holds when n is 0 and that means that the least m for which equality doesn't

26
00:01:56,600 --> 00:01:59,599
hold has to be positive.

27
00:01:59,599 --> 00:02:06,680
So what we know about the least number where this equality fails is that it's positive.

28
00:02:06,680 --> 00:02:11,280
And that means in particular, since it's the least one word fails, if you go down 1

29
00:02:11,280 --> 00:02:14,680
to m minus 1, the equality holds.

30
00:02:14,680 --> 00:02:22,159
So we can assume that the sum of the first m powers of r starting at 0 and ending at r

31
00:02:22,159 --> 00:02:29,719
to the m minus 1 is equal to the formula where you plug in m minus 1 for n and you get that

32
00:02:29,719 --> 00:02:33,439
formula on the right, which I'm not going to read to you.

33
00:02:33,439 --> 00:02:35,280
Well, we can simplify it a little bit.

34
00:02:35,280 --> 00:02:42,840
If you look at the exponent, r to the m minus 1 plus 1 is after all just r to the m.

35
00:02:42,840 --> 00:02:49,099
So repeating what I've got is that the sum of those first powers of r up to m minus 1,

36
00:02:49,099 --> 00:02:54,920
we can assume is equal to the formula r to the m minus 1 divided by r minus 1 because

37
00:02:54,920 --> 00:03:01,920
m failed and this was the number 1 less where it had to succeed.

38
00:03:01,919 --> 00:03:04,159
So now we take the obvious strategy.

39
00:03:04,159 --> 00:03:09,839
What I'm interested in is properties of the sum of the powers up to r to the m.

40
00:03:09,839 --> 00:03:13,199
Now the left hand side is the powers up to r to the m minus 1.

41
00:03:13,199 --> 00:03:17,479
So there's an obvious strategy for turning the left hand side into what I'm interested

42
00:03:17,479 --> 00:03:18,479
in.

43
00:03:18,479 --> 00:03:22,299
Namely, let's add r to the m to both sides.

44
00:03:22,299 --> 00:03:27,479
So the left hand side becomes just the sum that I want and the right hand side becomes

45
00:03:27,479 --> 00:03:32,199
this messy thing r to the m minus 1 over r minus 1 plus r to the m.

46
00:03:32,199 --> 00:03:34,679
Well let's just simplify a little bit.

47
00:03:34,679 --> 00:03:41,659
Let's put r to the m, put it over the denominator r minus 1, which I do by multiplying it by r

48
00:03:41,659 --> 00:03:43,599
minus 1.

49
00:03:43,599 --> 00:03:48,799
And then it comes out to be r to the m plus 1 minus r to the m over r minus 1.

50
00:03:48,799 --> 00:03:52,159
And I collect terms and look what I got.

51
00:03:52,159 --> 00:03:59,120
I've got the formula r to the m plus 1 minus 1 over r minus 1, which means that the identity

52
00:03:59,120 --> 00:04:06,039
that I was originally claiming in fact holds at m, contradicting the assertion that it

53
00:04:06,039 --> 00:04:07,599
didn't hold at m.

54
00:04:07,599 --> 00:04:11,719
In other words, we've reached a contradiction assuming there was at least place where equality

55
00:04:11,719 --> 00:04:13,439
fails.

56
00:04:13,439 --> 00:04:19,159
That means there's no counter example and the equality holds for all non-negative integers

57
00:04:19,159 --> 00:04:19,399
n.

58
00:04:22,800 --> 00:04:27,920
So here's the general organization of a well-ordering proof which we've been using.

59
00:04:27,920 --> 00:04:31,400
Let's just sort of summarize it into a template for proving things.

60
00:04:31,400 --> 00:04:36,800
So what you have in mind is that there's some property p of n of non-negative integers.

61
00:04:36,800 --> 00:04:40,960
And what you'd like to prove is that it holds for every non-negative integer.

62
00:04:40,960 --> 00:04:46,240
So for all n in non-negative integers, p of n holds.

63
00:04:46,240 --> 00:04:50,680
And we're going to try to prove this by the well-ordering principle, which means that

64
00:04:50,680 --> 00:04:55,840
we're going to define the set of numbers for which p doesn't hold.

65
00:04:55,840 --> 00:04:58,759
That is the set of counter examples and call that c.

66
00:04:58,759 --> 00:05:04,480
So c is the set of non-negative integers for which not p of n holds.

67
00:05:04,480 --> 00:05:11,000
Now by the well-ordering principle, there's got to be a minimum element called m that's

68
00:05:11,000 --> 00:05:13,360
in c.

69
00:05:13,360 --> 00:05:19,180
And at this point, the job by assuming that m is the smallest counter example, we have

70
00:05:19,180 --> 00:05:22,259
to reach a contradiction somehow.

71
00:05:22,259 --> 00:05:27,939
Now up to this second bullet, it's the template.

72
00:05:27,939 --> 00:05:32,420
But the third bullet is where the math real math starts and there isn't any template anymore.

73
00:05:32,420 --> 00:05:37,259
How you reach a contradiction is by reasoning about properties of p of n and there's no

74
00:05:37,259 --> 00:05:38,899
simple recipe.

75
00:05:38,899 --> 00:05:43,180
But the usual organization of the contradiction is one of two kinds.

76
00:05:43,180 --> 00:05:46,420
You find a counter example that's smaller than m.

77
00:05:46,420 --> 00:05:49,780
You find a c that's in the set of counter examples and c is less than m.

78
00:05:49,780 --> 00:05:52,780
That would be a contradiction because m is the smallest thing in c.

79
00:05:52,780 --> 00:05:58,280
Or you reach a contradiction by proving that p does hold for m, which means it's not

80
00:05:58,280 --> 00:05:59,740
a counter example.

81
00:05:59,740 --> 00:06:05,860
And those are kind of the two standard ways to organize a well-ordering proof.

