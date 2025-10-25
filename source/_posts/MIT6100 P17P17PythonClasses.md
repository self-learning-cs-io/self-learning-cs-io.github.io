---
title: MIT6100 P17P17PythonClasses
---

1
00:00:00,000 --> 00:00:18,559
All right, let's get started.

2
00:00:18,559 --> 00:00:24,879
So today we're going to be starting a completely new set of topics and we'll be talking about

3
00:00:24,879 --> 00:00:29,879
these topics for the next four lectures and it's a big topic.

4
00:00:29,879 --> 00:00:34,780
The big idea we're trying to accomplish in these next four lectures is for us to start

5
00:00:34,780 --> 00:00:39,239
defining our own object types.

6
00:00:39,239 --> 00:00:46,439
And we'll be defining these object types through these things called Python classes.

7
00:00:46,439 --> 00:00:53,439
So today's lecture will just define a really simple object type and then we'll build

8
00:00:53,439 --> 00:00:55,079
up from there on.

9
00:00:55,079 --> 00:01:01,439
So let's take a step back and think about particular objects, like really specific objects

10
00:01:01,439 --> 00:01:03,239
that we've been working with.

11
00:01:03,239 --> 00:01:08,319
So for example, we've been working with probably the number 1234.

12
00:01:08,319 --> 00:01:11,319
We've been working with the float pi 3.141.5.

13
00:01:11,319 --> 00:01:12,319
9.

14
00:01:12,319 --> 00:01:17,719
We've been working with sequences of characters like HLLO with lists of numbers, right?

15
00:01:17,719 --> 00:01:22,480
So here's a list with those specific elements within it and we've been working with dictionaries.

16
00:01:22,480 --> 00:01:27,420
And here's a specific dictionary with these entries.

17
00:01:27,420 --> 00:01:31,780
Now every one of these things up here is an object, right?

18
00:01:31,780 --> 00:01:33,680
We have it in our program.

19
00:01:33,680 --> 00:01:34,760
We can manipulate it.

20
00:01:34,760 --> 00:01:36,000
We can add it to other things.

21
00:01:36,000 --> 00:01:37,000
We can index.

22
00:01:37,000 --> 00:01:38,240
We can do all these things.

23
00:01:38,240 --> 00:01:42,560
But every one of these objects is basically has a certain type, right?

24
00:01:42,560 --> 00:01:48,400
We talked about this back in lecture one when I introduced types of objects.

25
00:01:48,400 --> 00:01:49,760
So what does that mean?

26
00:01:49,760 --> 00:01:55,280
Well in that lecture I said that the type of an object basically tells us the kinds of

27
00:01:55,280 --> 00:01:56,920
things that we can do with it, right?

28
00:01:56,920 --> 00:02:00,600
So the things you can do with a number are going to be different than the kinds of things

29
00:02:00,600 --> 00:02:01,760
you can do with strings.

30
00:02:01,760 --> 00:02:06,439
And we've been seeing this since that lecture up until today.

31
00:02:06,439 --> 00:02:09,360
Today we're going to see how we can create our own object types.

32
00:02:09,360 --> 00:02:14,120
So to do that we have to understand the following thing and this is something I'll keep repeating

33
00:02:14,120 --> 00:02:15,120
today.

34
00:02:15,520 --> 00:02:19,759
So we decide to create an object type, or every one of these objects for example, has

35
00:02:19,759 --> 00:02:22,879
been created using some blueprint, right?

36
00:02:22,879 --> 00:02:25,840
And when you're creating these objects you need to think about two things.

37
00:02:25,840 --> 00:02:28,800
The first is what data will represent this object?

38
00:02:28,800 --> 00:02:32,280
And the second is what behaviors will this object have?

39
00:02:32,280 --> 00:02:35,319
Now the objects up here are pretty simple, right?

40
00:02:35,319 --> 00:02:40,640
The kinds of data that represents this integer is, well there's no data really, it's just

41
00:02:40,640 --> 00:02:42,120
the number itself.

42
00:02:42,520 --> 00:02:45,960
It has some operations, some things that you can do with this integer.

43
00:02:45,960 --> 00:02:51,640
Now the data that represents a list is going to be different than the data that represents

44
00:02:51,640 --> 00:02:58,120
an integer because a list is kind of made up of a sequence of numbers or objects.

45
00:02:58,120 --> 00:03:02,040
And then the data that makes up a dictionary is completely different than the data that

46
00:03:02,040 --> 00:03:06,319
makes up the list because a dictionary has entries where each entry has a key and a value

47
00:03:06,319 --> 00:03:09,640
pair and then you have a bunch of these entries, right?

48
00:03:09,639 --> 00:03:13,439
So the data representing each one of these objects is different and we're going to decide

49
00:03:13,439 --> 00:03:17,239
what data represents the new objects that we want to create.

50
00:03:17,239 --> 00:03:21,119
And of course this is something we've known from the first lecture, the kinds of ways

51
00:03:21,119 --> 00:03:24,719
that we can interact with these objects is also different amongst all these different

52
00:03:24,719 --> 00:03:26,519
object types, right?

53
00:03:26,519 --> 00:03:33,119
So in terms of terminology, when we create an actual object that we want to manipulate,

54
00:03:33,119 --> 00:03:35,839
we call it an instance of a type.

55
00:03:35,840 --> 00:03:43,120
So this specific number, 1234, is an instance of an integer and this specific sequence of

56
00:03:43,120 --> 00:03:47,920
characters, lowercase HLLO, is an instance of a string.

57
00:03:47,920 --> 00:03:54,319
All right, so the idea of object-oriented programming is basically that everything in Python

58
00:03:54,319 --> 00:03:59,199
is an object and this we've talked about when we were introducing functions, we treated

59
00:03:59,199 --> 00:04:01,520
functions like objects.

60
00:04:01,520 --> 00:04:06,880
And what that means is that we can create new objects that have some type, so we actually

61
00:04:06,880 --> 00:04:12,120
create these very specific objects that we can manipulate and we can also destroy the

62
00:04:12,120 --> 00:04:13,120
objects, right?

63
00:04:13,120 --> 00:04:15,719
So you can create them, manipulate them, and destroy them as you will.

64
00:04:15,719 --> 00:04:18,879
But each one of these objects has a specific type.

65
00:04:18,879 --> 00:04:23,439
So let's talk a little bit more about the data abstraction.

66
00:04:23,439 --> 00:04:29,040
So once you have an object that you'd like to create, so think of anything in the world,

67
00:04:29,040 --> 00:04:35,520
some something, the two things that you need to think about are what is going to be the

68
00:04:35,520 --> 00:04:39,800
way that you represent the object in terms of data, right?

69
00:04:39,800 --> 00:04:43,200
And the other thing is what are the behaviors of this object?

70
00:04:43,200 --> 00:04:49,080
How can other programmers or other objects interact with this thing that you're creating?

71
00:04:49,080 --> 00:04:54,080
So when we're creating our own object type, we have to think about these data abstractions,

72
00:04:54,080 --> 00:04:55,080
okay?

73
00:04:55,080 --> 00:04:57,080
So let's take a more sort of real life example.

74
00:04:57,079 --> 00:05:02,439
So let's say I have these two very specific cars that actually exist in the real world.

75
00:05:02,439 --> 00:05:06,519
So we can actually drive these cars around, we can manipulate them, right?

76
00:05:06,519 --> 00:05:07,919
They have already been created.

77
00:05:07,919 --> 00:05:10,680
They are actual objects, right?

78
00:05:10,680 --> 00:05:16,079
Well behind the scenes, these objects were created using some blueprint, right?

79
00:05:16,079 --> 00:05:19,319
This blueprint is not an actual tangible thing.

80
00:05:19,319 --> 00:05:25,759
It's basically some abstract notion of how to create those specific objects, those specific

81
00:05:25,759 --> 00:05:27,319
cars.

82
00:05:27,319 --> 00:05:33,439
So as we're thinking about creating our own object types, we have to think about design decisions,

83
00:05:33,439 --> 00:05:34,439
right?

84
00:05:34,439 --> 00:05:38,279
If I want to create a blueprint for a car that somebody can then use to create an actual

85
00:05:38,279 --> 00:05:42,519
car in real life, how do I abstract the car?

86
00:05:42,519 --> 00:05:46,759
And as we're creating these objects ourselves, we get to make these design decisions, which

87
00:05:46,759 --> 00:05:48,039
is pretty cool.

88
00:05:48,039 --> 00:05:52,120
So if I were creating this car, right, the blueprint for a car, I would say, well, I'm going

89
00:05:52,120 --> 00:05:56,000
to use maybe the length of the car, the width of the car, and the height of the car, and

90
00:05:56,000 --> 00:05:57,519
the color of the car.

91
00:05:57,519 --> 00:06:02,519
And those four data attributes will represent a car object.

92
00:06:02,519 --> 00:06:04,519
But of course that's my design decision, right?

93
00:06:04,519 --> 00:06:08,920
If you are more familiar with cars or if you wanted to get into a more detailed description

94
00:06:08,920 --> 00:06:15,519
or representation, you would also have a number for how many horsepower it has, how many

95
00:06:15,519 --> 00:06:20,040
doors it has, maybe how many people could fit, you know, other things like that.

