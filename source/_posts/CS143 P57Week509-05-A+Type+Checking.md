---
title: CS143 P57Week509 05 A+Type+Checking
---

1
00:00:00,000 --> 00:00:08,400
In this video, we're going to talk about type checking in cool.

2
00:00:08,400 --> 00:00:17,000
Thus far, we've seen two examples of formal notation used to specify parts of a compiler.

3
00:00:17,000 --> 00:00:21,960
Regular expressions were used in lexical analysis and context-free grammars, which we used in

4
00:00:21,960 --> 00:00:22,960
parsing.

5
00:00:22,960 --> 00:00:26,839
It turns out that there's another formalism which has gained widespread acceptance in

6
00:00:26,839 --> 00:00:32,399
type checking and that's logical rules of inference.

7
00:00:32,399 --> 00:00:36,519
Inference rules are logical statements that have the form if some hypothesis is true,

8
00:00:36,519 --> 00:00:38,560
then some conclusion is true.

9
00:00:38,560 --> 00:00:44,079
So inference rules are implication statements that some hypothesis implies some conclusion.

10
00:00:44,079 --> 00:00:48,439
And in the particular case of type checking, an example or typical kind of reasoning that

11
00:00:48,439 --> 00:00:53,320
we see in type checking is that if a couple of expressions have certain types, then some

12
00:00:53,320 --> 00:00:56,600
other expression is guaranteed to have a certain type.

13
00:00:56,600 --> 00:01:02,600
And so clearly, the type checking statement here is an example of an inference rule.

14
00:01:02,600 --> 00:01:11,200
And inference rule notation is just a compact way of encoding these kinds of if-then statements.

15
00:01:11,200 --> 00:01:14,400
Now if you haven't seen this notation before, it will be unfamiliar, but actually it's

16
00:01:14,400 --> 00:01:16,439
quite easy to read with practice.

17
00:01:16,439 --> 00:01:20,680
And we'll start with a very simple system and gradually add features.

18
00:01:20,680 --> 00:01:25,920
So we'll use a logical conjunction for the English word and and implication for the combination

19
00:01:25,920 --> 00:01:27,799
of English words if and then.

20
00:01:27,799 --> 00:01:35,240
And now with one special thing, the string x, kohl and t is read that x has typed t.

21
00:01:35,240 --> 00:01:42,079
So this is a logical assertion saying that x has a particular type.

22
00:01:42,079 --> 00:01:45,400
So now consider the following very simple type rule.

23
00:01:45,400 --> 00:01:52,760
If e1 has type int and e2 has type int, then e1 plus e2 also has type int.

24
00:01:52,760 --> 00:01:56,800
And we can just take the definitions we gave on the previous slide and gradually reduce

25
00:01:56,800 --> 00:01:59,719
this to a mathematical statement.

26
00:01:59,719 --> 00:02:05,600
So for example, we can replace the if-then with an implication and we can replace the

27
00:02:05,600 --> 00:02:07,800
word and with a conjunction.

28
00:02:07,800 --> 00:02:11,280
And now we just have these has type statements.

29
00:02:11,280 --> 00:02:16,520
And we had a notation for that and we wind up with this purely mathematical statement

30
00:02:16,520 --> 00:02:18,319
that which says exactly the same thing.

31
00:02:18,319 --> 00:02:25,560
If e1 is type int and e2 is type int, that implies that e1 plus e2 has type int.

32
00:02:25,560 --> 00:02:30,799
And notice that that statement that we just wrote out is a special case of an inference

33
00:02:30,799 --> 00:02:31,799
rule.

34
00:02:31,799 --> 00:02:37,560
It's a bunch of hypotheses can join together that implies some conclusion.

35
00:02:37,560 --> 00:02:41,519
The traditional notation for inference rules is given here.

36
00:02:41,519 --> 00:02:45,799
The hypotheses are written above a horizontal line and the conclusion is written below.

37
00:02:45,800 --> 00:02:49,000
It means exactly the same thing that we had on the previous slide.

38
00:02:49,000 --> 00:02:53,800
Namely that if all the things above the horizontal line are true, these are all the hypotheses,

39
00:02:53,800 --> 00:02:58,560
then the thing below the horizontal line can be concluded to be true.

40
00:02:58,560 --> 00:03:00,160
And there's one piece of new notation here.

41
00:03:00,160 --> 00:03:06,080
This is the turnstiles that are used for the hypotheses and the conclusion.

42
00:03:06,080 --> 00:03:09,640
And the turnstile is read, it is provable that.

43
00:03:09,640 --> 00:03:14,080
And what this means is that we're just going to say explicitly that something is provable

44
00:03:14,080 --> 00:03:16,760
in the system of rules that we are defining.

45
00:03:16,760 --> 00:03:20,960
So the way you would read this is that if it is provable that all these hypotheses are

46
00:03:20,960 --> 00:03:25,200
true, so if it's provable, the first hypothesis is true, all the middle hypotheses, and if

47
00:03:25,200 --> 00:03:30,960
it's provable, if it is provable, if the last hypothesis is true, then it is provable that

