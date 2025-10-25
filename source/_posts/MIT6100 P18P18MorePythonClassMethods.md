---
title: MIT6100 P18P18MorePythonClassMethods
---

1
00:00:00,000 --> 00:00:10,000
All right.

2
00:00:10,000 --> 00:00:15,000
Let's begin today's lecture.

3
00:00:15,000 --> 00:00:21,000
So last class, we began our adventure with creating our own data types.

4
00:00:21,000 --> 00:00:29,000
Today we're going to start off with a little bit of a recap just to remind you some of the details about creating our own data types.

5
00:00:29,000 --> 00:00:33,000
And then we're going to build upon that coordinate class.

6
00:00:33,000 --> 00:00:35,000
We started in a last class.

7
00:00:35,000 --> 00:00:41,000
We'll build a circle class and then we'll build some fraction data types.

8
00:00:41,000 --> 00:00:50,000
All right. So the first thing I'd like to mention is to remind you guys about sort of writing code from these two different perspectives.

9
00:00:50,000 --> 00:01:00,000
So just like when we wrote functions, we were kind of writing the definition of the function, telling Python we have this function that we're defining abstractly.

10
00:01:00,000 --> 00:01:01,000
And this is what it does.

11
00:01:01,000 --> 00:01:05,000
And then we were calling the function later on in a program many, many times.

12
00:01:05,000 --> 00:01:11,000
Well, the same idea exists now that we're creating our own data types.

13
00:01:11,000 --> 00:01:15,000
We have to write code from the point of view of somebody who's implementing the class.

14
00:01:15,000 --> 00:01:30,000
So deciding all of these details that goes into creating the class itself versus somebody who's just using a class that's already been written where we create instances, a bunch of different objects that just happened to be this data type.

15
00:01:30,000 --> 00:01:34,000
So when we implement the class, what were some of the things we did?

16
00:01:34,000 --> 00:01:38,000
Well, we're telling Python that this object now exists.

17
00:01:38,000 --> 00:01:42,000
We're telling Python the name of the data type that we're creating, something we choose.

18
00:01:42,000 --> 00:01:48,000
We're deciding, we're making these design decisions where we decide what attributes make up our class.

19
00:01:48,000 --> 00:01:57,000
So the attributes are either data, like the properties, what are the variables that make up your object, and the behaviors through methods.

20
00:01:57,000 --> 00:01:59,000
So that's implementing the class.

21
00:01:59,000 --> 00:02:06,000
And then when we're using the class, we're now saying, all right, let's assume that this class definition exists.

22
00:02:06,000 --> 00:02:10,000
So there's this object that has these behaviors and these data attributes.

23
00:02:10,000 --> 00:02:15,000
Let's now create a whole bunch of objects that are of this type.

24
00:02:15,000 --> 00:02:22,000
And this is when we're creating these instances and then manipulating all of these instances by running methods on them, things like that.

25
00:02:22,000 --> 00:02:34,000
So when we're implementing the class, right, this thing on the left hand side, we're basically telling Python in abstract terms, what are the common properties and behaviors of our data type.

26
00:02:34,000 --> 00:02:47,000
And then when we're using the class, the thing on the right hand side here, we're creating actual objects with very specific values for their data attributes that we can manipulate in different ways.

27
00:02:47,000 --> 00:02:52,000
So let's remember this coordinate class that we wrote last lecture.

28
00:02:52,000 --> 00:02:56,000
This is not new, but I will just go over it real quick.

29
00:02:56,000 --> 00:03:00,000
First line here tells Python we're creating a new data type.

30
00:03:00,000 --> 00:03:05,000
Its name is coordinate, and this keyword class tells Python we're creating the data type.

31
00:03:05,000 --> 00:03:11,000
The parentheses here is object, which stands for the Python object data type.

32
00:03:11,000 --> 00:03:13,000
So it's something really generic.

33
00:03:13,000 --> 00:03:18,000
And this in the parentheses here is the parent of our class.

34
00:03:18,000 --> 00:03:24,000
So anything that a regular Python object can do, the very basic things our class can do as well.

35
00:03:24,000 --> 00:03:34,000
Last lecture I mentioned, an example of such a basic thing is to take a variable name and assign it to an object type that we create.

36
00:03:34,000 --> 00:03:40,000
The very first method that we should write for a new data type that we create is the init method.

37
00:03:40,000 --> 00:03:50,000
And this I called a dunder method because it starts with double underscores before the init and ends with double underscores after the init.

38
00:03:50,000 --> 00:03:55,000
And that's the actual name of this method, double underscore init, double underscore.

39
00:03:55,000 --> 00:03:58,000
So this method is like a constructor for the class.

40
00:03:58,000 --> 00:04:02,000
It tells Python how do you create an actual object of this type?

41
00:04:02,000 --> 00:04:05,000
So it's a function.

42
00:04:05,000 --> 00:04:09,000
It's just a function that works only with objects of type coordinate.

43
00:04:09,000 --> 00:04:12,000
So as a function it takes parameters.

44
00:04:12,000 --> 00:04:18,000
You can see it takes three parameters here, the self, the x and the y.

45
00:04:18,000 --> 00:04:25,000
Now when we're actually creating objects of type coordinate, we only pass in parameters for everything other than self.

46
00:04:25,000 --> 00:04:34,000
Because self is a variable name that we use to describe having an instance of the class without actually creating one yet.

47
00:04:34,000 --> 00:04:42,000
Because remember what we're doing here in this definition, we're telling Python that this object type now exists, we're writing it as we speak.

48
00:04:42,000 --> 00:04:47,000
But we don't have an actual instance to manipulate yet, right? This is just the definition.

49
00:04:47,000 --> 00:04:59,000
And so the self tells Python that when we're writing this code, we're going to use the self variable name as sort of a formal name to be able to run this method on.

50
00:04:59,000 --> 00:05:04,000
So we're going to see in the next slide exactly what maps to self when we run it.

51
00:05:04,000 --> 00:05:10,000
But that's what the self means inside the parameter list here and here.

52
00:05:10,000 --> 00:05:24,000
And beyond that, we use a self within the init method to tell Python which one of these variables are actually data attributes versus which of these variables are just plain old variables as we've been working with.

53
00:05:24,000 --> 00:05:32,000
So any variable that's defined using self dot, so here I got self dot x and self dot y are data attributes.

54
00:05:32,000 --> 00:05:41,000
That means any object I create that's of type coordinate, I know will have a variable x and y associated with it, right?

55
00:05:41,000 --> 00:05:45,000
Because I've defined these x and y is using self dot x and self dot y.

56
00:05:45,000 --> 00:05:55,000
Now in the last lecture, I actually had these parameter lists, the parameters in this list here be different in the next and y, I think x val y val.

57
00:05:55,000 --> 00:06:03,000
And self dot x equals x val where this x here to the right of the equal sign is the x from the parameter list, right?

58
00:06:03,000 --> 00:06:12,000
But so in that sense, it doesn't matter what these variables are in the parameter list, they're just going to be the same over here on the right hand side of the equal sign.

59
00:06:12,000 --> 00:06:23,000
But the actual parameters, sorry, the actual data attributes are self dot x and self dot y of my object.

60
00:06:23,000 --> 00:06:29,000
So then we had one method that we wrote last lecture, it was called distance and it took two parameters.

61
00:06:29,000 --> 00:06:36,000
So the first one of course is self and this self represents the thing, this object that you're going to call the method on.

62
00:06:36,000 --> 00:06:42,000
I don't have that object yet, so I'm just calling itself for now because this is the class definition.

63
00:06:42,000 --> 00:06:49,000
And then this other parameter is some other coordinate object that I'm going to run this method on.

64
00:06:49,000 --> 00:06:58,000
So the body of distance says, all right, well, how do I find the distance between two points in the 2D plane? It's just pathagoras, right?

65
00:06:58,000 --> 00:07:08,000
So that means grab the x value of one of my points, subtract the x value of the other point, square them, same with the y's, square them, add them, take the square root.

66
00:07:08,000 --> 00:07:11,000
So what's the x value of one point?

67
00:07:11,000 --> 00:07:16,000
Well, one of the points is going to be the thing that I'm calling the distance method on self.

68
00:07:16,000 --> 00:07:21,000
So I grab the x value of self using this dot notation, self dot x.

69
00:07:21,000 --> 00:07:27,000
And then what's the x value of this other coordinate point? Well, it's called other in my parameter list.

70
00:07:27,000 --> 00:07:32,000
So I'm going to grab the x value of other again using dot notation.

71
00:07:32,000 --> 00:07:36,000
And then we just do the math.

72
00:07:36,000 --> 00:07:37,000
Yes.

73
00:07:37,000 --> 00:07:45,000
So you can only call functions on a class that we're defined in like this.

74
00:07:45,000 --> 00:07:50,000
Yeah, so you can make methods, you can make methods for a particular class.

75
00:07:50,000 --> 00:07:55,000
Right, but like you can only call those functions that you define, you can call it another.

76
00:07:55,000 --> 00:07:59,000
Exactly. Yeah.

77
00:07:59,000 --> 00:08:00,000
Yeah.

78
00:08:00,000 --> 00:08:05,000
Is there a way we could define a class as something other than an object?

79
00:08:05,000 --> 00:08:11,000
Right, like there we put the coordinate object in something else in this graph.

80
00:08:11,000 --> 00:08:15,000
In the parentheses, yes, we can put other things in the parentheses.

81
00:08:15,000 --> 00:08:18,000
So that's actually what Monday's lecture will be about.

82
00:08:18,000 --> 00:08:24,000
In that case, the thing in the parentheses becomes the parent of the class that you're currently writing.

83
00:08:24,000 --> 00:08:34,000
So I won't go into too much detail, but to have this other object as a parent means that everything that that object can do automatically your object can do as well.

84
00:08:34,000 --> 00:08:40,000
And then on top of that, you can decide a bunch of additional stuff your new object does.

85
00:08:40,000 --> 00:08:46,000
But in a sense, your coordinate object is a whatever this thing in the parentheses is.

