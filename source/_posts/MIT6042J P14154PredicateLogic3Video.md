---
title: MIT6042J P14154PredicateLogic3Video
---

1
00:00:00,000 --> 00:00:10,880
In this final segment on predical logic, there are two issues that I'm going to talk about.

2
00:00:10,880 --> 00:00:19,519
The first is some problems with translating AE quantifiers and EA quantifiers into English.

3
00:00:19,519 --> 00:00:25,960
Rather from English into logic, we've seen examples in class that English is ambiguous

4
00:00:25,960 --> 00:00:31,320
and I want to show you two that are, I think, interesting and provocative, just as a warning

5
00:00:31,320 --> 00:00:35,840
that translations not always routine.

6
00:00:35,840 --> 00:00:42,880
And then the second topic is an optional one just to kind of make some comments about

7
00:00:42,880 --> 00:00:49,480
the amazing results in metamathematics, the mathematics of mathematics, or precisely

8
00:00:49,479 --> 00:00:55,759
the mathematics of mathematical logic and two fundamental theorems about properties

9
00:00:55,759 --> 00:01:00,359
of predicate calculus which go beyond this class and are optional.

10
00:01:00,359 --> 00:01:06,840
I would suggest it's worth listening to the AE in English example and if you want to

11
00:01:06,840 --> 00:01:11,679
skip the short discussion of the metatheorimps, that's fine because it's never going to come

12
00:01:11,679 --> 00:01:14,599
up again in this class.

13
00:01:14,599 --> 00:01:23,719
Okay, so let's look at this phrase in English where the poet says, all that glitters is not gold.

14
00:01:23,719 --> 00:01:31,359
Well a literal translation of that would be that if we let G be glitters and I can't

15
00:01:31,359 --> 00:01:39,039
use G again so we'll say AU is gold, then this translated literally would say for every

16
00:01:39,040 --> 00:01:47,680
x, G of x if x is gold implies that not gold of x.

17
00:01:47,680 --> 00:01:52,480
Alright, so is that a sensible translation?

18
00:01:52,480 --> 00:01:59,760
Well it's clearly false because gold glitters like gold and you can't say that gold is

19
00:01:59,760 --> 00:02:00,960
not gold.

20
00:02:00,960 --> 00:02:05,480
So this is not what's meant, it's not a good translation, it doesn't make sense.

21
00:02:05,880 --> 00:02:07,719
Well what is meant?

22
00:02:07,719 --> 00:02:13,120
Well when the poet says all the glitters is not gold, he's really leaving out a key word

23
00:02:13,120 --> 00:02:14,960
to be understood from context.

24
00:02:14,960 --> 00:02:17,599
All the glitters is not necessarily gold.

25
00:02:17,599 --> 00:02:21,280
He's using poetic license, you're supposed to fill in and understand this meaning.

26
00:02:21,280 --> 00:02:28,439
And the proper translation would be that it is not true that everything that's gold,

27
00:02:28,439 --> 00:02:30,159
that everything that glitters is gold.

28
00:02:30,159 --> 00:02:36,400
It is not the case that for all x, if x glitters then x is gold.

29
00:02:36,400 --> 00:02:41,719
So it's just an example where a literal translation without thinking about what the sentence

30
00:02:41,719 --> 00:02:48,199
means and what the poet who articulated the sentence intended will get you something

31
00:02:48,199 --> 00:02:49,199
that's nonsense.

32
00:02:49,199 --> 00:02:56,680
It's one of the problems with machine translation from natural language into precise formal

33
00:02:56,680 --> 00:02:57,680
language.

34
00:02:57,760 --> 00:03:01,760
Okay, let's look at another example of the same kind.

35
00:03:01,760 --> 00:03:07,960
The poet says this time, there is a season to every purpose under heaven.

36
00:03:07,960 --> 00:03:11,480
This is a variant of a biblical phrase.

37
00:03:11,480 --> 00:03:13,120
So what does it mean?

38
00:03:13,120 --> 00:03:19,080
Well the literal translation, very purpose, there is a season such that s is for p.

39
00:03:19,080 --> 00:03:23,680
For snow shoveling, winter's good, for planting spring is good, for leaf watching, fall

40
00:03:23,680 --> 00:03:25,719
is good.

41
00:03:25,719 --> 00:03:32,199
And that is in fact the intended translation here.

42
00:03:32,199 --> 00:03:37,879
Although I remind you that there's a famous historical man, Sir Thomas Moore, who was

43
00:03:37,879 --> 00:03:44,520
described as a man for all seasons, that would be a case where there was man, a one man

44
00:03:44,520 --> 00:03:46,000
who was good for all seasons.

45
00:03:46,000 --> 00:03:55,680
He was a polymath, a writer, a cleric, and the chancellor of England for many years.

