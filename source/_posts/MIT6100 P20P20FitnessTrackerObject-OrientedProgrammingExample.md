---
title: MIT6100 P20P20FitnessTrackerObject OrientedProgrammingExample
---

1
00:00:00,000 --> 00:00:20,280
Okay, so let's get started.

2
00:00:20,280 --> 00:00:26,359
Today's lecture will be the last one we have on object-oriented programming and creating

3
00:00:26,359 --> 00:00:30,000
our own data types with Python classes.

4
00:00:30,000 --> 00:00:35,840
So in today's lecture, we're going to go through an example that's sort of more involved.

5
00:00:35,840 --> 00:00:41,000
We're going to be creating our own fitness tracker object and specifically we're going to

6
00:00:41,000 --> 00:00:46,140
create a class for that implements the idea of a workout.

7
00:00:46,140 --> 00:00:51,159
And the slides for today are going to feel very similar to the slides from Monday's lecture.

8
00:00:51,159 --> 00:00:58,559
A lot of them are just kind of reinforcing the same ideas we saw last lecture on creating

9
00:00:58,559 --> 00:01:03,599
getters and setters, creating class variables and the idea of inheritance.

10
00:01:03,599 --> 00:01:11,079
But we're just going to do it in the context of this more involved example, the fitness tracker.

11
00:01:11,079 --> 00:01:16,179
So let me remind you first of all something we've been talking about and hopefully you

12
00:01:16,180 --> 00:01:21,580
understand at this point in our lectures on object-oriented programming.

13
00:01:21,580 --> 00:01:26,380
And that's the idea that when we write our own object types, we're writing code from

14
00:01:26,380 --> 00:01:28,500
two different perspectives, right?

15
00:01:28,500 --> 00:01:33,180
The first perspective is the one on the left-hand side here where we are making design decisions

16
00:01:33,180 --> 00:01:37,940
for how we want to implement this new object, this new data type.

17
00:01:37,940 --> 00:01:41,980
And when we make these design decisions, we decide the name of the object, we decide the

18
00:01:41,980 --> 00:01:48,219
attributes, which are either data or procedures, that we want the object to have.

19
00:01:48,219 --> 00:01:53,260
And then once we've decided on this and we've implemented our data type, then we can start

20
00:01:53,260 --> 00:01:55,579
to use the data type.

21
00:01:55,579 --> 00:02:01,219
And to use it, we are creating a whole bunch of objects of this type.

22
00:02:01,219 --> 00:02:05,620
And we're manipulating these objects in some interesting and useful way.

23
00:02:05,620 --> 00:02:10,540
So the left-hand side we're creating is blueprint, this abstract notion of an object.

24
00:02:10,539 --> 00:02:15,060
And the right-hand side, we are creating actual instances that we manipulate, right?

25
00:02:15,060 --> 00:02:20,539
So up until this object-oriented set of lectures, we've really just been working with the right-hand

26
00:02:20,539 --> 00:02:21,539
side, right?

27
00:02:21,539 --> 00:02:24,259
We've been working with objects that other people have created.

28
00:02:24,259 --> 00:02:29,139
But the big idea of these set of lectures is that we now get to create our own object types,

29
00:02:29,139 --> 00:02:31,379
so we get to write this code here.

30
00:02:31,379 --> 00:02:39,099
Okay, so we're going to write code to create a tracker for workouts.

31
00:02:39,099 --> 00:02:43,900
And today's lecture, there's going to be a sequence of things that we're going to do.

32
00:02:43,900 --> 00:02:47,219
We're going to start out with a really simple workout object, and then we're going to improve

33
00:02:47,219 --> 00:02:48,219
on it.

34
00:02:48,219 --> 00:02:52,459
So I've actually set out a little roadmap here on the board that we can follow.

35
00:02:52,459 --> 00:02:56,939
So every time we finish a little section, we'll check it off so it's just easier to understand

36
00:02:56,939 --> 00:02:59,659
where we are in today's lecture.

37
00:02:59,659 --> 00:03:03,859
So we're going to create first just a very simple workout object, sort of in the same

38
00:03:03,860 --> 00:03:07,300
spirit that we've created, we've been creating objects.

39
00:03:07,300 --> 00:03:12,620
Then we're going to improve on it a little bit by adding nicer methods and things like

40
00:03:12,620 --> 00:03:13,620
that.

41
00:03:13,620 --> 00:03:17,340
And then we're going to go through the idea of inheritance to create very specific types

42
00:03:17,340 --> 00:03:18,340
of workouts.

43
00:03:18,340 --> 00:03:23,500
So if we think about workouts, we have many different kinds of workouts, right?

44
00:03:23,500 --> 00:03:26,900
We've got biking, swimming, running.

45
00:03:26,900 --> 00:03:30,060
But really at the core of all these workouts, right?

46
00:03:30,060 --> 00:03:34,620
If we think about sort of the information related to just a very generic workout, not a

47
00:03:34,620 --> 00:03:40,379
running or swimming specific one or biking one, just a generic workout, there are some

48
00:03:40,379 --> 00:03:44,259
common properties that all of these workouts have, right?

49
00:03:44,259 --> 00:03:47,060
So I've listed them here, right?

50
00:03:47,060 --> 00:03:50,020
The workout might have an icon associated with it, right?

51
00:03:50,020 --> 00:03:57,219
So this, this, this, but whatever it may be, there is an icon sort of property for a workout,

52
00:03:57,219 --> 00:04:01,219
the kind of workouts, so biking, swimming, running, things like that.

53
00:04:01,219 --> 00:04:06,860
A date, so maybe a start date and an end date, start time, end time, that kind of information.

54
00:04:06,860 --> 00:04:13,620
The heart rate, maybe average heart rate throughout that entire activity, the distance, and

55
00:04:13,620 --> 00:04:15,539
the number of calories burned, right?

56
00:04:15,539 --> 00:04:21,620
All of these properties are common to any kind of workout that we might want to create.

57
00:04:21,620 --> 00:04:27,180
But now that we have specific kinds of workouts that we might want to create, we can

58
00:04:27,180 --> 00:04:32,060
actually think, well, in addition to these common properties, a swimming specific workout

59
00:04:32,060 --> 00:04:36,379
might actually have some more information that we'd like to save, right?

60
00:04:36,379 --> 00:04:39,019
And we'd like to allow the user to work with.

61
00:04:39,019 --> 00:04:42,699
So the swimming pace, maybe the stroke type, the hundred-year splits, things like that,

62
00:04:42,699 --> 00:04:44,100
for swimming.

63
00:04:44,100 --> 00:04:48,340
And for running, we might want to show the user the cadence, the running pace, the mild splits,

64
00:04:48,340 --> 00:04:51,899
and maybe the total elevation throughout that run.

65
00:04:51,899 --> 00:04:52,899
Right?

66
00:04:52,899 --> 00:04:57,060
But the idea here is that we have some core set of properties, and no matter what kind

67
00:04:57,060 --> 00:05:02,939
of workout we're creating, we would like to save, and we would like to allow the user

68
00:05:02,939 --> 00:05:07,139
to store and to do operations with.

69
00:05:07,139 --> 00:05:10,780
Now when we implement our workout class, we're not going to implement all of these.

70
00:05:10,780 --> 00:05:11,780
They're not all necessary.

71
00:05:11,780 --> 00:05:14,259
We're going to just keep some of the core ones.

72
00:05:14,259 --> 00:05:18,860
So the ones we're actually going to implement in this class are italicized, right?

73
00:05:18,860 --> 00:05:24,100
So we're going to keep the icon and the kind of workout, the start time, end times, and

74
00:05:24,100 --> 00:05:25,779
then the number of calories burned.

75
00:05:25,779 --> 00:05:31,139
That's something that we're going to just save as a really common set of attributes for

76
00:05:31,139 --> 00:05:32,139
a workout.

77
00:05:32,139 --> 00:05:36,179
But of course, you can see that if you make the design decision to improve upon this workout

78
00:05:36,179 --> 00:05:40,619
class, you might include a bunch of these other ones as well.

79
00:05:40,619 --> 00:05:45,899
Okay, so we're going to have to decide the data attributes.

80
00:05:45,899 --> 00:05:48,059
So we just mentioned on the previous slide, right?

