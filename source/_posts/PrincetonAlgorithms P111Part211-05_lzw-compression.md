---
title: PrincetonAlgorithms P111Part211 05_lzw Compression
---

1
00:00:00,000 --> 00:00:07,480
So Huffman Coding is an optimal prefix-free code.

2
00:00:07,480 --> 00:00:10,880
Can we have a better data compression algorithm?

3
00:00:10,880 --> 00:00:13,400
As you might suspect, the answer is yes.

4
00:00:13,400 --> 00:00:19,679
And that's what we're going to look at next is the LZW algorithm named after Abraham Lumpel

5
00:00:19,679 --> 00:00:26,879
and Jacob Ziv and W's for third individual wealth to get involved.

6
00:00:26,879 --> 00:00:33,879
And so the way that we improve on Huffman Coding is by changing the rules under which it operates.

7
00:00:33,879 --> 00:00:38,560
And we've already changed the rules once, so let's just take a high level view.

8
00:00:38,560 --> 00:00:45,519
So one idea for codes is that we're going to, for all text that we're ever encounter,

9
00:00:45,519 --> 00:00:51,679
we're going to use the same code or the same model of the text.

10
00:00:51,679 --> 00:00:55,599
And so everybody's got that model, we don't have to transmit it.

11
00:00:55,600 --> 00:01:01,000
But the problem is that one text might have a lot of A's and other one might have a lot of Z's.

12
00:01:01,000 --> 00:01:03,600
They have different statistical properties.

13
00:01:03,600 --> 00:01:06,599
So it's not going to be optimal for a given text.

14
00:01:06,599 --> 00:01:12,200
But still over the proponents of text that we see this can be effective.

15
00:01:12,200 --> 00:01:16,799
And so that's really what ASCII is.

16
00:01:16,799 --> 00:01:20,000
But now for Huffman while we consider, we change that rule.

17
00:01:20,000 --> 00:01:26,400
And we said, well, we're going to use different encodings depending on what the text is.

18
00:01:26,400 --> 00:01:29,799
So we're going to look at the text, figure out the frequency,

19
00:01:29,799 --> 00:01:35,400
and then go ahead and create a code that works for that text.

20
00:01:35,400 --> 00:01:37,599
Now we have to transmit the code.

21
00:01:37,599 --> 00:01:41,400
That's what the Huffman code is.

22
00:01:41,400 --> 00:01:46,400
For every text we've got a code that's suited for that text.

23
00:01:46,400 --> 00:01:51,800
What we're going to look at now is another change in the rules where it's called an adaptive model.

24
00:01:51,800 --> 00:01:56,600
Where we're going to just read the text one character at a time.

25
00:01:56,600 --> 00:02:04,400
But we're going to use the text to update the model and learn about the model as we read it.

26
00:02:04,400 --> 00:02:08,800
And we're going to assume the decoder does the same thing.

27
00:02:08,800 --> 00:02:15,200
And this gives, perhaps, it does get more accurate modeling and better compression

28
00:02:15,200 --> 00:02:18,200
throughout the text.

29
00:02:18,200 --> 00:02:19,800
And it's a very effective method.

30
00:02:19,800 --> 00:02:22,200
So let's look at how it works.

31
00:02:22,200 --> 00:02:25,800
We'll just do this through an example.

32
00:02:25,800 --> 00:02:29,800
Now this is how we're going to use Hex values.

33
00:02:29,800 --> 00:02:37,200
So in LCW encoding, we start with our input, which is characters.

34
00:02:37,199 --> 00:02:40,599
Say, ASCII characters.

35
00:02:40,599 --> 00:02:48,399
And what we're going to do is keep a dictionary of code words.

36
00:02:48,399 --> 00:02:51,000
And the code words are going to be fixed length.

37
00:02:51,000 --> 00:02:57,399
And so we'll use eight bits or two Hex characters as output.

38
00:02:57,399 --> 00:03:05,599
And we'll start out with just the ASCII value for all the characters that we're going to use in the message.