86
00:08:46,000 --> 00:08:51,000
And then it can do a bunch of other stuff as well.

87
00:08:51,000 --> 00:08:52,000
Yeah.

88
00:08:52,000 --> 00:08:58,000
Yeah.

89
00:08:58,000 --> 00:09:06,000
Oh, to make a copy of the object or.

90
00:09:06,000 --> 00:09:13,000
Oh, so here we're not you can't make a copy of the class here specifically because we're just defining the class.

91
00:09:13,000 --> 00:09:24,000
But when you're creating coordinate objects, then you could define a method that copies your object into another object.

92
00:09:24,000 --> 00:09:32,000
So in essence, it would return a new object of type coordinate with whatever parameters you'd want to do.

93
00:09:32,000 --> 00:09:37,000
So all yeah, all these things are possible.

94
00:09:37,000 --> 00:09:44,000
So let's add one more method to this class. Let's call it to underscore origin.

95
00:09:44,000 --> 00:09:49,000
So this distance method just to remind ourselves, returned a number. Right?

96
00:09:49,000 --> 00:09:55,000
So it just took the difference between these two points and it returned a number. Just how far away they are.

97
00:09:55,000 --> 00:09:59,000
But this two origin methods going to do something slightly different.

98
00:09:59,000 --> 00:10:07,000
Essentially, what I'm going to have this method do is to take my point from wherever it is in my 2D plane that it has been initialized to.

99
00:10:07,000 --> 00:10:12,000
And say I'm going to reset it back to the origin.

100
00:10:12,000 --> 00:10:20,000
Right? So to do that, all that means is I'm going to make its x value and its y value be zero.

101
00:10:20,000 --> 00:10:27,000
So I can manipulate the x and y data attributes of this particular object to be whatever I want them to be.

102
00:10:27,000 --> 00:10:30,000
So I can reset them both to be zero.

103
00:10:30,000 --> 00:10:39,000
So if I ever call this method on an object whose x and y values are something other than zero, they'll be reset to zero.

104
00:10:39,000 --> 00:10:42,000
So let's actually run the code that we just wrote.

105
00:10:42,000 --> 00:10:45,000
So here I've got two coordinate objects being created.

106
00:10:45,000 --> 00:10:51,000
The beauty of writing this class for us is that now we can create as many coordinate objects as we'd like.

107
00:10:51,000 --> 00:10:55,000
They all will have an x value and a y value associated with them.

108
00:10:55,000 --> 00:10:59,000
It's just that the specific values for x and y will be different. Right?

109
00:10:59,000 --> 00:11:04,000
So here I've got a coordinate object with x3 and y4 being created.

110
00:11:04,000 --> 00:11:07,000
And it's going to be bound by the variable named c.

111
00:11:07,000 --> 00:11:14,000
And here a coordinate object with x and y values both zero, bound to a variable named origin.

112
00:11:14,000 --> 00:11:24,000
So then I can use this dot notation that we talked about last lecture to access either data or to run methods on the object.

113
00:11:24,000 --> 00:11:38,000
So in this print statement here, I'm using dot notation on c and origin to grab the x values of c over here and origin over here.

114
00:11:38,000 --> 00:11:47,000
And then I'm running the distance method on c. So remember dot notation says the thing before the dot is going to be an object.

115
00:11:47,000 --> 00:11:56,000
The thing after the dot is going to be the method name that can run on this object of type whatever this is coordinate.

116
00:11:56,000 --> 00:12:04,000
And then in the parentheses, it's just a function we just pass in all the variables that that that method expects.

117
00:12:04,000 --> 00:12:11,000
So c dot distance will print whatever, you know, however far away it is, I know five because those are nice numbers.

118
00:12:11,000 --> 00:12:20,000
So then if we run this function that we just wrote dot to origin, this function just to remind you doesn't actually return anything.

119
00:12:20,000 --> 00:12:26,000
It just resets the variables x and y for that particular object back to zero.

120
00:12:26,000 --> 00:12:39,000
So in here, when I call this method here, right, again, dot notation, the thing before the dot is an object, it's c, it's x and y values are currently three and four.

121
00:12:39,000 --> 00:12:48,000
But after I run this function, it returns none, by the way, it's x and y values will be changed to zero and zero.

122
00:12:48,000 --> 00:12:55,000
So if I look at my code here, right, so here's this print F statement.

123
00:12:55,000 --> 00:13:01,000
So c's x values three and c's what an origin's x is zero, fine.

124
00:13:01,000 --> 00:13:06,000
And then I've got these two calls here, so c dot to origin, right.

125
00:13:06,000 --> 00:13:15,000
I'm making this function call before the function call c's x is three, c's y is four. And after the function call, you can see c's x is zero and c's y is zero.

126
00:13:15,000 --> 00:13:24,000
Literally changing the x and y values of this object c.

127
00:13:24,000 --> 00:13:30,000
All right, so questions so far? So far so good. Hopefully recap.

128
00:13:30,000 --> 00:13:36,000
Okay, so again, sort of similar to the first slide we started with, right, so we've got this class coordinate object, right.

129
00:13:36,000 --> 00:13:40,000
The class name is our type, so this object I'm creating is a type coordinate.

130
00:13:40,000 --> 00:13:45,000
We're defining the class in a generic way and an abstract way, right.

131
00:13:45,000 --> 00:13:54,000
So we have to use the self variable, either in the parameter list to tell Python what's the thing before the dot going to map to.

132
00:13:54,000 --> 00:13:58,000
Well, it's going to map to self in my parameter list.

133
00:13:58,000 --> 00:14:02,000
Or we use the self to tell Python what the data attributes of this object are.

134
00:14:02,000 --> 00:14:12,000
So anything defined with self dot some variable name will be a data attribute that's common across all the instances I create from of this type.

135
00:14:12,000 --> 00:14:21,000
When we create actual instances, that's when our blueprint, our abstract definition now, you know, gets put into use.

136
00:14:21,000 --> 00:14:31,000
And now I'm creating actual objects that I can grab x values from, change x values from, you know, get distances between other objects and so on and so on.

137
00:14:31,000 --> 00:14:42,000
Okay, so what I'd like to do next is to take this coordinate class and build a circle class with it.

138
00:14:42,000 --> 00:14:51,000
So this comes sort of hand in hand with the idea of when you're deciding how to create a class, you get to make the design decision, right.

139
00:14:51,000 --> 00:15:02,000
So when the finger exercise for Mondays lecture, today's Wednesday, yes, Mondays lecture, you guys had to create a center, sorry, a circle class, right.

140
00:15:02,000 --> 00:15:09,000
But the way we defined the circle class in that finger exercise was basically by that circles radius.

141
00:15:09,000 --> 00:15:14,000
That's the only sort of way we abstracted that circle, right.

142
00:15:14,000 --> 00:15:24,000
In this lecture, we're going to make a different design decision and say that, let's say, and say that a circle will now be defined using two things.

143
00:15:24,000 --> 00:15:28,000
The first is the radius, right. So I'm going to say that that's an integer.

144
00:15:28,000 --> 00:15:32,000
And the second is going to be the center of the circle, right.

145
00:15:32,000 --> 00:15:39,000
So as in the picture there, I'm going to say that a circle is, you know, based on the center and this radius.

146
00:15:39,000 --> 00:15:48,000
The center is not going to be a float. It's not going to be a two pole. It's not going to be an int. It's going to be a coordinate object, right.

147
00:15:48,000 --> 00:15:54,000
The data type that we were just writing.

148
00:15:54,000 --> 00:16:00,000
It's not a secret, but it didn't lower my voice on purpose. It just wanted to let that sink in, right.

149
00:16:00,000 --> 00:16:06,000
So the one of our data attributes for the circle class is a coordinate object.

150
00:16:06,000 --> 00:16:12,000
So we're using an object that we just wrote to create a more complex object, a circle.

151
00:16:12,000 --> 00:16:17,000
Okay. So here's my class definition. The data type is called circle.

152
00:16:17,000 --> 00:16:22,000
Again, it inherits all the parent of circle is just a generic Python object.

153
00:16:22,000 --> 00:16:28,000
First method we have to write is the init method. First parameter is self.

154
00:16:28,000 --> 00:16:34,000
So this thing that I'm creating right now, and I say that to create a circle, I have to give it a center.

155
00:16:34,000 --> 00:16:41,000
And I have to give it a radius. The data attributes of this circle class, right.

156
00:16:41,000 --> 00:16:46,000
So the two attributes that make up my circle are this self dot center.

157
00:16:46,000 --> 00:16:50,000
So the center variable here and self dot radius.

158
00:16:50,000 --> 00:16:55,000
So these two things together make up our circle object.

159
00:16:55,000 --> 00:17:08,000
And initially in the init method, right, and when we construct our object, we're just going to set these two things to be whatever is passed in as parameters in that in the constructor.

160
00:17:08,000 --> 00:17:20,000
All right. So what I'd like to say is that this center, center parameter will be a coordinate object and radius will be an int.

161
00:17:20,000 --> 00:17:24,000
Now notice in this code, I'm not actually enforcing this, right.

162
00:17:24,000 --> 00:17:30,000
I could create a set a circle object by just passing in two strings.

163
00:17:30,000 --> 00:17:34,000
Right. At this point, this code doesn't care. Right.

164
00:17:34,000 --> 00:17:40,000
So I'm not aware of my enforcing the fact that center is a coordinate and radius will be an int.

165
00:17:40,000 --> 00:17:44,000
But you know, that's just something that we know.

166
00:17:44,000 --> 00:17:50,000
So then when we create the actual object down here, right.

167
00:17:50,000 --> 00:17:55,000
My underscore circle is going to be a variable that's bound to my circle object.

168
00:17:55,000 --> 00:17:59,000
So here I'm invoking the name of my class circle.

169
00:17:59,000 --> 00:18:06,000
Well, the first one I said right up here that it should be a center, a, a, a, a, a coordinate object.

