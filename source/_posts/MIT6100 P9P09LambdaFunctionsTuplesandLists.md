---
title: MIT6100 P9P09LambdaFunctionsTuplesandLists
---

1
00:00:00,000 --> 00:00:16,679
So today we're going to wrap up talking about functions by talking about these things called

2
00:00:16,679 --> 00:00:20,800
Lambda Functions as a way for us to create anonymous functions.

3
00:00:20,800 --> 00:00:27,679
And that will pretty much finish our exploration into creating functions.

4
00:00:27,679 --> 00:00:33,519
And the last part of the lecture we're going to introduce new object types, tuples and lists.

5
00:00:33,519 --> 00:00:38,240
So let's remember what we did last time.

6
00:00:38,240 --> 00:00:39,759
We ended with this example.

7
00:00:39,759 --> 00:00:42,000
We created a function.

8
00:00:42,000 --> 00:00:45,480
You guys wrote it for me and then we kind of wrote it and debugged it together.

9
00:00:45,480 --> 00:00:48,280
But we created this function called apply.

10
00:00:48,280 --> 00:00:55,159
So what was interesting about this function is that one of its parameters was a function

11
00:00:55,159 --> 00:00:57,280
and the other one was an integer.

12
00:00:57,280 --> 00:01:02,760
And that seemed a little strange at first, but not when we realized that functions in Python

13
00:01:02,760 --> 00:01:05,040
are actually just objects.

14
00:01:05,040 --> 00:01:09,920
And so they have a name, which means that anywhere where we use other kinds of objects,

15
00:01:09,920 --> 00:01:13,599
like integers, floats, we can use them as parameters to functions.

16
00:01:13,599 --> 00:01:19,079
We can use other functions as parameters to functions as well.

17
00:01:19,079 --> 00:01:25,359
So here criteria we had just used it as a variable name, assuming that the type of criteria

18
00:01:25,359 --> 00:01:26,959
is a function.

19
00:01:26,959 --> 00:01:33,159
According to this documentation, we assume that it takes in a number and returns a Boolean.

20
00:01:33,159 --> 00:01:37,079
So we just wrote the body of the function, assuming that that is true.

21
00:01:37,079 --> 00:01:42,280
So right here is where we used this function named criteria.

22
00:01:42,280 --> 00:01:44,280
We assumed that it takes in an integer.

23
00:01:44,280 --> 00:01:47,680
So we passed in the loop variable i as an integer.

24
00:01:47,680 --> 00:01:49,400
And we assumed it returns a Boolean.

25
00:01:49,400 --> 00:01:54,280
So we were able to use the return of criteria, parentheses i, just as a Boolean inside

26
00:01:54,280 --> 00:01:57,200
my, as my condition for this if statement.

27
00:01:57,200 --> 00:02:01,519
So hopefully you got a chance to look through this example from last lecture.

28
00:02:01,519 --> 00:02:05,599
So that's the definition of this function that takes in another function as a parameter.

29
00:02:05,599 --> 00:02:09,080
And then the way we use the function is down here.

30
00:02:09,080 --> 00:02:12,439
So apply is us making our function call.

31
00:02:12,439 --> 00:02:17,159
And then the first parameter is the name of a function and the second parameter is an integer.

32
00:02:17,159 --> 00:02:22,280
So the name of the function we're running is this object that we defined over here.

33
00:02:22,280 --> 00:02:24,120
Okay?

34
00:02:24,120 --> 00:02:27,039
Hopefully this is just review.

35
00:02:27,039 --> 00:02:33,680
Now what's interesting about this example is that this is even function is pretty simple.

36
00:02:33,680 --> 00:02:36,080
It's basically a one liner.

37
00:02:36,080 --> 00:02:39,680
It doesn't do any computations inside the function body.

38
00:02:39,680 --> 00:02:46,920
It basically just takes in a value, an input, and returns something.

39
00:02:46,920 --> 00:02:52,920
And so we didn't really need to create a function, a full-fledged function definition,

40
00:02:52,919 --> 00:02:55,559
just to do this really simple task.

41
00:02:55,559 --> 00:02:58,159
And in fact, that's what a Lambda function is.

42
00:02:58,159 --> 00:03:02,919
It's basically a way for us to create an anonymous function, a function that does something

43
00:03:02,919 --> 00:03:06,879
really simple, but we just don't give it a name.

44
00:03:06,879 --> 00:03:07,879
Okay?

45
00:03:07,879 --> 00:03:13,759
And so here is the function that we created with an actual definition up here.

46
00:03:13,759 --> 00:03:17,919
We can create an equivalent anonymous function that looks like this.

47
00:03:17,919 --> 00:03:22,839
So this is a much more concise way for us to create a really simple function that we

48
00:03:22,839 --> 00:03:25,280
only need to use one time.

49
00:03:25,280 --> 00:03:30,560
So here is, I'm going to just map out sort of one by one the important pieces of the Lambda

50
00:03:30,560 --> 00:03:31,799
function.

51
00:03:31,799 --> 00:03:38,239
So the Lambda keyword starts out the anonymous function and it tells Python that we're creating

52
00:03:38,239 --> 00:03:40,039
this anonymous function.

53
00:03:40,039 --> 00:03:41,959
So Lambda's not the name of the function.

54
00:03:41,959 --> 00:03:47,479
It just tells Python we're going to create this function in one line that is nameless.

55
00:03:47,479 --> 00:03:51,159
This is going to be any parameters that we expect this function to take.

56
00:03:51,159 --> 00:03:54,399
So if we have more than one, we just separate them with commas.

57
00:03:54,399 --> 00:03:56,199
Colon is again the same.

58
00:03:56,199 --> 00:04:01,839
And then the body of the function, if you can write it in one liner that's not too complicated,

59
00:04:01,839 --> 00:04:03,519
you can make a Lambda function out of it.

60
00:04:03,519 --> 00:04:07,879
So here, notice we don't actually have a return keyword when we're creating the Lambda

61
00:04:07,879 --> 00:04:08,879
function.

62
00:04:08,879 --> 00:04:13,599
We're just doing the operation that we wish to return the value from.

63
00:04:13,599 --> 00:04:14,599
Okay?

64
00:04:14,599 --> 00:04:20,319
So that's percent two equal to zero is basically the body of my Lambda function over here.

65
00:04:20,319 --> 00:04:24,879
So the key thing about Lambda functions is that it allows you to create a really quick function

66
00:04:24,879 --> 00:04:27,959
object that you basically want to use only one time.

67
00:04:27,959 --> 00:04:30,439
And so we're not giving it a name.

68
00:04:30,439 --> 00:04:32,279
So let's look at the code.

69
00:04:32,279 --> 00:04:36,199
So here is my apply function that we've seen before.

70
00:04:36,199 --> 00:04:37,399
Here is us.

71
00:04:37,399 --> 00:04:38,560
I showed you this last time.

72
00:04:38,560 --> 00:04:43,159
I created another definition for another simple function that takes in an integer and returns

73
00:04:43,159 --> 00:04:44,319
a Boolean.

74
00:04:44,319 --> 00:04:49,519
In this case, this function just tells me whether that input is equal to five.

75
00:04:49,519 --> 00:04:51,680
And this is kind of where we left off.

76
00:04:51,680 --> 00:04:55,800
Last time we ran apply with this is five function.

77
00:04:55,800 --> 00:04:59,159
So that prints apply with is five is one.

