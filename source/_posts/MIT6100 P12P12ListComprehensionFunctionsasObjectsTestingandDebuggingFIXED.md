---
title: MIT6100 P12P12ListComprehensionFunctionsasObjectsTestingandDebuggingFIXED
---

1
00:00:00,000 --> 00:00:21,980
Okay, let's get started with today's lecture.

2
00:00:21,980 --> 00:00:26,879
It's going to be more of a chill lecture than what we've done in the past, even though

3
00:00:26,879 --> 00:00:31,519
we've got quite a few things to cover as you can see from this title slide.

4
00:00:31,519 --> 00:00:35,640
I'm not going to go super duper fast, so please feel free to ask lots of questions.

5
00:00:35,640 --> 00:00:39,119
And then the second half of the lecture will be really chill because we're going to be

6
00:00:39,119 --> 00:00:42,320
talking about testing and debugging strategies.

7
00:00:42,320 --> 00:00:45,519
So super high level topic.

8
00:00:45,519 --> 00:00:52,159
But first, we're going to tie up some loose ends related to lists and relating to functions.

9
00:00:52,159 --> 00:00:55,519
So we're not going to introduce a lot of new syntax.

10
00:00:55,519 --> 00:01:00,280
These ideas are sort of more optional in your day to day coding, but they're just really,

11
00:01:00,280 --> 00:01:02,239
really nice to know.

12
00:01:02,239 --> 00:01:08,519
So let's first start talking about this idea of a list comprehension.

13
00:01:08,519 --> 00:01:13,239
So you've been writing functions that deal with lists.

14
00:01:13,239 --> 00:01:18,719
And one really common pattern that I hope you've seen so far is the following.

15
00:01:18,719 --> 00:01:23,359
So this code right here shows something that we've definitely coded together, and you've

16
00:01:23,359 --> 00:01:27,359
definitely coded in the finger exercises and the quizzes.

17
00:01:27,359 --> 00:01:29,159
And so it is a really common pattern.

18
00:01:29,159 --> 00:01:34,960
So the idea here is you have a function that creates a new list where the elements of this

19
00:01:34,960 --> 00:01:38,400
new list are a function of the input list.

20
00:01:38,400 --> 00:01:43,759
So the pattern here is we create a new empty list inside the function.

21
00:01:43,760 --> 00:01:47,160
We have a loop over every element in the input.

22
00:01:47,160 --> 00:01:50,719
And to each one of these elements in the input, we apply the same function.

23
00:01:50,719 --> 00:01:55,080
So in this particular case, we're taking that element and squaring it.

24
00:01:55,080 --> 00:02:00,320
And each one of these elements were appending to this new list, originally empty, until

25
00:02:00,320 --> 00:02:05,200
we've reached, we've done this function to every element in L, and then we return this

26
00:02:05,200 --> 00:02:08,000
newly created list.

27
00:02:08,000 --> 00:02:13,960
So since this is a really common thing that programmers do, Python allows you to do this

28
00:02:13,960 --> 00:02:18,840
exact functionality with one line of code.

29
00:02:18,840 --> 00:02:23,240
And the way we do this is using something called a list comprehension.

30
00:02:23,240 --> 00:02:27,719
So the way that we do a list comprehension, essentially taking these four lines of code

31
00:02:27,719 --> 00:02:34,240
from this function, we are going to write them in this one line of code that looks something

32
00:02:34,240 --> 00:02:35,840
like this.

33
00:02:35,840 --> 00:02:41,479
So the idea here is with this one line of code, we're going to create a new list.

34
00:02:41,479 --> 00:02:46,480
We're going to have an iterator that goes through some sort of sequence of values, and

35
00:02:46,480 --> 00:02:51,120
we're going to apply the same function to every one of those elements.

36
00:02:51,120 --> 00:02:55,960
And the other optional piece that we can add inside this list comprehension is to only

37
00:02:55,960 --> 00:02:59,560
apply that function if some condition holds.

38
00:02:59,560 --> 00:03:05,800
So let's look at this example and see how we can convert this.

39
00:03:05,800 --> 00:03:11,680
This, these four lines of code to one line of list comprehension code.

40
00:03:11,680 --> 00:03:16,600
So we've got creating a new empty list.

41
00:03:16,600 --> 00:03:23,240
This is going to tell Python to create a new empty list for us.

42
00:03:23,240 --> 00:03:25,960
So just open and close square brackets.

43
00:03:25,960 --> 00:03:31,840
And within these open and close square brackets, we're going to write a one liner expression.

44
00:03:31,840 --> 00:03:38,240
And this one liner is going to encapsulate these two lines of code here.

45
00:03:38,240 --> 00:03:44,120
So the expression, sorry, the function we're going to apply to every element in L is

46
00:03:44,120 --> 00:03:46,640
going to be taking that element and squaring it.

47
00:03:46,640 --> 00:03:51,840
So on the right hand side here in the list comprehension, we've got some e squared.

48
00:03:51,840 --> 00:03:53,280
Well, what is e?

49
00:03:53,280 --> 00:03:57,640
Well, it's going to be every element, e in L.

50
00:03:57,639 --> 00:04:02,799
So if we read this in English, we basically say L news going to contain elements e squared

51
00:04:02,799 --> 00:04:10,000
for e in L. So it sounds weird, but it kind of makes sense even if we read it in English.

52
00:04:10,000 --> 00:04:16,479
And behind the scenes, Python will take one by one, each element in L, square it.

53
00:04:16,479 --> 00:04:22,599
And that's the sequence of elements it will populate this L new with.

54
00:04:22,599 --> 00:04:23,839
Okay.

55
00:04:23,839 --> 00:04:25,919
Now what if we add a condition to that?

56
00:04:25,920 --> 00:04:32,879
So let's say we want to create this new list of elements only for even elements.

57
00:04:32,879 --> 00:04:38,000
So we only want to square the even elements within my original list L.

58
00:04:38,000 --> 00:04:42,759
Well, if we were to write a function that does that, we have to add this extra condition

59
00:04:42,759 --> 00:04:43,759
here.

60
00:04:43,759 --> 00:04:48,000
So everything else is the same except for this if e percent 2 equal to 0.

61
00:04:48,000 --> 00:04:54,960
This tells Python to only grab elements that are even, right, divisible by 2.

62
00:04:54,959 --> 00:04:57,879
So how do we write this in list comprehension form?

63
00:04:57,879 --> 00:04:59,599
So here's a new list.

64
00:04:59,599 --> 00:05:03,000
And this is the function to apply only if the test is true.

65
00:05:03,000 --> 00:05:06,599
In list comprehension, this is my new list.

66
00:05:06,599 --> 00:05:10,359
I've got the for loop is over here.

67
00:05:10,359 --> 00:05:17,240
And then the test to apply is at the end here, if e percent 2 equal equal 0.

68
00:05:17,240 --> 00:05:18,879
And then what is the function we're applying?

69
00:05:18,879 --> 00:05:21,000
It's just e squared like before.

70
00:05:21,000 --> 00:05:28,000
So the test just gets appended to the end of this list comprehension expression here.

71
00:05:28,000 --> 00:05:29,000
Yeah.

72
00:05:29,000 --> 00:05:35,319
Does it run faster?

73
00:05:35,319 --> 00:05:36,720
I'm not sure actually.

74
00:05:36,720 --> 00:05:41,000
It might run marginally faster but probably not significantly.

75
00:05:41,000 --> 00:05:46,560
The reason to do this is because as you get more practice with it, this will be easier

76
00:05:46,560 --> 00:05:49,000
to read in code.

77
00:05:49,000 --> 00:05:53,879
And often if you see a large chunk like this, your eyes will glaze over.

78
00:05:53,879 --> 00:05:56,120
You're not going to want to read a chunk like that.

79
00:05:56,120 --> 00:06:01,920
But if you see it all in one line, you're going to think, well, how bad can it be?

80
00:06:01,920 --> 00:06:06,800
And so you can come up with really complicated list comprehension expressions.

81
00:06:06,800 --> 00:06:13,120
But usually we reserve them for really simple, really quick ways to create these lists that

82
00:06:13,120 --> 00:06:16,720
you just populate with some values right off the bat.

83
00:06:16,720 --> 00:06:21,720
So it just makes the code a lot easier to read.

84
00:06:21,720 --> 00:06:22,720
OK.

85
00:06:22,720 --> 00:06:25,880
So list comprehension are pretty useful.

86
00:06:25,880 --> 00:06:29,400
If you get a little bit of practice with them, you'll find yourself kind of using them all

87
00:06:29,400 --> 00:06:31,360
over the place.

88
00:06:31,360 --> 00:06:35,480
And they basically replace code that looks like this.

89
00:06:35,480 --> 00:06:43,560
So these lines of code is a very generic way of writing this one liner list comprehension.

90
00:06:43,560 --> 00:06:47,519
So here I've got a function f that I would like to apply.

91
00:06:47,519 --> 00:06:53,720
This xpr expression is the function I would like to apply to each element.

92
00:06:53,720 --> 00:06:57,240
This is the list I would like to apply that function to.

93
00:06:57,240 --> 00:07:00,639
And the test is going to be the conditional.

94
00:07:00,639 --> 00:07:05,680
In this particular case, this test means I apply it to every single element.

95
00:07:05,680 --> 00:07:10,399
But you can imagine having a function which in the previous case, we would say lambda

96
00:07:10,399 --> 00:07:14,319
x, x%, 2, equals 0 as our conditional.

97
00:07:14,319 --> 00:07:19,919
And then the function that we're essentially replacing is this with list comprehension.

98
00:07:19,919 --> 00:07:20,919
We create this new list.

99
00:07:20,919 --> 00:07:24,560
Again, this is the pattern that we saw in the previous slide.

100
00:07:24,560 --> 00:07:29,979
We loop through every element in the list if that condition holds a pin that function

101
00:07:29,979 --> 00:07:31,919
applied to each element.

102
00:07:31,919 --> 00:07:34,679
And then at the end, return the list.

103
00:07:34,679 --> 00:07:39,479
So this is just a very generic way to write a list comprehension.

104
00:07:39,480 --> 00:07:41,319
So let's look at some concrete examples.

105
00:07:41,319 --> 00:07:49,400
So here, I'm not applying the function e squared to a particular set of elements from a list.

106
00:07:49,400 --> 00:07:53,439
I'm applying it to the sequence of values given by range.

107
00:07:53,439 --> 00:07:56,800
Remember when we were talking about four loops iterating through things?

108
00:07:56,800 --> 00:08:04,280
They can iterate through integers following some pattern, like range 6, 1, 9, 2, something

109
00:08:04,280 --> 00:08:05,280
like that.

110
00:08:05,279 --> 00:08:10,319
As long as you have a sequence of values you can iterate over, you can plop that into

111
00:08:10,319 --> 00:08:12,039
this list comprehension.

112
00:08:12,039 --> 00:08:13,439
So you could iterate over lists.

113
00:08:13,439 --> 00:08:15,039
You could iterate over tuples.

114
00:08:15,039 --> 00:08:18,399
You could iterate over these direct ranges.

115
00:08:18,399 --> 00:08:20,919
You could iterate over range of the length of a list.

116
00:08:20,919 --> 00:08:26,959
Whatever creates an iterable for you, you can put that in the list comprehension.

117
00:08:26,959 --> 00:08:31,639
So in this particular case, the way I read this is I've got something that I'm squaring.

118
00:08:31,639 --> 00:08:33,799
And what's the thing that I'm squaring?

119
00:08:33,799 --> 00:08:36,679
It's going to be each value in range 6.

120
00:08:36,679 --> 00:08:40,799
So I think about it like what is the sequence of values that I'm going to operate on?

121
00:08:40,799 --> 00:08:44,399
Well, it's going to be the number 0, 1, 2, 3, 4, 5.

122
00:08:44,399 --> 00:08:48,240
And the thing that I'm going to do to them is square each one of those values.

123
00:08:48,240 --> 00:08:55,080
So the end list that I get out of this one liner here is a list containing 0 squared, 1 squared,

124
00:08:55,080 --> 00:08:59,480
2 squared, 3 squared, 4 squared, and 5 squared.

125
00:08:59,480 --> 00:09:00,960
We can add a condition to that.

126
00:09:00,960 --> 00:09:09,519
So here I've got the each element squared for e and range 8, only if e is even.

127
00:09:09,519 --> 00:09:13,639
So then, the way I think about it is, let's start off with what every element in the range

128
00:09:13,639 --> 00:09:14,639
is.

129
00:09:14,639 --> 00:09:17,000
Well, it's 0, 1, 2, 3, 4, 5, 6, 7.

130
00:09:17,000 --> 00:09:19,720
The condition I'm applying to that is that it's even.

131
00:09:19,720 --> 00:09:26,160
So the numbers I'm going to end up with, I'm filtering all those to only contain 0, 2,