170
00:18:06,000 --> 00:18:09,000
So center is a variable name.

171
00:18:09,000 --> 00:18:14,000
And what is it? Well, I had to create this coordinate object.

172
00:18:14,000 --> 00:18:19,000
Right. So I'm just invoking the name of coordinate, this class that creates for me a coordinate object.

173
00:18:19,000 --> 00:18:24,000
And I happen to put the center of the circle at two comma two.

174
00:18:24,000 --> 00:18:25,000
Yeah.

175
00:18:25,000 --> 00:18:30,000
Okay. So this center thing is a coordinate object. Right.

176
00:18:30,000 --> 00:18:33,000
It's not a two-puller float or whatever. It's a coordinate object.

177
00:18:33,000 --> 00:18:39,000
And then the radius of this circle is two, an int.

178
00:18:39,000 --> 00:18:42,000
Everyone okay with that? Okay.

179
00:18:42,000 --> 00:18:46,000
So what I'd like you to do next is to modify this init method just slightly.

180
00:18:46,000 --> 00:18:53,000
Just to show you that the init method doesn't just always set the data attributes and it's done.

181
00:18:53,000 --> 00:18:56,000
It can do a lot of initialization code.

182
00:18:56,000 --> 00:19:05,000
One of the more important things it can do is to try to enforce the types on the, on the parameters here, right?

183
00:19:05,000 --> 00:19:12,000
So what I'd like you to do is add to this code to check that the type of center is a coordinate.

184
00:19:12,000 --> 00:19:15,000
And the type of radius is an integer.

185
00:19:15,000 --> 00:19:22,000
And only if those two things are true, then do you set the two data attributes?

186
00:19:22,000 --> 00:19:27,000
And otherwise raise for me a value error.

187
00:19:27,000 --> 00:19:33,000
So that should be around line 48.

188
00:19:33,000 --> 00:19:41,000
Okay. Does anyone have some code for me?

189
00:19:41,000 --> 00:19:42,000
Yeah.

190
00:19:42,000 --> 00:19:47,000
It's a type of center that's not equal to 1 and raised to the type error.

191
00:19:47,000 --> 00:19:50,000
Not equal coordinate.

192
00:19:50,000 --> 00:19:53,000
Yep. So that's raised value error.

193
00:19:53,000 --> 00:19:55,000
Yep.

194
00:19:55,000 --> 00:20:03,000
Cool. So that takes care of 1, yep.

195
00:20:03,000 --> 00:20:11,000
Yep. So if the type of radius, because that's the parameter passed in, not equal to int,

196
00:20:11,000 --> 00:20:17,000
raise value error.

197
00:20:17,000 --> 00:20:23,000
So if we drop into each of any of these ifs, then we immediately raise the value error, right?

198
00:20:23,000 --> 00:20:24,000
The code doesn't complete.

199
00:20:24,000 --> 00:20:32,000
And then only if we didn't drop into this one or this one, do we then go on to create my object?

200
00:20:32,000 --> 00:20:36,000
So then here we are. These two lines here will succeed, right?

201
00:20:36,000 --> 00:20:39,000
So there's no error raised or anything like that.

202
00:20:39,000 --> 00:20:47,000
But then this line here, raised in our value error, because we tried to create a circle where the center is an integer, right?

203
00:20:47,000 --> 00:20:49,000
Obviously not a coordinate object.

204
00:20:49,000 --> 00:20:55,000
And then here again, we raised a value error because we tried to pass in a string as the radius.

205
00:20:55,000 --> 00:21:00,000
Any questions about this code?

206
00:21:00,000 --> 00:21:01,000
Oh yeah.

207
00:21:01,000 --> 00:21:06,000
It's very important for these to stay as you think for these.

208
00:21:06,000 --> 00:21:10,000
Yeah. So it's important to place them before you actually create the object, right?

209
00:21:10,000 --> 00:21:19,000
Because you don't want to create it unless everything's appropriate.

210
00:21:19,000 --> 00:21:21,000
Okay.

211
00:21:21,000 --> 00:21:28,000
So now let's add one more useful method to our class circle.

212
00:21:28,000 --> 00:21:33,000
Now that we've defined a circle using a center point and a radius,

213
00:21:33,000 --> 00:21:42,000
we can add this little function that checks if another coordinate object is inside our circle.

214
00:21:42,000 --> 00:21:43,000
Okay.

215
00:21:43,000 --> 00:21:49,000
So again, I'm not going to be able to enforce that this point is a coordinate object,

216
00:21:49,000 --> 00:21:53,000
but you know, you could do it in the dox string or you could do a check or something like that.

217
00:21:53,000 --> 00:21:58,000
But you know, again, we're just going to assume the user using this method is going to follow the rules.

218
00:21:58,000 --> 00:22:00,000
So how is this method going to work?

219
00:22:00,000 --> 00:22:05,000
The idea here is that we're going to use the center, which is a coordinate object,

220
00:22:05,000 --> 00:22:09,000
and some other point, you know, p, wherever it may be.

221
00:22:09,000 --> 00:22:15,000
What we're going to do is we're going to say what's the distance between this point and the center of the circle.

222
00:22:15,000 --> 00:22:19,000
If it's greater than the radius, we know the point is outside the circle.

223
00:22:19,000 --> 00:22:24,000
If it's smaller than the radius, we know the point is in the circle.

224
00:22:24,000 --> 00:22:26,000
So this code is just enforcing that.

225
00:22:26,000 --> 00:22:34,000
So we have just a simple return statement that's going to run the distance method.

226
00:22:34,000 --> 00:22:42,000
This is a method that we wrote back in the coordinate class.

227
00:22:42,000 --> 00:22:45,000
That's fine because you know what?

228
00:22:45,000 --> 00:22:50,000
The point is an object of type coordinate and self dot center.

229
00:22:50,000 --> 00:22:54,000
So the center of this circle object I'm trying to manipulate, right?

230
00:22:54,000 --> 00:22:59,000
To tell if another point is inside me or not, is also a coordinate object.

231
00:22:59,000 --> 00:23:01,000
So why not?

232
00:23:01,000 --> 00:23:04,000
We already wrote the code that calculates the distance between these two points.

233
00:23:04,000 --> 00:23:05,000
So let's call it.

234
00:23:05,000 --> 00:23:10,000
So here I've got the thing before the dot a coordinate object, dot notation,

235
00:23:10,000 --> 00:23:13,000
the method I want to run on this coordinate object,

236
00:23:13,000 --> 00:23:16,000
and then parenthesis, this is another coordinate object.

237
00:23:16,000 --> 00:23:20,000
So this will just tell me some number for how far away these two points are.

238
00:23:20,000 --> 00:23:25,000
And all we do is return whether that number is less than the radius.

239
00:23:25,000 --> 00:23:30,000
Does that make sense?

240
00:23:30,000 --> 00:23:36,000
And again, this only works if point, the thing that's passed in here, is a coordinate object.

241
00:23:36,000 --> 00:23:40,000
Otherwise, this code will fail because it's going to try to pass in,

242
00:23:40,000 --> 00:23:43,000
and try to run the distance method on a string, for example.

243
00:23:43,000 --> 00:23:47,000
And of course, this string doesn't have a distance method, right?

244
00:23:47,000 --> 00:23:51,000
So down here, these two lines are exactly as we had before.

245
00:23:51,000 --> 00:23:56,000
We create a circle object whose center is at 2,2 and radius is 2.

246
00:23:56,000 --> 00:23:59,000
And then I've got another coordinate object down here.

247
00:23:59,000 --> 00:24:02,000
It's at 1,1, right?

248
00:24:02,000 --> 00:24:04,000
So clearly within the circle.

249
00:24:04,000 --> 00:24:08,000
So that print statement will then print true.

250
00:24:08,000 --> 00:24:10,000
So that's just basically what I wrote.

251
00:24:10,000 --> 00:24:15,000
This is a coordinate object, this is the method, this is another coordinate object.

252
00:24:15,000 --> 00:24:20,000
All right, so let's run it.

253
00:24:20,000 --> 00:24:22,000
So this is exactly the code from the slide.

254
00:24:22,000 --> 00:24:25,000
So if I run this method on a coordinate object, that's 1,1.

255
00:24:25,000 --> 00:24:27,000
This is somewhere in here, so true.

256
00:24:27,000 --> 00:24:31,000
And otherwise, if I run it on coordinate object, right?

257
00:24:31,000 --> 00:24:36,000
Here, 10,10, clearly outside the circle, it prints false.

258
00:24:39,000 --> 00:24:43,000
Questions?

259
00:24:43,000 --> 00:24:47,000
Okay.

260
00:24:47,000 --> 00:24:50,000
Yes, that's exactly what I said already.

261
00:24:50,000 --> 00:24:52,000
Okay, good.

262
00:24:52,000 --> 00:24:54,000
So now, I want you to answer this question.

263
00:24:54,000 --> 00:24:59,000
Nothing to code here, but I've got these two is inside methods.

264
00:24:59,000 --> 00:25:03,000
So the first one here is inside one is exactly the one that we just saw.

265
00:25:03,000 --> 00:25:04,000
Right?

266
00:25:04,000 --> 00:25:08,000
It runs this distance method with point and self dot center.

267
00:25:08,000 --> 00:25:11,000
Is inside two looks slightly different?

268
00:25:11,000 --> 00:25:13,000
The differences I've highlighted in this box.

269
00:25:13,000 --> 00:25:17,000
What I'd like you to tell me we can do a show of hands is, are these two functions,

270
00:25:17,000 --> 00:25:20,000
these two methods functionally equivalent?

271
00:25:20,000 --> 00:25:25,000
That is, will they return the same thing given the same input?

272
00:25:25,000 --> 00:25:32,000
So think about it, and then I will do a show of hands.

273
00:25:32,000 --> 00:25:39,000
So who thinks yes, they are functionally equivalent.

274
00:25:39,000 --> 00:25:44,000
Like given the same input, they will both return true, right?

