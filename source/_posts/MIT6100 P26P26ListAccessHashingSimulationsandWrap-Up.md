---
title: MIT6100 P26P26ListAccessHashingSimulationsandWrap Up
---

1
00:00:00,000 --> 00:00:14,040
So welcome to the last class.

2
00:00:14,040 --> 00:00:15,200
Please don't come on Wednesday.

3
00:00:15,200 --> 00:00:16,960
I will not be here.

4
00:00:16,960 --> 00:00:21,719
Today we will just be tying up some loose ends regarding some topics that we've seen throughout

5
00:00:21,719 --> 00:00:23,280
the course.

6
00:00:23,280 --> 00:00:29,199
And then I'm going to do just a wrap up of things we've learned and potential courses that you

7
00:00:29,199 --> 00:00:31,199
might want to take after this.

8
00:00:31,199 --> 00:00:38,399
Okay, so today as I mentioned we're going to tie up some loose ends regarding lists, dictionaries.

9
00:00:38,399 --> 00:00:44,840
So those two topics are kind of going to be combined into one sort of kind of one part

10
00:00:44,840 --> 00:00:46,600
of this lecture.

11
00:00:46,600 --> 00:00:49,320
It's going to also include a little bit about complexity.

12
00:00:49,320 --> 00:00:53,760
So just some things that we've learned kind of demystifying some details that I kind of

13
00:00:53,760 --> 00:00:57,320
skipped throughout the past few lectures.

14
00:00:57,320 --> 00:00:59,840
And then we're going to talk about simulations.

15
00:00:59,840 --> 00:01:05,840
So simulations are very, very useful, is a very useful idea that you can already do with

16
00:01:05,840 --> 00:01:07,239
what you've learned in this class.

17
00:01:07,239 --> 00:01:12,239
And I'll show you some useful places where you can apply computation and simulation to

18
00:01:12,239 --> 00:01:15,079
do some interesting things.

19
00:01:15,079 --> 00:01:17,359
And then we'll do the wrap up.

20
00:01:17,359 --> 00:01:21,120
So let's first start talking about lists.

21
00:01:21,120 --> 00:01:26,960
So lists were the first data structure that we encountered that was really useful, right?

22
00:01:26,959 --> 00:01:31,079
Like we did see strings and we did see two pulls and things like that.

23
00:01:31,079 --> 00:01:36,319
But once we saw lists it opened up a whole new world of possibilities for how we can manipulate

24
00:01:36,319 --> 00:01:37,319
data, right?

25
00:01:37,319 --> 00:01:39,959
So lists are sequences of objects.

26
00:01:39,959 --> 00:01:43,239
I kind of skipped past how they're actually implemented in memory.

27
00:01:43,239 --> 00:01:45,719
So I do want to talk about that a little bit.

28
00:01:45,719 --> 00:01:54,439
But what we did talk about was the complexity, the asymptotic complexity of list operations.

29
00:01:54,439 --> 00:01:56,399
So some of these are, we're pretty obvious.

30
00:01:56,400 --> 00:02:01,520
So the ones that are theta of n down here were obvious because well, to check for equality

31
00:02:01,520 --> 00:02:04,960
between two lists, you of course have to look at each element in the list, right?

32
00:02:04,960 --> 00:02:07,000
So that's theta of the length of the list.

33
00:02:07,000 --> 00:02:11,680
To check whether an item is in a list or to iterate over list, obviously it's theta of n

34
00:02:11,680 --> 00:02:14,159
because you have to look at each element in a list.

35
00:02:14,159 --> 00:02:18,360
But we didn't really talk about the complexities up here.

36
00:02:18,360 --> 00:02:22,560
So accessing an item in the list specifically is theta of 1.

37
00:02:22,560 --> 00:02:27,360
So that means if you have a list with a whole bunch of elements in it to grab the element

38
00:02:27,360 --> 00:02:31,560
at a specific memory location, it's constant time complexity, right?

39
00:02:31,560 --> 00:02:34,640
So it's basically doesn't depend on the length of the list.

40
00:02:34,640 --> 00:02:35,879
It's instant.

41
00:02:35,879 --> 00:02:38,439
So we're going to see why that is.

42
00:02:38,439 --> 00:02:43,840
Let's first for simplicity's sake assume that we're storing a list in memory of just

43
00:02:43,840 --> 00:02:44,840
integers, right?

44
00:02:44,840 --> 00:02:49,159
So I know lists can store other lists, and dictionaries, and things like that.

45
00:02:49,159 --> 00:02:54,560
So just for this first slide, let's assume all we're doing is storing integers.

46
00:02:54,560 --> 00:03:00,400
So the way Python does this is when you create a list, let's say you're initially populated

47
00:03:00,400 --> 00:03:08,960
with length L, Python initially allocates a contiguous memory block with length L memory

48
00:03:08,960 --> 00:03:11,199
locations.

49
00:03:11,199 --> 00:03:15,680
So if you have a list with 100 elements in it, initially populated with 100 elements,

50
00:03:15,680 --> 00:03:21,080
Python will initially create for US sequence of memory locations that are reserved for this

51
00:03:21,080 --> 00:03:22,800
list.

52
00:03:22,800 --> 00:03:28,319
Then it says, well, if this is going to contain just integers, I'm going to say each one

53
00:03:28,319 --> 00:03:33,159
of these memory locations will hold four bytes for that integer.

54
00:03:33,159 --> 00:03:35,360
That's kind of how we represent an integer, right?

55
00:03:35,360 --> 00:03:38,439
And it could be, you know, eight bytes, something else for different machines.

56
00:03:38,439 --> 00:03:42,480
But in this particular example, let's just say each one of those memory locations will

57
00:03:42,480 --> 00:03:45,159
store an integer, and that's four bytes long.

58
00:03:45,479 --> 00:03:52,960
Well, if this list is contiguous, right, a bunch of blocks of memory in all in order, then

59
00:03:52,960 --> 00:03:58,519
to access the Ith element, all you need to do is a little bit of math, right?

60
00:03:58,519 --> 00:04:02,960
So here I've got an integer in one position in my contiguous block.

61
00:04:02,960 --> 00:04:07,000
Then I have maybe another integer at the next position, and so on, and so on, until I have

62
00:04:07,000 --> 00:04:10,039
another integer at the Ith position.

63
00:04:10,039 --> 00:04:17,360
So since these are consecutive to access the location of the element in this Ith spot,

64
00:04:17,360 --> 00:04:24,120
all I need to do is look up that many memory locations from the start of my list.

65
00:04:24,120 --> 00:04:25,120
Okay?

66
00:04:25,120 --> 00:04:26,120
So that's just pure math.

67
00:04:26,120 --> 00:04:29,120
So one byte is eight bits.

68
00:04:29,120 --> 00:04:40,720
So if I have four times eight bits multiplied by I plus the first location, that will tell

69
00:04:40,720 --> 00:04:46,519
me exactly the location of the Ith integer.

70
00:04:46,519 --> 00:04:51,680
So this is all made possible because these memory locations are allocated in order.

71
00:04:51,680 --> 00:04:56,560
If they were allocated not in order, then maybe this would not be as easy.

72
00:04:56,560 --> 00:04:57,560
Yeah.

73
00:04:58,560 --> 00:05:07,519
32 because, so if I say an integer is stored as four bytes, in bits that's four times eight,

74
00:05:07,519 --> 00:05:09,439
because eight bits is in one byte.

75
00:05:09,439 --> 00:05:11,759
So eight times four is 32 bits.

76
00:05:11,759 --> 00:05:15,399
So one byte here.

77
00:05:15,399 --> 00:05:22,519
All right, but this is assuming that I'm storing integers, and obviously lists can contain

78
00:05:22,519 --> 00:05:23,519
other lists.

79
00:05:23,519 --> 00:05:30,079
And contain two pulls, they can contain dictionaries, and some of those objects might not fit within

80
00:05:30,079 --> 00:05:34,359
this set number of bytes, right, within four bytes, because some of those objects might be

81
00:05:34,359 --> 00:05:37,599
very, very large themselves.

82
00:05:37,599 --> 00:05:44,959
So in that particular case, let's say the list is heterogeneous, that doesn't face us,

83
00:05:44,959 --> 00:05:51,560
because we can say, well, instead of storing the object itself at each memory location,

84
00:05:51,560 --> 00:05:56,040
that worked for integers, but might not work when we have to store a list of a thousand

85
00:05:56,040 --> 00:05:59,399
elements at a particular memory location.

86
00:05:59,399 --> 00:06:03,959
Let's instead of storing the element itself, let's store a pointer.

87
00:06:03,959 --> 00:06:09,959
And a pointer is just a number that tells you which memory location that list might be

88
00:06:09,959 --> 00:06:13,639
stored at, or that dictionary might be stored at, right?

89
00:06:13,639 --> 00:06:18,759
So if we store a pointer at a particular memory location, then that means that this is

90
00:06:18,759 --> 00:06:24,839
my again, contiguous memory allocated for a list of length L or something like that.

91
00:06:24,839 --> 00:06:30,560
Then here, I'm storing and still an integer, and that integer tells Python which memory

92
00:06:30,560 --> 00:06:37,039
location to jump to to grab the integer that's stored there, or something like that, okay?

93
00:06:37,039 --> 00:06:41,639
And here, I might have another list that I'm storing, but I'm not storing it exactly

94
00:06:41,639 --> 00:06:43,800
in that memory location.

95
00:06:43,800 --> 00:06:49,520
I just pointed to by this pointer that tells Python again to jump to a different memory

96
00:06:49,520 --> 00:06:53,920
location where that list might be continuously stored itself, right?

97
00:06:53,920 --> 00:07:00,759
So here in this example, I'm still storing numbers.

98
00:07:00,759 --> 00:07:04,920
This just that these numbers correspond to a memory location that tells Python where

