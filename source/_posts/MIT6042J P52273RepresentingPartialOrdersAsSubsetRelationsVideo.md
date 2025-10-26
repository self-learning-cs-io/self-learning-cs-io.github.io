---
title: MIT6042J P52273RepresentingPartialOrdersAsSubsetRelationsVideo
---

1
00:00:00,000 --> 00:00:05,919
So we've seen that partial orders are a set of axioms that capture the positive path

2
00:00:05,919 --> 00:00:12,960
relation or the arbitrary path relation in directed acyclic graphs or dex, but

3
00:00:12,960 --> 00:00:16,600
there's still another way to understand these axioms that gives a kind of

4
00:00:16,600 --> 00:00:22,160
representation theorem for the kinds of mathematical objects that are partial

5
00:00:22,160 --> 00:00:27,320
orders and that every partial order looks like. So let's look at that example. I'm

6
00:00:27,320 --> 00:00:33,140
interested in the proper subset relation. A is a proper subset of B, which you

7
00:00:33,140 --> 00:00:38,299
remember means that B has everything in it that A has and something extra. So in

8
00:00:38,299 --> 00:00:42,579
particular, since B has something extra B is not a subset of A, certainly not a

9
00:00:42,579 --> 00:00:49,120
proper subset of A. So let's look at an example of that. Here are seven sets and

10
00:00:49,120 --> 00:00:53,659
the arrows indicate the proper subset relation or more precisely the positive

11
00:00:53,659 --> 00:00:59,939
path relation in this graph represents the proper subset relation where arrows

12
00:00:59,939 --> 00:01:04,840
are understood and understood to be pointing upwards. So I've left out the arrow

13
00:01:04,840 --> 00:01:09,099
heads. This is also known as a hasad diagram where the height is an

14
00:01:09,099 --> 00:01:14,140
indication of which way the arrows go. So if arrows are pointing up, this is

15
00:01:14,140 --> 00:01:18,140
telling me that for example this set of two elements one and five because there's

16
00:01:18,140 --> 00:01:23,340
a path up to the top set, the top set has everything that this lower set has

17
00:01:23,340 --> 00:01:28,460
namely the top set has one and five and it's got extra stuff. One, the set

18
00:01:28,460 --> 00:01:33,180
consisting of just one is a proper subset of one and five because the set has one

19
00:01:33,180 --> 00:01:37,540
in it but it has an extra thing five and also there's a path from one up to one

20
00:01:37,540 --> 00:01:42,659
two five ten because one two five ten has a one in it and extra stuff. So that's

21
00:01:42,659 --> 00:01:47,100
what the picture is illustrating the proper subset relation on this particular

22
00:01:47,100 --> 00:01:52,180
collection of seven sets. Now let's look at a very similar example of the

23
00:01:52,180 --> 00:01:57,220
proper divides relation on some numbers. So proper divides means a properly

24
00:01:57,220 --> 00:02:01,140
divides b if a divides b and it's not equal to b and I'm interested in the

25
00:02:01,140 --> 00:02:05,900
proper divides relation on this set of seven numbers one two three five ten

26
00:02:05,900 --> 00:02:14,140
fifteen and thirty and now there's a path from five to thirty because five is a

27
00:02:14,140 --> 00:02:18,180
divisor of thirty and it's not equal to thirty. It's a proper divisor of thirty and

28
00:02:18,180 --> 00:02:22,819
of course the point of this picture is to show that the proper divides

29
00:02:22,819 --> 00:02:28,980
relation on these seven numbers has exactly the same shape as the proper

30
00:02:28,980 --> 00:02:36,980
subset relation on those seven sets. So there's the seven sets and their proper

31
00:02:36,980 --> 00:02:41,980
subset relation shown by the picture followed by the proper divides relation on

32
00:02:41,979 --> 00:02:48,459
this set of seven numbers and the precise notion or sense in which these

33
00:02:48,459 --> 00:02:52,060
things have the same shape obviously they can be drawn and one superimposed on

34
00:02:52,060 --> 00:02:56,939
the other but abstractly what we care about with partial orders and digraphs in

35
00:02:56,939 --> 00:03:03,219
general is when things are isomorphic is the technical name for the same shape and

36
00:03:03,219 --> 00:03:07,179
isomorphic means that all we care about are the connections between

37
00:03:07,180 --> 00:03:12,620
corresponding vertices two graphs where the vertices correspond in a way that

38
00:03:12,620 --> 00:03:17,060
where there's a connection from between two vertices there's also a connection

