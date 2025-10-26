---
title: MIT6042J P82353Inclusion ExclusionExampleVideo
---

1
00:00:00,000 --> 00:00:05,000
The final general counting rule that we'll examine is called inclusion exclusion.

2
00:00:05,000 --> 00:00:14,000
And it is a straight forward generalization of the sum rule, at least in the simple case of two sets that we'll look at first.

3
00:00:14,000 --> 00:00:19,000
So we're going to look at the 604-2 example of applying inclusion exclusion.

4
00:00:19,000 --> 00:00:21,000
But let's begin by stating what it is.

5
00:00:21,000 --> 00:00:29,000
So the sum rule says that if you have two sets A and B that are disjoint, no overlap between A and B,

6
00:00:29,000 --> 00:00:34,000
then the size of A union B is equal to the size of A plus the size of B.

7
00:00:34,000 --> 00:00:38,000
Well, that's obvious we took that as kind of basic axiom.

8
00:00:38,000 --> 00:00:40,000
But what if they're not disjoint?

9
00:00:40,000 --> 00:00:48,000
Suppose that A and B overlap and there's some stuff in here that's the intersection of A and B where there are points in common.

10
00:00:48,000 --> 00:00:56,000
What then is the size of A union B in terms of similar things that we can count?

11
00:00:56,000 --> 00:01:07,000
And the answer is that the size of A union B is the size of A plus the size of B minus the size of A intersection B.

12
00:01:07,000 --> 00:01:16,000
Now the intuitive reason for that, and it's not really very hard to make a precise argument, is that when you're adding up the elements in A,

13
00:01:16,000 --> 00:01:20,000
you're counting all the elements in the intersection once.

14
00:01:20,000 --> 00:01:27,000
And then when you add in the elements in B here, A plus B, you're counting all the elements in the intersection.

15
00:01:27,000 --> 00:01:33,000
The second time, the ones that are in A minus B get counted once, the ones that are in B minus A get counted once,

16
00:01:33,000 --> 00:01:37,000
but the ones that are in A intersection B get counted twice.

17
00:01:37,000 --> 00:01:47,000
So to get the right count, I have to subtract the size of A minus B so it's only counted once in the total formula.

18
00:01:47,000 --> 00:01:54,000
And that's an intuitive explanation of why inclusion exclusion formula holds for two sets.

19
00:01:54,000 --> 00:01:57,000
Let's apply it.

20
00:01:57,000 --> 00:02:06,000
And I'm going to look at an example where we're looking at digit permutations, and I'm going to look at permutations of the 10 digits 0 through 9 inclusive.

21
00:02:06,000 --> 00:02:16,000
There's a standard one where they're listed in order, and there is just a random seeming permutation of the digits 0 through 9,

22
00:02:16,000 --> 00:02:21,000
notice that the 1 and 3, the 2 is sort of out of order, the rest are in order.

23
00:02:21,000 --> 00:02:29,000
Now what I'm going to be interested in is those permutations where certain patterns appear.

24
00:02:29,000 --> 00:02:33,000
So first of all, let's note that the number of permutations we know how to count, it's 10 factorial.

25
00:02:33,000 --> 00:02:43,000
I'm interested in how many permutations have a consecutive 6 and 0, a consecutive 0 and 4, or a consecutive 4 and 2.

26
00:02:43,000 --> 00:02:49,000
In other words, two of the consecutive numbers that appear in 6042.

27
00:02:49,000 --> 00:02:52,000
Well, the first one does not.

28
00:02:52,000 --> 00:02:57,000
There's no 6, 0, 0, 4 or 4, 2 in this list.

29
00:02:57,000 --> 00:03:07,000
This one has a 4, 2, so it would count as one of those permutations that has either a 6, 0, a 0, 4 or a 4, 2 because it's got the 42.

30
00:03:07,000 --> 00:03:21,000
Here's one where you've got a 2 and a 4, but that's not a 4 and a 2, and in fact there is no pattern here of 6, 0, 0, 4, or 4, 2, so it's not one of the permutations that I'm interested in.

31
00:03:21,000 --> 00:03:40,000
On the other hand, here's one that's doubly good. This is a permutation that has both a 0, 4 in it and a 4, 2 in it, so it would be one of these permutations of the kind that I'm looking for that has at least one of the patterns 6, 0, 0, 0, 4 or 4, 2.