78
00:04:59,159 --> 00:05:07,000
There's only one integer between zero and ten where applying this returns true.

79
00:05:07,000 --> 00:05:10,800
Now with an anonymous function, just to show you how we would write a Lambda function for

80
00:05:10,800 --> 00:05:14,039
this is underscore five, it would look like this.

81
00:05:14,040 --> 00:05:16,760
So again, we tell Python we're creating an anonymous function.

82
00:05:16,760 --> 00:05:22,480
It has just the one input x, colon, null return, and just the body of the function is going

83
00:05:22,480 --> 00:05:27,600
to be the thing that we would like to return, x equal five.

84
00:05:27,600 --> 00:05:31,280
So again, this notice, we're not actually passing in the name.

85
00:05:31,280 --> 00:05:35,960
There is no name for this anonymous function, but it works in the exact same way as if we

86
00:05:35,960 --> 00:05:40,600
had created this function over here.

87
00:05:40,600 --> 00:05:45,760
And just to sort of bring that, and I can run it again, and you can see it apply with

88
00:05:45,760 --> 00:05:47,720
the function name is one, right?

89
00:05:47,720 --> 00:05:52,760
And obviously apply with this anonymous function also returns one.

90
00:05:52,760 --> 00:05:58,800
So just to bring the point home, I want to show you one other way to think of these anonymous

91
00:05:58,800 --> 00:06:00,040
functions.

92
00:06:00,040 --> 00:06:07,439
So here is me calling my is even function with a parameter eight.

93
00:06:07,439 --> 00:06:13,360
Now in order for me to actually run it, run this line here, I had to have the function

94
00:06:13,360 --> 00:06:15,519
definition way up here.

95
00:06:15,519 --> 00:06:19,439
But again, it's a really simple function if I only want to use it one time.

96
00:06:19,439 --> 00:06:22,160
I can create a Lambda function.

97
00:06:22,160 --> 00:06:31,240
And this over here is equivalent to this function definition and a function definition over

98
00:06:31,240 --> 00:06:36,600
here.

99
00:06:36,600 --> 00:06:39,200
So you can think of this line over here.

100
00:06:39,200 --> 00:06:44,200
So the part that I've highlighted as sort of creating the definition all in one line, not

101
00:06:44,200 --> 00:06:46,280
giving in a name.

102
00:06:46,280 --> 00:06:52,200
And then the parentheses here is us calling those lines of code for that function definition

103
00:06:52,200 --> 00:06:55,680
with that parameter eight.

104
00:06:55,680 --> 00:06:59,960
And so the usefulness of Lambda functions is when you want to create these really quick

105
00:06:59,960 --> 00:07:03,080
functions that you don't want to reuse.

106
00:07:03,079 --> 00:07:10,599
Obviously if we wanted to reuse the functionality of this is even, but we created it using a Lambda

107
00:07:10,599 --> 00:07:15,959
function, we would have to basically copy this line and paste it all over again.

108
00:07:15,959 --> 00:07:22,639
So we'd have to take this, copy it, paste it, and give it another input.

109
00:07:22,639 --> 00:07:27,599
Because this Lambda function does not actually create it in memory with a name.

110
00:07:27,600 --> 00:07:34,600
There's no way for us to access the body because it's nameless.

111
00:07:34,600 --> 00:07:36,760
Okay.

112
00:07:36,760 --> 00:07:44,800
So when we, so just to finish how we call Lambda functions, so basically when we called apply

113
00:07:44,800 --> 00:07:47,840
is even 10.

114
00:07:47,840 --> 00:07:54,439
The equivalent to calling that function name, but with a Lambda function is basically putting

115
00:07:54,439 --> 00:07:59,240
in the entire body of the Lambda function inside this other function call.

116
00:07:59,240 --> 00:08:08,920
So here we're both defining and then telling Python that this is my input to the function.

117
00:08:08,920 --> 00:08:09,920
Okay.

118
00:08:09,920 --> 00:08:15,079
So I know this is a U-triot, but I thought that we would actually run through it together

119
00:08:15,079 --> 00:08:18,879
step by step on the next few slides.

120
00:08:18,879 --> 00:08:20,959
So let's try to understand what this is doing.

121
00:08:20,959 --> 00:08:24,360
I've got a function definition named due twice.

122
00:08:24,360 --> 00:08:27,960
It takes in one input, another input.

123
00:08:27,960 --> 00:08:33,639
But if we look at the body here, this Fn, that's the input, is actually being called like

124
00:08:33,639 --> 00:08:36,759
a function inside the body.

125
00:08:36,759 --> 00:08:44,200
So we can immediately tell that Fn is going to be a function when we actually make the

126
00:08:44,200 --> 00:08:46,039
call to due twice.

127
00:08:46,039 --> 00:08:52,399
And indeed when we make the call to due twice down here, N is mapped to three and the

128
00:08:52,399 --> 00:08:59,720
second parameter Fn is mapped to this anonymous Lambda function.

129
00:08:59,720 --> 00:09:04,799
So let's step through a little by little in the same manner that we learned last lecture.

130
00:09:04,799 --> 00:09:10,399
So creating actual environments, whatever we see a function call, mapping parameters, actual

131
00:09:10,399 --> 00:09:17,159
parameters to formal parameters and following through on what exactly happens within each

132
00:09:17,159 --> 00:09:19,399
function body.

133
00:09:19,399 --> 00:09:24,039
So when we first make the function call, right, or sorry, when we first run this program,

134
00:09:24,039 --> 00:09:31,079
if it has these sort of three lines of code inside it, Python creates our global environment.

135
00:09:31,079 --> 00:09:35,279
Inside the environment, we've got one function definition here, so this is going to be this

136
00:09:35,279 --> 00:09:37,600
function object.

137
00:09:37,600 --> 00:09:44,519
And then I've got the thing that actually kicks off my function calls, my program.

138
00:09:44,519 --> 00:09:49,240
So I've got a print statement that will print the result of doing something.

139
00:09:49,240 --> 00:09:53,960
So the first thing I can see here is that I've got a function call to due twice, right?

140
00:09:53,960 --> 00:09:55,840
So I'm going left to right.

141
00:09:55,840 --> 00:10:01,200
The first thing I knew when I have a function call is I create a new environment.

142
00:10:01,200 --> 00:10:06,159
Inside this environment of due twice, I have to see what it takes in, what are its formal

143
00:10:06,159 --> 00:10:07,159
parameters?

144
00:10:07,159 --> 00:10:10,680
There's one called N and one called Fn.

145
00:10:10,680 --> 00:10:13,799
So there's one parameter N and the other one Fn.

146
00:10:13,799 --> 00:10:20,479
And now I basically map one by one the formal parameter to the actual parameter.

147
00:10:20,479 --> 00:10:24,599
So the N gets mapped to the three because that's the first parameter of due twice and

148
00:10:24,599 --> 00:10:28,879
the Fn gets mapped to this function object here, right?

149
00:10:28,879 --> 00:10:31,639
So the Fn gets mapped to this lambda function here.

150
00:10:31,639 --> 00:10:36,240
Okay, that's exactly what I said.

151
00:10:36,240 --> 00:10:38,039
So we've done the mapping.

152
00:10:38,039 --> 00:10:41,719
And now that we've done the mapping, we can do the body of due twice.

153
00:10:41,720 --> 00:10:50,279
So the body of due twice says return and then I have to replace everywhere I see Fn with

