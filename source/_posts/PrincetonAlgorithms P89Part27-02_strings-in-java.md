---
title: PrincetonAlgorithms P89Part27 02_strings In Java
---

1
00:00:00,000 --> 00:00:08,320
Today we're going to talk about string processing and we're going to start by talking about string

2
00:00:08,320 --> 00:00:09,320
sorting.

3
00:00:09,320 --> 00:00:14,060
We'll take a look at some classic methods, but first we need to talk a little bit about

4
00:00:14,060 --> 00:00:16,839
just what strings are.

5
00:00:16,839 --> 00:00:23,000
And actually that's really dependent on the programming language that you're using.

6
00:00:23,000 --> 00:00:28,800
Different programming languages nowadays really have completely different implementations of

7
00:00:28,800 --> 00:00:30,120
strings.

8
00:00:30,120 --> 00:00:36,240
So to get started we need to take a look at efficient implementations of basic operations

9
00:00:36,240 --> 00:00:37,240
on strings.

10
00:00:37,240 --> 00:00:44,000
We're going to tailor our algorithms to particular Java implementation and they can be made to

11
00:00:44,000 --> 00:00:49,200
work in other situations, but certainly it's starting point you have to be specific.

12
00:00:49,200 --> 00:00:50,200
So what is a string?

13
00:00:50,200 --> 00:00:54,079
A string is just a sequence of characters.

14
00:00:54,079 --> 00:00:58,679
And it's actually a very important fundamental abstraction that's been with us from the

15
00:00:58,679 --> 00:01:02,119
beginning of information processing.

16
00:01:02,119 --> 00:01:09,719
So pretty much everything we communicate is a string email or our program for our strings.

17
00:01:09,719 --> 00:01:16,760
But even another important area of significance that has arisen recently is in computational

18
00:01:16,760 --> 00:01:24,240
biology where our understanding of the way that life works depends on genomic sequences

19
00:01:24,239 --> 00:01:26,839
and it's essentially based on string processing.

20
00:01:26,839 --> 00:01:29,919
We'll see examples of that later on.

21
00:01:29,919 --> 00:01:33,759
This is a quote that talks about that issue.

22
00:01:33,759 --> 00:01:38,759
The digital information that underlies biochemistry, cell biology and development can be represented

23
00:01:38,759 --> 00:01:43,000
by a simple string of G's, A's, T's and C's.

24
00:01:43,000 --> 00:01:47,599
This string is the root data structure of an organism's biology.

25
00:01:47,599 --> 00:01:52,840
So we're not talking just about data structures for information processing, but for life at

26
00:01:52,840 --> 00:01:56,040
models of life itself.

27
00:01:56,040 --> 00:02:04,079
Now back to computers, the strings are made up of characters, what's a character?

28
00:02:04,079 --> 00:02:10,599
Well the kind of classical representation of what a character is is so-called seven-bit

29
00:02:10,599 --> 00:02:21,000
ASCII code where you have actually the underlying data type is 8 bits so you can have up to 256

30
00:02:21,000 --> 00:02:22,520
characters.

31
00:02:22,520 --> 00:02:29,600
But for many, many years, programmers used only 128 of those characters that would include

32
00:02:29,600 --> 00:02:35,000
all the uppercase and lowercase letters and numbers and some punctuation.

33
00:02:35,000 --> 00:02:40,480
So that's a seven-bit ASCII that's the standard for the C programming language that's a very

34
00:02:40,480 --> 00:02:43,080
widely used language.

35
00:02:43,080 --> 00:02:51,640
Nowadays people use what's called unicode where a character is a 16-bit integer.

36
00:02:51,639 --> 00:03:02,199
And that's to allow for many, many more characters to the 16th, 65,536 instead of only 256.

37
00:03:02,199 --> 00:03:08,759
And that allows for encoding characters from many different of the world languages and

38
00:03:08,759 --> 00:03:10,879
mathematical characters.

39
00:03:10,879 --> 00:03:19,239
So it's a much more general and generous representation of what is a character, but it's important

40
00:03:19,239 --> 00:03:21,519
to be specific.

41
00:03:21,520 --> 00:03:27,760
So in Java, the standard is that it cares a 16-bit unsigned integer.

