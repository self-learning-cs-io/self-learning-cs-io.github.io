---
title: PrincetonAlgorithms P97Part28 05_character Based Operations
---

1
00:00:00,000 --> 00:00:10,720
Now we're going to finish up by looking at some extra operations that are supported for

2
00:00:10,720 --> 00:00:15,919
string keys when we use tries.

3
00:00:15,919 --> 00:00:22,359
So we're going to look at a couple of character based operations that are quite useful and

4
00:00:22,359 --> 00:00:28,080
can be supported by the string symbol table API with tries.

5
00:00:28,079 --> 00:00:32,879
One important one is prefix match.

6
00:00:32,879 --> 00:00:37,399
So that's given a prefix like say SH.

7
00:00:37,399 --> 00:00:45,280
What we want is the method to return all the keys that start with that prefix.

8
00:00:45,280 --> 00:00:51,119
In this case it'd be Shells, Shore, and She.

9
00:00:51,119 --> 00:00:54,079
Another one is so-called wildcard match.

10
00:00:54,079 --> 00:00:59,839
So that's when we don't specify one of the characters or multiple of the characters.

11
00:00:59,839 --> 00:01:05,079
So we put a dot to say we'll take any key that matches the other characters and we don't

12
00:01:05,079 --> 00:01:06,599
care what that one is.

13
00:01:06,599 --> 00:01:15,640
So dot H e would match She and the and another one is so-called longest prefix.

14
00:01:15,640 --> 00:01:24,000
So now we've got a long key and we want to find the best match that's in our symbol table.

15
00:01:24,000 --> 00:01:25,920
That matches that key.

16
00:01:25,920 --> 00:01:29,920
The key in the symbol table that has the longest match with our key.

17
00:01:29,920 --> 00:01:35,560
So in this case the one that's the longest prefix of Shells sort is Shells.

18
00:01:35,560 --> 00:01:39,280
And later on we're going to see applications of some of these.

19
00:01:39,280 --> 00:01:45,560
And the important idea for now is that these are easy to articulate and now like that they're

20
00:01:45,560 --> 00:01:53,200
easy to implement with tries and turn research tries.

21
00:01:53,200 --> 00:02:01,960
So we're going to take our standard API and add these four methods.

22
00:02:01,960 --> 00:02:05,280
So while there's keys, they return all keys.

23
00:02:05,280 --> 00:02:10,400
And as is our usual practice, when we have a lot of things to return we're going to return

24
00:02:10,400 --> 00:02:18,439
them as an iterable so that clients can just iterate through what's returned.

25
00:02:18,439 --> 00:02:21,400
That's usually what clients want to do.

26
00:02:21,400 --> 00:02:27,120
And then we have keys with prefix, give us string S and the iterable return all the keys

27
00:02:27,120 --> 00:02:30,319
in the symbol table to have S as a prefix.

28
00:02:30,319 --> 00:02:35,120
Client wants to find the associated values they can do gets to get the values.

29
00:02:35,120 --> 00:02:37,879
And then we have keys that match.

30
00:02:37,879 --> 00:02:44,120
So that's where we allowed dot to be a wild card in S. And we want to return all the keys

31
00:02:44,120 --> 00:02:50,040
that match S. It's taking dot to be a wild card.

32
00:02:50,039 --> 00:02:53,000
And then longest prefix of S is the key in there.

33
00:02:53,000 --> 00:02:58,039
That's the longest prefix of S. We're going to see later on this particular one plays an

34
00:02:58,039 --> 00:03:04,239
important role in a more complicated algorithm.

35
00:03:04,239 --> 00:03:09,199
We could also go ahead and add all the ordered symbol table methods that we considered when

36
00:03:09,199 --> 00:03:13,879
we looked at binary search trees like floor and rank.

37
00:03:13,879 --> 00:03:16,639
And we're not going to take time to do that right now.

38
00:03:16,639 --> 00:03:20,919
So that's very straightforward.

39
00:03:20,919 --> 00:03:27,799
So one thing that we haven't really talked about, but it's a good warm up for the kinds

40
00:03:27,799 --> 00:03:35,759
of methods that we're going to look at for these implementations is ordered iteration.

41
00:03:35,759 --> 00:03:37,759
And this is tri traversal.

42
00:03:37,759 --> 00:03:48,359
So we're going to do an in order traversal of the tri that is visit the left, visit the

