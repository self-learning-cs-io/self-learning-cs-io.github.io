---
title: PrincetonAlgorithms P102Part29 06_rabin Karp
---

1
00:00:00,000 --> 00:00:05,400
And that's still not the end of the story.

2
00:00:05,400 --> 00:00:12,280
We're going to go one more really interesting algorithm that has lots of important applications

3
00:00:12,280 --> 00:00:14,080
called a RavenCarp algorithm.

4
00:00:14,080 --> 00:00:19,600
I'm vented by two Turing Award winners, Michael Raven and Dick Carp.

5
00:00:19,600 --> 00:00:24,679
I can remember hearing about this algorithm from my friend Dick Lipton who explained it to

6
00:00:24,679 --> 00:00:29,560
me over the phone and he explained it to me in about 15 seconds.

7
00:00:29,559 --> 00:00:32,759
And I realized I had to have this in the book.

8
00:00:32,759 --> 00:00:37,039
And so now here we are presenting it.

9
00:00:37,039 --> 00:00:39,439
That was in the 70s.

10
00:00:39,439 --> 00:00:45,719
So the basic idea for the RavenCarp algorithm has to do with hashing.

11
00:00:45,719 --> 00:00:49,519
And it's a particular kind of hashing called modular hashing.

12
00:00:49,519 --> 00:00:53,399
It's just a particular way of computing a hash function.

13
00:00:53,399 --> 00:00:57,960
It's easiest to think about in terms of numbers, although it works in all kinds of situations

14
00:00:57,960 --> 00:01:03,359
because remember everything in a computer is encoded as a bit which can be treated as

15
00:01:03,359 --> 00:01:06,680
bits which could be treated as binary numbers.

16
00:01:06,680 --> 00:01:14,359
And so what we're going to do is in this case, so our pattern characters are decimal digits.

17
00:01:14,359 --> 00:01:20,079
And so we'll treat a sequence of pattern characters as a decimal number.

18
00:01:20,079 --> 00:01:27,719
And modular hashing is just take a big prime and compute the remainder when you divide your

19
00:01:27,719 --> 00:01:30,079
number by that prime.

20
00:01:30,079 --> 00:01:41,159
So in this case, 613 is the remainder that you get when you divide 26,000, 535 by 997.

21
00:01:41,159 --> 00:01:42,560
So you can check that.

22
00:01:42,560 --> 00:01:46,759
And so that's what we're going to use as the hash function.

23
00:01:46,759 --> 00:01:50,759
And that, this type of hashing is widely used.

24
00:01:50,759 --> 00:01:52,560
You have a prime number.

25
00:01:52,560 --> 00:01:55,439
We talked about it when we talked about hashing.

26
00:01:55,439 --> 00:02:02,359
It satisfies, seems to satisfy something like the uniform hash assumption under very

27
00:02:02,359 --> 00:02:05,000
circumstances.

28
00:02:05,000 --> 00:02:08,439
So that's our pattern, a five character pattern.

29
00:02:08,439 --> 00:02:14,919
And we're going to keep the small hash value 613.

30
00:02:14,919 --> 00:02:17,199
And this is going to generalize to longer patterns.

31
00:02:17,199 --> 00:02:20,079
I will talk about that in a minute.

32
00:02:20,080 --> 00:02:23,000
So now suppose we have this text.

33
00:02:23,000 --> 00:02:27,200
And our pattern happens to occur here in the text.

34
00:02:27,200 --> 00:02:34,439
And what the method is built on is the idea of you take the first five characters in the

35
00:02:34,439 --> 00:02:36,680
text and compute its hash value.

36
00:02:36,680 --> 00:02:41,880
In this case, 30, 1,000, 415, 997 is 508.

37
00:02:41,880 --> 00:02:43,120
So that's different.

38
00:02:43,120 --> 00:02:44,720
So that's not the pattern.

39
00:02:44,720 --> 00:02:46,720
And then you take the next five characters.

40
00:02:46,720 --> 00:02:47,720
That's 201.

41
00:02:47,720 --> 00:02:48,720
That's different.

42
00:02:48,720 --> 00:02:49,720
It's not the pattern.

43
00:02:50,000 --> 00:02:51,840
Take the next one.

44
00:02:51,840 --> 00:02:53,240
That's 715.

45
00:02:53,240 --> 00:02:55,639
Different is not the pattern.

46
00:02:55,639 --> 00:02:59,319
15,926,997 is 971.

47
00:02:59,319 --> 00:03:00,639
It's not the pattern.

48
00:03:00,639 --> 00:03:05,280
Eventually, when you have the text characters that are the same as the pattern characters,

49
00:03:05,280 --> 00:03:06,639
you're going to get the same result.

50
00:03:06,639 --> 00:03:08,120
It's a match.

