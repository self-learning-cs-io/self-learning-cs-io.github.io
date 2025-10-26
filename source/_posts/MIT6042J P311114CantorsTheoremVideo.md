---
title: MIT6042J P311114CantorsTheoremVideo
---

1
00:00:00,000 --> 00:00:07,839
So it's time to examine uncountable sets.

2
00:00:07,839 --> 00:00:15,120
And that's what we're going to do in this segment.

3
00:00:15,120 --> 00:00:19,559
So Cantor's question was, are all sets the same size?

4
00:00:19,559 --> 00:00:23,719
And he gives a definitive answer of no.

5
00:00:23,719 --> 00:00:29,839
Cantor's theorem, which we're about to present, will show that in fact, there isn't any

6
00:00:29,839 --> 00:00:31,120
biggest infinity.

7
00:00:31,120 --> 00:00:36,159
For any given infinity, you can find a bigger one in a very simple way.

8
00:00:36,159 --> 00:00:44,000
But let's begin by coming up with the simplest form of Cantor's diagonal argument.

9
00:00:44,000 --> 00:00:47,519
Of how do you prove that a set is not countable?

10
00:00:47,519 --> 00:00:51,960
Well, remember, a set is countable if you can list it possibly with repeats.

11
00:00:51,960 --> 00:00:57,100
So A is countable if there's a sequence A0, A1, A2, such that every element in the set A

12
00:00:57,100 --> 00:01:01,820
shows up at some time or other in the list, possibly more than once, and the only things

13
00:01:01,820 --> 00:01:08,659
in the list are elements of A. And we saw as an example that the finite bit strings,

14
00:01:08,659 --> 00:01:14,340
the finite strings of zeros and ones, or the finite binary words, are an example of a countable

15
00:01:14,340 --> 00:01:15,340
set.

16
00:01:15,340 --> 00:01:19,780
And I'd be claim last time in an hour about to prove that the difference is that if you

17
00:01:19,780 --> 00:01:24,500
look at the infinite bit strings, the one-way infinite, they have a beginning and they go

18
00:01:24,500 --> 00:01:30,260
on infinitely to the right, the notation being 0, 1 to the omega, where omega is an indication

19
00:01:30,260 --> 00:01:33,340
of one of the symbols for it in the kind of infinity.

20
00:01:33,340 --> 00:01:37,099
And this is going to be an example of an uncountable set.

21
00:01:37,099 --> 00:01:39,060
How are we going to prove that?

22
00:01:39,060 --> 00:01:45,900
Well, the set up for using a diagonal argument is to think about drawing a matrix.

23
00:01:45,900 --> 00:01:54,460
Suppose that I have some way of enumerating the infinite binary sequences in 0, 1 to

24
00:01:54,459 --> 00:01:55,459
the omega.

25
00:01:55,459 --> 00:02:00,379
So there's a sequence s0, there's a sequence s1, there's a sequence s2, let's lay them

26
00:02:00,379 --> 00:02:04,099
out, let's know they were the rows of a matrix.

27
00:02:04,099 --> 00:02:10,620
So s0 is this infinite binary sequence, 0, 0, 1, 0, and so on.

28
00:02:10,620 --> 00:02:14,979
And the column labels are simply the coordinate labels for s0.

29
00:02:14,979 --> 00:02:18,740
So this is s0, 0, s0, 1, and so on.

30
00:02:18,740 --> 00:02:26,420
s1 is the next infinite binary sequence in this hypothetical list, and it starts 0, 1,

31
00:02:26,420 --> 00:02:29,780
1, 0, and goes on, and so on down the line.

32
00:02:29,780 --> 00:02:37,820
So the row labels are this enumeration of binary sequences, and the column labels are

33
00:02:37,820 --> 00:02:38,820
coordinate labels.

34
00:02:38,820 --> 00:02:43,140
And this is a matrix that's infinite to the right and infinite down, but it definitely

35
00:02:43,140 --> 00:02:46,020
has an upper left corner.

36
00:02:46,020 --> 00:02:54,460
So the trick is to try to find an infinite binary sequence that is not in this list, that

37
00:02:54,460 --> 00:02:56,860
it differs from every row.

38
00:02:56,860 --> 00:03:03,420
If I can do that, then I've shown that any attempt to enumerate all of the binary sequences

