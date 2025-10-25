---
title: MIT6100 P14P14Dictionaries
---

1
00:00:00,000 --> 00:00:13,339
All right, everyone.

2
00:00:13,339 --> 00:00:15,040
Let's get started.

3
00:00:15,040 --> 00:00:18,440
So today's lecture will be on this thing called dictionaries.

4
00:00:18,440 --> 00:00:22,640
And it's not the dictionaries that our parents and grandparents used.

5
00:00:22,640 --> 00:00:29,640
Notice I never actually used regular book dictionaries either, maybe once in my entire life.

6
00:00:29,640 --> 00:00:32,119
But it's actually on a Python dictionary.

7
00:00:32,119 --> 00:00:37,079
So this is going to be a new data type that we have not worked with before.

8
00:00:37,079 --> 00:00:41,799
But it'll be a compound data type much like we've seen lists and tuples to be.

9
00:00:41,799 --> 00:00:46,039
It's just going to be very different than lists and tuples.

10
00:00:46,039 --> 00:00:53,480
So before I introduce a bunch of syntax and what a Python dictionary is,

11
00:00:53,480 --> 00:00:58,280
let's try to just motivate the need for such a data structure.

12
00:00:58,280 --> 00:01:00,840
So suppose we have the following problem.

13
00:01:00,840 --> 00:01:04,439
We've been dealing with this problem in many of our lectures.

14
00:01:04,439 --> 00:01:09,200
But we once again want to store student information.

15
00:01:09,200 --> 00:01:15,680
So let's say we want to store great information for a bunch of students.

16
00:01:15,680 --> 00:01:20,520
With what we know so far, we can store information using lists.

17
00:01:20,520 --> 00:01:25,280
It's a very reasonable data structure to use because we might get new students in the class.

18
00:01:25,280 --> 00:01:27,879
Students might drop, grades might change, things like that.

19
00:01:27,879 --> 00:01:31,479
So let's use this mutable data structure list.

20
00:01:31,479 --> 00:01:36,840
Let's say we want to store names of students and their grades in the class,

21
00:01:36,840 --> 00:01:38,319
like their final letter grade.

22
00:01:38,319 --> 00:01:42,640
Additionally, we can store things like micro quiz grades and p-sets grades.

23
00:01:42,640 --> 00:01:46,519
But for now, let's just assume we're storing just the names and the final grades in the class.

24
00:01:46,519 --> 00:01:51,759
So if we do this using lists, one reasonable way to store this information is by saying,

25
00:01:51,759 --> 00:01:55,280
well, I'm going to have a list of all the names of the students in my class.

26
00:01:55,280 --> 00:01:58,760
I'm going to have a list of all the grades of these students in the class.

27
00:01:58,760 --> 00:02:04,799
And I'm basically going to go index by index and make the rule that says,

28
00:02:04,799 --> 00:02:09,159
at a particular index, I'm storing all the information related to this one person.

29
00:02:09,159 --> 00:02:11,000
So I have index zero here.

30
00:02:11,000 --> 00:02:14,240
I'm storing the name of the student and their grade.

31
00:02:14,240 --> 00:02:18,639
At index one, I'm storing the name of that student, John, and their grade.

32
00:02:18,639 --> 00:02:22,000
At index two, I'm storing the name of that student and their grade.

33
00:02:22,000 --> 00:02:24,240
And at index three and so on and so on.

34
00:02:24,240 --> 00:02:28,320
So I now basically have to remember that for a particular index,

35
00:02:28,320 --> 00:02:34,200
I am storing all the information related to that student.

36
00:02:34,200 --> 00:02:39,040
Okay, so seems like a reasonable way to do this.

37
00:02:39,040 --> 00:02:44,200
Now let's say that I want it to look up the grade for a particular student.

38
00:02:44,200 --> 00:02:48,280
So I write this function called get grade.

39
00:02:48,280 --> 00:02:49,719
It takes in some parameters.

40
00:02:49,719 --> 00:02:52,680
So the first thing it'll take in is the name of the student.

41
00:02:52,680 --> 00:02:58,159
So Anna, for example, and I would pass in the list of all the names in my class

42
00:02:58,159 --> 00:02:59,960
and the list of all the grades in the class.

43
00:02:59,960 --> 00:03:03,520
So these are these two lists that I've previously created.

44
00:03:03,520 --> 00:03:05,920
So these get passed in to this function.

45
00:03:05,920 --> 00:03:08,599
So you can imagine if we have a list of everybody at MIT,

46
00:03:08,599 --> 00:03:13,159
these lists are going to be pretty large that we're passing in as parameters.

47
00:03:13,159 --> 00:03:17,480
How do we actually grab the letter grade associated with a student?

48
00:03:17,480 --> 00:03:21,680
Well, we're going to use the fact that the letter grade for the student

49
00:03:21,680 --> 00:03:31,599
at index i is in the grade list is going to be grabbing the letter grade

50
00:03:31,599 --> 00:03:34,599
for the student at that same index in the name list.

51
00:03:34,599 --> 00:03:39,240
Okay, so we have to figure out this particular student being passed in here,

52
00:03:39,240 --> 00:03:42,840
what index they're at in the names list.

53
00:03:42,840 --> 00:03:44,640
So that's what this line of code is doing.

54
00:03:44,640 --> 00:03:50,400
It's using this index function on the name list with a parameter,

55
00:03:50,400 --> 00:03:51,879
for example, Anna.

56
00:03:51,879 --> 00:03:56,960
So this will return for us the index where Anna is in my list.

57
00:03:56,960 --> 00:04:02,920
So from the previous example, it's going to say that it's going to turn the number zero

58
00:04:02,920 --> 00:04:07,080
because Anna is stored in the name list at index zero.

59
00:04:07,080 --> 00:04:10,920
So now that I have that index in hand, sort of variable i,

60
00:04:10,920 --> 00:04:14,920
I can just index into the grade list at that same index.

61
00:04:14,920 --> 00:04:19,439
Okay, so I can get grades list at index zero will return from either grade

62
00:04:19,439 --> 00:04:24,639
that I got for that particular class or whatever we're storing here.

63
00:04:24,639 --> 00:04:28,439
Okay, and then we just return the two-pole student comma grade.

64
00:04:28,439 --> 00:04:30,759
So this becomes really messy, right?

65
00:04:30,759 --> 00:04:34,000
I already mentioned that if I have a list of a whole bunch of students

66
00:04:34,000 --> 00:04:37,600
for a really large class or, you know, the entire university,

67
00:04:37,600 --> 00:04:42,079
then it becomes really unwieldy to just keep passing in all these lists.

68
00:04:42,079 --> 00:04:46,800
If I have, in addition, all these micro quiz lists and all these problem-set lists

69
00:04:46,840 --> 00:04:49,600
that also store additional information for the student,

70
00:04:49,600 --> 00:04:53,600
I then have to pass those in for their respective functions.

71
00:04:53,600 --> 00:04:56,439
And so it gets really messy, right?

72
00:04:56,439 --> 00:04:59,639
Writing these functions that retrieve this information.

73
00:04:59,639 --> 00:05:03,400
And additionally, if we're mutating these lists like if a new student comes in

74
00:05:03,400 --> 00:05:05,160
and we need to add all their information,

75
00:05:05,160 --> 00:05:08,840
I need to make sure to update every single one of these lists that I'm maintaining.

76
00:05:08,840 --> 00:05:11,519
If a student leaves, right, or drops the class,

77
00:05:11,519 --> 00:05:16,080
I need to remember to remove that index from all of these different lists.

78
00:05:16,079 --> 00:05:20,879
So really, really messy situation that we could get into by using this method

79
00:05:20,879 --> 00:05:24,919
to store information about students.

80
00:05:24,919 --> 00:05:27,399
So let's try a different approach.

81
00:05:27,399 --> 00:05:30,360
Instead of using all of these different lists,

82
00:05:30,360 --> 00:05:34,560
let's say that we're going to store everything in a master list.

83
00:05:34,560 --> 00:05:36,479
So we're not storing many lists.

84
00:05:36,479 --> 00:05:39,560
We'll just store one list for the grades in the class.

85
00:05:39,560 --> 00:05:43,399
And the way that it'll be stored, according to this,

86
00:05:43,399 --> 00:05:46,919
in the slide is going to be this grades list.

87
00:05:46,919 --> 00:05:49,839
So this is one list with three elements in it.

88
00:05:49,839 --> 00:05:51,799
And you can imagine if we have more students,

89
00:05:51,799 --> 00:05:55,439
we would just put all these students in this master list.

90
00:05:55,439 --> 00:06:00,599
So what is each one of these student elements?

91
00:06:00,599 --> 00:06:03,159
Well, each student element is itself a list.

92
00:06:03,159 --> 00:06:05,479
So already I've got my master list,

93
00:06:05,479 --> 00:06:08,519
and each element within this list is also a list.

94
00:06:08,519 --> 00:06:11,159
So this is a list for Eric, a list for Anna,

95
00:06:11,160 --> 00:06:12,240
and a list for John.

96
00:06:12,240 --> 00:06:14,720
These are variable names.

97
00:06:14,720 --> 00:06:17,720
What are these lists going to be comprised of?

98
00:06:17,720 --> 00:06:20,000
Well, they will be comprised of three things.

99
00:06:20,000 --> 00:06:22,480
So notice, right, two commas here.

100
00:06:22,480 --> 00:06:24,480
So the first thing is their name.

101
00:06:24,480 --> 00:06:27,960
The second thing is another list containing their problem

102
00:06:27,960 --> 00:06:29,040
set grades.

103
00:06:29,040 --> 00:06:33,320
And I'm kind of using this element of that list

104
00:06:33,320 --> 00:06:36,960
to denote what that set of numbers represents.

105
00:06:36,960 --> 00:06:40,240
And then another list as my third element,

106
00:06:40,240 --> 00:06:43,120
being for the micro, being the scores for the micro quiz grades.

107
00:06:43,120 --> 00:06:46,960
And again, I'm denoting the first element of that list,

108
00:06:46,960 --> 00:06:50,920
telling me what this list contains.

109
00:06:50,920 --> 00:06:55,960
OK, so I've got master list with three sublists

110
00:06:55,960 --> 00:06:57,040
for my three students.

111
00:06:57,040 --> 00:06:59,319
And each one of those lists contains three elements,

112
00:06:59,319 --> 00:07:01,120
a string, a list, and another list.

113
00:07:01,120 --> 00:07:05,439
And those two lists are then also comprised of a string

114
00:07:05,439 --> 00:07:06,800
and a list themselves.

115
00:07:06,800 --> 00:07:10,199
So super complex, a data structure,

116
00:07:10,199 --> 00:07:12,120
a sort of composition or design choice

117
00:07:12,120 --> 00:07:13,960
that I've made here.

118
00:07:13,960 --> 00:07:17,319
But it solves the problem of maintaining

119
00:07:17,319 --> 00:07:21,600
all these different lists in separate variables.

120
00:07:21,600 --> 00:07:24,040
So now, let's say I wanted to write a function that

121
00:07:24,040 --> 00:07:26,600
gets the grades for a particular student

122
00:07:26,600 --> 00:07:31,400
for either problem set or micro quizzes grades.

123
00:07:31,400 --> 00:07:33,120
This is a function that does that.

124
00:07:33,120 --> 00:07:37,319
So again, it's not looking super nice.

125
00:07:37,319 --> 00:07:39,399
So what is this function going to take in?

126
00:07:39,399 --> 00:07:41,920
The who is going to be a string representing the name?

127
00:07:41,920 --> 00:07:46,720
So for example, Anna, the what will be also a string representing

128
00:07:46,720 --> 00:07:51,959
what information I'd like to grab, either PS or MQ.

129
00:07:51,959 --> 00:07:55,800
And the data is going to be my master list of all the grades.

130
00:07:55,800 --> 00:07:59,519
So this grade equals this list of everybody.

131
00:07:59,519 --> 00:08:01,000
So what is this code going to do?

132
00:08:01,000 --> 00:08:06,120
Well, it has a for loop down here and a nested for loop

133
00:08:06,120 --> 00:08:07,480
inside it.

134
00:08:07,480 --> 00:08:10,000
The outer for loop basically looks

135
00:08:10,000 --> 00:08:13,079
through each one of these elements here

136
00:08:13,079 --> 00:08:16,120
and looks at the element at index 0.

137
00:08:16,120 --> 00:08:20,240
So either Eric, Anna, or John, and grabs only the list

138
00:08:20,240 --> 00:08:25,519
where that piece, the string here, matches the who.

139
00:08:25,519 --> 00:08:29,240
So if student at index 0 equals who right here,

140
00:08:29,240 --> 00:08:31,280
then we've found the student I'm interested in grabbing

141
00:08:31,280 --> 00:08:33,039
the information for.

142
00:08:33,039 --> 00:08:33,720
Cool.

143
00:08:33,720 --> 00:08:37,960
So now I've grabbed the right piece, the right list.

144
00:08:37,960 --> 00:08:42,519
And now I'm interested in their grades for a particular what?

145
00:08:42,519 --> 00:08:44,320
So either MQ or PS.

146
00:08:44,320 --> 00:08:48,320
So I do the exact same thing again for that list here.

147
00:08:48,320 --> 00:08:52,480
So if I'm interested in Anna's PS grades,

148
00:08:52,480 --> 00:08:56,680
I grab these lists here.

149
00:08:56,679 --> 00:09:01,079
And then I'm going to check if the info at index 0,

150
00:09:01,079 --> 00:09:04,279
so either this PS or this MQ matches the what?

151
00:09:04,279 --> 00:09:06,839
So either PS or MQ to match what I'm

152
00:09:06,839 --> 00:09:08,839
interested in grabbing the information,

153
00:09:08,839 --> 00:09:10,439
what information I'm interested in grabbing.

154
00:09:10,439 --> 00:09:14,279
And then I'm going to go inside this if statement

155
00:09:14,279 --> 00:09:17,439
if they match, and then I return the who in the info.

156
00:09:17,439 --> 00:09:19,120
So again, super complex.

157
00:09:19,120 --> 00:09:21,279
No need to understand this that well,

158
00:09:21,279 --> 00:09:24,240
because we're not going to use this method for long.

159
00:09:24,240 --> 00:09:27,120
So this get grades here.

160
00:09:27,120 --> 00:09:30,320
For example, if I grab Irox micro quiz grades