96
00:06:20,040 --> 00:06:26,000
But a very simple data abstraction for a car is length, width, height, and color.

97
00:06:26,000 --> 00:06:27,000
All right?

98
00:06:27,000 --> 00:06:28,480
So that's data abstract.

99
00:06:28,480 --> 00:06:31,400
So what data represents this object you're trying to create?

100
00:06:31,400 --> 00:06:32,720
Now how about the interface?

101
00:06:32,720 --> 00:06:37,720
Well, in terms of the interface, we decide what are some ways that programmers can interact

102
00:06:37,720 --> 00:06:41,560
with the object or other objects can interact with this object.

103
00:06:41,560 --> 00:06:47,759
So we could say that we could let the users change the color of the car, right?

104
00:06:47,759 --> 00:06:54,759
We could say that we can let the car make a noise, so honk the horn, could be maybe one

105
00:06:54,759 --> 00:06:57,759
thing, one function that this car could do.

106
00:06:57,759 --> 00:07:01,959
And if we say honk the horn, then maybe you would print something to the screen, right?

107
00:07:01,959 --> 00:07:02,959
Something like that.

108
00:07:02,959 --> 00:07:06,800
And then we can have the car drive from point A to point B, or we could have the car,

109
00:07:06,800 --> 00:07:11,319
you know, go in a circle, you could have the car crash on other car.

110
00:07:11,319 --> 00:07:19,719
And all of these behaviors will are part of this interface for this particular car.

111
00:07:19,719 --> 00:07:24,079
But we're going to define them such that any car that we create from here on, any actual

112
00:07:24,079 --> 00:07:29,399
object that we create, will have all of these behaviors and all of these data attributes.

113
00:07:29,399 --> 00:07:33,519
So an example a little closer to home is the list, right?

114
00:07:33,519 --> 00:07:36,079
We've been working with lists so far.

115
00:07:36,079 --> 00:07:41,479
So behind the scenes, somebody created the data type list, right?

116
00:07:41,479 --> 00:07:46,120
So there's some code in Python that basically defines the data that makes up the list, the

117
00:07:46,120 --> 00:07:53,000
data attributes, how is a list described, and the behaviors, the procedures, the functions

118
00:07:53,000 --> 00:07:55,079
that a list can do, right?

119
00:07:55,079 --> 00:07:59,639
So in terms of data attributes, well, there's many design decisions that, you know, whoever

120
00:07:59,639 --> 00:08:03,240
decided to create this list class could have done, how could they have represented the

121
00:08:03,240 --> 00:08:04,240
list?

122
00:08:04,240 --> 00:08:08,879
Well, they could have said, I'm going to allocate sort of a continuous block of memory and

123
00:08:08,879 --> 00:08:12,040
where, and your elements will go in that order, right?

124
00:08:12,040 --> 00:08:15,319
From the smallest memory of value to the biggest memory value.

125
00:08:15,319 --> 00:08:17,280
That's one design decision.

126
00:08:17,280 --> 00:08:21,680
Another one could be that instead of allocating sort of a continuous block of memory, you

127
00:08:21,680 --> 00:08:25,480
could say, I can allocate memories here and there, that's okay.

128
00:08:25,480 --> 00:08:32,080
But then each element in my, in my list will then be represented by two things.

129
00:08:32,080 --> 00:08:36,800
The first being the value at that location, and the second could be maybe another integer

130
00:08:36,800 --> 00:08:41,840
or something that tells Python which memory location to go to to get the next element in

131
00:08:41,840 --> 00:08:43,200
the list.

132
00:08:43,200 --> 00:08:47,720
So both valid design decisions, I think Python did the second one.

133
00:08:47,720 --> 00:08:48,720
All right.

134
00:08:48,720 --> 00:08:53,200
So those are, that's how you represent the data that represents the list.

135
00:08:53,200 --> 00:08:55,960
And in terms of behaviors, well, we've already been working with lists.

136
00:08:55,960 --> 00:08:58,879
So we know a bunch of the behaviors that lists have, right?

137
00:08:58,879 --> 00:09:02,040
You can index into it, you can sort of list, you can append an item to the end of the

138
00:09:02,039 --> 00:09:04,959
list, you can get the maximum element within the list.

139
00:09:04,959 --> 00:09:09,799
All of these different procedures, functions are things that you can do with lists, right?

140
00:09:09,799 --> 00:09:11,319
And we've been working with them.

141
00:09:11,319 --> 00:09:15,839
And we've been working with lists without actually knowing the representation, how somebody

142
00:09:15,839 --> 00:09:18,279
decided to represent this class, okay?

143
00:09:18,279 --> 00:09:20,360
Which is pretty cool.

144
00:09:20,360 --> 00:09:22,519
So a couple more real life examples, right?

145
00:09:22,519 --> 00:09:26,519
If we were to think about representing, you know, one of the, each of these.

146
00:09:26,519 --> 00:09:29,360
So if we think about the object and elevator, right?

147
00:09:29,360 --> 00:09:32,440
Again, it's up to us to make the design decision.

148
00:09:32,440 --> 00:09:34,919
It's basically a box that can change floors, right?

149
00:09:34,919 --> 00:09:38,200
So we could represent it using the length of width, the height.

150
00:09:38,200 --> 00:09:41,680
Maybe we could also represent, which are all, you know, floats or something like that.

151
00:09:41,680 --> 00:09:47,120
We can also represent it using the max capacity and the current floor it's at.

152
00:09:47,120 --> 00:09:55,320
So all five of these variables, you know, together, values together, represent my elevator, right?

153
00:09:55,320 --> 00:09:57,440
And again, it's my design decision to do this.

154
00:09:57,440 --> 00:09:58,920
Yours might be different.

155
00:09:58,919 --> 00:10:04,120
But in terms of things that the elevator can do, well, we can change its current floor,

156
00:10:04,120 --> 00:10:07,599
which is basically saying, you know, change the value of the variable current floor to be

157
00:10:07,599 --> 00:10:09,439
something else.

158
00:10:09,439 --> 00:10:13,599
Add people to it, maybe checking if you're at max capacity or not, and maybe printing

159
00:10:13,599 --> 00:10:17,919
out a warning if you're above that, removing people, things like that.

160
00:10:17,919 --> 00:10:23,799
An employee is also a pretty common example of something that's typically implemented

161
00:10:23,799 --> 00:10:25,719
in a bunch of programming languages.

162
00:10:25,720 --> 00:10:29,120
So an employee, basically a person that has a salary, right?

163
00:10:29,120 --> 00:10:31,000
Maybe works for company X.

164
00:10:31,000 --> 00:10:34,240
So you could represent this employee using their name, right?

165
00:10:34,240 --> 00:10:37,639
Maybe a string for the first name, a string for the last name, and then their birthday,

166
00:10:37,639 --> 00:10:43,360
maybe, and then their salary, which is, you know, a float or something like that.

167
00:10:43,360 --> 00:10:47,000
And in terms of behavior is what can employees do, where you can change their name, you can

168
00:10:47,000 --> 00:10:50,960
change their salary, you can maybe activate or deactivate them as current employees,

169
00:10:50,960 --> 00:10:51,960
things like that.

170
00:10:52,200 --> 00:10:58,000
A queue at a store, also a really nice example, and it kind of goes hand in hand with stack

171
00:10:58,000 --> 00:11:00,040
of pancakes.

172
00:11:00,040 --> 00:11:02,080
How would you represent a queue at a store?

173
00:11:02,080 --> 00:11:06,440
Well, the representation isn't going to be a set of things.

174
00:11:06,440 --> 00:11:12,720
The representation could be something really simple, like just a list, right?

175
00:11:12,720 --> 00:11:13,720
Which is fine.

176
00:11:13,720 --> 00:11:17,759
So maybe the list will have, you know, some strings with the names of the people who are currently

177
00:11:17,759 --> 00:11:20,280
in the queue at a store.

178
00:11:20,279 --> 00:11:26,839
But what's going to make a queue kind of special is that is the way that we'll be using it,

179
00:11:26,839 --> 00:11:27,839
right?

180
00:11:27,839 --> 00:11:29,519
So the representation isn't super unique.

181
00:11:29,519 --> 00:11:31,679
It's just a list.

182
00:11:31,679 --> 00:11:36,679
But the way that a queue operates will be special, because if you think about the queue,

183
00:11:36,679 --> 00:11:40,919
the first person who comes into the queue will be the first person out of the queue, right?

184
00:11:40,919 --> 00:11:43,759
The first in, first out kind of situation.

185
00:11:43,759 --> 00:11:48,360
So that means if you make the design decision to add new people at the end of the queue, right?

186
00:11:48,360 --> 00:11:54,919
So if I have a new person that gets added here, they're the newest person in.

187
00:11:54,919 --> 00:11:58,680
That means if I'm removing a person from the queue, I better remove the oldest one, which

188
00:11:58,680 --> 00:12:02,800
is going to be over at the beginning of my list, right?

189
00:12:02,800 --> 00:12:07,879
So the way that you use the queue will be consistent with this idea, and then, you know,

190
00:12:07,879 --> 00:12:09,560
you can basically simulate the queue.

191
00:12:09,560 --> 00:12:11,680
And the stack of pancakes is very similar.

