---
title: MIT6100 P25P25Plotting
---

1
00:00:00,000 --> 00:00:15,320
All right, so let's begin today's lecture.

2
00:00:15,320 --> 00:00:17,559
We have only two lectures left.

3
00:00:17,559 --> 00:00:23,240
This one and next Monday, I realized that there are no more deliverables for this class,

4
00:00:23,240 --> 00:00:24,240
right?

5
00:00:24,240 --> 00:00:26,719
No more quizzes after tonight, no more presets.

6
00:00:26,719 --> 00:00:28,679
So I do appreciate you coming to these lectures.

7
00:00:28,679 --> 00:00:32,479
Is there intended to be a little bit more fun?

8
00:00:32,479 --> 00:00:35,799
No need to take notes, just kind of sit back and enjoy the content.

9
00:00:35,799 --> 00:00:41,640
Today we're going to be talking about library and Python that can help you do plotting.

10
00:00:41,640 --> 00:00:45,280
And the reason why we talk about this plotting library as opposed to something else that's

11
00:00:45,280 --> 00:00:49,760
maybe more machine learning or something else like that is because at one point or another,

12
00:00:49,760 --> 00:00:55,519
if you decide to take any other course that kind of builds upon this intro course, you'll

13
00:00:55,520 --> 00:00:59,560
probably want to create some graphs or visualize something, right?

14
00:00:59,560 --> 00:01:03,800
Even if you do a Europe, you'll probably have to visualize some sort of data.

15
00:01:03,800 --> 00:01:09,640
And it's a really nice next step to show you how to use a library that already exists.

16
00:01:09,640 --> 00:01:14,320
So somebody already put in the work in creating this library that can plot things for us.

17
00:01:14,320 --> 00:01:17,280
So let's just try to use it.

18
00:01:17,280 --> 00:01:23,280
And so it's just a really, really nice way for us to kind of wrap up the course by showing

19
00:01:23,280 --> 00:01:26,239
this visualization library.

20
00:01:26,239 --> 00:01:31,799
So the library we're going to do to use is called Matplotlib.

21
00:01:31,799 --> 00:01:36,560
And it's kind of the most basic plotting visualization library that we can have.

22
00:01:36,560 --> 00:01:40,640
And the way that we bring it into our code, just like we have in the past few lectures,

23
00:01:40,640 --> 00:01:43,799
is with this import statement.

24
00:01:43,799 --> 00:01:49,439
And the actual file that comes into our, that we would bring into our program is called

25
00:01:49,439 --> 00:01:51,960
matplotlib.pyplot.

26
00:01:51,959 --> 00:01:53,919
Now that's kind of a mouthful.

27
00:01:53,919 --> 00:02:01,919
And a lot of times when we want to use this library, you'd have to basically say matplotlib.pyplot.

28
00:02:01,919 --> 00:02:04,359
.function name from that file.

29
00:02:04,359 --> 00:02:07,280
And so that's a lot of writing and a lot of typing.

30
00:02:07,280 --> 00:02:13,840
So when we bring in this library into our own file, we can actually rename it.

31
00:02:13,840 --> 00:02:21,159
So as PLT tells Python that now I would like to refer to this file and this library as

32
00:02:21,159 --> 00:02:23,000
the name PLT.

33
00:02:23,000 --> 00:02:29,199
So if we ever want to call functions or maybe objects and things like that from this file,

34
00:02:29,199 --> 00:02:31,900
we would do it using PLT.

35
00:02:31,900 --> 00:02:34,240
And then the name of whatever we want to use.

36
00:02:34,240 --> 00:02:39,439
So it's just a much nicer way to grab the contents of the file instead of always writing

37
00:02:39,439 --> 00:02:40,900
matplotlib.pyplot.

38
00:02:40,900 --> 00:02:41,900
Something else.

39
00:02:41,900 --> 00:02:42,900
Yeah, question.

40
00:02:42,900 --> 00:02:46,519
You can think of it as a variable name.

41
00:02:46,519 --> 00:02:48,319
It's anything you want it to be.

42
00:02:48,319 --> 00:02:51,680
So you could import it, matplotlib.pyplot as Anna.

43
00:02:51,680 --> 00:02:56,879
And then from there on, you can say Anna.processname or plot or whatever it is.

44
00:02:56,879 --> 00:03:02,239
So it's just whatever name you want to get.

45
00:03:02,239 --> 00:03:03,239
Okay.

46
00:03:03,239 --> 00:03:09,400
So there are other visualization libraries that exist out there.

47
00:03:09,400 --> 00:03:12,639
A lot of them are all of them build upon this one.

48
00:03:12,639 --> 00:03:15,959
So this is kind of the most basic library that you can get.

49
00:03:15,960 --> 00:03:21,560
And the other ones that exist build upon it by kind of doing some things behind the scenes

50
00:03:21,560 --> 00:03:27,879
to maybe make your lives easier or to do some really cool visualizations or maybe things

51
00:03:27,879 --> 00:03:32,800
where you can like hover the mouse over a coordinate and things like that.

52
00:03:32,800 --> 00:03:35,280
But we don't need to do any of that at this time.

53
00:03:35,280 --> 00:03:40,200
It's just nice to take a look at this really basic visualization library.

54
00:03:40,200 --> 00:03:44,319
So throughout the lecture, we're going to look a little bit at some code.

55
00:03:44,319 --> 00:03:50,519
We're going to run it on the Python file and we'll just talk about it on the slides.

56
00:03:50,519 --> 00:03:57,479
So whenever we're plotting things, we need to tell Python a set of x values and a set

57
00:03:57,479 --> 00:03:58,879
of y values.

58
00:03:58,879 --> 00:03:59,879
That's pretty common.

59
00:03:59,879 --> 00:04:05,439
If you've used matlab, you'll know that that's kind of the way it's done, same, and Python.

60
00:04:05,439 --> 00:04:11,280
So when we're creating the coordinates that we'd like to plot in a 2D plane, we're essentially

61
00:04:11,280 --> 00:04:13,599
just creating two lists.

62
00:04:13,599 --> 00:04:15,439
We're indexed by index.

63
00:04:15,439 --> 00:04:20,639
We're going to have a list containing all the values that we want for the x coordinate

64
00:04:20,639 --> 00:04:25,879
and in a separate list, all the values that we'd like for the y coordinate.

65
00:04:25,879 --> 00:04:31,959
So at index zero, in each of these lists, you're basically creating x values at index zero,

66
00:04:31,959 --> 00:04:36,800
y values at index zero becomes the one coordinate point.

67
00:04:36,800 --> 00:04:42,600
So one of the very simplest things that we can do is we can create a nice list of values

68
00:04:42,600 --> 00:04:45,160
that will be our x values.

69
00:04:45,160 --> 00:04:50,560
So our x axis will basically be the number zero through 29.

70
00:04:50,560 --> 00:04:58,600
And then down here, we can create four different lists containing four different y value coordinates.

71
00:04:58,600 --> 00:05:04,320
So when we're plotting, we're going to plot this x value list against all these linear

72
00:05:04,320 --> 00:05:09,040
points, this x value list against all these quadratic points, and this x value list against

73
00:05:09,040 --> 00:05:11,120
the cubic points and so on.

74
00:05:11,120 --> 00:05:17,079
So the way we're creating these lists are pretty familiar, a Python syntax.

75
00:05:17,079 --> 00:05:22,480
Our n is going through zero to 29, and then we're appending to the end of each one of these

76
00:05:22,480 --> 00:05:27,879
lists, linear quadratic cubic and exponential, some function of that.

77
00:05:27,879 --> 00:05:31,120
So the linear list will just have all the values again.

78
00:05:31,120 --> 00:05:34,000
So we're plotting zero zero, one, one, two, two, so on.

79
00:05:34,000 --> 00:05:39,399
The quadratic list will be plotting zero zero, one, one, two, four, three, nine, and so

80
00:05:39,399 --> 00:05:43,319
on, same with the cubic and then this exponential.

81
00:05:43,319 --> 00:05:47,799
I just chose randomly 1.5 to the power of n, just because it kind of looked nice in the

82
00:05:47,799 --> 00:05:53,439
plot, but you can imagine a different number for the exponential in there.

83
00:05:53,439 --> 00:06:00,839
So the way we plot some values is by not surprisingly the plot command.

84
00:06:00,839 --> 00:06:08,359
So PLT was how we decided to import that library as the name that we gave it.plot tells Python

85
00:06:08,360 --> 00:06:12,280
we'd like to plot some list of x and y values.

86
00:06:12,280 --> 00:06:17,240
So the parameters to the plot command are going to be two sequences of values.

87
00:06:17,240 --> 00:06:22,520
They can be lists typically, but they could also be tuples, they could also be, you know,

88
00:06:22,520 --> 00:06:26,720
the keys you get from a dictionary, that was also an iterable, things like that.

89
00:06:26,720 --> 00:06:30,199
So we have to pass in a list of numerical things.

90
00:06:30,199 --> 00:06:34,480
So this will be typically the stuff on your x-axis and the second parameter is going to

91
00:06:34,480 --> 00:06:38,080
be the function of those values of the x-axis.

92
00:06:38,079 --> 00:06:40,800
The lists have to be the same length, obviously.

93
00:06:40,800 --> 00:06:46,800
So Python knows which coordinates we're plotting if they're not the same length by accident,

94
00:06:46,800 --> 00:06:53,120
then Python will throw an error and then you don't, you know, it just won't plot anything.

95
00:06:53,120 --> 00:07:02,319
So when we run the code, Python will generally plot the values in either a new window or directly

96
00:07:02,319 --> 00:07:04,199
in line in the console.

97
00:07:04,199 --> 00:07:05,799
So right over here.

98
00:07:05,800 --> 00:07:11,600
So right in here, it could put the plot directly sort of in line with a bunch of stuff that

99
00:07:11,600 --> 00:07:13,160
you might print out.

100
00:07:13,160 --> 00:07:18,600
To toggle between that, just out of curiosity, you go to tools, preferences, ipython console

101
00:07:18,600 --> 00:07:22,879
graphics, and then here you can choose either automatic, which will make a new window for

102
00:07:22,879 --> 00:07:23,879
us.

103
00:07:23,879 --> 00:07:24,879
That's interactive.

104
00:07:24,879 --> 00:07:26,240
You can zoom in and out things like that.

105
00:07:26,240 --> 00:07:32,560
Or in line, which will just put the plot that you tell Python to generate directly in the

106
00:07:32,560 --> 00:07:33,960
console here.

107
00:07:33,959 --> 00:07:40,039
So I prefer the new window because it's easier for me to interact with it, so we'll do that.

108
00:07:40,039 --> 00:07:42,239
So let's actually run one of the plot commands.

109
00:07:42,239 --> 00:07:50,319
So plt.plot, we're plotting here the x-axis as just the number 0 through 29, and the y-axis

110
00:07:50,319 --> 00:07:52,839
is just going to also be the value 0 through 29.

111
00:07:52,839 --> 00:07:55,319
So we've made a nice little linear plot.

112
00:07:55,319 --> 00:07:59,560
And you notice it popped up a little window down here for me, and this is the plot that

113
00:07:59,560 --> 00:08:00,560
had generated.

114
00:08:00,560 --> 00:08:02,040
Yay, not surprising.

115
00:08:02,040 --> 00:08:06,800
This is exactly what we expected out of it.

116
00:08:06,800 --> 00:08:07,800
Okay.

117
00:08:07,800 --> 00:08:11,480
So what do we notice about that plot?