39
00:03:05,599 --> 00:03:08,199
So that's the starting point.

40
00:03:08,199 --> 00:03:15,199
So at the beginning, this is where we're going to do compression for this string here.

41
00:03:15,199 --> 00:03:25,199
At the beginning, we just pick off characters and output their value from the table.

42
00:03:25,199 --> 00:03:31,400
But every character that we read, it gives us a little new information.

43
00:03:31,400 --> 00:03:35,000
For example, in this case, we've seen AB.

44
00:03:35,000 --> 00:03:37,599
And what we're going to do is say, OK, we've seen AB.

45
00:03:37,599 --> 00:03:41,000
Maybe it occurs again in the text.

46
00:03:41,000 --> 00:03:47,000
If it does, since we've seen it, we know where it is.

47
00:03:47,000 --> 00:03:49,000
We know what it is.

48
00:03:49,000 --> 00:03:52,300
We'll just give it the value 81.

49
00:03:52,300 --> 00:03:54,400
And we'll maintain this table.

50
00:03:54,400 --> 00:03:59,099
If we see AB again, we'll use those eight bits.

51
00:03:59,099 --> 00:04:05,099
So we put out the B, but we remember the fact that we saw AB.

52
00:04:05,099 --> 00:04:13,299
And similarly, when we see BR, then that'll be an 8-bit code word that we can put out.

53
00:04:13,299 --> 00:04:21,100
And the idea is that the decoder or the expander can do the same thing.

54
00:04:21,100 --> 00:04:24,600
We don't actually have to transmit this table.

55
00:04:24,600 --> 00:04:28,100
We can know that the expander is going to do the same thing

56
00:04:28,100 --> 00:04:31,500
and we'll have the same table.

57
00:04:31,500 --> 00:04:36,500
So now we see the R, since it's BR, and that's going to be encoded with 82.

58
00:04:36,500 --> 00:04:41,600
But the R, the ASCII for R is 52, so we put that out.

59
00:04:41,600 --> 00:04:45,100
Now we see the A. And so that's going to be 83.

60
00:04:45,100 --> 00:04:49,900
If we see it again, but the A is just 41.

61
00:04:49,899 --> 00:04:52,500
And then A, C is going to be 84.

62
00:04:52,500 --> 00:04:55,500
The C is 43.

63
00:04:55,500 --> 00:05:03,199
C, A, yes, they're going to be 85 again, 41.

64
00:05:03,199 --> 00:05:11,599
And so what we're doing is building up a table that is a model for what the string has.

65
00:05:11,599 --> 00:05:18,899
And it'll allow us to get better compression as we get later into the message.

66
00:05:18,899 --> 00:05:27,899
So now we're reading the A after the D and so D is going to be 87.

67
00:05:27,899 --> 00:05:33,299
But now we see that the next letter is B.

68
00:05:33,299 --> 00:05:38,699
And we look in our table for AB and it's there.

69
00:05:38,699 --> 00:05:42,899
So we can put out 81 instead of just putting that AL.

70
00:05:42,899 --> 00:05:47,899
So at this point when we look at the B,

71
00:05:47,899 --> 00:05:53,899
we can know that we had AB and we can look that up on the table and just put out 81.

72
00:05:53,899 --> 00:06:00,899
And similarly, when we, but now when we look at the R,

73
00:06:00,899 --> 00:06:02,699
our previous character was AB.

74
00:06:02,699 --> 00:06:08,699
So now we're going to code ABR with 88.

75
00:06:08,699 --> 00:06:15,899
And again, R A, we looked that up in the table and we can put out 83.

76
00:06:15,899 --> 00:06:20,699
And now we can remember R AB is going to be 89.

77
00:06:20,699 --> 00:06:21,899
So now what happens next?

78
00:06:21,899 --> 00:06:25,500
Now we look at our next characters.

79
00:06:25,500 --> 00:06:30,699
We look for the longest prefix that we can match in the table.

