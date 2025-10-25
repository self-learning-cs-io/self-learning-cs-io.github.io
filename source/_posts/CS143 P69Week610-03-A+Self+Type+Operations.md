---
title: CS143 P69Week610 03 A+Self+Type+Operations
---

1
00:00:00,000 --> 00:00:08,480
In this video, we're going to continue our discussion of self-type by talking about the type

2
00:00:08,480 --> 00:00:11,839
level operations that are available on self-type.

3
00:00:11,839 --> 00:00:17,280
And this will help to clarify what self-type actually is and its role in the type system.

4
00:00:17,280 --> 00:00:23,519
So, let's begin by thinking about the example that we discussed last time.

5
00:00:23,519 --> 00:00:26,240
And if you've forgotten what that is, let me just write it down quickly.

6
00:00:26,239 --> 00:00:29,519
We had a class called count.

7
00:00:29,519 --> 00:00:36,079
And count had one field, an integer i, that was initial i as to zero.

8
00:00:36,079 --> 00:00:42,879
And it had one method called ink that returned something of type self-type.

9
00:00:42,879 --> 00:00:49,959
And all ink did was to increment the counterfield and return the self-object.

10
00:00:49,959 --> 00:00:55,519
And I've probably made some syntax errors here, but that's not really important.

11
00:00:55,520 --> 00:00:58,560
That's the basic code for the count class.

12
00:00:58,560 --> 00:01:02,480
And the question is, what can be the dynamic type of the object that's actually returned

13
00:01:02,480 --> 00:01:04,359
by ink?

14
00:01:04,359 --> 00:01:08,719
And the answer here is that it could be whatever is the type of the self-object, whatever

15
00:01:08,719 --> 00:01:12,359
is the dynamic type of the self-object.

16
00:01:12,359 --> 00:01:18,560
And if we think about a big program where there's multiple classes that inherit from count,

17
00:01:18,560 --> 00:01:27,760
then the answer is that ink could return count or any subclass of count.

18
00:01:27,760 --> 00:01:37,439
So, I was going to return something that's at least at most count.

19
00:01:37,439 --> 00:01:40,719
But it could return something more specific, the dynamic type could be something more specific.

20
00:01:40,719 --> 00:01:46,240
It could be a subclass of count or a subclass of a subclass of count.

21
00:01:46,239 --> 00:01:52,239
Anything that inherits directly or indirectly from count is a possibility.

22
00:01:52,239 --> 00:01:53,239
So what's the general case?

23
00:01:53,239 --> 00:02:01,039
Well, let's think about a class C. And in this class C, there's some expression buried

24
00:02:01,039 --> 00:02:04,640
somewhere inside of it that has the type self-type.

25
00:02:04,640 --> 00:02:09,519
And it doesn't really matter how that expression got the type self-type or what it is.

26
00:02:09,519 --> 00:02:12,479
Let's just say that it has that type somehow.

27
00:02:13,280 --> 00:02:17,479
Well, what are the possible dynamic types of the expression E?

28
00:02:17,479 --> 00:02:21,679
And from our discussion on the previous slide, it seems clear that the dynamic type of E,

29
00:02:21,679 --> 00:02:26,879
when you run E, you're going to get back something that's a subtype of the class C,

30
00:02:26,879 --> 00:02:29,879
the enclosing class in which the self-type appears.

31
00:02:29,879 --> 00:02:36,479
And that's interesting because it shows us that the meaning of self-type actually depends on the context.

32
00:02:36,479 --> 00:02:41,679
So what this self-type means, this self-type means a subtype of the class C.

33
00:02:41,680 --> 00:02:46,480
If I had written self-type in a class D, somewhere in the definition of class D,

34
00:02:46,480 --> 00:02:50,680
there it would mean a subtype of the class D.

35
00:02:50,680 --> 00:02:54,680
And so to remind ourselves what class we're talking about,

36
00:02:54,680 --> 00:02:59,879
what enclosing class we're talking about, we're going to subscript occurrences of self-type with a class name.

37
00:02:59,879 --> 00:03:08,080
So self-type sub C here is going to refer to a syntactic occurrence of the keyword self-type in the body of the class C.

38
00:03:08,080 --> 00:03:14,280
And this also suggests a very simple typing rule, and really the first useful fact about self-type,

39
00:03:14,280 --> 00:03:18,880
which is that self-type sub C is a subtype of C.

40
00:03:18,880 --> 00:03:27,680
And this is really a key idea here that a self-type in class C is some subtype of the class C.

41
00:03:27,680 --> 00:03:30,880
Because this also helps illustrate what self-type really is.

42
00:03:30,880 --> 00:03:34,880
The best way to think of an occurrence of self-type is that it's a type variable

43
00:03:34,879 --> 00:03:39,680
that ranges over all the subclasses of the class in which it appears.

44
00:03:39,680 --> 00:03:42,479
So self-type sub C, you should think of as a type variable.

45
00:03:42,479 --> 00:03:48,079
It's something that doesn't have a fixed type, but it's guaranteed to be some type bounded by C.

46
00:03:48,079 --> 00:03:53,879
So it's going to be only one of the classes that inherits directly or indirectly from the class C.

