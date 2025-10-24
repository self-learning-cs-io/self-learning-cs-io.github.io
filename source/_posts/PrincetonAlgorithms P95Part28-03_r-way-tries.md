---
title: PrincetonAlgorithms P95Part28 03_r Way Tries
---

1
00:00:00,000 --> 00:00:09,439
Today we're going to talk about tribes, which is a data structure for searching with string

2
00:00:09,439 --> 00:00:15,359
keys that is remarkably effective in enabling us to deal with huge amounts of data that we

3
00:00:15,359 --> 00:00:18,039
have to process nowadays.

4
00:00:18,039 --> 00:00:26,440
Just as motivation, when we left off talking about searching algorithms or symbol table implementations,

5
00:00:26,440 --> 00:00:28,200
here's where we were.

6
00:00:28,200 --> 00:00:37,039
The best algorithms that we examined were balanced red-black binary search trees and hash tables.

7
00:00:37,039 --> 00:00:44,520
And with respect to the basic search, insert, and delete operations, red-black BSTs were

8
00:00:44,520 --> 00:00:51,280
able to guarantee that we can get those done in logarithmic time, actually pretty efficiently.

9
00:00:51,280 --> 00:00:55,799
And for hashing, we get them done in constant time under certain assumptions that we could

10
00:00:55,799 --> 00:00:59,079
have a uniform hash function.

11
00:00:59,079 --> 00:01:06,099
And also for hashing, we need to compute a hash code for binary search trees we use a

12
00:01:06,099 --> 00:01:07,920
comparative function.

13
00:01:07,920 --> 00:01:12,599
And another difference is binary search trees, we can support more operations than we can

14
00:01:12,599 --> 00:01:18,400
support with hashing ordered operations, for example, with getting the rank of a key in

15
00:01:18,400 --> 00:01:20,759
the tree and other things.

16
00:01:20,760 --> 00:01:26,120
And those are terrific algorithms and we looked at plenty of good applications of those

17
00:01:26,120 --> 00:01:27,120
algorithms.

18
00:01:27,120 --> 00:01:31,040
But still there's a question, could we do better?

19
00:01:31,040 --> 00:01:35,040
And the answer is that yes, we can do better.

20
00:01:35,040 --> 00:01:41,760
As with string sorting, we can avoid examining the entire key, which is going to give us algorithms

21
00:01:41,760 --> 00:01:46,600
that can compete and even beat these classic algorithms.

22
00:01:46,599 --> 00:01:54,599
So to get started, we're going to articulate in API for symbol tables that specialize for

23
00:01:54,599 --> 00:01:57,879
the case when the keys are strings.

24
00:01:57,879 --> 00:02:05,879
So simply we just add the modifier string to our standard symbol table API.

25
00:02:05,879 --> 00:02:10,039
And we can take a generic value, but the keys are strings.

26
00:02:10,039 --> 00:02:18,680
And then we take all the methods that we articulated before and for key type instead of generic

27
00:02:18,680 --> 00:02:20,399
we use string.

28
00:02:20,399 --> 00:02:25,639
And this is going to allow us to develop efficient algorithms that take advantage of properties

29
00:02:25,639 --> 00:02:28,319
of strings.

30
00:02:28,319 --> 00:02:36,000
Our goal is to get some algorithms that are even faster than hashing and maybe more flexible

31
00:02:36,000 --> 00:02:37,000
than BSTs.

32
00:02:37,000 --> 00:02:41,759
And we're going to be able to achieve both those goals.

33
00:02:41,759 --> 00:02:52,800
So this again is the summary of the running times for when in the case that the keys are

34
00:02:52,800 --> 00:02:57,560
strings for red-black BSTs and for hashing.

35
00:02:57,560 --> 00:02:59,639
Let's take a look at those.

36
00:02:59,639 --> 00:03:05,639
So if L is the length of the string and N is the number of strings.

37
00:03:05,639 --> 00:03:12,839
And then also the radix R is going to be a factor later on, but it isn't for these two.

38
00:03:12,839 --> 00:03:19,279
Then for hashing for every operation we have to compute a hash function, which basically

39
00:03:19,279 --> 00:03:22,879
means looking at every character in the string.

40
00:03:22,879 --> 00:03:26,919
Actually in Java string hash functions are cache.

41
00:03:26,919 --> 00:03:31,639
So sometimes there's efficiencies because you only have to in their mutable, you only

42
00:03:31,639 --> 00:03:34,919
have to compute the hash function once.

43
00:03:34,919 --> 00:03:38,719
And then this is roughly the amount of space that takes into account the table in the

44
00:03:38,719 --> 00:03:40,759
string size.

45
00:03:40,759 --> 00:03:47,199
For red-black BSTs, the analysis is a bit more complicated.

46
00:03:47,199 --> 00:03:53,039
For a search hit you have to look at the entire string, entire key to check that every character

