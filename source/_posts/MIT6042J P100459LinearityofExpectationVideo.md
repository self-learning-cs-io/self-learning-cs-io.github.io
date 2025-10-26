---
title: MIT6042J P100459LinearityofExpectationVideo
---

1
00:00:00,000 --> 00:00:07,000
So we've been saving for last the property that makes expectation calculating really easy

2
00:00:07,000 --> 00:00:12,000
and short circuits a lot of the ingenious methods that we've used up until now.

3
00:00:12,000 --> 00:00:15,000
Namely, expectation is linear.

4
00:00:15,000 --> 00:00:21,000
So what that means is that if you have two random variables, R and S and two constants A and B,

5
00:00:21,000 --> 00:00:25,000
the expectation function is linear. That is you take a linear combination of R and S,

6
00:00:25,000 --> 00:00:32,000
AR plus BS, and that's equal to the corresponding linear combination of the expectations.

7
00:00:32,000 --> 00:00:41,000
So I'll read it again. Expectation of AR plus BS is equal to A times the expectation of R plus B times the expectation of S.

8
00:00:41,000 --> 00:00:44,000
Expectation is linear.

9
00:00:44,000 --> 00:00:50,000
Okay. That's an absolutely fundamental formula that you should be comfortable with and remember.

10
00:00:50,000 --> 00:00:56,000
It extends actually not only to any finite number of variables, but with some convergence conditions,

11
00:00:56,000 --> 00:01:00,000
it actually extends even to accountable sum of variables.

12
00:01:00,000 --> 00:01:04,000
But let's just settle for the two random variable case for today.

13
00:01:04,000 --> 00:01:12,000
Now the crucial thing that makes it so powerful and useful is that this fact has nothing to do with independence,

14
00:01:12,000 --> 00:01:21,000
whether R and S are independent or equal. It doesn't matter. This linearity holds.

15
00:01:21,000 --> 00:01:28,000
The proof is not terribly informative. It's just manipulating terms and rearranging terms into some,

16
00:01:28,000 --> 00:01:30,000
but let's go through the exercise.

17
00:01:30,000 --> 00:01:36,000
Again, something I would never do in lecture, but in a video where you can skip it or fast forward or replay it,

18
00:01:36,000 --> 00:01:39,000
I'll, I think it might be worth doing so.

19
00:01:39,000 --> 00:01:43,000
And it is a response and it is approved by the way that I think you should be responsible for.

20
00:01:43,000 --> 00:01:45,000
So let's go through it.

21
00:01:45,000 --> 00:01:53,000
Okay. We're interested in the expectation of the random variable that you get by multiplying the random variable A by A,

22
00:01:53,000 --> 00:01:57,000
a little A and the random variable B by little B.

23
00:01:57,000 --> 00:01:59,000
All right.

24
00:01:59,000 --> 00:02:15,000
One of the definitions of expectation is that you get this expectation at by taking the sum over all the outcomes of the value of this linear combination at the outcome omega times the probability of omega.

25
00:02:15,000 --> 00:02:25,000
So what's the value of the linear combination A A plus B B at omega? It's simply A times A of omega plus B times B of omega.

26
00:02:25,000 --> 00:02:31,000
Okay. Now I got a sum of these terms, summing over omega.

27
00:02:31,000 --> 00:02:34,000
I can split them into two groups.

28
00:02:34,000 --> 00:02:44,000
I can take the sum over the A A's at omega times probability of omega and B B of omega times probability of omega.

29
00:02:44,000 --> 00:02:50,000
In other words, I'm multiplying through probability of omega here to get a sum of two terms.

30
00:02:50,000 --> 00:02:56,000
And then I'm rearranging all of the capital A terms first followed by all the capital B terms.

31
00:02:56,000 --> 00:03:03,000
The result is that I wind up with the sum over omega of the A terms times the probability of omega.

32
00:03:03,000 --> 00:03:11,000
And I factored out the little A plus B times the sum over all omega of B of omega times the probability of omega.

33
00:03:11,000 --> 00:03:17,000
It's just rearranging the terms in this sum after I've multiplied through by probability of omega.

34
00:03:18,000 --> 00:03:24,000
Well, of course this is equal by definition to A times the expectation of A. Notice this is the expectation of A.

35
00:03:24,000 --> 00:03:29,000
And that's the expectation of B times B and the proof is done.

36
00:03:29,000 --> 00:03:32,000
Not inspiring, but routine.

37
00:03:32,000 --> 00:03:40,000
If you use the alternative definition of expectation in terms of summing over the outcomes, it's a messier proof.

