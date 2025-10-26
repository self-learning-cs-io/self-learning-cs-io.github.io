---
title: MIT6042J P15161SetsDefinitionsVideo
---

1
00:00:00,000 --> 00:00:10,359
We're going to look at the most fundamental of all mathematical data types, namely sets.

2
00:00:10,359 --> 00:00:16,719
And let's begin with the definitions.

3
00:00:16,719 --> 00:00:22,240
So informally, a set is a collection of mathematical objects.

4
00:00:22,240 --> 00:00:27,080
And the idea is that you treat the collection of objects as one new object.

5
00:00:27,079 --> 00:00:28,959
And that's a working definition.

6
00:00:28,959 --> 00:00:31,759
But of course, it really might help a little bit.

7
00:00:31,759 --> 00:00:33,079
But it's a circular definition.

8
00:00:33,079 --> 00:00:36,879
This is not math yet, because I haven't defined what a collection is.

9
00:00:36,879 --> 00:00:40,640
And a collection is no clearer or easier to define than a set is.

10
00:00:40,640 --> 00:00:47,280
So let's try to work up the idea of sets by looking at some examples.

11
00:00:47,280 --> 00:00:49,159
So we've already talked about some familiar ones.

12
00:00:49,159 --> 00:00:54,840
There's the real numbers for which we had this symbol R in a special font.

13
00:00:54,840 --> 00:01:01,160
And the complex numbers C and the integers Z.

14
00:01:01,160 --> 00:01:04,680
And we might have mentioned, and you might have seen already,

15
00:01:04,680 --> 00:01:13,000
the idea of the empty set for which we use this symbol that looks like a zero with a line through it.

16
00:01:13,000 --> 00:01:15,320
Let's look at an example, tough pin things down.

17
00:01:15,320 --> 00:01:18,400
Let's look at this set of four things.

18
00:01:18,400 --> 00:01:22,680
Namely, it's got two numbers, pi over two and seven.

19
00:01:22,680 --> 00:01:27,080
A character string, in quotes, Albert R.

20
00:01:27,080 --> 00:01:29,760
And the Boolean value true.

21
00:01:29,760 --> 00:01:31,520
So those are the four different things in it.

22
00:01:31,520 --> 00:01:33,000
They're of mixed type.

23
00:01:33,000 --> 00:01:38,680
And you might not like to have a mixed type like this in a programming language,

24
00:01:38,680 --> 00:01:44,160
but mathematicians don't worry about such things very much readily.

25
00:01:44,160 --> 00:01:48,360
Anyway, the first observation is that the order in which

26
00:01:48,359 --> 00:01:50,400
these elements are listed doesn't matter.

27
00:01:50,400 --> 00:01:54,239
This set, where the braces indicates that it's the set of these things,

28
00:01:54,239 --> 00:01:59,920
is the same if I listed T first, then the string, then the two numbers last.

29
00:01:59,920 --> 00:02:03,959
There is no notion of order in a set.

30
00:02:03,959 --> 00:02:06,799
Now, our computer scientist, this is a little unnatural.

31
00:02:06,799 --> 00:02:10,039
The most natural thing would be to define a sequence of things,

32
00:02:10,039 --> 00:02:12,280
like the sequence that began with seven,

33
00:02:12,280 --> 00:02:16,759
then had the character string, then had the number, then had the Boolean.

34
00:02:16,759 --> 00:02:22,879
And you can get by with working with lists of things, as long as they're finite.

35
00:02:22,879 --> 00:02:28,120
But they very quickly get out of hand when you have to talk about, say,

36
00:02:28,120 --> 00:02:32,239
a set of lists, then it's not clear how to make a list that of those.

37
00:02:32,239 --> 00:02:35,199
And you wind up needing sets again.

38
00:02:35,199 --> 00:02:40,959
So sets, in fact, are an unavoidable kind of idea.

39
00:02:40,959 --> 00:02:45,439
So another basic thing to understand about the notion of a set is that an element

40
00:02:45,439 --> 00:02:48,000
is either in a set or not in a set.

41
00:02:48,000 --> 00:02:51,159
So if I write down seven pi over two seven,

42
00:02:51,159 --> 00:02:55,159
this is the same description of the same set, the seven pi over two.

43
00:02:55,159 --> 00:02:58,639
I'm just telling you the same thing twice here that seven is in the set,

44
00:02:58,639 --> 00:03:00,840
and the seven is in the set again.

