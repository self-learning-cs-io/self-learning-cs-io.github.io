---
title: CS143 P13Week203 05 Lexical Specifications Final Quizupdate
---

1
00:00:00,000 --> 00:00:04,480
Welcome back. In this video, I'm going to show how to use regular expressions to specify

2
00:00:04,480 --> 00:00:07,000
different aspects of programming languages.

3
00:00:07,000 --> 00:00:14,640
Let's begin with the keywords. This is a relatively simple case, and I'll just do it for

4
00:00:14,640 --> 00:00:19,199
three keywords. I'll write a regular expression for if, else, or then. It'll be obvious how

5
00:00:19,199 --> 00:00:26,320
to do it for more. Let's write a regular expression for if, and that would be the regular expression

6
00:00:26,320 --> 00:00:32,240
for I, and followed by the regular expression for if, and we're taking the concatenation

7
00:00:32,240 --> 00:00:37,840
of these two. Then we're going to union that with the regular expression for else, and

8
00:00:37,840 --> 00:00:41,700
what is that? Well, else consists of four individual characters, so we have to write

9
00:00:41,700 --> 00:00:48,920
out the concatenation of those four characters. As you can see, this is a little bit verbose

10
00:00:48,920 --> 00:00:54,519
with all of these quotes and kind of messy to read. In fact, there's a shorthand that's

11
00:00:54,520 --> 00:00:59,960
normally used, and let me switch over to that right now. If I want to write the regular

12
00:00:59,960 --> 00:01:05,840
expression for a sequence of single character expressions, I could just put quotes around

13
00:01:05,840 --> 00:01:11,200
the outermost characters in the sequence. For example, most of the tools will let you write

14
00:01:11,200 --> 00:01:15,560
this. I put a quote at the beginning, I write IF, and I write closed quote, and this means

15
00:01:15,560 --> 00:01:20,840
exactly the same thing as this. This is the concatenation of two single character regular

16
00:01:20,840 --> 00:01:30,560
expressions, and similarly for else, and similarly for then. If I have more keywords,

17
00:01:30,560 --> 00:01:38,600
I just write them out and union them all together. Now let's consider a slightly more complicated

18
00:01:38,600 --> 00:01:44,560
example. Now let's think about how to specify the integers, which we want to be the non-empty

19
00:01:44,560 --> 00:01:49,159
strings of digits. So the first problem here is to write out what a digit is, and that's

20
00:01:49,159 --> 00:01:55,359
pretty straightforward. A digit is just any of the individual characters 0 through 9,

21
00:01:55,359 --> 00:02:01,359
and we already know how to write out single character regular expressions. It's just

22
00:02:01,359 --> 00:02:09,840
a union of 10 of those to specify this, and it'll take me just a moment to finish. There

23
00:02:09,840 --> 00:02:16,120
we go. So that's a regular expression for the set of strings corresponding to all the

24
00:02:16,120 --> 00:02:22,240
single digits, and because we'll want to refer to this from time to time, and also because

25
00:02:22,240 --> 00:02:26,800
there's a very common thing to want to do, most tools have a facility for naming regular

26
00:02:26,800 --> 00:02:33,200
expressions. So for example, I can name this one to be digit. So a single digit is anything

27
00:02:33,200 --> 00:02:40,080
that is generated or is in the set to note it by this regular expression. Now what we want

28
00:02:40,080 --> 00:02:47,080
to do is to have multiple digits. Well, we know a way to do that. We can just iterate

29
00:02:47,080 --> 00:02:52,400
a single digit as many times as we like, and so here we get all strings, all possible strings

30
00:02:52,400 --> 00:02:58,320
of digits. And this is very, very close to what we want to accept that. The string that

31
00:02:58,320 --> 00:03:05,320
we want has to be non-empty. We don't want to count the empty string as an integer. And

32
00:03:05,719 --> 00:03:12,159
that's an easy way to do that. We just say that the whole sequence has to begin with a single