39
00:03:03,420 --> 00:03:09,780
in 0, 1 to the omega, any sequence like s0, s1, s2 of binary sequences is missing something,

40
00:03:09,780 --> 00:03:11,980
which means you can't really list it.

41
00:03:11,980 --> 00:03:14,260
Well how do you find something that's missing?

42
00:03:14,260 --> 00:03:15,580
How do you find a sequence that's not here?

43
00:03:15,580 --> 00:03:17,260
Well it's pretty easy.

44
00:03:17,260 --> 00:03:19,660
You look at the first digit, and that was a 0.

45
00:03:19,660 --> 00:03:24,500
So you choose the first digit of the new sequence to be 1, the opposite of 0.

46
00:03:24,500 --> 00:03:33,740
You choose the second digit to be the opposite of the coordinate of s, a 1 of s1, and compliment

47
00:03:33,740 --> 00:03:34,740
that.

48
00:03:34,740 --> 00:03:40,020
Now here the digit 2 of s2 is a 0, so let's make that a 1, and the next one on the diagonal

49
00:03:40,020 --> 00:03:45,540
is a 0, and so on we're going to compliment all of the bits along this diagonal.

50
00:03:45,539 --> 00:03:50,340
So I get a diagonal sequence, that's why this argument is called a diagonal argument.

51
00:03:50,340 --> 00:03:54,819
Well let's think about this diagonal sequence, it just goes on, right down the diagonal of

52
00:03:54,819 --> 00:03:57,219
this 2-dimensional infinite matrix.

53
00:03:57,219 --> 00:04:01,780
What we can say about it is that it differs from every row.

54
00:04:01,780 --> 00:04:02,780
Why is that?

55
00:04:02,780 --> 00:04:06,299
Well it differs from the 15th row with the 15th position, or coordinate 15.

56
00:04:06,299 --> 00:04:09,819
It differs from the 99th row at coordinate 99.

57
00:04:09,819 --> 00:04:13,939
It's not in the matrix, it's not a row of any matrix.

58
00:04:13,939 --> 00:04:19,980
And that immediately tells you it's over any attempt to list all of the elements in 0,

59
00:04:19,980 --> 00:04:26,060
1 to the omega, is going to omit a diagonal element, it's not possible to list all of them,

60
00:04:26,060 --> 00:04:28,660
in other words.

61
00:04:28,660 --> 00:04:34,620
There isn't any surjection from the non-negative integers to 0, 1 to the omega, because

62
00:04:34,620 --> 00:04:43,899
I've just shown you how if you give me a surjection of binary sequences, in effect I'm giving

63
00:04:43,979 --> 00:04:49,699
you with n, a 0 sequence, a 1 sequence, a 3rd second sequence, and so on, then I know exactly

64
00:04:49,699 --> 00:04:51,099
how to find something that's not there.

65
00:04:51,099 --> 00:04:57,219
There can't be a surjection from n to the 0, 1 to the omega, it's just not true.

66
00:04:57,219 --> 00:05:01,699
And that's why we can say that 0, 1 to the omega is unaccountable.

67
00:05:01,699 --> 00:05:05,139
Definition of countable, or an equivalent formulation of countable, remember is that there's

68
00:05:05,139 --> 00:05:07,579
a surjection from the non-negative integers to the set.

69
00:05:07,579 --> 00:05:09,779
Well there isn't any, we just proved it.

70
00:05:09,779 --> 00:05:17,379
So n is not surge 0, 1, by the way, it's also quite easy to say that there is a surjection

71
00:05:17,379 --> 00:05:21,339
from the infinite binary sequence to the non-negative integers.

72
00:05:21,339 --> 00:05:29,579
You could map a binary sequence to the coordinate of the first one in it, and that maps every

73
00:05:29,579 --> 00:05:34,299
infinite binary sequence to a non-negative integer, it hits every non-negative integer,

74
00:05:34,300 --> 00:05:35,300
lots of times.

75
00:05:35,300 --> 00:05:40,139
I hit 5 with a sequence that starts with 4, 0, and 1.

76
00:05:40,139 --> 00:05:44,100
The only sequence that doesn't go anywhere is the all 0 sequence, but by the way, if you

77
00:05:44,100 --> 00:05:48,500
check the definition of surge, it doesn't require that the function be total.

78
00:05:48,500 --> 00:05:56,180
Surge means that there is a function that is a surjection to n, but there doesn't have