81
00:05:48,059 --> 00:05:52,419
When we make design decisions, we figure out the attributes that we'd like to have for

82
00:05:52,419 --> 00:05:53,659
our object type.

83
00:05:53,660 --> 00:05:55,980
So that's the data and the behaviors.

84
00:05:55,980 --> 00:06:00,340
For the data for a workout, we've decided it would be the start time, the end time, and

85
00:06:00,340 --> 00:06:02,100
the number of calories burned.

86
00:06:02,100 --> 00:06:06,780
So those three things together, maybe start time is a string and time is a string and

87
00:06:06,780 --> 00:06:08,300
calories is a number, right?

88
00:06:08,300 --> 00:06:10,620
Either a float or a inch, whatever.

89
00:06:10,620 --> 00:06:16,140
Those three things together make up the object a workout.

90
00:06:16,140 --> 00:06:20,620
And then in terms of functional attributes, so these are the methods that our object might

91
00:06:20,620 --> 00:06:21,620
have.

92
00:06:21,620 --> 00:06:26,939
Well, we can have, of course, the ability to tell us the number of calories burned, so

93
00:06:26,939 --> 00:06:31,699
something like a getter method to set the number of calories burned if we accidentally

94
00:06:31,699 --> 00:06:37,379
inputted the wrong number, reset it, and then maybe something like displaying an information

95
00:06:37,379 --> 00:06:38,379
card, right?

96
00:06:38,379 --> 00:06:44,379
So something like this, if the user asks us to print a workout object, we might display

97
00:06:44,379 --> 00:06:47,340
information in this nice manner here.

98
00:06:47,340 --> 00:06:48,340
Okay.

99
00:06:49,219 --> 00:06:49,819
All right.

100
00:06:49,819 --> 00:06:51,939
So let's start defining our class.

101
00:06:51,939 --> 00:06:56,699
So this is a very simple workout class, so we're going to do the box number one up there

102
00:06:56,699 --> 00:06:58,060
before we improve on it.

103
00:06:58,060 --> 00:07:03,939
So this is in the same spirit as we have been defining classes in the past three lectures.

104
00:07:03,939 --> 00:07:10,019
So we tell Python, we're creating a new object by saying this is a class, and the name of this

105
00:07:10,019 --> 00:07:13,699
object, so the type of this object is workout.

106
00:07:13,699 --> 00:07:14,699
Okay.

107
00:07:14,699 --> 00:07:19,539
So the object is the generic Python object, so far so good, right?

108
00:07:19,539 --> 00:07:22,740
Now the first method we have to implement is the init method, right?

109
00:07:22,740 --> 00:07:28,379
It tells Python how to create an object of type workout, the constructor, and we've got

110
00:07:28,379 --> 00:07:32,459
a bunch of parameters in here because it's just a regular function, that's a little bit

111
00:07:32,459 --> 00:07:33,620
special.

112
00:07:33,620 --> 00:07:37,459
The first parameter of every method is, of course, self, right?

113
00:07:37,459 --> 00:07:41,620
Because when we call a method, we call it on an object, right?

114
00:07:41,620 --> 00:07:44,300
So some object dot this method name.

115
00:07:44,300 --> 00:07:50,139
The thing before the dot effectively gets mapped to the variable self, which is why every

116
00:07:50,139 --> 00:07:54,020
one of these methods has self as the first parameter.

117
00:07:54,020 --> 00:07:57,500
And then we've got a whole bunch of other parameters for how we would like to initialize

118
00:07:57,500 --> 00:07:58,980
a workout object.

119
00:07:58,980 --> 00:08:04,080
So we're going to say when we create a workout object, we're going to tell it the start

120
00:08:04,080 --> 00:08:07,860
time, the end time, and the number of calories per.

121
00:08:07,860 --> 00:08:09,860
Okay.

122
00:08:09,860 --> 00:08:13,660
So that's the function stub, I guess.

123
00:08:13,820 --> 00:08:15,700
How you create the object.

124
00:08:15,700 --> 00:08:17,900
And then what does this function actually do?

125
00:08:17,900 --> 00:08:19,939
What does this method actually do?

126
00:08:19,939 --> 00:08:24,540
Well, it does some of the usual things that we know at this point.

127
00:08:24,540 --> 00:08:30,460
So it basically maps every one of these input parameters to data attributes, self dot start,

128
00:08:30,460 --> 00:08:34,700
self dot end, and self dot calories.

129
00:08:34,700 --> 00:08:39,580
But in addition to just saving these as data attributes, the things that are passed in

130
00:08:39,580 --> 00:08:42,779
when you create the object, we would like to do two more things.

131
00:08:42,779 --> 00:08:45,539
We're creating two more data attributes.

132
00:08:45,539 --> 00:08:50,259
So in total, a workout object is defined by five data attributes.

133
00:08:50,259 --> 00:08:53,779
These last two data attributes, we don't need to pass in.

134
00:08:53,779 --> 00:08:58,259
We're just going to, by default, make them two strings.

135
00:08:58,259 --> 00:09:04,259
The icon is going to be the string, this sweating person emoji.

136
00:09:04,259 --> 00:09:08,259
And you can have emojis inside strings, which is actually pretty cool.

137
00:09:08,259 --> 00:09:10,860
And the kind is going to be just the kind of workout.

138
00:09:10,860 --> 00:09:13,019
So we're just going to set it to be the string workout.

139
00:09:13,019 --> 00:09:15,860
When we create running workouts, it'll just be the string running.

140
00:09:15,860 --> 00:09:18,379
When we create biking workouts, it'll be a string biking, right?

141
00:09:18,379 --> 00:09:20,100
Whatever you want it to be.

142
00:09:20,100 --> 00:09:23,620
And we're going to see where these, where these shrub later on.

143
00:09:23,620 --> 00:09:26,820
OK, so that's the definition of my class workout.

144
00:09:26,820 --> 00:09:29,220
And then for now, that's it.

145
00:09:29,220 --> 00:09:31,779
That's all we have in terms of the class definition.

146
00:09:31,779 --> 00:09:34,860
Now what happens when we create an actual workout object?

147
00:09:34,860 --> 00:09:37,340
Well, we invoke the name of the class.

148
00:09:37,340 --> 00:09:40,860
So we say here, workout, right?

149
00:09:40,860 --> 00:09:43,660
And we're going to save this object to the right-hand side

150
00:09:43,660 --> 00:09:47,100
of the equal sign as variable my underscore workout,

151
00:09:47,100 --> 00:09:49,460
so far review.

152
00:09:49,460 --> 00:09:53,660
We pass in the parameters that the workout object expects.

153
00:09:53,660 --> 00:09:56,379
So here's a string representing the start time, a string

154
00:09:56,379 --> 00:09:58,899
representing the end time, and the calories burned

155
00:09:58,899 --> 00:10:00,620
for this particular workout, 200.

156
00:10:04,580 --> 00:10:06,820
Yes, good.

157
00:10:06,820 --> 00:10:08,500
OK.

158
00:10:08,500 --> 00:10:12,940
So then we can add a whole bunch more methods to our class.

159
00:10:12,940 --> 00:10:14,620
That was just the init method.

160
00:10:14,620 --> 00:10:16,620
But last lecture, I mentioned that it's

161
00:10:16,620 --> 00:10:20,379
important to add getters and setter methods

162
00:10:20,379 --> 00:10:25,860
to allow the user to grab or set various data attributes.

163
00:10:25,860 --> 00:10:28,100
So here I've got three getter methods

164
00:10:28,100 --> 00:10:30,820
to grab for me the calories start time and end time,

165
00:10:30,820 --> 00:10:34,620
and three setter methods to set the calories start time

166
00:10:34,620 --> 00:10:35,260
and end time.

167
00:10:37,820 --> 00:10:41,340
All right.

168
00:10:41,340 --> 00:10:43,260
So what I wanted to show you, and this

169
00:10:43,260 --> 00:10:45,340
is not something we've actually seen before,

170
00:10:45,340 --> 00:10:48,260
I wanted to show you that every time you create

171
00:10:48,260 --> 00:10:52,060
an object of some type, or even an object that already exists,

172
00:10:52,060 --> 00:10:55,900
you can actually look into sort of where

