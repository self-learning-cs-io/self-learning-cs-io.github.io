---
title: CS143 P38Week407 03 Follow Sets
---

1
00:00:00,000 --> 00:00:08,640
In this video, we're going to continue our discussion of the construction of LL1 parsing tables

2
00:00:08,640 --> 00:00:14,679
by taking a look at how we build the follow sets.

3
00:00:14,679 --> 00:00:22,320
So here's a definition of follow of X and recall that the follow set for a given symbol in

4
00:00:22,320 --> 00:00:26,120
the grammar isn't really about what that symbol can generate.

5
00:00:26,120 --> 00:00:29,160
It doesn't depend necessarily at all on what the symbol can generate.

6
00:00:29,160 --> 00:00:33,399
It depends on where that symbol can appear, where that symbol is used in the grammar.

7
00:00:33,399 --> 00:00:40,920
And we say that T is in the follow of X if there is some place in the grammar, some derivation,

8
00:00:40,920 --> 00:00:44,480
where that terminal T can appear immediately after the symbol X.

9
00:00:44,480 --> 00:00:50,439
So for all such T, they make up the follow set of X.

10
00:00:50,439 --> 00:00:54,359
And here's some intuition about how we would compute follow sets.

11
00:00:54,359 --> 00:00:59,640
Let's say we have a situation where X goes to two symbols A, B.

12
00:00:59,640 --> 00:01:07,680
Then anything that B can produce in the first position will clearly be in the follow of

13
00:01:07,680 --> 00:01:17,799
A. And clearly can follow A. So if we have X goes to A, B, and then through some more steps,

14
00:01:17,799 --> 00:01:25,079
we can get something like this A goes to T beta.

15
00:01:25,079 --> 00:01:27,719
Then we have a situation where the T comes immediately after the A.

16
00:01:27,719 --> 00:01:32,000
And so clearly something that was in the first of B is in the follow of A.

17
00:01:32,000 --> 00:01:36,200
So the basic rule is that if you have two symbols that are adjacent somewhere in the grammar,

18
00:01:36,200 --> 00:01:43,799
the first of the second one is in the follow of the first one.

19
00:01:43,799 --> 00:01:51,479
Now another interesting fact here is that if we have a symbol at the end of a production,

20
00:01:51,479 --> 00:01:55,000
let's take a look at the B here for a moment.

21
00:01:55,000 --> 00:01:59,159
And I claim here that anything that's in the follow of the left hand side is going to

22
00:01:59,159 --> 00:02:04,319
be in the follow of B. In this case, the follow of X is a subset of the follow of B.

23
00:02:04,319 --> 00:02:05,840
And let's take a look at that.

24
00:02:05,840 --> 00:02:10,599
Let's say that we have a situation where we have a derivation from the start symbol.

25
00:02:10,599 --> 00:02:12,919
We wind up with X followed by T.

26
00:02:12,919 --> 00:02:15,639
And there can be other stuff around the X and the T.

27
00:02:15,639 --> 00:02:17,039
But let's ignore that for the moment.

28
00:02:17,039 --> 00:02:19,159
Let's just focus on the XT.

29
00:02:19,159 --> 00:02:26,199
Then we can use this production, X goes to A, B. And in one step, we can get to A, B, T.

30
00:02:26,199 --> 00:02:32,199
And now we see that T was in the follow of X, and also T is in the follow of B as a result.

31
00:02:32,199 --> 00:02:33,199
Okay?

32
00:02:33,199 --> 00:02:37,039
So anything that's in the follow of X will also be in the follow of B.

33
00:02:37,039 --> 00:02:41,279
And we can generalize this observation about what occurs at the end of a production.

34
00:02:41,280 --> 00:02:45,240
So anything that occurs at the end of the production, its follow set will include the

35
00:02:45,240 --> 00:02:48,640
follow set of this symbol on the left hand side of the production.

36
00:02:48,640 --> 00:02:51,280
Well, what is the end of the production?

37
00:02:51,280 --> 00:02:57,840
If B can go to Epsilon, if B can disappear, then A will appear at the end of the production.

