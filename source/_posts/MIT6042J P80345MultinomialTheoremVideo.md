---
title: MIT6042J P80345MultinomialTheoremVideo
---

1
00:00:00,000 --> 00:00:05,240
The binomial theorem extends to a thing called the multinomial theorem, whereas

2
00:00:05,240 --> 00:00:10,240
instead of taking a product of a sum of two things, you take the product of a

3
00:00:10,240 --> 00:00:15,080
sum of k things to get the multinomial theorem. And what underlies it is a rule

4
00:00:15,080 --> 00:00:19,640
that we're going to call the bookkeeper rule. And here's why. So the bookkeeper rule

5
00:00:19,640 --> 00:00:24,679
is about the question of look at the word bookkeeper and ask how many

6
00:00:24,679 --> 00:00:29,039
different ways are there to scramble the letters in this word that actually

7
00:00:29,039 --> 00:00:32,920
are distinguishable. The point being that the two O's are

8
00:00:32,920 --> 00:00:36,640
indistinguishable. So the order in which they appear doesn't matter, like

9
00:00:36,640 --> 00:00:41,840
wise the three E's in the two K's. Well, how do we answer this question?

10
00:00:41,840 --> 00:00:48,480
The simple way to do it, to begin with, is to label all of the indistinguishable

11
00:00:48,480 --> 00:00:51,359
letters with subscripts to make them distinguishable. So I'm going to put

12
00:00:51,359 --> 00:00:56,439
subscripts 1 and 2 on the O's, 1 and 2 on the K's, and 1, 2, and 3 on the E's. Now

13
00:00:56,439 --> 00:01:01,199
all the 10 letters are distinguishable. And if I ask how many ways are there

14
00:01:01,199 --> 00:01:05,920
to commute these 10 letters, the answer we know by the product rule is

15
00:01:05,920 --> 00:01:09,920
simply by the generalized product rule is simply 10 factorial. Now my strategy is

16
00:01:09,920 --> 00:01:16,319
going to be to use the division rule to count the number of patterns of the word

17
00:01:16,319 --> 00:01:19,479
of the letters in the word with no subscripts. Now what I'm going to do that is

18
00:01:19,479 --> 00:01:24,239
take one of these subscripted words and erase the subscripts. So I'm going to

19
00:01:24,239 --> 00:01:29,599
map it to the same permutation of letters with no subscripts. I've just done

20
00:01:29,599 --> 00:01:34,239
that. Here I've taken an arbitrary permutation of the subscripted word, and then

21
00:01:34,239 --> 00:01:38,879
I've erased the subscripts and consolidated the letters and I wind up with this

22
00:01:38,879 --> 00:01:44,560
permutation. Okay, now if I want to count the number of unscripted subscripted

23
00:01:44,560 --> 00:01:50,079
permutations, then I simply figure out that this mapping is K to 1, and I'm going

24
00:01:50,079 --> 00:01:55,400
to then divide by K. Well, how many to 1 is it? Well, how many subscripted words

25
00:01:55,400 --> 00:02:01,319
map to this given pattern? The answer is the subscripts on the O's don't matter. So

26
00:02:01,319 --> 00:02:05,719
there's two possible orders in which those subscripts might appear. Subscripts on

27
00:02:05,719 --> 00:02:09,280
the K's don't matter. There's two possible orders in which those subscripts might

28
00:02:09,280 --> 00:02:13,960
appear. Subscripts on the E's don't matter. Three possible orders or three

29
00:02:13,960 --> 00:02:18,159
factorial possible orders that the subscripts might occur on the E's. The net

30
00:02:18,159 --> 00:02:23,879
result is that with two O's, two K's and three E's, the mapping is two factorial by

31
00:02:23,879 --> 00:02:28,800
two factorial by three factorial to 1. And that instantly gives us by the

32
00:02:28,800 --> 00:02:33,000
division rule that the total number of permutations of the letters in the word

33
00:02:33,000 --> 00:02:39,120
bookkeeper is 10 factorial over two factorial times two factorial times three

34
00:02:39,120 --> 00:02:46,079
factorial. More generally by the same reasoning. If I look at a sequence of N

35
00:02:46,080 --> 00:02:54,160
letters of which N1 or A is an N2 or B's up through NK or Z's, then the number of

36
00:02:54,160 --> 00:03:00,560
permutations of those letters with the repeated A's, B's, and Z's is N factorial

37
00:03:00,560 --> 00:03:05,720
divided by N1 factorial times N2 factorial through NK factorial. And this

38
00:03:05,720 --> 00:03:10,760
formula occurs so often that it has a name. It's called a multinomial

39
00:03:10,799 --> 00:03:16,199
coefficient. There's a name for it written in this format, N over N1 and 2 through NK.

40
00:03:16,199 --> 00:03:22,159
You could start to say N choose N1, choose N2, choose NK if you're thinking about

41
00:03:22,159 --> 00:03:27,359
how we pronounce the binomial coefficients. The convention is that the sum of the

42
00:03:27,359 --> 00:03:32,079
NIs is supposed to be equal to the numerator N. This is called a multinomial