192
00:12:11,680 --> 00:12:17,840
If you think about pancakes, the first one you made is the last one you eat, right?

193
00:12:17,840 --> 00:12:21,160
So it's a first in, last out of a kind of situation.

194
00:12:21,160 --> 00:12:29,240
So that means that we can still represent a stack of pancakes using a list, right?

195
00:12:29,240 --> 00:12:34,639
So the representation, the data representation for a stack of pancakes will be the same as

196
00:12:34,639 --> 00:12:38,360
a queue, except that the behavior will be different, right?

197
00:12:38,360 --> 00:12:43,080
Because if I just made a new pancake and it goes at the end here, right?

198
00:12:43,080 --> 00:12:46,759
The newest one that I made is the first one that I'm going to eat.

199
00:12:46,759 --> 00:12:51,360
So if I add a pancake to the end of my list, I'm going to remove the pancake that I want

200
00:12:51,360 --> 00:12:55,480
to eat from the end of my list as well.

201
00:12:55,480 --> 00:12:56,480
Okay.

202
00:12:56,480 --> 00:13:00,039
So the idea of object-oriented programming, and the reason we're doing this is because now

203
00:13:00,039 --> 00:13:05,200
we're bundling basically data and behaviors into one thing.

204
00:13:05,200 --> 00:13:12,000
And so we can create all of these objects that have the same type that all are going to

205
00:13:12,000 --> 00:13:13,279
function in the same way.

206
00:13:13,279 --> 00:13:15,919
We know they're going to be consistent, right?

207
00:13:16,079 --> 00:13:20,199
They're going to be consistent in the data that represents them and consistent in the way

208
00:13:20,199 --> 00:13:21,519
that we use them, right?

209
00:13:21,519 --> 00:13:27,199
So we know for sure that the queue is going to be a first out kind of situation, right?

210
00:13:29,240 --> 00:13:33,279
And the way we're going to implement this is using these things called Python classes.

211
00:13:33,279 --> 00:13:38,399
And the reason we create these Python classes is to make code that's very nicely reusable.

212
00:13:38,399 --> 00:13:41,799
We can create really simple Python classes that we'll see today.

213
00:13:41,799 --> 00:13:46,439
And then we can build upon these Python classes to create more complex classes,

214
00:13:46,439 --> 00:13:47,719
which we'll see on Wednesday.

215
00:13:49,199 --> 00:13:53,240
But the big idea here, and this is something that I was a little bit confused about

216
00:13:53,240 --> 00:13:58,439
when I first started and learning about object-oriented programming, is you get to be in charge

217
00:13:58,439 --> 00:14:00,359
of the design decision, right?

218
00:14:00,359 --> 00:14:06,439
So you get to decide what data represents the class and you decide what behaviors represent the class.

219
00:14:06,439 --> 00:14:11,559
So if you wanted to say that, you know, you represent a queue using a list, right?

220
00:14:11,559 --> 00:14:16,239
First in first out, if you add items to the end, you remove items from the beginning.

221
00:14:16,239 --> 00:14:17,639
That's one design decision.

222
00:14:17,639 --> 00:14:20,919
Another design decision could be, well, you still represent it as a list,

223
00:14:20,919 --> 00:14:24,159
but new items get added to the front.

224
00:14:24,159 --> 00:14:27,879
But to be consistent with the idea of a queue, that means you remove items from the back.

225
00:14:27,879 --> 00:14:30,639
And then the behavior is the same, right?

226
00:14:30,639 --> 00:14:35,039
We're implementing a queue, no matter which one of those design decisions we've made.

227
00:14:37,039 --> 00:14:39,919
Okay, so as we're going through today's lecture,

228
00:14:39,919 --> 00:14:42,279
I want to make a note of a couple things.

229
00:14:42,279 --> 00:14:44,639
So I've got these little tabs up at the top here.

230
00:14:46,439 --> 00:14:50,079
We're going to be basically switching our brains a little bit today.

231
00:14:50,079 --> 00:14:55,079
We're going to be defining a Python object, right?

232
00:14:55,079 --> 00:15:00,919
So we're going to be writing code that tells Python, hey, I am telling you I would like to create this object type.

233
00:15:02,120 --> 00:15:07,799
Okay, and these are the data, these are the, this is the data that represents them, represents it,

234
00:15:07,799 --> 00:15:09,559
and these are the behaviors that represent it.

235
00:15:09,559 --> 00:15:12,119
So that's us implementing the class.

236
00:15:12,119 --> 00:15:15,799
So telling Python that we are now creating and telling you what, what,

237
00:15:15,799 --> 00:15:17,719
what an object of this type is and does.

238
00:15:18,519 --> 00:15:23,479
And the other thing is once we have a definition for this object type,

239
00:15:23,479 --> 00:15:26,599
we're going to actually use the type, right?

240
00:15:26,599 --> 00:15:29,759
We're going to create new objects of this type.

241
00:15:30,719 --> 00:15:35,759
So when we're creating the class, when we're telling Python that's an object like this exists,

242
00:15:35,840 --> 00:15:40,639
we're deciding the name of our class, we're deciding what data abstracts it,

243
00:15:40,639 --> 00:15:43,519
we're deciding what behaviors we can do with it, right?

244
00:15:43,519 --> 00:15:47,319
So if you think about the list, we haven't actually seen the code to do this,

245
00:15:47,319 --> 00:15:50,759
but someone wrote code to define this list class.

246
00:15:52,319 --> 00:15:57,519
Now, using the class means that we're assuming that this code already exists, right?

247
00:15:57,519 --> 00:16:00,759
And you're just creating a whole bunch of objects of this type.

248
00:16:00,759 --> 00:16:02,600
So we've been doing this definitely, right?

249
00:16:02,600 --> 00:16:05,360
If we think about the list class again here, you know, for example,

250
00:16:05,360 --> 00:16:08,560
we created an actual object that we can manipulate, right?

251
00:16:08,560 --> 00:16:10,480
L is equal to 1 comma 2.

252
00:16:10,480 --> 00:16:15,200
We've also created L is equal to 3 comma 4 comma 5 and all these things, right?

253
00:16:15,200 --> 00:16:19,720
We're basically creating these instances that we can manipulate and use in our program

254
00:16:19,720 --> 00:16:21,759
to achieve something useful, right?

255
00:16:21,759 --> 00:16:24,680
And today we're going to see how we can do both of those things.

256
00:16:26,200 --> 00:16:30,440
I want to draw a little parallel with functions because it's going to feel very similar, right?

257
00:16:30,440 --> 00:16:34,840
And with functions, when we were defining a function,

258
00:16:34,840 --> 00:16:40,280
we were telling Python that I would like to, you know, abstract some code

259
00:16:40,280 --> 00:16:45,400
that does something useful using this class, using this function definition, right?

260
00:16:45,400 --> 00:16:50,000
So we were writing the definition for the function in this abstract way.

261
00:16:50,000 --> 00:16:52,720
We didn't actually run the function at that point, right?

262
00:16:52,720 --> 00:16:54,240
We just defined it.

263
00:16:54,240 --> 00:16:57,360
And so when we define a class, that's basically what we're doing.

264
00:16:57,360 --> 00:17:02,560
We're telling Python that we're creating this object that bundles data and behaviors together.

265
00:17:04,960 --> 00:17:10,480
When we create instances of this data type that we're going to define,

266
00:17:10,480 --> 00:17:16,000
that's kind of like we called the actual function that we defined, right?

267
00:17:16,000 --> 00:17:21,440
So when we called the function, we were now doing something useful in our program, right?

268
00:17:21,440 --> 00:17:25,000
We said here are some actual parameters I want you to run this function with.

269
00:17:25,000 --> 00:17:27,120
Now tell me what the output is, okay?

270
00:17:27,439 --> 00:17:33,519
And that's exactly what we're going to do when we create instances of the data type we're defining.

271
00:17:33,519 --> 00:17:38,639
We're now creating actual objects that we can manipulate and use in our class.

272
00:17:40,679 --> 00:17:46,799
Okay, so the object we're going to create in today's lecture is a coordinate in a 2D plane.

273
00:17:48,279 --> 00:17:50,240
Pretty simple, pretty mathematical.

274
00:17:50,240 --> 00:17:53,039
So before we actually write the code,

275
00:17:53,039 --> 00:17:58,159
let's kind of think about what it actually means to put a coordinate in a 2D plane.

276
00:17:58,159 --> 00:18:01,200
So we're going to think about if we had a bunch of instances, right?

277
00:18:01,200 --> 00:18:04,599
If we had a bunch of coordinates in the 2D plane, what do they look like?

278
00:18:04,599 --> 00:18:08,079
What kind of data are we interested in, you know, grabbing from these instances?

279
00:18:08,079 --> 00:18:10,039
What are some things we can do with it?

280
00:18:10,039 --> 00:18:13,039
So here I have a point in my 2D plane.

281
00:18:14,319 --> 00:18:19,680
So if we think about how we look at this, at this coordinate,

282
00:18:19,680 --> 00:18:23,600
well, we know how far away the coordinate is on the x-axis,

283
00:18:23,600 --> 00:18:27,920
and we know how far away the coordinate is on the y-axis, right?

