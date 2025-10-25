---
title: CS143 P90Week712 06 A+Object+Layout
---

1
00:00:00,000 --> 00:00:07,679
In the last several videos, we've discussed code generation for a very simple programming

2
00:00:07,679 --> 00:00:08,679
language.

3
00:00:08,679 --> 00:00:12,759
In this video, we're going to take a look at code generation for a more advanced feature

4
00:00:12,759 --> 00:00:14,560
objects.

5
00:00:14,560 --> 00:00:21,519
Fortunately, the standard code generation strategy for objects is really just an extension of

6
00:00:21,519 --> 00:00:22,519
what we've already learned.

7
00:00:22,519 --> 00:00:25,519
So, everything that you learned before we're going to be using, and then there's going to

8
00:00:25,519 --> 00:00:29,800
be some additional things that we do specifically for objects.

9
00:00:29,800 --> 00:00:34,840
And the important thing to know about objects is the slogan that you hear when people

10
00:00:34,840 --> 00:00:38,359
talk about object-oriented programming is this one.

11
00:00:38,359 --> 00:00:45,079
So if B is a subclass of A, then an object of class B can be used wherever an object of

12
00:00:45,079 --> 00:00:46,880
class A is expected.

13
00:00:46,880 --> 00:00:49,240
So there's a substitute ability property.

14
00:00:49,240 --> 00:00:55,920
If I have a piece of code that can work on A's, then it can also work on B's and any other

15
00:00:55,920 --> 00:00:57,920
subclass of A.

16
00:00:57,920 --> 00:01:03,960
Now what this means for the case of code generation is that the code that we generate

17
00:01:03,960 --> 00:01:04,960
for class A.

18
00:01:04,960 --> 00:01:11,240
So the code that we produce for methods in class A has to work unmodified for an object

19
00:01:11,240 --> 00:01:12,719
of class B.

20
00:01:12,719 --> 00:01:21,719
And to see this, keep in mind that when we compile class A, we may not even know all the subclasses

21
00:01:21,719 --> 00:01:22,719
of A.

22
00:01:22,719 --> 00:01:24,920
So those may not even have been defined yet.

23
00:01:24,920 --> 00:01:32,840
So in the future, some programmer may come along to find a subclass of A and our compiled

24
00:01:32,840 --> 00:01:39,159
version of A will have to work with that new subclass.

25
00:01:39,159 --> 00:01:44,120
So there are really only two questions that we have to answer to give a complete description

26
00:01:44,120 --> 00:01:46,840
of how to generate code for objects.

27
00:01:46,840 --> 00:01:50,480
The first one is how our objects represented in memory.

28
00:01:50,480 --> 00:01:54,480
So we need to decide on a layout and representation for objects.

29
00:01:54,480 --> 00:01:57,160
And the second one is how is dynamic the spatch implemented.

30
00:01:57,160 --> 00:02:01,800
So that's the characteristic feature of using objects as we can dispatch to a method in

31
00:02:01,800 --> 00:02:08,000
the object and we need an implementation of that.

32
00:02:08,000 --> 00:02:13,840
So to be concrete, we're going to use this little example throughout this video.

33
00:02:13,840 --> 00:02:17,360
And I'll just take a moment here to point out some features of it.

34
00:02:17,360 --> 00:02:19,360
So we have three classes.

35
00:02:19,360 --> 00:02:28,200
And classes A, B and C. Notice that A is a base class and B and C both inherit from A.

36
00:02:28,200 --> 00:02:36,360
And all three classes define some attributes, some fields, and also some methods.

37
00:02:36,360 --> 00:02:42,000
Now a couple of important features here is that notice that because B inherits from A and

38
00:02:42,000 --> 00:02:48,360
C inherits from A, they both inherit both of those classes inherit the attributes A and

39
00:02:48,360 --> 00:02:50,680
D from class A.

40
00:02:50,680 --> 00:02:58,120
So these two attributes that are defined in class A are available in class B and in class

41
00:02:58,120 --> 00:03:06,140
C. So even though there's no mention of A and D in the definition, say, of class B, the

42
00:03:06,140 --> 00:03:11,040
methods in class B can still refer to those attributes.

43
00:03:11,040 --> 00:03:17,800
They are part of the attributes of class B. They're just copied over or inherited from A.