99
00:07:04,920 --> 00:07:09,199
to go to get my element in that list, right?

100
00:07:09,199 --> 00:07:14,399
So in terms of the computation to get the Ith element in the list, it's going to be the

101
00:07:14,399 --> 00:07:15,399
same.

102
00:07:15,399 --> 00:07:21,360
I'm still allocating in my original list four bytes to store my pointer, again, just a

103
00:07:21,360 --> 00:07:22,519
number.

104
00:07:22,519 --> 00:07:28,439
And so to get the Ith location, all I need to do is tell Python to go the start of this

105
00:07:28,439 --> 00:07:36,199
list plus 32 times I locations down to get to that element.

106
00:07:36,199 --> 00:07:40,839
So this formula here, right?

107
00:07:40,839 --> 00:07:48,399
Adding the start of this memory location of the list plus 32 times I is just math.

108
00:07:48,399 --> 00:07:52,560
There's nothing here that depends on the length of the list, right?

109
00:07:52,560 --> 00:07:58,240
So to grab the element at the Ith location, right, somewhere within here, all we're doing

110
00:07:58,240 --> 00:07:59,839
is some math, right?

111
00:07:59,839 --> 00:08:02,560
And addition, and a multiplication.

112
00:08:02,560 --> 00:08:07,839
And since that is just, you know, none of that depends on the length of the list.

113
00:08:07,839 --> 00:08:12,479
The complexity to access the Ith element in the list is constant, right?

114
00:08:12,479 --> 00:08:13,560
Just math.

115
00:08:13,560 --> 00:08:20,079
And we're using this idea that we know exactly how many memory locations we need to jump

116
00:08:20,079 --> 00:08:21,839
to get to the Ith location.

117
00:08:21,839 --> 00:08:24,239
Does that make sense?

118
00:08:24,239 --> 00:08:26,000
Okay.

119
00:08:26,000 --> 00:08:33,919
So that leads us to the question, well, okay, we're storing a list of elements.

120
00:08:33,919 --> 00:08:40,639
And we're using the idea that a list has indices, right, to tell us the value, there's

121
00:08:40,639 --> 00:08:46,519
an element at index zero, an element at index one, an element at index two, and so on.

122
00:08:46,519 --> 00:08:50,000
So there's an order to the list, right?

123
00:08:50,000 --> 00:08:55,960
And because of that order, we're able to index an element at the Ith location in constant

124
00:08:55,960 --> 00:08:57,480
time.

125
00:08:57,480 --> 00:09:01,679
But let's say we wanted to store a dictionary.

126
00:09:01,679 --> 00:09:05,279
Addictionary does not have an order to it, right?

127
00:09:05,279 --> 00:09:06,600
And what is a dictionary store?

128
00:09:06,600 --> 00:09:09,320
It stores a key value pair.

129
00:09:09,320 --> 00:09:14,720
In a list, you could think of the quote unquote key as the index zero, one, two, three, four,

130
00:09:14,720 --> 00:09:15,720
and so on.

131
00:09:15,720 --> 00:09:18,679
And the value was the element at that index.

132
00:09:18,679 --> 00:09:23,000
But in a dictionary, the key is not ordered, right?

133
00:09:23,000 --> 00:09:24,199
The key can be anything.

134
00:09:24,199 --> 00:09:29,079
So here, I've got a dictionary that maps maybe a name to a Boolean.

135
00:09:29,079 --> 00:09:32,839
Maybe the student is in this class, the true or false.

136
00:09:32,839 --> 00:09:39,359
So a naive implementation of a dictionary could be to say, well, let's implement elements

137
00:09:39,359 --> 00:09:40,519
of the dictionary.

138
00:09:40,519 --> 00:09:44,079
So a key value pair as a list.

139
00:09:44,079 --> 00:09:45,279
So just two elements.

140
00:09:45,279 --> 00:09:47,959
The first element that list is my key.

141
00:09:47,960 --> 00:09:50,960
The second element in my list is my value, right?

142
00:09:50,960 --> 00:09:54,360
So here, I really naive implementation uses the list.

143
00:09:54,360 --> 00:09:57,440
And I've got four entries in my dictionary.

144
00:09:57,440 --> 00:09:59,560
The element at index zero are all strings.

145
00:09:59,560 --> 00:10:07,040
The element at index one in each location is my value associated with that key.

146
00:10:07,040 --> 00:10:14,320
Well, if I were to index into this list, right, to grab the value associated with Eric,

147
00:10:14,320 --> 00:10:15,840
for example.

148
00:10:15,840 --> 00:10:19,399
Can I do that in constant time?

149
00:10:19,399 --> 00:10:21,280
No, right?

150
00:10:21,280 --> 00:10:24,120
Because there's no numerical index here.

151
00:10:24,120 --> 00:10:29,360
There's no order to this set of values, right?

152
00:10:29,360 --> 00:10:31,560
It's not even an alphabetical order, right?

153
00:10:31,560 --> 00:10:33,960
So a, then j, then e, then s.

154
00:10:33,960 --> 00:10:37,240
And there's no order guaranteed for dictionaries anyway.

155
00:10:37,240 --> 00:10:41,320
So in order to look up an item in this naive implementation of a dictionary where you're

156
00:10:41,320 --> 00:10:47,320
just putting all the elements in order in a list, it's theta of n, where n is the length

157
00:10:47,320 --> 00:10:49,920
of our list, right?

158
00:10:49,920 --> 00:10:55,480
And so this implementation of a dictionary doesn't work.

159
00:10:55,480 --> 00:11:02,040
And yet, when I showed you this slide a few lectures ago, we saw something interesting.

160
00:11:02,040 --> 00:11:10,600
So this is what we just kind of proved, quote unquote, the access time in a list is constant.

161
00:11:11,560 --> 00:11:19,200
But the access time in a dictionary is constant as well in the average case.

162
00:11:19,200 --> 00:11:22,680
In the worst case, it is theta of n, right?

163
00:11:22,680 --> 00:11:27,480
Accessing an item in a dictionary is theta of n, because in the worst case, we might store

164
00:11:27,480 --> 00:11:29,399
the dictionary like this, right?

165
00:11:29,399 --> 00:11:33,560
It's just a list of all of our dictionary entries, all in order.

166
00:11:33,560 --> 00:11:39,399
So to look up one index, we'd have to go through the entire list and check if the element

167
00:11:39,399 --> 00:11:44,399
at index zero is the one we're looking for and then grab the element at index one as its value.

168
00:11:44,399 --> 00:11:49,679
But in the average case, and this is what we're going to see next, in the average case, the

169
00:11:49,679 --> 00:11:56,240
access, the time it takes to do a look up for a key in a dictionary is constant.

170
00:11:56,240 --> 00:12:01,360
It's actually theta of one, which makes dictionaries really powerful data structures to use in

171
00:12:01,360 --> 00:12:03,199
a lot of situations.

172
00:12:03,199 --> 00:12:05,079
So why is this?

173
00:12:05,079 --> 00:12:08,399
Well, it has to do with the idea of hashing.

174
00:12:09,399 --> 00:12:16,319
So the way that dictionaries are actually stored in memory is not as a list of a bunch of entries, right?

175
00:12:16,319 --> 00:12:20,240
We just showed that that is not feasible, that leads to a theta of n look up time.

176
00:12:21,439 --> 00:12:24,240
So instead, they use something called a hash table.

177
00:12:24,240 --> 00:12:25,840
We briefly spoke about this.

178
00:12:27,399 --> 00:12:30,559
A hash table is just like a long list.

179
00:12:31,919 --> 00:12:38,199
And the indices of the hash table are actually things that you look up using

180
00:12:38,200 --> 00:12:39,200
as a hash function.

181
00:12:39,200 --> 00:12:40,200
Okay.

182
00:12:40,200 --> 00:12:42,200
So how does this work?

183
00:12:42,200 --> 00:12:50,200
Well, any key that you'd like to add to a dictionary can actually, actually has a hash function run on it.

184
00:12:50,200 --> 00:13:00,200
And this hash function takes in maybe an integer, maybe a float, maybe a string, maybe a tuple, any sort of, any hashable object,

185
00:13:01,200 --> 00:13:07,200
hashes it, which means it takes that object, if it's a string, it'll give us an integer, if it's a tuple, it'll give us an integer.

186
00:13:07,200 --> 00:13:13,200
So if it hashes it, that means it takes it in as an input and gives us back a number, an integer.

187
00:13:14,200 --> 00:13:22,200
And that integer is what is used as the index to look it up in the hash table, to look up the value associated with it in a hash table.

188
00:13:22,200 --> 00:13:29,200
So in that sense, the look up itself is constant time because we just showed looking up an item in a dictionary using the index

189
00:13:30,200 --> 00:13:31,200
is constant time.

190
00:13:31,200 --> 00:13:39,200
And if that hash function is also constant time, then the time it takes to look up an item in a dictionary is also constant time.

191
00:13:40,200 --> 00:13:47,200
So here are some examples of the Python hash function actually being run on different objects.

192
00:13:47,200 --> 00:13:53,200
So up here, if I run, it's literally a function in Python hash of some parameters.

193
00:13:54,200 --> 00:13:59,200
So in this case, 123, it just gives me the value back. So the hash of some number is the number itself.

194
00:14:00,200 --> 00:14:06,200
We can hash a string, that'll give us this particular number.

195
00:14:06,200 --> 00:14:11,200
So again, an integer, the hash of a tuple also gives us some number back.

196
00:14:11,200 --> 00:14:20,200
So these are all just some function running behind the scenes that takes in this hashable object and gives us back a number.

197
00:14:21,200 --> 00:14:27,200
Now we can't run a hash function on a list because a list is mutable and therefore unhashable.

198
00:14:27,200 --> 00:14:34,200
If the object changes, then the hash function run on this object will give us a different value.

