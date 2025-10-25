---
title: MIT6100 P19P19Inheritance
---

1
00:00:00,000 --> 00:00:19,480
All right, let's get started.

2
00:00:19,480 --> 00:00:26,640
So today's lecture is lecture 3 out of 4 on the idea of object oriented programming and

3
00:00:26,640 --> 00:00:30,440
creating our own object types through Python classes.

4
00:00:30,440 --> 00:00:34,320
The majority of today's lecture will be on this idea of inheritance, but before we get

5
00:00:34,320 --> 00:00:40,520
there, I'd like to do a little bit of a recap of the big things that we've seen already.

6
00:00:40,520 --> 00:00:46,280
And along the way, we'll be writing a new data type for something more abstract and animal

7
00:00:46,280 --> 00:00:49,000
class, more abstract than what we've seen before.

8
00:00:49,000 --> 00:00:54,079
But then when we get to the idea of inheritance, we'll build upon this animal class with some

9
00:00:54,079 --> 00:00:56,359
more animal objects.

10
00:00:56,359 --> 00:01:02,280
So the big idea behind creating our own data types is that we want to mimic what's going

11
00:01:02,280 --> 00:01:03,439
on in real life, right?

12
00:01:03,439 --> 00:01:09,640
And in real life, we basically have all of these different objects in the world, right?

13
00:01:09,640 --> 00:01:13,920
But these objects can be grouped according to some categories, right?

14
00:01:13,920 --> 00:01:17,599
So in this particular slide, I've got six different objects.

15
00:01:17,599 --> 00:01:20,760
But the three on the left can kind of be grouped together, right?

16
00:01:20,760 --> 00:01:24,039
We know that they are kind of cat.

17
00:01:24,040 --> 00:01:28,440
And as such, we know that all these cats have, you know, we can describe them using some

18
00:01:28,440 --> 00:01:30,520
common properties and common behaviors.

19
00:01:30,520 --> 00:01:36,200
So for these cats, I would say that all these cats have a name and agent of color associated

20
00:01:36,200 --> 00:01:37,560
with them, right?

21
00:01:37,560 --> 00:01:42,160
So I know that all cats will, therefore, you know, generally have a name and agent of color,

22
00:01:42,160 --> 00:01:45,640
and then some similar set of behaviors.

23
00:01:45,640 --> 00:01:50,080
The items on the right, right, those three objects, I know they can be categorized together.

24
00:01:50,080 --> 00:01:53,400
Let's say that they're wild rabbits, and let's say that for the wild rabbits, I don't

25
00:01:53,400 --> 00:01:54,880
actually give them a name.

26
00:01:54,880 --> 00:02:00,440
So I would categorize them, again, using common properties, properties just an age and a

27
00:02:00,440 --> 00:02:01,440
color, right?

28
00:02:01,440 --> 00:02:02,440
No name.

29
00:02:02,440 --> 00:02:07,080
And then those three objects on the right also have a common set of behaviors different than

30
00:02:07,080 --> 00:02:08,400
the objects on the left.

31
00:02:08,400 --> 00:02:14,000
And so we're trying to mimic the idea of these categorizations, data types that we see in

32
00:02:14,000 --> 00:02:15,680
real life.

33
00:02:15,680 --> 00:02:16,680
Okay.

34
00:02:16,680 --> 00:02:20,480
So a little bit of recap, right?

35
00:02:20,480 --> 00:02:25,680
When we define our own data type in Python, we decide on a bunch of attributes.

36
00:02:25,680 --> 00:02:29,800
And attributes can either be data, or they can be procedures.

37
00:02:29,800 --> 00:02:35,319
The data is, you think of them as sort of what variables make up your object, and this

38
00:02:35,319 --> 00:02:36,920
is something that you decide.

39
00:02:36,920 --> 00:02:41,480
So for a coordinate object, we've seen this example a lot of times we decided on x and

40
00:02:41,480 --> 00:02:42,719
y values.

41
00:02:42,719 --> 00:02:47,879
For this more abstract idea of an animal, well, we can just say that we can describe an

42
00:02:47,879 --> 00:02:49,919
animal by its age.

43
00:02:49,919 --> 00:02:54,439
So how long it's been alive, right, since birth.

44
00:02:54,439 --> 00:03:00,439
In terms of procedural attributes, these we implemented using methods in Python classes.

45
00:03:00,439 --> 00:03:05,919
And the idea behind these is just how can somebody, or somebody who's creating an object of this

46
00:03:05,919 --> 00:03:07,639
type, manipulate the object?

47
00:03:07,639 --> 00:03:10,639
What are some ways to interface with this object?

48
00:03:10,639 --> 00:03:15,799
So our coordinate class, one of the more interesting things was to find a distance between a coordinate

49
00:03:15,799 --> 00:03:17,159
and another coordinate.

50
00:03:17,159 --> 00:03:22,399
But some of the simpler things were to just get the value of the x coordinate, the y coordinate,

51
00:03:22,399 --> 00:03:23,639
things like that.

52
00:03:23,639 --> 00:03:28,719
For our animal class that we're implementing today, it's going to be a little more abstract.

53
00:03:28,719 --> 00:03:33,439
But one of the simplest things is to just say, hey, tell me how long you've been alive.

54
00:03:33,439 --> 00:03:40,619
That's basically just grabbing the value of the attribute, the age, right?

55
00:03:40,620 --> 00:03:45,539
So here we're defining our data object, right?

56
00:03:45,539 --> 00:03:49,620
The class keyword tells Python we're creating our new data type.

57
00:03:49,620 --> 00:03:51,140
This is the name of our data type.

58
00:03:51,140 --> 00:03:55,340
So the type of this thing that we're creating is animal.

59
00:03:55,340 --> 00:04:02,939
In parentheses here, animal inheritance, animals as parent is the generic Python object.

60
00:04:02,939 --> 00:04:07,819
And later today's lecture, we're going to see what happens when we put something else in those parentheses.

61
00:04:07,819 --> 00:04:13,579
So the parent of a class that we create is something other than just the generic Python object.

62
00:04:13,579 --> 00:04:19,019
And then the very first method that we always write in our new object definition is the init method.

63
00:04:19,019 --> 00:04:22,659
This tells Python how do you create an object of this type?

64
00:04:22,659 --> 00:04:26,539
A very basic information that Python needs to know.

65
00:04:26,539 --> 00:04:31,819
So the init method is a special dunder method, double underscore init, double underscore.

66
00:04:32,779 --> 00:04:40,060
And by now, you're familiar, the first parameter of every single method that we define inside a class is this thing called self.

67
00:04:40,060 --> 00:04:45,259
And remember, self is a variable, right?

68
00:04:45,259 --> 00:04:52,459
It's a variable name that allows us to talk about an object without having created one yet.

69
00:04:52,459 --> 00:04:55,420
Because all we're doing here is defining the class, right?

70
00:04:55,420 --> 00:04:57,659
We don't have actual objects created.

71
00:04:57,660 --> 00:05:05,180
And so this method here, the init method, and all the other methods are run on an object of type animal, but we don't have that object yet.

72
00:05:05,180 --> 00:05:11,780
So the first parameter will be that object in this abstract sort of way.

73
00:05:11,780 --> 00:05:15,420
And then you can put other parameters in that list.

74
00:05:15,420 --> 00:05:22,940
And so we say that when we create a new animal object, we're going to initialize it by its age, so some number.

75
00:05:22,940 --> 00:05:26,060
Within the init, what do we usually do?

76
00:05:26,060 --> 00:05:33,180
Well, we usually initialize all the data attributes, also called instance variables.

77
00:05:33,180 --> 00:05:35,579
So here, how many data attributes do I have?

78
00:05:37,780 --> 00:05:38,740
For the animal class.

79
00:05:39,819 --> 00:05:40,540
Two, exactly.

80
00:05:40,540 --> 00:05:41,579
Yeah, two.

81
00:05:41,579 --> 00:05:45,060
The first one, self.age, right, is a data attribute.

82
00:05:45,060 --> 00:05:49,939
And we know it's a data attribute because we have that self appearing again, right?

83
00:05:49,939 --> 00:05:55,660
If it was just a variable name like age or years or time or something like that,

84
00:05:55,660 --> 00:05:57,820
it would just be a regular old variable.

85
00:05:57,820 --> 00:06:01,420
And as soon as that init method ended, that variable would go away.

86
00:06:01,420 --> 00:06:11,820
But the fact that we've initialized this variable itself dot tells Python, hey, this is a variable that I want to persist for as long as this object exists in memory.

87
00:06:11,820 --> 00:06:14,260
So it's an instance variable.

88
00:06:14,260 --> 00:06:21,540
So self.age equals age will create this data attribute age and assign it to the parameter past in age.

89
00:06:21,540 --> 00:06:24,620
Now, self-data attribute.

90
00:06:24,620 --> 00:06:27,980
It's just not being passed in the parameter list and that's okay.

91
00:06:27,980 --> 00:06:31,699
Not everything has to be passed into the parameter list.

92
00:06:31,699 --> 00:06:40,180
So here, what we're effectively doing is saying, when we create a new animal object, we have to tell it the age how long it's been alive for.

93
00:06:40,180 --> 00:06:43,860
But then the name data attribute is always going to be none.

