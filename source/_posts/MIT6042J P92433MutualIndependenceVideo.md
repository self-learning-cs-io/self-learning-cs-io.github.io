---
title: MIT6042J P92433MutualIndependenceVideo
---

1
00:00:00,000 --> 00:00:03,000
We've looked at independence for two events.

2
00:00:03,000 --> 00:00:05,000
What about when we have a bunch of events?

3
00:00:05,000 --> 00:00:10,000
Well, in that case, we want to look at the idea of mutual independence.

4
00:00:10,000 --> 00:00:12,000
So let's check that out.

5
00:00:12,000 --> 00:00:15,000
I'll say that if I have end different events,

6
00:00:15,000 --> 00:00:19,000
I'll say that they're mutually independent intuitively.

7
00:00:19,000 --> 00:00:26,000
If the probability that one of them occurs is unchanged by which other ones happen to have occurred.

8
00:00:26,000 --> 00:00:30,000
So expressed in conditional probability, which is the way to make it precise,

9
00:00:30,000 --> 00:00:34,000
what we're really saying is that events A1 through A and are mutually independent.

10
00:00:34,000 --> 00:00:40,000
When the probability of A i is equal to the probability of A i,

11
00:00:40,000 --> 00:00:44,000
given the intersection of any of the other As,

12
00:00:44,000 --> 00:00:47,000
other as long as i is not one of them.

13
00:00:47,000 --> 00:00:52,000
So take A1, A2, or A1, A2, A3, and so on.

14
00:00:52,000 --> 00:01:00,000
And A5 is going to be independent of all of those other intersections.

15
00:01:00,000 --> 00:01:07,000
If we shift over to the other definition of independence that we used for two sets in terms of products,

16
00:01:07,000 --> 00:01:16,000
you could say that end sets are mutually independent when the probability of the intersection of any bunch of them

17
00:01:16,000 --> 00:01:24,000
is equal to the product of the individual probabilities of the events in the intersection.

18
00:01:24,000 --> 00:01:26,000
Let's look at an example of mutual independence.

19
00:01:26,000 --> 00:01:33,000
Maybe the simplest one is the one of independent coin flips, which by definition are independent.

20
00:01:33,000 --> 00:01:39,000
So the idea is that I will flip a coin a bunch of times,

21
00:01:39,000 --> 00:01:45,000
and I will let H i be the event that the i time I flip I get ahead.

22
00:01:45,000 --> 00:01:55,000
So if you think about what's going on, what happens on the fifth flip has nothing to do with what happens on the first four or seventh flip.

23
00:01:55,000 --> 00:02:01,000
There's no causal relationship between the flips before or after flip five.

24
00:02:01,000 --> 00:02:06,000
Flip five is an isolated event by itself, and the fact that there were a bunch of heads before

25
00:02:06,000 --> 00:02:13,000
or there will be a bunch of heads afterward doesn't have any impact on the probability that the fifth flip comes up with a head.

26
00:02:13,000 --> 00:02:17,000
At least that's what we believe, and that's the way that we would model.

27
00:02:17,000 --> 00:02:24,000
So what that means, for example, is that the probability of a head on the fifth toss is equal to the probability of a head on the fifth toss,

28
00:02:24,000 --> 00:02:30,000
given that the first toss was a head and the second and the fourth toss was a head, and the seventh toss was not a head.

29
00:02:30,000 --> 00:02:33,000
This is the complement of H seven.

30
00:02:33,000 --> 00:02:42,000
So that would just be an example of one of the many different conditional equal equations that hold when you have mutual independence.

31
00:02:43,000 --> 00:02:45,000
Let's look at an example.

32
00:02:45,000 --> 00:02:53,000
Suppose that I flip a fair coin twice. Now the previous definition didn't require fairness at all in the coin flipping, but now I'm going to need it.

33
00:02:53,000 --> 00:02:58,000
So that means that heads and tails are equally likely. And suppose I flip the coin twice.

34
00:02:58,000 --> 00:03:08,000
Well, let H one be the, as before, the probability, the event that a head comes up on the first flip in H two, the event that a head comes up on the second flip,

35
00:03:08,000 --> 00:03:14,000
and let all be the event that there were an odd number of heads in the two flips.

36
00:03:14,000 --> 00:03:20,000
Now I claim that all is independent of whether or not there's a head on the first flip.

37
00:03:20,000 --> 00:03:25,000
That may seem a little weird, because all depends on both the first flip and the second flip.