199
00:14:37,200 --> 00:14:47,200
So if you actually run this on your own computer, you might get different answers or if you run it at different times, you might get different answers because Python adds a little bit of randomness to the hash values.

200
00:14:48,200 --> 00:14:58,200
Just in case you want to encrypt data and things like that. But generally, you will always get some integer back if you run the hash function on a immutable object.

201
00:15:00,200 --> 00:15:04,200
So then that begs the question, how big should a hash table be?

202
00:15:04,200 --> 00:15:15,200
So if a hash table is basically just a long list and if I run a function on some object to give me the value of an index within that list, how big should this table be?

203
00:15:15,200 --> 00:15:21,200
How many indices should I have? A thousand, a million, ten million? What's a good number?

204
00:15:22,200 --> 00:15:25,200
Well, let's take this example of a string.

205
00:15:25,200 --> 00:15:40,200
So first string, what we can do is, and we can use my name as an example, if we want to hash my name such that every single name hashes to something unique, what we can do is the following.

206
00:15:40,200 --> 00:15:56,200
So we can take each character in somebody's name and behind the scenes, each one of these characters actually has an ASCII code associated with it, which is something numeric.

207
00:15:56,200 --> 00:16:07,200
And what we can do is just convert that number to binary. So the letter capital A happens to be this binary value, right? 0, 1, 0, 0, 0, 0, 0, 1.

208
00:16:07,200 --> 00:16:13,200
The lowercase n is this value, the lowercase a is this value, and so on. Right?

209
00:16:13,200 --> 00:16:20,200
So I've got seven different sort of groups of eight bits here for corresponding to each letter in my name.

210
00:16:20,200 --> 00:16:28,200
Now if I take those bits and now just smoosh them together, concatenate them to give me one really, really big number. Right?

211
00:16:28,200 --> 00:16:31,200
So this is all going to be one really big number.

212
00:16:31,200 --> 00:16:38,200
The corresponding number in base 10 is this really long thing.

213
00:16:38,200 --> 00:16:48,200
Okay? And so if I do this, as long as someone's name is unique, they will end up with a unique number associated with their name.

214
00:16:48,200 --> 00:16:55,200
Right? And therefore, that unique number can be used as a unique index into a really big hash table.

215
00:16:56,200 --> 00:17:02,200
So let's think about hashing the names of MIT's 4,000 undergrads. Right?

216
00:17:02,200 --> 00:17:14,200
Let's assume that the longest name is 20 characters long. Right? So there's going to be 20 of these different letters that we need to hash.

217
00:17:14,200 --> 00:17:22,200
So we use the same process here. Each one of those 20 characters gets its own eight bit representation.

218
00:17:23,200 --> 00:17:31,200
So in total, the number of bits that I'm going to use to represent that 20 long character is going to be eight times 20.

219
00:17:31,200 --> 00:17:45,200
So 160 different bits. Okay? That's a lot of bits. And if I concatenate all those together, the number that that corresponds to is two to the 160, which is this thing here.

220
00:17:46,200 --> 00:18:00,200
So if I want every single combination of letters in the alphabet to be a unique value in this long list, then I will need to have a list that is this long.

221
00:18:00,200 --> 00:18:06,200
I'm not even going to try to figure out or to say how big this number is, but it's really, really big.

222
00:18:07,200 --> 00:18:20,200
And having a list, a K hash table that has this many entries, will guarantee for me that names that are 20 characters long will each hash to something unique.

223
00:18:21,200 --> 00:18:26,200
But I only have 4,000 names that I'd like to put in my table.

224
00:18:26,200 --> 00:18:35,200
So I have 4,000 names that I'd like to put in a table that has this many spots. Right? So that's a lot of wasted space.

225
00:18:35,200 --> 00:18:40,200
Yeah. Is it the 160 because it's a binary?

226
00:18:40,200 --> 00:18:50,200
Yeah, so exactly. So each one of the characters has eight bits associated with it, right? So there's going to be 160 of these zeroes or ones in a row.

227
00:18:50,200 --> 00:19:03,200
So to tell the number that that's associated with, we basically say we basically calculate 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20 with 20 zeros at the end.

228
00:19:03,200 --> 00:19:10,200
And that gives me 2 to the 160. Right? That's going to be how big my number is.

229
00:19:10,200 --> 00:19:22,200
That is going to be, that's going to be for one, for one, that's going to be how many slots I'll need in order to have unique combinations of letters.

230
00:19:22,200 --> 00:19:34,200
So, be mapped to one slot. Right? So, 0, 0, 0, 1 will map to one thing. 0, 0, 0, 1, 0 will map to another thing.

231
00:19:34,200 --> 00:19:42,200
So like all these combinations of letters will each map to something unique. And in order to guarantee that, I need this many slots.

232
00:19:42,200 --> 00:19:51,200
But since, again, since I only have 4,000 undergrads, well, that's a lot of wasted space. Right? I'm only using 4,000 of these slots to hold students' names.

233
00:19:51,200 --> 00:19:58,200
And that's because a lot of those combinations of letters aren't really valid, right? So, what's the solution?

234
00:19:58,200 --> 00:20:07,200
There's a lot of wasted space there, so the solution would be to say, well, you know what? I would be fine with having a smaller hash table.

235
00:20:07,200 --> 00:20:15,200
I don't need that giant number of entries in my hash table. I would be fine with maybe having, you know, 10,000 spots.

236
00:20:15,200 --> 00:20:23,200
And then having some names that happen to hash to the same thing. Or saying, I'm fine with having a hash table that has a million spots.

237
00:20:23,200 --> 00:20:32,200
And, you know, out of those 4,000 some will be used, some will be unused, and some might collide to the same hash value. And that's totally okay.

238
00:20:32,200 --> 00:20:40,200
Okay. So, if we allow collisions, what is this going to look like? So, here's a visualization of our hash table.

239
00:20:41,200 --> 00:20:54,200
So, think of the hash table like a list. The reason why we think of it as a list is because indexing into a list is constant time. Right? We're taking advantage of the idea that if we index into a list, that's going to be constant.

240
00:20:54,200 --> 00:21:04,200
So, let's say we're adding some names and grades into our hash table. Right? So, this is our representation of a dictionary.

241
00:21:05,200 --> 00:21:17,200
The values here says that I have a hash table that has 16 different entries, right? 0 to 15. And 0 to 15 corresponds to like the list index.

242
00:21:17,200 --> 00:21:28,200
Okay. So, if I have a name and a grade that I'd like to add to my hash table, I need to run a hash function on the key.

243
00:21:28,200 --> 00:21:35,200
So, the key is the name and the grade is the value associated with the name.

244
00:21:35,200 --> 00:21:52,200
So, to add Anna with the grade of C to my hash table, I need to take my Anna, which is the key, and run a hash function on it, such that when I run the hash function on this name A and A, it'll give me a number, an integer between 0 and 15.

245
00:21:53,200 --> 00:22:01,200
Okay. And if I can do that, then I know I've added my entry here into one of these buckets.

246
00:22:01,200 --> 00:22:11,200
So, a reasonable hash function to run on the name, and we saw this in the dictionary lectures to say, well, let's have A map to 1, B map to 2, C map to 3, and so on.

247
00:22:12,200 --> 00:22:28,200
So, in, for my name, I've got 1 plus 14 plus 1 equals 16. But since I want to ensure that this hash function gives me a number between 0 and 15, let's mod that with 16.

248
00:22:28,200 --> 00:22:38,200
So, I can sum all the letters in my name just fine, and then let's finalize it by saying mod 16 to give me the remainder either 0, 1, 2, or 15.

249
00:22:38,200 --> 00:22:47,200
So, if I do that, I'm ensured that this key value pair will be added to one of these buckets from 0 to 15.

250
00:22:47,200 --> 00:22:58,200
So, in this particular case, Anna, with a grade of C maps to 0, right, that's what the hash function on my name told me to add, the location that the hash function on my name told me to add to.

251
00:22:58,200 --> 00:23:02,200
So, there I am putting my name in there. Let's add a couple more people.

252
00:23:02,200 --> 00:23:13,200
Here's Eric. His name hashes to 35 mod 16. So, that's 3. So, I'm going to add Eric and his grade to bucket number 3.

253
00:23:13,200 --> 00:23:24,200
Then we can add John with a grade of B. His name hashes to 47 mod 16. So, that's 15. So, we can add John down in bucket 15.

254
00:23:24,200 --> 00:23:38,200
And then let's add Eve with a grade of B. So, she hashes to 32 mod 16, which is also 0. And you know what? Anna was already in the bucket 0. But that's fine.

255
00:23:38,200 --> 00:23:48,200
Because you know what? I have four names here. So, four entries that I want to add to my hash table dictionary. And two of them collided.

256
00:23:48,200 --> 00:24:00,200
That's fine. I still have many other buckets that are empty here. So, if I have, you know, 10 students in my class, probably they won't all hash to 0.

257
00:24:00,200 --> 00:24:16,200
They'll probably hash, you know, somewhere within here so that it's nicely balanced. And so, maybe out of 10 students in my class, only two collided. And that's way better than having all of the students in the class be, you know, enumerated in one long list.

258
00:24:16,200 --> 00:24:40,200
Right. So, when I look up Anna, the way that this works is you hash the name Anna against, right? So, when you want to look up the grade of Anna, you, that's the key. You hash the value Anna again. You say, hey, Anna hash to 0. So, then I'm going to look in bucket 0 and say, all right, let me enumerate everybody who's in bucket 0 and see if I can find Anna with her grade.

259
00:24:40,200 --> 00:24:52,200
So, that happens to be the first one. But, you know, if it was later on, then I'd still be able to grab it much faster than if I had everybody in one long list. Does that make sense? Like the idea of, yeah, go ahead.

260
00:24:52,200 --> 00:24:56,200
So, you can still like access the machine set, like you might get two answers in a minute.

