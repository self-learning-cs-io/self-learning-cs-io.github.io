---
title: MIT6042J P83354Inclusion Exclusion2SetsVideo
---

1
00:00:00,000 --> 00:00:09,599
The arguments that we just reviewed for proving inclusion exclusion by looking at how many times points are counted can be made perfectly rigorous.

2
00:00:09,599 --> 00:00:11,599
In fact, we'll do that in a later segment.

3
00:00:11,599 --> 00:00:22,400
But it's interesting and good practice to realize that they can also be proved just from some simple set theoretic identities using the ordinary disjoint some rule.

4
00:00:22,399 --> 00:00:36,000
So how am I going to prove the inclusion exclusion principle for two sets, A union B is the size of A union B is the size of A plus the size of B minus the size of A intersection B.

5
00:00:36,000 --> 00:00:47,599
And the idea is just break up on A union B into disjoint sets because once they're disjoint sets, I can add up their sizes.

6
00:00:47,600 --> 00:01:00,000
So if we look at A union B, A union B can be expressed as the union of two disjoint sets namely A, the round blue circle.

7
00:01:00,000 --> 00:01:07,200
And what's left, the points in B that are not in A, so this lighter orange colored region.

8
00:01:07,200 --> 00:01:14,000
So A and B union and B minus A. So these are the points in A and these are the points that are in B that are not in A.

9
00:01:14,000 --> 00:01:26,799
Our two disjoint sets whose union is A union B. That means that I know the size of this, it's just the size of A plus the size of B minus A because they're disjoint.

10
00:01:26,799 --> 00:01:35,599
So we conclude by the sum rule that the size of A union B is equal to the size of A plus the size of B minus A.

11
00:01:35,599 --> 00:01:45,359
So now I need a little lemma that says that the size of B minus A is the size of B minus the size of A intersection B.

12
00:01:45,359 --> 00:01:52,399
If I get that, then I've proved inclusion exclusion because now I have A plus B minus A intersection B.

13
00:01:52,399 --> 00:02:01,039
So we need a lemma. The lemma says that the size of B minus A is equal to the size of B minus the size of A intersection B.

14
00:02:01,040 --> 00:02:16,000
So you're back to the Venn diagram. A is blue, B is reddish, and the intersection region that the lens shaped region is shown in purple.

15
00:02:16,000 --> 00:02:28,719
And we want to prove this lemma. Well again, what we can do is look at the set B broken up into two pieces.

16
00:02:29,599 --> 00:02:37,680
B can be expressed as a disjoint union of the part of B that's in A union, the part of B that's not in A.

17
00:02:37,680 --> 00:02:46,639
That is for any set B and any set A, B is equal to the B points that are in A and the B points that are not in A.

18
00:02:46,639 --> 00:02:50,000
It covers all the cases. And this again is a disjoint union.

19
00:02:50,000 --> 00:03:00,000
So we conclude immediately that from the sum rule that the size of B is equal to the size of B intersection A plus the size of B minus A.

20
00:03:00,000 --> 00:03:05,680
And then just transposing this term for the size of B minus A to the left hand side of the equality.

21
00:03:05,680 --> 00:03:08,159
I've proven the lemma and we're done.

22
00:03:10,479 --> 00:03:16,879
Now inclusion exclusion for three sets. We've said before it's this slightly more complicated thing where you've got a sum of the

23
00:03:17,840 --> 00:03:22,159
of the intersections of one set minus the size of the

24
00:03:23,280 --> 00:03:28,319
sizes of the intersections of two sets plus the size of the intersection of three sets.

25
00:03:28,960 --> 00:03:32,560
And that generalizes to the following somewhat

26
00:03:33,759 --> 00:03:41,039
messy formula, but let's look at it closely together. If I want to know what's the size of A one through A N.

27
00:03:41,039 --> 00:03:45,439
If I have N sets potentially overlapping A one A two through A N.

28
00:03:45,439 --> 00:03:53,120
And I want their union. And I can express the union of the in terms of a sum of sizes of intersections.

