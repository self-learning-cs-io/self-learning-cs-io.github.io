---
title: MIT6042J P51271PartialOrdersVideo
---

1
00:00:00,000 --> 00:00:03,500
Partial orders are another way to talk about

2
00:00:03,500 --> 00:00:08,000
diagrams and they offer to us an interesting

3
00:00:08,000 --> 00:00:11,500
lesson in the idea of axiomatizing

4
00:00:11,500 --> 00:00:14,000
a mathematical structure and mathematical ideas.

5
00:00:14,000 --> 00:00:17,500
So let's begin by discussing some of the

6
00:00:17,500 --> 00:00:19,000
properties that we're going to use to

7
00:00:19,000 --> 00:00:21,000
axiomatize partial orders and diagrams.

8
00:00:21,000 --> 00:00:23,000
So if we think about walks in a

9
00:00:23,000 --> 00:00:25,500
diagram, the basic property of walks is that

10
00:00:25,500 --> 00:00:28,500
if you have a walk from U to V and you have

11
00:00:28,500 --> 00:00:31,000
a walk from V to W, then you put the two

12
00:00:31,000 --> 00:00:33,000
walks together and you wind up with a walk

13
00:00:33,000 --> 00:00:35,000
from U to W.

14
00:00:35,000 --> 00:00:39,000
Expressed in terms of the positive walk

15
00:00:39,000 --> 00:00:42,000
relation in G, what this is saying is that

16
00:00:42,000 --> 00:00:47,500
if U, G plus V and V, G plus W, then U, G plus

17
00:00:47,500 --> 00:00:50,500
W. And that abstract property, which I'm

18
00:00:50,500 --> 00:00:53,500
highlighting with the magenta box, when you

19
00:00:53,500 --> 00:00:55,500
apply it to an arbitrary relation is called

20
00:00:55,500 --> 00:00:57,500
the transitivity property.

21
00:00:57,500 --> 00:01:01,500
So a relation R on a set that is R is

22
00:01:01,500 --> 00:01:04,000
relating the domain of code domain of R

23
00:01:04,000 --> 00:01:08,000
the same is that U, R, V and V, R, W,

24
00:01:08,000 --> 00:01:12,000
implies U, R, W. And a relation that has

25
00:01:12,000 --> 00:01:14,500
that property is said to be transitive.

26
00:01:14,500 --> 00:01:16,500
And of course what we've just seen is that the

27
00:01:16,500 --> 00:01:21,500
positive path relation of any graph G is transitive.

28
00:01:21,500 --> 00:01:25,500
Another way to say transitivity is to read U, R, V is

29
00:01:25,500 --> 00:01:28,500
saying there's an edge from U to V. And what this

30
00:01:28,500 --> 00:01:31,000
says is that if there's an edge from U to V, and an

31
00:01:31,000 --> 00:01:35,500
edge from V to W, there's an edge from U to W.

32
00:01:35,500 --> 00:01:38,000
Or in other words, if there's a path of length 2,

33
00:01:38,000 --> 00:01:41,500
there's a path of length 1. And then by easy

34
00:01:41,500 --> 00:01:43,500
induction, it follows that if there's a path of

35
00:01:43,500 --> 00:01:46,500
any length between, of any positive length between

36
00:01:46,500 --> 00:01:49,500
two vertices, then in fact there's a path of

37
00:01:49,500 --> 00:01:53,500
length 1 that is an edge between them.

38
00:01:53,500 --> 00:01:58,500
Okay, so the basic theorem that we have to begin

39
00:01:58,500 --> 00:02:02,500
with is what is transitivity capturing as a property of a

40
00:02:02,500 --> 00:02:06,500
relation, and a relation R is transitive, if and only

41
00:02:06,500 --> 00:02:11,500
if in fact R is equal to the positive walk relation for

42
00:02:11,500 --> 00:02:15,500
some graph G. The proof of this is basically trivial

43
00:02:15,500 --> 00:02:18,500
because you can let the relation R be the

44
00:02:18,500 --> 00:02:23,500
diagram that it's the positive path relation of.

45
00:02:23,500 --> 00:02:29,500
If we look now at directed a cyclic graphs, then what we

46
00:02:29,500 --> 00:02:34,500
have is that if there's a positive length path from a vertex U

47
00:02:34,500 --> 00:02:39,500
to a vertex V, then since there's no cycles in a

48
00:02:39,500 --> 00:02:44,500
directed a cyclic graph, there can't be a path back from V to U.

49
00:02:45,500 --> 00:02:49,500
And that property is called asymmetry.

