---
title: CS143 P6Week102 03 Cool Example Iii Final Correction
---

1
00:00:00,000 --> 00:00:09,060
Hello again, in this video we're going to wrap up our overview of Cool with one more example

2
00:00:09,060 --> 00:00:18,320
of writing a Cool program.

3
00:00:18,320 --> 00:00:21,820
For our final example, let's look at a program that actually manipulates some interesting

4
00:00:21,820 --> 00:00:24,080
data structure.

5
00:00:24,079 --> 00:00:32,739
So we'll begin here by opening up a file and let's call our program list.cll this time.

6
00:00:32,739 --> 00:00:43,840
And as usual, we'll begin by writing our main routine and our main method.

7
00:00:43,840 --> 00:00:54,039
And once again, let's make this inherit from I.O. so we can do the I.O. routines here.

8
00:00:55,039 --> 00:00:59,879
And let's just begin with something very simple, as always.

9
00:00:59,879 --> 00:01:04,200
Let's just have something that prints out hello world, but in a little bit of an unusual way.

10
00:01:04,200 --> 00:01:09,400
We're going to end up writing a list abstraction.

11
00:01:09,400 --> 00:01:13,759
And let's first build a list by hand or at least build the elements of a list by hand,

12
00:01:13,759 --> 00:01:17,680
and then we'll actually build a list abstraction and put them in a list.

13
00:01:17,680 --> 00:01:26,680
So let's have some strings.

14
00:01:26,680 --> 00:01:30,680
So we'll have our string hello, and this will also illustrate how you do multiple let

15
00:01:30,680 --> 00:01:32,680
bindings simultaneously.

16
00:01:32,680 --> 00:01:37,960
And I shouldn't say simultaneously how you do multiple let bindings in one let expression.

17
00:01:37,960 --> 00:01:40,480
So you do them by just listing them.

18
00:01:40,480 --> 00:01:50,079
Notice that this uses commas as a separator rather than semicolons as a terminator.

19
00:01:50,079 --> 00:01:55,480
So this let binding is going to define three names.

20
00:01:55,480 --> 00:02:03,960
Hello world and new line, all of which are strings.

21
00:02:04,959 --> 00:02:11,959
Then we're going to print these out on the screen.

22
00:02:11,959 --> 00:02:14,959
So we're going to want to be able to do out string.

23
00:02:14,959 --> 00:02:19,959
And since main inherits from self, we can do that without a without an object there,

24
00:02:19,959 --> 00:02:22,959
because just again dispatches to the self object.

25
00:02:22,959 --> 00:02:27,959
And we want to concatenate these strings together in the right order.

26
00:02:27,960 --> 00:02:30,960
So we'll do hello dot.

27
00:02:30,960 --> 00:02:32,960
This is hello is always the string.

28
00:02:32,960 --> 00:02:35,960
It can be concatenated to world and worlds of strings.

29
00:02:35,960 --> 00:02:38,960
So it can be concatenated to new line.

30
00:02:38,960 --> 00:02:41,960
And that should do the job.

31
00:02:41,960 --> 00:02:46,960
And just to find one more thing about this let these let bindings here.

32
00:02:46,960 --> 00:02:52,960
This knows that the commas comma is a separator here, meaning it doesn't come after the last one on the list.

33
00:02:52,960 --> 00:02:54,960
So it just separates items of the list.

34
00:02:54,960 --> 00:02:56,960
It's not a terminator.

35
00:02:56,960 --> 00:03:01,960
It's not we can close up our main procedure.

36
00:03:01,960 --> 00:03:05,960
Close up our class definition.

37
00:03:05,960 --> 00:03:06,960
Save it.

38
00:03:06,960 --> 00:03:10,960
And now let's see if it compiles.

39
00:03:10,960 --> 00:03:11,960
Oh, amazing.

40
00:03:11,960 --> 00:03:14,960
First try.

41
00:03:14,960 --> 00:03:17,960
And we run it in a print solo world as expected.

42
00:03:17,960 --> 00:03:23,960
So now let's instead of introducing the three strings separately and they concatenate them together,

43
00:03:23,960 --> 00:03:26,960
let's write an abstraction where we can build a list of strings.

44
00:03:26,960 --> 00:03:34,960
And then that abstraction will have a function within it to do the concatenation.

45
00:03:34,960 --> 00:03:35,960
All right.

46
00:03:35,960 --> 00:03:38,960
So we'll have our class called list.

47
00:03:38,960 --> 00:03:42,960
And every list needs to I think they have two components.

48
00:03:42,960 --> 00:03:44,960
So first it's going to have the item that's in the list.