261
00:24:56,200 --> 00:25:08,200
Exactly. Yeah, you can still access them. You just might have to look through the list of two, right? So, here at bucket 0, I'm effectively storing a list of these, everything that hashed to a 0.

262
00:25:08,200 --> 00:25:20,200
Which is, it's fine. Yes, that's, that's two that I have to look through. It's not four, it's not 10, it's not, you know, 100. It's not everybody all in a row. Right? Yeah.

263
00:25:20,200 --> 00:25:37,200
So, the complexity of this is actually going to be smaller than theta of n, right? And it will depend on the hash function that we use. Right? This hash function needs to be nicely balanced. It shouldn't put everyone in bucket 0, right? Then that's a useless hash function.

264
00:25:37,200 --> 00:25:47,200
And it depends on the size of the hash table. Right? If I have maybe, you know, a thousand people that I'm storing in 15 buckets, I'm going to have a lot of collisions. Right?

265
00:25:47,200 --> 00:25:57,200
But if I'm only storing these four, or maybe, you know, eight or ten, or something smaller than the size of my table, then there will be far fewer collisions. It'll be more nicely balanced.

266
00:25:57,200 --> 00:26:18,200
Oh, theta of n for the things in 0, yes. And that's fine, because usually what we care about is theta of the length of the input, right? So in this case, it's theta of, if I have four students in my class, right? I've got only two that, that mapped to 0.

267
00:26:18,200 --> 00:26:31,200
So here, it's, you know, length over 2. But if I had more students, then it would be far fewer, right? It would be 2 out of 10, or maybe 2 out of 15, that hash to the same thing. Yeah.

268
00:26:31,200 --> 00:26:46,200
So, yeah, so as the question said, what makes a good hash table and hash function pair? Right? Because this only works if you have a really good hash function and a nice hash table to go along with it.

269
00:26:46,200 --> 00:26:58,200
So this is actually a problem in computer science, you know, a research problem all by itself. So people actually study this for their lives, coming up with good hash functions and hash tables.

270
00:26:58,200 --> 00:27:14,200
So some, some base rules, you want to have the domain of interest. So in this particular case, you know, a tuple or a string or whatever it is, map to integers between 0 and the size of the hash table.

271
00:27:14,200 --> 00:27:31,200
So in the previous example, we don't want to have a hash function that mods 2. Because then everything will either hash to 0 or 1. Right? If our hash table has 15 things, well, we better make sure that our hash function is going to give us a number between 0 and 15.

272
00:27:32,200 --> 00:27:44,200
Second, you want the hash value to be fully determined by the value being hashed. So in this case, we don't want any sort of randomness to go on.

273
00:27:45,200 --> 00:27:58,200
For the reason that, well, if I want to look up Eves grade later on in, you know, in the code or whatever, then I need to run the exact same hash function on her name to determine the grade.

274
00:27:58,200 --> 00:28:13,200
So if there's randomness involved in this hash function, then you might not get back the same value that it has to originally. Right? So you'll be looking in the wrong bucket and you'll, you know, incorrectly say she doesn't have a value or she's not there.

275
00:28:15,200 --> 00:28:23,200
Third, you want to use the whole input to hash the function, she used the whole input to run the hash function.

276
00:28:24,200 --> 00:28:38,200
So again, in this example, we don't just want to use the first letters of people's names because then that will lead to a lot more collisions than if we use the entire, you know, the sum of all the letters in the alphabet or all the letters in their name. Right?

277
00:28:39,200 --> 00:29:01,200
Okay, so those are really big ideas and then what we want out of our hash function is all the values. Right? If you run this hash function on a bunch of different inputs for your storing names or your storing, I don't know, two bowls or whatever you're storing, you want this function to give you a nice uniform distribution of values. Right?

278
00:29:01,200 --> 00:29:16,200
So in our hash table previously here, if I add more names to my hash table, I want to ensure that they're going to land in buckets, you know, two, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen. I don't want everything to hash to the number zero. Right? That would be very bad.

279
00:29:18,200 --> 00:29:30,200
So as a side reminder, back in the lecture on dictionaries, I actually said something like, for now, think of the objects that can be found in the library.

280
00:29:31,200 --> 00:29:51,200
It can be keys to a dictionary as immutable objects. Right? And I said technically hashable, but we don't need to know what that is. Well, hashable means just this. You can run a hash function on the object and you'll get the same value back no matter how many times you run the hash function on that object. Right?

281
00:29:51,200 --> 00:30:13,200
So we looked at this example. What happens if we add a student whose name is not immutable, not hashable? So lists are mutable objects. So as such, they are not hashable. That means if we run a hash function on a list today, and then we potentially mutate the list, tomorrow, that list will not hash to the same thing. Right?

282
00:30:13,200 --> 00:30:36,200
So we saw this example. Let's say Kate with a K is added to our hash table. So her name currently hashes to 37 mod 16, which is a five. Right? So we added her there. Now let's say, you know, tomorrow we want to look up her grades to do whatever to integrate it into a bigger spreadsheet. She had changed her name between yesterday and today.

283
00:30:36,200 --> 00:30:57,200
Now she's Kate with a C. If we run the same hash function again on her name, that leads us to look in a different bucket. Right? She's still there. She's Kate with a K as we had originally added her. But now her name is Kate with a C. We run the same hash function tells us to look bucket 13 and she's not there. Right?

284
00:30:57,200 --> 00:31:10,200
So that's why we only want a hashable object to be added to be keys to the dictionary because we want the same value to come back to us when we run the hash function on. Right?

285
00:31:10,200 --> 00:31:39,200
Okay, so now we can see in the worst case scenario, everything maps to the same bucket in my hash table, my list. Right? Every single thing I add is it has a really bad hash function on it. Let's say the hash function always returns three. Right? If my hash function always returns three no matter what I'm adding to my addiction, no matter what I'm hashing, then every single item essentially gets put in a red.

286
00:31:40,200 --> 00:32:06,200
So it's a really long list at bucket number three. So when I look up a value, we'll surprise it hashes to three and now I need to look through every single thing in that bucket number three to find the one I'm looking for. Right? So it's just very, very bad. And in the worst case scenario, this is the complexity. It's theta event where N is the length of whatever items we have that we're adding to our buckets to our hash table.

287
00:32:06,200 --> 00:32:31,200
So in the average case, and this is only when we have a hash table that's pretty big relative to the things that we're adding to it. And when we have a hash function that's good enough, right? That has a nice uniform distribution of values only in that case in the average in the average case, the time it takes for us to grab a value from a dictionary is theta of one constant.

288
00:32:31,200 --> 00:32:46,200
And so that's why dictionaries are really, really useful data structures to store things and to retrieve things from back in back when I was doing a little project. I didn't know about Python dictionaries. I just learned about the language.

289
00:32:46,200 --> 00:32:58,200
And I was actually using lists to read in genomic data files. And I was storing everything in lists like genomic names and things like that. And it was really slow.

290
00:32:58,200 --> 00:33:15,200
And I was like, my advisor would be like, is the code done yet? I'm like, no, it's been a couple days still waiting. And then someone told me, hey, just use a dictionary to store the values. And then the lookup is going to be a lot faster. It was done within a couple of seconds.

291
00:33:15,200 --> 00:33:34,200
So very, very useful, the time complex, because it's genomic data. It's huge amounts of data. So the theta van versus theta of one is really, it makes a really big difference when you deal with large data sets. Right. It's not just paper. It's actually makes a big difference.

292
00:33:34,200 --> 00:33:43,200
Questions about this. I hope this ties in. Yeah. So, Python uses a specific hash function. Yeah.

293
00:33:43,200 --> 00:33:49,200
Python has things already. I can't think change that function enough. It would change. Or is it?

294
00:33:49,200 --> 00:34:01,200
So you don't. Yeah. So Python right now uses specific hash function in a future version. They might use a different hash function. We don't really use the numbers associated with the hash functions. I mean, you could for your programs.

295
00:34:01,200 --> 00:34:14,199
But it would be, I guess, relative to whatever value you get. Right. So you wouldn't kind of hard code the value for, you know, the, the two, one, two, three as something. Right. You just get what you get.

296
00:34:14,199 --> 00:34:24,199
And, and that's what it is. Right. But it could give you a different hash function. If you ran out of your computer, actually, you might get a different hash value than mine.

297
00:34:24,199 --> 00:34:38,199
So this topic kind of ties in data structures. We've seen lists and dictionaries. Some of the behind the scenes look at how things are stored.

298
00:34:38,199 --> 00:34:48,199
Put a little complexity in there talking about algorithms and, and runtime. So it ties in a bunch of the topics that we've seen in this class. Really, really nicely.

299
00:34:48,199 --> 00:35:03,199
So one other thing that I'd like to now talk about is the idea of a simulation. And this hopefully is going to be a little bit more useful to you if you decide to take another computer science course or computation course in a different field.

300
00:35:03,199 --> 00:35:18,199
You know, whatever you'd like. Computation simulations are very useful tools in computer science. So it allows you to computationally describe the world. So if you see an event in the world, you can actually simulate it computationally.

301
00:35:18,199 --> 00:35:29,199
What you've learned so with what you've learned so far, you can totally simulate a whole bunch of things. And we're using randomness to simulate these events that you might see in the real world.

302
00:35:29,199 --> 00:35:44,199
So for example, you might have seen sort of the hurricane paths, right, when you see on the news or whatever, the most likely path, right, that a hurricane might take. But then they also have the little models that show, you know, other likely paths.

303
00:35:44,199 --> 00:35:52,199
They simulated, right, using a bunch of data that they have the most likely path for that hurricane, right.

304
00:35:52,199 --> 00:36:14,199
Another place where simulation is useful is if you see a real world event that's actually kind of complex, you can take a simpler set of rules and simulate those and then add in more rules, you know, to make it closer and closer to the thing that you actually observe in the real world.

