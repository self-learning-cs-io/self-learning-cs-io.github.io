---
title: MIT6042J P6131WellOrderingPrinciple1Video
---

1
00:00:00,000 --> 00:00:10,800
The well ordering principle is one of those facts in mathematics that's so obvious that

2
00:00:10,800 --> 00:00:12,599
you hardly notice it.

3
00:00:12,599 --> 00:00:18,240
And the objective of this brief introduction is to call your attention to it.

4
00:00:18,240 --> 00:00:24,480
We've actually used it already and in subsequent segments of this presentation, we'll show lots

5
00:00:24,480 --> 00:00:27,800
of applications of it.

6
00:00:27,800 --> 00:00:30,519
So here's a statement of the well ordering principle.

7
00:00:30,519 --> 00:00:35,359
Every non-empty set of non-negative integers has a least element.

8
00:00:35,359 --> 00:00:40,359
Now this is probably familiar, maybe you haven't even thought about it, but now that I mentioned

9
00:00:40,359 --> 00:00:43,120
it, I expect it's a familiar idea.

10
00:00:43,120 --> 00:00:46,320
And it's pretty obvious too, if you think about it for a minute.

11
00:00:46,320 --> 00:00:49,359
Here's a way to think about it.

12
00:00:49,359 --> 00:00:53,760
Given a non-empty set of integers, you could ask, is zero the least element in it?

13
00:00:53,759 --> 00:00:56,199
All if it is, then you're done.

14
00:00:56,199 --> 00:00:59,599
Then you could say is one, the least element in it.

15
00:00:59,599 --> 00:01:00,599
And if it is, you're done.

16
00:01:00,599 --> 00:01:05,079
And if it isn't, you could say two is two of the least element and so on.

17
00:01:05,079 --> 00:01:09,000
Given that it's non-empty, eventually you're going to hit the least element.

18
00:01:09,000 --> 00:01:14,239
So if it wasn't obvious before, there's something of a hand-waving proof of it.

19
00:01:14,239 --> 00:01:18,840
But I want to get you to think about this well ordering principle a little bit because

20
00:01:18,840 --> 00:01:20,840
it's not...

21
00:01:20,840 --> 00:01:23,680
There are some technical parts of it that matter.

22
00:01:23,680 --> 00:01:31,280
So for example, suppose I replaced non-negative integers by non-negative rationals.

23
00:01:31,280 --> 00:01:37,760
And I asked, does every non-empty set of non-negative rationals have a least element?

24
00:01:37,760 --> 00:01:44,520
Well, there is a least non-negative rational, namely zero, but not every non-negative set

25
00:01:44,520 --> 00:01:46,719
of rationals has a least element.

26
00:01:46,719 --> 00:01:50,800
I'll let you think of an example.

27
00:01:50,799 --> 00:01:55,840
Another variant is when instead of talking about the non-negative integers, I just talk

28
00:01:55,840 --> 00:01:58,920
about all the integers, is there a least integer?

29
00:01:58,920 --> 00:02:03,599
Well, no, obviously because minus one's not the least and minus two is not the least,

30
00:02:03,599 --> 00:02:09,159
and there isn't any least integer.

31
00:02:09,159 --> 00:02:13,800
We take for granted the well-ordered principle just all the time.

32
00:02:13,800 --> 00:02:18,280
If I ask you what was the youngest age of an MIT graduate, well, you wouldn't, for a

33
00:02:18,280 --> 00:02:21,439
moment wonder whether there was a youngest age.

34
00:02:21,439 --> 00:02:25,599
And if I asked you for the smallest number of neurons in any animal, you wouldn't wonder

35
00:02:25,599 --> 00:02:30,319
whether there was or wasn't a smallest number of neurons we may not know what it is, but

36
00:02:30,319 --> 00:02:35,400
there's surely a smallest number of neurons because neurons are non-negative integers.

37
00:02:35,400 --> 00:02:40,520
And finally, if I asked you what was the smallest number of US coins that could make a $1.17,