94
00:06:43,860 --> 00:06:49,899
So there's an absence of a value for the name for every animal we create right off the bat.

95
00:06:49,899 --> 00:06:51,019
Okay.

96
00:06:51,019 --> 00:06:53,300
Everyone okay with piece over here?

97
00:06:54,620 --> 00:06:58,860
What's the purpose of defining this to be none?

98
00:06:58,860 --> 00:07:03,980
Well, later on, I'm going to add some methods that allow you to give a name to an animal if you'd like.

99
00:07:03,980 --> 00:07:07,180
But again, this is a design choice that I made.

100
00:07:07,180 --> 00:07:10,139
So you, yeah, you might not make the same design choices.

101
00:07:12,139 --> 00:07:14,660
So that's the definition for my class, right?

102
00:07:14,660 --> 00:07:16,579
Just these four lines of code.

103
00:07:16,579 --> 00:07:22,860
And then down here, we saw the past couple of lectures how to create actual new objects, right?

104
00:07:22,860 --> 00:07:27,900
So this is where the, the actual actually happens, right?

105
00:07:27,900 --> 00:07:34,660
So here I'm creating a new animal object, a variable my animal is bound to that animal object, right?

106
00:07:34,660 --> 00:07:38,060
So that's my variable name, name and anything you want.

107
00:07:38,060 --> 00:07:44,020
And then you're telling Python to create a new animal object simply by invoking the name of the class.

108
00:07:44,020 --> 00:07:48,740
And then passing in all the parameters that we're expecting here, except for self, right?

109
00:07:48,740 --> 00:07:51,860
Because self becomes this thing.

110
00:07:51,860 --> 00:07:54,620
If I were to draw a box around animal three, that is self.

111
00:07:54,620 --> 00:07:56,500
That is this object that I just created.

112
00:07:58,740 --> 00:08:01,220
Okay, so that's the init method.

113
00:08:01,220 --> 00:08:03,699
Last lecture, we saw some dunder methods.

114
00:08:03,699 --> 00:08:11,020
And I think I said, probably the second method you'd ever want to implement for a new class is this dunder STR method.

115
00:08:12,020 --> 00:08:21,460
Now the dunder STR method tells Python how Python should print an object of type animal, right?

116
00:08:21,459 --> 00:08:26,019
Because initially right off the bat, if we didn't implement this dunder STR method,

117
00:08:26,019 --> 00:08:31,180
Python would default to the STR method of the generic Python object,

118
00:08:31,180 --> 00:08:36,740
which just tells us the memory location this object has been created at, which is not very useful.

119
00:08:36,740 --> 00:08:44,819
When we print an animal object, and again, my design choice is to say I'm going to print animal colon,

120
00:08:44,819 --> 00:08:48,059
the name of that animal colon and the age of that animal.

121
00:08:48,059 --> 00:08:50,220
Again, my design choice, right?

122
00:08:50,220 --> 00:08:54,139
And remember the dunder STR method returns the string you want to print out.

123
00:08:54,139 --> 00:08:56,899
It doesn't print it out straight up.

124
00:08:59,139 --> 00:09:00,460
Everyone okay with that so far?

125
00:09:00,460 --> 00:09:01,220
Should be review.

126
00:09:02,300 --> 00:09:05,580
So then the other things that we want to include in our class,

127
00:09:05,580 --> 00:09:11,220
and this is something that you included no matter what the language you're working with,

128
00:09:11,220 --> 00:09:15,139
is these things called getters and setters.

129
00:09:15,139 --> 00:09:18,180
So getters are these two right here.

130
00:09:18,179 --> 00:09:26,419
Getters are basically very simple functions that return the values of the data attributes that this object has.

131
00:09:26,419 --> 00:09:32,459
This object just has two right, an age and a name, because they were defined using self dot age and self dot name.

132
00:09:32,459 --> 00:09:36,339
So here's a getter to just tell me the value of self dot age.

133
00:09:36,339 --> 00:09:41,459
So all it does is return self dot age and name all it does is return self dot name.

134
00:09:41,459 --> 00:09:42,299
Very, very simple.

135
00:09:43,139 --> 00:09:54,379
Setters, same idea, except that now we're allowing someone using our class to set the values of these data attributes through these methods.

136
00:09:54,379 --> 00:09:55,139
Right?

137
00:09:55,139 --> 00:10:02,019
So here all it's doing is taking in a parameter for the thing you want to change the age or the name to, right?

138
00:10:02,019 --> 00:10:06,579
And all it does is say, well, say self dot age is going to be equal to the thing you passed in.

139
00:10:06,579 --> 00:10:07,659
Okay?

140
00:10:07,659 --> 00:10:10,620
That's the age.

141
00:10:10,620 --> 00:10:13,339
So we're changing this to a different number.

142
00:10:13,339 --> 00:10:18,100
And then the set name is changing the name, data attribute to a different string.

143
00:10:18,100 --> 00:10:23,419
And here I'm using this default parameter that we talked about way back in,

144
00:10:23,419 --> 00:10:27,059
in when we talked about functions, right?

145
00:10:27,059 --> 00:10:32,019
So if you don't pass in an actual string value, we'll default to the empty string.

146
00:10:33,819 --> 00:10:34,779
Okay?

147
00:10:34,779 --> 00:10:36,459
So let me show you how this works.

148
00:10:38,419 --> 00:10:41,259
So this is my animal class exactly as in the slides.

149
00:10:41,259 --> 00:10:45,019
I've got my init, str and my two getters and setters.

150
00:10:45,019 --> 00:10:47,459
And then I've got two animals being created here, right?

151
00:10:47,459 --> 00:10:51,019
So here's a print for animal with age four.

152
00:10:51,019 --> 00:10:53,019
And here's a print of animal age six.

153
00:10:53,019 --> 00:10:59,059
So if I run these, it should print animal colon none because I didn't set the name to anything for these two.

154
00:10:59,059 --> 00:11:01,980
And then their respective ages, right?

155
00:11:01,980 --> 00:11:06,740
So this is using str method for on A.

156
00:11:06,740 --> 00:11:08,779
And this is using the str method on B.

157
00:11:10,860 --> 00:11:12,060
Okay.

158
00:11:12,060 --> 00:11:16,500
And then we can access of course using dot notation all of our data attributes.

159
00:11:16,500 --> 00:11:19,340
So here I'm accessing the age directly.

160
00:11:19,340 --> 00:11:24,100
But since the getter get age just returns for me the value of that data attribute,

161
00:11:24,100 --> 00:11:25,860
these will actually print the same thing.

162
00:11:25,860 --> 00:11:27,860
So I'm just going to comment these out.

163
00:11:27,860 --> 00:11:33,300
So if I'm accessing age age through either the data attribute directly or through the getter method,

164
00:11:33,300 --> 00:11:35,180
it'll print for for both, right?

165
00:11:35,180 --> 00:11:36,740
Pretty straightforward.

166
00:11:38,940 --> 00:11:40,980
And then we can do some things like this.

167
00:11:40,980 --> 00:11:43,500
So I can call the set name method.

168
00:11:43,500 --> 00:11:46,259
So here I'm passing an actual name for it.

169
00:11:46,259 --> 00:11:52,340
And then I can print the name or I can use the getter to print the name, right?

170
00:11:52,340 --> 00:11:56,340
So if I run that, you'll see the name has now been changed for object A.

171
00:11:57,340 --> 00:12:00,620
And then if I run the print method on A, then right,

172
00:12:00,620 --> 00:12:03,220
it prints animal colon the new name that I just said it to.

173
00:12:03,220 --> 00:12:03,820
Fluffy.

174
00:12:03,820 --> 00:12:05,580
And then the age has been unchanged.

175
00:12:07,060 --> 00:12:12,540
If I run set name without a parameter, it'll revert to the default parameter for the name,

176
00:12:12,540 --> 00:12:14,700
which is the empty string.

177
00:12:14,700 --> 00:12:18,060
So the new name of my animal A will just be an empty string.

178
00:12:18,060 --> 00:12:20,300
So it's just going to be colon with nothing in there, right?

179
00:12:20,300 --> 00:12:23,900
So just empty no space or anything just nothing.

180
00:12:24,899 --> 00:12:25,899
OK.

181
00:12:25,899 --> 00:12:28,899
Everyone all right so far?

182
00:12:28,899 --> 00:12:30,899
Hopefully a little review.

183
00:12:30,899 --> 00:12:37,899
So we saw that we can actually grab the exact same value, right,

184
00:12:37,899 --> 00:12:42,899
for the age using, by accessing the age data attribute directly, right,

185
00:12:42,899 --> 00:12:46,899
using Don notation, or our getter that we wrote.

186
00:12:46,899 --> 00:12:52,899
One of these is better than the other in terms of style and the value of the value

187
00:12:52,899 --> 00:12:59,899
of style and in terms of good coding practices and in terms of writing code that's easy to read,

188
00:12:59,899 --> 00:13:03,899
easy to modify, robust, things like that.

189
00:13:03,899 --> 00:13:09,899
The one that is better to use is the one that accesses the method.

190
00:13:09,899 --> 00:13:18,899
Both are using Don notation, but the first one is actually accessing the internals of my class definition.