305
00:36:14,199 --> 00:36:21,199
So the idea of a simulation is that you have some event in the real world and you want to calculate something about it.

306
00:36:21,199 --> 00:36:28,199
We're going to use a computation to design an experiment, right, and we're going to use randomness for that.

307
00:36:28,199 --> 00:36:40,199
Once we've done that, we're going to repeat the experiment a whole bunch of times computationally. And that just means we're going to put a for loop around whatever experiment we've designed computationally.

308
00:36:40,199 --> 00:36:52,199
And if you're interested in some outcome, some particular outcome, like as we're going to see, we're going to roll a die, and we're interested in how many times, you know, a four comes up, then we're going to keep track of that outcome.

309
00:36:52,199 --> 00:37:07,199
And you keep track of it however many times that outcome happened in your whole bunch of repetitions, and then after the end of the repetitions, you can report some value of interest, maybe the probability that a four comes up on a diural.

310
00:37:07,199 --> 00:37:19,199
So here's the example. It's going to be very simple because it's something we can calculate already right off the bat, but it'll give you a sense of how you can write code around such a real world event.

311
00:37:19,199 --> 00:37:34,199
So here we're interested in just rolling a dice and seeing the probability to get a dot dot dot dot, right, to get a four on the dice, on one of the dice rolls, or the probability to get a dot, whichever.

312
00:37:35,199 --> 00:37:43,199
So here the event is that we're rolling a dice, and then we're interested in getting the probability of some face.

313
00:37:43,199 --> 00:37:48,199
So we're going to design an experiment for that dice roll.

314
00:37:48,199 --> 00:38:03,199
And this is just one way to design the experiment. There are a whole other many, many other ways to design it. This is just one that I chose that felt illustrated most how we can take a real world example and put it into code.

315
00:38:03,199 --> 00:38:12,199
So a die has six faces. So what I have done here is I've created a list of each one of those faces.

316
00:38:12,199 --> 00:38:25,199
You could have used numbers as the elements in the list. In this case, I just used strings to be a little bit cuter or cuter, but whatever, however you'd like to represent each one of those die faces, here's a list of six things in it.

317
00:38:25,199 --> 00:38:33,199
And then I'm using this choice function from this random library, again, the random library, super duper useful library.

318
00:38:33,199 --> 00:38:38,199
Random dot choice will effectively select one of the elements in this list for me.

319
00:38:38,199 --> 00:38:47,199
So if I type in random dot choice in the console now, it might give me the dot dot. If I type it in right after, it might give me the dot dot dot dot, whatever.

320
00:38:47,199 --> 00:38:50,199
It's going to be random each time I run this function.

321
00:38:50,199 --> 00:38:57,199
But this line of code effectively simulates me taking a dice and rolling it.

322
00:38:57,199 --> 00:39:08,199
And then we can repeat this experiment a whole lot of times. If I'm taking a dice and rolling it, that's like what one or two seconds per roll.

323
00:39:08,199 --> 00:39:19,199
I don't think I have time to repeat that experiment 10,000 times. But with simulation with computation, with programming, we can simulate it 10,000 times, or a million times.

324
00:39:19,199 --> 00:39:26,199
And then just wait a couple seconds. So very, very useful application of programming.

325
00:39:26,199 --> 00:39:34,199
So how do you simulate this dice, or 10,000 times? Just slap a for loop around that line of code.

326
00:39:34,199 --> 00:39:42,199
So for some number in range, 10,000, that means I'm going to get this run this line of code 10,000 times.

327
00:39:42,199 --> 00:39:50,199
All of a sudden, I've just rolled a dice 10,000 times. As I'm doing so, I'm interested in the outcome of some event.

328
00:39:50,199 --> 00:39:54,199
So let's say how many times did a dot dot dot dot come up, right before?

329
00:39:54,199 --> 00:40:00,199
Well, each time in my for loop, I can keep track of the value of roll.

330
00:40:00,199 --> 00:40:08,199
If it was a four, increment a counter. If it was not a four, I don't care. Do nothing.

331
00:40:08,199 --> 00:40:13,199
So each time I have a counter that tells me how many times a four came up.

332
00:40:13,199 --> 00:40:21,199
And then after the for loop is done, I've repeated my experiment 10,000 times, and I can report the probability to get a four, right?

333
00:40:21,199 --> 00:40:25,199
So the counter divided by 10,000.

334
00:40:25,199 --> 00:40:30,199
So this is the code. That's it. It's super simple.

335
00:40:30,199 --> 00:40:45,199
I wrote a function, and it actually takes it a parameter. So if we're interested in the probability for a dot dot dot dot to come up, then we pass in the value of that particular of that side.

336
00:40:45,199 --> 00:40:51,199
If I'm interested in the probability that a dot comes up, then I pass in the dot as a string.

337
00:40:51,199 --> 00:41:00,199
So what does it do? Well, just like in the previous slide, I've got this for loop here that tells Python how many times to repeat the experiment.

338
00:41:00,199 --> 00:41:06,199
I have the experiment number here as a variable, so I can easily just change it to be something else.

339
00:41:06,199 --> 00:41:15,199
And then I've got my role here. So this is me actually doing the experiment. So just here's me rolling the dice. Here's roll value.

340
00:41:15,199 --> 00:41:22,199
And then I check what the value of the role was and increment the counter if it was the side of interest, right? The thing I've passed in as a parameter.

341
00:41:22,199 --> 00:41:28,199
And then at the end, I just do a printed, but you could imagine doing a return or something like that.

342
00:41:28,199 --> 00:41:40,199
So if I run it, we're going to get the probability that the side dot came up was 0.167, and the probability that dot dot dot dot came up was 0.1602.

343
00:41:40,199 --> 00:41:53,199
Intuition says they should be the same, but you know what? That's our intuition, right? We already know the problem if we didn't know how to calculate the probability of one of these sides coming up.

344
00:41:53,199 --> 00:42:04,199
This would be pretty good, right? The beauty of computation is we can just add two more zeros on there, run it, right? And maybe uncomment it.

345
00:42:04,199 --> 00:42:15,199
So we actually see the values, run it, we wait a couple seconds, but now the probability is getting closer and closer to the true probability, right?

346
00:42:15,199 --> 00:42:30,199
So the more experiments I do, the better my answer becomes. And I just had to wait a couple seconds. If I increase it by 10 more, I would have to wait 10 more times, right? 10 times as long. So maybe 20 seconds. I'm not going to do it.

347
00:42:30,199 --> 00:42:45,199
So it's still a guesstimate, but it's a pretty close guesstimate. Now the other beauty of writing code is that we can now ask, well, this is a fair die, right? Every single one of these sides comes up with an equal probability.

348
00:42:45,199 --> 00:42:56,199
What do you guys think the change I should make to make an unfair die? Let's say it's weighted unfairly towards the dot, right?

349
00:42:56,199 --> 00:43:09,199
Yeah, exactly. Let me just add another dot here. Here. I've got another dot. And now the die is weighted unfairly, right? It comes up more times on the one than on anything else.

350
00:43:09,199 --> 00:43:17,199
So if I run the code again, wait a couple seconds, probability to get a one, twice as high as probability to get a four.

351
00:43:17,199 --> 00:43:31,199
So a really easy change. It helped me answer another question, a small variation of my original problem. And I didn't have to roll a dice 10,000 times in the real world.

352
00:43:31,199 --> 00:43:44,199
Okay. So that was really easy simulation, right? The probability of getting one die of calculating sides of dies coming up is pretty simple.

353
00:43:44,199 --> 00:43:52,199
So why did we bother with the code, right? Because we could just do it mathematically. The side question that I asked was also kind of simple to figure out.

354
00:43:52,199 --> 00:44:03,199
Because we can actually ask harder questions and harder variations of our original problem. We could certainly come up with mathematical solutions to these harder problems as well.

355
00:44:03,199 --> 00:44:19,199
But I wouldn't be as certain about the my answers to those as I would be just writing code for me, it was a little bit easier to debug code than it would be to answer to mathematically write probabilities to so much harder questions.

356
00:44:19,199 --> 00:44:32,199
And you can see once you've written the code, right, once you kind of framed your experiment in this way, it's really easy to just go ahead and change it a little bit, right? So the code is easy to change once it's written.

357
00:44:32,199 --> 00:44:42,199
So let's look at a new question. This one says, one experiment is no longer to just roll a die once.

358
00:44:42,199 --> 00:44:56,199
One experiment is now that we're rolling a die seven times. And I'm interested to know the probability to get the dot dot dot dot at least three times out of those seven rules.

359
00:44:56,199 --> 00:45:05,199
Much harder question, right, than before it would require a little bit of thinking, some paper, right, to figure out.

360
00:45:05,199 --> 00:45:25,199
But in terms of code, it's going to be really simple. So now one experiment is no longer just one choice from my list of dice faces, but it's going to be seven choices from my list of die faces, right, representing the seven roles that I have for one experiment.

361
00:45:25,199 --> 00:45:37,199
And out of those seven roles, what I'm interested to do is keeping track of, right, incrementing a counter whenever I see a four dot dot dot dot dot.

362
00:45:37,199 --> 00:45:49,199
And then just like before, slap a four loop around it, repeat that experiment 10,000 a million times, however many times you'd like. And then keep track of how many times that four came up.

363
00:45:49,199 --> 00:46:06,199
Three or more times out of the seven roles. So this is our event count how many times out of the 10,000 in that case, but it could be a million, whatever it is, the we incremented our counter to be more than three, more than or equal to three.

364
00:46:06,199 --> 00:46:16,199
And then our value of interest is the probability of that happening. So take that counter and divide by 10,000 because that's how many times we repeated our experiment.

365
00:46:16,199 --> 00:46:25,199
So this is the code slightly longer and I've actually divided it into two parts. This one up here and then this one down here.