51
00:03:08,120 --> 00:03:17,280
If the pattern hash equals the text substring hash, you have the potential for a match.

52
00:03:17,280 --> 00:03:19,319
That's what the algorithm's based on.

53
00:03:19,319 --> 00:03:26,519
Now, it seems like we're doing a lot of calculation with making numbers out of these things and doing

54
00:03:26,519 --> 00:03:29,359
modular arithmetic on it.

55
00:03:29,359 --> 00:03:36,159
But actually, there's a really simple way to severely limit the amount of calculation

56
00:03:36,159 --> 00:03:43,159
and give a quick linear algorithm for substring search.

57
00:03:43,159 --> 00:03:47,879
So first thing is how to compute the hash function.

58
00:03:47,879 --> 00:03:52,359
So we take the just convert to math.

59
00:03:52,359 --> 00:03:53,960
So R's are radix.

60
00:03:53,960 --> 00:03:56,560
So in this example, we're using 10.

61
00:03:56,560 --> 00:03:58,919
So we have decimal numbers.

62
00:03:58,919 --> 00:04:01,799
And then the digits say T sub i.

63
00:04:01,799 --> 00:04:04,519
That's the text characters.

64
00:04:04,519 --> 00:04:14,719
So we have a number X sub i, which is the M characters starting at position i.

65
00:04:14,719 --> 00:04:18,959
And that's just math T sub i times R to the M minus 1.

66
00:04:18,959 --> 00:04:31,519
So in this case, it's 2 times 10,000 plus 6 times 1,000 plus 5 times 100 plus 3 times 10

67
00:04:31,519 --> 00:04:33,040
plus 5.

68
00:04:33,040 --> 00:04:35,360
That's just math for that.

69
00:04:35,360 --> 00:04:41,000
And our goal is, as I said, an M digit base R integer modular queue.

70
00:04:41,000 --> 00:04:45,439
And our goal is to do the math to give us the remainder that we'll get when dividing

71
00:04:45,439 --> 00:04:48,079
that by you.

72
00:04:48,079 --> 00:04:57,639
Well, there's a really easy method called Horner's method that we can use to evaluate a

73
00:04:57,639 --> 00:05:03,079
decree and polynomial just with a multiply M multiply an ads.

74
00:05:03,079 --> 00:05:09,759
And we can do the modular computation all the way through at each step to keep the numbers

75
00:05:09,759 --> 00:05:13,959
less than Q. And we still get the same result.

76
00:05:13,959 --> 00:05:21,920
And so the idea is you multiply by R. You go from left to right through the digits.

77
00:05:21,920 --> 00:05:27,719
And you just multiply by R and add the digit and then new mod Q at every time.

78
00:05:27,719 --> 00:05:31,319
So we start with 2 mod 97 is 2.

79
00:05:31,319 --> 00:05:36,000
2 6 mod 97 is 2 times 10 plus 6 mod 97.

80
00:05:36,000 --> 00:05:38,839
And that's 26.

81
00:05:38,839 --> 00:05:43,159
And then I take that value, multiply by 10 and add 5.

82
00:05:43,159 --> 00:05:47,199
That's 265 mod 97.

83
00:05:47,199 --> 00:05:50,519
And that's 265.

84
00:05:50,519 --> 00:05:54,959
So 265 times 10 plus 3 is 265 3.

85
00:05:54,959 --> 00:05:58,279
Remain to be divided by 987 is 659.

86
00:05:58,279 --> 00:06:03,799
So even though our number gets bigger than 997, I might take them out every time.

87
00:06:03,799 --> 00:06:08,279
We keep our running total less than 997.

88
00:06:08,279 --> 00:06:13,759
And then the last step is to take the 659.

89
00:06:13,759 --> 00:06:19,439
Basically, we've thrown out a bunch of multiples of 997 that we don't care about.

90
00:06:19,439 --> 00:06:25,799
And 659 times 10 plus 5 mod 97 is exactly equal to 265 3.

91
00:06:25,800 --> 00:06:41,000
So that's a, using Horner's method, we get a well-known linear time method to compute

92
00:06:41,000 --> 00:06:44,759
our hash function with this simple code.

93
00:06:44,759 --> 00:06:52,360
And this noticeable work even for a huge key that we wouldn't compute a hundred, convert

94
00:06:52,360 --> 00:06:57,560
a hundred digit key into some number to do the calculation.

95
00:06:57,560 --> 00:07:02,800
We do them one digit a time using Horner's method and then we have no limit because we're

96
00:07:02,800 --> 00:07:07,720
always keeping our numbers less than our prime cube.

97
00:07:07,720 --> 00:07:09,840
So that's a first step.

98
00:07:09,840 --> 00:07:16,280
So no matter how big the pattern is, we can efficiently compute a hash or it.

99
00:07:16,280 --> 00:07:19,040
So that's first step.