49
00:03:44,960 --> 00:03:46,960
And that'll be a string.

50
00:03:46,960 --> 00:03:52,960
And then we have a pointer to the next to the to the tail of the list, to the rest of the list.

51
00:03:52,960 --> 00:03:59,960
And so I'll have a next field that points or is another list of strings.

52
00:03:59,960 --> 00:04:07,960
And now we need a couple of methods in order to use this list, we'll need to be able to initialize a list in some way.

53
00:04:07,960 --> 00:04:15,960
So the initialization function will take an item and the rest of the list, the next part of the list.

54
00:04:15,960 --> 00:04:18,960
And what is it going to do?

55
00:04:18,959 --> 00:04:21,959
Well, let's go into need to set the fields of the object.

56
00:04:21,959 --> 00:04:23,959
And so this will have to be done as a series of assignment statements.

57
00:04:23,959 --> 00:04:25,959
So we'll need a statement block.

58
00:04:25,959 --> 00:04:30,959
And we will set the item to be the I argument.

59
00:04:30,959 --> 00:04:35,959
We'll set the next attribute to be the in argument.

60
00:04:35,959 --> 00:04:44,959
And now we actually want this initialized object here, this method here, to return the object itself.

61
00:04:44,959 --> 00:04:48,959
So that and I'll be convenient for chain together calls to init.

62
00:04:48,959 --> 00:04:53,959
So we'll have it return self, it'll return the self object.

63
00:04:53,959 --> 00:04:57,959
And that's the end of our statement block.

64
00:04:57,959 --> 00:04:59,959
And then that is the end of our method.

65
00:04:59,959 --> 00:05:02,959
And we need a mistake up here.

66
00:05:02,959 --> 00:05:05,959
We actually clear the return type of init.

67
00:05:05,959 --> 00:05:08,959
And what it's going to return, of course, is that it returns an object of type list.

68
00:05:08,959 --> 00:05:11,959
How we need to put a list declaration there.

69
00:05:11,959 --> 00:05:13,959
All right, so I think it's care of init.

70
00:05:13,959 --> 00:05:19,959
And now we can use this to build a build a list down here.

71
00:05:19,959 --> 00:05:21,959
So what should we do?

72
00:05:21,959 --> 00:05:27,959
Let's actually have a new variable called list.

73
00:05:27,959 --> 00:05:31,959
That will introduce here in this let this series of let bindings.

74
00:05:31,959 --> 00:05:34,959
And let's just build a list out of these three objects.

75
00:05:34,959 --> 00:05:36,959
So we'll say we'll have a new list.

76
00:05:36,959 --> 00:05:41,959
And then we'll initialize it to contain the string hello.

77
00:05:41,959 --> 00:05:46,959
And what should the rest of the list be?

78
00:05:46,959 --> 00:05:54,959
Well, that should be another list, which is initialized to have the string world.

79
00:05:54,959 --> 00:05:57,959
And what should be inside of that list?

80
00:05:57,959 --> 00:06:02,959
Well, there has to be another new list object, which will initialize to have new line.

81
00:06:03,959 --> 00:06:05,959
And now what do we put here?

82
00:06:05,959 --> 00:06:07,959
Actually, a little bit of a problem here isn't there.

83
00:06:07,959 --> 00:06:09,959
We need to put a list object here.

84
00:06:09,959 --> 00:06:12,959
But we don't want to allocate a new list object.

85
00:06:12,959 --> 00:06:16,959
We want that to be really the equivalent of a null pointer.

86
00:06:16,959 --> 00:06:19,959
And there's no name for that in cool.

87
00:06:19,959 --> 00:06:22,959
Actually, you can't write down the name of a null pointer.

88
00:06:22,959 --> 00:06:24,959
It's called void in cool.

89
00:06:24,959 --> 00:06:28,959
There's no special symbol for that.

90
00:06:28,959 --> 00:06:33,959
So we'll have to create a variable that is just not initialized.

91
00:06:33,959 --> 00:06:39,959
And that will be, so an uninitialized variable of type list will, in fact, be void.

92
00:06:39,959 --> 00:06:40,959
It'll be a null pointer.

93
00:06:40,959 --> 00:06:42,959
So let's call that nil.

94
00:06:42,959 --> 00:06:44,959
And it'll be a type list.

95
00:06:44,959 --> 00:06:45,959
And no initializer.

96
00:06:45,959 --> 00:06:48,959
And so nil there will point to nothing or the void pointer.

97
00:06:48,959 --> 00:06:52,959
And then we can use nil to terminate our list here.