118
00:08:11,480 --> 00:08:16,680
We notice how Python nicely fit the line within this frame.

119
00:08:16,680 --> 00:08:20,519
So it added a little bit of wiggle room to the left and to the right of my line and to

120
00:08:20,519 --> 00:08:22,920
the below and above my line.

121
00:08:22,920 --> 00:08:26,480
Just so it fits nicely within the frame.

122
00:08:26,480 --> 00:08:29,960
It didn't zoom out to some standard 0 to 100 value.

123
00:08:29,960 --> 00:08:35,080
It zoomed into this 0 to 30-ish range, 0 to 30-ish on the y-axis range.

124
00:08:35,080 --> 00:08:41,120
So really, really nice that it did all that for us.

125
00:08:41,120 --> 00:08:44,000
The order of the points does matter in the list.

126
00:08:44,000 --> 00:08:49,200
So you'll notice one of the other things in this plot here is we gave it actual points

127
00:08:49,200 --> 00:08:51,039
that it needed to plot.

128
00:08:51,039 --> 00:08:55,159
But the plot command doesn't plot the points by default.

129
00:08:55,159 --> 00:08:57,679
Instead, it just connects all the points by line.

130
00:08:57,679 --> 00:09:01,879
So it connects consecutive indices of points by line.

131
00:09:01,879 --> 00:09:06,399
So it connected the 0, 0, 1, 1, 2, 2, and so on.

132
00:09:06,399 --> 00:09:09,120
So the order of the points does actually matter.

133
00:09:09,120 --> 00:09:14,719
If we have a function, for example, in this case, n and n squared.

134
00:09:14,720 --> 00:09:23,440
So n being 0 to 29 and n squared being 0, 1, 2, 4, 0, 1, 4, 9, and so on.

135
00:09:23,440 --> 00:09:24,920
But they're out of order.

136
00:09:24,920 --> 00:09:31,160
Python will just take consecutive pairs from those lists and connect them with a line.

137
00:09:31,160 --> 00:09:32,600
So here's an example.

138
00:09:32,600 --> 00:09:35,759
I've got my x-values lists.

139
00:09:35,759 --> 00:09:37,440
This is test samples.

140
00:09:37,440 --> 00:09:40,440
It's all the numbers 0 through 29 but out of order.

141
00:09:40,440 --> 00:09:43,279
And the test values associated with each one of those.

142
00:09:43,279 --> 00:09:45,799
Again, they are correct.

143
00:09:45,799 --> 00:09:47,199
This is 0 squared.

144
00:09:47,199 --> 00:09:48,600
This 25 is 5 squared.

145
00:09:48,600 --> 00:09:50,000
This 9 is 3 squared.

146
00:09:50,000 --> 00:09:52,000
But they're out of order.

147
00:09:52,000 --> 00:09:58,199
So if we run that, just with a pure plot command,

148
00:09:58,199 --> 00:10:03,720
we're going to get some garbage plot.

149
00:10:03,720 --> 00:10:05,600
Doesn't look very nice.

150
00:10:05,600 --> 00:10:08,519
And we already know what's wrong, right?

151
00:10:08,519 --> 00:10:12,799
Python just connected 0, 0, 5, 25.

152
00:10:12,799 --> 00:10:15,759
And then, you know, 3, 9 by a line.

153
00:10:15,759 --> 00:10:18,839
Not really very nice.

154
00:10:18,839 --> 00:10:25,079
Instead, what we'd like to do is to just tell Python to plot the points.

155
00:10:25,079 --> 00:10:27,519
So I don't care about connecting them with a line.

156
00:10:27,519 --> 00:10:32,759
In this case, I would tell Python instead of just plotting it to create a scatter plot for me.

157
00:10:32,759 --> 00:10:40,439
So plt.scatter with the same list of x and y values is going to just create for me

158
00:10:40,440 --> 00:10:46,120
this nice plot where plots the coordinates doesn't matter that they're out of order because

159
00:10:46,120 --> 00:10:48,600
they just get plotted without anything connecting them.

160
00:10:48,600 --> 00:10:49,600
Right?

161
00:10:49,600 --> 00:10:52,680
Pretty nice.

162
00:10:52,680 --> 00:10:55,320
So that's this example that we just did here.

163
00:10:55,320 --> 00:11:00,920
And then this is us doing a scatter plot giving us this nice plot.

164
00:11:00,920 --> 00:11:01,920
Okay.

165
00:11:01,920 --> 00:11:06,640
One of the other things that you might want to do is to have a whole bunch of lines being

166
00:11:06,640 --> 00:11:10,040
plotted on one window, right?

167
00:11:10,039 --> 00:11:15,919
So to do that, all you have to tell Python is just a sequence of all the commands, all

168
00:11:15,919 --> 00:11:20,319
the plotting commands, or everything that you'd like to plot on the one figure.

169
00:11:20,319 --> 00:11:24,599
So without telling Python, you'd like to create a new figure.

170
00:11:24,599 --> 00:11:29,639
Any time it sees a plot command, it will just keep adding whatever points get generated

171
00:11:29,639 --> 00:11:33,519
or whatever lines get generated to the current figure that's open.

172
00:11:33,519 --> 00:11:36,399
So we just have one thing that's open right now.

173
00:11:36,399 --> 00:11:40,079
So it'll just keep adding stuff to our figure.

174
00:11:40,079 --> 00:11:42,519
So here I've got four plotting commands in a row.

175
00:11:42,519 --> 00:11:46,519
I've never explicitly told Python to create a new figure for me.

176
00:11:46,519 --> 00:11:51,199
So it's just going to add all four of these lines to the same plot.

177
00:11:51,199 --> 00:11:53,120
So it just doesn't create a new figure.

178
00:11:53,120 --> 00:11:55,519
It just keeps adding stuff to my plot.

179
00:11:55,519 --> 00:11:59,679
So you can imagine if I added a scatter plot as well, it would just add the individual

180
00:11:59,679 --> 00:12:01,879
dots to this plot.

181
00:12:01,879 --> 00:12:03,679
Okay.

182
00:12:04,679 --> 00:12:08,679
So again, what do we notice?

183
00:12:08,679 --> 00:12:13,799
Well, Python nicely framed everything for me, right?

184
00:12:13,799 --> 00:12:19,120
To make sure that every line that I have fits within this graph.

185
00:12:19,120 --> 00:12:22,120
So my x-axis is comfortably between 0 and 30.

186
00:12:22,120 --> 00:12:26,639
My y-axis is also comfortably between 0 and 120,000.

187
00:12:26,639 --> 00:12:32,120
So there's a little bit of gap up at that top of that exponential line.

188
00:12:32,120 --> 00:12:38,879
But this leads us, if we were presented this graph, to kind of mistakenly not know what's

189
00:12:38,879 --> 00:12:41,039
going on with these bottom lines here, right?

190
00:12:41,039 --> 00:12:46,480
So this is our linear, the blue line, and the orange one is the quadratic.

191
00:12:46,480 --> 00:12:48,639
We're not really sure what's going on down there, right?

192
00:12:48,639 --> 00:12:54,679
Because the scales are just, it's just, the y-scale is just too high.

193
00:12:54,679 --> 00:13:01,000
So in this particular case, it would be better to visualize the data in separate different

194
00:13:01,000 --> 00:13:02,000
windows, right?

195
00:13:02,559 --> 00:13:10,000
And instead of having everything be plotted in one window, we're going to tell Python to

196
00:13:10,000 --> 00:13:14,399
create a new window and plot some stuff in it.

197
00:13:14,399 --> 00:13:21,639
So the way we tell Python to create a new window for us is with the command PLT dot figure.

198
00:13:21,639 --> 00:13:26,919
So as soon as Python sees PLT dot figure, it will create a new window, bring it to the

199
00:13:26,919 --> 00:13:32,199
foreground, and any for their plotting commands will be added to this new figure.

200
00:13:32,199 --> 00:13:37,120
So there's a parameter that this figure can take, and that's going to be the name of the

201
00:13:37,120 --> 00:13:38,120
figure.

202
00:13:38,120 --> 00:13:42,679
So when you have a window at the top, there's, it has a name for like the name of the program

203
00:13:42,679 --> 00:13:43,959
or whatever's running.

204
00:13:43,959 --> 00:13:49,639
Well, the string that you put in there is going to be the name that you give to that figure.

205
00:13:49,639 --> 00:13:54,360
If Python doesn't have a figure with that name already there, it creates a new figure,

206
00:13:54,360 --> 00:13:55,919
brings it to the foreground.

207
00:13:55,919 --> 00:14:00,639
And if there's a figure with that name already there, and you just happen to call PLT dot

208
00:14:00,639 --> 00:14:07,279
figure with that same name, it'll just re-bring that window up to the foreground again to

209
00:14:07,279 --> 00:14:11,000
re-add more stuff to it.

210
00:14:11,000 --> 00:14:14,479
So we're going to look at this example here.

211
00:14:14,479 --> 00:14:17,279
We've got a whole bunch of stuff being plotted.

212
00:14:17,279 --> 00:14:23,399
So the first two lines of code here, first we've got a new figure being created, and we

213
00:14:23,399 --> 00:14:25,120
called it expo.

214
00:14:25,120 --> 00:14:31,320
And then this plot command here coming up right after the figure will add this exponential

215
00:14:31,320 --> 00:14:34,759
that we created to that expo figure.

216
00:14:34,759 --> 00:14:37,720
Then we've got a PLT dot figure right after that.

217
00:14:37,720 --> 00:14:41,360
So Python will bring this new figure to the foreground.

218
00:14:41,360 --> 00:14:47,080
And the plot command that comes right after that will add the linear, this line, to this

219
00:14:47,080 --> 00:14:48,080
new figure.

220
00:14:48,080 --> 00:14:49,799
Right that we called Lynn.

221
00:14:49,799 --> 00:14:53,560
A couple more times we're going to create, do the same thing to create this quad and this

222
00:14:53,559 --> 00:14:57,799
cube and those will each get one line added to them.

223
00:14:57,799 --> 00:15:03,000
And then down here we're going to say, well, let me just go back to that exponential figure

224
00:15:03,000 --> 00:15:05,799
and add another different exponential curve to it.

225
00:15:05,799 --> 00:15:11,519
So we're going to create the exponential curve this time 1.6 to the power of i instead of

226
00:15:11,519 --> 00:15:14,279
1.5 to the power of i.

227
00:15:14,279 --> 00:15:18,879
Then we're going to tell Python to bring the figure called expo back up to the foreground.

228
00:15:18,879 --> 00:15:21,239
So remember we created it up here.

229
00:15:21,240 --> 00:15:22,879
So it doesn't create a new figure.

230
00:15:22,879 --> 00:15:26,720
It'll just bring that one back up and it already has a curve in it.

231
00:15:26,720 --> 00:15:32,240
And then we're going to tell Python to plot a second curve to it.

232
00:15:32,240 --> 00:15:37,480
So let's see that.

233
00:15:37,480 --> 00:15:39,279
That's all this code right here.

234
00:15:39,279 --> 00:15:40,519
Run it.

235
00:15:40,519 --> 00:15:42,519
Okay.

236
00:15:42,519 --> 00:15:47,799
So not just one figure, one window got created but four.

237
00:15:47,799 --> 00:15:51,919
So this is my cube and you can see up in the top here a little hard to see but that's

238
00:15:51,919 --> 00:15:54,039
the name that we gave it.