43
00:03:48,359 --> 00:03:51,479
middle, visit the right.

44
00:03:51,479 --> 00:04:00,719
And in that traversal, we can maintain the sequence of characters on the path from the root

45
00:04:00,719 --> 00:04:02,599
to the current node.

46
00:04:02,599 --> 00:04:09,599
By adding a character when we go down and removing a character when we go up and when we encounter

47
00:04:09,599 --> 00:04:20,360
values, then we can put out the characters that we have in that's a way to pull out all

48
00:04:20,360 --> 00:04:22,279
the keys in the tri.

49
00:04:22,279 --> 00:04:27,759
So for example, in this case, we go down and we have B and then we hit the Y so we can

50
00:04:27,759 --> 00:04:34,879
now put say onto a queue we can output by and then we go back and we have SE and A.

51
00:04:34,879 --> 00:04:41,519
We find a value so we can go ahead and put out the A. Now we drop the A and do the L and

52
00:04:41,519 --> 00:04:43,519
SEL and LL.

53
00:04:43,519 --> 00:04:46,959
And then we get to that S. We have a value we can put out cells.

54
00:04:46,959 --> 00:04:51,360
And then we can drop these, get back to the S and get to SH.

55
00:04:51,360 --> 00:04:56,319
SH, find a value and put the she and the queue.

56
00:04:56,319 --> 00:05:01,319
LLS and put cells on the queue.

57
00:05:01,319 --> 00:05:09,480
Drop all those values down to the H and get SHO, SHOR, SHRE, find a value and drop shore

58
00:05:09,480 --> 00:05:10,480
onto the queue.

59
00:05:10,480 --> 00:05:18,600
And then finally T, TH and THE and find a value and put the on the queue.

60
00:05:18,600 --> 00:05:27,320
So it's easy to, very easy to keep track of the sequence of characters on the path from

61
00:05:27,320 --> 00:05:32,280
the root to every node and at every node check for a value and throw it on the queue.

62
00:05:32,280 --> 00:05:39,800
That's ordered iteration and the implementations of these extra operations are just based on

63
00:05:39,800 --> 00:05:43,680
modifying ordered iteration.

64
00:05:43,680 --> 00:05:53,600
So this is an implementation of keys which is essentially the operation that I was tracing

65
00:05:53,600 --> 00:05:56,000
in the last slide.

66
00:05:56,000 --> 00:06:03,079
So if the client wants keys, we make a queue, then we call a recursive routine that collects

67
00:06:03,079 --> 00:06:13,560
all the keys in the try starting at that node and given an all string which is the sequence

68
00:06:13,560 --> 00:06:19,560
of characters on the path that they given when that recursive routine returns then we

69
00:06:19,560 --> 00:06:21,160
just return the queue.

70
00:06:21,160 --> 00:06:27,759
And the recursive routine does encode what I said in words most of the time.

71
00:06:27,759 --> 00:06:28,959
This is for a try.

72
00:06:28,959 --> 00:06:35,160
You do the same thing for a turn of research tree with just a little more code.

73
00:06:35,160 --> 00:06:43,160
So for every character we just move down the try for that character, add the character

74
00:06:43,160 --> 00:06:47,600
to the prefix and also pass the queue along.

75
00:06:47,600 --> 00:06:53,320
If we get a non-null value and how we put what we have on the queue, when we get null we

76
00:06:53,320 --> 00:06:54,920
return.

77
00:06:54,920 --> 00:07:01,840
So a very simple implementation of ordered iteration recursive.

78
00:07:01,840 --> 00:07:05,920
So that's the implementation of the keys method.

79
00:07:05,920 --> 00:07:13,000
So prefix matches and other things like that are going to work just by modifying

80
00:07:13,000 --> 00:07:14,000
that.

81
00:07:14,000 --> 00:07:18,439
And you're familiar with prefix matches.

82
00:07:18,439 --> 00:07:27,160
When you type nowadays in your browser a search function, you're getting a prefix match

83
00:07:27,160 --> 00:07:34,720
of all the things that you type or other people type that matches those strings.

84
00:07:34,720 --> 00:07:38,920
And you find that also in our days when searching in your address books.

85
00:07:38,920 --> 00:07:45,160
That's a quite common function nowadays.

86
00:07:45,160 --> 00:07:49,160
So let's look at how that looks in an R-way try.