173
00:10:55,900 --> 00:10:59,780
this object is stored in memory, which is kind of cool.

174
00:10:59,780 --> 00:11:02,500
So if we think about the class definition

175
00:11:02,500 --> 00:11:05,340
that we've done so far, so not creating an actual instance,

176
00:11:05,340 --> 00:11:07,860
just defining the class.

177
00:11:07,860 --> 00:11:11,220
This class definition is actually kind of like an object

178
00:11:11,220 --> 00:11:14,139
stored away in Python memory.

179
00:11:14,139 --> 00:11:17,700
So here I have my workout class, and associated

180
00:11:17,700 --> 00:11:20,180
with my workout class definition, Python

181
00:11:20,180 --> 00:11:23,300
knows about all of these methods that you're

182
00:11:23,300 --> 00:11:26,180
allowed to do with this Python class.

183
00:11:26,180 --> 00:11:28,580
And this is called the class state dictionary.

184
00:11:28,580 --> 00:11:30,220
So it's a dictionary that basically

185
00:11:30,220 --> 00:11:32,820
holds the state of your object.

186
00:11:32,820 --> 00:11:36,340
So I wanted to show you what that looks like in code.

187
00:11:36,340 --> 00:11:38,660
So this is my workout class.

188
00:11:38,660 --> 00:11:41,500
And the way you access the state dictionary

189
00:11:41,500 --> 00:11:44,020
is by invoking the name of your class.

190
00:11:44,020 --> 00:11:48,060
So not an instance, the name of the actual class, dot this

191
00:11:48,060 --> 00:11:51,460
dunder method, double underscore, double underscore.

192
00:11:51,460 --> 00:11:54,940
So this holds the dictionary, the state dictionary.

193
00:11:54,940 --> 00:11:57,540
And if we just access the keys, we're

194
00:11:57,540 --> 00:12:02,780
going to see here every single method we've defined in our class.

195
00:12:02,779 --> 00:12:04,500
So you see here, here's my dictionary.

196
00:12:04,500 --> 00:12:07,699
I could cast a tool list if I wanted to, but not necessary.

197
00:12:07,699 --> 00:12:10,459
But you can see every single method that we've defined.

198
00:12:10,459 --> 00:12:13,860
So all getters, all our setters, the init method,

199
00:12:13,860 --> 00:12:18,100
the double underscore, dot actually grabs

200
00:12:18,100 --> 00:12:22,819
for us this doc string that you've put right under the class

201
00:12:22,819 --> 00:12:25,819
definition.

202
00:12:25,819 --> 00:12:27,299
So that's kind of cool.

203
00:12:27,299 --> 00:12:28,860
So that's the dictionary keys.

204
00:12:28,860 --> 00:12:31,339
And of course, as we know, keys have values

205
00:12:31,339 --> 00:12:32,339
associated with them.

206
00:12:32,340 --> 00:12:35,820
So the values associated with each one of these keys

207
00:12:35,820 --> 00:12:38,820
is going to be, and we can see here.

208
00:12:38,820 --> 00:12:44,060
So for example, the value associated with the doc string

209
00:12:44,060 --> 00:12:48,420
is going to be literally the thing that I printed out,

210
00:12:48,420 --> 00:12:51,660
the little doc string that I put right underneath my class

211
00:12:51,660 --> 00:12:53,180
definition.

212
00:12:53,180 --> 00:12:57,100
So now it knows the doc string for this class that I just created.

213
00:12:57,100 --> 00:13:00,139
And the values associated with my getter methods

214
00:13:00,139 --> 00:13:01,660
and my setter methods and init method

215
00:13:02,179 --> 00:13:04,740
and all the methods I created are just the locations

216
00:13:04,740 --> 00:13:08,259
and memory where Python can find these methods to run.

217
00:13:08,259 --> 00:13:11,139
They don't have actual values with them associated with them.

218
00:13:11,139 --> 00:13:13,980
Of course, because they're just method definitions.

219
00:13:13,980 --> 00:13:18,539
But Python just knows where to go in which memory location

220
00:13:18,539 --> 00:13:21,779
to actually run this function.

221
00:13:21,779 --> 00:13:24,740
So that's kind of cool to know.

222
00:13:25,659 --> 00:13:29,740
OK, so that's the state dictionary of my definition,

223
00:13:29,740 --> 00:13:32,340
the implementation of my class.

224
00:13:32,340 --> 00:13:35,940
Now, what happens when I create an actual instance?

225
00:13:35,940 --> 00:13:38,580
So here I've got my workout equals,

226
00:13:38,580 --> 00:13:43,820
and now I've got this actual instance of this class type workout.

227
00:13:43,820 --> 00:13:47,779
When Python sees this line, it says, OK, what kind of object

228
00:13:47,779 --> 00:13:50,620
do you want to create, a workout object?

229
00:13:50,620 --> 00:13:53,659
It looks at the init method of that workout object.

230
00:13:53,659 --> 00:13:56,579
And then it runs all the lines associated with that workout object.

231
00:13:56,579 --> 00:13:59,579
So now it creates a new object in memory,

232
00:13:59,579 --> 00:14:02,139
puts that at some memory location.

233
00:14:02,139 --> 00:14:06,379
This object is going to be of type workout class.

234
00:14:06,379 --> 00:14:10,500
And now this object is going to have its own state dictionary.

235
00:14:10,500 --> 00:14:12,860
Where in the object state dictionary,

236
00:14:12,860 --> 00:14:15,219
we're not storing methods or things like that.

237
00:14:15,219 --> 00:14:20,299
We're storing the actual data attributes associated with this object.

238
00:14:20,299 --> 00:14:21,299
All right?

239
00:14:22,299 --> 00:14:25,019
So this object of the data attributes

240
00:14:25,019 --> 00:14:28,059
are all the things that you access via the self.keyword,

241
00:14:28,059 --> 00:14:29,059
right?

242
00:14:29,059 --> 00:14:33,219
Self.icon, self.kind, self.start, self.end, and self.calories.

243
00:14:33,219 --> 00:14:36,299
So we can actually go in the code, just like we did when we looked

244
00:14:36,299 --> 00:14:40,099
at the class state dictionary, and look at the state dictionary

245
00:14:40,099 --> 00:14:43,740
for one specific object, one instance.

246
00:14:43,740 --> 00:14:49,459
So again, we can call the double underscore dict method on this instance.

247
00:14:49,460 --> 00:14:53,780
So now I have an actual object that has some values associated with it.

248
00:14:53,780 --> 00:14:58,420
And if I look at just the keys, we see these are the data attributes

249
00:14:58,420 --> 00:15:01,980
associated with an object of type workout, right?

250
00:15:01,980 --> 00:15:04,940
I've got my five data attributes.

251
00:15:04,940 --> 00:15:07,740
And then the values associated with those keys

252
00:15:07,740 --> 00:15:11,660
are going to be the values that are specific to this object, right?

253
00:15:11,660 --> 00:15:13,860
So my start is this date here.

254
00:15:13,860 --> 00:15:15,620
My end is this date here.

255
00:15:15,620 --> 00:15:16,980
Calories was 200.

256
00:15:16,980 --> 00:15:19,300
The icon was the low sweaty person emoji.

257
00:15:19,299 --> 00:15:21,059
And the kind of workout is to work out.

258
00:15:21,059 --> 00:15:29,859
So it's kind of neat to be able to look into that sort of detail

259
00:15:29,859 --> 00:15:33,699
of where things are stored inside memory.

260
00:15:33,699 --> 00:15:34,859
OK.

261
00:15:34,859 --> 00:15:38,299
So we saw how to create an instance of an object,

262
00:15:38,299 --> 00:15:42,179
and we can create a whole bunch of workouts that we then store, right?

263
00:15:42,179 --> 00:15:46,259
And then we can use Don notation to access all of these attributes, right?

264
00:15:46,259 --> 00:15:50,500
So we can either access attributes directly or we can access methods, right?

265
00:15:50,500 --> 00:15:51,580
We already know this.

266
00:15:51,580 --> 00:15:58,019
So last lecture, I said that you can use Don notation to access data attributes.

267
00:15:58,019 --> 00:16:01,580
So here we're accessing the calories value, right?