132
00:09:26,160 --> 00:09:30,519
4, and 6, because we go up to but not including it.

133
00:09:30,519 --> 00:09:32,759
And then I'm going to square every one of those.

134
00:09:32,759 --> 00:09:37,199
So the end result from this list comprehension is a list containing the element, 0 squared,

135
00:09:37,199 --> 00:09:43,159
2 squared, 4 squared, and 6 squared.

136
00:09:43,159 --> 00:09:49,199
And lastly, we've been doing just single integers in the resulting list.

137
00:09:49,199 --> 00:09:52,679
But as I mentioned, we can do more complicated things.

138
00:09:52,679 --> 00:09:57,759
So as long as we can write a little expression here for the thing that we'd like to calculate

139
00:09:57,759 --> 00:10:00,480
or add to the list, we can put it in the list.

140
00:10:00,480 --> 00:10:02,080
So this is a list comprehension.

141
00:10:02,080 --> 00:10:07,560
So in this particular case, the element that I'm adding to my list comprehension, or my

142
00:10:07,560 --> 00:10:11,800
resulting list from the list comprehension, is a list itself.

143
00:10:11,800 --> 00:10:16,560
So each element in my resulting list is another list.

144
00:10:16,560 --> 00:10:21,000
And that inner list is going to contain two elements every time.

145
00:10:21,000 --> 00:10:27,680
The thing I'm actually iterating over, and it's square.

146
00:10:27,679 --> 00:10:33,000
And I've got a condition here, so I've got the elements 0, 1, 2, and 3.

147
00:10:33,000 --> 00:10:34,719
That's the range.

148
00:10:34,719 --> 00:10:38,279
But I'm only grabbing the odd ones in this particular case.

149
00:10:38,279 --> 00:10:46,679
So the resulting set of numbers that I'm going to apply this to is going to be the number

150
00:10:46,679 --> 00:10:50,159
is the numbers 1 and 3.

151
00:10:50,159 --> 00:10:53,759
Because those are the two odd numbers in range 4.

152
00:10:53,759 --> 00:10:57,919
And so the resulting list is going to contain two elements.

153
00:10:57,919 --> 00:11:01,759
So this outer square bracket is the list that I've created.

154
00:11:01,759 --> 00:11:08,159
And its elements will be the element that I have actually iterated over, and it's square

155
00:11:08,159 --> 00:11:09,840
as a list.

156
00:11:09,840 --> 00:11:15,279
So 1 and 1 squared for e and e squared when e is 1.

157
00:11:15,279 --> 00:11:19,799
And then 3 and 9, 3 squared when e is 3.

158
00:11:19,799 --> 00:11:27,639
Questions about that?

159
00:11:27,639 --> 00:11:28,879
So pretty cool.

160
00:11:28,879 --> 00:11:31,439
It's a really nice way to create lists really quickly.

161
00:11:31,439 --> 00:11:37,599
If you wanted to create a list full of 0's, full of 100 zeros, no need to do a loop.

162
00:11:37,599 --> 00:11:45,359
You basically do a list comprehension that says square brackets 0, 4, e, and range 101.

163
00:11:45,360 --> 00:11:51,120
And then you've got yourself a nice list full of 100 zeros.

164
00:11:51,120 --> 00:11:53,120
All right, so think about this.

165
00:11:53,120 --> 00:11:55,919
And then tell me what the answer is.

166
00:11:55,919 --> 00:12:00,320
So the idea here is we have this list comprehension.

167
00:12:00,320 --> 00:12:03,240
And just go through it step by step.

168
00:12:03,240 --> 00:12:05,080
It looks a little bit intimidating.

169
00:12:05,080 --> 00:12:09,960
But the first step is to look at the for loop and ask yourself, what are the values I'm iterating

170
00:12:09,960 --> 00:12:11,200
over?

171
00:12:11,200 --> 00:12:14,120
Then look at the condition if there is one.

172
00:12:14,120 --> 00:12:14,840
There is one.

173
00:12:14,840 --> 00:12:16,240
In this case, it's at the end here.

174
00:12:16,240 --> 00:12:21,440
So now what subsets of those original things you're iterating over are you actually keeping?

175
00:12:21,440 --> 00:12:25,440
And then from those things that you're keeping, what function are you applying?

176
00:12:25,440 --> 00:12:28,400
It's the one right at the beginning.

177
00:12:28,400 --> 00:12:32,320
So think about it, and then I'll ask you to tell me.

178
00:12:32,320 --> 00:12:38,440
So step one, what are the values I'm iterating over?

179
00:12:38,440 --> 00:12:42,960
So the full values, not including the condition.

180
00:12:42,960 --> 00:12:46,520
Someone yell it out.

181
00:12:46,520 --> 00:12:47,800
Yeah, that list in the middle.

182
00:12:47,800 --> 00:12:48,400
Awesome.

183
00:12:48,400 --> 00:12:54,200
OK, so x, y, abcd, right?

184
00:12:54,200 --> 00:12:56,680
And then seven.

185
00:12:56,680 --> 00:12:58,080
And then what's the last thing?

186
00:12:58,080 --> 00:13:01,240
Is it the number 4.0 or a string?

187
00:13:01,240 --> 00:13:03,080
Yeah, exactly 4.0.

188
00:13:03,080 --> 00:13:05,360
OK, string, string.

189
00:13:05,360 --> 00:13:08,360
Step two, from this list, what are the values

190
00:13:08,360 --> 00:13:13,840
that I'm actually keeping based on the condition?

191
00:13:13,840 --> 00:13:14,919
If they're a string.

192
00:13:14,919 --> 00:13:15,759
Which one's a string?

193
00:13:15,759 --> 00:13:17,200
Is x, y?

194
00:13:17,200 --> 00:13:18,080
Yes.

195
00:13:18,080 --> 00:13:19,919
Is abcd?

196
00:13:19,919 --> 00:13:21,240
Yeah.

197
00:13:21,240 --> 00:13:22,680
Is seven?

198
00:13:22,680 --> 00:13:23,000
Nope.

199
00:13:23,000 --> 00:13:24,919
Is 4.0?

200
00:13:24,919 --> 00:13:26,240
Yes, exactly.

201
00:13:26,240 --> 00:13:30,080
OK, so then these are the elements that I'm keeping.

202
00:13:30,080 --> 00:13:33,879
And now what's the function I'm applying and what's the result going to be?

203
00:13:33,879 --> 00:13:38,200
It's going to be a list containing.

204
00:13:38,200 --> 00:13:46,440
Yeah, 3, 2, 4, 3, 2, because that's length 2, 4, because that's length 4, and 3, because

205
00:13:46,440 --> 00:13:48,320
that's length 3.

206
00:13:48,320 --> 00:13:49,080
Great.

207
00:13:49,080 --> 00:13:54,879
And we've got ourselves a nice little list based on that condition, that sequence of values,

208
00:13:54,879 --> 00:13:55,879
and that function applied.

209
00:13:55,879 --> 00:13:56,640
Yeah.

210
00:13:56,640 --> 00:14:00,920
Why does it return a list?

211
00:14:00,920 --> 00:14:01,920
The whole thing?

212
00:14:01,920 --> 00:14:06,520
Or I guess I thought it was returned like 2, 4, 3, and 7 applied.

213
00:14:06,520 --> 00:14:07,520
Oh, yeah.

214
00:14:07,519 --> 00:14:09,559
We're not printing things out here.

215
00:14:09,559 --> 00:14:14,000
When we're writing this as a list comprehension, we're essentially telling Python to create

216
00:14:14,000 --> 00:14:16,039
this resulting list of values.

217
00:14:16,039 --> 00:14:18,000
That's just what a list comprehension does.

218
00:14:18,000 --> 00:14:22,279
And so just kind of this expression here with these outer square brackets around our

219
00:14:22,279 --> 00:14:26,559
entire expression tells Python that the resulting thing is a list.

220
00:14:26,559 --> 00:14:30,360
Yeah, this is a good question.

221
00:14:30,360 --> 00:14:32,360
Other questions?

222
00:14:32,360 --> 00:14:34,360
OK.

223
00:14:34,360 --> 00:14:35,360
OK.

224
00:14:35,360 --> 00:14:36,360
OK.

225
00:14:36,360 --> 00:14:37,919
So that, oh, yeah, question.

226
00:14:37,919 --> 00:14:42,600
Does it support multiple conditions?

227
00:14:42,600 --> 00:14:43,600
Yes.

228
00:14:43,600 --> 00:14:51,560
So at the end here, you would say if, and then you could wrap them in parentheses.

229
00:14:51,560 --> 00:14:56,279
I don't know if you have to, but just to be safe, I would wrap my conditions in parentheses.

230
00:14:56,279 --> 00:15:01,159
And you'd use and or whatever you want to combine the conditions with.

231
00:15:01,159 --> 00:15:02,159
There's a question?

232
00:15:02,159 --> 00:15:03,159
Yeah?

233
00:15:03,159 --> 00:15:08,159
This one?

234
00:15:08,159 --> 00:15:11,159
The lambda?

235
00:15:11,159 --> 00:15:13,799
Here, this is a lambda function that we talked about.

236
00:15:13,799 --> 00:15:16,679
I forget when a couple lectures ago.

237
00:15:16,679 --> 00:15:22,679
It's basically an anonymous function, and all it does is return true all the time.

238
00:15:22,679 --> 00:15:31,199
So the test will always be true, which means that when we do if test parentheses E, this

239
00:15:31,200 --> 00:15:34,160
will always be true in this particular case.

240
00:15:34,160 --> 00:15:38,200
But we've given a different lambda function that might not be the case.

241
00:15:38,200 --> 00:15:40,200
OK.

242
00:15:40,200 --> 00:15:42,120
So let's move on to the next topic.

243
00:15:42,120 --> 00:15:45,360
The next, I guess, two topics will be dealing with functions.

244
00:15:45,360 --> 00:15:49,920
And I want to wrap up a couple things here just to give you a couple more ideas regarding

245
00:15:49,920 --> 00:15:50,920
functions.

246
00:15:50,920 --> 00:15:56,000
So the first one is actually related to this last question is the idea of a default parameter.

247
00:15:56,000 --> 00:16:02,519
So this is going to be a way for us to add parameters to our functions that get some

248
00:16:02,519 --> 00:16:04,080
default value.

249
00:16:04,080 --> 00:16:08,279
And that's what that lambda thing actually was in that example.

250
00:16:08,279 --> 00:16:11,799
But hopefully this piece of the lecture makes that a little bit more clear.

251
00:16:11,799 --> 00:16:17,000
And then the second part regarding functions we're going to go over is the idea of functions

252
00:16:17,000 --> 00:16:19,360
as objects kind of working up on that.

253
00:16:19,360 --> 00:16:25,120
And we're going to see what happens when we return a function object from another function.

254
00:16:25,120 --> 00:16:28,960
We've seen functions as parameters to other functions, but we're going to see what happens

255
00:16:28,960 --> 00:16:33,200
when you make a function be the return value of another function.

256
00:16:33,200 --> 00:16:34,480
But that's in a little bit.

257
00:16:34,480 --> 00:16:38,120
For now, let's look at default parameters.

258
00:16:38,120 --> 00:16:39,120
OK.

259
00:16:39,120 --> 00:16:42,960
We've seen this code before.

260
00:16:42,960 --> 00:16:44,279
Triggering flashbacks.

261
00:16:44,279 --> 00:16:46,279
So this is by section root.

262
00:16:46,279 --> 00:16:50,600
I'll go over it just to remind ourselves what it does.

263
00:16:50,600 --> 00:16:54,040
We've got this code inside this function.

264
00:16:54,040 --> 00:16:56,440
We wrote a long, long time ago.

265
00:16:56,440 --> 00:17:01,120
And then we decided to wrap it in a function so that it's a really nicely useful piece of

266
00:17:01,120 --> 00:17:03,960
code that we can run many, many times.

267
00:17:03,960 --> 00:17:06,839
So the parameter to this function was x.

268
00:17:06,839 --> 00:17:11,559
A value we'd like to approximate the square root of.

269
00:17:11,559 --> 00:17:18,200
And the code we're using to approximate is using the bisection search algorithm, which

270
00:17:18,200 --> 00:17:25,960
initializes some variables, namely epsilon, how close we want to be to the final answer,

271
00:17:25,960 --> 00:17:27,240
low and high end points.

272
00:17:27,240 --> 00:17:28,680
We remember that.

273
00:17:28,680 --> 00:17:32,559
And then initial guess, the halfway between low and high.

274
00:17:32,559 --> 00:17:40,480
And then we keep making guesses between low and high, being the midpoint of low and high,

275
00:17:40,480 --> 00:17:48,839
as long as we're not close enough to the final answer.

276
00:17:48,839 --> 00:17:53,400
So we're going to either, it reinitialize, our low end point or our high end point, depending