87
00:07:49,160 --> 00:07:55,200
So what about finding all the keys in simple table that start with a given prefix?

88
00:07:55,200 --> 00:08:03,480
Well, we just search for that prefix and then just do a collect at the keys in that sub

89
00:08:03,480 --> 00:08:04,480
try.

90
00:08:04,480 --> 00:08:07,720
So that's very straightforward.

91
00:08:07,720 --> 00:08:15,720
So you get the node that is the one you get to by starting with that prefix and then

92
00:08:15,720 --> 00:08:20,080
you just call the recursive collect and boom, you're done.

93
00:08:20,080 --> 00:08:26,240
Extremely simple implementation of keys with prefix in an R-way try.

94
00:08:26,240 --> 00:08:28,720
What about longest prefix?

95
00:08:28,720 --> 00:08:36,960
And here's one that is very, actually very heavily used in the internet.

96
00:08:36,960 --> 00:08:46,000
If your query strings are IP addresses on the internet and you have some given destination

97
00:08:46,000 --> 00:08:55,160
IP address, the router has a lot of IP addresses in a routing table and it wants to choose

98
00:08:55,160 --> 00:09:00,960
the one that would get you as far as close to the destination as you can.

99
00:09:00,960 --> 00:09:03,519
So it's going to choose the longest prefix.

100
00:09:03,519 --> 00:09:09,399
So if you want to get to 128.112, you can think of these as hops on the way to where you

101
00:09:09,399 --> 00:09:10,399
want to get.

102
00:09:10,399 --> 00:09:16,759
Where 11 is the final destination and essentially this table says it knows how to get this far

103
00:09:16,759 --> 00:09:21,480
and so that's what it wants is the longest prefix, longest prefix match.

104
00:09:21,480 --> 00:09:27,079
If you say this one, well, it doesn't know how to get any further than 112.

105
00:09:27,079 --> 00:09:30,600
I miss other one only to 128.

106
00:09:30,600 --> 00:09:39,000
And this operation gets performed extremely often on the internet nowadays.

107
00:09:39,000 --> 00:09:43,080
Just a quick note, it's not the same as the floor function.

108
00:09:43,080 --> 00:09:47,320
It actually is kind of a string operation.

109
00:09:47,320 --> 00:09:52,399
These things actually usually on the internet, they're not represented as strings, they're

110
00:09:52,399 --> 00:09:55,160
represented as binary numbers.

111
00:09:55,160 --> 00:09:59,560
But in machine or assembly language implementation, tries are even easier.

112
00:09:59,559 --> 00:10:04,159
They can just take a bunch of bits and use them as index into a table to move down the

113
00:10:04,159 --> 00:10:12,279
try and actually tries are pretty old because it was so easy to implement data structures in

114
00:10:12,279 --> 00:10:14,239
that way in the past.

115
00:10:14,239 --> 00:10:21,799
It would be surprised at how much of our computational infrastructure is built by program or consists

116
00:10:21,799 --> 00:10:26,959
of programs that are written in machine or assembly language that can make efficient,

117
00:10:26,960 --> 00:10:31,560
really efficient use of low level representations like this.

118
00:10:31,560 --> 00:10:34,280
But it's also useful in high level languages.

119
00:10:34,280 --> 00:10:38,040
So what does it look like in an R way try?

120
00:10:38,040 --> 00:10:45,639
Well, all we're going to do is just do a search and then we're going to keep track of the

121
00:10:45,639 --> 00:10:48,000
longest key that we encountered.

122
00:10:48,000 --> 00:10:56,519
So we have a path and on that path, there's the most recently seen values.

123
00:10:56,519 --> 00:11:00,919
That's the longest key that we found.

124
00:11:00,919 --> 00:11:06,840
If we end at a no link, that's fine.

125
00:11:06,840 --> 00:11:10,360
If there's a value on that node that's going to the link that's the value we're going to

126
00:11:10,360 --> 00:11:12,159
return.

127
00:11:12,159 --> 00:11:17,079
So that's very straightforward implementation.

128
00:11:17,079 --> 00:11:23,840
Just keeping track of the longest key encountered on the search for our key, that's the implementation

129
00:11:23,840 --> 00:11:31,759
of the longest prefix of the usual setup of making a recursive call.

130
00:11:31,759 --> 00:11:37,280
And this code is quite straightforward.

