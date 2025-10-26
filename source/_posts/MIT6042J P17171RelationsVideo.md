---
title: MIT6042J P17171RelationsVideo
---

1
00:00:00,000 --> 00:00:08,759
You've seen a lot of functions in introductory calculus,

2
00:00:08,759 --> 00:00:13,160
trig functions, rational functions, exponentials, logs, and so on.

3
00:00:13,160 --> 00:00:18,240
I don't know whether your calculus course has included a general discussion of functions.

4
00:00:18,240 --> 00:00:21,039
The old fashioned ones didn't.

5
00:00:21,039 --> 00:00:26,839
And we will go into that now in this segment and we're going to be interpreting functions

6
00:00:26,839 --> 00:00:29,240
as a special case of binary relations.

7
00:00:29,239 --> 00:00:31,639
So let's just say what a binary relation is.

8
00:00:31,639 --> 00:00:37,320
A binary relation is a mathematical object that associates elements of one set called the domain

9
00:00:37,320 --> 00:00:39,920
with elements of another set called the co-domain.

10
00:00:39,920 --> 00:00:46,000
And I'm going to give you a bunch of examples of binary relations in a short moment,

11
00:00:46,000 --> 00:00:50,840
but let's just talk about what their foreign, what their role is.

12
00:00:50,840 --> 00:00:56,840
So they may be familiar to you as computer scientists if you've worked with any relational

13
00:00:56,840 --> 00:01:01,880
databases like SQL or my SQL, my SQL.

14
00:01:01,880 --> 00:01:07,800
And we'll see an example that indicates where the original ideas behind those relational

15
00:01:07,800 --> 00:01:10,200
databases came from.

16
00:01:10,200 --> 00:01:16,640
But even more fundamental relations are one of the most basic mathematical abstractions

17
00:01:16,640 --> 00:01:18,840
right after sets.

18
00:01:18,840 --> 00:01:22,600
And they play role everywhere.

19
00:01:22,600 --> 00:01:26,600
We're going to be looking in later lectures at special kinds of binary relations like

20
00:01:26,599 --> 00:01:34,719
equivalence relations and partial orders and numerical congruences.

21
00:01:34,719 --> 00:01:41,159
But today we're going to set up the machinery to be using binary relations for counting,

22
00:01:41,159 --> 00:01:46,359
which will be another important application in this class.

23
00:01:46,359 --> 00:01:49,919
So let's look at an example.

24
00:01:49,919 --> 00:01:55,599
And I'm going to take one of the close to home, the registered for relation, which is

25
00:01:55,599 --> 00:01:57,759
a relation between students.

26
00:01:57,759 --> 00:01:59,679
That's going to be the domain.

27
00:01:59,679 --> 00:02:04,759
In this case, four students, Jason, Joan, Ewe and Adam.

28
00:02:04,759 --> 00:02:14,919
And subjects for subjects as a coincidence, 6042, 003, 012, and 004.

29
00:02:14,919 --> 00:02:22,120
And the relation R is going to be indicated by arrows, which show just which students are

30
00:02:22,120 --> 00:02:26,680
associated with which subjects, meaning that they're registered for that subject.

31
00:02:26,680 --> 00:02:34,000
So if we look at Jason, we can see that there's a particular arrow connecting Jason and

32
00:02:34,000 --> 00:02:36,039
6042.

33
00:02:36,039 --> 00:02:40,680
And what that tells us is that Jason is registered for 6042.

34
00:02:40,680 --> 00:02:46,120
Now there's a bunch of notations that are used with respect to binary relations.

35
00:02:46,120 --> 00:02:49,759
So let's look at some.

36
00:02:49,759 --> 00:02:54,000
One way to write it is if you think of the relation R as like an equality sign or a less

37
00:02:54,000 --> 00:02:59,039
than sign where it's normally written in the middle of the two things that it's connecting

38
00:02:59,039 --> 00:03:07,159
as in this example, Jason R6042, that would be called in fixed notation.

