---
title: PrincetonAlgorithms P103Part210 03_regular Expressions
---

1
00:00:00,000 --> 00:00:06,080
Today we're going to talk about regular expressions.

2
00:00:06,080 --> 00:00:10,800
This is another in the series of ingenious algorithms that we're looking at in the second half

3
00:00:10,800 --> 00:00:12,400
of this course.

4
00:00:12,400 --> 00:00:16,519
This is really one of the most widely used and one of the coolest algorithms that we're

5
00:00:16,519 --> 00:00:18,320
going to cover.

6
00:00:18,320 --> 00:00:21,960
To get started we have to talk about what is a regular expression.

7
00:00:21,960 --> 00:00:27,800
And just putting the problem in context we've always talked about before, on the last lecture

8
00:00:27,800 --> 00:00:32,600
we talked about the substring search problem which we're just trying to find one string

9
00:00:32,600 --> 00:00:34,200
in a text.

10
00:00:34,200 --> 00:00:37,880
Now we're talking about a more general problem, pattern matching problem, where we find

11
00:00:37,880 --> 00:00:41,760
one of a specified set of strings in the text.

12
00:00:41,760 --> 00:00:46,920
So that specified set rather than talk about one string we have to describe a set of

13
00:00:46,920 --> 00:00:50,640
strings and that's what regular expressions are all about.

14
00:00:50,640 --> 00:00:57,560
Here's an example from genomics, an actual example from a real life scientific data processing.

15
00:00:57,560 --> 00:01:05,480
So there's a thing called fragile X syndrome.

16
00:01:05,480 --> 00:01:14,800
The human genome contains a string that consists of C, T's, A's and G's, the way we've talked

17
00:01:14,800 --> 00:01:20,719
about before, and they naturally group themselves into groups of three.

18
00:01:20,719 --> 00:01:28,159
And there's a way to describe a correlation with the syndrome from a property of the text

19
00:01:28,159 --> 00:01:31,000
string or the genome string.

20
00:01:31,000 --> 00:01:35,519
The actual scientific data is shown over here on the right but we'll just work with the

21
00:01:35,519 --> 00:01:37,280
text strings.

22
00:01:37,280 --> 00:01:46,359
And the English, the description is that you've got somewhere in your genome repeats of either

23
00:01:46,359 --> 00:01:56,760
CGG or AGG that are bracketed by GCG at the beginning and CTG at the end.

24
00:01:56,760 --> 00:01:59,560
Now the number of repeats inside is variable.

25
00:01:59,560 --> 00:02:05,239
So in this case we've got GCG, that's the beginning thing.

26
00:02:05,239 --> 00:02:12,920
And then we've got a CGG, that's one, AGG, that's two, CGG, that's three.

27
00:02:12,920 --> 00:02:15,680
So we got three repeats, I want of these two patterns.

28
00:02:15,680 --> 00:02:17,960
And then we have CGG.

29
00:02:17,960 --> 00:02:22,400
Now different genome might have many more of these triplet patterns inside.

30
00:02:22,400 --> 00:02:30,080
The number of repeats is variable but high repeats is correlated with fragile X syndrome.

31
00:02:30,080 --> 00:02:37,719
So clearly medical professionals want to know given a genome does it have a high number

32
00:02:37,719 --> 00:02:41,240
of repeats with this kind of pattern.

33
00:02:41,240 --> 00:02:46,360
And if so then we want to look out for this fragile X syndrome.

34
00:02:46,360 --> 00:02:52,159
And the specifying the problem in English is one thing but specifying it in a way that's

35
00:02:52,159 --> 00:02:57,280
amenable to writing a program to help us find these patterns is another.

36
00:02:57,280 --> 00:02:59,800
And this is the way that we specify the pattern.

37
00:02:59,800 --> 00:03:01,920
This thing is called a regular expression.

38
00:03:01,920 --> 00:03:09,920
So it's take a CGG and then either a CGG, GCG, and then either a CGG or an AGG.

39
00:03:09,919 --> 00:03:13,000
Many number of times followed by a CGG.

40
00:03:13,000 --> 00:03:18,199
That's specifying a set of strings and we want to find if the text has one of that specified

41
00:03:18,199 --> 00:03:21,119
set.

