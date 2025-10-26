---
title: MIT6042J P94442RandomVariablesIndependenceVideo
---

1
00:00:00,000 --> 00:00:12,000
We just saw some random variables come up in the bigger number game and we're going to be talking about random variables, just formally what they are and their definition of independence for random variables.

2
00:00:12,000 --> 00:00:15,000
But let's begin by looking at the informal idea.

3
00:00:15,000 --> 00:00:19,000
Again, a random variable is a number that's produced by a random process.

4
00:00:19,000 --> 00:00:31,000
So a typical example that comes up where you get a random variable is you've got some system that you're watching and you're going to time it to see when the next crash comes if it crashes.

5
00:00:31,000 --> 00:00:47,000
So the, and assuming that this is unpredictable that happens in some random way, then the number of hours from the present until the next time the system crashes is a number that's produced by this random process of whether the system works or not.

6
00:00:47,000 --> 00:01:02,000
Number of faulty pixels in a monitor when you're building the monitors and delivering them to the actual computer manufacturers, there's a certain probability that some of the pick some of the millions of pixels in the monitor are going to be faulty.

7
00:01:02,000 --> 00:01:11,000
And you could think of that number of pixels is also produced from an unpredictable randomness in the manufacturing process.

8
00:01:12,000 --> 00:01:27,000
One that really is modeled in physics as random is when you have a Geiger counter you're measuring alpha particles, the number of alpha particles that are detected by a given Geiger counter in a second is believed to be a random number.

9
00:01:27,000 --> 00:01:34,000
There's a distribution that it has, but the number of alpha particles is not always the same from second to second.

10
00:01:34,000 --> 00:01:53,000
And so it's a random variable. And finally, we'll look at the standard abstract example of flip coins. And if I flip coins, then the number of heads in a given number of flips, let's say I flip a coin and times, the number of heads will be another rather standard random variable.

11
00:01:54,000 --> 00:02:02,000
What is abstractly a random variable? Oops, I'm getting ahead of myself again. Let's look at that example of three fair coins.

12
00:02:02,000 --> 00:02:11,000
So each coin has a probability of being heads that's a half and tails being a half. I'm going to flip the three of them. And I'm going to assume that they're distinguishable.

13
00:02:11,000 --> 00:02:20,000
So there's a first coin, a second coin, and a third coin or alternatively, you could think of flipping the same coin three times.

14
00:02:20,000 --> 00:02:33,000
So the number of heads is a number that comes out of this random process of flipping the three coins. So it's a number that's either from zero to three. There could be no heads or all heads.

15
00:02:33,000 --> 00:02:40,000
So it is a basic example of a random variable where you're producing this integer based on how the coins flip.

16
00:02:41,000 --> 00:02:55,000
Another one is simply a zero one valued random variable where it signals one if all three coins match in what they come up with and zero if they don't match.

17
00:02:56,000 --> 00:03:04,000
Now, once I have these random variables defined, one of the things that's convenient, convenient use of random variables is to use them to define various kinds of events.

18
00:03:04,000 --> 00:03:15,000
So the event that C equals one, that's an event that, you know, it's a random, it's a set of outcomes where the count is one and it has a certain probability.

19
00:03:15,000 --> 00:03:26,000
This is the event of exactly one head. There are three possible outcomes among the eight outcomes of heads and tails with three coins. So it has probability three eighths.

20
00:03:26,000 --> 00:03:38,000
I could also just talk about the outcome that C is greater than or equal to one. Well, C is greater than or equal to one when there is at least one head or put another way.

21
00:03:38,000 --> 00:03:48,000
The only time that C is not greater or equal to one is when you have all tails. So there's a seven eighths chance seven out of eight outcomes involved one or more heads.

22
00:03:48,000 --> 00:03:57,000
So the probability that C greater or equal to one is seven eighths. Here's a weirder one. I can use the two variables, C and M to define an event.

23
00:03:57,000 --> 00:04:07,000
What's the probability that C times M is greater than zero? Well, since C and M are both non-negative variables, the probability that their product is greater than zero is equal to zero.

24
00:04:07,000 --> 00:04:12,000
Is equal to the probability that each of them is greater than zero.

25
00:04:12,000 --> 00:04:20,000
Okay. What does it mean that M is greater than zero and C is greater than zero? Well, it says there's at least one head. That's what C greater than zero means.

26
00:04:20,000 --> 00:04:31,000
And M greater than zero means all the coins match. This is an obscure way of describing the event all heads. And it has, of course, probability one eighth.