29
00:03:53,120 --> 00:03:57,599
And here's the formula. Let's read this slowly together.

30
00:03:58,240 --> 00:04:05,039
So this is a sum over every possible subset of the indices one through N. That's not empty.

31
00:04:05,680 --> 00:04:15,360
So this sum is ranging over S. And it can do it in any order. It's typical to write the the sum where you sum up first all the sets of size S of size one.

32
00:04:15,439 --> 00:04:19,680
And then sum up all the sets S of size two and so on. But that's not necessary.

33
00:04:20,480 --> 00:04:24,079
We just sum in any order for every subset of the indices.

34
00:04:24,639 --> 00:04:31,519
The intersection of the size of the intersection of the AIs that are in the set of indices specified by S.

35
00:04:32,000 --> 00:04:43,920
So this is just the intersection of those A's that S specifies. Now what's the the sign of that of that size of intersection.

36
00:04:43,920 --> 00:04:48,240
As we said, if it's of odd size, I want it to count positively.

37
00:04:48,240 --> 00:04:55,840
So if I take minus one to the odd size plus one, I get an even power of minus one.

38
00:04:55,840 --> 00:05:01,040
So it comes out to be one. If on the other hand, the size of S is even.

39
00:05:01,040 --> 00:05:04,240
So I'm taking an intersection of an even number of sets.

40
00:05:04,240 --> 00:05:08,960
Then this number to the plus one is odd. I'm taking minus one to an odd power.

41
00:05:08,959 --> 00:05:14,799
I'm sure enough I'm getting the negative sign on all the intersections of odd size.

42
00:05:15,359 --> 00:05:17,680
So that's what this rather concise.

43
00:05:18,560 --> 00:05:25,359
But Harry formula looks like. Here we have an intersection over the AIs where the i is specified

44
00:05:25,359 --> 00:05:32,560
by the set S of indices. And I sum up these terms over every possible non-empty set S.

45
00:05:32,560 --> 00:05:37,279
That is the generalized form of inclusion exclusion for n sets.

46
00:05:38,239 --> 00:05:41,679
All right. Now how do we prove this? Well, there's lots of ways to prove it.

47
00:05:42,559 --> 00:05:46,159
The simplest way is to do it actually by induction. It's not very hard to do by induction.

48
00:05:46,799 --> 00:05:53,279
You just use the two set version of inclusion exclusion, which we've proved rigorously using

49
00:05:53,279 --> 00:06:00,239
the disjoint sum rule. And you go from the union of the first n sets plus the nth and apply the

50
00:06:00,239 --> 00:06:04,159
formula and simplify. That works fine. The other problem with it is not really very informative.

51
00:06:04,160 --> 00:06:08,080
You prove the theorem all right as is frequently the case with induction proofs.

52
00:06:08,960 --> 00:06:12,880
You have the right induction hypothesis. The proof is kind of mechanical, but you don't really

53
00:06:12,880 --> 00:06:18,560
learn much from it. Not always, but in this case, I don't think you do. A second way to do it is

54
00:06:18,560 --> 00:06:24,480
by using the binomial theorem and counting. This is a way to make rigorous the argument that said,

55
00:06:24,480 --> 00:06:31,200
okay, we counted the intersection of two points in the intersection of two things twice. So

56
00:06:31,199 --> 00:06:35,199
we had to subtract them away. And then that meant that we were not counting the things that were

57
00:06:35,199 --> 00:06:40,959
in the intersection of three, not at all, and so on. And we've talked through that argument informally.

58
00:06:40,959 --> 00:06:46,240
And I will do that in a next segment of making that argument a little bit more precise to prove

59
00:06:46,240 --> 00:06:48,079
the general theorem. And

60
00:06:52,319 --> 00:06:58,719
flow off from algebra. We can just look at a product of sums and understand how it expands into a

61
00:06:58,720 --> 00:07:05,600
sum of products by the distributivity law. And that's worked out in a problem that is in the text.

62
00:07:05,600 --> 00:07:09,600
And I'm not going to do that in a video.