42
00:03:21,119 --> 00:03:27,399
Here's another example where regular expressions appear in real life.

43
00:03:27,399 --> 00:03:36,759
There's a new source highlight program that we use to highlight syntax, I like keywords

44
00:03:36,759 --> 00:03:42,359
in our text and also gray out comments and so forth.

45
00:03:42,359 --> 00:03:46,759
And this is a very general program that works for many different kinds of languages and

46
00:03:46,759 --> 00:03:51,799
outputs to many different print formats.

47
00:03:51,799 --> 00:03:57,000
And that's all about identifying one of a specified set of strings in the text and doing

48
00:03:57,000 --> 00:03:58,000
something with it.

49
00:03:58,000 --> 00:04:02,759
It's an application of regular expressions in real life.

50
00:04:02,759 --> 00:04:12,120
In Google you can search in public search code, it's public source code for regular expression

51
00:04:12,120 --> 00:04:19,000
search so you can search for code that contains any one of a specified set of strings and

52
00:04:19,000 --> 00:04:22,439
that's a available facility on the web.

53
00:04:22,439 --> 00:04:24,719
There's many, many other applications.

54
00:04:24,720 --> 00:04:30,200
The one is a pro site in biology.

55
00:04:30,200 --> 00:04:37,480
There's a bunch of specified patterns that you can use to search the genome.

56
00:04:37,480 --> 00:04:43,960
Or processing natural language is all about string processing and specifying sets of strings,

57
00:04:43,960 --> 00:04:47,520
programming languages themselves.

58
00:04:47,520 --> 00:04:53,200
And another one we'll look at later on is validating when you're getting data entry from the

59
00:04:53,200 --> 00:04:54,200
web.

60
00:04:54,199 --> 00:04:58,159
And you type in a credit card number you're told whether it's legal or not and that's

61
00:04:58,159 --> 00:05:00,000
all done with regular expressions.

62
00:05:00,000 --> 00:05:04,079
It's the string you typed in one of the specified sets.

63
00:05:04,079 --> 00:05:10,439
So this is a very widely used and widely useful application.

64
00:05:10,439 --> 00:05:20,099
So we're going to look into the more general idea that this brings out is the idea of

65
00:05:20,100 --> 00:05:27,740
parsing text files and not only finding if a string match is a pattern but finding the

66
00:05:27,740 --> 00:05:32,939
structure of a string that we can use in some kind of beneficial way.

67
00:05:32,939 --> 00:05:35,500
And we'll come back to it more.

68
00:05:35,500 --> 00:05:41,660
So we're looking at a basic capability that's widely useful but it also extends to cover

69
00:05:41,660 --> 00:05:46,500
deep issues and processes in computer science.

70
00:05:46,500 --> 00:05:48,540
So what is a regular expression?

71
00:05:48,540 --> 00:05:53,220
Well it's simply a notation to specify a set of strings.

72
00:05:53,220 --> 00:05:55,140
The set could be infinite.

73
00:05:55,140 --> 00:05:59,580
We're going to specify it with a finite pattern but it could be infinite.

74
00:05:59,580 --> 00:06:05,460
And we make a regular expression up just from four simple operations.

75
00:06:05,460 --> 00:06:08,020
First one is called concatenation.

76
00:06:08,020 --> 00:06:12,740
So that's we just take a bunch of letters and put them one after the other.

77
00:06:12,740 --> 00:06:19,379
And a regular expression made from concatenation matches exactly precisely the sequence of

78
00:06:19,379 --> 00:06:23,540
characters that are specified and it doesn't match anything else.

79
00:06:23,540 --> 00:06:31,259
So that's a simple one by itself and that's what we use for substring search for example.

80
00:06:31,259 --> 00:06:33,060
Then there's OR.

81
00:06:33,060 --> 00:06:39,819
So that one we give two different regular expressions and put a vertical bar between them and

82
00:06:39,819 --> 00:06:44,540
that says we're specifying now a set of size two and we're happy to match either string

83
00:06:44,540 --> 00:06:49,300
in that set on there's no other string that we match.

84
00:06:49,300 --> 00:06:53,740
And then there's one called closure and this is where infinite comes in.