43
00:03:32,079 --> 00:03:37,399
coefficient. So N factorial divided by this product of factorials is written in

44
00:03:37,400 --> 00:03:43,319
somewhat shorter notation without the factorials as a multinomial coefficient.

45
00:03:43,319 --> 00:03:48,560
Binomial coefficients, by the way, were special case when we write N choose K, if we

46
00:03:48,560 --> 00:03:52,640
wrote it as a multinomial coefficient, you'd have to write it as N, choose K, and

47
00:03:52,640 --> 00:04:02,000
then choose N minus K. So we can apply this to think about

48
00:04:02,039 --> 00:04:07,680
words and coefficients in expanding things that are more than binomial. So let's

49
00:04:07,680 --> 00:04:15,319
look at expanding a quintomial, a sum of five things, E, M, S, T, and Y, and I

50
00:04:15,319 --> 00:04:20,480
raised that to the seventh power. So that means in these products of seven of

51
00:04:20,480 --> 00:04:25,519
these terms, I'm looking at words of length seven whose components are the

52
00:04:25,519 --> 00:04:31,039
letters E, M, S, T, and Y. And if I, so if I multiply this out, applying the

53
00:04:31,039 --> 00:04:36,279
distributive law, I would wind up with five to the seventh terms, each of one

54
00:04:36,279 --> 00:04:44,519
consisting of a permutation of the letters E, M, S, T, and Y. And if I ask, what's

55
00:04:44,519 --> 00:04:53,399
the coefficient in that expansion of the term E, M, S, Q, T, Y? It's exactly the

56
00:04:53,399 --> 00:04:59,439
number of ways of permuting these five letters. A word of length seven made out

57
00:04:59,439 --> 00:05:04,439
of these five letters with three occurrences of S. In other words, the coefficient of

58
00:05:04,439 --> 00:05:11,199
E, M, S, Q, T, Y in this product is the number of ways of rearranging the letters in

59
00:05:11,199 --> 00:05:16,919
this sequence of seven. It's the word systems, which is why we chose it to be

60
00:05:16,919 --> 00:05:20,439
rememberable. How many ways are they to rearrange the letters in the word systems

61
00:05:20,439 --> 00:05:27,600
by the bookkeeper rule? There are seven, choose one, one, three, one, one. Okay,

62
00:05:27,600 --> 00:05:32,240
let's do another example. What's the coefficient of B, A, Q, then squared? If I

63
00:05:32,240 --> 00:05:37,879
expand this trinomial B plus A plus N to the sixth power, well, now again I have

64
00:05:37,879 --> 00:05:43,480
three to the sixth terms. How many of them involve a B three A's in two ends by

65
00:05:43,480 --> 00:05:47,159
the bookkeeper rule? It's the number of ways. Well, it's the number of ways of

66
00:05:47,160 --> 00:05:51,760
rearranging the letters in the word banana. And by the bookkeeper rule, that's six

67
00:05:51,760 --> 00:05:58,640
with subscripts one, three, and two. More generally, this is what the multinomial

68
00:05:58,640 --> 00:06:06,720
theorem says. If I look at the coefficient of the term a product of XI to the

69
00:06:06,720 --> 00:06:12,920
RIs in an expansion of a K-mone of a K-nomial, a sum of K distinct variables

70
00:06:12,920 --> 00:06:17,720
raised to the Nth power. Now I've got, if I expanded this out using the

71
00:06:17,720 --> 00:06:22,720
distributive law without collecting terms, I'd have K to the N terms, each of which

72
00:06:22,720 --> 00:06:33,560
was a permutation of the X1s through XKs with repeats. And then if I ask, how many

73
00:06:33,560 --> 00:06:40,800
of those products of N of these K variables have this many X1s, this many X2s

74
00:06:40,800 --> 00:06:46,759
through this many X, RKs, this many XKs, I'm asking again a bookkeeper question.

75
00:06:46,759 --> 00:06:54,840
And the answer is N choose R1, R2 through RK. So now we're ready for the record to

76
00:06:54,840 --> 00:07:00,400
state the general multinomial formula. If I take a sum of K terms, a K-nomial,

77
00:07:00,400 --> 00:07:07,160
to the Nth power, then expressing it in concise notation, it's the sum over R1

78
00:07:07,160 --> 00:07:13,480
through RK summing to N of the multinomial coefficient, N, R1 through RK times

79
00:07:13,480 --> 00:07:21,280
this product of XIs. I'm not putting a highlighted box around it because this is

80
00:07:21,280 --> 00:07:25,640
not a formula which is particularly important to memorize and it's clearly all

81
00:07:25,640 --> 00:07:29,600
clogged up with subscripts, but nevertheless it's good to have sometimes for

82
00:07:29,600 --> 00:07:34,480
the record. And next week we will continue with this theme about the connection

83
00:07:34,480 --> 00:07:41,560
between counting and algebra and in particular not only ordinary polynomials as

84
00:07:41,560 --> 00:07:46,040
we've been looking at here with a product of sums, but in fact infinite

85
00:07:46,040 --> 00:07:50,200
polynomials or infinite series when we take up generating functions next week.