47
00:03:53,039 --> 00:03:54,839
is the same.

48
00:03:54,839 --> 00:04:00,039
And then the comparisons, depending on the nature of the keys for a typical case though,

49
00:04:00,039 --> 00:04:02,879
it's something like log squared.

50
00:04:02,879 --> 00:04:08,319
We had log N comparisons, but usually you have to look at something like log N characters

51
00:04:08,319 --> 00:04:13,319
in the key in order to get down the tree.

52
00:04:13,319 --> 00:04:17,920
For a search miss, you might find out before you get to the end of the tree and same for

53
00:04:17,920 --> 00:04:19,279
insert.

54
00:04:19,279 --> 00:04:23,040
So the running times are something like this.

55
00:04:23,040 --> 00:04:32,439
And then here's some experimental evidence that we can use to test out these analytic hypotheses.

56
00:04:32,439 --> 00:04:35,920
And we'll just look at two examples.

57
00:04:35,920 --> 00:04:41,199
One is the entire text of Melville's Movedick, which we've used before.

58
00:04:41,199 --> 00:04:46,040
And that's about a million characters and maybe 200,000 strings.

59
00:04:46,040 --> 00:04:50,680
And out of those 200,000 strings, about 32,000 are distinct.

60
00:04:50,680 --> 00:04:56,279
And then this is another file of actors from the internet movie database that's much bigger,

61
00:04:56,279 --> 00:04:58,920
maybe two orders of magnitude bigger.

62
00:04:58,920 --> 00:05:02,399
And it's got maybe about a million different words.

63
00:05:02,399 --> 00:05:12,279
So we'll want our algorithms to do better than or at least as well as red-black BSTs in

64
00:05:12,279 --> 00:05:15,799
hashing on these data sets.

65
00:05:15,799 --> 00:05:19,679
I think our test is to dedupe these data sets.

66
00:05:19,679 --> 00:05:24,599
So that's our challenge, efficient performance for string keys and try to come up with algorithms

67
00:05:24,599 --> 00:05:28,759
that can compete with the best classic algorithms.

68
00:05:28,759 --> 00:05:33,240
Now in order to do that, we're going to look at our way tries.

69
00:05:33,240 --> 00:05:38,759
That's a particular data structure that was invented actually really quite a while ago.

70
00:05:38,759 --> 00:05:44,079
This data structure dates back to the 60s.

71
00:05:44,079 --> 00:05:52,360
And the first thing to know about it is that the name is based a little bit on a pun.

72
00:05:52,360 --> 00:05:57,360
It actually is the middle letters of the word retrieval.

73
00:05:57,360 --> 00:06:01,759
But we don't pronounce it tree because then we couldn't distinguish it from binary research

74
00:06:01,759 --> 00:06:02,759
trees.

75
00:06:02,759 --> 00:06:04,800
So we pronounce it try.

76
00:06:04,800 --> 00:06:08,720
And this is a confusing fact of life that we've been living with for many decades now with

77
00:06:08,720 --> 00:06:10,560
this data structure.

78
00:06:10,560 --> 00:06:12,040
And let's look at what a try is.

79
00:06:12,040 --> 00:06:16,840
And we'll look at some examples before we get to the code.

80
00:06:16,839 --> 00:06:23,519
So for now, we're going to think of a try as some nodes, tree structure with nodes,

81
00:06:23,519 --> 00:06:27,279
where we store characters in the nodes, not keys.

82
00:06:27,279 --> 00:06:33,199
And the other thing is that each node has our children where ours, the rate, it's the

83
00:06:33,199 --> 00:06:36,079
number of possible characters.

84
00:06:36,079 --> 00:06:42,239
And there's the possibility of a child for each possible character.

85
00:06:42,240 --> 00:06:46,759
Now in the standard implementation, this is going to involve on all links.

86
00:06:46,759 --> 00:06:51,360
We have to have a placeholder for each possible character.

87
00:06:51,360 --> 00:06:53,319
So there's a lot of no links in tries.

88
00:06:53,319 --> 00:06:55,000
And we'll get back to that in a minute.

89
00:06:55,000 --> 00:07:00,680
But to get the concept, we'll use this graphical representation where we have characters in

90
00:07:00,680 --> 00:07:03,600
nodes and we don't show any no links.

91
00:07:03,600 --> 00:07:08,400
And the other thing is remember a symbol table is associating a key with a value.

92
00:07:08,399 --> 00:07:14,120
So this try is built for this set of key value pairs.

93
00:07:14,120 --> 00:07:21,079
And what we do is we store values in nodes that correspond to the last characters in keys.

94
00:07:21,079 --> 00:07:23,079
And we'll look at, so that's what these numbers here are.

95
00:07:23,079 --> 00:07:28,759
And we'll look a little more in detail on how this try is built in just a second.