275
00:25:44,000 --> 00:25:45,000
In part 1.

276
00:25:45,000 --> 00:25:46,000
Okay.

277
00:25:46,000 --> 00:25:49,000
Who thinks no, they are not functionally equivalent.

278
00:25:49,000 --> 00:25:52,000
Some, half and half.

279
00:25:52,000 --> 00:25:53,000
Okay.

280
00:25:53,000 --> 00:25:58,000
Well, let's think about what the distance method is doing.

281
00:25:58,000 --> 00:26:07,000
It's being run on an object of type, what?

282
00:26:07,000 --> 00:26:09,000
Coordinate, exactly.

283
00:26:09,000 --> 00:26:13,000
So in here, is point and object of type coordinate?

284
00:26:13,000 --> 00:26:14,000
Yes.

285
00:26:14,000 --> 00:26:15,000
Okay.

286
00:26:15,000 --> 00:26:19,000
And then here, what is the parameter to the distance method?

287
00:26:19,000 --> 00:26:22,000
Is it object of type coordinate?

288
00:26:22,000 --> 00:26:25,000
Self dot center, is it an object of type coordinate?

289
00:26:25,000 --> 00:26:26,000
Yes.

290
00:26:26,000 --> 00:26:29,000
So now let's look at is inside 2.

291
00:26:29,000 --> 00:26:33,000
What is the type of self dot center?

292
00:26:33,000 --> 00:26:34,000
Coordinate.

293
00:26:34,000 --> 00:26:37,000
And we're running the distance method on this object of type coordinate.

294
00:26:37,000 --> 00:26:41,000
And what is the object in the parameter list here?

295
00:26:41,000 --> 00:26:43,000
What's its type?

296
00:26:43,000 --> 00:26:45,000
Coordinate.

297
00:26:45,000 --> 00:26:51,000
So when we wrote the distance method, does it matter which object we call the method on

298
00:26:51,000 --> 00:26:54,000
to get the distance between these two points?

299
00:26:54,000 --> 00:26:55,000
No, right?

300
00:26:55,000 --> 00:27:02,000
Because the distance between saying, I want the distance between this point and this point is the same as saying,

301
00:27:02,000 --> 00:27:05,000
I want the distance between this point and this point, right?

302
00:27:05,000 --> 00:27:08,000
It's just the order is different.

303
00:27:08,000 --> 00:27:09,000
Right?

304
00:27:09,000 --> 00:27:12,000
So just the way that this distance method works, right?

305
00:27:12,000 --> 00:27:17,000
It doesn't actually matter which object I call the method on, right?

306
00:27:17,000 --> 00:27:23,000
As long as they're both coordinate objects, which they are.

307
00:27:23,000 --> 00:27:25,000
Does that make sense?

308
00:27:25,000 --> 00:27:26,000
Is that all right?

309
00:27:26,000 --> 00:27:29,000
Any questions about this for those who are in the no, yeah?

310
00:27:29,000 --> 00:27:34,000
So the self dot center is a circle up to the bottom.

311
00:27:34,000 --> 00:27:40,000
Self dot center is an object of type coordinate, not circle.

312
00:27:40,000 --> 00:27:44,000
Because self is a circle, right?

313
00:27:44,000 --> 00:27:48,000
Because self is talking about me, the class that I'm currently defining.

314
00:27:48,000 --> 00:27:52,000
And the class I'm currently defining is a circle.

315
00:27:52,000 --> 00:27:55,000
But self dot center, right?

316
00:27:55,000 --> 00:27:56,000
We even wrote code.

317
00:27:56,000 --> 00:28:06,000
We would like to enforce that it is a coordinate object, right?

318
00:28:06,000 --> 00:28:12,000
So we could have put parentheses around the self dot center if we wanted to and then call the distance on that.

319
00:28:12,000 --> 00:28:15,000
Does that make sense?

320
00:28:15,000 --> 00:28:18,000
Okay.

321
00:28:18,000 --> 00:28:19,000
All right.

322
00:28:19,000 --> 00:28:21,000
So that's all I had regarding the circle class.

323
00:28:21,000 --> 00:28:25,000
Now we're going to switch gears and we're going to look at fractions, right?

324
00:28:25,000 --> 00:28:29,000
So numerator slash denominator situation here.

325
00:28:29,000 --> 00:28:35,000
So we're going to create a new data type to represent a number as a fraction.

326
00:28:35,000 --> 00:28:38,000
So first thing we need to do is make the design decision.

327
00:28:38,000 --> 00:28:41,000
What data will represent our fraction?

328
00:28:41,000 --> 00:28:43,000
So think about it.

329
00:28:43,000 --> 00:28:45,000
You guys tell me, what do you think?

330
00:28:45,000 --> 00:28:52,000
What's a reasonable set of data that could represent our number as a fraction?

331
00:28:52,000 --> 00:28:55,000
When you think of a, yeah.

332
00:28:55,000 --> 00:29:02,000
Yeah, a set of two things, maybe integers, right?

333
00:29:02,000 --> 00:29:05,000
One representing the numerator, the thing above the line,

334
00:29:05,000 --> 00:29:08,000
and one the denominator, the thing below the line.

335
00:29:08,000 --> 00:29:11,000
Good. That's exactly what I had in mind.

336
00:29:11,000 --> 00:29:14,000
What are some behaviors of fractions?

337
00:29:14,000 --> 00:29:16,000
You guys tell me.

338
00:29:16,000 --> 00:29:20,000
What things should fractions do?

339
00:29:20,000 --> 00:29:23,000
Yeah.

340
00:29:23,000 --> 00:29:25,000
Yeah.

341
00:29:25,000 --> 00:29:26,000
Yes.

342
00:29:26,000 --> 00:29:31,000
Adding them, multiplying fractions together, dividing them, inverting a fraction.

343
00:29:31,000 --> 00:29:33,000
Also something we could do, right?

344
00:29:33,000 --> 00:29:36,000
So one over what it currently is, things like that.

345
00:29:36,000 --> 00:29:37,000
All right.

346
00:29:37,000 --> 00:29:38,000
So we're going to write it together.

347
00:29:38,000 --> 00:29:40,000
The full code is actually in the Python file.

348
00:29:40,000 --> 00:29:44,000
So mostly I'm going to go through the slides just because it's incremental.

349
00:29:44,000 --> 00:29:46,000
So it's easier for me to talk about it.

350
00:29:46,000 --> 00:29:52,000
But, you know, the exact full code is already in the Python file if you're running it later.

351
00:29:52,000 --> 00:29:56,000
So the first thing we're going to do is create this fraction class.

352
00:29:56,000 --> 00:30:00,000
And I'm actually going to name it simple fraction instead of fraction.

353
00:30:00,000 --> 00:30:06,000
Because we're going to improve upon this simple fraction object in a little bit.

354
00:30:06,000 --> 00:30:09,000
So this one, I'm just going to call simple fraction.

355
00:30:09,000 --> 00:30:14,000
Like before, it's parent, it is the generic Python object.

356
00:30:14,000 --> 00:30:18,000
Right. So again, very, very simple.

357
00:30:18,000 --> 00:30:21,000
It doesn't do anything special yet.

358
00:30:21,000 --> 00:30:25,000
The first method we need to write is the init method.

359
00:30:25,000 --> 00:30:27,000
So how do we initialize a fraction object?

360
00:30:27,000 --> 00:30:31,000
Obviously, we don't want the numerator or the denominator to be empty, right?

361
00:30:31,000 --> 00:30:38,000
So when we create a simple fraction object, we want the user to tell us the values for the numerator and the denominator.

362
00:30:38,000 --> 00:30:45,000
So those are the two parameters that I would love the user to initiate this fraction with.

363
00:30:45,000 --> 00:30:51,000
And then what are going to, what will be the two data attributes that we had decided on?

364
00:30:51,000 --> 00:30:57,000
Well, numerator, so self.num and self.dnum will be the two data attributes.

365
00:30:57,000 --> 00:31:00,000
Right. So self.num and self.dnum are our data attributes.

366
00:31:00,000 --> 00:31:09,000
And they're going to be set initially to whatever is passed in that constructor call.

367
00:31:09,000 --> 00:31:11,000
Okay. So far so good.

368
00:31:11,000 --> 00:31:16,000
Let's write a method that helps us multiply two fraction objects together.

369
00:31:16,000 --> 00:31:19,000
So we'll call it times.

370
00:31:19,000 --> 00:31:24,000
So this times method will be called on an object, the thing before the dot.

371
00:31:24,000 --> 00:31:28,000
That object, that thing before the dot will get mapped to self.

372
00:31:28,000 --> 00:31:35,000
And then the thing in the parentheses that one other parameter will be mapped to OTH.

373
00:31:35,000 --> 00:31:39,000
Okay. So how do we multiply two fraction objects together?

374
00:31:39,000 --> 00:31:43,000
Take the numerators, multiply them. Take the denominators, multiply them.

375
00:31:43,000 --> 00:31:46,000
You got your numerator and you got your new denominator. Right.

376
00:31:46,000 --> 00:31:50,000
So how do we grab the numerators of both of these objects?

377
00:31:50,000 --> 00:31:57,000
So the numerator of the thing before the dot, right, that maps to self, is self.num.

378
00:31:57,000 --> 00:32:07,000
And the numerator of the other object that's going to be in the parameter list is the name of my parameter, OTH.

379
00:32:07,000 --> 00:32:13,000
So we're a numerator, no. Everyone okay so far?

380
00:32:13,000 --> 00:32:17,000
Yes, okay. I saw some headnuts, that's good.

381
00:32:17,000 --> 00:32:24,000
The denominator will be the same, so my new denominator is just multiplying my denominator, the thing before the dot,

382
00:32:24,000 --> 00:32:28,000
what with the thing in the parameters denominator?

383
00:32:28,000 --> 00:32:34,000
Okay. So I've got my new numerator, my new denominator, and all I'm going to do is do the division and return this value.

384
00:32:34,000 --> 00:32:39,000
What's the type of the return here? What's this method going to return? What type?