161
00:09:30,320 --> 00:09:34,919
and I run the code, it will return for me this tuple that

162
00:09:34,919 --> 00:09:36,879
returns for me the name of the student.

163
00:09:36,879 --> 00:09:39,720
And then just this sublist of the thing

164
00:09:39,720 --> 00:09:42,320
that I was interested in in this case, micro quiz.

165
00:09:42,320 --> 00:09:43,960
And it grabs for me all the grades.

166
00:09:43,960 --> 00:09:47,240
And then I can then index into this returned tuple

167
00:09:47,240 --> 00:09:49,639
to grab either the first quiz or the second quiz grades.

168
00:09:50,319 --> 00:09:52,319
OK.

169
00:09:52,319 --> 00:09:54,399
And same for Anna, right?

170
00:09:54,399 --> 00:09:58,120
In this particular case, it grabs for me just the tuple

171
00:09:58,120 --> 00:10:01,720
with my name and then that sublist with the promsite grades.

172
00:10:04,720 --> 00:10:08,120
OK, so again, really messy.

173
00:10:08,120 --> 00:10:09,799
I've made my design choice for how

174
00:10:09,799 --> 00:10:13,480
to create all these lists with sublists and sublists

175
00:10:13,480 --> 00:10:15,519
within those.

176
00:10:15,519 --> 00:10:17,759
And so I'd have to document that probably

177
00:10:17,759 --> 00:10:19,240
if I was using this method.

178
00:10:19,240 --> 00:10:22,159
And then this function to grab this information,

179
00:10:22,159 --> 00:10:27,279
again, super complex, hard to read.

180
00:10:27,279 --> 00:10:30,240
So it's not really a great way to store information either.

181
00:10:30,240 --> 00:10:35,480
But the idea behind this, which is to try to store some data

182
00:10:35,480 --> 00:10:40,759
associated with some sort of key, the PS or MQ,

183
00:10:40,759 --> 00:10:43,039
or in this case, I'm storing a bunch of grades

184
00:10:43,039 --> 00:10:44,360
for Eric or Anna or Tom.

185
00:10:44,360 --> 00:10:47,399
That idea we can explore.

186
00:10:47,399 --> 00:10:50,439
And that's basically what dictionaries will do for us.

187
00:10:50,439 --> 00:10:53,519
It will allow us to create data structures

188
00:10:53,519 --> 00:10:59,079
that map some sort of custom index, a key, to some value.

189
00:10:59,079 --> 00:11:01,439
So much like a book dictionary does, right?

190
00:11:01,439 --> 00:11:04,319
It maps the word to its definition.

191
00:11:04,319 --> 00:11:06,399
We'll be able to create our own dictionaries that

192
00:11:06,399 --> 00:11:10,039
map some object to another object.

193
00:11:10,039 --> 00:11:14,919
So when we create a dictionary, we call every sort of quote

194
00:11:15,199 --> 00:11:17,679
element in the dictionary an entry.

195
00:11:17,679 --> 00:11:22,839
And that entry is that mapping of a key to a value.

196
00:11:22,839 --> 00:11:26,000
So just to draw a parallel with a list,

197
00:11:26,000 --> 00:11:30,559
we can think of a list as mapping something to another something.

198
00:11:30,559 --> 00:11:37,399
The thing that a list maps is this index, number 0, 1, 2, 3,

199
00:11:37,399 --> 00:11:38,399
in that order, right?

200
00:11:38,399 --> 00:11:41,559
So it has to start, have an element at index 0,

201
00:11:41,559 --> 00:11:45,799
and then that index increases by 1 from there on.

202
00:11:45,799 --> 00:11:48,239
And for each one of these indices,

203
00:11:48,239 --> 00:11:53,599
I'm mapping that index to some element in my list.

204
00:11:53,599 --> 00:11:54,959
That's basically what the list does.

205
00:11:54,959 --> 00:11:56,839
There's something associated with index 0,

206
00:11:56,839 --> 00:11:59,919
something associated with index 1, and so on.

207
00:11:59,919 --> 00:12:04,159
So it's kind of like a very restrictive dictionary.

208
00:12:04,159 --> 00:12:08,439
An actual Python dictionary works in similar way,

209
00:12:08,440 --> 00:12:13,960
except that now I am not putting any restrictions on my indices.

210
00:12:13,960 --> 00:12:18,840
My indices here become these sort of custom indices, call the key.

211
00:12:18,840 --> 00:12:24,280
And so now I'm able to associate a value equivalent element

212
00:12:24,280 --> 00:12:26,680
in my list with that key.

213
00:12:26,680 --> 00:12:30,320
So I can have an element associated with any object.

214
00:12:33,080 --> 00:12:35,760
So I am using the term value here.

215
00:12:35,759 --> 00:12:41,600
And in a dictionary, the key is associated with a value.

216
00:12:41,600 --> 00:12:43,960
And that's one entry in the dictionary.

217
00:12:43,960 --> 00:12:45,840
Now this is going to be a little bit confusing,

218
00:12:45,840 --> 00:12:49,080
because we've been using the term value

219
00:12:49,080 --> 00:12:52,679
to refer to just some object's value, right?

220
00:12:52,679 --> 00:12:58,120
Like, variable A has value 5, or something like that.

221
00:12:58,120 --> 00:13:00,319
But now I'm going to try to make a conscious effort.

222
00:13:00,319 --> 00:13:02,879
Now that we're introducing dictionary and dictionary values

223
00:13:02,879 --> 00:13:08,559
associated with a key, whenever I'm talking about the dictionary's value

224
00:13:08,559 --> 00:13:11,960
to say dictionary value, just so it's not confusing.

225
00:13:11,960 --> 00:13:13,679
But just keep that in mind.

226
00:13:13,679 --> 00:13:15,759
It can be a little bit confusing at first.

227
00:13:15,759 --> 00:13:20,080
Now that we're using the same terminology for two different things.

228
00:13:20,080 --> 00:13:22,399
So we're going to go through in this lecture,

229
00:13:22,399 --> 00:13:26,240
we're going to introduce a bunch of syntax and operations with dictionaries.

230
00:13:26,240 --> 00:13:28,200
And there are lots of you try it exercises

231
00:13:28,200 --> 00:13:30,600
just to give you a little bit of practice with the syntax,

232
00:13:30,600 --> 00:13:33,840
because this is kind of a syntax heavy lecture.

233
00:13:33,840 --> 00:13:36,159
So hopefully it helps a little bit.

234
00:13:36,159 --> 00:13:41,080
But let's first see how to store data in a Python dictionary.

235
00:13:41,080 --> 00:13:45,320
So as I mentioned, a Python dictionary stores entries.

236
00:13:45,320 --> 00:13:48,680
And that entry is a key value pair.

237
00:13:48,680 --> 00:13:53,000
So you're mapping one key to its value.

238
00:13:53,000 --> 00:13:54,960
The key can be any immutable object,

239
00:13:54,960 --> 00:13:57,080
and we're going to see what this means in a little bit.

240
00:13:57,080 --> 00:13:59,360
And the value associated with that key,

241
00:13:59,360 --> 00:14:01,840
or the Python value associated with that key,

242
00:14:01,840 --> 00:14:07,279
can be any object you'd like, even lists or other dictionaries.

243
00:14:07,279 --> 00:14:09,680
So the way we create a Python dictionary

244
00:14:09,680 --> 00:14:14,039
is by using these open and closed curly braces.

245
00:14:14,039 --> 00:14:16,639
So tuples were open and closed parentheses.

246
00:14:16,639 --> 00:14:19,039
Lists were open and closed square brackets.

247
00:14:19,039 --> 00:14:22,000
Dictionaries are open and closed curly braces.

248
00:14:22,000 --> 00:14:24,920
And this creates inside memory an empty dictionary.

249
00:14:24,920 --> 00:14:27,480
So an dictionary with zero entries.

250
00:14:27,480 --> 00:14:30,960
So the length of that dictionary is zero.

251
00:14:30,960 --> 00:14:33,480
To create a dictionary with one entry in it,

252
00:14:33,480 --> 00:14:35,879
again, we have curly braces.

253
00:14:35,879 --> 00:14:37,480
And we add one entry in it.

254
00:14:37,480 --> 00:14:40,360
So this something colon, something else,

255
00:14:40,360 --> 00:14:43,440
is an entry in my dictionary, one entry.

256
00:14:43,440 --> 00:14:46,879
And the thing before the colon is the key.

257
00:14:46,879 --> 00:14:49,360
And the thing after the colon is the value associated

258
00:14:49,360 --> 00:14:49,960
with that key.

259
00:14:53,680 --> 00:14:56,399
So you can think of it if we're drawing a parallel to lists.

260
00:14:56,399 --> 00:15:00,959
This is now mapping at this custom index 4,

261
00:15:00,959 --> 00:15:02,360
we're putting elements 16.

262
00:15:05,639 --> 00:15:07,879
OK, so we can also create dictionaries

263
00:15:07,879 --> 00:15:09,959
that aren't just full of integers.

264
00:15:09,959 --> 00:15:12,639
And you can mix and match data types as you'd like.

265
00:15:12,639 --> 00:15:15,439
But usually in dictionaries, we have

266
00:15:15,439 --> 00:15:17,879
the keys all be the same type.

267
00:15:17,879 --> 00:15:20,840
And the values all be the same type.

268
00:15:20,840 --> 00:15:23,559
But you can certainly mix and match types just like it.

269
00:15:23,559 --> 00:15:26,519
You could create lists and tuples full of an integer

270
00:15:26,519 --> 00:15:31,359
and the float and another list and mix and match in that way.

271
00:15:31,359 --> 00:15:33,279
So here I'm creating a dictionary.

272
00:15:33,279 --> 00:15:36,759
Again, open and close curly braces starts my dictionary.

273
00:15:36,759 --> 00:15:39,359
And it has four elements in it.

274
00:15:39,359 --> 00:15:41,719
So each four entries in it.

275
00:15:41,719 --> 00:15:45,000
And each entry is separated by a comma.

276
00:15:45,000 --> 00:15:47,199
I've got here my first entry.

277
00:15:47,200 --> 00:15:54,400
So it is mapping the key Anna to the dictionary value b.

278
00:15:54,400 --> 00:15:58,080
My second entry maps key map to value a.

279
00:15:58,080 --> 00:16:00,480
Third entry maps key drawn to value b.

280
00:16:00,480 --> 00:16:03,759
And last entry maps key Katie to value a.

281
00:16:03,759 --> 00:16:07,360
So this is a dictionary that essentially maps strings

282
00:16:07,360 --> 00:16:09,920
to other strings.

283
00:16:09,920 --> 00:16:12,960
So you can see here, I've kind of visualized

284
00:16:12,960 --> 00:16:15,400
the dictionary that we just created.

285
00:16:15,399 --> 00:16:18,079
We've got these custom indices.

286
00:16:18,079 --> 00:16:25,240
So we're basically mapping names to letter grades.

287
00:16:25,240 --> 00:16:26,399
Everything OK so far.

288
00:16:26,399 --> 00:16:27,759
Does it make sense?

289
00:16:27,759 --> 00:16:29,120
I guess conceptually.

290
00:16:29,120 --> 00:16:29,639
OK.

291
00:16:29,639 --> 00:16:32,120
Awesome.

292
00:16:32,120 --> 00:16:35,199
OK, so the first thing we'd like to do

293
00:16:35,199 --> 00:16:38,120
is once we have a dictionary full of a bunch of entries,

294
00:16:38,120 --> 00:16:40,439
how do we grab an entry?

295
00:16:40,439 --> 00:16:45,079
How do we look up a value associated with a key?

296
00:16:45,080 --> 00:16:49,440
So the way we do that is in a very similar way

297
00:16:49,440 --> 00:16:54,160
to the way we look up an element in a list.

298
00:16:54,160 --> 00:16:58,480
A key in a dictionary is just a custom index.

299
00:16:58,480 --> 00:17:00,560
So how did we look up an element in a list?

300
00:17:00,560 --> 00:17:03,240
So if I wanted the element at index three,

301
00:17:03,240 --> 00:17:05,920
I would basically say L square brackets three.

302
00:17:05,920 --> 00:17:09,200
And that grabs for me the value at that index.

303
00:17:09,200 --> 00:17:12,400
Well now I've got my custom indices.

304
00:17:12,400 --> 00:17:15,680
My custom indices are these strings.

305
00:17:15,680 --> 00:17:17,640
The syntax will be exactly the same.

306
00:17:17,640 --> 00:17:20,120
I've got this custom index I'd like to look up.

307
00:17:20,120 --> 00:17:26,680
So I say dictionary, name, square bracket, custom index.

308
00:17:26,680 --> 00:17:31,160
So if I say grade, square bracket, John, Python will go in

309
00:17:31,160 --> 00:17:33,200
to my dictionary named grades.

310
00:17:33,200 --> 00:17:36,040
It'll look up the key, John.

311
00:17:36,040 --> 00:17:39,880
And it'll return for me the value associated with that key.

312
00:17:39,880 --> 00:17:42,200
B.

313
00:17:42,200 --> 00:17:46,559
So this entire expression here is evaluate or gets

314
00:17:46,559 --> 00:17:50,279
replaced with the string B. Just like when we indexed into a list,

315
00:17:50,279 --> 00:17:54,120
L square brackets three, we replaced that entire indexing

316
00:17:54,120 --> 00:17:57,640
operation with the value of the element at that location.

317
00:17:57,640 --> 00:17:59,880
So similar here.

318
00:17:59,880 --> 00:18:04,559
If I try to index into a dictionary and that key doesn't exist,

319
00:18:04,559 --> 00:18:07,440
so notice my dictionary has no string grace,

320
00:18:07,440 --> 00:18:09,120
Python will give me a keyer.

321
00:18:09,120 --> 00:18:11,240
So if you run code with dictionaries

322
00:18:11,240 --> 00:18:15,000
and you get a keyer exception being raised in the console,

323
00:18:15,000 --> 00:18:18,079
you'll know that you're trying to index into a key that

324
00:18:18,079 --> 00:18:19,160
doesn't exist.

325
00:18:22,160 --> 00:18:25,640
So the question might be, yes, we're

326
00:18:25,640 --> 00:18:29,759
able to look up a value given a key.

327
00:18:29,759 --> 00:18:32,079
Can we do the same thing but backwards?