239
00:15:54,039 --> 00:15:55,959
This is my quad.

240
00:15:55,959 --> 00:16:01,120
This is my linear and this is my exponential.

241
00:16:01,120 --> 00:16:07,319
So we see the exponential one has two lines in it because we added one way at the beginning

242
00:16:07,319 --> 00:16:15,000
and then we brought it back for processing to add another line to it.

243
00:16:15,000 --> 00:16:20,679
So again, just so you know these graphs are actually on the slide.

244
00:16:20,679 --> 00:16:21,679
This is the quad one.

245
00:16:21,679 --> 00:16:22,679
This is the cube one.

246
00:16:22,679 --> 00:16:24,399
This is the linear one.

247
00:16:24,399 --> 00:16:25,879
And this is the exponential one.

248
00:16:25,879 --> 00:16:31,519
The blue line was our original curve 1.5 to the power of x and the orange one is 1.6 to

249
00:16:31,519 --> 00:16:32,519
the power of x.

250
00:16:32,519 --> 00:16:36,159
So they both got added to the same plot.

251
00:16:36,159 --> 00:16:38,360
So again, just something to note.

252
00:16:38,360 --> 00:16:44,480
You'll see how Python nicely framed our lines so that it's able to fit everything that

253
00:16:44,480 --> 00:16:48,480
it needs to plot within this graph.

254
00:16:48,480 --> 00:16:50,480
Okay.

255
00:16:50,480 --> 00:16:55,120
So what we're going to do next, I know that was a little bit tedious, but what we're going

256
00:16:55,120 --> 00:16:59,800
to do next is we're going to start looking at some real-world data.

257
00:16:59,800 --> 00:17:05,480
So first we're going to do some toy real-world data and then soon we're going to start dealing

258
00:17:05,480 --> 00:17:09,960
with some actual data sets that we're going to read in.

259
00:17:09,960 --> 00:17:11,680
We're going to plot.

260
00:17:11,680 --> 00:17:16,000
We're going to investigate, try to answer some questions about them and things like that.

261
00:17:16,000 --> 00:17:23,480
So first let's look at this real-life example where we've got months and temperatures for

262
00:17:23,480 --> 00:17:24,799
each of those months.

263
00:17:24,799 --> 00:17:32,120
So notice the months here is actually this value that this range returns, which is like

264
00:17:32,120 --> 00:17:34,240
an iterable, like a tuple.

265
00:17:34,240 --> 00:17:36,080
So it's still a sequence of values.

266
00:17:36,079 --> 00:17:43,319
It's not a list, but totally fine to be passed in as an argument to the plot committee.

267
00:17:43,319 --> 00:17:50,000
And temps, of course, are going to be temperatures corresponding to each of those months as a list.

268
00:17:50,000 --> 00:17:56,639
So the plot looks something like this if we actually run that code.

269
00:17:56,639 --> 00:17:57,639
What do we notice?

270
00:17:57,639 --> 00:18:02,199
Well, just like before, map plot lived nicely framed our data.

271
00:18:02,199 --> 00:18:03,199
Right?

272
00:18:03,199 --> 00:18:06,039
It's got a little bit of wiggle room left and right top and bottom.

273
00:18:06,039 --> 00:18:08,799
It automatically selected the scales, right?

274
00:18:08,799 --> 00:18:14,279
How low to go, how high to go, and the tick marks for this.

275
00:18:14,279 --> 00:18:21,240
But let's say that you're the advisor to a student and they came to you with a plot that

276
00:18:21,240 --> 00:18:23,639
looked like this.

277
00:18:23,639 --> 00:18:29,480
Would you be able to tell anything about this plot, right, without knowing exactly what the

278
00:18:29,480 --> 00:18:32,000
code that generated this plot is?

279
00:18:32,000 --> 00:18:33,519
Not really, right?

280
00:18:33,519 --> 00:18:35,240
It just looks like a bump.

281
00:18:35,240 --> 00:18:37,039
It could be any sort of data.

282
00:18:37,039 --> 00:18:41,400
So what we'd like to do before actually, you know, for your ups and things like that in

283
00:18:41,400 --> 00:18:48,039
the future, before presenting a plot to somebody else, you'll want to add a title and you'll

284
00:18:48,039 --> 00:18:51,119
want to label your axis, right?

285
00:18:51,119 --> 00:18:58,240
So what we want to do in addition to actually plotting the data is to tell Python to add

286
00:18:58,240 --> 00:19:02,480
for us a title and labels for our axis.

287
00:19:02,480 --> 00:19:06,319
So we do this using these three lines of code here.

288
00:19:06,319 --> 00:19:10,839
So since we haven't told Python to create a new figure or anything like that, anything,

289
00:19:10,839 --> 00:19:15,559
any commands that we do with regards to plotting will just get added onto this figure.

290
00:19:15,559 --> 00:19:24,720
So here I've got Python adding this title, these two labels to our axis, to our axes.

291
00:19:24,720 --> 00:19:29,120
So here I've got this and this plot.

292
00:19:29,119 --> 00:19:35,039
So I run it and tada, we have something that looks much nicer, right?

293
00:19:35,039 --> 00:19:42,199
So now we can hand this plot to somebody and they'll know what it's about.

294
00:19:42,199 --> 00:19:49,199
Now that's fine, but since it's temperatures, what I'd really like to do is to say, well,

295
00:19:49,199 --> 00:19:53,839
the temperature, the lowest temperature I have should really start at the y axis here,

296
00:19:53,839 --> 00:19:55,759
this intersect with the y axis.

297
00:19:55,759 --> 00:19:59,680
And the highest temperature I've got, I don't really want that wiggle room because this is

298
00:19:59,680 --> 00:20:02,400
my last temperature value.

299
00:20:02,400 --> 00:20:05,920
Let's just have the frame just end there.

300
00:20:05,920 --> 00:20:11,079
So we can do that little change by setting limits on our x axis, right?

301
00:20:11,079 --> 00:20:18,839
So here I'm going to limit the x axis to say that it starts from one and ends at 12.

302
00:20:18,839 --> 00:20:24,319
So if I do that, again, that's just a little command we put in continuation with the rest

303
00:20:24,319 --> 00:20:27,679
of the commands and it gets applied to this plot.

304
00:20:27,679 --> 00:20:33,720
So as soon as I do that, Python now creates for me the same plot except that the y axis

305
00:20:33,720 --> 00:20:37,319
starts at one and ends at 12 nicely framed within here, right?

306
00:20:37,319 --> 00:20:41,559
So no more wiggle room.

307
00:20:41,559 --> 00:20:44,919
Still some improvements to be made to this plot.

308
00:20:44,919 --> 00:20:47,639
As in here the months skip, right?

309
00:20:47,640 --> 00:20:56,960
So Python decided that it's best to just show 2, 4, 6, 8, 10, 12 as the ticks on the x axis.

310
00:20:56,960 --> 00:21:03,160
But I decided that since I'm showing all the months of the year and their temperatures,

311
00:21:03,160 --> 00:21:07,720
I would really like to have ticks for every single month.

312
00:21:07,720 --> 00:21:10,680
So again, a little command will do that for us.

313
00:21:10,680 --> 00:21:18,700
So plt.x ticks takes in a tuple of all of the places where you'd like one of those little

314
00:21:18,700 --> 00:21:21,160
ticks to be created, okay?

315
00:21:21,160 --> 00:21:27,039
So if we do that, again, just another little command in series here.

316
00:21:27,039 --> 00:21:32,279
If we do that, Python now fills in the ticks for every single spot that we told it to fill

317
00:21:32,279 --> 00:21:33,840
it, right?

318
00:21:33,840 --> 00:21:39,000
So it's looking way better already, right?

319
00:21:39,000 --> 00:21:40,480
But still not quite right.

320
00:21:40,480 --> 00:21:44,240
I promise this will be the last improvement we make.

321
00:21:44,240 --> 00:21:48,440
I personally find it hard to map numbers to the months.

322
00:21:48,440 --> 00:21:50,799
I still count my fingers.

323
00:21:50,799 --> 00:21:59,200
So what would be nice is to say, well, instead of having numbers on my x axis, I would like

324
00:21:59,200 --> 00:22:02,880
to have the actual names of my months, right?

325
00:22:02,880 --> 00:22:05,400
Jan, Feb, Mar, and so on.

326
00:22:05,400 --> 00:22:11,200
So to do that, we're going to make one small change to our x ticks command here.

327
00:22:11,200 --> 00:22:13,880
We're going to give it a second parameter.

328
00:22:13,880 --> 00:22:18,840
So first one is, of course, what we had before saying these are all the ticks that I would

329
00:22:18,840 --> 00:22:20,360
like to have.

330
00:22:20,360 --> 00:22:24,519
And the second parameter is the labels for each one of those ticks.

331
00:22:24,519 --> 00:22:26,800
So one by one, they'll be mapped.

332
00:22:26,800 --> 00:22:30,000
So one will be mapped to Jan, two will be mapped to Feb, and so on.

333
00:22:30,000 --> 00:22:39,039
So instead of using the numerical values, Python will create for us the string values that

334
00:22:39,039 --> 00:22:40,559
I've told it to do.

335
00:22:40,559 --> 00:22:42,839
So here it is, run.

336
00:22:42,839 --> 00:22:44,960
Creates for me this very nice looking plot.

337
00:22:44,960 --> 00:22:49,920
So this, I would be happy to receive as an advisor compared to that very first one that

338
00:22:49,920 --> 00:22:53,920
we had.

339
00:22:53,920 --> 00:22:54,920
All right.

340
00:22:54,920 --> 00:22:55,920
Questions so far?

341
00:22:55,920 --> 00:22:57,920
Do you see them all right?

342
00:22:58,240 --> 00:22:59,240
Okay.

343
00:22:59,240 --> 00:23:00,240
Okay.

344
00:23:00,240 --> 00:23:05,160
The other thing that you can do is potentially add grid lines if you wanted to.

345
00:23:05,160 --> 00:23:08,800
So PLT.Grid will either toggle the grid lines on and off.

346
00:23:08,800 --> 00:23:11,680
So if there's already grid lines, it'll toggle them off.

347
00:23:11,680 --> 00:23:15,120
When it sees that command, if there are now grid lines, it'll toggle them on.

348
00:23:15,120 --> 00:23:19,320
So you could potentially have a bunch of PLT.Grid commands that keep toggling things on and

349
00:23:19,320 --> 00:23:20,320
off.

350
00:23:20,559 --> 00:23:23,399
Okay.

351
00:23:23,399 --> 00:23:30,319
So that was us plotting one city's temperature values for a year.

352
00:23:30,319 --> 00:23:32,279
Let's say an average.

353
00:23:32,279 --> 00:23:36,480
Let's say that we wanted to plot two different cities.

354
00:23:36,480 --> 00:23:38,759
The code to do that is as follows.

355
00:23:38,759 --> 00:23:43,119
So again, we've got months being this range, one through 12, inclusive.

356
00:23:43,119 --> 00:23:45,559
I've got a list of all the Boston temperatures here.

357
00:23:45,559 --> 00:23:46,559
I plot that.

358
00:23:46,559 --> 00:23:48,480
I list of all the Phoenix temperatures here.

359
00:23:48,480 --> 00:23:49,480
And I plot that.

360
00:23:49,480 --> 00:23:54,360
So I'm going to add some labels to my graph.

361
00:23:54,360 --> 00:23:59,559
So like that.

362
00:23:59,559 --> 00:24:06,000
So if I run that, we get something that looks like this.

