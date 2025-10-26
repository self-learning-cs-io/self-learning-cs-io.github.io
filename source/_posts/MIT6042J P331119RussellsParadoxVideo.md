---
title: MIT6042J P331119RussellsParadoxVideo
---

1
00:00:00,000 --> 00:00:11,439
So in this final segment today we're going to talk about set theory. Just a little bit

2
00:00:11,439 --> 00:00:16,839
because if you're going to take a math class, if you're going to be exposed to math for

3
00:00:16,839 --> 00:00:22,539
computer science, it's useful to have at least a glimmering of what the foundations of

4
00:00:22,539 --> 00:00:27,960
math looks like, how it starts and how it gets justified. And that's what set theory does.

5
00:00:27,960 --> 00:00:34,060
In addition, we will see that the diagonal argument that we've already made much of plays

6
00:00:34,060 --> 00:00:40,500
a play a crucial role in the development and understanding of set theory. So let's begin

7
00:00:40,500 --> 00:00:46,000
with an issue that plays an important role in set theory and in computer science, having

8
00:00:46,000 --> 00:00:51,980
to do with the idea of taking a function and applying it to itself or having something

9
00:00:51,980 --> 00:00:56,760
refer to itself. And this is one of these things that's notoriously doubtful. There's all

10
00:00:56,759 --> 00:01:03,559
these paradoxes about it. Maybe the simplest one is when I assert this statement is false.

11
00:01:03,559 --> 00:01:09,280
And the question is, is it true or false? Well, if it's true, then it's false. And if it's

12
00:01:09,280 --> 00:01:15,319
false, then it's true. And we get a kind of buzzer. It's not possible to figure out whether

13
00:01:15,319 --> 00:01:20,319
this statement is true or false. I think we would deny that it was a proposition. So that's

14
00:01:20,319 --> 00:01:24,920
a hint that there's something suspicious about self-reference and self-application and

15
00:01:24,920 --> 00:01:30,280
so on. On the other hand, it's worth remembering that in computer science, we take this for granted.

16
00:01:30,280 --> 00:01:39,519
So let's look at an example. Here's a simple example of a list in a scheme list notation,

17
00:01:39,519 --> 00:01:45,079
meaning it's a list of three things, 0, 1 and 2. And the black perenns indicate that we're

18
00:01:45,079 --> 00:01:50,640
thinking of it as an ordered list. Now, the way that I would represent a list like that

19
00:01:50,640 --> 00:01:57,319
in memory, typically, is by using these things that are called concell. So a concell has these two parts.

20
00:01:57,319 --> 00:02:05,560
The left-hand part points to the value in that location in the list. So this first concell points to 0,

21
00:02:05,560 --> 00:02:10,240
which is the first element of the list. The second component of the concell points to the next

22
00:02:10,240 --> 00:02:14,639
element of the list. And so here you see one pointing to the third element of the list,

23
00:02:14,639 --> 00:02:19,560
and there you see two. And that little nil marker indicates that's the end of the list.

24
00:02:19,560 --> 00:02:25,920
So that's a simple representation of a list of length three with three concells.

25
00:02:25,920 --> 00:02:31,640
Well, one of the things that computer science lets you do, and many languages let you do,

26
00:02:31,640 --> 00:02:39,640
is that you can manipulate these pointers. So using the language of scheme, what I can do is

27
00:02:39,640 --> 00:02:47,199
do an operation called setcar, where I'm taking, in this case, I'm setting the second element of L,

28
00:02:47,199 --> 00:02:59,599
that is this concell to L. And setcar is saying, let's change what the element in the left-hand part of this cell is.

29
00:02:59,599 --> 00:03:05,839
This is where the value of the second element is. Let's change the value of the second element to BL.

30
00:03:05,839 --> 00:03:11,679
What does that mean? As a pointer manipulation, well, it's pretty simple. I just moved this pointer to point two

31
00:03:11,680 --> 00:03:21,040
at the beginning of the list L. And now I have an interesting situation because this list, now is a list that consists of

32
00:03:21,040 --> 00:03:32,080
0, and L, and 2. It's a list that has itself as a member. And it makes perfect sense. And if you sort of expand that out,

33
00:03:32,080 --> 00:03:40,000
L is this list that has begins with 0, and then its second element is a list that begins with 0,

34
00:03:40,000 --> 00:03:46,960
and the second element of that list is a list that begins with 0, and so on. And then the third element of L is 2,

35
00:03:46,960 --> 00:03:53,439
and the third element of the second element of L is 2, and so on, it's an interesting infinite nested structure

36
00:03:53,439 --> 00:03:59,520
that's nicely represented by this finite circular list.

37
00:04:01,680 --> 00:04:08,879
Okay, let's look at another example where in computer science, we actually apply things to themselves.

38
00:04:08,960 --> 00:04:14,719
So let's define the composition operator, and again, I'm using notation from the language scheme.

