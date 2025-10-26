---
title: MIT6042J P301113CountableSetsVideo
---

1
00:00:00,000 --> 00:00:10,919
Okay, so we come to the idea of countable sets, which is a most familiar kind of infinite

2
00:00:10,919 --> 00:00:11,919
sets.

3
00:00:11,919 --> 00:00:18,600
And a countable set is one where you can list the elements A0, A1, A2 and so forth.

4
00:00:18,600 --> 00:00:24,800
So there's a list of all of the elements of A in which every element in A appears at

5
00:00:24,800 --> 00:00:25,800
some point.

6
00:00:25,800 --> 00:00:30,740
You can count up to any given element of A and every element of A you will eventually

7
00:00:30,740 --> 00:00:31,740
get to.

8
00:00:31,740 --> 00:00:33,260
You'll be able to count up to it.

9
00:00:33,260 --> 00:00:36,359
So it's just a matter of listing it.

10
00:00:36,359 --> 00:00:41,400
And the technical definition of A as countable is if there's a bijection between A and the

11
00:00:41,400 --> 00:00:42,400
non-negative integers.

12
00:00:42,400 --> 00:00:48,200
Because this listing, in effect, really is a mapping from the non-negative integers to

13
00:00:48,200 --> 00:00:49,200
A.

14
00:00:49,200 --> 00:00:55,240
So if you say A0, one maps to A1, two maps to A2, and implicitly there's a bijection being

15
00:00:55,240 --> 00:00:56,560
indicated here.

16
00:00:56,560 --> 00:01:01,000
That's assuming that all of the A's are distinct for it to be a bijection.

17
00:01:01,000 --> 00:01:03,320
So we also have a special case.

18
00:01:03,320 --> 00:01:05,680
The finite sets are also considered to be countable.

19
00:01:05,680 --> 00:01:11,200
So really, if N is a bijection to A, then A is called countably infinite.

20
00:01:11,200 --> 00:01:17,719
The other possibility is that A is finite and the two together are just say A is countable.

21
00:01:17,719 --> 00:01:22,519
So what we've just figured out then from the previous examples is that the positive integers

22
00:01:22,519 --> 00:01:23,760
are countable.

23
00:01:23,760 --> 00:01:28,400
And all the integers are countable because in both cases we exhibited bijections to the

24
00:01:28,400 --> 00:01:33,200
non-negative integers.

25
00:01:33,200 --> 00:01:37,200
Another important but not very hard example is the set of finite binary words.

26
00:01:37,200 --> 00:01:43,759
So we use this notation, 0, 1 star meaning all the finite sequences of these elements,

27
00:01:43,759 --> 00:01:44,759
0 and 1.

28
00:01:44,759 --> 00:01:47,519
So this is just the finite binary words.

29
00:01:47,519 --> 00:01:48,519
How are they countable?

30
00:01:48,519 --> 00:01:51,399
Well, I need a way to be able to list them in subordantly way.

31
00:01:51,399 --> 00:01:53,479
Well, let's just do it by length.

32
00:01:53,479 --> 00:01:57,640
Let's begin by listing the empty word or string of length 0.

33
00:01:57,640 --> 00:02:03,239
And then I'm going to list all the one bit strings, the strings of length 1.

34
00:02:03,239 --> 00:02:04,239
There are two of those.

35
00:02:04,239 --> 00:02:10,519
So the next element of the list after the empty string, 0, and then the next element after

36
00:02:10,519 --> 00:02:11,519
that be 1.

37
00:02:11,519 --> 00:02:13,759
Then let's list all the length 2 strings.

38
00:02:13,759 --> 00:02:16,840
Well, there's four length 2 binary strings.

39
00:02:16,840 --> 00:02:22,159
And let's just list them in some sensible order, say by their binary representation.

40
00:02:22,159 --> 00:02:28,240
And then keep going, list all the length 3 binary strings.

41
00:02:28,240 --> 00:02:29,240
There's 8 of those.

42
00:02:29,240 --> 00:02:34,560
And finally, keep going up until you get to the length n binary strings at which there

43
00:02:34,560 --> 00:02:35,879
are two to the n.

44
00:02:35,879 --> 00:02:41,879
And this is a description of a way to list one after another all of the finite binary words

45
00:02:41,879 --> 00:02:44,000
or finite binary strings.

46
00:02:44,159 --> 00:02:50,879
That listing is implicitly a description of a bijection from the non-negative integers

47
00:02:50,879 --> 00:02:54,759
and to the nth element in my listing.

48
00:02:54,759 --> 00:02:55,960
And that's a bijection.

49
00:02:55,960 --> 00:03:00,800
So the binary words are countable.

50
00:03:00,800 --> 00:03:07,639
Some other example of a countable set is the pairs of non-negative integers.

51
00:03:07,639 --> 00:03:10,360
So how can now I got the non-negative integers?

52
00:03:10,360 --> 00:03:11,479
I've got to find a bijection.

53
00:03:11,479 --> 00:03:13,080
The pairs of non-negative integers.

