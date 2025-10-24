---
title: PrincetonAlgorithms P107Part210 07_regular Expression Applications
---

1
00:00:00,000 --> 00:00:10,679
So that's a regular expression pattern matching that we implement by constructing and simulating

2
00:00:10,679 --> 00:00:13,400
a non-deterministic finite state machine.

3
00:00:13,400 --> 00:00:17,400
Really one of the most ingenious algorithms that we look at in this course.

4
00:00:17,400 --> 00:00:20,199
Next we'll look at some applications.

5
00:00:20,199 --> 00:00:27,280
So the most famous is called Grep and this is what Ken Thompson implemented in the initial

6
00:00:27,280 --> 00:00:35,480
UNIX and it was a very very important tool for programers working on the tiny, really

7
00:00:35,480 --> 00:00:45,040
tiny computers that were available at that time was really important to be able to ask questions

8
00:00:45,040 --> 00:00:52,079
about programs of this type and allowed the development of bigger and bigger computational

9
00:00:52,079 --> 00:00:57,399
infrastructure like the UNIX operating system that's still widely used today.

10
00:00:57,399 --> 00:01:01,920
So Grep was a simple command.

11
00:01:01,920 --> 00:01:07,239
What you want to do is take a regular expression as a command line argument and print the lines

12
00:01:07,239 --> 00:01:12,719
from standard input that have some substring that's matched by the regular expression.

13
00:01:12,719 --> 00:01:16,319
Programers use that all the time to try to figure out what variables they use and what

14
00:01:16,319 --> 00:01:23,239
part of what program and many programmers use Grep every day still today.

15
00:01:23,239 --> 00:01:31,439
And here's how we implement it using the code that we've talked about so far.

16
00:01:31,439 --> 00:01:41,479
So first thing is create the RE that we're going to match to make it more like substring

17
00:01:41,479 --> 00:01:42,479
search.

18
00:01:42,480 --> 00:01:49,359
We don't care if the thing's in there anywhere at all so we put a dot star before and after

19
00:01:49,359 --> 00:01:56,359
and we close it in parentheses just because our code simplified it's our reason closed in

20
00:01:56,359 --> 00:01:58,760
a parentheses.

21
00:01:58,760 --> 00:02:05,960
Build an NFA from that regular expression and then as long as there's an align in standard

22
00:02:05,960 --> 00:02:11,280
input we read the line and we ask if the NFA recognizes it.

23
00:02:11,280 --> 00:02:16,719
So the constructor builds the NFA and recognizes the simulation.

24
00:02:16,719 --> 00:02:21,800
If run the NFA on that string if it's there you print it out.

25
00:02:21,800 --> 00:02:28,080
If it doesn't recognize it the final except state is not in the set of states it could

26
00:02:28,080 --> 00:02:33,319
get due for that string you will print it out and we just do that for every line in the

27
00:02:33,319 --> 00:02:34,319
input.

28
00:02:34,319 --> 00:02:46,400
It's really amazingly simple implementation although quite elegant conceptually it's a

29
00:02:46,400 --> 00:02:55,799
very elegant and efficient implementation of this basic process that's Grep.

30
00:02:55,799 --> 00:03:03,359
So in the bottom line for it is in the worst case it's the same as for the elementary

31
00:03:03,360 --> 00:03:07,800
substring search algorithm that we looked at when we first started talking about string

32
00:03:07,800 --> 00:03:08,800
searching.

33
00:03:08,800 --> 00:03:10,320
It's really amazing.

34
00:03:10,320 --> 00:03:14,920
The brute force algorithm that you come up with is that try matching the string, the

35
00:03:14,920 --> 00:03:20,440
single string at every character position worst cases time proportional to M times N.

36
00:03:20,440 --> 00:03:26,040
But here we have a regular expression which specifies an infinite set of patterns and

37
00:03:26,040 --> 00:03:31,480
we can tell if anyone of those infinite set of patterns is matched by our string in the

38
00:03:31,479 --> 00:03:33,479
same worst case time.

39
00:03:33,479 --> 00:03:40,199
It's really amazing algorithm that's Ken Thompson the Grep.

40
00:03:40,199 --> 00:03:46,560
Once you have Grep available then crossword puzzles become a lot easier.

41
00:03:46,560 --> 00:03:51,319
A lot of it's standard and unix to have a dictionary or if you can't find one on your

42
00:03:51,319 --> 00:03:53,599
system we have one on the book site.

43
00:03:53,599 --> 00:03:58,959
This simply has all the words in the dictionary all in lower case one per line.