79
00:05:56,180 --> 00:06:00,900
to be greater than or equal 1 arrow out, there just has to be less than or equal to 1 arrow,

80
00:06:00,900 --> 00:06:01,900
so it's a function.

81
00:06:01,899 --> 00:06:03,899
But of course, it's easy enough to make it total.

82
00:06:03,899 --> 00:06:06,699
The all 0 sequence just maps it to 0.

83
00:06:06,699 --> 00:06:13,699
So now you have both 0 and the sequence that starts with any sequence that starts with

84
00:06:13,699 --> 00:06:15,699
1 will all map to 0.

85
00:06:15,699 --> 00:06:23,339
Okay, so if we remember our intuition, the surge is read as greater than or equal to, so

86
00:06:23,339 --> 00:06:28,579
this tells us that the infinite binary sequences are a larger set, at least as larger set as

87
00:06:28,579 --> 00:06:32,539
the non-negative integers, and the converse is true, the non-negative integers are not

88
00:06:32,539 --> 00:06:38,259
at least as large as the infinite binary sequences, so we can really say that the non-negative

89
00:06:38,259 --> 00:06:43,579
integers are strictly smaller than the set of infinite binary sequences.

90
00:06:43,579 --> 00:06:49,539
Now, strictly smaller is in quotes, because again, we don't know exactly what the size

91
00:06:49,539 --> 00:06:51,659
of infinite sets is.

92
00:06:51,659 --> 00:06:57,379
All we're doing really are talking about properties of objections, bijection surge,

93
00:06:57,379 --> 00:06:58,379
objections, injections.

94
00:06:58,379 --> 00:07:02,180
Okay, so let's make an explicit definition.

95
00:07:02,180 --> 00:07:08,620
I'm going to say that a strict b means that there is no surgection from a to b.

96
00:07:08,620 --> 00:07:14,300
So if we read a surgection b intuitively as a greater than or equal to b, this is saying

97
00:07:14,300 --> 00:07:19,500
it's not true that a is greater than or equal to b, or in ordinary language and thinking

98
00:07:19,500 --> 00:07:23,860
about sets, if it's not true that you're greater than or equal to b, you must be strictly

99
00:07:23,860 --> 00:07:25,259
less than b.

100
00:07:25,259 --> 00:07:27,579
So that's the motivation for the word strict.

101
00:07:27,579 --> 00:07:32,180
But remember, we're talking about infinite sets, and we can't go around assuming too many

102
00:07:32,180 --> 00:07:35,019
properties of strict until we've proved them.

103
00:07:35,019 --> 00:07:39,740
One non-trivial property, by the way, is I'm defined strict that it's not true that there's

104
00:07:39,740 --> 00:07:47,300
a surgection from a to b, but I'm not insisting that there must be a surgection from b to a,

105
00:07:47,300 --> 00:07:51,300
which would be the second companion part, that is a is not greater than or equal to b,

106
00:07:51,300 --> 00:07:53,379
and b is greater than or equal to a.

107
00:07:53,379 --> 00:07:58,060
It turns out, technically, you can prove that if there isn't any surgection from a to

108
00:07:58,060 --> 00:08:02,819
b, there will be a surgection from b to a, but that's using a set theoretic argument that's

109
00:08:02,819 --> 00:08:04,779
not so obvious, and we don't need it.

110
00:08:04,779 --> 00:08:09,899
So this is the definition of strict a, strict b means you cannot get a surgection from a

111
00:08:09,899 --> 00:08:15,420
to b, and we're intuitively reading it as a is strictly small within b.

112
00:08:15,420 --> 00:08:21,620
And what we've just shown then is that the non-negative integers strict 0, 1 to the

113
00:08:21,620 --> 00:08:24,180
omega, the infinite binary sequences.

114
00:08:24,180 --> 00:08:29,139
Okay, now, cantist theorem is a wonderful generalization of this.

115
00:08:29,139 --> 00:08:33,460
It's a powerful generalization, but the proof is pretty much the same, although it sometimes

116
00:08:33,460 --> 00:08:35,740
looks a little different as it's written up.

117
00:08:35,740 --> 00:08:40,100
And what cantist theorem says is just beautifully elegant and simple.

118
00:08:40,100 --> 00:08:44,820
It says simply that the power set is strictly bigger than the set.

119
00:08:44,820 --> 00:08:50,580
A strict power set of a, for every set a, even if a is finite, because remember if a is