154
00:10:50,279 --> 00:10:57,879
this lambda function and everywhere I see N with this three.

155
00:10:57,879 --> 00:11:01,800
Well, Fn is going to be a function call, right?

156
00:11:01,800 --> 00:11:05,639
Whenever we see a function call, we need to create a function scope.

157
00:11:05,639 --> 00:11:11,680
So before I can do the return, before this due twice can terminate, can return its value,

158
00:11:11,679 --> 00:11:13,719
it sees a function call.

159
00:11:13,719 --> 00:11:16,799
So when there's a function call, we need to create another scope, right?

160
00:11:16,799 --> 00:11:19,679
Another environment.

161
00:11:19,679 --> 00:11:25,759
This environment belongs to the function call of lambda x colon x squared.

162
00:11:25,759 --> 00:11:26,519
Right?

163
00:11:26,519 --> 00:11:28,799
Now this function, of course, doesn't have a name.

164
00:11:28,799 --> 00:11:33,479
Normally I would say, you know, this is the F environment or this is the G environment or

165
00:11:33,479 --> 00:11:34,679
that is even environment.

166
00:11:34,679 --> 00:11:36,399
But there's no name for this one.

167
00:11:36,399 --> 00:11:39,599
So I'm just going to write up here the body of that function.

168
00:11:40,600 --> 00:11:41,399
All right.

169
00:11:41,399 --> 00:11:51,000
Well, in this function, again, following sort of the rules one by one, what we need to do is figure out what are the parameters of this function.

170
00:11:51,000 --> 00:11:54,000
Well, there's one called x.

171
00:11:54,000 --> 00:12:00,399
So here's my parameter x and then I need to figure out what does this map to?

172
00:12:00,399 --> 00:12:06,040
Well, what it maps to is the parameter inside it.

173
00:12:06,039 --> 00:12:11,599
But the parameter inside it is fn parentheses n.

174
00:12:11,599 --> 00:12:14,839
Do we have a return value for this yet?

175
00:12:14,839 --> 00:12:15,799
No, right?

176
00:12:15,799 --> 00:12:18,839
Because this is another function call.

177
00:12:18,839 --> 00:12:29,480
So what ends up happening is this environment gets put on hold as well because we can't figure out what parameter this lambda function takes in.

178
00:12:29,480 --> 00:12:31,079
What is its value?

179
00:12:31,080 --> 00:12:36,080
So we create another scope, another environment.

180
00:12:36,080 --> 00:12:46,280
And in this particular case, this one is going to belong to this inside bit here, fn parentheses n.

181
00:12:46,280 --> 00:12:52,759
So this lambda xx squared is going to be the exact same function again, being called again.

182
00:12:52,759 --> 00:12:57,320
And in this particular environment, we need to map x to its input.

183
00:12:57,320 --> 00:13:04,160
So the input to x, sorry, to this lambda xx squared is going to be n.

184
00:13:04,160 --> 00:13:08,600
Well, this environment doesn't know about n, so we pop up one level.

185
00:13:08,600 --> 00:13:11,080
This environment knows about n, it's three.

186
00:13:11,080 --> 00:13:18,640
So it passes that value along down to this lambda, lambda call.

187
00:13:18,640 --> 00:13:25,840
So now that this inner sort of highlight yellow over here knows what it needs to do.

188
00:13:25,840 --> 00:13:28,680
It needs to take in this x and return x squared.

189
00:13:28,680 --> 00:13:33,960
So it calculates 9 and then returns 9 to whoever called it.

190
00:13:33,960 --> 00:13:42,639
That 9 gets replaced now as the input to this outer fn.

191
00:13:42,639 --> 00:13:50,519
So just to show you exactly what gets replaced, that entire function call there gets replaced with 9.

192
00:13:50,519 --> 00:13:54,759
As soon as we've done the return, that environment goes away.

193
00:13:54,759 --> 00:14:00,039
And at this point, this call to lambda xx squared can terminate as well,

194
00:14:00,039 --> 00:14:05,399
because it takes in the number 9 and it returns 9 squared.

195
00:14:05,399 --> 00:14:07,519
So this one returns 81.

196
00:14:07,519 --> 00:14:11,960
So this entire function call is 81.

197
00:14:11,960 --> 00:14:15,240
And as soon as it returns, that environment goes away.

198
00:14:15,240 --> 00:14:20,559
And now do twice can finally finish its job and return 81.

199
00:14:20,559 --> 00:14:23,679
It just basically passes this value along back up.

200
00:14:23,679 --> 00:14:25,719
So that returns 81.

201
00:14:25,719 --> 00:14:29,759
So this entire do twice call is going to be 81.

202
00:14:29,759 --> 00:14:35,120
Why does lambda, why would there be two from again?

203
00:14:35,120 --> 00:14:40,039
There were two of them because this outer fn calls an inner fn.

204
00:14:40,039 --> 00:14:42,079
So we, yeah.

205
00:14:45,799 --> 00:14:49,399
OK, so that wraps up our discussion on functions.

206
00:14:49,399 --> 00:14:53,359
And there's a couple exercises in this, the Python file associate with this lecture,

207
00:14:53,360 --> 00:14:58,279
with lambda functions, just so you can give it a try with those.

208
00:14:58,279 --> 00:14:59,279
Yeah.

209
00:14:59,279 --> 00:15:00,279
Question.

210
00:15:00,279 --> 00:15:05,560
The lambda function is the use of a function, you can use that.

211
00:15:05,560 --> 00:15:08,000
Well, apply was just a function that I wrote.

212
00:15:08,000 --> 00:15:15,320
So in this new example, I was just printing the result of calling that function.

213
00:15:15,320 --> 00:15:17,480
Yeah.

214
00:15:17,480 --> 00:15:21,360
So again, this kind of trace of what happens throughout the program is really,

215
00:15:21,360 --> 00:15:22,159
really useful.

216
00:15:22,159 --> 00:15:28,079
So if you have some time to try to get that down, it will be very, very helpful as you trace

217
00:15:28,079 --> 00:15:31,399
through some programs.

218
00:15:31,399 --> 00:15:36,079
OK, so that ends our discussion on functions.

219
00:15:36,079 --> 00:15:40,639
And really, the only syntax we've introduced in the past couple lectures were just about

220
00:15:40,639 --> 00:15:44,079
how to wrap code we've already been using in a function.

221
00:15:44,079 --> 00:15:50,159
So not much new syntax, but today we're going to introduce some new syntax along with

222
00:15:50,159 --> 00:15:52,559
the introduction of two new data types.

223
00:15:52,559 --> 00:15:56,639
One is called a two-pole and the other one is called a list.

224
00:15:56,639 --> 00:15:59,240
So what are the data types we've seen so far?

225
00:15:59,240 --> 00:16:02,719
We've seen integers, floats, basically numbers.

226
00:16:02,719 --> 00:16:04,679
We've seen Booleans' truth values.

227
00:16:04,679 --> 00:16:08,799
We've seen this none type, type which has one value none.

228
00:16:08,799 --> 00:16:12,120
And we actually also saw the string data type, right?

229
00:16:12,120 --> 00:16:16,600
We could think of the string data type as sort of a compound data type, like a sequence

230
00:16:16,600 --> 00:16:18,639
of single characters.

231
00:16:18,639 --> 00:16:23,519
And in fact, we were using that string in that way because we were able to index into

232
00:16:23,519 --> 00:16:28,960
the string to grab the character at index zero, sort of slice the substring, right, to get