38
00:03:40,000 --> 00:03:56,000
If you have to use the definition of the expectation being the value times the probability that the variable takes that value, you wind up having to convert that formula into this formula in order to carry through the proof nicely.

39
00:03:56,000 --> 00:03:58,000
And we're done.

40
00:03:58,000 --> 00:04:00,000
Okay, let's make you sub it.

41
00:04:00,000 --> 00:04:07,000
And in order to do that, let's make a really trivial but a very important remark about the expectation of an indicator variable.

42
00:04:07,000 --> 00:04:10,000
So remember, I sub A is the random variable.

43
00:04:10,000 --> 00:04:14,000
It's equal to one if the event A occurs and zero if the event A doesn't occur.

44
00:04:14,000 --> 00:04:19,000
So what is the expectation of the indicator variable?

45
00:04:19,000 --> 00:04:25,000
Well, by definition, it's one times the probability that it equals one plus zero times the probability that it equals zero.

46
00:04:25,000 --> 00:04:27,000
Those are the only two values it can take.

47
00:04:27,000 --> 00:04:30,000
Well, we can forget this term in zero times something.

48
00:04:30,000 --> 00:04:34,000
But what is the probability that A is equal to one?

49
00:04:34,000 --> 00:04:37,000
That's exactly the probability of A.

50
00:04:37,000 --> 00:04:40,000
And that's the fundamental formula that we want to notice.

51
00:04:40,000 --> 00:04:46,000
The expectation of the indicator variable for the event A is nothing but the probability that A occurs.

52
00:04:46,000 --> 00:04:51,000
File that away. We're about to use it multiple times.

53
00:04:51,000 --> 00:05:05,000
So let's go back to the expected number of heads in N flips, which we've now seen at least two ways to do one by generating function argument, another by a recursive argument using total expectation.

54
00:05:05,000 --> 00:05:10,000
Now we're going to knock it off very elegantly using linearity.

55
00:05:10,000 --> 00:05:15,000
Because let HI be the indicator variable for having a head on the i-th flip.

56
00:05:15,000 --> 00:05:24,000
So we look at the i-th flip. HI is one. If the i-th flip comes up head and HI of zero. If is zero, if the i-th flip does not come up head.

57
00:05:24,000 --> 00:05:27,000
Then we can make the following crucial remark.

58
00:05:27,000 --> 00:05:34,000
And this is a trick that we'll use regularly by expressing some quantity that we're interested in as a sum of indicator variables.

59
00:05:34,000 --> 00:05:44,000
The total number of heads, the random variable equal to the total number of heads in N flips, is equal to the sum of the indicator variables for whether there's a head on the first flip.

60
00:05:44,000 --> 00:05:50,000
Plus whether there's a head on the second flip up through whether there's a head on the end flip.

61
00:05:50,000 --> 00:05:59,000
So suddenly the random variable that I want to compute is a sum of N random variables, in fact, N indicator variables.

62
00:05:59,000 --> 00:06:07,000
All right. Well, that tells me that the expectation of the number of heads is the expectation of the sum after it's equal to the sum.

63
00:06:07,000 --> 00:06:14,000
But the expectation of the sum is going to be the sum of the expectations by limited airity.

64
00:06:14,000 --> 00:06:21,000
So it's simply the expectation of H1 plus the expectation of H2 out through the expectation of Hn.

65
00:06:21,000 --> 00:06:28,000
But what's the expectation of getting a head on the i-th flip? Well, the flips are independent. It's simply the expectation of a head.

66
00:06:28,000 --> 00:06:34,000
So what I have is each of these is equal to the probability of a head, and there's N of them.

67
00:06:34,000 --> 00:06:41,000
So the total is N times the probability of head or Np, which is a formula that we had derived two other ways previously.

68
00:06:41,000 --> 00:06:53,000
And now it really falls out very elegantly with hardly any ingenuity other than the wonderful idea of expressing the number of heads as a sum of indicators.

69
00:06:53,000 --> 00:07:05,000
Let's look at one related example, one example in a very related example, of asking about the probability of the expected number of hats that are returned.

70
00:07:05,000 --> 00:07:21,000
When N men check their hats at a hat check, and then the hats get all scrambled up by incompetent staff, and so that they're given out again, and in such a way that the probability that the i-th man gets his own hat back is 1 over N.

71
00:07:21,000 --> 00:07:39,000
What you could say is that all possible permutations of the N hats are equally likely, and we ask among with all permutations equally likely, how many of them is it the case that the i-th man gets his own hat back?

72
00:07:39,000 --> 00:07:46,000
And there's a 1 out of N chance that the i-th man is going to get his own hat back, because these N hats and he's equally likely to get all of them.

73
00:07:47,000 --> 00:07:53,000
How many men do we expect will get their hat back in this setting?

