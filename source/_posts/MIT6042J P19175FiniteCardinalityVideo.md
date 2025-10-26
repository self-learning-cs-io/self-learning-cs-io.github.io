---
title: MIT6042J P19175FiniteCardinalityVideo
---

1
00:00:00,000 --> 00:00:13,040
So we're finally ready to tie up these ideas about mapping properties to counting properties.

2
00:00:13,040 --> 00:00:18,800
And let's begin with the remark that we already made that if there's a bijection from one set

3
00:00:18,800 --> 00:00:24,960
to another, if there's a bijection from a finite set A to a finite set B, then A and B

4
00:00:24,960 --> 00:00:29,920
have the same size. By the way, those vertical bars absolute value of A when it's a set

5
00:00:29,920 --> 00:00:35,760
refers us to the size of the set for finite sets. So if it means if A has an element, then the

6
00:00:36,960 --> 00:00:44,640
absolute value of A is n. Okay, let's use this bijection idea immediately. Here's a nice example.

7
00:00:44,640 --> 00:00:51,280
Suppose you want to figure out how many subsets are there of a finite set A and suppose you didn't

8
00:00:51,280 --> 00:00:56,000
know yet. Alright, so what we're asking about is what's the size of the power set of A? Remember,

9
00:00:56,000 --> 00:01:02,480
the power set of A is all of the possible subsets of the set A. Well, suppose A has three elements.

10
00:01:02,480 --> 00:01:09,439
What is the power set of A look like? If capital A has elements, little ABC, it's a set of size three,

11
00:01:09,439 --> 00:01:16,879
then the power set of A is going to have one subset with no elements, three subsets with one

12
00:01:16,879 --> 00:01:22,399
element. They're listed there. It's going to have three more subsets with two elements and one

13
00:01:22,399 --> 00:01:29,439
subset with three elements for a total of A subsets in the power set of A.

14
00:01:31,840 --> 00:01:37,280
So let's see what the counting argument in general would be. So suppose that A has n elements

15
00:01:37,280 --> 00:01:42,239
and will number them from A0 up through An minus 1 because computer scientists usually zero

16
00:01:42,239 --> 00:01:51,039
origin index. So A is a set of n elements indicated there. Suppose I have some arbitrary subset of A.

17
00:01:51,039 --> 00:01:57,439
Let's suppose that it has A0, then there's no A1. That's what the space is for. It has A2, it has A3.

18
00:01:57,439 --> 00:02:03,759
It doesn't have A4, then it goes on for a while in some uncertain way and it actually has the last

19
00:02:03,760 --> 00:02:12,159
element A and minus 1 in it. Well, I can take the subset like this and have it correspond to a bit

20
00:02:12,159 --> 00:02:18,879
string where I put a 1 where the element is there in the subset and a 0 where the element is not

21
00:02:18,879 --> 00:02:25,520
there in the subset. So there's a 1 because A0 is in the subset followed by a 0 because A1 is not

22
00:02:25,520 --> 00:02:31,840
in the subset followed by two ones because A2 and A3 are in the subset followed by a 0 because A4 is not

23
00:02:31,840 --> 00:02:40,159
and so on ending with a 1 because An minus 1 is in the subset. So in short the bit string the

24
00:02:40,159 --> 00:02:52,480
kth bit in the string is 1 if and only if a sub k is in the set. Now this clearly defines a

25
00:02:52,480 --> 00:02:58,480
byte to every element of B. That's what surjective means. So here's this function from A to B. That

26
00:02:58,479 --> 00:03:05,919
means less than or equal to 1 arrow out and that means that there have to be more elements in A

27
00:03:05,919 --> 00:03:12,000
than there are arrows since there's at most one arrow out of every element of A and that accounts for

28
00:03:12,000 --> 00:03:18,239
all the arrows. So the size of A has to be greater than or equal to the number of arrows when you have a

29
00:03:18,240 --> 00:03:28,400
appartial function. When it's a surjection that means that there's an arrow coming into every

30
00:03:28,400 --> 00:03:35,760
element of B. That means that there have to be at least as many arrows as there are in B because

31
00:03:35,760 --> 00:03:41,040
everything in B has at least one arrow coming in. So if you look at these two pieces the size of A

32
00:03:41,040 --> 00:03:46,640
has to be greater than or equal to the number of arrows and the size of B has to be less than or equal

33
00:03:46,639 --> 00:03:51,599
to the number of arrows putting them together. We have the mapping rule for surjections. If I have a

34
00:03:51,599 --> 00:03:57,919
surjective function from A to B it means the size of A is greater than or equal to the size of B

35
00:03:57,919 --> 00:04:04,239
for finite A and B. Well the same argument goes for injections. With an injection I have less than

36
00:04:04,239 --> 00:04:14,000
or equal to one arrow in and what does that tell me? Well if it's total then there's at least one

37
00:04:14,000 --> 00:04:21,040
arrow out of everything and that means that the size of A has to be less than or equal to the number

38
00:04:21,040 --> 00:04:27,680
of arrows because every element in A contributes an arrow may be more than one. Okay if it's an injection

39
00:04:27,680 --> 00:04:34,560
there's less than or equal to one arrow coming into each element of B. That means that B had better

40
00:04:34,560 --> 00:04:40,319
be big enough to catch all the arrows so the number of arrows has to be less than or equal to the

41
00:04:40,319 --> 00:04:46,639
size of B. Put those two inequalities together and you find that if you have a total injective