85
00:06:53,740 --> 00:07:00,139
So when we put a star after a character or a regular expression as we'll see that's

86
00:07:00,139 --> 00:07:04,860
specifying zero or more occurrences of that character.

87
00:07:04,860 --> 00:07:10,460
So AA matches a, b star a because that's zero or occurrences of b in between or a with

88
00:07:10,460 --> 00:07:18,699
eight b's followed by an a matches because that's got zero or more b's in between the two a's.

89
00:07:18,699 --> 00:07:23,500
But if you don't have an a at the beginning and the end or if you don't have all b's inside

90
00:07:23,500 --> 00:07:28,300
it doesn't match and that's an infinite number string zero or any number of occurrences of

91
00:07:29,100 --> 00:07:33,980
b. So with just four characters we're specifying an infinite set of strings.

92
00:07:35,500 --> 00:07:44,620
And then the next operation to allow us to build regular expressions of arbitrary complexity

93
00:07:44,620 --> 00:07:52,300
is simply parentheses. If you include regular expressions within parentheses then you can apply

94
00:07:52,379 --> 00:08:01,259
the star operator or concatenation to another regular expression. So these are examples of

95
00:08:02,139 --> 00:08:08,780
regular expressions using parentheses. So this says a and then what's inside the parentheses

96
00:08:08,780 --> 00:08:15,100
which is the regular expression that says either a or b and then followed by a a b. So that matches

97
00:08:15,100 --> 00:08:21,259
precisely these two strings either a followed by an a followed by a b or a followed by a b followed

98
00:08:21,819 --> 00:08:27,899
and it doesn't match anything else. Or if you put a more complicated regular expression inside

99
00:08:27,899 --> 00:08:34,779
parentheses with a star it still means zero or more occurrences. So just a would be zero occurrences

100
00:08:35,659 --> 00:08:41,740
and then this is one two three four occurrences of a b followed by a. And again if it's not of that

101
00:08:41,740 --> 00:08:50,539
form it doesn't match. This one doesn't have an a b and neither does this. It has one a b but then

102
00:08:50,539 --> 00:08:56,539
the next one would have to be either a b or a. There's no way to get one of these strings by

103
00:08:56,539 --> 00:09:04,059
including zero more occurrences of a b. These things here are a precedence order when we perform

104
00:09:04,059 --> 00:09:11,339
the operations. So the first thing is parentheses. The next thing is the star and next thing is concatenation

105
00:09:11,339 --> 00:09:20,059
and finally the or operation. In this table then completely specifies what we mean by a regular

106
00:09:20,059 --> 00:09:27,739
expression. It's a sequence of characters, alphabet characters like a and b and meta characters

107
00:09:27,739 --> 00:09:34,059
like or and star and parentheses that we use to describe possibly infinite set of strings.

108
00:09:35,179 --> 00:09:44,939
Now in the real world it's often worthwhile and useful to add some additional operations for

109
00:09:44,940 --> 00:09:52,220
convenience. For example the wild card operation is to have a dot another meta character that matches

110
00:09:52,220 --> 00:10:02,380
any letter at all. And that's a shorthand for listing all the letters separated by or and then

111
00:10:03,020 --> 00:10:10,380
but that's a lot of characters and so with one character we can match the same regular expression.

112
00:10:11,340 --> 00:10:18,139
And so this one you can use like to solve a crossword puzzle for example. This one matches all the

113
00:10:18,139 --> 00:10:25,019
words that we have alternating use all the seven letter words have alternating use. And so there's

114
00:10:25,019 --> 00:10:30,059
a couple but there's some other ones that sort of have alternating use but not quite on the

115
00:10:30,059 --> 00:10:36,539
don't match. That's a wild card character. And then there's classes of characters so

116
00:10:38,379 --> 00:10:45,579
capital A dash Z means any capital letter and then small A dash Z means any lowercase letter.

117
00:10:46,779 --> 00:10:54,859
So any capitalized letter any lowercase letter followed by any number of lowercase letters will

118
00:10:54,860 --> 00:11:00,139
match something like this but it won't match something like that. So classes of characters. And

119
00:11:00,139 --> 00:11:08,139
again this is shorthand for typing all the characters and using the word. At least one so rather