277
00:17:53,400 --> 00:17:57,039
on whether that guess was too low or too high.

278
00:17:57,039 --> 00:18:02,279
And then within the loop we make another guess using those changed values of either low

279
00:18:02,279 --> 00:18:05,079
or high, based on if or else.

280
00:18:05,079 --> 00:18:10,160
And then we keep doing this process of making more guesses at the halfway point as long

281
00:18:10,160 --> 00:18:14,480
as we're still farther than epsilon away.

282
00:18:14,480 --> 00:18:18,480
Okay, that was a recap of what we've done so far.

283
00:18:18,480 --> 00:18:23,080
The interesting thing that we had done with this function was, or when we turned it into

284
00:18:23,080 --> 00:18:26,360
a function was to return our approximation.

285
00:18:26,360 --> 00:18:31,400
So this guess, instead of just printing it to the user, we returned it so that it could

286
00:18:31,400 --> 00:18:34,519
be useful in other parts of the code.

287
00:18:34,519 --> 00:18:39,039
And so when we called the function, we just said name a function and then some value of

288
00:18:39,039 --> 00:18:40,639
x.

289
00:18:40,639 --> 00:18:41,639
Okay.

290
00:18:41,639 --> 00:18:48,680
Now, there are situations where a user would want to change the value of epsilon, right?

291
00:18:48,680 --> 00:18:53,160
Right now, with the way we wrote this code, epsilon is set to 0.01.

292
00:18:53,160 --> 00:18:57,920
And whenever you run the function, it always finds the approximation to the square root of

293
00:18:57,920 --> 00:19:01,799
x to that precision, 0.01.

294
00:19:01,799 --> 00:19:06,960
Now sometimes, depending on the application, the user might want an even better approximation,

295
00:19:06,960 --> 00:19:12,519
so 0.00001, or they might not care to be as precise and they want, you know, maybe

296
00:19:12,519 --> 00:19:17,720
approximated to 1 or 0.5 or something much bigger than 0.01.

297
00:19:17,720 --> 00:19:22,359
So what are the options in this particular case, right, for these scenarios?

298
00:19:22,359 --> 00:19:27,240
One option would be obviously to go inside our function and say, well, I'm going to change

299
00:19:27,240 --> 00:19:31,920
epsilon to be something super duper precise, 0.00001.

300
00:19:31,920 --> 00:19:38,000
And so people who call this function will always get an approximation to that precision.

301
00:19:38,000 --> 00:19:41,839
But what about people who don't want it that precise, right?

302
00:19:41,839 --> 00:19:46,240
So all the function calls are going to be affected by making that change.

303
00:19:46,240 --> 00:19:47,759
And so that's not really desirable.

304
00:19:47,759 --> 00:19:51,759
We'd like to let the person who makes the function call be in charge of what precision they'd

305
00:19:51,759 --> 00:19:53,240
like.

306
00:19:53,240 --> 00:19:56,160
Our option is to put epsilon outside the function.

307
00:19:56,160 --> 00:20:01,799
So to say, okay, well, the only parameter is going to be x.

308
00:20:01,799 --> 00:20:04,279
And let's not set epsilon within the function.

309
00:20:04,279 --> 00:20:07,880
Let's let the user maybe set epsilon outside the function.

310
00:20:07,880 --> 00:20:13,960
And then our code will basically pop up one level to the global scope and use the epsilon

311
00:20:13,960 --> 00:20:16,559
that the user chose.

312
00:20:16,559 --> 00:20:23,279
So it's not a good idea because as soon as we allow somebody using our code to kind of

313
00:20:23,279 --> 00:20:28,919
make their own variables within our code, we're putting our trust in somebody else's hands.

314
00:20:28,919 --> 00:20:35,319
And they might forget to reset epsilon or they might forget to set it to begin with.

315
00:20:35,319 --> 00:20:39,079
And so that's just using global variables is not a good idea in the first place.

316
00:20:39,079 --> 00:20:45,200
We'd like to keep control of the epsilon that's being used inside our function.

317
00:20:45,200 --> 00:20:49,559
So unsurprisingly, the last option is going to be our best option.

318
00:20:49,559 --> 00:20:54,759
Let's just add epsilon as another parameter to the function.

319
00:20:54,759 --> 00:20:56,519
So there it is.

320
00:20:56,519 --> 00:21:01,160
We've got a bisection route, again, as a function.

321
00:21:01,160 --> 00:21:08,720
We've got a parameter x and we have epsilon as a second parameter that the user can call

322
00:21:08,720 --> 00:21:11,200
the function with.

323
00:21:11,200 --> 00:21:16,519
So other than that, the function body is exactly the same, right?

324
00:21:16,519 --> 00:21:17,799
Except that right now.

325
00:21:17,799 --> 00:21:23,600
When we make a function call, we have to pass in epsilon as the second parameter.

326
00:21:23,600 --> 00:21:30,920
So in terms of code, this is the bisection route with epsilon as a parameter.

327
00:21:30,920 --> 00:21:36,440
And so now the user can find the approximation to 123 to 0.1.

328
00:21:36,440 --> 00:21:37,440
It's 11.088.

329
00:21:37,440 --> 00:21:39,920
Okay, so you're wondering.

330
00:21:39,920 --> 00:21:49,320
And then the approximation to 123 to 0.0001, which is 11.095.

331
00:21:49,320 --> 00:21:56,680
So much better, the user can now be in charge of deciding how close they'd like the approximation

332
00:21:56,680 --> 00:21:59,880
to be for every one of their values.

333
00:21:59,880 --> 00:22:05,000
But notice that this code is kind of verbose.

334
00:22:05,000 --> 00:22:10,880
And really most of the time, maybe the users don't want to be in charge of setting the

335
00:22:10,880 --> 00:22:11,880
epsilon.

336
00:22:11,880 --> 00:22:15,279
Maybe they don't know what a good epsilon might be, right?

337
00:22:15,279 --> 00:22:18,640
So how do they know that they should choose 0.0 by default?

338
00:22:18,640 --> 00:22:22,200
Maybe that's something you could put in the function specification for anyone using your

339
00:22:22,200 --> 00:22:24,000
function.

340
00:22:24,000 --> 00:22:29,000
But it's, you know, you're going to rely on users reading your specification.

341
00:22:29,000 --> 00:22:31,839
And that's a little bit scary.

342
00:22:31,839 --> 00:22:38,199
So instead, the functionality that would really like to have is to say, okay, I want to write

343
00:22:38,199 --> 00:22:42,159
a function that does take into parameters.

344
00:22:42,159 --> 00:22:47,599
But by default, one of those parameters is something that I set as the person who's

345
00:22:47,599 --> 00:22:50,039
writing this function.

346
00:22:50,039 --> 00:22:55,919
So what I would really like to have is epsilon to have some sort of a default value.

347
00:22:55,920 --> 00:23:01,880
So if users don't know what to call it with, that code will just use that default value.

348
00:23:01,880 --> 00:23:06,960
And otherwise, if the user is more experienced and they know they'd like an epsilon of, you

349
00:23:06,960 --> 00:23:11,560
know, one times 10 to the negative 10 or whatever it might be, then they can be in charge of setting

350
00:23:11,560 --> 00:23:12,560
it.

351
00:23:12,560 --> 00:23:18,200
So most of the time, we want to call the bisection function without an epsilon parameter,

352
00:23:18,200 --> 00:23:20,200
so that it may use a default one.

353
00:23:20,200 --> 00:23:25,440
But sometimes we'd like to allow the user to actually set the epsilon.

354
00:23:25,440 --> 00:23:30,240
So to that end, we're introducing the idea of keyword parameters, also known as default

355
00:23:30,240 --> 00:23:31,920
parameters.

356
00:23:31,920 --> 00:23:35,840
And they are set like this.

357
00:23:35,840 --> 00:23:40,039
So the bisection function definition still takes in the thing we'd like to approximate

358
00:23:40,039 --> 00:23:41,440
the square root of.

359
00:23:41,440 --> 00:23:42,440
X.

360
00:23:42,440 --> 00:23:49,080
But the second parameter here, epsilon, will be equal to something inside the function definition.

361
00:23:49,080 --> 00:23:53,080
So we as the people who are writing this function, or they're going to say, the default value

362
00:23:53,079 --> 00:23:58,879
of epsilon is .01.

363
00:23:58,879 --> 00:24:05,240
So that means when we call the function down here, if the user makes a function call without

364
00:24:05,240 --> 00:24:11,359
explicitly passing in a second parameter, Python will use the default one that the person

365
00:24:11,359 --> 00:24:12,879
who wrote the function set.

366
00:24:12,879 --> 00:24:19,720
So Python will run bisection root of 123 with epsilon being .01.

367
00:24:19,720 --> 00:24:24,960
And otherwise, if the user does want to override that epsilon, they can just pass it in themselves.

368
00:24:24,960 --> 00:24:31,319
And that default value of .01 will be overwritten to be .5.

369
00:24:31,319 --> 00:24:38,120
And so in our code here, this is the bisection root with the default values.

370
00:24:38,120 --> 00:24:43,039
And so you can see here, if I run it with 123, even though there are two parameters here

371
00:24:43,039 --> 00:24:48,360
for the bisection square function, it's Python doesn't complain because it's using epsilon

372
00:24:48,360 --> 00:24:49,360
as .01.

373
00:24:49,359 --> 00:24:53,679
So I run it and it runs just fine.

374
00:24:53,679 --> 00:24:59,879
But in the second line here, if I actually want to use .5 as my default, as my epsilon value,

375
00:24:59,879 --> 00:25:04,599
it overrides my default parameter and it calculates the square root of 123 with epsilon being

376
00:25:04,599 --> 00:25:06,719
.5.

377
00:25:06,719 --> 00:25:09,959
Okay.

378
00:25:09,959 --> 00:25:14,919
Questions so far?

379
00:25:14,920 --> 00:25:20,640
So now that we've introduced default parameters, there's a few sort of rules about making function

380
00:25:20,640 --> 00:25:22,560
calls.

381
00:25:22,560 --> 00:25:26,400
When you create the function definition, so over here, right, when you're the one defining

382
00:25:26,400 --> 00:25:31,600
a function and you decide to allow some default parameters in your parameter list, everything

383
00:25:31,600 --> 00:25:34,759
that's a default parameter needs to go at the end.

384
00:25:34,759 --> 00:25:36,240
You can't switch these around.

385
00:25:36,240 --> 00:25:39,200
You can't say epsilon equals .01.x.

386
00:25:39,200 --> 00:25:42,360
Python will not allow that.

387
00:25:42,359 --> 00:25:48,479
So anytime you have default parameters, they always have to go to the end.

388
00:25:48,479 --> 00:25:52,479
That's the only rule for making the function called or defining the function with default

389
00:25:52,479 --> 00:25:53,719
parameters.

390
00:25:53,719 --> 00:25:58,479
And then once you have default parameters, you can actually call the function in many,

391
00:25:58,479 --> 00:26:00,559
many, many different ways.

392
00:26:00,559 --> 00:26:02,559
And I know these, some of these will be confusing.

393
00:26:02,559 --> 00:26:04,519
You might not know whether they're allowed or not.

394
00:26:04,519 --> 00:26:09,119
You can never go wrong with the last one, as we're going to see in a bit.

395
00:26:09,119 --> 00:26:13,919
So the first one here showcases what happens when you give values for everything that's

396
00:26:13,919 --> 00:26:15,919
not a default parameter.

397
00:26:15,919 --> 00:26:18,079
In this case, just x.

398
00:26:18,079 --> 00:26:22,919
If you just give a value for non-default parameters, Python sets default parameters for everything

399
00:26:22,919 --> 00:26:23,919
else.

400
00:26:23,919 --> 00:26:26,439
Not a big deal.

401
00:26:26,439 --> 00:26:31,119
Alternatively, you can pass in just like we have in the past when we write our own functions

402
00:26:31,119 --> 00:26:32,319
with multiple parameters.

403
00:26:32,319 --> 00:26:38,119
You can pass in one at a time in the same order, values for every one of those parameters.

404
00:26:38,119 --> 00:26:39,319
We fault or not.

405
00:26:39,319 --> 00:26:42,199
And if you pass in values for all of them, Python will not be confused.

406
00:26:42,199 --> 00:26:46,519
And it'll just match them one at a time.

407
00:26:46,519 --> 00:26:53,679
Variations on that, you can always pass in a value for a parameter name.

408
00:26:53,679 --> 00:26:59,679
So looking at the function definition, we can see the parameter names, the formal parameters

409
00:26:59,679 --> 00:27:02,879
are named x and epsilon.

410
00:27:02,880 --> 00:27:07,960
So when you make your function calls, you can actually explicitly tell Python something

411
00:27:07,960 --> 00:27:12,720
like this, x equals 123, epsilon equals 0.1.

