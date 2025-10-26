---
title: MIT6042J P85413SimplifiedMontyHallTreeVideo
---

1
00:00:00,000 --> 00:00:09,480
Okay, let's take another look at the Monte-Hole tree that we worked with to figure out the probability

2
00:00:09,480 --> 00:00:11,400
of the switch strategy winning.

3
00:00:11,400 --> 00:00:18,679
Now this tree was just absolutely literal and absurdly complicated and large for what

4
00:00:18,679 --> 00:00:21,120
we're trying to analyze.

5
00:00:21,120 --> 00:00:26,160
That is we literally thought of each of the three outcomes of whether the prize was behind

6
00:00:26,160 --> 00:00:32,520
door one, door two, door three and then which exactly which door the contestant picked

7
00:00:32,520 --> 00:00:36,759
next either door one, door two, door three and so on.

8
00:00:36,759 --> 00:00:43,679
And it's clear that this tree has a symmetric structure that is these three subtrees, whether

9
00:00:43,679 --> 00:00:47,840
the prize is behind one, the prize is behind two or the prize is behind three, all have

10
00:00:47,840 --> 00:00:48,840
the same structure.

11
00:00:48,840 --> 00:00:52,760
And we could have gotten away with analyzing one and deduced that that's what happened

12
00:00:52,759 --> 00:00:54,359
with the other two branches.

13
00:00:54,359 --> 00:00:56,559
In fact, that really was what we did.

14
00:00:56,559 --> 00:01:02,359
But why not make that explicit in our analysis from the first place instead of having this

15
00:01:02,359 --> 00:01:03,659
triple tree?

16
00:01:03,659 --> 00:01:06,599
Let's just look at the tree with one branch.

17
00:01:06,599 --> 00:01:09,359
So there's the central branch that I'm keeping.

18
00:01:09,359 --> 00:01:13,359
Namely, we're assuming that the first move is to have the prize at door two and then

19
00:01:13,359 --> 00:01:19,039
the door picked has three choices and then the door opened has two choices or one depending

20
00:01:19,040 --> 00:01:23,880
on where the prize was placed relative to the contestants pick here.

21
00:01:23,880 --> 00:01:28,840
If the prize was at two and the contestant picked door two then Carol has a choice of two

22
00:01:28,840 --> 00:01:33,600
doors, one or three to open on the other hand if the prize was at two and the contestant picked

23
00:01:33,600 --> 00:01:39,480
door one, Carol has no choice but to open door three with probability one.

24
00:01:39,480 --> 00:01:40,480
Okay.

25
00:01:40,480 --> 00:01:45,320
Now, when we're looking at this tree, the first branch is kind of fixed and forced.

26
00:01:45,319 --> 00:01:47,599
So we don't really need it as part of the analysis.

27
00:01:47,599 --> 00:01:52,959
What we're really looking at is an analyzing what happens in the experiment starting at

28
00:01:52,959 --> 00:01:55,879
the stage where the contestant picks a door.

29
00:01:55,879 --> 00:01:59,199
So let's just enlarge this tree to get a better look at it.

30
00:01:59,199 --> 00:02:05,199
There's the same tree where we're starting off where we're assuming that the prize is

31
00:02:05,199 --> 00:02:09,599
at door two and then the door pick can be either door one, door two or door three and

32
00:02:09,599 --> 00:02:14,280
the door open then can be door three, door one, door three or door one according to the

33
00:02:14,280 --> 00:02:16,560
constraints on Carol.

34
00:02:16,560 --> 00:02:23,719
Now a better way to understand this tree as instead of saying the prize is at door two

35
00:02:23,719 --> 00:02:29,719
and this is where the contestant chooses door two and then have to worry about all the

36
00:02:29,719 --> 00:02:35,400
other branches that are symmetrically like this, we could have reformulated the tree model

37
00:02:35,400 --> 00:02:41,400
in the first place by saying let's just consider the cases that wherever the prize is, there

38
00:02:41,400 --> 00:02:43,400
are three possibilities.

39
00:02:43,400 --> 00:02:49,879
The contestant picks the door where the prize is or they pick the next door with a let's

40
00:02:49,879 --> 00:02:54,960
say in some counterclockwise direction from where the prize is or going around among

41
00:02:54,960 --> 00:03:03,280
the doors in a circle, they pick a door, they pick a door that's two doors away from where

42
00:03:03,280 --> 00:03:04,280
the prize is.

43
00:03:04,280 --> 00:03:10,000
If we reformulated that way then where these are the cases either the contestant picks the

44
00:03:10,000 --> 00:03:14,680
prize door or they pick the first door that doesn't have the prize or they pick the

45
00:03:14,680 --> 00:03:19,719
second door that doesn't have the prize and each of those occur with probability one-third.

46
00:03:19,719 --> 00:03:26,920
And likewise once they've picked door number one with no prize then that means that Carol

