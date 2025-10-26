---
title: MIT6042J P21182BogusInductionVideo
---

1
00:00:00,000 --> 00:00:10,439
Understanding proofs includes the ability to spot mistakes in them.

2
00:00:10,439 --> 00:00:15,679
And as a test of that skill and also your understanding of induction, let me see if I can put

3
00:00:15,679 --> 00:00:17,679
one over on you.

4
00:00:17,679 --> 00:00:22,160
I'm going to show you a bogus proof by induction.

5
00:00:22,160 --> 00:00:26,920
And I'm going to prove something that's patently absurd, namely that all horses have the

6
00:00:26,920 --> 00:00:27,920
same color.

7
00:00:28,080 --> 00:00:30,840
Say they're all black.

8
00:00:30,840 --> 00:00:37,679
So there's a bunch of black horses with maybe some highlighted brown mains.

9
00:00:37,679 --> 00:00:39,079
All right.

10
00:00:39,079 --> 00:00:41,359
I'm going to prove this by induction.

11
00:00:41,359 --> 00:00:45,240
And for a start, there's no end mentioned in the theorem.

12
00:00:45,240 --> 00:00:50,719
So that's common for various kinds of things that you need to prove by induction.

13
00:00:50,719 --> 00:00:52,719
So I have to rephrase it in terms of n.

14
00:00:52,719 --> 00:00:54,120
It's going to be by induction on n.

15
00:00:54,119 --> 00:01:00,320
And the induction hypothesis is going to be that any set consisting of exactly n horses

16
00:01:00,320 --> 00:01:03,479
will all have the same color.

17
00:01:03,479 --> 00:01:04,479
All right.

18
00:01:04,479 --> 00:01:06,679
Let's proceed to prove this.

19
00:01:06,679 --> 00:01:11,439
Now I'm going to use the base case n equals 1 just because I don't want to distract you

20
00:01:11,439 --> 00:01:17,519
with suspicions that the base case n equals 0, that is no horses, is cheating somehow.

21
00:01:17,519 --> 00:01:22,680
It would be in fact be perfectly legitimate to start with n equals 0 and argue that all

22
00:01:22,680 --> 00:01:27,880
the horses in the empty set have the same color because there's nothing in the empty set.

23
00:01:27,880 --> 00:01:29,640
However, let's not get into that.

24
00:01:29,640 --> 00:01:31,200
We'll start with n equals 1.

25
00:01:31,200 --> 00:01:37,080
And indeed, if you look at any set of one horse, it is the same color of itself.

26
00:01:37,080 --> 00:01:41,280
And in fact, I've proved the base case n equals 1.

27
00:01:41,280 --> 00:01:42,280
All right.

28
00:01:42,280 --> 00:01:43,280
Let's keep going.

29
00:01:43,280 --> 00:01:49,680
Now, in the inductive step, I'm allowed to assume that n horses have the same color,

30
00:01:49,680 --> 00:01:52,880
n is any number greater than or equal to 0.

31
00:01:52,880 --> 00:01:57,560
Now, right here, students complain that that's not fair because you're already assuming something

32
00:01:57,560 --> 00:01:59,400
false and that's absurd.

33
00:01:59,400 --> 00:02:04,000
Well, yeah, it is absurd, but that can't be the problem.

34
00:02:04,000 --> 00:02:06,920
I'm just allowed to assume an induction hypothesis.

35
00:02:06,920 --> 00:02:10,200
All I have to do is prove that n implies n plus 1.

36
00:02:10,200 --> 00:02:13,280
Since it's absurd, there would be some problem with the proof.

37
00:02:13,280 --> 00:02:17,319
Well, let's watch and see if there's a problem with the proof.

38
00:02:17,319 --> 00:02:20,639
So again, I can assume that any set of n horses have the same color.

39
00:02:20,639 --> 00:02:25,479
I have to prove that any set of n plus 1 horses have the same color.

40
00:02:25,479 --> 00:02:26,479
How will I do that?

41
00:02:26,479 --> 00:02:29,239
Well, there's a set of n plus 1 horses.

42
00:02:29,239 --> 00:02:32,560
And let's consider the first n of those horses.

43
00:02:32,560 --> 00:02:36,919
Now, by induction hypothesis, the first n of them have the same color is wrong.

44
00:02:36,919 --> 00:02:44,120
It look good, but the proof that p of n implies p of n plus 1 has to work for all n greater

45
00:02:44,120 --> 00:02:48,000
than or equal to the base case.

46
00:02:48,000 --> 00:02:53,039
And if you look at this proof, it doesn't work in the base case.

47
00:02:53,039 --> 00:02:59,520
One n is 1, and you're trying to go from the base case to 2 and so on by implication.

48
00:02:59,520 --> 00:03:03,879
The proof breaks down because what happens with our argument in the case that we're trying

49
00:03:03,879 --> 00:03:09,240
to prove that p of n implies p of n plus 1 in the case that n equals 1.

50
00:03:09,240 --> 00:03:12,759
Well, in that case, there aren't any middle horses.

51
00:03:12,759 --> 00:03:18,639
n plus 1 is 2, so there's a first horse, and that's the first n horses.

52
00:03:18,639 --> 00:03:22,560
And then the second set of n horses is the other horse.

53
00:03:22,560 --> 00:03:27,799
And there are no middle horses that they both have a color in common with.

54
00:03:27,799 --> 00:03:30,639
So the proof just broke there.

55
00:03:30,639 --> 00:03:34,479
But you might not have noticed because that was the only place it was broken.

56
00:03:34,479 --> 00:03:40,799
This is a case where we were misled by ellipses, by the way, because I was drawing n plus

57
00:03:40,800 --> 00:03:45,240
1 horses with a lot, showing a lot of horses with dots in the middle.

58
00:03:45,240 --> 00:03:49,240
It looked like there were some, but there weren't.

59
00:03:49,240 --> 00:03:58,800
And again, as I said, the point though is that the only fallacy in this proof was that

60
00:03:58,800 --> 00:04:04,560
it didn't work when n was 1, but it certainly worked for implying that if all sets of 2

61
00:04:04,560 --> 00:04:09,280
horses are the same, that does imply that all sets of 3 horses are the same color.

62
00:04:09,280 --> 00:04:13,080
And again, it's a false will imply anything, a kind of example.

63
00:04:13,080 --> 00:04:16,879
But even here, the proof was logically OK.

64
00:04:16,879 --> 00:04:21,319
But if it breaks it, one place, if it is one domino that's missing from the line, when

65
00:04:21,319 --> 00:04:25,839
the one before it falls, the rest of them stop falling, and the proof breaks down.