328
00:18:32,079 --> 00:18:37,000
Given a key, sorry, given a value like a, b, c, whatever,

329
00:18:37,000 --> 00:18:39,920
can we look up a key associated with that value?

330
00:18:39,920 --> 00:18:41,240
And the answer is no.

331
00:18:41,240 --> 00:18:44,960
We'd have to write some sort of loop or some sort of code

332
00:18:44,960 --> 00:18:47,400
that goes through every item in my dictionary

333
00:18:47,400 --> 00:18:52,560
to check each value and see whether the key associated

334
00:18:52,560 --> 00:18:54,960
with that value is equivalent to the one I'm looking for.

335
00:18:54,960 --> 00:18:58,920
So there is no nice expression to do that backward operation.

336
00:18:58,920 --> 00:19:01,279
And that's because the values in my dictionary

337
00:19:01,279 --> 00:19:02,120
can be repeated.

338
00:19:02,120 --> 00:19:05,880
So if I look up the value b, and I want what's

339
00:19:05,880 --> 00:19:09,519
the key associated with b, well, there's actually two of them.

340
00:19:09,519 --> 00:19:11,960
So how does Python know I want both of them?

341
00:19:11,960 --> 00:19:14,000
How does it know I want only one of them?

342
00:19:14,000 --> 00:19:16,759
How does it know I want maybe a list of all these things

343
00:19:16,759 --> 00:19:17,440
it doesn't?

344
00:19:17,440 --> 00:19:20,960
So you'd have to write code that does something

345
00:19:20,960 --> 00:19:22,759
for that operation.

346
00:19:22,759 --> 00:19:26,119
And we're going to see how to do that later.

347
00:19:26,119 --> 00:19:28,200
OK, so let's have you work on this you try it.

348
00:19:28,200 --> 00:19:31,480
And this is just an exercise in looking up a value.

349
00:19:31,480 --> 00:19:33,920
So this is a function.

350
00:19:33,920 --> 00:19:36,119
I'd like to write according to the specification.

351
00:19:36,119 --> 00:19:38,559
So it's called find grades.

352
00:19:38,559 --> 00:19:41,960
Grades is a dictionary mapping student names to grades.

353
00:19:41,960 --> 00:19:46,759
So string to string exactly like we've seen in the previous slide.

354
00:19:46,759 --> 00:19:50,559
And students is going to be a list of student names.

355
00:19:50,559 --> 00:19:54,119
So in the example here, I've got my input dictionary

356
00:19:54,119 --> 00:19:55,559
this thing we just saw.

357
00:19:55,559 --> 00:19:58,240
And then my list of student grades is, for example,

358
00:19:58,240 --> 00:20:01,519
these two strings, mat and Katie.

359
00:20:01,519 --> 00:20:04,000
For a bunch of these questions, especially

360
00:20:04,000 --> 00:20:05,599
even on microquiz and things like that,

361
00:20:05,599 --> 00:20:08,199
if it gets a little confusing when I

362
00:20:08,199 --> 00:20:13,039
try to write the specification in a very detailed way

363
00:20:13,039 --> 00:20:16,879
to make it clear what I'd like from this function,

364
00:20:16,879 --> 00:20:19,599
it's important to try to use the example

365
00:20:19,599 --> 00:20:21,639
to help you figure out what we'd like.

366
00:20:21,639 --> 00:20:23,399
Because we're writing the specification

367
00:20:23,399 --> 00:20:24,639
in a general sense.

368
00:20:24,639 --> 00:20:26,439
But the example should hopefully make

369
00:20:26,439 --> 00:20:28,919
things really clear for what we'd like.

370
00:20:28,919 --> 00:20:32,559
So in this particular case, what we want the function to return

371
00:20:32,559 --> 00:20:38,000
is a list of the grades for the students being pasted.

372
00:20:38,000 --> 00:20:40,599
So we look up mat, we see their grades as c,

373
00:20:40,599 --> 00:20:42,559
we look up Katie, their grade is an a.

374
00:20:42,559 --> 00:20:45,799
So I want to return the list c comma a in the same order

375
00:20:45,799 --> 00:20:48,039
that I passed in my students.

376
00:20:48,039 --> 00:20:50,000
So I'll give you a couple of minutes to work on that,

377
00:20:50,000 --> 00:20:51,599
and then we can write it together.

378
00:20:51,599 --> 00:20:58,119
So that's line 94.

379
00:20:58,119 --> 00:21:01,079
So this is just the exercise on looking up values in the dictionary.

380
00:21:02,559 --> 00:21:04,200
All right, does anybody have a start for me?

381
00:21:09,200 --> 00:21:10,679
Yes, please.

382
00:21:10,679 --> 00:21:11,679
Thank you.

383
00:21:11,679 --> 00:21:12,839
I have a question.

384
00:21:12,839 --> 00:21:14,039
Yep, I'll knew.

385
00:21:14,039 --> 00:21:17,319
How about that?

386
00:21:17,319 --> 00:21:19,319
So this will be my results list.

387
00:21:19,319 --> 00:21:19,839
Yep.

388
00:21:19,839 --> 00:21:21,639
I have three.

389
00:21:21,639 --> 00:21:22,639
I have three.

390
00:21:22,639 --> 00:21:23,639
Yep, for a loop.

391
00:21:23,639 --> 00:21:25,639
I have a L and two here.

392
00:21:32,839 --> 00:21:41,720
Yep, so grade square bracket LM looks up the value associated

393
00:21:41,720 --> 00:21:45,519
with my student named LM.

394
00:21:45,519 --> 00:21:47,919
And maybe we can save it like this.

395
00:21:47,919 --> 00:21:49,559
Grade equals this.

396
00:21:49,559 --> 00:21:51,559
And then you set a pen.

397
00:21:51,559 --> 00:21:57,480
Yep, so we can do lnu dot append the grade.

398
00:21:57,480 --> 00:21:59,799
Anything else?

399
00:21:59,799 --> 00:22:00,639
Yep, a return.

400
00:22:00,639 --> 00:22:04,079
So we can return lnu.

401
00:22:04,079 --> 00:22:07,039
Yep, so very reasonable code.

402
00:22:07,039 --> 00:22:08,000
I like it a lot.

403
00:22:11,159 --> 00:22:12,720
Besides the first lecture, I don't know

404
00:22:12,720 --> 00:22:15,159
that we've written any code that didn't involve a loop.

405
00:22:15,159 --> 00:22:19,480
So your best bet for writing code for any sort of thing

406
00:22:19,480 --> 00:22:22,359
in this class is to think what loop can I do.

407
00:22:22,359 --> 00:22:26,480
So let's run the code, and it should return for me to see comma a,

408
00:22:26,480 --> 00:22:27,000
and it does.

409
00:22:30,799 --> 00:22:34,519
Now that we can iterate, so I mentioned this before,

410
00:22:34,519 --> 00:22:37,359
but once we're iterating over two pulls and lists and things

411
00:22:37,359 --> 00:22:40,399
like that, one thing I would add it just for debugging purposes

412
00:22:40,399 --> 00:22:45,879
is say something like LM is, and then you can say an example

413
00:22:45,879 --> 00:22:49,319
of what it could be like Anna or Matt or whatever.

414
00:22:49,319 --> 00:22:54,119
It could be just to remind yourself that that loop variable

415
00:22:54,119 --> 00:22:55,159
is a string.

416
00:22:55,159 --> 00:22:56,720
And so it's one less thing to remember

417
00:22:56,720 --> 00:22:58,559
as you're writing for their code.

418
00:22:58,679 --> 00:22:59,639
This is really nice.

419
00:23:04,000 --> 00:23:06,960
OK, so dictionaries are already proving

420
00:23:06,960 --> 00:23:09,240
to be really, really useful.

421
00:23:09,240 --> 00:23:14,119
We can create values associated with custom indices.

422
00:23:14,119 --> 00:23:16,319
And if we want to grab the value associated

423
00:23:16,319 --> 00:23:19,000
with that custom index, it's really just

424
00:23:19,000 --> 00:23:23,519
a matter of indexing using a key, using that specific key,

425
00:23:23,519 --> 00:23:26,359
much like we did indexing into a list.

426
00:23:26,359 --> 00:23:27,240
No need to loop.

427
00:23:27,240 --> 00:23:29,599
None of that iteration.

428
00:23:29,599 --> 00:23:35,159
It's just a single line of code that indexes into the list.

429
00:23:35,159 --> 00:23:36,599
So let's see a few more operations

430
00:23:36,599 --> 00:23:38,839
before we do the next, you try it.

431
00:23:38,839 --> 00:23:41,479
So I've got my list of grades that we've

432
00:23:41,479 --> 00:23:44,119
been working with in the past couple of slides.

433
00:23:44,119 --> 00:23:48,679
Let's say that we now want to add a new student in their grade.

434
00:23:48,679 --> 00:23:52,759
The way we do that is very similar to the way

435
00:23:52,759 --> 00:23:56,200
that we would add an element to a list

436
00:23:56,200 --> 00:24:00,119
once we already have an index for that list.

437
00:24:00,119 --> 00:24:04,039
Here, notice, we don't actually have a slot for grace.

438
00:24:04,039 --> 00:24:07,160
Yet I'd like to add her to my dictionary.

439
00:24:07,160 --> 00:24:09,039
That's OK.

440
00:24:09,039 --> 00:24:14,079
With this particular syntax here, so grades at key grace,

441
00:24:14,079 --> 00:24:18,720
if Python does not find grace in my dictionary of keys,

442
00:24:18,720 --> 00:24:20,119
it'll just add her.

443
00:24:20,119 --> 00:24:22,119
OK.

444
00:24:22,119 --> 00:24:23,639
Which is really nice.

445
00:24:23,639 --> 00:24:26,079
I don't need to check if she's already in there.

446
00:24:26,079 --> 00:24:27,079
There's no looping.

447
00:24:27,079 --> 00:24:29,719
You just say grades at grace equals a.

448
00:24:29,719 --> 00:24:30,000
Boom.

449
00:24:30,000 --> 00:24:32,799
It adds it for you.

450
00:24:32,799 --> 00:24:35,839
What if I want to change an entry in my dictionary?

451
00:24:35,839 --> 00:24:39,679
Well, let's say I want to change grace as grade to a C.

452
00:24:39,679 --> 00:24:43,719
Grades at custom index grace equals C.

453
00:24:43,719 --> 00:24:46,759
We'll go in, look at my keys.

454
00:24:46,759 --> 00:24:51,119
When grace didn't exist, Python added her with her value.

455
00:24:51,119 --> 00:24:53,359
But she already exists there, so Python will just

456
00:24:53,359 --> 00:24:56,879
overwrite her value.

457
00:24:56,879 --> 00:24:58,679
So really nice.

458
00:24:58,679 --> 00:25:00,719
Something to look out for in case you already

459
00:25:00,719 --> 00:25:03,039
have values in the dictionary.

460
00:25:03,039 --> 00:25:04,319
You want to be careful if you actually

461
00:25:04,319 --> 00:25:05,719
do want to overwrite things.

462
00:25:05,719 --> 00:25:07,679
But it's really, really nice behavior.

463
00:25:07,679 --> 00:25:10,879
And it's different than lists, right?

464
00:25:10,879 --> 00:25:13,959
Especially adding an entry to the dictionary.

465
00:25:17,000 --> 00:25:19,359
You can delete entries much like we deleted entries

466
00:25:19,359 --> 00:25:21,479
from a list.

467
00:25:21,479 --> 00:25:24,519
We use the Dell function.

468
00:25:24,519 --> 00:25:29,159
And the Dell function says what entry you'd like to delete

469
00:25:29,159 --> 00:25:30,000
from what lists.

470
00:25:30,000 --> 00:25:35,079
So here we just say the name of our dictionary at index Anna.

471
00:25:35,079 --> 00:25:38,959
So this will completely remove Anna and her value

472
00:25:38,959 --> 00:25:41,799
and the value associated with Anna from the dictionary.

473
00:25:46,359 --> 00:25:48,159
So what I want to make a note of is

474
00:25:48,160 --> 00:25:50,320
that our dictionary is being mutated

475
00:25:50,320 --> 00:25:52,800
with all of these different methods or all

476
00:25:52,800 --> 00:25:54,880
of these different functions, right?

477
00:25:54,880 --> 00:25:58,600
So here, when I added grace, I've mutated my original dictionary.

478
00:25:58,600 --> 00:26:02,160
The animation didn't make a copy of this dictionary

479
00:26:02,160 --> 00:26:05,080
with grace added, leaving the original unchanged.

480
00:26:05,080 --> 00:26:08,519
I've literally gone in and mutated my original dictionary

481
00:26:08,519 --> 00:26:09,680
to add grace.

482
00:26:09,680 --> 00:26:13,160
I've mutated the original dictionary to change her grade.

483
00:26:13,160 --> 00:26:15,200
I've mutated the original dictionary

484
00:26:15,200 --> 00:26:17,200
to remove Anna from the dictionary.

485
00:26:17,200 --> 00:26:23,200
So all these functions are actually mutating my dictionary.

486
00:26:23,200 --> 00:26:28,000
OK, one other very useful thing that you can do with dictionaries

487
00:26:28,000 --> 00:26:31,880
is to check if a key is in my dictionary.

488
00:26:31,880 --> 00:26:35,360
So we do this using the inoperator, the in keyword.

489
00:26:35,360 --> 00:26:39,200
We've seen the in keyword being used to check

490
00:26:39,200 --> 00:26:43,080
if an element is in a list, to check if a substring

491
00:26:43,080 --> 00:26:45,360
or a character is in a string, to check

492
00:26:45,360 --> 00:26:47,080
if some element is in a tuple.

493
00:26:47,079 --> 00:26:53,639
We can also use it to check if an element or a key is in my dictionary.

494
00:26:53,639 --> 00:26:57,319
So I want to make a note, it's only checking the keys.

495
00:26:57,319 --> 00:27:00,319
It does not look for the values in the dictionary.

496
00:27:00,319 --> 00:27:03,639
We'll see how to check if some value is in the dictionary

497
00:27:03,639 --> 00:27:04,240
in a little bit.

498
00:27:04,240 --> 00:27:06,439
But the in keyword specifically only

499
00:27:06,439 --> 00:27:08,439
looks at the keys in the dictionary.

500
00:27:08,439 --> 00:27:11,359
So if I have the expression, you know,

501
00:27:11,359 --> 00:27:14,079
the string John is in grades, Python only