284
00:18:27,920 --> 00:18:31,279
So that's one instance of a coordinate object.

285
00:18:31,279 --> 00:18:33,560
Now let's say we had another one, right?

286
00:18:33,560 --> 00:18:35,720
Here's another dot in my 2D plane.

287
00:18:35,720 --> 00:18:39,640
Again, this dot will also know how far away it is on the x-axis,

288
00:18:39,640 --> 00:18:43,160
and how far away it is on the y-axis, okay?

289
00:18:43,160 --> 00:18:49,080
So one reasonable data abstraction for a coordinate in a 2D plane

290
00:18:49,079 --> 00:18:53,279
could be to say I want two numbers,

291
00:18:53,279 --> 00:18:56,759
one representing how far away it is on the x-axis,

292
00:18:56,759 --> 00:18:59,839
and one for how far away it is on the y-axis, right?

293
00:18:59,839 --> 00:19:01,199
That seems pretty reasonable.

294
00:19:01,199 --> 00:19:03,119
I don't care about color, right?

295
00:19:03,119 --> 00:19:04,919
Even though I colored these things,

296
00:19:04,919 --> 00:19:09,480
but you can imagine making a cuter version of this coordinate object

297
00:19:09,480 --> 00:19:11,480
that also has a color associated with it.

298
00:19:12,480 --> 00:19:16,519
Okay, so the data that will represent my point in a coordinate plane,

299
00:19:16,519 --> 00:19:20,000
and a 2D coordinate plane is just two numbers, right?

300
00:19:20,000 --> 00:19:21,519
One for the x, one for the y.

301
00:19:22,879 --> 00:19:25,400
Now what are some things that we can do with these coordinate objects?

302
00:19:25,400 --> 00:19:29,039
Certainly something really simple we can do is to say,

303
00:19:29,039 --> 00:19:32,559
well, point, you know, one of these points, you know,

304
00:19:32,559 --> 00:19:36,879
the orange one, for example, tell me how far away you are on the x-axis,

305
00:19:36,879 --> 00:19:39,440
or tell me how far away you are on the y-axis, right?

306
00:19:39,440 --> 00:19:42,799
So those two commands could return, you know, something like three,

307
00:19:42,799 --> 00:19:45,759
for that's how far away that point is on the x-axis or four,

308
00:19:45,759 --> 00:19:47,680
for how far away it is on the y-axis.

309
00:19:49,039 --> 00:19:50,440
Those are pretty simple things to do.

310
00:19:50,440 --> 00:19:53,000
One more interesting thing to do is to say, well,

311
00:19:53,000 --> 00:19:55,160
hey, you point, orange point right over there,

312
00:19:55,160 --> 00:19:58,160
can you tell me how far away you are between the green point?

313
00:19:59,200 --> 00:19:59,879
Right?

314
00:19:59,879 --> 00:20:02,799
So that would be the Euclidean distance between these two points.

315
00:20:02,799 --> 00:20:07,359
And we're going to write code that figures out how far away

316
00:20:07,359 --> 00:20:10,039
one coordinate object is from another coordinate object.

317
00:20:11,119 --> 00:20:12,440
Okay.

318
00:20:12,440 --> 00:20:15,640
All right, so let's start defining this class coordinate.

319
00:20:15,640 --> 00:20:17,360
We're going to, you can see here,

320
00:20:17,360 --> 00:20:19,320
this is the code that implements the class.

321
00:20:19,320 --> 00:20:24,640
So this will tell Python that we are now creating this object type coordinate.

322
00:20:25,400 --> 00:20:25,960
Okay?

323
00:20:25,960 --> 00:20:27,080
So we're not using it yet.

324
00:20:27,080 --> 00:20:30,480
We're not creating any objects, any object instances,

325
00:20:30,480 --> 00:20:33,800
we're just telling Python that we'd like to create this object type.

326
00:20:34,600 --> 00:20:38,200
So we start with the keyword class, right?

327
00:20:38,200 --> 00:20:41,800
In parallel, we started with the keyword DF to define a function.

328
00:20:41,800 --> 00:20:44,440
Then we say the name of our object type.

329
00:20:44,440 --> 00:20:47,039
So this will be literally the type of the object.

330
00:20:47,039 --> 00:20:50,400
So coordinate, just like we had lists and float, you know,

331
00:20:50,400 --> 00:20:52,440
all those things, this will be of type coordinate.

332
00:20:53,480 --> 00:20:57,360
And then in parentheses here, we say the parent of this class.

333
00:20:57,360 --> 00:21:01,200
So usually we say object until two lectures from now,

334
00:21:01,200 --> 00:21:03,519
when we're going to see what happens when we put something else in there.

335
00:21:04,200 --> 00:21:06,360
But when we put object in the parentheses there,

336
00:21:06,360 --> 00:21:10,440
we're telling Python that anything a generic Python object can do,

337
00:21:11,480 --> 00:21:12,680
our object can do as well.

338
00:21:12,759 --> 00:21:21,279
So something really basic is saying that I'm going to create this object in memory

339
00:21:21,279 --> 00:21:25,480
and assign a variable to it so that I get a handle for that object using this variable.

340
00:21:25,480 --> 00:21:30,840
Something super basic, any Python object has this ability and hours will too.

341
00:21:30,840 --> 00:21:33,160
Because I've put this object in the parentheses here.

342
00:21:33,160 --> 00:21:34,480
Okay?

343
00:21:36,160 --> 00:21:37,080
All right.

344
00:21:37,080 --> 00:21:41,960
So now we've told Python we're creating a data type called coordinate.

345
00:21:42,120 --> 00:21:45,440
What are we going to fill in the body of this class?

346
00:21:45,440 --> 00:21:48,240
So the things we need to fill in are going to be our attributes.

347
00:21:49,240 --> 00:21:50,880
Now again, what makes up an object?

348
00:21:50,880 --> 00:21:51,799
Two things.

349
00:21:51,799 --> 00:21:56,480
The data that you want to represent this object with and the procedures,

350
00:21:56,480 --> 00:22:01,559
aka functions, aka behaviors that you'd like this object to have.

351
00:22:01,559 --> 00:22:02,519
Okay?

352
00:22:02,519 --> 00:22:05,039
So the data will be two things, right?

353
00:22:05,039 --> 00:22:08,759
We decided that we're going to represent a coordinate using two numbers.

354
00:22:08,759 --> 00:22:09,519
Okay?

355
00:22:09,519 --> 00:22:11,440
Now what about behaviors?

356
00:22:11,440 --> 00:22:17,960
Behaviors will essentially be functions that work with objects of this particular type.

357
00:22:17,960 --> 00:22:19,799
So we're going to define them as functions,

358
00:22:19,799 --> 00:22:23,799
but we're going to define them in a really special way that tells Python

359
00:22:23,799 --> 00:22:28,400
you can only run this function on an object of type coordinate, right?

360
00:22:28,400 --> 00:22:29,639
Which makes sense.

361
00:22:29,639 --> 00:22:33,519
I would not like to find the distance between, you know, two integers.

362
00:22:33,519 --> 00:22:36,720
That's just subtraction or I would not like to find the distance between two dictionaries.

363
00:22:36,720 --> 00:22:38,000
What does that even mean?

364
00:22:38,000 --> 00:22:38,519
Right?

365
00:22:38,519 --> 00:22:42,240
So distance method that we mentioned is one thing we'd like to implement

366
00:22:42,240 --> 00:22:45,119
will only work with objects of type coordinate.

367
00:22:45,119 --> 00:22:46,200
Okay.

368
00:22:46,200 --> 00:22:49,759
So these special functions are actually called methods.

369
00:22:49,759 --> 00:22:50,400
Okay?

370
00:22:50,400 --> 00:22:53,400
And I'm going to use this term a little bit today.

371
00:22:53,400 --> 00:22:54,599
Hopefully you get used to it.

372
00:22:54,599 --> 00:22:57,440
And then from now, from there, from next lecture on,

373
00:22:57,440 --> 00:23:02,000
I'll just use the word methods to refer to functions that only work with objects of this time.

374
00:23:03,920 --> 00:23:04,440
Okay.

375
00:23:04,440 --> 00:23:09,680
So we so far in the previous slide had class coordinate object.

376
00:23:09,680 --> 00:23:12,519
Now, what is the next thing you have to do?

377
00:23:12,519 --> 00:23:17,519
So the next thing you always have to do when you tell Python you're creating a new data type,

378
00:23:17,519 --> 00:23:21,799
is to tell Python how you want to construct this data type.

379
00:23:21,799 --> 00:23:22,799
Okay?

380
00:23:22,799 --> 00:23:23,840
Okay.

381
00:23:23,840 --> 00:23:27,680
Kind of a constructor, a constructor function.

382
00:23:27,680 --> 00:23:32,519
And the way we do this is by defining, so you can see we're defining it like a function,

383
00:23:32,519 --> 00:23:37,160
DF, but we're going to define a function that has a special name.

384
00:23:37,160 --> 00:23:40,480
And the name is double underscore in it, double underscore.

385
00:23:41,839 --> 00:23:42,839
Okay?

386
00:23:42,839 --> 00:23:44,680
So that's the name of this function.