44
00:03:17,800 --> 00:03:21,939
Another feature of this example that I'd like to point out is that all of the methods

45
00:03:21,939 --> 00:03:27,640
refer to the attribute A. So attribute A is referred to in this method and this one referred

46
00:03:27,640 --> 00:03:32,280
to twice in this method and also in this method.

47
00:03:32,280 --> 00:03:38,560
And the significance of this is just what we discussed a couple of slides ago.

48
00:03:38,560 --> 00:03:45,520
For all of these methods to work, attribute A is going to have to live in some place

49
00:03:45,520 --> 00:03:50,600
in some place where all of them can find it when they're generated code runs.

50
00:03:50,600 --> 00:03:58,760
So in particular, let's consider the method F. So the method F exists in all three classes.

51
00:03:58,760 --> 00:04:06,879
All three classes, when it runs, it will refer to the attribute A. And even though the objects

52
00:04:06,879 --> 00:04:10,360
would be different, in one case, it might be running on an A object, in another case, on

53
00:04:10,360 --> 00:04:14,520
a C object, it will need to be able to find the attribute A.

54
00:04:14,520 --> 00:04:21,800
And so therefore, the attribute A has to be in the same place in each object.

55
00:04:21,800 --> 00:04:25,439
And so how do we accomplish that? Well, the first principle is that objects are laid out

56
00:04:25,439 --> 00:04:33,720
in continuous memory. So an object is just a block of memory with no gaps and all the

57
00:04:33,720 --> 00:04:38,840
data for the object is stored in the words of that block of memory.

58
00:04:38,840 --> 00:04:42,720
And each attribute is stored at a fixed offset in the object.

59
00:04:42,720 --> 00:04:49,600
So for example, there may be a place in this object for attribute A. And in this case,

60
00:04:49,600 --> 00:04:56,800
it's in the middle of the object, in the fourth position. And no matter what kind of object

61
00:04:56,800 --> 00:05:03,040
it is, whether it's an A, B, or C object, in our example, attribute A will always live

62
00:05:03,040 --> 00:05:08,640
at that position so that any piece of code that refers to A, any method that refers to

63
00:05:08,639 --> 00:05:16,039
A can find the attribute. Now, the other thing that's important to understand, and this

64
00:05:16,039 --> 00:05:22,000
is slight digression from what we're talking about, but it's a key aspect of code generation

65
00:05:22,000 --> 00:05:29,560
for objects, is that when a method is invoked, the object itself is the self-parameter.

66
00:05:29,560 --> 00:05:37,279
So the self-parameter is this entire object. So self, when a function is invoked, will

67
00:05:37,279 --> 00:05:41,439
refer to the entire object. So you think of self as being a pointer to the entire object.

68
00:05:41,439 --> 00:05:49,919
And remember that self is like this variable or this name in Java. And then the fields will

69
00:05:49,919 --> 00:05:54,319
refer to particular or the attributes of the object will refer to particular positions within

70
00:05:54,319 --> 00:06:02,079
the object. So for example, the A attribute we decided lived there. So here is the particular

71
00:06:02,079 --> 00:06:08,639
object layout used in cool. So the first three words of a cool object contain header information.

72
00:06:08,639 --> 00:06:15,439
And every cool object always has these three entries. The first position is a class tag.

73
00:06:15,439 --> 00:06:21,120
It offs at 0, the next word, it offs at 4, is the size of the object, and then something called

74
00:06:21,120 --> 00:06:30,159
the dispatch pointer, and then all of the attributes. Now the class tag is an integer, which

75
00:06:30,160 --> 00:06:36,080
just identifies the class of the object. So the compiler will number all of the classes. So in

76
00:06:36,080 --> 00:06:41,040
our example, we had three classes, A, B, and C, and the compiler, for example, might assign them

77
00:06:41,040 --> 00:06:47,440
the numbers one, two, and three. And it doesn't matter what these numbers are as long as they are

78
00:06:47,440 --> 00:06:51,600
different from each other. So it doesn't have to be number consecutively or anything like that.

79
00:06:51,600 --> 00:06:57,840
The important thing is that the class tag is a unique identifier for a class. Each class has its own