385
00:32:39,000 --> 00:32:41,000
A float, exactly. Yeah, good.

386
00:32:41,000 --> 00:32:47,000
Yep, because all I'm doing is dividing one number by another number.

387
00:32:47,000 --> 00:32:54,000
Okay. Perfect. So that's what I've already said.

388
00:32:54,000 --> 00:33:00,000
Now we can define another method, plus to add two fraction objects together.

389
00:33:00,000 --> 00:33:13,000
Very similar thing, except the top is going to be slightly different, right? You take the numerator of one, times the denominator of the other, plus the numerator of other, times the denominator of the first one.

390
00:33:13,000 --> 00:33:21,000
The cross thing, the denominator is the same, right? Just multiply the denombs together, and again we return the division, top divided by bottom.

391
00:33:21,000 --> 00:33:25,000
Again, the return of this method will be a float.

392
00:33:25,000 --> 00:33:32,000
So even though I'm multiplying or adding these two fraction objects together, my return will be a float. Fine.

393
00:33:32,000 --> 00:33:37,000
So let's run the code. I'm creating two simple fraction objects.

394
00:33:37,000 --> 00:33:46,000
First one is going to be accessed using variable named f1. So this one represents the number three over four.

395
00:33:46,000 --> 00:33:55,000
Second one is accessed by variable named f2, and this one represents the fraction one over four.

396
00:33:55,000 --> 00:34:07,000
So now if I access the numerator of f1, Python says, well, what's the object before the dot? It's f1. So what is your numerator? Well, I said it to three, so this one tells me it's three.

397
00:34:07,000 --> 00:34:22,000
Right? Pretty simple. Same thing with the denominator of f1. Again, it looks at the thing before the dot. It's a fraction object. It says, do you have a denom, a data attribute you do, and its value is four. So that's four.

398
00:34:22,000 --> 00:34:34,000
Now what's the result of f1.plusf2? Super weird way to write it, but it's what we've got so far. Right? So the thing before the dot is an object.

399
00:34:34,000 --> 00:34:57,000
It's a simple fraction object, and the thing before the dot, remember, maps to self in my parameter list. Right? Because it's just a function. So like usual functions, you know, a bunch of lectures ago, we basically map the actual parameters when we run the function to the formal parameters, the things for my function definition.

400
00:34:57,000 --> 00:35:18,000
So the actual parameter here for self is the thing before the dot, f1, and the parameter f2 gets mapped to OTH. That's how we read that. So this is just doing the addition right, so this will give me 1.0, because it's a float.

401
00:35:18,000 --> 00:35:31,000
Same with the times, the thing before the dot maps to self, and every other parameter in the parameter list maps to all everything else except for self. So this one will do 3 over 16 to give me 0.1875.

402
00:35:32,000 --> 00:35:35,000
Okay? Everyone okay so far?

403
00:35:35,000 --> 00:35:45,000
The trick here is to remember that the thing before the dot maps to self in the method definition, and then everything else maps to everything other than self.

404
00:35:46,000 --> 00:36:01,000
Okay. I'm glad everything's okay so far, because I'm going to get you to write this code here. It looks like a lot, but the first half of it is just defining the init method for simple fraction.

405
00:36:01,000 --> 00:36:14,000
I want you to write these two methods, and they're going to be one liners basically. So get inverse will return something, and it returns a float representing one over myself.

406
00:36:15,000 --> 00:36:36,000
Right? So if the input, as this is in this example here, if I have a simple fraction object representing 3 over 4, if I call get inverse on it right here, f1 dot get inverse, self becomes f1, and I would like it to return and therefore print 4 over 3. So 1.33333333.

407
00:36:37,000 --> 00:36:51,000
Okay? That's get inverse, and then invert is a method that doesn't return anything. So returns none. And instead it just internally switches the numerator and the denominator of self.

408
00:36:51,000 --> 00:36:56,000
Right? So self's numerator becomes whatever it's denominator is and the other way around.

409
00:36:56,000 --> 00:37:05,000
Right? So when you call it, this one doesn't print anything, but instead if we access f1's numerator and denominator, they will have been switched.

410
00:37:05,000 --> 00:37:14,000
Okay? So this is down online. 1.3333.

411
00:37:14,000 --> 00:37:25,000
Give you a couple moments, and then we can write it together. It should not be a lot of code. Okay? How do we write the get inverse? So remember you have to return something.

412
00:37:25,000 --> 00:37:37,000
How do we return? Yeah, 1 over. 1 over self. So remember self is an object of type simple fraction. Right?

413
00:37:37,000 --> 00:38:00,000
So we need to manipulate its numerator and the denominator if we want to do the return. Because if we just do this, this one here, then Python says, oops, sorry, it's trying to divide 1, an integer by an object of type simple fraction. Right? And that's the error that we get here.

414
00:38:00,000 --> 00:38:18,000
It doesn't know how to do a division between an integer and a simple fraction. So how can we do that by working with actual numbers that are part of my simple fraction?

415
00:38:18,000 --> 00:38:25,000
Yeah. So, yeah.

416
00:38:25,000 --> 00:38:30,000
Self dot dnom divided by self dot num. Yeah, we can do that. Yeah.

417
00:38:30,000 --> 00:38:42,000
Or 1 over self dot num divided by self dot dnom. That's also fine. Yeah. But this is a little bit cleaner. So now, dnom is an integer, right? Because when we create it, we pass an int int.

418
00:38:42,000 --> 00:38:51,000
So dnom and num are integers, which means that Python knows how to do a division between a number and another number. Yeah.

419
00:38:51,000 --> 00:39:06,000
So if we run that, now it prints 1.33333. Okay. How do we do the invert function method? Sorry.

420
00:39:06,000 --> 00:39:15,000
Go ahead. I pressed the sign, you know, it was self dot num divided by self dot. Yeah.

421
00:39:15,000 --> 00:39:24,000
And then you know, you write a, it's equal to self dot dnom. Yeah.

422
00:39:24,000 --> 00:39:51,000
So, you can see now accessing the new numerator and denominator gives me 4 over 3. Any other ways that you've done it? Yeah.

423
00:39:51,000 --> 00:40:10,000
Yeah. The two-pole trick. I like it. So, yeah. Perfect. Yes.

424
00:40:10,000 --> 00:40:37,000
Oh, okay. Yeah. That also works. Yeah. Perfect. All very valid ways of doing it. Nice. Yeah. So notice there's no return for this one, right? I didn't want to return anything. Python will automatically return none. And these internal numerator and denominators will have been flipped.

425
00:40:37,000 --> 00:40:57,000
Perfect. Questions about this code. Okay. So let's try it out a little bit more. So here I've got these two additions, right? So this is exactly what we had previously, the exact same code.

426
00:40:57,000 --> 00:41:15,000
What's weird though, and you might have been weirded out by this too, when we first ran it is, I am doing operations with two fraction objects. And yet the plus and the, and the times methods give me floats, which is a little weird, right?

427
00:41:15,000 --> 00:41:35,000
Ideally, if we're working with fraction objects, I would like the return to also be a fraction object so I can then work with more fraction objects later on. That's one weird thing. Another weird thing is if we then print one of our objects that we've created, if one in this case, we use print statements often, right? To debug things like that.

428
00:41:35,000 --> 00:41:50,000
If I use the print statement on an object of type that I've created, in this case, a simple fraction, Python spits this out. It says, hey, your object is an object of type simple fraction at this memory location.

429
00:41:50,000 --> 00:42:03,000
No, thank you. That's not very useful to me, right? What I'd like to know is maybe a nice representation of my fraction object like three slash four, right? I don't care about what memory location it's at.

430
00:42:04,000 --> 00:42:23,000
And one more thing we'd like to try to do, this is a class that represents something numerical. So something that people might instinctually want to do is to use operators like the star or the plus or the slash, right? To divide, add, multiply these fraction things.

431
00:42:23,000 --> 00:42:37,000
But if we run the star operator between object of type simple fraction, right? Times another object time of type simple fraction? Python gives us an error. And I'll even show you the error.

432
00:42:37,000 --> 00:42:43,000
So here.

433
00:42:44,000 --> 00:43:01,000
So here I am printing my object, right? So it spits this out, which is fine, but not what I want. This one, you know, obviously we've seen this already prints this out. And then if I try to multiply my two simple fraction objects together, it says, I don't know how to do that.

434
00:43:02,000 --> 00:43:15,000
So it's unsupported operand types. So the operand simple fraction, simple fraction are not supported with the star operator. Well, no surprise there. How is Python supposed to know how to multiply two simple fraction objects together, right?

435
00:43:15,000 --> 00:43:26,000
Right before I even ran this program, I didn't even know what a simple fraction object was. Right? So we need to tell it all of these details. And we will do just that.

436
00:43:27,000 --> 00:43:42,000
So all of these operators print, lend that we've been using star add, right? Less than greater than even the square brackets to index into something. These are actually shorthand notations.

437
00:43:42,000 --> 00:43:54,000
Right? They're really common operations that you want to do. And Python lets you use these common operations in instead of writing these really verbose function names.

438
00:43:54,000 --> 00:44:02,000
But really behind the scenes, all of these shorthand operations actually run a method.

439
00:44:03,000 --> 00:44:15,000
Again, not a secret. I'm not lowering my voice because it's a secret, but it's just, it's really cool. So all of these operations, like the multiplication or the print statement, just gets replaced with a method.

440
00:44:15,000 --> 00:44:26,000
And the method names look like this. They are dunder methods, just like the init method was a special method that Python ran when something special happened, like you're creating an object.

441
00:44:26,000 --> 00:44:38,000
Well, when something special happens, like you're using the plus operator between an object of your type and something else, Python will also run this special dunder method behind the scenes.

442
00:44:38,000 --> 00:44:45,000
Right? And same here, if I want to multiply my object with something else, Python will run this special dunder method behind the scenes.