74
00:07:53,000 --> 00:08:03,000
Well, let's let r i be the indicator variable for whether or not the i-th man got his hat returned r i for hat returned to the i-th man.

75
00:08:04,000 --> 00:08:12,000
Now, notice that r i and r j are not independent. In the previous case, those h's were independent, because the point flipped were independent.

76
00:08:12,000 --> 00:08:31,000
But here, if I know, for example, that r 1 got his hat back, the probability that r 2 got his hat back has changed from 1 over N to 1 over N minus 1, because 1 is out of the picture, and r 2 is going to get his hat back among the remaining hats 2 through N, 2 through N is N minus 1 of them.

77
00:08:31,000 --> 00:08:43,000
So, he's got a 1 minus 1 over N minus 1 chance of getting his hat. His probability has changed given that r 1 got his hat back, so they're not independent.

78
00:08:43,000 --> 00:08:59,000
All right, nevertheless, independence doesn't matter for linearity, so I can still say that the expected number of hats returned is equal to the expectation of the sum of the indicator variables for each man getting his hat back.

79
00:08:59,000 --> 00:09:12,000
The expectation of that sum is the sum of the expectations, and the expectation of each of these we figured out was 1 over N and there's N of them, so it's N times 1 over N or 1.

80
00:09:12,000 --> 00:09:23,000
I expect when all the hats are scrambled and all the permutations of the hats are equally likely that one man is going to get his hat back, and none of the others will.

81
00:09:23,000 --> 00:09:36,000
Okay, now let's change the situation a little bit, and think instead of scrambling the hats in a way that all possible permutations of hats are equally likely, let's think about a Chinese banquet.

82
00:09:36,000 --> 00:09:46,000
Chinese banquet is traditionally done with a table of 9 in a circle, and there's a lazy Susan that spins around where there's dishes of food in front of each person.

83
00:09:46,000 --> 00:10:09,000
But let's generalize it to N. Suppose that N people are sitting around a spinning table, a lazy Susan, with N different dishes, one dish in front of each person, and now we spin the lazy Susan randomly, and we ask how many people do we expect will wind up with the same dish that they started with after the spin?

84
00:10:10,000 --> 00:10:30,000
Well, now we can let R i indicate that the earth, the earth person got the same dish back, and now these R i's, which are different from the previous ones about hat returns, these R i's are totally dependent, much more so than the other ones were, because they're all 1 or they're all 0.

85
00:10:30,000 --> 00:10:50,000
If one person gets their hat back, it means that the spinning table got back to where it used to be, and everybody has their hat back, and if one person doesn't have their hat back, then the table is shifted off where it was originally, and nobody has their dish, the original dish, I said hats, I met the dish that they started with.

86
00:10:51,000 --> 00:11:03,000
So everybody gets the same dish back, or nobody gets the same dish back, these variables are as dependent as they possibly could be, but it doesn't matter, because linearity still holds.

87
00:11:03,000 --> 00:11:18,000
And that means that the previous argument about the expected number of people, the expected number of dishes that get back to the person that they started with is still 1, even though all the R i's are equal.

88
00:11:21,000 --> 00:11:31,000
Well, that's so much for the lovely rule about linearity of expectation, which holds regardless of assumptions about independence or not.

89
00:11:31,000 --> 00:11:35,000
There is a rule for products, but it requires independence.

90
00:11:35,000 --> 00:11:49,000
So the independent product rule says, sure enough, that the expectation of a product of two random variables x and y is the expectation, is the product of their expectations, providing that they are independent.

91
00:11:49,000 --> 00:11:54,000
And this extends to many variables if they're mutually independent.

92
00:11:54,000 --> 00:12:00,000
Again, the proof is by rearranging terms in the defining sum for the expectation of x, y.

93
00:12:00,000 --> 00:12:06,000
Let's go through it, and again, you can fast forward or skip this part if you don't want to watch equations being manipulated.

94
00:12:06,000 --> 00:12:24,000
So by definition, the expectation of the product x, y is the sum over all the possible values of x and y, of the value of the product x, y times the probability that the first variable x, capital x equals little x, and the second variable y is equal to little y.

95
00:12:24,000 --> 00:12:33,000
This is the, by definition, the expectation of the product, by the first definition, not the one in terms of outcomes.

96
00:12:33,000 --> 00:12:40,000
Now using independence, this term here can be splitted to a product of x equals x and y equals y. So let's do that.

97
00:12:40,000 --> 00:12:46,000
So this is the sum of x, y times the probability that x equals x times the probability that y equals y.

98
00:12:46,000 --> 00:12:53,000
Now, I'm going to do a fairly standard trick, which is I'm going to organize this sum in a clean way.