191
00:13:18,899 --> 00:13:19,899
Right?

192
00:13:19,899 --> 00:13:25,899
In order to know the value of my data attribute as someone who's just using this code for an animal class,

193
00:13:25,899 --> 00:13:32,899
I have to actually go in and read the init method to know these data attributes that are being initialized.

194
00:13:32,899 --> 00:13:37,899
I don't know about you, but I actually, let's take an example of a list, right, something we've used a lot.

195
00:13:37,899 --> 00:13:43,899
Have you ever gone into the definition of the list class to see the data attributes that are being initialized?

196
00:13:43,899 --> 00:13:45,899
I haven't, right?

197
00:13:45,899 --> 00:13:52,899
What I've been doing is working with methods that allow us to make changes to lists, to do operations on lists and things like that.

198
00:13:52,899 --> 00:13:57,899
So the internal workings of the list class is hidden from us, and that's just the way we like it, right?

199
00:13:57,899 --> 00:14:00,899
I don't care how the list is actually implemented.

200
00:14:00,899 --> 00:14:02,899
And the same thing should happen here, right?

201
00:14:02,899 --> 00:14:05,899
I shouldn't care how I implement the animal class.

202
00:14:05,899 --> 00:14:12,899
I shouldn't care what variables, you know, what instance variables they're being, they're using.

203
00:14:12,899 --> 00:14:14,899
So let me show you why.

204
00:14:14,899 --> 00:14:21,899
So if someone who's writing the animal class decides in the future that age was a strange variable name to use,

205
00:14:21,899 --> 00:14:29,899
and they decide to change that the variable associated with how long this animal has been alive to to be years, right?

206
00:14:29,899 --> 00:14:35,899
So here, I've got, oops, I've got self dot years equals age.

207
00:14:35,899 --> 00:14:40,899
That's the only change I've made to my animal class, right?

208
00:14:40,899 --> 00:14:44,899
So I've made the design decision to change this data attribute to be years.

209
00:14:44,899 --> 00:14:52,899
And then of course, since I'm making this class, I need to make sure all my getters and setters and everything still works with this new data attribute.

210
00:14:52,899 --> 00:14:57,899
So my get age will return self dot years, right?

211
00:14:57,899 --> 00:15:02,899
I'm returning this variable, a data attribute that I've changed to.

212
00:15:02,899 --> 00:15:05,899
Well, this is the full code.

213
00:15:05,899 --> 00:15:08,899
So this is, you can see the changed data attribute here.

214
00:15:08,899 --> 00:15:10,899
I'm using self dot years equals age.

215
00:15:10,899 --> 00:15:15,899
And then my getter is going to return self dot years.

216
00:15:15,899 --> 00:15:19,899
And my setter is going to set self dot years.

217
00:15:19,899 --> 00:15:24,899
Well, if this, this implementation should be hidden, right?

218
00:15:24,899 --> 00:15:30,899
From me, somebody who is just trying to create a bunch of animals in their code.

219
00:15:30,899 --> 00:15:36,899
So this code down here will work if I use my method, right?

220
00:15:36,899 --> 00:15:42,899
Because the method should still work no matter what the data attribute is called, right?

221
00:15:42,899 --> 00:15:45,899
Age or years or time or whatever.

222
00:15:45,899 --> 00:15:50,899
But if I had code that access that data attribute directly, it doesn't work anymore.

223
00:15:50,899 --> 00:15:56,899
It throws in there because surprise that hit attribute no longer exists, right?

224
00:15:56,899 --> 00:15:59,899
So it's much better style.

225
00:15:59,899 --> 00:16:06,899
And you know, you can, more robust to use only getters and setters,

226
00:16:06,899 --> 00:16:10,899
only methods to make changes and to manipulate the objects.

227
00:16:10,899 --> 00:16:16,899
You should never ever really have to use the data attributes, right?

228
00:16:16,899 --> 00:16:20,899
Questions about that.

229
00:16:20,899 --> 00:16:25,899
Okay. Good, because that's something that you'll have to keep in mind on the quiz next Monday.

230
00:16:25,899 --> 00:16:32,899
Okay. Not using data attributes. All right.

231
00:16:32,899 --> 00:16:38,899
So having said that, Python does allow you to do a bunch of questionable stuff.

232
00:16:38,899 --> 00:16:44,899
So first of all, it allows you, as we just saw, to access the data attribute

233
00:16:44,899 --> 00:16:47,899
over a particular instance that you create, right?

234
00:16:47,899 --> 00:16:50,899
So you create an object, and it's a very specific animal, the specific age.

235
00:16:51,899 --> 00:16:57,899
You can just access the, use dot notation to access the value of all of these data attributes.

236
00:16:57,899 --> 00:17:02,899
Fine. We're not, you know, we're not, we'll, we'll mess ourselves up in the future

237
00:17:02,899 --> 00:17:06,900
because, you know, maybe this won't work, but it's not so bad.

238
00:17:06,900 --> 00:17:13,900
However, Python also allows you to change the value of a data attribute outside of the class definition.

239
00:17:13,900 --> 00:17:16,900
All right. So this is code we write, not within the class.

240
00:17:16,900 --> 00:17:19,900
It's code we write as somebody who's using the class.

241
00:17:20,900 --> 00:17:26,900
So what does this mean? Well, now I'm going to set the age data attribute to be whatever I want

242
00:17:26,900 --> 00:17:32,900
outside the class definition, right? I could even set it to a dictionary if I wanted to.

243
00:17:32,900 --> 00:17:35,900
In this particular case, I'm setting it to a string infinite.

244
00:17:35,900 --> 00:17:41,900
But if I do this, then I risk, you know, code on this animal class not working further on

245
00:17:41,900 --> 00:17:44,900
because maybe they assume that the age is always a number.

246
00:17:45,900 --> 00:17:50,900
And so a different method I might run will not work anymore if I happen to set it to the string.

247
00:17:51,900 --> 00:17:58,900
And then one other thing Python actually allows you to do is to add data attributes to instances.

248
00:17:58,900 --> 00:18:05,900
So now the problem with this is that, let's say I create a whole bunch of instances of animals, right?

249
00:18:05,900 --> 00:18:09,900
The animals got age four, the animals got age six, the animals got age five.

250
00:18:10,900 --> 00:18:15,900
And then one of these animals, I decide to add a new data attribute to it, like only one of these instances

251
00:18:15,900 --> 00:18:21,900
now has three data attributes associated with it, a name and age, and now the size.

252
00:18:21,900 --> 00:18:27,900
All the other data, all the other animal instances I've created only have a name and an age associated with them.

253
00:18:27,900 --> 00:18:30,900
Just this one happens to have this extra data attribute.

254
00:18:30,900 --> 00:18:37,900
So now the whole reason why we're creating our own data types, right, was to be consistent, to bundle the specific set of data

255
00:18:38,900 --> 00:18:41,900
and specific set of behaviors together, flies out the window.

256
00:18:41,900 --> 00:18:47,900
Because now I have one instance that now has this extra data attribute associated with it, and nobody else does.

257
00:18:48,900 --> 00:18:54,900
So all that consistency has gone out the window.

258
00:18:54,900 --> 00:18:59,900
So never ever do any of these outside of the class definition.

259
00:18:59,900 --> 00:19:04,900
It's totally okay to access data attributes while you're defining a class, right?

260
00:19:05,900 --> 00:19:10,900
But not okay to do any of these outside of the class definition, even though Python allows you to do them.

261
00:19:11,900 --> 00:19:17,900
Okay, so one of the things I wanted to show you in this lecture is something we haven't really seen so far,

262
00:19:17,900 --> 00:19:20,900
and that's actually just working with objects that we create.

263
00:19:20,900 --> 00:19:30,900
Yes, when we created fractions and coordinates, we just created a whole bunch of objects, and then printed the numerators or printed the object or multiplied them together.

264
00:19:31,900 --> 00:19:36,900
But we never actually wrote nice functions that kind of work with objects of our type.

265
00:19:36,900 --> 00:19:40,900
So one of the things I wanted to show you is how to do that.

266
00:19:40,900 --> 00:19:45,900
So here's a function that creates a dictionary out of a list.

267
00:19:46,900 --> 00:19:51,900
So the input here is going to be a list of whatever I want.

268
00:19:52,900 --> 00:20:03,900
And the function, what I would like it to do, is to pick up from the list only numbers that are non-negative, and just integers.

269
00:20:03,900 --> 00:20:10,900
So in this particular case, I would like my function to pick up the two, the five, and the zero, ignoring everything else.

270
00:20:10,900 --> 00:20:14,900
And I would like to create a dictionary out of these numbers.

271
00:20:14,900 --> 00:20:21,900
And what the dictionary should do is map each one of these numbers, so the two, the five, and the zero.

272
00:20:21,900 --> 00:20:32,900
These would be my keys, and they should be mapped to animal objects with these ages.

273
00:20:32,900 --> 00:20:43,900
So that's an animal with two of age two, and this is an animal with age five, and this should be an animal with age zero.

274
00:20:43,900 --> 00:20:54,900
So my keys, types, are in, and the values associated with the keys, the type should be animal, this object that I just created.