44
00:03:58,960 --> 00:04:04,840
And if you have a crossword puzzle where you're missing a couple of letters you can just

45
00:04:04,840 --> 00:04:16,280
Grep for in words.text and leave don't care for those letters and it'll tell you about

46
00:04:16,280 --> 00:04:18,280
the things you can put in there in this case.

47
00:04:18,280 --> 00:04:23,040
It's the one that has exactly that many letters it's stricter.

48
00:04:23,040 --> 00:04:25,040
So that's a typical application.

49
00:04:25,040 --> 00:04:29,400
I'm sure lots of people use it that way now.

50
00:04:29,400 --> 00:04:38,360
Now for industrial strength nowadays there's lots of things that people expect when using

51
00:04:38,360 --> 00:04:40,960
regular expressions.

52
00:04:40,960 --> 00:04:45,360
Our implementation doesn't have character classes.

53
00:04:45,360 --> 00:04:51,000
It doesn't have the extra medic characters like plus and other things.

54
00:04:51,000 --> 00:04:57,360
There's the idea of capturing which is actually get the part of the string that satisfies

55
00:04:57,360 --> 00:05:00,480
that matches that regular expression.

56
00:05:00,480 --> 00:05:07,879
Various different extensions of closure and then there's the idea of review versus reluctant

57
00:05:07,879 --> 00:05:09,399
matching.

58
00:05:09,399 --> 00:05:19,759
So for example if you have a regular expression blank dot star, backslash blank which you'd

59
00:05:19,759 --> 00:05:26,159
find in HTML for the blinking text, there's two possibilities.

60
00:05:26,159 --> 00:05:30,120
So-called reluctant matching would be like the tightest match matches that you get.

61
00:05:30,120 --> 00:05:32,240
You'd have two of them.

62
00:05:32,240 --> 00:05:37,399
But then the greedy matching would get as much text as it possibly could in different

63
00:05:37,399 --> 00:05:38,399
applications.

64
00:05:38,399 --> 00:05:41,000
You might want different things.

65
00:05:41,000 --> 00:05:47,680
Capturing means give me the substring that matches.

66
00:05:47,680 --> 00:05:54,199
So those things are not difficult to add to the basic code that we've done and all that

67
00:05:54,199 --> 00:05:58,759
has to be in industrial strength implementation.

68
00:05:58,759 --> 00:06:04,120
Many programming systems have Grap that have all these sorts of things.

69
00:06:04,120 --> 00:06:09,720
Again the originated Grap originated in Unix in the 1970s and nowadays every language has

70
00:06:09,720 --> 00:06:15,800
to have some kind of extended regular expression facility.

71
00:06:15,800 --> 00:06:24,120
There's language Unix commands like Grap and O.K. and O. programmers tools like EMAX,

72
00:06:24,120 --> 00:06:30,280
this modern programmers tools like Pearl or PHP, Python and JavaScript, all of these things

73
00:06:30,280 --> 00:06:33,840
have regular expression processing.

74
00:06:33,840 --> 00:06:40,160
And so programmers demand this facility nowadays.

75
00:06:40,160 --> 00:06:47,000
In fact Pearl is an example of an entire language that's built on regular expression.

76
00:06:47,000 --> 00:06:50,800
And again there's various command line options.

77
00:06:50,800 --> 00:06:58,680
You can say I've run it for each line and you have replacement facilities and many other

78
00:06:58,680 --> 00:07:08,800
things that is certainly a worthwhile facility for any programming to use nowadays.

79
00:07:08,800 --> 00:07:10,840
And many programs use these things.

80
00:07:10,840 --> 00:07:17,600
Now again to go back to the slide that was filled up with regular expression, you want

81
00:07:17,600 --> 00:07:19,400
to use these things wisely.

82
00:07:19,400 --> 00:07:24,759
There are definitely computational tasks where it might be better to just write a Java program

83
00:07:24,759 --> 00:07:27,120
and not try to use a regular expression.

84
00:07:27,120 --> 00:07:35,120
So every tool has its place and trying to do everything with a regular expression language.

85
00:07:35,120 --> 00:07:43,040
And Java various facilities are built in to different parts of the Java library.

86
00:07:43,040 --> 00:07:53,439
And so understanding how the implementation works, you can understand how to use these.

87
00:07:53,439 --> 00:07:59,840
So one simple implementation is in the Java string library.

88
00:07:59,839 --> 00:08:07,439
So if you have a string called input and another string called regx and the matches method

89
00:08:07,439 --> 00:08:14,199
in the string library, it returns a bullion that says if the string is in the language

90
00:08:14,199 --> 00:08:17,039
described by the regular expression.