42
00:03:27,760 --> 00:03:35,840
Now not all programming systems and applications have moved up to the unicode standard, so

43
00:03:35,840 --> 00:03:42,920
sometimes you'll find programs looking for unicode encoding and not finding it in this t-shirt

44
00:03:42,920 --> 00:03:45,800
as a joke that has something to do with that.

45
00:03:46,080 --> 00:03:51,400
It's supposed to be a heart, which is a valid unicode character in some worlds, but not

46
00:03:51,400 --> 00:03:54,080
a met t-shirt.

47
00:03:54,080 --> 00:03:56,439
So we'll come back to what is a character.

48
00:03:56,439 --> 00:04:01,960
We're going to use a simpler version in between those two characters in the e-bit integer.

49
00:04:01,960 --> 00:04:04,600
Now let's talk about what a string is in Java.

50
00:04:04,600 --> 00:04:07,040
There's a built-in string data type.

51
00:04:07,040 --> 00:04:11,840
It's not quite built-in, but many of the features for processing string are built into the

52
00:04:11,840 --> 00:04:12,840
Java language.

53
00:04:13,080 --> 00:04:17,199
So it's okay to think of it as being built-in.

54
00:04:17,199 --> 00:04:21,600
So in Java, a string is a sequence of characters and it's immutable.

55
00:04:21,600 --> 00:04:25,480
Once you create a string, you can't change it.

56
00:04:25,480 --> 00:04:33,600
And the primary operations that you can perform efficiently with a string are two, number

57
00:04:33,600 --> 00:04:35,800
one, find its length.

58
00:04:35,800 --> 00:04:40,920
So you can get the length with string, and that's just the number of characters in it.

59
00:04:40,920 --> 00:04:44,360
You can index into a string and get the I-th character.

60
00:04:44,360 --> 00:04:47,040
That's the care at method.

61
00:04:47,040 --> 00:04:54,080
And you can extract a substring of a string to create a new string that's a continuous

62
00:04:54,080 --> 00:04:57,480
subsequence of the characters in the string.

63
00:04:57,480 --> 00:05:03,759
One of the big features of Java's implementation is that you can get that operation done in

64
00:05:03,759 --> 00:05:05,759
constant time.

65
00:05:05,759 --> 00:05:08,040
And then you can also do what's called concatenation.

66
00:05:08,040 --> 00:05:12,720
And that's had a character to the end of another string.

67
00:05:12,720 --> 00:05:17,480
That one can't be done in constant time in the standard Java string data type.

68
00:05:17,480 --> 00:05:23,520
So this is what the implementation looks like for the string data type in Java.

69
00:05:23,520 --> 00:05:28,400
The private instance variables are an array of characters.

70
00:05:28,400 --> 00:05:34,360
An offset that's an index into the first character of the string in the array.

71
00:05:34,360 --> 00:05:41,360
It's a string that's been linked and also to make it more efficient to search using string

72
00:05:41,360 --> 00:05:47,879
keys, Java keeps a private variable which is the hash code for that string.

73
00:05:47,879 --> 00:05:53,800
So once the string is built and the hash code computed, then when it's time to use the

74
00:05:53,800 --> 00:05:58,560
hash code and the hashing algorithm, it's immediately available.

75
00:05:58,560 --> 00:06:03,199
So the length method simply returns that length.

76
00:06:03,199 --> 00:06:10,480
To get the Ith character of the string, we add I to the offset and get that character.

77
00:06:10,480 --> 00:06:19,480
And to create a string, given the offset length in a carer array, we just reset those values.

78
00:06:19,480 --> 00:06:23,639
And then the keeping is the substring method.

79
00:06:23,639 --> 00:06:29,680
Once all it involves is a pointer into the immutable string.

80
00:06:29,680 --> 00:06:36,479
And the length, the index of the first character, we can build a string in constant time just

81
00:06:36,479 --> 00:06:40,759
by copying the reference to the character array.

82
00:06:40,759 --> 00:06:48,919
So that implementation, we give a good feeling of why substring method is constant in string.

83
00:06:48,919 --> 00:06:51,759
So this is the performance.

84
00:06:51,759 --> 00:06:57,039
The sequence of character is immutable and the underlying implementation is immutable

85
00:06:57,039 --> 00:07:02,000
instance variables that give the array offset and length.

