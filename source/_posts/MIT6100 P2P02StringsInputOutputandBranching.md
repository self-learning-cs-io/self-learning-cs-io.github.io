---
title: MIT6100 P2P02StringsInputOutputandBranching
---

1
00:00:00,000 --> 00:00:14,599
So let's start today's lecture.

2
00:00:14,599 --> 00:00:17,960
We're going to be looking at sort of three different topics.

3
00:00:17,960 --> 00:00:21,480
The first is we're going to look at a new object type called the string.

4
00:00:21,480 --> 00:00:24,400
We briefly mentioned this word last lecture.

5
00:00:24,400 --> 00:00:29,800
Then we're going to see how we can write programs that start to get input from the user and show

6
00:00:29,800 --> 00:00:31,800
the user output.

7
00:00:31,800 --> 00:00:39,520
And finally, we're going to go into writing a little bit more interesting programs that make

8
00:00:39,520 --> 00:00:44,359
decisions based on decisions that we actually input in the code.

9
00:00:44,359 --> 00:00:49,760
So not decision spontaneously, but things that we will code within our programs.

10
00:00:49,760 --> 00:00:53,960
But before we go onto these topics, I just wanted to do a quick recap of what we learned

11
00:00:53,960 --> 00:00:57,040
last lecture just to make sure we're all on the same page.

12
00:00:57,039 --> 00:00:59,200
So we introduced the idea of an object.

13
00:00:59,200 --> 00:01:02,000
And every object in Python has a specific type.

14
00:01:02,000 --> 00:01:07,680
And the type tells Python the kinds of things you're allowed to do with that object.

15
00:01:07,680 --> 00:01:12,079
We talked about once you have objects, you can actually assign these objects to variables

16
00:01:12,079 --> 00:01:16,640
and these variables basically bind a name to the object in memory.

17
00:01:16,640 --> 00:01:21,400
With objects, you can also create expressions by combining objects together.

18
00:01:21,400 --> 00:01:26,239
And the expressions can either be things that we've seen in math, like parentheses and

19
00:01:26,239 --> 00:01:32,599
words with object operator, object, object, or they can be things like this, which was

20
00:01:32,599 --> 00:01:35,159
kind of introduced in programming.

21
00:01:35,159 --> 00:01:37,959
It's an expression, but it's kind of a different one.

22
00:01:37,959 --> 00:01:39,879
It's more like a command.

23
00:01:39,879 --> 00:01:43,640
Or I'm asking Python to do this operation for me.

24
00:01:43,640 --> 00:01:46,919
What is the object that comes back from this operation?

25
00:01:46,919 --> 00:01:52,280
So today, I'm going to go over this little sort of memory diagram.

26
00:01:52,280 --> 00:01:57,400
I started drawing last lecture and I'm going to use this memory diagram today as well.

27
00:01:57,400 --> 00:01:59,680
Here's some lines of code that we wrote last lecture.

28
00:01:59,680 --> 00:02:05,120
So we wrote a line in Python that created an object.

29
00:02:05,120 --> 00:02:08,920
Its value is 3.14, a float in memory.

30
00:02:08,920 --> 00:02:11,879
And the name we gave this object was pi.

31
00:02:11,879 --> 00:02:17,039
So just the name pi, pi.

32
00:02:17,039 --> 00:02:20,920
Radius equals 2.2 is another assignment statement in Python.

33
00:02:20,919 --> 00:02:24,719
And it binds the name radius to the value 2.2 in memory.

34
00:02:24,719 --> 00:02:28,199
And once we've created these variables, we can just invoke their names.

35
00:02:28,199 --> 00:02:32,839
We can use their names to tell Python to grab for me the values from memory.

36
00:02:32,839 --> 00:02:39,079
So when Python sees pi times radius star star 2, that means take pi multiply with the radius

37
00:02:39,079 --> 00:02:40,079
squared.

38
00:02:40,079 --> 00:02:45,399
So behind the scenes, Python goes grabs the value 3.14 from memory, replaces pi with that

39
00:02:45,399 --> 00:02:50,839
value, grabs 2.2 from memory, replaces radius with that value, does the operation,

40
00:02:50,840 --> 00:02:53,159
according to the precedence rules.

41
00:02:53,159 --> 00:02:59,280
And then that expression, the thing on the right hand side of this equal sign, becomes a

42
00:02:59,280 --> 00:03:01,319
value.

43
00:03:01,319 --> 00:03:05,920
That value is then created as a new object in memory right here.

44
00:03:05,920 --> 00:03:08,759
And that object in memory is then bound to the name area.

45
00:03:08,759 --> 00:03:12,599
That's exactly what this assignment statement said.

46
00:03:12,599 --> 00:03:18,080
And we can do something like this in Python, which we can't actually do in math, right?

47
00:03:18,080 --> 00:03:22,120
If we did this in math, the expression would basically say 0 equals 1.

48
00:03:22,120 --> 00:03:24,720
But in Python, it's totally fine.

49
00:03:24,720 --> 00:03:29,000
Because again, we evaluate the thing on the right hand side of the equal sign.

50
00:03:29,000 --> 00:03:32,680
So on the right hand side of the equal sign, we say I want to grab the value of radius,

51
00:03:32,680 --> 00:03:38,960
so 2.2, add 1 to it, 3.2, create this object in memory.

52
00:03:38,960 --> 00:03:43,760
Here I have a whole new object in memory, 3.2, and then assign it to the name radius.

53
00:03:43,759 --> 00:03:50,879
So I've lost the binding from the original 2.2 and rebound the name to 3.2.

54
00:03:50,879 --> 00:03:53,159
So we're not modifying objects in memory.

55
00:03:53,159 --> 00:03:57,719
We're creating new objects in memory whenever we do such operations.

56
00:03:57,719 --> 00:04:02,799
We're going to see how we can modify objects way into the future.

57
00:04:02,799 --> 00:04:07,799
And just serve for completion, when we have a line that says var is equal type 5 multiplied

58
00:04:07,799 --> 00:04:10,840
by 4, Python also sees this as an expression.

59
00:04:10,840 --> 00:04:13,159
And so as an expression, it has a value.

60
00:04:13,159 --> 00:04:17,920
So the right hand side of this equal sign says, well, I'm going to sort of systematically

61
00:04:17,920 --> 00:04:21,079
evaluate this and say what's 5 times 4?

62
00:04:21,079 --> 00:04:22,920
It's 20.

63
00:04:22,920 --> 00:04:23,920
What's the type of 20?

64
00:04:23,920 --> 00:04:25,399
It's an integer.

65
00:04:25,399 --> 00:04:28,959
And so that's what the right hand side evaluates to an integer.

66
00:04:28,959 --> 00:04:34,399
And I'm going to bind that value int to the name var.

67
00:04:34,399 --> 00:04:39,439
So var is another variable name, and its value is int, the type of my object.

68
00:04:39,439 --> 00:04:40,759
Which is a little strange, right?

69
00:04:40,759 --> 00:04:47,759
So far, we've kind of just put numbers in our memory, but we can put any object type in memory.

70
00:04:47,759 --> 00:04:54,279
OK, so let's move on a little bit onto the new object type called a string.

71
00:04:54,279 --> 00:04:58,680
So a string is actually a sequence of case sensitive characters.

72
00:04:58,680 --> 00:05:00,839
The characters can be anything.

73
00:05:00,839 --> 00:05:04,959
We have lower case letters, upper case letters, the numbers on your keyboard, the special

74
00:05:04,959 --> 00:05:07,079
characters you see on the keyboard.

75
00:05:07,079 --> 00:05:12,680
And then the enter, when you do a new line, or a tab has a special character associated

76
00:05:12,680 --> 00:05:14,000
with it.

77
00:05:14,000 --> 00:05:19,240
And the way we tell Python, we're creating an object of type string, is by enclosing the

78
00:05:19,240 --> 00:05:23,240
characters we want to be part of that object in these quotation marks.

79
00:05:23,240 --> 00:05:27,240
So when Python sees the quotation mark in, knows you're creating a string object.

80
00:05:27,240 --> 00:05:31,959
So here I'm creating the string object, which has the lower case letter m, lower case

81
00:05:31,959 --> 00:05:33,560
letter e.

82
00:05:33,560 --> 00:05:38,079
And here I'm creating the string object, which has the lower case y, lower case o, and

83
00:05:38,079 --> 00:05:40,040
lower case u letters.

84
00:05:40,040 --> 00:05:44,120
And these objects are things in Python.

85
00:05:44,120 --> 00:05:49,199
And we're just going to give them a handle, a binding, with some more convenient variable

86
00:05:49,199 --> 00:05:51,759
names, a and z.

87
00:05:51,759 --> 00:05:55,319
So in memory, the way this would look in a little memory diagram is we would have the

88
00:05:55,319 --> 00:05:59,279
string characters, me, bound to the variable a.

89
00:05:59,279 --> 00:06:01,879
So basically what we've seen before.

90
00:06:02,600 --> 00:06:05,719
All right, so now what are some things we can do with strings?

91
00:06:05,719 --> 00:06:11,159
Well, some really common operations are that we can concatenate strings, or we can repeat

92
00:06:11,159 --> 00:06:12,879
strings.

93
00:06:12,879 --> 00:06:15,639
So here, I'm not going to put the z in memory.

94
00:06:15,639 --> 00:06:17,319
You can kind of imagine how that would look like.

95
00:06:17,319 --> 00:06:24,519
But let's see, I create now a variable b equals the letters m y s, l f.

96
00:06:24,519 --> 00:06:27,759
What if I do a plus operator between these two strings?

97
00:06:27,759 --> 00:06:31,159
The plus operator tells Python that I'm going to take these two strings.

98
00:06:31,160 --> 00:06:35,480
The individual characters in each string, and kind of just put them together to make one

99
00:06:35,480 --> 00:06:39,360
new object that is all of these letters put together.

100
00:06:39,360 --> 00:06:44,160
So c is equal to a plus b is another assignment operator.

101
00:06:44,160 --> 00:06:48,920
And on the right hand side, we have an expression plus operator between two objects.

102
00:06:48,920 --> 00:06:56,520
It's going to put me, which is the c letters, and the m y s, l f, the b letters altogether

103
00:06:56,519 --> 00:07:01,759
to create a new object, which I then give a handle or a binding c.

104
00:07:01,759 --> 00:07:08,839
So from now on, anytime I want this particular string of characters, and we m y s, l f, I can

105
00:07:08,839 --> 00:07:11,479
just invoke the name c in my program.

106
00:07:11,479 --> 00:07:15,439
That's just the variable name that I gave it.

107
00:07:15,439 --> 00:07:17,560
Now notice it didn't insert a space, right?

108
00:07:17,560 --> 00:07:22,479
It didn't do me space myself, because we didn't tell it to do a space.

109
00:07:22,480 --> 00:07:25,920
So if we wanted to do a space, we'd have to put it in ourselves.

110
00:07:25,920 --> 00:07:26,920
So we can concatenate.

111
00:07:26,920 --> 00:07:34,040
So we can have a larger expression where we concatenate a with a space and with b together.

112
00:07:34,040 --> 00:07:39,960
So that will give me an entirely new object in memory, the string m e space m y s, l f.

113
00:07:39,960 --> 00:07:42,520
This new object is bound to the name d.

114
00:07:42,520 --> 00:07:45,520
Is that okay so far?

115
00:07:45,520 --> 00:07:47,160
Does that make sense?

116
00:07:47,160 --> 00:07:48,160
Okay.

117
00:07:48,160 --> 00:07:49,160
All right.

118
00:07:49,160 --> 00:07:52,960
So that concatenation basically takes these two string characters, puts them together in

119
00:07:52,960 --> 00:07:54,280
a new object.

120
00:07:54,280 --> 00:07:55,280
What about the star?

121
00:07:55,280 --> 00:07:59,560
I kind of briefly talked about this as repeating something last lecture.

122
00:07:59,560 --> 00:08:04,040
Well, the star operator works between a string and a number.

123
00:08:04,040 --> 00:08:05,600
It doesn't work between a string and a string.

124
00:08:05,600 --> 00:08:08,520
It doesn't work between, you know, things like that.

125
00:08:08,520 --> 00:08:11,760
It works between a string and a number in either order.

126
00:08:11,760 --> 00:08:15,400
So a number string or a string times number.

127
00:08:15,400 --> 00:08:17,680
So here again, it's an assignment operator.

128
00:08:17,680 --> 00:08:21,840
So right hand side, we're going to figure out what it evaluates to first.

129
00:08:21,840 --> 00:08:25,680
So a times three means I'm going to repeat this particular sequence of characters, m e,

130
00:08:25,680 --> 00:08:27,800
because that's what a is.

131
00:08:27,800 --> 00:08:30,400
It's m e, three times.

132
00:08:30,400 --> 00:08:36,200
So this line of code here is going to create m e, m e, m e as a new object.

133
00:08:36,200 --> 00:08:39,399
And the equal sign tells it to bind it to the name silly.

134
00:08:39,399 --> 00:08:44,080
So anytime I want to grab this particular string of characters for memory, I can just type

135
00:08:44,080 --> 00:08:49,080
in silly in my program and that will automatically grab that particular sequence of characters

136
00:08:49,080 --> 00:08:51,080
from memory.

137
00:08:51,080 --> 00:08:56,280
All right, let's do a quick exercise to make sure that you all have this.

