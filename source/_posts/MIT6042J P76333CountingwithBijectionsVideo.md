---
title: MIT6042J P76333CountingwithBijectionsVideo
---

1
00:00:00,000 --> 00:00:09,200
An elementary idea that gets you a long way in counting things is this idea of counting

2
00:00:09,200 --> 00:00:12,679
with bijections, which is counting one thing by counting another.

3
00:00:12,679 --> 00:00:14,599
And we can illustrate that by example.

4
00:00:14,599 --> 00:00:20,240
Let's begin with looking at some stuff that is easy to count using just the simple sum

5
00:00:20,240 --> 00:00:22,719
and product rules.

6
00:00:22,719 --> 00:00:25,839
So suppose that I'm trying to count passwords.

7
00:00:25,839 --> 00:00:29,519
This is a contrived oversimplified example, but it gives you the idea.

8
00:00:29,519 --> 00:00:31,160
This is what I mean by a password.

9
00:00:31,160 --> 00:00:35,799
A password is a sequence of characters that are either letters or digits.

10
00:00:35,799 --> 00:00:39,079
Subject to the constraints that they are supposed to be between six and eight characters

11
00:00:39,079 --> 00:00:40,079
long.

12
00:00:40,079 --> 00:00:42,840
They're supposed to start with a letter and their case sensitive.

13
00:00:42,840 --> 00:00:46,920
So you can tell the difference between uppercase and lowercase letters.

14
00:00:46,920 --> 00:00:53,679
So let's define the set L of all the letters, uppercase and lowercase together.

15
00:00:53,679 --> 00:00:58,920
And let D be the set of digits from zero through nine.

16
00:00:58,920 --> 00:01:04,159
And we said that passwords are supposed to be between six and eight words long, but

17
00:01:04,159 --> 00:01:07,560
it's a little bit easier actually to just use length as a parameter.

18
00:01:07,560 --> 00:01:14,599
So let's think about words of length n that satisfy the password conditions.

19
00:01:14,599 --> 00:01:20,400
So Pn is going to be the length n words starting with letter.

20
00:01:20,400 --> 00:01:25,040
And so which is one of the password constraints.

21
00:01:25,040 --> 00:01:30,719
So we can express that as a length n word can be broken up into the first character, which

22
00:01:30,719 --> 00:01:37,520
is an L, appeared with the rest of the word, the remaining n minus one characters.

23
00:01:37,520 --> 00:01:41,480
And the remaining n minus one characters can be either Ls or these.

24
00:01:41,480 --> 00:01:49,880
So the length n passwords can be expressed as the product of L with the nth power of L

25
00:01:49,879 --> 00:01:55,959
union D. That is L union D cross L union D cross L union D n minus one times.

26
00:01:55,959 --> 00:02:01,439
Well now we have an easy way to count this because the size of this product by the product

27
00:02:01,439 --> 00:02:07,879
rule is the size of L times the size of L union D to the n minus first power.

28
00:02:07,879 --> 00:02:13,639
And of course L union D since letters and digits don't overlap by the sum rule, the size

29
00:02:13,639 --> 00:02:19,840
of them is just L plus D. And so I get this nice formula that it's 52.

30
00:02:19,840 --> 00:02:27,080
Two letters times 52 letters plus 10 digits raised to the n minus first power.

31
00:02:27,080 --> 00:02:29,199
OK, what about the passwords?

32
00:02:29,199 --> 00:02:34,000
Well the passwords were then P6 union P7 union P8.

33
00:02:34,000 --> 00:02:39,280
And since words of length 6 don't overlap with words of length 7 or 8, this is a disjoint

34
00:02:39,280 --> 00:02:44,920
union. And therefore the total number of passwords as specified is simply the size of P6 plus

35
00:02:44,919 --> 00:02:47,879
the size of P7 plus the size of P8.

36
00:02:47,879 --> 00:02:53,399
There's the formula when I plug in and it turns out to be a good size number 19 times 10

