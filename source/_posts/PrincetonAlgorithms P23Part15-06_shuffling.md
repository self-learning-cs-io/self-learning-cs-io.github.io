---
title: PrincetonAlgorithms P23Part15 06_shuffling
---

1
00:00:00,000 --> 00:00:10,120
Next we're going to look at an easy application of sorting to a related problem called shuffling.

2
00:00:10,120 --> 00:00:12,519
So suppose you have a deck of cards.

3
00:00:12,519 --> 00:00:17,320
One of the things that you might want to try to do is to simply rearrange those cards into

4
00:00:17,320 --> 00:00:18,320
random order.

5
00:00:18,320 --> 00:00:20,039
That's called shuffling.

6
00:00:20,039 --> 00:00:24,519
Here's a way to get shuffling done using a sort.

7
00:00:24,519 --> 00:00:27,000
It seems like the opposite.

8
00:00:27,000 --> 00:00:34,240
The idea is just generate a random real number for every array entry and then sort using

9
00:00:34,240 --> 00:00:38,480
those random numbers as the keys.

10
00:00:38,480 --> 00:00:43,280
That's an effective way to get things shuffled.

11
00:00:43,280 --> 00:00:49,280
And it's possible to prove that that produces a uniformly random permutation in the input

12
00:00:49,280 --> 00:00:51,000
of there's no duplicate values.

13
00:00:51,000 --> 00:00:55,240
Assuming that you have real numbers that are generated uniformly at random.

14
00:00:55,240 --> 00:00:57,640
And that just means that it's well shuffled.

15
00:00:57,640 --> 00:01:03,880
That every possible way of shuffling the deck appears with equal probability.

16
00:01:03,880 --> 00:01:06,000
That's fine, but it requires a sort.

17
00:01:06,000 --> 00:01:09,680
And the sort seems like a lot of work for this problem.

18
00:01:09,680 --> 00:01:11,359
And the question is, can we do better?

19
00:01:11,359 --> 00:01:13,599
Can we have a faster way to shuffle?

20
00:01:13,599 --> 00:01:15,879
Do we really need to pay the cost of a full sort?

21
00:01:15,879 --> 00:01:19,000
And the answer to that question is no.

22
00:01:19,000 --> 00:01:25,120
There's actually a very easy way to rearrange an array so that the result is a uniformly

23
00:01:25,120 --> 00:01:32,519
random permutation and only require linear time to get the job done.

24
00:01:32,519 --> 00:01:34,480
Let's look at a demo.

25
00:01:34,480 --> 00:01:43,039
The idea is to pass through the array from left to right with an index i as we've been doing.

26
00:01:43,040 --> 00:01:50,120
Now we start with the array in order and actually it doesn't matter how we start the array.

27
00:01:50,120 --> 00:01:57,840
And every time we pick an integer between zero and i uniformly at random and swap a of i

28
00:01:57,840 --> 00:01:59,480
with that integer.

29
00:01:59,480 --> 00:02:00,760
So let's look at the beginning.

30
00:02:00,760 --> 00:02:01,760
We don't do anything.

31
00:02:01,760 --> 00:02:03,760
We just swap it with itself.

32
00:02:03,760 --> 00:02:10,800
Now with i equals two, or a second, i pointing to the second card, we generate a random

33
00:02:10,800 --> 00:02:13,240
integer between zero and i.

34
00:02:13,240 --> 00:02:17,000
In this case, it's the one to the left.

35
00:02:17,000 --> 00:02:19,240
And we swap those.

36
00:02:19,240 --> 00:02:22,240
Income and i generate a random integer.

37
00:02:22,240 --> 00:02:25,800
This time it's going to be the first one again, swap them.

38
00:02:25,800 --> 00:02:30,040
Income and i generate a random integer, swap them.

39
00:02:30,040 --> 00:02:34,480
Income and i generate a random integer, swap them.

40
00:02:34,480 --> 00:02:40,000
And continue in that way, swap.

41
00:02:40,000 --> 00:02:43,719
So for every i, we do exactly one swap.

42
00:02:43,719 --> 00:02:48,960
Now a card could be involved in more than one swap, but that's not an issue.

43
00:02:48,960 --> 00:02:53,360
The point is that the cards to the left of i are shuffled.

44
00:02:53,360 --> 00:02:56,800
They're uniform randomly shuffled.

45
00:02:56,800 --> 00:02:58,520
On this case, i and r are the same.

46
00:02:58,520 --> 00:03:02,039
There's no swap.

47
00:03:02,039 --> 00:03:05,719
Income and i generate a random r, swap them.

48
00:03:05,719 --> 00:03:08,719
And at the end, we have the deck shuffled.

49
00:03:08,719 --> 00:03:14,560
That's a linear time shuffling algorithm making use of randomness.

50
00:03:17,800 --> 00:03:22,960
It was proved actually a long time ago, even before computer implementations, that if you

51
00:03:22,960 --> 00:03:27,439
do that, you get a uniformly random permutation.

52
00:03:27,439 --> 00:03:29,800
Inodone takes a linear time.