363
00:24:06,000 --> 00:24:11,960
Now of course, I could kind of remove those little wiggle rooms on the left and right, but

364
00:24:11,960 --> 00:24:14,519
for now it's fine.

365
00:24:14,519 --> 00:24:16,720
What's missing from this plot?

366
00:24:16,720 --> 00:24:21,039
Let's say you didn't see the code and you were just given this plot.

367
00:24:21,039 --> 00:24:23,880
Yeah, exactly.

368
00:24:23,880 --> 00:24:29,720
I don't know what, yes, these are different temperatures from the title and the labels,

369
00:24:29,720 --> 00:24:32,759
but you don't know which city is which, exactly.

370
00:24:32,759 --> 00:24:40,360
So what we'd like to do is tell Python how to label these two lines, right?

371
00:24:40,360 --> 00:24:45,240
So to do that, it's just an extra parameter here in the plot command.

372
00:24:45,240 --> 00:24:50,980
So when you tell it which data to plot, you can also tell it what label that data should

373
00:24:50,980 --> 00:24:51,980
get.

374
00:24:51,980 --> 00:24:56,920
So here I've got Boston label for the first one, Phoenix label for the second one.

375
00:24:56,920 --> 00:25:01,400
And then you tell Python to add a legend to your plot.

376
00:25:01,400 --> 00:25:04,240
So here the parameter is the location for the legend.

377
00:25:04,240 --> 00:25:08,900
And best just means Python should decide where to put the legend, top left, top right,

378
00:25:08,900 --> 00:25:09,900
middle, wherever.

379
00:25:09,900 --> 00:25:15,500
So it doesn't really interfere much with the data or you can just tell it where to put

380
00:25:15,500 --> 00:25:16,500
that legend, right?

381
00:25:16,500 --> 00:25:21,540
So you can force the legend to be in a particular spot.

382
00:25:21,540 --> 00:25:25,620
So here I've got already labeled data and then we add the legend.

383
00:25:25,620 --> 00:25:29,420
And now you can see in this particular case it decided to put it in the top right, but

384
00:25:29,420 --> 00:25:31,860
again, you could force it to go somewhere else.

385
00:25:31,860 --> 00:25:35,259
Bottom middle seemed like a fine choice as well.

386
00:25:35,259 --> 00:25:36,259
Okay.

387
00:25:36,259 --> 00:25:37,259
Okay.

388
00:25:37,259 --> 00:25:39,620
Very nice.

389
00:25:39,619 --> 00:25:44,259
So now we've got Python.

390
00:25:44,259 --> 00:25:49,939
You know, it automatically did the X and Y axes for us as we told it to do, but the colors

391
00:25:49,939 --> 00:25:51,379
that it picked were random.

392
00:25:51,379 --> 00:25:57,219
Now we can specify a bunch of different details for the plot.

393
00:25:57,219 --> 00:26:01,500
So we're going to do that next just to show you that you can.

394
00:26:01,500 --> 00:26:05,259
So we're going to choose different colors and different styles for our plots.

395
00:26:05,259 --> 00:26:11,700
We're going to choose different widths for our lines and then maybe we can, and then

396
00:26:11,700 --> 00:26:12,980
we'll also add some markers.

397
00:26:12,980 --> 00:26:16,740
So where exactly each data point we have we're going to mark.

398
00:26:16,740 --> 00:26:18,980
And then I'll show you how you can create subplots.

399
00:26:18,980 --> 00:26:23,500
So instead of creating new windows, you can actually have one window with different little

400
00:26:23,500 --> 00:26:25,339
subplots with it.

401
00:26:25,339 --> 00:26:26,339
Okay.

402
00:26:26,339 --> 00:26:33,460
So the first thing we're going to do, see is how to customize the data to have a certain

403
00:26:33,460 --> 00:26:36,140
line style and a certain color.

404
00:26:36,140 --> 00:26:39,420
So there's a shorthand notation to do this.

405
00:26:39,420 --> 00:26:44,860
Instead of actually passing in the parameter name in the plot command, we could do it shorthand

406
00:26:44,860 --> 00:26:45,860
notation.

407
00:26:45,860 --> 00:26:48,579
So you might have already noticed this little extra bit here.

408
00:26:48,579 --> 00:26:52,140
So more you use it, the more you'll get used to it.

409
00:26:52,140 --> 00:26:57,019
But this basically tells Python that I would like this plot, this line corresponding to

410
00:26:57,019 --> 00:27:03,019
this data to be blue, that's what the B stands for, and to be a solid line.

411
00:27:03,019 --> 00:27:05,500
Okay, that's what that little dash means.

412
00:27:05,500 --> 00:27:10,940
The Phoenix one, you may have guessed, tells Python that I would like this one to be red,

413
00:27:10,940 --> 00:27:13,859
R for red, and to be a dashed line.

414
00:27:13,859 --> 00:27:17,740
And then the last one, I'm going to add one more temperature here, temperature data for

415
00:27:17,740 --> 00:27:18,740
Minneapolis.

416
00:27:18,740 --> 00:27:24,779
I would like this one to be green, and a dash dot, dash dot line.

417
00:27:24,779 --> 00:27:35,779
So we can run that.

418
00:27:35,779 --> 00:27:38,099
And it looks something like this.

419
00:27:38,099 --> 00:27:43,460
All right, so if you've got my solid blue line for Boston, my dashed line for Phoenix,

420
00:27:43,460 --> 00:27:47,259
and my dashed dot, dashed dot line for Minneapolis.

421
00:27:47,259 --> 00:27:48,259
Okay.

422
00:27:48,259 --> 00:27:50,259
Very nice.

423
00:27:50,259 --> 00:27:55,619
Now instead of doing that shorthand notation where we've got this one parameter that just

424
00:27:55,619 --> 00:28:02,379
somehow magically knows the color and the style based on just being passed in, we can actually

425
00:28:02,379 --> 00:28:10,140
tell Python the parameter values that it should, that correspond to the color.

426
00:28:10,140 --> 00:28:14,900
So here I've got color equals B for blue, and then the correspond to the line style.

427
00:28:14,900 --> 00:28:20,099
So here line style equals, and then you explicitly pass in the line style that you'd like.

428
00:28:20,099 --> 00:28:25,539
So this may be more intuitive according to what we've learned, but Python does allow you

429
00:28:25,539 --> 00:28:29,219
the option to kind of do it all in one.

430
00:28:29,219 --> 00:28:35,339
So if we do, if we run it with these specific explicit parameters, then we'll get the exact

431
00:28:35,339 --> 00:28:36,339
same graph as before.

432
00:28:36,339 --> 00:28:37,980
All right, no surprise.

433
00:28:37,980 --> 00:28:38,980
Okay.

434
00:28:38,980 --> 00:28:42,179
So there's a lot of options that we can have here.

435
00:28:42,179 --> 00:28:44,579
So these are all the line style options.

436
00:28:44,579 --> 00:28:47,259
You can also add a dotted line, which I didn't show.

437
00:28:47,259 --> 00:28:48,619
These are all the color options.

438
00:28:48,619 --> 00:28:49,619
Plus many more.

439
00:28:49,619 --> 00:28:54,339
You could also pass in the RGB values, or maybe the hex values if you want a very specific

440
00:28:54,339 --> 00:28:56,899
shade of magenta or something.

441
00:28:56,899 --> 00:29:01,219
And then we can also add markers to our lines.

442
00:29:01,219 --> 00:29:04,619
We haven't seen this yet, but let's do that next.

443
00:29:04,619 --> 00:29:11,099
So let's say that I would like to have the actual data points that I've plotted show up in

444
00:29:11,099 --> 00:29:12,099
my lines, right?

445
00:29:12,099 --> 00:29:16,459
Right now the lines just get connected, or so the data points just get connected with our

446
00:29:16,460 --> 00:29:21,740
lines, dashed or dotted, or whatever we chose, but the data points themselves don't show

447
00:29:21,740 --> 00:29:23,380
up with markers.

448
00:29:23,380 --> 00:29:27,940
So again, in short-hand notation, we can tell Python, hey, let's add these markers.

449
00:29:27,940 --> 00:29:33,140
So here I'm telling Python to just do a dot for this blue solid line.

450
00:29:33,140 --> 00:29:37,860
Here I'm telling Python to do a larger dot for this red dashed line.

451
00:29:37,860 --> 00:29:42,779
And here I'm telling it to do a star for the green dash dot dashed dot line.

452
00:29:43,779 --> 00:29:47,099
Right, so that's down here.

453
00:29:47,099 --> 00:29:48,259
Run it.

454
00:29:48,259 --> 00:29:54,539
And now we see nice little markers for every one of our data points, right?

455
00:29:54,539 --> 00:29:57,420
So we can also do triangles, we can do squares.

456
00:29:57,420 --> 00:30:02,220
There's lots of other marker options, and they're all existing, the documentation for

457
00:30:02,220 --> 00:30:03,220
Matplotlib.

458
00:30:03,220 --> 00:30:04,220
Okay?

459
00:30:04,220 --> 00:30:06,259
So this is what we got.

460
00:30:06,259 --> 00:30:09,019
Perfect.

461
00:30:09,019 --> 00:30:14,339
The last thing that we can do is to add thickness to our lines.

462
00:30:14,339 --> 00:30:20,660
So oftentimes it's good to, first of all, delineate the lines using dashes or dots and things

463
00:30:20,660 --> 00:30:23,059
like that, but also width.

464
00:30:23,059 --> 00:30:27,779
So here another parameter passed in, the line width, this is going to be a skinny line,

465
00:30:27,779 --> 00:30:33,139
this is going to be maybe a thicker line, and this one's going to be unreasonably thick.

466
00:30:33,140 --> 00:30:36,060
So let's see exactly what this will look like.

467
00:30:36,060 --> 00:30:39,420
It's going to look super weird.

468
00:30:39,420 --> 00:30:44,140
Yeah.

469
00:30:44,140 --> 00:30:47,380
As I said, unreasonably thick line, but there it is.

470
00:30:47,380 --> 00:30:54,820
And then you can see that the legend itself also adjusted to whatever you chose for your

471
00:30:54,820 --> 00:30:57,820
line styles.

472
00:30:57,820 --> 00:30:59,820
Right?

473
00:30:59,820 --> 00:31:00,820
Okay.

474
00:31:00,819 --> 00:31:04,220
So yeah, that's exactly what I said.

475
00:31:04,220 --> 00:31:06,259
Cool.

476
00:31:06,259 --> 00:31:09,099
Last thing I want to talk about is subplots.

477
00:31:09,099 --> 00:31:14,740
So right now, the only things that we've kind of learned about plotting is you either plot

478
00:31:14,740 --> 00:31:20,579
every line that you have on one figure, or you create a new figure, and then it becomes

479
00:31:20,579 --> 00:31:27,099
a new window that you have to kind of switch between for whatever you'd like to plot.

480
00:31:27,099 --> 00:31:32,819
Oftentimes, what's really nice to do is to create only one figure.

481
00:31:32,819 --> 00:31:36,740
So you have only one thing that pops up, right?

482
00:31:36,740 --> 00:31:38,259
Like one window.

483
00:31:38,259 --> 00:31:42,099
And within that window, with some name here, right?

484
00:31:42,099 --> 00:31:46,740
And within that window, you can create a bunch of different subplots.

485
00:31:46,740 --> 00:31:53,179
So here I've created six different subplots.