268
00:16:01,580 --> 00:16:02,899
And that's fine.

269
00:16:02,899 --> 00:16:06,779
But what's preferred is to use the getter methods, right?

270
00:16:06,779 --> 00:16:09,700
So get calories, well, in this particular case,

271
00:16:09,700 --> 00:16:15,019
return the exact same value as just accessing the calories data attribute.

272
00:16:15,259 --> 00:16:20,939
But the note that I made last lecture was that it was better to use a getter method

273
00:16:20,939 --> 00:16:25,059
because the implementation behind the scenes might change, right?

274
00:16:25,059 --> 00:16:32,779
And if the implementation changes, then if you access the calories data attribute directly,

275
00:16:32,779 --> 00:16:35,299
your code might crash.

276
00:16:35,299 --> 00:16:41,539
But not only that, somebody who's writing a getter method for this workout function

277
00:16:41,539 --> 00:16:47,779
might actually make that method be a lot more complex than just returning that data attribute.

278
00:16:47,779 --> 00:16:50,740
And that's what we're going to see in the next slide, right?

279
00:16:50,740 --> 00:16:57,419
So the idea behind using these consistent methods instead of accessing using data attributes

280
00:16:57,419 --> 00:17:01,659
is that you want to keep information hidden, right?

281
00:17:01,659 --> 00:17:05,420
You don't want to start messing around with looking at how something is implemented

282
00:17:05,420 --> 00:17:10,659
because that goes against the principle of abstraction, modularity, and information hiding, right?

283
00:17:10,660 --> 00:17:16,420
You want to keep things hidden because you want to use the objects that somebody else has created

284
00:17:16,420 --> 00:17:18,420
in an icy, consistent manner.

285
00:17:18,420 --> 00:17:25,900
The way we use them in a consistent manner is by always using methods that are associated with that object type.

286
00:17:25,900 --> 00:17:26,940
Okay?

287
00:17:26,940 --> 00:17:32,900
And so using getter methods might have seemed inconsequential when we wrote like the animal class last lecture,

288
00:17:32,900 --> 00:17:38,580
but it's going to seem, it's going to be a lot more important in this particular lecture.

289
00:17:38,579 --> 00:17:43,980
So with that, we finished our simple workout class.

290
00:17:43,980 --> 00:17:49,579
And now we're going to change the implementation just a little bit, right?

291
00:17:49,579 --> 00:17:56,539
And what we're going to do is we're going to make a change to the way that we store the information.

292
00:17:56,539 --> 00:18:01,299
We're going to use a class variable, and I'll remind you what a class variable is in the next slide.

293
00:18:01,299 --> 00:18:04,419
And we're going to make a change to the getcalories method.

294
00:18:04,420 --> 00:18:12,180
And we're going to allow the user to say, hey, I'm going to create this workout object,

295
00:18:12,180 --> 00:18:13,700
but I don't know about you.

296
00:18:13,700 --> 00:18:18,900
I don't know how many calories I burn, right, when I do a workout for, you know, 40 minutes, right?

297
00:18:18,900 --> 00:18:20,940
I don't know that right off the bat.

298
00:18:20,940 --> 00:18:25,340
So if the user doesn't supply the number of calories burned,

299
00:18:25,340 --> 00:18:31,420
we're going to have our getcalories method kind of estimate those calories burned

300
00:18:31,420 --> 00:18:35,940
based on the duration of that workout, right?

301
00:18:35,940 --> 00:18:39,820
So we're going to allow the user to either supply the number of calories,

302
00:18:39,820 --> 00:18:42,380
in which case they probably know what they're doing.

303
00:18:42,380 --> 00:18:47,860
And then when they ask us to get the calories, we're going to use those.

304
00:18:47,860 --> 00:18:51,900
Or we're going to allow the user to not supply the number of calories,

305
00:18:51,900 --> 00:18:59,900
and instead estimate those calories based on the duration that they said this workout lasted.

306
00:18:59,900 --> 00:19:04,420
All right, so that's the big change that we're going to do here in the workout class, right?

307
00:19:04,420 --> 00:19:07,340
So we're going to do a better getcalories method.

308
00:19:07,340 --> 00:19:12,940
All right, so this is the new implementation of my workout class.

309
00:19:12,940 --> 00:19:18,500
First thing you'll notice is we're using this class variable, right?

310
00:19:18,500 --> 00:19:23,220
We talked about this last lecture when we did the rabbit's example.

311
00:19:23,220 --> 00:19:29,860
In the rabbit's example, we had each rabbit change this class variable value.

312
00:19:29,859 --> 00:19:33,740
In this example, I'm not going to change this class variable value.

313
00:19:33,740 --> 00:19:38,539
I'm actually just going to use it as a variable that's that every one of these instances

314
00:19:38,539 --> 00:19:40,779
is going to be able to access, right?

315
00:19:40,779 --> 00:19:43,500
And I'm just not going to change it, which is fine.

316
00:19:43,500 --> 00:19:47,379
You don't have to change this class variable.

317
00:19:47,379 --> 00:19:52,379
So this class variable will represent how many calories per hour are burnt.

318
00:19:52,379 --> 00:19:54,779
Okay, so just a number.

319
00:19:54,779 --> 00:19:59,099
And then the init method, and again, we're going to make a different init method

320
00:19:59,099 --> 00:20:01,059
than what we saw in the previous slides.

321
00:20:01,059 --> 00:20:03,819
The init method is going to be new and improved.

322
00:20:03,819 --> 00:20:07,339
We're going to take in still the same number of parameters,

323
00:20:07,339 --> 00:20:11,699
but the calories are going to have a default value, right?

324
00:20:11,699 --> 00:20:14,539
So if the user actually passes in the number of calories,

325
00:20:14,539 --> 00:20:17,619
the value for calories here, self-dog calories,

326
00:20:17,619 --> 00:20:20,179
will be whatever the user passed in.

327
00:20:20,179 --> 00:20:23,539
But if the user doesn't pass in the number of calories,

328
00:20:23,539 --> 00:20:28,740
then this parameter here, self-dog calories, will be none.

329
00:20:29,660 --> 00:20:33,140
None being used to represent the absence of a value.

330
00:20:34,259 --> 00:20:37,460
Okay, so two options here when we create the object.

331
00:20:39,460 --> 00:20:42,700
Other things you might notice is that the self-sets start,

332
00:20:42,700 --> 00:20:47,220
so the start time and the end time are no longer just start and end.

333
00:20:47,220 --> 00:20:48,220
Okay.

334
00:20:50,339 --> 00:20:52,299
I'm going to talk about this on the next slide,

335
00:20:52,299 --> 00:20:56,859
but essentially what I'm doing here is I'm saying the start and end

336
00:20:56,859 --> 00:20:59,099
will be passed in as strings,

337
00:20:59,099 --> 00:21:00,859
just like we have been in the past, right?

338
00:21:00,859 --> 00:21:04,219
Like September 1st, 2022, 1.35 PM.

339
00:21:04,219 --> 00:21:05,059
That's fine.

340
00:21:05,059 --> 00:21:08,059
We can still pass in the start time as a string.

341
00:21:08,059 --> 00:21:10,979
But when I'm storing it inside my object,

342
00:21:10,979 --> 00:21:15,059
I'm actually going to store it as whatever this thing gives me.

343
00:21:15,059 --> 00:21:18,979
And this thing is actually going to be returning

344
00:21:18,979 --> 00:21:22,939
or parsing the string as a new data type,

345
00:21:22,939 --> 00:21:24,500
something we've not worked with before,

346
00:21:24,500 --> 00:21:26,619
called a date time object.

347
00:21:26,619 --> 00:21:29,579
Okay, we're going to look at this on the next slide in a little bit more detail.

348
00:21:29,579 --> 00:21:34,259
But for now, all we need to know is that the self dot start and self dot end

349
00:21:34,259 --> 00:21:37,500
will be a new data type, a date time object.

350
00:21:38,700 --> 00:21:40,940
Okay, so that's my init method.

351
00:21:40,940 --> 00:21:43,140
So few changes.

352
00:21:43,140 --> 00:21:47,900
Now my get calories method will look a little bit different as well, right?