120
00:11:08,139 --> 00:11:16,060
than star which says zero or more occurrences plus means one or more occurrences. So that's another

121
00:11:16,060 --> 00:11:24,620
example of a convenience shorthand or exactly K putting in braces that I want to specify this is

122
00:11:24,620 --> 00:11:30,940
specifies I want exactly five digits followed by a dash followed by exactly four digits. So that's

123
00:11:30,940 --> 00:11:38,620
a way to specify something like a legal plus four zip code and it doesn't match other things.

124
00:11:39,659 --> 00:11:48,620
Now in practical in terms of practical clients these types of shorthands are extremely important

125
00:11:48,620 --> 00:11:57,019
in terms of the theory and the idea of processing regular expression since we can specify them all

126
00:11:57,019 --> 00:12:04,139
with the basic operations we'll pretty much ignore them in our code. So in every in every case

127
00:12:05,019 --> 00:12:12,060
we could write A plus if we wanted we could write this long hand of it but of course uses are

128
00:12:12,060 --> 00:12:17,500
going to write the shorthand but still if we have a mechanism for dealing with this then we can

129
00:12:17,500 --> 00:12:27,019
certainly take care of the shorthand. So just with those basic operations and also the shorthand is

130
00:12:27,019 --> 00:12:35,100
helpful our notation is amazingly expressive that's really a lot you can do with it. So for example you

131
00:12:35,100 --> 00:12:42,779
can do substring search with a regular expression. One way to express the substring search problem is

132
00:12:42,779 --> 00:12:49,579
to put your string preceded by dot star and put a dot star at the end and that asking if your

133
00:12:49,579 --> 00:12:55,659
string is in the infinite language described by this regular expression is equivalent to the substring

134
00:12:55,659 --> 00:13:01,500
search problem. It matches if and only if that strings in there. So for example on these two and not

135
00:13:01,500 --> 00:13:09,899
in that too. So notation covers the substring search problem but then also it can specify easily

136
00:13:10,860 --> 00:13:18,699
useful sets of strings that we often want to check. So this is similar to the z plus four.

137
00:13:18,699 --> 00:13:23,340
It's three digits followed by dash followed by two digits followed by dash followed by four digits.

138
00:13:23,899 --> 00:13:29,500
That's a good start towards knowing whether the string is a legal social security number or not

139
00:13:31,419 --> 00:13:38,299
or is it a legal email address or not. This is a simplified version but it basically says you

140
00:13:38,299 --> 00:13:44,779
ought to have at least one letter followed by an ad and followed by some letters followed by a dot

141
00:13:44,779 --> 00:13:51,979
followed by edu or com or of course to cover all email addresses you need to consider some more

142
00:13:51,979 --> 00:14:01,419
possibilities. But this is a quick and succinct way to specify a set of strings or Java identifier

143
00:14:01,419 --> 00:14:07,740
or what's a legal Java identifier. So this is one way to specify a legal jargon, Java identifier.

144
00:14:08,299 --> 00:14:15,179
And indeed programming languages like Java use regular expressions like this to define what they

145
00:14:15,179 --> 00:14:20,059
mean by a legal identifier and then the kinds of processes that we're going to talk about to

146
00:14:20,059 --> 00:14:25,659
actually check that what you type is legal. And that goes all the way up to the program itself.

147
00:14:27,899 --> 00:14:35,979
Is this a legal Java program is almost but not quite as we'll see in a regular expression

148
00:14:35,980 --> 00:14:44,460
pattern matching problem. Very very expressive and widely used language. Now what's really interesting

149
00:14:44,460 --> 00:14:50,539
about this topic and we'll just touch on it although it's extremely important to what we're going

150
00:14:50,539 --> 00:15:00,379
to do is that just from the standpoint of the theory of computation starting with time of touring

151
00:15:00,379 --> 00:15:07,740
and others in the 30s regular expressions play an important role in our understanding of the

152
00:15:07,740 --> 00:15:15,580
theory of computation. And that understanding actually has led to the algorithm that we're going

153
00:15:15,580 --> 00:15:24,220
to talk about. That's a very interesting aspect of this. But still even given that regular