486
00:31:53,180 --> 00:31:58,660
So we can tell that to Python, and we do that using the subplot command.

487
00:31:58,660 --> 00:32:06,660
So in this particular case, I've told Python to create for me a subplot with two rows.

488
00:32:06,660 --> 00:32:10,740
That's what the first parameter says, and one column.

489
00:32:10,740 --> 00:32:12,620
That's what the second parameter says.

490
00:32:12,620 --> 00:32:16,860
So here, this is one window with two positions in it.

491
00:32:16,859 --> 00:32:23,179
The third parameter tells Python which one of these positions to open for adding lines

492
00:32:23,179 --> 00:32:25,339
to, or data to.

493
00:32:25,339 --> 00:32:30,240
So one means this is the one that you're opening, and two means this is the second one that

494
00:32:30,240 --> 00:32:31,240
you're opening.

495
00:32:31,240 --> 00:32:40,059
So you can see here, the very top subplot command tells Python to open up this one for editing

496
00:32:40,059 --> 00:32:41,059
basically.

497
00:32:41,059 --> 00:32:43,099
So we're going to add to it the Boston temperature.

498
00:32:43,099 --> 00:32:48,319
So this is all the plotting commands and all the labels and everything after it belong

499
00:32:48,319 --> 00:32:50,299
to this top subplot here.

500
00:32:50,299 --> 00:32:56,199
And then subplot command down here tells Python that on this figure with two rows and one

501
00:32:56,199 --> 00:33:00,980
column, I would like to now open position number two for editing, and then everything that

502
00:33:00,980 --> 00:33:06,980
I have thereafter gets added to the subplot at this position.

503
00:33:06,980 --> 00:33:10,019
So the way that this is going to look is as follows.

504
00:33:10,019 --> 00:33:15,900
So I've got this, this is just one window that gets created, and you can see the top one

505
00:33:15,900 --> 00:33:24,139
has the Boston temperature and the bottom one has the Phoenix temperature.

506
00:33:24,139 --> 00:33:27,700
At first glance, does this look right in terms of temperatures?

507
00:33:27,700 --> 00:33:34,099
Like, if you're just to look at the pictures themselves.

508
00:33:34,099 --> 00:33:39,700
I don't know about you, but I, at first glance, I thought that the temperature is for

509
00:33:39,700 --> 00:33:46,299
Boston and Phoenix were the same because I didn't look closely at the y-axis.

510
00:33:46,299 --> 00:33:50,500
It kind of looked like, hey, they both bottom out in the same way, they both top out in the

511
00:33:50,500 --> 00:33:53,059
same way, so they look very similar to me.

512
00:33:53,059 --> 00:33:58,259
But if we inspect the y-axis closer, we see that the Boston temperature starts at 30

513
00:33:58,259 --> 00:34:04,740
goes to 70, but the Phoenix one starts at, you know, what is this, 50 and goes to 90.

514
00:34:04,740 --> 00:34:11,099
So if we're presenting plots in one figure, what would be really nice to do is to make

515
00:34:11,099 --> 00:34:16,980
sure that the axes are both bounded in a similar way, especially if we're plotting similar

516
00:34:16,980 --> 00:34:17,980
data, right?

517
00:34:17,980 --> 00:34:20,300
Temperature in this particular case.

518
00:34:20,300 --> 00:34:30,579
So in our code, what we'd also like to do is set limits on our axes, and just the y-axis,

519
00:34:30,579 --> 00:34:32,340
because the x-axis is the same, right?

520
00:34:32,340 --> 00:34:38,500
So here I can limit the y-axis from 0 to 100, the reasonable set of temperatures in

521
00:34:38,500 --> 00:34:40,620
Fahrenheit, right?

522
00:34:40,620 --> 00:34:47,059
So if I fix these temperature limits from 0 to 100, and now I plot, I get something that

523
00:34:47,059 --> 00:34:48,620
looks like this.

524
00:34:48,620 --> 00:34:52,820
And now at first glance, this makes a lot more sense to me, right?

525
00:34:52,820 --> 00:35:00,660
I've got the Phoenix temperatures, you know, seem to be for this year, on average, higher

526
00:35:00,659 --> 00:35:05,659
than the Boston temperatures.

527
00:35:05,659 --> 00:35:07,739
Okay.

528
00:35:07,739 --> 00:35:11,619
So we can plot now multiple, we can create multiple subplots.

529
00:35:11,619 --> 00:35:16,099
So here, you know, in the previous example, I just had two, top and bottom.

530
00:35:16,099 --> 00:35:21,099
But I can create as many subplots as I'd like within my window.

531
00:35:21,099 --> 00:35:27,059
So when I create them, and I tell Python how many rows and columns I have, in this particular

532
00:35:27,059 --> 00:35:30,619
example I just drew here, I have three rows.

533
00:35:30,619 --> 00:35:31,619
Those, right?

534
00:35:31,619 --> 00:35:33,380
And two columns.

535
00:35:33,380 --> 00:35:39,219
So the third parameter that I pass in will basically tell Python which one of these subplots

536
00:35:39,219 --> 00:35:41,500
to open up for processing.

537
00:35:41,500 --> 00:35:45,139
So this will be the first one, this will be the second one, kind of the way we read.

538
00:35:45,139 --> 00:35:48,659
Third, fourth, fifth, and sixth.

539
00:35:48,659 --> 00:35:54,339
So that third parameter to these subplot commands will be either 1, 2, 3, 4, 5, or 6, telling

540
00:35:54,339 --> 00:35:59,699
Python which one of these sections I'm going to add plots to.

541
00:35:59,699 --> 00:36:03,619
In this particular case, I had a Boston Phoenix and Minneapolis temperature.

542
00:36:03,619 --> 00:36:06,819
So I'm just creating a 2 by 2 matrix.

543
00:36:06,819 --> 00:36:12,899
So here I just have this thing that looks like this, a figure with these four subplots.

544
00:36:12,899 --> 00:36:18,599
And I am going to add the Boston one over here, the Phoenix one over here, and then the

545
00:36:18,599 --> 00:36:22,299
Minneapolis down here, right?

546
00:36:22,299 --> 00:36:28,939
So 1, 2, and 3 as my subplot, that subplots that I'm opening.

547
00:36:28,940 --> 00:36:32,340
Coming in four, so that fourth spot will just be empty.

548
00:36:32,340 --> 00:36:34,539
So the plots will look something like this.

549
00:36:34,539 --> 00:36:37,300
And I haven't changed the line widths in this particular case.

550
00:36:37,300 --> 00:36:45,179
And you can see everything's plotted with the heights, again, limited from 0 to 100,

551
00:36:45,179 --> 00:36:46,900
so everything's comparable.

552
00:36:46,900 --> 00:36:50,539
And notice the empty spot here, because I had nothing to fill in.

553
00:36:50,539 --> 00:36:54,659
Questions about this?

554
00:36:54,659 --> 00:36:56,659
This interesting?

555
00:36:57,219 --> 00:36:58,219
OK.

556
00:37:00,059 --> 00:37:01,219
All right.

557
00:37:01,219 --> 00:37:12,139
So that finishes up just some really basic things that we can do with plotting, basic customizations.

558
00:37:12,139 --> 00:37:17,859
Now what I'd like to do is just open up a few different data sets.

559
00:37:17,859 --> 00:37:24,259
For processing, we can start by just plotting the pure values on a regular plot.

560
00:37:24,260 --> 00:37:30,900
And then we can start to investigate things that we visualize, ask more questions, and

561
00:37:30,900 --> 00:37:32,260
see where we go from there.

562
00:37:32,260 --> 00:37:37,620
So the first thing I'd like to do is open up a file on the US population.

563
00:37:37,620 --> 00:37:44,540
So this particular file contains 40 different numbers.

564
00:37:44,540 --> 00:37:52,500
So it has a population value over about 400 years every 10 years.

565
00:37:52,500 --> 00:38:00,179
So that's 40 different values for the temperatures, starting from a really long time ago until about

566
00:38:00,179 --> 00:38:03,539
2010 or something like that.

567
00:38:03,539 --> 00:38:06,380
So the file looks something like this.

568
00:38:06,380 --> 00:38:12,019
So it starts at 1610 and goes down to 2010.

569
00:38:12,019 --> 00:38:19,780
So this is 40 lines for 40 years, every 10 years.

570
00:38:19,780 --> 00:38:25,700
And then there's a space in the file, and then I've got the population value.

571
00:38:25,700 --> 00:38:30,900
So it starts at 350, increases, goes down to 300,000 in 20 times.

572
00:38:30,900 --> 00:38:32,900
So that's what the file looks like.

573
00:38:32,900 --> 00:38:38,100
It's important to know what the file looks like because you're going to have to read in this data and

574
00:38:38,100 --> 00:38:42,740
save it in some sort of data structure that's easy to manipulate.

575
00:38:42,740 --> 00:38:49,420
So in our case, a data structure that's really easy to manipulate where you have a whole sequence of values is a list.

576
00:38:50,380 --> 00:38:59,539
So what we can do is we can open up this file for processing, read in the years as a list, and then read in the

577
00:38:59,539 --> 00:39:01,980
population values as a list as well.

578
00:39:01,980 --> 00:39:08,139
We could use a dictionary also if we wanted to, but in this case, I just used two lists.

579
00:39:08,139 --> 00:39:10,340
So let's look at the code to do that.

580
00:39:10,340 --> 00:39:13,220
It looks like a lot, but I'll kind of go through it.

581
00:39:13,220 --> 00:39:17,380
So here is the function that's going to read in the file.

582
00:39:17,380 --> 00:39:20,500
It just opens up the file, creates two empty lists.

583
00:39:20,500 --> 00:39:24,180
One will contain the dates, the other one contains the populations.

584
00:39:24,180 --> 00:39:26,260
It iterates through each line in the file.

585
00:39:26,260 --> 00:39:29,460
So I've put up what a line in the file kind of looks like up here.

586
00:39:29,460 --> 00:39:34,300
So it's got some numbers, space, some other number.

587
00:39:34,300 --> 00:39:40,860
But when we read in a line from a file, Python actually reads it as a string.

588
00:39:41,860 --> 00:39:48,860
So what that means for us is we're going to have to take this string, each line being the string,

589
00:39:48,860 --> 00:39:53,860
you know, 1, 6, 4, 0 space, 2, 6, 6, 3, 4, something like that.

590
00:39:53,860 --> 00:40:00,860
And somehow separate it so that we have the date and then the number of the population.

591
00:40:00,860 --> 00:40:04,860
And then, you know, somehow save those two pieces to lists.

592
00:40:05,380 --> 00:40:15,860
So the first thing to notice is that we have a pesky comma in our population values.

593
00:40:15,860 --> 00:40:17,460
Right?

594
00:40:17,460 --> 00:40:22,059
Those values are human readable, so it makes it easy for us to read.

595
00:40:22,059 --> 00:40:25,860
But the computer is not so happy about them.

596
00:40:25,860 --> 00:40:26,860
Right?

597
00:40:26,860 --> 00:40:32,360
So if I have a number like, you know, 11,345, whatever,

598
00:40:32,360 --> 00:40:36,360
this is read in as a string, right?

599
00:40:36,360 --> 00:40:46,360
And if I just try to cast that as an integer, just straight without doing any sort of processing on it, Python's very unhappy.

600
00:40:46,360 --> 00:40:53,360
So what we need to do is remove that comma, because as long as I don't have a comma there,

601
00:40:53,360 --> 00:41:02,360
Python can convert that string number into a regular integer number for us to then plot.