80
00:06:30,699 --> 00:06:34,299
And that's going to be the code word that we put out.

81
00:06:34,299 --> 00:06:38,099
So in this case, we have BR is in there.

82
00:06:38,099 --> 00:06:40,299
That's 82.

83
00:06:40,299 --> 00:06:44,699
Next character is A. So I'm going to put BRA in there.

84
00:06:44,699 --> 00:06:49,699
And now this is the remaining to be encoded.

85
00:06:49,699 --> 00:06:52,899
And we're going to look for the longest prefix that we know the code for.

86
00:06:52,899 --> 00:06:56,300
In this case, it's going to be ABR, which is 88.

87
00:06:56,300 --> 00:07:06,699
So the previous characters in the text built a model that allows to more effectively encode the text.

88
00:07:06,699 --> 00:07:09,300
And that's 88.

89
00:07:09,500 --> 00:07:14,699
ABR and then all that's left is the last A.

90
00:07:14,699 --> 00:07:23,500
So for this small example, the compression is not great, but the idea is still.

91
00:07:23,500 --> 00:07:30,699
There's definitely some savings in there because these code words, the input was 8 bit,

92
00:07:30,699 --> 00:07:34,300
ASCII code words and these code words are also 8 bits.

93
00:07:34,300 --> 00:07:45,699
And the key thing is we don't have to transmit the table because we can assume that the expander is going to rebuild the table the same way that we built it.

94
00:07:45,699 --> 00:07:50,300
So that's the basic idea behind LZW compression.

95
00:07:50,300 --> 00:07:54,900
We also have a stop character at the end that says it's the end of the message.

96
00:07:54,900 --> 00:07:59,100
So this is the summary of LZW compression.

97
00:07:59,100 --> 00:08:06,100
So we create a symbol table that associates fixed-length code words with string key.

98
00:08:06,100 --> 00:08:10,500
We initialize it with code words for single character keys.

99
00:08:10,500 --> 00:08:18,300
Now, when it's time to encode part of the input, we look for the longest string in the symbol table.

100
00:08:18,300 --> 00:08:22,900
That's a prefix of the part of the input we haven't seen.

101
00:08:22,900 --> 00:08:26,900
And that string, that's the longest one, that's the best we can do.

102
00:08:26,899 --> 00:08:31,299
We're going to have a fixed-length code word for that string.

103
00:08:31,299 --> 00:08:40,699
And then we look ahead to the next character in the input and add a new entry to the symbol table with that one extra character.

104
00:08:40,699 --> 00:08:44,399
That's LZW compression.

105
00:08:44,399 --> 00:08:51,899
So one question that comes up is how do we represent that code table in code?

106
00:08:51,899 --> 00:08:55,299
And actually, the answer is really simple.

107
00:08:55,299 --> 00:08:57,500
We're going to use a try.

108
00:08:57,500 --> 00:09:15,299
Because what a try can do for us is if you remember when we looked at tries, or if you don't, when we looked at tries, what we did was support longest prefix match operation.

109
00:09:15,299 --> 00:09:23,500
So this try represents all the prefixes that we've seen so far in the message.

110
00:09:23,500 --> 00:09:33,500
And it's very easy if the next four characters in the texture, A, B, R, A, then we have the code word for it.

111
00:09:33,500 --> 00:09:40,500
For anything that we've seen in the text, we've got a code word for fixed-length code words.

112
00:09:40,500 --> 00:09:54,500
And as the try gets bigger, and as we move down more into the try, we get better compression because we're using the same length code word to compress more letters.

113
00:09:54,500 --> 00:09:59,899
So here's the implementation of LZW compression.

114
00:09:59,899 --> 00:10:08,100
Again, very simple implementation for such a sophisticated algorithm reading.

115
00:10:08,100 --> 00:10:18,500
We're actually going to use a TST so that we're not to worry about the extra space.