96
00:07:28,759 --> 00:07:30,399
So that's the basic idea.

97
00:07:30,399 --> 00:07:32,879
We're going to have string keys.

98
00:07:32,879 --> 00:07:34,479
We're going to associate values.

99
00:07:34,480 --> 00:07:38,759
And we're going to use this tree data structure.

100
00:07:38,759 --> 00:07:42,680
But we're not going to draw the implied no links for now.

101
00:07:42,680 --> 00:07:48,400
So for example, in this try, so the root represents all strings.

102
00:07:48,400 --> 00:07:52,600
And coming out of the root is one link for each possible letter.

103
00:07:52,600 --> 00:07:58,480
In particular in this try, the middle link is the link to a sub-try that contains all

104
00:07:58,480 --> 00:08:01,800
the keys that start with S.

105
00:08:01,800 --> 00:08:03,800
And we go further down.

106
00:08:03,800 --> 00:08:11,000
Each time we go by a node, we pick off a letter so that this link, for example, goes to the

107
00:08:11,000 --> 00:08:19,120
try for all keys that start with S, followed by H, followed by E, and so forth.

108
00:08:19,120 --> 00:08:25,680
So now out of all the keys that start with SHE, actually one of them, the one that has

109
00:08:25,680 --> 00:08:30,280
just those letters and then ends, has a value associated with it.

110
00:08:30,279 --> 00:08:36,039
So in the node corresponding to the last letter, the E, we put the value zero.

111
00:08:36,039 --> 00:08:38,919
And so that's how the try is going to look.

112
00:08:38,919 --> 00:08:45,559
So just given that definition, then let's look at how to do search in a try.

113
00:08:45,559 --> 00:08:51,120
All we do is use the characters in the key to guide our search down the data structure.

114
00:08:51,120 --> 00:08:54,879
So let's say we're looking for the key shells.

115
00:08:54,879 --> 00:08:59,480
So we start at the root and we go down the S link since we started with an S.

116
00:08:59,480 --> 00:09:05,560
Now our second letter is H. So we look to see if there's a non-null link that corresponding

117
00:09:05,560 --> 00:09:11,759
to H. And in this case, there is our next letter is E. So we look for an E.

118
00:09:11,759 --> 00:09:18,399
Now no need to examine the value here because we haven't looked at all the letters in our

119
00:09:18,399 --> 00:09:20,039
key yet.

120
00:09:20,039 --> 00:09:26,480
So now we look for L. Now we look for another L. And then finally, we find the S. And when

121
00:09:26,480 --> 00:09:30,480
we find the S, we look to see if there's a value there.

122
00:09:30,480 --> 00:09:32,080
In this case, there is a value.

123
00:09:32,080 --> 00:09:34,240
And so that's what we return.

124
00:09:34,240 --> 00:09:37,399
The value associated with the last key character.

125
00:09:37,399 --> 00:09:42,240
So that's a typical search hit in a try.

126
00:09:42,240 --> 00:09:44,800
Another way is so that node was down at the bottom.

127
00:09:44,800 --> 00:09:49,680
But if you were doing a search for SHE, you follow the same path.

128
00:09:49,680 --> 00:09:54,120
But now when you get to the E, that's the last character of that key.

129
00:09:54,120 --> 00:09:59,240
And so we just return that value associated with that node.

130
00:09:59,240 --> 00:10:01,560
That is, the search doesn't have to go all the way to the bottom.

131
00:10:01,560 --> 00:10:04,279
It might terminate at an intermediate node.

132
00:10:04,279 --> 00:10:09,440
And we just return the value associated with the node corresponding to the last character

133
00:10:09,440 --> 00:10:11,759
in the key.

134
00:10:11,759 --> 00:10:13,159
What about a search miss?

135
00:10:13,159 --> 00:10:16,519
Well, there's two cases for a search miss.

136
00:10:16,519 --> 00:10:24,000
So one of them is we've followed down the tree picking off the letters in the key one

137
00:10:24,000 --> 00:10:26,600
letter at time as before.

138
00:10:26,600 --> 00:10:32,000
And then when we get to the end of the key, we take a look to see if there's a value.

139
00:10:32,000 --> 00:10:36,240
In this case, there's no value associated with the last key character.

140
00:10:36,240 --> 00:10:42,039
That means there's no key in the data structure that's been associated with a value.

141
00:10:42,039 --> 00:10:44,360
So we just return null.

142
00:10:44,360 --> 00:10:48,840
Or the other thing that can happen is we can reach a null link.

143
00:10:48,840 --> 00:10:55,440
So our key now starts with S and then H and then E and then L.

144
00:10:55,440 --> 00:11:00,840
And now our next letter is T. So we'd look to see if there's a non-null link coming from

145
00:11:00,840 --> 00:11:05,800
this node associated with T. And in this case, there's no such link.

146
00:11:05,800 --> 00:11:07,840
So we return null.

