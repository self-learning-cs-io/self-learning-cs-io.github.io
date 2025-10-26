---
title: MIT6042J P2112IntrotoProofsPart1
---

1
00:00:00,000 --> 00:00:07,480
In 6L4 tool we're going to be pretty concerned with proofs.

2
00:00:07,480 --> 00:00:13,120
I'm going to try to help you learn how to do rudimentary proofs and not be afraid of them.

3
00:00:13,120 --> 00:00:20,280
The most important skill in some ways is the ability to distinguish a very plausible

4
00:00:20,280 --> 00:00:27,760
argument that might not be totally right from a proof which is totally right.

5
00:00:27,760 --> 00:00:31,840
That's an important skill and it's a basic understanding of what math is.

6
00:00:31,840 --> 00:00:37,560
It's that distinction between knowing one thing is mathematically absolutely un-argulable

7
00:00:37,560 --> 00:00:42,719
and inevitable as opposed to something that's just very likely.

8
00:00:42,719 --> 00:00:47,840
It's interesting that physicists by and large do a lot of math and they tend not to worry

9
00:00:47,840 --> 00:00:55,000
so much about proofs, but all the theoreticians and the mathematicians are in agreement that

10
00:00:55,000 --> 00:00:59,000
don't really understand the subject until you know how to prove the basic facts.

11
00:00:59,000 --> 00:01:06,400
Pregnatically the value of proofs is that there's a lot of content in this subject and in many

12
00:01:06,400 --> 00:01:11,599
other mathematical subjects and if your only way to figure out what the exact details are

13
00:01:11,599 --> 00:01:14,000
is memorization you're going to get lost.

14
00:01:14,000 --> 00:01:19,400
Most of these rules and theorems that we prove, I can never remember them exactly, but I know

15
00:01:19,400 --> 00:01:23,079
how to prove them so I can debug them and get them exactly right.

16
00:01:23,079 --> 00:01:29,560
So let's begin by looking at some examples of proofs before we start to get abstract

17
00:01:29,560 --> 00:01:36,480
about what they are and we'll look at a famous theorem that you've all seen from early

18
00:01:36,480 --> 00:01:39,000
on in high school, the Pythagorean theorem.

19
00:01:39,000 --> 00:01:46,400
It says that if I have a right triangle with sides A and B and hypotenuse C, then there's

20
00:01:46,400 --> 00:01:53,880
a relationship between the A, B and C, namely that A squared plus B squared equals C squared.

21
00:01:53,880 --> 00:01:58,960
Now this is, as I said, completely familiar, but is it obvious?

22
00:01:58,960 --> 00:02:02,600
Well, everyone's in a while students say it's obvious, but what I think they really

23
00:02:02,600 --> 00:02:04,480
mean is that it's familiar.

24
00:02:04,480 --> 00:02:05,480
It's not obvious.

25
00:02:05,480 --> 00:02:10,159
Part of the argument for the fact that it's not obvious is that for thousands of years

26
00:02:10,159 --> 00:02:12,400
people have kept feeling the need to prove it.

27
00:02:12,400 --> 00:02:17,000
In order to be sure that it's true and explain why it's true, there's a citation in the notes

28
00:02:17,000 --> 00:02:21,639
of a website devoted to collecting Pythagorean theorem proofs.

29
00:02:21,639 --> 00:02:27,439
There's over a hundred of them, including one by a former president of the United States.

30
00:02:27,439 --> 00:02:33,280
So let's look at one of my favorite proofs of the Pythagorean theorem and it goes this

31
00:02:33,280 --> 00:02:34,680
way.

32
00:02:34,680 --> 00:02:41,680
There are four triangles that are all the same size, four copies of this ABC triangle, which

33
00:02:41,680 --> 00:02:44,200
we've put in different colors to distinguish them.

34
00:02:44,200 --> 00:02:49,480
And a square, which for the moment is of unknown size.

35
00:02:49,480 --> 00:02:55,080
And the proof of the Pythagorean theorem is going to consist of taking these four shapes

36
00:02:55,080 --> 00:03:00,240
and reassembling them so that they form a C by C square first.

37
00:03:00,240 --> 00:03:05,439
And then finding a second arrangement so that they form two squares and a by a square

38
00:03:05,439 --> 00:03:07,560
and a b by b square.

39
00:03:07,560 --> 00:03:15,280
Then by the theorem of conservation of paper or conservation of area, it has to be that

40
00:03:15,280 --> 00:03:21,439
the C by C area is the same as the a by a plus b by b area.

41
00:03:21,439 --> 00:03:24,400
And so a squared plus b squared is equal to C squared.

42
00:03:24,400 --> 00:03:28,719
Well, let's look at those rearrangements and probably you should take a moment to try

43
00:03:28,719 --> 00:03:30,719
it yourself before I pop the solution up.