27
00:04:31,000 --> 00:04:41,000
Now we come to the formal definition. So formally, a random variable is simply a function that maps outcomes in the sample space to numbers.

28
00:04:41,000 --> 00:04:51,000
We think of the outcomes in the sample space as the results of a random experiment. They are an outcome and they have a probability.

29
00:04:51,000 --> 00:05:01,000
And when the outcome is translated into a real number that you think of as being produced as a result of that outcome, that's what the random variable does.

30
00:05:01,000 --> 00:05:11,000
So formally, a random variable is not a variable or it's a function that maps the sample space to the real numbers. And it's got to be total, by the way, it's a total function.

31
00:05:11,000 --> 00:05:21,000
Usually, this would be a real value random variable. Usually, it's the real numbers might be a subset of the real numbers like the integer valued random variables.

32
00:05:21,000 --> 00:05:32,000
Occasionally, we'll use complex valued random variables. Actually, that happens in physics, a good deal in quantum mechanics, but not for our purposes.

33
00:05:32,000 --> 00:05:39,000
We're just going to mean real value from now on when we talk about random variables.

34
00:05:39,000 --> 00:05:52,000
So abstractly or intuitively, what the random variables doing really is it's just packaging together in one object, R, the random variable, a whole bunch of events that are defined by the value that R takes.

35
00:05:52,000 --> 00:05:59,000
So for every possible real number, if I look at the event that R is equal to A, that's an interesting event.

36
00:05:59,000 --> 00:06:11,000
And it's part of, it's one of the basic events that R puts together. And if you knew the answer to all of these R equals A's, then you really know a lot about R.

37
00:06:11,000 --> 00:06:25,000
And with this understanding that R is a package of events of the form R is equal to A, then a lot of event properties carry right over to random variables directly.

38
00:06:25,000 --> 00:06:33,000
That's why this little topic of introducing random variables is also about independence because the definition of independence carries right over.

39
00:06:33,000 --> 00:06:43,000
Namely, a bunch of random variables are mutually independent. If the events that they define are all mutually independent.

40
00:06:43,000 --> 00:07:01,000
So if and only if the events that are, each event defined by R1 and R2 and through Rn, that set of events are mutually independent, no matter what the values are chosen that we decide to look at for R1 and R2 through Rn.

41
00:07:01,000 --> 00:07:13,000
And of course, there's an alternative way we can always express independent events in terms of products instead of conditional probabilities.

42
00:07:13,000 --> 00:07:21,000
So we could say or instead of invoking the idea of mutual independence, we can say explicitly where it comes from as an equation.

43
00:07:21,000 --> 00:07:37,000
So that means that the probability that R1 is equal to A1 and R2 is equal to A1 and Rn is equal to An is equal to the product of the individual probabilities that R1 is A1 times the probability that R2 is A2.

44
00:07:37,000 --> 00:07:51,000
And the definition of mutual independence of the random variables R1 through N holds is that this equation holds for all possible values, little A1 through little An.

45
00:07:51,000 --> 00:08:03,000
So let's just practice. The variable C, which is the count of the number of heads when you flip three coins and M, the zero one valued random variable that tells you whether there's a match, are they independent?

46
00:08:03,000 --> 00:08:13,000
Well, certainly not because there's definitely a positive probability that the count will be one that you'll get at least ahead.

47
00:08:13,000 --> 00:08:21,000
And there's a positive probability that they all will match, so the probability of a quarter. So the product of those two is positive.

48
00:08:21,000 --> 00:08:31,000
But of course, the probability that you match and you'll have exactly one head is zero. Because if you have exactly one head, you must have two tails and there's no match.

49
00:08:31,000 --> 00:08:47,000
So without thinking very hard about what the probabilities are, we can immediately see that the product is not equal to the probability of the conjunction or the AND, and therefore they're not independent.

50
00:08:47,000 --> 00:09:00,000
Well, here's one that's a little bit more interesting. In order to explain it, I got to set up the idea of an indicator variable, which itself is a very important concept. So if I have an event A, I can package A into a random variable.

51
00:09:00,000 --> 00:09:14,000
Just like the match random variable was really packaging the event that the coins matched into a zero one valued variable, I'm going to define the indicator variable for any event A to be one if A occurs in zero if A does not occur.

52
00:09:14,000 --> 00:09:26,000
So now I have, I'm able to capture everything that matters about an event A by the random variable I sub A. If I have I sub A, I know what A isn't. If I have A, I know what I sub A is.

53
00:09:26,000 --> 00:09:35,000
And that means that really I can think of events as special cases of random variables. Now when you do this, you need a sanity check.