147
00:11:07,840 --> 00:11:13,000
That's evidence that that string, there's no key associated with that string in our data

148
00:11:13,000 --> 00:11:14,320
structure.

149
00:11:14,320 --> 00:11:16,879
So that's a search miss.

150
00:11:16,879 --> 00:11:18,879
Now what about insertion?

151
00:11:18,879 --> 00:11:22,879
Well, insertion is also pretty simple.

152
00:11:22,879 --> 00:11:26,159
So we follow two rules.

153
00:11:26,159 --> 00:11:30,519
One is again, we go down links corresponding to each character in the key.

154
00:11:30,519 --> 00:11:35,679
If we come on a null link, we create a new node that's associated with the character that

155
00:11:35,679 --> 00:11:37,279
we're on.

156
00:11:37,279 --> 00:11:41,879
And just keep doing that until we get to the last character, the key in which case we put

157
00:11:41,879 --> 00:11:43,279
the value.

158
00:11:43,279 --> 00:11:49,519
So if in this try, we're supposed to associate the value 7 with short.

159
00:11:49,519 --> 00:11:54,519
We follow our path from the root to S because our first letter is S and then H because our

160
00:11:54,519 --> 00:12:00,000
next letter is H. And then oh, we had an encounter in a null link.

161
00:12:00,000 --> 00:12:06,240
So we have to put a node there with the character associated with the character, oh.

162
00:12:06,240 --> 00:12:11,679
So the later searches for this key will be able to find it by passing through that node.

163
00:12:11,679 --> 00:12:15,279
And now we move to the next letter and there's no node again.

164
00:12:15,279 --> 00:12:17,599
And the next letter, there's still no node.

165
00:12:17,599 --> 00:12:23,319
When we get to the end, then that's the last character in the key and we put our value

166
00:12:23,319 --> 00:12:24,479
7.

167
00:12:24,479 --> 00:12:30,659
And now we've modified the data structure, adding the nodes that are necessary for a later

168
00:12:30,659 --> 00:12:36,879
search to go through character by character and find the value associated with that key.

169
00:12:36,879 --> 00:12:39,919
So that's insertion into a try.

170
00:12:39,919 --> 00:12:48,599
To cement all these ideas, let's do a demo of how that tree was constructed from scratch.

171
00:12:48,599 --> 00:12:51,759
So we have an all try.

172
00:12:51,759 --> 00:13:02,120
So we're going to start by putting the associating the value 0 with the string SHE.

173
00:13:02,120 --> 00:13:06,039
So we start at the root node with an all try.

174
00:13:06,039 --> 00:13:08,039
It's just as that one node.

175
00:13:08,039 --> 00:13:13,719
Create a new node for S. Create a new node for H. Create a new node for E.

176
00:13:13,719 --> 00:13:15,959
Associate 0.

177
00:13:15,959 --> 00:13:19,480
So the key is the sequence of characters from the root to the value.

178
00:13:19,480 --> 00:13:23,399
And the value is in the node corresponding to the last character.

179
00:13:23,399 --> 00:13:31,000
This try represents a symbol table that contains just one string SHE and associated with 0.

180
00:13:31,000 --> 00:13:35,679
Every other string, if you search for any other string in this try,

181
00:13:35,679 --> 00:13:41,279
you'll either end at a node that doesn't have a value or you'll end at a null link.

182
00:13:41,279 --> 00:13:47,399
All right, so now let's say we put in the key SELS.

183
00:13:47,399 --> 00:13:49,639
And you can kind of tell where it's going.

184
00:13:49,639 --> 00:13:51,719
We made room for it in the try.

185
00:13:51,719 --> 00:13:53,679
So we go for S.

186
00:13:53,679 --> 00:13:59,079
And now the second letter E corresponds to a null link.

187
00:13:59,079 --> 00:14:00,919
So we create a new node.

188
00:14:00,919 --> 00:14:05,120
And similarly, we go through and create new nodes for each of the remaining

189
00:14:05,120 --> 00:14:11,679
characters in the key and then associate the value one at the end.

190
00:14:11,679 --> 00:14:17,519
So now we have a try that has two keys in it, SHE and SELS.

191
00:14:17,519 --> 00:14:20,240
Now our next is to insert SEA.

192
00:14:20,240 --> 00:14:21,799
So now we have S.

193
00:14:21,799 --> 00:14:24,360
We already have a node corresponding to E.

194
00:14:24,360 --> 00:14:28,519
And so now we just have to create one new node, the one corresponding to A,

195
00:14:28,519 --> 00:14:30,919
and put our value to there.

196
00:14:30,919 --> 00:14:34,480
And now we're going to put SHE LLS in.

197
00:14:34,480 --> 00:14:36,480
So we already have the S.

198
00:14:36,480 --> 00:14:38,480
And we already have the H. And we already have the E.