44
00:03:30,719 --> 00:03:32,080
But there's the solution to the first one.

45
00:03:32,080 --> 00:03:33,599
It's the easier of the two.

46
00:03:33,599 --> 00:03:35,840
This is the C by C arrangement.

47
00:03:35,840 --> 00:03:39,120
The hint is that if it's going to be C by C, you don't have a lot of choice except

48
00:03:39,120 --> 00:03:44,000
to put the C1 hypothesis on the outside.

49
00:03:44,000 --> 00:03:48,400
And then it's a matter of just fiddling the triangles around so they fit together and

50
00:03:48,400 --> 00:03:51,039
you discover there's a square in the middle.

51
00:03:51,039 --> 00:03:55,400
And that's just where that extra square that is provided will fit.

52
00:03:55,400 --> 00:03:58,680
Also this enables you to figure out the dimensions of the square are because if you

53
00:03:58,680 --> 00:04:05,240
look at it, this is a b side, we're letting b be the longer of the two sides of the triangle.

54
00:04:05,240 --> 00:04:08,360
And this is the a side, the shorter side of another triangle.

55
00:04:08,360 --> 00:04:11,719
So what's left here has to be b minus a.

56
00:04:11,719 --> 00:04:19,120
So now we know that it's a b minus a by b minus a square from this arrangement.

57
00:04:19,120 --> 00:04:22,680
And that's what we've indicated here.

58
00:04:22,680 --> 00:04:25,319
Now the next arrangement is the following.

59
00:04:25,319 --> 00:04:29,480
We're going to take the two of the triangles and form a rectangle, another two triangles

60
00:04:29,480 --> 00:04:34,920
and form a rectangle, line them up in this way and fit the b minus a by b minus a square there.

61
00:04:34,920 --> 00:04:36,519
Now where are the two squares?

62
00:04:36,519 --> 00:04:40,360
Well, I didn't say that the a by a and b by b squared needed to be separate.

63
00:04:40,360 --> 00:04:40,959
In fact, they're not.

64
00:04:40,959 --> 00:04:41,600
They're attached.

65
00:04:41,600 --> 00:04:42,920
But where are they?

66
00:04:42,920 --> 00:04:46,439
Well, let's look at this line.

67
00:04:46,439 --> 00:04:47,399
How long is it?

68
00:04:47,399 --> 00:04:52,439
Well, it's a plus b minus a long, which means that it's b long.

69
00:04:52,439 --> 00:04:55,519
And suddenly there's a b and there's a b.

70
00:04:55,519 --> 00:05:00,519
And I've got a b by b rectangle right there.

71
00:05:00,519 --> 00:05:01,920
But wait a second.

72
00:05:01,920 --> 00:05:07,279
Here's a b minus a and it's lined up against a b side.

73
00:05:07,279 --> 00:05:11,439
So if I look at what's left, it's b minus b minus a.

74
00:05:11,439 --> 00:05:14,279
It tells me that that little piece is a.

75
00:05:14,279 --> 00:05:22,279
And so sure enough, when I add this hidden line, this conceptual line to separate the two squares,

76
00:05:22,279 --> 00:05:25,479
this parts a by a and that parts b by b.

77
00:05:25,479 --> 00:05:29,479
And we've proved the Pythagorean theorem.

78
00:05:29,479 --> 00:05:32,399
So what about this proof?

79
00:05:32,399 --> 00:05:35,000
It's really very elegant and it's absolutely correct.

80
00:05:35,000 --> 00:05:37,599
And I hope it's kind of convincing.

81
00:05:37,599 --> 00:05:43,039
And so this is a wonderful case of a proof by picture that really works in this case.

82
00:05:43,039 --> 00:05:48,239
But unfortunately, proof by pictures worry mathematicians and they'll legitimately worry

83
00:05:48,239 --> 00:05:52,159
some because there's lots of hidden assumptions and exercise

84
00:05:52,160 --> 00:05:58,280
that you can both really is to go back and think about all of the geometric information

85
00:05:58,280 --> 00:06:01,320
that's kind of being taken for granted in this picture.

86
00:06:01,320 --> 00:06:04,480
Like over here, how did we know that that was a right angle?

87
00:06:04,480 --> 00:06:06,440
That this thing was a rectangle.

88
00:06:06,440 --> 00:06:10,000
We needed that to be a right angle because we were claiming that this was a square.

89
00:06:10,000 --> 00:06:12,080
Well, how did we know that that was a rectangle?

90
00:06:12,080 --> 00:06:13,120
Well, the answers are obvious.

91
00:06:13,120 --> 00:06:18,360
We're using the fact that the complementary angles of a right triangle,

92
00:06:18,360 --> 00:06:23,160
something 90 degrees because the angles of a triangle in general, some to 180 degrees,

93
00:06:23,160 --> 00:06:27,439
we're using that in a bunch of other places where you're also using the fact that this