50
00:02:49,500 --> 00:02:54,500
So D plus, which is the positive path relation, in a

51
00:02:54,500 --> 00:02:59,500
dag has this asymmetry property, namely if you can get

52
00:02:59,500 --> 00:03:04,500
to V by a positive length path, then it's not possible for V to

53
00:03:04,500 --> 00:03:09,500
get back to U by a positive length path. So abstracted U

54
00:03:09,500 --> 00:03:13,500
R V implies not V R U, that's the asymmetry property of an

55
00:03:14,500 --> 00:03:20,500
arbitrary relation R, and by definition of a cyclic D plus

56
00:03:20,500 --> 00:03:26,500
is asymmetric in a graph without cycles.

57
00:03:26,500 --> 00:03:33,500
A strict partial order is simply a relation that has

58
00:03:33,500 --> 00:03:37,500
these two properties of being transitive in asymmetric.

59
00:03:37,500 --> 00:03:42,500
And some examples of strict partial orders are the proper

60
00:03:42,500 --> 00:03:46,500
containment relation on sets, which we've previously commented can be

61
00:03:46,500 --> 00:03:51,500
viewed as a dag, but now it satisfies transitivity.

62
00:03:51,500 --> 00:03:55,500
And the fact that if one sets properly contained in another,

63
00:03:55,500 --> 00:03:58,500
the second one can't be properly contained in the first,

64
00:03:58,500 --> 00:04:00,500
because proper means you have something extra.

65
00:04:00,500 --> 00:04:04,500
The indirect prerequisite relation on MIT subjects would be another

66
00:04:04,500 --> 00:04:08,500
example of a strict prerequisite. If I'm a prerequisite of U,

67
00:04:08,500 --> 00:04:13,500
you can't be a prerequisite of me. And finally, the less than

68
00:04:13,500 --> 00:04:17,500
relation on real numbers, these are all examples of strict partial

69
00:04:17,500 --> 00:04:22,500
orders. And putting together the previous reasoning, what we can say is that

70
00:04:22,500 --> 00:04:28,500
a relation R is a strict partial order, if and only if R is the

71
00:04:28,500 --> 00:04:35,500
positive path relation for some D. So the axioms that define strict

72
00:04:35,500 --> 00:04:40,500
partial order, namely transitivity in asymmetry, can be said to

73
00:04:40,500 --> 00:04:46,500
abstractly capture the property of a relation that it comes from a dag.

74
00:04:46,500 --> 00:04:57,500
Another important property of partial orders is the idea of being path total or linear as some

75
00:04:57,500 --> 00:05:01,500
authors correlate. And the simple definition of path total is that given

76
00:05:02,500 --> 00:05:06,500
any two elements, one is going to be bigger than the other with respect to the

77
00:05:06,500 --> 00:05:10,500
relation. The most familiar example of that would be the less than relation of the

78
00:05:10,500 --> 00:05:14,500
less than or equal to relation on the reals, given any two distinct real

79
00:05:14,500 --> 00:05:17,500
numbers x and y, either x is less than y or y is less than x.

80
00:05:17,500 --> 00:05:24,500
And we take that property for granted. Now, the formal definition then is simply

81
00:05:24,500 --> 00:05:30,500
that if x is not equal to y, then either xR, y or yRx, and relation R that has

82
00:05:30,500 --> 00:05:35,500
that property is called path total. Another way to say it is that there are

83
00:05:35,500 --> 00:05:42,500
no incomparable elements under R. And I've again highlighted with a magenta box

84
00:05:42,500 --> 00:05:49,500
this property, which is called path totality. What another way to say that path

85
00:05:49,500 --> 00:05:54,500
total is that the whole order looks like a chain. If you give me a bunch of

86
00:05:54,500 --> 00:05:57,500
elements, there's going to have to be a biggest one and then it's next biggest

87
00:05:57,500 --> 00:06:01,500
one and so on, assuming you give me any finite set of elements. So the basic

88
00:06:01,500 --> 00:06:07,500
example, again, of path total would be number properties of bigger than. And a

89
00:06:07,500 --> 00:06:12,500
basic example of something that would typically not be path total would be, let's

90
00:06:12,500 --> 00:06:17,500
say, subset containment, where you can perfectly well have two sets, neither

91
00:06:17,500 --> 00:06:22,500
of which is contained in the other.

92
00:06:22,500 --> 00:06:33,500
So a weak partial order is a small variation of a strict partial order that is

93
00:06:33,500 --> 00:06:39,500
another familiar concept where we take the strict property, which guarantees that

