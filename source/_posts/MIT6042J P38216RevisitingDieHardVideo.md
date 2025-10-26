---
title: MIT6042J P38216RevisitingDieHardVideo
---

1
00:00:00,000 --> 00:00:03,480
So now we're ready to put together the facts.

2
00:00:03,480 --> 00:00:08,000
The GCD is a linear combination to prove two cool results,

3
00:00:08,000 --> 00:00:13,320
one fun and the other important and serious.

4
00:00:13,320 --> 00:00:15,919
Let's begin with the diehard example.

5
00:00:15,919 --> 00:00:18,359
So we looked at the diehard state machine

6
00:00:18,359 --> 00:00:21,359
and we figured out the behavior of it

7
00:00:21,359 --> 00:00:25,640
with jugs of size three and five gallons

8
00:00:25,640 --> 00:00:28,760
and also with jugs of size three and six gallons.

9
00:00:28,760 --> 00:00:30,200
Let's look at the general case now.

10
00:00:30,200 --> 00:00:36,039
Suppose that I have jugs of A gallons and B gallons

11
00:00:36,039 --> 00:00:41,439
where A and B are positive integers.

12
00:00:41,439 --> 00:00:43,480
Now, when we looked at the state machine

13
00:00:43,480 --> 00:00:46,359
we figured out that under the diehard rules,

14
00:00:46,359 --> 00:00:50,160
the number of gallons in each bucket at any stage

15
00:00:50,160 --> 00:00:54,160
is a linear combination of the bucket sizes.

16
00:00:54,159 --> 00:01:00,839
So at any point, in any sequence of moves of diehard moves,

17
00:01:00,839 --> 00:01:05,599
in each bucket there will be a linear combination of A and B.

18
00:01:05,599 --> 00:01:09,000
Now, the point is that linear combinations of A and B

19
00:01:09,000 --> 00:01:12,759
are the same as multiples of the GCD.

20
00:01:12,759 --> 00:01:21,759
The reason is that the GCD is a divisor of A and B.

21
00:01:21,759 --> 00:01:23,280
Of course, it's a common divisor.

22
00:01:23,280 --> 00:01:26,719
And therefore, it divides any linear combination of A and B.

23
00:01:26,719 --> 00:01:31,200
So any linear combination of A and B is a multiple of the GCD

24
00:01:31,200 --> 00:01:33,599
and the GCD is itself a linear combination.

25
00:01:33,599 --> 00:01:38,519
So linear combinations of A and B are the same as multiples of GCD.

26
00:01:38,519 --> 00:01:40,159
So that gives us a pretty good understanding

27
00:01:40,159 --> 00:01:44,319
of what the amounts that we can get in the various buckets are.

28
00:01:44,319 --> 00:01:46,640
We can only get multiples of GCDs.

29
00:01:46,640 --> 00:01:51,240
But in fact, you can get any multiple of the GCD of A and B

30
00:01:51,239 --> 00:01:55,599
into a bucket providing it'll fit in the bucket.

31
00:01:55,599 --> 00:01:59,199
That's the same as saying that you can get any linear combination

32
00:01:59,199 --> 00:02:05,119
amount of A and B into a bucket if there's room for it in the bucket.

33
00:02:05,119 --> 00:02:07,479
So let's see how to do that.

34
00:02:07,479 --> 00:02:09,719
So suppose that I have a linear combination of A and B,

35
00:02:09,719 --> 00:02:13,639
S A plus T B, that will fit in bucket B, meaning

36
00:02:13,639 --> 00:02:17,599
it's greater than or equal to zero and it's less than B.

37
00:02:17,599 --> 00:02:21,840
So it's a number of gallons that could fit into bucket B.

38
00:02:21,840 --> 00:02:25,199
How do I get that amount into bucket B?

39
00:02:25,199 --> 00:02:28,560
And here's how.

40
00:02:28,560 --> 00:02:30,919
We can assume that S is positive.

41
00:02:30,919 --> 00:02:35,439
We've already seen that we can arrange that to be the case.

42
00:02:35,439 --> 00:02:38,039
And so what we're going to do is repeat

43
00:02:38,039 --> 00:02:40,599
the following procedure S times.

44
00:02:40,599 --> 00:02:45,919
I'm going to fill up bucket A and pour it into bucket B.

45
00:02:45,919 --> 00:02:50,479
Whenever B gets filled up, I'll just dump it so that it's empty.

46
00:02:50,479 --> 00:02:56,479
And I can keep filling up bucket A and pouring it into bucket B.

47
00:02:56,479 --> 00:02:59,199
And I repeat that S times.

48
00:02:59,199 --> 00:03:02,079
Now when I do that, the total number of times

49
00:03:02,079 --> 00:03:06,079
that I've filled bucket A is S times.

50
00:03:06,079 --> 00:03:10,759
So the total amount of water that I have taken from the faucet

51
00:03:10,759 --> 00:03:13,959
or from the fountain is S times A.

52
00:03:13,960 --> 00:03:23,360
And I've poured it into B and then dumped it, leaving only some amount that's in B, that's

53
00:03:23,360 --> 00:03:30,960
less than B. So the amount that's left after pouring in S A gallons and dumping out what

54
00:03:30,960 --> 00:03:38,400
won't fit, I'm left with some amount that's non-negative and less than B in bucket B.

55
00:03:38,400 --> 00:03:47,280
Now the point is that the number of emptyings of bucket B must be exactly T, which is

56
00:03:47,280 --> 00:03:54,159
why the amount of water that's left in bucket B is S A minus T B.

57
00:03:54,159 --> 00:04:02,719
And the reason why it has to be minus T is that if I've got S A there, if I had more

58
00:04:02,719 --> 00:04:06,240
than T emptyings, I would have had bucket B go negative.

59
00:04:06,240 --> 00:04:08,360
It just isn't enough room for it.

60
00:04:08,360 --> 00:04:14,360
And if I had fewer than T emptyings, then the bucket would have an amount larger than B

61
00:04:14,360 --> 00:04:15,360
in it.

62
00:04:15,360 --> 00:04:23,420
So the only possible number of emptyings of B is minus T, remember T is negative, so minus

63
00:04:23,420 --> 00:04:25,160
T is a positive number.

64
00:04:25,160 --> 00:04:32,840
And that means that I've put in S A and taken out T B and I'm left with exactly the linear

65
00:04:32,839 --> 00:04:44,479
combination S A minus T B. So in fact, there's no need to count because you don't need to

66
00:04:44,479 --> 00:04:52,799
know what S A and T, what S and T are because you can just knowing that you can get any desired

67
00:04:52,799 --> 00:04:59,439
amount that's a multiple of the GCD into bucket B, you just keep doing this process until

68
00:04:59,439 --> 00:05:01,559
you get the amount that you want.

69
00:05:01,560 --> 00:05:07,839
So you fill bucket A, you pour it into B, when B fills you empty it, you just keep track

70
00:05:07,839 --> 00:05:12,680
of how much, how many gallons there are in bucket B and you keep going until you get the

71
00:05:12,680 --> 00:05:15,360
amount that you want and then you're done.