138
00:08:56,280 --> 00:09:04,280
And as you're thinking about what this does, I can start typing it in to the console or

139
00:09:04,280 --> 00:09:07,240
you can either even type it in to check yourself.

140
00:09:07,240 --> 00:09:11,879
So b is going to be colon and c is going to be the close parenthesis.

141
00:09:11,879 --> 00:09:22,000
So if we go here, we have b is equal to just this colon and c is equal to the close parenthesis.

142
00:09:22,000 --> 00:09:26,799
And we don't have to do all the operations at once.

143
00:09:26,799 --> 00:09:31,480
We can just do something like two times c and figure out what that is.

144
00:09:31,480 --> 00:09:34,600
It's just repeating the close parenthesis twice.

145
00:09:34,600 --> 00:09:43,920
And then we can do b plus two times c to give us a colon close parenthesis, close parenthesis.

146
00:09:43,920 --> 00:09:47,680
So super happy.

147
00:09:47,680 --> 00:09:49,200
What about the next one?

148
00:09:49,200 --> 00:09:56,879
F is a g is actually the space b, right?

149
00:09:56,879 --> 00:10:00,320
So there's a space character in there, little tricky.

150
00:10:00,320 --> 00:10:03,360
And h is three.

151
00:10:03,360 --> 00:10:07,080
Is this the number three or the string three for h?

152
00:10:07,080 --> 00:10:07,919
Yeah, exactly.

153
00:10:07,919 --> 00:10:10,480
It's the string three.

154
00:10:10,480 --> 00:10:12,279
So what is f plus g?

155
00:10:12,279 --> 00:10:13,360
Again, we can do it in pieces.

156
00:10:13,360 --> 00:10:17,919
What is f plus g?

157
00:10:17,919 --> 00:10:19,639
A space b, exactly, right?

158
00:10:19,639 --> 00:10:25,039
A is my itself and g is a space b.

159
00:10:25,039 --> 00:10:29,240
What is int h?

160
00:10:29,240 --> 00:10:30,480
Yeah, it's just three.

161
00:10:30,480 --> 00:10:33,399
What's the type of three?

162
00:10:33,399 --> 00:10:34,240
Int, exactly.

163
00:10:34,240 --> 00:10:36,080
I just cast it to an int, right?

164
00:10:36,080 --> 00:10:42,680
So if I have f is equal to a, g is equal to space b.

165
00:10:42,680 --> 00:10:47,680
And h is equal to the string three.

166
00:10:47,680 --> 00:10:53,799
F plus g, we're doing it in a little bit at a time, right, is a space b.

167
00:10:53,799 --> 00:10:56,799
And h is just to see the string three here.

168
00:10:56,799 --> 00:11:04,359
So if I cast it to an integer, it gives me just the number three.

169
00:11:04,359 --> 00:11:09,359
And we can wrap each of these in a type command to see the exact type.

170
00:11:09,359 --> 00:11:12,120
But we can tell right away.

171
00:11:12,120 --> 00:11:19,039
So if we do f plus g multiplied by int of three,

172
00:11:19,039 --> 00:11:24,319
or sorry, int of h, which is just a three,

173
00:11:24,320 --> 00:11:27,640
it's going to repeat a space b three times, right?

174
00:11:27,640 --> 00:11:31,120
So there's one, there's two, and there's three.

175
00:11:31,120 --> 00:11:35,600
What would have happened if I forgot to cast it to an integer?

176
00:11:35,600 --> 00:11:37,720
What do you think?

177
00:11:37,720 --> 00:11:39,720
If I just did h.

178
00:11:39,720 --> 00:11:43,080
An error, yeah, exactly.

179
00:11:43,080 --> 00:11:44,280
They're not scary.

180
00:11:44,280 --> 00:11:46,840
They're kind of informative once you get to know them.

181
00:11:46,840 --> 00:11:48,080
So it's a type error, yeah.

182
00:11:48,080 --> 00:11:49,840
Something's wrong with our types.

183
00:11:49,840 --> 00:11:53,120
Can't multiply a sequence, so an integer,

184
00:11:53,120 --> 00:11:55,639
or a sequence by a non-integer.

185
00:12:00,560 --> 00:12:01,720
OK.

186
00:12:01,720 --> 00:12:04,840
So what are some other operations we can do with strings?

187
00:12:04,840 --> 00:12:06,480
There's some different things we can do with strings

188
00:12:06,480 --> 00:12:12,799
that we actually haven't seen with numbers in last lecture.

189
00:12:12,799 --> 00:12:14,240
One of the more common operations

190
00:12:14,240 --> 00:12:15,639
is to get the length of a string.

191
00:12:15,639 --> 00:12:18,919
So this tells us how many characters are in the string.

192
00:12:18,919 --> 00:12:21,200
So if we say s is equal to abc here,

193
00:12:21,200 --> 00:12:24,520
I'm creating a string with characters ab and c,

194
00:12:24,520 --> 00:12:26,560
and I'm giving it the name s.

195
00:12:26,560 --> 00:12:28,879
Now, anytime in my program, when I say s,

196
00:12:28,879 --> 00:12:33,400
Python will replace that with this string of characters abc.

197
00:12:33,400 --> 00:12:36,960
I could wrap s in this LEN command,

198
00:12:36,960 --> 00:12:39,480
and this LEN command is an expression.

199
00:12:39,480 --> 00:12:42,960
Basically, Python reads this, and it evaluates it to one value.

200
00:12:42,960 --> 00:12:46,879
So replaces this expression with one value.

201
00:12:46,879 --> 00:12:49,320
How many characters are in my string?

202
00:12:49,320 --> 00:12:53,120
So LEN s will basically become the number three.

203
00:12:53,120 --> 00:12:55,080
So in my program, I can say something

204
00:12:55,080 --> 00:12:58,680
like another assignment statement down here,

205
00:12:58,680 --> 00:13:01,360
charge is equal to LEN s.

206
00:13:01,360 --> 00:13:04,080
This is an expression, like in the previous line,

207
00:13:04,080 --> 00:13:05,800
that evaluates to three.

208
00:13:05,800 --> 00:13:08,400
So basically, this line says charge is equal to three.

209
00:13:12,280 --> 00:13:13,480
OK.

210
00:13:13,480 --> 00:13:15,200
That's a pretty simple operation with strings.

211
00:13:15,200 --> 00:13:19,520
Now we're going to get into a little bit more detailed ones

212
00:13:19,520 --> 00:13:23,360
that requires you to remember this Python syntax.

213
00:13:23,360 --> 00:13:26,280
So one thing we can do with strings

214
00:13:26,280 --> 00:13:30,840
is we can grab individual characters at different positions.

215
00:13:30,840 --> 00:13:33,640
So that's called slicing.

216
00:13:33,640 --> 00:13:37,240
The syntax, or the way that we actually do this in Python,

217
00:13:37,240 --> 00:13:38,720
is using square brackets.

218
00:13:38,720 --> 00:13:40,560
So you can see this here.

219
00:13:40,560 --> 00:13:43,080
We have some square bracket notation.

220
00:13:43,080 --> 00:13:45,600
And this is just how Python does it.

221
00:13:45,600 --> 00:13:49,960
So if we have string s is equal to the characters abc,

222
00:13:49,960 --> 00:13:52,400
the way we tell Python, we'd like to extract a character

223
00:13:52,400 --> 00:13:56,920
at a particular position is by indexing into that string.

224
00:13:56,920 --> 00:13:59,759
Now in Python and modern programming languages,

225
00:13:59,759 --> 00:14:01,680
indexing happens from zero.

226
00:14:01,680 --> 00:14:06,120
We count from zero in programming, computer science.

227
00:14:06,120 --> 00:14:11,560
So what that means is the index of the first character,

228
00:14:11,559 --> 00:14:14,719
the index of A is zero, the index of B is one,

229
00:14:14,719 --> 00:14:17,679
and the index of C is two.

230
00:14:17,679 --> 00:14:20,479
So we can say what's the character at the first position

231
00:14:20,479 --> 00:14:22,279
or the first location.

232
00:14:22,279 --> 00:14:24,919
But in computer science speak, we say that's

233
00:14:24,919 --> 00:14:26,599
the character at index zero.

234
00:14:26,599 --> 00:14:29,879
The character at index one is the character at location two

235
00:14:29,879 --> 00:14:31,759
and so on.

236
00:14:31,759 --> 00:14:33,639
So when we're indexing into a string,

237
00:14:33,639 --> 00:14:37,599
we're always starting to count from zero.

238
00:14:37,600 --> 00:14:43,960
So s at index zero, that's how we call this line here,

239
00:14:43,960 --> 00:14:45,639
is another Python expression.

240
00:14:45,639 --> 00:14:50,120
It just looks different than the expressions we've seen so far.

241
00:14:50,120 --> 00:14:54,800
But this entire expression, Python evaluates to a particular value.

242
00:14:54,800 --> 00:14:59,360
And the value it evaluates it to is the character at that index.

243
00:14:59,360 --> 00:15:02,360
So just to show you kind of what that looks like in here,

244
00:15:02,360 --> 00:15:07,240
if s is equal to abc, all we would type is this, s at index zero.

245
00:15:07,240 --> 00:15:11,879
And this expression evaluates to that single character, A.

246
00:15:11,879 --> 00:15:18,399
s at index one, B, s at index two, C, s at index three,

247
00:15:18,399 --> 00:15:22,120
basically says what is the character at the fourth position?

248
00:15:22,120 --> 00:15:24,320
Well, abc only has three positions.

249
00:15:24,320 --> 00:15:28,000
So this will actually give us our second error of the class,

250
00:15:28,000 --> 00:15:29,519
an index error.

251
00:15:29,519 --> 00:15:31,680
This is a pretty common error as we start working

252
00:15:31,680 --> 00:15:33,159
with more complex programs.

253
00:15:33,159 --> 00:15:36,399
It basically means you index too far into the list,

254
00:15:36,399 --> 00:15:38,240
either to the right or to the left.

255
00:15:41,079 --> 00:15:45,919
You can index into a list with negative indices as well.

256
00:15:45,919 --> 00:15:48,840
So if you ever want to grab the character at the last position,

257
00:15:48,840 --> 00:15:54,679
so at the right most place, that's the character at index negative one.

258
00:15:54,679 --> 00:15:57,959
And it's a really convenient way to grab that last character.

259
00:15:57,959 --> 00:16:01,279
You basically ask what's s at negative one,

260
00:16:01,279 --> 00:16:03,960
and Python automatically grabs for us that last character.

261
00:16:03,960 --> 00:16:07,480
So we don't have to use an expression, sort of like,

262
00:16:07,480 --> 00:16:11,360
length of s negative one.

263
00:16:11,360 --> 00:16:13,400
That would be C as well.

264
00:16:13,400 --> 00:16:15,840
And here I've inserted an expression,

265
00:16:15,840 --> 00:16:18,440
length s minus one directly in that index.

266
00:16:18,440 --> 00:16:19,519
And that's totally fine.

267
00:16:19,519 --> 00:16:23,800
Again, Python evaluates things into out, left to right.

268
00:16:23,800 --> 00:16:26,600
It evaluated length s minus one to be two,

269
00:16:26,600 --> 00:16:31,759
and basically this line became what's s at index two, which we knew was C.

270
00:16:32,720 --> 00:16:36,639
So why did it make negative one C?

271
00:16:36,639 --> 00:16:40,120
Because when you index into negative numbers,

272
00:16:40,120 --> 00:16:43,559
we start counting from the right-hand side, just Python convention.

273
00:16:43,559 --> 00:16:44,559
Yeah.

274
00:16:46,799 --> 00:16:50,039
And so s at negative four will give us an error as well,

275
00:16:50,039 --> 00:16:52,279
because now we're indexing too far to the left.

276
00:16:52,279 --> 00:16:55,039
There's nothing there.

277
00:16:55,039 --> 00:16:59,159
OK, so we can index to get single characters.

278
00:16:59,159 --> 00:16:59,679
That's fine.

279
00:16:59,679 --> 00:17:01,959
We just use square bracket and say the index

280
00:17:01,959 --> 00:17:04,839
that we'd like to get the character at.

281
00:17:04,839 --> 00:17:07,440
We can also slice to get substring.

282
00:17:07,440 --> 00:17:09,119
So instead of getting single characters,

283
00:17:09,119 --> 00:17:13,240
we could ask Python to get us a substring starting from one index,

284
00:17:13,240 --> 00:17:17,960
going up to some other index and potentially skipping characters.

285
00:17:17,960 --> 00:17:19,599
You can take every character along the way.

286
00:17:19,599 --> 00:17:27,679
You can skip every other character or some other pattern like that.

287
00:17:27,680 --> 00:17:33,600
The syntax for that is similar to slicing to get a single character.

288
00:17:33,600 --> 00:17:35,160
Slightly different though.

289
00:17:35,160 --> 00:17:38,799
It's similar in that we have square brackets involved.

290
00:17:38,799 --> 00:17:42,720
Slightly different because now we have to give three numbers

291
00:17:42,720 --> 00:17:47,640
within those square brackets separated by colons.

292
00:17:47,640 --> 00:17:51,680
The first number will represent what's the start index.

293
00:17:51,680 --> 00:17:54,080
So where do you want to start your substring from?

294
00:17:54,080 --> 00:17:56,160
The second is what's the stop index.