412
00:27:12,720 --> 00:27:16,640
And if you have more parameters, you say that parameter equals whatever value you want to

413
00:27:16,640 --> 00:27:17,960
run it with.

414
00:27:17,960 --> 00:27:20,080
And so that will not confuse Python.

415
00:27:20,080 --> 00:27:24,960
And if you do it in that way, you can actually do it in any order you'd like.

416
00:27:24,960 --> 00:27:29,160
Because Python will just assign each one of these variables to be whatever you told them

417
00:27:29,160 --> 00:27:30,680
to.

418
00:27:30,680 --> 00:27:35,900
So worst case, you just do something like this, where you want at a time, you just say

419
00:27:35,900 --> 00:27:37,880
what the formal parameter is and its value.

420
00:27:37,880 --> 00:27:40,759
And then Python will not get confused.

421
00:27:40,759 --> 00:27:44,279
The ones at the bottom, though, is where we run into trouble.

422
00:27:44,279 --> 00:27:51,600
So for example, if you put the default parameter first, and then you put the default parameter

423
00:27:51,600 --> 00:27:57,799
first, and then any parameter that's not a default one afterward, Python gives an error.

424
00:27:57,799 --> 00:28:02,639
Because the default ones have to go after the non-default ones.

425
00:28:02,639 --> 00:28:07,639
And the last one doesn't actually give an error, but Python, remember, matches parameters

426
00:28:07,639 --> 00:28:09,079
one by one.

427
00:28:09,079 --> 00:28:15,559
So it's actually going to find an approximation to the square root of 0.001 to an epsilon

428
00:28:15,559 --> 00:28:18,839
of 123.

429
00:28:18,839 --> 00:28:21,119
Because it's just mapping the parameters one at a time.

430
00:28:21,119 --> 00:28:27,680
And so that's not an error, but it's not exactly what we wanted to do.

431
00:28:27,680 --> 00:28:35,320
It's just about this.

432
00:28:35,320 --> 00:28:43,440
So now let's move on to another nuance about functions.

433
00:28:43,440 --> 00:28:48,920
And we're going to go back to the idea of functions being objects in Python.

434
00:28:48,920 --> 00:28:55,600
So I drew this picture back when we first learned of functions as objects.

435
00:28:55,599 --> 00:28:58,839
So I'll just do it again just to draw your memory.

436
00:28:58,839 --> 00:29:08,839
So remember that when we make a function definition inside the memory, Python creates an object.

437
00:29:08,839 --> 00:29:14,799
As soon as we see just this function definition, Python doesn't care what code is inside here.

438
00:29:14,799 --> 00:29:16,679
This code does not run.

439
00:29:16,679 --> 00:29:18,159
It only runs when it's being called.

440
00:29:18,159 --> 00:29:22,039
And right here, I have not made a function call at all.

441
00:29:22,039 --> 00:29:27,759
Python knows at this point is that there is a function object inside memory.

442
00:29:27,759 --> 00:29:29,399
And it's the name.

443
00:29:29,399 --> 00:29:32,799
Its name is is even.

444
00:29:32,799 --> 00:29:37,680
And this is exactly the same as creating an integer object inside memory and giving it

445
00:29:37,680 --> 00:29:43,279
the name R through a line like this, or creating a float object in memory and giving it the name

446
00:29:43,279 --> 00:29:44,279
Pi.

447
00:29:44,279 --> 00:29:47,759
It's just some object with some name.

448
00:29:47,759 --> 00:29:54,960
And so that means that we can have some code that looks like this, which is going to essentially

449
00:29:54,960 --> 00:29:59,960
create an alias for that function object in memory.

450
00:29:59,960 --> 00:30:06,440
So here the name is even refers to that function object.

451
00:30:06,440 --> 00:30:11,039
And I'm telling Python that I would like to refer to that function object using the name

452
00:30:11,039 --> 00:30:12,920
MyFunk as well.

453
00:30:12,920 --> 00:30:19,360
So both MyFunk and is even are names that point to this object in memory.

454
00:30:19,360 --> 00:30:21,279
It's not a function call.

455
00:30:21,279 --> 00:30:24,400
I'm not trying to figure out if some number is even.

456
00:30:24,400 --> 00:30:30,440
I am literally giving another name to this function, this code.

457
00:30:30,440 --> 00:30:34,560
That does this thing here.

458
00:30:34,560 --> 00:30:39,680
And so that means that if I have two names that point to the same object, if I am going

459
00:30:39,680 --> 00:30:47,480
to invoke those two names, as I do here, with some parameters, Python is going to say,

460
00:30:47,480 --> 00:30:52,039
well, I'm going to run the code pointed to by these names with these parameters.

461
00:30:52,039 --> 00:30:56,880
So they will both run the code that they're pointing to.

462
00:30:56,880 --> 00:30:58,080
This is even.

463
00:30:58,080 --> 00:31:00,279
And so it's just going to turn true or false.

464
00:31:00,279 --> 00:31:03,840
We've seen the two points.

465
00:31:03,840 --> 00:31:08,720
So remember, just another name for that object in memory.

466
00:31:08,720 --> 00:31:14,720
So we've seen already how we can pass functions as parameters to other functions.

467
00:31:14,720 --> 00:31:21,720
And now we're going to see what happens when we return a function from another function.

468
00:31:21,720 --> 00:31:25,640
So we're not returning a function call here.

469
00:31:25,640 --> 00:31:29,079
We are returning a function object.

470
00:31:29,079 --> 00:31:33,039
So in this particular code, we have only one function.

471
00:31:33,039 --> 00:31:36,400
It's named MakeProd.

472
00:31:36,400 --> 00:31:39,519
And it happens to have some stuff going on inside it.

473
00:31:39,519 --> 00:31:41,680
So what's the stuff that this function will do?

474
00:31:41,680 --> 00:31:45,759
Well, this function itself will create another function.

475
00:31:45,759 --> 00:31:51,600
So this G only exists whenever MakeProd exists.

476
00:31:51,600 --> 00:31:58,519
The main program, you can think of it as sort of this level of the code, in terms of indentation,

477
00:31:58,519 --> 00:32:02,800
the main program does not know about G.

478
00:32:02,800 --> 00:32:05,680
G is only defined inside MakeProd.

479
00:32:05,680 --> 00:32:09,080
So when we first run this program as is, there's no function call being done.

480
00:32:09,080 --> 00:32:14,880
So the main program does not know anything about the internals of MakeProd.

481
00:32:14,880 --> 00:32:18,240
So MakeProd creates its own function here.

482
00:32:18,240 --> 00:32:22,400
And then all it does is return this function object.

483
00:32:22,400 --> 00:32:24,000
Notice it's not a function call.

484
00:32:24,000 --> 00:32:26,920
There's no open closed parentheses with a parameter in it.

485
00:32:26,920 --> 00:32:29,039
It's just the name G.

486
00:32:29,039 --> 00:32:32,200
It's this function object.

487
00:32:32,200 --> 00:32:34,000
That's the key thing here.

488
00:32:34,000 --> 00:32:39,400
So let's run two codes, this one and this one.

489
00:32:39,400 --> 00:32:42,839
They will do the exact same thing.

490
00:32:42,839 --> 00:32:47,720
They're going to call MakeProd with some parameters.

491
00:32:47,720 --> 00:32:51,880
And then we're going to see what happens when we return this G.

492
00:32:51,880 --> 00:32:56,000
And notice already it's looking slightly different than what we've been doing before.

493
00:32:56,000 --> 00:33:02,799
Yes, we have a call to MakeProd here, but we've kind of chained another function call

494
00:33:02,799 --> 00:33:05,079
right after MakeProd.

495
00:33:05,079 --> 00:33:08,319
We've got MakeProd parentheses, two parentheses, three.

496
00:33:08,319 --> 00:33:12,759
And so this is kind of like, I think of it as chaining a bunch of function calls together.

497
00:33:12,759 --> 00:33:18,440
And this is possible, as we're going to see when we step through the function environments

498
00:33:18,440 --> 00:33:19,559
that are being created.

499
00:33:19,559 --> 00:33:28,919
This is made possible because MakeProd, this function call, returns a function itself.

500
00:33:28,920 --> 00:33:33,360
So let's step through the code on the left, very carefully.

501
00:33:33,360 --> 00:33:37,519
And then I'll step through the code on the right, which will do the exact same thing.

502
00:33:37,519 --> 00:33:42,440
And hopefully it will clear up confusions if we do it twice.

503
00:33:42,440 --> 00:33:44,560
So this is the code from the left.

504
00:33:44,560 --> 00:33:48,880
Let's say we have this exact program here.

505
00:33:48,880 --> 00:33:51,360
I've got one function definition.

506
00:33:51,360 --> 00:33:53,600
And then I've got one function call here.

507
00:33:53,600 --> 00:33:56,279
And then I'm going to print the return value.

508
00:33:56,279 --> 00:34:01,319
So as soon as I run my code, Python creates my global environment.

509
00:34:01,319 --> 00:34:07,000
And in the global environment, this is the scope of the main program.

510
00:34:07,000 --> 00:34:08,000
What do we have?

511
00:34:08,000 --> 00:34:12,279
Well, we have one function definition, which has some code within it.

512
00:34:12,279 --> 00:34:16,679
I don't care what it is at this point because I don't have a function call.

513
00:34:16,679 --> 00:34:23,519
So then the next thing that I need to do is go down here and say val equals.

514
00:34:23,519 --> 00:34:27,559
I'm going to create a variable val in my global environment.

515
00:34:27,559 --> 00:34:30,039
And I'm going to make a function call.

516
00:34:30,039 --> 00:34:34,599
So function calls are done left to right, just like expressions.

517
00:34:34,599 --> 00:34:41,400
And the first thing Python sees is this function call, make prod parentheses too.

518
00:34:41,400 --> 00:34:42,920
It's a function call.

519
00:34:42,920 --> 00:34:48,119
So we need to create another orange box because a new environment gets created every time

520
00:34:48,119 --> 00:34:51,599
we make a function call.

521
00:34:51,599 --> 00:34:56,719
So here I have my scope, my environment for make prod.

522
00:34:56,719 --> 00:35:01,319
And I'm currently just stuck here trying to figure out what this is going to return.

523
00:35:01,319 --> 00:35:03,559
And just the red box here.

524
00:35:03,559 --> 00:35:07,559
Well, every time I have a function call, I need to look at the function definition.

525
00:35:07,559 --> 00:35:13,159
And the function definition says, well, there's one formal parameter A that I need to map

526
00:35:13,159 --> 00:35:15,159
to the actual parameter.

527
00:35:15,159 --> 00:35:18,559
So the thing I'm calling make prod with is two.

528
00:35:18,559 --> 00:35:21,159
Should be pretty straightforward, right?

529
00:35:21,159 --> 00:35:27,440
And then I can move on to do the body of make prod.

530
00:35:27,440 --> 00:35:34,119
OK, so the body of make prod says, I would like to create a function definition.

531
00:35:34,119 --> 00:35:36,480
The name of this function is g.

532
00:35:36,480 --> 00:35:38,079
So there's g.

533
00:35:38,079 --> 00:35:39,679
And it contains some code.

534
00:35:39,679 --> 00:35:44,440
Again, I don't care what this code is because I'm not making a function call to g yet.

535
00:35:44,440 --> 00:35:48,079
Right now, I'm just defining g.

536
00:35:48,079 --> 00:35:49,119
OK.

537
00:35:49,119 --> 00:35:51,119
So far so good.

538
00:35:51,119 --> 00:36:00,359
So this g, I want you to notice, only exists inside this call to make prod.

539
00:36:00,359 --> 00:36:06,359
The global environment does not know about g at this point, right?

540
00:36:06,359 --> 00:36:10,559
Because we only define g inside make prod.

541
00:36:10,559 --> 00:36:11,759
It's here, right?

542
00:36:11,759 --> 00:36:14,000
I didn't define it outside of make prod.

543
00:36:14,000 --> 00:36:16,199
So the global scope doesn't know about it.

544
00:36:16,199 --> 00:36:19,599
But make prod does know about it.

545
00:36:19,599 --> 00:36:27,319
And so the only way that the global environment can know about g is if this make prod function

546
00:36:27,319 --> 00:36:32,480
somehow returns g.

547
00:36:32,480 --> 00:36:33,399
OK.

548
00:36:33,399 --> 00:36:39,919
So if we pass g back as a parameter, as a value, sorry, to the main program scope, the main

549
00:36:39,919 --> 00:36:41,799
program can know about g.

550
00:36:41,800 --> 00:36:48,360
But otherwise, g is kind of stuck in this little subtest, little environment of make prod.

551
00:36:48,360 --> 00:36:51,600
And the main program doesn't know about it.

552
00:36:51,600 --> 00:36:54,000
And so that's what this code is doing.