39
00:04:14,719 --> 00:04:19,680
I want to take two functions, F and G, that take one argument, and I'm going to define their composition.

40
00:04:19,680 --> 00:04:26,719
The way that I compose F and G is I define a new function, H of X, which is going to be the composition of H and G.

41
00:04:26,719 --> 00:04:36,879
The way I define H of X is I say apply G to apply F to G, apply to X, and return the value H.

42
00:04:36,879 --> 00:04:44,639
So this is a compose, is a procedure that takes two procedures F and G, and returns their composition H.

43
00:04:46,000 --> 00:04:54,000
Okay, let's practice. Suppose that I compose the square function, the maps X to X squared,

44
00:04:54,000 --> 00:05:03,759
and the add one function that maps X to X plus one. Well, if I compose the square of adding one,

45
00:05:03,759 --> 00:05:12,079
and I apply it to three, what I'm saying is, let's add one to three, and then square it,

46
00:05:12,079 --> 00:05:19,680
and I get three plus one squared or sixteen, because the add one and then square it is the function

47
00:05:19,680 --> 00:05:26,719
that's the composition of square and add one. Now, I can do the following. I can compose square

48
00:05:26,719 --> 00:05:32,879
with itself. If I take the function square it and square that, I'm really taking the fourth power.

49
00:05:32,879 --> 00:05:38,959
So if I apply the function compose of square square to three, I get three squared square

50
00:05:38,959 --> 00:05:44,959
or eighty one or three of the fourth. Well, it makes perfect sense. Okay, well now let's

51
00:05:45,920 --> 00:05:52,000
define a, a, a, a, a composite with itself operation. I'm going to call it comp2. Comp2 takes one

52
00:05:52,000 --> 00:06:02,560
function F, and the definition of comp2 is compose F with F. And if I then apply comp2 to square

53
00:06:02,639 --> 00:06:07,600
and three, it's saying, okay, compose square and square. We just did that. That was the fourth

54
00:06:07,600 --> 00:06:14,240
power. Apply it to three. I get eighty one. And now we can do some weird stuff, because suppose

55
00:06:14,240 --> 00:06:23,920
that I apply comp2 to comp2, and then apply that to add one, and apply that to three. Well,

56
00:06:23,920 --> 00:06:29,199
that was a little hard to follow, and I'm going to let you think it through. But comp2 of comp2

57
00:06:29,199 --> 00:06:37,599
is compose something with it four times. And when you do that with add one, what happens is that

58
00:06:38,479 --> 00:06:49,839
you're adding one four times to three. If I comp2 of comp2 of square, I'm composing square with

59
00:06:49,839 --> 00:06:57,360
itself, and then composing that with itself, I'm really squaring four times. And I wind up with

60
00:06:59,360 --> 00:07:07,199
two to the fourth, or sixteen, is the power that I'm taking. And so compose two of composed two

61
00:07:07,199 --> 00:07:12,560
square of three is this rather large number, three to the sixteen. It could be a little bit tricky

62
00:07:12,560 --> 00:07:18,000
to think through, but it all makes perfect sense. And it works just fine in recursive programming

63
00:07:18,000 --> 00:07:25,360
languages that allow this kind of untyped or generically typed composition. Okay, so why is it

64
00:07:25,360 --> 00:07:32,240
that computer scientists are so daring, and mathematicians are so timid about self-reference?

65
00:07:32,240 --> 00:07:36,960
And the reason is the mathematicians have been traumatized by Bertrand Russell because of Russell's

66
00:07:36,960 --> 00:07:45,360
famous paradox, which we're now ready to look at. So what Russell was proposing, and it's going to

67
00:07:45,360 --> 00:07:52,000
look just like a diagonal argument, is Russell said, let's let w be the collection of sets

68
00:07:52,800 --> 00:08:00,800
of S such that S is not a member of S. Now let's think about that for a little bit. Most sets are not

69
00:08:00,800 --> 00:08:06,720
members of themselves, like the set of integers is not a member of itself because the only thing

70
00:08:06,720 --> 00:08:14,959
in it is in it are integers. And the set of the power set of the integers is not a member of

71
00:08:14,959 --> 00:08:21,839
itself because every member of the power set of integers is a set of integers, whereas the power

72
00:08:21,839 --> 00:08:27,680
set of integers is a set of sets of those things. So those familiar sets are typically not members of

73
00:08:27,680 --> 00:08:35,679
themselves, but who knows, maybe there are these weird sets like the circular list or a function

74
00:08:35,679 --> 00:08:42,240
that can compose with itself that is a member of itself. Now let me step back for a moment and

75
00:08:42,240 --> 00:08:48,560
mention where did Russell get thinking about this. And it comes from the period in the late 19th

76
00:08:48,560 --> 00:08:54,799
century when mathematicians and logicians were trying to think about confirming and establishing

77
00:08:54,799 --> 00:09:00,080
the foundations of math. What was math absolutely about? What were the fundamental objects that