116
00:10:18,500 --> 00:10:30,500
And so first thing we do is initialize the TST with a code word for each of the single characters.

117
00:10:30,500 --> 00:10:33,899
So we use radix R to this R different letters.

118
00:10:33,899 --> 00:10:44,899
And we'll just put an entry into the try for each one of the letters along with this coding.

119
00:10:44,899 --> 00:10:57,299
And so we didn't show, we didn't show it a few letters in the example, but in general, we'll assign the code word I to each one of the, to the I letter.

120
00:10:57,299 --> 00:11:03,899
And then the rest of the try is built from the input string.

121
00:11:03,899 --> 00:11:15,299
And so very first thing we do is find the longest prefix of the input string in the symbol table.

122
00:11:15,299 --> 00:11:27,199
And that longest prefix of method just marches down the try, eating off the characters in the input string one character at time until it gets to the bottom.

123
00:11:27,200 --> 00:11:30,600
It has a code word.

124
00:11:30,600 --> 00:11:40,100
So it actually, the symbol table method actually gives us back the string.

125
00:11:40,100 --> 00:11:51,800
And so then we can use that to get the value associated with that string out in a symbol clause in a second call.

126
00:11:51,799 --> 00:11:55,000
And that gives us the code word.

127
00:11:55,000 --> 00:12:21,699
And then what we want to do is get the length of that longest prefix match and add one more character to it and add, which is the next character in the input and add that code word to the symbol table and then scan past that in the input.

128
00:12:21,700 --> 00:12:32,300
So that's the entire compression algorithm for LZW compression using a try.

129
00:12:32,300 --> 00:12:41,100
And so what it's doing is writing out fixed length code words and chewing up the longest substring that we've seen before.

130
00:12:41,100 --> 00:12:47,600
And then at the end, it writes out a stop code word and closes out the input string.

131
00:12:47,600 --> 00:12:57,000
So using the tech try technology that we've developed, we have a compact implementation of LZW compression.

132
00:12:57,000 --> 00:13:11,200
Now let's look at expansion and expansion is going to be basically the same code all that the expansion algorithm gets is the list of fixed length code words.

133
00:13:11,200 --> 00:13:18,000
And it's going to maintain its own code word table in order to get the expansion done.

134
00:13:18,000 --> 00:13:34,600
Now we can start out again by generating the table for each of the single letters that are going to be in the in the message or if there's only a few, maybe there's some other sliding coding that needs to be done at the beginning.

135
00:13:34,600 --> 00:13:42,000
But so it sees 41 and now the rules are switched.

136
00:13:42,000 --> 00:13:45,700
The fixed length code words of the key and the values are strings.

137
00:13:45,700 --> 00:13:49,399
So we just look up the key and write out the value.

138
00:13:49,399 --> 00:14:01,399
So we see a 42 that's a B we see a 41 it's an A. But not only do we want to put put out the.

139
00:14:01,399 --> 00:14:11,000
The character corresponding to the code word but we also want to build up code word in the same way that the compression method would have done it.

140
00:14:11,000 --> 00:14:18,299
So the compression method I want to see is an A B would have associated the string A B with a new key.

141
00:14:18,299 --> 00:14:31,000
And now we read a 52 look up 52 that's an R but we also put a new entry in the table for the string B are same way the compression algorithm would have done.

142
00:14:31,000 --> 00:14:47,600
We see 41 we get an A and we put R A in the table 43 we put a C and we put a C in the table 41 we put an A we put C A in the table.

143
00:14:47,600 --> 00:14:59,000
Now 81 we look up on our table and it's sorry the D is 44 but AD in the table and now 81 we look it up and we have A B.

144
00:14:59,000 --> 00:15:09,000
And once we have seen the A B then we know the compression would have put DA in the table.

145
00:15:09,000 --> 00:15:17,200
And it's a little bit tricky because the expansion is kind of one step behind the compression that's got to put out the characters before it knows it.

146
00:15:17,200 --> 00:15:21,399
And that does lead to a slightly tricky situation that we'll talk about.