39
00:03:07,159 --> 00:03:12,439
Sometimes it's written as a binary predicate, R of Jason, 6042.

40
00:03:12,439 --> 00:03:18,560
That would be kind of prefix notation where the relation or operator comes first.

41
00:03:18,560 --> 00:03:24,719
And then if you start being a little closer to the formal definition of what a binary relation

42
00:03:24,719 --> 00:03:30,719
is, you could say that the ordered pair, Jason, 6042, is a member of the relation.

43
00:03:30,719 --> 00:03:35,560
If you want to be really precise, you would say that it was a member of the graph of the

44
00:03:35,560 --> 00:03:36,560
relation.

45
00:03:36,560 --> 00:03:44,280
And I'll come back and elaborate further on what the graph of a relation is and what this

46
00:03:44,280 --> 00:03:47,480
ordered pair's business is.

47
00:03:47,479 --> 00:03:50,039
And for now, just let's continue with this example.

48
00:03:50,039 --> 00:03:56,079
And a basic concept with relations is the idea of the image of a bunch of domain elements

49
00:03:56,079 --> 00:03:57,839
under the relation.

50
00:03:57,839 --> 00:04:03,719
So you can think of the relation as an operator that applies to domain elements or even sets

51
00:04:03,719 --> 00:04:05,239
of domain elements.

52
00:04:05,239 --> 00:04:12,519
So if I write R of Jason, that defines the subjects that Jason is registered for.

53
00:04:12,520 --> 00:04:19,040
So looking at the picture, R is not a function so that there may be more than one subject,

54
00:04:19,040 --> 00:04:25,400
as is you'd expect for a student to be registered for multiple courses at MIT.

55
00:04:25,400 --> 00:04:32,439
So Jason in this diagram is registered for 6042 and 6012 as indicated by the highlighted

56
00:04:32,439 --> 00:04:40,280
to a connection arrows, which we've made red, which means that R of Jason is that set

57
00:04:40,279 --> 00:04:46,559
of two courses that he's associated with or that are associated with him, that he's registered

58
00:04:46,559 --> 00:04:50,199
for 6042 and 6012.

59
00:04:50,199 --> 00:04:56,079
So at this point, we've applied R to one domain element, one student Jason.

60
00:04:56,079 --> 00:05:00,479
But the interesting case is when you apply R to a bunch of students.

61
00:05:00,479 --> 00:05:06,559
So the general setup is that if X is a set of students, a subset of the domain, which

62
00:05:06,560 --> 00:05:13,560
we've been showing in green, then if I apply R to X, it gives me all the subjects that

63
00:05:13,560 --> 00:05:17,519
they're taking among them, all the subjects that any one of them is taken.

64
00:05:17,519 --> 00:05:19,519
Let's take a look at an example.

65
00:05:19,519 --> 00:05:24,759
Well, another way to say it, I guess, is that R of X is everything in R that relates to

66
00:05:24,759 --> 00:05:27,759
things in X.

67
00:05:27,759 --> 00:05:34,959
So if I look at Jason and E.way, and I want to know what are they connected, what are

68
00:05:34,959 --> 00:05:37,079
they connected to under R?

69
00:05:37,079 --> 00:05:40,680
These are the subjects that Jason or E.way is registered for.

70
00:05:40,680 --> 00:05:46,099
The way I'd find that is by looking at the arrow diagram, and I'd find that Jason is

71
00:05:46,099 --> 00:05:52,399
taking 042 and 012 and E.way is taking 012 and 004.

72
00:05:52,399 --> 00:05:55,879
So between them, they're taking three courses.

73
00:05:55,879 --> 00:06:05,959
So R of Jason and E.way is in fact 042, 012 and 004.

74
00:06:05,959 --> 00:06:12,240
So another way to understand this idea of the image of a set, R of X, is that X is a set

75
00:06:12,240 --> 00:06:17,719
of points in the set that you're starting with called the domain.

76
00:06:17,719 --> 00:06:24,319
And R of X is going to be all of the end points in the other set, the codomane, that start