366
00:46:25,199 --> 00:46:42,199
So the code up here is going to do the simulation 10,000 times. So I've got one for loop here that goes through 10,000 or a million, however many times you want to repeat the experiment.

367
00:46:43,199 --> 00:46:55,199
Within here, sorry, and I forgot to mention that here I have a function where I've kind of generalized a bunch of stuff so we could run it with different values instead of three times out of seven roles.

368
00:46:55,199 --> 00:47:00,199
We could have 15 times out of 3,000 roles. Right. So we can generalize this.

369
00:47:01,199 --> 00:47:12,199
So here inside this for loop, I've got the simulation of rolling seven times. Right. So here I've got range of n roles in the previous slide.

370
00:47:12,199 --> 00:47:27,199
I said it seven, but it could be anything you'd like. And then I've got choosing one of the faces seven times and keeping track of how many times out of those seven, I got a dot, dot, dot, dot.

371
00:47:28,199 --> 00:47:41,199
So at the end of this for loop here, I've counted how many times I got a dot, dot, dot, dot. And then I'm going to keep track of that number in this list how many matched.

372
00:47:41,199 --> 00:47:48,199
So how many matched will be a list of 10,000 elements, right? 10,000 elements.

373
00:47:49,199 --> 00:48:01,199
One element for each one of my experiments. So the first time maybe three dot, dot, dot, dot, dot came up out of seven then the next time one then the next time five then the next time four however many.

374
00:48:01,199 --> 00:48:07,199
So now I've got a list of how many times the dot, dot, dot, dot came up out of seven roles.

375
00:48:07,199 --> 00:48:12,199
So the code down here, that's why I split it up because it's a little bit easier for me to think about it.

376
00:48:13,199 --> 00:48:21,199
The code down here is now going to iterate through this list of 10,000 experiments and say which one of these is greater or equal to three.

377
00:48:21,199 --> 00:48:40,199
This one, this one, this one. So I'm incrementing a counter anytime that is true. And at the end of this loop down there, I'm going to know how many times out of those 10,000 trials I had three or more times out of seven come up on the dot, dot, dot, dot.

378
00:48:42,199 --> 00:48:56,199
So I can run the code and here I've got the exact problem on the previous slide. So if I'm interested in the probability of the four coming up at least three or more times out of seven roles, that's 0.0955.

379
00:48:56,199 --> 00:49:10,199
And then I also down here wrote it like this and this probability is 0.16. What is this problem down here? Is it look familiar?

380
00:49:10,199 --> 00:49:19,199
So the probability of dot, dot, dot, dot coming up at least once out of one role.

381
00:49:19,199 --> 00:49:27,199
That's just the previous problem, right, on the previous slide. I just have one role and I count the probability to get the four.

382
00:49:27,199 --> 00:49:40,199
So this matches what I got with the previous function that I wrote, but hey, now I wrote a better function that can actually that's more general and I can also run it to get the probability that I from the previous code, right.

383
00:49:40,199 --> 00:49:45,199
So this is actually a much better code to run.

384
00:49:45,199 --> 00:49:53,199
Questions about this. Interesting. I mean, it's dice rolls. How interesting can it be?

385
00:49:53,199 --> 00:50:01,199
So let's look at a more interesting problem, something that you might apply to the real world.

386
00:50:01,199 --> 00:50:08,199
So you might see this in a calculus course, might not, but it is more of a calculus problem.

387
00:50:08,199 --> 00:50:19,199
So I've got water that runs through a faucet at random, somewhere between one gallons per minute and three gallons per minute.

388
00:50:19,199 --> 00:50:31,199
This is the set up. What is the time it takes to fill the 600 gallon pool? Does anyone have an intuition for how we could solve this?

389
00:50:31,199 --> 00:50:38,199
If not, I can just click next. Yeah, definitely between the lowest rate and the highest rate, right.

390
00:50:38,199 --> 00:50:56,199
So between 200 gallons per minute, sorry, between 200 minutes and 600 minutes, right. 200 at best if the water flows at three gallon per minute and 600 minutes at worst if the water flows super slowly, one gallon per minute.

391
00:50:56,199 --> 00:51:04,199
So we could say, well, let's take the average of the flow, one, but the average between one and three gallons is two, right.

392
00:51:04,199 --> 00:51:11,199
So if we take 600 gallons divided by two gallons per minute, that would give us 300 minutes.

393
00:51:11,199 --> 00:51:15,199
It's a reasonable guess, but that's not actually the right answer.

394
00:51:15,199 --> 00:51:24,199
Another way we could say is, well, let's take the slowest and the fastest it could run, right. So it could take.

395
00:51:24,199 --> 00:51:33,199
So here I've got 600 minutes and 200 minutes and average those numbers out, right, divided by two. So that's 400 minutes.

396
00:51:33,199 --> 00:51:36,199
But that's actually not right either. Yeah.

397
00:51:36,199 --> 00:51:41,199
Can you take the other integral of system to produce and calculate that?

398
00:51:41,199 --> 00:51:48,199
You could, yeah, I don't want to do integrals though. Yeah, but that's exactly the right answer. Yeah, you have to do an integral.

399
00:51:48,199 --> 00:51:54,199
And yeah, we're teaching computer science here.

400
00:51:54,199 --> 00:52:00,199
So we're not going to do integrals in this class. Instead, we're going to do code.

401
00:52:00,199 --> 00:52:05,199
And the code is going to be like five lines to do the, to find the answer to this.

402
00:52:05,199 --> 00:52:12,199
So all we're going to do is grab a whole bunch of numbers between one and three, a million of them if you want.

403
00:52:12,199 --> 00:52:18,199
These will represent a bunch of random values you could have the water flow, right.

404
00:52:18,199 --> 00:52:26,199
And then we're going to say for each one of these numbers chosen at random, how long would it take to fill the pool?

405
00:52:26,199 --> 00:52:31,199
600 divided by that rate, right. Just just just how long it takes.

406
00:52:31,199 --> 00:52:35,199
And then we're going to average all of these rates, right.

407
00:52:35,199 --> 00:52:40,199
So we have a million of these numbers, potential times that it could take to fill the pool.

408
00:52:40,199 --> 00:52:44,199
Some of them all average them.

409
00:52:44,199 --> 00:52:51,199
This is the code. It looks like a lot, but down here, the bottom half of this is just us reporting the results.

410
00:52:51,199 --> 00:52:58,199
This is, you know, here's two print statements. And here I'm actually also plotting what the dots look like, right.

411
00:52:58,199 --> 00:53:00,199
All the flow rates.

412
00:53:00,199 --> 00:53:07,199
The actual code to do the simulation is these, okay, I lied, seven lines of code, not five.

413
00:53:07,199 --> 00:53:12,199
So I've got a function, fill pool. It can take in a science parameter.

414
00:53:12,199 --> 00:53:16,199
We could even do a lower range and not a per range if we wanted to for the flow rate.

415
00:53:16,199 --> 00:53:19,199
For now, we'll just hard code it to be between one and three.

416
00:53:19,199 --> 00:53:24,199
I've got two lists that I'm going to populate with a bunch of different random numbers.

417
00:53:24,199 --> 00:53:28,199
So the flow rate will be chosen between one and three.

418
00:53:28,199 --> 00:53:39,199
So here I've got random dot random is another useful random function from the random library that gives me a number between zero and one.

419
00:53:39,199 --> 00:53:46,199
So to get a number between one and three at random, I'll just multiply by two and add one, right.

420
00:53:46,199 --> 00:53:52,199
So bottom case, it'll be one. Top case will be two times one plus one, three.

421
00:53:52,199 --> 00:53:57,199
Right. So R, all we need to know will be a random number between one and three, a float, right.

422
00:53:57,199 --> 00:53:59,199
So it could be anything.

423
00:53:59,199 --> 00:54:03,199
A pen that random number to our list of flow rates.

424
00:54:03,199 --> 00:54:12,199
And then using that flow rate that we just randomly chose, figure out how long it takes to fill the pool size, the pool of size size.

425
00:54:12,199 --> 00:54:16,199
So size divided by the rate, right.

426
00:54:16,199 --> 00:54:17,199
Just very simple math.

427
00:54:17,199 --> 00:54:25,199
And then we now have a list that's populated with all of these times that it takes to fill the pool.

428
00:54:25,199 --> 00:54:30,199
And that's the stuff inside the loop, the for loop here is one experiment, right.

429
00:54:30,199 --> 00:54:34,199
So I grabbed one random number. I figured out how long it takes for me to fill my pool.

430
00:54:34,199 --> 00:54:38,199
And then I repeated that 10,000 times.

431
00:54:38,199 --> 00:54:46,199
Okay. So down here, I'm going to report the average flow rate, which should be two, right.

432
00:54:46,199 --> 00:54:53,199
Because if we're choosing a random number between one and three, the average of those numbers better be two.

433
00:54:53,199 --> 00:54:58,199
And then I'm reporting the thing that we're actually interested in, which is the average fill time, right.

434
00:54:58,199 --> 00:55:03,199
Which was not either of those two things we had the intuition for, but it is the integral.

435
00:55:03,199 --> 00:55:05,199
And down here, I'm doing some plots.

436
00:55:05,199 --> 00:55:07,199
So these are the things that I've plotted.

437
00:55:07,199 --> 00:55:14,199
So on the left side, I've got, on the x-axis apologies, I forgot to label my axes and put a title on this.

438
00:55:14,199 --> 00:55:16,199
So I'm just going to talk about it.

439
00:55:16,199 --> 00:55:28,199
So the x-axis is number zero through 10,000 representing each, basically, like, you know, zero, one, two, three, four, represents one of my experiments, right, choosing a random number.

440
00:55:28,199 --> 00:55:32,199
And the y-axis is the random number that was chosen, right.

441
00:55:32,199 --> 00:55:39,199
So this is, looks like a nice smattering of randomness here, which is what we wanted.