47
00:03:56,879 --> 00:04:02,879
Now that rule that self-type sub C is a subtype of the class C has an important consequence.

48
00:04:02,879 --> 00:04:08,079
It means that when we're doing type checking with self-type, it is always safe, always safe,

49
00:04:08,079 --> 00:04:10,479
to replace self-type sub C by C.

50
00:04:10,479 --> 00:04:16,879
So it's okay to promote any self-type sub C, which could be C or a subtype of C to just say,

51
00:04:16,879 --> 00:04:19,680
okay, we're just going to say that it's C.

52
00:04:20,879 --> 00:04:27,680
And that suggests one way to handle self-type, which is just to replace all the occurrences of self-type sub C by C.

53
00:04:27,680 --> 00:04:30,480
Now unfortunately, that turns out not to be very useful.

54
00:04:30,480 --> 00:04:32,480
It's sound, it's correct to do that.

55
00:04:32,480 --> 00:04:34,879
But that's really just like not having self-type at all.

56
00:04:34,879 --> 00:04:41,680
That's as if we went back to the example we did in the last video where we started out without self-type,

57
00:04:41,680 --> 00:04:45,280
and we found out we couldn't use inheritance in the way we expected.

58
00:04:47,680 --> 00:04:50,480
So to do better than just throwing all the self-types away,

59
00:04:50,480 --> 00:04:53,680
we need to incorporate self-type into the type system.

60
00:04:53,680 --> 00:04:58,879
And the way we're going to do that is by looking at the operations that work on types in the type system.

61
00:04:58,879 --> 00:05:00,079
And there are two of them.

62
00:05:00,079 --> 00:05:02,879
There's the subtype relationship that we've talked about before.

63
00:05:02,879 --> 00:05:04,879
So when one type is a subtype of another,

64
00:05:04,879 --> 00:05:09,680
and there's the least upper bound operation that tells us what the smallest type is,

65
00:05:09,680 --> 00:05:12,879
it's bigger than both of two argument types.

66
00:05:12,879 --> 00:05:18,879
And all we have to do, what we're going to do now, is extend these operations to handle the type self-type.

67
00:05:20,879 --> 00:05:22,879
So let's begin with the subtype relationship.

68
00:05:22,879 --> 00:05:26,879
And in our definition here, we're going to use some types T and T prime.

69
00:05:26,879 --> 00:05:31,279
And these are just normal class names. They are any class names, but not self-type.

70
00:05:33,279 --> 00:05:38,079
So one possibility is that we have self-type on both sides of our subtype relationship.

71
00:05:38,079 --> 00:05:45,279
And in that case, it's easy to see that self-type sub-sea should be a subtype of self-type sub-sea.

72
00:05:45,279 --> 00:05:49,279
So to convince yourself of this, think of self-type again as a variable.

73
00:05:49,279 --> 00:05:53,680
And we can plug in for that variable, any subtype of C.

74
00:05:54,079 --> 00:06:00,079
But just like variables in algebra, if we plug in one particular class for an occurrence of this variable,

75
00:06:00,079 --> 00:06:02,480
we have to pick the same one for every occurrence of the variable.

76
00:06:02,480 --> 00:06:09,280
So in particular, if we pick some subclass A of C, then we wind up with A is a subtype of A.

77
00:06:09,280 --> 00:06:12,879
If we plug in A for both sides, we can see that the relationship holds,

78
00:06:12,879 --> 00:06:14,879
similarly C is a subtype of C.

79
00:06:14,879 --> 00:06:18,879
And for any other subtype we might pick, if we bind the variable to that subtype,

80
00:06:18,879 --> 00:06:21,680
we can see that this relationship will be true.

81
00:06:22,079 --> 00:06:28,480
Now, another thing you might think is, well, what if the self-type sub-sea is compared with self-type from another class,

82
00:06:28,480 --> 00:06:30,879
say, self-types of D?

83
00:06:30,879 --> 00:06:34,879
And it turns out that in the cool type rules, this will just never come up.

84
00:06:34,879 --> 00:06:40,879
The cool type rules are written in such a way that we never need to compare self-types from different classes.

85
00:06:40,879 --> 00:06:46,079
And I haven't shown you that that's the case yet, but when we actually go through the type rules for self-type,

86
00:06:46,079 --> 00:06:48,079
you will see that it's true.

87
00:06:48,479 --> 00:06:55,680
Now, another possibility is that we have self-type on one side and then a regular type on the other side.

88
00:06:55,680 --> 00:06:59,279
So when is self-types of C a subtype of T?

89
00:06:59,279 --> 00:07:03,680
Well, we're going to say that that's true if C is a subtype of T.

90
00:07:03,680 --> 00:07:11,680
And here we're using our rule that it's always safe to replace self-type by the class that indexes it.

91
00:07:12,079 --> 00:07:17,879
So in this case, you can see it's in C is a super-type of anything that self-types of C could be.

92
00:07:17,879 --> 00:07:23,680
Clearly, if C is a subtype of T, if T is at least C, or possibly something higher in the class hierarchy,