275
00:20:54,900 --> 00:21:01,900
So the code is pretty straightforward. We just have a little loop that goes through each element one at a time in my list.

276
00:21:01,900 --> 00:21:09,900
That's for N and L. And then I'm just going to do something to the elements that are integers, and greater or equal to zero, right?

277
00:21:10,900 --> 00:21:17,900
So that'll extract only the two, the five, and the zero as we go through the loop over the elements in L.

278
00:21:17,900 --> 00:21:22,900
And then the key line here is this one in red.

279
00:21:22,900 --> 00:21:28,900
I'm going to say, this line just adds an entry to my dictionary.

280
00:21:28,900 --> 00:21:35,900
So this is the syntax for putting something in a dictionary. There's no append or plus in a dictionary or anything like that.

281
00:21:35,900 --> 00:21:42,900
It's just straight up indexing the key you want is N, so either a two or five or a zero.

282
00:21:42,900 --> 00:21:50,900
And the value I want to associate with that key is an animal with age whatever this is, two, five or zero.

283
00:21:50,900 --> 00:21:55,900
Right? So exactly what I wrote here. Everyone okay so far.

284
00:21:55,900 --> 00:22:02,900
All right. The loop goes through to the end of the list, and then we've created our dictionary, and we're done.

285
00:22:03,900 --> 00:22:08,900
As we're writing this code, how would we debug it or how would we check to see that it worked?

286
00:22:08,900 --> 00:22:12,900
Well, the instinct is to say, okay, well, let me check to see if this function worked.

287
00:22:12,900 --> 00:22:28,900
So here this line, animals equals animal dict L, will run this function, and it runs it on this L, and at the end it returns a dictionary, right? Something that looks like this.

288
00:22:28,900 --> 00:22:33,900
So our instinct is to just print that return to dictionary.

289
00:22:33,900 --> 00:22:41,900
But if we were to print that, and you can actually run the code in the Python, if you print that, you get something like this.

290
00:22:41,900 --> 00:22:50,900
And that's because Python doesn't dig through elements of dictionaries or even elements of lists to run the print method sort of recursively.

291
00:22:51,900 --> 00:23:02,900
It just runs the print method top level, and the problem is it knows how to print integers just fine, but it doesn't know how to print a dictionary where the values are animal objects.

292
00:23:02,900 --> 00:23:09,900
And so we run into the same problem where now the value associated with key two is this animal object at that memory location.

293
00:23:09,900 --> 00:23:17,900
But how do I know that I didn't screw up sort of my, you know, I created an animal with age five where it should have been two.

294
00:23:18,900 --> 00:23:31,900
So the solution, and you'll probably encounter this on the next quiz, if you're debugging your code, the solution is to just iterate through the dictionary, right?

295
00:23:31,900 --> 00:23:37,900
In such a way that you run that print statement directly on an object of type animal. Python knows how to do that, right?

296
00:23:37,900 --> 00:23:40,900
We told it the STR method, right?

297
00:23:40,900 --> 00:23:50,900
We have an STR method here, so it knows how to run the print directly on an animal object. It just doesn't know how to run the print where the value of a dictionary is an animal object.

298
00:23:50,900 --> 00:23:56,900
So let's replace this print of the dictionary with a little loop.

299
00:23:56,900 --> 00:24:01,900
It goes through this, the dictionary's items, right?

300
00:24:01,900 --> 00:24:06,900
So N is going to be my key and A is going to be the value associated with that key.

301
00:24:06,900 --> 00:24:17,900
And I've just got the print statement here. So I'm using an F string here, that prints key and whatever value that keys with Val, whatever value that is, right?

302
00:24:17,900 --> 00:24:22,900
So now the print statement is being run directly on an object of type animal.

303
00:24:22,900 --> 00:24:33,900
And now the result of this loop will be this, right? So key to with value, and then it uses the print statement on my animal object.

304
00:24:33,900 --> 00:24:39,900
Does that make sense? Everyone okay so far?

305
00:24:39,900 --> 00:24:49,900
Yeah, exactly. It's converting the stuff in the dictionary with strings because my print statement is being run directly on that object of type animal.

306
00:24:49,900 --> 00:24:59,900
And it knows how to do that. I implemented the done dress here. Everyone okay?

307
00:24:59,900 --> 00:25:04,900
Okay, so let's have you try this. Let's have you write a little code.

308
00:25:04,900 --> 00:25:13,900
So this function, it's going to be very similar. We're not making dictionaries, you'll be making a list, but you'll encounter the same problem.

309
00:25:13,900 --> 00:25:20,900
And here is going to be two lists of the same length. One list has numbers, one list has strings.

310
00:25:20,900 --> 00:25:30,900
And what I'd like you to do is create for me a new list, and the new list is going to have animal objects where you match sort of index by index.

311
00:25:30,900 --> 00:25:40,900
So the resulting animal object at index zero will basically create for me a new animal with age two and name blobfish.

312
00:25:40,900 --> 00:25:46,900
The animal object and the resulting list at index one will create a will be with age five and name crazy ant.

313
00:25:46,900 --> 00:25:51,900
And then the animal object at index two will be age one and name pair of fox.

314
00:25:51,900 --> 00:26:02,900
So we're just doing the same thing index by index where you create a new animal object with the age this value, right? One at a time.

315
00:26:02,900 --> 00:26:09,900
And you set the name to be this value one at a time and then return that list.

316
00:26:09,900 --> 00:26:16,900
So that should be mine 79.

317
00:26:16,900 --> 00:26:26,900
Okay. Who has a start for me? Okay. Should we call it L3?

318
00:26:26,900 --> 00:26:33,900
Okay.

319
00:26:33,900 --> 00:26:41,900
Mm-hmm.

320
00:26:41,900 --> 00:26:50,900
Yes, but then if you're doing L2 of n, then this should be the index, right? So how do I make this be the index instead of the element directly?

321
00:26:50,900 --> 00:26:59,900
Yeah. Yeah.

322
00:26:59,900 --> 00:27:04,900
Yeah, exactly, right? So instead of looking at the element directly, let's just look at the range.

323
00:27:04,900 --> 00:27:11,900
So for i in range and then we need to do ln pick one of the lists because they're the same length.

324
00:27:11,900 --> 00:27:18,900
So now i is 0, 1, 2, 3, 4, 5, like all the index values.

325
00:27:18,900 --> 00:27:20,900
Okay.

326
00:27:20,900 --> 00:27:27,900
Well, you can make L3 and i, i, equal to 0.

327
00:27:27,900 --> 00:27:35,900
Um, um, L1, i, and you call that L3 and you decide.

328
00:27:35,900 --> 00:27:45,900
So L1 at index i, um, so I need to create an animal with that age, right? So let's do, let's do this.

329
00:27:45,900 --> 00:27:59,900
Um, uh, age equals L1 at index i, right? Just to save it as a variable and name equals L2 at index i. Right? Does we agree?

330
00:27:59,900 --> 00:28:11,900
So now that I have age and name stored in these variables, how do I make an animal object with, with that age? Yeah.

331
00:28:11,900 --> 00:28:18,900
So you can feel like, um, L3 and i, um, I know you call it animal.

332
00:28:18,900 --> 00:28:25,900
Well, the init method creates for me an animal with that age, right? Right?

333
00:28:25,900 --> 00:28:37,900
So when we just create a new animal object, we just pass in that age. Right? Like the constructor requires the age of the animal. Right?

334
00:28:37,900 --> 00:28:45,900
So when we construct a new animal object, we just invoke the name of our animal. Uh, where is it here? Right?

335
00:28:45,900 --> 00:28:53,900
Or sorry, our animal type, our animal class, and then we pass in the age that we want to create this animal with. Right?

336
00:28:53,900 --> 00:29:04,900
And that, according to the init method, creates self.age, be whatever is passed in, and a name, none.

337
00:29:04,900 --> 00:29:16,900
So we're halfway there. We've created an animal object with the age that we want, but the name, data attribute for this object, is not.

338
00:29:16,900 --> 00:29:20,900
Everyone with me so far.

339
00:29:20,900 --> 00:29:33,900
So how do we, how do we make the name of this animal object be the one that we saved, right? From that L2 list?

340
00:29:33,900 --> 00:29:44,900
Yeah, exactly. We can use a center function. Yeah, set name right here. Right? Don't access the attribute directly, but yeah, we can use a center function.

341
00:29:44,900 --> 00:29:55,900
So, um, so this created for me that new animal, right? But I need to actually save that animal somehow, right? Because I need to reference it later.

342
00:29:55,900 --> 00:30:05,900
So let me do this a equals animal with that age, and then we run the center function on this object a, right? Set name.

343
00:30:05,900 --> 00:30:17,900
It's just a function, and what name do we want to set it at this thing here? So name here is this variable that we extracted from the L2 list.

344
00:30:17,900 --> 00:30:28,900
Everyone okay so far. So, so now what I have is an object a is a variable that's bound to an animal object.

345
00:30:28,900 --> 00:30:38,900
The name, the, the age was set when we first created it, and the name we just set through the center function.

346
00:30:38,900 --> 00:30:49,900
And now we should just put it in my list. My list is originally empty, right? So now let's, instead of, I don't have a bunch of elements to add it to.

