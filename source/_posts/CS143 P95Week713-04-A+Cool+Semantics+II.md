---
title: CS143 P95Week713 04 A+Cool+Semantics+II
---

1
00:00:00,000 --> 00:00:08,800
In this video, we're going to continue and complete our discussion of cool operational semantics.

2
00:00:08,800 --> 00:00:13,439
We'll be taking a look at the two most complex operations in Cool, the allocation of a new

3
00:00:13,439 --> 00:00:16,600
object and dynamic dispatch.

4
00:00:16,600 --> 00:00:24,160
We'll begin by giving an informal discussion of what happens when a new object is allocated

5
00:00:24,160 --> 00:00:25,760
in Cool.

6
00:00:25,760 --> 00:00:30,000
So the first thing that has to happen is we have to allocate space for the object and

7
00:00:30,000 --> 00:00:33,719
essentially that means having enough space for the object's attributes.

8
00:00:33,719 --> 00:00:38,960
So we're going to have to allocate a location for every attribute of the object of class

9
00:00:38,960 --> 00:00:44,079
t if what we're doing is allocating a new t object.

10
00:00:44,079 --> 00:00:49,320
Now we're going to set the attributes of that object to their default values and in a

11
00:00:49,320 --> 00:00:54,719
few minutes we'll say what the default values are and why we need to set the attributes

12
00:00:54,719 --> 00:00:56,519
to defaults.

13
00:00:56,519 --> 00:00:58,479
And then we evaluate the initializers.

14
00:00:58,479 --> 00:01:03,039
So every attribute in the class declaration can have an initializing expression.

15
00:01:03,039 --> 00:01:08,319
We're going to evaluate those and set the resulting attribute values.

16
00:01:08,319 --> 00:01:10,400
And then we return the newly allocated objects.

17
00:01:10,400 --> 00:01:14,879
So these are the steps that are involved in setting up a new object.

18
00:01:14,879 --> 00:01:18,280
And as you can see, it's actually more than just allocating a little bit of memory.

19
00:01:18,280 --> 00:01:27,120
It's actually quite a bit of computation going on in allocating new objects in Cool.

20
00:01:27,120 --> 00:01:30,879
Every class has a default value associated with that class.

21
00:01:30,879 --> 00:01:34,359
So for integers, the default value is zero.

22
00:01:34,359 --> 00:01:38,000
For Booleans, the default value is Boolean false.

23
00:01:38,000 --> 00:01:42,680
And for strings, the default value is the empty string.

24
00:01:42,680 --> 00:01:47,000
And then for any other class that isn't one of these three basic classes for any other

25
00:01:47,000 --> 00:01:51,840
class, the default value is void.

26
00:01:51,840 --> 00:01:57,000
In the operational rules, we're going to need a way to refer to the attributes of a class.

27
00:01:57,000 --> 00:02:04,159
So we're going to define a function called class that takes a class name and returns the list

28
00:02:04,159 --> 00:02:06,719
of attributes of that class.

29
00:02:06,719 --> 00:02:10,639
So here we have all the attributes of class A. Let's say they're A1 through An.

30
00:02:10,639 --> 00:02:15,120
And in addition, this function is also going to tell us for each attribute to declare type

31
00:02:15,120 --> 00:02:21,640
of the attribute and the expression that initializes the attribute.

32
00:02:21,640 --> 00:02:28,400
And one other important feature of this list is that it includes all the attributes of

33
00:02:28,400 --> 00:02:31,960
class A, including the inherited ones.

34
00:02:31,960 --> 00:02:36,280
And there's another detail, which is in what order these attributes appear.

35
00:02:36,280 --> 00:02:41,680
And this will actually become important when we define the semantics of how attributes

36
00:02:41,680 --> 00:02:43,640
are initialized.

37
00:02:43,639 --> 00:02:51,479
And the rule is that attributes are listed in greatest ancestor first order.

38
00:02:51,479 --> 00:02:55,799
Okay, what do I mean by that?

39
00:02:55,799 --> 00:03:07,739
Let's say that we have three classes, A, B, and C. And A, sorry, B inherits from A and

40
00:03:07,740 --> 00:03:13,140
C inherits from B.

41
00:03:13,140 --> 00:03:23,020
Okay, let's say that A defines two attributes, A1 and A2, and B defines two attributes, B1,