93
00:07:23,680 --> 00:07:28,079
then T will be a super-type of anything that self-types of C could stand for.

94
00:07:30,480 --> 00:07:38,480
Another case is when we have a regular class name on the left-hand side of the sub-typing relationship and self-type on the right-hand side.

95
00:07:38,480 --> 00:07:42,879
And in this case, it turns out we have to say that this relationship is false.

96
00:07:42,879 --> 00:07:48,879
That so T is never a regular class name is never a subtype of self-type of C.

97
00:07:48,879 --> 00:07:51,680
And to see this, just think about the possibilities.

98
00:07:51,680 --> 00:07:55,280
So where could C and T be in the type hierarchy?

99
00:07:55,280 --> 00:08:02,879
So if T and C are unrelated, if they are inherent from object and they have nothing to do with each other,

100
00:08:03,279 --> 00:08:10,079
then clearly T can't be a subtype of self-type of C. They're just two unrelated classes.

101
00:08:10,079 --> 00:08:14,480
So the only way that this could possibly work out is if they're related somehow.

102
00:08:14,480 --> 00:08:21,279
Now, if T is a subtype of C, then you might think that this could work out.

103
00:08:21,279 --> 00:08:25,680
But it turns out that we can't allow it even in that case.

104
00:08:25,680 --> 00:08:27,680
And here's the reason why.

105
00:08:27,680 --> 00:08:31,680
Think about a hierarchy where T has some subclass.

106
00:08:31,680 --> 00:08:35,680
Let's just say that it has a subclass A.

107
00:08:35,680 --> 00:08:42,480
And now, because self-types of C ranges over all the possible subtypes of C,

108
00:08:42,480 --> 00:08:49,279
we could plug in A here and T is not a subtype of A. They're in the wrong relationship.

109
00:08:49,279 --> 00:08:53,680
And so because it doesn't work for all the possible values of subtype sub C,

110
00:08:53,679 --> 00:08:57,679
we can't say that this is true. We have to say that it is false.

111
00:08:57,679 --> 00:09:04,879
Now, there is one very special case where one could argue that we should allow this to be true.

112
00:09:04,879 --> 00:09:10,879
And that is in the case where T is actually a leaf of the class hierarchy.

113
00:09:10,879 --> 00:09:15,279
And let me actually draw this a little bit differently just to emphasize this.

114
00:09:15,279 --> 00:09:19,679
Let's say that C is a class up here and then T,

115
00:09:19,679 --> 00:09:24,479
you know, through some chain of inheritance relationships, is a subtype of C.

116
00:09:24,479 --> 00:09:27,679
So it's not immediate, but there might be other classes in between.

117
00:09:27,679 --> 00:09:31,679
Just emphasize this relationship doesn't have to be immediate inheritance.

118
00:09:31,679 --> 00:09:33,679
It could be transitive inheritance.

119
00:09:33,679 --> 00:09:37,679
And now, if T is a leaf of the hierarchy,

120
00:09:37,679 --> 00:09:43,679
and it is the only leaf of C, if C has no other subclasses,

121
00:09:43,679 --> 00:09:48,679
then in fact, T is a subtype of self-types of C.

122
00:09:48,679 --> 00:09:56,679
Because it is the unique minimal type that is in the subtype hierarchy of C.

123
00:09:56,679 --> 00:10:01,479
But the problem is that this is extremely fragile and doesn't work if you modify the program.

124
00:10:01,479 --> 00:10:06,679
In particular, a programmer might come along and add some class A over here

125
00:10:06,679 --> 00:10:10,679
that's unrelated to T, but is also a subclass of C.

126
00:10:10,679 --> 00:10:15,679
And now this would no longer work because if I plug in A for self-types of C,

127
00:10:15,679 --> 00:10:18,679
then I see that T is not a subtype of A.

128
00:10:18,679 --> 00:10:23,679
So we could allow it in the very special case that C had only a chain of inheritance.

129
00:10:23,679 --> 00:10:28,679
It's not a general tree under it and that T was the leaf of that chain.

130
00:10:28,679 --> 00:10:31,679
But that is so fragile to future program extensions.

131
00:10:31,679 --> 00:10:35,679
And if you broke it by adding another class over here,

132
00:10:35,679 --> 00:10:40,679
all of a sudden you would get type errors in pieces of code that had previously been type check to work

133
00:10:40,679 --> 00:10:44,679
and hadn't changed at all, it just wouldn't be a very nice language design.

134
00:10:44,679 --> 00:10:50,679
So summarize, T is never a subtype of self-types of C.

135
00:10:51,679 --> 00:10:56,679
And finally, if we're comparing two normal types with not self-type,

136
00:10:56,679 --> 00:10:58,679
then we just use the rules that we gave before.

137
00:10:58,679 --> 00:11:03,679
So the sub-typing rules we had for normal class names haven't changed at all.

138
00:11:03,679 --> 00:11:05,679
And that covers all four cases.

139
00:11:05,679 --> 00:11:10,679
We could have self-type on both sides, we could have self-type just on the left side or just on the right side.

140
00:11:10,679 --> 00:11:14,679
And finally, we could have a sub-typing relationship with no self-type at all.