45
00:03:00,840 --> 00:03:04,120
So no notion of being in the set more than once.

46
00:03:04,120 --> 00:03:08,400
Now, sometimes technically you want to add a notion of so-called multi-sets

47
00:03:08,400 --> 00:03:11,719
in which elements can be in a set of certain number of times,

48
00:03:11,719 --> 00:03:12,919
an integer number of times.

49
00:03:12,919 --> 00:03:14,599
But there's no real need for that.

50
00:03:14,599 --> 00:03:16,199
It's a secondary idea.

51
00:03:16,199 --> 00:03:20,120
And from our point of view, you're in or out of a set if you repeat elements,

52
00:03:20,120 --> 00:03:23,919
it's the same as mentioning them once.

53
00:03:23,919 --> 00:03:27,439
So the most fundamental feature of a set is what's in it.

54
00:03:27,439 --> 00:03:29,639
And for that, there's a special notation.

55
00:03:29,639 --> 00:03:33,159
So we'll say that x is a member of a, where a is a set,

56
00:03:33,159 --> 00:03:36,400
and use this epsilon symbol to indicate membership.

57
00:03:36,400 --> 00:03:39,079
It's red x is a member of a.

58
00:03:39,079 --> 00:03:43,240
So for example, pi over two is a member of that set that we saw before

59
00:03:43,240 --> 00:03:45,320
that had pi over two in it.

60
00:03:45,320 --> 00:03:47,640
14 over two is also a member of that set,

61
00:03:47,640 --> 00:03:51,159
because 14 over two is just another description of seven.

62
00:03:51,159 --> 00:03:54,400
When I write seven here, I don't mean the character seven.

63
00:03:54,400 --> 00:03:55,560
I mean the number seven.

64
00:03:55,560 --> 00:03:58,920
And so 14 over two is the description of the same number.

65
00:03:58,920 --> 00:03:59,960
It's in that set.

66
00:03:59,960 --> 00:04:04,040
On the other hand, pi over three is a number that's simply not in that set.

67
00:04:04,040 --> 00:04:07,960
So I'm using the epsilon with a vertical bar through it,

68
00:04:07,960 --> 00:04:11,480
or some kind of a line through it to mean not a member of.

69
00:04:13,560 --> 00:04:16,800
And membership is so basic that there's a lot of different ways to say it.

70
00:04:16,800 --> 00:04:19,639
Besides using the membership symbol, x is a member of a.

71
00:04:19,639 --> 00:04:24,840
You can sometimes say x is an element of a, or x is in a,

72
00:04:24,840 --> 00:04:29,519
as well as x is a member of a, the rule synonyms.

73
00:04:29,519 --> 00:04:32,960
So for example, seven is a member of the integer.

74
00:04:32,960 --> 00:04:35,439
Z is our symbol for the integers.

75
00:04:35,439 --> 00:04:38,759
Two thirds is not a member of the integers,

76
00:04:38,759 --> 00:04:40,000
because it's a fraction.

77
00:04:40,000 --> 00:04:41,560
That's not an integer.

78
00:04:41,560 --> 00:04:46,040
And on the other hand, the set z of integers itself is a member of this three

79
00:04:46,040 --> 00:04:49,839
elements set consisting of the truth value t,

80
00:04:49,839 --> 00:04:53,120
the set of all integers, and the element seven.

81
00:04:53,120 --> 00:04:58,160
So here's an example where a set contains sets, quite big ones even.

82
00:04:58,160 --> 00:04:59,160
And that's fine.

83
00:04:59,160 --> 00:05:04,000
We just, that's not any problem mathematically.

84
00:05:04,000 --> 00:05:07,199
Related membership is another fundamental notion of subset.

85
00:05:07,199 --> 00:05:10,600
So a is a subset of b, it's pronounced.

86
00:05:10,600 --> 00:05:14,680
So that horizontal, with a line under it,

87
00:05:14,680 --> 00:05:18,080
is meant to resemble a less than or equal to symbol.

88
00:05:18,080 --> 00:05:20,920
So you can think of it as being a is less than or equal to b,

89
00:05:20,920 --> 00:05:22,439
but don't overload the symbols.

90
00:05:22,439 --> 00:05:27,360
Less than or equal to is used on numbers and other things that we know how to order.

91
00:05:27,360 --> 00:05:32,760
And this is an operation that's only allowed between sets.

92
00:05:32,760 --> 00:05:36,160
So a is a subset of b, a synonym is that a is contained in b,