42
00:03:23,020 --> 00:03:29,180
B2, and C defines two attributes, C1 and C2.

43
00:03:29,180 --> 00:03:36,939
Then class of C will list the attributes in the following order.

44
00:03:36,939 --> 00:03:44,259
First we'll come A1 and then A2, because A is the greatest ancestor.

45
00:03:44,259 --> 00:03:48,819
It's the closest to the root of the object hierarchy.

46
00:03:48,819 --> 00:03:53,340
And the attributes within class A, or within any class, are always listed in the order in

47
00:03:53,340 --> 00:03:54,620
which they textually appear.

48
00:03:54,620 --> 00:03:56,579
So first comes A1 and A2.

49
00:03:56,579 --> 00:04:01,659
And of course, the type in the initializer are also listed here for both of these attributes.

50
00:04:01,659 --> 00:04:07,419
So we're just concentrating here on the order in which the information appears.

51
00:04:07,419 --> 00:04:13,939
So then next would come class B. So the attributes in class B would be next.

52
00:04:13,939 --> 00:04:18,860
And of course, there would be the type and initializer for those attributes.

53
00:04:18,860 --> 00:04:23,379
And then finally, the attributes of class C, again in the order in which they're listed

54
00:04:23,379 --> 00:04:24,860
in the class definition.

55
00:04:24,860 --> 00:04:29,060
Okay, so that defines the order of the attributes for any class.

56
00:04:29,060 --> 00:04:36,459
It's always in the order from greatest ancestor, down the inheritance chain to the class itself

57
00:04:36,459 --> 00:04:41,500
that is the argument of the class function.

58
00:04:41,500 --> 00:04:46,019
At this point, we're ready to actually define the formal semantics of new T.

59
00:04:46,019 --> 00:04:48,060
Let me switch colors here.

60
00:04:48,060 --> 00:04:55,300
So we're going to be allocating a new object of type T. And it's going to be in a context

61
00:04:55,300 --> 00:05:00,900
with self object as zero, environment E and store S.

62
00:05:00,900 --> 00:05:06,420
And the first thing we have to do is we have to figure out what kind of object it is that we're actually going to allocate.

63
00:05:06,420 --> 00:05:11,420
And the only question is whether T is a self type or not.

64
00:05:11,420 --> 00:05:15,019
Because remember, self type is not the name of an actual class.

65
00:05:15,019 --> 00:05:20,740
If T is not self type, then the class that we're going to allocate is actually a T.

66
00:05:20,740 --> 00:05:22,019
T is actually a class name.

67
00:05:22,019 --> 00:05:25,019
And that's the kind of object we're going to allocate.

68
00:05:25,019 --> 00:05:32,139
If T is self type, then the kind of object we're going to be allocating is whatever the class is of the self object.

69
00:05:32,139 --> 00:05:37,139
So we're going to look at the dynamic type here of the self object, call that X.

70
00:05:37,139 --> 00:05:40,899
And that will be the class that we create.

71
00:05:40,899 --> 00:05:43,139
That will be the kind of object that we create.

72
00:05:43,139 --> 00:05:45,019
All right, so there's two possibilities.

73
00:05:45,019 --> 00:05:48,539
Either object allocating an object of type T.

74
00:05:48,540 --> 00:05:56,580
If T is actually a class name, otherwise it's an object of the same dynamic type as the self object.

75
00:05:56,580 --> 00:06:03,060
All right, so now we go and look up what kind of object T zero is.

76
00:06:03,060 --> 00:06:09,540
All right, and we get out the list of attributes types and initializers for T zero.

77
00:06:09,540 --> 00:06:15,780
So this tells us what we have to do to construct an object of this type.

78
00:06:15,819 --> 00:06:19,619
All right, the next thing we do is we allocate locations for each of the attributes.

79
00:06:19,619 --> 00:06:25,979
So because there were in attributes, we're going to allocate in locations, one for each attribute.

80
00:06:25,979 --> 00:06:31,500
All right, and then we're going to create an object with the class tag T zero.

81
00:06:31,500 --> 00:06:35,859
And the attributes are going to be bound to these new locations.

82
00:06:35,859 --> 00:06:41,500
So the is attribute will be a bound to the is new location that we just allocated.

83
00:06:41,500 --> 00:06:44,339
And then we're going to update the store.