553
00:36:54,000 --> 00:36:56,920
It's essentially saying, well, I've made my definition.

554
00:36:56,920 --> 00:36:59,080
And now I return g.

555
00:36:59,080 --> 00:37:04,720
So here, this g, and the associated code, right?

556
00:37:04,719 --> 00:37:13,639
So this object pointed to by g is going to be returned back to the main program.

557
00:37:13,639 --> 00:37:20,000
So now the main program knows about this object, g, that has some code associated with it,

558
00:37:20,000 --> 00:37:21,000
right?

559
00:37:21,000 --> 00:37:28,399
This line here, where it returns a star B. So the thing that I've boxed and read down

560
00:37:28,400 --> 00:37:33,840
here is the return value from make prod 2.

561
00:37:33,840 --> 00:37:36,680
And make prod 2 return g.

562
00:37:36,680 --> 00:37:43,880
So this you can essentially say is g.

563
00:37:43,880 --> 00:37:44,880
Is that OK?

564
00:37:44,880 --> 00:37:46,880
Does that make sense?

565
00:37:46,880 --> 00:37:48,599
We're passing functions along, right?

566
00:37:48,599 --> 00:37:49,599
Not function calls.

567
00:37:49,599 --> 00:37:53,599
And so this is just a function named g.

568
00:37:53,599 --> 00:38:01,779
And so now this line of code val equals, if we replace the red box with g, val equals

569
00:38:01,779 --> 00:38:07,199
g parentheses 3.

570
00:38:07,199 --> 00:38:11,360
So g parentheses 3 is another function call, right?

571
00:38:11,360 --> 00:38:13,079
Just clearly, we look at it.

572
00:38:13,079 --> 00:38:14,079
It's a function call.

573
00:38:14,079 --> 00:38:17,639
It's got a function name, parentheses, and a parameter.

574
00:38:17,639 --> 00:38:23,559
And so since it's a function call, we create another scope for this function call.

575
00:38:23,559 --> 00:38:27,279
As before, we look at what g takes in as a parameter.

576
00:38:27,279 --> 00:38:29,679
It's about a variable named B, right?

577
00:38:29,679 --> 00:38:31,480
The formal parameter B.

578
00:38:31,480 --> 00:38:33,920
And we map it to 3.

579
00:38:33,920 --> 00:38:39,199
Because that's our function called g parentheses 3.

580
00:38:39,199 --> 00:38:43,679
And then we have to do the body of g.

581
00:38:43,679 --> 00:38:46,320
The body of g says return A multiplied by B.

582
00:38:46,320 --> 00:38:48,559
Well, I know what B is.

583
00:38:48,559 --> 00:38:51,679
It's 3 because you just called me with that value.

584
00:38:51,679 --> 00:38:52,960
But what is A, right?

585
00:38:52,960 --> 00:38:56,559
The scope of g has no A within it.

586
00:38:56,559 --> 00:39:03,559
So thinking back to our lecture on functions, if a function call doesn't know about a variable

587
00:39:03,559 --> 00:39:11,000
name within its environment, within its scope, it moves up sort of the function called hierarchy.

588
00:39:11,000 --> 00:39:13,759
So it says who called me, right?

589
00:39:13,759 --> 00:39:16,119
Where was g defined?

590
00:39:16,119 --> 00:39:19,359
So g was defined inside make prod.

591
00:39:19,359 --> 00:39:22,159
And so it was called from make prod.

592
00:39:22,159 --> 00:39:25,679
Does make prod have a variable named A?

593
00:39:25,679 --> 00:39:26,639
It does, right?

594
00:39:26,639 --> 00:39:28,559
And its value was 2.

595
00:39:28,559 --> 00:39:31,199
So we didn't need to go any further up the hierarchy.

596
00:39:31,199 --> 00:39:33,480
We've already found a variable named A.

597
00:39:33,480 --> 00:39:38,079
So Python will use BS3 and AS2.

598
00:39:38,079 --> 00:39:40,440
Multiplies that to B6.

599
00:39:40,440 --> 00:39:45,880
And then the g function call can return 6.

600
00:39:45,880 --> 00:39:50,079
It returns it back to the main program because that's where this function call was being

601
00:39:50,079 --> 00:39:51,079
done, right?

602
00:39:51,079 --> 00:39:56,960
Remember, we had this replace with g parentheses 3 out in this global scope here.

603
00:39:56,960 --> 00:40:02,640
And so that 6 gets returned back to the main program and then value becomes 6.

604
00:40:02,640 --> 00:40:05,880
And we print 6.

605
00:40:05,880 --> 00:40:08,880
Okay.

606
00:40:08,880 --> 00:40:13,760
So that was showing you how to chain function calls together.

607
00:40:13,760 --> 00:40:19,960
And this was only made possible because make prod as a function returned another function

608
00:40:19,960 --> 00:40:21,160
object.

609
00:40:21,160 --> 00:40:26,760
If make prod returned, I don't know, a tuple or an integer or something that was not a

610
00:40:26,760 --> 00:40:32,920
function, this code would fail because the return from make prod would be, let's say it

611
00:40:32,920 --> 00:40:34,480
returned the number 10.

612
00:40:34,480 --> 00:40:39,040
The return from make prod would be replaced with 10 and then Python would see this line

613
00:40:39,040 --> 00:40:40,920
as 10 parentheses 3.

614
00:40:40,920 --> 00:40:42,920
What the heck is that?

615
00:40:43,760 --> 00:40:45,519
And so it would completely fail.

616
00:40:45,519 --> 00:40:50,920
And so this is only made possible by the fact that this make prod function returns a function

617
00:40:50,920 --> 00:40:51,920
object.

618
00:40:51,920 --> 00:40:57,159
And so we're able to chain these function calls together.

619
00:40:57,159 --> 00:41:03,039
So let's look at the exact same code, except this time instead of chaining them in a row,

620
00:41:03,039 --> 00:41:07,119
let's explicitly save the intermediate steps.

621
00:41:08,119 --> 00:41:09,119
Okay.

622
00:41:09,119 --> 00:41:16,119
So what I'm going to do is say make prod parentheses 2, I'm going to save as a variable and then make

623
00:41:16,119 --> 00:41:25,359
that variable call the 3, right, the second part of my chain from the previous line.

624
00:41:25,359 --> 00:41:27,960
And it's going to do the exact same thing.

625
00:41:27,960 --> 00:41:31,119
So here I've got the global scope.

626
00:41:31,119 --> 00:41:35,159
Just like before, I've got a function definition for make prod.

627
00:41:35,159 --> 00:41:37,399
So this is the name make prod.

628
00:41:37,399 --> 00:41:39,279
It's points to some code.

629
00:41:39,279 --> 00:41:43,679
And then I've got this variable double or that's going to equal something.

630
00:41:43,679 --> 00:41:46,199
So it's a function call.

631
00:41:46,199 --> 00:41:51,399
The function call says here's my environment for make prod with its scope.

632
00:41:51,399 --> 00:41:57,920
So in this particular scope, I've got my formal parameter a that maps to 2.

633
00:41:57,920 --> 00:42:02,239
And then the function body itself creates this variable g.

634
00:42:02,239 --> 00:42:04,000
That's just some code.

635
00:42:04,000 --> 00:42:08,760
So I've got the same code as I did before.

636
00:42:08,760 --> 00:42:14,000
Any questions so far based on what happened last in the last sort of example and here?

637
00:42:14,000 --> 00:42:18,840
Or is this okay so far?

638
00:42:18,840 --> 00:42:20,599
Okay.

639
00:42:20,599 --> 00:42:25,559
So now I've set up my code and this is where the interesting part comes in, right?

640
00:42:25,559 --> 00:42:31,159
Make prod is going to finish its call by saying I'm going to return something.

641
00:42:31,159 --> 00:42:34,639
And the thing it returns is g.

642
00:42:34,639 --> 00:42:40,319
So it returns this name, g, just happens to have, it happens to be a function object,

643
00:42:40,319 --> 00:42:42,679
but think of it as anything else.

644
00:42:42,679 --> 00:42:47,480
We're basically saying double or equals 10 or double or equals some list or some tuple.

645
00:42:47,480 --> 00:42:50,399
Double or is going to be some value, right?

646
00:42:50,399 --> 00:42:55,799
This value is just code associated with a function.

647
00:42:55,800 --> 00:43:01,160
So in my main program scope, I've got double or equals g, which based on the memory diagram

648
00:43:01,160 --> 00:43:03,680
we did like five or ten slides ago, right?

649
00:43:03,680 --> 00:43:06,519
It's like when we had my func equals is even.

650
00:43:06,519 --> 00:43:12,519
I basically have two names for the same function object, right?

651
00:43:12,519 --> 00:43:15,320
Double or is a name and g is the other name.

652
00:43:15,320 --> 00:43:22,960
And they both point to this function object.

653
00:43:22,960 --> 00:43:24,960
Does that make sense?

654
00:43:24,960 --> 00:43:26,800
Okay.

655
00:43:26,800 --> 00:43:28,679
Okay.

656
00:43:28,679 --> 00:43:33,599
So now that I've got two names that point to the same function object, we can just use this

657
00:43:33,599 --> 00:43:38,119
doubler in the next line.

658
00:43:38,119 --> 00:43:46,519
And this doubler is like saying g parentheses three.

659
00:43:46,519 --> 00:43:50,599
Except that I'm using the name doubler, which I saved it as on the previous line.

660
00:43:50,599 --> 00:44:00,239
So g parentheses three is another function call, create another environment for g or doubler,

661
00:44:00,239 --> 00:44:01,480
whatever name.

662
00:44:01,480 --> 00:44:07,400
And here I've got one formal parameter b, it's values three and then we do the same trick

663
00:44:07,400 --> 00:44:09,679
where you ask, what is the value of a?

664
00:44:09,679 --> 00:44:16,239
I'm going to look up the hierarchy of things that got called to see what the first value

665
00:44:16,239 --> 00:44:17,759
of a that I grab.

666
00:44:17,760 --> 00:44:21,240
And the first value of a that we grab is the two, right?

667
00:44:21,240 --> 00:44:23,880
And so we're going to multiply the two with the three.

668
00:44:23,880 --> 00:44:28,760
And that six gets returned back to whoever called it, which was out here in the main program

669
00:44:28,760 --> 00:44:30,240
scope.

670
00:44:30,240 --> 00:44:37,600
And so this val will be equal to six.

671
00:44:37,600 --> 00:44:41,840
And that's it.

672
00:44:41,840 --> 00:44:43,360
Questions.

673
00:44:43,360 --> 00:44:44,840
Which one was easier to understand?

674
00:44:44,840 --> 00:44:47,559
This one or the one where we did the chaining.

675
00:44:47,559 --> 00:44:48,559
Just show of hands.

676
00:44:48,559 --> 00:44:50,600
Who liked this one more?

677
00:44:50,600 --> 00:44:52,079
Who liked the chaining more?

678
00:44:52,079 --> 00:44:53,079
Oh, interesting.

679
00:44:53,079 --> 00:44:54,079
OK.

680
00:44:54,079 --> 00:44:56,920
Was the chaining just easier to grasp?

681
00:44:56,920 --> 00:44:58,519
Because there were less names.

682
00:44:58,519 --> 00:44:59,519
OK, cool.

683
00:44:59,519 --> 00:45:04,200
I'm glad I showed it first then.

684
00:45:04,200 --> 00:45:05,680
Any questions, though?

685
00:45:05,680 --> 00:45:06,680
Yeah.

686
00:45:06,680 --> 00:45:11,680
Does it fit the reason we thought this right?

687
00:45:11,679 --> 00:45:13,000
No reason.

688
00:45:13,000 --> 00:45:18,039
In fact, you would want to do the chaining way, because then you avoid extra lines of code.

689
00:45:18,039 --> 00:45:22,879
And again, with practice, it just becomes really easy to know what's going on.

690
00:45:22,879 --> 00:45:23,879
Yeah.

691
00:45:26,399 --> 00:45:28,079
OK.

692
00:45:28,079 --> 00:45:34,719
So that might have been confusing.

693
00:45:34,719 --> 00:45:36,239
Why do we bother doing that?

694
00:45:36,239 --> 00:45:41,639
Because that particular example, all we were doing is multiplying to our group.

695
00:45:41,639 --> 00:45:46,119
I guess doubling a number.

696
00:45:46,119 --> 00:45:55,879
We could have easily written that code to double a number and without actually returning a function.

697
00:45:55,879 --> 00:46:00,879
That seemed way overkill for what that code was trying to do.

698
00:46:00,879 --> 00:46:04,920
Well, it was kind of showing you what you can do with an easy example.

699
00:46:04,920 --> 00:46:10,879
And you would definitely never ever write functions returning other functions for such

700
00:46:10,880 --> 00:46:13,039
simple examples.