347
00:30:49,900 --> 00:31:05,900
So let's just append it to L3 like that. Right? I mean theoretically I could have created an empty list that was, you know, three elements long, and then I could do L3 at I.

348
00:31:05,900 --> 00:31:29,900
But this works too. And then at the end let's return L3. Right? Questions about this? Is this all right?

349
00:31:29,900 --> 00:31:40,900
Okay, so if we run it and we just print the list with these animal objects, we run the same problem as that dictionary one, right? You see I've got a bunch of memory locations here.

350
00:31:40,900 --> 00:31:54,900
So to test that I did it right, instead of printing the list, let's iterate through our list through this little for loop, and just run the print method directly on my object.

351
00:31:54,900 --> 00:32:02,900
Right? So now if I run that it should just run the print statement directly on each of these animals, right? So that's correct.

352
00:32:02,900 --> 00:32:09,900
Yeah. Does that make sense? Yeah.

353
00:32:09,900 --> 00:32:22,900
Oh, so instead of printing the list, this thing, I looped through my list and printed the elements. That's not in the function. Yeah, that's outside.

354
00:32:22,900 --> 00:32:30,900
But this is something pretty common that you'll run into. You make a list or dictionary or some structure or two or something like that with objects of your type.

355
00:32:30,900 --> 00:32:44,900
And when you run the print statement directly on that structure, it doesn't go deeper than top level. And so it prints that uninformative stuff.

356
00:32:44,900 --> 00:32:54,900
Okay, so in this particular, in this example, we saw that it's better to access the attributes through getters and setters.

357
00:32:54,900 --> 00:33:03,900
So in addition to the init, the str method, writing getters and setters to have a consistent way of accessing and modifying these data attributes is really important.

358
00:33:03,900 --> 00:33:11,900
And then you can even impose restriction, something like the types have to be this or maybe the edge can't be a negative number or something like that.

359
00:33:11,900 --> 00:33:16,900
And it allows a lot more consistent use of the object.

360
00:33:16,900 --> 00:33:22,900
So now let's move on to hierarchies. Okay. And this is where we're going to talk about inheritance.

361
00:33:22,900 --> 00:33:28,900
So there's something like maybe 28 objects on this slide. Right?

362
00:33:28,900 --> 00:33:36,900
There's the six we encounter at the beginning of the lecture and 22 up there. So there's 28 separate objects on this slide.

363
00:33:36,900 --> 00:33:51,900
And all of these objects, we could say are of type animal, right? Because by our definition, an animal has the attributes for an animal is how long they've been alive and these are objects that have been alive for some time.

364
00:33:51,900 --> 00:34:02,900
But in addition to having how they attribute for how long they've been alive and unknown name, we can actually then create separate categories, right?

365
00:34:02,900 --> 00:34:13,900
And each one of these boxes that I've created is a different subset of animal. Right? We call it a subclass or a child of an animal class.

366
00:34:13,900 --> 00:34:23,900
And that's because they will bring about different data attributes in addition to what an animal's data attributes are.

367
00:34:23,900 --> 00:34:30,900
And they will bring about different behaviors in addition to the behaviors of our really generic animal object. Right?

368
00:34:30,900 --> 00:34:37,900
So the things that cat can do a rabbit might not be able to do and things a person can do, a cat won't do and a rabbit can do. Right?

369
00:34:37,900 --> 00:34:48,900
So they're all animals, but they all are going to have additional data attributes and additional behaviors that are different in these three categories. Right?

370
00:34:48,900 --> 00:34:58,900
So I might say something like the cat has a name and age and you know a pattern or a color, the rabbit, again I said our wild so maybe they don't get a name, but they'll have a color or pattern.

371
00:34:58,900 --> 00:35:19,900
And then the age of course from the animal people of course have the person object has the age right that comes from animal, but in addition they might have a list of friends or something associated something like that associated with them right and a list of friends something doesn't something cat doesn't have something that a rabbit doesn't have you so you see what I mean.

372
00:35:19,900 --> 00:35:32,900
And we can even go further we can say well if I take my person object I can now subcategorize that as well and say well this is a student class and then this student class I would say a student is a person.

373
00:35:32,900 --> 00:35:40,900
So all the data attributes and all the behaviors that a person has the student also has and of course all the animal stuff because a person is an animal.

374
00:35:41,900 --> 00:35:54,900
So for example let's say right an animal is a generic object it doesn't speak but let's say a person gets the behavior to speak right so they for speaking I might just print hello to the screen or something simple like that.

375
00:35:54,900 --> 00:36:17,900
A student is a person so maybe they they also get something like their age the name and maybe a list of friends associated with them but a student might also have a major or a favorite subject in school associated with them something that a person doesn't have right so that's a new data attribute associated with a student that's not associated with a person.

376
00:36:17,900 --> 00:36:36,900
A student might also have different behaviors like tell me your favorite subject in school things like that or it might override behaviors of a person so if a person speaks you know says hello print hello to the screen we can say hey if I asked the student to speak they might say I have homework instead or something like that right.

377
00:36:36,900 --> 00:37:05,900
So what we're trying to do is take those relationships and implement them in code so here I've got an animal class which is sort of my base class it's going to be my also called parent class or super class and then anything that an animal has all the data attributes and all the behaviors that animal will be inherited by person cat and rabbit so anything so a person is an animal cat is an animal rabbit is an animal so everything they have.

378
00:37:05,900 --> 00:37:23,900
All these three subtypes will have as well but all these subtypes will be different amongst themselves right a person will have an ability to speak maybe print hello to the screen a cat could also have the ability to speak but maybe they'll print me out of the screen a rabbit won't even have the ability speak at all.

379
00:37:23,900 --> 00:37:52,900
A person might have a list of friends right whereas a cat won't a rabbit won't things like that so we can either add more information like list of friends was an example of that we can add more behavior like the ability to speak is an example of that and an example of overriding behavior like I mentioned is let's say we have a subclass student of person if a person's speak method said we know said to say to print hello to the screen we can override that behavior.

380
00:37:53,900 --> 00:38:00,900
Through a speak method inside student where you don't just print hello to the screen you can print I have homework.

381
00:38:00,900 --> 00:38:22,900
So let's try to start implementing this relationship this is just our animal class there's nothing new here I'm just doing a little refresher on what this class looks like so we've got our knit where we initialize an agent name that's none we've got two getters two setters and this STR method that prints animal colon name code.

382
00:38:23,900 --> 00:38:52,900
So let's so yeah okay this animal class inherits from object so the generic Python object and now let's work on the subclass cat so when I create my subclass cat the way I tell Python that this cat is an animal is by putting in the parentheses here the name of the type that I want this class to inherit from so a cat is an animal.

383
00:38:52,900 --> 00:39:20,900
Now one of the things I kept coming back to is any time you create a new data type you have to have an init method this doesn't specifically have an init method right I've just got two other methods here so you might think that it's missing but it's actually not because as soon as you put another data type here in the parentheses so that cat is an animal.

384
00:39:20,900 --> 00:39:32,900
Think of it like Python going into the animal class copying and pasting everything that's part of the animal class or copying everything that's part of that animal class and pasting it inside cat.

385
00:39:32,900 --> 00:39:42,900
So since I don't have an init method in specifically defined in cat Python will say oh we'll just use the init method of your parent animal.

386
00:39:42,900 --> 00:39:52,900
So the way we create a cat is going to be exactly the same way we create an animal except that the name is going to be cat as my object type instead of animal.

387
00:39:52,900 --> 00:39:57,900
Okay but we just pass it in one thing which is the age of this cat.

388
00:39:57,900 --> 00:40:02,900
So since we're copying and pasting everything and yeah question.

389
00:40:02,900 --> 00:40:07,900
So the parent class of animal is the object.

390
00:40:07,900 --> 00:40:20,900
Yes exactly so the parent class of animal is object so cat will also be a Python object but that's super generic stuff like binding a variable name to this object things like that.

391
00:40:20,900 --> 00:40:38,900
Not only does the init get copied in but every single data attribute age and name every single way that that data attribute gets created so the self dot age is going to be a data attribute of cat and it's going to be set to whatever's past in as a parameter self dot name will be initialized to none just like for animal.

392
00:40:38,900 --> 00:40:49,900
I've got my two getters my two setters that also work with cats and then the str method of animal will also be inherited in here.

393
00:40:49,900 --> 00:40:59,900
Now we notice one thing and that's we have an str method defined in the animal class but then in my cat class I define an str method as well.

394
00:40:59,900 --> 00:41:15,900
So that's called overriding your parents's class and when we create an object of type cat if this object has a method that has the same name as their parent we use this method.

395
00:41:15,900 --> 00:41:27,900
There's no reason to go up to your parent to ask for their method we use the one that is for this object and cat in addition to having everything that animal has.

396
00:41:27,900 --> 00:41:35,900
Implement a new behavior which is the ability to speak and all it does is print me out of the screen.

397
00:41:35,900 --> 00:41:38,900
So let's look at some code.

398
00:41:38,900 --> 00:41:47,900
So here's my cat so I create a new cat object the same way I would create an animal but you know I'm invoking the name of this class cat.

399
00:41:47,900 --> 00:41:55,900
The way I create an animal is just by passing in the age of this thing right so here I'm creating a cat who's ages five.