295
00:17:56,160 --> 00:17:59,080
So we're going to take every character from that start index,

296
00:17:59,080 --> 00:18:04,080
going all the way up to, but not including the stop.

297
00:18:04,080 --> 00:18:07,480
And the step means how many characters do we skip.

298
00:18:07,480 --> 00:18:10,519
So if the step is one, we're taking every character.

299
00:18:10,519 --> 00:18:11,320
The step is two.

300
00:18:11,320 --> 00:18:13,320
We'll take every other character.

301
00:18:13,320 --> 00:18:14,000
The step is three.

302
00:18:14,000 --> 00:18:17,920
We skip every two characters and so on.

303
00:18:17,920 --> 00:18:20,560
Now there's a bunch of combinations we can do

304
00:18:20,559 --> 00:18:27,079
within these three numbers within the square brackets.

305
00:18:27,079 --> 00:18:31,759
That you'll, as you work with these exercises,

306
00:18:31,759 --> 00:18:33,919
you'll sort of get the hang of.

307
00:18:33,919 --> 00:18:38,639
For now, it won't hurt to always give it a start, a stop, and a step.

308
00:18:38,639 --> 00:18:40,480
That's perfectly fine.

309
00:18:40,480 --> 00:18:42,799
But something that's really common, if you're always

310
00:18:42,799 --> 00:18:46,919
going to take every single character, is to just omit the step part.

311
00:18:46,920 --> 00:18:50,840
So if you just give it two numbers, number, colon, number,

312
00:18:50,840 --> 00:18:54,320
Python automatically knows that your step will be one by default.

313
00:18:54,320 --> 00:18:57,720
So you're not skipping anything.

314
00:18:57,720 --> 00:19:00,160
If you're just giving it one number, no colons

315
00:19:00,160 --> 00:19:05,800
were back to the previous slide, where we're just grabbing one element.

316
00:19:05,800 --> 00:19:08,840
And I know this is going to be a little confusing.

317
00:19:08,840 --> 00:19:11,120
We're going to look at an example on the next slide.

318
00:19:11,120 --> 00:19:13,279
But this is something you'll just have to practice a little bit

319
00:19:13,279 --> 00:19:16,440
on the shell with the following example, hopefully.

320
00:19:16,440 --> 00:19:19,000
Just when you go home.

321
00:19:19,000 --> 00:19:22,120
Just to make sure that you understand what it's doing.

322
00:19:22,120 --> 00:19:25,480
If you have a question, what if I put in this number,

323
00:19:25,480 --> 00:19:29,640
this number, just put it in the shell and see what happens.

324
00:19:29,640 --> 00:19:33,160
So let's take a look at a couple of examples.

325
00:19:33,160 --> 00:19:35,600
So how do we slice to get some strings?

326
00:19:35,600 --> 00:19:40,440
Let's say our string is this longer thing, ABCDEFGH.

327
00:19:40,440 --> 00:19:44,039
When we slice, the first thing we want to look at is the step.

328
00:19:44,039 --> 00:19:46,360
Is it positive or negative?

329
00:19:46,359 --> 00:19:49,039
If it's positive, and remember, if you omitted by default,

330
00:19:49,039 --> 00:19:50,039
it's plus 1.

331
00:19:50,039 --> 00:19:53,559
So if it's positive, we're going to work our way left to right,

332
00:19:53,559 --> 00:19:54,839
the way we read.

333
00:19:54,839 --> 00:19:59,199
If it's negative, we're going to work our way right to left.

334
00:19:59,199 --> 00:20:04,159
So what if we index S from 3, colons 6?

335
00:20:04,159 --> 00:20:05,279
The step is positive 1.

336
00:20:05,279 --> 00:20:07,919
So we're going to work our way left to right.

337
00:20:07,919 --> 00:20:10,319
So that means we're going to start at index 3.

338
00:20:10,319 --> 00:20:13,679
So that's the D. So we're going to grab the D.

339
00:20:13,680 --> 00:20:16,759
And we're going to go up to get the substring from D up to,

340
00:20:16,759 --> 00:20:24,160
but not including the character at index 6, the G.

341
00:20:24,160 --> 00:20:28,240
So the characters we're going to grab are the D, the E, and the F.

342
00:20:28,240 --> 00:20:29,519
We start at 3.

343
00:20:29,519 --> 00:20:33,039
We go up to, but not including 6, taking every character

344
00:20:33,039 --> 00:20:35,600
because the step is 1.

345
00:20:35,600 --> 00:20:37,000
What if the step was 2?

346
00:20:37,000 --> 00:20:40,200
So same thing as we just did except the step is 2.

347
00:20:40,200 --> 00:20:41,680
Again, the step is positive.

348
00:20:41,680 --> 00:20:44,200
So we're going to work our way left to right.

349
00:20:44,200 --> 00:20:45,600
We're going to start at index 3.

350
00:20:45,600 --> 00:20:47,000
So we're going to grab the D.

351
00:20:47,000 --> 00:20:48,640
And we're going to create a new object, which

352
00:20:48,640 --> 00:20:51,160
is going to be the characters D.

353
00:20:51,160 --> 00:20:54,160
We're going to skip the E because the step is 2.

354
00:20:54,160 --> 00:20:57,240
Take the F. And that's it.

355
00:20:57,240 --> 00:21:01,960
We've worked our way up to, but not including the element at index 6.

356
00:21:05,200 --> 00:21:08,440
There are some other things, I guess, tricks

357
00:21:08,440 --> 00:21:10,480
or you might want to call them that you can do.

358
00:21:10,480 --> 00:21:14,640
So if we just put an empty colon here, that says, just

359
00:21:14,640 --> 00:21:16,039
make the same object again.

360
00:21:16,039 --> 00:21:22,039
So that will evaluate to just A, B, C, D, F, G, H again.

361
00:21:22,039 --> 00:21:25,839
If we do colon colon negative 1, this

362
00:21:25,839 --> 00:21:28,599
is shorthand notation for basically grabbing

363
00:21:28,599 --> 00:21:30,880
for me the string backward.

364
00:21:30,880 --> 00:21:33,799
So H, G, F, E, D, C, E, B, A, right?

365
00:21:33,799 --> 00:21:38,240
Just make the same string as the original one, but backward.

366
00:21:38,240 --> 00:21:44,400
And we can do something like this for 1 with a step negative 2.

367
00:21:44,400 --> 00:21:47,720
Now the step is negative, right?

368
00:21:47,720 --> 00:21:51,519
So that means we're going to work our way right to left.

369
00:21:51,519 --> 00:21:53,880
We're going to start at index 4.

370
00:21:53,880 --> 00:21:56,920
So we're going to grab the E. We're

371
00:21:56,920 --> 00:21:58,440
going to skip every other character.

372
00:21:58,440 --> 00:22:02,599
So we're not going to take the D, but we will take the C.

373
00:22:02,599 --> 00:22:04,120
And we're going to go down to, but not

374
00:22:04,120 --> 00:22:06,279
including the character at index 1.

375
00:22:06,279 --> 00:22:08,240
So we're going to stop right here.

376
00:22:08,240 --> 00:22:12,160
So the characters we took in this order were E and then C.

377
00:22:12,160 --> 00:22:19,399
So this entire expression evaluates to E, C. Yes, question?

378
00:22:19,399 --> 00:22:20,519
Why do we skip D?

379
00:22:20,519 --> 00:22:22,480
Because the step is 2.

380
00:22:22,480 --> 00:22:24,599
So when the step is 1, we take every character.

381
00:22:24,599 --> 00:22:26,440
The step is 2, skip every other one.

382
00:22:26,440 --> 00:22:27,440
Yeah.

383
00:22:27,440 --> 00:22:30,920
For the first one, S, 3, and 2, C, skip.

384
00:22:30,920 --> 00:22:33,000
Why is G not included?

385
00:22:33,000 --> 00:22:35,279
G is not included just by definition.

386
00:22:35,279 --> 00:22:37,599
We go up to, but not including the stop.

387
00:22:37,599 --> 00:22:42,920
So we'll go up to, but not including the character at index 6.

388
00:22:42,920 --> 00:22:46,559
That's just the definition of slicing in Python.

389
00:22:46,559 --> 00:22:50,720
What I get back to is, I'm going to do a piece of one.

390
00:22:50,720 --> 00:22:53,519
So up to, it including stop minus 1 means we go up to,

391
00:22:53,519 --> 00:22:54,879
it including 5.

392
00:22:54,879 --> 00:22:55,399
Right.

393
00:22:55,399 --> 00:22:56,399
Yeah, exactly.

394
00:22:56,399 --> 00:22:56,920
Yep.

395
00:23:02,000 --> 00:23:02,399
OK.

396
00:23:02,400 --> 00:23:06,320
So again, if you're unsure what a command does, always try,

397
00:23:06,320 --> 00:23:09,200
you can always try it in your console, right, the shell.

398
00:23:09,200 --> 00:23:12,120
And here's an opportunity to do that.

399
00:23:12,120 --> 00:23:16,680
So here's a string S, ABC, D3F.

400
00:23:16,680 --> 00:23:18,440
And I'm actually going to write this one down.

401
00:23:18,440 --> 00:23:20,480
Just ABC, space, right.

402
00:23:20,480 --> 00:23:21,759
There's a space here.

403
00:23:21,759 --> 00:23:24,800
3D, what did I do?

404
00:23:24,800 --> 00:23:25,640
Or D3F.

405
00:23:25,640 --> 00:23:32,640
And in another space, and GHI.

406
00:23:38,320 --> 00:23:40,640
So what do you guys think the first one will be?

407
00:23:40,640 --> 00:23:42,680
3 colon lns minus 1.

408
00:23:42,680 --> 00:23:44,440
I'll even do the indices here for you.

409
00:23:51,640 --> 00:23:52,440
What's the start?

410
00:23:55,960 --> 00:23:57,120
Yeah, the space, exactly.

411
00:23:57,120 --> 00:23:59,200
So it's going to be a little space.

412
00:23:59,200 --> 00:24:01,560
What is lns minus 1?

413
00:24:04,360 --> 00:24:06,280
That's the length minus 1.

414
00:24:06,280 --> 00:24:07,280
No.

415
00:24:07,280 --> 00:24:08,480
It's 2B.

416
00:24:08,480 --> 00:24:10,560
10.

417
00:24:10,560 --> 00:24:11,080
10.

418
00:24:11,080 --> 00:24:11,759
Yeah, what's the length?

419
00:24:11,759 --> 00:24:13,480
How many characters are in here?

420
00:24:13,480 --> 00:24:13,920
11.

421
00:24:13,920 --> 00:24:14,440
Yep.

422
00:24:14,440 --> 00:24:16,120
And minus 1 is 10.

423
00:24:16,120 --> 00:24:20,480
So when the stop is 10, that means we're going to go up to,

424
00:24:20,480 --> 00:24:23,720
but not including the character at 10.

425
00:24:23,720 --> 00:24:26,480
So we're going to go up to this H.

426
00:24:26,480 --> 00:24:33,319
So we're going to take the space, D3F space, GH, and we stop.

427
00:24:33,319 --> 00:24:34,319
Yeah.

428
00:24:34,319 --> 00:24:35,720
Why do we start the next unit?

429
00:24:35,720 --> 00:24:37,079
Zero again is just a-

430
00:24:37,079 --> 00:24:39,079
Convention.

431
00:24:39,079 --> 00:24:42,559
Computer science, programming.

432
00:24:42,559 --> 00:24:44,120
Except for MATLAB, I think they still

433
00:24:44,120 --> 00:24:46,720
started indexing it.

434
00:24:46,720 --> 00:24:47,960
Other questions about this one?

435
00:24:47,960 --> 00:24:50,079
Is that all right?

436
00:24:50,079 --> 00:24:51,079
OK, how about the next one?

437
00:24:51,079 --> 00:24:55,159
S4 colon 0 colon negative 1.

438
00:24:55,159 --> 00:24:56,519
What's the element at index 4?

439
00:24:59,559 --> 00:25:00,359
The D, yep.

440
00:25:00,359 --> 00:25:04,199
So we're going to grab the D. Are we working our way right?

441
00:25:04,199 --> 00:25:06,879
Or to the right or to the left?

442
00:25:06,879 --> 00:25:07,679
Yeah, exactly.

443
00:25:07,679 --> 00:25:10,199
So we're going to go up to, but not including the character

444
00:25:10,199 --> 00:25:11,839
at index 0.

445
00:25:11,839 --> 00:25:17,759
So we're going to get the D, the space, the C, the B.

446
00:25:17,759 --> 00:25:19,599
Am I taking the A?

447
00:25:19,599 --> 00:25:20,039
No.

448
00:25:20,039 --> 00:25:20,559
Exactly.

449
00:25:20,559 --> 00:25:24,039
So that's a D space Cb.

450
00:25:24,039 --> 00:25:24,879
Yes.

451
00:25:24,879 --> 00:25:29,639
If I include the A with the second value, negative 1.

452
00:25:29,639 --> 00:25:33,240
If you did want to include the A, actually,

453
00:25:33,240 --> 00:25:37,319
you would want to do something different, I think.

454
00:25:37,319 --> 00:25:39,799
You can't go to negative 1 because negative 1 is actually

455
00:25:39,799 --> 00:25:41,639
this right here.

456
00:25:41,639 --> 00:25:42,639
That's a good question.