120
00:08:50,580 --> 00:08:56,400
finite, say a has n elements, then the power set of a has 2 to the n elements, and you

121
00:08:56,400 --> 00:09:02,740
can check that even for a equals 0, n is less than or equal to 2 to the n is less than 2

122
00:09:02,740 --> 00:09:03,740
to the n.

123
00:09:03,740 --> 00:09:13,020
0 is less than 2 to the 0, which is 1, 2 is less than 2 squared, which is 4 and so on.

124
00:09:13,020 --> 00:09:17,900
So even for finite sets, we have a strict power set of a, but the cool thing is that it works

125
00:09:17,900 --> 00:09:20,340
even for infinite sets.

126
00:09:20,340 --> 00:09:21,340
Let's take a look.

127
00:09:21,340 --> 00:09:25,899
It's a diagonal argument again, but now I mustn't assume that a is countable.

128
00:09:25,899 --> 00:09:29,500
I'm not going to assume that I can really list the elements of a, but we'll think about

129
00:09:29,500 --> 00:09:30,660
it as though we could.

130
00:09:30,660 --> 00:09:32,700
Let's think about this matrix again.

131
00:09:32,700 --> 00:09:36,460
So suppose a is this set of elements, a, b, st, d, e.

132
00:09:36,460 --> 00:09:41,379
I'm scrambling up the alphabet on purpose because I don't want you to get the idea that

133
00:09:41,379 --> 00:09:45,019
we're assuming that a is countable, that you can list all the elements of a.

134
00:09:45,019 --> 00:09:49,980
I'm not assuming that, but I'm just writing out a sample of elements of a.

135
00:09:49,980 --> 00:09:55,019
And let's suppose that I was trying to get a surjection from a to the power set of

136
00:09:55,019 --> 00:09:56,019
a.

137
00:09:56,019 --> 00:10:02,580
So suppose I have a function f that maps each of the successive elements of a to some subset

138
00:10:02,580 --> 00:10:03,580
of a.

139
00:10:03,580 --> 00:10:05,940
So f of a is part of the power set.

140
00:10:05,940 --> 00:10:11,220
It's a subset of capital A, f of b is a subset of capital A, and so on.

141
00:10:11,220 --> 00:10:12,860
And suppose I had a set up like this.

142
00:10:12,860 --> 00:10:17,300
I'm going to draw a matrix that looks like the diagonal matrix, and we're going to extract

143
00:10:17,299 --> 00:10:23,899
the diagonal set and discover that that diagonal set is not one of the f's.

144
00:10:23,899 --> 00:10:27,859
It's not f of anything, which means that f is not going to be a surjection.

145
00:10:27,859 --> 00:10:29,019
So let's look at it again.

146
00:10:29,019 --> 00:10:33,939
So here's this matrix where I'm labeling the columns of the matrix by the elements of

147
00:10:33,939 --> 00:10:35,740
a.

148
00:10:35,740 --> 00:10:38,939
No particular order here, but I, in order to draw a matrix, I have to write them down in

149
00:10:38,939 --> 00:10:40,019
some order.

150
00:10:40,019 --> 00:10:44,379
And likewise, the first row is going to be f of this element a.

151
00:10:44,379 --> 00:10:46,019
Well, what is an f of a?

152
00:10:46,019 --> 00:10:48,100
f of a is going to be a set of elements.

153
00:10:48,100 --> 00:10:53,899
So let's just write the elements in f of a down under the corresponding column label.

154
00:10:53,899 --> 00:10:59,740
So here's an example where f of a, it has an a in it, and no b, but it has an s in it,

155
00:10:59,740 --> 00:11:03,700
and a t in it, no c, no d, it has an e.

156
00:11:03,700 --> 00:11:07,779
Likewise, f of b has an a in a b, and no s or t, but it's got a c.

157
00:11:07,779 --> 00:11:13,299
And so I filled in this matrix by taking f of an element in a, which is supposed to

158
00:11:13,299 --> 00:11:22,899
be a subset of a, and writing out all of the elements in that subset under the corresponding

159
00:11:22,899 --> 00:11:28,059
letter, or a, a, a, a, a, a, a, a, corresponding element of the subset.

160
00:11:28,059 --> 00:11:33,339
So b goes under b, if it's in f of c, and s goes under an s, if it's in f of c, nothing

