---
title: MIT6042J P9141PropositionalOperatorsVideo
---

1
00:00:00,000 --> 00:00:09,679
We're going to talk about propositions and logical operations in this little clip and let's

2
00:00:09,679 --> 00:00:12,960
begin then with the discussion of propositions.

3
00:00:12,960 --> 00:00:18,800
So to a mathematician and in particular in this class, we're going to use the word proposition

4
00:00:18,800 --> 00:00:23,440
to refer to something that is either true or false.

5
00:00:23,440 --> 00:00:28,560
An example would be there are five regular solids.

6
00:00:28,559 --> 00:00:32,000
This happens to be true in some terms we even prove it.

7
00:00:32,000 --> 00:00:39,200
It implies for example that if you wanted to place let's say a hundred fixed position

8
00:00:39,200 --> 00:00:45,320
satellites around the earth in a uniform way, you can't do it because there isn't any

9
00:00:45,320 --> 00:00:50,200
a hundred vertex regular solid the biggest one is 20 vertices.

10
00:00:50,200 --> 00:00:53,120
Okay, well if I change to six guess what?

11
00:00:53,120 --> 00:00:58,159
The assertion there are six regular solids is false so that's a simple-minded example of

12
00:00:58,159 --> 00:01:02,799
a well-defined two well-defined propositions one of which is true one of which is false.

13
00:01:02,799 --> 00:01:05,599
Propositions don't have to be true always.

14
00:01:05,599 --> 00:01:07,039
What are some non-examples?

15
00:01:07,039 --> 00:01:11,439
Well wake up is not a proposition because it's an imperative it's not true or false and

16
00:01:11,439 --> 00:01:12,439
where am I?

17
00:01:12,439 --> 00:01:18,879
It's a question it's not true or false and its 3 p.m. is not a proposition because it's

18
00:01:18,879 --> 00:01:23,759
true or false at any given moment but whether or not it's true or false depends on the time

19
00:01:23,759 --> 00:01:26,479
and that's a complication we don't want to get into.

20
00:01:26,480 --> 00:01:31,359
The idea is a proposition is some fixed assertion that's either true forever or not true

21
00:01:31,359 --> 00:01:32,960
forever.

22
00:01:32,960 --> 00:01:39,960
Now, one of the reasons why mathematicians bring up this abstraction of propositions and

23
00:01:39,960 --> 00:01:45,200
the operations on them that we're about to see is that ordinary language tends to be ambiguous

24
00:01:45,200 --> 00:01:51,280
and that of course will cause problems in mathematical reasoning just as it would in a program.

25
00:01:51,280 --> 00:01:57,400
One of the most ambiguous of the phrases in English that connects propositions is or.

26
00:01:57,400 --> 00:01:59,400
So let's look at this example.

27
00:01:59,400 --> 00:02:07,439
Greeks carry swords or javelins and if I was transcribing this into precise math notation

28
00:02:07,439 --> 00:02:13,759
I could say G for Greeks implies S for swords or J for javelins.

29
00:02:13,759 --> 00:02:20,520
So this is an assertion that if you're Greek then you carry a sword or a javelin.

30
00:02:20,600 --> 00:02:22,760
Greeks implies sword or javelin.

31
00:02:22,760 --> 00:02:25,600
Really I should say Greek soldiers but let that be implicit.

32
00:02:25,600 --> 00:02:35,360
Okay, that's how we're going to translate this sentence into just using these operators to paraphrase what's going on.

33
00:02:35,360 --> 00:02:42,879
The problem is what does or mean and it turns out that for javelins and swords it's true even if a Greek

34
00:02:42,879 --> 00:02:44,960
carries both a sword and a javelin.

35
00:02:44,960 --> 00:02:50,480
This is an inclusive or a Greek soldier would carry both a sword and a javelin because in fact a javelin

36
00:02:50,479 --> 00:02:58,479
is a good long distance weapon and a sword is good for defending yourself close in and you certainly want to have both especially after you've thrown your javelin