37
00:02:53,399 --> 00:02:55,159
to the 14th.

38
00:02:55,159 --> 00:03:02,399
OK, that's one simple example where I'm translating a spec into something that I can express easily

39
00:03:02,399 --> 00:03:09,879
as a products and sums and disjoint sums of stuff that I already know the size of.

40
00:03:09,879 --> 00:03:12,959
Let's just do another example.

41
00:03:12,960 --> 00:03:18,520
One of the things that I want to count the number of four digit numbers, so the elements

42
00:03:18,520 --> 00:03:21,480
of these four digit numbers are 0 through 9.

43
00:03:21,480 --> 00:03:29,560
There are 10 possibilities with at least 1 7, the number of four digit sequences of digits

44
00:03:29,560 --> 00:03:33,159
that have at least 1 7 in them.

45
00:03:33,159 --> 00:03:39,439
And one way to count is I can make it a sum of different four digit numbers containing

46
00:03:39,439 --> 00:03:42,199
1 7 depending on where the first 7 is.

47
00:03:42,199 --> 00:03:47,120
If there's at least 1 7 there's a first 7 that's the well order and principle being applied.

48
00:03:47,120 --> 00:03:53,039
So if we let x abbreviate any digit, there are 10 possible values of x and 0 represent

49
00:03:53,039 --> 00:03:59,719
any digit other than 7 so there's 9 possible values of 0, then the words that start with

50
00:03:59,719 --> 00:04:05,120
7 can then be followed with any three digits.

51
00:04:05,120 --> 00:04:10,840
So 7 x x x is one possible pattern when the first occurrence of 7 is first.

52
00:04:10,840 --> 00:04:15,240
Another possible pattern is when you have a digit that's not 7 followed by a 7 this

53
00:04:15,240 --> 00:04:18,639
is when 7 occurs second followed by anything at all.

54
00:04:18,639 --> 00:04:23,360
Likewise here 7 occurs third and here 7 occurs fourth.

55
00:04:23,360 --> 00:04:29,879
Now these individual patterns are easy enough to count using the product rule because here

56
00:04:29,879 --> 00:04:33,160
I have to count how many triples of any digits are there.

57
00:04:33,160 --> 00:04:35,480
All this 10 digits so it's 10 cubed.

58
00:04:35,480 --> 00:04:43,680
Here how many sequences of where the first choice is 9 and the second two choices are

59
00:04:43,680 --> 00:04:46,600
10 and it's 9 times 10 squared.

60
00:04:46,600 --> 00:04:49,879
Here it's 9 squared times 10 and here it's 9 cubed.

61
00:04:49,879 --> 00:04:56,400
These are disjoint because they're distinguished by where the first 7 occurs and so I just

62
00:04:56,400 --> 00:05:02,720
add them up and I get this number not especially interesting but it's 34 39.

63
00:05:02,720 --> 00:05:09,440
Okay so that's an exercise in counting something by somewhat ingeniously breaking it up into

64
00:05:09,440 --> 00:05:15,880
a sum of disjoint things that are themselves easier to count.

65
00:05:15,880 --> 00:05:19,200
There's another way that's another standard trick that comes up in commonatorics of how

66
00:05:19,200 --> 00:05:26,880
do you count the number the sequence of four digit numbers with at least one seven by

67
00:05:26,879 --> 00:05:29,399
counting their complement.

68
00:05:29,399 --> 00:05:37,560
Count the numbers of four digit numbers that don't have any sevens and simply subtract

69
00:05:37,560 --> 00:05:43,060
that number, the number of four digit numbers with no sevens from the total number of four

70
00:05:43,060 --> 00:05:47,240
digit numbers and that's going to be the numbers that are left over that have one seven.

71
00:05:47,240 --> 00:05:51,680
Now the number of four digit numbers is easy to count and it will turn out that the number