502
00:27:14,079 --> 00:27:17,679
looks at the keys and say, yep, there it is.

503
00:27:17,679 --> 00:27:19,359
I don't care what values associated with it.

504
00:27:19,359 --> 00:27:22,240
I just care that it's in my keys.

505
00:27:22,240 --> 00:27:26,519
So this entire expression here, John in grades will evaluate.

506
00:27:26,519 --> 00:27:28,480
So we replaced with true.

507
00:27:28,480 --> 00:27:31,240
Daniel obviously is not in my dictionary keys.

508
00:27:31,240 --> 00:27:32,519
So it returns false.

509
00:27:32,519 --> 00:27:38,039
B is not in my dictionary keys, even though it's in my values.

510
00:27:38,039 --> 00:27:41,039
It still returns false because it only looks at the keys.

511
00:27:44,720 --> 00:27:49,599
All right, let's have you try this exercise.

512
00:27:49,599 --> 00:27:53,720
So function is called find in L. Again,

513
00:27:53,720 --> 00:27:56,439
we can use the specifications and the example

514
00:27:56,439 --> 00:27:59,960
to help us figure out what we'd like from this function.

515
00:27:59,960 --> 00:28:04,960
So LD is going to be a list of dictionaries.

516
00:28:04,960 --> 00:28:09,639
So in the example here, I've got three dictionaries defined.

517
00:28:09,639 --> 00:28:12,799
And the first parameter here, the thing

518
00:28:12,799 --> 00:28:18,039
being passed as LD is the list with d1, d2, d3 as my elements.

519
00:28:18,039 --> 00:28:21,680
And k is just an integer.

520
00:28:21,680 --> 00:28:26,119
What I'd like to do is return true from the function

521
00:28:26,119 --> 00:28:31,519
if that k is a key in any of these dictionaries

522
00:28:31,519 --> 00:28:32,599
and false otherwise.

523
00:28:32,599 --> 00:28:36,119
So as soon as I see a key that matches k,

524
00:28:36,119 --> 00:28:37,919
I want to return true.

525
00:28:37,920 --> 00:28:44,640
So in this example here, when I look for the k2 inside these dictionaries,

526
00:28:44,640 --> 00:28:46,640
d1 doesn't have it, but d2 has it.

527
00:28:46,640 --> 00:28:49,160
So I would return true.

528
00:28:49,160 --> 00:28:53,039
When I look for 25 in that same list of dictionaries,

529
00:28:53,039 --> 00:28:57,080
25 is a value in one of these in d3,

530
00:28:57,080 --> 00:28:59,600
but it's not a key in d1, d2, or d3.

531
00:28:59,600 --> 00:29:00,759
So that would return false.

532
00:29:01,000 --> 00:29:05,000
All right.

533
00:29:05,000 --> 00:29:11,039
So that's just a little lower line 115.

534
00:29:11,039 --> 00:29:14,519
Give you a couple moments and then we can write it together like usual.

535
00:29:14,519 --> 00:29:16,039
All right, does anyone want to start me off here?

536
00:29:16,039 --> 00:29:19,519
So how can we do this?

537
00:29:22,640 --> 00:29:25,160
Create a loop, yes?

538
00:29:25,160 --> 00:29:25,960
Four?

539
00:29:25,960 --> 00:29:28,559
Yeah.

540
00:29:28,559 --> 00:29:29,360
Yep.

541
00:29:29,360 --> 00:29:36,680
OK, so that means that d is, I can say like k1 mapped to v1 or something like that,

542
00:29:36,680 --> 00:29:37,039
right?

543
00:29:37,039 --> 00:29:37,840
Key to a value.

544
00:29:44,079 --> 00:29:49,720
If k in d, yep.

545
00:29:49,720 --> 00:29:54,880
So that will check for me my keys in that particular dictionary that I'm looking at right now.

546
00:29:56,960 --> 00:29:59,799
Yep, we can immediately return true.

547
00:29:59,799 --> 00:30:02,600
Right, as soon as we found it, no need to check the other dictionaries,

548
00:30:02,600 --> 00:30:05,559
just pop out of the function and return true.

549
00:30:11,680 --> 00:30:16,440
Same inside the if or inside the four outside the four.

550
00:30:16,440 --> 00:30:19,240
Outside the four, we can return false.

551
00:30:19,240 --> 00:30:20,880
Yep.

552
00:30:20,880 --> 00:30:24,680
I like this code a lot.

553
00:30:24,680 --> 00:30:28,720
It uses this inoperator to do that the task.

554
00:30:28,720 --> 00:30:33,560
So the return false outside of the four loop works really well because if I've gone through

555
00:30:33,560 --> 00:30:39,200
every d inside ld here, then I'm checking every single dictionary.

556
00:30:39,200 --> 00:30:40,200
Right.

557
00:30:40,200 --> 00:30:49,160
As soon as I find one that has that key, this return true acts like a break and a return.

558
00:30:49,160 --> 00:30:52,680
Right, so breaks out of the loop and returns immediately.

559
00:30:52,680 --> 00:30:56,080
And it doesn't return false.

560
00:30:56,080 --> 00:31:03,400
But if I've gone through every dictionary and didn't find the key matching k, then I return false.

561
00:31:03,400 --> 00:31:04,400
Yeah.

562
00:31:04,400 --> 00:31:14,120
Did anybody try it a different way or is this?

563
00:31:14,120 --> 00:31:17,240
We could certainly try it with a boolean flag, right?

564
00:31:17,240 --> 00:31:22,160
We could flag the fact that we found it through some loop and keep track of it and at the

565
00:31:22,160 --> 00:31:24,040
end just return that flag.

566
00:31:24,040 --> 00:31:25,279
That's another way to do it.

567
00:31:25,279 --> 00:31:30,840
But this is probably the most Pythonically.

568
00:31:30,840 --> 00:31:33,400
So we can run it on these two examples here, right?

569
00:31:33,400 --> 00:31:38,640
So I'm expecting to looking up two to return true and looking up 25 to return false.

570
00:31:38,640 --> 00:31:40,600
And it does.

571
00:31:40,600 --> 00:31:44,640
Questions about this code or dictionary so far is everything.

572
00:31:44,640 --> 00:31:47,640
Okay, so far.

573
00:31:47,640 --> 00:31:48,640
Okay.

574
00:31:49,640 --> 00:31:52,400
All right, a couple more operations.

575
00:31:52,400 --> 00:31:55,320
So so far we've looked up values in a dictionary.

576
00:31:55,320 --> 00:31:57,000
We've added stuff to the dictionary.

577
00:31:57,000 --> 00:31:59,800
We've deleted stuff from the dictionary.

578
00:31:59,800 --> 00:32:06,960
One really useful thing to do is to be able to look at every single entry in my dictionary.

579
00:32:06,960 --> 00:32:13,480
The reason why we'd want to do this is because we should assume that when we create our dictionaries,

580
00:32:13,480 --> 00:32:15,920
there's no order to them.

581
00:32:15,920 --> 00:32:17,920
This is very much unlike lists.

582
00:32:17,920 --> 00:32:19,519
List had an order to them.

583
00:32:19,519 --> 00:32:23,279
We knew that the first element in our list was at index zero.

584
00:32:23,279 --> 00:32:25,519
The next one was at index one and so on, right?

585
00:32:25,519 --> 00:32:29,120
List were ordered sequences of elements.

586
00:32:29,120 --> 00:32:34,720
But dictionaries are not ordered sequences of elements.

587
00:32:34,720 --> 00:32:36,920
That's not super true.

588
00:32:36,920 --> 00:32:42,080
There are up until a very recent version of Python, there was no guarantee to order.

589
00:32:42,079 --> 00:32:46,960
They would put in some order that couldn't, that I didn't, I couldn't figure out how it

590
00:32:46,960 --> 00:32:48,919
was determined.

591
00:32:48,919 --> 00:32:54,480
But I forget which Python version maybe 3.6 or something like that started to guarantee

592
00:32:54,480 --> 00:32:59,480
an order when you in for for the list for the dictionary elements.

593
00:32:59,480 --> 00:33:05,000
And that order was the same order that you inserted the elements.

594
00:33:05,000 --> 00:33:09,319
But if you'd like to write robust code that could be run by people, you know, using

595
00:33:09,319 --> 00:33:14,879
an older version of Python, you should write the code assuming that no such order exists.

596
00:33:14,879 --> 00:33:19,720
And it's okay, it doesn't make the code that much harder to write.

597
00:33:19,720 --> 00:33:26,240
But if we're not assuming any order to Python entries in the dictionary, then that means

598
00:33:26,240 --> 00:33:31,159
a lot of times we actually have to look at each entry in the dictionary to do some sort

599
00:33:31,159 --> 00:33:33,359
of task.

600
00:33:33,359 --> 00:33:37,879
So one of the first things you might want to do is to iterate through all the keys in

601
00:33:37,880 --> 00:33:39,600
the dictionary.

602
00:33:39,600 --> 00:33:44,880
To do that, we use a function called grades.keys.

603
00:33:44,880 --> 00:33:50,600
And this grades.keys function here doesn't mutate the dictionary at all, but instead it

604
00:33:50,600 --> 00:33:57,880
returns for me an iterable, a sequence of values, which are all the keys in my dictionary.

605
00:33:57,880 --> 00:34:04,200
Now the data type of this return value is called Dict underscore keys.

606
00:34:04,200 --> 00:34:06,880
It's not a data type we've worked with before.

607
00:34:06,880 --> 00:34:09,200
It looks really weird.

608
00:34:09,200 --> 00:34:14,380
But if you'd like, and you don't have to do this, you can always cast this sequence of values

609
00:34:14,380 --> 00:34:18,160
that's type Dict keys to a list like this.

610
00:34:18,160 --> 00:34:24,240
So if you cast to a list grades.keys, it gives for us this more recognizable list with

611
00:34:24,240 --> 00:34:28,760
each key being an element in the list.

612
00:34:28,760 --> 00:34:33,640
You don't have to do this, but if it makes it easier for you, you can.

613
00:34:33,639 --> 00:34:37,039
So this line of code here, grades.keys returns for you.

614
00:34:37,039 --> 00:34:41,440
You can think of it like this, iterable, this list of all the keys in the dictionary.

615
00:34:41,440 --> 00:34:42,920
Again, they're not ordered, right?

616
00:34:42,920 --> 00:34:46,519
I mean, they're ordered in the order that I added them into the dictionary, right?

617
00:34:46,519 --> 00:34:48,400
Anna then Matt then John then Katie.

618
00:34:48,400 --> 00:34:50,960
But they're not sorted in alphabetical order.

619
00:34:50,960 --> 00:34:54,079
If you have integers, they won't be sorted in ascending or descending order.

620
00:34:54,079 --> 00:34:58,759
So it's best to just not assume an order to begin with.

621
00:34:58,759 --> 00:35:03,359
Similarly, we can get an iterable of all the values in the dictionary.

622
00:35:03,360 --> 00:35:08,360
And to do this, no surprise there, we use grades.values.

623
00:35:08,360 --> 00:35:12,840
And this is again a function where it doesn't mutate the grades at all, but instead it gets

624
00:35:12,840 --> 00:35:16,680
replaced with this Dict values data type.

625
00:35:16,680 --> 00:35:18,640
Never seen it before either.

626
00:35:18,640 --> 00:35:22,680
And you can cast it to a list if you'd like because it makes more sense to us at this

627
00:35:22,680 --> 00:35:28,840
point in time, which just returns for us this list of every single value in my dictionary.

628
00:35:28,840 --> 00:35:30,160
Again, no order, right?

629
00:35:30,159 --> 00:35:37,159
We can see that there's no order except for the order that we actually added the element.

630
00:35:37,159 --> 00:35:38,159
Yeah.

631
00:35:38,159 --> 00:35:42,159
When you said like an act like a bubble, do you mean like if I do grade something,

632
00:35:42,159 --> 00:35:47,159
another time you'll print out the same list?

633
00:35:47,159 --> 00:35:51,399
Yeah, yeah, and print out the same, the same, iterable, I guess.

634
00:35:51,399 --> 00:35:52,399
If you do it again, yeah.

635
00:35:52,399 --> 00:35:59,639
If you're just iterating, or the dictionary, there can be chances for like to come up to the order.

636
00:35:59,639 --> 00:36:05,199
If you're iterating over the dictionary, not in the Python version we're using, but in a

637
00:36:05,199 --> 00:36:09,920
previous version, if you ran, you know, you're on your machine, or if I ran the same code

638
00:36:09,920 --> 00:36:15,359
on my machine, it might have given me a different order.

639
00:36:15,359 --> 00:36:18,679
But in the versions we're using from now on in Python, right?

640
00:36:18,679 --> 00:36:22,759
Because you guys all probably downloaded the latest version of, you know, an Aconda and

641
00:36:22,759 --> 00:36:28,159
Spyder, it will guarantee the order that you inserted the elements in.

642
00:36:28,159 --> 00:36:32,839
But if somebody using an older version of Python takes your code and runs it, they might

643
00:36:32,839 --> 00:36:40,719
actually get, you know, AAB, B, or some other order for these functions here.

644
00:36:40,719 --> 00:36:43,920
Yeah, you're welcome.

645
00:36:43,920 --> 00:36:52,159
So these being iterable just means that we can have something like 4k in grades.keys,

646
00:36:52,159 --> 00:37:01,039
basically giving us a loop where k is going to be each element in this list.

647
00:37:01,039 --> 00:37:01,879
So that's fine.

648
00:37:01,879 --> 00:37:05,440
So we can iterate over the keys, or we can iterate over the values directly.

649
00:37:05,440 --> 00:37:11,519
But what I find personally most effective is to iterate over each entry in the dictionary.

650
00:37:11,519 --> 00:37:17,139
So not just over the keys or the values by themselves, it's to iterate over the keys and the

651
00:37:17,139 --> 00:37:19,159
values together.

652
00:37:19,159 --> 00:37:26,079
So to do that, we use this function called grades.items.

653
00:37:26,079 --> 00:37:31,399
And unsurprisingly, this will return also an iterable where each element in my iterable

654
00:37:31,399 --> 00:37:38,480
is not just the key or the value, it's a tuple of the key comma, the value.

655
00:37:38,480 --> 00:37:42,799
And again, we can cast it to a list to give us something that's more recognizable.