38
00:03:25,000 --> 00:03:35,000
It's whether or not there are an odd number of heads there, but nevertheless, I claim that whether or not there are an odd number of heads is independent of whether or not the first toss was a head.

39
00:03:35,000 --> 00:03:39,000
Let's just check it using the official definition.

40
00:03:39,000 --> 00:03:49,000
First of all, O is the event, HTTH. If I write out Hs and Ts, a pair of them for what the results of this first and second flips were.

41
00:03:49,000 --> 00:03:56,000
Oh, you get an odd number of heads exactly when there's a first ahead and then a tail or first a tail and then a head.

42
00:03:56,000 --> 00:04:07,000
Which means that the probability of O is exactly a half, because the other two outcomes are TT and HH, which is when you have an even number of heads.

43
00:04:07,000 --> 00:04:17,000
Now, O into section H1 is saying that you have an odd number of heads and the first toss is a head.

44
00:04:17,000 --> 00:04:24,000
The only outcome that fits that description is HT, which means that the probability of HT is a quarter.

45
00:04:24,000 --> 00:04:34,000
So the probability of O intersection H1 is a quarter. O intersection H1 is just a peculiar way of saying you got ahead and then you got a tail.

46
00:04:34,000 --> 00:04:39,000
So that means that the probability of O intersection H1 is a quarter.

47
00:04:39,000 --> 00:04:48,000
And of course, that's equal to the probability of O, which we decided was a half and the probability of H1, which of course is a half, because we said the coin was fair.

48
00:04:48,000 --> 00:04:56,000
So I've verified the condition for the independence of O and H1 and therefore I'm done.

49
00:04:56,000 --> 00:05:07,000
But the weird thing to notice now is that if you look at O, H1, and H2, the three of them, they are not mutually independent.

50
00:05:07,000 --> 00:05:24,000
Because in fact, if you know any two of them, you can figure out what the third one was, but just explicitly in terms of conditional probabilities, the probability of there being an odd number of heads given that the first toss was a head and the second toss was a head is zero.

51
00:05:24,000 --> 00:05:30,000
Because once you know H1 and H2, you know exactly how many heads there were, there were two and that's not odd.

52
00:05:30,000 --> 00:05:38,000
So the probability of odd given H1 intersection H2 is zero, which is not equal to the probability of odd by itself, which was a half.

53
00:05:38,000 --> 00:05:44,000
So the three of them are not independent. They're not mutually independent.

54
00:05:44,000 --> 00:05:54,000
Even though any two of them are, because O and H1 are, and obviously O and H2 are by symmetry, and H1 and H2 are coin tosses and they're independent.

55
00:05:55,000 --> 00:06:19,000
So that leads us to the general idea of K-way independence. And an example would be, if you flip a fair coin K times, let HIB, whether or not there's a head on the Ith flip, and you let O again be whether or not there are an odd number of heads, and by the same argument, you can verify that any set of K of these events are mutually independent.

56
00:06:19,000 --> 00:06:29,000
But if you give me all K plus one, then they are not independent. In fact, any K of them will determine the K plus first one.

57
00:06:29,000 --> 00:06:40,000
But any K of them among themselves will be mutually independent. So that's why this notion of how independent a set of a bunch of sets are comes up, and this is how to count it.

58
00:06:41,000 --> 00:06:54,000
So in general, events A1 through an arbitrary set of events are K-way independent. If any K of them are mutually independent, a pairwise then is just the case of two-way independence.

59
00:06:54,000 --> 00:07:08,000
And what we saw was the example that with K coin flips, the events odd and the outcomes of head or not on H1 through HK are K-way independent, but not K plus one-way independent.

60
00:07:10,000 --> 00:07:19,000
By the way, now that we understand what K-way independence is, mutual independence of N sets is simply N-way independence.

61
00:07:19,000 --> 00:07:37,000
But I just wanted to close with the remark that checking that N events are mutually independent means that you actually have to check all the intersections equalling the products of the individual events in the intersections,

62
00:07:37,000 --> 00:07:51,000
so that there are two to the N possible collections of subsets of A1 through AN, and you have to check for each of them that the intersection of those ones that you chose is equal to the product of their probabilities.

63
00:07:51,000 --> 00:08:02,000
But of course, you don't need to check the empty selection, and you don't need to check the single-consets. So you just have to check the two to the N equations corresponding to all the subsets of size more than one.

64
00:08:02,000 --> 00:08:17,000
So it's two to the N minus N plus one equations to check. So in general, it's not going to be easy to verify mutual independence by doing this kind of a calculation, and you usually arrive at it by really by assumption most of the time.