54
00:03:13,080 --> 00:03:14,080
How am I going to do that?

55
00:03:14,080 --> 00:03:17,080
Well, it's the same idea as we used with binary strings.

56
00:03:17,080 --> 00:03:18,520
There's a bunch of ways to prove it.

57
00:03:18,520 --> 00:03:22,320
But let's just propagate the binary string idea.

58
00:03:22,320 --> 00:03:27,520
Let's start listing the pairs of non-negative integers.

59
00:03:27,520 --> 00:03:33,040
And after 0, 0, I'm going to list two pairs, 0, 1, and 1, 0.

60
00:03:33,040 --> 00:03:38,320
And after them, I'm going to list three pairs, 0, 2, 2, 0, and 1, 1.

61
00:03:38,320 --> 00:03:41,640
And after them, 0, 3, 3, 0, 1, 2, 2, 1.

62
00:03:41,639 --> 00:03:48,479
And if you can see what I'm doing, I'm basically listing the pairs in the order of the sum of

63
00:03:48,479 --> 00:03:49,479
their coordinates.

64
00:03:49,479 --> 00:03:58,359
So the nth block of pairs that I'm going to list will be the sum of whose two coordinates

65
00:03:58,359 --> 00:03:59,359
is n.

66
00:03:59,359 --> 00:04:00,959
There'll be n plus 1 of those.

67
00:04:00,959 --> 00:04:02,079
And I keep going in this way.

68
00:04:02,079 --> 00:04:09,359
This is a nice orderly way to list all of the non-negative integers.

69
00:04:09,360 --> 00:04:14,720
Within a block, I'll invent some alphabetical rule for listing the pairs.

70
00:04:14,720 --> 00:04:22,080
So I've hinted at a rule here for listing the finite set of pairs whose sum is n.

71
00:04:22,080 --> 00:04:24,560
And you can, and anyone will do.

72
00:04:24,560 --> 00:04:32,080
So that tells us that we have a bijection between the non-negative integers and

73
00:04:32,080 --> 00:04:33,720
the pairs of non-negative integers.

74
00:04:33,720 --> 00:04:37,000
So that's another important bijection.

75
00:04:37,000 --> 00:04:39,000
Now, when you're trying to prove accountability,

76
00:04:39,000 --> 00:04:42,839
it's very useful to have the following moment, which gives an alternative characterization

77
00:04:42,839 --> 00:04:43,839
of accountability.

78
00:04:43,839 --> 00:04:46,240
Namely, a set A is countable.

79
00:04:46,240 --> 00:04:50,120
If and only if you can list A allowing repeats.

80
00:04:50,120 --> 00:04:55,720
Remember, our original definition is that you can list A without repeats if it's infinite

81
00:04:55,720 --> 00:04:56,959
or else it's finite.

82
00:04:56,959 --> 00:05:01,959
So that was the bijection between the non-negative integers and A, in effect, is saying that

83
00:05:01,959 --> 00:05:07,040
that's a listing of all of an infinite set A with no repeats because it's a bijection.

84
00:05:07,040 --> 00:05:09,160
You know, we're mapping.

85
00:05:09,160 --> 00:05:12,640
If an element appeared twice, we'd have two different non-negative integers mapping

86
00:05:12,640 --> 00:05:16,600
to it with break the bijection property, the injection property.

87
00:05:16,600 --> 00:05:19,200
And so suppose we allow repeats.

88
00:05:19,200 --> 00:05:22,680
And the claim is that that's fine because you can fix that.

89
00:05:22,680 --> 00:05:28,780
So the lemma says that if there's a surjective function from the non-negative integers to

90
00:05:28,780 --> 00:05:31,280
A, then A is countable.

91
00:05:31,280 --> 00:05:33,759
Well, let's just check quickly in one direction.

92
00:05:33,759 --> 00:05:39,560
If A is finite, then there's clearly a surjective function from the non-negative integers

93
00:05:39,560 --> 00:05:44,079
to A, there's lots of extra non-negative integers you don't need.

94
00:05:44,079 --> 00:05:48,439
Just, you know, if it's a finite set like 10 elements in A, map 0 through 9 to those 10

95
00:05:48,439 --> 00:05:55,680
elements and map every other non-negative integers, say to the 10th element or last element

96
00:05:55,680 --> 00:05:57,279
of A.

97
00:05:57,279 --> 00:05:59,920
So there's certainly a surjection of A as finite.

98
00:05:59,920 --> 00:06:04,080
Now suppose that A is infinite and I have a surjection from the non-negative integers

99
00:06:04,080 --> 00:06:07,400
to A. So I'm listing A with repeats.

100
00:06:07,400 --> 00:06:11,480
And I'm supposed to have a bijection if it matches the other definition.

101
00:06:11,480 --> 00:06:12,480
How do you do that?

102
00:06:12,480 --> 00:06:17,040
Well, if you're a computer scientist, you know how to change a sequence with repeats into

103
00:06:17,040 --> 00:06:18,600
a sequence without repeats.