72
00:05:51,680 --> 00:05:56,120
of four digit numbers with no sevens is also really easy to count because the number of

73
00:05:56,120 --> 00:06:01,259
four digit numbers is 10 to the fourth and the number of four digit numbers with no

74
00:06:01,259 --> 00:06:07,759
sevens there's nine possible choices for each of the remaining digits so it's just the

75
00:06:07,759 --> 00:06:13,840
digits zero through nine leaving out seven to the fourth power or nine to the fourth and

76
00:06:13,840 --> 00:06:21,680
you can double check the 10 to the fourth minus nine to the fourth is 34 39.

77
00:06:21,680 --> 00:06:27,560
So now with that practice using the basic sum and product rules we can start applying

78
00:06:27,560 --> 00:06:31,600
and thinking about the bijecture rules and the bijecture rule simply says that if I have

79
00:06:31,600 --> 00:06:37,600
a bijection between two sets A and B then they have the same size at least assuming that

80
00:06:37,600 --> 00:06:43,519
they're finite sets and the only kind of things we're counting are finite sets.

81
00:06:43,519 --> 00:06:50,120
Let's use an example of that where I'm going to count the number of subsets of a set

82
00:06:50,120 --> 00:06:56,280
A by finding a bijection between the subsets of a set A and something that I do know how

83
00:06:56,280 --> 00:06:57,280
to count.

84
00:06:57,280 --> 00:07:01,480
In fact we've already counted them the binary strings of a given length.

85
00:07:01,480 --> 00:07:02,480
What's the bijection?

86
00:07:02,480 --> 00:07:09,920
Well suppose that A is a set of N elements called them A1 through AN and I have some arbitrary

87
00:07:09,920 --> 00:07:16,480
subset of A say it's got A1 and it doesn't have A2 and it has A3 and it has A4 and it

88
00:07:16,480 --> 00:07:21,120
doesn't have A5 and then it's got some selection of the other numbers and it turns out it has

89
00:07:21,120 --> 00:07:23,240
A in it.

90
00:07:23,240 --> 00:07:28,360
Well if I think of a subset laid out this way up against the corresponding elements in

91
00:07:28,360 --> 00:07:35,520
A I can code this in an obvious way by putting a 1 where the element is in the subset and

92
00:07:35,520 --> 00:07:38,840
a 0 where the element is not in the subset.

93
00:07:38,840 --> 00:07:43,960
In effect this is the so-called characteristic function of the subset where 1 means that

94
00:07:43,959 --> 00:07:49,399
that index element, a 1 in the i-th position means that A I is there and a 0 in the i-th

95
00:07:49,399 --> 00:07:52,039
position means that A I is not there.

96
00:07:52,039 --> 00:08:00,319
So the second coordinate here is a 0 that means A2 is not there and this is easily seem

97
00:08:00,319 --> 00:08:01,319
to be a bijection.

98
00:08:01,319 --> 00:08:04,919
That is given the string you can figure out what the subset is given the subset you can

99
00:08:04,919 --> 00:08:06,879
figure out what the unique string is.

100
00:08:06,879 --> 00:08:12,599
So we have a bijection and what we conclude then is that the number of N bit strings is equal

101
00:08:12,600 --> 00:08:18,200
to the size of power set of A. It's equal to the number of subsets of A and of course

102
00:08:18,200 --> 00:08:20,640
we know how to count the number of N bit strings.

103
00:08:20,640 --> 00:08:25,960
It's 2 to the N. So what we just figured out is if I have a set of size N it's got 2 to

104
00:08:25,960 --> 00:08:32,040
the N subsets and a slick way to say that without mentioning N is that the size of the power

105
00:08:32,040 --> 00:08:39,200
set of A is simply 2 to the size of A.

106
00:08:39,200 --> 00:08:47,680
One more example of bijection counting that is kind of fun and interesting and will

107
00:08:47,680 --> 00:08:52,840
illustrate the fact that we learn something by finding a bijection even if we don't know