80
00:06:57,839 --> 00:07:04,879
unique bit pattern that tells you what kind of class the object is. And the other fields here,

81
00:07:04,879 --> 00:07:09,919
the object size is also an integer, which is just the size of the object in words. And the dispatch

82
00:07:09,919 --> 00:07:16,639
pointer is a pointer to a table of methods. So the methods are stored off to the side, and the

83
00:07:16,639 --> 00:07:22,159
dispatch pointer is a pointer to that table. And we'll talk about this more later. And then all the

84
00:07:22,159 --> 00:07:27,599
attributes are laid out in the subsequent slots in some order that's determined by the compiler.

85
00:07:27,600 --> 00:07:33,040
So the compiler will fix and order for the attributes in the class, and then all the objects of

86
00:07:33,040 --> 00:07:39,120
that class will have the attributes of that class in the same order. And again, all of this is laid out

87
00:07:39,120 --> 00:07:48,160
in a continuous chunk of memory. Now we're ready to talk about how inheritance works. So the basic

88
00:07:48,160 --> 00:07:54,560
idea is that given a layout for a class A, a layout for a subclass B, so this is a subclass of A,

89
00:07:55,280 --> 00:08:03,120
can be defined by extending the layout of A. So we don't need to move any of the attributes of A,

90
00:08:03,759 --> 00:08:10,639
we can just add more fields onto the end of A's layout. And so that's going to leave the layout

91
00:08:10,639 --> 00:08:17,759
of A unchanged, which is a great property because this is how the position of an attribute in the

92
00:08:17,920 --> 00:08:25,120
object will always be the same for all the subclasses. So essentially, we will never, once we decide where

93
00:08:25,120 --> 00:08:30,639
an attribute lives in a class, it will never change for any of the subclasses of that object. So B

94
00:08:30,639 --> 00:08:37,679
is just going to be an extension of the layout of A. So let's take a look at our example here and

95
00:08:37,679 --> 00:08:43,919
see how that works. Let me just write down here a little bit about these classes because we don't

96
00:08:43,919 --> 00:08:51,120
have the example on the screen. So we had class A and class A had two attributes A and D.

97
00:08:51,120 --> 00:08:55,679
And it doesn't matter what their types are or what the methods were here. We're just looking

98
00:08:55,679 --> 00:09:00,799
at the class names and the names of the attributes that are defined in the class. And then we had B,

99
00:09:02,000 --> 00:09:10,879
which inherits from A and B added an attribute little B. And then we had C, which also inherits

100
00:09:10,879 --> 00:09:19,759
from A, but has no relationship to B. And class C defined an attribute little C.

101
00:09:22,559 --> 00:09:28,720
All right, so that's the structure of our example. This relevant to the layout of the objects.

102
00:09:29,840 --> 00:09:36,080
Okay, so let's talk about the layout of class A. So in position zero, it also zero, there'll be a tag

103
00:09:36,080 --> 00:09:42,080
for A. That'll be some small integer that the compiler picks. They'll be the size of A. We'll come

104
00:09:42,080 --> 00:09:46,800
back to that in just a second. There'll be the dispatch pointer, okay, which we're going to talk about

105
00:09:46,800 --> 00:09:54,000
later. And then come the attributes of A. And they're just laid out. The way it's done in the

106
00:09:54,000 --> 00:09:59,840
the cool C implementation is that they are laid out in the order in which they appear textually

107
00:09:59,840 --> 00:10:05,520
in the class. So in this case, first the attribute A and then the attribute D at offstates 12 and

108
00:10:05,519 --> 00:10:12,559
16. And now since the object, there were two attributes in three header words, that means that

109
00:10:12,559 --> 00:10:20,559
the size of the object is five words. And so it's a five that goes in the size field for A objects.

110
00:10:21,360 --> 00:10:27,919
Now let's take a look at B. Okay, so B is going to have a different tag. B objects will have a

111
00:10:27,919 --> 00:10:32,879
different tag. So they, to distinguish them from A objects, there's going to be an extra field.

112
00:10:32,879 --> 00:10:39,039
So the size will be one bigger. But now the layout preserves the layout of A. So the attributes of A

113
00:10:39,039 --> 00:10:45,200
appear in the same position. And you can think of there being an A object actually embedded inside