33
00:03:12,159 --> 00:03:18,759
digit, and then it's followed by zero or more additional digits. So just to reiterate

34
00:03:18,759 --> 00:03:23,240
that, we say there has to be at least one digit, and then it's followed by zero more additional

35
00:03:23,240 --> 00:03:28,719
digits. And this pattern actually, for a given language, is extremely common. So if I want

36
00:03:28,719 --> 00:03:36,879
to say that I have at least one A, I write that as A star, because this says zero or more

37
00:03:36,879 --> 00:03:41,079
A. The second part says zero or more A's, and the first part says it has to be at least

38
00:03:41,079 --> 00:03:46,360
one A. And because this is so common, there's a shorthand for it, I think it's supported

39
00:03:46,360 --> 00:03:52,680
by every regular expression processor, and that is to write A plus. And A plus means

40
00:03:52,680 --> 00:03:58,520
is just a shorthand for A A star. And so we can actually simplify this regular expression

41
00:03:58,520 --> 00:04:09,200
a bit and write simply digit plus. Now let's look at yet another example, even more sophisticated,

42
00:04:09,200 --> 00:04:14,480
than the previous two. Let's think about how to define the identifiers, which are strings of

43
00:04:14,480 --> 00:04:20,920
letters or digits that begin with a letter. And so we already know how to do digits. So let's focus

44
00:04:20,920 --> 00:04:26,120
on the letters for a moment. So how will we write out a regular expression for the letters? Well,

45
00:04:26,120 --> 00:04:30,759
we're going to want to name it. So we'll say that the letters are actually a single letter.

46
00:04:30,759 --> 00:04:36,840
And now we have to write a regular expression for all the individual letters. And that's

47
00:04:36,840 --> 00:04:45,240
you know, straightforward, but tedious. We have to say little A, lowercase B, lowercase C,

48
00:04:45,240 --> 00:04:50,000
lowercase D. And well, as you can see, this is going to be rather a large regular expression.

49
00:04:50,000 --> 00:04:55,280
We're going to have 26 lowercase letters and 26 uppercase letters. And the whole thing

50
00:04:55,279 --> 00:05:02,719
is going to be rather tedious to write down. So let's actually not do that. Instead, let me mention a

51
00:05:02,719 --> 00:05:08,239
shorthand that the tool support to make it easier to write out exactly this kind of regular expression,

52
00:05:08,239 --> 00:05:14,479
which is called a character range. So inside of square brackets, I can write a range of characters. So how do I do

53
00:05:14,479 --> 00:05:20,239
that? Well, I have a starting character and an ending character. And I separate them by a hyphen. And what this

54
00:05:20,240 --> 00:05:26,000
means is the union of all the single character regular expressions beginning with the first character

55
00:05:26,000 --> 00:05:30,720
and ending with the second character. So everything in between. So this is exactly the regular expression

56
00:05:30,720 --> 00:05:35,840
for all the lowercase letters. And then I can have another character range inside the same square

57
00:05:35,840 --> 00:05:43,040
brackets for all the uppercase letters. So capital A through capital Z. Okay. And this regular

58
00:05:43,040 --> 00:05:49,199
expression here on the right defines exactly the big union that I didn't want to write out. Okay.

59
00:05:49,199 --> 00:05:53,519
And that gives us a definition of a single letter. And now we're in great shape. We already have a

60
00:05:53,519 --> 00:05:59,199
definition for a digit. We already, now we have definition for letter. And so that we can write out

61
00:05:59,199 --> 00:06:05,919
the rest of this definition. So we want the whole regular expression to always begin with a letter. Okay.

62
00:06:05,919 --> 00:06:12,719
So identify, always begins with a letter. And after that, it's allowed to be a string of letters or digits. Okay.

63
00:06:12,720 --> 00:06:19,760
So the OR suggests that there's going to be a union. So after the first letter, we can have either a

64
00:06:19,760 --> 00:06:26,960
letter or a digit. And then we can have an arbitrary string of those things. So we put a star on the