443
00:44:46,000 --> 00:45:02,000
If I want to print an object of my type, Python will run this special dunder method behind the scenes. Right? Even something like casting, if I want to cast my object to a float or to a string or something, Python will run this special dunder method behind the scenes.

444
00:45:02,000 --> 00:45:21,000
And then, you know, there's a whole bunch of other ones, even indexing into a list, sorry, not a list, indexing into an object of your type. So if you make an object like a queue or a stack where you know you have a bunch of sequences of objects, you can tell Python how to index into an object of your type into an object that's a queue.

445
00:45:21,000 --> 00:45:35,000
So all of these things, all of these methods need to be implemented somewhere. Now, most of them are not implemented in the basic Python object, except for the str.

446
00:45:35,000 --> 00:46:01,000
So the str method actually just prints the memory location of this object. That's exactly what we had seen, right, by the default behavior. But none of these other ones are really implemented. And so if you want the object that you're currently writing to work with the star or the plus or the double equal sign to test for equality between this object and something else, you have to write the method in your class definition.

447
00:46:02,000 --> 00:46:10,000
So you have to implement it to tell Python that this is what you want to do when somebody uses this special shorthand notation.

448
00:46:10,000 --> 00:46:24,000
So let's start with the print because it's the most basic thing you will probably want to implement when you create a new data type, right, for debugging purposes, you'll find yourself instinctually saying, hey, print, you know, f1 to print this fraction object to see what it looks like.

449
00:46:24,000 --> 00:46:31,000
And so the str method is one of the really basic things you should implement right after the init method.

450
00:46:31,000 --> 00:46:48,000
So let's look at it in the context of the coordinate object. So here I've got my coordinate object 3,4. And even when I print this coordinate object, Python tells me this still an informative message that this object is of type coordinate at this memory location.

451
00:46:49,000 --> 00:47:03,000
Okay, I don't care. When said what I would really like to do is say, hey, I want to represent a coordinate object by something like this, angle bracket, the value of the x coordinate comma, the value of the y coordinate, close angle bracket.

452
00:47:03,000 --> 00:47:10,000
So that would be a far more informative print statement than what memory location this thing is at.

453
00:47:11,000 --> 00:47:25,000
So let's do that. Well, here we are our our our coordinate object, the distance, the init like we had before. And here I'm defining my str method.

454
00:47:25,000 --> 00:47:34,000
So double underscore str double underscore no other parameters except for self. So me calling this method on an object.

455
00:47:34,000 --> 00:47:47,000
And what is this going to do? It will return not print. Return a string. And the string is going to represent the thing you want to be printed out.

456
00:47:47,000 --> 00:48:02,000
So returns a string doesn't print it. However, you want to make up the string is up to you. So here I've just used concatenation of a bunch of stuff. So I'm concatenating the angle bracket with the x value of my current object.

457
00:48:02,000 --> 00:48:11,000
Cast to a string concatenated with the comma concatenated with the y value of my current object cast to a string concatenated with the closed angle bracket.

458
00:48:11,000 --> 00:48:20,000
That's the design decision we made to for how a coordinate object should be printed. Everyone okay so far?

459
00:48:20,000 --> 00:48:28,000
Okay. So if you want to use an f string to make up this thing to return, totally fine.

460
00:48:28,000 --> 00:48:39,000
If you want to make a variable right in between the return and the definition here that you just keep concatenating with, you can concatenate it with new lines and things like that. Also totally fine.

461
00:48:39,000 --> 00:48:46,000
At the end you just have to return that string that represents the thing you want to preprint it out.

462
00:48:46,000 --> 00:48:55,000
So now let's see what happens when we actually run the code right. So here I'm creating a coordinate object. And then I'm printing that coordinate object.

463
00:48:55,000 --> 00:49:04,000
Well Python says hey you just called a special shorthand notation on an object of type coordinate. Let me see if you implemented the STR method.

464
00:49:04,000 --> 00:49:17,000
It looks in the class definition. It sees the STR method implemented here and then it runs the code inside and says you want to grab C's x value and C's y value and concatenated with these things here.

465
00:49:17,000 --> 00:49:24,000
Sure I can do that for you and then it goes and prints this out to the screen.

466
00:49:24,000 --> 00:49:30,000
Okay. Very cool right. Now we can decide how to print objects that we create.

467
00:49:30,000 --> 00:49:42,000
Alright so let's try to wrap our minds around types here. Okay. So if we print this C, C is an instance of a coordinate object right.

468
00:49:42,000 --> 00:49:54,000
It's an actual object that we're manipulating. It's not the class definition. It's not anything abstract like that. It's an actual object like the integer three right is an actual object.

469
00:49:54,000 --> 00:50:07,000
So if we print that C Python uses the STR method. Well what if we print the type of C? Somebody tell me what's the type of C.

470
00:50:07,000 --> 00:50:14,000
Yeah it's the class name that we define. So when we print the type of C Python says this is a class coordinate.

471
00:50:14,000 --> 00:50:22,000
Which makes sense because if we just replace type of C here with what it is coordinate we'll get the same print statement.

472
00:50:22,000 --> 00:50:26,000
If we just print coordinate Python says this is a class of type coordinate.

473
00:50:26,000 --> 00:50:30,000
Alright so those two lines are equivalent.

474
00:50:30,000 --> 00:50:37,000
And then let me blow your minds a little bit more. What if we print the type of coordinate? Well what is coordinate?

475
00:50:37,000 --> 00:50:49,000
It's a type. Right. We're defining a new type in Python called a coordinate. So coordinate is a new data type in Python.

476
00:50:49,000 --> 00:50:55,000
So its type is type.

477
00:50:55,000 --> 00:51:01,000
So everything in Python is an object. Even types.

478
00:51:01,000 --> 00:51:09,000
One more thing. So we've used the type of something equals something else. Right. When we checked that the type of the circles center was a coordinate.

479
00:51:09,000 --> 00:51:16,000
That's one way to check for types. Another way I used to use this is instance function just as an aside.

480
00:51:16,000 --> 00:51:25,000
So you can check that C is an instance of type coordinate by using this instance method. And you know this will tell you true.

481
00:51:25,000 --> 00:51:32,000
And you know just to draw parallel you can say you know is instance three comma int. That would also say true. Right.

482
00:51:32,000 --> 00:51:39,000
Because three is an object of type integer. It's just another way to check the types.

483
00:51:39,000 --> 00:51:49,000
Okay. So the remainder of this class I would like to go back to our fraction class and make it better.

484
00:51:49,000 --> 00:52:03,000
Now that we know a dunder methods. Right. Let's implement a whole bunch of dunder methods to help us to help us and people who want to use our class use it in a more efficient way. Right.

485
00:52:03,000 --> 00:52:13,000
So we're going to implement the star operator, the plus operator. We're going to implement the print. And then we're going to implement implement converting to a float.

486
00:52:13,000 --> 00:52:24,000
All right. So the first thing that we should probably add is the str method. Right. Because then it will help us in debugging when we print an object of type fraction.

487
00:52:24,000 --> 00:52:37,000
So let's define double underscore str double underscore. Right. Again, no parameters except for self because that's the the method where the object we're calling this method on.

488
00:52:37,000 --> 00:52:59,000
And again, however you want to form this string is up to you. You can use f strings or a variable that you keep adding on to. I just did it straight in here with concatenation. So I've got the numerator slash the denominator as a very reasonable way to represent a string. Right. So three slash four as three over four.

489
00:52:59,000 --> 00:53:10,000
Okay. So one thing I guess to keep keep keep track of is if you concatenating you just have to remember to cast a strings. Right. If it's a number that or something that's not a string.

490
00:53:10,000 --> 00:53:22,000
So let's try it out. I've got three fraction objects here. Okay. So the first two we've already seen. So I've got a fraction representing three over four or fraction representing one over four.

491
00:53:22,000 --> 00:53:27,000
And f three is now going to be a fraction representing five over one.

492
00:53:27,000 --> 00:53:46,000
Okay. If we print f one again Python asks, hey, did you implement an str method in your class definition? Yes, you did. Good job. Let me use it. So then it uses this. Right. So it grabs the numerator of f one slash the numerator of sorry, the denominator of f one.

493
00:53:46,000 --> 00:53:51,000
So this will print three, the numerator of one slash the denominator of a one.

494
00:53:51,000 --> 00:53:59,000
Okay. Same with f two except that now it's going to grab f two's numerator and denominator one slash four.

495
00:53:59,000 --> 00:54:07,000
So notice now it's not doing the divisions like it did before or sorry, never mind. We're not there yet. There's nothing to divide.

496
00:54:07,000 --> 00:54:25,000
It's just grabbing the numerators and denominators and just printing them out. Right. It's not doing any divisions. Now when we print five, the fraction object representing five over one, it prints five slash one.

497
00:54:25,000 --> 00:54:40,000
I don't like that because it looks weird. Right. Do you like that? No. So then I'm going to have you fix it. Change the str method just a little bit.

498
00:54:41,000 --> 00:54:54,000
Such that if the denominator is one, just have it print the numerator. Right. And otherwise the representation should be as before numerator slash denominator.

499
00:54:57,000 --> 00:55:03,000
So this should be down line one forty.

500
00:55:03,000 --> 00:55:16,000
Where is it? Very far down to sixty five.

501
00:55:19,000 --> 00:55:27,000
Okay. Anyone have some code for me?

502
00:55:27,000 --> 00:55:33,000
Yes.

503
00:55:38,000 --> 00:55:45,000
Yep.

504
00:55:45,000 --> 00:55:55,000
Yep. We can do an else. That else is not needed. I don't think because if we dropped into the if we just immediately return otherwise we would just do the remaining thing.

505
00:55:55,000 --> 00:56:12,000
Perfectly fine. Yep. And let's run it. Right. So the a is a fraction representing one over four. So it nicely printed one over four and be the fraction three over one is just printing three.

506
00:56:12,000 --> 00:56:19,000
Good. Questions about this code.