602
00:41:02,360 --> 00:41:03,360
Okay.

603
00:41:03,360 --> 00:41:06,360
So that's what this bit of the code is doing.

604
00:41:06,360 --> 00:41:10,360
It's doing it in kind of a weird, weird way.

605
00:41:10,360 --> 00:41:19,360
It's saying, hey, take this entire line of characters and only keep characters that are either a digit or a space.

606
00:41:19,360 --> 00:41:32,360
So in doing so, it effectively removes the comma, because it creates a new version of that line containing only digits and spaces, so it'll just take the two, six, and then the six, three, four, right after.

607
00:41:32,360 --> 00:41:36,360
So it just creates this new line that looks like that.

608
00:41:36,360 --> 00:41:48,360
And then after it has this new line, we're going to split on the space, because we note that every single, after every date, every year, we've got a space that separates our,

609
00:41:48,360 --> 00:41:51,360
population value and our date.

610
00:41:51,360 --> 00:42:04,360
So if we split on the space using the split command, the thing before the space, so the line at index zero gives us the date, we'll just cast that to an int and append it to dates.

611
00:42:04,360 --> 00:42:11,360
And then the line at index one is the thing after the space, again, without the comma, because we did that trick.

612
00:42:11,360 --> 00:42:18,360
And then we cast that to an integer and append that to our population's value.

613
00:42:18,360 --> 00:42:21,360
That's what we do there, and that's what we do there.

614
00:42:21,360 --> 00:42:25,360
And then from there on out, we just return the dates and the populations.

615
00:42:25,360 --> 00:42:34,360
The dates become my x values for my plot and the populations become the y values for my plot.

616
00:42:34,360 --> 00:42:37,360
And then we plot it and it looks something like this.

617
00:42:37,360 --> 00:42:44,360
So much easier to read or to tell what's going on than just looking at pure numbers, right?

618
00:42:44,360 --> 00:42:49,360
Always nicer to visualize things than to just read a whole bunch of numbers, even if it's just 40.

619
00:42:49,360 --> 00:42:59,360
And in fact, we can tell a couple of things that we weren't able to tell, you know, we could definitely couldn't have been able to tell from just looking at pure numbers.

620
00:42:59,360 --> 00:43:06,360
But the first is that we notice a little bump right here, right, in the population.

621
00:43:06,360 --> 00:43:10,360
And this is the impact of World War II on the population.

622
00:43:10,360 --> 00:43:17,360
Second, a little harder to tell is another little bump down here, and that's the impact of the Civil War in the population.

623
00:43:17,360 --> 00:43:22,360
So nicer to visualize, it exposes some interesting things.

624
00:43:22,360 --> 00:43:27,360
The other thing to notice is, well, what's going on down here?

625
00:43:27,360 --> 00:43:32,360
It kind of looks like the population is not really growing much, right?

626
00:43:32,360 --> 00:43:36,360
And then maybe from 1750 onward, it starts to grow exponentially.

627
00:43:36,360 --> 00:43:42,360
It's hard to tell what exactly is going on in that lower part.

628
00:43:42,360 --> 00:43:50,360
So let's think about a different way of showing this data instead of having a linear scale on our y-axis.

629
00:43:50,360 --> 00:43:56,360
Let's see about doing it in a logarithmic scale, right?

630
00:43:56,360 --> 00:44:06,360
So we're going to add a command that tells Python to make our y-axis a logarithmic scale instead of linear.

631
00:44:06,360 --> 00:44:20,360
So if we do that, then that means that every regular increment on our y-axis is going to imply an exponential increase in the population.

632
00:44:20,360 --> 00:44:24,360
Okay, so let's plot that.

633
00:44:24,360 --> 00:44:28,360
And if we plot that, we get something that looks like this.

634
00:44:28,360 --> 00:44:33,360
The x-axis remains unchanged. We're still incrementing the years linearly, right?

635
00:44:33,360 --> 00:44:37,360
But the y-axis is now logarithmic.

636
00:44:37,360 --> 00:44:39,360
So what do we notice?

637
00:44:39,360 --> 00:44:49,360
Well, I see linear line here, and I see another line here.

638
00:44:49,360 --> 00:44:56,360
Okay. Again, linear growth on a log scale means exponential growth, right?

639
00:44:56,360 --> 00:44:58,360
And on a linear scale.

640
00:44:58,360 --> 00:45:03,360
So what we notice is that there's sort of these two time periods of exponential growth.

641
00:45:03,360 --> 00:45:07,360
And in fact, those early years actually seem to be growing.

642
00:45:07,360 --> 00:45:12,360
The population seems to be growing at a faster rate than the later years.

643
00:45:12,360 --> 00:45:18,360
Right? And that was not readily visible on the previous graph that we have.

644
00:45:18,360 --> 00:45:23,360
So the question, you know, I have a question for you, which one of those did you find more informative?

645
00:45:23,360 --> 00:45:27,360
Well, it kind of depends on what we're interested in finding out, right?

646
00:45:27,360 --> 00:45:36,360
If we're interested in sort of big trends in the data, where, you know, in the top left one, we spotted here the impacts of wars on the population.

647
00:45:36,360 --> 00:45:39,360
Well, then the top left one is the one to look at.

648
00:45:39,360 --> 00:45:45,360
But if we visualize the data in a slightly different way, it gives us different insights into what's happened to the population, right?

649
00:45:45,360 --> 00:45:48,360
That wasn't as apparent in the previous graph.

650
00:45:48,360 --> 00:45:59,360
So it really kind of just depends on what you're interested in finding out, which one of these plots you find more informative.

651
00:45:59,360 --> 00:46:06,360
And, you know, sometimes both are probably necessary to figure out exactly what happened.

652
00:46:06,360 --> 00:46:11,360
Okay. So that finishes our example on the US population.

653
00:46:11,360 --> 00:46:15,360
Now, let's look at a slightly different file.

654
00:46:15,360 --> 00:46:20,360
In this particular file, we're going to look at country populations.

655
00:46:20,360 --> 00:46:35,360
So these are the populations in a whole bunch of different countries, or sorry, all the countries, ordered from countries with the highest population up at the top of the file down to the countries with the lowest population at the bottom of the file.

656
00:46:35,360 --> 00:46:40,360
So they're basically ranked in this order, right? So I know that this order is correct.

657
00:46:40,360 --> 00:46:46,360
So there's, you know, 237 lines in this file.

658
00:46:46,360 --> 00:46:50,360
What do we notice about the data? So we need to know what the data looks like in order to read the file in.

659
00:46:50,360 --> 00:46:57,360
And again, we're going to be interested in kind of extracting certain parts of it.

660
00:46:57,360 --> 00:47:04,360
But for the particular analysis, I'm going to do next. I'm actually only interested in the population itself.

661
00:47:04,360 --> 00:47:10,360
So I don't care about the rank, and I don't actually care about the country either.

662
00:47:10,360 --> 00:47:18,360
So all that might, the code that's going to read in the file will only be interested in extracting the population value.

663
00:47:18,360 --> 00:47:25,360
And notice, once again, we've got our commas here in the population values, right?

664
00:47:25,360 --> 00:47:35,360
So we're going to use the same trick to get rid of those. Again, nice human readable format here, but not so good for reading in the file and dealing with the data itself.

665
00:47:35,360 --> 00:47:39,360
So we're going to have to take care of that when we're reading.

666
00:47:39,360 --> 00:47:46,360
So here's the function that reads in the file. It's going to have a very similar feel to the previous one.

667
00:47:46,360 --> 00:47:51,360
Again, I've got a little sample of our file up here just to remind ourselves what it looks like.

668
00:47:51,360 --> 00:47:59,360
So this particular file, I'm only interested in grabbing the population value, and it's actually a tab separated file.

669
00:47:59,360 --> 00:48:06,360
So I've got rank, tab, country, tab, population, tab, and then the date.

670
00:48:06,360 --> 00:48:14,360
So when I take a line of code, what I'm first going to do is split it on the tab character.

671
00:48:14,360 --> 00:48:18,360
And the tab character is this backslash teeth.

672
00:48:18,360 --> 00:48:23,360
So once I split it on the tab character, the thing at index zero is by rank.

673
00:48:23,360 --> 00:48:27,360
The thing at index one is my country, and the thing at index two is my population.

674
00:48:27,360 --> 00:48:30,360
The thing at index three is my date.

675
00:48:30,360 --> 00:48:39,360
So if I'm only interested in grabbing the population, I'm going to look at the thing at index two, and this gives me the population as a string here.

676
00:48:40,360 --> 00:48:45,360
And then we do the exact same trick as before to eliminate the comma.

677
00:48:45,360 --> 00:48:52,360
There's no space in this particular case, right? Because I've just got the number saved because of my tab split.

678
00:48:52,360 --> 00:48:55,360
So all I need to do is keep digits.

679
00:48:55,360 --> 00:49:00,360
And then if I keep the digits, then I'm just going to keep that number as a population.

680
00:49:00,360 --> 00:49:06,360
Again, I cast it to an integer because I would like to work with numbers in my lists as opposed to strings.

681
00:49:06,360 --> 00:49:16,360
That would be very weird. And at the end of this function, I've got all of the populations in the same order that they were in that file, read in as a list, right?

682
00:49:16,360 --> 00:49:18,360
Numbers, not strings.

683
00:49:18,360 --> 00:49:32,360
And so if we plot the populations, just pure populations, I'm going to have something like this.

684
00:49:32,360 --> 00:49:37,360
If I plot just the pure populations, I see something that looks like this.

685
00:49:37,360 --> 00:49:43,360
Kind of hard to tell. I mean, it's a big exponential decrease, but is that really what it is?

686
00:49:43,360 --> 00:49:52,360
So again, we'll do a little semi-log plot on the y-axis to see exactly if there's any sort of linear action going on on that log plot.

687
00:49:52,360 --> 00:49:57,360
And, you know, unsurprisingly, it kind of matches our intuition.

688
00:49:57,360 --> 00:50:05,360
There are very few countries that have a really high population. There are very few countries that have a low population.

689
00:50:05,360 --> 00:50:14,360
And then a bunch of countries that are kind of in the middle here where the population just exponentially decreases.

690
00:50:14,360 --> 00:50:22,360
All right. But that's not the analysis I would like to do on this data.

691
00:50:23,360 --> 00:50:34,360
Because that's kind of boring. So instead, what we're going to analyze is actually just the first digits from every country's population.

692
00:50:34,360 --> 00:50:35,360
Right?

693
00:50:35,360 --> 00:50:46,360
So what I'd like to do from that data set is once I've grabbed a list of all of the country populations, I am going to extract that first digit.

694
00:50:46,360 --> 00:50:56,360
So the way we do it is, you know, if we have a population, I don't know, two, five, four, two, one, three, six, whatever.

695
00:50:56,360 --> 00:51:03,360
I'm going to take this number, cast it to a string. That's what this one line of code is doing, all in one.

696
00:51:03,360 --> 00:51:10,360
It's cast it to a string, extracts the element at index zero. This becomes the string two.

697
00:51:10,360 --> 00:51:17,360
And then we cast that to an integer. Right? To give us two.

698
00:51:17,360 --> 00:51:31,360
So that line of code does all of those steps in order. So at the end of this loop, I've got this first digit's list that contains all of the first digits of every single one of those country populations.

699
00:51:31,360 --> 00:51:37,360
So I'll print that for you just to give you a sense of what it looks like. So we see this. Right?