77
00:06:24,319 --> 00:06:25,600
at X.

78
00:06:25,600 --> 00:06:32,680
If I said that as a statement in formal logic or in set theory with logical notation, I would

79
00:06:32,680 --> 00:06:45,920
say that R of X is the set of J in subjects such that there is a D in X such that D R J.

80
00:06:45,920 --> 00:06:54,760
So what that's exactly saying that D R J says that D is the starting point in the domain.

81
00:06:54,759 --> 00:06:59,800
D is a student. J is a subject.

82
00:06:59,800 --> 00:07:07,399
D R J means there's an arrow that goes from student D to subject J. And we're collecting

83
00:07:07,399 --> 00:07:15,920
the set of those J's that start at some D. So an arrow from X goes to J is what exists

84
00:07:15,920 --> 00:07:23,480
in the set D in X, the R J means written in logic notation.

85
00:07:23,480 --> 00:07:25,439
It's really talking about the end points of arrows.

86
00:07:25,439 --> 00:07:27,240
And it's a nice way to think about it.

87
00:07:27,240 --> 00:07:32,480
But you ought to be able also to retreat to give a nice crisp set theoretic definition

88
00:07:32,480 --> 00:07:36,520
without reference to pictures if need be.

89
00:07:36,520 --> 00:07:41,280
So that's an official definition of the image under R.

90
00:07:41,279 --> 00:07:49,839
Let's turn now to an operation on relations, which converts one relation into another relation

91
00:07:49,839 --> 00:07:55,439
called the inverse of R. And the inverse of R is what you get by turning the arrows around.

92
00:07:55,439 --> 00:08:00,799
So let's look at the relation R, which is the registered for relation going from D students

93
00:08:00,799 --> 00:08:03,039
to J subjects.

94
00:08:03,039 --> 00:08:08,479
And then if I look at R inverse, R inverse I could think of as the registers relation,

95
00:08:08,480 --> 00:08:13,720
X 0 4 2 registers J sin and 6 0 1 2 registers J sin and E.

96
00:08:13,720 --> 00:08:19,319
It's a funny usage of the word, but I needed something short that would fit on the slide.

97
00:08:19,319 --> 00:08:25,759
So registers is basically turning the arrows backwards of is registered for.

98
00:08:25,759 --> 00:08:31,800
And now I can apply the definition of image to R inverse in a useful way.

99
00:08:31,800 --> 00:08:37,840
But just to be crisp about what we're doing here is formally R inverse is gotten by flipping

100
00:08:37,840 --> 00:08:39,960
the roll of the domain and the code domain.

101
00:08:39,960 --> 00:08:47,639
So we have that DRJ, if and only if J, are inverse D.

102
00:08:47,639 --> 00:08:50,720
So let's look at R inverse of 6 0 1 2.

103
00:08:50,720 --> 00:08:55,720
What that's going to mean is all the students that are taking 6 0 1 2.

104
00:08:55,720 --> 00:09:01,560
So we start off at 6 0 1 2 and we go back to all the students that are registered for it.

105
00:09:01,560 --> 00:09:02,759
It's J sin and E.

106
00:09:02,759 --> 00:09:08,000
So again, and so R inverse of 6 0 1 2 is J sin and E.

107
00:09:08,000 --> 00:09:12,439
R inverse of 6 0 1 2 and 6 0 3, well same deal.

108
00:09:12,439 --> 00:09:19,159
Let's look at 6 0 3 and 6 0 1 2 and look at all the students that are registered for either one of them.

109
00:09:19,159 --> 00:09:21,759
Now it's J sin, J, and E.

110
00:09:21,759 --> 00:09:23,600
Shown by those red arrows.

111
00:09:23,600 --> 00:09:26,159
Those all the arrows coming out of those two courses,

112
00:09:26,159 --> 00:09:34,959
so R inverse of 3 0 1 2 is that set of three students, J sin,

113
00:09:34,959 --> 00:09:37,159
J, and E.