656
00:37:42,799 --> 00:37:47,199
You can see now each element in the returned list is going to be the tuple where I have

657
00:37:47,199 --> 00:37:48,199
an entry, right?

658
00:37:48,199 --> 00:37:53,159
So my entry and a comma be is this first element in my returned list and then mat a and

659
00:37:53,159 --> 00:37:54,359
then John B and then KDA.

660
00:37:54,359 --> 00:37:59,960
So I grab these entries together where I have access to both the key and the value for

661
00:37:59,960 --> 00:38:01,399
that entry.

662
00:38:01,399 --> 00:38:05,559
Which means, and this is the important part, that we can do something like this.

663
00:38:05,559 --> 00:38:08,279
And we can do this for the previous slide as well.

664
00:38:08,279 --> 00:38:17,039
But for this particular grades.items iteration, if we're grabbing a key value pair out of

665
00:38:17,039 --> 00:38:23,880
items, that means we can do something like this for K comma V in grades.items.

666
00:38:23,880 --> 00:38:30,759
Means that Python will map K to the key for that entry and V to the value for that entry,

667
00:38:30,759 --> 00:38:34,400
as I'm iterating over each one of these pairs.

668
00:38:34,400 --> 00:38:39,360
So with each iteration, I have access to both the key and the value for that entry, which

669
00:38:39,360 --> 00:38:41,759
is pretty useful.

670
00:38:41,760 --> 00:38:49,200
So if I have this line of code here, if I print K has value V, the K and the V will change

671
00:38:49,200 --> 00:38:50,600
with each entry, right?

672
00:38:50,600 --> 00:38:53,440
And I'm just grabbing both the key and the value for that entry.

673
00:38:53,440 --> 00:38:54,440
Yeah, question.

674
00:38:54,440 --> 00:38:56,440
You use the greatest item.

675
00:38:56,440 --> 00:38:59,400
It's actually like, it's actually tuple, like the actual item.

676
00:38:59,400 --> 00:39:00,400
It's not a tuple.

677
00:39:00,400 --> 00:39:05,160
So the actual object type is this thing, dict underscore items.

678
00:39:05,160 --> 00:39:09,480
So again, not a type that we've worked with before, but that's just the type, right?

679
00:39:09,480 --> 00:39:14,960
We've seen lists, tuples, dictionaries, dict underscore items is another data type.

680
00:39:14,960 --> 00:39:15,960
Yeah.

681
00:39:15,960 --> 00:39:17,719
But the cool thing is that it's an iterable.

682
00:39:17,719 --> 00:39:22,519
So it's a sequence of values, which means that you can cast it to a list, which is also

683
00:39:22,519 --> 00:39:25,240
a sequence of values in and knows how to do that casting.

684
00:39:25,240 --> 00:39:30,519
And you get the more recognizable list that we've been using.

685
00:39:30,519 --> 00:39:32,039
Other questions?

686
00:39:32,039 --> 00:39:37,519
Okay, so I really like using grades.items to iterate over entries.

687
00:39:37,519 --> 00:39:39,280
So let's have you try this exercise.

688
00:39:39,280 --> 00:39:42,560
So it's a function called count matches.

689
00:39:42,560 --> 00:39:46,560
It takes in one dictionary, d.

690
00:39:46,560 --> 00:39:50,400
I didn't say what the elements are, but you can mix and match.

691
00:39:50,400 --> 00:39:54,120
So here I have a dictionary with just mapped to ints.

692
00:39:54,120 --> 00:39:59,080
And here I've got a dictionary where it maps ints and strings and things like that.

693
00:39:59,080 --> 00:40:04,240
And what I want this function to do is tell me how many entries in this input dictionaries

694
00:40:04,240 --> 00:40:06,880
have the key match its value.

695
00:40:06,880 --> 00:40:12,800
So here, in this first example, the key here is one, the values two, so they don't match.

696
00:40:12,800 --> 00:40:16,200
These don't match and these don't match, so the count should be zero.

697
00:40:16,200 --> 00:40:20,400
But down here in this example, the one doesn't match two, so that's fine.

698
00:40:20,400 --> 00:40:27,039
But the key A matches its value, one count, key five matches its value, two counts.

699
00:40:27,039 --> 00:40:31,360
So this should return count to.

700
00:40:31,360 --> 00:40:36,720
All right, let's have you work on that down by line 137.

701
00:40:36,719 --> 00:40:41,199
And then we'll write it together.

702
00:40:41,199 --> 00:40:45,159
All right, how could I start this?

703
00:40:45,159 --> 00:40:47,159
Yes.

704
00:40:47,159 --> 00:40:49,519
Account, yes?

705
00:40:49,519 --> 00:40:50,019
Zero?

706
00:40:50,019 --> 00:40:51,119
Yep.

707
00:40:51,119 --> 00:40:52,359
A for loop.

708
00:40:52,359 --> 00:40:53,359
A for loop, yep.

709
00:41:00,559 --> 00:41:02,359
Yep, as a function, yep.

710
00:41:02,360 --> 00:41:07,039
V equal k, yep.

711
00:41:07,039 --> 00:41:14,079
So this is where my value equals my key for that particular entry.

712
00:41:14,079 --> 00:41:18,280
Count equals count plus one, perfect.

713
00:41:18,280 --> 00:41:21,440
Yep, return count.

714
00:41:21,440 --> 00:41:23,680
Did anybody do it a different way?

715
00:41:23,680 --> 00:41:27,559
Nope, okay, awesome.

716
00:41:27,559 --> 00:41:28,559
Yeah.

717
00:41:28,559 --> 00:41:35,840
Why do you have to call it like, so we added a derivative, why is it not so correct?

718
00:41:35,840 --> 00:41:36,840
We can write it, yeah.

719
00:41:36,840 --> 00:41:42,159
Yeah, I did, like, the count equals zero, and then I did like, for x, and it thinks, like,

720
00:41:42,159 --> 00:41:48,079
that it was just going to call it the value, and say, I got to take both x and, like,

721
00:41:48,079 --> 00:41:49,079
that, it counts.

722
00:41:49,079 --> 00:41:52,079
I got to know that it was going to call it.

723
00:41:52,079 --> 00:41:56,480
Yeah, so we can say for xnd.keys or something like that, right?

724
00:41:56,480 --> 00:41:59,199
Something like that or no?

725
00:41:59,199 --> 00:42:03,880
We can also say for xnd, I think, that might work too, because it will grab the key for

726
00:42:03,880 --> 00:42:07,920
us, but just to be safe, keys.

727
00:42:07,920 --> 00:42:11,800
And now we need to grab the value, so how do you grab the value associated with kx?

728
00:42:11,800 --> 00:42:19,079
Yeah, score bracket, it's just indexing, right?

729
00:42:19,079 --> 00:42:26,440
So d-score brackets x, oops, if d-score brackets x equals, so that's the value.

730
00:42:26,440 --> 00:42:30,240
Value equals the key, right?

731
00:42:30,240 --> 00:42:33,920
Then again, we, you know, count plus one.

732
00:42:33,920 --> 00:42:37,400
So this is the other way.

733
00:42:37,400 --> 00:42:45,119
Yeah, so we don't have to use items, but it just, items makes things easier because we

734
00:42:45,119 --> 00:42:50,039
have in hand a variable that's, you know, the value and the variable that's the key, and

735
00:42:50,039 --> 00:43:00,159
doing things like indexing starts to get confusing if, you know, I mean, it can be confusing.

736
00:43:00,159 --> 00:43:05,759
But yeah, both ways are very valid, so let's run it, and it should work.

737
00:43:05,759 --> 00:43:10,239
Yeah, so the first count is zero, as we expected, and the second count is two.

738
00:43:10,239 --> 00:43:13,119
Is that any questions about this code?

739
00:43:13,119 --> 00:43:14,119
Does it make sense?

740
00:43:14,119 --> 00:43:17,840
Is there another way that somebody tried it?

741
00:43:17,840 --> 00:43:24,840
Oh, okay.

742
00:43:24,840 --> 00:43:31,960
Okay, so dictionaries are mutable objects, right?

743
00:43:31,960 --> 00:43:34,880
So all the aliasing and cloning rules apply.

744
00:43:34,880 --> 00:43:41,760
Remember when we talked about lists and using the equal sign between a list and another

745
00:43:41,760 --> 00:43:43,880
variable name?

746
00:43:43,880 --> 00:43:48,920
Just a plain old equal sign means that you are making an alias for that list.

747
00:43:48,920 --> 00:43:50,480
Same thing applies to dictionaries.

748
00:43:50,480 --> 00:43:55,200
So using, you know, saying d1 equals d2, where d2 is a dictionary means that you've just

749
00:43:55,200 --> 00:43:57,440
created an alias for that dictionary.

750
00:43:57,440 --> 00:44:01,760
So if you change the dictionary through either of those variables, you're changing the object

751
00:44:01,760 --> 00:44:03,160
itself.

752
00:44:03,160 --> 00:44:07,760
If you want to actually make a copy, you use d.copy, where d is the name of the dictionary.

753
00:44:07,760 --> 00:44:11,360
You'd like a copy, and that gets you a copy of that dictionary, and then you can change

754
00:44:11,720 --> 00:44:15,320
it without changing the original one.

755
00:44:15,320 --> 00:44:19,840
So let's talk a little bit about the values for a dictionary and the keys, because there

756
00:44:19,840 --> 00:44:23,559
are some restrictions on the keys for the dictionary.

757
00:44:23,559 --> 00:44:25,559
No restrictions on the values.

758
00:44:25,559 --> 00:44:28,400
So dictionary values can be any type, right?

759
00:44:28,400 --> 00:44:32,840
You can have a dictionary value that's a float, int, string, tuple.

760
00:44:32,840 --> 00:44:36,200
You can have a dictionary value that's a list, right, which is a mutable object.

761
00:44:36,200 --> 00:44:39,720
You could have a dictionary value that's another dictionary.

762
00:44:39,719 --> 00:44:43,279
All are okay, whatever you'd like for the values to be.

763
00:44:43,279 --> 00:44:47,759
You can have dictionary values that are duplicates, so you can have one key that maps to value

764
00:44:47,759 --> 00:44:51,359
five, another key that maps to value five.

765
00:44:51,359 --> 00:44:52,839
All good.

766
00:44:52,839 --> 00:44:53,839
Okay.

767
00:44:53,839 --> 00:44:57,359
So the key, so the values don't need to be unique.

768
00:44:57,359 --> 00:45:00,719
We do have restrictions on the keys though.

769
00:45:00,719 --> 00:45:05,359
The first restriction on the keys is that it has to be unique, right?

770
00:45:05,360 --> 00:45:17,440
So if you're mapping a key one to value five, you cannot map a key one to value six, because

771
00:45:17,440 --> 00:45:23,200
if you go and look up the value associated with one, how does Python know which value you'd

772
00:45:23,200 --> 00:45:26,400
like, the five or the six, right?

773
00:45:26,400 --> 00:45:30,400
So the keys have to be unique, first of all.

774
00:45:30,400 --> 00:45:37,200
Back in, the keys have to be immutable, technically hashable, but for the purposes of this class,

775
00:45:37,200 --> 00:45:39,720
just think of them as having to be immutable.

776
00:45:39,720 --> 00:45:44,480
So a key can only be one of these types that we've seen so far, int, float, string, tuple,

777
00:45:44,480 --> 00:45:45,400
or bool.

778
00:45:45,400 --> 00:45:48,920
You cannot have a key that's a list, you cannot have a key that's a dictionary, because

779
00:45:48,920 --> 00:45:51,800
they're mutable objects.

780
00:45:51,800 --> 00:45:56,400
So let's look at that a little bit further in detail.

781
00:45:56,400 --> 00:46:03,840
So the reason why we can't have a key that is mutable is because of the way keys are stored

782
00:46:03,840 --> 00:46:08,639
in Python, sorry, the way the dictionaries are stored in Python.

783
00:46:08,639 --> 00:46:10,760
So I'm going to show you an example on the next slide.

784
00:46:10,760 --> 00:46:14,200
First I'm going to explain how they're stored, and then we'll go through an example showing

785
00:46:14,200 --> 00:46:19,639
you exactly why you can't have a mutable structure.

786
00:46:19,639 --> 00:46:25,559
So the way the way dictionaries are stored in Python is you first need a key, right, to

787
00:46:25,559 --> 00:46:27,119
associate with a value.

788
00:46:27,119 --> 00:46:31,440
So everything starts off with the key you'd like to add to your dictionary.

789
00:46:31,440 --> 00:46:38,159
So Python basically runs a function called a hash function on the key.

790
00:46:38,159 --> 00:46:41,360
For simplicity sake, let's say the key you're trying to store is a number.

791
00:46:41,360 --> 00:46:46,079
That hash function might return that same number, it might return something else.

792
00:46:46,079 --> 00:46:51,159
If you're trying to store a string as a key, Python again runs maybe a different hash

793
00:46:51,159 --> 00:46:56,279
function that takes in that string, which might be a bunch of characters, and it converts

794
00:46:56,279 --> 00:46:57,879
it to some number.

795
00:46:57,879 --> 00:47:05,079
So the hash function always takes in your key and converts it to a number.

796
00:47:05,079 --> 00:47:10,359
That number, think of it like representing a memory location where you're going to store

797
00:47:10,359 --> 00:47:13,799
the value associated with that key.

798
00:47:13,799 --> 00:47:19,480
So you're always grabbing a number that represents a memory location.

799
00:47:19,480 --> 00:47:22,320
At that memory location, you'll store the value.

800
00:47:22,320 --> 00:47:26,840
So next time you want to look up the value associated with a key, you just run that same

801
00:47:26,840 --> 00:47:27,840
hash function.

802
00:47:27,840 --> 00:47:29,840
The function won't change.

803
00:47:29,840 --> 00:47:33,960
You run the same hash function on your object and you'll be able to get that same integer

804
00:47:33,960 --> 00:47:34,960
back.

805
00:47:34,960 --> 00:47:37,440
You'll be able to grab that same value back.

806
00:47:37,440 --> 00:47:41,519
But if you're storing mutable objects, that means that object can change.

807
00:47:41,519 --> 00:47:45,920
So if you run the hash function, the thing that gives you a number on something that's

808
00:47:45,920 --> 00:47:50,240
changed, that number might not be the same.

809
00:47:50,240 --> 00:47:55,000
Because you've changed the thing that you're passing into the function, so why would it

