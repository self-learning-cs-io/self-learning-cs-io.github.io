---
title: MIT6042J P93441BiggerNumberGameVideo
---

1
00:00:00,000 --> 00:00:07,000
Today's topic is random variables. Random variables are an absolutely fundamental concept in probability theory,

2
00:00:07,000 --> 00:00:12,000
but before we get into officially defining them, and so on, let's start off with an example that in fact is a game,

3
00:00:12,000 --> 00:00:15,000
because that's a fun way to start.

4
00:00:15,000 --> 00:00:18,000
So we're going to play the bigger number game, and here's how it works.

5
00:00:18,000 --> 00:00:28,000
There are two teams, and team one has the task of picking two different integers between 0 and 7, inclusive,

6
00:00:28,000 --> 00:00:33,000
and they write a one-in-two-drone, one-piece paper, and the other integer on the other-piece paper.

7
00:00:33,000 --> 00:00:41,000
They turn the two pieces of paper face down so the numbers are not visible, and the other team then sees these two pieces of paper,

8
00:00:41,000 --> 00:00:46,000
whose other side has different numbers written on them sitting on the table.

9
00:00:46,000 --> 00:00:53,000
What team two then does is picks one of the pieces of paper and turns it over and looks at the number on it.

10
00:00:53,000 --> 00:01:03,000
And then, based on what that number is, they make a decision, stick with the number they have, or switch to the other unknown number on the face down piece of paper,

11
00:01:03,000 --> 00:01:10,000
and that'll be their final number, and the game is that team two wins if they wind up with the larger number.

12
00:01:10,000 --> 00:01:17,000
So they're going to look at the number on the paper that they expose, and they're going to try to decide whether it looks like a big number or a little number.

13
00:01:17,000 --> 00:01:24,000
If it looks like a big number, they'll stick with it. If it looks like a little number, they'll switch to the other one that they hope is larger.

14
00:01:24,000 --> 00:01:28,000
So which team do you think has an advantage here?

15
00:01:28,000 --> 00:01:35,000
Of course, if you read the notes, you know, but if you haven't been exposed to this before, it's not really so obvious.

16
00:01:35,000 --> 00:01:45,000
And what we encourage and what we used to do when we ran this in real-time in classes, that we would have students in teams split their team in half.

17
00:01:45,000 --> 00:01:53,000
One would be team one and the other would be team two, and they'd play the game a few times, see if they could figure out who had the advantage.

18
00:01:53,000 --> 00:02:00,000
And if you have the opportunity, this might be a good moment to stop this video and try playing the game with some friends if they're around.

19
00:02:00,000 --> 00:02:04,000
Otherwise, let's just proceed and see how it all works.

20
00:02:04,000 --> 00:02:09,000
So this is the strategy that team two is going to adopt.

21
00:02:09,000 --> 00:02:16,000
They're going to take this idea about big and small that I mentioned and act on it in a methodical way.

22
00:02:16,000 --> 00:02:22,000
So they're going to pick a paper to expose, giving each paper equal probability.

23
00:02:22,000 --> 00:02:29,000
So that guarantees that they have a 50-50 chance of picking the big number and a 50-50 chance of picking the little number.

24
00:02:29,000 --> 00:02:40,000
Whatever ingenuity team one tried to do on which side of the piece of paper, which piece of paper was on the left and which was on the right, it doesn't really matter if team two simply picks a piece of paper at random.

25
00:02:40,000 --> 00:02:46,000
There's no way that team one can try to fake out team two on where they put the number.

26
00:02:46,000 --> 00:02:56,000
Okay. The next step is that team two is going to decide whether the number that they can see the exposed number is small and if so, they switch and otherwise they stick.

27
00:02:56,000 --> 00:03:06,000
So that is they're going to define some threshold z where being less than or equal to z means small and being greater than z means large.

28
00:03:06,000 --> 00:03:15,000
The question is how did they choose z? Well, a naive thing to do would be to choose z to be in the middle of the interval from zero to seven.

29
00:03:15,000 --> 00:03:28,000
Let's say you choose z equals three. So there would be three numbers, four numbers less than or equal to z and four numbers greater than z.

