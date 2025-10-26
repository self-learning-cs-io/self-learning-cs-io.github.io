---
title: MIT6042J P91431IndependenceVideo
---

1
00:00:00,000 --> 00:00:06,320
Independent events are events that have nothing to do with each other and needless to say it's a lot easier to work with them

2
00:00:06,320 --> 00:00:13,120
when, because you don't have to figure out some weird interaction between two events that do have something to do with each other.

3
00:00:13,120 --> 00:00:21,440
Typical case where independent events come up is for example you toss a coin five times and then you're about to toss a coin the sixth time

4
00:00:21,440 --> 00:00:27,519
is there any reason to think that what the coins did the first five times is going to have any influence on the flip of the sixth

5
00:00:27,519 --> 00:00:36,960
court of the coin for the sixth time well it's reasonable to assume not which is to say that the outcome of the sixth toss is

6
00:00:37,840 --> 00:00:48,799
arguably independent of the outcome of all the previous tosses. Okay let's look at a formal definition now in this short video of just what is the

7
00:00:48,799 --> 00:00:55,920
technical definition of independent events. So what we said is that they're independent if they have nothing to do with each other.

8
00:00:55,920 --> 00:01:08,480
What that means is that if I tell you that B happened it doesn't have any effect on the probability of A that is the probability of A given that B happened doesn't change the probability of A at all.

9
00:01:09,040 --> 00:01:23,120
That's it. Now this is one definition maybe this is the more intuitive definition but another definition that's equivalent and his standard is the two events are equivalent if the product of their probabilities is equal to the probability that they both happen.

10
00:01:23,120 --> 00:01:41,920
That is the probability of their intersection. Now definition one and definition two are trivial equivalent just using the definition of conditional probability and if you don't see that this would be a moment to stop get a pencil and paper and write down the three line proof of the equivalence of these two

11
00:01:41,920 --> 00:01:51,480
equalities in fact the three line proof has this is the first line and that is the second line so you could argue it's really just a middle line that you're adding. Okay.

12
00:01:52,000 --> 00:02:10,480
The definition two has the slight advantage that it always works whereas definition one implicitly requires that the divisor remember probability of A given B is defined as the probability of the intersection divided by the probability B is only defined if the probability of B is positive.

13
00:02:10,479 --> 00:02:19,839
Whereas the second definition always works and we don't have to put a proviso in about the probability of B being non zero so that's the definition of independence.

14
00:02:22,439 --> 00:02:39,199
Looking at this definition what you can see immediately is that it's completely symmetric in A and B since multiplication is commutative and intersection is commutative which is A in which speed doesn't matter and what that implies then is that A is independent of B if and only if B is independent of A.

15
00:02:41,359 --> 00:02:58,439
Now another fact that holds is that if the probability of B happens to be zero then vacuously B is independent of everything even itself which isn't important but is a small technicality that's worth remembering by that definition.

16
00:02:59,439 --> 00:03:18,439
Now again the intuitive idea that A and B have nothing to do with each other is that A is independent of B means that A is independent of whether or not B occurs that is to say if A is independent of B or to be independent of the complement of B and that's a lemma that's also easily proved.

17
00:03:18,439 --> 00:03:34,439
A is independent of B if and only if A is independent of the complement of B it's a simple proof using the difference rule and again I encourage you to stop and with a piece of paper and pencil and convince yourself that that follows with a one line proof.