810
00:47:55,000 --> 00:47:57,400
give you the same value back?

811
00:47:57,400 --> 00:47:58,880
So let's look at this example.

812
00:47:58,880 --> 00:48:00,800
So again, we're storing grades.

813
00:48:00,800 --> 00:48:04,200
And let's say we're trying to store a bunch of grades inside our memory.

814
00:48:04,200 --> 00:48:10,400
And let's say our memory is just 16 locations, so 0 through 15.

815
00:48:10,400 --> 00:48:14,920
So at these locations, I'm going to store grades associated with a person.

816
00:48:14,920 --> 00:48:19,920
The function I'm going to run on the student is using their name.

817
00:48:19,920 --> 00:48:23,680
So I'm going to store Anna's grade somewhere.

818
00:48:23,680 --> 00:48:29,920
But I need to run a function that takes in the string A and A and gets for me a number.

819
00:48:29,920 --> 00:48:32,680
That number is where I'm going to store my grade.

820
00:48:32,680 --> 00:48:37,960
So a simple hash function we might do is to say, well, I'm going to take A and map it

821
00:48:37,960 --> 00:48:41,760
to 1, B, map it to 2, C, map it to 3, and so on.

822
00:48:41,760 --> 00:48:48,760
I can sum all of those numbers associated with my letters in my name, 16.

823
00:48:48,760 --> 00:48:54,160
And then I can mod it with 16, which is how many entries I have in my memory.

824
00:48:54,160 --> 00:48:58,760
So if I mod it with 16, that's going to give me a number 0 through 15.

825
00:48:58,760 --> 00:49:03,360
If you take the remainder when you divide by 16, you'll either get 0 all the way up through

826
00:49:03,360 --> 00:49:04,640
15.

827
00:49:04,639 --> 00:49:13,639
So if I mod my name, that means I'm going to store my grade at a memory location 0.

828
00:49:13,639 --> 00:49:16,079
So far so good.

829
00:49:16,079 --> 00:49:21,440
So I'm basically, I made up this hash function that tells me where to put my grade.

830
00:49:21,440 --> 00:49:23,440
Now I add another person.

831
00:49:23,440 --> 00:49:28,639
Again, I'm going to convert the letters in their name to numbers so that I can easily get

832
00:49:28,639 --> 00:49:32,039
a number out of their letters.

833
00:49:32,039 --> 00:49:37,039
So I'm basically hashing their letters to a number.

834
00:49:37,039 --> 00:49:41,320
Again summing this for Eric is 35, I'm going to mod it with 16, which means I'm going

835
00:49:41,320 --> 00:49:45,719
to put Eric's grade at location 3.

836
00:49:45,719 --> 00:49:47,360
Next person, John, same thing.

837
00:49:47,360 --> 00:49:51,880
I add the numbers, mod 16, I'm going to put John at location 15.

838
00:49:51,880 --> 00:49:56,719
So this is my memory where I'm storing the values associated with these students.

839
00:49:56,719 --> 00:50:03,079
So if I want to grab back my grade, I run the exact same hash function.

840
00:50:03,079 --> 00:50:05,799
So I'm going to run the same hash function on my name.

841
00:50:05,799 --> 00:50:07,039
My name hasn't changed, right?

842
00:50:07,039 --> 00:50:08,239
It's still the string.

843
00:50:08,239 --> 00:50:10,639
I'm not allowed to change it because it's a string.

844
00:50:10,639 --> 00:50:13,599
And so I'm going to get the same value back 0.

845
00:50:13,599 --> 00:50:17,759
So that means to grab the letter associated with my name, I just need to go straight into

846
00:50:17,759 --> 00:50:23,879
my memory location and look up the value at that memory location.

847
00:50:23,879 --> 00:50:26,480
So I know it's going to be a C.

848
00:50:26,480 --> 00:50:35,320
Now let's say I'm storing a list, a student name as a list.

849
00:50:35,320 --> 00:50:38,840
So again, Anna, Eric and John are immutable, right?

850
00:50:38,840 --> 00:50:40,119
They will not change.

851
00:50:40,119 --> 00:50:43,760
But if I store Kate as a list, her name might change.

852
00:50:43,760 --> 00:50:46,800
Again, I can run the same hash function on her name.

853
00:50:46,800 --> 00:50:51,679
That means her grade when I first store it is going to be at location 5.

854
00:50:51,679 --> 00:50:54,800
So I'm storing Kate at location 5.

855
00:50:54,800 --> 00:51:00,320
All these three strings, I know I can get back because they cannot change.

856
00:51:00,320 --> 00:51:05,880
But let's say that Kate goes and changes her name with a K to Kate with a C.

857
00:51:05,880 --> 00:51:08,760
It's the same object, right?

858
00:51:08,760 --> 00:51:12,600
The same person, she earned her grade B originally.

859
00:51:12,600 --> 00:51:17,200
So if I want to grab her grade back, even though her name has changed, I would still like

860
00:51:17,200 --> 00:51:21,600
to grab the B associated with her as a person.

861
00:51:21,599 --> 00:51:29,119
But Kate with a C, if I run that same hash function that I ran to put her grade in my table,

862
00:51:29,119 --> 00:51:34,079
tells me that I now need to look up her grade at memory location 13.

863
00:51:34,079 --> 00:51:38,199
No longer at memory location 5.

864
00:51:38,199 --> 00:51:41,880
She's not there.

865
00:51:41,880 --> 00:51:45,039
So now it's like, did the student disappear?

866
00:51:45,039 --> 00:51:46,839
All that stuff.

867
00:51:46,840 --> 00:51:54,280
So you see now that's the reason why I cannot have a mutable object as a key to my list.

868
00:51:54,280 --> 00:51:58,960
Because if that object changes running that hash function on that changed object, might

869
00:51:58,960 --> 00:52:03,440
not give me the same memory location where I originally stored the value associated with

870
00:52:03,440 --> 00:52:06,000
that object.

871
00:52:06,000 --> 00:52:08,440
Does that make sense?

872
00:52:08,440 --> 00:52:09,960
Okay.

873
00:52:09,960 --> 00:52:12,360
So let's revisit our original example.

874
00:52:12,360 --> 00:52:16,920
The one where we tried to store everything in a master list, all these grades in a master

875
00:52:16,920 --> 00:52:18,240
list.

876
00:52:18,240 --> 00:52:22,320
Now let's store it in a master dictionary.

877
00:52:22,320 --> 00:52:27,160
So I've got my grades, notice curly bracket, curly bracket is a dictionary.

878
00:52:27,160 --> 00:52:31,440
I've got two students in my class, Anna, right?

879
00:52:31,440 --> 00:52:33,400
So this is Anna's information and Bob.

880
00:52:33,400 --> 00:52:37,079
That's Bob's information.

881
00:52:37,079 --> 00:52:39,840
So just two students in my master dictionary.

882
00:52:39,840 --> 00:52:45,760
So the key Anna is going to be one entry, one entry key.

883
00:52:45,760 --> 00:52:48,000
Key Bob is the other entry key.

884
00:52:48,000 --> 00:52:51,000
And what's the information associated with these keys?

885
00:52:51,000 --> 00:52:55,800
Well with Anna, I've got this dictionary associated with her name.

886
00:52:55,800 --> 00:52:57,360
So that's this big thing here.

887
00:52:57,360 --> 00:52:59,240
I'll explain it in a bit.

888
00:52:59,240 --> 00:53:03,519
And similarly with Bob, Bob has one thing associated with him.

889
00:53:03,519 --> 00:53:07,720
And it's another dictionary.

890
00:53:07,719 --> 00:53:10,879
So I'm mapping strings to dictionaries here.

891
00:53:10,879 --> 00:53:16,119
And that's fine because values in a dictionary can be other dictionaries.

892
00:53:16,119 --> 00:53:19,519
So what are these dictionaries about?

893
00:53:19,519 --> 00:53:25,359
Well, the number of items in the dictionary for a particular person, there's three elements,

894
00:53:25,359 --> 00:53:26,359
right?

895
00:53:26,359 --> 00:53:28,559
So comma, comma separates my three elements.

896
00:53:28,559 --> 00:53:32,439
The first one is going to be mapped with key MQ.

897
00:53:32,439 --> 00:53:35,359
The second one mapped with key PS for problem set.

898
00:53:35,360 --> 00:53:39,480
And the last one mapped with the string fin for final.

899
00:53:39,480 --> 00:53:42,800
So each one of these students has this dictionary associated with them.

900
00:53:42,800 --> 00:53:47,440
And that dictionary then itself has three entries, one for the micro quiz, one for the

901
00:53:47,440 --> 00:53:51,079
PS one for the final scores.

902
00:53:51,079 --> 00:53:54,440
So now what's the values associated with those keys?

903
00:53:54,440 --> 00:53:56,760
Well, the micro quiz is going to be a list.

904
00:53:56,760 --> 00:53:58,440
The problem set is going to be a list.

905
00:53:58,440 --> 00:54:00,480
And the final is going to be a string.

906
00:54:00,480 --> 00:54:05,719
So a really nice representation of my class.

907
00:54:05,719 --> 00:54:08,199
And same for Bob.

908
00:54:08,199 --> 00:54:16,039
So now what if we want to grab a student's exam grade or the student's list of exam grades?

909
00:54:16,039 --> 00:54:21,400
Remember that big function with the two nested four loops and the nested ifs?

910
00:54:21,400 --> 00:54:25,480
That becomes this line.

911
00:54:25,480 --> 00:54:28,880
Isn't that cool?

912
00:54:28,880 --> 00:54:29,880
I like that.

913
00:54:29,880 --> 00:54:30,880
Yeah, exactly.

914
00:54:30,880 --> 00:54:34,480
We should applaud this because look how easy it is now to grab.

915
00:54:34,480 --> 00:54:35,480
Yes, thank you.

916
00:54:35,480 --> 00:54:36,480
Yes.

917
00:54:36,480 --> 00:54:39,240
Dictionaries are awesome guys.

918
00:54:39,240 --> 00:54:44,880
So yeah, so look, that line becomes this, you know, grabbing one, one quiz score becomes

919
00:54:44,880 --> 00:54:47,720
this single line of code right here.

920
00:54:47,720 --> 00:54:49,800
So let's break it down.

921
00:54:49,800 --> 00:54:54,880
Again we do left to right whenever we've got this chain of stuff going on.

922
00:54:54,880 --> 00:54:59,320
So the first thing we say is, well, we're looking upgrades at some index.

923
00:54:59,320 --> 00:55:02,240
So grades at some index gives me that dictionary.

924
00:55:02,240 --> 00:55:05,599
So something like this whole thing here.

925
00:55:05,599 --> 00:55:06,599
Right.

926
00:55:06,599 --> 00:55:07,599
Okay.

927
00:55:07,599 --> 00:55:08,599
Good.

928
00:55:08,599 --> 00:55:09,599
That's first chain.

929
00:55:09,599 --> 00:55:14,320
Now this box here gets replaced with that dictionary and I'm doing another index into

930
00:55:14,320 --> 00:55:15,320
that dictionary.

931
00:55:15,320 --> 00:55:23,640
So that means I'm going to grab the mq associated with that dictionary.

932
00:55:23,639 --> 00:55:30,119
So the value associated with mq is going to be this list 544.

933
00:55:30,119 --> 00:55:33,920
So this box here gets replaced with the list 544.

934
00:55:33,920 --> 00:55:38,159
And then if I want to grab just the first quiz value, I say now I'm going to index in the

935
00:55:38,159 --> 00:55:40,279
list 544 and index 0.

936
00:55:40,279 --> 00:55:42,199
So that grabs for me just the 5.

937
00:55:42,199 --> 00:55:45,879
So then the first quiz score for Anna was a 5.

938
00:55:45,879 --> 00:55:49,440
That's pretty bad.

939
00:55:49,440 --> 00:55:53,480
Okay.

940
00:55:53,480 --> 00:55:59,519
So let's have you think about this.

941
00:55:59,519 --> 00:56:01,400
This is a function.

942
00:56:01,400 --> 00:56:03,320
Nothing to code here, just to think.

943
00:56:03,320 --> 00:56:16,039
This is a function that grabs the average of every single thing where that thing is what

944
00:56:16,039 --> 00:56:17,519
in the class.

945
00:56:17,519 --> 00:56:24,199
So if what is mq as, you know, is in down here in this example, if what is mq, this code

946
00:56:24,199 --> 00:56:29,519
is supposed to get the average of all of the micro quizzes for all the students in the class.

947
00:56:29,519 --> 00:56:35,239
So you basically want to grab the average of 10 plus 8 plus 3.

948
00:56:35,239 --> 00:56:39,920
And if it's PS, I would like to grab the average of all the problem sets for all the students

949
00:56:39,920 --> 00:56:40,920
in the class.

950
00:56:40,920 --> 00:56:47,480
So the average of 10, 10, 7, 8, and 0.

951
00:56:47,480 --> 00:56:51,679
So we've got a loop that goes through other students in the keys.

952
00:56:51,679 --> 00:56:59,679
So the student studs, stud here is going to be this dictionary.

953
00:56:59,679 --> 00:57:05,960
So given this dictionary, what line should you insert here such that you're creating a

954
00:57:05,960 --> 00:57:10,480
list, just a single top level list of all of the values in there.

955
00:57:10,480 --> 00:57:14,480
So the thing you actually want to end up with, and if we're looking at the PS scores, just

956
00:57:14,480 --> 00:57:23,320
because it's a little easier to think about, is going to be 10, 10, 7, 8, and 0.

957
00:57:23,320 --> 00:57:28,199
So in the end, what I would like to get in my all data, this list that I'm maintaining

958
00:57:28,199 --> 00:57:33,800
here, is something like this for the PS.

959
00:57:33,800 --> 00:57:41,639
So think about which one of these lines will accomplish that.

960
00:57:41,639 --> 00:57:50,119
And just to help you out, we can say student is my dictionary of who thinks it's the first

961
00:57:50,119 --> 00:58:02,920
one, second one, third one, fourth one.

962
00:58:02,920 --> 00:58:07,799
Nobody thought it's the first one, you guys sure?

963
00:58:07,799 --> 00:58:09,839
Why do you think it's the second one?

964
00:58:09,840 --> 00:58:12,079
Is it because of the append?

965
00:58:12,079 --> 00:58:13,079
Yeah?