507
00:56:19,000 --> 00:56:31,000
Okay. For the remaining lecture though, we're not going to use this modified this nicer better str method. So let's just forget what we just did and just remember that it looks like this.

508
00:56:31,000 --> 00:56:44,000
Okay. Just. Okay. So now let's implement the dunder methods for addition multiplication division things like that. So I'm going to do the multiplication just because it's not as long for the numerator.

509
00:56:44,000 --> 00:56:56,000
So just convenience factor here. The left hand side. I've got our old simple fraction code and the right hand side has my new fraction code.

510
00:56:56,000 --> 00:57:09,000
So the old simple fraction code. Remember had this times method. That took itself and OTH a calculator, a new numerator, and a new denominator and returned this.

511
00:57:09,000 --> 00:57:25,000
Okay. Now my new fraction code will no longer need to call times. Right. So we're not going to implement a method called times instead we're going to implement the method behind the scenes for the shorthand notation star to multiply two.

512
00:57:25,000 --> 00:57:40,000
So we need to implement that df double underscore, multiple underscore parameter list is the same because we still have a thing before the star and the thing after the star is the two fraction object we'd like to multiply.

513
00:57:40,000 --> 00:57:51,000
Within the code itself that new calculations of the new numerator and the new denominator are the same as well. Right. We're still grabbing the numerators of self and other.

514
00:57:51,000 --> 00:58:06,000
What's different is in the returns, right. What was the return type for the times method?

515
00:58:06,000 --> 00:58:20,000
A decimal. Yeah, a float. Exactly. What's the return type of my new method? A fraction, exactly. So yes, I am operating with fraction objects.

516
00:58:20,000 --> 00:58:36,000
So I'm expecting that the return type of this method, the star double underscore, is also a fraction object. So then I can just keep working with fraction objects throughout my code, not having to worry about whether this thing is now float or not.

517
00:58:36,000 --> 00:58:50,000
So how are we creating this fraction object? Well, just like we would create a regular fraction object up in the previous slides, right. So here, right. Here's an example of us creating a new fraction object, right.

518
00:58:50,000 --> 00:59:10,000
The numerator one denominator for well, same here. This method will return a new fraction object whose numerator is the thing that I just calculated the top and the denominator is the thing that I just calculated bottom. Does that make sense?

519
00:59:10,000 --> 00:59:31,000
Okay. So this one returns a float. This one returns a fraction. Let's run it. So a is fraction one over four, b is a fraction representing three over four. Good. Those are the numbers we've been working with. If we print a, the print statement says this is the fraction object one slash four, right.

520
00:59:31,000 --> 00:59:44,000
Right. Whose representation is one slash four. Now if I use the star operator between a and b, the thing before the star is kind of like the thing before the dot. It's the self. It gets mapped to self in my double underscore mall.

521
00:59:44,000 --> 00:59:54,000
And the thing after the star, right, the second parameter, so to speak, is the is the is the one parameter that my method takes, right.

522
00:59:54,000 --> 01:00:20,000
So this will create, will run the mole method behind the scenes, right. So Python when it sees that star asks, do you have a mole method implemented in your class fraction? Because the thing before the star is a fraction object. Yes, we do. What is it return? Well, it does the multiplication. And in the end, the return of this method is this thing here. Right. So I literally just, you know, made this.

523
01:00:20,000 --> 01:00:31,000
I guess copied this from the return using the numbers of a and b. So it creates a new fraction object whose numerators three and denominator is 16.

524
01:00:31,000 --> 01:00:48,000
So C equals fraction parentheses three comma 16, basically just another fraction object. So now when I print C, it's going to use the str method for a fraction object, right. Because C is a fraction object.

525
01:00:48,000 --> 01:01:00,000
Right there, right. That's exactly what C was. So this will also print the way we asked to print fraction objects, numerator slash denominator, three slash 16.

526
01:01:00,000 --> 01:01:08,000
Everyone okay so far.

527
01:01:08,000 --> 01:01:25,000
So the following lines are all equivalent. Okay. Using the shorthand notation, very nice, very Python way to multiply two fractions together. But behind the scenes, this is just running a method.

528
01:01:25,000 --> 01:01:38,000
So of course, if you really want to, you can just use the same old way of calling a method, right. Thing before the dot dot method name parentheses parameter list.

529
01:01:38,000 --> 01:01:50,000
So here thing before the dot is a dot the name of my method, the bronze curve mold up underscore parentheses, all of the parameter list except for the thing I'm calling it up.

530
01:01:50,000 --> 01:02:02,000
So those two are equivalent. And of course, last time I mentioned sort of a way to hopefully demystify running these methods where you know the self becomes this thing before the dot.

531
01:02:02,000 --> 01:02:19,000
You could call the method on the name of your data type, right. The type that you're currently creating fraction. So fraction is not an instance, right. A was an instance. It was an actual object that we created, but fraction is just the name of my class.

532
01:02:19,000 --> 01:02:29,000
So if you call the method on the name of your class, then Python expects the full parameter list, right. So something for self, something for other, something for whatever parameters you have.

533
01:02:29,000 --> 01:02:39,000
And so there we would explicitly pass in both a and b as part of my parameter list because the thing before the dot is not an object. So there's not, it doesn't map it to self.

534
01:02:39,000 --> 01:02:52,000
But I would never, ever, ever run a line of code like this, this last one here, right. This is just for your information. It's non-piphonic. It's just very verbose, right.

535
01:02:52,000 --> 01:03:00,000
And so this, these, these dunder methods help us abstract away a bunch of these details, right.

536
01:03:00,000 --> 01:03:11,000
So how annoying would it be to always use dot notation when we multiply an integer with another integer. Can you imagine constantly writing three dot double and square, double and square four.

537
01:03:11,000 --> 01:03:21,000
That would be very bad code. It would take forever to read, right. And so we're abstracting away all the details for calling these methods into these nice little shorthand notations.

538
01:03:21,000 --> 01:03:42,000
And as I said, the shorthand notations exist for a lot of different operations. We saw print. You can do length, comparisons like equality, even indexing into things. You can always, you can abstract all of those away into shorthand notations and behind the scenes, these methods will be run.

539
01:03:42,000 --> 01:03:58,000
Okay, so big idea, right. Exactly what I said. All these special operations that we've been using already behind the scenes, these methods get run. And these methods were written inside the class definition for the types that we've been using.

540
01:03:58,000 --> 01:04:19,000
Right, so when we index into a list, L square brackets, three or whatever, there's a method being called behind the scenes in the list class to grab the element at index three. I don't remember the dunder method name for that, but probably like double and square index, double and square, I don't know. But there is some method behind the scenes.

541
01:04:20,000 --> 01:04:45,000
All right, let's do a couple more things. Sorry. You can't ask Python, but you can look at the documentation. I think it's like in Python.org, there's a website that lists basically everything that you can, that's a dunder method. Yeah, under categories like and all the indexing type stuff, all the numerical type stuff. Yeah.

542
01:04:46,000 --> 01:04:59,000
Okay, so let's do one more thing. Let's say that we're working with fraction objects and so the dunder methods that we're writing are now returning other fraction objects.

543
01:05:00,000 --> 01:05:13,000
So let's allow the user the opportunity to cast one of these fraction objects to a float just in case they would like to grab the, you know, the float value of three slash 60.

544
01:05:14,000 --> 01:05:21,000
Right, that's a very reasonable thing they might want to do. So let's, you know, get ahead of them and add that as part of our class definition.

545
01:05:22,000 --> 01:05:29,000
So to cast things to a float in this particular case, the dunder method for that is double underscore float, double underscore.

546
01:05:30,000 --> 01:05:43,000
And all it's going to do is grab the numerator of self and divide it by the denominator of self. Right, so this will just do a division. Self dot, nom is a number, self dot, denom is another number. It does the division and this returns a float.

547
01:05:44,000 --> 01:05:56,000
Right, so here when we multiply C is equal to a times b, remember that C became a fraction object with numerator three and denominator 16. Right, remember that.

548
01:05:57,000 --> 01:06:11,000
So then when we cast it to a float down here, Python says, hey, did you implement the dunder method, double underscore float, double underscore. Oh, yeah, you did. Let me just go ahead and do the thing that you want me to do inside.

549
01:06:11,000 --> 01:06:16,000
So it takes the three divides it by the 16 and it prints 0.1875.

550
01:06:20,000 --> 01:06:29,000
Okay, let's try it out a little bit more. So here I've got two fraction objects. One representing one over four, the other one representing two over three.

551
01:06:29,000 --> 01:06:42,000
I multiply those two together. Again, this gives me a fraction object, right, because it's running the the mold under method and the mold under method gives me a fraction object with a new numerator and denominator.

552
01:06:43,000 --> 01:06:54,000
So when I print the return of that, when I print C, this prints the new numerator, which is two times one divided by the new denominator, which is four times three. So prints 2 over 12.

553
01:06:55,000 --> 01:07:08,000
Does that look okay to you? I mean, it looks okay, but suppose you're doing, you know, calculations with a whole bunch of numbers. And at some point, you get to really big numerators and really big denominators.

554
01:07:09,000 --> 01:07:23,000
But then you stare at it long enough and realize that that big numerator divided by that big denominator is actually something like one over four. Right, so this is not reduced. Right, which is fine.

555
01:07:24,000 --> 01:07:36,000
Our code is not doing the reduction, but it would be nice to write a method that allows the user to reduce a fraction. Right, that would be really nice.

556
01:07:37,000 --> 01:07:52,000
So can we fix this? Yes, we can. Otherwise, we wouldn't be here. So let's write this method to reduce a fraction object. It looks like a lot, but it's not trust me. It's just a bunch of if else's.

557
01:07:52,000 --> 01:08:13,000
So the first part of it is a little helper function, not a method, right. Notice there's no self going on in this GCD function. Right, this is just a regular function that I will use to help me get the greatest common divisor for the two parameters and and D.

558
01:08:14,000 --> 01:08:25,000
Because when I have two numbers, right, if I want to reduce them, I find the greatest common divisors and I'm going to divide the top and the bottom by that divisor. And that will help me reduce it.