233
00:16:28,960 --> 00:16:31,360
the length of the string.

234
00:16:31,360 --> 00:16:33,919
Today we're going to introduce two more compound data types.

235
00:16:33,919 --> 00:16:36,919
So these things called two-poles and these things called lists.

236
00:16:36,919 --> 00:16:43,439
And throughout the lecture, you should really think about how it's very, very similar to

237
00:16:43,439 --> 00:16:46,919
the strings that we've already seen.

238
00:16:46,919 --> 00:16:53,919
So a lot of the operations, I'm actually going to skip aside from sort of the syntax of

239
00:16:53,919 --> 00:16:57,279
how we denote a two-pole or a list.

240
00:16:57,279 --> 00:17:01,079
Really the operations that we do with two-poles and lists are going to be exactly the same as

241
00:17:01,079 --> 00:17:03,120
the ones that we did with strings, right?

242
00:17:03,120 --> 00:17:07,519
So if you understand indexing and slicing and getting the length of the string, all that

243
00:17:07,519 --> 00:17:11,559
stuff, you'll understand how to do that for two-poles and lists.

244
00:17:11,559 --> 00:17:16,519
All right, so two-poles are indexable ordered sequences of objects.

245
00:17:16,519 --> 00:17:19,839
That's kind of a lot, so we can break that down.

246
00:17:19,839 --> 00:17:24,639
So first of all, it's a sequence of objects, just like a string was a sequence of single

247
00:17:24,639 --> 00:17:25,639
characters.

248
00:17:25,639 --> 00:17:32,799
A two-pole is going to be a sequence of not just characters, but any kind of object.

249
00:17:32,799 --> 00:17:36,639
Ordered sequence means that there will be an order to this sequence.

250
00:17:36,639 --> 00:17:40,839
So there's going to be an object at the first position in my two-pole, an object at the

251
00:17:40,839 --> 00:17:44,480
second position in my two-pole, and so on, just like there was a character at the first

252
00:17:44,480 --> 00:17:47,519
position, character at the second position, and so on.

253
00:17:47,519 --> 00:17:53,000
And indexable ordered sequence means that we can index into this object, so we can grab

254
00:17:53,000 --> 00:17:59,480
the element at index zero, grab the element index one, and so on and so on.

255
00:17:59,480 --> 00:18:03,160
So how do we create these two-poles?

256
00:18:03,160 --> 00:18:08,559
I should note that some people call them tuples because they're just kind of like an end-tuple

257
00:18:08,559 --> 00:18:12,519
kind of thing, so you can call them tuples or tuples however you'd like.

258
00:18:13,039 --> 00:18:17,400
All right, so how do we create these tuple objects?

259
00:18:17,400 --> 00:18:24,400
Well, we can create a tuple object that's empty using just open and closed parentheses.

260
00:18:24,400 --> 00:18:29,720
So we could create strings using just sort of the open and closed quotation marks.

261
00:18:29,720 --> 00:18:33,359
We create an empty tuple by doing open and closed parentheses.

262
00:18:33,359 --> 00:18:36,279
Now this is different than functions, right?

263
00:18:36,279 --> 00:18:39,839
This is a little bit similar, or might be a bit confusing because we use parentheses

264
00:18:39,919 --> 00:18:44,720
to make function calls, but notice it's just the parentheses by themselves, right?

265
00:18:44,720 --> 00:18:48,399
There's no function name, nothing preceding the parentheses.

266
00:18:48,399 --> 00:18:53,519
So to Python, it's not going to be confusing when you just do this.

267
00:18:53,519 --> 00:18:59,519
You can create a tuple with one element in it by putting open, closed parentheses that

268
00:18:59,519 --> 00:19:04,599
element that you want to add to your tuple and then a comma right after it.

269
00:19:04,599 --> 00:19:11,599
Now the comma is there to differentiate a tuple with one element from sort of using parentheses

270
00:19:15,319 --> 00:19:18,279
as precedents over an operation.

271
00:19:18,279 --> 00:19:25,119
So just as an example, if I create a is equal to five like this, right, I'm using parentheses

272
00:19:25,119 --> 00:19:30,480
around an integer, but the type of a is still an integer.

273
00:19:30,480 --> 00:19:36,799
I'm basically just using the parentheses to say I want to do this five before doing

274
00:19:36,799 --> 00:19:42,519
anything else, which is a little strange to do, and the value of a is five.

275
00:19:42,519 --> 00:19:49,839
But if I do b is equal to the tuple for comma, this tells Python that this is now a sequence

276
00:19:49,839 --> 00:19:53,720
of objects, but there's just one object in my sequence.

277
00:19:53,720 --> 00:20:01,120
So the type of b is a tuple, not an integer.

278
00:20:01,120 --> 00:20:05,759
And if I say ask what b is, you can see it's for comma in parentheses.

279
00:20:05,759 --> 00:20:10,920
So it's a tuple with one object in it.

280
00:20:10,920 --> 00:20:18,620
Okay, so to create a tuple with many objects in it, we basically put in parentheses all

281
00:20:18,620 --> 00:20:22,000
the objects I want to add in my tuple separated by commas.

282
00:20:22,000 --> 00:20:27,759
So here I've got my first element in my tuple integer two, second element in the tuple

283
00:20:27,759 --> 00:20:32,440
the string of my t, and the third element in my tuple being the integer three.

284
00:20:32,440 --> 00:20:37,839
And notice we can mix and match now objects of different types within my tuple object.

285
00:20:37,839 --> 00:20:41,319
So here I've got integers and strings and integers.

286
00:20:41,319 --> 00:20:45,960
I can even add floats and booleans and whatever object types I'd like, I can make them elements

287
00:20:45,960 --> 00:20:51,480
to my tuple, which is pretty cool, right, different than strings in that respect, but still,

288
00:20:51,480 --> 00:20:55,519
you know, in order within my tuple.

289
00:20:55,519 --> 00:21:00,799
And so the rest of this is actually operations that we've already seen on strings.

290
00:21:00,799 --> 00:21:03,759
So I'm not going to go through them in too much detail.

291
00:21:03,759 --> 00:21:09,000
We can use the square bracket to index into the tuple, so to grab the element at a particular

292
00:21:09,000 --> 00:21:12,519
index, again indexing starts from zero.

293
00:21:12,519 --> 00:21:18,200
We can use a plus operator to concatenate two tuples together to create one larger tuple

294
00:21:18,200 --> 00:21:21,640
with all those elements in a row.

295
00:21:21,640 --> 00:21:24,440
We can slice down here.

296
00:21:24,440 --> 00:21:28,640
We can get the length of the tuple, which tells us how many elements are in it, so three

297
00:21:28,640 --> 00:21:30,400
elements.

298
00:21:30,400 --> 00:21:37,160
We can use the max, min, sum, things like that to grab the maximum element and minimum

299
00:21:37,160 --> 00:21:40,880
element, sum all the elements of my tuple and things like that.

300
00:21:40,880 --> 00:21:45,080
Notice that here I've got parentheses for the max function call.

301
00:21:45,079 --> 00:21:50,480
And then another set of parentheses here to denote that I have one tuple object I'd like

302
00:21:50,480 --> 00:21:55,000
to grab the max of.

303
00:21:55,000 --> 00:21:59,480
And then the last bit here is something that we're going to see that's different with lists

304
00:21:59,480 --> 00:22:02,279
in the next lecture, not today.