154
00:15:24,379 --> 00:15:31,019
regular expressions are just useful in everyday life. This is an example of someone that used a

155
00:15:31,019 --> 00:15:43,420
regular expression to screen a job candidate and this is actually illegal to look for words like

156
00:15:43,420 --> 00:15:53,019
anron or carry or busher gore or republican to decide whether a job candidate's application will

157
00:15:53,019 --> 00:16:01,340
get through. This one uses an exclamation point which means just end with anything. It's like that

158
00:16:01,340 --> 00:16:15,740
star. So someone typical computer user can learn to use regular expressions with great effect.

159
00:16:16,700 --> 00:16:25,100
Even Google supports regular Google search window supports star as a full word wild card

160
00:16:25,100 --> 00:16:35,259
or for union although not a full regular expression pattern matching although that day is surely coming.

161
00:16:36,860 --> 00:16:43,899
So people who just get into it just a little bit and start to see the utility of regular expression

162
00:16:43,899 --> 00:16:52,860
certainly get excited about it and you can find examples of this all through the web. This is an

163
00:16:52,860 --> 00:17:03,419
XKCD comic about it where there's a problem. How can we search through 200 megabytes of emails

164
00:17:03,419 --> 00:17:08,700
looking for something format like an address. And lawyers want to do this all the time nowadays

165
00:17:08,700 --> 00:17:16,220
and it's hopeless. But no, I know regular expressions and the regular expression super being

166
00:17:17,259 --> 00:17:24,380
swoops to the rescue and types of regular expression in Perl which is a widely used language

167
00:17:24,380 --> 00:17:29,420
that's based on regular expressions. We'll talk about it briefly in a minute and swoops away. So

168
00:17:29,420 --> 00:17:35,340
there is somewhat of a feeling of people that know just a little bit that regular expressions

169
00:17:36,139 --> 00:17:42,699
can be used to solve any problem. That's not quite true as we know from the theory computation and

170
00:17:42,699 --> 00:17:50,539
we'll also touch on that a little bit. So the question is can the average programmer learn to use

171
00:17:50,539 --> 00:17:56,539
regular expressions effectively. There's all kinds of evidence out there that lots of programmers use

172
00:17:56,539 --> 00:18:03,819
them extensively but not to throw cold water on it but we have to take everything with some

173
00:18:03,819 --> 00:18:09,500
restraint. And here's an example of a regular expression that you can find out on the web.

174
00:18:10,460 --> 00:18:15,819
It's written in Perl but it's a regular expression not to check whether an email address is valid or not.

175
00:18:17,819 --> 00:18:24,539
Now that is quite a regular expression. In one might argue whether that's really an effective

176
00:18:24,539 --> 00:18:31,740
way to use regular expressions. Maybe there's a simpler and easier way not to check for a valid email

177
00:18:31,740 --> 00:18:39,099
address. But anyway this one's out there and is used probably being used efficiently somewhere

178
00:18:39,099 --> 00:18:48,700
effectively somewhere today. But really for people who are educated in computer science need to know

179
00:18:48,700 --> 00:18:56,140
that regular expressions are definitely powerful tools but writing a regular expression really is

180
00:18:56,140 --> 00:19:04,380
like writing a program. You have to understand the underlying programming model. It's often even more

181
00:19:04,380 --> 00:19:10,300
so than many programming languages since there's so few rules it's easier to write a regular expression

182
00:19:10,300 --> 00:19:15,580
than a district read one. And if it's difficult to read it means it's difficult to debug.

183
00:19:17,020 --> 00:19:24,700
And so you can find a lot of flaming on the web about this. And this is a particular apt

184
00:19:24,700 --> 00:19:30,140
particularly apt quote. Some people when confronted with a problem think I know I'll use regular

185
00:19:30,140 --> 00:19:38,220
expressions. Now they have two problems. And I think that's a good way to summarize the bottom line

186
00:19:38,220 --> 00:19:46,460
that regular expressions are amazingly powerful and expressive. But they can get very complex

187
00:19:46,460 --> 00:19:52,860
in an error firm in real applications. Still there's plenty of real applications where they can be

188
00:19:52,859 --> 00:19:58,619
succinct and effective. And so we're going to look next at regular expression pattern matching algorithm.