700
00:51:37,360 --> 00:51:50,360
So we had two countries up at the top that had one billion people, one billion people, then the next country down, had 300 million people, then 200 million, then 200 million, then 200 million, then 200 million, then 100 million, and so on.

701
00:51:50,360 --> 00:51:58,360
So just extracting that first digit, we see this kind of this pattern of values.

702
00:51:58,360 --> 00:52:10,360
So if we plot that, but that's exactly what we do down here, and I'll just do it in the slides, if we plot that list in that order, we get a plot that looks something like this.

703
00:52:10,360 --> 00:52:25,360
Right? It's a nice little sawtooth pattern. Right? And if we stare at it a bit, it makes sense, because the numbers that we got, right, from the file, were already in ranked order.

704
00:52:25,360 --> 00:52:52,360
So we had a list of the highest population to the lowest population. So here, down here, we had, sorry, down here, this little dot right here had two countries that were one billion, so one one, and then had one country that had 300 million, and then it had three countries that had 200 million, then a bunch of countries that had 100 million something, so one, one, one, one, one, one.

705
00:52:52,360 --> 00:53:06,360
So once we're going in decreasing order in terms of rank, right, once we've finished going to that significant digit, when we move down, then we're going to start looking at countries that have 90 million, 90 million, 80 million, 80 million, 80 million, and so on.

706
00:53:06,360 --> 00:53:21,360
So just the order of all of these values, the first digits of every one of these values, it makes sense to have that sawtooth pattern, right? We basically have, you know, 98, 75, 4, 3, 2, 1, 98, 75, 4, 3, 2, 1, and so on.

707
00:53:22,360 --> 00:53:35,360
Right? So we get this pattern. What I'd like to do is ask how many countries have their first digit a one?

708
00:53:35,360 --> 00:53:42,360
It seems like there's a lot, right? If we count sort of how many of these countries are down here, it seems to be a lot.

709
00:53:42,360 --> 00:53:48,360
How many countries have a first digit of two? So again, we count how many countries are on this step of my sawtooth.

710
00:53:48,360 --> 00:54:01,360
How many countries have the first digit three and so on? And it kind of looks like, I don't know, maybe there are more countries that have a first digit of one, then there are countries that have a first digit of nine, right?

711
00:54:01,360 --> 00:54:10,360
There's only a couple here, maybe like five here, maybe one here, a couple here, a couple here. Whereas the number of countries that have a one are actually a lot.

712
00:54:10,360 --> 00:54:23,360
So let's try to plot this data, the values here. So what I'm interested in doing is creating a histogram. So a histogram on the x-axis has a bunch of bins.

713
00:54:23,360 --> 00:54:33,360
In this particular case, what I, the way I'd like to bin my data is by saying my bins are going to be the digits one, two, three, four, five, six, seven, eight, and nine.

714
00:54:33,360 --> 00:54:46,360
That's the x-axis and the y-axis is going to be a count, right? A frequency of how many of my countries have the number one as their first digit? How many countries have the number two as my first digit and so on?

715
00:54:46,360 --> 00:54:58,360
So in terms of this list containing all of the first digits in the, of the countries, I'm essentially have, I essentially have one bin that counts how many ones I have in this list.

716
00:54:58,360 --> 00:55:05,360
Another bin that counts how many two's I have in this list. Another bin that counts how many three's I have in this list and so on.

717
00:55:05,360 --> 00:55:22,360
Okay. So if I plot that histogram, it looks like this. Now I would have expected this histogram to be about even, right? Like why does it matter the first digit?

718
00:55:22,360 --> 00:55:37,360
But it seems like in this particular case, the first digit has a higher probability of being a one than being a nine. But intuitively, I would have expected every digit to come out with equal probability, right? Like 11%, right? One over nine.

719
00:55:37,360 --> 00:55:46,360
But instead, what we get is this really surprising result, which is that the first digit seems to be about 30%.

720
00:55:46,360 --> 00:55:58,360
Right. To have the first start, to have the first digit of one seems to be about 30%. To have the first digit being a two seems to be about 18% or something percent.

721
00:55:58,360 --> 00:56:10,360
And so on and so on. And then the first digit being a nine is pretty low. It's going to be about what is this 12 out of 200 countries. Right. So pretty low probability.

722
00:56:10,360 --> 00:56:23,360
So as it turns out, this graph actually follows something called Benford's law. And this is a well proven law. It applies to a bunch of different data sets that we find in nature.

723
00:56:23,360 --> 00:56:39,360
Data sets that don't really have upper or lower bounce, right? Like country populations, right? So Benford's law effectively says the probability of the first digit in some set of numbers being a one, a two.

724
00:56:39,360 --> 00:56:55,360
A three, a three, whatever, this D being the one, a two or three, or whatever is according to this formula. So if we find the probability of that first digit being a one, we basically find log base 10 of two, which is about 0.28.

725
00:56:55,360 --> 00:57:07,360
So probability of that first digit being a two is log base 10 of one and a half, which is about 0.17. So our data, the country populations, right?

726
00:57:07,360 --> 00:57:15,360
If we look at just the first digit of our data, it also follows this law. Just pretty neat, right?

727
00:57:15,360 --> 00:57:36,360
So a lot of data that we deal with on a daily basis follows this law. Number of social media followers, number of post people make stock values, grocery prices, sports statistics, building heights, income taxes, things like that. All follow this law, which is pretty cool.

728
00:57:36,360 --> 00:57:57,360
As of aside, one of the ways that people figure out tax fraud on income taxes is by applying Benford's law to income taxes submitted. People when they kind of submit fraudulent numbers, they tend to make every number kind of come up with an equal probability.

729
00:57:57,360 --> 00:58:12,360
They forget about Benford's law. And so they run this Benford's law on potentially fraudulent tax submissions. And they figure out that whatever those people submitted don't actually follow this law. And hence it's fraudulent.

730
00:58:12,360 --> 00:58:31,360
So if you're making up numbers, just remember Benford's law. So yeah, that's a really interesting thing that can come out of some data. And again, we got to visualize it and see the law in action.

731
00:58:31,360 --> 00:58:48,360
Okay, one last example I want to go through. This one will have to will kind of show a bunch of different things. It's going to have a lot of code. I'm just going to briefly talk about it, but the code is in the slides or sorry in the Python file. If you want to look at it more in depth.

732
00:58:48,360 --> 00:59:06,360
I'm going to compare city temperatures again, but we're going to do a more in depth analysis dealing with a whole bunch more data. So this particular data set, I've got daily temperatures for 55 years for 21 different cities.

733
00:59:06,360 --> 00:59:18,360
So the amount of data that I have here is going to be 365 times 55 times 21. So that's how many rows would exist in my data set. Right.

734
00:59:18,360 --> 00:59:30,360
So that's a lot of numbers to look at manually. So instead we're going to rely on kind of aggregating it with averages and things like that to kind of make sense of all of this data.

735
00:59:30,360 --> 00:59:44,360
So this is what the file would look like. I've got three columns effectively separated by commas. So the first one corresponds to the city second one corresponds to the temperature in Celsius.

736
00:59:44,360 --> 00:59:59,360
So the third one is the date that it was taken. So it's nicely in order. The date is delineated like this. So it's got year, year, year, year, month, month, day, day. So this is 1961, January 4th. That's how we would read that.

737
00:59:59,360 --> 01:00:14,360
So later when we're trying to think about what, which one of grabbing particular temperatures for a specific year or things like that, then we can use the format, keep the format in mind and use that to extract relevant information.

738
01:00:14,360 --> 01:00:25,360
Okay. So the first thing we want to do is to grab this data and save it again in a nice data structure that allows us to manipulate it. Her heart's content. That is a list.

739
01:00:25,360 --> 01:00:39,360
So we're going to open up our file for reading. I'm creating two lists here, one for the temperatures, the other one for the dates. I'm going to loop through each line in my file and I know it's comma separated. So I'm going to split it on the comma.

740
01:00:39,360 --> 01:00:48,360
The thing at index zero will be my date, will be my city. The thing at index one will be my temperature value. The thing at index two will be my date.

741
01:00:48,360 --> 01:01:03,360
Okay. I would like to take the temperature value and save it as a number because I want to plot these numbers. This specific function will get a list of all of the temperatures for a particular city.

742
01:01:03,360 --> 01:01:20,360
So the city here is going to be a parameter. So as I'm reading the file, I would only like to grab the lines that match that city. So here I've got this if statement. So I'm only going to do this stuff inside this if statement if the city is matching the one I'm interested in.

743
01:01:20,360 --> 01:01:39,360
And then what do we do? Well, we're going to take our temperature value, which is the thing at index one, right? Because I split on the commas. Convert it to a float. There's no commas or anything weird like that in that number. So it's just a pure float, and you're 0.55 as a string. If we cast it to a float, Python will happily do that for us.

744
01:01:39,360 --> 01:01:54,360
Then we're going to run a Celsius to Fahrenheit function, throw back to lecture one to convert that Celsius to a Fahrenheit value. And then we're going to append all of these temperatures in a nice list.

745
01:01:54,360 --> 01:02:05,360
Okay. And at the end of the function, we're going to return all the temperatures. So it's going to be 365 times 55. Right. That's how many temperature values we have for one city.

746
01:02:05,360 --> 01:02:23,360
And what we'd like to do as a first step is to just get a sense of the average temperatures for each one of these different cities. Right. So over every single data point that we have for a particular city, what is the average temperature over all these days for all of these years.

747
01:02:23,360 --> 01:02:42,360
So I would like one number to represent the temperature per city. So that's what this code is doing. It's going to first get all of the cities that are in my file. So all the unique values. Then it's going to get the average temperature over all of those 365 times 55 years.

748
01:02:42,360 --> 01:02:57,360
Then it's going to grab the name of my city as just the first two characters. And then it's going to create a nice scatter plot. So I don't want to link all of these city values together. I would just like them to be dots in my plot.

749
01:02:58,360 --> 01:03:15,360
If we do that, we get something that looks like this. So this point here represents the temperature in Seattle over every day over 55 years. So one point temperature point that represents the Seattle temperature. Right. For all of this data that I've got.

750
01:03:15,360 --> 01:03:37,360
What does this tell us? Well, not much that we didn't already know. I've got these cities down here that are super cold. And those cities up there that are super warm. Right. And then all the rest of my cities are somewhere in the middle on average. Right. So nothing that we didn't really know, nothing groundbreaking here.

751
01:03:37,360 --> 01:03:55,360
What would be a nicer thing to look at is the temperature change over time. Right. So here my one data point tells me the temperature kind of that represents that city. But what I'd like to do is grab the temperature that represents that city for each year.

752
01:03:55,360 --> 01:04:09,360
So for each year, I would like to get the average temperature for that year. And maybe I could see a trend, you know, for the temperatures getting warmer over time or cooling over time, something like or not having any change at all.

753
01:04:09,360 --> 01:04:28,360
So this is the code that does that. I've got get temperatures by year for city. This is the function that gets run and it calls the one at the top. So here I've got the code from the previous slide. It gets a list of all the temperatures for particular city. So over all those 55 years.

754
01:04:29,360 --> 01:04:40,360
And then I'm interested in all of these different years. So for each one of these years, I'm going to get a temperature value. Right. This gets temps for years, the function up there.

755
01:04:40,360 --> 01:04:49,360
And all it does is it looks at that third column and grabs the year. It matches those first four characters of the year entry.