305
00:22:02,279 --> 00:22:07,639
But basically, you might think that once you create this tuple object in memory, right,

306
00:22:07,639 --> 00:22:13,319
that has two MIT-3 as its three elements in it, you can go into memory and modify one of

307
00:22:13,319 --> 00:22:14,319
the elements, right?

308
00:22:14,319 --> 00:22:17,519
Like if I don't want the middle one to be a string and want it to be a common integer,

309
00:22:17,519 --> 00:22:20,919
you might think that you should be able to change it.

310
00:22:20,919 --> 00:22:26,319
You can with lists, as we'll see in the next lecture, but you cannot do this with tuples.

311
00:22:26,319 --> 00:22:32,559
Just like once we created sort of an integer five inside memory, we can't go into memory

312
00:22:32,559 --> 00:22:35,639
and tell Python to change this five to a six.

313
00:22:35,639 --> 00:22:37,000
It's just not allowed.

314
00:22:37,000 --> 00:22:40,879
Or once we created a string, a, b, c, and memory, you can't go into memory and change

315
00:22:40,879 --> 00:22:42,359
this string.

316
00:22:42,359 --> 00:22:46,919
You can certainly create new objects that are based on this string, but you can't go

317
00:22:46,919 --> 00:22:49,959
in and modify that object once it's created.

318
00:22:49,959 --> 00:22:56,559
So once you've made your sequence of tuples, you cannot go in and change it.

319
00:22:56,559 --> 00:22:57,559
So yeah.

320
00:22:57,559 --> 00:23:05,479
If you just rewrote like t equals and then it goes into different, it would be like, there.

321
00:23:05,479 --> 00:23:07,879
If you wrote t equals and then something different.

322
00:23:07,879 --> 00:23:10,159
So you can't want if I want to say.

323
00:23:10,159 --> 00:23:11,639
Yeah, that's a good question.

324
00:23:11,640 --> 00:23:19,360
So the variable t, so the name t, and the object it's bound to are two different things.

325
00:23:19,360 --> 00:23:22,400
So the object it's bound to will still sit in memory.

326
00:23:22,400 --> 00:23:24,280
We're just going to lose the binding from it.

327
00:23:24,280 --> 00:23:27,040
So that t initially points to this one.

328
00:23:27,040 --> 00:23:31,160
But then if you say t equals something else later on, this one still stays there, but

329
00:23:31,160 --> 00:23:34,520
that t is going to point to this new thing.

330
00:23:34,520 --> 00:23:36,840
So the object itself is still in memory.

331
00:23:36,840 --> 00:23:38,640
We've just lost the binding to it.

332
00:23:38,640 --> 00:23:42,480
And that's something we did sort of way back in the first early lectures where we kind

333
00:23:42,480 --> 00:23:43,840
of rebound variables.

334
00:23:43,840 --> 00:23:44,840
Yeah.

335
00:23:44,840 --> 00:23:50,960
So it's the same idea.

336
00:23:50,960 --> 00:23:55,880
One interesting thing that we can do now with tuples that we couldn't with strings is

337
00:23:55,880 --> 00:24:01,080
to have elements of a tuple be another tuple.

338
00:24:01,080 --> 00:24:03,360
And that's what this example is going to show.

339
00:24:03,360 --> 00:24:07,120
So here I've got an integer two as my first element.

340
00:24:07,119 --> 00:24:11,359
My second element is the string A. My third element is my integer four.

341
00:24:11,359 --> 00:24:17,079
And my fourth element is a tuple object that just happens to have two elements inside

342
00:24:17,079 --> 00:24:19,479
it.

343
00:24:19,479 --> 00:24:28,239
But this tuple object that I'm referencing by a CQ, C, only has four elements in it.

344
00:24:28,239 --> 00:24:31,559
It just so happens that the last one is a tuple.

345
00:24:31,559 --> 00:24:36,679
But I'm not going to dive further down to figure out if I have tuples that have sub tuples,

346
00:24:36,680 --> 00:24:38,600
and so on.

347
00:24:38,600 --> 00:24:43,440
Only top level I care about how many elements I have.

348
00:24:43,440 --> 00:24:46,680
And so when I print the length of seek, it's going to be four, right?

349
00:24:46,680 --> 00:24:48,560
Because I have one, two, three.

350
00:24:48,560 --> 00:24:53,039
And then this last object is just one object that takes up one slot.

351
00:24:53,039 --> 00:24:57,600
It happens to have elements within it.

352
00:24:57,600 --> 00:25:02,360
And so the rest of these are basically what we've seen with strings except for this one

353
00:25:02,359 --> 00:25:03,719
here.

354
00:25:03,719 --> 00:25:11,079
If we were to index into the last element here of seek, 1, 2, well, this is another tuple,

355
00:25:11,079 --> 00:25:12,079
right?

356
00:25:12,079 --> 00:25:18,279
So it should follow that I can then take that tuple and further index into it.

357
00:25:18,279 --> 00:25:22,439
And so that's what this line here is doing.

358
00:25:22,439 --> 00:25:24,679
When we read an expression, we go left to right.

359
00:25:24,679 --> 00:25:29,679
So basically seek at index three grabs for me the 1, 2.

360
00:25:29,680 --> 00:25:36,200
And then if I further index into 1, 2 at index zero, I'm going to grab the number one.

361
00:25:36,200 --> 00:25:37,200
All right.

362
00:25:37,200 --> 00:25:45,240
So I'm basically chaining all these indices indexing operations together.

363
00:25:45,240 --> 00:25:49,680
And then this is again very similar to what we've seen from strings.

364
00:25:49,680 --> 00:25:53,400
So it's just slicing instead of indexing into the into the tuple.

365
00:25:53,400 --> 00:25:56,519
I'm not going to go through it today.

366
00:25:56,519 --> 00:26:02,039
But I encourage you to type them in and type in some other things as you might have done

367
00:26:02,039 --> 00:26:04,839
with the strings.

368
00:26:04,839 --> 00:26:11,839
One thing that I do want to mention is that we can iterate over a tuple just like we could

369
00:26:11,839 --> 00:26:13,879
iterate over a string.

370
00:26:13,879 --> 00:26:18,160
I don't mean over indices, but I mean over the elements directly.

371
00:26:18,160 --> 00:26:24,839
So when we iterate it over a string directly, we were able to grab in our loop variable the

372
00:26:24,839 --> 00:26:28,159
characters at each index.

373
00:26:28,159 --> 00:26:33,399
Similarly, we can iterate over a tuple to grab the elements at each index directly.

374
00:26:33,399 --> 00:26:41,559
So here, I've got four e in seek is going to make my loop variable e take on each element

375
00:26:41,559 --> 00:26:43,879
of the tuple directly.

376
00:26:43,879 --> 00:26:45,679
Not the index, but each element.

377
00:26:45,679 --> 00:26:49,480
So as I'm looping through, e will first have a value two.

378
00:26:49,480 --> 00:26:51,159
Then it'll have a value a.

379
00:26:51,159 --> 00:26:52,799
Then it'll have a value four.

380
00:26:52,799 --> 00:26:55,919
And lastly, it'll have this value one comma two.

381
00:26:55,919 --> 00:27:04,799
So if I just print that out directly, you'll see these values printed out.

382
00:27:04,799 --> 00:27:09,440
So very, very similar to some of the operations we've done with strings, the only differences

383
00:27:09,440 --> 00:27:15,159
we just now have to be careful that our tuples can have elements that are other tuples