353
00:21:47,900 --> 00:21:50,660
We're not just returning self dot calories,

354
00:21:50,660 --> 00:21:54,420
like we had in that simple workout class, right?

355
00:21:54,420 --> 00:21:56,779
We're going to do a little switch.

356
00:21:56,779 --> 00:22:01,300
So if the user supplies the number of calories,

357
00:22:01,300 --> 00:22:04,900
so if the calories here were actually passed in,

358
00:22:04,900 --> 00:22:09,420
then we don't resort to the calories being done, right?

359
00:22:09,420 --> 00:22:12,980
Calories will be 100 or 450 or whatever it is.

360
00:22:12,980 --> 00:22:16,500
And then this if statement is false, so we go on the else,

361
00:22:16,500 --> 00:22:18,220
and we just return that value.

362
00:22:18,220 --> 00:22:22,820
So it's exactly the same behavior as in my simple workout class from back there.

363
00:22:23,819 --> 00:22:28,859
But if the user does not supply the number of calories when they create an object,

364
00:22:28,859 --> 00:22:31,539
then the calories will be none here.

365
00:22:31,539 --> 00:22:36,059
When I create my object, the data attribute self dot calories will be none here.

366
00:22:36,059 --> 00:22:40,899
So when I ask the workout to tell me how many calories I burned,

367
00:22:40,899 --> 00:22:45,019
we're going to go inside the if statement, and we're going to do something.

368
00:22:45,019 --> 00:22:53,099
The thing we're going to do is subtract the end time minus the start time.

369
00:22:53,099 --> 00:22:59,619
And something like this is allowed on a date time object,

370
00:22:59,619 --> 00:23:01,940
but obviously not allowed on strings,

371
00:23:01,940 --> 00:23:06,779
which is why I'm converting these strings representing a date and a time

372
00:23:06,779 --> 00:23:08,339
into this date time object.

373
00:23:08,339 --> 00:23:14,859
This subtraction here gives me something like something

374
00:23:14,859 --> 00:23:17,899
that's called a time delta object.

375
00:23:17,899 --> 00:23:19,819
And it's just a new time of object.

376
00:23:19,819 --> 00:23:26,059
We haven't really worked with before, but it's an object type that we can run a method on.

377
00:23:26,059 --> 00:23:29,859
And the method is going to be the total seconds.

378
00:23:29,859 --> 00:23:34,659
So for this time delta object, so 10 minutes or 18 minutes or whatever it may be,

379
00:23:34,659 --> 00:23:37,019
if we run this method called total seconds,

380
00:23:37,019 --> 00:23:40,779
it will tell us how many seconds are in that time delta object.

381
00:23:40,779 --> 00:23:44,099
Divide by 3, 6, 0, 0 to tell us the number of hours.

382
00:23:44,099 --> 00:23:49,180
And then multiply by the class variable calpere hour.

383
00:23:49,180 --> 00:23:54,619
We'll tell us how many calories were burned in that elapsed time.

384
00:23:54,619 --> 00:23:56,619
OK.

385
00:23:56,619 --> 00:23:57,119
Yeah.

386
00:23:57,119 --> 00:24:01,460
We can do like the workout dot, and then like all of that.

387
00:24:01,460 --> 00:24:04,059
Oh, workout dot is just this thing here.

388
00:24:04,059 --> 00:24:06,740
Work out dot calpere hour, that's just this.

389
00:24:06,740 --> 00:24:09,779
And then we multiply by that number.

390
00:24:10,660 --> 00:24:11,660
OK.

391
00:24:11,660 --> 00:24:13,660
Questions about that?

392
00:24:13,660 --> 00:24:17,660
OK.

393
00:24:17,660 --> 00:24:23,420
So essentially, this is going to do the estimation for us for how many calories were burned in some

394
00:24:23,420 --> 00:24:26,259
number of hours or some number of minutes.

395
00:24:26,259 --> 00:24:30,779
Now, let's demystify this start and end time stuff.

396
00:24:30,779 --> 00:24:39,339
So the way that we are converting to this string to a daytime object is by using this

397
00:24:39,339 --> 00:24:40,339
library up here.

398
00:24:40,339 --> 00:24:46,839
So a library is a collection of objects, a collection of maybe also functions, that all

399
00:24:46,839 --> 00:24:49,179
deal with the same type of things.

400
00:24:49,179 --> 00:24:53,819
So in this particular case, they all deal with dates and times and manipulating dates and

401
00:24:53,819 --> 00:24:55,459
times and things like that.

402
00:24:55,459 --> 00:24:59,299
In the last lecture, we saw an example of a library, that random library, that allowed

403
00:24:59,299 --> 00:25:01,899
us to do operations with random numbers.

404
00:25:01,899 --> 00:25:06,299
So it's just a nice collection of functions and objects that deal with one sort of common

405
00:25:06,299 --> 00:25:07,819
thing.

406
00:25:07,819 --> 00:25:16,579
So in this particular case, there is a function inside that library, this parser dot parse function,

407
00:25:16,579 --> 00:25:23,220
that takes in a string and can parse it to this daytime object.

408
00:25:23,220 --> 00:25:28,059
So if we print the type of start date and the type of end date, it will show us that it's

409
00:25:28,059 --> 00:25:30,659
this type date time thing.

410
00:25:30,659 --> 00:25:31,899
So it's a new object type.

411
00:25:31,899 --> 00:25:35,500
We haven't worked with it yet, but it's an object type like a list is, like a dictionary

412
00:25:35,500 --> 00:25:39,140
and it's like a word.

413
00:25:39,140 --> 00:25:45,660
And so the reason why we're doing the conversion is because we don't want to deal with the messy

414
00:25:45,660 --> 00:25:52,299
part of grabbing in a string and then figuring out how long the lapse time is based on just

415
00:25:52,299 --> 00:25:54,980
parsing characters throughout this string.

416
00:25:54,980 --> 00:25:56,779
I certainly don't want to do that.

417
00:25:56,779 --> 00:25:57,779
But you know what?

418
00:25:57,779 --> 00:26:02,220
Somebody who was passionate about doing that did it in this nice little library for us.

419
00:26:02,220 --> 00:26:08,460
So all we're doing is just reusing the work that they've done to save it as this object.

420
00:26:08,460 --> 00:26:13,900
And then they basically said, let me implement the minus sign to work with objects of type

421
00:26:13,900 --> 00:26:16,339
date time.

422
00:26:16,339 --> 00:26:18,539
And it makes things like this very easy.

423
00:26:18,539 --> 00:26:22,180
We can just subtract two dates from each other.

424
00:26:22,180 --> 00:26:24,380
And it'll tell us the elapsed time.

425
00:26:24,380 --> 00:26:28,860
We can run a method on that elapsed time to tell us how many seconds that elapsed

426
00:26:28,859 --> 00:26:29,859
time is.

427
00:26:29,859 --> 00:26:30,859
So pretty cool.

428
00:26:30,859 --> 00:26:31,859
Yeah.

429
00:26:31,859 --> 00:26:32,859
Yeah.

430
00:26:32,859 --> 00:26:38,859
The total seconds gets imported with the date you tell parser.

431
00:26:38,859 --> 00:26:39,859
Yeah, exactly.

432
00:26:39,859 --> 00:26:48,859
It's an operation that can be run on this date time delta, I think, type object here.

433
00:26:48,859 --> 00:26:52,859
I think there might be like total minutes and total hours also.

434
00:26:52,859 --> 00:26:53,859
Yeah.

435
00:26:53,859 --> 00:26:58,859
So is parser on the boss and then like dot parsing dot total seconds or something?

436
00:26:58,859 --> 00:26:59,859
Yeah, exactly.

437
00:26:59,859 --> 00:27:00,859
Yeah.

438
00:27:00,859 --> 00:27:01,859
Yeah.

439
00:27:01,859 --> 00:27:02,859
So yeah.

440
00:27:02,859 --> 00:27:07,859
When did the code should be imported?

441
00:27:07,859 --> 00:27:08,859
Yeah.

442
00:27:08,859 --> 00:27:10,859
So we usually import all our stuff right at the top.

443
00:27:10,859 --> 00:27:11,859
So I was just going to show the code.

444
00:27:11,859 --> 00:27:15,859
So here I've got everything that I need to import way at the beginning.