114
00:09:37,159 --> 00:09:45,159
And in general, when you start off with a bunch of subjects, a bunch of elements of the code domain,

115
00:09:45,159 --> 00:09:53,159
and you apply R inverse to it, it's called the inverse image of Y under R.

116
00:09:53,879 --> 00:09:59,559
Well, let's look at the set J of all the subjects and think about what is R inverse of J?

117
00:09:59,559 --> 00:10:00,480
What does it mean?

118
00:10:00,480 --> 00:10:06,159
Well, R inverse of J is all the students that are registered for some subject at all,

119
00:10:06,159 --> 00:10:08,439
which is a good thing to have.

120
00:10:08,439 --> 00:10:16,600
So now I can start using these sets to make assertions about my database that can be useful to know.

121
00:10:16,600 --> 00:10:22,759
So for example, if I want to say that every student is registered for some subject,

122
00:10:22,759 --> 00:10:32,759
which of course they are, what I would say is that the set of all students is a subset of R inverse of J.

123
00:10:32,759 --> 00:10:38,600
So this concise set theoretic containment statement,

124
00:10:38,600 --> 00:10:45,559
the is a subset of R inverse of J is a slick way of writing the precise statement that says that

125
00:10:45,559 --> 00:10:51,840
all the students are registered for some subject.

126
00:10:51,920 --> 00:10:55,519
Now it happens not to be true, by the way, because if you look back at that example,

127
00:10:55,519 --> 00:10:58,280
Adam was not registered for a subject.

128
00:10:58,280 --> 00:11:07,680
So we're not claiming that this is true, but simply that there's a nice way to express it using images and containment.

129
00:11:07,680 --> 00:11:12,080
Let's look at a different relation that we could call the advises relation.

130
00:11:12,080 --> 00:11:16,440
So the advises relation is going to have code domain the same set of students D,

131
00:11:16,440 --> 00:11:20,360
but it's going to have as a domain the set of professors.

132
00:11:20,360 --> 00:11:25,160
And I've written down the initials of five prominent professors,

133
00:11:25,160 --> 00:11:31,000
mine is at the top and you may recognize some of the others, but it doesn't really matter if you don't.

134
00:11:31,000 --> 00:11:37,480
And the advises relation V is going to be indicated by those arrows.

135
00:11:37,480 --> 00:11:41,880
So in particular, it shows that ARM is the advisor of Jason Joan,

136
00:11:41,879 --> 00:11:45,000
E.Hue and Adam, which he happens to be.

137
00:11:45,000 --> 00:11:48,720
FTL is an advisor of Joan and E.Hue.

138
00:11:48,720 --> 00:11:52,919
So Joan has two advisors because she's a double major.

139
00:11:52,919 --> 00:11:55,200
E.Hue does as well.

140
00:11:55,200 --> 00:11:56,720
And Adam does as well.

141
00:11:56,720 --> 00:11:59,360
Now that I look at this example.

142
00:12:01,360 --> 00:12:08,279
So if I look at, in particular now, the advises of FTL or TLP,

143
00:12:08,279 --> 00:12:13,600
I'm looking at V of the set consisting of FTL and TLP.

144
00:12:13,600 --> 00:12:15,959
And it's going to be Joan, E.Hue and Adam.

145
00:12:15,959 --> 00:12:24,439
So taking the image of FTL and TLP, that's the set of advises of either of those two professors.

146
00:12:24,439 --> 00:12:28,839
I get this set of three students, Joan, E.Hue and Adam.

147
00:12:28,839 --> 00:12:30,600
Well, that's a set of students.

148
00:12:30,600 --> 00:12:33,720
And the registered relation applies to a set of students.

149
00:12:33,720 --> 00:12:35,200
So let's do that.

150
00:12:35,200 --> 00:12:43,200
If I now apply R to Joan and E.Hue and Adam, what I'm getting is the subjects that they're

151
00:12:43,200 --> 00:12:45,800
registered for.