78
00:09:01,840 --> 00:09:06,720
mathematics could be built from and what were the rules for understanding those objects? And it

79
00:09:06,720 --> 00:09:11,440
was pretty well agreed that sets were it. You could build everything out of sets and you just

80
00:09:11,440 --> 00:09:17,440
need to understand sets and then you were in business. And there was a German mathematician named

81
00:09:17,440 --> 00:09:26,000
Frege who tried to demonstrate this by developing a set theory, a very carefully giving careful

82
00:09:26,000 --> 00:09:31,200
axioms for what sets were. And he showed how you could build out of sets, you could build the integers

83
00:09:31,200 --> 00:09:35,520
and then you could build rationals which are sort of just pairs of integers and then you could

84
00:09:35,519 --> 00:09:43,919
build real numbers by taking collections of rationals that had at least upper bound. And then you

85
00:09:43,919 --> 00:09:48,000
can keep going and you can build functions and continuous functions. And he showed how you could

86
00:09:48,000 --> 00:09:55,759
build up the basic structures of mathematical analysis and prove their basic theorems in his formal

87
00:09:55,759 --> 00:10:02,559
set theory. The problem was that Russell came along and looked at Frege's set theory and came up with

88
00:10:02,559 --> 00:10:10,879
the following paradox. He defined w to be the collection of S in sets such that S is not a member of S.

89
00:10:10,879 --> 00:10:16,959
Frege would certainly have said that's a well-defined set and he will acknowledge that w is a set.

90
00:10:18,159 --> 00:10:22,959
And let's look at what this means in this diagonal argument. So let's remember what's by this

91
00:10:22,959 --> 00:10:29,039
definition of w, but we have is that a set S is in w if and only if S is not a member of S.

92
00:10:29,599 --> 00:10:37,679
Okay, that's fine. Then just let S be w and we immediately get a contradiction that w is in w if

93
00:10:37,679 --> 00:10:48,079
and only if w is not in w. Poor Frege, his book was a disaster. Math is broken. You can prove that

94
00:10:48,079 --> 00:10:53,439
you're the Pope, you can prove the pig's fly, verify programs crash. Math is just broken.

95
00:10:54,240 --> 00:11:00,560
It's not reliable. You can prove anything by in Frege's system because it reached a contradiction

96
00:11:00,560 --> 00:11:07,520
from something false. You can prove anything. Well, Frege had a book. It was a vanity publication

97
00:11:08,320 --> 00:11:14,720
and the the preface of it had to be rewritten and he said, look, my system's broken and I know

98
00:11:14,720 --> 00:11:20,000
that and Russell showed that unambiguously, but I think that there's still something here that's

99
00:11:20,000 --> 00:11:24,960
salvageable and so I'm going to publish the book, but I apologize for the fact that you can't

100
00:11:24,960 --> 00:11:36,879
rely on the conclusions. Poor Frege, that was his life work on down the drain. Okay, how do we resolve

101
00:11:36,879 --> 00:11:44,879
this? What's wrong with this apparent paradox of Russell's? Well, the assumption was that w was a set

102
00:11:45,759 --> 00:11:53,919
and that turns out to be what we can doubt. So the definition of w is that for all sets w,

103
00:11:53,919 --> 00:11:59,519
s is in w if and only if s is not in s and we got a contradiction by saying, okay,

104
00:12:00,559 --> 00:12:08,639
substitute w for s, but that's allowed only if you believe that w is a set. Now it looks like it

105
00:12:08,639 --> 00:12:15,840
ought to be because it's certainly well defined by that formula, but it was well understood at the time

106
00:12:15,840 --> 00:12:24,639
that that was the fix to the paradox. You just can't allow w to be a set. The problem was that w was

107
00:12:24,639 --> 00:12:30,799
acknowledged by everybody to be absolutely clearly defined mathematically. It was this bunch of sets

108
00:12:31,519 --> 00:12:36,879
and yet we're going to say it's not a set. Well, it's okay, that'll fix Russell's paradox, but it

109
00:12:36,879 --> 00:12:44,159
leaves us with a much bigger general philosophical question is when is a well-defined mathematical

110
00:12:44,159 --> 00:12:50,559
object a set and when isn't a set and that's what you need a sophisticated rules for? When is it

111
00:12:50,559 --> 00:12:54,879
that you're going to define some collection of elements and you can be sure it's a set as opposed

112
00:12:54,879 --> 00:13:02,159
to something else called a class, by the way, which is basically something that's too big to be a set

113
00:13:02,159 --> 00:13:08,399
because if it was a set, it would contain itself and be circular and self-referential.

114
00:13:09,199 --> 00:13:15,279
Well, there's no simple answer to this question about what things are sets and what are not sets,

115
00:13:15,279 --> 00:13:24,399
but over time by the 1930s people had pretty much settled on a very economical and persuasive set

116
00:13:24,399 --> 00:13:29,199
of axioms for set theory called the Zumelo-Frankle set theory axiom.