131
00:11:37,280 --> 00:11:45,000
A application of this one is so-called T9 texting.

132
00:11:45,000 --> 00:11:52,840
Now, you know, when we do a course like this, we try to keep up with modern technology and

133
00:11:52,840 --> 00:11:57,160
modern technology moving almost as fast as we can.

134
00:11:57,160 --> 00:12:05,360
There are lots of young people who really don't know about texting with keypads anymore.

135
00:12:05,360 --> 00:12:13,800
But there's a certain range of five or ten years where people got extremely adept at doing

136
00:12:13,800 --> 00:12:16,840
so-called multi-tap input.

137
00:12:16,840 --> 00:12:22,519
There are the only keys on the phone where the nine keys to dial numbers.

138
00:12:22,519 --> 00:12:29,920
And then we have three letters associated with each number, like on old dial telephones.

139
00:12:29,920 --> 00:12:36,639
And to enter a letter, you had to, like to enter an H, you had to tap twice because that's

140
00:12:36,639 --> 00:12:37,639
the second letter.

141
00:12:37,639 --> 00:12:42,400
I'm a forky into tap for twice and like that.

142
00:12:42,399 --> 00:12:53,959
So the so-called T9 text input would use the kinds of algorithms that we're talking about

143
00:12:53,959 --> 00:12:57,360
to make it so that maybe you didn't have to do multi-tap.

144
00:12:57,360 --> 00:13:06,240
So rather than type 2-4s, it would do a tri-type search to figure out which word that you

145
00:13:06,240 --> 00:13:07,240
typed.

146
00:13:07,799 --> 00:13:13,759
And that looked good to us as a potential application for a while.

147
00:13:13,759 --> 00:13:18,159
I'm glad we didn't spend too much time on it.

148
00:13:18,159 --> 00:13:22,200
If you study this keyboard, maybe you'll see why.

149
00:13:22,200 --> 00:13:25,840
Well, you think about how to implement it.

150
00:13:25,840 --> 00:13:35,080
But once we get into it, we realize, Kevin realized there's no F on this sample keypad.

151
00:13:35,080 --> 00:13:42,920
It happened to be S. So what are we going to implement?

152
00:13:42,920 --> 00:13:44,759
Because there's no S there.

153
00:13:44,759 --> 00:13:49,120
So what exactly are they doing?

154
00:13:49,120 --> 00:13:58,120
And well, this is maybe a bit of a fantasy that this is the response that he got.

155
00:13:58,120 --> 00:14:06,919
Maybe these people lived in a world with no S's.

156
00:14:06,919 --> 00:14:14,960
Well anyway, we've moved on from tries, from that type of way of entering text.

157
00:14:14,960 --> 00:14:23,159
But I still want to mention just a few more ideas because the basis behind tries and

158
00:14:23,159 --> 00:14:29,159
returnary search trees is still out there and is still really an important part of our

159
00:14:29,159 --> 00:14:30,480
infrastructure.

160
00:14:30,480 --> 00:14:35,839
And there's some really great algorithms that we just don't have time to cover.

161
00:14:35,839 --> 00:14:40,319
One of them is an old algorithm called Patricia.

162
00:14:40,319 --> 00:14:47,319
And this one is really interesting and intricate algorithm, particularly when implemented for

163
00:14:47,319 --> 00:14:50,639
binary tries where you just do a bit at a time.

164
00:14:50,639 --> 00:14:56,759
Well again, implemented this kind of algorithm in machine language and got extremely efficient

165
00:14:56,759 --> 00:14:58,360
performance.

166
00:14:58,360 --> 00:15:08,279
If we cast it in the R way tries that we've talked about, it's really the best way to think

167
00:15:08,279 --> 00:15:12,639
about it is a way to remove one way branching.

168
00:15:12,639 --> 00:15:19,159
Seems wasteful to have all these nodes that just have one branch.

169
00:15:19,159 --> 00:15:25,159
So one of the main ideas behind Patricia, there's others that I don't really show up in

170
00:15:25,159 --> 00:15:28,439
the high level, I love our representation we're using.

171
00:15:28,439 --> 00:15:34,959
But one of the main ideas behind Patricia was rather than associate a character with each

172
00:15:34,959 --> 00:15:39,360
node associated sequence of characters with each node.

173
00:15:39,360 --> 00:15:44,199
So you just don't have any one way branching.