47
00:03:26,920 --> 00:03:32,800
has the choice of only one door that she can open because the other unpicked door has

48
00:03:32,800 --> 00:03:41,120
a prize so she's got to open the second no prize door because the contestant has picked

49
00:03:41,120 --> 00:03:42,880
the first no prize door.

50
00:03:42,880 --> 00:03:47,600
Likewise if the contestant picks the prize door Carol can pick either the non-priced either

51
00:03:47,600 --> 00:03:52,800
of the non-priced doors, non-priced one or non-priced two both are losses and likewise

52
00:03:52,800 --> 00:03:57,800
here where Carol's move is forced and the contestant will win.

53
00:03:57,800 --> 00:04:02,600
Now we're in great shape because I've really gotten rid of the rest of the tree, it's not

54
00:04:02,599 --> 00:04:07,199
as though I'm analyzing one-third of it and the one-third analysis is going to apply to

55
00:04:07,199 --> 00:04:13,280
the other parts by symmetry but I've captured the whole story here by simply relativizing

56
00:04:13,280 --> 00:04:18,040
the first move instead of it being literally door one or two door three I don't care what

57
00:04:18,040 --> 00:04:23,839
actual door the contestant picks all I care about is whether the contestant picks the prize

58
00:04:23,839 --> 00:04:28,680
door or the first door that's not the prize door or the second door that's not the prize

59
00:04:28,680 --> 00:04:29,680
door.

60
00:04:29,680 --> 00:04:32,959
This would have been a much better tree to start off within the first place at least

61
00:04:32,959 --> 00:04:35,639
for the purpose of analyzing the probability of winning.

62
00:04:35,639 --> 00:04:40,680
Now we're going to get some mileage out of the more complicated tree in a later video segment

63
00:04:40,680 --> 00:04:45,360
when we start talking about conditional probabilities of one of the probabilities of things happening

64
00:04:45,360 --> 00:04:51,720
at various stages in the experiment and so we will want to have some of these other

65
00:04:51,720 --> 00:04:57,600
vertices that represent stages of the experiment but if we'd really been thinking solely about

66
00:04:57,600 --> 00:05:01,400
how to analyze the probability of winning with the switch strategy this would have been

67
00:05:01,400 --> 00:05:03,720
a much better tree to start off with.

68
00:05:03,720 --> 00:05:06,960
But wait let's look at this tree.

69
00:05:06,960 --> 00:05:14,320
First of all there really isn't any need to model this branch of the experiment because

70
00:05:14,320 --> 00:05:20,480
at this point once we're talking about switching if the contestant has picked the non-priced

71
00:05:20,480 --> 00:05:22,720
door they win period.

72
00:05:22,720 --> 00:05:25,240
Carol's move is forced and it's going to be a win.

73
00:05:25,240 --> 00:05:30,920
You might have well just collapsed the win down to say that as soon as they pick a non-priced

74
00:05:30,920 --> 00:05:34,800
door they've won and who cares what happens after that same thing down here.

75
00:05:34,800 --> 00:05:38,920
So the tree really could have simplified to one where you pick a no-priced door and you

76
00:05:38,920 --> 00:05:43,720
win, you pick a no-priced door and you win or you pick a prized door and then Carol has

77
00:05:43,720 --> 00:05:47,199
a choice of opening either of the other two no-priced.

78
00:05:55,240 --> 00:06:19,400
Okay.

79
00:06:19,400 --> 00:06:24,960
Because after all what's the point in distinguishing between whether you pick prized or

80
00:06:24,959 --> 00:06:30,319
one or you pick prized or two you win in both cases and really all we care about we

81
00:06:30,319 --> 00:06:35,839
could have condensed the entire tree down to one where either you pick the prized door

82
00:06:35,839 --> 00:06:40,279
with probability one third in which case you're guaranteed to lose no matter what happens

83
00:06:40,279 --> 00:06:46,319
or you pick the non-priced door which you do with probability two thirds in which case

84
00:06:46,319 --> 00:06:51,639
you win no matter what happens and that is a really simple tree.

85
00:06:51,719 --> 00:06:59,159
There it is and what we can read off immediately is that with the switch strategy the probability

86
00:06:59,159 --> 00:07:01,279
of winning is two thirds.

87
00:07:01,279 --> 00:07:09,519
So the switch wins if and only if the prized door is not picked and that means that the

88
00:07:09,519 --> 00:07:13,519
probability that switch wins is two thirds which is what we already figured out using

89
00:07:13,519 --> 00:07:18,240
the more complicated tree but this way of getting at it is a lot clearer.

90
00:07:18,240 --> 00:07:25,120
So the message here is that the tree that you come up with to model the experimental

91
00:07:25,120 --> 00:07:30,879
outcomes is really a modeling process and there may be many models that work to capture

92
00:07:30,879 --> 00:07:38,000
a given scenario and it will often pay off to try to find a simpler tree to make the analysis

93
00:07:38,000 --> 00:07:38,519
simpler.

