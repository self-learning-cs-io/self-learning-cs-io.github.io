---
title: MIT6042J P78343TwoPairPokerHandsVideo
---

1
00:00:00,000 --> 00:00:12,000
So let's do a basic example of counting that illustrates the use of these new generalized rules of the division rule and the generalized product rule.

2
00:00:12,000 --> 00:00:17,000
And let's count some particular kind of poker hands called a two pair.

3
00:00:17,000 --> 00:00:25,000
So poker is a game where each player is dealt five cards from a deck of 52 cards.

4
00:00:25,000 --> 00:00:33,000
And the definition of a two pair hand is that there are two cards of some rank.

5
00:00:33,000 --> 00:00:40,000
The ranks are A's doose up through king. So the ranks are 13 possible ranks.

6
00:00:40,000 --> 00:00:46,000
A's is 1, 2, 3, up through 10 and then Jack Queen King is 11, 12, 13.

7
00:00:46,000 --> 00:00:52,000
So there are 13 possible ranks. We're going to choose two cards of some rank. That's called a pair.

8
00:00:52,000 --> 00:00:57,000
Then we're going to choose two cards of a different rank, the second rank.

9
00:00:57,000 --> 00:01:10,000
And finally, we're going to choose a card of still a third rank. So I get a pair and another pair and another card that does not match the ranks of either of the first two.

10
00:01:10,000 --> 00:01:15,000
And that is the definition of a hand that a poker is called two pair.

11
00:01:15,000 --> 00:01:22,000
So let's take an example. Here's a typical two pair hand. I've got two kings. They both have rank 13.

12
00:01:22,000 --> 00:01:31,000
One is a king of diamonds, the other is a king of hearts. There are four of these suits, so-called diamonds, hearts, spades, clubs.

13
00:01:31,000 --> 00:01:37,000
There are two A's, a pair of A's, one is an ace of diamonds, the other is an ace of spades.

14
00:01:37,000 --> 00:01:46,000
And finally, they're hanging loose this third rank that doesn't match the kings of the ace, namely a three of clubs.

15
00:01:46,000 --> 00:01:52,000
Now, the way that I'm going to propose to count the number of two pair hands is to think about it this way.

16
00:01:52,000 --> 00:02:01,000
I'm going to begin by choosing the rank for the first pair. And there are 13 possible ranks that the first pair might have.

17
00:02:01,000 --> 00:02:10,000
But once I've fixed the rank for the first pair, the second pair has to have a different rank. So there are 12 ranks left.

18
00:02:10,000 --> 00:02:22,000
And once I've picked those two ranks for the ranks for the two pairs, then I have the rank of the last card, which is 11 possible choices.

19
00:02:22,000 --> 00:02:37,000
Then in addition, once I've chosen the rank of the first pair, the rank of the second pair, and the rank of the loose card, the fifth card, I select a pair of suits to go for the first pair.

20
00:02:37,000 --> 00:02:52,000
So let's say of the first pair I figured out we're going to be two A's, which two A's should they be? Well, pick two of the four suits, and there are four choose two ways to choose the suits for the pair of A's.

21
00:02:52,000 --> 00:02:58,000
Likewise, there are four choose two ways to choose the two suits for the pair of kings.

22
00:02:58,000 --> 00:03:06,000
And finally, there are four possible suits I can choose for the rank of the last card.

23
00:03:06,000 --> 00:03:21,000
So that says that I might, for example, specify a two pair hand by saying, okay, let's choose a pair of kings to come first, and a pair of A's to be the second pair, and a three to be the loose card.

24
00:03:21,000 --> 00:03:31,000
Let's choose the set of two elements, diamonds and hearts for the kings, the two elements, diamonds and spades for the A's, and a club for the three.

25
00:03:31,000 --> 00:03:44,000
This sequence of choices specifies exactly the two pair hand that we illustrated on the previous slide, namely two kings of diamond and hearts, two A's, a diamond and a spade, and the three of clubs.

26
00:03:45,000 --> 00:03:50,000
So I can count the number of two pair hands fairly straight forwardly.

27
00:03:50,000 --> 00:04:06,000
There were 13 choices for the rank of the first pair, 12 for the second, 11 for the rank of the third card, four choose way to choose the suits for the first pair, four choose way to choose two ways to choose the suits for the second pair, and four ways to choose the suits for the last pair.

28
00:04:06,000 --> 00:04:17,000
So this is the total, 13 times 12 times 11 times four choose to twice, times four, and that's not right. There's a bug. What's the bug?

29
00:04:17,000 --> 00:04:35,000
Well, the problem is that what I've described and this number on the previous slide, that number, is exactly the set of six two pulls consisting of the first card ranks and the second card ranks and the last card rank and the first card suits for the first card.

30
00:04:35,000 --> 00:04:58,000
So the second card suits and the last card suit, that is if it's counting the number of possible ranks for a first choice, the number of possible ranks for a second choice, third and so on, this set of six things are being counted correctly by the formula on the previous page.

31
00:04:58,000 --> 00:05:27,000
The difficulty is that the, the, the, the six counting these six two pulls is not the same as counting the number of two pair hands. We've counted the number of six two pulls of this kind correctly but not the number of two pair hands because this mapping from six two pulls to two pair hands is not a bijection. Namely, if I look at the two pull, the six two pull choose kings and then ace is in a three with these suits and those suits and a final suit for the first pair.

32
00:05:27,000 --> 00:05:56,000
So the final suit for the three which determines this hand, the King of Diamonds, King of Hearts, Ace of Diamonds, Ace of Spades, three of clubs, there's another suit's two pull that would also yield the same hand. Namely, what I can do is I'll keep the three of clubs specified but instead of choosing the kings and their suits and the aces and their suits, I'll choose the aces and their suits and the kings and their suits.

33
00:05:56,000 --> 00:06:08,000
So I'm just switching these two entries and those two entries and if I do that, here's a different six two pull that's specifying the same two pair hand.

34
00:06:08,000 --> 00:06:22,000
That is, this two pull is specifying a pair of aces and a pair of kings where the aces have suits, diamond spades and the kings have spades, have suits, diamond hearts and the three has suits clubs.

35
00:06:22,000 --> 00:06:38,000
So the bug in our reasoning was that when we were counting and we said there are 13 possible ranks for the first pair and there are 12 possible ranks for the second pair and we were distinguishing the first pair from the second pair, that was a mistake.

36
00:06:38,000 --> 00:07:02,000
There isn't any first pair and second pair, there are simply two pairs and there's no way to tell which is first and which is second, which is why we got two different ways from our sex two pulls of mapping to the same two pair depending in the sex two pull, which of the two pair I wanted to list first.

37
00:07:02,000 --> 00:07:13,000
So in fact, since either pair might be first, what I get is that this map from six two pulls to two pair hands is actually a two to one mapping.

38
00:07:13,000 --> 00:07:21,000
It's not a bijection because there's no difference between the first pair and the second pair or there's just a couple of pair.

39
00:07:21,000 --> 00:07:45,000
If I do that, then I can fix this formula. Now that I realize that the mapping from these six toples, which I've counted correctly to the things I want to count namely the two pair hands is two to one, then by the generalized product rule, by the division rule, all I need to do is divide this number by a half and that is really the answer of the number of two pair hands.