42
00:04:46,639 --> 00:04:53,920
relation from A to B that implies that the size of A is less than or equal to the size of B for finite

43
00:04:53,920 --> 00:04:59,439
A and B. The statement here that it's a total injective relation is for generality but the truth

44
00:04:59,439 --> 00:05:04,719
is whenever there's a total injective relation there's also a total injective function I'll leave

45
00:05:04,720 --> 00:05:13,760
that to a class exercise to work out. So to summarize what we can do is characterize these kinds of

46
00:05:15,120 --> 00:05:22,720
injection relations between sets so let's define A by B so this is going to be a binary relation

47
00:05:22,720 --> 00:05:28,960
between two sets A and B and its meaning is that there's a bijection from A to B so the definition of

48
00:05:28,959 --> 00:05:37,120
biage is a binary relation where the domain and the codomain are the class of finite sets or all

49
00:05:37,120 --> 00:05:46,879
sets for that matter. Surge B, A surge B means that there is a surjective function from A to B.

50
00:05:46,879 --> 00:05:54,799
Again surge is a binary relation between sets and finally A inj B says there's a total injection

51
00:05:55,360 --> 00:06:03,199
relation from A to B so we have those three relations between sets and what we've just shown is that

52
00:06:03,199 --> 00:06:09,680
if there's a bijection between A and B that's true implies that the size of A is equal to the size

53
00:06:09,680 --> 00:06:14,319
of B and in fact it's not hard to prove the converse if the size of A and the size of B are the same

54
00:06:15,199 --> 00:06:23,120
then it's easy enough to find a bijection between them. Similarly if there's a surjection from A to B

55
00:06:23,120 --> 00:06:29,040
that's true if and only if the size of A is greater than or equal to the size of B and if there's

56
00:06:29,040 --> 00:06:35,280
an injection from A to B that's true if and only if the size of A is less than or equal to the size

57
00:06:35,280 --> 00:06:44,800
of B. So the existence of these kinds of relations between sets is a handle on their relative sizes

58
00:06:46,319 --> 00:06:51,120
and this applies for finite sets A and B because we don't really know what the size of infinite

59
00:06:51,120 --> 00:06:55,439
sets are so it would make sense to talk about the mapping lemma for infinite sets.

60
00:06:57,680 --> 00:07:03,519
However we can ask some questions about infinite sets so one natural question to ask is let's

61
00:07:03,519 --> 00:07:07,920
look at some finite properties if the size of A and B are the same and the size of B and C are

62
00:07:07,920 --> 00:07:14,560
the same obviously the size of A and C are the same and that corresponds directly to an assertion

63
00:07:14,560 --> 00:07:20,240
about biject because the size of A equals the size of B for finite sets is the same as A biject B

64
00:07:20,240 --> 00:07:27,120
so what this says is that if A biject B and B biject C then A biject C if there's a bijection

65
00:07:27,120 --> 00:07:31,439
from A to B and a bijection from B to C then there's a bijection from A to C.

66
00:07:33,199 --> 00:07:38,879
Corresponding property for finite sets again is greater than or equal to if A is greater than or

67
00:07:38,879 --> 00:07:42,639
equal to B greater than or equal to C then A is the size of A is greater than or equal to the size

68
00:07:42,639 --> 00:07:49,519
of C and now it correspond to a similar statement about the surjection relation A surge B B surge C

69
00:07:49,519 --> 00:07:56,159
implies A surge C and finally more interesting one is that if A and B are each greater than or equal

70
00:07:56,159 --> 00:08:01,680
to each other if A is greater than or equal to B and B the size of B is greater than or equal to A

71
00:08:01,680 --> 00:08:08,399
then in fact they're the same size A is equal to B now it correspond to the following statement

72
00:08:08,399 --> 00:08:16,079
in terms of objections if A surge B and B surge A then A biject B now all of these facts follow

73
00:08:16,079 --> 00:08:23,120
immediately for finite sets A and B but we're going to be interested in whether they hold for

74
00:08:23,120 --> 00:08:26,560
infinite sets so they follow immediately for finite sets from the mapping lemma because the

75
00:08:26,560 --> 00:08:31,360
mapping lemma says that these biject and surge relations are the same as equal and greater than or

76
00:08:31,360 --> 00:08:41,199
equal to size so again this is immediate from the mapping lemma but now I can ask whether or

77
00:08:41,200 --> 00:08:47,759
not these same properties hold for infinite sets it's an exercise in reasoning about properties

78
00:08:47,759 --> 00:08:56,080
of mappings and relations and the answer is that the first two claims go through easily if you're

79
00:08:56,080 --> 00:09:01,200
trying to prove them for finite sets for infinite sets the basic idea let's look at the first one

80
00:09:01,200 --> 00:09:06,240
says that if A if there's a bijection from A to B and there's a bijection from B to C then there

81
00:09:06,240 --> 00:09:12,000
would be one from A to C how do you find it well it's actually easy you just compose the bijection

82
00:09:12,000 --> 00:09:18,879
from A to B with the bijection from B to C and it's a very easy exercise that the composition of

83
00:09:18,879 --> 00:09:24,960
bijections is a bijection likewise the composition of surgections is a surgection and that proves the

84
00:09:24,960 --> 00:09:32,639
second claim easily but the third claim is much more interesting and is not obvious it's called the

85
00:09:32,639 --> 00:09:45,600
Schroder Bernstein theorem and it will come up a little bit in a few more lectures