966
00:58:13,079 --> 00:58:14,079
Let's think about it.

967
00:58:14,079 --> 00:58:17,039
So all data is a list.

968
00:58:17,039 --> 00:58:18,440
And what are we appending?

969
00:58:18,440 --> 00:58:23,960
So what is data at stud at what going to give us?

970
00:58:23,960 --> 00:58:30,240
Data at student is the dictionary, this dictionary here, right?

971
00:58:30,240 --> 00:58:33,200
This value here.

972
00:58:33,200 --> 00:58:38,880
And if we take this value and index into the what, will it be an integer or will it be

973
00:58:38,880 --> 00:58:43,400
a list?

974
00:58:43,400 --> 00:58:51,519
So when we append a list to another list, what is that going to give us?

975
00:58:51,519 --> 00:58:58,440
So if we have a list already with ABC, if I append another list to this, will it put

976
00:58:58,440 --> 00:59:01,800
the element within that list or the list itself?

977
00:59:01,800 --> 00:59:06,039
Yeah, exactly.

978
00:59:06,039 --> 00:59:08,840
So that's not going to work for us.

979
00:59:08,840 --> 00:59:11,720
Clearly, D is not right either.

980
00:59:11,720 --> 00:59:17,120
And definitely indexing into data at student at what is not going to be right.

981
00:59:17,120 --> 00:59:23,680
So that leaves one other choice, the first one.

982
00:59:23,680 --> 00:59:27,039
So let's see why the first one works.

983
00:59:27,039 --> 00:59:28,480
We're concatenating, right?

984
00:59:28,480 --> 00:59:30,600
So the plus concatenates.

985
00:59:30,600 --> 00:59:36,400
So let's say I already have a list, ABC, I'm going to concatenate something I already

986
00:59:36,400 --> 00:59:40,920
have with data at student at what, which we said is what?

987
00:59:40,920 --> 00:59:43,599
Is it a single element or another list?

988
00:59:43,599 --> 00:59:44,200
Exactly.

989
00:59:44,200 --> 00:59:49,280
So we concatenate with something like 10, 10 or something like that.

990
00:59:49,280 --> 00:59:57,280
So that will return for us, ABC, 10, 10, which will allow us to do something like getting

991
00:59:57,280 --> 01:00:01,000
the sum of all these elements.

992
01:00:01,000 --> 01:00:01,840
Questions about that?

993
01:00:01,840 --> 01:00:02,680
Does that make sense?

994
01:00:02,680 --> 01:00:03,639
Is that all right?

995
01:00:03,639 --> 01:00:04,480
Yes.

996
01:00:04,480 --> 01:00:08,480
So I didn't mind.

997
01:00:08,480 --> 01:00:10,480
Yeah.

998
01:00:10,480 --> 01:00:11,480
But why would we?

999
01:00:18,480 --> 01:00:24,320
Like, how come the element returns 10 to the empty?

1000
01:00:24,320 --> 01:00:27,000
Because we're indexing into mq.

1001
01:00:27,000 --> 01:00:30,199
So if you index into mq, mq is your key.

1002
01:00:30,199 --> 01:00:32,840
So you grab the value associated with that key.

1003
01:00:32,840 --> 01:00:38,920
So that would be this list here, the 10 or for PS, it would be the list 10, 10.

1004
01:00:38,920 --> 01:00:44,640
So quick recap on list's indexionaries before we do one final longer example.

1005
01:00:44,640 --> 01:00:47,760
So again, lists are ordered sequences of elements, right?

1006
01:00:47,760 --> 01:00:49,880
There is some element at index 0.

1007
01:00:49,880 --> 01:00:52,720
There's some element in index 1, some element in index 2.

1008
01:00:52,720 --> 01:00:56,880
So we do have these, quote unquote, indices, right?

1009
01:00:56,880 --> 01:00:59,360
But there's an order to these indices.

1010
01:00:59,360 --> 01:01:04,800
And there has to be an element in index 0 and further up from there, right?

1011
01:01:04,800 --> 01:01:09,039
Dictionaries also have these quote unquote indices, which we call keys.

1012
01:01:09,039 --> 01:01:10,039
But these are custom.

1013
01:01:10,039 --> 01:01:16,000
So you can basically rearrange, you could think of it as being allowed to rearrange

1014
01:01:16,000 --> 01:01:17,680
indices, however you'd like, right?

1015
01:01:17,680 --> 01:01:22,640
There's no order to the indices in a dictionary.

1016
01:01:22,640 --> 01:01:25,480
There are some restrictions on the keys or these indices.

1017
01:01:25,480 --> 01:01:29,200
So they can't be immutable, okay, hashable.

1018
01:01:29,199 --> 01:01:35,480
But other than that, the things that you store related to that key can be any type,

1019
01:01:35,480 --> 01:01:38,919
just like you can store any type in a list.

1020
01:01:40,079 --> 01:01:44,079
So the last thing I'd like to go through is a larger example.

1021
01:01:44,079 --> 01:01:47,599
And this was showcased a whole bunch of things that we've been talking about so

1022
01:01:47,599 --> 01:01:47,919
far.

1023
01:01:47,919 --> 01:01:51,960
It was showcased sort of how to, first of all,

1024
01:01:51,960 --> 01:01:54,279
create dictionaries, which is what we did today.

1025
01:01:54,279 --> 01:01:57,960
It was showcased how to reuse functions, how to write functions and

1026
01:01:57,960 --> 01:02:00,199
reuse functions in other places.

1027
01:02:00,199 --> 01:02:02,720
It was showcased a little bit of mutability as well.

1028
01:02:04,159 --> 01:02:06,679
But this is all in a larger example.

1029
01:02:06,679 --> 01:02:12,000
And if I go a little bit faster this, I've given you Python Tutor links and

1030
01:02:12,000 --> 01:02:16,000
it's also in the file to run on your own.

1031
01:02:16,000 --> 01:02:24,920
So the goal of this last example is to basically find the most common words in a song's lyrics.

1032
01:02:24,920 --> 01:02:28,880
And dictionaries are going to be really useful for doing something like this.

1033
01:02:28,880 --> 01:02:31,599
So I'm going to show you, first of all, what we want to end up with.

1034
01:02:31,599 --> 01:02:36,119
And then we can talk about how to divide this larger problem into smaller pieces.

1035
01:02:38,240 --> 01:02:41,760
So, okay, so those are all the pieces.

1036
01:02:41,760 --> 01:02:49,000
But basically what I want to end up with is I want to have a song be stored as a string.

1037
01:02:49,880 --> 01:02:50,880
Okay?

1038
01:02:50,880 --> 01:02:53,960
You'll recognize these, but these are very old.

1039
01:02:53,960 --> 01:02:56,280
I actually haven't updated these songs for a few years.

1040
01:02:56,280 --> 01:02:58,199
But yeah, anyway, don't judge.

1041
01:02:58,199 --> 01:03:00,760
So I've got a song stored as a string.

1042
01:03:02,360 --> 01:03:05,000
And I'm going to run each individual function.

1043
01:03:05,000 --> 01:03:10,760
But in the end, what I'd like to do is come up with something like this.

1044
01:03:10,760 --> 01:03:16,239
So I want to present the user the top most common words in the song.

1045
01:03:17,239 --> 01:03:18,599
So here I have a list.

1046
01:03:18,599 --> 01:03:21,279
So you can see OpenCloseCirc bracket tells me it's a list.

1047
01:03:21,279 --> 01:03:23,039
And I've got elements in my list.

1048
01:03:23,039 --> 01:03:29,679
So here's the first element in my list, which tells the user that the word I occurs 18 times.

1049
01:03:30,839 --> 01:03:36,039
The next element in my list tells the user that the word we occurs 17 times.

1050
01:03:36,039 --> 01:03:42,319
The next element tells the user that the words ain't ever getting older occur all 16 times.

1051
01:03:42,319 --> 01:03:43,399
And then so on, right?

1052
01:03:43,400 --> 01:03:48,400
So we're decreasing in frequency with the most common word occurring 18 times.

1053
01:03:48,400 --> 01:03:56,519
And then I'm showing the user the most common words down to and including six.

1054
01:03:56,519 --> 01:03:58,519
So I would choose some arbitrary value.

1055
01:03:58,519 --> 01:04:02,400
I want to find in the song the words that occur at least six times, for example.

1056
01:04:03,680 --> 01:04:05,440
So that's the goal of this program.

1057
01:04:07,960 --> 01:04:09,200
So how will you achieve this?

1058
01:04:09,200 --> 01:04:11,400
It's obviously a pretty big task.

1059
01:04:11,400 --> 01:04:16,400
I wouldn't want to code the entire thing right off the bat.

1060
01:04:16,400 --> 01:04:19,920
But we can actually divide it into three smaller pieces.

1061
01:04:21,000 --> 01:04:26,519
The first piece, and we're going to write the code for this, is to create something called a frequency dictionary.

1062
01:04:26,519 --> 01:04:34,000
So given a string of words, we're going to create a dictionary that maps each word to how often it occurs.

1063
01:04:34,000 --> 01:04:37,559
So fancy word, frequency dictionary, but it's pretty simple.

1064
01:04:37,559 --> 01:04:41,320
It just maps the word to its count inside my long string.

1065
01:04:42,840 --> 01:04:48,440
So this presents the data, which is this string of words in a much nicer format, right?

1066
01:04:48,440 --> 01:04:51,639
It's a dictionary that tells me the frequency of each word.

1067
01:04:53,039 --> 01:04:56,079
Once I have that in hand, things get a little bit easier.

1068
01:04:56,079 --> 01:05:01,519
I can write another function that finds the word that occurs most often in that dictionary.

1069
01:05:02,519 --> 01:05:07,000
So the way I'm going to do that is look up the frequencies in the values.

1070
01:05:07,000 --> 01:05:13,119
Find the maximum of those values, and then figure out which keys are associated with that maximum value.

1071
01:05:15,159 --> 01:05:19,880
And this is all made possible because I've reimagined my data in this frequency dictionary format.

1072
01:05:21,119 --> 01:05:26,920
The last step, once I figure out how to write a function that returns for me,

1073
01:05:26,920 --> 01:05:32,800
the words that occurred the most times, is to find the words that occur at least some number of times.

1074
01:05:33,800 --> 01:05:38,720
And I'll go through an example of this one in a few slides when we get to it.

1075
01:05:38,720 --> 01:05:43,880
But this last function here, number three, you can actually rewrite it in a whole bunch of ways.

1076
01:05:43,880 --> 01:05:45,560
I'm just going to show you one way to write it.

1077
01:05:45,560 --> 01:05:50,440
That'll involve mutability, but you don't have to do it using mutability.

1078
01:05:50,440 --> 01:05:55,080
You can definitely do it in a whole bunch of, you know, with a whole bunch of other implementations.

1079
01:05:56,079 --> 01:06:03,079
So let's begin by first creating a dictionary that maps the word to their frequencies.

1080
01:06:03,079 --> 01:06:13,079
So I've picked a song that it has a real song, and it has some repetition, and it's short that it fits in one line.

1081
01:06:13,079 --> 01:06:19,079
So I've got this song here, and I've got my function generate word dictionary.

1082
01:06:19,079 --> 01:06:22,079
The song is a string.

1083
01:06:22,079 --> 01:06:29,079
So it's basically the song a little bit cleaned up, not in terms of words, but in terms of removing punctuation,

1084
01:06:29,079 --> 01:06:36,079
removing commas, maybe extramations, or I might have kept quotations or something like that.

1085
01:06:36,079 --> 01:06:43,079
But basically it's removing all of the punctuation stuff, because that will mess up my word counts.

1086
01:06:43,079 --> 01:06:47,079
So what is this function going to do, given a string for my song?

1087
01:06:47,079 --> 01:06:51,079
Well first, I'm going to convert all my letters to lowercase.

1088
01:06:51,079 --> 01:07:00,079
This means that, you know, capital THG will be counted as the same word as lowercase THG, which is the correct way to do it.

1089
01:07:00,079 --> 01:07:03,079
So convert everything to lowercase.

1090
01:07:03,079 --> 01:07:10,079
Then I'm going to use our friend, the split function, remember, which takes in my string and splits on a character.

1091
01:07:10,079 --> 01:07:13,079
So by default it'll split on the space.

1092
01:07:13,079 --> 01:07:22,079
This puts our string of words in a very manageable format, a list of words.

1093
01:07:22,079 --> 01:07:26,079
Much nicer to work with lists than work with a string.

1094
01:07:26,079 --> 01:07:32,079
Now that I have my word list, I'm going to create my empty dictionary and then populate it.

1095
01:07:32,079 --> 01:07:38,079
So I'm iterating over my list of words, and then I have a choice.

1096
01:07:38,079 --> 01:07:42,079
I've seen this word already, and I want to update the frequency.

1097
01:07:42,079 --> 01:07:48,079
So I want to increase the frequency by one, because I've already added this word to my dictionary.

1098
01:07:48,079 --> 01:07:54,079
Or this is the first time I'm seeing this word, and I want to add it to my dictionary with a frequency of one.

1099
01:07:54,079 --> 01:08:00,079
So the first case here would be if we'll update the frequency, because I've already seen the word in my dictionary.

1100
01:08:00,079 --> 01:08:05,079
So here, I'm using the in-key word to check if the key, the word, is already in my dictionary.

1101
01:08:05,079 --> 01:08:08,079
If so, I increase its frequency by one.

1102
01:08:08,079 --> 01:08:15,079
Otherwise, this is the first time I'm adding my word to my dictionary, so give it a frequency of one.

1103
01:08:15,079 --> 01:08:17,079
And then I return the word dictionary.

1104
01:08:17,079 --> 01:08:22,079
So this will map strings to integers.

1105
01:08:22,079 --> 01:08:29,079
Let's work through it in the Python tutor.

1106
01:08:30,079 --> 01:08:34,079
So step, step, step, step, step.

1107
01:08:34,079 --> 01:08:37,079
Lowercase my input string, step.

1108
01:08:37,079 --> 01:08:38,079
I've split it.

1109
01:08:38,079 --> 01:08:42,079
So now I've got this list of all of my words.

1110
01:08:42,079 --> 01:08:44,079
Step.

1111
01:08:44,079 --> 01:08:45,079
This is where we begin.

1112
01:08:45,079 --> 01:08:47,079
So I've created my empty dictionary over here.

1113
01:08:47,079 --> 01:08:50,079
This is, keep an eye on this area here.