174
00:15:44,200 --> 00:15:51,700
Making this maybe one step beyond this course, but maybe it's within what we could do in

175
00:15:51,700 --> 00:15:58,160
this course where just not going to take the time to do so.

176
00:15:58,160 --> 00:16:07,480
And you'll find implementations that in practice avoid the one-way branching that are used

177
00:16:07,480 --> 00:16:13,200
in many, many applications, performance critical applications for searching on our days.

178
00:16:13,200 --> 00:16:16,400
I already mentioned IP routing tables.

179
00:16:16,400 --> 00:16:23,320
There's probably no piece of code that's executed more often than that one.

180
00:16:23,320 --> 00:16:31,280
That's based on a try type algorithm and we have these other applications listed as well.

181
00:16:31,280 --> 00:16:33,800
It's got some other names too.

182
00:16:33,799 --> 00:16:39,319
Another thing is so-called suffix tree.

183
00:16:39,319 --> 00:16:45,639
So that's building a tree from a suffix table.

184
00:16:45,639 --> 00:16:51,759
So we talked about having for suffix sorting, we talked about application.

185
00:16:51,759 --> 00:16:59,679
You can also build a search structure from suffixes of a string that admits all kinds of fast

186
00:16:59,679 --> 00:17:02,799
string processing application.

187
00:17:02,799 --> 00:17:11,200
And again, usually eliminate one-way branching in suffix trees.

188
00:17:11,200 --> 00:17:18,039
And also amazingly, you can get them constructed in linear time.

189
00:17:18,039 --> 00:17:23,200
And there's all kinds of interesting applications of suffix trees.

190
00:17:23,200 --> 00:17:30,039
Probably the most important nowadays are in computational biology databases.

191
00:17:30,039 --> 00:17:37,599
Again, extensions of the kinds of algorithms that we've talked about today.

192
00:17:37,599 --> 00:17:44,279
So I think the bottom line for considering string search trees is that it's a real success

193
00:17:44,279 --> 00:17:48,319
story in algorithm design and analysis.

194
00:17:48,319 --> 00:17:56,039
It's a number of clever algorithms that really have made a difference in the kinds of operations

195
00:17:56,039 --> 00:18:04,879
that we can perform in the amount of data that we can handle in modern applications.

196
00:18:04,879 --> 00:18:13,879
We started with red-black BSTs, which is a pretty good solution for general symbol tables

197
00:18:13,879 --> 00:18:18,359
and also hash tables, which are also widely used.

198
00:18:18,359 --> 00:18:27,479
With tries and turnery search tries, we have a performance guarantee where we really

199
00:18:27,479 --> 00:18:32,679
have to really access log and characters.

200
00:18:32,679 --> 00:18:38,959
And when you think about that, even when in is huge, that's going to be a pretty small

201
00:18:38,959 --> 00:18:39,959
number.

202
00:18:39,960 --> 00:18:48,700
You say we're looking among billions of things, log in, even if you only have two-way

203
00:18:48,700 --> 00:18:52,680
branching, would be 30.

204
00:18:52,680 --> 00:18:59,039
And when we have 256-way branching, it's way, way smaller.

205
00:18:59,039 --> 00:19:06,600
And that's just a number of characters access.

206
00:19:06,599 --> 00:19:12,480
Actually the bottom line is you can set things up nowadays, even on the internet when there's

207
00:19:12,480 --> 00:19:19,319
huge, huge amounts of data out there, you can set things up so that you can only need to

208
00:19:19,319 --> 00:19:24,119
look at maybe a hundred bits to get at anything.

209
00:19:24,119 --> 00:19:28,679
When you think about a hundred bits, that specifies two to the hundredth possibilities.

210
00:19:28,679 --> 00:19:31,240
Two to the hundredth is a huge number.

211
00:19:31,240 --> 00:19:36,079
There are not two to the hundredth pieces of information, even on the internet, even

212
00:19:36,079 --> 00:19:40,359
will ever exist on the internet in the life of this galaxy.

213
00:19:40,359 --> 00:19:47,839
But with just a hundred bits, which really isn't too much, we can search for anything efficiently.

214
00:19:47,839 --> 00:19:53,319
That's an amazing success story for algorithm design and analysis.

215
00:19:53,319 --> 00:19:57,120
So that completes our look at tries and turnery search tries.