445
00:27:15,859 --> 00:27:20,859
So it's kind of like Python goes and copies and pastes everything in those files and puts the

446
00:27:20,859 --> 00:27:21,859
code in your file.

447
00:27:21,859 --> 00:27:25,859
So now everything that's defined in those files is now accessible in your file.

448
00:27:25,859 --> 00:27:32,859
You just have to sort of do this, the dot notation on these libraries here.

449
00:27:32,859 --> 00:27:38,859
So I just wanted to show you down here.

450
00:27:38,859 --> 00:27:42,859
So here I shouldn't have imported again, but it's just part of this exercise.

451
00:27:42,859 --> 00:27:45,859
So here I've got the parser being imported.

452
00:27:45,859 --> 00:27:46,859
I've got the start time.

453
00:27:46,859 --> 00:27:47,859
These are just strings, right?

454
00:27:47,859 --> 00:27:49,859
Nothing special about them.

455
00:27:49,859 --> 00:27:52,859
And we can parse them.

456
00:27:52,859 --> 00:27:57,859
So I've got these strings parsed and the types of these objects.

457
00:27:57,859 --> 00:28:00,859
Again, are not strings anymore now that I've parsed them, right?

458
00:28:00,859 --> 00:28:07,859
Start date and end date are now these date time objects, date time dot date time.

459
00:28:07,859 --> 00:28:09,859
And then we can do operations like this.

460
00:28:09,859 --> 00:28:16,859
So if I just simply subtract one time from the other and print that time delta object,

461
00:28:16,859 --> 00:28:19,859
Python puts it in this nice little format for me.

462
00:28:19,859 --> 00:28:20,859
I should just comment these out.

463
00:28:20,859 --> 00:28:21,859
It's hard to see.

464
00:28:21,859 --> 00:28:23,859
It puts it in this nice little format for me.

465
00:28:23,859 --> 00:28:25,859
So here's a number of seconds.

466
00:28:25,859 --> 00:28:27,859
A hour is colon, number of minutes, colon, number of seconds.

467
00:28:27,859 --> 00:28:32,859
So this is the STR method that was implemented for that kind of object.

468
00:28:32,859 --> 00:28:34,859
It prints it in this nice little form, right?

469
00:28:34,859 --> 00:28:37,859
A hour's colon, minutes, colon seconds.

470
00:28:37,859 --> 00:28:42,859
And then we can do this useful thing, which is what we're doing in our code.

471
00:28:43,859 --> 00:28:47,859
We can run the total seconds function on an object of this time delta.

472
00:28:47,859 --> 00:28:53,859
And it tells us that this 10 minutes, right, is equivalent to 600 seconds.

473
00:28:53,859 --> 00:28:55,859
It's a very, very cool, very useful.

474
00:28:55,859 --> 00:28:58,859
And you know, we don't even need to know how any of that is implemented.

475
00:28:58,859 --> 00:29:00,859
We just make use of these functions.

476
00:29:00,859 --> 00:29:03,859
What's cool about the parser though?

477
00:29:03,859 --> 00:29:05,859
And this will be really, really cool.

478
00:29:05,859 --> 00:29:10,859
You can actually write the time and the date in any format.

479
00:29:11,859 --> 00:29:16,859
It doesn't have to be month slash day slash year space this, right?

480
00:29:16,859 --> 00:29:18,859
So this is kind of how I wrote this one.

481
00:29:18,859 --> 00:29:24,859
We can actually write it something like Sept 30, 2021, right, like that.

482
00:29:24,859 --> 00:29:26,859
And it knows how to read that.

483
00:29:26,859 --> 00:29:28,859
Or we can write out September all the way.

484
00:29:28,859 --> 00:29:33,859
Put the comma there, put the comma there, put the PM lower case, and closer to the time.

485
00:29:33,859 --> 00:29:35,859
And it knows how to read that as well.

486
00:29:35,859 --> 00:29:39,859
So it knows how to parse all these different ways of writing the dates

487
00:29:39,859 --> 00:29:47,859
and save them as these daytime objects for using in this very nice, very readable way.

488
00:29:47,859 --> 00:29:50,859
Isn't that cool?

489
00:29:50,859 --> 00:29:51,859
Okay.

490
00:29:51,859 --> 00:29:58,859
So very useful if you ever want to work with daytime.

491
00:29:58,859 --> 00:29:59,859
Okay.

492
00:29:59,859 --> 00:30:03,859
So now, okay.

493
00:30:03,859 --> 00:30:08,859
So now this is our state dictionary sort of for how we ended up with our simple workout class.

494
00:30:08,859 --> 00:30:11,859
But what are the changes we made to improve it?

495
00:30:11,859 --> 00:30:16,859
Well, in my state dictionary, I added my class variable, calories per hour.

496
00:30:16,859 --> 00:30:22,859
So now this calorie per hour is available for any instance that I create.

497
00:30:22,859 --> 00:30:23,859
Right?

498
00:30:23,859 --> 00:30:29,859
We already knew this, but this is kind of the representation of that.

499
00:30:29,859 --> 00:30:32,859
And we didn't add anything to the instances.

500
00:30:32,859 --> 00:30:35,859
Those haven't changed, right?

501
00:30:35,859 --> 00:30:36,859
Okay.

502
00:30:36,859 --> 00:30:38,859
So little aside on class variables, right?

503
00:30:38,859 --> 00:30:43,859
So this cal per hour here is available for all of these instances.

504
00:30:43,859 --> 00:30:47,859
Now, a class variable, right, is just like an instance variable.

505
00:30:47,859 --> 00:30:52,859
We can access it from within the class definition, which is how it should always be done.

506
00:30:52,859 --> 00:31:01,859
But Python being Python, they allow you to access that class variable from outside the class definition as well.

507
00:31:01,859 --> 00:31:10,859
So we can do something like this so we can call the cal per hour class variable on the name of this class, right?

508
00:31:10,859 --> 00:31:12,859
Outside of the definition, right?

509
00:31:12,859 --> 00:31:13,859
This is my class definition.

510
00:31:13,859 --> 00:31:15,859
It ended here, right?

511
00:31:15,859 --> 00:31:18,859
And this is just code that's outside of the definition.

512
00:31:18,859 --> 00:31:22,859
And Python will be happy to tell you what that value is.

513
00:31:22,859 --> 00:31:28,859
Python will also be happy to tell you what that value is if you access it through an instance.

514
00:31:28,859 --> 00:31:31,859
So here I've created an actual instance of type workout.

515
00:31:31,859 --> 00:31:35,859
So I'm not calling the cal per hour on the name of my class.

516
00:31:35,859 --> 00:31:38,859
I'm just grabbing it through one of my instances.

517
00:31:38,859 --> 00:31:43,859
And if I print instance.cal per hour, Python will also happily tell me what that value is.

518
00:31:43,859 --> 00:31:52,859
And Python being Python, they're going to allow you to change the value of that cal per hour outside of the class definition as well.

519
00:31:52,859 --> 00:31:54,859
So here outside the class definition,

520
00:31:54,859 --> 00:31:59,859
I'm going to say workout.cal per hour equals 250.

521
00:31:59,859 --> 00:32:14,859
So now the cal per hour is changed permanently to 250, no matter how I access it, either by calling the name of my class directly or by calling the class variable through one of the instances.

522
00:32:14,859 --> 00:32:16,859
Okay.

523
00:32:16,859 --> 00:32:18,859
So no good.

524
00:32:19,859 --> 00:32:20,859
So no good.

525
00:32:20,859 --> 00:32:29,859
Never ever work with these data attributes or access class variables outside the class definition.

526
00:32:29,859 --> 00:32:35,859
If you really want the user to be able to do something like this, right, then write a method for it.

527
00:32:35,859 --> 00:32:43,859
And then they can change it or access it in a consistent way, the way that you want them to access it.

528
00:32:43,859 --> 00:32:52,859
So just a little bit of practice for you guys to create a couple of workout objects just to make sure everyone's on the same page we understand what a workout object is.

529
00:32:52,859 --> 00:32:58,859
So just create for me two objects and then print the calories for these workout objects.

530
00:32:58,859 --> 00:33:03,859
So the first one I would like you to create name the variable W underscore one.