54
00:09:35,000 --> 00:09:55,000
Because remember, we've defined independence of random variables one way. I mean, it's a concept of independence that holds for random variables. We have another concept of independence that holds for events. Now, the definition for random variable would motivated by the definition of for events, but it's a different definition of independence of different kinds of objects.

55
00:09:55,000 --> 00:10:16,000
Now, if this correspondence between events and indicator variables is going to make sense and not confuse us, it should be the case that two events are independent. If and only if their indicator variables are independent, that is IA and IB are independent, if and only if the events A and B are independent.

56
00:10:16,000 --> 00:10:43,000
And this is a lovely little exercise. It's like a three line proof for you to verify. I'm not going to bother to do it on the slide because it's good practice. So this would be a moment to stop and verify that using the two definitions of independence, the definition of what it means for IA and IB to be independent as random variables and comparing that to the definition of what it means for A and B to be independent as events, they match.

57
00:10:43,000 --> 00:11:02,000
If we look at the event of an odd number of heads, we can ask now whether the event M of the, which is the indicator variable for a match, the random variable M and the indicator variable I sub O are dependent or not.

58
00:11:02,000 --> 00:11:20,000
Now, both of these depend on all the three coins. I sub O is looking at all three coins to see if they're an odd number of heads and is looking at all three coins to see if they're all heads or all tails. And it's not clear with all that common basis for returning what value they have.

59
00:11:20,000 --> 00:11:49,000
It's not well immediately obvious that they're independent, but as a matter of fact, they are. And again, this is absolutely something that you should check out. If you don't stop the video now to work it out, you should definitely do it afterward. It's an important little exercise. And this easy to check. All you have to do is check that the probabilities of the event of an odd, that the event odd number of heads and the event all match are independent as events, or you could use the random variable definition.

60
00:11:50,000 --> 00:12:02,000
And check that these two random variables were independent by checking four equations, because this can have value of zero and one, and this can have value of zero and one.

61
00:12:02,000 --> 00:12:16,000
Remember with random event, with independent events, we had the idea that if A was independent of B, it really meant that A was independent of everything about B in particular was independent of the complement of B as well.

62
00:12:16,000 --> 00:12:37,000
And a similar property holds for random variables. So intuitively, if R is independent of S, then R is really independent of any information at all that you have about S. And that can be made more precise that R is independent of any information about S by saying, pick an arbitrary function that maps R to R total function.

63
00:12:37,000 --> 00:12:56,000
What I can do is think of F is giving me some information about the value of S. So if R is independent of S, then in fact R is independent of F of S any transformation of S by a fixed non-random function.

64
00:12:56,000 --> 00:13:14,000
And of course the notion of K-way independence carries right over from the event case. If I have K random variable, if I have a bunch of random variables, a large number, much more than K, their K-way independent of every set of K of them are mutually independent.

65
00:13:14,000 --> 00:13:42,000
And of course, as with events, we use the two-way case to call them pairwise independent. Again, we saw an example of this in terms of events already, but we can rephrase it now in terms of indicator variables. If we let H i be the indicator variable for a head on a flip i of the i flip of a coin where i ranges from one through K, if we have K coins.

66
00:13:42,000 --> 00:14:08,000
And H i is the indicator variable for how coin i came out, whether or not there's a head. Now, oh, can be nicely expressed. The notion that there's an odd number of heads is simply the mod 2 sum of the H i's. And this by the way is a trick that we'll be using regularly that events now can be defined rather nicely in terms of doing operations on the arithmetic values of indicator variables.

67
00:14:08,000 --> 00:14:31,000
So, oh, is nothing but the mod 2 sum of the values of the indicator variables H i from one to K. And what we saw when we were working with their event version is that any K of these events are independent. I've got K plus 1. There's K H i's and there's oh, which makes the K plus 1th K plus 1st.

68
00:14:39,000 --> 00:14:53,000
And the reason why any K of them were independent was discussed in the previous library, we were looking at the events of there being an odd number of heads and a head coming up on the i flip.

69
00:14:54,000 --> 00:15:05,000
The reason why pair wise independence gets singled out is that we'll see that for a bunch of major applications, this pair wise app like pair wise independence is sufficient.

70
00:15:05,000 --> 00:15:13,000
And rather than verifying mutual independence, it's harder to check mutual independence. You've got a lot more equations to check.

71
00:15:13,000 --> 00:15:29,000
And in fact, it often doesn't hold in circumstances where pair wise does hold. So this is good to know we'll be making use of it in an application later when we look at sampling and the law of large numbers.

