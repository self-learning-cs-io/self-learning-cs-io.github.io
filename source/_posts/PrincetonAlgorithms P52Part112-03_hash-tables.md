---
title: PrincetonAlgorithms P52Part112 03_hash Tables
---

1
00:00:00,000 --> 00:00:06,400
Welcome back. Today we're going to look at hashing, which is another approach to implementing

2
00:00:06,400 --> 00:00:13,640
symbol tables that can also be very effective in practical applications. Here's our summary

3
00:00:13,640 --> 00:00:18,960
where we left off with red-black BSTs where we could get guaranteed logarithmic performance

4
00:00:18,960 --> 00:00:25,800
for a broad range of symbol table operations. And the question is, can we do better than

5
00:00:25,800 --> 00:00:32,160
that? Is logarithmic performance the best we can do? And the answer is that actually we

6
00:00:32,160 --> 00:00:38,719
can, but it's a different way of accessing the data and also doesn't support ordered

7
00:00:38,719 --> 00:00:44,960
operations. But there's plenty of applications where the extra speed for search and insert

8
00:00:44,960 --> 00:00:54,159
that we can get this way is worthwhile. The basic plan is to think of the symbol table

9
00:00:54,159 --> 00:01:03,239
as really try to reduce the problem to being like an array. And what we do is use a function

10
00:01:03,239 --> 00:01:12,359
known as a hash function that takes the key, our symbol table key, and reduces it to an

11
00:01:12,359 --> 00:01:21,319
integer, an array index. And we use that array index to store the key and the value in an

12
00:01:21,319 --> 00:01:27,279
array, maybe the value in a parallel array. Now there's a lot of issues in doing this. First

13
00:01:27,279 --> 00:01:34,639
thing is we need to be able to compute the hash function. That is easy for some types of data,

14
00:01:34,639 --> 00:01:43,639
but it can get complicated for more complicated types of data. Then the other thing is that instead

15
00:01:43,639 --> 00:01:48,919
of doing compare to's, we're going to be doing equality tests. So we have to be sure we've got

16
00:01:48,920 --> 00:01:54,200
the method that we want for checking whether two keys are equal. All we're going to do is look

17
00:01:54,200 --> 00:02:01,680
in the table and try to see if the key that's there is equal to the key we're looking for. And then

18
00:02:01,680 --> 00:02:11,319
there's the problem of collision resolution where since there are so many possible values for

19
00:02:11,319 --> 00:02:17,719
a typical data type, we're going to get the situation where two values hash to the same array

20
00:02:17,719 --> 00:02:23,319
index. And we need a collision resolution strategy to try to figure out what to do in that case.

21
00:02:23,319 --> 00:02:29,199
In these things are not difficult, but they're all worth articulating as separate issues that we

22
00:02:29,199 --> 00:02:38,360
have to deal with in order to get an effective symbol table implementation. The hashing really at

23
00:02:38,360 --> 00:02:45,719
its core is a classic space time trade-off. If we had no limitation on space at all, then we could

24
00:02:45,719 --> 00:02:53,479
have a very huge array with space for every possible key and just use the key itself as an index.

25
00:02:53,479 --> 00:03:00,199
If our keys are 32-bit integer keys and we've got a table of size 2 to 30 second, then we're just fine.

26
00:03:00,199 --> 00:03:08,360
If there were no time limitation at all, then I would just hash everything to the same place and then

27
00:03:08,360 --> 00:03:15,240
do sequential search. But sequential search can be slow if we have lots of keys. So

28
00:03:15,719 --> 00:03:21,159
what hashing is kind of in the real world where we're trying to trade off this idea that we don't

29
00:03:21,159 --> 00:03:26,280
have unlimited space and we also don't have unlimited time so we're trying to find something in between.

30
00:03:28,520 --> 00:03:34,439
So we'll look at hash functions, separate chaining, and then two collision resolution methods

31
00:03:34,439 --> 00:03:42,600
called separate chaining and linear perving. Now we'll look at the implementation of hash functions.

32
00:03:43,239 --> 00:03:51,000
So, idealistically what we'd like is to be able to take any key and uniformly scramble it to

33
00:03:51,000 --> 00:03:57,560
produce a table index. We have two requirements. One is that we have to be able to compute the

34
00:03:57,560 --> 00:04:04,120
thing efficiently in a reasonable amount of time. And the other is that it should be the case that

35
00:04:04,120 --> 00:04:12,280
every table index is equally likely for each key. Now mathematicians and computer scientists have