65
00:06:26,960 --> 00:06:31,680
whole thing. And that is the definition of an identifier begins with a single letter. And it's followed

66
00:06:31,680 --> 00:06:41,200
by zero or more letters and digits. Now, because we're doing a complete laxical specification,

67
00:06:41,199 --> 00:06:48,479
we also have to deal with even the parts of the string that we're not really interested in. We have

68
00:06:48,479 --> 00:06:52,240
to have at least a specification of them so that we can recognize them and throw them away. In

69
00:06:52,240 --> 00:06:57,519
particular, we have to be able to recognize the white space. And we're going to just take white

70
00:06:57,519 --> 00:07:02,319
space to be a non-empty sequence of blanks, new lines, and tabs, even though there are other

71
00:07:02,319 --> 00:07:06,319
kinds of white space characters, things that may be like rub out, depending on your keyboard,

72
00:07:06,319 --> 00:07:10,959
there might be others. But these three will suffice to illustrate all the important points.

73
00:07:10,959 --> 00:07:17,359
So a blank is relatively easy to write down. That's just single quotes around a blank space.

74
00:07:17,359 --> 00:07:23,599
But there's a problem with new line and tab. Because a new line, a carriage return in the file,

75
00:07:24,159 --> 00:07:29,839
has special meaning, typically. In the line, you end whatever command you're working on in these

76
00:07:29,839 --> 00:07:36,079
regular expression tools, lexical tools. And a tab also is not an easy thing to write down,

77
00:07:36,079 --> 00:07:40,560
and it doesn't look much different from a blank in a lot of cases. So what tools do is they

78
00:07:40,560 --> 00:07:46,560
provide a separate name for these. And typically, it's done by having some kind of escape character,

79
00:07:47,439 --> 00:07:54,000
and a backslash is the most common one that's used. And then followed by a name for the character.

80
00:07:54,800 --> 00:08:00,480
Backslash N is typically used for new line and backslash T is typically used for tabs.

81
00:08:01,360 --> 00:08:04,639
And I just want to stress, I mean, the reason for doing this example is to illustrate this,

82
00:08:05,120 --> 00:08:11,360
that we have to have a way of naming some characters that don't really have a very nice print

83
00:08:11,360 --> 00:08:16,479
representation. There are other characters that don't even have really any kind of print

84
00:08:16,479 --> 00:08:20,319
representation. And we still need a way to talk about them in our regular expressions,

85
00:08:20,319 --> 00:08:26,399
because they might be embedded in a file that we have to electrically analyze at some point.

86
00:08:26,399 --> 00:08:32,000
And so anyway, the way this is done is by providing a separate naming scheme for such

87
00:08:32,000 --> 00:08:37,200
unprintable characters. And typically it's done with an escape sequence. So something beginning

88
00:08:37,200 --> 00:08:41,919
with a special character like backslash followed by the name of the character. So N for new line,

89
00:08:41,919 --> 00:08:47,600
this case, and T for tab. And so to finish off our definition, this gives us one character white

90
00:08:47,600 --> 00:08:53,440
space, and then we want a non-MP sequence of such things. So we wrap the whole union there

91
00:08:53,440 --> 00:08:57,840
in parentheses and put a plus on it, and that gets us what we want.

92
00:08:58,320 --> 00:09:06,560
Let's pause for a moment in discussing programming languages and look at another example of using

93
00:09:06,560 --> 00:09:12,240
regular expressions from a different domain. Here I have an email address, and as it turns out,

94
00:09:12,240 --> 00:09:17,840
email addresses form a regular language, and every email processing device in the world, so your

95
00:09:17,840 --> 00:09:25,519
mailer and the mail servers that you use, all do regular expression processing to understand what

96
00:09:25,519 --> 00:09:32,319
the email address is telling them in the email messages that go by. And so we can think of an

97
00:09:32,319 --> 00:09:38,159
email address as consisting of four different strings separated by punctuation. There's a user name,

