---
title: MIT6042J P86415SampleSpacesVideo
---

1
00:00:00,000 --> 00:00:06,120
So let's look now at the mathematical foundations of probability theory, the basic definitions

2
00:00:06,120 --> 00:00:09,439
of which we've just been doing examples up until now.

3
00:00:09,439 --> 00:00:14,480
So a key concept is a probability space, and that's what we're going to talk about in this

4
00:00:14,480 --> 00:00:16,480
segment.

5
00:00:16,480 --> 00:00:22,440
So the abstract setting of a probability space is the first thing you start off with is the

6
00:00:22,440 --> 00:00:28,920
set of outcomes, which is what we were doing with the tree models in the previous videos.

7
00:00:28,920 --> 00:00:34,800
And the condition that we require is that there should be a countable set of outcomes.

8
00:00:34,800 --> 00:00:39,520
So there's something called the sample space, and the sample space is designed to model

9
00:00:39,520 --> 00:00:43,640
all the possible things that can happen as the result of your random experiment, all the

10
00:00:43,640 --> 00:00:47,880
possible outcomes, and we require that there be a countable number.

11
00:00:47,880 --> 00:00:52,719
Now, the examples that we've seen so far have only had a finite number, but we will shortly

12
00:00:52,719 --> 00:00:57,719
see a bunch of examples where we really need an infinite number, but only a countable infinite

13
00:00:57,719 --> 00:00:58,719
number.

14
00:00:58,719 --> 00:01:02,240
So that's part of the definition of a probability space, the set of outcomes.

15
00:01:02,240 --> 00:01:08,519
The next thing is a probability function whose task is to assign probabilities to the outcomes.

16
00:01:08,519 --> 00:01:18,920
So the condition is that the probability function PR gives the every element in S, every outcome

17
00:01:18,920 --> 00:01:24,039
is going to be assigned a probability of between 0 and 1 inclusive.

18
00:01:24,040 --> 00:01:29,000
So every outcome gets a probability between 0 and 1, but the constraint on the probability

19
00:01:29,000 --> 00:01:35,440
function is that if I sum up the probabilities of all the outcomes omega are, is an outcome

20
00:01:35,440 --> 00:01:40,840
in the sample space S, and I take the sum of all of those probabilities of omega, they have

21
00:01:40,840 --> 00:01:43,800
to sum to 1.

22
00:01:43,800 --> 00:01:50,480
That's the crucial condition that defines a probability function on a sample space, and

23
00:01:50,480 --> 00:01:53,640
the two together are what are called a probability space.

24
00:01:53,640 --> 00:01:58,040
A sample space with a probability function is a probability space.

25
00:01:58,040 --> 00:02:02,120
So the purpose of the tree model that we were using is really to figure out which probability

26
00:02:02,120 --> 00:02:04,359
space to use.

27
00:02:04,359 --> 00:02:10,199
And the math, the mathematics doesn't really start until you have the probability space.

28
00:02:10,199 --> 00:02:16,599
Up until that, it's the modeling part that's very important mathematically, but you can't

29
00:02:16,599 --> 00:02:22,280
say that the model is right or wrong, it's a model, and its rightness or wrongness is

30
00:02:22,280 --> 00:02:28,439
a matter of judgment and comparison to how it stacks up against reality and things that

31
00:02:28,439 --> 00:02:29,799
we care about.

32
00:02:29,799 --> 00:02:34,599
When we're using the tree model, it's the leaves of the tree that correspond to the outcomes.

33
00:02:34,599 --> 00:02:41,479
And the outcome probabilities, which are crucial for having a probability space, we got by reasoning

34
00:02:41,479 --> 00:02:47,899
about the probabilities to assign to each possible branch of the tree as you worked your

35
00:02:47,899 --> 00:02:51,679
way from root to leaf.

36
00:02:51,679 --> 00:02:55,199
So the other key concept that we saw already is the idea of an event.

37
00:02:55,199 --> 00:02:58,839
An event formally is nothing but a subset of the sample space.

38
00:02:58,839 --> 00:03:03,959
It's an event, it's some set of outcomes, presumably the event is an event that you're

39
00:03:03,959 --> 00:03:06,560
interested in, like winning.

40
00:03:06,560 --> 00:03:12,319
And the definition of the probability of an event is simply the sum of the probabilities

41
00:03:12,319 --> 00:03:14,240
of all the outcomes in the event.

42
00:03:14,240 --> 00:03:20,280
That we were using this already for both Monty Hall and for the poker hands.

43
00:03:20,280 --> 00:03:23,680
But this finally, we can generalize that to a countable collection of sets.

44
00:03:23,680 --> 00:03:30,960
If I have a bunch of events, A0, A1 and so on, then the probability that at least one of

45
00:03:30,960 --> 00:03:36,800
the macarons, the probability of the union of the AIs is less than or equal to the sum

46
00:03:36,800 --> 00:03:38,560
of their probabilities.

47
00:03:38,560 --> 00:03:42,400
This is again another kind of obvious rule, not hard to prove.

48
00:03:42,400 --> 00:03:45,500
We're not going to bother proving it because it really is obvious, but we will get some

49
00:03:45,500 --> 00:03:48,040
mileage out of it later on.

50
00:03:48,040 --> 00:03:53,319
So to summarize, the key concept here is a probability space.

51
00:03:53,319 --> 00:03:59,520
It consists of a countable set of outcomes, the sample space, and a probability function

52
00:03:59,520 --> 00:04:06,520
that assigns values between 0 and 1 to every outcomes such that the sum of the probabilities

53
00:04:06,520 --> 00:04:07,840
is 1.

54
00:04:07,840 --> 00:04:12,320
And when we're using our tree model and so on, our objective is to construct one of these

55
00:04:12,320 --> 00:04:13,320
things.

56
00:04:13,320 --> 00:04:17,800
Usually the hard part will be verifying that in fact, the way we've assigned probabilities

57
00:04:17,800 --> 00:04:24,800
has the property that the sum of them is equal to 1.