114
00:10:45,200 --> 00:10:54,000
of the B object. If I were to strip off the end here, if I were to just cover up this last bit

115
00:10:54,000 --> 00:11:01,440
here of B, I would see that this object here has the same size and the same attributes as an A object.

116
00:11:01,440 --> 00:11:08,080
And so any piece of code that could work on an A object will also make sense running on a B object.

117
00:11:08,080 --> 00:11:12,480
Now, of course, the tag is different because it actually is a subclass. And you know,

118
00:11:12,480 --> 00:11:16,560
and there is this extra fields of the size is different. But the point is that any code that refers

119
00:11:16,560 --> 00:11:23,440
just to the fields here will still work just fine. So any A method that was compiled to refer to

120
00:11:23,440 --> 00:11:29,040
the methods of an A object will still find those attributes in the same place in the B object.

121
00:11:29,039 --> 00:11:35,839
Now, of course, there is also one more field here, which is the new attribute of B. And I just

122
00:11:35,839 --> 00:11:41,599
get laid out after all of A's fields. So after all of A's fields come all of B's fields in the same

123
00:11:41,599 --> 00:11:47,519
order, which they appear textually in the class. Since there's only one, there's just one new field there.

124
00:11:47,519 --> 00:11:53,599
And now looking at class C, while the story with class C is very similar. So C has its own distinct tag.

125
00:11:53,680 --> 00:11:59,759
It also has one more attribute than A. So it has size 6. And now, again, the A attributes are in

126
00:11:59,759 --> 00:12:05,519
the same positions. And now the C attribute just comes after the A attribute. And so notice here

127
00:12:05,519 --> 00:12:11,680
that A methods, again, will work just fine on C objects because the attributes are in the same

128
00:12:11,680 --> 00:12:18,080
places. And so the methods will find the attributes were they expect to. You can not, however,

129
00:12:18,080 --> 00:12:27,200
call a method of class B on an object of class C, because they have different attributes in the

130
00:12:27,200 --> 00:12:32,000
third position. These may have completely different types. It may not make sense to invoke a B method

131
00:12:32,000 --> 00:12:36,960
on a C object. But that's just fine. Because if we look at our inheritance hierarchy over here,

132
00:12:36,960 --> 00:12:42,400
we see that B and C are actually unrelated. They are both subclasses of A, but they have no

133
00:12:42,400 --> 00:12:47,680
relationship to each other. B is not a subclass of C and C is not a subclass of B. And so

134
00:12:47,679 --> 00:12:53,919
anything beyond their shared ancestry with A can be completely different in the layout.

135
00:12:56,879 --> 00:13:03,039
So more generally, if we have a chain of inheritance relationships, let's say we have a base class

136
00:13:03,039 --> 00:13:11,359
A1 and A2 inherits from A1 and A3 inherits from A2 and so on with some class A n inheriting

137
00:13:12,240 --> 00:13:18,560
at the bottom of this chain after some long sequence of other intermediate subclasses,

138
00:13:18,560 --> 00:13:24,639
what is the layout of all these classes going to look like? Well, there's going to be a header,

139
00:13:24,639 --> 00:13:30,720
okay, the three word header. And that will be followed by A1's attributes and then followed by A2's

140
00:13:30,720 --> 00:13:38,000
attributes followed by A3's attributes and so on all the way down to A n's attributes down here.

141
00:13:38,480 --> 00:13:46,879
Okay, and if you look, again, something we talked about before, each prefix of this header is

142
00:13:46,879 --> 00:13:53,279
essentially a valid object, a valid one of these objects. If I look at the first set of attributes,

143
00:13:53,279 --> 00:13:58,080
everything up to the end of the A1 attributes, that forms a valid layout for an A1 object. If I stop

144
00:13:58,080 --> 00:14:03,279
at the A2 attributes, I have a valid layout for an A2 object going all the way from the header down to

145
00:14:04,240 --> 00:14:12,000
including the A1 and A2 objects. And then A3 includes all of A1, A2, and A3's attributes and so on,

146
00:14:12,000 --> 00:14:23,919
okay, and so each prefix of this object of this A n object has the correct layout for some superclass

147
00:14:23,919 --> 00:14:31,519
albeit.