86
00:07:02,000 --> 00:07:06,759
And so it means that we can get length out in constant time, carer add in constant time

87
00:07:06,759 --> 00:07:12,920
just by adding in the offset and indexing, substring in constant time just by essentially copying

88
00:07:12,920 --> 00:07:14,920
those instance variables.

89
00:07:14,920 --> 00:07:20,560
But to concatenate, to make a new string that results from adding one character to a string,

90
00:07:20,560 --> 00:07:26,639
we have to create a whole new string and make a copy of it because the string itself is immutable.

91
00:07:26,639 --> 00:07:31,040
So it takes time proportional to the number of characters in the string and it involves

92
00:07:31,040 --> 00:07:34,160
making a new string.

93
00:07:34,160 --> 00:07:38,639
You can imagine string implementations and they exist in various programming languages

94
00:07:38,639 --> 00:07:41,840
where these performance guarantees are different.

95
00:07:41,840 --> 00:07:46,600
And actually Java has different implementations for applications where you might want different

96
00:07:46,600 --> 00:07:50,279
performance guarantees.

97
00:07:51,279 --> 00:07:58,000
And if you work out the memory usage for a string of length n, it's 40 plus 2n bytes.

98
00:07:58,000 --> 00:08:04,519
You might consider using a carer array but then you lose a lot of convenience of being able to

99
00:08:04,519 --> 00:08:08,879
produce substring instantly.

100
00:08:08,879 --> 00:08:12,399
And also the language features that support strings.

101
00:08:12,399 --> 00:08:20,039
So here's an implementation of a different implementation of sequence of characters

102
00:08:20,040 --> 00:08:22,000
in Java that is mutable.

103
00:08:22,000 --> 00:08:28,720
So the idea is that you can use this data type when you're building up a string a piece at

104
00:08:28,720 --> 00:08:33,279
a time like maybe reading characters off standard input or something.

105
00:08:33,279 --> 00:08:39,159
The underlying implementation in this case is a resizing array of characters.

106
00:08:39,159 --> 00:08:45,399
So when it fills up at doubles, as we've done many times before, and it keeps the length

107
00:08:45,399 --> 00:08:47,200
as an instance variable.

108
00:08:47,200 --> 00:08:49,960
So with string builder, you can get the length and constant time.

109
00:08:49,960 --> 00:08:53,879
You can get characters in constant time just by doubling.

110
00:08:53,879 --> 00:08:58,200
And you can concatenate, add a new character in Amortized Constant Time.

111
00:08:58,200 --> 00:09:00,120
Most of the time it's constant.

112
00:09:00,120 --> 00:09:04,520
Every once in a while you might have to double but you pay for that double by the number

113
00:09:04,520 --> 00:09:08,560
of operations that you did.

114
00:09:08,560 --> 00:09:15,640
The thing you lose though is that it takes a linear time to extract a substring because

115
00:09:15,639 --> 00:09:21,919
to extract a substring you have to make a new carer array that can be resizing and so

116
00:09:21,919 --> 00:09:25,080
forth and can be amenable to two concateness.

117
00:09:25,080 --> 00:09:30,159
So that's two different implementations of sequence of characters in Java.

118
00:09:30,159 --> 00:09:36,039
Do with these two different importantly different performance characteristics.

119
00:09:36,039 --> 00:09:40,319
So we have to be mindful of that in applications.

120
00:09:40,320 --> 00:09:44,920
And again, another programming language is something like the string builder is more

121
00:09:44,920 --> 00:09:50,440
like the standard and just have to know what the implementation is.

122
00:09:50,440 --> 00:09:57,640
There's another one called string buffer as well in Java that we'll skip for now.

123
00:09:57,640 --> 00:10:05,040
So here's a typical example that you might have a simple computation like how do we efficiently

124
00:10:05,040 --> 00:10:07,240
reverse a string.

125
00:10:07,240 --> 00:10:13,600
So I could use a string or you could use a string builder.

126
00:10:13,600 --> 00:10:25,759
With string you get to declare it almost like a built-in type and simply initialize with

127
00:10:25,759 --> 00:10:33,639
an all string and then to compute the reverse string we go backwards through the original

128
00:10:33,639 --> 00:10:45,759
string and concatenate the characters starting at the back to create our reverse string.