30
00:03:28,000 --> 00:03:38,000
But of course as soon as team one knew that that was your z, what would they do? Well, they would make sure that both numbers were on the same side of z.

31
00:03:38,000 --> 00:03:44,000
So if your z was three, they would always choose their numbers to be say zero and one.

32
00:03:44,000 --> 00:03:54,000
And that way when you were switching your z would tell you that you had a small number you should switch to the other one and you'd only have a 50-50 chance of winning.

33
00:03:54,000 --> 00:04:01,000
So if you fixed that value of z, team two has a way of ensuring that you have no advantage.

34
00:04:01,000 --> 00:04:06,000
But you can only win with probability 50-50 and that's true no matter what z you take.

35
00:04:06,000 --> 00:04:13,000
If team one knew what your z was, they would just make sure to pick their two numbers on the same side of your z.

36
00:04:13,000 --> 00:04:22,000
And then your z wouldn't really tell you anything. You'd switch or stick in both cases and you'd only have a 50-50 chance of picking the right number.

37
00:04:22,000 --> 00:04:37,000
So what you do, and this is where probability comes in, is you pick z in a way that can't be predicted or made use of by team one, you pick z at random to be any number from zero to seven, not including seven, including zero.

38
00:04:37,000 --> 00:04:46,000
That is your number is either zero, one, two, up through six. And being less than or equal to z means small and being greater than z means large.

39
00:04:46,000 --> 00:04:52,000
And when you see a small number, you'll switch and when you see a large number, you'll stick.

40
00:04:52,000 --> 00:05:05,000
But what's going to be large and what's going to be small is going to vary each time you play the game depending on what random numbers z comes out to be.

41
00:05:05,000 --> 00:05:11,000
So let's analyze your probability of your team two. What's the probability that you're going to win now?

42
00:05:11,000 --> 00:05:20,000
Well, let's suppose that team one picks these two numbers. We don't know what they are, but they have to pick a low number that's less than a high number.

43
00:05:20,000 --> 00:05:31,000
So these two numbers are at least one apart. They can't have the same number on both cases of paper. Otherwise, it's clear that you are not going to be able to pick the large one. That would be cheating.

44
00:05:31,000 --> 00:05:40,000
Okay, so there's two different numbers. So one of them has to be less than the other. We don't know how much less might be very a lot less might be only one less, but low is less than high.

45
00:05:40,000 --> 00:05:45,000
Okay, now we consider three cases of what happens with your strategy.

46
00:05:45,000 --> 00:05:56,000
The most interesting case is the middle case. That is when your z, which was chosen at random, happens to fall in the interval between low and high.

47
00:05:56,000 --> 00:06:05,000
That is your z is strictly less than high and greater than or equal to low. And then in that case, your z is really guiding you correctly on what to do.

48
00:06:05,000 --> 00:06:13,000
If you turn over the low card, then it's going to look low because it's less than or equal to z. So you'll switch to the high card and win.

49
00:06:13,000 --> 00:06:19,000
If you turn over the high card, it's going to be greater than z. So it'll look high and you'll notice stick with it.

50
00:06:19,000 --> 00:06:28,000
So in this case, you're going to, you're guaranteed to win. If you were lucky enough to guess the right threshold between low and high, you're going to win.

51
00:06:28,000 --> 00:06:41,000
And so the probability that you win, given the middle case occurs is one. Now what about the middle case? How often does that happen? Well, the difference between low and high is at least one.

52
00:06:41,000 --> 00:06:51,000
So there's guaranteed to be one chance in seven that your z is going to fall between them. And it could be more if low and higher further apart.

53
00:06:51,000 --> 00:06:58,000
But as long as they're at least one apart, there's a one seventh chance that you're going to fall in between them. Okay.

54
00:06:58,000 --> 00:07:07,000
Now in case h, that's the case where z happens to be chosen, greater than or equal to the high number that team one shows.

55
00:07:07,000 --> 00:07:20,000
In other words, z is bigger than both numbers that team one shows and put on the pieces of paper. Well, in that case, z just isn't telling you anything. So what's going to happen is that both numbers are going to look high to you.