152
00:12:45,800 --> 00:12:51,600
So this is called composing R and V. I've applied V and then I'm applying R to the result.

153
00:12:51,600 --> 00:12:58,440
In this case, R of V of FTL and TLP is the same as R of Joan, E.Hue and Adam.

154
00:12:58,440 --> 00:13:01,520
It's the courses that any of them are taking.

155
00:13:01,520 --> 00:13:10,200
Taking and it's 003, 012 and 004.

156
00:13:10,200 --> 00:13:17,520
So the way to understand this R of V in general is you start off with any set ex of professors

157
00:13:17,520 --> 00:13:19,360
in the domain.

158
00:13:19,360 --> 00:13:24,520
You take V of X, are the advises that they have.

159
00:13:24,519 --> 00:13:29,720
And then you take R of the advises and you get the subjects that the advises are taken.

160
00:13:29,720 --> 00:13:38,319
So R of V of X is the subjects that advises of X are taking, are registered for.

161
00:13:38,319 --> 00:13:42,960
Well, we can abstract that out and call this the composition of R and V. It's defined the

162
00:13:42,960 --> 00:13:45,279
same way that functional composition is.

163
00:13:45,279 --> 00:13:50,319
So R of V is the relation and the images of that relation.

164
00:13:50,320 --> 00:13:56,160
The images of a set of professors under R of V is defined to be apply V to X and then

165
00:13:56,160 --> 00:14:04,800
apply R to V of X. And it's again called the composition of R and V.

166
00:14:04,800 --> 00:14:13,480
What it means now is that two things are related by R of V. It relates professors and subjects.

167
00:14:13,480 --> 00:14:16,520
And it says that a professor and a subject are related.

168
00:14:16,519 --> 00:14:24,199
If the professor has an advisey, some advisey that T, the relationship of his teaching, intersected

169
00:14:24,199 --> 00:14:30,759
with the relationship of has an advisey and the subject, is empty.

170
00:14:30,759 --> 00:14:42,199
There is no pair of professor and subject that is in both T and in R of V. And this bottom

171
00:14:42,200 --> 00:14:48,840
expression here gives you a sense of the concise way that you can express queries and assertions

172
00:14:48,840 --> 00:14:56,600
about the database using a combination of relational operators and set operators.

173
00:14:56,600 --> 00:15:01,240
Another way to say it, by the way, there's a general set theoretic fact, is the way to say

174
00:15:01,240 --> 00:15:08,920
that T and R of V intersected is empty, is to say that the set T and the set R of V, whatever

175
00:15:08,919 --> 00:15:14,919
they are, have no points in common. An equivalent way to say that is that one set is contained

176
00:15:14,919 --> 00:15:20,519
in the complement of the other set. So I could equally well have said this as R composed with V

177
00:15:20,519 --> 00:15:29,479
is a subset of not T. Well, let's step back now and summarize what we've done by example and

178
00:15:29,479 --> 00:15:35,719
say a little bit about how it works in general. So as I said, a binary relation, and we'll start

179
00:15:35,720 --> 00:15:42,840
to be slightly more formal now. A binary relation R from a set A to a set B, associates elements of A

180
00:15:42,840 --> 00:15:51,320
with elements of B. And there's a picture of a general set A called the domain and a general set B

181
00:15:51,320 --> 00:15:59,960
called the codomain. And R is given by those arrows. Well, what exactly are arrows? Well, if you're

182
00:15:59,960 --> 00:16:07,320
going to formalize arrows, the set of them is what's called the graph of R. So technically, a relation

183
00:16:07,320 --> 00:16:13,960
really has three parts. It's not to be identified with just its arrows. A relation has a domain

184
00:16:13,960 --> 00:16:22,600
and a codomain, and some bunch of arrows going from the domain to the codomain. The arrows can be

185
00:16:22,600 --> 00:16:27,879
formalized by saying, all that matters about an arrow is where it begins and where it ends,

186
00:16:27,879 --> 00:16:34,200
because it's just designed to reflect an association between an element of the domain and an