36
00:04:12,280 --> 00:04:18,920
researched this problem in a lot of detail and there's quite a bit known about it. But in practice,

37
00:04:18,920 --> 00:04:26,120
this is something that still we have to worry about somewhat. So for example, let's suppose that

38
00:04:26,120 --> 00:04:33,000
our keys are phone numbers. Probably a bad idea to use the first three digits of the phone number

39
00:04:33,000 --> 00:04:37,879
as a hash function because so many phone numbers will have the same area code and it's not equally

40
00:04:37,879 --> 00:04:44,360
likely that each phone number has the same first three digits. You have a better chance using

41
00:04:44,360 --> 00:04:50,279
the last three digits. But actually in most cases, I want to find a way to use all the data.

42
00:04:51,159 --> 00:04:55,560
Another example is social security numbers. Again, it's not too good to use the first three

43
00:04:55,560 --> 00:05:01,159
digits because they're associated with some geographic region and it's better to try to use the

44
00:05:01,160 --> 00:05:09,320
last three digits. And the real practical challenge with hashing is that developing a hash function is

45
00:05:09,320 --> 00:05:15,400
that every type of key needs a hash function and you need a different approach for every key type.

46
00:05:15,400 --> 00:05:20,120
Now for standard keys like integers and strings and doubles and so forth,

47
00:05:21,879 --> 00:05:27,560
we can count on the implement designers and implementers of Java to implement good hash functions.

48
00:05:27,560 --> 00:05:32,600
But if we're going to be implementing symbol with our own types of data,

49
00:05:32,600 --> 00:05:36,519
we're going to have to worry about these things in order to get a hash function that's effective.

50
00:05:36,519 --> 00:05:45,240
That leads to an effective symbol table implementation. So hashing is widely used for systems programming

51
00:05:45,240 --> 00:05:51,800
and applications. So some conventions for hashing are built into Java. In particular,

52
00:05:51,800 --> 00:05:59,800
all Java classes inherit a method called hash code which is returns a 32-bit int value.

53
00:06:01,000 --> 00:06:06,439
And it's a requirement that if x and y are equal, then their hash code should be equal.

54
00:06:07,480 --> 00:06:17,800
So that's something that is a convention that's built into Java and that enables the hash code

55
00:06:17,800 --> 00:06:25,720
to be used for hashing. Also, of course, if they're not equal, then it'd like it to be that their

56
00:06:25,720 --> 00:06:31,879
hash codes are not equal, but you can't always get that. Now the default implementation

57
00:06:32,600 --> 00:06:39,240
for hashing is the memory address of the object. For hashing an object is the memory address of

58
00:06:39,240 --> 00:06:45,960
an object. So that kind of meets these two requirements for Java. The one that it doesn't maybe

59
00:06:45,959 --> 00:06:53,319
meet is the idea that every table position should be equally likely. So usually we'll do some

60
00:06:53,319 --> 00:07:00,839
more work to try to make that one happen. As far as the algorithms go, as far as the rules go,

61
00:07:00,839 --> 00:07:09,159
you could always return 17. That's legal. It doesn't have this highly desirable attribute,

62
00:07:09,879 --> 00:07:15,560
but everything would compile. So you have to be a little careful that somebody isn't in there.

63
00:07:15,959 --> 00:07:24,759
Doing that. So Java has customized implementations for the standard data types that people would use

64
00:07:24,759 --> 00:07:32,759
for symbol table keys, and that's the sweet spot for hashing, where some expert has done

65
00:07:32,759 --> 00:07:40,199
implementation of the hash code, and also your application does not need ordering.

66
00:07:41,159 --> 00:07:46,439
But for user defined types, you're on your own, and we'll talk a little bit about how to implement

67
00:07:46,439 --> 00:07:56,439
hash codes. So here's the Java library implementations for a few standard types. They are what they are,

68
00:07:57,000 --> 00:08:05,079
and what we'll do is with knowledge that that's what the hash code is, we'll do some extra work to

69
00:08:05,079 --> 00:08:11,800
try to get this extra property that every table position should seem to be equally likely.

70
00:08:11,800 --> 00:08:16,839
So if it's an integer, the hash code's supposed to be 32 bits. The integer's supposed to be 32 bits,

71
00:08:16,839 --> 00:08:23,159
so they just return the value. If it's a bullion, they pick out a couple of particular values that

72
00:08:23,159 --> 00:08:30,839
they return. So hashing bullion types, there's only two different values. So well, it's hard to