199
00:14:38,480 --> 00:14:43,680
So now we have to add nodes to the last three letters in that string and

200
00:14:43,680 --> 00:14:46,480
associate the value three with it.

201
00:14:46,480 --> 00:14:49,680
Now we're going to put finally a key that doesn't start with S.

202
00:14:49,680 --> 00:14:54,279
So that means we create a new node corresponding to the first letter of that

203
00:14:54,279 --> 00:14:59,960
string into the other letter two and then associate the value four.

204
00:14:59,960 --> 00:15:02,120
And here's another one that doesn't start with S.

205
00:15:02,120 --> 00:15:05,879
So we create new nodes corresponding to each one of its characters and

206
00:15:05,879 --> 00:15:10,720
associate the value five with the last one.

207
00:15:10,720 --> 00:15:13,399
And now here's SEA.

208
00:15:13,399 --> 00:15:19,919
So this is, remember, our symbol table API is associated, which means that if

209
00:15:19,919 --> 00:15:25,840
we get a new value for a key that's already in the table, we overwrite the old

210
00:15:25,840 --> 00:15:27,680
value with the new value.

211
00:15:27,679 --> 00:15:33,000
Now that's the way the convention that we've chosen for symbol table.

212
00:15:33,000 --> 00:15:38,399
So that is easily done with tribes as well.

213
00:15:38,399 --> 00:15:42,439
Now here's one more key, SH.

214
00:15:42,439 --> 00:15:50,759
And now we have to add a new node because there's no node that's a child of H,

215
00:15:50,759 --> 00:15:51,839
the corresponding letter O.

216
00:15:51,839 --> 00:15:57,319
So we have to create new nodes for O, R and E and associate the value seven with it.

217
00:15:58,320 --> 00:16:02,400
So that's a try that has precisely eight keys.

218
00:16:02,400 --> 00:16:05,600
If you look for any one of those eight keys, you'll get the value.

219
00:16:05,600 --> 00:16:11,040
If you look for any other string, you'll either come to a node that has a null

220
00:16:11,040 --> 00:16:12,960
value or go out on a null link.

221
00:16:12,960 --> 00:16:16,760
And so search would be unsuccessful.

222
00:16:16,760 --> 00:16:20,960
That's a demo of tri-construction.

223
00:16:20,960 --> 00:16:25,720
Now they have a basic idea of what tries are and how they work.

224
00:16:25,720 --> 00:16:31,200
Let's take a look at what's needed to implement them in Java.

225
00:16:31,200 --> 00:16:38,639
The key idea in the tri-representation for an implementation in Java or any computer

226
00:16:38,639 --> 00:16:47,720
language is that instead of representing a node as a character in the node,

227
00:16:47,720 --> 00:16:54,000
what we do is we represent the links as an index to array with one entry

228
00:16:54,000 --> 00:16:57,399
for each possible character.

229
00:16:57,399 --> 00:17:05,039
And the idea is that the characters are actually implicitly defined by link indices.

230
00:17:05,039 --> 00:17:10,480
So just for example, we have this small tri that we built over here.

231
00:17:10,480 --> 00:17:18,400
In this case, the root has only one node below it that's for all the keys to start with S.

232
00:17:18,400 --> 00:17:23,440
The way that's represented in the real representation, and this is for efficiency,

233
00:17:23,440 --> 00:17:29,120
and it's the way that tries get their efficiency, is we have one link corresponding each possible

234
00:17:29,120 --> 00:17:33,840
letter and the only one that is non-null is S.

235
00:17:33,840 --> 00:17:38,759
So the character S is defined implicitly by the fact that that

236
00:17:38,759 --> 00:17:46,480
that corresponds to S is not null.

237
00:17:46,480 --> 00:17:52,680
Over here, there's from E to A, there's two links coming out of E.

238
00:17:52,680 --> 00:17:59,600
And the only way that we represent A is by having the first link be not null.

239
00:17:59,600 --> 00:18:05,000
If the link corresponding to a letter is not null, that corresponds to having that letter

240
00:18:05,000 --> 00:18:07,799
in the node that it points to.

241
00:18:07,799 --> 00:18:12,640
So in this case, we have E connected to A and L, so we have the entries corresponding to

242
00:18:12,640 --> 00:18:17,279
A and L filled with non-null values.

243
00:18:17,279 --> 00:18:23,720
So you can see immediately the correspondence between this tri, the way we've been drawing

244
00:18:23,720 --> 00:18:32,039
it, and the Java representation of it, where each node contains two hundred or

245
00:18:32,039 --> 00:18:35,279
R links, if there's R different letters.

246
00:18:35,279 --> 00:18:39,879
And letters are implicitly represented by non-null links.

247
00:18:39,879 --> 00:18:41,759
Values go in the node.

248
00:18:41,759 --> 00:18:49,480
So for example, in this tri S E A, which is easy to follow down through the tri, we're

