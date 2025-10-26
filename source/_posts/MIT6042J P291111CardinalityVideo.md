---
title: MIT6042J P291111CardinalityVideo
---

1
00:00:00,000 --> 00:00:10,560
Cardinality is the word that's used to refer to the size of infinite sets.

2
00:00:10,560 --> 00:00:15,720
And before we go further, let's take a quick look at why we're interested in infinite

3
00:00:15,720 --> 00:00:19,559
sets in a course that's mathematics for computer scientists.

4
00:00:19,559 --> 00:00:22,679
Why does computer science care about infinite sets?

5
00:00:22,679 --> 00:00:28,000
Well, you know, like every data structure that you'd examine in computer memory is finite

6
00:00:28,000 --> 00:00:31,879
and the integers individually are finite.

7
00:00:31,879 --> 00:00:34,520
They only calculate with finite things.

8
00:00:34,520 --> 00:00:39,280
But the infinite abstraction happens right at the beginning, although any given integer

9
00:00:39,280 --> 00:00:40,280
is finite.

10
00:00:40,280 --> 00:00:42,120
The set of all integers is infinite.

11
00:00:42,120 --> 00:00:49,679
And although any given matrix is finite, the set of all the matrices that might be represented

12
00:00:49,679 --> 00:00:54,240
in a computation are finite, our infinite set.

13
00:00:54,240 --> 00:01:00,679
So we take infinite sets for granted and reason about them all the time.

14
00:01:00,679 --> 00:01:07,240
The second, from a pedagogical point of view, introducing the concept of infinite sets

15
00:01:07,240 --> 00:01:13,760
and reasoning about them carefully forces you to go beyond your intuition and really follow

16
00:01:13,760 --> 00:01:19,200
the rules and reason in a careful mathematical way, because although some properties that

17
00:01:19,200 --> 00:01:23,520
you're familiar with from finite sets carry over to infinite sets, others don't.

18
00:01:23,519 --> 00:01:28,119
In order to know which is which, you have to be thinking carefully about the rules and

19
00:01:28,119 --> 00:01:34,439
properties that they have as opposed to just going by intuition and familiar properties.

20
00:01:34,439 --> 00:01:43,679
And finally, the reasoning that goes into comparing the sizes of infinite sets, which is the

21
00:01:43,679 --> 00:01:50,840
topic of today's video, has profound implications in computer science because it leads to the

22
00:01:50,840 --> 00:01:58,920
insight about the logical limits of computation and examples of specific problems that computers

23
00:01:58,920 --> 00:02:03,000
can't solve, which we'll be taking up in a later video.

24
00:02:03,000 --> 00:02:07,760
But for now, let's go back to the topic of cardinality.

25
00:02:07,760 --> 00:02:16,199
So there was this mathematician in the 19th century, late 19th century named Cantor, who

26
00:02:16,199 --> 00:02:22,039
was actually working on a Fourier series and he discovered that the kind of series that

27
00:02:22,039 --> 00:02:28,519
he was working with diverged at infinite in many places, which sounds kind of bad, but

28
00:02:28,519 --> 00:02:34,280
he wanted to get across the idea that it didn't diverge in very many infinite places.

29
00:02:34,280 --> 00:02:38,759
And that led him to this idea of comparing the sizes of infinite sets.

30
00:02:38,759 --> 00:02:41,280
So this is Cantor's idea.

31
00:02:41,280 --> 00:02:47,520
So you know from the mapping lemma that if you're looking at finite sets A and B, then

32
00:02:47,520 --> 00:02:53,000
the size of A is greater than or equal to the size of B. If and only if A surges B, where

33
00:02:53,000 --> 00:02:59,159
surges this technical relation, which means there exists a surjective function from A to

34
00:02:59,159 --> 00:03:06,439
B that is a function with greater than or equal to one arrow into every element of B.

35
00:03:06,439 --> 00:03:09,560
And Cantor's idea was saying, well, it works fine for finite sets.

36
00:03:09,560 --> 00:03:16,319
Why don't we take this as the definition of what we mean by A is at least the size of

37
00:03:16,319 --> 00:03:17,599
B for infinite sets.

38
00:03:17,599 --> 00:03:25,360
So we're going to think of A surge B now as saying A is as big as B. And for finite sets

39
00:03:25,360 --> 00:03:29,520
we could, it's literally true that A surge B if and only if the size of A is greater

40
00:03:29,520 --> 00:03:35,240
than or equal to the size of B. Now let me take a moment to say that this notion of size

41
00:03:35,240 --> 00:03:40,439
or cardinality, when you're talking about infinite sets it's kind of a no-no.

42
00:03:40,439 --> 00:03:46,439
There's an abstract concept of what cardinal numbers are, what these infinite numbers are,