37
00:02:58,479 --> 00:03:01,839
and you don't have anything left but the sword.

38
00:03:01,839 --> 00:03:11,199
Now there's some many standard notations for these logical connectives that build up larger propositions out of component propositions.

39
00:03:11,199 --> 00:03:19,239
So one of the things is this V symbol or disjunction symbol is used by logicians often instead of OR and this arrow means implies

40
00:03:19,240 --> 00:03:23,879
or sometimes a double bar arrow also means implies but we're not going to get into that.

41
00:03:23,879 --> 00:03:27,840
I'm not going to ask you to memorize these symbols.

42
00:03:27,840 --> 00:03:31,560
We'll just stick to the words which don't take up that much more row.

43
00:03:31,560 --> 00:03:33,000
Let's look at another example.

44
00:03:33,000 --> 00:03:35,800
Greeks carry bronze or copper swords.

45
00:03:35,800 --> 00:03:41,600
Syntactically this has the same structure as the previous phrase but we're going to translate it differently.

46
00:03:41,600 --> 00:03:48,360
And the reason is that we mean here that a Greek soldier is not going to carry both the bronze and a copper sword.

47
00:03:48,360 --> 00:03:52,400
Why is that? Well bronze swords are just way better than copper swords.

48
00:03:52,400 --> 00:04:01,720
They'll slice right through copper they're much harder and it's not worth the wait to carry this inferior copper sword when you have a much better one.

49
00:04:01,720 --> 00:04:07,440
So this time we mean that Greeks carry exactly one of bronze or a copper sword.

50
00:04:07,440 --> 00:04:11,040
You'd carry a copper sword if you didn't have access to a bronze one.

51
00:04:11,039 --> 00:04:19,959
And so now we translate that into Greek implies B or B for bronze or C for copper but this time we use the XOR.

52
00:04:19,959 --> 00:04:26,959
XOR means that one of them is true exactly but not both and not neither.

53
00:04:26,959 --> 00:04:41,000
Again there's this plus sign notation for XOR because as we'll see it acts a little bit like adding numbers mod 2 where 1 plus 1 is 0.

54
00:04:41,000 --> 00:04:47,560
So let's be more precise about the two definitions of OR and XOR and how they work.

55
00:04:47,560 --> 00:04:54,399
And the assertion is that if I think of P and Q as placeholders for propositions that are either true or false,

56
00:04:54,399 --> 00:05:03,079
then the composite proposition P or Q is true if and only if P is true or Q is true or both are true.

57
00:05:03,079 --> 00:05:17,839
And I could express this assertion in English if and only if by giving you a so-called truth table where in these two columns or in these all these rows I've enumerated all the possible pairs of values of P and Q.

58
00:05:17,839 --> 00:05:25,039
So P and Q might both be true that one P might be true and Q false, P false, Q true and both of them are false.

59
00:05:25,040 --> 00:05:33,080
And for each of those possible combinations of the truth values of P and Q I tell you the truth value of P or Q.

60
00:05:33,080 --> 00:05:43,240
And the notable thing is this last row where I'm telling you that the only way that P or Q is false is if both P and Q are false.

61
00:05:43,240 --> 00:05:51,120
Okay. For XOR, as we said, the P or XOR Q is true if and only if exactly one of P and Q is true.

62
00:05:51,120 --> 00:06:00,800
So if I was expressing that as a truth table we'd see that where this TT is false and where this FF is false because it's not the case in either of those two rows that exactly one is true.

63
00:06:00,800 --> 00:06:05,600
But the middle rows exactly one is true and so P XOR Q is true.

64
00:06:05,600 --> 00:06:13,199
So this truth table is just a precise way of defining how XOR acts on truth values.

65
00:06:13,199 --> 00:06:16,839
There's another connective and which works even more straightforwardly.

66
00:06:16,839 --> 00:06:20,759
The value of P and Q is true if and only if both P and Q are true.

