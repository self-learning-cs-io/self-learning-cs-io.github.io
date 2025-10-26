---
title: MIT6042J P12151PredicateLogic1Video
---

1
00:00:00,000 --> 00:00:11,720
The logic of predicates is a basic concept in mathematical language, as well as being

2
00:00:11,720 --> 00:00:13,359
a topic on its own.

3
00:00:13,359 --> 00:00:18,679
In particular, I'm going to talk now about the idea of the two so-called quantifiers.

4
00:00:18,679 --> 00:00:25,920
For all, that's the upside down A, and exists, that's the backward E.

5
00:00:25,920 --> 00:00:28,440
So what's a predicate?

6
00:00:28,440 --> 00:00:31,880
Basically, a predicate is a proposition, except it's got variables.

7
00:00:31,880 --> 00:00:33,200
Here's an example.

8
00:00:33,200 --> 00:00:39,320
P of xy is the predicate that depends on x and y, and let's say it's defined to be x

9
00:00:39,320 --> 00:00:42,840
plus 2 equals y.

10
00:00:42,840 --> 00:00:47,480
Now in order to figure out whether or not a predicate is true, I need to know the values

11
00:00:47,480 --> 00:00:49,560
of the variables in this case x and y.

12
00:00:49,560 --> 00:00:55,679
So if I tell you that x is 1 and that y is 3, guess what?

13
00:00:55,679 --> 00:01:01,840
P of 1 and 3, P of x and y when x is 1 and y is 3 is true because in fact, 1 plus 2 is

14
00:01:01,840 --> 00:01:03,600
equal to 3.

15
00:01:03,600 --> 00:01:11,159
If I tell you that x is 1 and y is 4, then since 1 plus 2 is not equal to 4, P of 1 and

16
00:01:11,159 --> 00:01:12,159
4 is false.

17
00:01:12,159 --> 00:01:19,200
On the other hand, since P of 1 and 4 is false, that makes not P of 1 and 4 true.

18
00:01:19,200 --> 00:01:22,840
That's the easy part.

19
00:01:22,840 --> 00:01:30,359
Now the quantifiers are read as for all and exists, but they control a variable.

20
00:01:30,359 --> 00:01:36,840
So I write for all x, it means for, sorry, I write upside down a, x and I read it as for

21
00:01:36,840 --> 00:01:37,840
all x.

22
00:01:37,840 --> 00:01:42,520
I'm so used to reading it that I forgot that I needed to read symbols literally.

23
00:01:42,520 --> 00:01:47,960
And backwards, y is read as there exists some y.

24
00:01:47,959 --> 00:01:51,679
So let's see how that would work.

25
00:01:51,679 --> 00:01:56,679
The upside down a for all acts like an and and to understand what it means, let's look

26
00:01:56,679 --> 00:01:58,839
at this example.

27
00:01:58,839 --> 00:02:05,879
Let's let a variable s range over the staff members in 6042 at this term, which of whom

28
00:02:05,879 --> 00:02:10,280
there are about 30 counting the graders.

29
00:02:10,280 --> 00:02:14,719
Let's define a predicate that depends on the variable s called P of s that says that

30
00:02:14,719 --> 00:02:17,479
s is pumped about 6042.

31
00:02:17,479 --> 00:02:20,039
They're enthusiastic about being on the staff.

32
00:02:20,039 --> 00:02:21,039
OK.

33
00:02:21,039 --> 00:02:28,919
If I tell you for all s, P of s, that's exactly the same as saying that P of true is true

34
00:02:28,919 --> 00:02:34,960
and P of p is true and P of keshav is true and a whole bunch more ends down to P of

35
00:02:34,960 --> 00:02:35,960
mikaela.

36
00:02:35,960 --> 00:02:42,840
There'll be 29 ends if there are 30 staff members.

37
00:02:42,840 --> 00:02:46,759
Similarly, the backwards either exists acts like an or.

38
00:02:46,759 --> 00:02:53,879
If I tell you that T is now ranging over the 6042 staff just as s was and I write B of

39
00:02:53,879 --> 00:03:02,240
T, the predicate of T, that means T, the staff member T took 6042 before.

40
00:03:02,240 --> 00:03:07,599
Then if I tell you that there exists a T, B of T, what I'm telling you is that B of