43
00:03:46,439 --> 00:03:49,240
but the truth is they're technical and not very much use.

44
00:03:49,240 --> 00:03:54,800
So we will never actually be talking about the cardinality or size of an infinite set.

45
00:03:54,800 --> 00:03:56,920
But what we will do is compare them.

46
00:03:56,920 --> 00:04:03,600
We're going to have a nice elementary theory of the idea that the cardinality of one set

47
00:04:03,599 --> 00:04:06,960
is greater than or equal to the cardinality of another set.

48
00:04:06,960 --> 00:04:10,719
And the basic definition is going to be based on surge.

49
00:04:10,719 --> 00:04:13,560
Similarly, bijection is even easier.

50
00:04:13,560 --> 00:04:18,519
A bij means that there's a bijection from A to B. And we're going to interpret that as

51
00:04:18,519 --> 00:04:20,719
saying that A and B are the same size.

52
00:04:20,719 --> 00:04:25,879
That is, for finite sets it literally means A and B have the same number of elements.

53
00:04:25,879 --> 00:04:31,680
We're going to adopt the notion of a bijective relation for infinite sets as meaning, okay,

54
00:04:31,680 --> 00:04:35,600
I don't know what their size is, but I know it's the same because there's a bijection

55
00:04:35,600 --> 00:04:36,600
between them.

56
00:04:36,600 --> 00:04:42,400
There's a perfect one-to-one correspondence between A and B's.

57
00:04:42,400 --> 00:04:46,480
Let's look at an example of where a bijection comes up.

58
00:04:46,480 --> 00:04:51,600
The power set of N, if N is the non-negative integers, the power set of N is all the subsets

59
00:04:51,600 --> 00:04:53,319
of non-negative integers.

60
00:04:53,319 --> 00:04:58,519
And let me just remark that there's an obvious bijection between the subsets of integers

61
00:04:58,519 --> 00:05:02,240
and the infinite bit strings, the infinite strings of zeros and ones.

62
00:05:02,240 --> 00:05:06,279
So N is the set of non-negative integers, zero, one, two.

63
00:05:06,279 --> 00:05:11,719
If you take any subset of N, here's one with has zero, missing one, has two and three,

64
00:05:11,719 --> 00:05:18,039
missing four, five, has six, and so on, then what I can do is represent such a subset,

65
00:05:18,039 --> 00:05:23,039
possibly an infinite subset now, by an infinite sequence of ones and zeros, put in ones in

66
00:05:23,040 --> 00:05:29,200
the position where elements in the subset occur and zeros in positions where elements don't

67
00:05:29,200 --> 00:05:30,200
occur.

68
00:05:30,200 --> 00:05:39,280
This was exactly the same bijection that we had found between the non-negative, the bit

69
00:05:39,280 --> 00:05:44,200
strings and the finite subsets of the non-negative integers.

70
00:05:44,200 --> 00:05:48,520
But now we're just extending it to arbitrary subsets of the non-negative integers.

71
00:05:48,520 --> 00:05:53,000
So this defines a bijection between any subset of integers corresponds to an infinite

72
00:05:53,000 --> 00:05:58,519
bit strings and conversely from any infinite bit string, you can reconstruct what subset it

73
00:05:58,519 --> 00:05:59,519
refers to.

74
00:05:59,519 --> 00:06:04,879
So here's this notation, zero, one, to the omega, meaning the infinite bit strings that

75
00:06:04,879 --> 00:06:10,240
are infinite to the right, they have a beginning in comparison to zero, one superscript star,

76
00:06:10,240 --> 00:06:15,800
which refers to the finite sets of bit strings.

77
00:06:15,800 --> 00:06:22,920
So now let's examine the standard size properties that you'd expect if these relationships

78
00:06:22,920 --> 00:06:27,920
of surge and biject behaved like relationships between sizes.

79
00:06:27,920 --> 00:06:33,240
So one basic property that finite sizes have is that if A is equal to B and B is equal

80
00:06:33,240 --> 00:06:37,240
to C in size, then the size of A and the size of C are the same.

81
00:06:37,240 --> 00:06:42,560
And certainly true for finite sets, does it hold for infinite sets where now equality

82
00:06:42,560 --> 00:06:44,480
is going to be replaced by biject?

83
00:06:44,480 --> 00:06:46,080
Well, we have to check it.

84
00:06:46,079 --> 00:06:52,120
Is it true that if A, bij, B and B, bij, C implies A, bij, C?

85
00:06:52,120 --> 00:06:53,639
Well, how do you prove that?

86
00:06:53,639 --> 00:06:56,399
Well, it's true, and here's how.

87
00:06:56,399 --> 00:07:03,759
By definition, since A, bij, B, that means that you have a bijection, F, R, G, from A to