400
00:41:55,900 --> 00:42:02,900
The name of this cat is none right because that's what the init method of animal does.

401
00:42:02,900 --> 00:42:12,900
But I can run the methods on animal on my cat object because a cat is an animal so all the methods that work with animals will work with an object of type cat.

402
00:42:12,900 --> 00:42:22,900
So here I can just run the set name method on my cat object even though the method is not explicitly defined in here it's defined in my parent.

403
00:42:22,900 --> 00:42:31,900
So if I set the name to fluffy and then I print the cat object it's going to print it's a cat colon the name colon the age.

404
00:42:31,900 --> 00:42:35,900
Speak is just going to print me out of the screen.

405
00:42:35,900 --> 00:42:42,900
We can do the getter methods as well right so all of these methods are implemented with animal work with cats as well.

406
00:42:42,900 --> 00:42:55,900
Now a here object a was created up here when we talked about animals right it's an animal object because it was created using the animal.

407
00:42:55,900 --> 00:43:15,900
So if I actually run this it'll give me an error right it's just says there's no attribute speak which makes sense I never define that I define that in your child not the parent.

408
00:43:15,900 --> 00:43:23,900
Questions about cats.

409
00:43:23,900 --> 00:43:48,900
So I want to briefly touch upon overriding methods because it can get a little bit confusing so you notice the STR method right was implemented in both of these objects the STR method is in cat which overrides the animals method to print cat colon name colon age and the animal method STR method prints animal colon name colon age.

410
00:43:48,900 --> 00:44:16,900
So the rule is when you when you're running a method that you know existed a whole bunch of these inherited objects you look at which what is it it's the STR right so it would be the print method right or any method it doesn't matter what it is you look at the object you're calling the method on right so if it's a dot notation you look at the thing before the dot if it's you know one of these special methods what's the object you're running this method on.

411
00:44:16,900 --> 00:44:29,900
So here i've got the print method on object C Python asks what is your type oh you're a cat do you have an STR method defined yes you do so then it uses the one that it finds right away.

412
00:44:30,900 --> 00:44:39,900
But if for some reason the the current object doesn't have that method so an example of that is set name right.

413
00:44:39,900 --> 00:44:58,900
Set name is not a method defined in cat right see as an objective type cat it doesn't have that method Python says oh you don't have that method let me look at your parents does your parent have that method and then it you know looks through in here it finds it good if it finds it it uses that one if it doesn't find it it looks at your parents parent.

414
00:44:58,900 --> 00:45:03,900
If your parents parent has it it uses that one and if it doesn't it looks at your parents parent.

415
00:45:03,900 --> 00:45:26,900
Until it gets to the generic Python object this one right here if they have it it uses that one and if it doesn't then it throws an error so an example of something that the generic Python object has is the STR method right it just prints the memory location and that's why when we don't implement our STR method in our class Python defaults to the generic Python object.

416
00:45:28,900 --> 00:45:35,900
Questions.

417
00:45:35,900 --> 00:45:41,900
Okay let's look at a person.

418
00:45:41,900 --> 00:46:03,900
So let's create a person object this person object again will inherit from animal because an animal is the only things we we said an animal is defined as is being alive for some period of time and it has no name right the name is none so we don't even pass that in.

419
00:46:03,900 --> 00:46:28,900
So let's say the parent class of person is animal but this is my design choice also to highlight a bunch of stuff but let's say that this parent this this person class when I create a new person object I would like to pass in an age and a name right so I don't just want to create a person with an age I want to actually create it using a name in that parameter list.

420
00:46:28,900 --> 00:46:40,900
So as an example in my code here when I create a person I would like to pass in their name comma any age to parameters to make a person.

421
00:46:40,900 --> 00:46:57,900
Well I can't use the animals in that method right I could for cat because cat was happy to just be created using an age but I can't do that for a person because I would like to create a person by passing in two parameters in the creation of the person.

422
00:46:57,900 --> 00:47:18,900
So what I have to do is effectively override the init method of animal by implementing it in my class definition right so here I have to define my own init method and I do it because now I'm not just passing in an age I want to pass in a name and an age in the parameter list.

423
00:47:18,900 --> 00:47:47,900
And then beyond that what do I do inside the init method well I know that this person is an animal so what I'm going to do to make my life simpler is to call animals init method so here we use this donotation on the name of the class sort of similar to how I showed you that sort of long way of calling methods well here's the name of the class dot the name of the method init and now I pass in all the parameters self an age.

424
00:47:48,900 --> 00:48:05,900
So I'm going to call animals init method which will create that self dot age set it to age and create that self dot name and set it to none so I'm taking advantage of the fact that that init method already does those two lines for me right so I've turned those two lines into a one line here.

425
00:48:06,900 --> 00:48:21,900
And then I'm going to say well I'd like to set the name of my person so I'm going to call the method set name with the parameter that's passed in and then I'm also going to initialize another data attribute for a person which is a list of friends initially empty.

426
00:48:22,900 --> 00:48:32,900
So it's nice about this and when we implement the student class it'll it'll look even nicer what's nice about this is we're taking advantage of the fact that the init method of animal already does some work for us.

427
00:48:32,900 --> 00:48:59,900
But at the same time we can clearly see in this subclass what what the person object brings in addition to the animal object right so in addition to just being an animal we give a name and get a list of friends right so it's very nice to see the extra data attributes or what what you need to change with respect to the animal to make a person.

428
00:49:00,900 --> 00:49:22,900
And then beyond that so I think that's what I said sorry I didn't go through that as I said it and then beyond that I've got some you know we can add some getters and setters I just did a select few but you should add them for all of them so the get friends just returns a copy of my list because maybe I want to keep my original order or something like that it's just good style to return a copy of a list.

429
00:49:23,900 --> 00:49:47,900
The ability to add a friend to my list basically just adds a friend name as a string if it's not already in the list so I can't have you know to Anna's in my list consider the same ability to speak just prints hello to the screen and then I added this cute little function to tell me the age difference between this object that I'm calling age difference on and some other person.

430
00:49:48,900 --> 00:49:54,900
And all it does is grab the two ages take the absolute value of the difference and print that to the screen.

431
00:49:55,900 --> 00:50:08,900
And then lastly we're going to override the str method of animal to instead of saying animal colon name colon age to say person colon name colon age so this way it helps me figure out the type as well.

432
00:50:09,900 --> 00:50:36,900
So in my code here I've got two people right P1 P2 here's Jack age 30 he'll still age 25 if I run the get name get age on both of these right this will run animals get age get name I've not defined these in here which is fine we inherit from animal and animal knows how to grab the age and name so there they are.

433
00:50:36,900 --> 00:51:02,900
If I ask if I print P1 in print person colon name age if I ask P1 to speak it just prints hello if I ask the age difference between P1 P2 no matter what just takes the absolute value prints five your difference and then let's add some friends to P1 so here I've got two bobs but it's just a list keeping unique names.

434
00:51:07,900 --> 00:51:11,900
Okay so let's have you try this for a little bit.

435
00:51:13,900 --> 00:51:27,900
It's a little bit again working with objects of this type so it's a function that takes an addictionary so I'll tell you what the dictionary looks like it maps a person object to a cat object.

436
00:51:28,900 --> 00:51:37,900
So that's my dictionary so this is the key this is the value so I've got all these person objects right being mapped to cat objects.

437
00:51:39,900 --> 00:51:56,900
So as an example here's an input dictionary P1 is this person here and P2 is this person here right so my two keys P1 P2 are person objects right they're not integers float strings they're person objects.

438
00:51:57,900 --> 00:52:14,900
And then the values associated with those are cat object so here's an object of type cat with this name I just ran set name on that cat after I created it same here here's the name set to this new cat object so I've mapped P1 to C1 P2 to C2.

439
00:52:15,900 --> 00:52:32,900
So if I run this function what I'd like to do not return anything this function it just print something on each line as you're going through all the items in the dictionary it just prints the name of that key colon the value of the name of the value.

440
00:52:33,900 --> 00:52:38,900
So all I'd like to do is write code that extracts the name from my person object and from the cat object.

441
00:52:44,900 --> 00:52:52,900
I know what you're thinking I look really young for 86 but it's diet exercise and hanging out with you guys.

442
00:52:54,900 --> 00:53:01,900
I had candy for sure so here let's let's write this code on 178.

443
00:53:03,900 --> 00:53:06,900
All right does anyone have a start?

444
00:53:06,900 --> 00:53:11,900
Yeah.

445
00:53:15,900 --> 00:53:16,900
D.items.

446
00:53:17,900 --> 00:53:21,900
Yep. Let's write a note for ourselves K is person.

447
00:53:22,900 --> 00:53:24,900
Be is cat.

448
00:53:24,900 --> 00:53:25,900
Yep.

449
00:53:32,900 --> 00:53:36,900
Yep so K dot get name you want to save it as a variable?

450
00:53:39,900 --> 00:53:40,900
Oh or no.

451
00:53:41,900 --> 00:53:43,900
Oh you want to put it on the one line that's fine.

452
00:53:44,900 --> 00:53:48,900
Yep. Print K dot get name.

453
00:53:48,900 --> 00:53:51,900
Yep.

454
00:53:53,900 --> 00:53:55,900
V dot get name exactly.