46
00:03:55,680 --> 00:04:01,120
Until he had a falling out with Henry VIII, which served him ill.

47
00:04:01,120 --> 00:04:07,760
Okay, that's the end of those two examples whose point is just to warn you that translation

48
00:04:07,760 --> 00:04:14,680
from English, from into math, is not something that can be done in a mindless mechanical way.

49
00:04:14,680 --> 00:04:18,960
Sometimes the quantifiers really are meant to go the other way from the way that they literally

50
00:04:18,960 --> 00:04:20,480
appear.

51
00:04:20,480 --> 00:04:26,800
Now there's a shift to another topic, which is just two profound theorems from mathematical

52
00:04:26,800 --> 00:04:34,400
logic about the properties of predicate calculus that are worth knowing about, and that describes

53
00:04:34,400 --> 00:04:37,439
the power and limits of logic.

54
00:04:37,439 --> 00:04:41,800
So these are called meta theorems, because their theorems about theorems, their theorems

55
00:04:41,800 --> 00:04:51,160
about systems for proving theorems, and that phrase meta means going up a level.

56
00:04:51,160 --> 00:04:54,879
All right, so the first theorem is a good-nose theorem.

57
00:04:54,879 --> 00:05:02,400
It says that if you want to be able to prove every valid assertion of predicate calculus,

58
00:05:02,400 --> 00:05:07,439
there really is only a few axioms and rules that will do the job.

59
00:05:07,439 --> 00:05:17,160
As a matter of fact, the rules that you need are just rules that you've seen already,

60
00:05:17,160 --> 00:05:26,439
namely modisponents and universal generalization, and a few valid axioms, which we've seen already.

61
00:05:26,439 --> 00:05:28,199
So let's go back a little bit.

62
00:05:28,199 --> 00:05:32,759
There's a little mark here that says that in practice, if you're really going to try to

63
00:05:32,759 --> 00:05:37,279
do automatic theorem proving, you need much more than this minimal system, but it's intellectually

64
00:05:37,279 --> 00:05:43,239
interesting and satisfying that a fairly economical set of axioms and inference rules are

65
00:05:43,239 --> 00:05:49,039
in theory sufficient to prove every logically valid sentence.

66
00:05:49,039 --> 00:05:52,119
This is known as girdle's completeness theorem.

67
00:05:52,119 --> 00:05:58,879
Girtle was the great mathematician, German mathematician, who spent the latter part of his life at

68
00:05:58,879 --> 00:06:05,519
the Institute for Advanced Study in Princeton as an emigrate.

69
00:06:05,519 --> 00:06:10,360
He has two major theorems, at least, that are results of his.

70
00:06:10,360 --> 00:06:13,879
One is the completeness theorem, this one, and there's an incompleteness theorem, which

71
00:06:13,879 --> 00:06:16,560
maybe we'll talk about in a few lectures.

72
00:06:16,560 --> 00:06:22,439
But for now, the good-nose is you can prove everything that's valid using a few simple rules.

73
00:06:22,439 --> 00:06:31,319
Okay, now, the bad-nose is that there's no way to tell whether your attempt to find a proof

74
00:06:31,319 --> 00:06:34,680
for something that you think is valid is going to succeed.

75
00:06:34,680 --> 00:06:39,560
There's no way to test whether or not a quantified formula is valid.

76
00:06:39,560 --> 00:06:45,480
This is in contrast to the case of propositional formulas where you can do it with a truth table.

77
00:06:45,480 --> 00:06:50,959
Truth table may blow up, so it becomes pragmatically infeasible, but at least theoretically,

78
00:06:50,959 --> 00:06:54,959
there's an exhaustive search that will enable you to figure out whether a propositional

79
00:06:54,959 --> 00:06:56,639
formula is valid.

80
00:06:56,639 --> 00:06:59,359
That's not the case with predicate calculus.

81
00:06:59,359 --> 00:07:05,199
Predicate calculus is undecidable, meaning that it's logically impossible to write a computer

82
00:07:05,199 --> 00:07:11,959
program that will take an arbitrary predicate calculus formula in and print out true or false

83
00:07:11,959 --> 00:07:14,799
depending on whether or not it's valid.

84
00:07:14,799 --> 00:07:16,799
Can't be done.

85
00:07:16,800 --> 00:07:20,759
Now, as I said, we're not going to go further into these theorems.

86
00:07:20,759 --> 00:07:26,120
These are the basic results that would be proved in an introductory course in logic.

87
00:07:26,120 --> 00:07:31,879
Usually, they take about a half a term to do, maybe a little less, and it goes beyond our

88
00:07:31,879 --> 00:07:32,879
course.

89
00:07:32,879 --> 00:07:37,120
You can look over in the math department for introductory courses in logic, and you will

90
00:07:37,120 --> 00:07:42,680
learn about these two profound meta-their-ums about logic and math.