98
00:09:38,159 --> 00:09:45,120
and then three parts to the domain. And let's just assume for simplicity that these strings only

99
00:09:45,120 --> 00:09:50,159
consist of letters, and practice they can consist of other kinds of characters too, but let's just

100
00:09:50,159 --> 00:09:54,720
keep things simple. And we can write out the more complicated thing using regular expressions,

101
00:09:54,720 --> 00:10:00,240
but the structure will be the same as if we just consider them to be made of letters. And then

102
00:10:00,240 --> 00:10:06,639
these four strings are separated by punctuation. So there's the at sign and two decimal points that

103
00:10:08,240 --> 00:10:12,240
form the separators of the strings. And so this is a relatively straightforward thing to write

104
00:10:12,240 --> 00:10:20,000
a regular expression for, given what we know so far. So the user name would be a non-MP sequence of

105
00:10:20,000 --> 00:10:25,759
letters, and then that would be followed by an at sign. And then the first part of the domain

106
00:10:26,480 --> 00:10:32,720
would also be a non-MP sequence of letters followed by a dot. And then the rest is just the same.

107
00:10:38,080 --> 00:10:43,919
Okay, so here very quite concisely we have specified large family of email addresses. As I said

108
00:10:44,639 --> 00:10:48,960
in reality, the email addresses are slightly more complicated, but they can be written out with a

109
00:10:48,960 --> 00:10:51,600
just a slightly more complicated regular expression.

110
00:10:55,200 --> 00:11:01,519
Finally, for our last example, let's look at a fragment of the lexical specification of a real

111
00:11:01,519 --> 00:11:07,600
programming language. In this case, that language is Pascal, which is in the alcohol family of

112
00:11:07,600 --> 00:11:13,440
languages. Pascal is an early example of a type language, and it's in the same general family as

113
00:11:13,520 --> 00:11:21,360
Portran and C. And this particular fragment of Pascal deals with the definition of numbers.

114
00:11:21,360 --> 00:11:25,440
And so let's take a look here. I'll start at the bottom and look at what the overall definition

115
00:11:25,440 --> 00:11:33,920
of a number is. So a number consists of three things, some digits, and I'll just read out this

116
00:11:33,920 --> 00:11:39,360
abbreviation, an optional fraction, and an optional exponent. So we're dealing here with floating

117
00:11:39,440 --> 00:11:46,480
point numbers. And so a floating point number can have a bunch of digits, and then it can be followed

118
00:11:46,480 --> 00:11:51,680
possibly by a fraction or not, and that can be followed possibly by an exponent or not.

119
00:11:53,519 --> 00:11:57,519
And the idea, although we can't see it just from this particular definition, is that either the

120
00:11:57,519 --> 00:12:03,440
fraction or the exponent can be present independent of the other. So now let's work briefly from

121
00:12:03,440 --> 00:12:08,560
the bottom up. Let's just check that digits are what we expect. So a single digit is in fact the

122
00:12:08,559 --> 00:12:14,399
union of all the common digits, just as we would hope. And then a non-empty sequence of digits

123
00:12:14,399 --> 00:12:19,679
is a digit plus. So this is what we've already seen. And now the interesting bit is to look at how

124
00:12:19,679 --> 00:12:24,639
the optional fraction and the optional exponent are defined. And the optional fraction looks a little

125
00:12:24,639 --> 00:12:31,759
less scary. So let's do that one first. So what's going on inside the fraction? Well, if we have a

126
00:12:31,759 --> 00:12:36,319
decimal fraction, there's going to be a decimal point, and that's going to be followed by a string

127
00:12:36,320 --> 00:12:41,280
of digits. So this is just the fractional parts of the floating point number, so stuff that comes

128
00:12:41,280 --> 00:12:47,440
after the decimal point. And what's this plus epsilon doing out here? Well, remember the plus

129
00:12:47,440 --> 00:12:54,080
is union, and epsilon stands for the empty string. So what this is saying is that either the