249
00:18:49,480 --> 00:18:55,599
looking for an S, and S is the twenty-enth letter in the alphabet.

250
00:18:55,599 --> 00:19:02,599
Or so, we index into the twenty-enth position, and that takes us right to S.

251
00:19:02,599 --> 00:19:06,160
And then E is the fifth letter, we take the fifth link, and then A is the first letter,

252
00:19:06,160 --> 00:19:07,720
we take the first link.

253
00:19:07,720 --> 00:19:14,960
So we can use the character as index into the array of links to quickly travel down the

254
00:19:14,960 --> 00:19:15,960
tree.

255
00:19:15,960 --> 00:19:21,920
Then we get to the last character, we can check the value at that node that's stored in

256
00:19:21,920 --> 00:19:24,279
the node.

257
00:19:24,279 --> 00:19:33,039
One slight complication in the implementation that we encountered before with hashing algorithms

258
00:19:33,039 --> 00:19:34,920
and other things.

259
00:19:34,920 --> 00:19:37,960
We're going to need arrays of nodes.

260
00:19:37,960 --> 00:19:40,360
That's what our links are.

261
00:19:40,360 --> 00:19:45,880
So we can't have any generics within node, even though it would like to.

262
00:19:45,880 --> 00:19:50,680
So we have to declare the value to be of type object, and then we'll have to cast it back

263
00:19:50,680 --> 00:19:56,800
to whatever type it should be when we return it, and we'll see that in the code.

264
00:19:56,800 --> 00:20:02,380
Other than that little complication, this is a quite straightforward representation of

265
00:20:02,380 --> 00:20:07,660
tries, and it leads to a very easy implementation.

266
00:20:07,660 --> 00:20:11,820
So the keys and the characters are not explicitly stored.

267
00:20:11,820 --> 00:20:17,660
They're there implicitly because of the links, and that's a very important point to think

268
00:20:17,660 --> 00:20:23,540
about when it comes to implementing using tries.

269
00:20:23,540 --> 00:20:30,580
Given that representation, this code for implementing a try symbol table in Java almost writes

270
00:20:30,579 --> 00:20:32,500
itself.

271
00:20:32,500 --> 00:20:39,299
So it's a symbol table implementation, and this slide has the implementation of put using

272
00:20:39,299 --> 00:20:45,339
the same recursive scheme that we've used many other times in building trees.

273
00:20:45,339 --> 00:20:47,220
What are the instance variables?

274
00:20:47,220 --> 00:20:53,379
Well, we declare R to be 256, as usual, and our string implementations were working with

275
00:20:53,379 --> 00:20:55,740
extended ASCII.

276
00:20:55,740 --> 00:21:02,579
And then we have one instance variable that matters, and that is the root of the try.

277
00:21:02,579 --> 00:21:07,819
So tries begin with, all tries start with null node.

278
00:21:07,819 --> 00:21:13,579
So first thing we do is create a new node and put a reference to that node in the root.

279
00:21:13,579 --> 00:21:23,859
So our empty try consists of a node that's got a, remember when you create a new node, we

280
00:21:23,859 --> 00:21:28,500
build an array of R links to nodes.

281
00:21:28,500 --> 00:21:32,579
And at the beginning those will all be empty links, or all null links.

282
00:21:32,579 --> 00:21:36,939
So the root points to a node that has 256 null links.

283
00:21:36,939 --> 00:21:47,659
Now to put, or to associate a key with a value in a try, we use this instance method that

284
00:21:47,659 --> 00:21:52,819
calls a recursive method, again the same way that we've done for other tree construction

285
00:21:52,819 --> 00:21:55,220
schemes before.

286
00:21:55,220 --> 00:22:01,179
So the recursive method takes a node as argument and returns a node.

287
00:22:01,179 --> 00:22:08,899
So it takes a reference to a try and returns a reference to the try that it constructs after

288
00:22:08,899 --> 00:22:11,700
associating the key with a value.

289
00:22:11,700 --> 00:22:17,939
Just to get started, suppose that our first key has just one character.

290
00:22:17,940 --> 00:22:27,660
So in that case we would call another recursive put for the root with our one character.

291
00:22:27,660 --> 00:22:35,259
And so our one character key, and call the recursive routine.

292
00:22:35,259 --> 00:22:40,420
Now our node is not null, it's the root node.

293
00:22:40,420 --> 00:22:47,460
So in our key is linked to one and we call it starting at zero.

294
00:22:47,460 --> 00:22:56,500
So the first thing that we do is pick out the beef character of our key.

295
00:22:56,500 --> 00:23:01,140
So the zero of character, which is our one character, and that gives us an index, whatever letter

296
00:23:01,140 --> 00:23:02,620
it might happen to be.

297
00:23:02,620 --> 00:23:07,140
I say it's b, then c would be 2, that sort of thing.