457
00:25:42,639 --> 00:25:45,519
I'd have to try it out, play around with it.

458
00:25:45,519 --> 00:25:48,359
But if you want to include it, I think maybe you would just

459
00:25:48,359 --> 00:25:50,879
do an empty colon.

460
00:25:50,879 --> 00:25:52,919
Sorry, go ahead.

461
00:25:52,919 --> 00:25:55,159
You would just probably do an empty colon.

462
00:25:55,159 --> 00:25:58,399
And by default, that means the beginning.

463
00:25:58,399 --> 00:25:59,399
But I'd have to try it out.

464
00:25:59,399 --> 00:25:59,919
Yeah.

465
00:26:02,559 --> 00:26:04,159
How about the last one?

466
00:26:04,159 --> 00:26:06,079
6 colon 3.

467
00:26:06,079 --> 00:26:07,919
What's the element at index 6?

468
00:26:07,919 --> 00:26:10,039
The empty colon work.

469
00:26:10,039 --> 00:26:10,559
The empty colon work.

470
00:26:10,559 --> 00:26:11,159
OK, perfect.

471
00:26:11,159 --> 00:26:11,879
Thanks for trying it out.

472
00:26:11,879 --> 00:26:13,759
The empty colon works, yeah.

473
00:26:13,759 --> 00:26:15,479
If you wanted to grab the A.

474
00:26:15,480 --> 00:26:20,720
All right, so S6 colon 3, what's the element at index 6?

475
00:26:20,720 --> 00:26:21,240
Yeah.

476
00:26:21,240 --> 00:26:21,839
OK, great.

477
00:26:21,839 --> 00:26:25,839
And we're working our way to the right or to the left.

478
00:26:25,839 --> 00:26:27,440
To the right.

479
00:26:27,440 --> 00:26:30,680
OK, so we're going to start here, but we need to go this way.

480
00:26:30,680 --> 00:26:33,720
But what's the stop index?

481
00:26:33,720 --> 00:26:34,519
Yeah.

482
00:26:34,519 --> 00:26:35,799
It's not there.

483
00:26:35,799 --> 00:26:38,519
It's behind us.

484
00:26:38,519 --> 00:26:43,000
So this last one is actually an empty string.

485
00:26:43,000 --> 00:26:47,440
And we can even try it with something else too.

486
00:26:47,440 --> 00:26:52,240
So if we had this ABC, right, if I'm indexing starting from 2

487
00:26:52,240 --> 00:26:56,880
and I'm going backward to 0, then that gives me the empty string.

488
00:26:56,880 --> 00:27:02,200
And the empty string is just quote, quote, with nothing inside.

489
00:27:02,200 --> 00:27:06,279
So that means we didn't take any characters in that particular case.

490
00:27:09,759 --> 00:27:12,480
Is that right?

491
00:27:12,480 --> 00:27:13,480
It's valid.

492
00:27:13,480 --> 00:27:22,120
There are no characters in between the F and behind the F.

493
00:27:22,120 --> 00:27:25,200
OK, so I'll mention the strings are actually immutable objects.

494
00:27:25,200 --> 00:27:28,200
And really a lot of the objects we've seen so far are immutable.

495
00:27:28,200 --> 00:27:31,240
That means they can't be modified once they're created.

496
00:27:31,240 --> 00:27:32,759
We've kind of seen this already, right?

497
00:27:32,759 --> 00:27:36,120
When I draw the memory diagrams, when I create a new object,

498
00:27:36,120 --> 00:27:39,559
which is, for example, what's the string version of this integer?

499
00:27:39,559 --> 00:27:42,160
Or when I cast a float to an int.

500
00:27:42,160 --> 00:27:43,160
Things like that.

501
00:27:43,160 --> 00:27:45,720
I'm not changing those original objects I've created.

502
00:27:45,720 --> 00:27:51,320
I'm just making a new green box in my memory and reassigning the name.

503
00:27:51,320 --> 00:27:54,560
And we're going to see later on in this course mutable objects,

504
00:27:54,560 --> 00:27:58,200
which means that once you create them in memory, you can modify them.

505
00:27:58,200 --> 00:28:01,759
But for now, anytime you make a change to such an object,

506
00:28:01,759 --> 00:28:04,000
well, you can't change the object, right?

507
00:28:04,000 --> 00:28:06,200
If you want to get a different version of the object,

508
00:28:06,200 --> 00:28:09,400
Python will create a new object in memory,

509
00:28:09,400 --> 00:28:12,560
and you can reassign the variable to that new object.

510
00:28:12,560 --> 00:28:15,600
So in this example, if I want to grab,

511
00:28:15,600 --> 00:28:18,960
if I have the string, C-A-R in memory like this,

512
00:28:18,960 --> 00:28:24,400
and it's bound to variable S, and I want to change the first letter to a B,

513
00:28:24,400 --> 00:28:25,440
I'm not allowed to.

514
00:28:25,440 --> 00:28:31,080
Python won't let me do something like, I want to change the letter at index 0 to a B.

515
00:28:31,080 --> 00:28:33,000
That's not allowed.

516
00:28:33,000 --> 00:28:37,000
You can get new versions of that particular string,

517
00:28:37,000 --> 00:28:44,279
so you can do some random expression to create the B-A-R that you might want.

518
00:28:44,279 --> 00:28:48,279
But then the C-A-R remains in memory, right?

519
00:28:48,279 --> 00:28:50,359
So the C-A-R will still be there.

520
00:28:50,359 --> 00:28:52,359
We're just losing the binding from it.

521
00:28:55,640 --> 00:29:00,119
So any questions so far on these strings?

522
00:29:00,119 --> 00:29:03,640
Mostly, they're a new data type, right?

523
00:29:03,640 --> 00:29:05,640
You haven't worked with them like you have with numbers,

524
00:29:05,640 --> 00:29:07,560
so it's a little bit different.

525
00:29:07,560 --> 00:29:10,880
Again, someone had a question, how do you get the A, right?

526
00:29:10,880 --> 00:29:13,759
Backward, try it out in the console.

527
00:29:13,759 --> 00:29:17,640
I'm happy to answer questions, help you try along with you.

528
00:29:17,640 --> 00:29:19,440
But that's what the console is there for, right?

529
00:29:19,440 --> 00:29:21,200
The shell here, that's what it's there for.

530
00:29:21,200 --> 00:29:24,759
It's just to try quick little things if you ever have a question,

531
00:29:24,759 --> 00:29:28,840
what if this or this and you get to try that.

532
00:29:28,840 --> 00:29:31,200
Now let's move on to some input output.

533
00:29:31,200 --> 00:29:35,160
So far, the programs that we can write are pretty stagnant, right?

534
00:29:35,160 --> 00:29:38,240
There's much interesting things that we can do with them.

535
00:29:38,240 --> 00:29:41,160
There's no interaction with the user.

536
00:29:41,160 --> 00:29:45,759
So so far, when we tried to output things,

537
00:29:45,759 --> 00:29:48,840
well, we might think we have been outputting things, right?

538
00:29:48,840 --> 00:29:53,279
So when we write in our console something like 3 plus 2,

539
00:29:53,279 --> 00:29:55,880
Python does show something in the shell, right?

540
00:29:55,880 --> 00:29:59,360
This is maybe how we interact with a user.

541
00:29:59,360 --> 00:30:02,720
But this is not actual true output.

542
00:30:02,720 --> 00:30:08,759
This is, I call this kind of like peaking into the value of the expression.

543
00:30:08,759 --> 00:30:14,400
But if you were to write some expression like this in a file editor,

544
00:30:14,400 --> 00:30:16,400
Python wouldn't actually print it out.

545
00:30:16,400 --> 00:30:20,079
And so here's all the things that we've already tried today, right?

546
00:30:20,079 --> 00:30:21,600
We've created all these strings.

547
00:30:21,600 --> 00:30:23,559
We've got the length of s, right?

548
00:30:23,559 --> 00:30:24,559
We indexed.

549
00:30:24,559 --> 00:30:27,480
Anytime we typed these expressions in the shell,

550
00:30:27,480 --> 00:30:30,920
Python automatically gave us our value, right?

551
00:30:30,920 --> 00:30:35,880
But if I were to type those exact expressions in a file editor on the left here,

552
00:30:35,880 --> 00:30:37,840
Python's not actually going to print these out.

553
00:30:37,840 --> 00:30:40,320
So this is the file editor from now on.

554
00:30:40,320 --> 00:30:42,560
We're just going to work with files.

555
00:30:42,560 --> 00:30:47,440
I'm going to run it by hitting this little green run button or hitting a five.

556
00:30:47,440 --> 00:30:48,920
Something happened in the shell.

557
00:30:48,920 --> 00:30:51,640
My program ran, right?

558
00:30:51,640 --> 00:30:53,880
It says here, it ran this file.

559
00:30:53,880 --> 00:30:56,160
But there's no output, right?

560
00:30:56,160 --> 00:30:57,519
Where was the length of s?

561
00:30:57,519 --> 00:31:00,440
Where were all these indices we've done before?

562
00:31:00,440 --> 00:31:02,600
And that's because these aren't actual outputs, right?

563
00:31:02,600 --> 00:31:07,039
When we type them into the shell, that was just us doing quick little expressions

564
00:31:07,039 --> 00:31:09,920
in the shell giving us, no.

565
00:31:09,920 --> 00:31:14,559
That's why I call it peaking into the value, because it's not true output.

566
00:31:14,559 --> 00:31:19,400
If you want the user to see output and the shell is how we're going to show the user output

567
00:31:19,400 --> 00:31:25,640
from running a file, we have to explicitly tell Python, hey, I want you to show the output

568
00:31:25,640 --> 00:31:29,640
from this expression, or I want you to show the output from this command.

569
00:31:29,640 --> 00:31:30,640
Okay.

570
00:31:30,640 --> 00:31:32,600
And we do this using the print command.

571
00:31:32,600 --> 00:31:37,120
So if we take our expression that we want to show the output from and wrap it in a print

572
00:31:37,120 --> 00:31:42,840
command, Python will then show that output and only that output.

573
00:31:42,840 --> 00:31:47,460
Can you imagine if we wrote a file that did all these operations and all these intermediary

574
00:31:47,460 --> 00:31:48,759
outputs were being shown?

575
00:31:48,759 --> 00:31:52,320
That would be really to a really messy file or messy program, right?

576
00:31:52,320 --> 00:31:56,320
And so that's why we have a command where you can explicitly tell Python just the things

577
00:31:56,320 --> 00:31:58,640
you want to show to the user.

578
00:31:58,640 --> 00:32:04,540
So here if you want to print the length of s, we can wrap the length of s in a print

579
00:32:04,540 --> 00:32:07,400
statement and then run the file.

580
00:32:07,400 --> 00:32:12,080
And now the only thing that gets shown to the user is the thing I explicitly printed out

581
00:32:12,080 --> 00:32:14,520
of three.

582
00:32:14,520 --> 00:32:20,040
And then down here if I want to print this other result of this other expression, I can

583
00:32:20,040 --> 00:32:24,080
wrap that around a print statement and Python will then print that one as well.

584
00:32:24,079 --> 00:32:32,759
And now I'm in charge of showing the user the things that I want to show them, right?

585
00:32:32,759 --> 00:32:35,240
Okay.

586
00:32:35,240 --> 00:32:39,720
So whenever you have a print statement, Python will print that resulting expression and then

587
00:32:39,720 --> 00:32:40,799
enter a new line.

588
00:32:40,799 --> 00:32:45,960
So as you saw here, we had two print statements, one around length and one around s at negative

589
00:32:45,960 --> 00:32:46,960
three.

590
00:32:46,960 --> 00:32:52,399
And Python put the result of these expressions, each one on a different line.

591
00:32:52,400 --> 00:32:57,500
Because you might want to have expressions on the same line, or the results of expressions

592
00:32:57,500 --> 00:32:59,380
all in the same line.

593
00:32:59,380 --> 00:33:00,380
So we can do that.

594
00:33:00,380 --> 00:33:05,680
We can put all of these different objects within the same print statement.

595
00:33:05,680 --> 00:33:08,720
We separate them by a comma within the print statement.

596
00:33:08,720 --> 00:33:10,800
That's down here.

597
00:33:10,800 --> 00:33:16,560
Python will print all of our objects no matter what types they are and it'll separate

598
00:33:16,560 --> 00:33:19,120
each object by space.

599
00:33:19,119 --> 00:33:24,359
So there's my object, the, there's my object at the number three and there's my object,

600
00:33:24,359 --> 00:33:28,759
the string must get tears and it printed it all on one line with a space in between them.

601
00:33:28,759 --> 00:33:30,159
And that's what this comma does.

602
00:33:30,159 --> 00:33:34,319
It automatically inserts the space.

603
00:33:34,319 --> 00:33:38,119
Now let's say you don't want a space for whatever reason.

604
00:33:38,119 --> 00:33:40,799
What if we try concatenating these objects together, right?

605
00:33:40,799 --> 00:33:42,279
Remember we saw concatenation?

606
00:33:42,279 --> 00:33:44,359
We said it does not automatically insert spaces.

607
00:33:44,359 --> 00:33:47,239
It just kind of merges the strings together.

608
00:33:47,240 --> 00:33:48,240
And we run it.

609
00:33:48,240 --> 00:33:49,880
Well, I kind of already gave it away.