98
00:06:52,959 --> 00:06:56,959
And then we have to close off all the perenns for all the nesting here.

99
00:06:56,959 --> 00:06:58,959
And I think that's it.

100
00:06:58,959 --> 00:07:00,959
And so that will be our list.

101
00:07:00,959 --> 00:07:03,959
Okay, so we have a list of three strings.

102
00:07:03,959 --> 00:07:07,959
And now what we want to do with that is to print it out.

103
00:07:07,959 --> 00:07:11,959
And so what we would like to do is to have a list called to list.

104
00:07:11,959 --> 00:07:16,959
And then a function that's going to flatten that list and we'll just print it.

105
00:07:16,959 --> 00:07:21,959
So that is the, what the main program should do.

106
00:07:21,959 --> 00:07:29,959
And now we have to write the flatten function.

107
00:07:29,959 --> 00:07:35,959
So if flatten takes no arguments and it's going to return a string, it's going to return a single string.

108
00:07:35,959 --> 00:07:39,959
And flatten is pretty simple function.

109
00:07:39,959 --> 00:07:41,959
What do we have to do?

110
00:07:41,959 --> 00:07:44,959
Well, there's really two cases.

111
00:07:44,959 --> 00:07:48,959
One is if we're at the end of the string and the other is if we're not yet at the end of the string.

112
00:07:48,959 --> 00:07:50,959
So let's test for that.

113
00:07:50,959 --> 00:07:52,959
So how do we know if we're at the end of the string?

114
00:07:52,959 --> 00:07:56,959
Well, if the next pointer is void, then there is nothing more in the string.

115
00:07:56,959 --> 00:08:01,959
And there actually is a special test for that in calls called the is void function.

116
00:08:01,959 --> 00:08:03,959
And it's written like this.

117
00:08:03,959 --> 00:08:06,959
So if is void of next.

118
00:08:06,959 --> 00:08:08,959
Okay, so the next field.

119
00:08:08,959 --> 00:08:10,959
So the next field is void.

120
00:08:10,959 --> 00:08:13,959
Then what are we going to return?

121
00:08:13,959 --> 00:08:18,959
Well, then the result here is just the item.

122
00:08:18,959 --> 00:08:22,959
Whatever the item was in this last element of the list.

123
00:08:22,959 --> 00:08:28,959
And otherwise, what do we want to do?

124
00:08:28,959 --> 00:08:34,960
Well, otherwise we want to take the item and we want to concatenate onto it.

125
00:08:34,960 --> 00:08:40,960
The result of flattening the rest of the list.

126
00:08:40,960 --> 00:08:46,960
And that is our flatten method.

127
00:08:46,960 --> 00:08:52,960
So let's see if that works.

128
00:08:52,960 --> 00:08:58,960
So let's compile this.

129
00:08:58,960 --> 00:09:00,960
And we got a couple of syntax errors here.

130
00:09:00,960 --> 00:09:06,960
So let's go back and see what's going on.

131
00:09:06,960 --> 00:09:12,960
So we have a syntax error here at the end of the flatten method.

132
00:09:12,960 --> 00:09:16,960
And we see that we left out the keyword to close a conditional.

133
00:09:16,960 --> 00:09:21,960
So a conditional has to be ended with with fee.

134
00:09:21,960 --> 00:09:25,960
And let's see if that's working now.

135
00:09:25,960 --> 00:09:32,960
And we slow the syntax error at line 29.

136
00:09:32,960 --> 00:09:39,960
And the mistake here is that we forgot to declare the type of this variable, which is a list.

137
00:09:39,960 --> 00:09:45,960
And then it gets initialized to this big expression that we wrote out.

138
00:09:45,960 --> 00:09:48,960
And we just do the indentation a little more nicely here.

139
00:09:48,960 --> 00:10:00,960
And notice something actually that's worth mentioning here that this definition here, this definition of the variable list, depends on the definition of the previous variables in the let.

140
00:10:00,960 --> 00:10:03,960
Each of so on a let binding is made.

141
00:10:03,960 --> 00:10:09,960
The name that the variable that's bound is actually available in subsequent let expressions.

142
00:10:09,960 --> 00:10:19,960
So in this case, this variable list makes use of all of hello world and new line, which were defined earlier in the same let construct.

143
00:10:19,960 --> 00:10:26,960
All right, let's save this and come over here and compile it.

144
00:10:26,960 --> 00:10:29,960
And we see we got another bug in the code.

145
00:10:29,960 --> 00:10:31,960
So we come up here.

146
00:10:31,960 --> 00:10:32,960
I was here leave.

147
00:10:32,960 --> 00:10:33,960
I made a mistake here.