387
00:23:44,680 --> 00:23:47,799
And you can see it's a function, DF name, and then parentheses.

388
00:23:47,799 --> 00:23:49,920
And there's a bunch of stuff in the parentheses.

389
00:23:49,920 --> 00:23:52,799
The first thing will be this thing called self.

390
00:23:52,799 --> 00:23:57,359
So already it's going to be a little bit different than regular functions.

391
00:23:57,359 --> 00:24:01,559
Now, I'm going to, this is not the only time I'll explain self.

392
00:24:01,559 --> 00:24:04,039
I'll explain it throughout this lecture.

393
00:24:04,039 --> 00:24:10,599
But the basic idea of self is that it's always going to be the first parameter of a method,

394
00:24:10,599 --> 00:24:11,599
right?

395
00:24:11,599 --> 00:24:14,559
A function that only works with an object of this class, of this type.

396
00:24:16,119 --> 00:24:21,279
And the reason why we have it here is because all we're doing here is telling

397
00:24:21,279 --> 00:24:24,960
Python that we'd like to create this object type.

398
00:24:24,960 --> 00:24:28,240
We don't have an actual object to manipulate, right?

399
00:24:28,240 --> 00:24:30,839
I haven't created an actual object yet.

400
00:24:30,839 --> 00:24:34,359
I'm just telling Python I'd like to create this object.

401
00:24:34,359 --> 00:24:42,039
So if I don't have an actual object created yet, I need some way to refer to an instance

402
00:24:42,039 --> 00:24:44,240
without actually having one yet.

403
00:24:44,240 --> 00:24:46,839
And that's what the self is doing, right?

404
00:24:46,839 --> 00:24:53,480
It's basically a variable that tells Python that this is an object of, that this is a function

405
00:24:53,480 --> 00:24:55,799
that only works with an object of this type.

406
00:24:55,799 --> 00:25:03,680
And I'm going to use this variable self to refer to this object myself, my data attributes

407
00:25:03,680 --> 00:25:06,639
and my methods and things like that.

408
00:25:06,639 --> 00:25:07,639
So we'll become clear.

409
00:25:07,639 --> 00:25:08,639
There will be many examples.

410
00:25:08,639 --> 00:25:13,919
But for now, it's basically a way for us to refer to an object of this type, an instance

411
00:25:13,919 --> 00:25:17,720
of this type without actually having created one.

412
00:25:17,720 --> 00:25:23,559
Anything after self is basically parameters you'd like to create this object with.

413
00:25:23,559 --> 00:25:29,799
So for us, it doesn't make sense to say create this coordinate object without actually initializing

414
00:25:29,799 --> 00:25:31,839
its x and y values, right?

415
00:25:31,839 --> 00:25:36,240
When we put a coordinate object in a 2D plane, I would like to put it in that 2D plane.

416
00:25:36,240 --> 00:25:40,000
So it needs an initial x and initial y value.

417
00:25:40,000 --> 00:25:44,119
So these parameters here will tell Python you need to pass in a value for x and y when

418
00:25:44,119 --> 00:25:46,480
you create your object.

419
00:25:46,480 --> 00:25:53,039
And then the body of this in it will have whatever you'd like, whatever code you'd like

420
00:25:53,039 --> 00:25:55,039
to initialize your object.

421
00:25:55,039 --> 00:25:56,039
Yes, question.

422
00:25:56,039 --> 00:26:02,359
Is the way you use the underscore that like part of the right instance?

423
00:26:02,359 --> 00:26:04,039
The underscore is part of how you write it.

424
00:26:04,039 --> 00:26:07,039
So you have to have underscore underscore in it, underscore underscore.

425
00:26:07,039 --> 00:26:08,639
Yeah, it's a special function.

426
00:26:08,639 --> 00:26:09,639
We'll talk about the next lecture.

427
00:26:09,639 --> 00:26:12,240
It's called a dunder function.

428
00:26:12,240 --> 00:26:15,839
Double underscore function, dunder.

429
00:26:15,839 --> 00:26:16,839
Okay.

430
00:26:16,839 --> 00:26:17,839
Okay.

431
00:26:17,839 --> 00:26:21,119
So the body of this function can contain a bunch of initialization codes.

432
00:26:21,119 --> 00:26:25,319
So anything you'd like to initialize when you create an object of this type, that's

433
00:26:25,319 --> 00:26:27,479
what you stick in here.

434
00:26:27,479 --> 00:26:28,479
Okay.

435
00:26:28,479 --> 00:26:33,759
Usually most of the time, 99% of the time, you want to initialize the data that makes up

436
00:26:33,759 --> 00:26:35,359
your object, right?

437
00:26:35,359 --> 00:26:40,359
So the data we decided makes up our object is how far you are in the x-axis and how far

438
00:26:40,359 --> 00:26:42,399
you are in the y-axis.

439
00:26:42,399 --> 00:26:48,519
So here, this data that I want every single one of my objects to have, a value for x and

440
00:26:48,519 --> 00:26:53,440
the value for y, is initialized using self dot, right?

441
00:26:53,440 --> 00:26:58,400
So self dot, a variable named x, and self dot, a variable named y.

442
00:26:58,400 --> 00:27:06,000
And the self dot, before these variables, distinguishes these variables x and y here from regular

443
00:27:06,000 --> 00:27:07,000
variables, right?

444
00:27:07,000 --> 00:27:12,879
If I were to just say x equals x, and y equals y, x and y will just be regular variables.

445
00:27:12,879 --> 00:27:16,319
As soon as my init function terminates, those variables are gone.

446
00:27:16,319 --> 00:27:22,079
Well, because I've got self dot x and self dot y, this means that these values x and

447
00:27:22,079 --> 00:27:28,480
y will persist throughout the lifetime of my object when I create my actual object.

448
00:27:28,480 --> 00:27:33,359
And every single object I create will have their own x and y values.

449
00:27:33,359 --> 00:27:34,359
Question?

450
00:27:34,359 --> 00:27:41,359
Does it have to be different to the x-axis, so kind of the same thing as x-axis?

451
00:27:42,199 --> 00:27:42,879
Good question.

452
00:27:42,879 --> 00:27:46,719
Does this self dot thing have to be different?

453
00:27:46,719 --> 00:27:52,679
It does not have to be, so you can have self dot x value equals x-value, and self dot y value equals y-value.

454
00:27:52,679 --> 00:27:56,599
The reason I did it here is to showcase that they actually do not have to be the same.

455
00:27:56,599 --> 00:27:59,839
Yeah, they are completely different, right?

456
00:27:59,839 --> 00:28:02,639
So self dot x is different than x-value.

457
00:28:02,639 --> 00:28:06,559
We're just happened to be assigning this value to be whatever is pasted.

458
00:28:06,559 --> 00:28:09,279
Okay.

459
00:28:09,279 --> 00:28:17,879
So a little bit of a kind of, again, just kind of explaining what this self is in the context of a blueprint.

460
00:28:17,879 --> 00:28:20,000
So if we think about a blueprint in real life, right?

461
00:28:20,000 --> 00:28:24,319
So here I have a blueprint for a room that I might want to create.

462
00:28:24,319 --> 00:28:26,519
I don't actually have this room created yet, right?

463
00:28:26,519 --> 00:28:28,480
It's just an idea.

464
00:28:28,480 --> 00:28:40,319
But what I know is that I'm going to use this blueprint to have a room that contains two chairs, a coffee table, and a sofa.

465
00:28:40,319 --> 00:28:45,519
So in this blueprint, I don't have actual rooms that I've implemented this thing in.

466
00:28:45,519 --> 00:28:49,559
I don't have actual rooms where I've put two chairs, a coffee table, and a sofa in.

467
00:28:49,559 --> 00:28:51,759
It's just an idea.

468
00:28:51,759 --> 00:28:57,960
But self is kind of the way that a blueprint accesses its attributes.

469
00:28:57,960 --> 00:29:08,960
So I've got, if I say self dot coffee table, that means if in the future I have an actual room, self dot coffee table means I'm referring to that room's coffee table.

470
00:29:08,960 --> 00:29:10,960
Okay.

471
00:29:10,960 --> 00:29:24,960
So the self is a variable that we used to refer to data or to attributes for a blueprint when I don't have actual rooms created.

472
00:29:24,960 --> 00:29:27,840
But once I create instances of rooms, right?

473
00:29:27,840 --> 00:29:31,640
So for example, here I have something called living room created, right?

474
00:29:31,640 --> 00:29:36,440
So I've taken my blueprint and now somebody asked me to create a room with this blueprint, right?

475
00:29:36,440 --> 00:29:40,680
Now I no longer use self because I have an actual room in hand.

476
00:29:40,680 --> 00:29:47,840
So now I would refer to coffee table in this living room as living room dot coffee table or living room's coffee table, right?

477
00:29:47,840 --> 00:29:49,600
No longer self's coffee table.

478
00:29:49,600 --> 00:29:53,279
So self is only used in the context of my blueprint.

479
00:29:53,279 --> 00:29:54,279
Okay.

480
00:29:54,440 --> 00:30:04,720
And to sort of bring the last point home, the idea that with the blueprint you can create many different instances, well, here's a living room that I've applied my blueprint to.