84
00:06:44,339 --> 00:06:46,459
Okay, it's going to take our initial store.

85
00:06:46,459 --> 00:06:48,859
You know, so this is the same as the store that we started with.

86
00:06:48,859 --> 00:06:54,179
We're going to take S and we're going to update it so that at these new locations,

87
00:06:54,179 --> 00:07:00,099
those locations hold the default values for the types of each of the attributes.

88
00:07:00,099 --> 00:07:03,299
Okay, and that gives us the store S one.

89
00:07:03,299 --> 00:07:09,859
And now we have to evaluate the initialize it to actually initialize the attributes.

90
00:07:09,860 --> 00:07:14,500
And we have to think about what the environment is in which those attributes are initialized.

91
00:07:14,500 --> 00:07:19,500
And remember, the rule is that within initializer of an attribute,

92
00:07:19,500 --> 00:07:23,060
all the attributes of the class are in scope.

93
00:07:23,060 --> 00:07:29,699
All right, so the environment, in this case, for the initializers, will just consist of the initialize

94
00:07:29,699 --> 00:07:32,340
or the attributes, excuse me themselves.

95
00:07:32,340 --> 00:07:34,580
Okay, so these are the attribute names.

96
00:07:34,579 --> 00:07:40,699
And the is attribute is bound to the is new memory location holding the value,

97
00:07:40,699 --> 00:07:44,060
the default value initially of that attribute.

98
00:07:44,060 --> 00:07:48,979
All right, and then finally, to evaluate the initializers, we just evaluate them as a block

99
00:07:48,979 --> 00:07:51,299
in the order in which they appeared in the class function.

100
00:07:51,299 --> 00:07:57,299
This is why it was important to specify the order in the class function.

101
00:07:57,299 --> 00:08:01,579
So remember that these attributes include all the inherited attributes.

102
00:08:01,579 --> 00:08:05,579
So we'll start by evaluating initializing attributes of the greatest ancestor

103
00:08:05,579 --> 00:08:10,899
and working our way down to the attributes declared within the class itself.

104
00:08:10,899 --> 00:08:14,779
Notice that the environment here, which has all the attributes in scope,

105
00:08:14,779 --> 00:08:16,259
this is an interesting point.

106
00:08:16,259 --> 00:08:23,099
This environment has nothing to do with the environment in which new T is actually evaluated.

107
00:08:23,099 --> 00:08:27,180
Now these environments, E and E prime, are completely separate.

108
00:08:27,180 --> 00:08:31,539
Okay, so new, so E prime has in scope, the names of the attributes,

109
00:08:31,580 --> 00:08:36,980
the class E is a, you know, is, is some other environment.

110
00:08:36,980 --> 00:08:40,700
There's some function somewhere that's calling new T and the variables that are in scope

111
00:08:40,700 --> 00:08:42,740
there are just completely different.

112
00:08:42,740 --> 00:08:49,500
Okay, but anyway, evaluating this block of initializers will yield some value

113
00:08:49,500 --> 00:08:51,500
and a new store.

114
00:08:51,500 --> 00:08:54,180
The value isn't used for anything, okay?

115
00:08:54,180 --> 00:08:57,259
But the new store is the final store.

116
00:08:57,259 --> 00:09:00,460
That's the store that we get out as a result of allocating the object.

117
00:09:00,460 --> 00:09:02,940
And then what is the result of new T?

118
00:09:02,940 --> 00:09:05,940
Well, it is the new object itself, V.

119
00:09:05,940 --> 00:09:10,620
To summarize the semantics of new,

120
00:09:10,620 --> 00:09:13,980
notice that the first three steps allocate the object.

121
00:09:13,980 --> 00:09:16,060
Those are things that actually allocate the memory for the object.

122
00:09:16,060 --> 00:09:21,700
And then the remaining steps initialize the object by evaluating a sequence of assignments.

123
00:09:21,700 --> 00:09:24,860
And the most important thing probably to understand about initialization

124
00:09:24,860 --> 00:09:28,220
or one of the most important things is the context in which,

125
00:09:28,220 --> 00:09:31,139
or the state in which the initializers are evaluated.

126
00:09:31,139 --> 00:09:34,100
So, notice that only the attributes are in scope, we emphasize that.