56
00:07:20,000 --> 00:07:34,000
Sorry, both numbers are going to look low to you because they're both less than equal to z. So you'll switch. And that means that you'll win if and only if you happen to turn the low card over first.

57
00:07:34,000 --> 00:07:46,000
Well, that's was 50 50. So the probability that you win given that z, both cards are on the wrong side of z on the on the low side of z, you win with half the time.

58
00:07:46,000 --> 00:07:58,000
And symmetrically, if z is less than the low card that is z is less than both cards chosen by team one, then they're both going to look high. And so you'll stick. And that means that you'll stick.

59
00:07:58,000 --> 00:08:11,000
You'll stick. You win if and only if you happen to have picked the high card. There's a 50 50 chance of that. So again, in this case, that z makes both cards look high or z itself is low.

60
00:08:11,000 --> 00:08:24,000
So the team to you win with probability half. Well, that's great because now we can apply total probability. And what total probability tells us is that team two wins.

61
00:08:24,000 --> 00:08:38,000
And the is the probability that they win given case m times the probability of m plus the probability that they win given not the middle case times the probability of not the middle case.

62
00:08:38,000 --> 00:08:55,000
And what we figured out what these were, at least in equalities on them, because there's probability one that you'll win a seventh of the time. And there's probability a half that you'll win the other the rest of the time, the other six sevenths of the time.

63
00:08:55,000 --> 00:09:14,000
So you're going to win four sevenths of the time. The probability that you win playing your strategy is four sevenths. It's better than 50 50. You have an advantage. And whether that was upriari obvious or not, I don't know, but I think it's kind of cool. Okay, you win with probability four sevenths.

64
00:09:14,000 --> 00:09:33,000
Now, team two has the advantage. And it and important thing to understand is it does not matter what team does. No matter how smart team one is team two has gotten control of the situation because they picked the which piece of paper they picked at random 50 50.

65
00:09:33,000 --> 00:09:53,000
So it doesn't matter what strategy a strategy team one used on where they placed the numbers. And they chose Z randomly. So again, it doesn't matter what numbers team one chose team two is still going to have their one seventh chance of coming out ahead, which is enough to tip the balance in their favor.

66
00:09:53,000 --> 00:10:19,000
It's interesting that symmetrically team one also has a random strategy that they can use, which guarantees that no matter what team two does, they a team two wins with probability at most four sevenths. So either team can force the probability that team two wins to be at most four sevenths and at least four sevenths. So if they both play optimally, it's going to stay at four sevenths.

67
00:10:19,000 --> 00:10:34,000
And that's again true, no matter what team two does team one can put this upper bound of four sevenths on it. So and essentially we can say that the value of this game, the probability that team two wins is optimally for both is four sevenths.

68
00:10:34,000 --> 00:10:49,000
Okay, now what is this game got to do with anything with our general topic of random variables? Well, we'll be formal in a moment, but informally a random variable is simply a number that's produced by a random process.

69
00:10:49,000 --> 00:11:10,000
And just to give an example before we come up with a formal definition, the threshold variable Z was a thing that took a value from zero to six inclusive each with probability one seventh. So it was producing a number by a random process that chose a number at random with equal probability.

70
00:11:10,000 --> 00:11:32,000
If the team two plays properly at random picking which piece of paper to expose, then the number of the exposed card or more precisely whether the exposed card is high or low will also be a random variable.

71
00:11:32,000 --> 00:11:47,000
And if team one plays optimally, the number on the exposed card is going to be a random variable. That is team one in their optimal strategy that puts an upper bound of four sevenths is in fact going to choose the two numbers randomly.

72
00:11:47,000 --> 00:12:00,000
So the exposed card was going to wind up being another random variable a number produced by the random process and likewise the number of the larger card if team one play picks its larger and smaller cards randomly.

73
00:12:00,000 --> 00:12:11,000
It's going to be another example of a number produced by a random process and likewise the number of the smaller cards. So that's enough examples. This little game has a whole bunch of random variables appearing in it.

74
00:12:11,000 --> 00:12:18,000
And in the next segment we will look again officially what is the definition of a random variable.