701
00:46:13,039 --> 00:46:21,960
But it's really a method for cases where you have larger pieces of code that you'd like

702
00:46:21,960 --> 00:46:23,680
to write.

703
00:46:23,680 --> 00:46:32,200
Because if you're writing a larger piece of code, some software project, and every single

704
00:46:32,200 --> 00:46:37,880
function you'd ever want to use is defined at the top level in the main program, it would

705
00:46:37,880 --> 00:46:40,519
become really messy.

706
00:46:40,519 --> 00:46:45,679
And so there are cases where you would like some functions to only be visible or accessible

707
00:46:45,679 --> 00:46:47,599
by other functions.

708
00:46:47,599 --> 00:46:52,599
And so you'd only define those functions within the scope of other functions.

709
00:46:52,599 --> 00:46:54,639
That's one thing.

710
00:46:54,639 --> 00:47:02,800
The other thing is using this sort of chaining method allows you to have some control over

711
00:47:02,800 --> 00:47:04,920
the flow of control of a program.

712
00:47:04,920 --> 00:47:14,200
And so you can imagine in the example here where you basically create this, you have this

713
00:47:14,200 --> 00:47:15,840
line here.

714
00:47:15,840 --> 00:47:18,920
And at some point you return g, right?

715
00:47:18,920 --> 00:47:22,360
And you don't want to do the doubling right away, right?

716
00:47:22,360 --> 00:47:24,599
So you don't want to do value equals double right away.

717
00:47:24,599 --> 00:47:30,119
You can imagine having a bunch more lines of code here that do other stuff before you actually

718
00:47:30,119 --> 00:47:33,320
do the doubling, right?

719
00:47:33,320 --> 00:47:39,140
And so in that case, in this larger, more complex program, you're essentially interrupting the

720
00:47:39,140 --> 00:47:40,960
flow of control here.

721
00:47:40,960 --> 00:47:45,920
You're not doing the doubling right away, but you did grab this function back.

722
00:47:45,920 --> 00:47:52,160
And then you can maybe do other things with that function before finally doing the doubling.

723
00:47:52,160 --> 00:47:58,920
And so in that case, you can basically execute some code partially, do some other operations,

724
00:47:58,920 --> 00:48:04,440
and then finish executing at the end after you've done these operations.

725
00:48:04,440 --> 00:48:09,599
So again, for this example, it doesn't make much sense, but in a larger piece of code,

726
00:48:09,599 --> 00:48:16,200
this idea of functions, returning functions, is just another tool to achieve these ideas

727
00:48:16,200 --> 00:48:21,720
of decomposition abstraction, which lead you to write more organized code, more robust code,

728
00:48:21,720 --> 00:48:25,760
more easy to read code, and so on and so on.

729
00:48:25,760 --> 00:48:29,840
So you don't have to do this, but you do have to understand what it means for a function

730
00:48:29,840 --> 00:48:34,080
to return another function.

731
00:48:34,080 --> 00:48:36,480
Any other questions?

732
00:48:36,480 --> 00:48:38,920
Okay.

733
00:48:38,920 --> 00:48:46,720
So now we're going to do the last piece of today's lecture, ideas of testing and debugging.

734
00:48:46,720 --> 00:48:54,920
This lecture is usually pretty dry, so I'm going to try to make it more fun as fun as

735
00:48:54,920 --> 00:48:56,880
I can.

736
00:48:56,880 --> 00:49:02,920
The reason why we introduced this lecture now is because I'm hoping that by this point

737
00:49:02,920 --> 00:49:08,079
in the course, you've had a chance to do some testing and debugging strategies on your

738
00:49:08,079 --> 00:49:13,720
own, by kind of a trial and error thing on quizzes and on p-sets.

739
00:49:13,720 --> 00:49:17,639
So you've got a chance to maybe use the Python tutor, you've got a chance to use print

740
00:49:17,639 --> 00:49:22,760
statements, various things like that, and see what works best for you, what doesn't work

741
00:49:22,760 --> 00:49:24,280
at all, and things like that.

742
00:49:24,280 --> 00:49:29,480
So you've maybe gotten a little bit burned by some of these strategies, but I hope that

743
00:49:29,480 --> 00:49:33,760
by you being burned by some things that you've tried that worked that didn't work, you

744
00:49:33,760 --> 00:49:38,320
maybe appreciate this lecture a little bit more than if I just showed you this lecture

745
00:49:38,320 --> 00:49:44,640
back on day one or day two or something like that, because it's a lot of common sense

746
00:49:44,640 --> 00:49:53,040
stuff, but there's a little bit of actual strategy as well in this particular set of slides.

747
00:49:53,039 --> 00:49:57,079
So your programming experience so far, I know this is certainly mine, as I hope that when

748
00:49:57,079 --> 00:50:00,440
I run my code, it immediately runs perfectly.

749
00:50:00,440 --> 00:50:05,360
But instead, what is up happening for me is I run my code and it immediately crashes.

750
00:50:05,360 --> 00:50:10,480
I've got my red errors on the side and I get a little bit flustered.

751
00:50:10,480 --> 00:50:14,199
So this is exactly what happens, probably, for you too.

752
00:50:14,199 --> 00:50:20,679
And the idea here is that you want to write the code in such a way that it makes it easy

753
00:50:20,679 --> 00:50:22,599
to test and debug.

754
00:50:22,599 --> 00:50:26,880
And I know I always say this and I actually don't always practice it, but it's important

755
00:50:26,880 --> 00:50:36,079
to write the code by writing it with, by adding comments as you're writing the code.

756
00:50:36,079 --> 00:50:40,360
So writing specifications, writing comments for yourself as you're actually writing the

757
00:50:40,360 --> 00:50:43,159
code, not when you've finished it is very important.

758
00:50:43,159 --> 00:50:46,679
It helps you as you're writing it or coming when you're coming back to it in a couple

759
00:50:46,679 --> 00:50:48,679
days.

760
00:50:48,679 --> 00:50:50,679
So, you're still realizing the programs also help.

761
00:50:50,679 --> 00:50:55,399
So if you see a chunk of code that you're copying and pasting all over the place, you'll

762
00:50:55,399 --> 00:51:00,359
want to plop it out in a little function that you call multiple places.

763
00:51:00,359 --> 00:51:08,919
So ideas like that kind of employ this defensive programming mechanism and it allows you to

764
00:51:08,919 --> 00:51:14,799
perform really easy testing and validation when it comes time to do that and then possibly

765
00:51:14,800 --> 00:51:18,800
debugging when it comes time to do that.

766
00:51:18,800 --> 00:51:21,160
So the lecture is going to be divided into two pieces.

767
00:51:21,160 --> 00:51:26,519
The first we're going to talk about testing and validation, some nice testing strategies,

768
00:51:26,519 --> 00:51:30,320
and then we're going to talk about some strategies for debugging as well.

769
00:51:30,320 --> 00:51:36,200
So the testing and validation part is where you come up with a set of input test cases

770
00:51:36,200 --> 00:51:38,320
and expected outputs.

771
00:51:38,320 --> 00:51:42,960
And all you're doing is running the test, running your code to make sure that the expected

772
00:51:42,960 --> 00:51:48,400
output matches the output that you actually get from running the code.

773
00:51:48,400 --> 00:51:55,159
The debugging part is where one of your tests don't match the expected output.

774
00:51:55,159 --> 00:51:59,119
One of the outputs that you get don't match the expected output.

775
00:51:59,119 --> 00:52:03,159
And at that point you have to figure out why the code is not working.

776
00:52:03,159 --> 00:52:04,159
Obviously.

777
00:52:04,159 --> 00:52:10,400
So before you even test your code, as I mentioned before, you have to set yourself up to do

778
00:52:10,400 --> 00:52:12,280
the testing and debugging.

779
00:52:12,280 --> 00:52:17,880
So to ease this part, it's important to write documentation very well.

780
00:52:17,880 --> 00:52:21,760
So when you're writing your own function, not functions that we've given you, document

781
00:52:21,760 --> 00:52:25,440
the doc string, what are the inputs you expect, what should the function do, what should

782
00:52:25,440 --> 00:52:28,400
the function return, things like that.

783
00:52:28,400 --> 00:52:32,720
If you're writing the code in a sort of a strange way or if you use some piece from stack

784
00:52:32,720 --> 00:52:37,000
overflow or something like that, document it to make sure that if you're looking at it

785
00:52:37,000 --> 00:52:40,280
a week from now, you still remember what that piece of code did.

786
00:52:40,280 --> 00:52:43,960
So really, really simple things like that can make a really big difference when it comes

787
00:52:43,960 --> 00:52:48,040
time to test and debug.

788
00:52:48,040 --> 00:52:52,160
Breaking up the code obviously into smaller chunks is very important because if you're copying

789
00:52:52,160 --> 00:52:57,440
and pasting the same piece of code over and over again, you remember to make a change in

790
00:52:57,440 --> 00:53:02,400
one place, you might forget to make that same changes in all these different places.

791
00:53:02,400 --> 00:53:07,400
And so that will be very frustrating when it comes time to actually run and debug the

792
00:53:07,400 --> 00:53:09,000
code.

793
00:53:09,000 --> 00:53:16,519
So once you have code that's written, you would start the testing process.

794
00:53:16,519 --> 00:53:21,920
You remove all the errors, static semantic errors and syntax errors are really easy to remove.

795
00:53:21,920 --> 00:53:26,719
Python immediately tells you, right, index error on this line or syntax error on this line.

796
00:53:26,719 --> 00:53:30,039
Those are really easy to figure out.

797
00:53:30,039 --> 00:53:36,559
Using a paper and pen or typing it out on your Python file, you come up with a bunch of

798
00:53:36,559 --> 00:53:38,559
test cases.

799
00:53:38,559 --> 00:53:46,639
And for each one of those test cases, the way we write on your microquiz test cases,

800
00:53:46,639 --> 00:53:48,880
you say what you expect the output to be.

801
00:53:48,880 --> 00:53:53,199
So when you actually run it, you don't need to remember what this output should be, right?

802
00:53:53,199 --> 00:53:59,719
It's just written down somewhere on paper or on the screen.

803
00:53:59,719 --> 00:54:05,799
So when you're creating a bunch of test cases, you can create some different classes of tests.

804
00:54:05,800 --> 00:54:11,720
So hopefully we're modularizing our programs, which means that we're creating functions.

805
00:54:11,720 --> 00:54:14,720
The simplest classes of tests are called unit tests.

806
00:54:14,720 --> 00:54:21,960
And these tests basically test a function with different inputs.

807
00:54:21,960 --> 00:54:27,560
So what you're going to do is come up with a bunch of different test cases for one particular

808
00:54:27,560 --> 00:54:32,920
function and run these test cases on the function.

809
00:54:32,920 --> 00:54:38,280
If they all work perfect, but if they don't or if you find a bug as you're writing test

810
00:54:38,280 --> 00:54:42,320
cases in the code, you'll want to perform regression testing.

811
00:54:42,320 --> 00:54:48,039
And regression testing means that as you find a bug, you add a new test case for them.

812
00:54:48,039 --> 00:54:55,639
Or as you fix a bug, you run the code, you run the same code with all of the previous

813
00:54:55,639 --> 00:55:00,159
test cases to make sure that the bug you fixed didn't introduce errors in a previous

814
00:55:00,159 --> 00:55:01,920
test case.

815
00:55:01,920 --> 00:55:06,840
So there's a bunch of iterations of unit testing and regression testing to test all of these

816
00:55:06,840 --> 00:55:09,639
different modules, all the functions in your program.

817
00:55:09,639 --> 00:55:13,400
And at some point, you're ready to do integration testing.

818
00:55:13,400 --> 00:55:17,320
And in integration testing, you've got all these modules, for example, as you did in Hangman,

819
00:55:17,320 --> 00:55:21,280
you've got all these little functions that do individual things.

820
00:55:21,280 --> 00:55:23,800
You put them all together into a larger program.

821
00:55:23,800 --> 00:55:28,119
In Hangman, it was a bunch of big while loop where you check all these different things

822
00:55:28,119 --> 00:55:32,119
that the user might input, and then you call the different functions you wrote.

823
00:55:32,119 --> 00:55:38,679
And as you find errors in the integration, when you've written code that integrated all

824
00:55:38,679 --> 00:55:44,519
these different pieces together, you might have to go back and do more unit tests for some

825
00:55:44,519 --> 00:55:48,119
of the functions that you wrote.

826
00:55:48,119 --> 00:55:49,119
Okay.

827
00:55:49,119 --> 00:55:53,039
So you've done unit testing, regression testing, and integration testing.

828
00:55:53,039 --> 00:55:55,400
What are some actual testing approaches?

829
00:55:55,400 --> 00:56:00,360
How do you actually create these test cases to run your code?

830
00:56:00,360 --> 00:56:06,400
So I guess the most natural way to write a test case is just intuition about the problem.