88
00:07:03,759 --> 00:07:10,079
B. And since B, bij, C, you have a bijection F from B to C.

89
00:07:10,079 --> 00:07:13,599
Now I need from these two bijections that I'm given.

90
00:07:13,600 --> 00:07:16,360
I need to find a bijection between A and C.

91
00:07:16,360 --> 00:07:17,360
Well, that's easy.

92
00:07:17,360 --> 00:07:23,560
What you do is you use G to go from A to B and then you use F to go from B to C and

93
00:07:23,560 --> 00:07:27,720
you compose them and that gives you the needed bijection from A to C.

94
00:07:27,720 --> 00:07:34,720
So you find H to be the composition of F and G and it's easy to check that if G and

95
00:07:34,720 --> 00:07:38,280
F are bijections, then their composition is a bijection.

96
00:07:38,280 --> 00:07:41,160
So that's how I find the needed bijection from A to C.

97
00:07:41,160 --> 00:07:44,040
So this property works out just fine.

98
00:07:44,040 --> 00:07:48,920
The similar property applies to at least as big as greater than or equal to, for finite

99
00:07:48,920 --> 00:07:52,880
sets, if A is greater than equal to B and B is greater than equal to C in size, then A

100
00:07:52,880 --> 00:07:57,900
is greater than equal to C. And actually the same argument that works for biject works

101
00:07:57,900 --> 00:08:03,640
for search because the composition of surjection, of surjective functions is a surjective function.

102
00:08:03,640 --> 00:08:08,120
So if A, surge B and B, surge C implies A, surge C.

103
00:08:08,120 --> 00:08:12,920
Now, again, remember, although we're thinking of surges meaning greater than or equal to

104
00:08:12,920 --> 00:08:17,079
in size, you cannot take these size properties for granted.

105
00:08:17,079 --> 00:08:18,639
They have to be proved.

106
00:08:18,639 --> 00:08:23,120
Surge has a technical definition having to do with surjective functions, functions with

107
00:08:23,120 --> 00:08:30,360
greater equal to 1 arrow in that is not the same as talking about equality of some kind

108
00:08:30,360 --> 00:08:31,360
of sizes.

109
00:08:31,360 --> 00:08:36,799
Well, let's look at an example where the size properties hold but they're less obvious.

110
00:08:36,799 --> 00:08:40,759
Because here's another familiar size property.

111
00:08:40,759 --> 00:08:45,500
If A and B are each of size greater than or equal to the other one, then they have the same

112
00:08:45,500 --> 00:08:46,500
size.

113
00:08:46,500 --> 00:08:50,339
So if the size of A is greater than the size of B and the size of B is greater than the

114
00:08:50,339 --> 00:08:53,599
size of A, then A and B are the same size.

115
00:08:53,599 --> 00:08:55,599
Now, this is certainly true for finite sets.

116
00:08:55,599 --> 00:08:59,799
It's kind of, you know, you can even think about that fact.

117
00:08:59,799 --> 00:09:04,439
And it holds for infinite sets, but it's not so obvious.

118
00:09:04,440 --> 00:09:10,120
So what we're saying is that if I have a surjective function from A to B and I have another

119
00:09:10,120 --> 00:09:17,000
surjective function from B to A, then there's a bijection between A and B. And the problem

120
00:09:17,000 --> 00:09:22,640
here is that this surjection from A to B might not be a bijection and this surjection

121
00:09:22,640 --> 00:09:25,360
from B to A might also not be a bijection.

122
00:09:25,360 --> 00:09:27,280
So where's the bijection going to come from?

123
00:09:27,280 --> 00:09:29,040
I have to build it.

124
00:09:29,040 --> 00:09:31,520
And so this is not an obvious property.

125
00:09:31,520 --> 00:09:32,520
It's true.

126
00:09:32,519 --> 00:09:33,799
It's a never-burned-stine theorem.

127
00:09:33,799 --> 00:09:39,519
And the trick basically is you take the bijection from A to B and the bijection from B to A

128
00:09:39,519 --> 00:09:45,399
and you take parts of one and combine it with parts of the other and in a slightly ingenious

129
00:09:45,399 --> 00:09:51,399
way that actually is contained in a problem in the text, you can find the bijection from

130
00:09:51,399 --> 00:09:52,399
A to B.

131
00:09:52,399 --> 00:09:54,000
But it does take a little bit of ingenuity.

132
00:09:54,000 --> 00:09:59,079
So this is a size property that works for surge and bijection.

133
00:09:59,080 --> 00:10:03,200
But you can't say it's obvious.

134
00:10:03,200 --> 00:10:07,720
Well let's look at an unfamiliar size property, something that's not true of finite sets where