147
00:15:21,399 --> 00:15:33,399
So now 83 is going to be R A and once we put out the R A and we know that compression would have done A B R.

148
00:15:33,399 --> 00:15:43,799
So now 82 is B R and again we know compression would have put R A B in there.

149
00:15:43,799 --> 00:15:49,799
And 88 is A B R and compression would have put B R A in there.

150
00:15:49,799 --> 00:15:54,799
41 is A and then 80 to stop character.

151
00:15:54,799 --> 00:16:02,199
Oh and we would have put when it once it did the A then it would have put A B R A in there and then 80 to stop character.

152
00:16:02,200 --> 00:16:05,400
So that's a expansion.

153
00:16:05,400 --> 00:16:17,000
Just building the table in the same way that compression would have and then using the table to figure out the string associated with each fixed length code word.

154
00:16:17,000 --> 00:16:25,000
So this is a summary of expansion which is pretty much the same as for compression except reverse.

155
00:16:25,000 --> 00:16:33,000
So we're going to create a symbol table that has fixed length keys and associate string values with them.

156
00:16:33,000 --> 00:16:36,200
We put in the single character values.

157
00:16:36,200 --> 00:16:45,799
We read a key, we find the string value and write it out and then we update the symbol table from the last two things.

158
00:16:45,799 --> 00:16:51,600
The first character, the thing we just wrote out and the thing we wrote out before that.

159
00:16:51,600 --> 00:17:02,000
And again, now to represent the code table this time, we can just use an array.

160
00:17:02,000 --> 00:17:09,200
And because we are keys or are fixed length and we assign them one bit at a time.

161
00:17:09,200 --> 00:17:20,200
So we just store the strings in an array and use the key values, the key values that fixed big key values.

162
00:17:20,200 --> 00:17:24,000
We get the index into the array and give us the right string.

163
00:17:24,000 --> 00:17:27,600
So that part is easier.

164
00:17:27,600 --> 00:17:39,400
So now there's a tricky case that really everyone needs to work through this case a few times to really understand what's going on.

165
00:17:39,400 --> 00:17:42,400
And then it's worth doing once even in lecture.

166
00:17:42,400 --> 00:17:47,400
So let's look at this case where we have a, b, a, b, a, b, a.

167
00:17:47,400 --> 00:17:52,400
And just follow through the algorithm for this case.

168
00:17:52,400 --> 00:17:56,600
So we get an a and we look it up and it's 41.

169
00:17:56,600 --> 00:18:00,000
And so that's what we're going to put out.

170
00:18:00,000 --> 00:18:03,200
And then we look at the next character and it's a, b.

171
00:18:03,200 --> 00:18:09,000
So we're going to remember 81 in our code word table.

172
00:18:09,000 --> 00:18:13,000
Then we read a b and we look it up and it's 42.

173
00:18:13,000 --> 00:18:15,400
And next character is a.

174
00:18:15,400 --> 00:18:21,400
So we're going to say, b is going to be 82.

175
00:18:21,400 --> 00:18:28,000
And then next character is b and we look up a, b and we have 81.

176
00:18:28,000 --> 00:18:31,799
And so we can put out the 81.

177
00:18:31,799 --> 00:18:35,200
And now the next look ahead, the next character is a.

178
00:18:35,200 --> 00:18:40,200
So we're going to do a code for a, b, a, that's going to be 83.

179
00:18:40,200 --> 00:18:47,799
Now we have the rest of our string to be encoded as a, b, a,

180
00:18:47,799 --> 00:18:51,000
in our longest prefix matches, a, b, a.

181
00:18:51,000 --> 00:18:54,000
So we're going to put out 83.

182
00:18:54,000 --> 00:18:57,000
And that's the end of the string.

183
00:18:57,000 --> 00:19:00,200
So we do the 80, which is the end of the string.

184
00:19:00,200 --> 00:19:04,799
So that's compression for that string working the same way as for

