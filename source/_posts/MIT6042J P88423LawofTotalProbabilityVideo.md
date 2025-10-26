---
title: MIT6042J P88423LawofTotalProbabilityVideo
---

1
00:00:00,000 --> 00:00:04,639
The law of total probability is another probability law that gives you a way to

2
00:00:04,639 --> 00:00:09,240
reason about cases, which we've seen is a fundamental technique for dealing with

3
00:00:09,240 --> 00:00:14,200
all sorts of problems. So the point of cases, of course, is that you can

4
00:00:14,200 --> 00:00:18,640
prove a complicated thing by breaking it up into, if you're lucky, easy subcases.

5
00:00:18,640 --> 00:00:23,719
So here's the way to understand the law of total probability abstractly. It starts

6
00:00:23,719 --> 00:00:28,140
off with set theoretic reasoning. Suppose that I have a set A embedded in some

7
00:00:28,140 --> 00:00:34,740
larger sample space s. So A is really an event, but we're just going to think of it as a set.

8
00:00:34,740 --> 00:00:41,340
Now suppose that I have three sets B1, B2, and B3 that partition the sample space.

9
00:00:41,340 --> 00:00:47,659
That is B1, B2, and B3. Don't overlap. They're disjoint and everything is in one of

10
00:00:47,659 --> 00:00:52,380
those three sets. So there's a picture of B1, B2, and B3. Cutting up the whole

11
00:00:52,380 --> 00:01:00,380
sample space s represented by the square or rectangle. Okay. Now of course these

12
00:01:00,380 --> 00:01:04,859
three sets that cut up the whole space willy-nilly cut up the set A into three

13
00:01:04,859 --> 00:01:10,460
pieces. The first piece is the points in A that are in B1. The second piece is the

14
00:01:10,460 --> 00:01:17,020
points in A that are in B2. And the third is the points in A that are in B3. So

15
00:01:17,019 --> 00:01:24,299
that's why we get a basic set theoretic identity that says that as long as B1, B2, and B3

16
00:01:24,299 --> 00:01:33,659
have the property that their union is the universe, everything. And their pairwise disjoint,

17
00:01:33,659 --> 00:01:40,659
then any set A is equal to the union of the part of A that's in B1, the part of A that's

18
00:01:40,659 --> 00:01:46,620
in B2, the part of A that's in B3. And this is a disjoint union because the B's don't overlap.

19
00:01:47,020 --> 00:01:52,620
That means that if I was talking about cardinality, I could add them up, but in terms of

20
00:01:52,620 --> 00:01:58,540
probability, I can apply the sum rule for probabilities and discover that the probability of A is

21
00:01:58,540 --> 00:02:03,900
simply the probability of being one intersection A, B2 intersection A, B3 intersection A.

22
00:02:04,780 --> 00:02:10,860
Now the most useful form of the law of total probability is when you replace this intersection

23
00:02:10,860 --> 00:02:17,740
B1 intersection A by the conditional probability using the product rule. So let's replace it

24
00:02:18,300 --> 00:02:25,500
by the probability of A given B1 times the probability of B1. That's just another formula for

25
00:02:26,380 --> 00:02:33,980
B1 intersection A. And if I do that with the rest of them, I now have the law of total probability

26
00:02:33,980 --> 00:02:39,340
stated in the usual way in terms of conditional probabilities where it's most useful. Now I did it

27
00:02:39,340 --> 00:02:44,219
for three sets, but it obviously works for any finite number of sets. As a matter of fact,

28
00:02:44,219 --> 00:02:50,460
it works fine for any accountable union of sets. If I have a partition of the sample space

29
00:02:50,460 --> 00:02:56,460
as into B0, B1, and so on, a partition with a countable number of blocks, then it's still the

30
00:02:56,460 --> 00:03:02,060
case that the probability of A is equal by the sum rule to the probability of these disjoint

31
00:03:02,060 --> 00:03:07,340
pieces, the parts of A that are in each of the different blocks of the partition, and reformulating

32
00:03:07,420 --> 00:03:13,020
that as a conditional probability, I get the rule that the probability of A is the sum over all

33
00:03:13,020 --> 00:03:20,460
possible i of the probability of A given Bi times the probability of Bi. And that basic rule is one

34
00:03:20,460 --> 00:03:25,659
that we're going to get a lot of mileage out of when we turn in the next segment to analyze

35
00:03:26,460 --> 00:03:31,259
and understand the results of tests that are maybe unreliable.