94
00:06:27,439 --> 00:06:31,920
is a straight line which may or may not be obvious, but it's true.

95
00:06:31,920 --> 00:06:35,879
And that's why it's safe to add those distances to figure out what it was.

96
00:06:35,879 --> 00:06:40,520
My point is that there are really a whole lot of hidden assumptions in the diagram that

97
00:06:40,520 --> 00:06:43,199
it's easy to overlook and be fooled by.

98
00:06:43,199 --> 00:06:47,639
So let me show you an example of getting fooled by a proof by diagram.

99
00:06:47,639 --> 00:06:50,479
And here's how to get infinitely rich.

100
00:06:50,479 --> 00:06:54,879
Let's imagine that I have a 10 by 11 piece of gold foil.

101
00:06:54,879 --> 00:07:00,879
Actually, there could be slabs of gold, but let's think of this as a rectangular shape

102
00:07:00,879 --> 00:07:02,519
that's made out of gold.

103
00:07:02,519 --> 00:07:04,039
And it's going to be rectangles.

104
00:07:04,039 --> 00:07:06,120
Those are right angles there.

105
00:07:06,120 --> 00:07:10,079
And what I'm going to do is mark off the corners.

106
00:07:10,079 --> 00:07:13,879
I'm going to mark off a length down of one.

107
00:07:13,879 --> 00:07:18,920
And then I'm going to mark off a length of one and shift it so that it touches the

108
00:07:18,920 --> 00:07:22,959
diagonal and do the same thing in this lower corner.

109
00:07:22,959 --> 00:07:27,040
And now let's just shift these shapes.

110
00:07:27,040 --> 00:07:33,879
The top one going southwest and the second one going northeast.

111
00:07:33,879 --> 00:07:37,879
And what I wind up with is this picture so that I've now got those little red triangles

112
00:07:37,879 --> 00:07:40,199
protruding above the shape.

113
00:07:40,199 --> 00:07:41,519
Okay, cool.

114
00:07:41,519 --> 00:07:44,279
Well, what do we know?

115
00:07:44,279 --> 00:07:51,079
This is now side 10 because I've subtracted one from its length here.

116
00:07:51,079 --> 00:07:54,759
And this is side 11 because that used to be 10.

117
00:07:54,759 --> 00:07:57,199
I've added one to its length there.

118
00:07:57,199 --> 00:08:01,759
So that's cool because now what I can do is take those protruding triangles out and

119
00:08:01,759 --> 00:08:05,639
they'll form a little one by one rectangle or square.

120
00:08:05,639 --> 00:08:10,079
And suddenly I have this little bit of gold that's extra.

121
00:08:10,079 --> 00:08:11,560
But look what's here.

122
00:08:11,560 --> 00:08:16,639
It's a 10 by 11 rectangular shape of gold foil again.

123
00:08:16,639 --> 00:08:20,359
So I just rotate this by 90 degrees and I start all over again.

124
00:08:20,359 --> 00:08:24,719
I can keep generating these little one by one shapes of gold foil.

125
00:08:24,719 --> 00:08:27,120
Forever I can get infinitely rich.

126
00:08:27,120 --> 00:08:28,120
Okay.

127
00:08:28,120 --> 00:08:29,199
Well, there's something wrong with that.

128
00:08:29,199 --> 00:08:34,399
It's violating all kinds of conservation principles, not to mention that it would undermine

129
00:08:34,399 --> 00:08:35,799
the place of gold.

130
00:08:35,799 --> 00:08:37,799
So what's the bug?

131
00:08:37,799 --> 00:08:43,959
Well, if you probably can spot this but maybe you've been fooled, what's going on is there's

132
00:08:43,959 --> 00:08:49,479
an implicit assumption that those little triangles that I cut off were right triangles.

133
00:08:49,479 --> 00:08:56,159
And that this line that I claimed was of length 11 was a straight line and it's not.

134
00:08:56,159 --> 00:09:02,279
Those triangles have two sides that are length 1, they're isosceles triangles.

135
00:09:02,279 --> 00:09:07,319
But they're lying up against a diagonal that's not 45 degrees.

136
00:09:07,319 --> 00:09:12,000
And so they're not right triangles and that line is in straight.

137
00:09:12,000 --> 00:09:15,839
And 10 and 11 were close enough that it wasn't visually obvious.

138
00:09:15,839 --> 00:09:21,000
So this is a way to simply put one over on you with approved by picture.

139
00:09:21,000 --> 00:09:26,000
And if I have been asked to justify how do I know it's a straight line, that bug would

140
00:09:26,000 --> 00:09:27,000
have emerged.

141
00:09:27,000 --> 00:09:31,279
But you're not likely to notice that if it isn't visually obvious.

142
00:09:31,279 --> 00:09:34,079
Which is why we worry about some of these proof facts.