129
00:10:45,759 --> 00:10:52,000
Or with string builder you use the string builder data type and so create an object and that

130
00:10:52,000 --> 00:10:53,840
uses the doubling array.

131
00:10:53,840 --> 00:10:56,399
I need the append operation.

132
00:10:56,399 --> 00:11:04,120
So what do you think which one of these is going to be most efficient for a long string?

133
00:11:04,120 --> 00:11:11,799
The answer is that it's string builder because using the built-in string every time you

134
00:11:11,799 --> 00:11:16,039
do a concatenation you have to make a copy of the whole string.

135
00:11:16,039 --> 00:11:21,279
So if the string is of length n that's going to take 1 plus 2 plus 3 all the way up to

136
00:11:21,279 --> 00:11:25,399
n which sums to n squared over 2.

137
00:11:25,399 --> 00:11:31,639
So it takes quadratic time for this algorithm to run for a long string and that's going

138
00:11:31,639 --> 00:11:37,720
to preclude using it for huge strings as we've seen so many times can't be using a quadratic

139
00:11:37,720 --> 00:11:40,959
time algorithm for a lot of data.

140
00:11:40,959 --> 00:11:46,240
On the other hand with string builder it's linear time because the append operations are

141
00:11:46,240 --> 00:11:48,959
amortized linear.

142
00:11:48,959 --> 00:11:52,240
So that's a simple example.

143
00:11:52,240 --> 00:11:57,759
Here's another example of computation that we're going to look at later on.

144
00:11:57,759 --> 00:12:02,360
At the end of the lecture is how do we form an array of suffixes?

145
00:12:02,360 --> 00:12:08,279
So that is we have an input string in the suffixes of the string or the strings that you get

146
00:12:08,279 --> 00:12:10,159
by starting at each position.

147
00:12:10,159 --> 00:12:12,480
So the first suffixes is the whole string.

148
00:12:12,480 --> 00:12:18,960
The next one starts at position 1, next one starts at position 2 and so forth each one

149
00:12:18,960 --> 00:12:20,279
less.

150
00:12:20,279 --> 00:12:26,559
And so we have algorithms that gain efficiency by forming an array of suffixes of a given

151
00:12:26,559 --> 00:12:27,559
string.

152
00:12:27,559 --> 00:12:30,720
And so how do we create that thing in the first place?

153
00:12:30,720 --> 00:12:35,639
Again you can do it with string or you can do it with string builder.

154
00:12:35,639 --> 00:12:37,639
So let's look at it with string.

155
00:12:37,639 --> 00:12:43,439
We get the length that's going to be the length of the array and what we do is for all values

156
00:12:43,439 --> 00:12:47,679
of i we set suffixes of i to the substring of x.

157
00:12:47,679 --> 00:12:54,120
Yes you get by starting at i and going all the way to n and that's our suffix array.

158
00:12:54,120 --> 00:12:57,799
And this is the corresponding code for string builder.

159
00:12:57,799 --> 00:13:02,759
But now in this case the standard method is going to be linear.

160
00:13:02,759 --> 00:13:09,239
Whereas the string builder because there's only one string and the substrings are a few

161
00:13:09,239 --> 00:13:12,039
pointers into that string.

162
00:13:12,039 --> 00:13:18,079
Whereas for string builder we have to make a new string for each suffix and there's

163
00:13:18,079 --> 00:13:23,519
a quadratic number of characters in all of those strings.

164
00:13:23,519 --> 00:13:25,639
So it takes quadratic time.

165
00:13:25,639 --> 00:13:31,120
So you can't use string builder to build a suffix array for a huge string.

166
00:13:31,120 --> 00:13:37,879
So again those are typical examples of string processing where it really matters which string

167
00:13:37,879 --> 00:13:40,079
implementation that you're using.

168
00:13:40,080 --> 00:13:44,400
If you're not using Java these trade-offs are clear.

169
00:13:44,400 --> 00:13:48,800
If you're using some other programming language you better make sure that you know how strings

170
00:13:48,800 --> 00:13:54,160
are implemented before you even get started with string processing.

171
00:13:54,160 --> 00:13:58,720
So here's a simple computation that we'll be using.

172
00:13:58,720 --> 00:14:04,080
Suppose that we have two strings and what we're interested in knowing is the length of the

