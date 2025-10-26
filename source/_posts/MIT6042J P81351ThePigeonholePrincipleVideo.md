---
title: MIT6042J P81351ThePigeonholePrincipleVideo
---

1
00:00:00,000 --> 00:00:06,360
The pigeonhole principle is accounting principle that's so obvious that you may not have noticed that you're using it.

2
00:00:06,360 --> 00:00:19,000
In simple form it says that if there are more pigeons, then pigeonholes, then you have to have at least two pigeons in the same hole.

3
00:00:19,000 --> 00:00:29,800
Okay, we'll get some mileage out of that shortly, but let's remember that this is actually just an informal way of saying something.

4
00:00:29,800 --> 00:00:51,200
That we've formally seen already. One of the mapping rules is that if you have a total injection from a set A to a set B, that implies that the size of A is less than or equal to the size of B, and taking the contrapositive of that, it means that if the size of A is greater than the size of B, then no total injection from A to B is possible.

5
00:00:51,200 --> 00:01:11,600
No total injection means that there's no relation that has an arrow out of everything in A, and at most one arrow into B. If everything out of A has an arrow out of it, there have to be at least two arrows, two pigeons coming to the same pigeonhole in B.

6
00:01:11,599 --> 00:01:17,399
So we know this rule already, and the only thing that's surprising about it is how you make use of it.

7
00:01:17,399 --> 00:01:41,399
We're not going to make elaborate uses of it in this little video. You can read in the text about some amusing applications about proving that there have to be three people in the Boston area with more than 10,000 hairs in their heads, but the exact same number, or that there have to be two different subsets of 90 numbers of 25 digits that have the same size.

8
00:01:41,400 --> 00:01:54,600
So we'll take a much more modest application of the pigeonholing principle, namely, if I have a set of five cards, then I have to have at least two cards with the same suit.

9
00:01:54,600 --> 00:02:04,800
Why? Well, there are four suits, Spades, Hearts, Time, and Clubs indicated here, and if you have five cards, there's more pigeons, cards, then suits, holes.

10
00:02:04,799 --> 00:02:18,000
So if you're going to assign a pigeon to a hole, again, the pigeons are going to have to crowd up, they're going to have to be at least two pigeons in the same hole, at least two cards of the same suit, maybe more.

11
00:02:18,000 --> 00:02:31,000
Okay, this is like generalization. Suppose I have 10 cards. How many cards must I have of the same suit? What number of cards of the same suit am I guaranteed to have no matter what the 10 cards are?

12
00:02:31,000 --> 00:02:52,400
Well, now, if I have the four slots that I'm trying to distribute 10 cards, is it possible that I had less than three cards in every hole? No, because if I have only two cards in every hole, then I have at most eight elements, and I got 10 to distribute in the four slots, I have to bunch them up and have at least three cards of the same suit.

13
00:02:52,400 --> 00:02:56,400
So you can check that I didn't have any more, of course.

14
00:02:56,400 --> 00:03:15,000
So the reasoning here is that the number of cards with the same suit is going to be what you get by dividing up the 10 cards that you have by the four slots, and argue that at least one of the slots has to have an average number of cards, namely 10 over four.

15
00:03:15,000 --> 00:03:26,000
So I can't all be below average, and of course, since there are an integer number of cards, you can round up this, remember, these corner braces mean round up to the nearest integer.

16
00:03:26,000 --> 00:03:41,000
So 10 divided by four, round it up is three, and that's a lower bound on the number of cards that you have to bunch up in one slot.

17
00:03:41,000 --> 00:04:08,000
So generally, if I have n pigeons, and I'm going to be assigning pigeons to weak holes, and if I have h holes, then some hole has to have n divided by h, round it up again, n divided by h can be understood as the average number of pigeons per hole, and the pigeonhole principle can be formulated as saying at least one hole has to have greater than or equal to the average number.

18
00:04:08,000 --> 00:04:13,000
And that is the generalized pigeonhole principle.