100
00:07:19,040 --> 00:07:31,000
So now the second step for the Ravencarp algorithm is to realize that if we know Xi mod

101
00:07:31,000 --> 00:07:37,000
cube, we can efficiently compute Xi plus one mod cube because they have a lot of digits

102
00:07:37,000 --> 00:07:38,680
in common.

103
00:07:38,680 --> 00:07:46,400
And you can just do a little math to get to Xi plus one.

104
00:07:46,400 --> 00:07:54,079
You take Xi, we don't care about the first digit anymore, so you subtract it off, multiply

105
00:07:54,079 --> 00:07:57,439
by R, and then add the new digit.

106
00:07:57,439 --> 00:08:01,960
That's like one step of Horner's method.

107
00:08:01,959 --> 00:08:09,959
Now then you have to take that computation and you can do mod cube all the way through.

108
00:08:09,959 --> 00:08:14,120
All you have to do is pre-compute R to the M plus one mod cube.

109
00:08:14,120 --> 00:08:19,519
And so here's the computation for one example.

110
00:08:19,519 --> 00:08:28,079
If we're at this position, 41592, and we know 41592 mod cube, we can compute 15926 mod

111
00:08:28,079 --> 00:08:35,919
cube by some tracking off 40,000, this DiR of the M minus one.

112
00:08:35,919 --> 00:08:38,639
And that gives us just the four digits.

113
00:08:38,639 --> 00:08:44,199
Multiply by the radix, add the new trailing digit, and that's the new value.

114
00:08:44,199 --> 00:08:56,319
And if we just keep that all mod cube, then we can, with just a multiply in an add at each

115
00:08:56,320 --> 00:09:07,040
step, we can keep a running total of the modular hash value of the five digit thing.

116
00:09:07,040 --> 00:09:22,040
So for example, this is the case that we just did 4152 mod 977 is done by exactly, as we

117
00:09:22,039 --> 00:09:29,120
said, we subtract and then add and then multiply by the radix mod 977.

118
00:09:29,120 --> 00:09:34,679
So doing those calculations all the way through the search, we eventually get to a match.

119
00:09:34,679 --> 00:09:38,439
That's again remarkably small amount of code.

120
00:09:38,439 --> 00:09:45,679
We're going to keep a long run of prime, just keep it a little smaller than the biggest

121
00:09:45,679 --> 00:09:49,599
long value to avoid overflow.

122
00:09:49,599 --> 00:09:56,599
So we pre-compute R to the M minus one mod cube, because that's the little calculation

123
00:09:56,599 --> 00:09:58,919
that we have to do.

124
00:09:58,919 --> 00:10:08,559
We compute the hash function for the pattern, and then with those pre-computations, the

125
00:10:08,559 --> 00:10:13,399
search is extremely straightforward.

126
00:10:13,399 --> 00:10:24,480
So we take our current hash value, and this is just add a queue to make sure it's positive

127
00:10:24,480 --> 00:10:33,519
and subtract off RM times the first character, and then add in the next character mod cube.

128
00:10:33,519 --> 00:10:39,360
And that gives us the text hash for the current position, and then we compare to see if that's

129
00:10:39,360 --> 00:10:43,360
equal to the pattern hash.

130
00:10:43,360 --> 00:10:50,919
Now there's an introduction to the idea of randomized algorithms.

131
00:10:50,919 --> 00:10:54,919
There's two ways to proceed from here.

132
00:10:54,919 --> 00:11:01,639
One way called the Monte Carlo version, where we guarantee that the algorithm is going to

133
00:11:01,639 --> 00:11:07,360
be quick, but with low probability, M I get the answer wrong.

134
00:11:07,360 --> 00:11:13,480
That version, we don't ever bother to check whether the, going through and check all the

135
00:11:13,480 --> 00:11:16,720
digits to see if there's actually a match.

136
00:11:16,720 --> 00:11:27,279
We take queue large enough so that we're confident that the probability of two queue digit numbers,

137
00:11:27,279 --> 00:11:32,759
or two M digit numbers, having the same hash value is so low that we're not going to worry

138
00:11:32,759 --> 00:11:33,759
about it.

139
00:11:33,759 --> 00:11:36,120
That's called the Monte Carlo version.

140
00:11:36,120 --> 00:11:41,720
The Las Vegas version is guaranteed to get the right answer.

141
00:11:41,720 --> 00:11:47,080
In that one, we would go and check to make sure that the M characters match if we have a

142
00:11:47,080 --> 00:11:49,120
hash match.

143
00:11:49,120 --> 00:11:56,720
And then if it could be that with such a low probability, it could be that there's a hash

144
00:11:56,720 --> 00:12:00,600
match, but not a substring match, and then we just move on.

145
00:12:00,600 --> 00:12:09,360
From a theoretical point of view, there's some very extremely low possibility that that