455
00:53:55,900 --> 00:53:56,900
Yep perfect.

456
00:53:58,900 --> 00:54:00,900
And yeah nothing to return.

457
00:54:01,900 --> 00:54:03,900
So let's run that.

458
00:54:07,900 --> 00:54:10,900
Does anyone have questions about that?

459
00:54:10,900 --> 00:54:11,900
Yeah.

460
00:54:11,900 --> 00:54:12,900
Okay.

461
00:54:12,900 --> 00:54:23,900
All right so we're just manipulating these object types and again if it's confusing I highly recommend quiz situations and things like that.

462
00:54:23,900 --> 00:54:27,900
Now that we're working with object types just make little notes.

463
00:54:27,900 --> 00:54:28,900
Right.

464
00:54:28,900 --> 00:54:39,900
I know we're iterating through a dictionary and it's kind of convention right keys her integers things like that but this particular case just a little note that K is a person will help you remember that you need to run a method on this K.

465
00:54:40,900 --> 00:54:45,900
Variable right like we did here K dog get name and then V dot get name.

466
00:54:53,900 --> 00:54:54,900
Okay.

467
00:54:54,900 --> 00:54:55,900
Oh yeah.

468
00:55:06,900 --> 00:55:08,900
How do you ensure that the keys are person?

469
00:55:09,900 --> 00:55:13,900
Just be you can't ensure it in this particular case.

470
00:55:13,900 --> 00:55:27,900
I mean you could say if type of K equal equal person capital P person then do the code and else probably just skip it or raise a value or something like you could enforce it that way.

471
00:55:27,900 --> 00:55:34,900
But in this particular case we're just assuming that the tester will make person objects mapped to cat objects.

472
00:55:34,900 --> 00:55:35,900
Yeah.

473
00:55:36,900 --> 00:55:44,900
But yeah certainly if you're making like a software for something more complex you should probably make sure that enforce that.

474
00:55:44,900 --> 00:55:58,900
Okay so the big idea with inheritance is that now that we have subclasses also known as child classes those subclasses use appearances attributes so everything that a parent has and can do a child has and can do as well.

475
00:55:58,900 --> 00:56:08,900
But that child can override certain parents's behaviors and the child can add new behaviors or new attributes in addition to the parent.

476
00:56:08,900 --> 00:56:25,900
Let's look at one more subclass student before we go on to one last thing so student here from our pictures and diagrams inherits from person not from animal but indirectly from animal right so a student is a person.

477
00:56:25,900 --> 00:56:40,900
And when I create a person I would love to create using a name on age and a major but we can use a default parameter for that major to be none if we don't actually want to pass it in but I would like to create it using by setting its major their major as well.

478
00:56:41,900 --> 00:56:56,900
So now I can't use the parents in it method because I got three parameters I would like to initiate my student with so I would like to create my own in it method inside person so here I am defining my own in it method.

479
00:56:56,900 --> 00:57:25,900
And now it becomes apparent why it's nice to call the in it method of your parent because if I say a student is a person all I need to do to initialize a person type like all the attributes associated with a person and the in it method of the person so just call the in it method the person that will create my name my age set my name create my list of friends all that stuff so those five lines get compacted into this one line.

480
00:57:25,900 --> 00:57:38,900
And then it also becomes really easy to see what the student has in addition to the person well it just has a major data attribute self-domager is set to whatever is past it.

481
00:57:39,900 --> 00:57:52,900
And then beyond this it's just you know methods here and there to do stuff so here I've got a change major method it just sets the major something I should probably add a getter in there as well but I ran out of room.

482
00:57:52,900 --> 00:58:07,900
And here's a speak method that gets over ridden from the method of person so the speak method for student I made it slightly more complex than what the parent has so here I'm using this random library.

483
00:58:08,900 --> 00:58:18,900
So it's not a random library I found like arbitrary library it's a library called random and it has a bunch of functions that allow you to deal with random numbers.

484
00:58:18,900 --> 00:58:26,900
So one of the functions that this random library has gives you a number between 0 and 1 at random so a float at random.

485
00:58:27,900 --> 00:58:34,900
So what I'm doing in the speak method for student is randomly printing one of four strings.

486
00:58:34,900 --> 00:58:40,900
Right according to where that random number that's gotten lies between 0 and 1.

487
00:58:40,900 --> 00:58:55,900
And then whoops not yet and then here I've got I'm overriding my SDR method so we can see in the student class here here I've created two students so this one actually has a major this one's

488
00:58:55,900 --> 00:59:13,900
major is going to be said to none just the default value and then if I run this code you can see every time I run it the student one says something different student two says something different so it's just you know running this random number and then choosing what to print.

489
00:59:13,900 --> 00:59:20,900
Maybe more often than not I should buy it to toward something.

490
00:59:21,900 --> 00:59:49,900
So one more class I'd like to talk about rabbit that's the one that we actually haven't talked about from those subcategories and as we talk about this rabbit class I'd like to introduce one more idea of a variable so far we've had just plain variables right that go away as soon as like a environment disappears we've talked about instance variables aka data attributes right which are consistent for objects that you create of a certain type but have different values for different instances.

491
00:59:49,900 --> 01:00:18,900
The last kind of variable I like to talk about is a class variable what's cool about a class variable is that it's think of it like a shared resource so it's a variable that any instance of this particular type can access and modify and if it's modified all the other instances will see this modified value right so it's just shared across all the instances of type rabbit.

492
01:00:18,900 --> 01:00:40,900
So there's many different ways to use class variables for object oriented programming they're pretty useful the way I'm going to use it here is to give me the ability to basically count how many instances of of this type rabbit I've created in my program.

493
01:00:40,900 --> 01:00:51,900
I can remember I can create a whole bunch of instances I'm going to try to use this class variable as a way for me to basically keep a counter of how many of these instances I've created.

494
01:00:51,900 --> 01:01:05,900
Alright so let's look at the code so the first thing I'm going to do is just inherit from animal gets a name and an age and that's about it all those getters and setters and the SDR method.

495
01:01:05,900 --> 01:01:27,900
Now to create my class variable notice I'm defining this variable just plain variable outside of any methods within the class definition right so here's tag is equal to one the very first variable the very first instance of a rabbit I create will grab the value of whatever it says here.

496
01:01:27,900 --> 01:01:36,900
So again if any instance changes this value other instances will see that changed value.

497
01:01:36,900 --> 01:01:47,900
So what we're going to do is we're going to implement ID numbers for these rabbits right so sort of like you know tagging them to keep track of how many there are.

498
01:01:47,900 --> 01:02:00,900
In the init method of animal or of rabbit I'm going to create a new rabbit using an age and two parents so again different than animals I'm going to have to implement my own init method.

499
01:02:00,900 --> 01:02:04,900
But I'll call animals init method because it does some work for me.

500
01:02:04,900 --> 01:02:10,900
Then I'm going to add two data attributes for the two parents to be whatever is passed in.

501
01:02:10,900 --> 01:02:16,900
And then down here is where I'm going to use this class variable the shared resource these two lines.

502
01:02:16,900 --> 01:02:29,900
So the first thing I'm going to do is add one last data attribute for my rabbit which is the RID value so it's the rabbit ID and this is going to be a unique value for every rabbit I create.

503
01:02:29,900 --> 01:02:35,900
First rabbit will have a value of one that I create in my program second rabbit I create will have a value of two and so on.

504
01:02:35,900 --> 01:02:47,900
So what am I setting it to well I'm going to set it to whatever the tag is so the very first rabbit I create their RID will be one that's what the tag is initially set to.

505
01:02:47,900 --> 01:03:04,900
But then before I finish the init method there's one other line of code rabbit dot tag plus equals one so this instance right before it finishes creating itself is going to take that tag and incremented by one.

506
01:03:04,900 --> 01:03:13,900
So the next rabbit I create it's going to grab the tag value that was just changed.

507
01:03:13,900 --> 01:03:19,900
Okay let's visualize it so we're going to do with actual rabbits.

508
01:03:19,900 --> 01:03:26,900
Okay so first I'm going to so there's going to be three lines of code and this is the program I'm going to run.

509
01:03:26,900 --> 01:03:39,900
So the first thing I'm going to do is create my first rabbit right it's our it's RID will be whatever the value of tag is originally right so originally we said the tag is one.

510
01:03:39,900 --> 01:03:54,900
So behind the scenes what's going to happen is Python says oh you're the first instance of rabbit class so the tag was initialized to one so your RID is going to be whatever the value is one.

511
01:03:54,900 --> 01:04:09,900
Okay so I've got this rabbit it's ages eight two parents are none and RID is one but then before I finish creating this rabbit the last line of the init method says take the tag and incremented by one.

512
01:04:09,900 --> 01:04:20,900
Alright next line in the code says here let me create another rabbit this one I'm going to pass an age six as my parameter so that's the age six two parents are none by default.

513
01:04:20,900 --> 01:04:27,900
So Python says all right well here's a new rabbit object it's ages six the two parents are none.

514
01:04:27,900 --> 01:04:34,900
Line that says self dot RID so the RID of R2 will be whatever tag is right now.

515
01:04:34,900 --> 01:04:43,900
Well the previous rabbit incremented it to two so the RID of this next rabbit is two right.

