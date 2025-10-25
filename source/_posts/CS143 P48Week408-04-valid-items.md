---
title: CS143 P48Week408 04 Valid Items
---

1
00:00:00,000 --> 00:00:09,279
In this video, we're going to use our example of Tomatán for recognizing Bible prefixes

2
00:00:09,279 --> 00:00:16,480
to introduce one more idea, the idea of a valid item.

3
00:00:16,480 --> 00:00:19,240
For fresh your memory, here's where we left off last time.

4
00:00:19,240 --> 00:00:24,359
This is the complete non-deterministic Tomatán for recognizing the Bible prefixes of the

5
00:00:24,359 --> 00:00:26,240
example grammar.

6
00:00:26,239 --> 00:00:31,519
And using the standard subset of state's construction, we can build a deterministic Tomatán

7
00:00:31,519 --> 00:00:34,920
that is equivalent to the non-deterministic Tomatán.

8
00:00:34,920 --> 00:00:39,359
So here's the deterministic Tomatán that recognizes exactly the same language.

9
00:00:39,359 --> 00:00:45,399
This deterministic Tomatán recognizes the viable prefixes of our example grammar.

10
00:00:45,399 --> 00:00:48,959
But now notice that each state is a set of items.

11
00:00:48,959 --> 00:00:54,280
So there's a set of non-deterministic Tomatán states in each of these states and recall

12
00:00:54,280 --> 00:01:00,800
that what that means is that the non-deterministic Tomatán could be in any one of these states.

13
00:01:00,800 --> 00:01:06,240
And in particular, this state here is the start state because it has the item s prime

14
00:01:06,240 --> 00:01:14,799
goes to dot e. The states of this deterministic Tomatán are called variously the canonical

15
00:01:14,799 --> 00:01:19,439
collections of items or the canonical collections of LR zero items.

16
00:01:19,439 --> 00:01:23,280
If you look in the dragon book, it gives another way of constructing the LR zero items than

17
00:01:23,280 --> 00:01:24,920
the one that I gave.

18
00:01:24,920 --> 00:01:30,439
Mine is somewhat simplified, but I think also a little easier to understand if you're seeing

19
00:01:30,439 --> 00:01:33,040
this for the first time.

20
00:01:33,040 --> 00:01:35,040
Now we need another definition.

21
00:01:35,040 --> 00:01:42,200
We'll say that a given item is valid for a viable prefix alpha beta if the following

22
00:01:42,200 --> 00:01:43,200
is true.

23
00:01:43,200 --> 00:01:48,000
That beginning from the start symbol, this is our extra start symbol.

24
00:01:48,000 --> 00:01:54,239
And by a series of right most derivation steps, we can get to a configuration alpha x omega

25
00:01:54,239 --> 00:01:59,480
and then in one step, x can go to beta gamma.

26
00:01:59,480 --> 00:02:05,240
And what this says is that after parsing alpha and beta, after seeing alpha and beta on

27
00:02:05,240 --> 00:02:11,599
the stack, the valid items are the possible tops of the stack of items that we could, this

28
00:02:11,599 --> 00:02:18,560
item could be the termination state of the non-deterministic Tomatán.

29
00:02:18,560 --> 00:02:23,959
A simpler way of explaining the same idea is that for a given viable prefix alpha, the

30
00:02:23,959 --> 00:02:29,039
items that are valid for that prefix are exactly the items that are in the final state of

31
00:02:29,039 --> 00:02:31,400
the DFA after it reads that prefix.

32
00:02:31,400 --> 00:02:39,400
So these are the items that describe the state after you've seen the stack alpha.

33
00:02:39,400 --> 00:02:42,240
Now an item is often valid for many, many prefixes.

34
00:02:42,240 --> 00:02:50,000
So for example, the item t goes to openparen.e closed parent is valid for all sequences of

35
00:02:50,000 --> 00:02:51,560
open parent.

36
00:02:51,560 --> 00:02:57,080
And to see that, we can just look at our Tomatán and confirm that if we see an open parent, remember

37
00:02:57,080 --> 00:02:58,759
this is the start state.

38
00:02:58,759 --> 00:03:03,080
So if we see an open parent, we take this transition, we wind up in this state here.

39
00:03:03,080 --> 00:03:07,200
And then every open parent we see, we just go around and round in this state.

40
00:03:07,199 --> 00:03:13,399
If I have a sequence of five open parents as my input, then I'll have transitions one,

41
00:03:13,399 --> 00:03:17,479
two, three, four, five, all looping in this state.

42
00:03:17,479 --> 00:03:22,479
And notice that this item is one of the items in that state.

43
00:03:22,479 --> 00:03:28,500
And that just says that this item is valid for any prefix, excuse me, any sequence of open