481
00:30:04,720 --> 00:30:09,759
And here's another living room, completely different room that somebody asked me to use my blueprint for to create it.

482
00:30:09,759 --> 00:30:13,480
Different chairs, different coffee tables, different colored things.

483
00:30:13,480 --> 00:30:19,639
These are all different instances that I used my one template, my one blueprint for the room on.

484
00:30:19,639 --> 00:30:20,639
Okay.

485
00:30:20,640 --> 00:30:24,160
So when we're defining the class, we don't have actual objects, right?

486
00:30:24,160 --> 00:30:26,800
Again, that's just kind of a really big idea here.

487
00:30:26,800 --> 00:30:30,680
We're just telling Python, I'd like to create this object and this is what it looks like.

488
00:30:30,680 --> 00:30:36,000
I'm bundling this data with these behaviors together, but I don't have actual objects of this type created yet.

489
00:30:37,200 --> 00:30:39,360
So let's actually create some objects.

490
00:30:39,360 --> 00:30:42,520
The code that does this is as follows.

491
00:30:42,520 --> 00:30:49,120
So I've put the definition for my class, the constructor, the init method for my class up here,

492
00:30:49,119 --> 00:30:51,679
just to remind us what it looks like.

493
00:30:51,679 --> 00:30:56,439
And with that code, we can now start to create actual objects that we can manipulate.

494
00:30:56,439 --> 00:31:01,959
So when we created something like, you know, L is equal to one square bracket lists, one comma two.

495
00:31:01,959 --> 00:31:06,639
Now I'm creating these actual coordinates in my code using my blueprint.

496
00:31:06,639 --> 00:31:09,599
So the way we do that is we invoke the name of our class.

497
00:31:10,799 --> 00:31:13,039
So you say coordinate, that's what we named it, right?

498
00:31:13,039 --> 00:31:14,519
That's our data type.

499
00:31:14,519 --> 00:31:18,719
And here I'm passing in every single parameter except for self.

500
00:31:18,720 --> 00:31:23,680
So I initialized a coordinate object using x, val, and y, val.

501
00:31:23,680 --> 00:31:27,160
So I need to put in two parameters here for x, val, and y, val.

502
00:31:28,319 --> 00:31:34,120
And self actually becomes this thing that I just created, this object.

503
00:31:35,240 --> 00:31:40,839
So coordinate three comma four is now an object that's being referenced by variable named C.

504
00:31:42,839 --> 00:31:45,160
Which is why I'm not passing in self.

505
00:31:45,160 --> 00:31:47,480
So it's kind of weird to think about.

506
00:31:47,480 --> 00:31:51,240
But now I have one object in memory, it's referenced by name C.

507
00:31:51,240 --> 00:31:54,519
And on the next line, I have another object in memory.

508
00:31:54,519 --> 00:31:57,200
Again, I've invoked the name of my class coordinate.

509
00:31:57,200 --> 00:32:01,120
This particular object, x value will be zero and y value will be zero.

510
00:32:01,120 --> 00:32:05,680
So different than the one I just did on the previous line.

511
00:32:05,680 --> 00:32:07,799
But they'll have the same structure.

512
00:32:07,799 --> 00:32:10,640
So they will both have some x and y value.

513
00:32:10,640 --> 00:32:12,960
They'll just be different from each other.

514
00:32:12,960 --> 00:32:15,599
But they'll both have x and they'll both have y.

515
00:32:15,599 --> 00:32:19,359
The one I've named down here is going to be a origin.

516
00:32:19,359 --> 00:32:21,439
So I've got two objects of type coordinate.

517
00:32:21,439 --> 00:32:25,399
One is referenced by C, by name C, and the other one is referenced by name origin.

518
00:32:26,759 --> 00:32:31,599
So now that I have these objects in hand, I can access any of their attributes.

519
00:32:31,599 --> 00:32:35,679
And Python will grab for me the attribute of that particular object.

520
00:32:36,719 --> 00:32:41,399
So here I've got this thing called Donotation, which we've seen before.

521
00:32:41,399 --> 00:32:44,719
And I'll explain it again in a couple slides.

522
00:32:44,720 --> 00:32:51,279
But the Donotation tells Python to access the x data attribute of object C.

523
00:32:52,759 --> 00:32:57,759
So this will grab for me the x value of C3, right?

524
00:32:57,759 --> 00:33:01,759
And the next line will grab for me the x value of origin, zero.

525
00:33:03,839 --> 00:33:09,839
And this is all made possible because x, and we could also access y,

526
00:33:09,839 --> 00:33:14,400
x and y were defined in the class definition using self dot.

527
00:33:14,400 --> 00:33:17,400
If I didn't use self dot, those would just be variables.

528
00:33:17,400 --> 00:33:22,120
And as soon as I created my object, they would have gone away because that function had terminated.

529
00:33:22,120 --> 00:33:27,400
But in order to have these variables x and y persist throughout the lifetime of my object,

530
00:33:27,400 --> 00:33:30,800
I've defined them using self dot x and self dot y.

531
00:33:30,800 --> 00:33:35,320
So any object I've created that's of type coordinate will have some value for x and

532
00:33:35,320 --> 00:33:36,800
some value for y.

533
00:33:36,800 --> 00:33:39,120
So we can access that value through this notation.

534
00:33:40,480 --> 00:33:41,680
Does that make sense so far?

535
00:33:41,680 --> 00:33:42,200
Is that all right?

536
00:33:44,600 --> 00:33:45,600
OK.

537
00:33:46,600 --> 00:33:49,680
So we're going to visualize this in a slightly different way.

538
00:33:49,680 --> 00:33:56,600
So the exact same code as on a previous slide, we're now going to do it in our little memory type.

539
00:33:56,600 --> 00:34:01,280
So here I have C is equal to coordinate 3, 4, exactly what I had on the previous slide.

540
00:34:01,280 --> 00:34:06,800
So in memory, the way you think about it is, as we've been thinking about other objects,

541
00:34:06,800 --> 00:34:07,800
it's not much different.

542
00:34:07,800 --> 00:34:10,519
We have C is our name, right?

543
00:34:10,519 --> 00:34:13,079
And it's bound to an object of type coordinate.

544
00:34:13,079 --> 00:34:17,000
It just so happens, we define this object, but it's the same idea.

545
00:34:17,000 --> 00:34:19,279
I've got a name bound to some object.

546
00:34:19,279 --> 00:34:23,159
And this object has its own x value and its own y value.

547
00:34:25,000 --> 00:34:29,799
So when you evaluate C dot x, Python goes into memory, it says, hey, what type is C?

548
00:34:29,799 --> 00:34:31,519
And it says, oh, it's a coordinate object.

549
00:34:31,519 --> 00:34:34,400
Does coordinate object have a data attribute named x?

550
00:34:34,400 --> 00:34:36,799
Yes, it does because it looks at the init.

551
00:34:36,799 --> 00:34:38,519
And then it says, well, what's its value?

552
00:34:38,519 --> 00:34:39,199
It's 3.

553
00:34:39,199 --> 00:34:40,400
And so it just returns that.

554
00:34:40,920 --> 00:34:51,920
And so the next three lines here are slightly different from two slides ago, but very similar.

555
00:34:51,920 --> 00:34:57,920
A is equal to zero, creates for me a variable named A bound to the value zero, right?

556
00:34:57,920 --> 00:35:03,440
Just to showcase that it's exactly the same as having a variable named C bound to this object that we created.

557
00:35:03,440 --> 00:35:09,880
And then when I say, or rig equals coordinate a comma A, Python says, all right,

558
00:35:09,880 --> 00:35:13,640
well, here's a name, or rig, or origin.

559
00:35:13,640 --> 00:35:15,440
What is it bound to?

560
00:35:15,440 --> 00:35:18,559
Well, it's also bound to an object of type coordinate.

561
00:35:18,559 --> 00:35:21,280
And it's an object we defined.

562
00:35:21,280 --> 00:35:24,880
So we defined an object of type coordinate having an x and y value.

563
00:35:24,880 --> 00:35:27,960
So here they are, and they're originally zero.

564
00:35:27,960 --> 00:35:30,480
They're set to zero when I created this object.

565
00:35:30,480 --> 00:35:34,200
So when I say or rig dot x, Python will look up or rig.

566
00:35:34,200 --> 00:35:36,280
It's going to say, hey, what type are you?

567
00:35:36,280 --> 00:35:37,400
Oh, you're a coordinate.

568
00:35:37,400 --> 00:35:39,240
Do you have an x value?

569
00:35:39,239 --> 00:35:41,239
You do. That's what we define in the init.

570
00:35:41,239 --> 00:35:42,599
Let me grab that value from you.

571
00:35:47,879 --> 00:35:50,399
So we're just manipulating objects in memory, right?

572
00:35:50,399 --> 00:35:54,239
Now that we've written the code to work with objects that we created,

573
00:35:54,239 --> 00:35:56,679
we're just creating a whole bunch of these objects in memory,

574
00:35:56,679 --> 00:36:00,159
and then grabbing the x values, and then we're going to get the distance

575
00:36:00,159 --> 00:36:04,279
between two objects in a bit.

576
00:36:04,280 --> 00:36:10,240
One more way to show you that exact same code is to visualize it.