38
00:02:40,520 --> 00:02:45,360
again, we don't have to worry about existence because the well-ordering principle knocks

39
00:02:45,360 --> 00:02:46,759
that off immediately.

40
00:02:49,280 --> 00:02:52,439
No, for the remainder of this talk, I'm going to be talking about the non-negative integers

41
00:02:52,439 --> 00:02:55,080
always, unless I explicitly say otherwise.

42
00:02:55,080 --> 00:02:58,280
So I'm just going to use the word number to mean non-negative integer.

43
00:02:58,280 --> 00:03:03,360
There's a standard mathematical symbol that we used to denote the non-negative integers.

44
00:03:03,360 --> 00:03:10,039
It's that letter n at the top of the slide with a double, with a diagonal, double bar.

45
00:03:10,039 --> 00:03:13,960
These are sometimes called the natural numbers, but I've never been able to understand or

46
00:03:13,960 --> 00:03:18,000
figure out whether zero is natural or not, so we don't use that phrase.

47
00:03:18,000 --> 00:03:24,879
Zero is included in n, the non-negative integers, and that's what we call them in this class.

48
00:03:24,879 --> 00:03:30,879
Now, I want to point out that we've actually used the well-ordering principle already without

49
00:03:30,879 --> 00:03:32,560
maybe not noticing it even.

50
00:03:32,560 --> 00:03:38,640
In the proof that the square root of two was not rational, that proof began by saying,

51
00:03:38,639 --> 00:03:45,000
suppose the square root of two was rational, that is, it was a quotient of integers m over n.

52
00:03:45,000 --> 00:03:50,959
And the remark was that you can always express a fraction like that in lowest terms.

53
00:03:50,959 --> 00:03:58,519
More precisely, you can always find positive numbers m and n without common factors such

54
00:03:58,519 --> 00:04:01,119
that the square root of two equals m over n.

55
00:04:01,119 --> 00:04:08,039
If there's any fraction equal to the square root of two, then there's a lowest terms fraction m over n

56
00:04:08,039 --> 00:04:11,560
with no common factors.

57
00:04:11,560 --> 00:04:18,120
So now we can use well-ordering to come up with a simple and hopefully very clear and

58
00:04:18,120 --> 00:04:24,039
convincing argument for why every fraction can be expressed in lowest terms.

59
00:04:24,039 --> 00:04:28,680
In particular, let's look at numbers m and n such that the square root of two is equal

60
00:04:28,680 --> 00:04:31,719
to m over n, that fraction.

61
00:04:31,719 --> 00:04:35,079
And let's just choose the smallest numerator that works.

62
00:04:35,079 --> 00:04:41,439
I'll find the smallest numerator m such that square root of two is equal to m over n.

63
00:04:41,439 --> 00:04:48,719
Well, I claim that that fraction, which uses the smallest possible numerator, has got to

64
00:04:48,719 --> 00:04:50,439
be in lowest terms.

65
00:04:50,439 --> 00:04:56,319
Because suppose that m and n had a common factor c that was greater than one, a real common

66
00:04:56,319 --> 00:05:03,599
factor, then you could replace m over n by m over c, the numerator is a smaller numerator

67
00:05:03,600 --> 00:05:07,879
that's still in integer and n over c, the denominator is still in integer.

68
00:05:07,879 --> 00:05:13,680
And we have a numerator that's smaller than m contradicting the way that we chose m in

69
00:05:13,680 --> 00:05:17,439
the first place.

70
00:05:17,439 --> 00:05:22,200
And this contradiction, of course, implies that m and n have no common factors and therefore

71
00:05:22,200 --> 00:05:25,920
has claimed m over n is in lowest terms.

72
00:05:25,920 --> 00:05:31,360
And of course, I formulated this was for our application of the fraction that was equal

73
00:05:31,360 --> 00:05:36,800
to the square root of two, but this proof actually shows that any rational number, any fraction

74
00:05:36,800 --> 00:05:38,840
can be expressed in lowest terms.