442
00:55:39,199 --> 00:55:47,199
And then for each one of these values, I'm going to have a corresponding fill rate, right.

443
00:55:47,199 --> 00:55:55,199
So for example, here, if at point zero, the fill rate happened to be one, right.

444
00:55:55,199 --> 00:56:01,199
Then that means a time it took for me to fill the pool should be up there at about 600, right.

445
00:56:01,199 --> 00:56:04,199
It could be that little point right there.

446
00:56:04,199 --> 00:56:05,199
Okay.

447
00:56:05,199 --> 00:56:10,199
So this is a graph of random numbers between one and three, 10,000 of the chosen.

448
00:56:10,199 --> 00:56:17,199
And this is the graph of the corresponding times it took for me to fill the pool with each one of these dots that we randomly chose.

449
00:56:17,199 --> 00:56:25,199
We notice that the plot on the right is not uniformly scattered, right.

450
00:56:25,199 --> 00:56:32,199
In fact, it's more kind of densely populated down towards the bottom.

451
00:56:32,199 --> 00:56:35,199
All right.

452
00:56:35,199 --> 00:56:43,199
So our two guesses were that the fill rate was either 300 or 400 on average, right.

453
00:56:43,199 --> 00:56:46,199
And neither of those were right.

454
00:56:46,199 --> 00:56:49,199
Let's view these graphs in a slightly different way.

455
00:56:49,199 --> 00:56:51,199
I'm actually going to sort the values.

456
00:56:51,199 --> 00:56:58,199
So right now, right, it was just a random number gotten between one and three.

457
00:56:58,199 --> 00:56:59,199
But I can sort them.

458
00:56:59,199 --> 00:57:02,199
It doesn't matter the order that I got these random numbers.

459
00:57:02,199 --> 00:57:03,199
I can sort them.

460
00:57:03,199 --> 00:57:06,199
And if I sort them, I get something that looks like this.

461
00:57:06,199 --> 00:57:10,199
So again, I've got randomly chosen numbers, 10,000 of them.

462
00:57:10,199 --> 00:57:13,199
And with equal probability, right.

463
00:57:13,199 --> 00:57:15,199
That's why we see this nice line.

464
00:57:15,199 --> 00:57:19,199
I chose a number between one and three.

465
00:57:19,199 --> 00:57:21,199
Does that make sense?

466
00:57:21,199 --> 00:57:22,199
Okay.

467
00:57:22,199 --> 00:57:35,199
And so then the corresponding time it took for me to fill my pool for each one of these numbers, right, is a number between 200 and 600 as we had guessed.

468
00:57:35,199 --> 00:57:42,199
Now, the average of the time it takes of the fill rate is two, which is true, right.

469
00:57:42,199 --> 00:57:47,199
That is not a surprise for us, because it's a random number between one and three.

470
00:57:47,199 --> 00:57:52,199
But the actual average time it takes to fill my pool is down here.

471
00:57:52,199 --> 00:57:57,199
If I were to average every single one of these values, it's down here at around 330.

472
00:57:57,199 --> 00:57:59,199
So it's not 300.

473
00:57:59,199 --> 00:58:00,199
It's not 400.

474
00:58:00,199 --> 00:58:02,199
It's definitely between, you know, between those two.

475
00:58:02,199 --> 00:58:05,199
But it's not really close to one or the other.

476
00:58:05,199 --> 00:58:10,199
That's because I've got more points kind of densely populated down towards the bottom than the top.

477
00:58:10,199 --> 00:58:11,199
Okay.

478
00:58:11,199 --> 00:58:17,199
So the actual values that I got for 10,000 different randomly chosen numbers is 331.

479
00:58:17,199 --> 00:58:23,199
I think the actual value, if we do the integral, is like 329 point something rather.

480
00:58:23,199 --> 00:58:25,199
So we're pretty close.

481
00:58:25,199 --> 00:58:27,199
But then again, we only did 10,000.

482
00:58:27,199 --> 00:58:30,199
We could do a million and we would get pretty close to the actual value.

483
00:58:30,199 --> 00:58:31,199
Right.

484
00:58:31,199 --> 00:58:33,199
So it's not 300 or 400.

485
00:58:34,199 --> 00:58:43,199
And that's because, as was mentioned from one of your fellow students, there is an inverse relationship between the fill time.

486
00:58:43,199 --> 00:58:44,199
Right.

487
00:58:44,199 --> 00:58:46,199
And the pool rate.

488
00:58:46,199 --> 00:58:47,199
Right.

489
00:58:47,199 --> 00:58:49,199
It's the size of the pool divided by the rate.

490
00:58:49,199 --> 00:59:00,199
So what we actually need to do, if we wanted to figure out the value, is to solve the integral between one and three of, you know, dx over x, whatever that would be.

491
00:59:00,199 --> 00:59:02,199
Right.

492
00:59:02,199 --> 00:59:04,199
So I don't want to bother with that.

493
00:59:04,199 --> 00:59:06,199
But I will bother with several lines of code.

494
00:59:06,199 --> 00:59:17,199
And then just wait, you know, wait five seconds for that code to repeat, you know, five million times or a million times or 10 million times.

495
00:59:17,199 --> 00:59:20,199
Is that cool?

496
00:59:20,199 --> 00:59:22,199
And this is totally within your reach, right?

497
00:59:22,199 --> 00:59:24,199
It's not hard code to do.

498
00:59:24,199 --> 00:59:26,199
It's just four loops.

499
00:59:26,199 --> 00:59:36,199
It's using a random library, right, to just randomly grab a whole bunch of numbers and then just knowing the problem at hand, filling a pool, you know, at a certain rate, simple math.

500
00:59:36,199 --> 00:59:44,199
And then you get a nice, a nice answer, a nice approximation, but still an answer to the question.

501
00:59:44,199 --> 00:59:47,199
So hopefully this shows you how powerful computation can be.

502
00:59:47,199 --> 00:59:54,199
This is just another example of how you can just apply computation, programming to a problem that you see in real life.

503
00:59:54,199 --> 01:00:09,199
If you choose to do like a, you know, a Europe or take future courses in, you know, a different field, maybe not in CS, you will probably apply computation to concepts and ideas and problems in those fields.

504
01:00:09,199 --> 01:00:11,199
And it'll be something similar to this.

505
01:00:11,199 --> 01:00:12,199
You observe something.

506
01:00:12,199 --> 01:00:23,199
You try to think of it computationally, model it with a bunch of, you know, randomness and then calculate an idea, something of interest.

507
01:00:23,199 --> 01:00:34,199
Okay. So that's the end of 600 L. I've got a little wrap up to remind ourselves where we've been and where we will go.

508
01:00:34,199 --> 01:00:36,199
So what did we learn?

509
01:00:36,199 --> 01:00:43,199
Oh, also this is also these slides will be kind of like a meme dump of every remaining meme that I have.

510
01:00:43,199 --> 01:00:46,199
Okay, so this is going to be very meme happy.

511
01:00:46,199 --> 01:00:48,199
Okay, so what did we learn?

512
01:00:48,199 --> 01:00:52,199
We got, of course, we learned Python programming, right?

513
01:00:52,199 --> 01:00:55,199
We learned a lot of Python syntax.

514
01:00:55,199 --> 01:01:01,199
Some lectures were heavier on Python syntax than others, but hopefully you've got a handle on that.

515
01:01:01,199 --> 01:01:04,199
We learned, of course, flow of control, right?

516
01:01:04,199 --> 01:01:11,199
With branches, if statements, L is, L, sorry, helllifts, L statements, right?

517
01:01:11,199 --> 01:01:23,199
So we're going to have to do something else to either do one thing or another in the code, make a decision point, loops, for loops and while loops as well as exceptions, as a way for us to deal with unexpected things coming up in the course.

518
01:01:23,199 --> 01:01:29,199
The ideas here, flow of control, are actually transferable to any other programming language.

519
01:01:29,199 --> 01:01:40,199
So, you know, if you know the ideas, if you have the intuition for what kind of flow of control you'd like to use, all you'd have to do is change the syntax and then suddenly you can write some code in another language.

520
01:01:40,199 --> 01:01:51,199
Of course, we learned about data structures. So we did lists, right? Really useful data structures, dictionaries, super useful data structures, tuples, things like that.

521
01:01:51,199 --> 01:01:57,199
So you can learn about more advanced data structures in a future course, if you'd like.

522
01:01:57,199 --> 01:02:03,199
But those are really the top, you know, two or three most useful data structures.

523
01:02:03,199 --> 01:02:12,199
We talked a lot, actually it was a common, we didn't talk a lot specifically, but it was a common theme in this class organization of code, right?

524
01:02:12,199 --> 01:02:19,199
So these ideas of decomposition and abstraction, they came up a lot when we talked about functions, that's our first introduction.

525
01:02:19,199 --> 01:02:29,199
So functions helped us take some functional piece of code, like some code that does something abstracted away into a nice little module, right?

526
01:02:29,199 --> 01:02:42,199
You have to compose it into one little module, you have to write it one, maybe write it a few times, but debug it a few times, and then use it a whole bunch of times, you know, without worrying that it's going to change.

527
01:02:42,199 --> 01:02:46,199
So it's just a very nice way for us to decompose functional pieces of code.

528
01:02:46,199 --> 01:02:51,199
And then we saw it come up again when we did classes, object-oriented programming, right?

529
01:02:51,199 --> 01:02:57,199
So we were able to bundle behaviors and data together into one nice little object, right?

530
01:02:57,199 --> 01:03:05,199
That we could then create many of in many different parts of the code and then manipulate individually.

531
01:03:05,199 --> 01:03:08,199
Another common theme throughout this class was algorithms.

532
01:03:08,199 --> 01:03:14,199
So we talked about bisection search algorithm way at the beginning of the lectures, right?