831
00:56:06,400 --> 00:56:12,240
So given a doc string, what are going to be some natural boundaries, some natural values

832
00:56:12,240 --> 00:56:14,760
of x and y for which you test this code with?

833
00:56:14,760 --> 00:56:23,920
You guys tell me what some values that we could test this code with.

834
00:56:23,920 --> 00:56:30,920
Think about the boundaries to the question.

835
00:56:30,920 --> 00:56:31,920
Yeah.

836
00:56:31,920 --> 00:56:32,920
3 and 4 is good.

837
00:56:32,920 --> 00:56:34,920
So x is less than y.

838
00:56:34,920 --> 00:56:35,920
Is a good one.

839
00:56:35,920 --> 00:56:36,920
Vice versa.

840
00:56:36,920 --> 00:56:37,920
4 and 3 is another one.

841
00:56:37,920 --> 00:56:41,920
Where y is greater less than x.

842
00:56:41,920 --> 00:56:43,920
We could test them being equal.

843
00:56:43,920 --> 00:56:44,920
What about 0 and 0?

844
00:56:44,920 --> 00:56:46,920
What about 1000 and 1000?

845
00:56:46,920 --> 00:56:47,920
So we could do extremes.

846
00:56:47,920 --> 00:56:49,920
We could do bigger than less than.

847
00:56:49,920 --> 00:56:51,920
We could do equal things like that.

848
00:56:51,920 --> 00:56:57,920
So mathematical functions are kind of easy to apply this idea to because they just have natural boundaries.

849
00:56:57,920 --> 00:57:00,920
But often there are functions which don't have these natural boundaries.

850
00:57:00,920 --> 00:57:03,920
And then we might be stuck doing random testing.

851
00:57:03,920 --> 00:57:10,920
And in random testing, obviously the more test cases you have, the better chance you have of finding a bug.

852
00:57:10,920 --> 00:57:13,920
But there are actual techniques for coming up with test cases.

853
00:57:13,920 --> 00:57:16,920
So the first one is called black box testing.

854
00:57:16,920 --> 00:57:19,920
Second is called glass box testing.

855
00:57:19,920 --> 00:57:26,920
Now, in black box testing, you're going to treat the code of the function as a black box.

856
00:57:26,920 --> 00:57:29,920
So we don't even look at what the code is doing.

857
00:57:29,920 --> 00:57:36,920
All we're looking at to guide writing our test cases is the specification, the doc string.

858
00:57:36,920 --> 00:57:37,920
Right?

859
00:57:37,920 --> 00:57:44,920
And so hopefully the person who wrote this function wrote a really nice doc string because that's what we're going to use to write our test cases.

860
00:57:45,920 --> 00:57:59,920
So the way that we're going to write a test case for the square root function is by saying what is the value of x and epsilon according to these constraints here.

861
00:57:59,920 --> 00:58:11,920
So obviously we're not going to test the code with values that don't match those constraints because the person who wrote this function doesn't guarantee that this function will work for those out of those weird values.

862
00:58:11,920 --> 00:58:20,920
So the good thing about black box testing is if we're the ones testing this function, we're only using the specification to write the test cases.

863
00:58:20,920 --> 00:58:26,920
So if, for example, this person implemented square root using approximation method, I don't care.

864
00:58:26,920 --> 00:58:32,920
My test cases will work if the person changes their implementation to use the bisection method.

865
00:58:32,920 --> 00:58:42,920
My set of test cases will still work even if the person who wrote this function changed the black box, right? The implementation.

866
00:58:42,920 --> 00:58:46,920
So it's black box testing is really nice in that respect.

867
00:58:46,920 --> 00:58:51,920
And so for this particular function, here's a bunch of test cases that I would run it with.

868
00:58:51,920 --> 00:59:03,920
So obviously x being a zero perfect square less than one are kind of nice ones to test irrational values and then a bunch of extremes is also good to test.

869
00:59:03,920 --> 00:59:08,920
And then epsilon the same we've got some reasonable values of epsilon and then some extremes.

870
00:59:08,920 --> 00:59:17,920
And we can even mix and match we can have zero and extremes epsilon and perfect squares and extremes epsilon and things like that.

871
00:59:18,920 --> 00:59:24,920
So lots more test cases than this, but this is a really good start.

872
00:59:24,920 --> 00:59:30,920
In glass box testing, we're going to use the code itself to guide the test cases that we write.

873
00:59:30,920 --> 00:59:40,920
So if we write something test suite that's path complete, that means that we're going to hit every single path inside the program.

874
00:59:40,920 --> 00:59:50,920
That means we have to look at the code to guide the test cases that we're writing, which means that we're going to have to write a test case for the code hitting the if part of a branch.

875
00:59:50,920 --> 00:59:55,920
We have to write a test case for the code hitting the else part of a branch or the L if part of the branch.

876
00:59:55,920 --> 00:59:59,920
If we have a for loop, we need to write a test case where the code doesn't go through the loop at all.

877
00:59:59,920 --> 01:00:03,920
It goes through once or goes through many times through the loop, right? Same with while loops.

878
01:00:03,920 --> 01:00:07,920
We write a test case so that the code doesn't go through the while loop at all.

879
01:00:07,920 --> 01:00:10,920
It matches the condition once or matches the condition many times.

880
01:00:10,920 --> 01:00:23,920
So you can imagine that this glass box testing leads to a whole lot more test cases, especially when we have a whole bunch of different combinations of all of these conditionals and loops and things that we'd like to hit.

881
01:00:23,920 --> 01:00:32,920
The problem with glass box testing and having a complete path, a path complete test suite is that we might accidentally miss a bug.

882
01:00:32,920 --> 01:00:38,920
So here's an example of a code that's not correct. So it finds absolute value of x.

883
01:00:38,920 --> 01:00:43,920
If x is less than negative one, we return negative x, else we return x.

884
01:00:43,920 --> 01:00:48,920
So a path complete test suite could be testing two and negative two.

885
01:00:48,920 --> 01:00:55,920
The two brings us through the else, so we return two, and the negative two brings us through the if.

886
01:00:55,920 --> 01:00:58,920
So we return two.

887
01:00:58,920 --> 01:01:08,920
We might say this code works, but it doesn't, right? We already can tell that negative one is returned incorrectly as negative one.

888
01:01:08,920 --> 01:01:20,920
And so in addition to testing all the paths through the code, we'll also want to look at boundary condition, especially for conditionals when we do a glass box testing.

889
01:01:20,920 --> 01:01:25,920
Okay, so we have a whole bunch of test cases. We've run our code with all these test cases.

890
01:01:25,920 --> 01:01:33,920
And then at some point, we've gotten an output from a test case that does not match what we expected to do.

891
01:01:33,920 --> 01:01:36,920
Then we have to do the debugging process.

892
01:01:36,920 --> 01:01:45,920
And this is where this is where a little creativity is required.

893
01:01:45,920 --> 01:01:51,920
There is no recipe like there was in glass box testing and black box testing for writing test cases.

894
01:01:51,920 --> 01:01:56,920
There is no similar sort of recipe for debugging a program.

895
01:01:56,920 --> 01:01:59,920
There is a lot of experience that's needed, right?

896
01:01:59,920 --> 01:02:05,920
A lot of times that you've seen a bug crop up in order to figure out sort of what the problem might be.

897
01:02:05,920 --> 01:02:12,920
And so a lot of experience writing code is very useful in the debugging process.

898
01:02:12,920 --> 01:02:17,920
There are tools to help you do the debugging process, but there aren't many tools to actually do the debugging.

899
01:02:17,920 --> 01:02:19,920
You kind of just have to do it.

900
01:02:19,920 --> 01:02:25,920
So there's tools built into anaconda. They're not very good. I've used them.

901
01:02:25,920 --> 01:02:35,920
Python tutor obviously is a really good one, especially for small programs because you get to just go step by step and see the values of each variable as the code is running.

902
01:02:35,920 --> 01:02:37,920
So I like that a lot.

903
01:02:37,920 --> 01:02:41,920
Print statements are also really good, but you have to know where to put them.

904
01:02:41,920 --> 01:02:44,920
And you have to use them effectively.

905
01:02:44,920 --> 01:02:51,920
So in that sense, you know, if you're not as familiar with print statements, Python tutor might be a better suited for debugging.

906
01:02:51,920 --> 01:02:54,920
But no matter what, it's important to be systematic.

907
01:02:54,920 --> 01:03:00,920
Don't just start changing random variables or random conditions and then run the code through the tester again.

908
01:03:00,920 --> 01:03:03,920
That's not going to work very well.

909
01:03:03,920 --> 01:03:08,920
When we see error messages in the debugging process, these are really easy to figure out.

910
01:03:08,920 --> 01:03:14,920
Index error. Oh shoot, I got to check my indices. Maybe I went over.

911
01:03:14,920 --> 01:03:22,920
If you see an index error, you should probably print out the variable that you're indexing into indexing with.

912
01:03:22,920 --> 01:03:27,920
Type errors. Oh man, look, I'm casting a list to an integer.

913
01:03:27,920 --> 01:03:30,920
What is that going to do? Nothing. It's going to give us an error.

914
01:03:30,920 --> 01:03:33,920
Or here, I'm dividing a string by an integer.

915
01:03:33,920 --> 01:03:37,920
Again, something really simple to fix. Name errors, of course.

916
01:03:37,920 --> 01:03:41,920
Here's I have a variable that I've never initialized.

917
01:03:41,920 --> 01:03:50,920
And then syntax errors basically mean things like your indentations off or you're missing a parentheses or something like that.

918
01:03:50,920 --> 01:03:52,920
Logic errors are a lot harder.

919
01:03:52,920 --> 01:03:59,920
These ones, you cannot just look at the line and say this is where the problem is.

920
01:03:59,920 --> 01:04:04,920
These ones happen when your output does not match the expected output.

921
01:04:04,920 --> 01:04:10,920
And this is where engaging another part of your brain is very important.

922
01:04:10,920 --> 01:04:15,920
I've definitely done this a lot. I've had some errors. I went for a walk, come back and I figured out.

923
01:04:15,920 --> 01:04:18,920
I figured out in the shower or I figured out in bed.

924
01:04:19,920 --> 01:04:25,920
So thinking a little bit before you even start the problem is good for these logic errors.

925
01:04:25,920 --> 01:04:30,920
Drawing a picture, taking a break, talking to friends, all these are really good.

926
01:04:30,920 --> 01:04:34,920
Explaining the code to something else, somebody else is also a really nice thing to do.

927
01:04:34,920 --> 01:04:39,920
That's me explaining the code for something we're going to do in a couple minutes.

928
01:04:39,920 --> 01:04:42,920
To my son, he's seven now and he's doing scratch.

929
01:04:42,920 --> 01:04:47,920
So that's pretty cool, but he was helping me debug and now I'm helping him debug.

930
01:04:47,920 --> 01:04:52,920
Or you can explain code to some inanimate object like a rubber duckie.

931
01:04:52,920 --> 01:04:57,920
Now having said that, you guys came on a good day.

932
01:04:57,920 --> 01:05:08,920
Because you will all get to have your own rubber duck, different kinds, grab your personality duck,

933
01:05:08,920 --> 01:05:11,920
that matches your personality after class.

934
01:05:11,920 --> 01:05:18,920
I've got Minecraft ducks, giraffe ducks, princess ducks, polystucks, elephant ducks,

935
01:05:18,920 --> 01:05:26,920
whatever ducks you'd like. Come grab one. Use it for your quizzes, use it for your p-sets,

936
01:05:26,920 --> 01:05:30,920
whatever you'd like to use it for. Go for it.

937
01:05:30,920 --> 01:05:36,920
So hopefully it comes in handy. Use it well.

938
01:05:36,920 --> 01:05:42,920
All right. So we're not quite done yet.

939
01:05:42,920 --> 01:05:48,920
Okay. So I will give you a little bit of debugging tips though.

940
01:05:48,920 --> 01:05:51,920
So I know it's, I said it's a creative process.

941
01:05:51,920 --> 01:05:56,920
I said it's really hard to come up with a recipe to do the actual debugging.

942
01:05:56,920 --> 01:06:02,920
But there are, there is maybe one way, one really nice way to do it.

943
01:06:02,920 --> 01:06:07,920
So the idea behind debugging is basically use the scientific method.

944
01:06:07,920 --> 01:06:11,920
Like I said, don't just randomly change things expecting for it to work out.

945
01:06:11,920 --> 01:06:15,920
What you want to do is look at a bunch of test cases that failed.

946
01:06:15,920 --> 01:06:18,920
It's possible that they're all, they all have something in common.

947
01:06:18,920 --> 01:06:25,920
And that might lead you to a small piece of code in your program that is the one that you should be focusing on changing.