146
00:12:09,360 --> 00:12:15,560
one could be slow, but let's look at what the analysis says.

147
00:12:15,560 --> 00:12:24,120
So the theory says that if you take a sufficiently large random prime, say M and squared, so

148
00:12:24,120 --> 00:12:26,480
a long value, maybe you can get that.

149
00:12:26,480 --> 00:12:28,720
And remember, N is huge.

150
00:12:28,720 --> 00:12:36,279
Then the probability of a false collision is about one over N. So in a billion things you

151
00:12:36,279 --> 00:12:41,879
might get, one over N, you might get a false collision.

152
00:12:41,879 --> 00:12:48,920
So in practice, which choose actually queue just to be a, there's no reason not to choose

153
00:12:48,920 --> 00:12:54,080
as large as we possibly can, not related to M and N. And then the probability of collisions

154
00:12:54,080 --> 00:12:55,639
are going to be about one over a queue.

155
00:12:55,639 --> 00:12:59,639
We're going to take it to be like the biggest long.

156
00:12:59,639 --> 00:13:04,680
And that means that the probability of collision is extremely small.

157
00:13:04,680 --> 00:13:06,560
And then you can take your chances.

158
00:13:06,560 --> 00:13:12,840
You can do a Monte Carlo version where you just say, I got a match because I got a hash

159
00:13:12,840 --> 00:13:20,200
match, and be confident in the loss of probability, and not worry about the client getting a wrong

160
00:13:20,200 --> 00:13:21,680
answer.

161
00:13:21,680 --> 00:13:28,000
Or you can have the Las Vegas version where you go and go ahead and return the correct answer.

162
00:13:28,000 --> 00:13:35,759
And be confident that your client's not going to run into a slow case because the probability

163
00:13:35,759 --> 00:13:42,840
is so tiny, one over queue that you don't have to worry about it.

164
00:13:42,840 --> 00:13:46,160
That's the Ravencorp algorithm.

165
00:13:46,160 --> 00:13:49,560
Now while I look at this algorithm, it's linear time.

166
00:13:49,559 --> 00:13:51,879
We have other algorithms that are linear time.

167
00:13:51,879 --> 00:13:57,519
One of the key reasons to be interested in Ravencorp is that it's easy to extend it to

168
00:13:57,519 --> 00:14:00,239
more complicated situations.

169
00:14:00,239 --> 00:14:04,039
So say you want to look for one of several different patterns.

170
00:14:04,039 --> 00:14:08,759
Well, you just compute the hashes for those patterns and then look for any one of them use

171
00:14:08,759 --> 00:14:11,639
a symbol table to look for them.

172
00:14:11,639 --> 00:14:16,959
So that's a much more general capability than we can provide with the other methods.

173
00:14:16,960 --> 00:14:23,120
It also can be extended to do two-dimensional search and other things like that.

174
00:14:23,120 --> 00:14:28,440
First straight sub-fringed search, it's going to be a little slower because there's interloop.

175
00:14:28,440 --> 00:14:29,720
It's kind of long.

176
00:14:29,720 --> 00:14:34,960
The arithmetic operations are going to be a little slow.

177
00:14:34,960 --> 00:14:40,280
If you want to do the Las Vegas version, you have to back up the text and you have this

178
00:14:40,280 --> 00:14:44,000
Monte Carlo Las Vegas thing.

179
00:14:44,000 --> 00:14:50,360
You should think about writing code to extend it to look for any one of the possible patterns.

180
00:14:50,360 --> 00:14:59,080
That's an interesting algorithmic puzzle that, as I mentioned, is not so difficult to solve.

181
00:14:59,080 --> 00:15:00,080
So here's our summary.

182
00:15:00,080 --> 00:15:04,679
We started with a brute force algorithm.

183
00:15:04,679 --> 00:15:11,840
Although typically you don't have this worst case thing, it works fairly well for typical

184
00:15:11,840 --> 00:15:13,639
cases.

185
00:15:13,639 --> 00:15:23,720
And then we've got the Knutmore's Prath method that can guarantee linear time and has no

186
00:15:23,720 --> 00:15:29,480
backup and maybe uses extra space unless you use Prath's version.

187
00:15:29,480 --> 00:15:36,519
And you get Boyer Moore who can get the running time down to N over M, which is quite an amazing

188
00:15:36,519 --> 00:15:43,600
jump and quite useful in an Arabian carp that's very flexible and extends to all the

189
00:15:43,600 --> 00:15:46,080
other situations.

190
00:15:46,080 --> 00:15:55,920
This is a nice microcosm of algorithmic technology where really interesting and unique and path-breaking

191
00:15:55,920 --> 00:16:03,759
algorithmic ideas give us good algorithms for even such a simple problem.

192
00:16:03,759 --> 00:16:05,480
That's an introduction to pattern matching.