610
00:33:49,880 --> 00:33:51,599
It's going to be an error.

611
00:33:51,599 --> 00:33:52,680
But let's see the error.

612
00:33:52,680 --> 00:33:54,400
It's a type error.

613
00:33:54,400 --> 00:33:58,839
It says can only concatenate strings not integers to strings.

614
00:33:58,839 --> 00:34:00,880
All right, make sense.

615
00:34:00,880 --> 00:34:02,279
This is a string.

616
00:34:02,279 --> 00:34:03,359
This is not a string.

617
00:34:03,359 --> 00:34:04,359
So that's not okay.

618
00:34:04,359 --> 00:34:06,640
And this is a string.

619
00:34:06,640 --> 00:34:14,000
So instead of concatenating different objects together, we now have to remember to cast

620
00:34:14,000 --> 00:34:18,119
every object that's not a string to a string.

621
00:34:18,119 --> 00:34:23,079
So this line is exactly the same as the previous one except that B, which was the number, the

622
00:34:23,079 --> 00:34:26,280
integer 3, is now being cast to a string.

623
00:34:26,280 --> 00:34:30,039
So I'm wrapping the B around the STR.

624
00:34:30,039 --> 00:34:33,840
And that casts my integer to the string.

625
00:34:33,840 --> 00:34:39,480
And now Python is happy to concatenate these three strings for me.

626
00:34:39,480 --> 00:34:47,599
Okay, that's basically what I said.

627
00:34:47,599 --> 00:34:49,960
So that's output using the print statement.

628
00:34:49,960 --> 00:34:53,079
Now how about input?

629
00:34:53,079 --> 00:34:57,960
We can get input from the user, not surprisingly, with a command called input.

630
00:34:57,960 --> 00:35:01,159
The format of input is usually like this.

631
00:35:01,159 --> 00:35:03,599
So we have the input command.

632
00:35:03,599 --> 00:35:06,000
In the parentheses, we give it a string.

633
00:35:06,000 --> 00:35:10,159
And then we usually want to save the input to a variable.

634
00:35:10,159 --> 00:35:14,400
So the next few slides are going to go through step by step what happens when I have these

635
00:35:14,400 --> 00:35:16,360
two lines of code.

636
00:35:16,360 --> 00:35:18,280
Text equals input type anything.

637
00:35:18,280 --> 00:35:21,679
And then I'm going to print five times text.

638
00:35:21,679 --> 00:35:28,880
So when Python sees a line that says input and then some string, Python will automatically

639
00:35:28,880 --> 00:35:31,639
take the string within the input.

640
00:35:31,639 --> 00:35:33,760
So in this particular case, here's my command.

641
00:35:33,760 --> 00:35:38,440
The string inside the input is type anything colon space.

642
00:35:38,440 --> 00:35:42,480
On the shell, Python will put that string for you.

643
00:35:42,480 --> 00:35:45,320
And then it will wait.

644
00:35:45,320 --> 00:35:50,480
It waits for the user to type some stuff in and hit enter.

645
00:35:50,480 --> 00:35:55,160
As soon as the user hits enter, whatever the user typed in, so let's say the user typed

646
00:35:55,160 --> 00:36:03,640
in, howdy, whatever the user types in will be saved as a string.

647
00:36:03,639 --> 00:36:07,799
Sort of replacing this input statement.

648
00:36:07,799 --> 00:36:11,599
So you can think of the input kind of like an expression.

649
00:36:11,599 --> 00:36:16,039
It's a weird one because it's waiting for the user to give us something.

650
00:36:16,039 --> 00:36:21,639
But in the end, the input gets replaced by the string version of whatever the user typed

651
00:36:21,639 --> 00:36:22,639
in.

652
00:36:22,639 --> 00:36:27,480
So the user can type in something, numbers, letters, characters, anything.

653
00:36:27,480 --> 00:36:32,079
As soon as the user hits enter, whatever the user typed in will be saved as a string

654
00:36:32,079 --> 00:36:35,000
replacing this input.

655
00:36:35,000 --> 00:36:39,559
So in memory, the way this looks like is memory cloud.

656
00:36:39,559 --> 00:36:46,920
Here is this object that I've created, which is the exact characters the user typed in.

657
00:36:46,920 --> 00:36:52,920
OK, well, if the user typed in howdy, then what is this line end up being?

658
00:36:52,920 --> 00:36:56,920
Text is equal to the string howdy.

659
00:36:56,920 --> 00:36:59,880
And that basically is what we've seen on the previous two slides, right, when we've

660
00:36:59,880 --> 00:37:00,880
worked with strings.

661
00:37:00,880 --> 00:37:09,079
We're going to assign this variable and bind it to this particular string of characters.

662
00:37:09,079 --> 00:37:10,840
Now the next line is easy, right?

663
00:37:10,840 --> 00:37:16,480
We're going to print whatever the result of repeating text is five times.

664
00:37:16,480 --> 00:37:23,200
So the print will show on the shell howdy, howdy, howdy, howdy, howdy.

665
00:37:23,200 --> 00:37:26,760
That whatever the user typed in five times.

666
00:37:26,760 --> 00:37:29,559
OK.

667
00:37:29,559 --> 00:37:31,199
Let's look at another example.

668
00:37:31,199 --> 00:37:34,599
In this particular one, we're going to ask the user for a number.

669
00:37:34,599 --> 00:37:39,119
And I want to print five times whatever the user typed in.

670
00:37:39,119 --> 00:37:41,679
So number one, well, again, grab input.

671
00:37:41,679 --> 00:37:46,440
So what we're asking the user to do is to type in a number, right?

672
00:37:46,440 --> 00:37:52,880
So when the Python sees this, it prints type a number and then waits for user input.

673
00:37:52,880 --> 00:37:56,039
Let's say the user types in the number three.

674
00:37:56,039 --> 00:37:59,440
That gets saved as the string three.

675
00:37:59,440 --> 00:38:03,559
Again, so no matter what the user types in, it's being saved as a string.

676
00:38:03,559 --> 00:38:07,880
Even if it's a number, it's being saved as the string that number, right?

677
00:38:07,880 --> 00:38:10,679
So to Python, it's a character.

678
00:38:10,679 --> 00:38:14,480
To us, it's a number, but to Python, it's still a character.

679
00:38:14,480 --> 00:38:21,320
So number one in memory basically becomes the string three, just one single character,

680
00:38:21,320 --> 00:38:23,119
three.

681
00:38:23,119 --> 00:38:24,719
And I print five times number one.

682
00:38:24,719 --> 00:38:26,279
What is that going to look like?

683
00:38:26,279 --> 00:38:27,279
You guys tell me.

684
00:38:27,279 --> 00:38:28,279
Exactly.

685
00:38:28,279 --> 00:38:29,279
Three, three, three, three.

686
00:38:29,279 --> 00:38:30,279
Exactly, right?

687
00:38:30,279 --> 00:38:32,079
Three, three, three, three, three, three, right?

688
00:38:32,079 --> 00:38:37,440
Because we're not, we're working with a string here, not an integer.

689
00:38:37,440 --> 00:38:43,440
If we want to work with an integer, we have to wrap our input statement with a cast statement.

690
00:38:43,440 --> 00:38:44,440
Right?

691
00:38:44,440 --> 00:38:46,159
So again, this is what Python does.

692
00:38:46,159 --> 00:38:48,319
We can combine expressions together.

693
00:38:48,320 --> 00:38:54,080
In this particular case, we're going to combine the casting, the input, with the input

694
00:38:54,080 --> 00:38:55,080
statement.

695
00:38:55,080 --> 00:38:57,600
So now the user can type in for me three again.

696
00:38:57,600 --> 00:39:05,440
The input itself is going to be the string three, but that line becomes num2 equals int parentheses

697
00:39:05,440 --> 00:39:06,720
string three.

698
00:39:06,720 --> 00:39:07,720
Right?

699
00:39:07,720 --> 00:39:11,840
And that, I did it on the shelf a little earlier today, right?

700
00:39:11,840 --> 00:39:17,880
When we cast a string to an int, it becomes the number that int.

701
00:39:17,880 --> 00:39:24,840
So num2 is then going to be three.

702
00:39:24,840 --> 00:39:29,920
And memory num2 is not the string three anymore because we've cast it to three.

703
00:39:29,920 --> 00:39:34,920
So when we print five times three, we're doing the mathematical operation five times three,

704
00:39:34,920 --> 00:39:35,920
right?

705
00:39:35,920 --> 00:39:36,920
15.

706
00:39:36,920 --> 00:39:37,920
Okay.

707
00:39:37,920 --> 00:39:41,920
Let's have you code.

708
00:39:41,920 --> 00:39:44,760
So I'm going to give you a couple minutes.

709
00:39:44,760 --> 00:39:47,560
I'm going to have you write a program that is interactive.

710
00:39:47,560 --> 00:39:51,320
So it's going to ask the user for something and it's going to print something back to the

711
00:39:51,320 --> 00:39:52,320
user.

712
00:39:52,320 --> 00:39:56,680
So we're going to ask the user for verb and then I want you to print two things for me.

713
00:39:56,680 --> 00:40:01,080
The first is whatever the verb that user typed in, you're going to write I can, whatever,

714
00:40:01,080 --> 00:40:03,600
better than you on one line.

715
00:40:03,600 --> 00:40:07,600
And then on the next line, so with another print statement, I want you to print that verb

716
00:40:07,600 --> 00:40:08,600
five times.

717
00:40:08,600 --> 00:40:12,080
So if the user types and run, you're going to write I can run better than you.

718
00:40:12,079 --> 00:40:15,480
And then on the next line, run, run, run, run.

719
00:40:15,480 --> 00:40:21,440
So the way you try its work is I actually have some space here that I've already prewritten

720
00:40:21,440 --> 00:40:23,279
the instructions for you.

721
00:40:23,279 --> 00:40:26,079
And all you have to do is fill in the code.

722
00:40:26,079 --> 00:40:29,679
So I'll give you a couple minutes and then we'll write it together with suggestions from

723
00:40:29,679 --> 00:40:35,559
you and we'll see how far we can get and we'll definitely finish it together.

724
00:40:35,559 --> 00:40:42,559
So you don't have to finish it on your.

725
00:40:42,559 --> 00:40:43,559
Yeah?

726
00:40:43,559 --> 00:40:50,559
You should have this file.

727
00:40:50,559 --> 00:40:55,559
It's part of the zip file downloaded for today.

728
00:40:55,559 --> 00:41:02,559
All right.

729
00:41:02,559 --> 00:41:07,519
Does anyone have a start for me?

730
00:41:07,519 --> 00:41:12,519
So how can I ask the user for input?

731
00:41:12,519 --> 00:41:13,519
Yeah.

732
00:41:13,519 --> 00:41:14,519
Yep.

733
00:41:14,519 --> 00:41:22,400
That works for me.

734
00:41:22,400 --> 00:41:26,800
And I'm adding a little extra space here between the colon or whatever prompt you have just

735
00:41:26,800 --> 00:41:33,960
so that when the user types it in, it isn't right beside the colon or the end of the

736
00:41:33,960 --> 00:41:37,760
string.

737
00:41:37,760 --> 00:41:41,680
So as soon as we do this, the user will, the program will wait and the user will get to

738
00:41:41,680 --> 00:41:42,680
type something in.

739
00:41:42,680 --> 00:41:44,680
What's the next step?

740
00:41:44,680 --> 00:41:45,680
What's the first?

741
00:41:45,680 --> 00:41:49,480
How can you use this input?

742
00:41:49,480 --> 00:41:52,480
I can do a print.

743
00:41:52,480 --> 00:41:53,480
Yep.

744
00:41:53,480 --> 00:41:56,480
Let's print something.

745
00:41:56,480 --> 00:42:01,480
I can, in quotes, yep, I can.

746
00:42:01,480 --> 00:42:05,480
I'll put the question in the name.

747
00:42:05,480 --> 00:42:06,480
Yep.

748
00:42:06,480 --> 00:42:07,480
We can put it, put it question.

749
00:42:07,480 --> 00:42:08,480
Yep.

750
00:42:08,480 --> 00:42:09,480
Exactly.

751
00:42:09,480 --> 00:42:12,480
I can question comma because it's another object and I'm happy to put a space in between it.

752
00:42:12,480 --> 00:42:13,480
I can question.

753
00:42:13,480 --> 00:42:17,480
I had another string better than you.

754
00:42:18,480 --> 00:42:20,480
There.

755
00:42:20,480 --> 00:42:25,320
And we don't need to write the full program right away.

756
00:42:25,320 --> 00:42:27,960
We can just test this a little bit out.

757
00:42:27,960 --> 00:42:29,039
So choose a verb run.

758
00:42:29,039 --> 00:42:30,480
The one I gave you is print.

759
00:42:30,480 --> 00:42:31,480
Fine.

760
00:42:31,480 --> 00:42:32,480
That looks good so far.

761
00:42:32,480 --> 00:42:33,480
Alright.

762
00:42:33,480 --> 00:42:35,480
So then we can keep working on the second part.

763
00:42:35,480 --> 00:42:40,480
How can I print that verb five times?

764
00:42:40,480 --> 00:42:41,480
Yeah.

765
00:42:42,480 --> 00:42:45,480
Print and then question times five.

766
00:42:45,480 --> 00:42:47,480
Print question times five.