533
01:03:14,199 --> 01:03:23,199
We talked about it in piece at one, and it came up again towards the end when we talked about complexity and searching and sorting algorithms, things like that.

534
01:03:23,199 --> 01:03:37,199
So that was kind of your only big algorithm that you saw in this class, but it shows you just how you can implement, you know, some code in a completely different way to behave in a completely different way, right?

535
01:03:37,199 --> 01:03:42,199
So it's going to be a lot faster, you know, with some conditions like being sorted and things like that.

536
01:03:42,199 --> 01:03:46,199
And then lastly, the last part of the class was a little bit more theory-heavy.

537
01:03:46,199 --> 01:03:51,199
We talked about computational complexity and that big theta notation.

538
01:03:51,199 --> 01:03:56,199
So that gave you a sense of how to maybe design algorithms, right?

539
01:03:56,199 --> 01:04:06,199
So if you have a first crack of pseudo code on piece of paper, you can see, well, if I need to run this code on a really large data set, it's not going to work because it's too slow.

540
01:04:06,199 --> 01:04:09,199
So you've got three nested loops or something like that.

541
01:04:09,199 --> 01:04:16,199
So it might force you to rethink the design of the algorithm sooner than, you know, having already implemented it.

542
01:04:16,199 --> 01:04:24,199
But, you know, if you're dealing with small data sets, maybe you wouldn't care that you've got three nested four loops or, you know, a really inefficient recursion algorithm.

543
01:04:24,199 --> 01:04:29,199
So that's, those are the big things that we learned in this class.

544
01:04:29,199 --> 01:04:34,199
Your experience, I kind of categorized in three different ways.

545
01:04:34,199 --> 01:04:41,199
So you might have been a natural if you kind of joined this class and immediately got logic, immediately learned, you know, knew how to do the problem sets.

546
01:04:41,199 --> 01:04:47,199
That's totally fine. I still hope you got something out of this class and you learned some, some, something.

547
01:04:47,199 --> 01:04:58,199
You might have joined the class late, right? If you found 6108 to be too fast or too challenging, you might have joined it, joined it late,

548
01:04:58,199 --> 01:05:02,199
it to the curb and said, let me join 100L. I welcomed you.

549
01:05:02,199 --> 01:05:08,199
We did a little bit of research and found that even if you join late, it does not actually hinder your performance in the class.

550
01:05:08,199 --> 01:05:12,199
So hopefully that was your experience.

551
01:05:12,199 --> 01:05:18,199
Did you work hard? So maybe you didn't get all the concepts right away. Maybe you struggled a little bit with the problem sets.

552
01:05:18,199 --> 01:05:21,199
Maybe you struggled a little bit on the pieces or on the quizzes.

553
01:05:21,199 --> 01:05:31,199
But I still think that you learned a lot and the test is always to go back and look at the first problem set.

554
01:05:31,199 --> 01:05:38,199
So if you do that when you go home tonight, you look back at the first problem set in this class, you look back at the code that you wrote.

555
01:05:38,199 --> 01:05:42,199
It will seem so easy. I promise you this.

556
01:05:42,199 --> 01:05:50,199
And that's because I think you all did such a good job. You tried your hardest in this class. I know it's not easy.

557
01:05:50,199 --> 01:05:56,199
I know it's slower paste, but it's still not an easy class. And I think you've learned a lot.

558
01:05:56,199 --> 01:06:01,199
Looking back at the first problem set, we'll just show you that for sure.

559
01:06:01,199 --> 01:06:12,199
So what's next? There have been some questions about what are some future classes that you might want to take or what can you do once you've, you know, once you've finished here.

560
01:06:12,199 --> 01:06:19,199
Here we go. So we've got six 100 B is kind of the most natural next step.

561
01:06:19,199 --> 01:06:25,199
It's a half semester class in the second half of the semester. So they're finishing up right now basically.

562
01:06:25,199 --> 01:06:32,199
It's an overview of really interesting topics in computer science and with a focus on data science though.

563
01:06:32,199 --> 01:06:36,199
So what we talk of and I actually run that class as well.

564
01:06:36,199 --> 01:06:49,199
So what we talk about there is optimization algorithms. So for example, let's say you want to create a schedule for your classes next semester and you will have some constraints.

565
01:06:49,199 --> 01:06:53,199
Right. Like you don't want to have classes at 8 a.m. or 10 a.m. or 11 a.m.

566
01:06:53,199 --> 01:06:57,199
And you want it to all be within, you know, some time limit or things like that.

567
01:06:57,199 --> 01:07:03,199
Optimization algorithm could be something that you write and you could just apply it to something that you have.

568
01:07:03,199 --> 01:07:10,199
Simulations. Exactly what we saw today of the, you know, the physics filling the pool thing.

569
01:07:10,199 --> 01:07:17,199
You'll see more examples of that and ask different questions about it as well.

570
01:07:17,199 --> 01:07:23,199
So you'll see things like, you calculate, you know, things like standard deviations.

571
01:07:23,199 --> 01:07:30,199
How many times do we need to repeat this experiment in order to be within some confidence interval? Right. So how confident are you about your answers?

572
01:07:30,199 --> 01:07:35,199
So we'll be doing more things like that. And then there's of course the machine learning aspect of it.

573
01:07:35,199 --> 01:07:42,199
So if you have a bunch of experiments that you do that you get a whole bunch of data from.

574
01:07:42,199 --> 01:07:49,199
How can you fit a curve to those experiments and then you know, for a future experiment, what's the expected value? Right.

575
01:07:49,199 --> 01:07:53,199
So that's a little bit of machine learning on experimental data.

576
01:07:53,199 --> 01:08:04,199
And then some more machine learning in sort of a more classical sense is dealing with clustering algorithms and classification of data and things like that.

577
01:08:04,199 --> 01:08:13,199
So 600, 100 B I know a lot about because I also teach it. It's a really good next class if you want to kind of be employable for an internship.

578
01:08:13,199 --> 01:08:16,199
If you take this, I think you'll be good to go.

579
01:08:16,199 --> 01:08:23,199
6101 is also a really nice class to take next if you really enjoyed the programming in this class.

580
01:08:23,199 --> 01:08:29,199
6101 will be your next step. It's called fundamentals of programming and it isn't Python.

581
01:08:29,199 --> 01:08:37,199
That one has, it's pretty fast pace. So there will be problem sets every week and they're going to be pretty hardcore.

582
01:08:37,199 --> 01:08:42,199
There's going to be a lot of debugging involved in those problem sets.

583
01:08:42,199 --> 01:08:55,199
And I actually was a recitation instructor for that class. And to get a first for the problem sets at least to get something working doesn't take that long.

584
01:08:55,199 --> 01:09:02,199
But to make it work according to the specifications that they have will take a little bit of debugging and reworking.

585
01:09:02,199 --> 01:09:09,199
That's because they deal with a lot of real world data. So writing code that's really efficient is very important.

586
01:09:09,199 --> 01:09:26,199
So again, writing nested for loops, of course, we can totally do that. But making it efficient using data structures like sets to make the code efficient using proper algorithms that are efficient is a very important part of this class.

587
01:09:26,199 --> 01:09:36,199
But you learn a lot. If you take this class, you'll be very employable for an internship in some computer science company.

588
01:09:36,199 --> 01:09:46,199
6102 is also a nice next class. If you're interested in software construction, it is actually in a different language. It's in TypeScript these days.

589
01:09:46,199 --> 01:09:55,199
It used to be in Java. You can take what you've learned here. And if you're interested in learning a different language, this is a nice one to try.

590
01:09:55,199 --> 01:10:06,199
It's their motto is you're writing code that is safe from bugs easy to understand and ready for change. So they have also lots of problem sets, but you're also working in a team.

591
01:10:06,199 --> 01:10:19,199
So you get to learn how to work in a team well with other students, how to code together, how to write code that has nice documentation, lots of debugging, things like that.

592
01:10:19,199 --> 01:10:29,199
So more of that, those ideas of decomposition abstraction that we learned in this class will definitely be prominent in this class in 6102.

593
01:10:29,199 --> 01:10:46,199
And then of course, we've got other classes I'm happy to chat about. So machine learning is a nice one. If again, if you have a handle on programming really well and want to try some, just applying programming to machine learning.

594
01:10:46,199 --> 01:11:01,199
An algorithms class is also a fine next step if you're more interested in the complexity part of this class that we saw. Also very, very reasonable things to try to do next to this class.

595
01:11:02,199 --> 01:11:11,199
Yes, last slide. If you're not going to code for a while, but think you might code in a couple semesters or something like that.

596
01:11:11,199 --> 01:11:21,199
Like, you know, you want to take a more computational class in some desired field. I would say that you should try to practice coding at least once a week.

597
01:11:22,199 --> 01:11:30,199
So in our website, we've got a little help menu where you can go to the, we've listed some other websites. There's a little bit of coding practice you can do.

598
01:11:30,199 --> 01:11:39,199
It doesn't need to be a lot. 30 minutes, you know, once a week, something like that. Just so you don't forget to code can go a really long way.

599
01:11:39,199 --> 01:11:46,199
Because I know, you know, over the summer, sometimes I don't code for a month or so because I do other stuff besides coding in my life.

600
01:11:47,199 --> 01:11:57,199
And, you know, coming back into it takes a little bit of time. And it's just without practice like with anything else, it's just easy to forget and it's hard to get back into it.

601
01:11:57,199 --> 01:12:04,199
So even if you just do a little bit of coding, write a really simple program once a week, it's going to go a long way.

602
01:12:04,199 --> 01:12:13,199
Right. So that's it. I want to thank you all for being in this class and thank you for coming to this last lecture. I know you didn't have to, but I do appreciate it.

603
01:12:13,199 --> 01:12:19,199
Happy coding and, you know, good luck with exams and have a good break, everyone. Thank you.