48
00:03:30,960 --> 00:03:33,000
the conclusion is true.

49
00:03:33,000 --> 00:03:38,480
And cool type rules are going to have the following kinds of hypotheses and conclusions.

50
00:03:38,479 --> 00:03:46,079
We're going to prove within the system that some expression has a particular type.

51
00:03:46,079 --> 00:03:49,679
So with those definitions out of the way, we actually have enough to write at least a

52
00:03:49,679 --> 00:03:51,599
few simple type rules.

53
00:03:51,599 --> 00:03:56,399
So if I is an integer literal, if it's an integer constant appearing in my program, then

54
00:03:56,399 --> 00:04:00,000
this rule says it is provable that I has type int.

55
00:04:00,000 --> 00:04:03,199
So every integer constant has type int.

56
00:04:03,199 --> 00:04:07,239
And here's the rule for add written out now in the inference rule notation.

57
00:04:07,240 --> 00:04:12,320
If it is provable, that I1 has type int and is provable that I2 has type int, then it

58
00:04:12,320 --> 00:04:19,400
is provable that I1 plus I2 has type int.

59
00:04:19,400 --> 00:04:24,160
So notice that these rules give templates for describing how to type integers and expressions.

60
00:04:24,160 --> 00:04:27,199
The rule for integer constants just use a generic integer I.

61
00:04:27,199 --> 00:04:32,439
It didn't give a separate rule for every possible integer, and the rule for plus used expressions

62
00:04:32,439 --> 00:04:33,439
I1 and II.

63
00:04:33,439 --> 00:04:36,079
It didn't tell you what particular expressions they were.

64
00:04:36,079 --> 00:04:42,759
It just said give me any expression, any expressions, I1 and II that have type int.

65
00:04:42,759 --> 00:04:48,519
And so we can plug any expressions we want in that satisfy the hypotheses, and then we

66
00:04:48,519 --> 00:04:53,560
can produce a complete typing for actual expressions.

67
00:04:53,560 --> 00:04:58,240
So as a concrete example, let's show that 1 plus 2 has type int.

68
00:04:58,240 --> 00:05:01,319
So we want to type the expression 1 plus 2.

69
00:05:01,319 --> 00:05:05,840
And since we know the rule for add, that means we need to construct a proof of the type

70
00:05:05,840 --> 00:05:10,120
of the number 1 and a proof of the type of the number 2.

71
00:05:10,120 --> 00:05:12,360
And we have a rule for dealing with integer constants.

72
00:05:12,360 --> 00:05:16,519
Nearly we can prove because 1 is an integer constant that has type int and we can prove

73
00:05:16,519 --> 00:05:17,960
the 2 has type int.

74
00:05:17,960 --> 00:05:22,879
And then now we have the two hypotheses we need for the sum expression and we can prove

75
00:05:22,879 --> 00:05:26,400
that 1 plus 2 has type int.

76
00:05:27,399 --> 00:05:32,239
So an important property of any reasonable type system is that it be sound.

77
00:05:32,239 --> 00:05:35,599
And soundness here is a correctness condition.

78
00:05:35,599 --> 00:05:40,319
What we want is that whatever the type system can prove that some expression has a particular

79
00:05:40,319 --> 00:05:41,319
type t.

80
00:05:41,319 --> 00:05:46,319
Then if I actually run that program, if I take e and I execute it on a computer, the

81
00:05:46,319 --> 00:05:51,560
value that it returns, the value that comes back after running e, in fact, has the type

82
00:05:51,560 --> 00:05:53,519
predicted by the type system.

83
00:05:53,519 --> 00:05:58,680
So if the type system is able to give types to things that actually reflects what kind

84
00:05:58,680 --> 00:06:02,879
of value you get when you run the program, then we say that the type system is sound.

85
00:06:02,879 --> 00:06:08,000
Now, clearly we only want sound rules, but some sound rules are actually quite a bit

86
00:06:08,000 --> 00:06:09,000
better than others.

87
00:06:09,000 --> 00:06:20,479
So for example, if I have an integer literal and I want to give it a type, well, I showed

88
00:06:20,480 --> 00:06:24,200
you the best possible rule before where we said that I has type int, but I would also

89
00:06:24,200 --> 00:06:29,120
be correct, just not very precise, to say that I has type object.

90
00:06:29,120 --> 00:06:34,439
Certainly if I evaluate an integer, I will get back an object because every integer in

91
00:06:34,439 --> 00:06:39,200
cool is also an object, but this isn't all that useful because now I can't do any of

92
00:06:39,200 --> 00:06:40,960
the integer operations.

93
00:06:40,960 --> 00:06:44,200
And so there are lots of different sound rules.

94
00:06:44,200 --> 00:06:48,879
There's not just one unique rule for any given cool expression that will be sound, but

95
00:06:48,879 --> 00:06:50,079
some of them are better than others.

96
00:06:50,079 --> 00:06:53,759
And in the case of an integer literal, the one we really want is that an integer literal

97
00:06:53,759 --> 00:06:58,879
has type int because that's the most specific type that we can give to that kind of program.