135
00:10:07,720 --> 00:10:12,000
we have to start being careful and not just hand wave and use our intuition about finite

136
00:10:12,000 --> 00:10:13,000
sets.

137
00:10:13,000 --> 00:10:17,840
Namely, for infinite sizes, size plus one is equal to size.

138
00:10:17,840 --> 00:10:19,600
Now what exactly does that mean?

139
00:10:19,600 --> 00:10:21,759
Well let's just illustrate it with an example.

140
00:10:21,759 --> 00:10:27,440
In fact, in some ways you could say the definition of an infinite set is that its size plus

141
00:10:27,440 --> 00:10:29,800
one is equal to its size.

142
00:10:29,800 --> 00:10:31,480
Let's look at a simple example.

143
00:10:31,480 --> 00:10:36,320
So on the bottom I have the non-negative integers and on the top I have the positive integers.

144
00:10:36,320 --> 00:10:40,400
So I can get from the positive integers to the non-negative integers just by throwing

145
00:10:40,400 --> 00:10:41,400
in zero.

146
00:10:41,400 --> 00:10:43,080
So that's where the plus one comes from.

147
00:10:43,080 --> 00:10:44,520
Here's a nice infinite set.

148
00:10:44,520 --> 00:10:48,400
I add another element to it and I get another infinite set.

149
00:10:48,400 --> 00:10:50,480
But they are the same size.

150
00:10:50,480 --> 00:10:53,400
I have to show a bijection between them to show they're the same size.

151
00:10:53,399 --> 00:10:54,959
So you know what the bijection is.

152
00:10:54,959 --> 00:10:58,720
Map zero to one, one to two, two to three.

153
00:10:58,720 --> 00:11:04,159
This is a bijection which you know as the add one function, the add one function maps the

154
00:11:04,159 --> 00:11:08,879
non-negative integers to the positive integers and it's a perfect bijection.

155
00:11:08,879 --> 00:11:14,120
Therefore adding one element to the non-negative integers to the positive integers does not get

156
00:11:14,120 --> 00:11:15,120
me a larger set.

157
00:11:15,120 --> 00:11:17,480
It gets me another set of the same size.

158
00:11:17,480 --> 00:11:22,039
And this argument actually generalizes to any infinite set.

159
00:11:22,039 --> 00:11:26,559
If you throw in one extra element you could still find a bijection between the original

160
00:11:26,559 --> 00:11:30,559
set and the set with one extra element.

161
00:11:30,559 --> 00:11:33,559
So and is the same size as the positive integers.

162
00:11:33,559 --> 00:11:37,120
Well, in fact let's look at this one.

163
00:11:37,120 --> 00:11:42,480
I can enumerate on the top all the integers, both positive and negative, right?

164
00:11:42,480 --> 00:11:45,399
Zero, one minus one, two minus two and so on.

165
00:11:45,399 --> 00:11:49,759
And that gives me the set consisting of all the integers and over here I can have zero,

166
00:11:49,759 --> 00:11:52,200
one, two, just the non-negative integers.

167
00:11:52,200 --> 00:11:58,439
And you can see the orderly way in which I've listed the integers at the top, that implicitly

168
00:11:58,439 --> 00:11:59,439
defines a bijection.

169
00:11:59,439 --> 00:12:06,159
I'm going to map zero to the zero element of the sequence above one to one, two to minus

170
00:12:06,159 --> 00:12:08,639
one, three to two, four to minus two.

171
00:12:08,639 --> 00:12:15,879
And in this way I've actually defined a bijection between the non-negative integers and all

172
00:12:15,879 --> 00:12:16,879
the integers.

173
00:12:16,879 --> 00:12:21,879
In other words, you take a half of the integers, namely the non-negative integers, and it's

174
00:12:21,879 --> 00:12:23,840
still the same size as all of them.

175
00:12:23,840 --> 00:12:27,759
There's a bijection between n and z.

176
00:12:27,759 --> 00:12:32,919
Now you could write a formula actually if you were trying to figure out what does the

177
00:12:32,919 --> 00:12:36,799
number n go to, what positive or negative integers.

178
00:12:36,799 --> 00:12:41,759
There's some not very hard formula involving dividing n by two and rounding.

179
00:12:41,759 --> 00:12:42,759
But that doesn't matter.

180
00:12:42,759 --> 00:12:49,439
Once I've figured out some sensible way to list all the elements of the integers in a row,

181
00:12:49,439 --> 00:12:52,480
then I can line them up against the non-negative integers.

182
00:12:52,480 --> 00:12:57,960
And that listing in effect defines the mapping in a perfectly clear way without necessarily

183
00:12:57,960 --> 00:12:58,960
having a formula.