185
00:19:04,799 --> 00:19:06,399
the other example.

186
00:19:06,399 --> 00:19:10,399
Now let's look at expansion for this case.

187
00:19:10,399 --> 00:19:12,799
So start out the same way.

188
00:19:12,799 --> 00:19:17,200
So now we see a 41 and we look it up in our table.

189
00:19:17,200 --> 00:19:19,799
And again, this can be just an index to array.

190
00:19:19,799 --> 00:19:24,799
So it's going to be a.

191
00:19:24,799 --> 00:19:26,000
So that's the starting point.

192
00:19:26,000 --> 00:19:30,200
And now 42 is going to be a b.

193
00:19:30,200 --> 00:19:33,200
And then we look back, we just put out an a and a b.

194
00:19:33,200 --> 00:19:39,200
So our compression algorithm would have encoded a, b as 81.

195
00:19:39,200 --> 00:19:40,799
We know that.

196
00:19:40,799 --> 00:19:45,279
So now we can, when we see 81, we've got a, b.

197
00:19:45,279 --> 00:19:48,759
So we can put out a, b.

198
00:19:48,759 --> 00:19:54,000
And so now we look at the end.

199
00:19:54,000 --> 00:19:57,600
We put out the a, b in the next entry in our table.

200
00:19:57,600 --> 00:20:01,000
It's going to be b, a, because that's what our compression algorithm

201
00:20:01,000 --> 00:20:02,680
would have put out.

202
00:20:02,680 --> 00:20:05,320
But now we've got a problem.

203
00:20:05,320 --> 00:20:12,920
The next character that we see that we need to expand is 83.

204
00:20:12,920 --> 00:20:17,120
But we need to know what key has value 83.

205
00:20:17,120 --> 00:20:20,000
But it's not an assemble thing we get.

206
00:20:20,000 --> 00:20:25,360
So that's definitely a tricky case for the expansion.

207
00:20:25,360 --> 00:20:32,360
Now it is possible to, let me go through that one again.

208
00:20:32,359 --> 00:20:40,240
So at the time that we read the 83, we need to know which key has

209
00:20:40,240 --> 00:20:44,519
value 83 before it gets into the symbol table.

210
00:20:44,519 --> 00:20:46,919
And while its first character is going to be a,

211
00:20:46,919 --> 00:20:48,519
that means a, b, a has to be in there.

212
00:20:48,519 --> 00:20:52,799
So the code in the book, which you can examine, has a way

213
00:20:52,799 --> 00:20:55,039
to test for this case.

214
00:20:55,039 --> 00:20:58,639
And it's definitely a tricky case that needs to be considered

215
00:20:58,639 --> 00:21:02,079
for LZW expansion.

216
00:21:02,079 --> 00:21:08,199
We expand 83 at the same time that we put it in the symbol table.

217
00:21:08,199 --> 00:21:09,079
And this example.

218
00:21:12,119 --> 00:21:19,919
OK, so there are all different kinds of details for LZW.

219
00:21:19,919 --> 00:21:23,119
We've just given one version.

220
00:21:23,119 --> 00:21:29,119
Sometimes people find it effective to clear out the symbol table

221
00:21:29,119 --> 00:21:32,359
after a while.

222
00:21:32,359 --> 00:21:34,239
Maybe how big do we make the symbol table?

223
00:21:34,239 --> 00:21:36,319
How big do we let it get?

224
00:21:36,319 --> 00:21:39,879
Maybe it's not worthwhile to keep older parts of the message.

225
00:21:39,879 --> 00:21:42,359
It should adapt the pieces of the message.

226
00:21:42,359 --> 00:21:47,079
There's many other variations like that that have been developed.

227
00:21:47,079 --> 00:21:52,679
So sort of, for example, what GIF does is, when the symbol table is full,

228
00:21:52,679 --> 00:21:55,679
we just throw it away and start over.

229
00:21:55,680 --> 00:22:01,480
Unix compress keeps a measure of how well it's doing