531
00:33:03,859 --> 00:33:09,859
It started this workout started in January, in 2001, 330, and it went till 4 p.m.

532
00:33:09,859 --> 00:33:12,859
And you want to estimate the calories from this workout.

533
00:33:12,859 --> 00:33:18,859
You don't know how many calories you burned, right, and then print the value for that calories.

534
00:33:18,859 --> 00:33:24,859
And then the second object same start date, same end date, but you know that you burned 300 calories.

535
00:33:24,859 --> 00:33:29,859
So create these two objects and then print the number of calories burned.

536
00:33:29,859 --> 00:33:36,859
So this is online, 199.

537
00:33:36,859 --> 00:33:42,859
It's okay to scroll back up, right, to the init method of workout just to see how it's implemented.

538
00:33:42,859 --> 00:33:46,859
No reason you should have memorized it by now, right?

539
00:33:46,859 --> 00:33:58,859
All right, how do we create these two objects? Let's W1 equal to.

540
00:33:58,859 --> 00:34:03,859
Yep.

541
00:34:03,859 --> 00:34:09,859
The start date would be first, so I can just as a string, perfect.

542
00:34:09,859 --> 00:34:12,859
Yep.

543
00:34:12,859 --> 00:34:17,859
I don't think I'll say that. I don't know if that works.

544
00:34:17,859 --> 00:34:20,859
And then the end date, right, is the next one.

545
00:34:20,859 --> 00:34:24,859
So this one's 4 p.m.

546
00:34:24,859 --> 00:34:25,859
Right, like that.

547
00:34:25,859 --> 00:34:31,859
That estimates the calories based on the time that it took you to do this workout.

548
00:34:31,860 --> 00:34:35,860
Whether it was a running workout or a regular workout.

549
00:34:35,860 --> 00:34:46,860
But what I'm doing in this method is I'm going to actually implement my own get calories method inside the class definition for a run workout.

550
00:34:46,860 --> 00:34:49,860
Right, so here's my run workout class definition.

551
00:34:49,860 --> 00:34:52,860
And I've got my own get calories method.

552
00:34:52,860 --> 00:34:57,860
So when I run get calories on a run workout, Python will use this one.

553
00:34:57,860 --> 00:34:59,860
What is this one going to do?

554
00:34:59,860 --> 00:35:02,860
So we're going to do something really cool.

555
00:35:02,860 --> 00:35:12,860
We're going to estimate the number of calories burned for a run workout based on a set of points, latitude, longitude points.

556
00:35:12,860 --> 00:35:23,860
So what we can actually do is we're going to pass in a list of two pulls, like this, which represent sort of the route that we take.

557
00:35:23,860 --> 00:35:31,860
Right, so from point A, so in this particular case, I've got sort of four places that I have, you know, jogged between.

558
00:35:31,860 --> 00:35:34,860
So these are my four latitude, longitude points.

559
00:35:34,860 --> 00:35:39,860
So each two pull is latitude, longitude.

560
00:35:39,860 --> 00:35:42,860
So I can make this as precise as I'd like.

561
00:35:42,860 --> 00:35:51,860
But what I want this method to do is to potentially, if the user does give me a set of latitude, longitude points that they actually went through,

562
00:35:51,860 --> 00:35:58,860
to calculate the calories burned based on a class variable called calories per kilometer.

563
00:35:58,860 --> 00:36:08,860
Right, so given a set of these points, what I'd like to do is to calculate the total kilometers traveled between all of these latitude, longitude points,

564
00:36:08,860 --> 00:36:20,860
multiply that distance, those, that kilometer distance by the calories per kilometer, and use that as the estimate for the calories burned in this particular run workout.

565
00:36:21,860 --> 00:36:23,860
So this is how the code achieves that.

566
00:36:23,860 --> 00:36:28,860
So I've got another class variable that's only specific to this run workout.

567
00:36:28,860 --> 00:36:32,860
So workout does not know about this calories per kilometer is a hundred.

568
00:36:32,860 --> 00:36:41,860
And now I've got my own get calories method here. It's overridden. So if we run this get calories on a run workout, it will use this one.

569
00:36:41,860 --> 00:36:49,860
And what does it do? Well, if we don't give it any GPS points, if we don't give it a list of two pulls there,

570
00:36:49,860 --> 00:36:57,860
Python will default to the else. What does the else do? Well, it says, hey, who's your parent? Run their get calories method.

571
00:36:57,860 --> 00:37:05,860
So that's just estimating it based on the total time elapsed in this workout. Right, that's our default parent.

572
00:37:05,860 --> 00:37:15,860
But if the user got fancy and gave us a bunch of two pulls representing latitude and longitude points for all of their workouts,

573
00:37:15,860 --> 00:37:24,860
then we're going to do the following stuff. We're going to iterate through all of these pairs of GPS points, right, pair by pair.

574
00:37:24,860 --> 00:37:36,860
We're going to calculate the distance, right, given this latitude, longitude value, add on to this running total for the total distance ran.

575
00:37:36,860 --> 00:37:45,860
And then return that total distance multiplied by this data attribute, sorry, class variable calories per kilometer.

576
00:37:45,860 --> 00:37:52,860
Okay. So let me show you what this actually looks like.

577
00:37:52,860 --> 00:37:58,860
Because the only thing that is sort of still mystifying here is this GPS distance.

578
00:37:58,860 --> 00:38:11,860
And this GPS distance is actually a function that's in this lecture helpers file, which is included in today's Python zip file.

579
00:38:11,860 --> 00:38:23,860
And it's just, you know, from the internet, it's how it's a way to calculate the kilometers, the kilometer distance, right, traveled between two latitude, longitude pairs.

580
00:38:23,860 --> 00:38:32,860
That's all it is. So does some fancy stuff with signs and cosines and things like that to figure out the distance between these two lat long pairs.

581
00:38:32,860 --> 00:38:34,860
Okay, that's all it is.

582
00:38:34,860 --> 00:38:43,860
So we're just running that function nicely down here to help us calculate that total distance, right, beyond that, everything is pretty simple.

583
00:38:43,860 --> 00:38:57,860
It's just looking at consecutive pairs of these of these tuples, right, getting that distance plus this distance plus distance and then multiplying by the caliper.

584
00:38:57,860 --> 00:39:07,860
So in the end, what we get is something like this. So here, let me show you, here are two points, latitude, longitude points.

585
00:39:07,860 --> 00:39:15,860
So I've got Boston and Newton. So here I've just got a straight shot, right, so not counting, you know, getting very precise with blocks and things like that.

586
00:39:15,860 --> 00:39:25,860
But if I create a running workout here with the start time and time elevation value, and now I pass in the root GPS points, right.

587
00:39:25,860 --> 00:39:39,860
This is another piece to my init method. I forgot to show you that. Sorry about that. So here's my init method for run workout. I skipped that little bit.

588
00:39:39,860 --> 00:39:45,860
Last parameter here is to actually pass in some root GPS points.

589
00:39:45,860 --> 00:39:56,860
I actually pass in those root GPS points when I run the get calories method. It tells me that I burned this many, right, and it calculates it based on that distance between Boston and Newton.

590
00:39:56,860 --> 00:40:09,860
In the second example here, I don't actually pass in the value for the GPS points. So we're defaulting to just our regular calories function from workout, which is to calculate it based on the start time and the end time.

591
00:40:09,860 --> 00:40:21,860
So from 135 to 357, right. That's why it's a weird, not round number of calories.

592
00:40:21,860 --> 00:40:28,860
So I think that's also really cool, you guys. This function here.

593
00:40:28,860 --> 00:40:41,860
So these overwritten methods just to show you sort of for completion, say how this run workout class looks. Everything is the same as what we ended up before, but now I'm going to re implement my get calories method, right.

594
00:40:41,860 --> 00:40:52,860
So now run workout knows about a calories method. And I've also got this data attribute. Sorry, that's variable. Sorry, who's got messed up this class variable, cows per kilometer, right.

595
00:40:52,860 --> 00:41:02,860
And any run workout instance will know about, of course, the cows per kilometer, as well as the cal per hour from our parent.

596
00:41:02,860 --> 00:41:09,860
Questions about that.