1114
01:08:50,079 --> 01:08:52,079
It will be come populated soon.

1115
01:08:52,079 --> 01:08:55,079
The first word, W, is raw.

1116
01:08:55,079 --> 01:08:57,079
Right? It's the first word in my list.

1117
01:08:57,079 --> 01:09:00,079
It's obviously the first time I'm seeing it.

1118
01:09:00,079 --> 01:09:04,079
I have nothing in my dictionary right now, so I'm going to pop in my else.

1119
01:09:04,079 --> 01:09:08,079
And I'm going to add it to my dictionary with a frequency of one.

1120
01:09:08,079 --> 01:09:10,079
Okay, that worked.

1121
01:09:10,079 --> 01:09:15,079
Next, word in my dictionary is this, in my list is this one.

1122
01:09:15,079 --> 01:09:17,079
Same word, I've already seen.

1123
01:09:17,079 --> 01:09:21,079
So I'm going to go inside the if and increase the frequency to two.

1124
01:09:21,079 --> 01:09:22,079
Right?

1125
01:09:22,079 --> 01:09:23,079
Raw is now two.

1126
01:09:23,079 --> 01:09:26,079
Next is ah.

1127
01:09:26,079 --> 01:09:28,079
Right? So here's my word.

1128
01:09:28,079 --> 01:09:29,079
I've got the next one.

1129
01:09:29,079 --> 01:09:31,079
In my list, it's the first time I'm seeing it.

1130
01:09:31,079 --> 01:09:34,079
Add it to my dictionary with a frequency of one.

1131
01:09:34,079 --> 01:09:39,079
Next word I'm seeing is, again, increase its frequency to two.

1132
01:09:39,079 --> 01:09:41,079
And I'm going to go faster now.

1133
01:09:41,079 --> 01:09:43,079
This is increasing the frequency to three.

1134
01:09:43,079 --> 01:09:44,079
Right?

1135
01:09:44,079 --> 01:09:45,079
Because I've seen it three times now.

1136
01:09:45,079 --> 01:09:49,079
And then I'm adding Rome for the first time.

1137
01:09:49,079 --> 01:09:51,079
Ma for the first time.

1138
01:09:51,079 --> 01:09:55,079
And Rome for the first time.

1139
01:09:55,079 --> 01:09:59,079
And lastly, I'm going to increase Ma.

1140
01:09:59,079 --> 01:10:03,079
Frequency two more times because it occurs two more times in my song.

1141
01:10:03,079 --> 01:10:04,079
Right?

1142
01:10:04,079 --> 01:10:05,079
So that it's increased to two.

1143
01:10:05,079 --> 01:10:06,079
And now it's increased to three.

1144
01:10:06,079 --> 01:10:07,079
And then we're done.

1145
01:10:07,079 --> 01:10:10,079
So we return the word dictionary.

1146
01:10:10,079 --> 01:10:14,079
Really nice way to represent my list, my song.

1147
01:10:14,079 --> 01:10:15,079
Right?

1148
01:10:15,079 --> 01:10:16,079
Very nice.

1149
01:10:17,079 --> 01:10:18,079
Okay.

1150
01:10:18,079 --> 01:10:22,079
So now that I have this frequency dictionary, and I've put it up here,

1151
01:10:22,079 --> 01:10:24,079
this is what we ended up with.

1152
01:10:24,079 --> 01:10:29,079
How can we write a function that returns for me the most frequent word?

1153
01:10:29,079 --> 01:10:36,079
So one thing we can recognize is the most frequent word has the highest value,

1154
01:10:36,079 --> 01:10:40,079
Python dictionary value, in my dictionary.

1155
01:10:40,079 --> 01:10:41,079
Right?

1156
01:10:42,079 --> 01:10:48,079
So as a human, I would kind of look to see which one of these entries have the biggest value.

1157
01:10:48,079 --> 01:10:53,079
As a computer, I can't really do that because I have to do it a little bit more systematically.

1158
01:10:53,079 --> 01:10:59,079
So what we can say is, well, let's look at our values and grab the maximum of the values.

1159
01:10:59,079 --> 01:11:08,079
So here I'm using this dot values function on my dictionary to grab for me all of the values in my dictionary.

1160
01:11:08,079 --> 01:11:12,079
So this will be kind of like the list 2, 3, 1, 3, 1.

1161
01:11:12,079 --> 01:11:15,079
And then I'm running the max function on that list.

1162
01:11:15,079 --> 01:11:20,079
So max of this list of numbers gives me the maximum value in that list, the three.

1163
01:11:20,079 --> 01:11:24,079
So highest now has the value into your three.

1164
01:11:24,079 --> 01:11:30,079
And now all I need to do is iterate over my element, entries in my dictionary.

1165
01:11:30,079 --> 01:11:33,079
So this is KV in the items.

1166
01:11:33,079 --> 01:11:39,079
And I'm checking now inside this iteration is if the value is equal to the highest.

1167
01:11:39,079 --> 01:11:45,079
So as I'm looking at each entry is the value for that entry the same as the highest one I've seen.

1168
01:11:45,079 --> 01:11:53,079
If it is, I'm going to maintain a list of all the words with that highest value because there might be more than one word that has that highest value.

1169
01:11:53,079 --> 01:12:00,079
As we saw when we actually ran it here, right, here I had a list of all of these words that occurred 16 times.

1170
01:12:00,079 --> 01:12:06,079
So that's kind of the output that I want to maintain.

1171
01:12:06,079 --> 01:12:13,079
So I'm appending to my words list and at the end I'm returning this tuple with the words comma that highest value.

1172
01:12:13,079 --> 01:12:18,079
So Python tutor, like in the previous time.

1173
01:12:18,079 --> 01:12:21,079
So let's create our original dictionaries.

1174
01:12:21,079 --> 01:12:23,079
This is what we ended up with last time.

1175
01:12:23,079 --> 01:12:25,079
So the highest value is 3 here.

1176
01:12:25,079 --> 01:12:31,079
And I'm going to look through each entry in my dictionary so you can see KV is going to be each one of these in order.

1177
01:12:31,079 --> 01:12:34,079
So first it's raw to then it's a three and so on.

1178
01:12:34,079 --> 01:12:36,079
Obviously the two is not equal to the three.

1179
01:12:36,079 --> 01:12:38,079
So we move on.

1180
01:12:38,079 --> 01:12:39,079
The three equals the three.

1181
01:12:39,079 --> 01:12:43,079
So we take the a and boom, add it to my list here.

1182
01:12:43,079 --> 01:12:48,079
So this is the list I'm maintaining of all the words that occur with that frequency three.

1183
01:12:48,079 --> 01:12:51,079
Next, no for your own.

1184
01:12:51,079 --> 01:12:52,079
Yes for ma.

1185
01:12:52,079 --> 01:12:58,079
So I'm going to add it to my list and then no for row and I'm done.

1186
01:12:58,079 --> 01:13:09,079
So the return is going to be this list, this tuple here with the list of the words that occur three times.

1187
01:13:09,079 --> 01:13:12,079
Okay, good.

1188
01:13:12,079 --> 01:13:13,079
Last part.

1189
01:13:13,079 --> 01:13:15,079
I'm not going to go through Python tutor.

1190
01:13:15,079 --> 01:13:18,079
I did include a link to it because it becomes very messy with the arrows.

1191
01:13:18,079 --> 01:13:22,079
So I'm going to put it to the list and I'm going to go through it.

1192
01:13:22,079 --> 01:13:25,079
I'm going to take it to the list and I'm going to tell you what I do encourage you to try it.

1193
01:13:25,079 --> 01:13:28,079
I will explain the way that I chose to solve this problem.

1194
01:13:28,079 --> 01:13:37,079
So I chose to solve this problem to include mutation and reusing the function that we just wrote that grabs for me the highest value.

1195
01:13:37,079 --> 01:13:42,079
And the words associated with that highest frequency value.

1196
01:13:42,079 --> 01:13:44,079
So this is the idea.

1197
01:13:44,079 --> 01:13:47,079
I have my original word dictionary.

1198
01:13:47,079 --> 01:13:51,079
This is the frequency dictionary we created right off the bat.

1199
01:13:51,079 --> 01:13:58,079
What I'm going to do is look to see which words occur with the highest frequency.

1200
01:13:58,079 --> 01:14:01,079
So the highest frequency, my function from before,

1201
01:14:01,079 --> 01:14:04,079
it figures out that it's three,

1202
01:14:04,079 --> 01:14:10,079
and it figures out the words associated with that three are a and ma.

1203
01:14:10,079 --> 01:14:13,079
That's exactly what we just did.

1204
01:14:13,079 --> 01:14:17,079
So I'm going to grab those words and those entries in the dictionary.

1205
01:14:17,079 --> 01:14:21,079
And then I'm going to mutate the dictionary to remove those words,

1206
01:14:21,079 --> 01:14:26,079
because I know those words occur with the highest frequency.

1207
01:14:26,079 --> 01:14:29,079
So now I've removed those words,

1208
01:14:29,079 --> 01:14:33,079
and I've saved them because they were the result of the function that I had just run.

1209
01:14:33,079 --> 01:14:36,079
So I'm maintaining this frequency list,

1210
01:14:36,079 --> 01:14:39,079
which will contain all the words that occur at least,

1211
01:14:39,079 --> 01:14:45,079
I guess I said greater than one time, so at least two times.

1212
01:14:45,079 --> 01:14:48,079
So I'm going to grab the ones that occur three in two times.

1213
01:14:48,079 --> 01:14:52,079
So right now I had just grabbed the words that occur three times.

1214
01:14:52,079 --> 01:14:55,079
I've removed them from my dictionary.

1215
01:14:55,079 --> 01:14:58,079
So I've actually mutated my dictionary to remove those words.

1216
01:14:58,079 --> 01:15:04,079
Now, if I run the exact same function that I just wrote on the previous slide,

1217
01:15:04,079 --> 01:15:09,079
on this mutated dictionary, which words will it give me?

1218
01:15:09,079 --> 01:15:13,079
Which words occur the most now?

1219
01:15:13,079 --> 01:15:15,079
Exactly, right?

1220
01:15:15,079 --> 01:15:19,079
Now the highest value in my dictionary and this frequency dictionary is two,

1221
01:15:19,079 --> 01:15:22,079
because I mutated to remove what was previously the highest value.

1222
01:15:22,079 --> 01:15:28,079
So I'm running the same function again on the mutated dictionary to give me just the raw.

1223
01:15:29,079 --> 01:15:33,079
So I grab that, keep track of that in my frequency list,

1224
01:15:33,079 --> 01:15:35,079
right?

1225
01:15:35,079 --> 01:15:38,079
Mutate the dictionary to remove that.

1226
01:15:38,079 --> 01:15:44,079
And as I'm doing that, I'm also keeping track to make sure that the highest frequency I have in the remaining dictionary

1227
01:15:44,079 --> 01:15:47,079
is at least whatever I was interested in.

1228
01:15:47,079 --> 01:15:49,079
So here I want it at least two.

1229
01:15:49,079 --> 01:15:54,079
So this function, the one I'll write, will no longer grab any other values from the dictionary,

1230
01:15:54,079 --> 01:15:57,079
because now one frequency one, I don't want to grab.

1231
01:15:58,079 --> 01:16:01,079
So this is the resulting value.

1232
01:16:01,079 --> 01:16:02,079
And that's the idea.

1233
01:16:02,079 --> 01:16:05,079
We're using mutability and the function we just wrote to do this task.

1234
01:16:05,079 --> 01:16:07,079
And this is the code that does that.

1235
01:16:07,079 --> 01:16:11,079
So this runs the function we wrote previously, step number two,

1236
01:16:11,079 --> 01:16:15,079
gives us that list, that tuple with the list of all the words.

1237
01:16:15,079 --> 01:16:21,079
This loop here, make sure I still have frequencies that are at least x in the dictionary.

1238
01:16:22,079 --> 01:16:26,079
I grab the tuple that I just created, so something like this,

1239
01:16:26,079 --> 01:16:28,079
and add it to my frequency list.

1240
01:16:28,079 --> 01:16:31,079
So this is the resulting list that I'm keeping track of.

1241
01:16:31,079 --> 01:16:34,079
And then this bit here removes the word for my dictionary.

1242
01:16:34,079 --> 01:16:37,079
So I'm mutating the dictionary using this del keyword that we saw,

1243
01:16:37,079 --> 01:16:39,079
at the beginning of this lecture.

1244
01:16:39,079 --> 01:16:41,079
Yeah, question.

1245
01:16:42,079 --> 01:16:43,079
Yeah.

1246
01:16:43,079 --> 01:16:51,079
I guess what I just did is, why is the word, well, the nonsense, the matter.

1247
01:17:01,079 --> 01:17:05,079
So I think maybe it's because the function, I forget what the specification said,

1248
01:17:05,079 --> 01:17:09,079
but I don't know if it said at least two, or greater than two.

1249
01:17:10,079 --> 01:17:12,079
Or greater, at least x or greater than x.

1250
01:17:12,079 --> 01:17:15,079
It depends on which one I actually said in the specification.

1251
01:17:15,079 --> 01:17:19,079
But you can imagine changing this to greater than or greater than or equal to.

1252
01:17:19,079 --> 01:17:24,079
And then we're running this function again inside this y-loop to grab the frequency value.

1253
01:17:24,079 --> 01:17:26,079
Yeah.

1254
01:17:26,079 --> 01:17:29,079
So these are just the observations I actually stated at the beginning of this example.

1255
01:17:29,079 --> 01:17:34,079
A bunch of the different things that we've learned that we're using within this example.

1256
01:17:34,079 --> 01:17:39,079
So slicing, or splitting, iterating over the list directly,

1257
01:17:39,079 --> 01:17:44,079
mutability, using the items, things like that.

1258
01:17:44,079 --> 01:17:45,079
So that's it.

1259
01:17:45,079 --> 01:17:47,079
That's all I have.

1260
01:17:47,079 --> 01:17:48,079
I'll see you guys on Monday.

1261
01:17:48,079 --> 01:17:50,079
Monday is Halloween.

1262
01:17:50,079 --> 01:17:54,079
If you'd like to bring a costume, I love Halloween.

1263
01:17:54,079 --> 01:17:58,079
I will wear something different than what I usually wear.

1264
01:18:04,079 --> 01:18:06,079
You