230
00:22:01,480 --> 00:22:05,120
and throws it away when it's not being effective.

231
00:22:05,120 --> 00:22:08,920
And there's many, many other variations.

232
00:22:08,920 --> 00:22:10,680
Why not put even longer substrings?

233
00:22:10,680 --> 00:22:12,240
Why just one character at a time?

234
00:22:12,240 --> 00:22:13,960
Why not the double ones and so forth?

235
00:22:13,960 --> 00:22:19,640
And there have been many variations like that have been developed.

236
00:22:19,640 --> 00:22:23,799
And actually, in the real world, the development

237
00:22:23,799 --> 00:22:29,200
of this technology was influenced by patent law.

238
00:22:29,200 --> 00:22:33,639
There's a version called LZ77 and another version called LZW

239
00:22:33,639 --> 00:22:37,720
because these guys worked for a company in the summer.

240
00:22:37,720 --> 00:22:39,359
And it was patented.

241
00:22:39,359 --> 00:22:44,559
For a while, you couldn't use LZW unless you paid the patent holder.

242
00:22:44,559 --> 00:22:50,039
But that expired in 2003 and then things started to go up again.

243
00:22:50,039 --> 00:22:55,079
So there's lots and lots of different effective methods

244
00:22:55,079 --> 00:22:57,440
that are variants of LZW.

245
00:22:57,440 --> 00:23:01,839
And really, to do a good job, you might also

246
00:23:01,839 --> 00:23:05,720
need to include Huffman coding for the characters

247
00:23:05,720 --> 00:23:09,399
or run length encoding in really its combinations

248
00:23:09,399 --> 00:23:15,920
of these basic methods that we talk about that are most effective.

249
00:23:15,920 --> 00:23:19,840
So you see this technology all throughout

250
00:23:19,840 --> 00:23:24,240
the computational infrastructure that you use every day.

251
00:23:24,240 --> 00:23:28,759
And at the time that we were talking about tries,

252
00:23:28,759 --> 00:23:29,920
they seemed a bit abstract.

253
00:23:29,920 --> 00:23:34,800
But actually, our tries are definitely

254
00:23:34,800 --> 00:23:38,039
part of the algorithmic infrastructure.

255
00:23:38,039 --> 00:23:40,360
And they're a really fine example

256
00:23:40,360 --> 00:23:44,039
of a clear, clean, elegant data structure

257
00:23:44,039 --> 00:23:47,720
and algorithmic idea being used to great effect

258
00:23:47,720 --> 00:23:49,920
in the real world.

259
00:23:49,920 --> 00:23:54,879
And there's people, plenty of people still doing research,

260
00:23:54,879 --> 00:23:57,159
even on lossless data compression.

261
00:23:57,159 --> 00:24:00,399
There's still ideas being developed.

262
00:24:00,399 --> 00:24:03,480
In these are the kinds, there's a famous benchmark,

263
00:24:03,480 --> 00:24:07,279
a set of text that if you think you have a good new compression

264
00:24:07,279 --> 00:24:10,879
algorithm, you can run it on this benchmark.

265
00:24:10,879 --> 00:24:13,440
Whereas asking you to use the seven bits per character,

266
00:24:13,440 --> 00:24:15,480
it's eight bit, one of the bits is redundant.

267
00:24:15,480 --> 00:24:19,039
So you'll immediately get down to seven.

268
00:24:19,039 --> 00:24:21,039
These are the kind of compression ratios

269
00:24:21,039 --> 00:24:26,759
that people have achieved with various mostly

270
00:24:26,759 --> 00:24:30,960
lentils of variance down to less than half

271
00:24:30,960 --> 00:24:33,160
what you can get with asking.

272
00:24:33,160 --> 00:24:34,920
But it continues to drive down.

273
00:24:34,920 --> 00:24:39,039
And there was a completely new method called the Burles Wheeler

274
00:24:39,039 --> 00:24:42,200
Method developed in the 90s that