148
00:10:33,960 --> 00:10:37,960
I've used functional notation here calling flatten of next.

149
00:10:37,960 --> 00:10:42,960
And what I actually wanted to do was to dispatch to next on the method flatten.

150
00:10:42,960 --> 00:10:45,960
So that should be written like that.

151
00:10:45,960 --> 00:10:47,960
All right.

152
00:10:47,960 --> 00:10:48,960
Probably getting close now.

153
00:10:48,960 --> 00:10:50,960
Let's see if it works yet.

154
00:10:50,960 --> 00:10:51,960
Well, it compiles.

155
00:10:51,960 --> 00:10:55,960
And now let's see if it runs.

156
00:10:55,960 --> 00:11:00,960
And indeed it does print.

157
00:11:00,960 --> 00:11:03,960
So hello world just as we expected.

158
00:11:03,960 --> 00:11:09,960
Now let's go back to our program and let's generalize this list abstraction in one way.

159
00:11:09,960 --> 00:11:15,960
Let's say that we can have an arbitrary list of objects, not just strings.

160
00:11:15,960 --> 00:11:21,960
And that will require us to change a few things so it can be initialized now with an object.

161
00:11:21,960 --> 00:11:26,960
And now when it comes time to flatten this list, we want to reduce a string.

162
00:11:26,960 --> 00:11:34,960
We want to produce a print representation, but not everything in the in the list is necessarily a string.

163
00:11:34,960 --> 00:11:42,960
And we need a way to traverse the list and do different things for different kinds of things that might be in the list for different types of things that might be in the list.

164
00:11:42,960 --> 00:11:50,960
And so there's a constructing cool for recovering the type of an object at runtime.

165
00:11:50,960 --> 00:11:52,960
And this is called the case construct.

166
00:11:52,960 --> 00:11:56,960
So let me first introduce a let expression here.

167
00:11:56,960 --> 00:12:03,960
We'll let the string that we're going to construct, which is of type string.

168
00:12:03,960 --> 00:12:06,960
And that's going to be initialized to something.

169
00:12:06,960 --> 00:12:09,960
And now it's going to be a case.

170
00:12:09,960 --> 00:12:10,960
And what are we going to case on?

171
00:12:10,960 --> 00:12:13,960
Well, it's going to depend on the kind of thing the item is.

172
00:12:13,960 --> 00:12:16,960
So the item in the list could be it could be different kinds of types.

173
00:12:16,960 --> 00:12:20,960
And we want to do a different operation depending on what item actually is.

174
00:12:20,960 --> 00:12:24,960
So do case item and then the keyword is of.

175
00:12:24,960 --> 00:12:33,960
And now we have different branches of the case expression for different kinds of things that could be in the list.

176
00:12:33,960 --> 00:12:36,960
So let's say if it's an int.

177
00:12:36,960 --> 00:12:43,960
Okay, so what this does is this says that if the item is an int, then we're going to rename it to I.

178
00:12:43,960 --> 00:12:46,960
We're going to bind I to that integer.

179
00:12:46,960 --> 00:12:48,960
And then we can do something with I.

180
00:12:48,960 --> 00:12:50,960
And what would we want to do with I?

181
00:12:50,960 --> 00:12:55,960
Well, we probably want to convert it to a to a string.

182
00:12:55,960 --> 00:13:00,960
So I do I to a of I.

183
00:13:00,960 --> 00:13:04,960
And what if in fact.

184
00:13:04,960 --> 00:13:06,960
That item happened to be of type string.

185
00:13:06,960 --> 00:13:08,960
The item in the list have to be of type string.

186
00:13:08,960 --> 00:13:14,960
Well, then we can just use the item itself as a string representation.

187
00:13:14,960 --> 00:13:16,960
And we can do this for other kinds of types.

188
00:13:16,960 --> 00:13:21,960
If we have other kinds of types in our system, we can continue to list out other cases here.

189
00:13:21,960 --> 00:13:24,960
And how to convert them into a string representation.

190
00:13:24,960 --> 00:13:26,960
But let's have a default case here.

191
00:13:26,960 --> 00:13:36,960
We'll say if it's any other kind of type, which would which we should be covered by having a branch saying that if it's a type object, we'll call it O, then we should just abort.

192
00:13:36,960 --> 00:13:42,960
Okay, so we should just call the abort function and quit.

193
00:13:42,960 --> 00:13:44,960
And that's our case.

194
00:13:44,960 --> 00:13:52,960
It needs to be terminated with a closing keyword called ESAC again, the reverse of case.

195
00:13:52,960 --> 00:14:00,960
And now we can use that string that we constructed in our little function here.