577
00:36:10,240 --> 00:36:17,800
So here is the entire code as you would have it in a file.

578
00:36:17,800 --> 00:36:20,240
So you would have all this all together.

579
00:36:20,240 --> 00:36:24,880
The gray box is the definition for my object type.

580
00:36:24,880 --> 00:36:30,400
And the blue box is me using this object that I just created.

581
00:36:30,400 --> 00:36:33,160
I've just separated that out just for clarity.

582
00:36:33,159 --> 00:36:37,119
So when I have my gray box, there's nothing to display, right?

583
00:36:37,119 --> 00:36:40,639
It just sits in memory.

584
00:36:40,639 --> 00:36:43,199
And Python knows of this type of class coordinate

585
00:36:43,199 --> 00:36:45,119
that has two data attributes, the things

586
00:36:45,119 --> 00:36:46,920
that I've defined using self.

587
00:36:46,920 --> 00:36:48,480
x and y.

588
00:36:48,480 --> 00:36:51,440
When I create c is equal to coordinate 3, 4,

589
00:36:51,440 --> 00:36:53,199
visualizing what we're trying to do here.

590
00:36:53,199 --> 00:36:56,039
Here I've got this object whose name is c,

591
00:36:56,039 --> 00:36:58,239
and it's at 3,4.

592
00:36:58,239 --> 00:37:01,519
And then I've got this object named the origin,

593
00:37:01,519 --> 00:37:05,079
and it's x and y values are 0, 0.

594
00:37:05,079 --> 00:37:08,440
So because I've created these objects using the same blueprint,

595
00:37:08,440 --> 00:37:11,360
the coordinate blueprint that I've defined up in the gray,

596
00:37:11,360 --> 00:37:13,440
that means every object that I've created,

597
00:37:13,440 --> 00:37:18,400
c and origin, has a self.x and self.y value.

598
00:37:18,400 --> 00:37:21,639
It just so happens that the actual values for x and y

599
00:37:21,639 --> 00:37:25,679
are different between these two objects.

600
00:37:25,679 --> 00:37:29,320
So when I grab origin.x, I'm looking up origin,

601
00:37:29,320 --> 00:37:31,880
and I'm grabbing its x value, 0.

602
00:37:31,880 --> 00:37:35,960
Just another way to visualize it.

603
00:37:35,960 --> 00:37:37,240
OK.

604
00:37:37,240 --> 00:37:39,880
Is everyone OK with these data attributes?

605
00:37:39,880 --> 00:37:41,559
All right.

606
00:37:41,559 --> 00:37:44,240
So now let's add a method.

607
00:37:44,240 --> 00:37:48,840
So a method, remember, is just a function that works with an object

608
00:37:48,840 --> 00:37:51,240
of this type.

609
00:37:51,240 --> 00:37:53,840
So the way that we tell Python, we'd

610
00:37:53,840 --> 00:37:58,480
like to create a method, is by passing in self

611
00:37:58,480 --> 00:38:00,800
as the first parameter.

612
00:38:00,800 --> 00:38:06,240
So let's create this function named distance.

613
00:38:06,240 --> 00:38:08,360
If you look in the actual Python code for today,

614
00:38:08,360 --> 00:38:12,079
I've got two more functions, one to get the x value

615
00:38:12,079 --> 00:38:14,719
of this current object and one to get the y value.

616
00:38:14,719 --> 00:38:16,240
But those are not as interesting.

617
00:38:16,240 --> 00:38:19,760
This distance one is interesting now.

618
00:38:19,760 --> 00:38:24,079
So I would like to create this function that only works

619
00:38:24,079 --> 00:38:26,039
with an object of type coordinate.

620
00:38:26,039 --> 00:38:28,519
So what we've done so far is these lines up here.

621
00:38:28,519 --> 00:38:31,000
So now we've got df, again, it's just a function.

622
00:38:31,000 --> 00:38:36,400
So we've got def, name of it, distance, and then the parameters.

623
00:38:36,400 --> 00:38:39,119
So again, since this is a function that only works with an object

624
00:38:39,119 --> 00:38:44,079
of type coordinate, I need to put self as the first parameter.

625
00:38:44,079 --> 00:38:48,759
And this self will help us refer to the object

626
00:38:48,759 --> 00:38:51,759
when I call the method on it.

627
00:38:51,759 --> 00:38:53,800
So if self is the first parameter,

628
00:38:53,800 --> 00:38:59,240
that means that this distance method will be called on self.

629
00:38:59,240 --> 00:39:02,400
So when I have an actual object in hand

630
00:39:02,400 --> 00:39:05,680
that I'm calling distance on the self parameter,

631
00:39:05,680 --> 00:39:08,080
we'll take on the value that is that object.

632
00:39:08,080 --> 00:39:11,039
We're going to see this in the next slide.

633
00:39:11,039 --> 00:39:13,760
So self is the thing that I'm calling this function on.

634
00:39:13,760 --> 00:39:18,519
And then what other parameters do I want to give to this function?

635
00:39:18,519 --> 00:39:21,720
Well, I want to find the distance between myself.

636
00:39:21,719 --> 00:39:24,480
So this object that I'm going to call distance on,

637
00:39:24,480 --> 00:39:27,639
and another coordinate object.

638
00:39:27,639 --> 00:39:35,239
Now, other than maybe a doc string here that says, hey, warning,

639
00:39:35,239 --> 00:39:37,879
others should be an object of type coordinate,

640
00:39:37,879 --> 00:39:42,279
there isn't really anything that enforces the type of other

641
00:39:42,279 --> 00:39:45,799
when you make a function call or when you make a method call.

642
00:39:45,799 --> 00:39:48,799
So you can call this distance method

643
00:39:48,799 --> 00:39:51,279
with other being an integer, which

644
00:39:51,280 --> 00:39:53,440
is not an object of type coordinate.

645
00:39:53,440 --> 00:39:56,440
The code will run, but will immediately crash

646
00:39:56,440 --> 00:39:59,360
because of what's going on inside.

647
00:39:59,360 --> 00:40:01,480
So the only way this code will work

648
00:40:01,480 --> 00:40:04,720
is if you're calling it on an object of type coordinate

649
00:40:04,720 --> 00:40:06,560
for the other.

650
00:40:06,560 --> 00:40:09,400
So the reason for that is because when we think about grabbing

651
00:40:09,400 --> 00:40:12,480
the distance between two objects that are coordinates in a 2D

652
00:40:12,480 --> 00:40:16,840
plane, we take the difference between the x values,

653
00:40:16,840 --> 00:40:19,600
square, a square that, take the difference between the y values,

654
00:40:19,599 --> 00:40:22,880
square that, right, Pythagoras, add those two together,

655
00:40:22,880 --> 00:40:25,400
take the square root.

656
00:40:25,400 --> 00:40:28,279
So if I'm calling this distance method

657
00:40:28,279 --> 00:40:31,599
on an object of type coordinate, i.e. self,

658
00:40:31,599 --> 00:40:34,639
how do I grab myself's x value?

659
00:40:34,639 --> 00:40:37,360
Well, I just say self.x, right?

660
00:40:37,360 --> 00:40:39,679
My x value, what is it?

661
00:40:39,679 --> 00:40:41,960
And then I would like to subtract that

662
00:40:41,960 --> 00:40:46,000
from the other coordinate objects, x value.

663
00:40:46,000 --> 00:40:47,239
What's my other coordinate object?

664
00:40:47,239 --> 00:40:49,919
It's the thing that I'm passing in as a parameter.

665
00:40:49,919 --> 00:40:52,279
So grab their x value.

666
00:40:52,279 --> 00:40:56,399
So if I take self.x minus other.x, Python will grab my x value,

667
00:40:56,399 --> 00:41:00,079
subtract it from others x value, square that.

668
00:41:00,079 --> 00:41:02,359
We do the exact same thing with y, right?

669
00:41:02,359 --> 00:41:06,759
Grab my x, y value, subtract it from others y value, square that,

670
00:41:06,759 --> 00:41:09,279
and then the rest is just Pythagoras.

671
00:41:09,279 --> 00:41:11,199
Add those two and take the square root.

672
00:41:11,199 --> 00:41:14,199
I take it to the power of a half.

673
00:41:14,199 --> 00:41:16,599
And this function is just a regular function

674
00:41:16,599 --> 00:41:20,039
other than this self being the first parameter

675
00:41:20,039 --> 00:41:23,399
and us working with data attributes of myself

676
00:41:23,399 --> 00:41:26,359
and potentially other parameters.

677
00:41:26,359 --> 00:41:28,599
But you can see it returns a value.

678
00:41:28,599 --> 00:41:33,239
It has the d, f, a name, and things like that.

679
00:41:33,239 --> 00:41:35,119
So the way we're going to use this method

680
00:41:35,119 --> 00:41:37,119
that we just wrote is using the dot operator.

681
00:41:37,119 --> 00:41:41,799
Just like we accessed a data attribute of an object

682
00:41:41,799 --> 00:41:44,039
that I created, I can access

683
00:41:44,039 --> 00:41:48,840
a procedural attribute, i.e. a method of an object I just created.

684
00:41:48,840 --> 00:41:51,440
So we use the dot operator for this.