384
00:27:15,159 --> 00:27:19,359
or basically any object in Python.

385
00:27:19,359 --> 00:27:21,480
So what do we use tuples for?

386
00:27:21,480 --> 00:27:28,000
Well, there was this one example we did way back at the beginning of this 600L, where we

387
00:27:28,000 --> 00:27:29,640
tried to swap variables.

388
00:27:29,640 --> 00:27:34,599
And we basically said that this way did it work because we overwrote the variable.

389
00:27:34,599 --> 00:27:38,640
We overwrote the variable and then we weren't able to get back to the value that was over

390
00:27:38,640 --> 00:27:39,720
it.

391
00:27:39,720 --> 00:27:45,279
So our solution was to create this temporary variable to save the value before we overwrote

392
00:27:45,279 --> 00:27:51,319
it, then overwrite the variable, and then use the temporary variable to grab that saved

393
00:27:51,319 --> 00:27:52,839
value.

394
00:27:52,839 --> 00:27:57,879
Well it turns out tuples actually allow us to do these three lines of code in one line

395
00:27:57,879 --> 00:28:00,240
of code here.

396
00:28:00,240 --> 00:28:05,839
So we can say x comma y equals y comma x.

397
00:28:05,839 --> 00:28:11,359
So this is an assignment and it's allowed because the left hand side is basically a set

398
00:28:11,359 --> 00:28:16,000
of variables in sequence.

399
00:28:16,000 --> 00:28:21,200
And the right hand side gets evaluated first as we would an assignment statement.

400
00:28:21,200 --> 00:28:26,160
So y gets the value 2 because that's what it is up here and x gets the value 1.

401
00:28:26,160 --> 00:28:29,759
So y is 2x is 1 over here on the right hand side.

402
00:28:29,759 --> 00:28:34,960
And then Python 1 at a time matches the values on the right to the values on the left,

403
00:28:34,960 --> 00:28:36,840
separated by commas.

404
00:28:36,840 --> 00:28:42,279
So basically what we have here is x is equal to 2, y is equal to 1, and then the values

405
00:28:42,279 --> 00:28:47,120
have been rebounded.

406
00:28:47,119 --> 00:28:53,919
So very, very, very useful, very good use of tuples here.

407
00:28:53,919 --> 00:28:58,959
Now this idea can actually be taken one step further.

408
00:28:58,959 --> 00:29:05,279
And we can use tuples to return more than one value from a function.

409
00:29:05,279 --> 00:29:12,439
Now I know in the past couple lectures I said basically you can't return more than one

410
00:29:12,439 --> 00:29:14,599
thing from a function.

411
00:29:14,599 --> 00:29:16,399
The function returns only one thing.

412
00:29:16,400 --> 00:29:21,160
As soon as it sees a return statement, it takes the value associated with that return

413
00:29:21,160 --> 00:29:25,080
and returns it back to whoever called it.

414
00:29:25,080 --> 00:29:28,080
But tuples are one object.

415
00:29:28,080 --> 00:29:32,920
They just so happen to have elements that can have different values, right?

416
00:29:32,920 --> 00:29:34,680
You can have a tuple with 10 elements in it.

417
00:29:34,680 --> 00:29:38,080
You can have a tuple with two elements in it.

418
00:29:38,080 --> 00:29:43,680
Using a tuple we can actually return one object, the tuple itself.

419
00:29:43,680 --> 00:29:49,519
It just so happens to have a whole bunch of values that my function might calculate.

420
00:29:49,519 --> 00:29:55,360
And so by way of the tuple, I'm actually able to return a whole bunch of different values

421
00:29:55,360 --> 00:29:57,400
through this one object tuple.

422
00:29:57,400 --> 00:30:01,640
And so in this particular example I have a function that calculates the quotient and

423
00:30:01,640 --> 00:30:06,840
the remainder when x is divided by y.

424
00:30:06,839 --> 00:30:14,159
So the function itself takes in, uses integer division to find the quotient and uses the

425
00:30:14,159 --> 00:30:16,919
remainder operator to find the remainder.

426
00:30:16,919 --> 00:30:20,679
And then it returns that q calculation, right?

427
00:30:20,679 --> 00:30:25,559
Some number and that r calculation, another number, as elements to a tuple.

428
00:30:25,559 --> 00:30:34,199
And Python returns this one tuple object using this line here, returning this object.

429
00:30:34,200 --> 00:30:40,400
And so when I make this function call to quotient and remainder 10 comma 3, it's going to go

430
00:30:40,400 --> 00:30:44,600
in, it's going to calculate the quotient to be 3, the remainder to be 1.

431
00:30:44,600 --> 00:30:48,680
And it's going to return one object, 3 comma 1.

432
00:30:48,680 --> 00:30:53,279
And then that gets assigned to this variable, both, that I named both in this particular

433
00:30:53,279 --> 00:30:57,160
case.

434
00:30:57,160 --> 00:31:01,960
If I wanted to access the quotient part of both, I would do both square bracket 0 and

435
00:31:01,960 --> 00:31:06,559
the remainder part of both would be both square bracket 1, accessing the 0th element and

436
00:31:06,559 --> 00:31:09,200
the first element of the return.

437
00:31:09,200 --> 00:31:14,960
Now if I wanted to explicitly save the quotient and remainder as variables after they got

438
00:31:14,960 --> 00:31:20,120
returned, I can actually do the trick we saw in the previous slide, right?

439
00:31:20,120 --> 00:31:24,799
The trick we saw in the previous slide was x comma y equals some other tuple.

440
00:31:24,799 --> 00:31:26,519
Well that's what I'm doing here.

441
00:31:26,519 --> 00:31:30,160
I'm making a function called a quotient and remainder 5 comma 2.

442
00:31:30,160 --> 00:31:33,279
That's going to return 2 comma 1.

443
00:31:33,279 --> 00:31:38,120
And then I'm going to have quote comma rem equals 2 comma 1.

444
00:31:38,120 --> 00:31:44,720
So Python 1 at a time is going to map the quote to 2 and the rem to 1.

445
00:31:44,720 --> 00:31:51,000
And so what that means for us in terms of the code is we can then do whatever we'd like

446
00:31:51,000 --> 00:31:53,240
in the remaining part of the code.

447
00:31:53,240 --> 00:31:57,200
Code assuming that quote and rem are just regular variables.

448
00:31:57,200 --> 00:32:01,640
So here I'm just showing that you can print them out in these print statements, right?

449
00:32:01,640 --> 00:32:13,319
So here I have quotient is 2 and remainder is 1 as these two lines of code here.

450
00:32:13,319 --> 00:32:14,319
Okay.

451
00:32:14,319 --> 00:32:21,600
So the big idea of tuples, the reason why we use them is you can use them to return more

452
00:32:21,599 --> 00:32:27,559
than one value via this one tuple object from a function.

453
00:32:27,559 --> 00:32:32,159
And so in this way we can have a function that does a whole bunch of calculations returns

454
00:32:32,159 --> 00:32:37,679
this one object that might contain all of these different values as the elements to this

455
00:32:37,679 --> 00:32:40,319
tuple object.

456
00:32:40,319 --> 00:32:44,199
So let's have you work on this for a couple minutes.

457
00:32:44,199 --> 00:32:46,159
Write a function that meets the specification.

458
00:32:46,159 --> 00:32:48,359
So I've got it's called char counts.

459
00:32:48,359 --> 00:32:53,559
I've got an input that is a string s lower case characters assume it's just got vowels