767
00:42:47,480 --> 00:42:48,480
Okay.

768
00:42:48,480 --> 00:42:50,480
Let's run it and see what happens.

769
00:42:50,480 --> 00:42:51,480
Run.

770
00:42:53,480 --> 00:42:54,480
Not quite.

771
00:42:54,480 --> 00:42:56,480
I'm missing spaces.

772
00:42:56,480 --> 00:42:58,480
But this is an awesome start.

773
00:42:58,480 --> 00:43:00,480
How can I add the spaces in there?

774
00:43:00,480 --> 00:43:01,480
Yeah.

775
00:43:01,480 --> 00:43:07,480
In parentheses, we can put verb plus like close to the space.

776
00:43:07,480 --> 00:43:08,480
In parentheses, yep.

777
00:43:08,480 --> 00:43:13,480
We can concatenate it with a space exactly.

778
00:43:13,480 --> 00:43:15,480
Time on all that times five.

779
00:43:15,480 --> 00:43:16,480
Yeah.

780
00:43:16,480 --> 00:43:17,480
Let's try that.

781
00:43:17,480 --> 00:43:18,480
Run.

782
00:43:18,480 --> 00:43:19,480
Yep.

783
00:43:19,480 --> 00:43:22,480
That looks pretty good.

784
00:43:22,480 --> 00:43:24,480
I do want to mention one thing.

785
00:43:24,480 --> 00:43:27,480
There is one improvement we can make to this program.

786
00:43:27,480 --> 00:43:32,480
If we look at the output here, the thing that we're actually printing out is this verb space.

787
00:43:32,480 --> 00:43:33,480
Right.

788
00:43:33,480 --> 00:43:36,480
There's one, two, three, four.

789
00:43:36,480 --> 00:43:40,480
And the last one actually prints it with a space at the end.

790
00:43:40,480 --> 00:43:44,480
So a challenge for you, and the answer is a little bit lower.

791
00:43:44,480 --> 00:43:46,480
I'll provide you guys with the answers to these.

792
00:43:46,480 --> 00:43:49,480
But a challenge for you is think about how you can change it.

793
00:43:49,480 --> 00:43:55,480
Change this last print statement so that this last run doesn't actually have that extra space.

794
00:43:55,480 --> 00:43:57,480
Think about it.

795
00:43:57,480 --> 00:44:01,480
You don't have to do it right now.

796
00:44:03,480 --> 00:44:04,480
Okay.

797
00:44:04,480 --> 00:44:10,480
So with what we know so far, we can actually apply some of these ideas to a more numerical example.

798
00:44:10,480 --> 00:44:19,480
So Newton's method is a way to actually grab the roots of a polynomial numerically using this idea called successive approximation.

799
00:44:19,480 --> 00:44:23,480
We can't actually write the full algorithm with what we know so far.

800
00:44:23,480 --> 00:44:25,480
But we can write a really important part of it.

801
00:44:25,480 --> 00:44:32,480
The part that we can write is the one that gets a next guess based on an initial guess.

802
00:44:32,480 --> 00:44:36,480
So you don't need to understand how the algorithm works.

803
00:44:36,480 --> 00:44:40,480
But basically the next guess based on an original guess looks like this.

804
00:44:40,480 --> 00:44:41,480
This is the formula.

805
00:44:41,480 --> 00:44:44,480
So the next guess is the original guess minus.

806
00:44:44,480 --> 00:44:51,480
And we evaluate the formula for whatever, you know, polynomial we want to find at the original guess,

807
00:44:51,480 --> 00:44:58,480
divided by the derivative of that function at the same guess.

808
00:44:58,480 --> 00:45:04,480
So here's just some code we've got asking the user for input.

809
00:45:04,480 --> 00:45:07,480
What x do we want to find the cube root of?

810
00:45:07,480 --> 00:45:09,480
Then we ask the user for input.

811
00:45:09,480 --> 00:45:11,480
What guess do you want to start with?

812
00:45:11,480 --> 00:45:14,480
And then we can just print the current estimate cubed.

813
00:45:14,480 --> 00:45:16,480
So we just guess cubed.

814
00:45:16,480 --> 00:45:20,480
And then the next guess is just following the formula up here.

815
00:45:20,480 --> 00:45:21,480
Right?

816
00:45:21,480 --> 00:45:23,480
The next guess is going to say it's my original guess.

817
00:45:23,480 --> 00:45:28,480
So the g that I read in from the student or from the input minus.

818
00:45:28,480 --> 00:45:30,480
And now I have a division.

819
00:45:30,480 --> 00:45:34,480
The top of it is going to be f at g.

820
00:45:34,480 --> 00:45:37,480
And the computer is not evaluating f, right?

821
00:45:37,480 --> 00:45:40,480
We have to actually write down what the formula is.

822
00:45:40,480 --> 00:45:42,480
The function is we want to evaluate at g.

823
00:45:42,480 --> 00:45:44,480
So it's g cubed minus x.

824
00:45:44,480 --> 00:45:45,480
That's our function up there.

825
00:45:45,480 --> 00:45:47,480
Divided by the derivative.

826
00:45:47,480 --> 00:45:51,480
And again, the program is not going to evaluate the derivative automatically.

827
00:45:52,480 --> 00:45:55,480
We're going to tell it what the derivative is manually.

828
00:45:55,480 --> 00:45:59,480
So the derivative of g cubed minus x is just 3g squared.

829
00:45:59,480 --> 00:46:01,480
So then we just kind of hard-code that in.

830
00:46:01,480 --> 00:46:09,480
And the next guess to try is just going to be that particular division and subtraction.

831
00:46:09,480 --> 00:46:10,480
I'm sorry.

832
00:46:10,480 --> 00:46:18,480
There are Python packages that allow you to do that.

833
00:46:18,480 --> 00:46:21,480
So for our purposes, we're just going to hard-code it in this case.

834
00:46:21,480 --> 00:46:23,480
But yeah.

835
00:46:23,480 --> 00:46:28,480
So the way this looks in code is as follows.

836
00:46:28,480 --> 00:46:30,480
That's exactly what we had in there.

837
00:46:30,480 --> 00:46:35,480
And if we run this program, all it does is, let's say we want to find the cube root of, say, 27.

838
00:46:35,480 --> 00:46:37,480
Let's start with, I don't know, five.

839
00:46:37,480 --> 00:46:38,480
Right?

840
00:46:38,480 --> 00:46:40,480
It tells me that five cubed is 125.

841
00:46:40,480 --> 00:46:41,480
Way too big, obviously.

842
00:46:41,480 --> 00:46:44,480
So the next guess to try is 3.69.

843
00:46:44,480 --> 00:46:45,480
Right?

844
00:46:45,480 --> 00:46:46,480
And that's all the program does.

845
00:46:46,480 --> 00:46:49,480
It doesn't take this next guess and do another guess.

846
00:46:49,480 --> 00:46:51,480
We haven't learned how to do such a thing yet.

847
00:46:51,480 --> 00:46:58,480
But we will in the next couple of lectures.

848
00:46:58,480 --> 00:47:02,480
One other thing I want to mention is this thing called an F string.

849
00:47:02,480 --> 00:47:08,480
It's something that became available, I think, a couple of years ago in Python with Python 3.6.

850
00:47:08,480 --> 00:47:15,480
It's a way more convenient way for us to print out mixtures of literal text.

851
00:47:15,480 --> 00:47:18,480
And resulting expressions.

852
00:47:18,480 --> 00:47:25,480
So if you have a bunch of complicated expressions, you want to print out an F string is the way to do it these days.

853
00:47:25,480 --> 00:47:28,480
What we know is these first two lines.

854
00:47:28,480 --> 00:47:30,480
This is what we've learned in the past couple of slides.

855
00:47:30,480 --> 00:47:40,480
So if you wanted to have these two values and print, you know, this big number is whatever fraction percent out of the original number.

856
00:47:41,480 --> 00:47:50,480
If you actually run this in the Python file, you'll see that this comma here puts an extra space between my number and the percent.

857
00:47:50,480 --> 00:47:52,480
Right? And that doesn't look very good.

858
00:47:52,480 --> 00:47:56,480
When you have 3%, you're expecting the percent sign to be right by the three.

859
00:47:56,480 --> 00:48:00,480
But this comma adds for me an extra space.

860
00:48:00,480 --> 00:48:01,480
So it looks a little bit weird.

861
00:48:01,480 --> 00:48:05,480
Which means that our solution was to cast things to strings.

862
00:48:06,480 --> 00:48:15,480
So if we wanted to have that percent sign be right beside the number, we'd concatenate this cast with the percent.

863
00:48:15,480 --> 00:48:18,480
But F strings allow us to do this all in one.

864
00:48:18,480 --> 00:48:21,480
So there's no concatenation to think about.

865
00:48:21,480 --> 00:48:23,480
There's no casting to think about.

866
00:48:23,480 --> 00:48:29,480
F strings basically are this F and then a long string.

867
00:48:29,480 --> 00:48:34,480
And it's a mixture of expressions and things that I want to print literally to the screen.

868
00:48:35,480 --> 00:48:41,480
So the thing that's not inside a curly bracket are all things I'm going to print literally to the screen.

869
00:48:41,480 --> 00:48:45,480
So the space is space and then later on percent space of percent.

870
00:48:45,480 --> 00:48:49,480
Those are all things that will literally be printed to the screen.

871
00:48:49,480 --> 00:48:53,480
Anything that's within a curly bracket is considered an expression in Python.

872
00:48:53,480 --> 00:49:00,480
And so before Python prints out the thing to the screen it's actually going to evaluate whatever non-time fraction is.

873
00:49:00,480 --> 00:49:02,480
And it knows these are going to be variables.

874
00:49:02,480 --> 00:49:05,480
And then later on fraction times 100 and then later on none.

875
00:49:05,480 --> 00:49:11,480
These are all variables or expressions that it will evaluate before actually putting them on the screen.

876
00:49:11,480 --> 00:49:18,480
And now notice these expressions we might have had to cast to strings beforehand if we wanted to concatenate them.

877
00:49:18,480 --> 00:49:23,480
But now we don't because they're in this special format with the curly brackets of the extra.

878
00:49:23,480 --> 00:49:25,480
So just something to practice.

879
00:49:26,480 --> 00:49:28,480
I'll use sometimes this.

880
00:49:28,480 --> 00:49:30,480
I'll use sometimes casting.

881
00:49:30,480 --> 00:49:31,480
I'll use sometimes abstracts.

882
00:49:31,480 --> 00:49:40,480
But if you can use abstracts whenever you can that's really the way to go in Python these days.

883
00:49:40,480 --> 00:49:45,480
So the big idea actually even with abstracts is that you can place expressions anywhere.

884
00:49:45,480 --> 00:49:49,480
We saw we placed expression where we indexed.

885
00:49:49,480 --> 00:49:51,480
We placed an expression in the index.

886
00:49:51,480 --> 00:49:55,480
Now we're placing expressions inside print statements.

887
00:49:55,480 --> 00:49:57,480
And now we're placing expressions inside abstracts.

888
00:49:57,480 --> 00:50:00,480
So expressions can be placed really anywhere.

889
00:50:00,480 --> 00:50:01,480
Which is pretty awesome.

890
00:50:01,480 --> 00:50:02,480
Very versatile.

891
00:50:02,480 --> 00:50:08,480
Python will just evaluate them and then just move on to the next lines.

892
00:50:08,480 --> 00:50:14,480
Okay. So the last topic of, sorry, I think I have the questions about the inputs and outputs.

893
00:50:14,480 --> 00:50:17,480
Where's that right?

894
00:50:17,480 --> 00:50:18,480
Okay.

895
00:50:18,480 --> 00:50:27,480
So the last thing that we'll talk about today and we will maybe talk a little bit about it next time is conditions for branching.

896
00:50:27,480 --> 00:50:32,480
So right now the kinds of programs we can write are basically very linear.

897
00:50:32,480 --> 00:50:36,480
We have a bunch of lines of code and they get evaluated one by one.

898
00:50:36,480 --> 00:50:38,480
There's no way to skip around.

899
00:50:38,480 --> 00:50:39,480
There's no way to repeat things.

900
00:50:39,480 --> 00:50:41,480
There's no decision points in the programs.

901
00:50:41,480 --> 00:50:45,480
You know, values that you get are just values that are in the program.

902
00:50:45,480 --> 00:50:49,480
Now we're going to look at ways that we can add decision points in our program.

903
00:50:49,480 --> 00:50:57,480
So if some value, if some variable value is less than some other variable value, we want to evaluate some code.

904
00:50:57,480 --> 00:51:00,480
And otherwise we'll do some other code.

905
00:51:00,480 --> 00:51:08,480
Right? So some code can now be skipped in programs with this new, with this new idea.

906
00:51:08,480 --> 00:51:14,480
Before we go on to showing you exactly how to do that, I'm going to talk about another notion of equal in programming.

907
00:51:14,480 --> 00:51:19,480
And this might be more the notion of equal you might be used to in math.

908
00:51:19,480 --> 00:51:23,480
So the first notion of equal is the one we've already seen. It's assignment.

909
00:51:23,480 --> 00:51:25,480
It's done with one equal sign.

910
00:51:25,480 --> 00:51:32,480
The value on the right hand side is bound to the variable on the left hand side. Right? That we've known.