99
00:12:53,000 --> 00:13:01,000
Right now, it's an unordered sum over all possible pairs of x and y in the range of the variables x and y.

100
00:13:01,000 --> 00:13:08,000
But I'm going to do the sum. So I first sum over all the y's and then for each y, I'm going to sum over all the x's.

101
00:13:08,000 --> 00:13:25,000
So this is a tantam, this is an unordered sum really. There's no order here, but now I'm giving you an arrangement, which says that I'm going to lump together the sums over all the x's and then for each of those, I'm going to sum up over the y's.

102
00:13:26,000 --> 00:13:38,000
Well, when I do it this way, what I've got is an interesting thing here. I've got a sum over x and there's some y terms here that don't depend on x. I can factor them out because they don't change with x.

103
00:13:38,000 --> 00:13:54,000
So if I factor out this y and probability of y equals y, I wind up with the sum over y of this factored out term, y times probability y equals y times the sum over x's of x times the probability that x equals x.

104
00:13:54,000 --> 00:14:07,000
Now, this is the same term that is the coefficient of every one of these y terms that depends on y and this term does not depend on y. So I can factor it out.

105
00:14:07,000 --> 00:14:20,000
And if I do that, I wind up with the sum over x's of x times the probability that x equals x times the sum over y of y times the probability that y equals y.

106
00:14:20,000 --> 00:14:39,000
And guess what? This is by definition the expectation of x and this is by definition the expectation of y and by that chain of equalities, I've proved sure enough that the expectation of x y is equal to the expectation of x times the expectation of y, QED.

107
00:14:39,000 --> 00:14:52,000
So the key step here was where independence was used at the very first step when I split up the probability that x equals x and y, y into the product of the corresponding probabilities.

108
00:14:52,000 --> 00:15:05,000
Now, let me just end with a warning about a couple of blunders that people make all the time. So first of all, don't forget independence as a crucial condition on the product rule for expectations.

109
00:15:05,000 --> 00:15:25,000
It can hold in some cases where the variables are dependent. Independent is not a necessary condition. It's sufficient. But you need some kind of a condition that in order for the product rule to hold. So if you're not careful, it won't, if you forget to check for independence or something that is tantamount to it.

110
00:15:25,000 --> 00:15:35,000
So let's just take an easy example to remember what happens if independence fails. Suppose I have a variable x, a random variable x, which takes positive and negative values with equal probability.

111
00:15:35,000 --> 00:15:51,000
So it takes one and minus one with equal probability. It takes pi and minus pi with equal probability. I don't really care what those values are. As long as it's taking some positive and negative values and it takes a positive value with the same probability that it takes that value negated.

112
00:15:52,000 --> 00:16:08,000
Well, that automatically means that the expectation of x is zero because when I add up all these terms, the positive and negative terms cancel because they have the same probability. So any such x that's symmetric about zero has expectation zero.

113
00:16:09,000 --> 00:16:30,000
On the other hand, if I square x, then all of those positive and negative terms of values become positive. And so I'm taking the expectation of a variable that's strictly positive, at least with non-zero probability and a bunch of outcomes. And therefore the expectation of x squared is positive.

114
00:16:30,000 --> 00:16:40,000
So the expectation of x is zero, but the expectation of x squared is positive. Of course, if I multiply expectation of x times expectation of x, that's still zero. So here's a counter example.

115
00:16:40,000 --> 00:16:59,000
Expectation of x times expectation of x is equal to zero, which is less than the expectation of the square of x. Of course, this is about as dependent as it could possibly be because it's the same random variable, but it illustrates the failure of the product rule when if you don't have some kind of a condition like independence around.

116
00:17:00,000 --> 00:17:24,000
There's a second lender that's more interesting and that people can fall in because there's a temptation to assume that if the product rule holds for independence, then so should the reciprocal rule. That is, you might think that the expectation of x over y is equal to the expectation of x over the expectation of y when x and y are independent, but it's not true.

117
00:17:24,000 --> 00:17:35,000
So even when they're independent, the expectation of x divided by y is in general not equal to the expectation of x divided by the expectation of y.

118
00:17:35,000 --> 00:17:40,000
In fact, the counter example is if x is the constant one, the expectation of 1 over y is equal to 1 over y.

119
00:17:54,000 --> 00:18:03,000
In fact, the expectation of x is equal to 1 over y, and x is equal to 1 over y.

120
00:18:03,000 --> 00:18:20,839
Sysk complex instruction set code was better than risk.

121
00:18:20,839 --> 00:18:29,079
So I won't mention names, but prominent people have made this blunder. You shouldn't.