460
00:32:53,559 --> 00:32:55,519
and consonants.

461
00:32:55,519 --> 00:32:59,319
Return for me a tuple where the first element in the tuple is how many vowels are in

462
00:32:59,319 --> 00:33:03,679
s and the second element of the tuple is how many consonants are in s.

463
00:33:03,679 --> 00:33:08,679
So should be pretty straightforward a hint I have here if you don't remember that will

464
00:33:08,679 --> 00:33:14,719
make your life easier is try to remember how to check if a character is in a string.

465
00:33:14,720 --> 00:33:21,920
So using the special in keyword right we saw an example of this probably back when we

466
00:33:21,920 --> 00:33:27,039
learned about strings.

467
00:33:27,039 --> 00:33:36,160
So you can try to write your code around line 65 ish and then we can write it together.

468
00:33:36,160 --> 00:33:39,799
All right so how would you approach this problem?

469
00:33:39,799 --> 00:33:46,799
So what's the first step here?

470
00:33:46,799 --> 00:33:53,440
Yep we can make a string that contains all the vowels.

471
00:33:53,440 --> 00:34:03,159
Vowels equals a IOU and lower case because nice.

472
00:34:03,159 --> 00:34:05,159
Next.

473
00:34:05,160 --> 00:34:06,160
Yep.

474
00:34:06,160 --> 00:34:22,159
If the car is in that list then we could like have the mirror work contract like plus equals

475
00:34:22,159 --> 00:34:30,720
plus equals one and else we know it's not a vowel so we'll keep a consonants count plus

476
00:34:30,720 --> 00:34:32,519
equals one.

477
00:34:32,519 --> 00:34:41,960
So this is the consonant count and this is the vowels count.

478
00:34:41,960 --> 00:34:49,320
What is char in this case though?

479
00:34:49,320 --> 00:34:54,599
Yeah exactly we have to loop so four char in s.

480
00:34:54,599 --> 00:35:00,360
So we need to look at every character inside s and this is where now that we're dealing

481
00:35:00,360 --> 00:35:07,360
with things that are just that might be non integers in my four loops we can write little

482
00:35:07,360 --> 00:35:15,000
notes for ourselves that's something like char is a then b then c or something like that

483
00:35:15,000 --> 00:35:22,680
to remind us that char is not sort of the index but it's an actual thing.

484
00:35:22,679 --> 00:35:32,119
And then what else we need to do?

485
00:35:32,119 --> 00:35:37,519
Yeah we can initiate c and v zero we can use the trick where you do c comma v equals zero

486
00:35:37,519 --> 00:35:43,719
comma zero or we can just do it on separate lines all good.

487
00:35:43,719 --> 00:35:49,000
And then lastly this does the work for us but the function needs to have something to

488
00:35:49,000 --> 00:35:50,679
show for it.

489
00:35:51,679 --> 00:35:57,679
Yeah after the loop we'll return the tuple c comma v.

490
00:35:57,679 --> 00:36:03,559
Sorry v comma c probably.

491
00:36:03,559 --> 00:36:11,000
And if we run it it matches what we expected so one three and zero five and you can imagine

492
00:36:11,000 --> 00:36:15,879
adding a couple more test cases maybe something with an empty string that should return zero

493
00:36:15,880 --> 00:36:22,880
zero and maybe something with all vowels which should return some number comma zero.

494
00:36:22,880 --> 00:36:32,760
Okay so one other thing we can do with with tuples is to create these functions that take

495
00:36:32,760 --> 00:36:36,840
a variable number of arguments is in as a parameter.

496
00:36:36,840 --> 00:36:41,360
So remember when we define functions we basically tell Python how many parameter we expect

497
00:36:41,360 --> 00:36:43,440
it to take right.

498
00:36:43,440 --> 00:36:48,840
But it's possible to have some functions for example max or min that can take in two

499
00:36:48,840 --> 00:36:55,039
parameters here and notice there's no extra parentheses or we can just add as many numbers

500
00:36:55,039 --> 00:37:00,400
as we'd like and it will still work to take the max of all of these sets of numbers.

501
00:37:00,400 --> 00:37:07,480
And again we didn't make this inner thing a tuple although it works even with the tuple

502
00:37:07,480 --> 00:37:09,119
as an object.

503
00:37:09,119 --> 00:37:14,239
But our goal here is to try to write a function that can take in a variable number of arguments

504
00:37:14,239 --> 00:37:19,880
right either two or three or ten or twenty and it should still work.

505
00:37:19,880 --> 00:37:25,519
And the way we do that is using a parameter that's defined using the star notation.

506
00:37:25,519 --> 00:37:32,239
So as soon as you create a function and its parameter is star and then the name of your input

507
00:37:32,239 --> 00:37:37,559
Python basically takes that input and assigns it to a tuple behind the scenes.

508
00:37:37,559 --> 00:37:39,920
So you don't have to.

509
00:37:39,920 --> 00:37:44,400
And so in this particular case we're not using not writing our own max or min or some.

510
00:37:44,400 --> 00:37:51,719
We're writing our own mean function and this mean function will take in a variable number

511
00:37:51,719 --> 00:37:56,920
of arguments right and it's going to figure out the mean of all of these values.

512
00:37:56,920 --> 00:37:59,400
The way it does that is pretty simple.

513
00:37:59,400 --> 00:38:05,840
Now that we know that we can just treat args as a tuple of a bunch of numbers.

514
00:38:05,840 --> 00:38:09,559
So we just loop through all of the elements in args.

515
00:38:09,559 --> 00:38:15,120
We add up this running total and at the end we return the total divided by how many arguments

516
00:38:15,120 --> 00:38:16,120
were given.

517
00:38:16,120 --> 00:38:19,559
So return total divided by the length of the args.

518
00:38:19,559 --> 00:38:24,160
And then when we make a function call to the function we just wrote mean here args will

519
00:38:24,160 --> 00:38:33,400
take in sorry args will become a tuple that's all of the parameters inside there.

520
00:38:33,400 --> 00:38:38,440
And so here's that example which means that we can use our function to get the mean

521
00:38:38,440 --> 00:38:42,119
of 1, 2, 3, 4, 5, 6.

522
00:38:42,119 --> 00:38:46,559
But we can use the exact same function to get the mean of 609 for example.

523
00:38:46,559 --> 00:38:51,599
So first case I have six parameters as my input but in the second case I've got only three

524
00:38:51,599 --> 00:38:53,559
parameters as my input.

525
00:38:53,559 --> 00:39:00,840
And that little star in my arguments allows me to do this.

526
00:39:00,840 --> 00:39:06,519
Now I did write a version of this mean for you guys down here where I'm assuming that

527
00:39:06,519 --> 00:39:10,559
mean doesn't have the star.

528
00:39:10,559 --> 00:39:13,640
So assuming that args is a tuple itself.

529
00:39:13,640 --> 00:39:19,120
And in that case you would have to call the mean function by explicitly passing in only

530
00:39:19,120 --> 00:39:21,960
one argument that is a tuple.

531
00:39:21,960 --> 00:39:26,240
So this extra set of parentheses makes my argument the tuple.

532
00:39:26,239 --> 00:39:32,599
So you take a closer look at that if you're interested.

533
00:39:32,599 --> 00:39:40,000
So I want to introduce lists today and a lot of the slides here are basically copy and

534
00:39:40,000 --> 00:39:43,000
paste from the tuple slides.