108
00:08:52,840 --> 00:08:55,280
how to count either one yet.

109
00:08:55,280 --> 00:08:59,640
So what I'm interested in is suppose I have a situation where there are 5 kinds of doughnuts,

110
00:08:59,640 --> 00:09:03,360
5 different flavors of doughnuts and I want to sort of select a dozen and I want to know

111
00:09:03,360 --> 00:09:04,879
how many selections there are.

112
00:09:04,879 --> 00:09:09,960
So for example of these little O's represent doughnuts I might choose a selection of a

113
00:09:09,960 --> 00:09:12,320
dozen by choosing two chocolate and no lemon.

114
00:09:12,320 --> 00:09:17,559
I don't like those so much and six sugars and two glazed and two plain.

115
00:09:17,559 --> 00:09:25,919
So there are 12 doughnuts here using 4 out of the 5 possible flavors of doughnuts.

116
00:09:25,919 --> 00:09:31,120
This is what I'll call a selection of a doughnut and I'd like to know how many such selections

117
00:09:31,120 --> 00:09:33,240
of doughnuts are there.

118
00:09:33,240 --> 00:09:39,519
Well let that be the set A, the set of all these different ways of selecting 12 doughnuts

119
00:09:39,519 --> 00:09:41,840
when there are 5 flavors of doughnuts available.

120
00:09:41,840 --> 00:09:47,680
Well there's again an obvious correspondence between the set A of doughnut selections and

121
00:09:47,680 --> 00:09:54,399
the set B of zeros and ones of length 16 that contain four ones.

122
00:09:54,399 --> 00:09:55,399
What's the correspondence?

123
00:09:55,399 --> 00:09:57,560
Well here's my doughnut selection.

124
00:09:57,560 --> 00:10:01,799
Of course the reason why I use those O's for doughnuts is that they also correspond to

125
00:10:01,799 --> 00:10:03,319
zeros.

126
00:10:03,319 --> 00:10:08,279
I can just put in ones as delimiters between the groups of flavors.

127
00:10:08,279 --> 00:10:14,120
So after the chocolate doughnuts I put a one and then after the lemon doughnuts that happened

128
00:10:14,120 --> 00:10:20,719
to be none I put another one and then after the six sugar doughnuts I put a one and then

129
00:10:20,719 --> 00:10:28,339
I kind of consolidate and I extract from the doughnut selection this 16 bit word with 12

130
00:10:28,340 --> 00:10:34,700
zeros corresponding to 12 doughnuts and four ones corresponding to breaking up those groups

131
00:10:34,700 --> 00:10:42,220
of zeros into five categories, five slots corresponding to the number of doughnuts of each

132
00:10:42,220 --> 00:10:44,220
flavor.

133
00:10:44,220 --> 00:10:50,060
So the general bijection of course is that if I have a selection of C chocolate doughnuts,

134
00:10:50,060 --> 00:10:57,220
L lemon doughnuts as sugar the G glazed in P plain of any number really.

135
00:10:57,779 --> 00:11:03,860
That selection of doughnuts with this number of chocolate lemons glazed plain corresponds

136
00:11:03,860 --> 00:11:13,019
to a binary word with C plus L plus S plus G plus P zeros and four ones.

137
00:11:13,019 --> 00:11:20,540
And so what we can say is that the set of 16 digit words with four ones is exactly the

138
00:11:20,540 --> 00:11:25,100
same size as the number of doughnut selections even though at this moment we don't know how

139
00:11:25,100 --> 00:11:26,860
to count either one.

140
00:11:26,860 --> 00:11:32,899
We will see in the next lecture an easy way to count the number of those 16 bit words

141
00:11:32,899 --> 00:11:34,220
with four ones.

142
00:11:34,220 --> 00:11:38,720
But for now our conclusion from bijection counting is that these two sets of the same size

143
00:11:38,720 --> 00:11:40,960
even though I haven't counted yet either one.