685
00:41:51,440 --> 00:41:53,920
The thing before the dot is the object

686
00:41:53,920 --> 00:41:58,360
I would like to call the method on, dot,

687
00:41:58,360 --> 00:42:00,759
the name of the method I'd like to call.

688
00:42:00,759 --> 00:42:03,000
And in parentheses, it's just a function.

689
00:42:03,000 --> 00:42:06,920
So I need to give it any parameters this method expects.

690
00:42:06,920 --> 00:42:08,840
Now this should look very familiar.

691
00:42:08,840 --> 00:42:12,239
We introduced dot notation when we worked with lists, right?

692
00:42:12,239 --> 00:42:14,279
Remember that?

693
00:42:14,279 --> 00:42:16,919
And I said when we worked with a list, right?

694
00:42:16,919 --> 00:42:19,119
For now, have to remember why we used

695
00:42:19,119 --> 00:42:22,119
this special way of writing this function.

696
00:42:22,119 --> 00:42:23,519
But it was the same idea.

697
00:42:23,519 --> 00:42:26,039
The thing before the dot was the list I wanted

698
00:42:26,039 --> 00:42:28,159
to apply the function to.

699
00:42:28,159 --> 00:42:31,279
So my list is the name of a list variable.

700
00:42:31,279 --> 00:42:33,319
I wanted to apply the function append,

701
00:42:33,319 --> 00:42:37,319
and it happened to take an integer as a parameter.

702
00:42:37,319 --> 00:42:39,759
And same with sort here is also another one.

703
00:42:39,759 --> 00:42:41,359
But this one didn't take any parameters.

704
00:42:41,360 --> 00:42:44,200
But it's the same idea of the dot notation.

705
00:42:44,200 --> 00:42:47,160
So in terms of our class, here I've

706
00:42:47,160 --> 00:42:49,840
got two coordinate objects, right?

707
00:42:49,840 --> 00:42:53,120
And I've got a dot notation being used here

708
00:42:53,120 --> 00:42:56,920
to find the distance between one object and another one.

709
00:42:56,920 --> 00:42:58,840
So the thing before the dot is an object

710
00:42:58,840 --> 00:43:01,440
I would like to use the distance method on.

711
00:43:01,440 --> 00:43:04,920
Pick one of them, c, dot distance, the name of the method

712
00:43:04,920 --> 00:43:06,519
I'd like to call.

713
00:43:06,519 --> 00:43:10,480
And in parentheses, I've got another coordinate object,

714
00:43:10,480 --> 00:43:11,559
or rig.

715
00:43:11,559 --> 00:43:17,559
So here, I am using the class, right?

716
00:43:17,559 --> 00:43:19,440
And I've got actual values, right?

717
00:43:19,440 --> 00:43:22,000
Actual objects that I'm manipulating, right?

718
00:43:22,000 --> 00:43:23,320
C and or rig.

719
00:43:27,360 --> 00:43:29,840
So this might look a little bit weird,

720
00:43:29,840 --> 00:43:31,920
but when we actually call the function remember,

721
00:43:31,920 --> 00:43:35,360
we omitted self when we omitted, sorry,

722
00:43:35,360 --> 00:43:38,000
we omitted self when we made this function call.

723
00:43:38,000 --> 00:43:40,000
But that's because self implicitly

724
00:43:40,000 --> 00:43:42,639
becomes the thing before the dot.

725
00:43:42,639 --> 00:43:46,360
The thing you're calling this method on.

726
00:43:46,360 --> 00:43:48,480
So let's visualize that in our memory.

727
00:43:48,480 --> 00:43:50,960
So here I've got my class definition for a coordinate.

728
00:43:50,960 --> 00:43:54,719
It has some data attributes and some procedural attributes.

729
00:43:54,719 --> 00:43:58,360
I've got these two objects being created.

730
00:43:58,360 --> 00:44:00,400
C is this object of type coordinate,

731
00:44:00,400 --> 00:44:02,079
or rig is this object of type coordinate.

732
00:44:02,079 --> 00:44:03,679
They've got different x and y values,

733
00:44:03,679 --> 00:44:07,960
but they both have x and y, some x and y values.

734
00:44:07,960 --> 00:44:16,679
When I make a function call to a method call on c, Python says,

735
00:44:16,679 --> 00:44:19,800
all right, let me look at this thing before the dot.

736
00:44:19,800 --> 00:44:20,360
What is it?

737
00:44:20,360 --> 00:44:22,199
It's an object of type coordinate.

738
00:44:25,199 --> 00:44:28,840
Then it looks at the method you're trying to call distance.

739
00:44:28,840 --> 00:44:32,240
It says, hey, does coordinate have a distance method defined?

740
00:44:32,240 --> 00:44:33,199
Why yes, it does?

741
00:44:33,199 --> 00:44:35,079
We just wrote it.

742
00:44:35,079 --> 00:44:36,360
And then it says, all right, well,

743
00:44:36,360 --> 00:44:38,320
let me call this distance method.

744
00:44:38,320 --> 00:44:44,640
It's going to set self as c, the thing before the dot.

745
00:44:44,640 --> 00:44:47,360
And any other parameters will be set in order

746
00:44:47,360 --> 00:44:49,200
to whatever is being passed in here.

747
00:44:49,200 --> 00:44:53,680
So or rig will become the other parameter

748
00:44:53,680 --> 00:44:55,240
from my definition for that function.

749
00:44:59,599 --> 00:45:04,039
So this is just the conventional way of calling methods.

750
00:45:04,039 --> 00:45:05,960
And it's the way we've been working with lists

751
00:45:05,960 --> 00:45:08,119
and dictionaries and things like that.

752
00:45:08,119 --> 00:45:14,079
So again, we've got some object, the thing before the dot, some method to run.

753
00:45:16,760 --> 00:45:20,400
And when we call it this way, the thing before the dot becomes self

754
00:45:20,400 --> 00:45:23,880
in our class definition, right, in our method definition.

755
00:45:23,880 --> 00:45:28,440
And then all the other parameters become assigned one by one, right,

756
00:45:28,440 --> 00:45:30,639
everything except for self.

757
00:45:30,639 --> 00:45:34,760
Now to sort of demystify this, I would like to show you what this is actually

758
00:45:34,760 --> 00:45:36,080
equivalent to.

759
00:45:36,080 --> 00:45:38,800
So we can run the function, the method that we defined,

760
00:45:38,800 --> 00:45:43,760
using by actually passing in a value for self, right, if this is more,

761
00:45:43,760 --> 00:45:46,080
if this is clear to you.

762
00:45:46,080 --> 00:45:52,680
So in that case, the thing before the dot cannot be an object, right?

763
00:45:52,680 --> 00:45:55,160
Because if it is an object of the type coordinate,

764
00:45:55,160 --> 00:45:59,240
then Python will say, well, this is the object I'm running the distance method on.

765
00:45:59,240 --> 00:46:04,400
So to demystify this, you can actually invoke the name of the class, right?

766
00:46:04,400 --> 00:46:09,240
The object that you're trying to create the name, the data type, right, coordinate.

767
00:46:09,240 --> 00:46:12,840
And then Python says, oh, I see, you're calling the name of the class.

768
00:46:14,840 --> 00:46:18,320
It's not an object, so then what do you want from me?

769
00:46:18,320 --> 00:46:22,880
Okay, the thing after the dot says, I would like to run this method on you.

770
00:46:22,880 --> 00:46:27,599
But now it needs all the parameters in the parameter list, including self.

771
00:46:29,079 --> 00:46:33,400
So here, I would set, I would have to give it explicitly C,

772
00:46:33,400 --> 00:46:38,119
but the 0 instead of just 0, because the thing before the dot is the name of my class,

773
00:46:38,119 --> 00:46:41,000
not an actual object, like it is on the side.

774
00:46:41,000 --> 00:46:43,519
So this is actually the conventional way to do this, right?

775
00:46:43,519 --> 00:46:46,000
This is the shorthand, the Python way to do this.

776
00:46:46,000 --> 00:46:53,440
But this hopefully demystifies the self deal and the way we actually set

777
00:46:53,440 --> 00:46:55,599
that first parameter to the thing before the dot.

778
00:46:57,599 --> 00:46:58,800
All right, yes, question.

779
00:46:58,800 --> 00:47:02,800
If you could first want to add one of the one parameter, you should add 0.

780
00:47:02,800 --> 00:47:03,600
Yeah, exactly.

781
00:47:03,600 --> 00:47:07,600
If there's more parameter, just pop in those extra ones with commas, just like a regular function.

782
00:47:07,600 --> 00:47:13,000
All right, so this dot operator basically accesses either our data, C dot X,

783
00:47:13,000 --> 00:47:17,800
or our methods, right, C dot distance, whatever, or whatever method name we have.

784
00:47:17,800 --> 00:47:21,080
All right, so that's it for today's lecture.

785
00:47:21,080 --> 00:47:24,800
Next lecture, we're going to build on this coordinate object by creating circles.

786
00:47:24,800 --> 00:47:27,120
And then we'll create some fraction objects.

787
00:47:27,120 --> 00:47:32,800
And we'll look at some other way, some other objects that we can bundle together.

788
00:47:32,800 --> 00:47:33,800
Okay.