187
00:16:34,200 --> 00:16:40,039
element of the codomain. So technically, the arrows are just ordered pairs. And in this case,

188
00:16:40,039 --> 00:16:46,759
there are three arrows, one from A to B2. And so you see at the bottom of the slide, an ordered pair,

189
00:16:46,759 --> 00:16:54,279
A1B2. Another arrow goes from A1 to B4. So you see the ordered pair A1B4, and the final arrow is

190
00:16:54,279 --> 00:17:01,240
B3B4, and you see that pair. So all the language about arrows is really talking about ordered pairs.

191
00:17:02,519 --> 00:17:10,279
It's just that the geometric vision image of these diagrams of their arrows makes a lot of

192
00:17:10,279 --> 00:17:20,200
properties much clearer. So the range of R is an important concept that comes up regularly and

193
00:17:20,200 --> 00:17:25,400
tends to be a little confusing for people. The range of R is simply the elements with arrows coming

194
00:17:25,400 --> 00:17:35,720
in from R. It's all of the elements that are hit by an arrow that starts in the domain. So it's

195
00:17:35,720 --> 00:17:46,519
really R of the domain is the range of R. Now notice that this is typically not equal to the whole

196
00:17:46,519 --> 00:17:52,599
codomain. Let's look at this example. Here the range of R are the hit the points that are

197
00:17:52,599 --> 00:18:01,400
hit by elements of A under R, namely just B2 and B4. The codomain has elements B1 and B3 that are

198
00:18:01,400 --> 00:18:08,440
missing and that are not in the range. Well, as I said, functions are a special case of relation.

199
00:18:08,440 --> 00:18:16,440
So let's just look at that. A function, F from a set A to a set B is a relation which associates

200
00:18:16,440 --> 00:18:22,360
with each element in the domain. Each element, little A in the domain, capital A, with at most

201
00:18:23,000 --> 00:18:32,360
one element of the codomain B. So this one element, if it exists, is called F of A. It's the image

202
00:18:32,360 --> 00:18:40,600
of the element A under the relation F. But what's special about it is that F of A contains at most

203
00:18:40,599 --> 00:18:47,879
one element. So let's just look at an example again. A way to say that a relation is a function is

204
00:18:47,879 --> 00:18:55,639
to look at all of the points on the left in the domain and make sure that none of them have more

205
00:18:55,639 --> 00:19:01,159
than one arrow coming out. Well, in this picture, there are a couple of violations about that of that.

206
00:19:01,159 --> 00:19:05,959
There are a couple of points on the left in A that have more than one arrow coming out. There

207
00:19:05,960 --> 00:19:13,960
are two bad edges. But if I erase those, now I'm left with a function. And sure enough, there's

208
00:19:13,960 --> 00:19:19,160
at most one arrow coming out of each of the points on the left in A, some of the points have no

209
00:19:19,160 --> 00:19:26,519
arrows coming out. That's fine. And so for those green points with an arrow out, there's a unique

210
00:19:27,240 --> 00:19:35,480
F of the green point equal to a magenta point in B that's uniquely determined by the functional

211
00:19:35,480 --> 00:19:42,360
relation F, which may not be defined for all of the green points if they don't have any arrow coming

212
00:19:42,360 --> 00:19:51,480
out of them. So function means less than or equal to one arrow coming out. So if we set this formally

213
00:19:51,480 --> 00:19:59,240
without talking about the arrows, one way is simply to say that a relation is a function if F of

214
00:19:59,240 --> 00:20:06,759
little A is, if the size of F of little A is less than or equal to one for all of the domain elements A.

215
00:20:08,279 --> 00:20:15,160
And a more elementary way to say it using just the language of relations and equality and

216
00:20:15,160 --> 00:20:25,160
Boolean connectives is to say that if A is connected to two things by F, if A, F, B, and A, F, B prime,

217
00:20:25,160 --> 00:20:41,080
then in fact B is equal to B prime. And that wraps up functions.