32
00:03:40,000 --> 00:03:53,000
Well, if I let P sub X be the permutations with the subsequence X, then what I'm really saying is that this one with a 42 in it is in P 42 because it's got the 42 pattern.

33
00:03:53,000 --> 00:04:06,000
This one with a 0, 4 and a 4, 2 in it is in the P 0, 4 set of permutations with the pattern 0, 4 intersected with the set of patterns that have a 42 in it.

34
00:04:06,000 --> 00:04:10,000
So that's what that one illustrates.

35
00:04:10,000 --> 00:04:28,000
So what we're really asking for then is the union of 3 things, the union of P 60, P 0, 4 and P 42. How big is the set of sequences that have a 6, 0 union, the set of things that have a 6, 0, 4 union, the set of things that have a 4, 2?

36
00:04:28,000 --> 00:04:46,000
And as we saw illustrated in the previous slide, these are not this joint. Well, I've been cheating a little because in order to figure out this one, I'm going to need inclusion exclusion for three sets instead of two, because it's, and which is slightly more complicated because I have a union of three things that overlap.

37
00:04:47,000 --> 00:05:03,000
And let's look at that. So what does inclusion exclusion look like for three sets? If I want to know what's the size of a union b union c, here's a Venn diagram that shows a picture of a union b union c with all possible overlaps illustrated there.

38
00:05:03,000 --> 00:05:19,000
And the formula turns out to be you add up a b and c, you add up the size of a, the size of b and the size of c. Now that has the consequence that just that some of a b and c is counting this

39
00:05:19,000 --> 00:05:34,000
in a lens shape region that is the intersection of a and c, it's counting it twice in the a plus c term, it's counting a intersection b twice and it's counting this lens shape, which is c intersection b twice.

40
00:05:34,000 --> 00:05:49,000
So in order to get the sum right, I'm going to have to subtract one occurrence of a intersection b, one a intersection c, one b intersection c so that those items are only counted once in this sum.

41
00:05:49,000 --> 00:06:03,000
And then in fact, if you look at this region here, this sort of rounded triangle region, which is the intersection of a with b and c, that one is actually getting counted three times, all three circles,

42
00:06:03,000 --> 00:06:31,000
overlapped it. So when I add in a and I add in b and I add in c, every one of those points there is being added three times. On the other hand, this rounded triangle shape, which is counted three times in the sum a plus b plus c, is being subtracted three times because when I look at a intersection b,

43
00:06:31,000 --> 00:06:49,000
this region, and I subtracted, I'm taking one away from the count on each point there, and likewise with a intersection c takes one away and b intersection c takes one away, leaving the points in the rounded triangle in a intersection b intersection c, not counted at all.

44
00:06:49,000 --> 00:06:59,000
So if I'm going to get the total count right so that every point is counted exactly once, I have to add back in the intersection of a and b and c.

45
00:06:59,000 --> 00:07:15,000
So that's an informal explanation of how the inclusion exclusion formula works for three sets. We'll look at ways to rigorously prove inclusion exclusion for an arbitrary number of sets shortly, but not in this segment.

46
00:07:15,000 --> 00:07:30,000
Let's go on and apply the inclusion exclusion rule for three sets to the example of digit permutations with the pattern 6, 0, 0, 4, and 4, 2.

47
00:07:30,000 --> 00:07:51,000
The way to remember this is that the intersections of an even number of sets occur negatively, the intersection of an odd number of sets occur positively, and of course a single set can be thought of as just an intersection of one set with itself, and so it's also odd and occurs positively.

48
00:07:52,000 --> 00:08:18,000
All right, well now we can apply the formula and say that the set of permutations that have a 6, 0, 0, 4, and a 4, 2 is equal to the sum of the number that have a 6, 0, the number that have a 0, 4, and the number that have a 4, 2, minus the numbers that have two of the patterns, minus those that have all three patterns.

49
00:08:18,000 --> 00:08:43,000
Let's count these individual intersections and sets of permutations separately. It turns out that each one is easy to count, which is a typical situation, which is why inclusion exclusion is a valuable principle, because this thing that is harder to count can be broken up into counting a bunch of other things, intersections that are often easier to count, and they will be here.