756
01:04:49,360 --> 01:04:59,360
And as long as it matches that year, then it's going to get added to this running some. And at the end, I'm going to get the average for the year.

757
01:04:59,360 --> 01:05:12,360
And let's say that I'm going to compare four different cities. So I've got 55 values for each city representing the average temperature in those 55 years.

758
01:05:12,360 --> 01:05:29,360
And I've got four cities to compare. So this is what one plot would look like for Boston. Sorry. So this is what the plot would look like. I've got one line for Boston. That's the blue one line for San Diego, the red one line for Phoenix, the orange and one line for Miami, the green.

759
01:05:29,360 --> 01:05:39,360
What do we see? Well, yes, Boston on average is a lot colder than any of the three other cities. Cool. We do that.

760
01:05:39,360 --> 01:05:54,360
Miami and Phoenix are nicely hot there. I'd like to be there right now. And what about trends? Right. This is why we did this analysis. What do we see from the trends here? Well, the Boston temperature maybe increases a little bit slightly over time.

761
01:05:54,360 --> 01:06:05,360
San Diego seems to say about study. The Phoenix one seems to increase. Right. Pretty dramatically as time has gone by on average.

762
01:06:05,360 --> 01:06:26,360
And the Miami one may be also slightly increased. But this only tells us average temperatures. So one thing that we can do is check out the extremes. Right. In addition to plotting the average, let's also plot the minimum for Boston and the maximum for Boston.

763
01:06:26,360 --> 01:06:38,360
Right. And see exactly how close that average is is the average, you know, in the middle and then the minimum and maximums are super far away from the average. Or are they all pretty much close to the average.

764
01:06:38,360 --> 01:06:54,360
So this is the code that does that. The function here is exactly the same as on the previous slide. The only difference is instead of returning the average, we're also going to grab the max and the min for that list of temperatures.

765
01:06:55,360 --> 01:07:03,360
And then we've got all of the different cities to plot this for. So we get something that looks like this.

766
01:07:05,360 --> 01:07:20,360
Again, at first glance, I have, I tend to ignore the y-axis at first glance. So at first glance, again, it looks like, hey, the minimums are pretty much the same. The maximums are pretty much the same.

767
01:07:20,360 --> 01:07:34,360
So misleading to think about that. So once again, let's help the reader and set limits on our y-axis. Right. So here I've got a limit to my function or to my code.

768
01:07:34,360 --> 01:07:47,360
It's going to have every one of my graphs start at zero and top out at 100. And now the plots are nicely comparable. So now I'm plotting the average temperature for each year.

769
01:07:47,360 --> 01:07:56,360
So there's 55 of these data points, the minimum temperature for each year and the maximum temperature for each year. So 55 data points being plot.

770
01:07:57,360 --> 01:08:08,360
What can we tell a lot easier to infer information from this, right? So we could see that the average temperature in Boston is the minimum temperature in Miami and San Diego.

771
01:08:09,360 --> 01:08:25,360
What else can we see? The variation in Boston is pretty high, right? The variation in Miami and San Diego is a lot lower, right? San Diego goes from 40 to 80, whereas Boston goes from zero to 90, so pretty high variation.

772
01:08:26,359 --> 01:08:36,359
The average for Boston and San Diego seems to be almost the same, right? But that variation is very different between these two cities.

773
01:08:40,359 --> 01:08:43,359
Okay. So, yeah.

774
01:08:44,359 --> 01:08:47,359
What happened if there's a value that's lower than the minimum one time?

775
01:08:47,359 --> 01:09:01,359
Oh, yeah, then it doesn't get plotted. Yeah. So, yeah, that was a tenuous there, but it didn't go down. I could imagine like the minimum in Boston being below zero for one year, but yeah, then it just wouldn't get plotted.

776
01:09:04,359 --> 01:09:13,359
So you could use that to guide your limits. Like the code here could say, why limit equals minimum of those three lists, right?

777
01:09:13,359 --> 01:09:22,359
And you'll be sure to make sure that minimum will be hidden in the limits. Great question.

778
01:09:23,359 --> 01:09:34,359
Okay. So one other thing that we can look at is the distribution of temperatures. Right? So this is a nice plot. It gives us sort of an overview look at what happens year by year.

779
01:09:34,359 --> 01:09:45,359
But what if we focus on one specific year? And now for that year, let's think about what the temperature distribution looks like. Right?

780
01:09:46,359 --> 01:09:57,359
So what I'm interested in plotting is something like this. So I've got on the x-axis, maybe bins that correspond to different temperatures.

781
01:09:57,359 --> 01:10:07,359
So a temperature of zero, temperature of one, temperature of two, three, four, and so on. And then this is going to be pretty big because maybe my max temperature will be a hundred.

782
01:10:08,359 --> 01:10:20,359
So for one particular year, I would like to have a hundred bins. And the height of each bin is going to be a count of how many days within that year we reached a temperature of zero.

783
01:10:20,359 --> 01:10:34,359
How many days within the year we reached a temperature of one? And we can average things or we can round temperatures, right? Because obviously the temperature would be like 20.6 or something like that. Right? And then we can just round it so it fits in one of these bins.

784
01:10:35,359 --> 01:10:48,359
So that's exactly what this code is doing. So here it's looping over every single one of the dates. And we're creating this list of the temperatures.

785
01:10:48,359 --> 01:11:00,359
And the list is for one specific year. So this year is my parameter here. So here this is just going through the data and ensuring that I'm grabbing only the rows that match that year.

786
01:11:01,359 --> 01:11:11,359
And then down here is where I'm creating a list of a hundred elements. Right? So this down here you can think of it as a list.

787
01:11:11,359 --> 01:11:32,359
And the index nicely, it worked out really nicely, the index is going to correspond to a temperature value, which is weird to think it only works in this particular scenario with Fahrenheit temperatures. But the index in this list corresponds to a temperature.

788
01:11:32,359 --> 01:11:55,359
So as I'm iterating through my list of temperatures over 365 days in a year, I'm going to round that temperature and I'm going to add it to the index that I believe it belongs to. Right? So in this way I'm going to have, you know, if the temperature was four degrees, then at index four, I'm going to increment my count by one.

789
01:11:55,359 --> 01:12:14,359
And if further on in the list, I've got another temperature that's four and index four, I'm going to increment it again. So I've got this nice list, this nice counts of all of the temperatures at different, sorry, all of the counts at all of these different temperatures.

790
01:12:14,359 --> 01:12:24,359
So out of those 365 days, how many days had a temperature of four of 365 days, how many days had a temperature of 85?

791
01:12:24,359 --> 01:12:38,359
Okay, and then we can plot it and we're not going to plot a regular plot because we don't want these connected. We're not going to do a histogram because we made our own histogram here. Instead we're going to do a bar plot.

792
01:12:38,359 --> 01:12:55,359
And the bar plot takes in my x-axis and my y-axis, the x-axis being this list zero through 100, corresponding temperatures, and the y-axis being the count of how many days had each one of those temperatures.

793
01:12:55,359 --> 01:13:06,359
And we get something that looks like this. So this is only for one year, right? So if we count the sum of all of these bars, right, how many times they appear,

794
01:13:06,359 --> 01:13:18,359
it should add up to 365 days. So this is the distribution, I think, in 1961. Left is Boston and right is San Diego.

795
01:13:18,359 --> 01:13:31,359
Already, we can tell some pretty interesting things from this, right? So 1961, what does the distribution look like for these two cities? Well, it looks like this is something we could already tell from the minimum and maximum.

796
01:13:31,359 --> 01:13:46,359
It looks like temperatures in Boston kind of went from about zero to 85. But what the distribution tells us that the minimum and maximum couldn't tell us is how many days were that low? Right?

797
01:13:46,359 --> 01:13:54,359
How many days were that high? Is it that we have some sort of nice looking bell curve type distribution, right?

798
01:13:54,359 --> 01:14:09,359
Where most of our temperatures land comfortably in this middle range, right? That's one option. Or maybe there is some city out there where it just has an even distribution, right?

799
01:14:09,359 --> 01:14:21,359
So basically, they're going to have temperatures that, sorry, the count of the temperatures basically is even. So it doesn't really matter what temperature you're talking about.

800
01:14:21,359 --> 01:14:36,359
There will be an even number of days throughout the year that are at that temperature, right? So this kind of graph can tell us this. So it looks like the temperature in Boston kind of maybe follows a very wide bell shaped curve kind of maybe two bumps by my model.

801
01:14:36,359 --> 01:14:58,359
Temperature in San Diego, again, much a much lower variability, but also seems to follow this bell type curve here where maybe by my model with two bumps here, one with temperatures that are just, you know, in the 55s, very few temperatures in the middle and then you know, much of temperatures in the 70s.

802
01:14:59,359 --> 01:15:07,359
So this is the distribution for 1961 and then we can again ask what happens to the distribution in a later year.

803
01:15:08,359 --> 01:15:20,359
So if we take more than one year that we plot here, I'm going to plot 1961 and 2015. So just two years, not everything in between, that would be a very, very cluttered graph.

804
01:15:21,359 --> 01:15:28,359
I'm going to label the 1961 temperatures blue and the 2015 temperatures red.

805
01:15:29,359 --> 01:15:40,359
So then I get something that looks like this. A little hard to tell. So what we can do for this graph is we can actually add something called an alpha value. So a transparency.

806
01:15:40,359 --> 01:15:50,359
So we can kind of see what's behind the red. Does the blue go all the way down here? Is the blue just slightly below the red hard to tell from this.

807
01:15:51,359 --> 01:15:57,359
One thing we can do is to add that transparency, like I said, another thing that we can do is to just plot them on two separate subplots.

808
01:15:58,359 --> 01:16:09,359
And then we can try to compare them to see exactly what happened from 1961 in terms of the distribution to 2015 again in terms of the distribution.

809
01:16:10,359 --> 01:16:19,359
So if you want to play around with different cities, you know, your home city and see exactly what happened to the temperatures over all those years. So it's kind of a cute thing to try.

810
01:16:20,359 --> 01:16:21,359
Any questions?

811
01:16:22,359 --> 01:16:32,359
Okay. So that's the end. We've really just scratched the surface of the things that you can do with plotting today, right? We saw how to customize our graphs.

812
01:16:33,359 --> 01:16:43,359
We saw how to create labels, you know, some really, really basic things. But I hope that sort of throughout all this, you saw how useful this to visualize the data, right?

813
01:16:44,359 --> 01:16:51,359
The commands are not so important, right? Because you can always look those up. But what's important is to take some sort of set of data, right?

814
01:16:52,359 --> 01:17:01,359
Which you'll be working with in the real world if you do a Europe, if you decide to take, you know, the computer science courses in other departments, computation courses, you'll be working with data.

815
01:17:02,359 --> 01:17:08,359
And as soon as you get it, it's important to just visualize it to see what it looks like, sort of get a general sense of it.

816
01:17:08,359 --> 01:17:21,359
And once you get a sense of it, it can lead to more questions, which will cause you to kind of visualize the data in a slightly different way, which becomes more useful in answering questions and potentially posing new questions to investigate.

817
01:17:22,359 --> 01:17:37,359
So that's it for today. Next lecture will be just tying up some loose ends regarding dictionaries and just some ideas and hash tables and how dictionaries are stored in memory as well as doing a little bit of preview of simulations, which is something that's really useful.

818
01:17:38,359 --> 01:17:46,359
This will technique, you know, again, if you're going to do some more computation courses in other departments, a simulation is something that's going to be really, really helpful.