597
00:41:09,860 --> 00:41:15,860
We're building something really nice here, right. So I guess the question is, and I think you've probably figured this out.

598
00:41:15,860 --> 00:41:27,860
How do you know which method to call? Well, you just look at the object before the dot, right. You run out method, your object dot method name. What's the thing before the dot?

599
00:41:27,860 --> 00:41:41,860
What is its type? If the type, like for example, get calories, if the type is running, you look to see if that class definition has a get calories method. If it does, you use that.

600
00:41:41,860 --> 00:41:52,860
If it doesn't, and only if it doesn't, you look at your parent and say does your parent have a get calories method? If it does, you use that. And if it doesn't, you look at the parent's parent.

601
00:41:52,860 --> 00:42:04,860
Does the parents parent have a get calories, calories method, right. If it does use that, if it doesn't, you look at the parent's parent parent. All the way up, you keep going all the way up the chain until you get to the generic Python object.

602
00:42:04,860 --> 00:42:20,860
If the Python object type has a function, a method named what you'd like to call, you use that. Otherwise error, right. No such method was found anywhere within our chain of hierarchies up until the Python object.

603
00:42:20,860 --> 00:42:39,860
All right, so that finishes overriding our get calories method. And now we're going to do one more thing, which is to add something new to run workout that didn't actually exist in workout. Although I guess I am implementing it in workout.

604
00:42:39,860 --> 00:42:50,860
So it's not actually adding new, but we're going to override it anyway. So the class workout, let's say that we want to compare two workouts together.

605
00:42:50,860 --> 00:43:06,860
So to do that, we're going to implement the dunder method, double underscore, EQ, double underscore. This will allow us to compare two running workout objects or two workout objects or running and workout objects using the double equals sign.

606
00:43:06,860 --> 00:43:16,860
So w1, equal run, w2, or whatever. So we can use the double equal sign to compare objects of our type.

607
00:43:16,860 --> 00:43:28,860
So again, my decision for comparing these objects types, for comparing these two objects, workout objects is to say, well, first, let's compare the types.

608
00:43:28,860 --> 00:43:35,860
So if I'm comparing a workout versus a running workout right off the bat, they're not going to be equal.

609
00:43:35,860 --> 00:43:43,860
So first of all, the type of the subject should be the same. So I should be comparing workouts with workouts running workouts with running workouts or swims with swims.

610
00:43:43,860 --> 00:43:54,860
And I also want every one of the other data attributes to be the same. So the start time and times, the kind and the get calories.

611
00:43:55,860 --> 00:44:03,860
So as long as all of these things are the same, I'm going to say that these workouts are the same, are equivalent.

612
00:44:03,860 --> 00:44:12,860
So this is the equal method in my workout. And then in my class workout, I can actually override that method.

613
00:44:12,860 --> 00:44:22,860
So this should actually be, um, add override, right? Just like the other one.

614
00:44:22,860 --> 00:44:30,860
Um, and then run workout, I'm going to override the equal method, but I'm going to do it in a very modular, pathonic way.

615
00:44:30,860 --> 00:44:37,860
I'm going to say that a run workout is going to be the same as another workout.

616
00:44:37,860 --> 00:44:44,860
If everything in my parent is the same.

617
00:44:44,860 --> 00:44:52,860
So here, I'm just calling the super method, right, saying workout dot double underscore equal double underscore other.

618
00:44:52,860 --> 00:44:59,860
So with this little bit here, right, this line here, just the super dot double underscore equal, double underscore other.

619
00:44:59,860 --> 00:45:04,860
This compares all of these things.

620
00:45:05,860 --> 00:45:10,860
So I don't need to rewrite that in the EQ method of run workout.

621
00:45:10,860 --> 00:45:19,860
And I can clearly see what else in addition to regular workout comparison, I need to have happen for them to be equal.

622
00:45:19,860 --> 00:45:27,860
I also want the elevations to be equal, right? That's the other data attribute.

623
00:45:27,860 --> 00:45:36,860
Right, so you can see now how nicely modular this code looks, right? It's very clear what differentiates or run workout to a regular workout, right?

624
00:45:36,860 --> 00:45:39,860
With this line.

625
00:45:39,860 --> 00:45:43,860
Questions about this?

626
00:45:43,860 --> 00:45:47,860
Okay.

627
00:45:47,860 --> 00:45:53,860
Yeah, exactly. Yeah, so this, uh, this should all be on one line, right?

628
00:45:53,860 --> 00:46:01,860
But the backslash actually just breaks up the line into multiple lines for visibility.

629
00:46:01,860 --> 00:46:05,860
So in the code, here's a bunch of workouts, right?

630
00:46:05,860 --> 00:46:18,860
And I mean, we can run some of them, but you can see why they're true or false. So here, W1 and W2 are not the same because the calories are burned are different.

631
00:46:18,860 --> 00:46:25,860
Right? They're both regular workouts. They both have the same start and end times, but the calories burned are different. So this prints false, right?

632
00:46:25,860 --> 00:46:30,860
Just equality on these workouts.

633
00:46:30,860 --> 00:46:40,860
Right? And then here's a true one. Right? W2 is equivalent to W3 because the start and end times are the same, the length of the same, right?

634
00:46:40,860 --> 00:46:44,860
And the calories burned are the same. W1, W3.

635
00:46:44,860 --> 00:46:59,860
You're sorry, W2 and W3 can't do this too. Right? This one just used the default value, but that default calculated values were calculated to be 100 because it's a 30 minute workout anyway.

636
00:46:59,860 --> 00:47:05,860
So you can go through some of the other ones on your own.

637
00:47:05,860 --> 00:47:09,860
I guess the other interesting one is this W1 with RW1.

638
00:47:09,860 --> 00:47:22,860
Everything about this is the same. Calories burned. Right? Everything is the same except for the fact that they are different kinds of workouts. Right? One is a run. One is a regular.

639
00:47:22,860 --> 00:47:27,860
So we run that that's false.

640
00:47:27,860 --> 00:47:34,860
Other questions? Or any questions?

641
00:47:34,860 --> 00:47:45,860
Okay. So last slide. This is the last lecture on object-oriented programming.

642
00:47:45,860 --> 00:47:57,860
Hopefully it gave you an idea for how to create your own object. And this last example specifically showed how we can just improve it a little bit at a time to make it be, you know, this really cool thing. Right?

643
00:47:57,860 --> 00:48:05,860
We added a way to estimate calories. We added a way to estimate calories using GPS points. And we just did it incrementally. Right?

644
00:48:05,860 --> 00:48:13,860
So you don't want to do that right off the bat. Just write a little bit at a time. And in the end, you can write a really cool object type.

645
00:48:13,860 --> 00:48:20,860
Now that you know how to create your own object types, you can create objects using other objects. Right?

646
00:48:20,860 --> 00:48:30,860
So some of the data attributes for something more complex could be a workout object, right? Something like that. But it's, it's possible to overdo it. Right?

647
00:48:30,860 --> 00:48:49,860
Especially now that we're not writing super complex classes. It's possible to over-engineer. Right? And when you over-engineer, it becomes kind of annoying to just keep scrolling back and forth. Right? To this in it, to that in it, to figure out, you know, what methods were in this, when this class, what methods were in the other class?

648
00:48:49,860 --> 00:49:02,860
And so if, you know, if you can achieve it using just one, one object type or maybe just a function, no need to create your own, you know, all these complicated object types that build upon object types.

649
00:49:02,860 --> 00:49:11,860
But I just wanted to show you that it is possible, especially as you might be building more complex things in future classes, things like that.

650
00:49:11,860 --> 00:49:20,860
It is possible to write really complex classes that don't look so bad, right? Because you're building upon code that you've already written, right?

651
00:49:20,860 --> 00:49:32,860
So now we've got these ideas of abstraction, modularity, information hiding that all work together to help you achieve this really cool, cool object or cool class or cool program.

652
00:49:33,860 --> 00:49:52,860
Okay, so the next set of lectures, we're going to leave programming for a little bit and we're going to look at figuring out how to write efficient programs and how to figure out whether our programs are efficient or not and things like that.

653
00:49:52,860 --> 00:49:56,860
So we're going to go into a more theoretical side of computer science.