94
00:06:39,500 --> 00:06:46,500
nothing's related to itself, and we relax it. So a strict partial order is just

95
00:06:46,500 --> 00:06:50,500
like a weak partial order, except that the condition that there's no positive

96
00:06:50,500 --> 00:06:57,500
length path between an element and itself is relaxed. So in fact, it's not only

97
00:06:57,500 --> 00:07:03,500
relaxed, but it's completely denied. In a weak partial order, we insist that every

98
00:07:03,500 --> 00:07:10,500
element is related to itself. An example of that would be the less than or equal

99
00:07:10,500 --> 00:07:15,500
to relation, sorry, the improper containment relation, the ordinary subset

100
00:07:16,500 --> 00:07:21,500
relation on sets, where now a is a subset with a bar under it, a is just a

101
00:07:21,500 --> 00:07:26,500
subset of a, not necessarily a strict subset or a proper subset, means that in fact

102
00:07:26,500 --> 00:07:31,500
a is a subset of a. And then less than or equal to when you put the little bar under

103
00:07:31,500 --> 00:07:36,500
the less than sign to indicate that equality is also a possibility, you get a

104
00:07:36,500 --> 00:07:41,500
weak partial order on the real numbers. So the property that distinguishes the

105
00:07:41,500 --> 00:07:46,500
weak from the strict is this property of reflexivity. A relation R on a set is

106
00:07:46,500 --> 00:07:53,500
reflexive if every element is related to itself, if and only if ARA for all

107
00:07:53,500 --> 00:08:00,500
little A in the domain capital A. And what we can observe immediately is that the

108
00:08:00,500 --> 00:08:07,500
path of the walk relation, G-star, which includes walks of length 0, is reflexive

109
00:08:07,500 --> 00:08:14,500
because by definition there is a length 0 walk from any vertex to itself.

110
00:08:14,500 --> 00:08:21,500
So if you're going to play with axioms, then you can reformulate asymmetry, the

111
00:08:21,500 --> 00:08:26,500
idea of asymmetry except for elements being related to themselves, it is just

112
00:08:26,500 --> 00:08:31,500
called anti-symmetry. And it says that a relation R is anti-symmetric if and only

113
00:08:31,500 --> 00:08:38,500
if it's asymmetric except for the ARA case and more precisely the difference between

114
00:08:38,500 --> 00:08:46,500
asymmetry and anti-symmetry is that in A symmetry, ARA is never allowed and

115
00:08:46,500 --> 00:08:55,500
in anti-symmetry, ARA is a possibility, it's not disallowed. So an anti-symmetric

116
00:08:55,500 --> 00:09:05,500
relation on R, abstractly is that URV implies not V-RU for U not equal to V.

117
00:09:05,500 --> 00:09:11,500
So the first line is exactly the statement of asymmetry and then I add this

118
00:09:11,500 --> 00:09:16,500
proviso that it only has to hold when the U and the V are not equal. That's the formal

119
00:09:16,500 --> 00:09:24,500
way of saying anti-symmetry is the same as A symmetry except for ARA. And the

120
00:09:24,500 --> 00:09:34,500
walk relation in a die graph which includes length zero walks is anti-symmetric.

121
00:09:34,500 --> 00:09:37,500
So a weak partial order is just what you get when you put these things together.

122
00:09:37,500 --> 00:09:43,500
A weak partial order is transitive, anti-symmetric and reflexive. So in a weak

123
00:09:43,500 --> 00:09:48,500
partial order, we insist that every element be related to itself. So there's

124
00:09:48,500 --> 00:09:52,500
it, just a quick remark. A symmetric means implies nothing's related to

125
00:09:52,500 --> 00:09:58,500
itself. Reflexive implies everything is related to itself. And it's possible that

126
00:09:58,500 --> 00:10:02,500
there'd be some graph that in which some elements are related to themselves and

127
00:10:02,500 --> 00:10:07,500
some not, that would be something that was neither a strict nor a weak partial

128
00:10:07,500 --> 00:10:12,500
order. It would just be transitive and anti-symmetric. Those don't come up much and

129
00:10:12,500 --> 00:10:18,500
so we don't bother to give them a name or talk about them. And finally, the

130
00:10:18,500 --> 00:10:24,500
theorem that summarizes up this whole story is that R is a weak partial order if

131
00:10:24,500 --> 00:10:31,500
and only if R is equal to the walk relation for some dag including length zero

132
00:10:31,500 --> 00:10:33,500
walks.