298
00:23:07,140 --> 00:23:17,420
And then all we do is recursively follow that link, associate our key value in the try,

299
00:23:17,420 --> 00:23:26,779
point it to by that link, and then take the link that we get and put it back into that link out of the root node.

300
00:23:26,779 --> 00:23:32,700
So the next call, there's nothing in the root dot next.

301
00:23:32,700 --> 00:23:37,980
It's null, so the next call we get null, so we create a new node.

302
00:23:37,980 --> 00:23:43,180
And in that new node, at this point, we've called with d plus 1 moving to the next character.

303
00:23:43,180 --> 00:23:46,940
So now we have d equals 1, which is equal to our key dot link.

304
00:23:46,940 --> 00:23:52,059
So we associate the value in that node with our node and we return it.

305
00:23:52,059 --> 00:24:01,019
So that return, one level up, will set the link of the new node in the appropriate entry corresponding to the root.

306
00:24:01,019 --> 00:24:13,660
Again, once you've learned our normal recursive way of structuring building tree structures, this code is very natural.

307
00:24:13,660 --> 00:24:30,540
So for a longer key, again, thinking recursively, we find the, if we're supposed to insert the key, associate the key with the value and we're working on the df character.

308
00:24:30,540 --> 00:24:34,779
We pick out the character at the df position.

309
00:24:34,779 --> 00:24:39,500
We use that to index into the link array, the current node.

310
00:24:39,500 --> 00:24:44,859
And then that's the link that we set when we do a put of the new node.

311
00:24:44,859 --> 00:24:56,700
So when we start with a longer string in a perfectly empty tree, we create new nodes all the way down and then put their links to their parents all the way up in this recursive structure.

312
00:24:56,700 --> 00:25:00,259
And it's a very simple and natural recursive code.

313
00:25:00,259 --> 00:25:01,380
So that's the put.

314
00:25:01,380 --> 00:25:10,340
Now that takes a little study, but not so much once you're used to our standard recursive way of producing tree structures.

315
00:25:10,340 --> 00:25:13,300
And get is even simpler.

316
00:25:13,300 --> 00:25:21,140
So contains and get so our standard convention is to return null.

317
00:25:21,140 --> 00:25:25,940
If we have a key that's not there, that's contains.

318
00:25:25,940 --> 00:25:39,539
And the get function is a, again, a recursive procedure that will return a reference to the node.

319
00:25:39,539 --> 00:25:42,259
And if that's null, we return null.

320
00:25:42,259 --> 00:25:48,180
Otherwise, we can get the value out of the node returned by the recursive procedure.

321
00:25:48,180 --> 00:25:52,820
And then remember, we had to make our value in nodes of type objects.

322
00:25:52,819 --> 00:25:56,819
So we have to cast that back to the type value.

323
00:25:56,819 --> 00:26:07,859
And the recursive get is very simple to find the node, the contains the value associated with a given key.

324
00:26:07,859 --> 00:26:09,779
And we're working on the deep character.

325
00:26:09,779 --> 00:26:12,740
And we're currently on node x.

326
00:26:12,740 --> 00:26:14,179
We just return null.

327
00:26:14,179 --> 00:26:17,819
If x happens to be null, that means it's not there.

328
00:26:17,819 --> 00:26:25,339
If we're at the last character in the key, we return our current node.

329
00:26:25,339 --> 00:26:28,939
Otherwise, we get that deep character.

330
00:26:28,939 --> 00:26:33,819
And we use that to index into the next array of the current node.

331
00:26:33,819 --> 00:26:40,299
And recursively call the get routine for that node moving one down the tree,

332
00:26:40,299 --> 00:26:43,220
and incrementing our key point by one.

333
00:26:43,220 --> 00:26:50,259
Extremely simple recursive code to do the try implementation.

334
00:26:50,259 --> 00:26:52,299
So what about the performance?

335
00:26:52,299 --> 00:27:00,740
Well, in a search hit, we simply go down the try examining all L characters,

336
00:27:00,740 --> 00:27:04,779
just using each one to index into an x-terrade some node.

337
00:27:04,779 --> 00:27:09,100
And then go down to the end to see if there's a value there.

338
00:27:09,100 --> 00:27:12,860
Search and miss, we might have to go all the way down to the last character.

339
00:27:12,859 --> 00:27:18,619
But we could also just have a mismatch on the first character and find a null link right away.

340
00:27:18,619 --> 00:27:27,059
And actually, typically in a try in typical applications, we only examine a few characters.

341
00:27:27,059 --> 00:27:34,059
So right away, you can see by thinking about a search miss, that try algorithms can be sublinear.

342
00:27:34,059 --> 00:27:39,539
We can find out that the key's not in the tree by only examining a few characters.

343
00:27:39,539 --> 00:27:46,539
If we don't have any strings in our try, that begin with the same few characters as our search key,