127
00:09:34,100 --> 00:09:36,500
And that's just, in the same rule as in typing.

128
00:09:36,500 --> 00:09:39,300
So, when you're type checking a class declaration,

129
00:09:39,300 --> 00:09:41,660
only the attributes are in scope of the, you know,

130
00:09:41,660 --> 00:09:43,379
for the initializers of the class.

131
00:09:43,379 --> 00:09:46,420
And then that's the same, naturally, the same thing that we use

132
00:09:46,420 --> 00:09:49,420
when we actually evaluate the initializers at runtime.

133
00:09:50,420 --> 00:09:54,259
And the initial values of the attributes are the default values.

134
00:09:54,259 --> 00:09:58,060
And we need the defaults because, precisely because

135
00:09:58,059 --> 00:10:01,139
the attributes are in scope inside their own initializers.

136
00:10:01,139 --> 00:10:03,899
So, it could be, for example,

137
00:10:03,899 --> 00:10:08,059
it's perfectly reasonable and cool to have an initializer.

138
00:10:08,059 --> 00:10:09,779
Let's say like this.

139
00:10:10,779 --> 00:10:15,859
And I'm just going to, I may leave out all the types here just to save time.

140
00:10:15,859 --> 00:10:19,459
But I can assign an attribute A, the value of A.

141
00:10:19,459 --> 00:10:22,699
And this is perfectly okay because the right-hand side of the initializer

142
00:10:22,699 --> 00:10:24,659
has all the attributes in scope.

143
00:10:24,659 --> 00:10:28,100
And for this to make sense, A has to have some kind of default value,

144
00:10:28,100 --> 00:10:30,179
has to have some initial value.

145
00:10:30,179 --> 00:10:33,100
So, because I might read it before I,

146
00:10:33,100 --> 00:10:38,899
I might read an attribute before I've actually finished computing its initializer.

147
00:10:39,659 --> 00:10:44,179
All right, and the last point here is that notice that in the initialization

148
00:10:44,179 --> 00:10:48,219
or in the, in the initialization of an object,

149
00:10:48,219 --> 00:10:53,179
self is, the object itself is the self object.

150
00:10:53,179 --> 00:10:54,379
And what do I mean by that?

151
00:10:54,379 --> 00:10:57,019
I forgot to mention this on the previous slide.

152
00:10:57,019 --> 00:10:59,500
Just flipping back to that slide for a moment.

153
00:10:59,500 --> 00:11:05,139
Notice here that in the evaluation of the initializers,

154
00:11:05,139 --> 00:11:09,100
what is the context, the self object is V.

155
00:11:09,100 --> 00:11:10,100
The self object is V.

156
00:11:10,100 --> 00:11:13,059
This is the new object that we have just constructed.

157
00:11:13,059 --> 00:11:16,419
And so it's perfectly fine for E1 through EN,

158
00:11:16,419 --> 00:11:20,100
the initialization expressions over here to refer to self.

159
00:11:20,100 --> 00:11:24,139
And what they will refer to if they use self is the object

160
00:11:24,139 --> 00:11:25,620
that is being initialized.

161
00:11:27,980 --> 00:11:30,460
All right, returning to this to our summary,

162
00:11:31,539 --> 00:11:34,819
you know, it might be a little bit of a surprise how complicated

163
00:11:35,740 --> 00:11:40,259
the semantics of new is in cool.

164
00:11:40,259 --> 00:11:44,019
And it's not just cool that has that property.

165
00:11:44,019 --> 00:11:49,620
In fact, every object-oriented language has a fairly complex semantics

166
00:11:49,620 --> 00:11:51,379
for the initialization of new objects.

167
00:11:51,379 --> 00:11:55,019
And it's a combination of features like inheritance

168
00:11:55,019 --> 00:11:59,460
and the ability of initializers to refer to the attributes

169
00:11:59,460 --> 00:12:01,820
that leads to this kind of complexity.

170
00:12:04,620 --> 00:12:07,939
Now let's talk about the semantics of dynamic dispatch.

171
00:12:07,939 --> 00:12:10,299
And we'll follow the same plan that we did

172
00:12:10,299 --> 00:12:11,939
with the semantics of new.

173
00:12:11,939 --> 00:12:14,460
First, I'll give an informal discussion,

174
00:12:14,460 --> 00:12:17,779
high-level description of how the evaluation