196
00:14:00,960 --> 00:14:06,960
So if the next field is void, then we're just going to return the string.

197
00:14:06,960 --> 00:14:15,960
Otherwise, we're going to return the string concatenated with the flattening out of the rest of the list.

198
00:14:15,960 --> 00:14:17,960
Now, there's a couple of things we have to fix up.

199
00:14:17,960 --> 00:14:29,960
We use the I2A method here, which means that list needs to inherit from the conversion class A2I.

200
00:14:29,960 --> 00:14:34,960
And there's another issue here, I see.

201
00:14:34,960 --> 00:14:35,960
And that's right here.

202
00:14:35,960 --> 00:14:44,960
So if you notice, the case statement needs to produce a string.

203
00:14:44,960 --> 00:14:47,960
Okay. And it turns out that a board does not return a string.

204
00:14:47,960 --> 00:14:51,960
A board actually terminates the program, but its type is that it returns an object.

205
00:14:51,960 --> 00:14:57,960
And so here we have to convince the type checker to convince to accept this piece of code.

206
00:14:57,960 --> 00:15:00,960
And we need to get this branch here to type as a string.

207
00:15:00,960 --> 00:15:07,960
So what we can do, and this is ugly, but it's the way to do it, is we put it in a block, and a statement block.

208
00:15:07,960 --> 00:15:11,960
We call a board first, and again, that will just terminate the program.

209
00:15:11,960 --> 00:15:14,960
And now we can put any string expression we want after that.

210
00:15:14,960 --> 00:15:18,960
And that will give a type string to the entire block.

211
00:15:18,960 --> 00:15:22,960
And we can just put the empty string here, for example, and that has to be terminated with a semi-colon.

212
00:15:22,960 --> 00:15:26,960
And so this is in a block, and we can close that with a curly brace.

213
00:15:26,960 --> 00:15:30,960
Okay. So this is just something we have to do to make the type checker happy.

214
00:15:30,960 --> 00:15:33,960
And that may be everything we needed to do.

215
00:15:33,960 --> 00:15:39,960
So let's try compiling this.

216
00:15:39,960 --> 00:15:45,960
And we have to include the conversion library.

217
00:15:45,960 --> 00:15:50,960
And we have one syntax error, so far.

218
00:15:50,960 --> 00:16:02,960
And that's because we forgot to put the semi-colon terminator on each of our, each of the variables that we were introducing in the let.

219
00:16:02,960 --> 00:16:05,960
Okay. Got to save that.

220
00:16:05,960 --> 00:16:10,960
Let's try this again.

221
00:16:10,960 --> 00:16:13,960
And oops, I didn't actually manage to fix a syntax error.

222
00:16:13,960 --> 00:16:16,960
And that's because I put the semi-colon in the wrong place.

223
00:16:16,960 --> 00:16:24,960
Actually, I forgot the variables that are bound in a let are separated by, by commas.

224
00:16:24,960 --> 00:16:30,960
But the branches of the case have to be terminated by semi-colons.

225
00:16:30,960 --> 00:16:37,960
So what I said before was incorrect about using semi-colons to terminate let bindings.

226
00:16:37,960 --> 00:16:40,960
And we have to do some changes in this where we need it in this example.

227
00:16:40,960 --> 00:16:44,960
All right. Anyway, coming back to this, let's see if it compiles.

228
00:16:44,960 --> 00:16:47,960
And it does. And now let's run it.

229
00:16:47,960 --> 00:16:56,960
And it works. Now, of course, we have it actually exploited the ability to have different types of objects in the list.

230
00:16:56,960 --> 00:17:04,960
So let's do that. Let's add an integer in here.

231
00:17:04,960 --> 00:17:11,960
Type int and let's give it a number 42.

232
00:17:11,960 --> 00:17:21,960
And we can insert it in here.

233
00:17:21,960 --> 00:17:25,960
And now we can pass any object to a knit in the first position.

234
00:17:25,960 --> 00:17:31,960
So we'll just put in 42 right there.

235
00:17:31,960 --> 00:17:36,960
And when we compile and run this, it should print a low world 42.

236
00:17:36,960 --> 00:17:41,960
If everything goes as expected.

237
00:17:41,960 --> 00:17:45,960
And it does. And that concludes our little tour of cool.

238
00:17:45,960 --> 00:17:49,960
There are a few features that we haven't shown in these examples.

239
00:17:49,960 --> 00:18:04,960
And you can look in the examples directory for lots more programs, many more programs that will show you all the different ins and outs and details of the other language features, as well as the ones we've covered here.

