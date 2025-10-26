---
title: MIT6042J P72321AsymptoticNotationVideo
---

1
00:00:00,000 --> 00:00:05,440
The issue of the approximate rate at which things happen is a common in a lot of

2
00:00:05,440 --> 00:00:10,000
sciences, the rate at which things fall, the rate at which reactions occur.

3
00:00:10,000 --> 00:00:15,759
In computer science, typical concern about growth rates comes up in looking at

4
00:00:15,759 --> 00:00:19,480
the efficiency of algorithms and whether they're growing linearly or

5
00:00:19,480 --> 00:00:25,679
quadratically or more. We're going to look today at four

6
00:00:25,679 --> 00:00:30,879
notations that describe relations between the growth rates of functions.

7
00:00:30,879 --> 00:00:35,200
The first of these relations is the simplest one. It's called asymptotic equivalence or

8
00:00:35,200 --> 00:00:42,560
asymptotic equality. So this tilde symbol is read as asymptotically equal to. So f

9
00:00:42,560 --> 00:00:49,079
of n is asymptotically equal to g of n. If and only if the limit of the quotient of f

10
00:00:49,079 --> 00:01:01,539
of n over g of n is one. Let's look at an example. N squared is asymptotically equal to n

11
00:01:01,539 --> 00:01:08,259
squared plus n. Why is that? Well, it follows trivially by manipulating the algebra. The

12
00:01:08,259 --> 00:01:13,159
limit of n squared plus n over n squared, simplifying is just the same as the limit of

13
00:01:13,159 --> 00:01:19,079
one plus one over n. But as n goes to infinity, one over n goes to zero. So the limit is one

14
00:01:19,079 --> 00:01:24,560
as claimed. Those two expressions or the functions they define and squared and n squared

15
00:01:24,560 --> 00:01:31,799
plus one are asymptotically equal. Some there is an easy properties of asymptotic equality

16
00:01:31,799 --> 00:01:39,479
that follow immediately from the definition. One of them is that it's symmetric, namely,

17
00:01:39,480 --> 00:01:44,240
the pose that f is asymptotically equal to g. I want to prove that g is asymptotically equal

18
00:01:44,240 --> 00:01:50,480
to f. Well, what's going on here? Let's look at the limit of g over f, which is what I'd

19
00:01:50,480 --> 00:01:56,320
like to prove as one. Well, the limit of g over f by algebra, g over f is the same as one

20
00:01:56,320 --> 00:02:02,520
over f over g. So just moving the limit across the division, that's the same as one over the

21
00:02:02,520 --> 00:02:09,360
limit of f over g, which is one over one. And we've proved, in other words, that g is asymptotically

22
00:02:09,360 --> 00:02:15,280
equal to f given that f is asymptotically equal to g. It's symmetric. There's a similar

23
00:02:15,280 --> 00:02:19,360
argument for transitivity. Let's just crank through it for practice on the definition. Suppose

24
00:02:19,360 --> 00:02:24,000
that f is asymptotically equal to g and g is asymptotically equal to h. I'd like to prove

25
00:02:24,000 --> 00:02:32,800
that f is asymptotically equal to h. Well, again, we just plug into the algebra and distribute

26
00:02:32,800 --> 00:02:37,600
limits. Let's just look at this. We're given that one is the limit of f over g because f is

27
00:02:37,599 --> 00:02:43,960
asymptotic to g. But f over g can be expressed as f over h divided by g over h. Let's just

28
00:02:43,960 --> 00:02:50,439
algebra the h is cancel. So this limit now, by redistribute the limits to the numerator

29
00:02:50,439 --> 00:02:56,319
and denominator, assuming both exist. And the numerator limit is what I'm interested in.

30
00:02:56,319 --> 00:03:06,359
The denominator limit is going to be one because the limit of g over h is one since g is asymptotically

31
00:03:06,360 --> 00:03:13,520
equal to h. The conclusion is indeed that the limit of f over h is equal to one. This is

32
00:03:13,520 --> 00:03:20,200
not really very interesting stuff. And the top level message is that many of these elementary

33
00:03:20,200 --> 00:03:26,680
properties of asymptotic equality and the other asymptotic relations that we're going to see

34
00:03:26,680 --> 00:03:33,320
follow by this kind of elementary algebra and distributing the limits over sub-expressions.

