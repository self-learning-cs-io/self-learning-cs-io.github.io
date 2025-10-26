---
title: MIT6042J P98455TotalExpectationVideo
---

1
00:00:00,000 --> 00:00:07,000
The law of total expectation will give us another important tool for reasoning about expectations.

2
00:00:07,000 --> 00:00:13,000
And it's basically a rule like the law of a total probability closely related to it really,

3
00:00:13,000 --> 00:00:16,000
for reasoning by cases about expectation.

4
00:00:16,000 --> 00:00:21,000
So it requires a definition of what's called conditional expectation.

5
00:00:21,000 --> 00:00:29,000
So the expectation of a random variable R given event A is simply what you get by thinking of

6
00:00:29,000 --> 00:00:34,000
replacing the probability that R equals V by the probability that R equals V given A.

7
00:00:34,000 --> 00:00:42,000
So it's the sum over all the possible values that R might take of the probability that R takes that value given A.

8
00:00:42,000 --> 00:00:48,000
Okay, with that definition, we can state the basic form of the law of total expectation,

9
00:00:48,000 --> 00:00:55,000
which says if you want to calculate the expectation of R, you can split it into cases according to whether or not A occurs.

10
00:00:55,000 --> 00:01:05,000
It's simply the conditional expectation of R given A times the probability of A plus the conditional expectation of R given not A times the probability of not A.

11
00:01:05,000 --> 00:01:10,000
So it really looks as the same format as the law of total probability.

12
00:01:10,000 --> 00:01:13,000
Now of course it generalizes to many cases.

13
00:01:13,000 --> 00:01:24,000
So the general form would say that I can calculate the expectation of R by breaking it up into the case that A1 holds times the probability of A1,

14
00:01:24,000 --> 00:01:31,000
the case that A2 holds times the probability of A2 through An, and this could very well and typically is an infinite sum,

15
00:01:31,000 --> 00:01:35,000
where the AIs of course are a partition of the sample space.

16
00:01:35,000 --> 00:01:43,000
So they're all the different cases, either A1 or A2 or A3, they're disjoint and altogether they cover the entire set of possibilities.

17
00:01:43,000 --> 00:01:52,000
Well, let's use this as to get a nice, different and simpler way, more elementary way of calculating the expected number of heads and n flips.

18
00:01:52,000 --> 00:01:59,000
So let's let E of N be the expected number of heads in n flips, no just short-hand because the notation will be easy to work with,

19
00:01:59,000 --> 00:02:04,000
then writing capital E brackets of Hn.

20
00:02:04,000 --> 00:02:08,000
So what do we know about expectation of N?

21
00:02:08,000 --> 00:02:16,000
Well, I can express it in terms of the expectation of the remaining flips.

22
00:02:16,000 --> 00:02:25,000
So if I have N flips to perform, they're independent, then if I perform the first flip, something happens, and after that I'm going to do N more flips,

23
00:02:25,000 --> 00:02:32,000
and the expected number of flips is going to be the expected number under remaining N minus 1 plus what happened now.

24
00:02:32,000 --> 00:02:42,000
Well, if I flipped ahead first, then I've got a 1 as adding to my total number of heads, and then I'm going to do N more flips.

25
00:02:42,000 --> 00:02:47,000
So the expected number of flips is going to be that 1 plus the expected number on the rest of them.

26
00:02:47,000 --> 00:02:56,000
If the first flip was not ahead, it was a tail, then the total expected number of heads is simply the expected number of heads on the rest of the flips.

27
00:02:56,000 --> 00:03:00,000
And these are two cases where I can apply total expectation.

28
00:03:00,000 --> 00:03:11,000
So by total expectation, the expected number in N flips is 1 plus En minus 1 times the probability of a head plus En minus 1.

29
00:03:11,000 --> 00:03:23,000
Well, now we can do a little algebra, multiply through here by P. That becomes a P, and this becomes a P times En minus 1.

30
00:03:23,000 --> 00:03:35,000
So I've got En minus 1 times P, and En minus 1 times Q. Remembering that P plus Q is 1, this simplifies into being simply En minus 1 plus P.

31
00:03:35,000 --> 00:03:41,000
Well, this is a very simple kind of recursive definition of En, because you can see what's going to happen.

32
00:03:41,000 --> 00:03:49,000
Subtracting 1 from N adds a P. So if I subtract 2 from N, I add another P, I get 2 P, and continuing all the way to the end.

33
00:03:49,000 --> 00:04:01,000
By the time I get to 0, I've gotten N times P, and I've just figured out what I was familiar with already, which we previously derived by differentiating the binomial theorem.

34
00:04:01,000 --> 00:04:13,000
The expected number of heads in N flips is N times P, but this time I got it in a somewhat more elementary way by appealing to total expectation.