93
00:05:36,160 --> 00:05:41,640
simply means that every element of a is also an element of b.

94
00:05:41,640 --> 00:05:45,680
And if I wrote that out in predicate logic notation,

95
00:05:45,680 --> 00:05:53,680
as a predicate formula, I'd say for every x, x is in a, implies x is in b.

96
00:05:53,680 --> 00:06:00,400
If it's in a, then it's in b, everything in a is in b.

97
00:06:00,400 --> 00:06:05,720
So some examples of the subset relation are that the integers are a kind of,

98
00:06:05,720 --> 00:06:08,040
an integer is a special case of a real number.

99
00:06:08,040 --> 00:06:11,480
So the set of integers is a subset of the real numbers.

100
00:06:11,480 --> 00:06:14,200
A real number is a special case of a complex number.

101
00:06:14,200 --> 00:06:18,040
So the real numbers are a subset of the complex numbers.

102
00:06:18,040 --> 00:06:22,880
And here's a concrete example where I have a set of three things, five, seven, and three.

103
00:06:22,880 --> 00:06:26,800
And this is the set with just the element three in it.

104
00:06:26,800 --> 00:06:30,960
Now, we sometimes are sloppy about distinguishing the element three

105
00:06:30,960 --> 00:06:34,800
from the set that consisting of just three as it's only element.

106
00:06:34,800 --> 00:06:38,639
But in fact, it's a pretty important distinction to keep track of.

107
00:06:38,639 --> 00:06:43,639
In this case, three is not a subset of this set on the right.

108
00:06:43,639 --> 00:06:47,480
But the set consisting of three is a subset of the set on the right.

109
00:06:47,480 --> 00:06:50,960
Because after all, the only member of this set is three.

110
00:06:50,960 --> 00:06:54,840
And that is a member of this set.

111
00:06:54,840 --> 00:06:58,920
A consequence of this general definition is that every set is a subset of itself.

112
00:06:58,920 --> 00:07:03,280
Because everything in a is in a, that's not really very interesting.

113
00:07:03,279 --> 00:07:08,959
Another important general observation is that the empty set is a subset of everything.

114
00:07:08,959 --> 00:07:11,079
The empty set is a subset of every set.

115
00:07:11,079 --> 00:07:13,279
Let's look at why that is in more detail.

116
00:07:13,279 --> 00:07:17,679
So the claim is that the empty set is a subset of everything.

117
00:07:17,679 --> 00:07:19,079
It would be any old set.

118
00:07:19,079 --> 00:07:21,119
Then the empty set is a subset of B.

119
00:07:21,119 --> 00:07:24,359
What exactly does that mean, according to the definition of subset?

120
00:07:24,359 --> 00:07:28,679
Well, it says that everything that's in the empty set,

121
00:07:28,679 --> 00:07:32,519
if it's in the empty set, then it implies that it's in B.

122
00:07:32,519 --> 00:07:37,120
For every element, if it's in the empty set, then it's in B.

123
00:07:37,120 --> 00:07:39,399
Well, what do we know about this?

124
00:07:39,399 --> 00:07:43,680
The assertion that X is in the empty set is false.

125
00:07:43,680 --> 00:07:47,199
No matter what X is, there's nothing in the empty set.

126
00:07:47,199 --> 00:07:53,680
And now I have an implication that implies where the left hand side, the hypothesis is false.

127
00:07:53,680 --> 00:07:58,719
That means that the whole implication is true and it doesn't depend on what B is.

128
00:07:58,719 --> 00:08:00,000
I'm not even going to look at B.

129
00:08:00,000 --> 00:08:02,920
I can see that X is in empty set as false.

130
00:08:02,920 --> 00:08:05,879
So the whole implication is true.

131
00:08:05,879 --> 00:08:10,519
And so what I'm saying is that for everything, every X, something that's true has to be true.

132
00:08:10,519 --> 00:08:11,519
Well, it is.

133
00:08:11,519 --> 00:08:17,959
And that's why the empty set is a subset of B satisfies this definition in a formal way.

134
00:08:17,959 --> 00:08:24,560
And this is an example of why that convention that false implies anything is convenient and

135
00:08:24,560 --> 00:08:25,839
is made use here.

136
00:08:25,839 --> 00:08:36,399
So when you're defining sets, if they're small, you can just list the elements.

137
00:08:36,399 --> 00:08:44,360
And as we did with that set with 7 and pi over 2 and Albert R, sometimes we can even describe