161
00:11:33,339 --> 00:11:36,459
goes under a t, if t is not in f of c.

162
00:11:36,459 --> 00:11:37,459
That's what we're seeing here.

163
00:11:37,459 --> 00:11:41,779
So I'm laying out, as though I was using zeros and ones for an infinite binary sequence,

164
00:11:41,779 --> 00:11:48,819
I'm laying out each of the sets that are in the range of f along this row.

165
00:11:48,819 --> 00:11:54,860
And now with this setup, I can define a new set, which is not going to be an f.

166
00:11:54,860 --> 00:11:55,860
How do I get that?

167
00:11:55,860 --> 00:12:02,339
Well, what I'm going to do is not in my new set, I'm not going to have any of the elements

168
00:12:02,339 --> 00:12:03,980
that appear on the diagonal.

169
00:12:03,980 --> 00:12:09,259
So if a is a member of f of a, that means that a appears in this coordinate, it's not

170
00:12:09,259 --> 00:12:10,899
going to be in my set.

171
00:12:10,899 --> 00:12:16,860
If b is in f of b, meaning that b appears in, that b appears in the f of b row under the

172
00:12:16,860 --> 00:12:20,100
column b, it's not going to be in my set.

173
00:12:20,100 --> 00:12:25,500
On the other hand, s is not in f of s, because there's no s there.

174
00:12:25,500 --> 00:12:28,659
So I'm going to put an s there in magenta.

175
00:12:28,659 --> 00:12:34,220
And likewise, I'm going to stick elements in or out the opposite of whether they appear

176
00:12:34,220 --> 00:12:35,539
on the diagonal.

177
00:12:35,539 --> 00:12:43,299
And this is going to give me a set d, which is going to be my diagonal set.

178
00:12:43,299 --> 00:12:49,219
So if we write this out, what we're saying is suppose that I have a function f from a

179
00:12:49,219 --> 00:12:56,379
to the power set of a, then what I'm going to do is define a subset of a that's not in

180
00:12:56,379 --> 00:13:05,500
the range of f, namely set d, which is the set of those elements in a such that little

181
00:13:05,500 --> 00:13:08,419
a is not in f of a.

182
00:13:08,419 --> 00:13:17,940
Namely, if an element appeared on the diagonal, because an element with column label a was

183
00:13:17,940 --> 00:13:23,019
in the row f of a, then I left it out of my set.

184
00:13:23,019 --> 00:13:29,100
And if it was not in that location in the matrix, I put it in my set.

185
00:13:29,100 --> 00:13:33,740
So I'm keeping all the elements that aren't in on the diagonal.

186
00:13:33,740 --> 00:13:35,659
That's my diagonal set d.

187
00:13:35,659 --> 00:13:40,860
And what I know about it is that d is not in the range of f, because it differs from every

188
00:13:40,860 --> 00:13:44,700
possible row of the matrix.

189
00:13:44,700 --> 00:13:53,659
If the row is labeled with f of a, as f of a, then it differs in the column a f of a from

190
00:13:53,659 --> 00:13:55,060
that row.

191
00:13:55,060 --> 00:14:01,220
And therefore, my set d is not a row of this matrix.

192
00:14:01,220 --> 00:14:04,899
And that means that it's not equal to f of anything.

193
00:14:04,899 --> 00:14:08,700
So I've just found that there's no f arrow into d.

194
00:14:08,700 --> 00:14:10,379
These not in the range of f.

195
00:14:10,379 --> 00:14:16,139
That means that if I had such an f from a to the power set of a, it's not a projection

196
00:14:16,139 --> 00:14:18,180
because d is always left out.

197
00:14:18,180 --> 00:14:19,899
So f is not a projection.

198
00:14:19,899 --> 00:14:26,139
And since f is any function from a to the power set of a, none of them are projections.

199
00:14:26,139 --> 00:14:29,580
That means there's no projection from a to the power set of a.

200
00:14:29,580 --> 00:14:32,820
In other words, a strict power set of a.

201
00:14:32,820 --> 00:14:35,259
There's no projection.

202
00:14:35,259 --> 00:14:43,139
Now a special case of this, of course, is that the non-negative integers are a strictly

203
00:14:43,139 --> 00:14:44,900
smaller than the power set of a.

204
00:14:44,900 --> 00:14:51,980
That's an instance of can't just theorem, we're applying a being the set of non-negative