67
00:06:20,759 --> 00:06:22,680
And there's this truth table again.

68
00:06:22,680 --> 00:06:30,319
The salient row is that it's true only if and only if both P and Q are true.

69
00:06:30,319 --> 00:06:35,759
Another crucial logical operation is the negation operation or not.

70
00:06:35,759 --> 00:06:38,879
So not P just flips the truth value of P.

71
00:06:38,879 --> 00:06:41,800
If P is true then not P is false.

72
00:06:41,800 --> 00:06:46,879
If not P is true then P is false and there's it's very trivial.

73
00:06:46,879 --> 00:06:51,199
Truth table trivial because there's only two values to be concerned about when P is true.

74
00:06:51,199 --> 00:06:53,319
Not P is false when P is false.

75
00:06:53,319 --> 00:06:54,920
Not P is true.

76
00:06:57,120 --> 00:07:08,459
Now, one of the places that this notion of combining basic propositions to using logical operations to build up more complicated composite

77
00:07:08,459 --> 00:07:10,060
propositions is in programming.

78
00:07:10,060 --> 00:07:13,459
Here's a typical kind of phrase that comes from Java.

79
00:07:13,459 --> 00:07:19,859
Java uses this double vertical bar to mean or inclusive by the way and double ampersand to mean and.

80
00:07:19,859 --> 00:07:26,699
So in Java, this is a piece of legitimate Java code that's doing a test to evaluate this expression.

81
00:07:26,699 --> 00:07:32,579
If X is greater than zero or X is less than or equal to zero and Y is greater than 100,

82
00:07:32,579 --> 00:07:39,599
then if that test comes out to be true, then you do a bunch of code that follows the test up to some

83
00:07:39,599 --> 00:07:42,060
delimiter that tells you where to stop.

84
00:07:42,060 --> 00:07:44,860
And if it's false, you just skip all that stuff and go on.

85
00:07:44,860 --> 00:07:53,339
So we use sort of Boolean expressions or logical expressions like this in a very standard way in most programming languages.

86
00:07:53,339 --> 00:07:57,819
The other place where these operations comes up is in digital logic.

87
00:07:57,819 --> 00:08:06,379
And the digital circuit designers have their own notation, which I'll just mention, but we're not going to, again, impose on you, but you should be aware of.

88
00:08:06,379 --> 00:08:14,019
One notation that you use that will use as well because it's so economical is that not X can be abbreviated by writing a bar over the X,

89
00:08:14,019 --> 00:08:20,860
more generally not a complicated expression can be abbreviated by writing a bar over the complicated expression.

90
00:08:20,860 --> 00:08:22,980
I just saved some space and so we'll use it.

91
00:08:22,980 --> 00:08:24,900
But not the following.

92
00:08:24,900 --> 00:08:35,460
In digital logic, the idea is that you're talking about circuits where the only distinction of the signal that's coming in electrically is

93
00:08:35,460 --> 00:08:42,340
whether it's a high voltage or low voltage with high voltages denoted by one and low voltage denoted by zero.

94
00:08:42,340 --> 00:08:48,980
And the way that digital logic behaves is that the one corresponds to true and the zero corresponds to false.

95
00:08:48,980 --> 00:08:59,740
And then the end operation is simply multiplication because one or zero times one or zero is one only when both of them are one for ordinary multiplication,

96
00:08:59,740 --> 00:09:05,180
which is exactly the way and behaves when one means true and zero means false.

97
00:09:05,180 --> 00:09:11,940
Unfortunately, the digital designers use plus when they mean or they do not mean that one plus one is two.

98
00:09:11,940 --> 00:09:14,300
They mean that one plus one is one.

99
00:09:14,299 --> 00:09:19,419
And just the thing to watch out for part of that's part of the reason we're not going to use this notation.

100
00:09:19,419 --> 00:09:24,299
Let's just stick to our ordinary word notation that we give on the right.