73
00:08:30,839 --> 00:08:39,000
think about what you really might want there. For double value, this is the code. They convert to

74
00:08:39,000 --> 00:08:46,360
64-bit and X-or the most significant 32 bits with the least significant 32 bits. This illustrates

75
00:08:46,360 --> 00:08:50,600
something that you want to do if you have a lot of bits. You want to try to involve all the bits

76
00:08:50,600 --> 00:08:59,639
somehow in the hash function. And for strings, it kind of treats the string as a huge number.

77
00:09:00,840 --> 00:09:09,639
And then really computes the value of that number, mod 32. It uses an arithmetic

78
00:09:11,560 --> 00:09:19,800
a way of evaluating a polynomial or a number, so-called Hörner's Method, where for each digit,

79
00:09:19,800 --> 00:09:27,720
you just multiply. So it treats it as a base 31 number. And to get to compute that whole number,

80
00:09:27,720 --> 00:09:35,160
you multiply 31 times what you have so far and add the next digit. And that's called Hörner's

81
00:09:35,160 --> 00:09:40,600
Rule. And if you're familiar with it, fine. If you're not, you can look at this little example

82
00:09:40,600 --> 00:09:47,240
and decide what it is. And again, it involves all the characters of the string in computing the

83
00:09:47,480 --> 00:10:02,360
hash function. And actually, since strings are immutable, what Java does is keep the hash value

84
00:10:02,360 --> 00:10:10,759
in an instance variable, so it only gets computed once. And that is going to be very effective for

85
00:10:10,759 --> 00:10:16,200
performance in lots of applications. So once it computes the hash code, it stores it as an instance

86
00:10:16,200 --> 00:10:20,520
variable. And the next time you ask for the hash code, that string, it'll just provide it.

87
00:10:20,520 --> 00:10:30,200
And that works because strings are immutable. So how about implementing a hash code for our own

88
00:10:30,200 --> 00:10:37,800
type of data? And so we might have a, our transaction type might have a couple of instance variables,

89
00:10:37,800 --> 00:10:45,640
a string, a date, and a double. And we need to compute a hash code. So we turn a 32-bit

90
00:10:46,600 --> 00:10:53,799
value. And again, we want to try to make use of all the pieces of data that we have. And we also

91
00:10:53,799 --> 00:11:01,720
want to make use of the hash code implementations for the types of data that we're using. So one thing

92
00:11:02,519 --> 00:11:09,399
to do is start out with some small prime number. And this kind of mimics Hörner's method

93
00:11:10,120 --> 00:11:15,159
to just add in more data as we get it. So we pick some other small prime number.

94
00:11:16,279 --> 00:11:23,480
And for each field, we multiply by 31 and then add the hash code for that field.

95
00:11:25,240 --> 00:11:32,120
So if it's a reference type, we just use the hash code. So who is a string? So string is a

96
00:11:32,120 --> 00:11:37,559
hash code method. So we add that in and date, wins a date. So we add that hash code,

97
00:11:37,559 --> 00:11:43,239
multiply by 31 and add that hash code in. Trying to take all the bits and scramble all the bits and

98
00:11:43,239 --> 00:11:49,959
use them. And for primitive types, take the wrapper type and use the hash code. So that's a

99
00:11:51,639 --> 00:11:58,039
a simple example of implementing a hash code for our own type of data that might include

100
00:11:58,759 --> 00:12:04,839
several different types of instance variables. So that's a standard recipe.

101
00:12:05,720 --> 00:12:12,280
Use the 31X plus Y rule to combine all the fields. If it's a primitive type, use the wrapper hash

102
00:12:12,280 --> 00:12:19,480
code. If the field's null, return zero. If it's a reference type, use that hash code and apply

103
00:12:19,480 --> 00:12:25,720
it recursively. And if you have an array, you have to apply it to each entry or actually Java

104
00:12:25,720 --> 00:12:33,560
implements that in the array in its array's library. So this recipe works pretty well in practice.

105
00:12:33,559 --> 00:12:45,159
And it's used in several in Java's libraries. Now in theory, it's possible to do something that

106
00:12:45,159 --> 00:12:56,519
has the property that all positions are equally likely. It's called universal ashronctions.

107
00:12:56,600 --> 00:13:01,480
These things exist, but they're not so widely applied in practice.

108
00:13:02,919 --> 00:13:08,840
So the basic rule is if you're computing your own, try to use the whole key, but consult an expert

109
00:13:09,480 --> 00:13:16,120
if you're seeing some performance problems or you really want to be certain in some performance