91
00:08:17,039 --> 00:08:25,559
So this is just a simple stub called validate that takes a regular expression and an input

92
00:08:25,560 --> 00:08:32,120
from the command line unless you know if the string is in the language described by

93
00:08:32,120 --> 00:08:34,000
the regular expression.

94
00:08:34,000 --> 00:08:39,639
So like as I did in 123, I leave a little Java identifier giving that regx for legal Java

95
00:08:39,639 --> 00:08:43,320
identifier as we looked at earlier and so forth.

96
00:08:43,320 --> 00:08:45,320
So that's one thing that's built into Java.

97
00:08:45,320 --> 00:08:53,679
So in Java programs you can use regular expression pattern matching in that simple way.

98
00:08:53,679 --> 00:09:03,719
Another thing, another kind of task that is better handled with this handle with the

99
00:09:03,719 --> 00:09:07,279
Java implementation is the idea of harvesting.

100
00:09:07,279 --> 00:09:13,079
So we want to print all the substrings of the input that match a given RE.

101
00:09:13,079 --> 00:09:17,679
So say this is the fragile X syndrome.

102
00:09:17,679 --> 00:09:24,000
We want to harvest all the patterns from the DNA that have this property of it starts

103
00:09:24,000 --> 00:09:34,439
with GCG and ends with CTG and has any number of these CGG or AGG triples inside.

104
00:09:34,439 --> 00:09:41,439
Or maybe you want to harvest the same program, harvest all email addresses from a web page.

105
00:09:41,440 --> 00:09:50,160
It's kind of amazing that the same program can work for such a diverse task.

106
00:09:50,160 --> 00:09:54,600
That's the testimony to the utility of the substraction.

107
00:09:54,600 --> 00:09:58,000
So how do we do harvesting within Java?

108
00:09:58,000 --> 00:10:04,880
Well it's got a Java has two classes called pattern and matcher that implement regular

109
00:10:04,879 --> 00:10:12,480
expression pattern matching basically by as we did separating the construction of the

110
00:10:12,480 --> 00:10:15,879
machine from the simulation.

111
00:10:15,879 --> 00:10:20,000
So this is what the code looks like for harvester.

112
00:10:20,000 --> 00:10:24,039
We take our regular expression as the first command line argument and we set up an input

113
00:10:24,039 --> 00:10:31,039
stream from the second command line argument, can be a file or a web page and then we read

114
00:10:31,039 --> 00:10:33,440
the input stream.

115
00:10:33,440 --> 00:10:41,800
Then we use Java's pattern class to build a pattern which essentially is an NFA that

116
00:10:41,800 --> 00:10:46,160
is constructed from the regular expression.

117
00:10:46,160 --> 00:10:56,320
In the pattern class has a method called matcher and that essentially creates an NFA simulator

118
00:10:56,320 --> 00:11:01,760
from that NFA for that text.

119
00:11:01,759 --> 00:11:09,960
So that's a machine that not only does matching the way that we did but it also finds a match

120
00:11:09,960 --> 00:11:17,639
and keeps track of what's called group which is the substring that causes the match.

121
00:11:17,639 --> 00:11:26,000
So that's that extra code to do these things that are useful in this illustrates one line

122
00:11:26,000 --> 00:11:29,720
of code for each one of those facilities.

123
00:11:29,720 --> 00:11:35,920
It is create the NFA, create the simulator, find an x-match and get the substring that

124
00:11:35,920 --> 00:11:37,560
causes the match.

125
00:11:37,560 --> 00:11:46,160
That's an implementation of harvester that can go through and do things like get fragilex

126
00:11:46,160 --> 00:11:52,279
indicators from a chromosome or get email addresses from a web page.

127
00:11:52,279 --> 00:11:56,399
And of course you could extend that to print out the index of where they occur and other

128
00:11:56,399 --> 00:11:57,399
things.

129
00:11:57,399 --> 00:12:03,639
It's a very powerful facility to have in a programming language in Java and certainly

130
00:12:03,639 --> 00:12:05,159
has it.

131
00:12:05,159 --> 00:12:09,120
Now there is a caveat about this that's really important.

132
00:12:09,120 --> 00:12:15,360
This introduces the idea that we talked about with hashing and this is another example of

133
00:12:15,360 --> 00:12:18,679
the algorithmic complexity attack.

134
00:12:18,679 --> 00:12:26,039
That is if you know something about the way that a website is implemented at facility,

135
00:12:26,039 --> 00:12:33,719
in this case it's possible to implement regular expression pattern matching in a not so

136
00:12:33,719 --> 00:12:35,719
efficient way.