275
00:24:42,200 --> 00:24:44,759
took a big jump down.

276
00:24:44,759 --> 00:24:48,840
And there's a few more that have continued to improve

277
00:24:48,840 --> 00:24:50,519
even through the 90s.

278
00:24:50,519 --> 00:24:54,720
So there's still room for improvement

279
00:24:54,720 --> 00:24:56,640
in lossless data compression.

280
00:24:56,640 --> 00:25:00,160
But it's a really fine example of the power

281
00:25:00,160 --> 00:25:03,680
of good algorithmic technology.

282
00:25:03,680 --> 00:25:07,759
So here's our quick summary on data compression.

283
00:25:07,759 --> 00:25:11,279
So we considered two classic fundamental algorithms.

284
00:25:11,279 --> 00:25:13,399
The first one, Hoffman and Coding,

285
00:25:13,399 --> 00:25:18,839
represents fixed length symbols with variable length code.

286
00:25:18,839 --> 00:25:23,359
So the prefix code uses tries to use

287
00:25:23,359 --> 00:25:28,480
smaller number of bits for the most frequently used symbols.

288
00:25:28,480 --> 00:25:33,639
The other way, the lentil-sive method

289
00:25:33,639 --> 00:25:36,480
takes variable length symbols and uses fixed length

290
00:25:36,480 --> 00:25:36,879
code.

291
00:25:36,879 --> 00:25:41,240
So it's interesting to think about those two ends of the spectrum.

292
00:25:41,720 --> 00:25:43,920
There's plenty of compression algorithms out there

293
00:25:43,920 --> 00:25:49,400
that don't try to get an exact compression,

294
00:25:49,400 --> 00:25:54,120
but just try to get an approximation using FFT and wavelets

295
00:25:54,120 --> 00:25:58,839
and many other mathematical techniques.

296
00:25:58,839 --> 00:26:01,640
And that's appropriate for things like pictures and movies

297
00:26:01,640 --> 00:26:03,799
where maybe you can miss a few bits.

298
00:26:03,799 --> 00:26:07,440
But lossless compression is still very important.

299
00:26:07,440 --> 00:26:10,279
When you download an application, which

300
00:26:10,279 --> 00:26:13,720
is machine code onto your computer,

301
00:26:13,720 --> 00:26:16,440
you can't afford to have one of the bits be wrong.

302
00:26:16,440 --> 00:26:21,680
So that's why lossless compression will always be with us.

303
00:26:21,680 --> 00:26:24,279
There's a theory on compression.

304
00:26:24,279 --> 00:26:27,359
There's theoretical limits that measure

305
00:26:27,359 --> 00:26:35,839
of the entropy, Shannon entropy of a text that says

306
00:26:35,839 --> 00:26:41,559
is a very fundamental way to indicate how much information

307
00:26:41,559 --> 00:26:45,559
there is in the text as a function of its frequency.

308
00:26:45,559 --> 00:26:49,679
So it's a sum overall character, so the product

309
00:26:49,679 --> 00:26:53,240
of the frequency in the log of the frequency.

310
00:26:53,240 --> 00:26:59,599
And with these methods, we can get very close

311
00:26:59,599 --> 00:27:03,639
to the entropy in some theoretical settings,

312
00:27:03,640 --> 00:27:08,200
but actually in practice, the most effective methods

313
00:27:08,200 --> 00:27:12,040
use tricks and techniques that have extra knowledge

314
00:27:12,040 --> 00:27:16,240
about the data being compressed to really get the most

315
00:27:16,240 --> 00:27:18,640
effective pattern of results.

316
00:27:18,640 --> 00:27:20,960
As I explained, if you're doing a page like this,

317
00:27:20,960 --> 00:27:23,240
you better use a method that does really well

318
00:27:23,240 --> 00:27:27,480
on huge amounts of white space, for example.

319
00:27:27,480 --> 00:27:31,000
That's LZW compression and our last compression algorithm.