175
00:12:17,779 --> 00:12:19,259
of a dynamic dispatch works.

176
00:12:19,259 --> 00:12:22,419
And then we'll look at the formal operational rule.

177
00:12:23,259 --> 00:12:25,620
So the first thing that happens in evaluating the dispatches

178
00:12:25,620 --> 00:12:28,939
that will evaluate the arguments E1 through EN.

179
00:12:28,939 --> 00:12:32,700
And next, we'll evaluate the target object E0.

180
00:12:32,700 --> 00:12:34,860
So evaluate that expression to get the actual object

181
00:12:34,860 --> 00:12:36,100
to which we're dispatching.

182
00:12:37,539 --> 00:12:39,860
Next, we're going to look at the dynamic type

183
00:12:39,860 --> 00:12:40,860
of the target object.

184
00:12:40,860 --> 00:12:45,059
So after we evaluate E0, we're going to look at what its class tag is.

185
00:12:45,980 --> 00:12:48,740
And then we're going to use that type

186
00:12:48,740 --> 00:12:51,860
to figure out which function, which function F

187
00:12:51,860 --> 00:12:52,820
we're supposed to use.

188
00:12:52,820 --> 00:12:56,220
So we're going to go and look in the method table

189
00:12:56,220 --> 00:13:01,220
for the class X and see what method it has for F.

190
00:13:04,180 --> 00:13:07,620
Now we're going to create new locations and an environment

191
00:13:07,620 --> 00:13:08,820
for the call.

192
00:13:08,820 --> 00:13:10,419
So we're going to set up new locations

193
00:13:10,419 --> 00:13:12,460
for the actual parameters.

194
00:13:13,899 --> 00:13:16,340
We're going to initialize the locations

195
00:13:16,340 --> 00:13:18,139
with the actual arguments.

196
00:13:19,899 --> 00:13:22,620
We're going to set self to be the target object.

197
00:13:22,620 --> 00:13:26,379
And then we're going to evaluate the body of F.

198
00:13:29,340 --> 00:13:32,620
Now in order to do the lookup of a method in a class,

199
00:13:32,620 --> 00:13:34,340
we're going to need some representation

200
00:13:34,340 --> 00:13:36,620
of what methods exist in which classes

201
00:13:36,620 --> 00:13:38,540
in our operational rules.

202
00:13:38,540 --> 00:13:40,580
So we're going to find a function impulse stands

203
00:13:40,580 --> 00:13:42,139
for implementation.

204
00:13:42,139 --> 00:13:47,139
And the implementation in a class A of a method F

205
00:13:47,139 --> 00:13:52,059
is going to be, first of all, the list of formal parameters.

206
00:13:52,059 --> 00:13:55,059
So it's going to tell us what the formal parameters are of F.

207
00:13:55,059 --> 00:13:58,860
And then the body of F, whatever the function body of F is.

208
00:14:01,740 --> 00:14:04,259
Now we're ready to actually discuss the details

209
00:14:04,259 --> 00:14:08,700
of the formal operational semantics of method dispatch in cool.

210
00:14:08,700 --> 00:14:11,299
And I'm going to switch colors here.

211
00:14:11,299 --> 00:14:13,139
Again, just for contrast.

212
00:14:13,139 --> 00:14:14,899
So as we said, the first thing we do

213
00:14:14,899 --> 00:14:17,219
is we evaluate the end arguments.

214
00:14:17,219 --> 00:14:20,299
So these first end lines take care of that.

215
00:14:20,299 --> 00:14:23,740
And notice that each argument that's evaluated may have side effects.

216
00:14:23,740 --> 00:14:28,059
So it starts in some store, but it may produce a different store.

217
00:14:28,059 --> 00:14:29,699
So after we've done all of this,

218
00:14:29,699 --> 00:14:34,500
we have the end arguments evaluated and some store as sub-end.

219
00:14:35,500 --> 00:14:38,859
The next thing that happens is we evaluate E0.

220
00:14:38,860 --> 00:14:41,500
This is the expression to which we are dispatching.

221
00:14:41,500 --> 00:14:44,820
And that will give us an object V0

222
00:14:44,820 --> 00:14:47,860
and some updated store as sub-end plus one.

223
00:14:49,220 --> 00:14:51,820
And now we have to inspect V0.