137
00:12:35,719 --> 00:12:42,759
And it typically actually the implementation that we see out in the wild like the ones in

138
00:12:42,759 --> 00:12:49,639
Munich or Java or Pearl do not guarantee quadratic performance the way we have.

139
00:12:49,639 --> 00:12:53,000
They do not guarantee that any time it's going to be proportional to the product of the

140
00:12:53,000 --> 00:12:56,440
link to the string and the link to the regular expression.

141
00:12:56,440 --> 00:12:57,960
In fact they go exponential.

142
00:12:57,960 --> 00:13:06,039
Again going back to cleanies theorem it's relatively simple to prove and it's not so

143
00:13:06,039 --> 00:13:11,919
difficult to develop an implementation that is more like cleanies theorem but it can take

144
00:13:11,919 --> 00:13:14,000
exponential time.

145
00:13:14,000 --> 00:13:23,399
And you can try it yourself in Java or Pearl if you try to look for a match for this regular

146
00:13:23,399 --> 00:13:26,720
expression in a string like that.

147
00:13:26,720 --> 00:13:31,320
You add just a couple characters to the string the running time will double.

148
00:13:31,320 --> 00:13:37,080
Again going back to our algorithmic performance lectures.

149
00:13:37,080 --> 00:13:41,759
If that's what happens if I just add one thing in my running time doubles that means I have

150
00:13:41,759 --> 00:13:44,279
exponential time.

151
00:13:44,279 --> 00:13:56,600
And so if I'm using a facility that has one of these exponential time implementation then

152
00:13:56,600 --> 00:14:02,360
this is what's called spam assassin regular expression.

153
00:14:02,360 --> 00:14:08,600
It's going to take exponential time on certain email addresses and somebody can create trouble

154
00:14:08,680 --> 00:14:14,200
by sending such addresses to a mail server.

155
00:14:14,200 --> 00:14:21,399
The mail server will take exponential time just trying to determine if it's spam or not.

156
00:14:21,399 --> 00:14:29,920
By having an inefficient algorithm a server like that is definitely subject to such attacks.

157
00:14:29,920 --> 00:14:32,680
Generally you don't want to have exponential algorithms.

158
00:14:32,680 --> 00:14:36,120
You particularly don't want to have exponential algorithms.

159
00:14:36,120 --> 00:14:43,039
If you have arbitrary clients out there that can cause trouble for you.

160
00:14:43,039 --> 00:14:49,279
Another pitfall is things that kind of look like regular expressions but aren't actually

161
00:14:49,279 --> 00:14:50,960
regular expressions.

162
00:14:50,960 --> 00:14:53,840
So it's common to have the backslash one notation.

163
00:14:53,840 --> 00:15:00,440
So that's supposed to match the sub expression that was matched earlier.

164
00:15:00,440 --> 00:15:11,440
So this thing dot plus backslash one is a string that is two copies of something like

165
00:15:11,440 --> 00:15:15,480
Kuskou's with the least one character.

166
00:15:15,480 --> 00:15:17,680
And this one is a similar one.

167
00:15:17,680 --> 00:15:22,160
This one actually is a number of ones is not prime.

168
00:15:22,160 --> 00:15:23,160
It matches.

169
00:15:23,160 --> 00:15:30,400
So you can write pretty sophisticated computationally things just with these little references.

170
00:15:30,399 --> 00:15:32,240
But there's a problem.

171
00:15:32,240 --> 00:15:40,199
It's a fundamental problem is that the kinds of languages of the sets of strings that you

172
00:15:40,199 --> 00:15:43,559
specify with such notation are not regular.

173
00:15:43,559 --> 00:15:49,519
That is, I guess, at the point you can't write a regular expression to specify them.

174
00:15:49,519 --> 00:15:55,039
And so these are examples like strings of the form w for some w.

175
00:15:55,039 --> 00:16:01,279
You can't write a regular expression that will describe all such strings.

176
00:16:01,279 --> 00:16:05,399
Even scientific applications like complemented palindrome.

177
00:16:05,399 --> 00:16:12,000
So that's like a palindrome but also complement A's to T's and C's to G's.

178
00:16:12,000 --> 00:16:15,000
So that's another example.

179
00:16:15,000 --> 00:16:19,319
And if they're not regular then Cleamy's theorem doesn't hold.

180
00:16:19,320 --> 00:16:22,320
There's no NFA that corresponds to them.

181
00:16:22,320 --> 00:16:29,320
And in fact, we'll talk in a couple of lectures about interactability.

182
00:16:29,320 --> 00:16:36,560
In fact, nobody knows an efficient method for guaranteeing performance when you have back