38
00:02:57,840 --> 00:02:58,840
Okay?

39
00:02:58,840 --> 00:03:04,159
So if B can go to Epsilon, then it would also happen that the follow of X would be in the

40
00:03:04,159 --> 00:03:05,360
follow of A.

41
00:03:05,360 --> 00:03:09,520
And following up here on our example, so we start up here, we start with the start symbol.

42
00:03:09,520 --> 00:03:15,600
We got to X, T. And in one step, we got to A, B, T. And so T was in the follow of B.

43
00:03:15,600 --> 00:03:22,240
But now, B can go to Epsilon, and so we can also get to A, T. And therefore, T is also

44
00:03:22,240 --> 00:03:26,120
in the follow of A.

45
00:03:26,120 --> 00:03:28,280
And finally, there's one special case.

46
00:03:28,280 --> 00:03:31,800
Remember that we have our special symbol marking the end of the input.

47
00:03:31,800 --> 00:03:33,320
And what can that follow?

48
00:03:33,320 --> 00:03:36,920
Well, the end of the input is in the follow of the start symbol.

49
00:03:36,920 --> 00:03:37,920
All right?

50
00:03:37,919 --> 00:03:44,919
So we're going to do this in the follow of A. You can see that the first of Y is in the

51
00:03:44,919 --> 00:03:45,919
follow of Y.

52
00:03:45,919 --> 00:03:49,919
And we'll see how that's used when we build the parsing table of an int.

53
00:03:49,919 --> 00:03:50,919
Okay?

54
00:03:50,919 --> 00:03:51,919
And where is that used in the grammar?

55
00:03:51,919 --> 00:03:52,919
Well, it's right here.

56
00:03:52,919 --> 00:03:53,919
All right?

57
00:03:53,919 --> 00:03:55,919
So the what's going to be in the follow of int?

58
00:03:55,919 --> 00:03:58,919
Well, it's going to include everything in the first of Y.

59
00:03:58,919 --> 00:03:59,919
Okay?

60
00:03:59,919 --> 00:04:00,919
And what's in the first of Y?

61
00:04:00,919 --> 00:04:03,919
Well, times was in the first of Y, and Epsilon was in the first of Y.

62
00:04:03,919 --> 00:04:05,919
We don't include Epsilon's in follow sets.

63
00:04:05,919 --> 00:04:10,919
So it's a Y contributes times to the follow of int.

64
00:04:10,919 --> 00:04:14,919
But now, because Y can go to Epsilon, there's an Epsilon production for Y.

65
00:04:14,919 --> 00:04:19,919
That means that this int could actually wind up being at the right end of this production.

66
00:04:19,919 --> 00:04:20,919
Okay?

67
00:04:20,919 --> 00:04:22,919
Or it could be the Y could disappear.

68
00:04:22,919 --> 00:04:26,919
And then whatever could follow the T could also follow the int.

69
00:04:26,919 --> 00:04:27,919
All right?

70
00:04:27,919 --> 00:04:31,919
So we have to include the things in the follow of T in the follow of int.

71
00:04:31,920 --> 00:04:33,920
And what was in the follow of T?

72
00:04:33,920 --> 00:04:34,920
Well, that was a plus.

73
00:04:34,920 --> 00:04:36,920
It was a dollar.

74
00:04:36,920 --> 00:04:39,920
And it was a close parent.

75
00:04:39,920 --> 00:04:40,920
Okay?

76
00:04:40,920 --> 00:04:41,920
And what does that tell us?

77
00:04:41,920 --> 00:04:44,920
Well, that tells us it's okay from what's anything to follow an int.

78
00:04:44,920 --> 00:04:47,920
But an open parent cannot follow an int.

79
00:04:47,920 --> 00:04:52,920
So you can't have another nested expression with that begin right after an int without an intervening operator.

80
00:04:52,920 --> 00:04:53,920
All right?

81
00:04:53,920 --> 00:05:00,920
And that completes the computation of the follow sets for this example.