205
00:14:51,980 --> 00:14:52,980
integers.

206
00:14:52,980 --> 00:14:56,820
So there's no projection from the non-negative integers to the subsets of non-negative

207
00:14:56,820 --> 00:14:57,820
integers.

208
00:14:57,820 --> 00:15:03,820
Again, that means that the power set of n is an example of an uncountable set because

209
00:15:03,820 --> 00:15:08,420
the definition of countable is that there wouldn't be a projection from n to power set of

210
00:15:08,420 --> 00:15:09,420
n.

211
00:15:09,420 --> 00:15:10,420
We're saying there isn't any.

212
00:15:10,420 --> 00:15:14,580
So it's not countable or not countable as usually phrased as uncountable.

213
00:15:14,580 --> 00:15:20,860
So the power set of n is maybe our second example of an uncountable set, the first one being

214
00:15:20,860 --> 00:15:24,020
the infinite sequences of binary numbers.

215
00:15:24,019 --> 00:15:31,139
As a matter of fact, just as we had a general way to prove countability, you can show that

216
00:15:31,139 --> 00:15:36,019
a set is countable if there's a surjection from a set you know is countable onto the target

217
00:15:36,019 --> 00:15:37,699
than the target's countable.

218
00:15:37,699 --> 00:15:43,500
Take the contrapositive of that lemma and you can say that if a set a is uncountable

219
00:15:43,500 --> 00:15:48,899
and there's a surjection from c to a, then c has to be uncountable.

220
00:15:48,899 --> 00:15:51,019
That's just the contrapositive of the previous one.

221
00:15:51,019 --> 00:15:52,939
If c was countable, then a would be countable.

222
00:15:52,939 --> 00:15:55,980
So if a is uncountable, c must be uncountable.

223
00:15:55,980 --> 00:16:00,019
So this gives us again a nice general way to prove uncountability of sets once I have

224
00:16:00,019 --> 00:16:02,620
a couple in my repertoire.

225
00:16:02,620 --> 00:16:07,939
Well, it means that we could have deduced that a zero one to the omega that the infinite

226
00:16:07,939 --> 00:16:13,500
binary sequences were uncountable because we know that there's a bijection between the

227
00:16:13,500 --> 00:16:15,860
infinite binary sequences and the power set of n.

228
00:16:15,860 --> 00:16:20,299
We describe that bijection without knowing anything about any other properties of the

229
00:16:20,299 --> 00:16:24,179
infinite binary sequences in the power set of n, whether they were countable or not.

230
00:16:24,179 --> 00:16:28,459
But now that canter's theorem tells us that the power set of n is uncountable and there's

231
00:16:28,459 --> 00:16:33,899
a bijection, the previous lemma says in particular there's a surjection from zero one to the

232
00:16:33,899 --> 00:16:38,979
omega to the power set of n, which means zero one to the omega is uncountable.

233
00:16:38,979 --> 00:16:44,819
So what I'm illustrating then is that the proof that we use directly on by a diagonal

234
00:16:44,820 --> 00:16:50,300
argument to figure out that zero one to the omega was uncountable.

235
00:16:50,300 --> 00:16:55,540
It's really a special case of the more general diagonal argument that we use to prove canter's

236
00:16:55,540 --> 00:16:56,540
theorem.

237
00:16:56,540 --> 00:17:00,900
And we get that zero one to the omega is uncountable as a consequence of canter's theorem

238
00:17:00,900 --> 00:17:03,780
about the power set of n.

239
00:17:03,780 --> 00:17:09,539
And so we've got two different ways then to prove that the infinite binary sequences are

240
00:17:09,539 --> 00:17:12,380
uncountable.

241
00:17:12,380 --> 00:17:15,380
Another example of uncountable set is the real numbers.

242
00:17:15,380 --> 00:17:19,460
And Nerocute example, remember we saw that the rational numbers were countable.

243
00:17:19,460 --> 00:17:20,620
The real numbers are uncountable.

244
00:17:20,620 --> 00:17:21,940
Well, how do I prove that?

245
00:17:21,940 --> 00:17:26,020
I'm just going to show you a surjection from the real numbers onto the infinite binary

246
00:17:26,020 --> 00:17:27,020
sequences.

247
00:17:27,020 --> 00:17:28,540
How am I going to do that?

248
00:17:28,540 --> 00:17:32,180
Well, it's kind of stupid trick, but it works.