224
00:14:51,820 --> 00:14:56,139
We want to know what's inside of V0 or what V0 is made of.

225
00:14:56,139 --> 00:15:00,659
And in particular, we're interested in the class tag of V0.

226
00:15:00,659 --> 00:15:04,740
And we'll also be interested in the contents of its attributes,

227
00:15:04,740 --> 00:15:07,220
the locations associated with its attributes.

228
00:15:07,220 --> 00:15:10,980
So first let's focus on the class tag.

229
00:15:10,980 --> 00:15:12,420
Because we're going to use that class.

230
00:15:12,420 --> 00:15:14,779
Remember, this is the dynamic type of V0.

231
00:15:14,779 --> 00:15:17,899
This is what kind of object V0 actually is

232
00:15:17,899 --> 00:15:19,540
when the program is running.

233
00:15:19,540 --> 00:15:23,139
And we're going to use that class to look up

234
00:15:23,139 --> 00:15:24,860
the definition of F that we should run.

235
00:15:24,860 --> 00:15:30,019
So we look for the method F in class X.

236
00:15:30,019 --> 00:15:31,940
We want to know its implementation.

237
00:15:31,940 --> 00:15:35,779
And in particular, we get the names of the formal parameters.

238
00:15:35,779 --> 00:15:37,459
X1 through Xn.

239
00:15:37,459 --> 00:15:43,100
And we get the body of the function or method.

240
00:15:43,100 --> 00:15:45,579
So the next thing we have to do is we

241
00:15:45,579 --> 00:15:50,500
have to allocate space in the memory or in the store

242
00:15:50,500 --> 00:15:53,419
for the actual parameters of the method call.

243
00:15:53,419 --> 00:16:01,620
So we allocate N new locations, one for each actual argument.

244
00:16:01,620 --> 00:16:05,459
And now we're ready to build an environment in which we

245
00:16:05,460 --> 00:16:08,340
can evaluate the method.

246
00:16:08,340 --> 00:16:10,540
So what is this environment going to consist of?

247
00:16:10,540 --> 00:16:14,180
So we have to think about what names are in scope inside

248
00:16:14,180 --> 00:16:15,220
of a method.

249
00:16:15,220 --> 00:16:18,740
Well, all the attributes of the class are in scope.

250
00:16:18,740 --> 00:16:23,100
So this is a class X with attributes A1 through EM.

251
00:16:23,100 --> 00:16:27,540
So the environment will have those names defined A1 through EM.

252
00:16:27,540 --> 00:16:30,860
And now what are the actual locations of those attributes?

253
00:16:30,860 --> 00:16:33,980
Well, those are the locations of V0.

254
00:16:33,980 --> 00:16:35,620
That's the object that we're dispatching to.

255
00:16:35,620 --> 00:16:37,740
That's going to be the self object.

256
00:16:37,740 --> 00:16:43,580
And the attribute names will refer to the attributes of self.

257
00:16:43,580 --> 00:16:48,820
So the locations here are the locations of the attributes

258
00:16:48,820 --> 00:16:51,060
in the object V0.

259
00:16:51,060 --> 00:16:54,019
Now, in addition, the formal parameters

260
00:16:54,019 --> 00:16:57,620
are also in scope inside of the method body.

261
00:16:57,620 --> 00:17:02,500
So we add to this environment with just the attributes,

262
00:17:02,500 --> 00:17:05,380
all of the formal parameters.

263
00:17:05,380 --> 00:17:09,420
And they are at the new locations,

264
00:17:09,420 --> 00:17:14,579
L sub X1 up to L sub Xn.

265
00:17:14,579 --> 00:17:19,740
And notice the one slight subtlety about the way this is defined.

266
00:17:19,740 --> 00:17:21,619
We're taking an initial environment,

267
00:17:21,619 --> 00:17:25,740
which I'll show here, with the color of these braces in blue.

268
00:17:25,740 --> 00:17:28,539
So we're defining initial environments of the attributes.

269
00:17:28,539 --> 00:17:31,539
And then we're doing updates to that.

270
00:17:31,539 --> 00:17:36,779
So we're, instead of just defining X1 to map to L sub X1,

271
00:17:36,779 --> 00:17:40,619
we're saying we're replacing the definition of X1

272
00:17:40,619 --> 00:17:43,220
in this environment in the blue braces