35
00:03:33,319 --> 00:03:40,519
Anyway, the corollary of this is that asymptotic equality is in fact an equivalence relation. We've

36
00:03:40,519 --> 00:03:45,639
proved it's symmetric and transitive and it's trivially reflexive. It's an equivalence relation.

37
00:03:46,919 --> 00:03:52,519
By the way, it's worth noting that it's an equivalence relation on functions of one variable.

38
00:03:52,519 --> 00:04:00,359
When we write sometimes that f of n is asymptotically equal to g of n. But we mean that f of n is the

39
00:04:00,360 --> 00:04:05,240
description of a function f. We're not talking about the number that f of n happens to have for

40
00:04:05,240 --> 00:04:10,760
some particular value of f. So while we'll sometimes write f of n is asymptotically equal to g of n

41
00:04:10,760 --> 00:04:16,040
for descriptive purposes. The proper thing we should be writing is that f is asymptotically equal to g.

42
00:04:16,840 --> 00:04:19,560
Asymptotic equality is a relation between functions.

43
00:04:21,400 --> 00:04:27,560
Okay, the next asymptotic relation we're going to look at is called asymptotically smaller than.

44
00:04:27,560 --> 00:04:33,800
And it's the notation for this little old notation. So you'd write that f of n is equal to little

45
00:04:33,800 --> 00:04:43,000
all of g of n if and only if the limit of f of n over g of n goes to zero as an approaches infinity.

46
00:04:44,199 --> 00:04:50,680
So let's look at an example of that n squared is little all of n cubed because trivially the limit

47
00:04:50,680 --> 00:04:55,160
of n squared over n cubed is the same as the limit of one over n. It's equal to zero.

48
00:04:57,560 --> 00:05:02,280
And by similar kind of reasoning that we did for asymptotic equality being an equivalence relation,

49
00:05:02,280 --> 00:05:10,199
it's not very hard to prove that little all defines a strict partial order on functions.

50
00:05:12,600 --> 00:05:19,480
So the third relation, asymptotic relation is the most complicated of the three. Although it's

51
00:05:19,480 --> 00:05:25,800
arguably the most important in computer science, it's called the asymptotic order of growth big O.

52
00:05:26,680 --> 00:05:34,120
And the definition is that a function f is big O of a function g. What it means is that the limit

53
00:05:34,120 --> 00:05:44,759
of f over g is finite. So it might be other than zero or one, but it's finite. And that means that

54
00:05:44,759 --> 00:05:52,279
f is big O of g. Now there's a technicality there where the expression actually says the

55
00:05:52,279 --> 00:05:59,319
limb soup of f of n over g of n. Let's just ignore that for now and we'll look at it and explain

56
00:05:59,319 --> 00:06:08,759
why the limb soup is there a little later. So as an example, three n squared is big O of n squared

57
00:06:09,399 --> 00:06:15,159
because the quotient of three n squared over n squared is three, which is less than infinity.

58
00:06:15,159 --> 00:06:19,079
So what big O is doing is kind of saying that constant factors don't matter.

59
00:06:20,759 --> 00:06:27,399
And that turns out to be particularly useful in computer science where you can't really talk about

60
00:06:27,399 --> 00:06:33,560
the time that a procedure takes because that's going to depend on the hardware. So when you

61
00:06:33,560 --> 00:06:39,800
implement it on faster hardware, it may grow at the same rate, but the time will actually change.

62
00:06:40,439 --> 00:06:48,439
And that's why big O plays a prominent role. The final relation of the four is called theta

63
00:06:49,240 --> 00:06:58,759
or same order of growth. The definition of f is theta of g is simply that f is O of g and g is O of f.

64
00:06:59,719 --> 00:07:05,480
And it's easy to show from the definition that theta is an equivalence relation.

65
00:07:06,360 --> 00:07:13,959
So to summarize, there are these four relations. F asymptotically equal to g means that

66
00:07:14,599 --> 00:07:22,199
informally that f and g are nearly equal. F equals little O of g informally means that f is much

67
00:07:22,199 --> 00:07:28,599
less than g. F equals all of g means that f is roughly less than or equal to g, where roughly

68
00:07:28,599 --> 00:07:34,599
means that we're not concerned about constant factors. And f equals theta of g means that f is

69
00:07:34,599 --> 00:07:42,039
roughly equal to g. And we'll examine these properties in more detail in the next segment.