911
00:51:32,480 --> 00:51:42,480
Double equal in Python is how we tell Python that we'd like to know whether these two expressions are equal or equivalent.

912
00:51:42,480 --> 00:51:44,480
Sorry, not it.

913
00:51:44,480 --> 00:51:52,480
So if we're going to be looking at equivalency, how do we express equivalency?

914
00:51:52,480 --> 00:51:59,480
Well, if something is equal to something else, we can say yes or no. We can say true or false.

915
00:51:59,480 --> 00:52:05,480
True or false should ring a bell. It's the Boolean data type that we saw last lecture.

916
00:52:05,480 --> 00:52:15,480
So now that we're going to show you equality or conditionals in programming, we're going to start talking about Booleans a little bit more.

917
00:52:15,480 --> 00:52:22,480
So expressions don't just have to be numerical expressions can actually give us Boolean results.

918
00:52:22,480 --> 00:52:32,480
So for example, an expression like two less than three is OK in Python.

919
00:52:32,480 --> 00:52:39,480
And this expression actually evaluates to a certain value. It's not a number. It evaluates to true.

920
00:52:39,480 --> 00:52:45,480
The Boolean value true because yes, two is less than three.

921
00:52:45,480 --> 00:52:54,480
The equal sign here, this notion, with a double equal is how we ask Python to tell us whether two things are equivalent.

922
00:52:54,480 --> 00:53:01,480
And this will be the Boolean value false.

923
00:53:01,480 --> 00:53:08,480
So here's a bunch of other operators that we can run on any type, really, in Python.

924
00:53:08,480 --> 00:53:15,480
Most of the time we're going to run them on numbers, but they can be run on strings and things like that as well.

925
00:53:15,480 --> 00:53:22,480
So obviously the double equal sign checks for equality. So if i is the same as j, this entire expression is replaced with true.

926
00:53:22,480 --> 00:53:28,480
And if they're not equivalent, this entire expression is replaced with false.

927
00:53:28,480 --> 00:53:36,480
If we want to check for inequality, we use not equal. So exclamation mark equal means not equal.

928
00:53:36,480 --> 00:53:44,480
So if the number i or whatever object i is not equal to object j, then this entire expression is true.

929
00:53:44,480 --> 00:53:49,480
If they are equal, then the entire expression is false.

930
00:53:49,480 --> 00:53:56,480
And then of course we've got the less than or equal to greater or greater than or equal to to work with this one.

931
00:53:56,480 --> 00:54:03,480
We can apply these to strings. And with strings it's important to be careful about case.

932
00:54:03,480 --> 00:54:13,480
So for example, lower case a equivalent to upper case a is false, right? Because they are not the same character.

933
00:54:13,480 --> 00:54:19,480
Now that we're talking about Boolean operators, we can actually start to combine them together.

934
00:54:19,480 --> 00:54:26,480
So if I have the expression, for example, two less than three, like I wrote on the board, that's true.

935
00:54:26,480 --> 00:54:33,480
But I can combine that expression with another one. Actually by itself I can say what is not two less than three.

936
00:54:33,480 --> 00:54:37,480
And that will be false. Right? It's the opposite of it.

937
00:54:37,480 --> 00:54:47,480
But I can also combine Boolean expressions together. So I can say what's two less than three and three less than four.

938
00:54:47,480 --> 00:54:53,480
So two less than three is true, right? And three less than four is also true.

939
00:54:53,480 --> 00:55:00,480
So the combination of these two expressions is what is true and true? True.

940
00:55:00,480 --> 00:55:08,480
So if one is true and the other one is true, then both of them and both of them together are going to be true.

941
00:55:08,480 --> 00:55:15,480
If one of these is false, so is three greater than four is false.

942
00:55:15,480 --> 00:55:25,480
Well, what's false and true? It's going to be false. So if one of these operators is false, then the entire expression is false.

943
00:55:25,480 --> 00:55:33,480
And you don't have to remember this truth table. You can always check it like I just did, right, here in the console.

944
00:55:33,480 --> 00:55:45,480
But at a high level, right, when we're doing the AND operator between two Boolean expressions, we need both of the expressions to be true for the result and to be true.

945
00:55:45,480 --> 00:55:55,480
The OR is the other one we usually do. The OR is always true except for when both of the operators are false.

946
00:55:55,480 --> 00:56:04,480
And it kind of makes sense in English to write. If either operator is true, then the entire result is true.

947
00:56:04,480 --> 00:56:09,480
But when both are false, the OR of both of them is false as well.

948
00:56:09,480 --> 00:56:16,480
So here's a little example where we can use these operators in Python so we can draw the little memory diagram as well.

949
00:56:16,480 --> 00:56:21,480
So Pisa time is 15, there's my variable, sleep time is 8, there's my other variable.

950
00:56:21,480 --> 00:56:32,480
I'm going to print sleep time is greater than Pisa time. So here my print statement is going to grab that expression, which evaluates to false.

951
00:56:32,480 --> 00:56:41,480
8 is less than 15 is false. So that's going to print false. And then I have two more variables. These ones just happen to be Booleans.

952
00:56:41,480 --> 00:56:56,480
So here's one of them is false. And so here I've got this other variable both. And then I'm going to print false to the console.

953
00:56:56,480 --> 00:57:05,480
Okay, quick you try it for you guys. So let's have you write a program that saves a secret number in a variable.

954
00:57:05,480 --> 00:57:14,480
Okay, so that's going to be your program's secrets. Presumably people using your program won't be looking at the program itself. They'll just be interacting with the program in the shell.

955
00:57:14,480 --> 00:57:22,480
So save a secret number in a variable, ask the user to guess a number, and then print either true or false if it's the same as your secret or not.

956
00:57:22,480 --> 00:57:35,480
So it's here in this you try it down here. So you can start with something like secret equals and then put your favorite number there, five, whatever, and then write the rest of the code.

957
00:57:35,480 --> 00:57:46,480
So ask the user to guess a number, print a Boolean depending on whether the guess equals this secret or not. So I'll give you a couple minutes to write that.

958
00:57:47,480 --> 00:58:01,480
Yeah, sorry. If you use the symbol and it's not the same, you have to actually type out a and d in Python. The end means something else.

959
00:58:01,480 --> 00:58:10,480
It's like a it's an operator with the bits of the number. So something it's not going to give the same answers.

960
00:58:10,480 --> 00:58:20,480
Right, you're thinking about Java or C++ or something, right? Yeah.

961
00:58:20,480 --> 00:58:30,480
All right, does anyone have a start for me for this program? How do I get a grab the user input?

962
00:58:30,480 --> 00:58:41,480
Yes, equals input. We can be nice, please, guess. What's that?

963
00:58:41,480 --> 00:58:56,480
We want the user to give us an integer, yeah, a number. Exactly. So, okay, yeah. If we leave it like that, then we're just grabbing the string.

964
00:58:56,480 --> 00:59:11,480
We have to cast it to an integer, exactly. Now what? How do I check for equivalency between my secret and the guess?

965
00:59:11,480 --> 00:59:23,480
Secret. Equal, equal guess. And you want to print this? Yeah, let's print that.

966
00:59:23,480 --> 00:59:31,480
Okay, run it. Let's guess something that's not the same false. Run it again. Let's guess something that's the same truth.

967
00:59:31,480 --> 00:59:38,480
And we can guess something that's lower to just. Is everyone on? Yeah.

968
00:59:38,480 --> 00:59:47,480
Can you assign it like a different route? Can you assign this to a pretty close to a guess to a player?

969
00:59:47,480 --> 00:59:56,480
Yep, yeah, exactly. Equal equals this thing. Yep, and then you can do whatever you want with that print equal or something.

970
00:59:56,480 --> 01:00:00,480
That's the same, but yeah, you can do other things with this variable. Yeah.

971
01:00:00,480 --> 01:00:09,480
Exactly. Five. Yeah.

972
01:00:09,480 --> 01:00:15,480
If you want at home, try to see what would have happened if you didn't cast it to an integer.

973
01:00:15,480 --> 01:00:21,480
See if the program would have crashed or not, or if it would have just, you know, worked by giving a wrong answer.

974
01:00:21,480 --> 01:00:30,480
So why do we do Booleans? Booleans are important variables because they allow us to start thinking about writing programs that make decisions.

975
01:00:30,480 --> 01:00:35,480
The way we talk is, you know, we can say something like, if this is true, do this, otherwise do this.

976
01:00:35,480 --> 01:00:43,480
The Boolean part is, if that's something is true. Right? So the something is true is going to be the Boolean that we can create in our programs.

977
01:00:43,480 --> 01:00:48,480
And then the do this is some sort of commands. And then the otherwise do that is going to be some other set of commands.

978
01:00:48,480 --> 01:00:57,480
Okay. So really simple, you know, Boolean expression could be it's midnight, you get a free food email, do you go get the free food or do you sleep?

979
01:00:57,480 --> 01:01:01,480
Right. That's the very simplest kind of decision point you can make.

980
01:01:01,480 --> 01:01:08,480
But with conditionals, you can actually write a pretty cool program that gets you to that free food. Right.

981
01:01:08,480 --> 01:01:14,480
So let's say this is a map of MIT. This is where you are. That's where the free food is. Okay.

982
01:01:14,480 --> 01:01:20,480
So you can write a really simple algorithm using just conditionals that takes you to that free food.

983
01:01:20,480 --> 01:01:25,480
So the algorithm goes like this. So I'm going to say I'm going to walk always, you know, in this direction.

984
01:01:25,480 --> 01:01:32,480
So I'm either going forward, backward, left and right. I'm not turning. And I'm going to say the algorithm is always going to have my right hand be on a wall.

985
01:01:32,480 --> 01:01:41,480
So if the right is clear, so standing here, my right is clear. So I'm just going to keep shimming until I reach a wall.

986
01:01:41,480 --> 01:01:53,480
If my right is blocked, but my forward is clear, I'm going to keep going like this all the way to the end of the room.

987
01:01:53,480 --> 01:02:00,480
If my right is blocked and my forward is blocked, right as if I would have reached that into the room, I would have gone to the left.

988
01:02:00,480 --> 01:02:06,480
And if my right forward and left is blocked, if I'm over there, I would go backward. So I'd go backward.

989
01:02:06,480 --> 01:02:13,480
So basically starting from here, I've made my way all the way around this room and I would go out the door down the hallway.

990
01:02:13,480 --> 01:02:29,480
And if the map of MIT doesn't have islands, so if the free food isn't somewhere sort of in an island in the middle here, if it's just a regular old maze, I would eventually make my way to the free food following this really simple conditional algorithm.

991
01:02:29,480 --> 01:02:36,480
So how do we actually do conditionals in Python? How do we tell Python, hey, I want to create, I want to insert a decision point right here.

992
01:02:36,480 --> 01:02:43,480
We do that using the keyword if and the if starts a decision block.

993
01:02:43,480 --> 01:02:49,480
Now the simplest decision block is just an if by itself.

994
01:02:49,480 --> 01:02:57,480
So if Python sees that if, so there's some code that it's following, and then at some point it reaches the if.

995
01:02:57,480 --> 01:03:04,480
The condition tells Python to check whether that condition is true.

996
01:03:04,480 --> 01:03:16,480
If the condition is true, so this is our decision point, then I'm going to deviate from my main program and do the code that's part of that condition.

997
01:03:16,480 --> 01:03:27,480
I guess two lines dot dot dot inside there. If the condition is not false, I'm not going to go that route and I'll just keep following the rest of the main program.

998
01:03:27,480 --> 01:03:33,480
How does Python know how many code lines to execute that's part of that condition? Well, it looks at the indentation.

999
01:03:33,480 --> 01:03:40,480
So notice here I've kind of put a few spaces for these two and dot dot dot code blocks here.

1000
01:03:40,480 --> 01:03:48,480
Anything that's indented right after that if statement and that colon there is a set of commands that are part of that block.

1001
01:03:48,480 --> 01:03:52,480
So anything here will get executed all at once.

1002
01:03:52,480 --> 01:03:59,480
And that's a really simple if either you do the set of commands, extra commands if the condition is true or you don't.

1003
01:04:00,480 --> 01:04:09,480
Now you can add an exception to that. So if the condition is true, again, we're following the program, we reach this if conditional here.

1004
01:04:09,480 --> 01:04:17,480
If the condition is true, again, we're going to deviate from the program and execute this other set of commands right here.

1005
01:04:17,480 --> 01:04:24,480
Otherwise, the condition is not true and we're going to execute this other set of commands over here. So these guys over here.

1006
01:04:25,480 --> 01:04:31,480
So either we do this set of commands or the other set of commands, but we never do both and we never skip both of them.

1007
01:04:31,480 --> 01:04:44,480
So either we do one set or the other. When we're done executing all the indented blocks, part of the condition or the other one that's that, if the condition wasn't true, then we rejoin the rest of the program and continue executing.

1008
01:04:44,480 --> 01:04:51,480
So this is all the rest of the program is at the same indentation level as our original if and else.

1009
01:04:52,480 --> 01:05:08,480
We can add a whole bunch of conditions, right, not just an if, do this, otherwise, do this. We can actually add a bunch of things to check using L if, which basically stands for else if another condition do this.

1010
01:05:08,480 --> 01:05:19,480
So here's our program we reach a decision point. If the condition is true like before, we'll execute this set of commands, but otherwise the condition is not true,