516
01:04:43,900 --> 01:04:51,900
Okay the last line of code before this rabbit finishes it creating itself is to increment the tag to three.

517
01:04:51,900 --> 01:05:01,900
So now if I have one more line of code I'm creating one more rabbit this ages 10 right so behind the scenes Python creates this variable named R3.

518
01:05:01,900 --> 01:05:13,900
It's bound to an object a rabbit object whose ages 10 two parents are none of course because we didn't pass in any parents and the RID is whatever the tag is right now three.

519
01:05:13,900 --> 01:05:23,900
Okay well here's the one with idea three and before we finish creating let's just increment the tag so that we set it up for the next rabbit.

520
01:05:23,900 --> 01:05:32,900
Everyone okay so yeah.

521
01:05:32,900 --> 01:05:49,900
Yes yes it gives you two because when you run this line rabbit eight it has to run the init to completion and the last line of the init always increments it to be one more than what it started with.

522
01:05:49,900 --> 01:05:58,900
Like you can't I guess pause the function run in the middle to check yeah.

523
01:05:58,900 --> 01:06:10,900
Okay so let's look at a couple other methods that we can implement for sorry other questions about that very cool way of creating rabbits.

524
01:06:10,900 --> 01:06:17,900
Yeah.

525
01:06:17,900 --> 01:06:18,900
Yep.

526
01:06:18,900 --> 01:06:29,900
Yes let's go back here.

527
01:06:29,900 --> 01:06:58,900
Mostly just this yeah mostly you want the object to have things associated with it so you know really shared stuff is nice but it's a lot tenuous in using it just because like you should use it for pretty specific situations right you don't just want to define a whole bunch of variables that everybody can access here and there only specific situations yeah most of the time you just have methods in the definition yeah.

528
01:06:58,900 --> 01:07:04,900
Maybe there's other stuff I just don't know about it right now yeah.

529
01:07:04,900 --> 01:07:22,900
Okay let's look at a couple more methods for the rabbit so here I've got a getter just three getters I should probably put so I don't want to put a setter for the RID because that would mess up my my counting and probably I don't want setters for parents to but maybe we might I don't know.

530
01:07:22,900 --> 01:07:51,900
The only thing that looks a little bit weird for the get RID is this Z fill and I added that as a cute little thing to basically make the ID look like an ID number so it pre fills the front with zeros like it pads the front with zeros so for the ID of one you can see it's 0 0 0 0 1 for an ID of 123 it would be 0 0 1 2 3 right so just like it just makes it look nice when we print it out when we print out the ID and otherwise the two parents just return the parent objects.

531
01:07:51,900 --> 01:08:12,900
One interesting method that I would like to add and we'll play on the fact that rabbits mate here is to add two rabbits together so we're implementing the dunder method double and score add double underscore to have the ability to add two rabbits together in our code.

532
01:08:12,900 --> 01:08:41,899
So again this is a design decision I made so when I create when I add two rabbits together I'm going to create a new rabbit object and that's exactly what the code is doing inside here right so I'm going to run this add a dunder method on self and other right and then behind or in front of the scenes I guess is going to be this plus operator so the self will be the thing before the plus and the other will be the thing after the plus.

533
01:08:42,899 --> 01:09:05,899
Just like what we saw last lecture so when we add our one plus our two what I would like the result to be is another rabbit object who who has one parent are one and the other parent are two right those are the things we added together and let's say this new rabbit object is age of zero right it's a new board.

534
01:09:05,899 --> 01:09:15,899
So to implement that we just have a we're returning a new rabbit object here right so we're just creating a new rabbit object on the fly in this method.

535
01:09:15,899 --> 01:09:22,899
How do we create a rabbit object we need to give it an an age and the two parents.

536
01:09:22,899 --> 01:09:34,899
Originally when we created those three are one are two are three's right there they didn't have parents right they were just unknown or something like that but in this particular case we do want know what their parents are.

537
01:09:34,899 --> 01:09:49,899
Their parents are the thing before the plus and the thing after the plus so one parent will be self and the other parent will be other the thing that's in the perimeter list.

538
01:09:49,899 --> 01:10:00,899
So let's continue on with our program here right we had these three lines of code that were run and I created these three rabbits with these IDs or yeah one two three.

539
01:10:00,899 --> 01:10:14,899
If I add two rabbits together are one plus our two to give me a rabbit object variable are four Python says all right well let me run this dunder method behind the scenes of the plus.

540
01:10:14,899 --> 01:10:28,899
So our four effectively becomes what well we replace right the in the previous slide right here the return is rabbit zero one parent comma the other parent.

541
01:10:28,899 --> 01:10:39,899
So when we make this addition we have rabbit zero comma one parent the thing before the dot comma the other parent or the thing before the plus and then the thing after the plus.

542
01:10:39,899 --> 01:10:48,899
So my are four becomes the result of adding our one plus our two right so its parents are these two.

543
01:10:48,899 --> 01:11:09,899
Now how does this rabbit get created right it's a new rabbit object so we run the init method of the rabbit object right which means that here's a variable it's bound to a rabbit object it's ages zero it has these two parents that are objects bound to other rabbit objects up here or one and our two.

544
01:11:09,899 --> 01:11:20,899
And the ID just like before is whatever the tag is right now well we already created three rabbit objects ahead of this one so this one's tag will be four.

545
01:11:20,899 --> 01:11:25,899
And then right before we finish we increment the tag to five.

546
01:11:25,899 --> 01:11:53,899
So no matter how we're creating these random these rabbit objects either just plain old in our program directly or through an indirect method right in this case the plus we're still creating rabbit objects in our program right so that counter that shared variable tag is still coming into play right so we're still counting all of these rabbit objects created.

547
01:11:53,899 --> 01:12:02,899
Does that make sense? Okay so yeah that's fine.

548
01:12:02,899 --> 01:12:17,899
So one last method so this is a method that checks for equality between two rabbits and again my design choice is to say that two rabbits are equal so if I say our one equal are two that will tell me true or false.

549
01:12:17,899 --> 01:12:44,899
And my design choice is to say that two rabbits are equal if they have the same parents so if I create another rabbit object right four was our one plus our two but if five is our two plus our one I want to say that five and four equal because they have the same parents right I don't care that it was our one plus our two or two plus our one they have the same parents it's just an opposite order.

550
01:12:44,899 --> 01:13:13,899
And so that's what this EQ method is is doing is a dunder method to implement equality between two rabbits so parents same is a Boolean here that just checks the RID so this Boolean parents same is going to check that the addition was made our one plus our two our one plus our two right and parents opposite is also going to be a Boolean either true or false that checks if I made the rabbits our one plus our two and then our two plus our one so backwards.

551
01:13:13,899 --> 01:13:42,899
So backward in the parents but they still have the same parents and the reason I'm checking for IDs is because IDs are unique so originally when I wrote this code a long time ago I actually ended up my first iteration checking just the straight up parents values right so it was comparing basically rabbit objects together but the problem with that code is that I don't know if I can do that.

552
01:13:42,899 --> 01:14:07,899
So the first code is that at some point it tried to compare a none some you know some some rabbits might have a none as their parent with an actual rabbit object and then the code crashed and then I realized I can just compare the ID values directly because those are one just numbers so very easy to compare and to their unique so I know I'm not going to have two rabbits with the same ID.

553
01:14:07,899 --> 01:14:22,899
So in this particular case I've got these two rabbits should say they're equal but then if I add you know our two plus our three you know our six this one is not going to be equal to any of my other rabbits.

554
01:14:22,899 --> 01:14:29,899
So here's my code.

555
01:14:29,899 --> 01:14:47,899
So here I've got my three rabbits right so this is just I think we've printed this out already but right so here's our ones a rabbit with this ID rabbit with this ID rabbit with this ID and then you know our ones parents our two parents and our three parents all have none are our none.

556
01:14:47,899 --> 01:15:15,899
But then when I add our four as our one plus our two I can print our four right is a rabbit with idea for and then our one and our two are as usual what we just saw and then when we grab the parents of our four it's going to be our one which is this rabbit with this ID and our two with this rabbit with this ID.

557
01:15:15,899 --> 01:15:33,899
And then we can check the equality so here I can create our four our five and our six so our three plus our four and our four plus our three they should be equivalent right so here I've got our five and our six down here.

558
01:15:34,899 --> 01:15:59,899
See I'm just running the double equal sign on objects of type rabbit just pretty cool and they're the same right because they have the same two parents I don't care that they're in opposite order but then our four and our six have different parents right our four had one and two and our six had what is it three and four.

559
01:15:59,899 --> 01:16:05,899
So I'm going to show you the other questions about this code.

560
01:16:05,899 --> 01:16:21,899
Okay so class variables pretty cool you share them across all the instances so one instance modifies it they'll be modified for all the other instances so we have one more example to look at next lecture we're actually going to implement our own fitness tracker class.

561
01:16:21,899 --> 01:16:40,899
So it's a little bit more complex but we're going to see a lot of the same ideas that we saw today just in this slightly more complex setting of implementing our own fitness tracker so it's still kind of an abstract thing but more useful than animals and rabbits and person and student classes.

562
01:16:51,899 --> 01:16:54,899
You