130
00:12:54,080 --> 00:12:59,600
fractional portion of the number is present, or it's completely absent. So this is how you say

131
00:12:59,600 --> 00:13:05,680
something is optional. You write out the regular expression for the thing, and then you do plus

132
00:13:05,679 --> 00:13:10,879
epsilon at the end, and that means, well, either everything I said before can be there, or nothing

133
00:13:10,879 --> 00:13:17,279
is there. Okay? And the optional exponent is structured similarly, but it's somewhat more complex.

134
00:13:18,000 --> 00:13:22,319
So you can see that the whole exponent is optional, because there's some regular expression here

135
00:13:23,759 --> 00:13:29,439
that's unioned with epsilon. And so either something is there, and this is the optional,

136
00:13:29,439 --> 00:13:34,079
this is the exponent part, or it's not present at all. And now let's look inside at how the

137
00:13:34,160 --> 00:13:41,120
exponent is defined if it's there. So an exponent always begins with E. So this is a standard

138
00:13:41,120 --> 00:13:47,440
exponent notation, and it always has a non-empty string of digits. So there's E followed by some

139
00:13:47,440 --> 00:13:52,800
digits, and in between, there's an optional sign. We know the sign is optional, because epsilon is

140
00:13:52,800 --> 00:14:00,000
one of the possibilities. The whole sign might be absent, and then what are the possibilities for

141
00:14:00,080 --> 00:14:04,720
the sign? Well, it could be negative, or it could be positive. So either there's a positive or negative

142
00:14:04,720 --> 00:14:11,360
sign, or no sign, in which case, presumably it's interpreted to be positive. Now this idiom,

143
00:14:12,080 --> 00:14:17,440
where we have plus epsilon, indicates that something is optional, is also extremely common.

144
00:14:17,440 --> 00:14:22,720
And so there's another shorthand that many tools provide. So another way of writing this, that's

145
00:14:23,680 --> 00:14:33,840
common, is to say that that's my fractional component, and then it might be absent. So the question

146
00:14:33,840 --> 00:14:40,160
mark after a regular expression just means exactly this construction. We take that regular expression,

147
00:14:40,160 --> 00:14:46,560
and we or it with epsilon. And so this one, this regular expression, is a little more complicated,

148
00:14:46,560 --> 00:14:50,639
has two optional components. So let's just write out what that would look like. So we would have

149
00:14:51,519 --> 00:14:59,919
the exponent begins with E, and then we have a sign, which is either plus or minus, and that's

150
00:14:59,919 --> 00:15:06,720
optional. So we put a question mark after it, followed by a non-empty-springer digits,

151
00:15:06,720 --> 00:15:11,759
and then this whole thing is optional. The whole exponent is optional. So this is an alternative

152
00:15:11,759 --> 00:15:19,840
and more compact way to write this expression. To wrap up, I hope I've convinced you in this video

153
00:15:19,840 --> 00:15:24,480
that regular expressions can describe many useful languages. We've seen some fragments from

154
00:15:24,480 --> 00:15:30,800
programming languages, but also we saw that email addresses could be specified this way. Other

155
00:15:30,800 --> 00:15:39,440
things that are regular languages are things like phone numbers, and file names are also regular.

156
00:15:39,440 --> 00:15:44,720
And there are many, many other examples in everyday life where regular languages are used to

157
00:15:44,720 --> 00:15:52,000
describe some simple set of strings. And I also want to emphasize it so far, we've used regular

158
00:15:52,000 --> 00:15:57,120
languages as a language specification. We used it to define the set of strings we're interested in,

159
00:15:57,120 --> 00:16:03,040
but we haven't said anything about how to actually implement lexical analysis. We still need an

160
00:16:03,040 --> 00:16:08,560
implementation. And that's what we'll talk about in future videos. In particular, in particular,

161
00:16:08,560 --> 00:16:13,600
we're going to look at the problem of given a string as in a regular expression R, how do we know

162
00:16:13,600 --> 00:16:26,000
whether that string is in the language of the regular expression R?