249
00:17:32,180 --> 00:17:34,900
I'm using both positive and negative reals.

250
00:17:34,900 --> 00:17:39,220
So let's look at some real number and look at its binary representation.

251
00:17:39,220 --> 00:17:44,100
Assume for the moment that it's positive.

252
00:17:44,100 --> 00:17:48,579
So let's look at, say, the binary representation of some number like three and a third.

253
00:17:48,579 --> 00:17:53,420
So that means that if we're thinking of these as binary places, this is the zeroth place,

254
00:17:53,420 --> 00:17:57,299
the twoth place, the fourth place, this is the half place, the quarters place, the eighths

255
00:17:57,299 --> 00:18:03,140
place, then the binary representation of three and a third would be three.

256
00:18:03,140 --> 00:18:11,420
And then this infinite repeating not decimal, but by the, but bicepal, or binary expansion,

257
00:18:11,420 --> 00:18:13,020
zero one, zero one, zero one.

258
00:18:13,020 --> 00:18:17,460
And we will examine how I know that that's a third, but take it for granted that that's

259
00:18:17,460 --> 00:18:19,220
what you get is the repeated fraction.

260
00:18:19,220 --> 00:18:24,100
You could figure that out by just doing a division of one by three in binary.

261
00:18:24,100 --> 00:18:30,900
Anyway, there is just as there's a decimal expansion of every real number, there's a

262
00:18:30,900 --> 00:18:33,300
binary expansion just using base two.

263
00:18:33,300 --> 00:18:35,940
So here's the binary expansion of three and a third.

264
00:18:35,940 --> 00:18:39,580
So what I'm going to do is I'm going to map three and a third to this binary sequence.

265
00:18:39,580 --> 00:18:41,740
I'm going to ignore the decimal place of binary.

266
00:18:41,740 --> 00:18:42,740
It's not a decimal place.

267
00:18:42,740 --> 00:18:46,100
It's a decimal place or binary position.

268
00:18:46,100 --> 00:18:50,380
And I'm just going to take this to the mapping, the sequence one, one, zero one, zero one,

269
00:18:50,380 --> 00:18:51,380
zero one.

270
00:18:51,380 --> 00:18:53,580
Okay.

271
00:18:53,580 --> 00:18:59,340
And I claim that this is a suggestion because you're going to hit every possible binary

272
00:18:59,340 --> 00:19:00,820
sequence in this way.

273
00:19:00,819 --> 00:19:02,659
Well, almost.

274
00:19:02,659 --> 00:19:07,339
Let's take a closer look.

275
00:19:07,339 --> 00:19:15,659
There's a problem with mapping to things that start with zero because let's examine that

276
00:19:15,659 --> 00:19:18,899
a half is 0.10000.

277
00:19:18,899 --> 00:19:24,139
So I would map it to that.

278
00:19:24,139 --> 00:19:30,339
But there's an ambiguity because a half is also equal to 0.01111111.

279
00:19:30,339 --> 00:19:38,779
And as 0.999 is equal to 1.0000 in decimal, you get the same infinite carry issue here

280
00:19:38,779 --> 00:19:39,939
in binary.

281
00:19:39,939 --> 00:19:47,579
So numbers that end in all ones have another way to represent the very same number by a

282
00:19:47,579 --> 00:19:49,939
sequence that ends in all zeros.

283
00:19:49,939 --> 00:19:54,220
So how am I going to hit if I'm using a behalf to hit this one, what's left to hit that

284
00:19:54,220 --> 00:19:55,220
one?

285
00:19:55,220 --> 00:19:56,579
Oh, how about using minus a half?

286
00:19:56,579 --> 00:19:58,659
It's there and that's part of R.

287
00:19:58,660 --> 00:20:04,340
So I'm just going to map the negative numbers to the version of the expansion that starts

288
00:20:04,340 --> 00:20:07,180
with zero and has an infinite number of ones.

289
00:20:07,180 --> 00:20:11,340
And the positive one that ends with an infinite number of zeros.

290
00:20:11,340 --> 00:20:15,140
And otherwise, I'm going to map plus and minus numbers to the same place.

291
00:20:15,140 --> 00:20:21,220
So this is going to give me the needed surjection from R to the infinite binary sequences.

292
00:20:21,220 --> 00:20:26,180
And by our previous lemma, that implies sure enough that the real numbers are uncountable.