559
01:08:26,000 --> 01:08:30,000
So this GCD function helps me find this greatest common divisor.

560
01:08:31,000 --> 01:08:48,000
Right, so here I'm just defining the function. I'm not actually using it. And then I've got to a if and an L if. So if the denominator zero something super weird. So I'm just going to return none. Right, because having a fraction where the denominator zero maybe something went wrong.

561
01:08:49,000 --> 01:08:57,000
Else, if the denominator is one, we don't need to do any reduction, right, no reducing is needed. So we just return the numerator.

562
01:08:58,000 --> 01:09:07,000
And else, I do have two actual numbers that I could maybe could potentially reduce. So let's just reduce them.

563
01:09:08,000 --> 01:09:16,000
The first line here runs this function, this helper function that I wrote on the numerator and denominator to grab the greatest common divisor.

564
01:09:17,000 --> 01:09:20,000
So, you know, if it's two over 12, it'll find two.

565
01:09:21,000 --> 01:09:34,000
Then the next line here takes the numerator and divides by that greatest common divisor and cast it to an it, right, because I want my numerator to be an int and my denominator to be an int.

566
01:09:34,000 --> 01:09:43,000
So take the numerator and divide by, for example, two. Same with the denominator. I'm going to take my denominator and divide by that same GCD I found.

567
01:09:44,000 --> 01:09:53,000
Casting to an it. So my new top and my new bottom will now be used to create a new fraction object.

568
01:09:54,000 --> 01:10:00,000
That is in reduced form. So one slash six for the example to 12.

569
01:10:01,000 --> 01:10:09,000
Right, so here it is. This is my previous example where I multiplied that thing that gave me two slash 12.

570
01:10:10,000 --> 01:10:19,000
And then if I do C dot reduce, Python will call the reduce method on C. So the object that's whose numerator is two and denominators 12.

571
01:10:20,000 --> 01:10:29,000
And then this will reduce it to one over six and print called the STR method on an object of type fraction to give me one over six.

572
01:10:32,000 --> 01:10:34,000
Everyone okay? Yes.

573
01:10:39,000 --> 01:10:48,000
So you could put it outside the reduce, but since it's being used specifically in the reduce, we'd like to just keep it within.

574
01:10:48,000 --> 01:10:56,000
So it's not, if it doesn't need to be used by other things, we'll just keep it only to the sort of scope where it needs to exist.

575
01:10:56,000 --> 01:10:58,000
But it can be outside.

576
01:10:59,000 --> 01:11:08,000
Okay. So one thing is weird here though. Right? This LF here.

577
01:11:11,000 --> 01:11:19,000
What is the type that gets returned from the else? You guys tell me, what's this type here that gets returned down in the else fraction?

578
01:11:20,000 --> 01:11:23,000
What is the type being returned in the LF?

579
01:11:24,000 --> 01:11:28,000
Yes, an int.

580
01:11:29,000 --> 01:11:37,000
So if the denominator happens to be a one, this method reduce returns an integer.

581
01:11:37,000 --> 01:11:40,000
If it's not, it returns a fraction.

582
01:11:40,000 --> 01:11:49,000
So if at some point in the future you're mixing, you know, you happen to reduce something that has a denominator of one, you're now working with integers.

583
01:11:50,000 --> 01:11:56,000
And then potentially you'd be doing further operations by mixing that with fraction object.

584
01:11:56,000 --> 01:12:03,000
So as an example here, I've got a fraction object, a, four over one, b, three over nine.

585
01:12:03,000 --> 01:12:07,000
Reducing a gives me a four. Fine, it's the integer four.

586
01:12:07,000 --> 01:12:11,000
And reducing b gives me one over three. It's a fraction one over three, right?

587
01:12:11,000 --> 01:12:16,000
So the type, just to show you exactly, you know, that I'm not lying,

588
01:12:16,000 --> 01:12:21,000
the type of the a reduced is an int, right? That's what the code is doing.

589
01:12:21,000 --> 01:12:25,000
And the type of b reduced is a fraction.

590
01:12:25,000 --> 01:12:33,000
So then when we do the star operator between a, r and b are, Python's going to say, you're trying to multiply an int with a fraction.

591
01:12:33,000 --> 01:12:37,000
Did you ever tell me how to do that? No, right?

592
01:12:37,000 --> 01:12:42,000
We told it how to multiply a fraction and another fraction, but not an int with a fraction.

593
01:12:43,000 --> 01:12:47,000
And so Python will fail here, right?

594
01:12:47,000 --> 01:12:55,000
So one thing that you can do to fix it is to change this L of here.

595
01:12:55,000 --> 01:12:59,000
So let's have everything consistent. So I want you to do this change.

596
01:12:59,000 --> 01:13:05,000
Instead of returning self.num, return for me a fraction object representing the numerator.

597
01:13:05,000 --> 01:13:07,000
Right?

598
01:13:08,000 --> 01:13:14,000
All right, does anyone know? Just a small change to instead of returning self.num, what should I return?

599
01:13:14,000 --> 01:13:20,000
How do I make a fraction object? Just invoke the name of fraction, right?

600
01:13:20,000 --> 01:13:24,000
What's the numerator of this fraction object supposed to be?

601
01:13:24,000 --> 01:13:30,000
It's already there. Self.num. What's the denominator of this fraction object?

602
01:13:30,000 --> 01:13:32,000
Yeah, exactly.

603
01:13:32,000 --> 01:13:37,000
So it just returns a fraction object whose numerator is self.num and denominator is one.

604
01:13:37,000 --> 01:13:39,000
Exactly.

605
01:13:39,000 --> 01:13:45,000
All right, so now all the different cases except for this randomly weird denominator being zero, right?

606
01:13:45,000 --> 01:13:49,000
In a case that happens, something's gone wrong maybe.

607
01:13:49,000 --> 01:13:54,000
All the other cases are returning a fraction object, which is good because now it's consistent.

608
01:13:54,000 --> 01:14:08,000
Oh yeah, exactly. So we did say we didn't want it to be five or one, but this is actually using the old STR method where we didn't do that check.

609
01:14:08,000 --> 01:14:17,000
So it will print five or one, but if we do the check, if self.dynamicwecal1, then returnsterself.num.

610
01:14:17,000 --> 01:14:21,000
Like if we add that, then it won't do that.

611
01:14:21,000 --> 01:14:29,000
Yeah, but this is just using the old STR method that doesn't do that nice formatting for us.

612
01:14:29,000 --> 01:14:32,000
Questions?

613
01:14:32,000 --> 01:14:39,000
We've been working a lot with returning new objects of the same type that we're writing.

614
01:14:39,000 --> 01:14:42,000
That's sort of a new thing today.

615
01:14:42,000 --> 01:14:45,000
Okay.

616
01:14:45,000 --> 01:14:50,000
So what's the purpose of these two lectures?

617
01:14:50,000 --> 01:15:02,000
So hopefully it shows that it's very useful to bundle data and behaviors together.

618
01:15:02,000 --> 01:15:10,000
So the ultimate goal when we're writing programs is to write code that's modular, organized, right?

619
01:15:10,000 --> 01:15:13,000
Because in the future you might want to build upon this code.

620
01:15:13,000 --> 01:15:17,000
In the future you might want to read this code to use it for something else.

621
01:15:17,000 --> 01:15:24,000
In the future other people might want to read this code or use this code, this class that you wrote, to build more complex classes.

622
01:15:24,000 --> 01:15:27,000
Like we use the coordinate class to build a circle class.

623
01:15:27,000 --> 01:15:33,000
Other people might use your circle class to build, I don't know, a sphere class or something like that, something more complicated.

624
01:15:33,000 --> 01:15:39,000
And so it's really nice to create these little data types that aren't organized, right, modular.

625
01:15:39,000 --> 01:15:44,000
And so we're basically bundling together these data, right?

626
01:15:44,000 --> 01:15:47,000
So what makes up your object and behaviors together?

627
01:15:47,000 --> 01:15:50,000
So we can use these objects in a nicely consistent way.

628
01:15:50,000 --> 01:15:54,000
So remember, back when we were learning about functions, right?

629
01:15:54,000 --> 01:15:58,000
The ideas of decomposition and abstraction were very important.

630
01:15:58,000 --> 01:16:06,000
So we had to use abstractions basically took a chunk of code and decompose them into one module that we could reuse many, many different places.

631
01:16:06,000 --> 01:16:10,000
And we abstracted away the details of the function through doc string.

632
01:16:10,000 --> 01:16:14,000
So people didn't have to slog through a whole bunch of code to figure out what the function did.

633
01:16:14,000 --> 01:16:19,000
All they did was read the doc string and they knew exactly what we wanted.

634
01:16:19,000 --> 01:16:26,000
Now object-oriented programming and Python classes have that same big decomposition abstraction energy, right?

635
01:16:26,000 --> 01:16:32,000
So we've got a bunch of modules that we're creating here, where we're bundling together data and behaviors, right?

636
01:16:32,000 --> 01:16:38,000
So we can create a whole bunch of objects that behave in the exact same way, nicely consistent.

637
01:16:38,000 --> 01:16:42,000
So that we know that if I create a coordinate object here, it's going to have an x and a y value.

638
01:16:42,000 --> 01:16:46,000
And if I create another coordinate object, it's also going to have an x and a y value.

639
01:16:46,000 --> 01:16:49,000
It's not suddenly going to have an x, y, and z value, right?

640
01:16:49,000 --> 01:17:01,000
So creating these objects that work in a consistent way is very decomposition and abstraction,

641
01:17:01,000 --> 01:17:06,000
working with the ideas of decomposition abstraction just like functions did.

642
01:17:06,000 --> 01:17:14,000
Okay. So next lecture, we will be starting on, we'll do a little bit more of these classes and then we'll start on inheritance.

643
01:17:14,000 --> 01:17:17,000
So having parents the objects that we created.

644
01:17:17,000 --> 01:17:18,000
All right.