41
00:03:07,599 --> 00:03:15,000
true either drew T, or P of t, or keshav T, or mikaela T before.

42
00:03:15,000 --> 00:03:21,919
This statement is true because in fact several of the staff members took 6042 from me before.

43
00:03:21,919 --> 00:03:26,919
I like to think that the previous one that everybody's pumped up on the staff is true,

44
00:03:26,919 --> 00:03:30,560
although I can't guarantee that.

45
00:03:30,560 --> 00:03:35,479
Let's do a little practice with existential quantifiers.

46
00:03:35,479 --> 00:03:39,919
Let's agree that the variables x and y will range for this example over the non-negative

47
00:03:39,919 --> 00:03:42,199
integers.

48
00:03:42,199 --> 00:03:49,439
Let's consider the following predicate about y that says that there's some x that's less

49
00:03:49,439 --> 00:03:50,439
than y.

50
00:03:50,439 --> 00:03:54,639
Q of y is there exists an x that x is less than y.

51
00:03:54,639 --> 00:03:56,039
Let's see what happens.

52
00:03:56,039 --> 00:03:58,679
Well, what about Q of 3?

53
00:03:58,680 --> 00:04:06,360
Q of 3 is saying that there is an x such that x is less than 3.

54
00:04:06,360 --> 00:04:10,000
Well, an example of such an x is 1.

55
00:04:10,000 --> 00:04:16,840
That means there is an x that's less than 3 because 1 isn't, so that makes this Q true.

56
00:04:16,840 --> 00:04:18,319
What about Q of 1?

57
00:04:18,319 --> 00:04:25,360
Well, again, there's an x that's a non-negative integer, namely 0, that's less than 1, and

58
00:04:25,360 --> 00:04:27,160
therefore Q of 1 is true.

59
00:04:27,160 --> 00:04:33,560
On the other hand, Q of 0 is false because there is no non-negative integer that's less than

60
00:04:33,560 --> 00:04:35,759
0.

61
00:04:35,759 --> 00:04:40,759
So there's no value that you can assign to x that's a non-negative integer that will make

62
00:04:40,759 --> 00:04:42,600
it less than 0.

63
00:04:42,600 --> 00:04:46,879
That one's not so bad, I hope.

64
00:04:46,879 --> 00:04:49,520
Let's look at the same example with a universal quantifier.

65
00:04:49,519 --> 00:04:55,879
This time we'll say that r of y means that for every x, x is less than y.

66
00:04:55,879 --> 00:05:01,399
Well, r of 1 is false, and the reason is that 5 is a counter example.

67
00:05:01,399 --> 00:05:06,479
5 is not less than 1, and so it's not true that every x is less than 1.

68
00:05:06,479 --> 00:05:15,240
r of 8 is false because 12 is not less than 8, and therefore not every x is less than 8.

69
00:05:15,240 --> 00:05:22,480
r of a Google 10 to the 100th is false because if you let x be a Google, it's not less than

70
00:05:22,480 --> 00:05:28,840
a Google, and so it's an example of the fact that this doesn't hold for all x's.

71
00:05:28,840 --> 00:05:31,160
That part's obvious.

72
00:05:31,160 --> 00:05:34,400
Okay.

73
00:05:34,400 --> 00:05:38,120
The thing that tends to confuse people in the beginning is what happens when you start

74
00:05:38,120 --> 00:05:39,600
mixing up quantifiers.

75
00:05:39,600 --> 00:05:41,639
So let's look at an intuitive example first.

76
00:05:41,639 --> 00:05:46,599
It might help you remember what happens when you have an a followed by an e, and then

77
00:05:46,599 --> 00:05:50,279
we'll look at an e followed by an a.

78
00:05:50,279 --> 00:05:55,959
So suppose I look at this statement, this time I'm going to tell you that v ranges over

79
00:05:55,959 --> 00:05:59,519
the possible computer viruses, not biological viruses.

80
00:05:59,519 --> 00:06:09,159
The range is over anti-virus software, defenses against viruses, and I want to look at the

81
00:06:09,160 --> 00:06:16,760
predicate that says for every virus, there is a defense such that d protects against v.

82
00:06:16,760 --> 00:06:19,640
This defense is good against that virus.