50
00:08:44,000 --> 00:08:55,000
So let's begin by looking at P60. P60 is the set of permutations, which consist of which have a 6, 0 in them. Well to count them we can think about it this way.

51
00:08:55,000 --> 00:09:11,000
Think of the patterns with a 6, 0 in them as a permutation of nine items, the digits 1 through 5 and 7 through 9, and the object 6, 0 that you can place anywhere, but it's got to be lumped together.

52
00:09:11,000 --> 00:09:20,000
So there were really nine possible permutations of these things. Eight of them digits, and one of them is this pair of digits, 6, 0.

53
00:09:20,000 --> 00:09:30,000
And the number of those permutations is equal to the number of permutations with the pattern 6, 0. So the answer is there are nine factorial permutations with the pattern 6, 0.

54
00:09:30,000 --> 00:09:40,000
Same of course applies to P, 0, 4, and P, 4, 2. The number of permutations with a given to digit pattern is nine factorial.

55
00:09:40,000 --> 00:09:57,000
Okay, what about P60 intersection P42? Well you can think of this as the same way. You can think of this as saying, okay, I've got an object 6, 0, I've got an object 4, 2, and I've got the remaining digits 1, 3, 7, 8, 9 to permute.

56
00:09:57,000 --> 00:10:14,000
And the sequences of ten digits that contain both a 6, 0, and a 4, 2 correspond exactly to permutations of the digits 1, 3, 5, 7, 8, 9, and the object 4, 2, and the object 6, 0.

57
00:10:14,000 --> 00:10:31,000
Now there's eight of these things, and so the number of permutations of these eight things is eight factorial, which means the size of P60 intersection P42, the number of permutations of ten digits that have both a 6, 0, and a 4, 2 pattern is eight factorial.

58
00:10:31,000 --> 00:10:40,000
Now that's the case of an intersection where these two things don't overlap, let's look at the case of P60 intersection P04.

59
00:10:40,000 --> 00:11:09,000
Well, if it's got both a 6, 0, and a 0, 4, it actually is the same as having a 6, 0, 4. So the intersection of P60 and P04 is the set of sequences that have the pattern 6, 0, 4, and I count those in the same way, I say, okay, I've got an object 6, 0, 4, plus the remaining digits 1, 2, 3, 5, 7, 8, 9 for a total of eight objects and the number of permutations of the digits of the ten digits.

60
00:11:09,000 --> 00:11:19,000
So the number of permutations of the ten digits that have the pattern 604 corresponds to the number of permutations of these eight things, again, eight factorial.

61
00:11:19,000 --> 00:11:34,000
Okay, finally, how many permutations are there that have all three patterns, 6, 0, 0, 4, and 4, 2? That of course is exactly the same as the set of sequences with the single pattern 604 to the 4 digit pattern.

62
00:11:34,000 --> 00:11:48,000
And we count that by saying that it's the number of permutations of the digits other than 604 to 6 of them, plus the 604 to object, there are seven of these, and so there are seven factorial permutations that have all three patterns.

63
00:11:48,000 --> 00:12:01,000
So that means that I can go back to my inclusion exclusion formula for the patterns that have one of the sequences that have one of the three patterns, 6, 0, 0, 4, and 4, 2, and plug them in.

64
00:12:01,000 --> 00:12:17,000
So I get three nine factorials for the first sum of three terms. The intersections we all figured out, each of them were of size eight factorial, so I'm going to subtract three times eight factorial, and this last term we figured out was seven factorial.

65
00:12:17,000 --> 00:12:41,000
Well, I can think of three times nine factorial as nine times eight times three times seven factorial, and this is three times eight times seven factorial, and I wind up with seven two thousand seven hundred and twenty.

66
00:12:41,000 --> 00:12:57,000
That's how many permutations of the digits zero through nine, there are that have one or another of these three patterns, turns out that's about 27% of the 10 factorial permutations of zero through nine.

67
00:12:57,000 --> 00:13:09,000
So that's the significance of this of applying this disjunction of constraints, this union of having either 6, 0, 0, 4 or 4 to.