344
00:27:46,539 --> 00:27:49,539
then it's not there.

345
00:27:49,539 --> 00:27:51,859
That's a typical case.

346
00:27:51,859 --> 00:28:01,139
Now, the downside of try performance in lots of applications is the amount of space use.

347
00:28:01,140 --> 00:28:07,140
There is the problem that every node's got our links in it.

348
00:28:07,140 --> 00:28:16,140
And particularly down at the bottom, they leave nodes that correspond to the last characters in keys,

349
00:28:16,140 --> 00:28:19,140
and no prefix in the key in the try.

350
00:28:19,140 --> 00:28:21,340
That's going to be null links.

351
00:28:21,340 --> 00:28:28,940
Now, it is possible in a huge try with lots of strings that are sharing common prefixes

352
00:28:28,940 --> 00:28:33,940
that actually use much less space than this.

353
00:28:33,940 --> 00:28:39,940
But the R null links at each leaf is a real problem in some applications,

354
00:28:39,940 --> 00:28:42,940
and we're going to take a look at how to deal with that.

355
00:28:42,940 --> 00:28:50,940
So the bottom line is for symbol tables with relatively small numbers of string keys,

356
00:28:50,940 --> 00:28:57,940
where the amount of space used by the null links at least is not a problem.

357
00:28:57,940 --> 00:29:03,940
Then we get very fast search it, and even faster search myths.

358
00:29:03,940 --> 00:29:05,940
But we burn up some space.

359
00:29:05,940 --> 00:29:09,940
That's the bottom line about try performance.

360
00:29:09,940 --> 00:29:20,940
And just a typical application that maybe you get a job interview question about what data structure you use for spell checking.

361
00:29:20,940 --> 00:29:31,940
And so, and this is just an example to show how effective tries can be for such an application,

362
00:29:31,940 --> 00:29:34,940
where all the words are three letters.

363
00:29:34,940 --> 00:29:38,940
And the solution is build a 26-way try.

364
00:29:38,940 --> 00:29:45,940
So spell checking usually they'll be pre-processing to strip out everything,

365
00:29:45,940 --> 00:29:48,940
but the lower case letters to make up the word.

366
00:29:48,940 --> 00:29:57,940
So you can build a 26-way try that will immediately tell you whether you have a misspelled word or not.

367
00:29:57,940 --> 00:30:05,940
Another interesting thing about tries is that deletion is very easy.

368
00:30:05,940 --> 00:30:08,940
What do we do to delete a key value pair?

369
00:30:08,940 --> 00:30:16,940
Well, you find the node corresponding the key, and set the value there corresponding to null.

370
00:30:16,940 --> 00:30:19,940
So we want to delete shells.

371
00:30:19,940 --> 00:30:22,940
We cross out the value there.

372
00:30:22,940 --> 00:30:25,940
And now there's two cases.

373
00:30:25,940 --> 00:30:29,940
One case is this one, where that node.

374
00:30:29,940 --> 00:30:34,940
Now we set its value to null, and it's got all null links.

375
00:30:34,940 --> 00:30:37,940
Now there's no reason for its existence.

376
00:30:37,940 --> 00:30:42,940
So it wouldn't have been created except for the fact that we inserted shells.

377
00:30:43,940 --> 00:30:47,940
So if the nodes got all links, you just remove it.

378
00:30:47,940 --> 00:30:50,940
And then just delete it.

379
00:30:50,940 --> 00:30:55,940
And then when you go back up the tree, which you do because you got down there,

380
00:30:55,940 --> 00:31:01,940
every node that you touch, you check if it's got an null value,

381
00:31:01,940 --> 00:31:06,940
and all null links just delete it.

382
00:31:06,940 --> 00:31:16,940
And you keep going until you find one that has either a value or a null link.

383
00:31:16,940 --> 00:31:19,940
And that's where you can stop deleting nodes.

384
00:31:19,940 --> 00:31:23,940
So it's pretty easy to delete a key value pair in our way, try.

385
00:31:23,940 --> 00:31:29,940
And that's unusual for other search structures that we saw.

386
00:31:29,940 --> 00:31:33,940
The deletion was a significant challenge to implement often.

387
00:31:33,940 --> 00:31:40,940
So our challenge is to find a way to use less memory, particularly because nowadays,

388
00:31:40,940 --> 00:31:48,940
many strings are built with Unicode, and the number of null links in a try would be truly huge.

389
00:31:48,940 --> 00:31:52,940
Again, we talked about this with Radix Sorting.

390
00:31:52,940 --> 00:31:58,940
A lot of programs broke when the switch went from Ask It Unicode,

391
00:31:59,940 --> 00:32:06,940
and any program that used this representation for tries certainly broke.

392
00:32:06,940 --> 00:32:12,940
So that's an introduction to tries with our way tries.