83
00:06:19,640 --> 00:06:20,640
All right.

84
00:06:20,640 --> 00:06:24,360
So each virus I have a defense for.

85
00:06:24,360 --> 00:06:30,120
So an example would be these are, by the way, dated viruses, but that's when the slides

86
00:06:30,120 --> 00:06:31,120
were made.

87
00:06:31,120 --> 00:06:36,960
So against the myDOOM virus, you could use a defender, a Microsoft defender.

88
00:06:36,959 --> 00:06:42,919
It's the I love you virus, you could use Norton against the Bobbless virus, you could use

89
00:06:42,919 --> 00:06:43,919
Zonal arm.

90
00:06:43,919 --> 00:06:46,680
Well, is that what we want?

91
00:06:46,680 --> 00:06:48,199
It's expensive.

92
00:06:48,199 --> 00:06:52,919
It means that for every different virus, I need a different defense.

93
00:06:52,919 --> 00:06:54,719
I have to spend a fortune on software.

94
00:06:54,719 --> 00:06:57,039
This is not what we want.

95
00:06:57,039 --> 00:07:03,599
So that's when for every virus, there's a defense, but the quantifiers are in the wrong order.

96
00:07:03,600 --> 00:07:05,240
This is reverse them.

97
00:07:05,240 --> 00:07:09,360
Suppose I tell you that there's one defense that's good for all viruses.

98
00:07:09,360 --> 00:07:18,000
There is a defense such that for every virus, d protects against v. For example, if d is

99
00:07:18,000 --> 00:07:21,320
MIT virus scan, then it would only be wonderful.

100
00:07:21,320 --> 00:07:24,920
It was true that d protects against all viruses.

101
00:07:24,920 --> 00:07:28,520
There's one defense, good against every attack.

102
00:07:28,519 --> 00:07:32,839
That's what we want because it's a lot cheaper.

103
00:07:32,839 --> 00:07:41,319
All right, let's start looking at a concrete mathematical example.

104
00:07:41,319 --> 00:07:51,000
I hope that that prelude with the viruses will help you decipher how the quantifiers behave.

105
00:07:51,000 --> 00:07:56,039
Let's look at this predicate now.

106
00:07:56,039 --> 00:07:57,879
This is a proposition.

107
00:07:57,879 --> 00:08:00,639
It really doesn't depend on the values of x and y.

108
00:08:00,639 --> 00:08:05,920
It's asking about all possible x's and all possible y's, whether there is one.

109
00:08:05,920 --> 00:08:12,879
In order to figure out whether a proposition like g is true, actually, I do need to know

110
00:08:12,879 --> 00:08:14,800
what x and y are ranging over.

111
00:08:14,800 --> 00:08:19,560
Because as you'll see, whether or not g comes out to be true, we'll depend on that.

112
00:08:19,560 --> 00:08:27,000
So I'm going to look at the domain of discourse that x and y range over.

113
00:08:27,000 --> 00:08:33,320
And we'll suppose that the domain is the non-negative integers.

114
00:08:33,320 --> 00:08:41,440
So now what she is saying is that if you give me a non-negative integer x, there is a y

115
00:08:41,440 --> 00:08:43,279
that's greater than x.

116
00:08:43,279 --> 00:08:48,679
In other words, I can find another non-negative integer that's bigger than x.

117
00:08:48,679 --> 00:08:50,159
Well, that's certainly true.

118
00:08:50,159 --> 00:08:52,399
There's a simple recipe for finding y.

119
00:08:52,399 --> 00:08:53,399
Give me x.

120
00:08:53,399 --> 00:08:56,879
Choose y to be x plus 1 or x plus 2.

121
00:08:56,879 --> 00:09:00,799
But I don't necessarily need to recipe as long as somewhere out there.

122
00:09:00,799 --> 00:09:03,439
There's a y that's bigger than x.

123
00:09:03,439 --> 00:09:04,480
This is true.

124
00:09:04,480 --> 00:09:11,279
So g is true when the domain of discourse is the non-negative integers.

125
00:09:11,279 --> 00:09:18,000
On the other hand, when I change the domain of discourse, different things can happen.

126
00:09:18,000 --> 00:09:21,240
So let's look at the negative integers.