273
00:17:43,220 --> 00:17:45,379
with one that maps X1 to L of X1.

274
00:17:45,379 --> 00:17:46,779
And why do we do it that way?

275
00:17:46,779 --> 00:17:51,259
Well, the thing is that a method may have a formal parameter

276
00:17:51,259 --> 00:17:54,099
that is the same as an attribute name.

277
00:17:54,099 --> 00:17:59,019
So for example, I could have a class A that has an attribute

278
00:17:59,019 --> 00:18:01,139
with a layer in it.

279
00:18:01,139 --> 00:18:10,339
And it also has a method F that takes a formal parameter named A.

280
00:18:10,339 --> 00:18:12,180
And if I do that, and of course I'm leaving out

281
00:18:12,180 --> 00:18:14,220
types and lots of other things here,

282
00:18:14,220 --> 00:18:16,619
so here I have an attribute named A that's declared.

283
00:18:16,619 --> 00:18:20,019
And then I have a method that takes an argument called A.

284
00:18:20,019 --> 00:18:23,420
And now the question is, when I refer to A inside

285
00:18:23,420 --> 00:18:26,299
of the body of the method, what A do I get?

286
00:18:26,299 --> 00:18:30,460
Is this A bind to the formal parameter?

287
00:18:30,460 --> 00:18:31,899
Is it bind to the attribute?

288
00:18:31,899 --> 00:18:34,099
And the answer, we have to give one answer or the other.

289
00:18:34,099 --> 00:18:38,539
The answer in cool is that it binds to the formal parameter.

290
00:18:38,539 --> 00:18:42,619
That hides the outer name.

291
00:18:42,619 --> 00:18:46,740
And that's enforced here in the rule by these updates.

292
00:18:46,740 --> 00:18:49,779
So if a formal parameter has the same name as one

293
00:18:49,779 --> 00:18:53,339
of the attributes, it will replace the definition

294
00:18:53,339 --> 00:18:56,139
of the attribute in the environment.

295
00:18:56,140 --> 00:18:58,300
OK, once you have the environment set up,

296
00:18:58,300 --> 00:19:00,980
we need to set up our store.

297
00:19:00,980 --> 00:19:02,500
What are the changes to the store?

298
00:19:02,500 --> 00:19:05,380
Well, we just have to store the actual value of each argument

299
00:19:05,380 --> 00:19:09,140
at the location for that argument.

300
00:19:09,140 --> 00:19:13,020
And finally, we're ready to evaluate the function body.

301
00:19:13,020 --> 00:19:16,180
And the interesting part here is the context in which that's done.

302
00:19:16,180 --> 00:19:23,660
So notice here that the self object in the context of running

303
00:19:23,660 --> 00:19:28,100
the method F is the object to which we're dispatching.

304
00:19:28,100 --> 00:19:30,060
And then the environment is e prime.

305
00:19:30,060 --> 00:19:31,500
In the new environment, we just set up.

306
00:19:31,500 --> 00:19:34,019
And once again, notice that this is a complete change

307
00:19:34,019 --> 00:19:36,740
of context that e prime, the environment e prime,

308
00:19:36,740 --> 00:19:39,259
has nothing to do with the environment e.

309
00:19:39,259 --> 00:19:42,980
e prime is built completely from scratch using only information

310
00:19:42,980 --> 00:19:44,140
about the method we're calling.

311
00:19:44,140 --> 00:19:48,420
It doesn't borrow anything from the environment

312
00:19:48,420 --> 00:19:52,220
where the method originated, where the method was called from.

313
00:19:52,220 --> 00:19:55,860
And finally, all of this is done in the store

314
00:19:55,860 --> 00:19:58,900
that reflects all the side effects performed

315
00:19:58,900 --> 00:20:01,940
by evaluating the arguments, by evaluating e0,

316
00:20:01,940 --> 00:20:06,380
and by extending the store with locations

317
00:20:06,380 --> 00:20:07,819
for the actual parameters.

318
00:20:07,819 --> 00:20:10,860
So evaluate the body of the method.

319
00:20:10,860 --> 00:20:13,860
We get back a value and another updated store.

320
00:20:13,860 --> 00:20:16,819
And that value in store are the result

321
00:20:16,819 --> 00:20:22,659
of the entire execution of the dynamic dispatch.