110
00:13:16,120 --> 00:13:27,399
critical situation. Now what we get back from the hash code is a int value that's between minus

111
00:13:27,399 --> 00:13:35,879
2 to the 31st and 2 to the 31st minus 1. Now what we need is if we have a table of size m,

112
00:13:36,759 --> 00:13:42,680
an array of size m that we're going to use to store the keys, we need an int value between zero

113
00:13:42,679 --> 00:13:51,879
and m minus 1. And the value of m is maybe a power of 2 or sometimes we pick a prime

114
00:13:52,919 --> 00:14:01,159
because of the way that we normally would get the big hash code value down to be a number

115
00:14:01,159 --> 00:14:09,079
between zero and m minus 1 is to just do mod m. And if mod, if m is a prime then from math,

116
00:14:10,040 --> 00:14:15,720
modular arithmetic we know that we're using all the bits and the number in that point too.

117
00:14:16,759 --> 00:14:24,120
Now since the hash code can be negative, this doesn't quite work the way this arithmetic is

118
00:14:24,120 --> 00:14:32,200
implemented in Java because it's one in a billion times. You really have to take the absolute value.

119
00:14:32,520 --> 00:14:40,759
Well sorry, you have to take the absolute value because otherwise it'd be negative and you can't

120
00:14:40,759 --> 00:14:45,240
have a negative, you want to be between zero and a minus 1. But even if you take the absolute value,

121
00:14:46,200 --> 00:14:54,440
there's going to have minus 2 to the 31st is possible. So you have to just take the 31 bits.

122
00:14:55,320 --> 00:14:59,320
You get the hash code out, make it positive and then mod m is the way to go.

123
00:14:59,320 --> 00:15:08,200
The math doesn't quite work out right. So anyway, that code down at the bottom is, you can

124
00:15:08,840 --> 00:15:16,040
use that as a template for what you might want to do. That's what we do in order to get the hash code

125
00:15:16,760 --> 00:15:23,960
to be a number between zero and m minus 1. And if m is prime it gives us some comfort that we have

126
00:15:24,440 --> 00:15:32,280
some possibility of each table position appearing with equal likelihood. So that's our assumption that

127
00:15:32,280 --> 00:15:39,560
each key is equally likely to hash to an integer between zero and m minus 1. And this assumption,

128
00:15:39,560 --> 00:15:46,680
again, it's with work, it's possible to come close to this. Lots of researchers have done good work

129
00:15:46,679 --> 00:15:55,799
to show this. So we'll assume that as a starting point. And that allows us to model the situation with

130
00:15:55,799 --> 00:16:02,679
the so-called bins and balls model that directly relates the study of hash functions to classical

131
00:16:02,679 --> 00:16:11,879
probability theory. So we've got m bins, that's our, that's our corresponds to our hash table.

132
00:16:12,679 --> 00:16:19,559
And we've got m balls and we have some number of balls, however many keys we have. And we throw

133
00:16:19,559 --> 00:16:27,000
them uniformly at random into m bins. And these things are studied in classical combinatoric analysis.

134
00:16:27,000 --> 00:16:34,519
For example, there's the birthday problem, which how many balls do you throw before you find two

135
00:16:34,519 --> 00:16:40,200
hitting the same bin when you get the first collision? And the answer to that is it's about

136
00:16:40,200 --> 00:16:47,720
square root of pi m over 2. When does all the bins fill up? That's called the coupon collector problem.

137
00:16:47,720 --> 00:16:55,160
After about m natural log m tosses, every bin has at least one ball. And those are just examples of

138
00:16:55,960 --> 00:17:02,440
classic results from combinatorial analysis that help us understand what happens when we do this,

139
00:17:02,440 --> 00:17:09,480
which is what we're doing with hashing. And we'll look at more advanced versions of these problems

140
00:17:09,480 --> 00:17:19,319
when we want to study hashing. And in particular, it's known that after you've thrown m balls into the

141
00:17:19,319 --> 00:17:29,720
m bins, then the most loaded bin has about log m over log m balls. So that's going to help us get

142
00:17:29,720 --> 00:17:35,559
a handle on the performance of hashing algorithms when we get to the implementations.

143
00:17:35,960 --> 00:17:47,000
So this is just an example showing all the words in a tale of two cities using the modular hashing

144
00:17:47,000 --> 00:17:53,480
function for strings like the one that Javi uses. And they're pretty uniformly distributed. That's the

145
00:17:54,519 --> 00:17:57,319
summary for hash functions.