1011
01:05:20,480 --> 01:05:33,480
we're going to check another condition else if this other condition is true, we'll execute this other set of commands. Otherwise, here's another else. We'll check another condition.

1012
01:05:33,480 --> 01:05:44,480
If it's true, we'll execute some other set of commands, otherwise there can be more ellipse and at some point we're going to rejoin the rest of the program.

1013
01:05:45,480 --> 01:05:59,480
Now these L ifs are going to be each condition is checked one at a time. The very first one that's true is the one that gets executed. We're never going to execute more than one, right, because this is an if, else if, else if, else if.

1014
01:05:59,480 --> 01:06:10,480
So even in English, you're only going to do one of these, right, you're never going to do all of them. It is possible to skip all of them though, because if none of those conditions are true, you just don't do any of them.

1015
01:06:10,480 --> 01:06:24,480
If more than one is true, you do the first one that is true. If you want to have sort of a catch-all kind of version of the middle L if, L if, L if, L if, you just add an else at the end.

1016
01:06:24,480 --> 01:06:31,480
So if none of those conditions are true, you can add an else which says you just do this if nothing is true.

1017
01:06:31,480 --> 01:06:43,480
Kind of like what we had over here. If this one otherwise do this. Well, if any of these conditions are true, do one of them otherwise do this.

1018
01:06:43,480 --> 01:06:52,480
So here's an example. We've got piece at time, we'll just put some variables in there, sleep time, we'll put some variables in there and run it. See what we get?

1019
01:06:52,480 --> 01:07:03,480
I've got one code block here, and if, L if, and an else. So the first code block, the condition is it checks that the sum of those two is greater than 24, and it does something.

1020
01:07:03,480 --> 01:07:10,480
This is the block that's part of that condition. Notice it's indented by usually four spaces.

1021
01:07:10,480 --> 01:07:22,480
L if, so if this one was not true, then I'm going to go ahead and check the next one. The next condition is that the addition is greater than or equal to 24, and then we're going to do this print statement here.

1022
01:07:22,480 --> 01:07:28,480
And if neither of those are true, I'm going to do whatever is in this code block here. I'm going to do these two lines.

1023
01:07:28,480 --> 01:07:38,480
Okay, so this is my sort of, I call it a catch-all because none of those other conditions were true, so we're going to catch ourselves and do these commands here.

1024
01:07:38,480 --> 01:07:56,480
And otherwise, once we finish doing either this one or this one or catching whatever is left over in here, we're going to evaluate the print statement here, and we're going to print end of day, because this is the rest of my program. Notice it's at the same indentation level as my original program.

1025
01:07:56,480 --> 01:08:17,479
So here is this program. So if, piece at time and sleep time is 22 and 8, the addition is more than 24, so this is going to enter this code block here and print impossible.

1026
01:08:17,479 --> 01:08:35,479
If it's exactly equal to 24, so 22 and 2, we're not going to enter this one, but we will enter this one, because it's exactly equal to, it's not greater than, so then we're going to print full schedule, and then rejoin the rest of the program here and print end of day.

1027
01:08:36,479 --> 01:08:51,479
And otherwise, if this is something low, less than 24 and not equal to 24, so neither of these conditions are true, then we're going to enter the else, and we're going to evaluate, or run these two lines of code here.

1028
01:08:52,479 --> 01:09:01,479
So the two lines of code here are going to grab the absolute value of 24 minus the piece at time minus the sleep time, figuring out how much time we have left in the day.

1029
01:09:01,479 --> 01:09:09,479
It's also going to print this line here, and then rejoin the rest of the program to print end of day.

1030
01:09:10,479 --> 01:09:18,479
Okay, quick check, nothing to run, nothing to write here, nothing to run. Think about this program, what is wrong with it?

1031
01:09:21,479 --> 01:09:32,479
So I'm grabbing a number for x, a number for y, and then I'm checking if x is the same as y, I'm printing x is the same as y, so if I give it 5 and 5, I'm going to print 5 is the same as 5.

1032
01:09:33,479 --> 01:09:39,479
And then I'd also like to print these are equal, what's the problem with this program? Yeah.

1033
01:09:45,479 --> 01:09:55,479
Exactly, if x is not the same as y, we rejoin the rest of the program because the indentation level of this print statement is the same as the rest of our program.

1034
01:09:55,479 --> 01:09:56,479
So how do we fix it?

1035
01:09:57,479 --> 01:10:06,479
indent, we'll just indent that print statement in to be at the same level as the obstament.

1036
01:10:10,479 --> 01:10:20,479
So we can actually nest indentation statement, we can nest conditionals, right, because once we've created a conditional, it's just a code block.

1037
01:10:21,479 --> 01:10:32,479
So here I've got an if statement with its own code block, and inside that code block, I can actually have more if statements that are just going to be executed whenever this condition is true.

1038
01:10:34,479 --> 01:10:36,479
So this is the inside code block.

1039
01:10:36,479 --> 01:10:47,479
So for example, the place where we would execute this inner code block is when x and y are equivalent, right, because then I'm going to enter this code block here, this is true.

1040
01:10:48,479 --> 01:10:55,479
I'm going to print x and y are equal, and then this second conditional here, y is not equal to zero is also true.

1041
01:10:56,479 --> 01:10:58,479
And then I'm going to print this one as well.

1042
01:11:00,479 --> 01:11:06,479
I've already done one of the conditionals, they're true, so I'm going to skip the ellip and skip the else, and I'm going to rejoin the rest of the program.

1043
01:11:06,479 --> 01:11:35,479
All the other cases, right, when one values different than the other, will either take me here in the else, and then rejoin the rest of the program, or when they're equivalent, I'm going to, or you know, here, I don't know, I don't actually have a case for that one on the slides, but when they're equivalent and one and y is equal to zero, I'm not actually going to enter this inner conditional, right, because why?

1044
01:11:36,479 --> 01:11:45,479
While x and y were true, where equivalent, which is true, y was equal to zero, so that not equal to zero is false.

1045
01:11:48,479 --> 01:11:50,479
And then we rejoin the rest of the program.

1046
01:11:53,479 --> 01:11:57,479
Oh, I'm casting the numbers to floats, I could cast them to ints as well.

1047
01:12:00,479 --> 01:12:02,479
Just so I'm not comparing strings.

1048
01:12:03,479 --> 01:12:13,479
So now that I've introduced conditionals, it's important to do a little bit more practice, to get a mental model of how to trace the code, right?

1049
01:12:14,479 --> 01:12:28,479
And the visual structure of the code actually helps a lot, and Python is unique in the sense, there's no other languages that actually force you to indent things, so the other languages don't really force you to have this visual structure to match exactly what's going on.

1050
01:12:29,479 --> 01:12:39,479
But it's actually really useful in Python, that's what I like about Python, it just helps you see things that are going on immediately, like, you know, this set of code is part of this code block.

1051
01:12:40,479 --> 01:12:50,479
And so it helps you kind of debug a little bit more efficiently, but the more practice you get, the more you'll get used to kind of tracing the code and knowing exactly, you know, if these variables have this value, exactly where your code is going to go.

1052
01:12:51,479 --> 01:13:01,479
So I'm going to skip this, you try it, because it's just kind of you tracing the code, and I'm going to have you do this one, or we can write it real quick, or you can start, and then we can write it together.

1053
01:13:02,479 --> 01:13:15,479
It's a variation of the program you just wrote, instead of telling me whether the guess is true or is the same as the secret number, I just want you to print whether the guess is too low, too high, or the same as the secret number.

1054
01:13:16,479 --> 01:13:22,479
So we're going to need to put a conditional in there if some conditional, you know, we're going to print something.

1055
01:13:24,479 --> 01:13:28,479
So I'll give you about a minute, and then we can write it together, and then we can be done.

1056
01:13:35,479 --> 01:13:44,479
You can have two statements in the program, yeah. And there's actually some exercises I have for you guys to try at home here, where there are two if statements in the program, and just to see what happens.

1057
01:13:45,479 --> 01:13:54,479
So if you have if some conditional, that one can be true, and if some other conditional, that one can also be true, and then both will be evaluated.

1058
01:13:54,479 --> 01:13:58,479
It's not an else situation, right? Yeah. That's a good question.

1059
01:14:02,479 --> 01:14:06,479
So I'm just going to copy the input from before.

1060
01:14:06,479 --> 01:14:11,479
Does anyone have a start to my condition? I just copied what we had before for the input.

1061
01:14:15,979 --> 01:14:22,979
So thewhile fifteen percent your Также bear.

1062
01:14:28,979 --> 01:14:29,979
Yes, so again when we think of cheated over enough.

1063
01:14:29,979 --> 01:14:31,479
Yep.

1064
01:14:31,479 --> 01:14:31,979
Yep.

1065
01:14:33,979 --> 01:14:34,579
arle.

1066
01:14:40,479 --> 01:14:41,479
Place gave us an answer?

1067
01:14:42,479 --> 01:14:42,979
Yup.

1068
01:14:42,979 --> 01:14:44,479
Too high.

1069
01:14:45,479 --> 01:14:51,939
Yep, that's a great start so we can even run it and you know guess something that's we know is too high perfect

1070
01:15:05,319 --> 01:15:07,319
Do you want to do an L-sern L if yeah?

1071
01:15:07,599 --> 01:15:13,079
Actually, I would get rid of the equal sign because if we put in a five now, we will still say two five

1072
01:15:13,279 --> 01:15:16,920
That's a good point. So if we run it now, let's run it with a five

1073
01:15:18,439 --> 01:15:25,000
It says too high exactly. Yeah, so let's remove the equal sign. It's a good thing. We debug that

1074
01:15:26,719 --> 01:15:32,279
So we can do an L if the guess is equivalent to the secret and

1075
01:15:33,359 --> 01:15:35,359
then we can print

1076
01:15:36,079 --> 01:15:38,079
Equal right

1077
01:15:46,199 --> 01:15:49,399
Does everyone understand why we remove that equal sign from the greater than?

1078
01:15:50,000 --> 01:15:54,279
Yeah, because we would have missed it. Yeah, we would have mistakenly gone into that first path

1079
01:15:55,039 --> 01:15:59,079
But L if we can have a case where the guess is equivalent to secret

1080
01:15:59,079 --> 01:16:06,239
Sure, and then we'll print equal and then the last one can either be an else because we know the only other option is

1081
01:16:06,239 --> 01:16:12,479
Guess is less than or we can do another L if we want to but we can leave it as an else and then we can print

1082
01:16:14,079 --> 01:16:16,079
too low

1083
01:16:18,880 --> 01:16:26,399
And then we can run it and we can guess all the variations so something that's too high something that's the same and

1084
01:16:29,079 --> 01:16:38,319
I'm not sure what I did there. I should restart my current

1085
01:16:46,039 --> 01:16:48,720
So we did something that's too high something that is

1086
01:16:51,840 --> 01:16:54,119
Equivalent and then we can do something that's too low

1087
01:16:54,119 --> 01:16:56,119
Yeah

1088
01:17:01,399 --> 01:17:08,319
So there is no difference we can do an L if guess is less than secret that would the program would work just the same

1089
01:17:08,519 --> 01:17:12,159
The else is just quicker because we know there are no other options

1090
01:17:17,680 --> 01:17:22,359
We could also in this particular case we could also put a bunch of if statements in a row

1091
01:17:22,599 --> 01:17:26,960
But then we'd have to be careful that they are mutually exclusive

1092
01:17:27,239 --> 01:17:34,920
So like in the previous example right if we have a bunch of conditions that might all be true all those ifs will execute

1093
01:17:35,599 --> 01:17:40,920
Right, that's the thing because the if starts a block the L if is just associated with that block

1094
01:17:40,920 --> 01:17:42,920
So either you do one or the other or the other

1095
01:17:43,039 --> 01:17:48,479
But if you have a whole bunch of ifs then they might all be true and they'll all be executed. Yeah

1096
01:17:52,359 --> 01:17:57,599
Oh, we could use parentheses in the if-else statements you mean like this

1097
01:17:58,000 --> 01:18:01,599
Yeah, we can do that especially if we have a whole bunch of expressions together

1098
01:18:01,599 --> 01:18:08,199
But if there's just one Python will automatically know to do the expression first and then do the if yeah

1099
01:18:08,519 --> 01:18:10,519
These are all wonderful questions by the way

1100
01:18:12,439 --> 01:18:14,279
Okay

1101
01:18:14,279 --> 01:18:18,679
So as we saw there was a little bug in our code. It's a good thing we ran it

1102
01:18:18,680 --> 01:18:20,720
I should have run it with a bunch of different options

1103
01:18:20,720 --> 01:18:27,440
But it's important to debug early and debug often just to make sure that you don't introduce a bug that will kind of carry on throughout the code

1104
01:18:28,560 --> 01:18:33,000
That's another big idea and then a quick summary of what we've learned input and outputs

1105
01:18:33,240 --> 01:18:35,240
Obviously make our programs interactive

1106
01:18:35,240 --> 01:18:41,520
We added branching as a way to introduce decision points in our program and next time we're gonna do a little bit more branching

1107
01:18:41,520 --> 01:18:44,240
And then introduce looping so ways to repeat

1108
01:18:45,119 --> 01:18:46,440
commands in our programs

1109
01:18:46,439 --> 01:18:50,399
Sorry, I went a little bit over time. I won't do that again