138
00:08:44,360 --> 00:08:50,480
infinite sets as some kind of a list like I might describe the set of integers as saying,

139
00:08:50,480 --> 00:08:54,279
well it's 0, 1, minus 1, 2, minus 2, and so on.

140
00:08:54,279 --> 00:08:56,639
And you don't understand that.

141
00:08:56,639 --> 00:09:03,960
But in general, if I'm describing a set that is not so easy to list, say the real numbers,

142
00:09:03,960 --> 00:09:08,920
then what I'm going to do is define a set by a defining property of in the set.

143
00:09:08,920 --> 00:09:13,519
So I'm interested in a property, P of elements.

144
00:09:13,519 --> 00:09:18,920
And I'm going to look at the set of elements X that are in some set A, such that P of X is true.

145
00:09:18,919 --> 00:09:21,240
And that's how we, that's the notation we use.

146
00:09:21,240 --> 00:09:28,039
So this would be red is the set of X in A such that P of X holds that X has property P.

147
00:09:28,039 --> 00:09:33,439
So notice this vertical bar is red as such that it's just a mathematical abbreviation.

148
00:09:33,439 --> 00:09:38,639
This is those elements in A that have property P that P of X holds for.

149
00:09:38,639 --> 00:09:41,079
That defines a set of those elements.

150
00:09:41,079 --> 00:09:42,120
Let's look at a simple example.

151
00:09:42,120 --> 00:09:47,959
The set E of even integers is simply the set of numbers N that are integers such that

152
00:09:47,960 --> 00:09:49,720
N is even.

153
00:09:49,720 --> 00:09:57,000
So in this case, the property P of N means that N is even.

154
00:09:57,000 --> 00:10:00,600
One last concept is the concept of the power set.

155
00:10:00,600 --> 00:10:07,440
So the power set of a set A is all of the subsets of A.

156
00:10:07,440 --> 00:10:14,240
So we could define it using set notation as it's the set of B such that B is a subset of

157
00:10:14,240 --> 00:10:16,840
A.

158
00:10:16,840 --> 00:10:24,240
An example would be, let's take the power set of the two Boolean values true and false.

159
00:10:24,240 --> 00:10:29,280
So the power set of true and false of that set consisting of two elements is, well, what

160
00:10:29,280 --> 00:10:30,720
are some of its subsets?

161
00:10:30,720 --> 00:10:34,879
The set consisting of just true is a subset of true, true, true false.

162
00:10:34,879 --> 00:10:36,560
So is the set consisting of false.

163
00:10:36,560 --> 00:10:38,080
And so is the whole thing.

164
00:10:38,080 --> 00:10:39,800
It's a subset of itself.

165
00:10:39,799 --> 00:10:47,519
And one final element, the empty set, is a subset of the set of Boolean values true

166
00:10:47,519 --> 00:10:48,639
and false.

167
00:10:48,639 --> 00:10:53,319
So the power set of this two elements set is a set that has four things in it, one, two

168
00:10:53,319 --> 00:10:58,199
elements of size one, one element of size two, one element of size zero.

169
00:10:58,199 --> 00:11:02,120
And that's going to be a general phenomenon that we'll examine more later, how big is

170
00:11:02,120 --> 00:11:06,759
the power set of a set.

171
00:11:06,759 --> 00:11:12,840
The even numbers, e, that we just defined on the previous slide is a member of the power

172
00:11:12,840 --> 00:11:19,639
set of Z because it's a subset of integers, even integers or a special case of integers.

173
00:11:19,639 --> 00:11:25,720
And the integers are a member of the power set of R. That's just a synonym for saying that

174
00:11:25,720 --> 00:11:28,879
integers are a subset of reals.

175
00:11:28,879 --> 00:11:30,279
Every integer is a real.

176
00:11:30,279 --> 00:11:34,720
So the integers are a subset of reals, which means they're a member of the power set of

177
00:11:34,720 --> 00:11:35,720
reals.

178
00:11:35,720 --> 00:11:41,800
So the general property is that a set B is a member of the power set of A if and only

179
00:11:41,800 --> 00:11:49,840
if B is a subset of A. That was the defining condition for power set.

180
00:11:49,840 --> 00:11:52,720
And that's a fact to remember.

181
00:11:52,720 --> 00:11:58,440
And it may potentially confuse you, but it's a good exercise to keep in keeping track

182
00:11:58,440 --> 00:12:05,440
and the difference between is a member of and is a subset of.