127
00:09:21,240 --> 00:09:29,080
The integers less than 0 and ask, is it true that for every x, there's a y that's greater

128
00:09:29,080 --> 00:09:30,080
than x?

129
00:09:30,080 --> 00:09:31,759
Well, for a lot of them there is.

130
00:09:31,759 --> 00:09:37,960
If x is minus 3, then minus 2 is bigger than x.

131
00:09:37,960 --> 00:09:40,960
If x is minus 2, then minus 1 is bigger than x.

132
00:09:40,960 --> 00:09:42,519
But then I'm in trouble.

133
00:09:42,519 --> 00:09:50,000
If x is minus 1, there's no negative integer that's bigger than x.

134
00:09:50,000 --> 00:09:57,360
And so g is false when the domain of discourse is the negative integers.

135
00:09:57,360 --> 00:10:00,960
Well, let's shift again the point being here.

136
00:10:00,960 --> 00:10:06,079
Both we're looking at alternating quantifiers and we're understanding that the meaning of

137
00:10:06,079 --> 00:10:11,240
a truth of a proposition with quantifiers depends crucially on the domain of discourse.

138
00:10:11,240 --> 00:10:16,279
If we let the domain of discourse be the negative reels, then what this is saying is that

139
00:10:16,279 --> 00:10:20,720
for every negative real, there's a bigger negative real.

140
00:10:20,720 --> 00:10:27,799
And that of course is true because if you give me a negative real r, then r over 2, because

141
00:10:27,799 --> 00:10:30,639
its negative is actually bigger than r.

142
00:10:30,639 --> 00:10:37,360
And it will not be positive if r is in positive.

143
00:10:37,360 --> 00:10:41,680
So sure enough g in this case is true.

144
00:10:41,680 --> 00:10:45,080
All right, let's reverse the quantifiers and see what happens.

145
00:10:45,080 --> 00:10:47,480
It's worth thinking about.

146
00:10:47,480 --> 00:10:53,039
So let's call h the assertion that for every y, sorry, that there exists a y such that

147
00:10:53,039 --> 00:10:56,360
for every x, x is less than y.

148
00:10:56,360 --> 00:11:01,759
So intuitively what this is saying is there's a biggest element.

149
00:11:01,759 --> 00:11:04,560
Y is bigger than everything.

150
00:11:04,559 --> 00:11:09,959
Now if the domain is the non negative integers, then h is false because there's no biggest

151
00:11:09,959 --> 00:11:12,199
non negative integer.

152
00:11:12,199 --> 00:11:17,239
If it's the negative integers, it's false because there's no biggest negative integer.

153
00:11:17,239 --> 00:11:23,039
If it's the negative reels, it's false because there's no biggest negative real.

154
00:11:23,039 --> 00:11:31,319
But the truth is that this thing is going to be false in any domain of discourse in which

155
00:11:31,320 --> 00:11:38,800
less than is behaving as it should because any y is not going to be bigger than itself.

156
00:11:38,800 --> 00:11:44,360
So you can't possibly find a biggest y would have to be bigger than itself.

157
00:11:44,360 --> 00:11:48,720
This is going to be false in all of these sensible domains where less than behaves as we

158
00:11:48,720 --> 00:11:50,240
would expect.

159
00:11:50,240 --> 00:11:55,560
So let's make this slightly more interesting and make the y less than a, make that less

160
00:11:55,560 --> 00:11:56,640
than a less than or equal to.

161
00:11:56,639 --> 00:12:03,439
So now it's actually possible that there could be a biggest element that is greater than

162
00:12:03,439 --> 00:12:06,360
or equal to everything, including itself.

163
00:12:06,360 --> 00:12:12,639
And if you look at these domains, well there isn't any greatest non negative integer because

164
00:12:12,639 --> 00:12:15,679
for any x, x plus one is bigger.

165
00:12:15,679 --> 00:12:22,559
There isn't any biggest negative real, same reasoning for any r, r over two is going to

166
00:12:22,559 --> 00:12:24,600
be bigger.

167
00:12:25,000 --> 00:12:32,639
For the negative integers, there is a biggest y, namely minus one.

168
00:12:32,639 --> 00:12:36,240
It's greater than or equal to every other negative integer.