39
00:03:17,060 --> 00:03:20,900
between the corresponding vertices or isomorphic and the precise definition of

40
00:03:20,900 --> 00:03:25,420
isomorphic is that the isomorphic when there's an edge preserving matching

41
00:03:25,420 --> 00:03:30,939
between their vertices matching means bijection and the formal definition is

42
00:03:30,939 --> 00:03:36,860
g1 is isomorphic to g2 if and only if there's a bijection from v1 the vertices of

43
00:03:36,860 --> 00:03:42,580
g1 to v2 the vertices of g2 with the property that if there's an edge between

44
00:03:42,580 --> 00:03:47,660
two vertices u and v in the first graph then there's an edge between the

45
00:03:47,660 --> 00:03:52,180
corresponding two vertices f of u and f of v in the second graph and that's an

46
00:03:52,180 --> 00:03:57,100
if and only if relation there's an edge between f of u and f of v if and only

47
00:03:57,100 --> 00:04:01,740
if there's an edge between u and v in the original graph that's the official

48
00:04:01,740 --> 00:04:08,219
definition of isomorphism for diagrams and the theorem that we illustrated with

49
00:04:08,219 --> 00:04:15,340
that example of proper divides and proper subset is that in fact every strict

50
00:04:15,340 --> 00:04:21,540
partial order is isomorphic to some collection of subsets partially ordered by

51
00:04:21,540 --> 00:04:25,379
less than so this is a kind of a representation theorem if you want to know

52
00:04:25,379 --> 00:04:32,899
what kinds of things are partial orders the answer is that a strict partial

53
00:04:32,899 --> 00:04:36,980
order is something that looks like a bunch of sets under containment it's

54
00:04:36,980 --> 00:04:42,740
isomorphic to a bunch of sets under containment and the proof actually of this is

55
00:04:42,740 --> 00:04:48,779
is quite straightforward what I'm going to do to to find an isomorphism is you give

56
00:04:48,779 --> 00:04:54,459
me your arbitrary partial strict partial order r and I'm going to map an

57
00:04:54,459 --> 00:04:58,539
element a in the domain of r to the set of all of the elements that are

58
00:04:58,539 --> 00:05:03,139
quote below it that is all of the elements that are related to r so a is

59
00:05:03,139 --> 00:05:08,339
going to map to the set of b's such that b r a or b is equal to a and that is

60
00:05:08,339 --> 00:05:13,139
added for a technical condition remember r is strict so a is not related to a

61
00:05:13,139 --> 00:05:17,620
under r but I want it to be in the set that map that a maps to so I'm throwing

62
00:05:17,620 --> 00:05:23,179
that in another way to say this is that the mapping f of a is equal to r

63
00:05:23,180 --> 00:05:29,420
inverse of a union a and let's just illustrate that by the example of the

64
00:05:29,420 --> 00:05:34,300
had he turned the divides relation into the subset relation well the smallest

65
00:05:34,300 --> 00:05:39,379
element in the divides proper divides example was this the number one and I'm

66
00:05:39,379 --> 00:05:43,100
going to map it to the set consisting of one which is all of the elements that

67
00:05:43,100 --> 00:05:49,899
properly divide one along with one and then I'm going to map the number three to

68
00:05:49,899 --> 00:05:54,620
all of the elements that properly divide three along with three and that is one

69
00:05:54,620 --> 00:05:59,099
in three five maps to one and five two maps to one and two and at the next

70
00:05:59,099 --> 00:06:05,019
level I'm going to map 15 to all of the numbers that properly divide 15 along

71
00:06:05,019 --> 00:06:12,620
with 15 so one three five and 15 are what the set the number 15 maps to that's

72
00:06:12,620 --> 00:06:19,299
a set and likewise 10 maps to one two five 15 and 30 maps to all of the numbers

73
00:06:19,699 --> 00:06:24,100
that are below it including itself and this is the general illustration of the way

74
00:06:24,100 --> 00:06:29,460
that you take an arbitrary strict partial order and map elements into sets which

75
00:06:29,460 --> 00:06:35,060
are basically their inverse images under the relation and the sets have exactly the

76
00:06:35,060 --> 00:06:40,900
same structure under proper containment as the relation so this is again a

77
00:06:40,900 --> 00:06:45,139
representation theorem that tells us that if we want to understand partial

78
00:06:45,139 --> 00:06:51,139
orders they are doing nothing more than talking about relations with the same

79
00:06:51,139 --> 00:06:59,539
structure as the proper subset relation on some collection of sets