948
01:06:25,920 --> 01:06:33,920
So you want to look at the data for my hypothesis and try to see if another test case also fails that particular one.

949
01:06:33,920 --> 01:06:41,920
As you're, as you're doing the debugging method, right, if you really have no idea about where to start,

950
01:06:41,920 --> 01:06:45,920
try putting print statements at reasonable places in the code.

951
01:06:45,920 --> 01:06:51,920
So when you first enter functions, when you first enter a loop, right, all the values of the loop variable,

952
01:06:51,920 --> 01:06:56,920
and all the variables that you're creating in the loop or modifying in the loop and things like that.

953
01:06:56,920 --> 01:07:02,920
And if all else fails using the bisection method is a really nice way to try to solve the problem.

954
01:07:02,920 --> 01:07:09,920
So bisection method in debugging basically says, put a print statement about halfway in the code.

955
01:07:09,920 --> 01:07:14,920
If everything looks right for all the variables at that point, you know the problem is after this.

956
01:07:14,920 --> 01:07:18,920
If something is wrong, you know the problem is in the first half of the code.

957
01:07:18,920 --> 01:07:22,920
Then put a print statement in the quarter of the code, right?

958
01:07:22,920 --> 01:07:28,920
And then at that point, see if the values, all the values at that point match what you expect them to be.

959
01:07:28,920 --> 01:07:34,920
If they do great, you know the problem is in the second quarter, I guess, yes, the second quarter.

960
01:07:34,920 --> 01:07:37,920
And if they don't, you know the problem is in the first quarter.

961
01:07:37,920 --> 01:07:43,920
Okay, so the bisection method is a nice way to try to debug the code.

962
01:07:43,920 --> 01:07:49,920
So what we're going to do in the last bit of lecture is we're going to debug some code together that's in the Python file.

963
01:07:49,920 --> 01:07:57,920
And then what I have is included in today's zip file is actually a wordal game that I wrote.

964
01:07:57,920 --> 01:08:00,920
It's like 12 underscore world dot pie or whatever.

965
01:08:00,920 --> 01:08:02,920
And it's buggy.

966
01:08:02,920 --> 01:08:04,920
So I introduce some bugs in it.

967
01:08:04,920 --> 01:08:11,920
And I would, if you'd like to practice debugging, you can try to fix the wordal game to get it to work.

968
01:08:11,920 --> 01:08:19,920
And then you can play yourself or you can amaze your friends and get them to play your game in case you'd like to do something like that.

969
01:08:19,920 --> 01:08:29,920
Okay, so before we end, I would like to actually do some debugging with you just to show you the the bisection method for debugging.

970
01:08:29,920 --> 01:08:34,920
So the code we're going to debug is this one right here.

971
01:08:34,920 --> 01:08:43,920
And I've already included sort of the fixed code step by step, but we're going to talk through it together.

972
01:08:43,920 --> 01:08:47,920
So this function is buggy.

973
01:08:47,920 --> 01:08:53,920
It's a function called is pal that takes in a list X.

974
01:08:53,920 --> 01:09:01,920
And it's supposed to return true if the list elements are a pound room and false otherwise.

975
01:09:01,920 --> 01:09:04,920
So using the input.

976
01:09:04,920 --> 01:09:07,920
ABCBA cast as a list.

977
01:09:07,920 --> 01:09:13,920
So, you know, the input is going to be the string A string B string C string B string A.

978
01:09:13,920 --> 01:09:19,920
This list is a pal and right because it's the same forwards as it is backwards.

979
01:09:19,920 --> 01:09:22,920
So if I run it, it should print true.

980
01:09:22,920 --> 01:09:25,920
Okay, so that test case worked well.

981
01:09:25,920 --> 01:09:29,920
But now what about the second test case surprise it's not going to work.

982
01:09:29,920 --> 01:09:35,920
If I pass in the list AB right so my input is going to be the string A and the string B.

983
01:09:35,920 --> 01:09:41,920
This is not a pal and drum right so I expect it to print false but it prints true.

984
01:09:41,920 --> 01:09:48,920
So I have a nice test case here that I can I can make fixes with and see whether it actually gets fixed.

985
01:09:48,920 --> 01:09:57,920
Now of course AB CDF GHIJ KLM this also doesn't work right so this is another test case that's not going to work.

986
01:09:57,920 --> 01:10:00,920
But I don't want to use this long one as my test case.

987
01:10:00,920 --> 01:10:07,920
I want to use the simplest test case I can find that doesn't work right so AB seems like a really nice one to test with.

988
01:10:07,920 --> 01:10:16,920
Okay, so now the first thing we want to do that way that we figured out the input I'd like to test with is put a print statement about halfway through the code.

989
01:10:16,920 --> 01:10:20,920
Yes, there's only like five lines of code here.

990
01:10:20,920 --> 01:10:27,920
So there's only probably one place that makes sense to put a print statement but let's just work with me here.

991
01:10:27,920 --> 01:10:33,920
So the print statement could be put right here right before the if statement.

992
01:10:33,920 --> 01:10:36,920
So I've got two lines of code that do something and then an if.

993
01:10:36,920 --> 01:10:39,920
So let's just put it right before the if.

994
01:10:39,920 --> 01:10:41,920
Scroll down.

995
01:10:41,920 --> 01:10:42,920
Step two.

996
01:10:42,920 --> 01:10:43,920
Here I go.

997
01:10:43,920 --> 01:10:49,920
I've put my print statement right before the if.

998
01:10:49,920 --> 01:10:53,920
Now we can run the code again so I'm not going to run the one that worked.

999
01:10:53,920 --> 01:10:56,920
Let me try to run the one that didn't work to figure out what the problem is.

1000
01:10:56,920 --> 01:10:58,920
So I run this.

1001
01:10:58,920 --> 01:11:05,920
The print statement is printing the temp so the reverse of X and X.

1002
01:11:05,920 --> 01:11:12,920
So what I'm expecting in and I should probably written this over here what I'm expecting to get.

1003
01:11:12,920 --> 01:11:19,920
What I'm expecting is to see the reverse of AB so BA and then the original X AB.

1004
01:11:19,920 --> 01:11:21,920
But I don't.

1005
01:11:21,920 --> 01:11:23,920
So I see AB and AB.

1006
01:11:23,920 --> 01:11:27,920
This first one should be BA.

1007
01:11:27,920 --> 01:11:34,920
So already I have something that's unexpected and so I know the problem is going to be in these first two lines of code.

1008
01:11:34,920 --> 01:11:37,920
Right somewhere in here.

1009
01:11:37,920 --> 01:11:43,920
So then what I would like to do is figure out which one of these lines of code is the problem.

1010
01:11:43,920 --> 01:11:47,920
So I'm going to put another print statement a quarter of the way through the code.

1011
01:11:47,920 --> 01:11:49,920
Okay well there's only one more place to put it.

1012
01:11:49,920 --> 01:11:51,920
So let's put it in here.

1013
01:11:51,920 --> 01:11:55,920
I've got another print statement right before the reverse.

1014
01:11:55,920 --> 01:12:04,920
So what I'm going to be checking is before the reverse the value of my temp variable and my original variable.

1015
01:12:04,920 --> 01:12:11,920
And after the reverse the value of my reverse variable and the original variable.

1016
01:12:11,920 --> 01:12:18,920
So what I'm expecting to see is this one here they should be the same AB AB.

1017
01:12:18,920 --> 01:12:22,920
But this one here I'm expecting to see BA AB.

1018
01:12:22,920 --> 01:12:27,920
So run it with this buggy example.

1019
01:12:27,920 --> 01:12:33,920
So before the reverse I'm expecting AB and AB and I do get that so that's good.

1020
01:12:33,920 --> 01:12:35,920
I'm happy to see that.

1021
01:12:35,920 --> 01:12:38,920
And then after the reverse that's by problem right.

1022
01:12:38,920 --> 01:12:42,920
I'm expecting this one to be reversed but it's not.

1023
01:12:42,920 --> 01:12:46,920
So now I know the problem lies here.

1024
01:12:46,920 --> 01:12:47,920
Temp.reverse.

1025
01:12:47,920 --> 01:12:51,920
Because here in this print statement here temp and x were as expected.

1026
01:12:51,920 --> 01:12:54,920
So what do you think the fix should be to the reverse?

1027
01:12:54,920 --> 01:12:56,920
Yeah.

1028
01:12:56,920 --> 01:12:57,920
Yeah exactly.

1029
01:12:57,920 --> 01:12:58,920
We need to add parentheses.

1030
01:12:58,920 --> 01:12:59,920
This is a function.

1031
01:12:59,920 --> 01:13:02,920
We need to call it like a function right.

1032
01:13:02,920 --> 01:13:06,920
So let's do that fix.

1033
01:13:06,920 --> 01:13:08,920
We've done it here.

1034
01:13:08,920 --> 01:13:13,920
So here I've added the parentheses to the reverse.

1035
01:13:13,920 --> 01:13:14,920
And run it again.

1036
01:13:14,920 --> 01:13:19,920
So now what I'm expecting is before the reverse I need to see AB AB.

1037
01:13:19,920 --> 01:13:21,920
So this one should be the same.

1038
01:13:21,920 --> 01:13:25,920
We shouldn't change because I didn't do anything to that temp equals x.

1039
01:13:25,920 --> 01:13:29,920
And after the reverse I'm expecting the temp to be BA.

1040
01:13:29,920 --> 01:13:32,920
And the x to be AB unchanged.

1041
01:13:32,920 --> 01:13:34,920
All right let's run it.

1042
01:13:34,920 --> 01:13:36,920
So before the reverse everything looks okay.

1043
01:13:36,920 --> 01:13:38,920
Temp and x are the same.

1044
01:13:38,920 --> 01:13:40,920
After the reverse look at that.

1045
01:13:40,920 --> 01:13:43,920
I've got my BA as my reversed variable.

1046
01:13:43,920 --> 01:13:46,920
I'm happy.

1047
01:13:46,920 --> 01:13:49,920
But then my x has also changed.

1048
01:13:49,920 --> 01:13:51,920
I'm sad.

1049
01:13:51,920 --> 01:13:54,920
Yes.

1050
01:13:54,920 --> 01:13:56,920
Exactly.

1051
01:13:56,920 --> 01:13:57,920
There's a clue.

1052
01:13:57,920 --> 01:13:58,920
Right.

1053
01:13:58,920 --> 01:13:59,920
We see a clue.

1054
01:13:59,920 --> 01:14:01,920
We've made a change to temp.

1055
01:14:01,920 --> 01:14:03,920
And x has also changed.

1056
01:14:03,920 --> 01:14:09,920
So as was suggested from the back we need to make a copy of x.

1057
01:14:09,920 --> 01:14:16,920
What we've done here is called when I did temp equals x on a mutable variable.

1058
01:14:16,920 --> 01:14:17,920
What did I make?

1059
01:14:17,920 --> 01:14:19,920
An alias exactly.

1060
01:14:19,920 --> 01:14:20,920
Right.

1061
01:14:20,920 --> 01:14:25,920
So let's make a copy of that x.

1062
01:14:25,920 --> 01:14:27,920
Right here.

1063
01:14:27,920 --> 01:14:31,920
Right.

1064
01:14:31,920 --> 01:14:35,920
So hopefully that fixes things because I've run out of lines to fix.

1065
01:14:35,920 --> 01:14:41,920
So we run this code again with AB and see the output.

1066
01:14:41,920 --> 01:14:45,920
Before the reverse temp and x should be the same.

1067
01:14:45,920 --> 01:14:46,920
And they are.

1068
01:14:46,920 --> 01:14:48,920
They're both AB AB.

1069
01:14:48,920 --> 01:14:52,920
And after the reverse the temp should be the reversed BA.

1070
01:14:52,920 --> 01:14:53,920
And it is.

1071
01:14:53,920 --> 01:14:55,920
And the x should remain the same.

1072
01:14:55,920 --> 01:14:56,920
AB.

1073
01:14:56,920 --> 01:14:58,920
And it's false.

1074
01:14:58,920 --> 01:15:01,920
So it's not a palindrome.

1075
01:15:01,920 --> 01:15:06,920
Last thing I need to do is double check my original test case.

1076
01:15:06,920 --> 01:15:11,920
The one that actually worked before I made all my changes to see whether it still works.

1077
01:15:11,920 --> 01:15:13,920
And it does.

1078
01:15:13,920 --> 01:15:17,920
So that particular list is a palindrome.

1079
01:15:17,920 --> 01:15:21,920
So that still returns true.

1080
01:15:21,920 --> 01:15:22,920
So that's it.

1081
01:15:22,920 --> 01:15:24,920
So I've got a couple or just one.

1082
01:15:24,920 --> 01:15:28,920
I guess list comprehension for you to try on your own to write.

1083
01:15:28,920 --> 01:15:31,920
And then of course the buggy wordle game for you to try as well.