535
00:39:43,000 --> 00:39:49,579
The only difference in these slides that I have regarding lists is the way we define a

536
00:39:49,579 --> 00:39:50,579
list.

537
00:39:50,579 --> 00:39:56,179
So in terms of defining a list or defining a tuple we were using parentheses.

538
00:39:56,179 --> 00:40:00,059
But to define a list we use open closed square brackets.

539
00:40:00,059 --> 00:40:06,739
But otherwise a lot of the operations are exactly the same as tuples and as strings.

540
00:40:06,739 --> 00:40:11,579
We're not going to look at what it means for lists to be mutable this lecture but next

541
00:40:11,579 --> 00:40:14,739
lecture will be all about mutability.

542
00:40:14,739 --> 00:40:19,340
But today I just want to give you a sense of what a list is.

543
00:40:19,340 --> 00:40:23,620
So as I said this is copying and paste from the tuple slide.

544
00:40:23,620 --> 00:40:27,620
When I create a list I just use open and closed square brackets.

545
00:40:27,620 --> 00:40:31,660
This creates a list for me with no elements within it.

546
00:40:31,660 --> 00:40:35,539
Creating a list with one element in it doesn't need that extra comma because there's no

547
00:40:35,539 --> 00:40:40,340
confusion with operation precedence with square brackets.

548
00:40:40,340 --> 00:40:42,220
So there's no need for that.

549
00:40:42,220 --> 00:40:46,660
But otherwise everything else here is exactly the same as with tuples.

550
00:40:46,659 --> 00:40:50,980
We're just using square brackets instead of parentheses.

551
00:40:50,980 --> 00:40:54,899
So remember strings and tuples it's the same.

552
00:40:54,899 --> 00:40:59,039
What I do want to mention and talk a little bit about now that we've introduced tuples

553
00:40:59,039 --> 00:41:05,899
and lists is the idea of having our loops iterate over elements of tuples and lists directly.

554
00:41:05,899 --> 00:41:10,099
And I'm going to basically write these slides in the context of lists but the exact same

555
00:41:10,099 --> 00:41:13,659
thing is applicable to tuples as well.

556
00:41:13,659 --> 00:41:20,179
So here is an example of us wanting to find the sum of the elements in a list.

557
00:41:20,179 --> 00:41:23,779
The code on the left is a little bit hard to parse.

558
00:41:23,779 --> 00:41:30,420
We've got loop variable going through range length n and then I have to keep my running

559
00:41:30,420 --> 00:41:36,179
total but I have to index into the list at that index here and it's really hard to tell

560
00:41:36,179 --> 00:41:38,940
what's going on at a quick glance.

561
00:41:38,940 --> 00:41:44,220
And so luckily for us, the way that we were able to iterate over string characters directly,

562
00:41:44,220 --> 00:41:48,179
we can iterate over tuple and list elements directly.

563
00:41:48,179 --> 00:41:54,659
So the right hand side here is code that does exactly the same thing as the one on the

564
00:41:54,659 --> 00:42:00,980
left except that our loop variable i in this particular case will take on the values of

565
00:42:00,980 --> 00:42:06,260
my list directly.

566
00:42:06,260 --> 00:42:11,980
And so if we take that code, yes, I guess we call this version more Pythonic because it's

567
00:42:11,980 --> 00:42:13,780
a lot easier to read.

568
00:42:13,780 --> 00:42:20,940
So if we take that code and wrap it around a function to make this piece of code be something

569
00:42:20,940 --> 00:42:26,340
that we can reuse in a whole bunch of places to grab the sum of all the elements of a list,

570
00:42:26,340 --> 00:42:27,420
we can do that.

571
00:42:27,420 --> 00:42:30,700
So here I've taken the code that does the work.

572
00:42:30,700 --> 00:42:32,700
I've plopped it inside this function.

573
00:42:32,700 --> 00:42:34,100
I've named list sum.

574
00:42:34,099 --> 00:42:40,219
I've taken a list as a parameter and instead of printing the total, I'm returning the total.

575
00:42:40,219 --> 00:42:43,579
So very useful function now.

576
00:42:43,579 --> 00:42:50,259
This loop variable i will take on the values 8, then 3, then 5 if that's the list I called

577
00:42:50,259 --> 00:42:52,460
this function with.

578
00:42:52,460 --> 00:42:57,900
So a lot nicer than iterating over the index and then indexing into the list with the

579
00:42:57,900 --> 00:43:01,619
square brackets at that index.

580
00:43:01,619 --> 00:43:06,539
What I do want to mention is something when you're writing code and this is something

581
00:43:06,539 --> 00:43:11,619
that I used to do when I first started out, is to write a little comment for yourself

582
00:43:11,619 --> 00:43:13,339
right underneath the for loop.

583
00:43:13,339 --> 00:43:19,819
Now I know it's a little tedious but it does help you keep track of, especially if now

584
00:43:19,819 --> 00:43:24,339
that we're iterating over tuples or over lists or over string elements directly or even

585
00:43:24,339 --> 00:43:28,980
over the indices, it helps you keep track of what this loop variable is value is going

586
00:43:28,980 --> 00:43:29,980
to be.

587
00:43:29,980 --> 00:43:32,019
And then you don't have to keep track of it in your mind.

588
00:43:32,019 --> 00:43:35,699
It's on paper and you can use your mind to keep track of other things.

589
00:43:35,699 --> 00:43:39,500
So if you just write a little comment for yourself there, it helps you debug along the

590
00:43:39,500 --> 00:43:42,139
way.

591
00:43:42,139 --> 00:43:49,420
So once we iterate over list elements directly, it makes code that we write really easy

592
00:43:49,420 --> 00:43:50,420
to read.

593
00:43:50,420 --> 00:43:55,460
So here the code on the left is going to iterate over the elements directly and get the running

594
00:43:55,460 --> 00:43:56,820
total.

595
00:43:56,820 --> 00:44:00,580
So we can make a really small change to the input list.

596
00:44:00,580 --> 00:44:09,180
Let's say our input list no longer takes in just numbers but it can take in strings.

597
00:44:09,180 --> 00:44:14,940
We can make one small change to our loop body.

598
00:44:14,940 --> 00:44:20,820
Our loop variable still iterates over all the elements in the list L. And then if we write

599
00:44:20,820 --> 00:44:26,140
the note for ourselves that S is going to be AB then D, F then G.

600
00:44:26,139 --> 00:44:32,779
If we wanted to write code that grabbed the sum of all of the lengths of the list, the

601
00:44:32,779 --> 00:44:38,420
total plus equals E on the left hand side becomes total plus equal length of S on the right

602
00:44:38,420 --> 00:44:39,819
hand side.

603
00:44:39,819 --> 00:44:46,019
So length of S, one at a time, will take on the value 2 because AB has length 2 and then

604
00:44:46,019 --> 00:44:51,859
3 because D, F has length 3 and then 1 because G has length 1.

605
00:44:51,860 --> 00:44:56,539
So the code looks very similar but they have different functionalities depending on what

606
00:44:56,539 --> 00:45:03,059
we want to do.

607
00:45:03,059 --> 00:45:09,099
We don't have time to go through this you try it but definitely try it on your own at home.

608
00:45:09,099 --> 00:45:13,620
It's very useful plus a whole bunch of other functions that I've put in this Python file

609
00:45:13,620 --> 00:45:16,260
for you to get a lot of experience with tuples endless.