173
00:14:04,080 --> 00:14:07,200
longest common prefix.

174
00:14:07,200 --> 00:14:16,280
So here's some static method that will implement this function and takes two strings as argument.

175
00:14:16,280 --> 00:14:20,720
We only need to go as far as the length of the shortest of the two strings.

176
00:14:20,720 --> 00:14:22,440
So that's n.

177
00:14:22,440 --> 00:14:31,240
And then we just go ahead and start at the beginning and compare as long as the strings

178
00:14:31,240 --> 00:14:34,360
are equal we increment i.

179
00:14:34,360 --> 00:14:40,399
And if we get to a point where they're non equal that's when we return i and that's

180
00:14:40,399 --> 00:14:42,399
the length of the longest common prefix.

181
00:14:42,399 --> 00:14:45,240
In this case they're not equal at four.

182
00:14:45,240 --> 00:14:47,960
That means they match for four characters.

183
00:14:47,960 --> 00:14:51,560
If we get to the end of one of them then that's a prefix.

184
00:14:51,560 --> 00:14:53,720
So we just return n.

185
00:14:53,720 --> 00:14:59,519
So that's just a little bit of warm up code and the amount of time that takes is proportional

186
00:14:59,519 --> 00:15:04,399
to the length of the longest common prefix.

187
00:15:04,399 --> 00:15:09,840
Although if the prefix is short like if the two strings have a different first character

188
00:15:09,840 --> 00:15:15,559
then the sublinear doesn't have to look at all the data just has to look at them out

189
00:15:15,559 --> 00:15:17,799
that matches.

190
00:15:17,799 --> 00:15:24,159
So the idea of a sublinear time algorithm for string processing is a really important one

191
00:15:24,159 --> 00:15:30,480
that we're going to be taking advantage of as we move into more complicated algorithms.

192
00:15:30,480 --> 00:15:36,439
So for example you can compare two strings without looking at them all.

193
00:15:36,439 --> 00:15:37,439
It depends.

194
00:15:37,439 --> 00:15:41,639
You just have to find the first place that they differ.

195
00:15:41,639 --> 00:15:45,799
So you don't look at all the data that's sublinear time and we're going to see sorting algorithms

196
00:15:45,799 --> 00:15:49,639
that take advantage of that.

197
00:15:49,639 --> 00:15:54,840
Now we're not going to really do it in the code that we show in lecture or even in the

198
00:15:54,840 --> 00:16:01,360
book but it's actually fairly easy to take many of the algorithms that we're going to look

199
00:16:01,360 --> 00:16:06,519
at and make them so that they work for general alphabets.

200
00:16:06,519 --> 00:16:13,360
And for different applications it might be entirely appropriate to customize the code

201
00:16:13,360 --> 00:16:15,559
to a particular alphabet.

202
00:16:15,559 --> 00:16:24,599
So like if the things that are being processed are numbers or positive integers or things

203
00:16:24,599 --> 00:16:30,839
like account numbers maybe only 10 decimal characters can occur.

204
00:16:30,839 --> 00:16:37,079
So we might as well work with strings made from that as well define 10 characters.

205
00:16:37,079 --> 00:16:42,199
In DNA there's only four characters so we might as well know that we're working with four

206
00:16:42,199 --> 00:16:43,359
characters.

207
00:16:43,360 --> 00:16:50,680
And so we'll often talk of the radix which is the number of possible different character

208
00:16:50,680 --> 00:16:54,039
values in the string.

209
00:16:54,039 --> 00:16:59,399
Now we're always going to use what's called extended ASCII where just to fix ideas where

210
00:16:59,399 --> 00:17:07,880
the radix is 256 and the number of bits therefore to represent a character is the log base

211
00:17:07,880 --> 00:17:11,519
two of that so 8 bits 256.

212
00:17:11,519 --> 00:17:21,240
And when we talk about performance of algorithms we'll use R and log R just to make sure that

213
00:17:21,240 --> 00:17:27,960
it's clear that if we're working with a smaller alphabet or a larger alphabet we can still

214
00:17:27,960 --> 00:17:33,039
use the algorithms but the performance is going to depend on the radix.

215
00:17:33,039 --> 00:17:35,400
So that's an introduction to string processing.