53
00:03:29,800 --> 00:03:34,919
So that's definitely a way to get a deck shuffled quite easily.

54
00:03:34,919 --> 00:03:37,159
Easy to implement.

55
00:03:37,159 --> 00:03:45,000
Now it's key that the uniform random number be between zero and i minus one.

56
00:03:45,000 --> 00:03:52,519
You'll often see programmers thinking that they're implementing a shuffled.

57
00:03:52,519 --> 00:03:54,639
And they just choose for every entry.

58
00:03:54,639 --> 00:03:59,199
They just choose random place in the array to exchange it with.

59
00:03:59,199 --> 00:04:01,240
And that doesn't really work.

60
00:04:01,240 --> 00:04:06,759
You could do the items between i and n minus one, the ones that you haven't seen yet.

61
00:04:06,759 --> 00:04:09,159
And that would also work.

62
00:04:09,159 --> 00:04:14,799
But doing the whole array doesn't give you a uniformly random result.

63
00:04:14,799 --> 00:04:19,719
So that one caveat, this code, is almost trivial.

64
00:04:19,719 --> 00:04:24,759
And it's a method in our standard random class.

65
00:04:24,759 --> 00:04:32,399
Now if you're going to be using random methods that depend on randomness in real applications,

66
00:04:32,399 --> 00:04:34,639
you do have to be careful.

67
00:04:34,639 --> 00:04:38,079
So this is just an example about software security.

68
00:04:38,079 --> 00:04:43,079
There's a lot of difficult and deep issues to worry about in software security.

69
00:04:43,079 --> 00:04:44,959
And we're not going to worry about all of them.

70
00:04:44,959 --> 00:04:50,680
But one thing that we can do is make sure that our algorithms work as advertised.

71
00:04:50,680 --> 00:04:57,199
So here's an example of an implementation for online poker.

72
00:04:57,199 --> 00:05:03,079
Here's the code that you can find on the web for how to shuffle a deck of cards.

73
00:05:03,079 --> 00:05:05,399
It's pretty similar to our code.

74
00:05:05,399 --> 00:05:11,719
But it's actually got a few bugs, more than a few bugs.

75
00:05:11,719 --> 00:05:21,159
So first one is the way that Riannamworks, it actually never gets to 52, which means that

76
00:05:21,159 --> 00:05:26,759
the last card just stays, it can't end up in the last place.

77
00:05:26,759 --> 00:05:29,839
So it's definitely not shuffled because of that.

78
00:05:29,839 --> 00:05:36,879
Maybe that one's minor, but it also is picking a random card from the whole deck.

79
00:05:36,879 --> 00:05:41,239
As we just pointed out, that's not uniform.

80
00:05:41,239 --> 00:05:48,639
Should be between one and I or between I plus one and 52.

81
00:05:48,639 --> 00:05:57,559
Another problem is in this implementation that the random uses just a 32 bit seed.

82
00:05:57,560 --> 00:06:01,519
If you do that, there's not enough possible shuffles.

83
00:06:01,519 --> 00:06:08,600
The number of possible shuffles is much more in its 52, it's 52 factorial, which is a

84
00:06:08,600 --> 00:06:11,199
lot bigger than 2 to the 32nd.

85
00:06:11,199 --> 00:06:14,319
So it's not close to Riannamworks uniform.

86
00:06:14,319 --> 00:06:19,360
The other thing is that the seed is just the number of milliseconds since midnight, and

87
00:06:19,360 --> 00:06:23,199
that cuts down the number of shuffles even more.

88
00:06:23,199 --> 00:06:29,279
In fact, it didn't take that much hacking for someone to realize that after seeing five

89
00:06:29,279 --> 00:06:35,360
cards and figuring out what the server clock was doing, you could get all the future cards

90
00:06:35,360 --> 00:06:37,680
in real time in a program.

91
00:06:37,680 --> 00:06:43,919
And that's a pretty tough thing to have happen if you're implementing online poker.

92
00:06:43,919 --> 00:06:48,000
You might want to make sure that if you're advertising that you're doing a random shuffle,

93
00:06:48,000 --> 00:06:52,759
that you go ahead and do so.

94
00:06:52,759 --> 00:06:58,560
A famous quote in this many similar quotes, the generation of random numbers is too important

95
00:06:58,560 --> 00:07:02,639
to be left to chance.

96
00:07:02,639 --> 00:07:10,000
So if your business does depend on shuffling, people have looked at all sorts of options,

97
00:07:10,000 --> 00:07:16,319
including using hardware random number generators in this various tests available to make sure

98
00:07:16,319 --> 00:07:17,839
that it's random.

99
00:07:17,839 --> 00:07:21,079
You better use good shuffling code.

100
00:07:21,079 --> 00:07:22,560
That's our topic.

101
00:07:22,560 --> 00:07:27,280
But the bottom line is, don't think that it's easy to shuffle a deck of cards.

102
00:07:27,280 --> 00:07:30,879
So that's shuffling our first non-trivial sorting application.