104
00:06:18,600 --> 00:06:22,200
You just filter it for duplicates going from left to right.

105
00:06:22,200 --> 00:06:26,759
Take this infinite sequence of elements of A in which there are repeats and keep only

106
00:06:26,759 --> 00:06:28,560
the first occurrence of each element.

107
00:06:28,560 --> 00:06:32,719
That'll define a bijection with the non-negative integers of A as finite.

108
00:06:32,719 --> 00:06:37,879
If A is infinite and that's how we prove this lemma, which I'm just going to settle for

109
00:06:37,879 --> 00:06:39,120
talking through.

110
00:06:39,120 --> 00:06:44,079
So now we have another convenient way to show that a set is countable just by describing

111
00:06:44,079 --> 00:06:48,719
not a bijection but a surjection between the non-negative integers and A. Surjections

112
00:06:48,719 --> 00:06:53,439
are often easier to describe than bijections, which is why this is a useful lemma.

113
00:06:53,439 --> 00:07:00,079
A carollary of this is that if I'm trying to show that a set A is countable, all that

114
00:07:00,079 --> 00:07:04,480
I really need to do is find some other set that I know to be countable and describe a

115
00:07:04,480 --> 00:07:12,480
surjection from that other set C to A. Because I know that if C is countable then there'll

116
00:07:12,480 --> 00:07:18,600
be a bijection between the non-negative integers and C. And since when you combine a bijection

117
00:07:18,600 --> 00:07:23,399
with a surjection, you wind up with a surjection that will implicitly define a surjection.

118
00:07:23,399 --> 00:07:30,120
So the non-negative integers to A, which by the lemma tells me that A is countable.

119
00:07:30,120 --> 00:07:33,959
So the general way to prove something is countable is just to describe a surjection from something

120
00:07:33,959 --> 00:07:38,239
you know to be countable that hits your target.

121
00:07:38,239 --> 00:07:40,679
And let's look at an example of that.

122
00:07:40,679 --> 00:07:42,599
I claim that the rationals are countable.

123
00:07:42,599 --> 00:07:43,919
The rational numbers are countable.

124
00:07:43,919 --> 00:07:50,359
Now this is kind of a little bit more striking at first because you can see how you can count

125
00:07:50,360 --> 00:07:56,080
the non-negative integers, the positive integers, all the integers because there's a nice sensible

126
00:07:56,080 --> 00:07:57,560
way to have one come after the other.

127
00:07:57,560 --> 00:07:59,759
But with the rationals, it's messy.

128
00:07:59,759 --> 00:08:02,879
In between any two rationals, there's another rational.

129
00:08:02,879 --> 00:08:04,120
There isn't any first rational.

130
00:08:04,120 --> 00:08:07,040
There isn't any obvious way to list them all.

131
00:08:07,040 --> 00:08:11,879
But really, if you stop thinking about the rationals of how they are laid out on the real

132
00:08:11,879 --> 00:08:19,080
line, but just think of them as pairs of integers, then it becomes clear how to list them.

133
00:08:19,079 --> 00:08:23,359
Because we already know that the pairs of non-negative integers are countable.

134
00:08:23,359 --> 00:08:28,319
So I'm just going to map a pair of non-negative integers, Mn, to the rational number M divided

135
00:08:28,319 --> 00:08:30,879
by N. Well, N might be zero.

136
00:08:30,879 --> 00:08:35,919
So if N is zero, just map all of those pairs to some of your favorite rational number, call

137
00:08:35,919 --> 00:08:38,000
it a half.

138
00:08:38,000 --> 00:08:45,000
And that gives us a nice surjective mapping because every rational number can be expressed

139
00:08:45,000 --> 00:08:47,679
as M over, at least every non-negative rational number.

140
00:08:47,679 --> 00:08:52,479
So in effect, what we have is a surjection from the pairs of non-negative integers which

141
00:08:52,479 --> 00:09:00,579
we know is countable onto the non-negative rational numbers, quotients of integers, which

142
00:09:00,579 --> 00:09:06,679
means that the rationals sure enough are countable, even though they seem to be spread out all

143
00:09:06,679 --> 00:09:08,959
over the line.

144
00:09:08,959 --> 00:09:16,120
So again, we saw that if N cross N is countable, and there's a surge described above to the

145
00:09:16,600 --> 00:09:20,200
non-negative rationals, so they're countable.

146
00:09:20,200 --> 00:09:25,799
Well, just looking ahead a little bit, it's going to turn out that in contrast to the rational

147
00:09:25,799 --> 00:09:29,200
numbers, the real numbers are non-countable.

148
00:09:29,200 --> 00:09:36,679
And in fact, neither are the infinite binary sequences that we saw, though as a, a bijection

149
00:09:36,679 --> 00:09:41,560
between the infinite binary sequences and the power set of the non-negative integers.

150
00:09:41,560 --> 00:09:45,279
And both of these are going to be basic examples of uncountable sets.

151
00:09:45,279 --> 00:09:49,600
So sets that are not countable, which we will be examining in the next lecture.