183
00:16:36,560 --> 00:16:38,240
references.

184
00:16:38,240 --> 00:16:44,320
So if you're allowing back references, you're pretty much subject to performance attacks

185
00:16:44,320 --> 00:16:47,280
like the one just mentioned.

186
00:16:47,279 --> 00:16:50,399
And that's where we'll finish up this lecture.

187
00:16:50,399 --> 00:16:56,279
This is an amazingly elegant and efficient and ingenious algorithm.

188
00:16:56,279 --> 00:17:01,959
And it's based on the theory of computation that has been studied since the 1930s.

189
00:17:01,959 --> 00:17:06,079
And it's the basis for much of the programming, programming languages that we do.

190
00:17:06,079 --> 00:17:08,759
It's really worth understanding this theory.

191
00:17:08,759 --> 00:17:15,319
And Grep is a wonderful example of why it's important to understand theory like this.

192
00:17:15,319 --> 00:17:19,119
And really, it takes us to the next level of algorithms.

193
00:17:19,119 --> 00:17:25,319
And that's writing programs that translate a program to machine code.

194
00:17:25,319 --> 00:17:32,480
Actually, what we've looked at both for KMP and for Grep are examples of compilers.

195
00:17:32,480 --> 00:17:34,919
They're simple examples of compilers.

196
00:17:34,919 --> 00:17:38,119
For KMP, we took a string and we built a DFA.

197
00:17:38,119 --> 00:17:42,799
For Grep, we took an RE and we built an NFA.

198
00:17:42,799 --> 00:17:48,919
And all Java C does is take Java language code and translate it to a bytecode.

199
00:17:48,919 --> 00:17:55,399
Now it uses more complicated theorems and laws from theory of computation to get the job

200
00:17:55,399 --> 00:18:01,359
done because a Java program is also not regular.

201
00:18:01,359 --> 00:18:12,079
But it really is worthwhile thinking about the progression from KMP to a Java compiler,

202
00:18:12,079 --> 00:18:13,759
as in a Java compiler.

203
00:18:13,759 --> 00:18:14,759
You have a program.

204
00:18:14,759 --> 00:18:17,759
You want to compile it and know if it's legal.

205
00:18:17,759 --> 00:18:19,119
You want to get bytecode.

206
00:18:19,119 --> 00:18:25,639
And then you've got a Java simulator and that's not so substantially different from what

207
00:18:25,639 --> 00:18:30,319
we just did for Grep in a stage along the way.

208
00:18:30,319 --> 00:18:36,439
It's quite interesting to see this kind of context to get us such a practically useful

209
00:18:36,439 --> 00:18:39,319
and important now for them.

210
00:18:39,319 --> 00:18:44,480
So summary is we did some from the standpoint of a program.

211
00:18:44,480 --> 00:18:49,000
We implemented substring search by simulating a DFA and we implemented a regular expression

212
00:18:49,000 --> 00:18:52,759
pattern matching by simulating an NFA.

213
00:18:52,759 --> 00:19:02,200
From theoretician, what's interesting about these abstractions is that NFAs and DFA's

214
00:19:02,200 --> 00:19:05,399
and RE are equivalent in power.

215
00:19:05,400 --> 00:19:08,440
You can describe a set of strings with one of them.

216
00:19:08,440 --> 00:19:10,840
You can describe a set of strings with any of them.

217
00:19:10,840 --> 00:19:12,240
So that's interesting.

218
00:19:12,240 --> 00:19:14,800
And also interesting is that there's limitations.

219
00:19:14,800 --> 00:19:23,240
There's sets of strings like palindrons and so forth that you can't specify with a DFA

220
00:19:23,240 --> 00:19:25,800
or an NFA.

221
00:19:25,800 --> 00:19:32,680
But from a student in an algorithm's class, it really is worthwhile to see that these

222
00:19:32,680 --> 00:19:34,759
principles are not just theory.

223
00:19:34,759 --> 00:19:37,440
They're a practical use.

224
00:19:37,440 --> 00:19:41,200
And this is an essential paradigm all throughout computer science.

225
00:19:41,200 --> 00:19:46,279
We want to find an intermediate abstraction that we can understand and make sure we pick

226
00:19:46,279 --> 00:19:51,840
the right one and then we pick clients that can use it in real implementations that can

227
00:19:51,840 --> 00:19:53,440
implement it.

228
00:19:53,440 --> 00:19:59,360
By building the right intermediate abstraction, we can solve some important practical problems.

229
00:19:59,359 --> 00:20:02,359
And those are the lessons that Grap teaches us.

