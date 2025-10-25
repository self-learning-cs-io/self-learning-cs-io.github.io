---
title: CS143 P28Week306 01 Error Handling
---

1
00:00:00,000 --> 00:00:07,960
In this video, we're going to digress a little bit and talk about how compilers handle errors

2
00:00:07,960 --> 00:00:16,199
and in particular, what kind of error handling functionality is available in parsers.

3
00:00:16,199 --> 00:00:19,679
Compiler has two relatively distinct jobs.

4
00:00:19,679 --> 00:00:22,280
The first is to translate valid programs.

5
00:00:22,280 --> 00:00:27,719
That is, if it gets a program from a programmer that is correct, is a valid program, it needs

6
00:00:27,719 --> 00:00:30,679
to produce correct code for that program.

7
00:00:30,679 --> 00:00:37,519
Now distinct from that task is the job of giving good feedback for erroneous programs and

8
00:00:37,519 --> 00:00:39,960
even just detecting the invalid programs.

9
00:00:39,960 --> 00:00:45,560
We don't want to compile any program that isn't a valid program in the programming language.

10
00:00:45,560 --> 00:00:48,399
Programming languages have many different kinds of errors.

11
00:00:48,399 --> 00:00:50,640
Here's just a few.

12
00:00:50,640 --> 00:00:57,039
So for example, we might have lexical errors using characters that don't even appear in any

13
00:00:57,039 --> 00:00:59,719
valid symbol in the language.

14
00:00:59,719 --> 00:01:03,159
These would be detected by the lexical analysis phase.

15
00:01:03,159 --> 00:01:08,120
We could have syntax errors and these would be the parsing errors when all the individual

16
00:01:08,120 --> 00:01:13,079
lexical units are correct, but they're assembled in some way that doesn't make sense.

17
00:01:13,079 --> 00:01:15,759
We don't know how to compile it.

18
00:01:15,759 --> 00:01:19,920
There could be semantic errors, for example, when types mismatch, here I've declared X as

19
00:01:19,920 --> 00:01:23,719
an integer and used it as a function and that would be the job of the type checker to catch

20
00:01:23,719 --> 00:01:25,239
those.

21
00:01:25,239 --> 00:01:32,560
And then actually there may be many errors in your program that are not errors of the

22
00:01:32,560 --> 00:01:33,560
programming language.

23
00:01:33,560 --> 00:01:38,439
The program you wrote is actually a valid program, but it doesn't do what you intended.

24
00:01:38,439 --> 00:01:40,280
You actually have a bug in your program.

25
00:01:40,280 --> 00:01:45,799
And so while the compiler can detect many kinds of errors, it doesn't detect all of them.

26
00:01:45,799 --> 00:01:51,119
And once we get past what the compiler can do, then it's up to testers and users to find

27
00:01:51,119 --> 00:01:54,799
the rest of the problems in the program.

28
00:01:55,799 --> 00:01:58,759
So, what are the requirements for good error handling?

29
00:01:58,759 --> 00:02:03,640
Well, we want the compiler to report errors accurately and clearly so that we can identify

30
00:02:03,640 --> 00:02:06,319
what the problem is quickly and fix it.

31
00:02:06,319 --> 00:02:10,359
The compiler itself should recover from the error quickly, so when it hits an error,

32
00:02:10,359 --> 00:02:15,879
it shouldn't take a long time to make up its mind what to do before proceeding.

33
00:02:15,879 --> 00:02:20,439
And finally, we don't want error handling to slow down the compilation of valid code.

34
00:02:20,439 --> 00:02:25,759
That is, we shouldn't pay a price for the error handling if we're not really using it.

35
00:02:25,759 --> 00:02:29,639
I'm going to talk about three different kinds of error handling.

36
00:02:29,639 --> 00:02:34,919
Panic mode and error productions are the two that are used in current compilers.

37
00:02:34,919 --> 00:02:39,319
So these are actually things that people use today.

38
00:02:39,319 --> 00:02:43,759
Automatic, local or global correction is an idea that was pursued extensively in the

39
00:02:43,759 --> 00:02:44,759
past.

40
00:02:44,759 --> 00:02:48,360
And I think it's historically quite interesting, particularly as a contrast to what people

41
00:02:48,360 --> 00:02:53,240
do today and also why people try to do it a long ago.

42
00:02:53,240 --> 00:03:00,200
Panic mode is the simplest and most popular method of error recovery that's widely used.

43
00:03:00,200 --> 00:03:04,920
And the basic idea is that when an error is detected, the parser is going to begin discarding

44
00:03:04,920 --> 00:03:10,000
tokens until one that has a clear role in the language is found and then is going to try

45
00:03:10,000 --> 00:03:13,560
to restart itself and continue from that point on.

46
00:03:14,080 --> 00:03:19,319
These tokens, the ones that it's looking for, are called the synchronizing tokens.

47
00:03:19,319 --> 00:03:25,120
And these are just tokens that have a well-known role in the language so that we can reliably

48
00:03:25,120 --> 00:03:26,520
identify where we are.

49
00:03:26,520 --> 00:03:31,080
So a typical strategy might be to try to skip to the end of a statement or to the end of a

50
00:03:31,080 --> 00:03:36,360
function if an error is found in the statement or function and then begin parsing either the

51
00:03:36,360 --> 00:03:39,520
next statement or the next function.

52
00:03:39,520 --> 00:03:44,000
So let's look at a simple hypothetical example of panic mode error recovery.

53
00:03:44,000 --> 00:03:45,240
So here's an expression.

54
00:03:45,240 --> 00:03:46,800
Clearly it has a problem.

55
00:03:46,800 --> 00:03:49,160
We shouldn't have two plus signs in a row.

56
00:03:49,160 --> 00:03:52,960
So something's gone wrong here at the second plus.

57
00:03:52,960 --> 00:03:55,439
And what's going to happen is the parser is going to come along.

58
00:03:55,439 --> 00:03:57,800
The parser is going to be proceeding from left to right.

59
00:03:57,800 --> 00:03:59,280
It's going to see the open per end.

60
00:03:59,280 --> 00:04:00,280
It's going to see the number one.

61
00:04:00,280 --> 00:04:01,600
It's going to see the plus.

62
00:04:01,600 --> 00:04:02,600
Everything is good.

63
00:04:02,600 --> 00:04:05,719
And then it's going to see this second plus and it's not going to know what to do.

64
00:04:05,719 --> 00:04:10,680
It's going to realize that it's stuck and that there's no expression in the language

65
00:04:10,680 --> 00:04:15,840
that has two plus signs in a row and it needs to do something to recover.

66
00:04:15,840 --> 00:04:21,439
It's encountered a parsing error and it has to take some error action at this point.

67
00:04:21,439 --> 00:04:25,519
So in panic mode recovery what it's going to do is it's going to hit the panic button.

68
00:04:25,519 --> 00:04:28,279
So right at this point it's going to say I give up.

69
00:04:28,279 --> 00:04:30,160
I'm not parsing normally anymore.

70
00:04:30,160 --> 00:04:36,920
It goes into a different mode where it is simply throwing away input until it finds something

71
00:04:36,920 --> 00:04:38,600
that it recognizes.

72
00:04:38,600 --> 00:04:44,240
And for example we could say that the policy for this particular kind of error is to skip

73
00:04:44,240 --> 00:04:47,280
ahead to the next integer and then try to continue.

74
00:04:47,280 --> 00:04:51,960
So it would just throw away the plus in this case and then it would restart here at the

75
00:04:51,960 --> 00:04:57,400
two, expecting to see another integer trying to finish off this expression.

76
00:04:57,399 --> 00:05:00,359
And it would treat that as one plus two and then the parentheses would match and the

77
00:05:00,359 --> 00:05:04,439
rest of the expression would parse just fine.

78
00:05:04,439 --> 00:05:09,079
Now in tools such as bison which is a widely used parser generator and one that you may

79
00:05:09,079 --> 00:05:11,519
use for the project.

80
00:05:11,519 --> 00:05:18,959
There's a special terminal symbol called error to describe how much input to skip and the

81
00:05:18,959 --> 00:05:21,959
productions that are given in bison look like this.

82
00:05:21,959 --> 00:05:27,719
So you would say that the possibilities for e are that e could be an integer.

83
00:05:27,719 --> 00:05:32,519
It could be the sum of two e's to expressions.

84
00:05:32,519 --> 00:05:38,399
It could be a parenthesized expression or if none of these work.

85
00:05:38,399 --> 00:05:43,079
So these are the normal productions.

86
00:05:43,079 --> 00:05:49,199
If none of those work then we could try some of these productions that have error in them.

87
00:05:49,199 --> 00:05:52,079
And error is the special symbol for bison.

88
00:05:52,079 --> 00:05:56,000
And it says well these are the alternatives to try if these things over here didn't work.

89
00:05:56,000 --> 00:06:00,240
So if you find an error, let's look focus on this one right here.

90
00:06:00,240 --> 00:06:07,319
So what this says is that if you find an error while you're trying to parse an e, okay,

91
00:06:07,319 --> 00:06:08,959
we haven't actually said how that works yet.

92
00:06:08,959 --> 00:06:11,000
We'll see that in future videos.

93
00:06:11,000 --> 00:06:16,199
But conceptually the parser is trying to recognize one of these kinds of expressions here.

94
00:06:16,199 --> 00:06:21,000
It's in a state where it thinks it wants to see an integer or a plus or a parenthesized

95
00:06:21,000 --> 00:06:22,000
expression.

96
00:06:22,000 --> 00:06:25,519
And if that isn't working out, if it gets stuck, well then it could hit the panic button.

97
00:06:25,519 --> 00:06:29,879
It can declare that it's in an error state and it can throw away all the input.

98
00:06:29,879 --> 00:06:34,079
This error will match all the input up to the next integer.

99
00:06:34,079 --> 00:06:38,919
And then this whole thing could be counted as an e as one of these things.

100
00:06:38,919 --> 00:06:41,480
And then we would try to continue the parsing.

101
00:06:41,480 --> 00:06:46,120
Similarly if we encounter an error somewhere inside a pair of matched parentheses, well

102
00:06:46,199 --> 00:06:53,240
we could just throw away the whole thing and just reset at the parentheses boundaries and then continue parsing.

103
00:06:53,240 --> 00:06:59,759
So these are two possible error recovery strategies if we find an error for this particular kind

104
00:06:59,759 --> 00:07:02,879
of symbol in the grammar.

105
00:07:02,879 --> 00:07:10,120
And you can have these error, these productions that involve the error token for as many different

106
00:07:10,120 --> 00:07:15,480
kinds of symbols in the language as you like.

107
00:07:15,480 --> 00:07:19,000
The common strategy is to use what are known as error productions.

108
00:07:19,000 --> 00:07:24,759
And these specify known common mistakes that programmers make just as alternative productions

109
00:07:24,759 --> 00:07:26,200
in the grammar.

110
00:07:26,200 --> 00:07:27,800
So here's a simple example.

111
00:07:27,800 --> 00:07:32,160
Let's say we were working on a programming language or a compiler for a programming language

112
00:07:32,160 --> 00:07:34,319
that was used by a lot of mathematicians.

113
00:07:34,319 --> 00:07:40,240
And instead of writing five times x, like computer scientists do, these guys always wanted

114
00:07:40,240 --> 00:07:46,280
to write five blank x to just juxtapose the five and the x to look more like normal mathematical

115
00:07:46,280 --> 00:07:47,400
notation.

116
00:07:47,400 --> 00:07:49,840
And they complain that this is always giving them pars errors.

117
00:07:49,840 --> 00:07:54,720
The parser is just complaining over and over again that this is not a well formed expression.

118
00:07:54,720 --> 00:07:59,360
Well we could just go into our grammar and add a production that made it well formed.

119
00:07:59,360 --> 00:08:04,439
We could just say, well now it's legal if I have that one kind of expression is just

120
00:08:04,439 --> 00:08:09,800
to have two expressions that are juxtaposed next to each other with no intervening operator.

121
00:08:10,800 --> 00:08:15,639
And this has a disadvantage obviously of complicating the grammar.

122
00:08:15,639 --> 00:08:18,280
If we do this a lot, our grammar is going to get a lot harder to understand.

123
00:08:18,280 --> 00:08:21,400
It's going to be a lot harder to maintain.

124
00:08:21,400 --> 00:08:27,240
And essentially all this is doing is promoting common mistakes to alternative syntax.

125
00:08:27,240 --> 00:08:28,720
But this is used in practice.

126
00:08:28,720 --> 00:08:30,160
People do this sort of thing.

127
00:08:30,160 --> 00:08:35,279
And you will see for example, when you use GCC and other production seek-em-pilers,

128
00:08:35,279 --> 00:08:39,720
they will often warn you about things you're not supposed to do, but they'll accept them

129
00:08:39,720 --> 00:08:40,720
anyway.

130
00:08:40,720 --> 00:08:45,759
And this is essentially the mechanism by which they do that.

131
00:08:45,759 --> 00:08:51,039
The last strategy I want to talk about a little bit is error correction.

132
00:08:51,039 --> 00:08:54,559
So so far we've just talked about strategies for detecting errors.

133
00:08:54,559 --> 00:08:56,439
But we could also try to fix errors.

134
00:08:56,439 --> 00:09:00,399
That is, if the program has mistakes and if the compiler could try to help the programmer

135
00:09:00,399 --> 00:09:04,000
out and say, oh, you obviously didn't mean to write that.

136
00:09:04,000 --> 00:09:08,200
Let me try to find a program for you that works.

137
00:09:08,200 --> 00:09:13,039
And these kind of corrections in some sense we want to find programs that are nearby, programs

138
00:09:13,039 --> 00:09:18,759
that aren't too different from the programs that the programmer supplied, but we couldn't

139
00:09:18,759 --> 00:09:20,919
compile correctly.

140
00:09:20,919 --> 00:09:22,440
And there's a few different things that you can do.

141
00:09:22,440 --> 00:09:27,159
Two of the things that people have tried are things like token insertions and deletions.

142
00:09:27,159 --> 00:09:31,000
So here you would like to minimize the edit distance.

143
00:09:31,000 --> 00:09:36,320
That would be the metric that you would use to determine whether a program was close

144
00:09:36,320 --> 00:09:39,480
to the original program that the programmer supplied.

145
00:09:39,480 --> 00:09:45,799
You could also do exhaustive search within some bounds to try all possible programs that

146
00:09:45,799 --> 00:09:49,840
are close to the program that was supplied.

147
00:09:49,840 --> 00:09:53,919
And there are a couple of disadvantages to this, actually a number of disadvantages.

148
00:09:53,919 --> 00:09:56,080
You can imagine that this is hard to implement.

149
00:09:56,080 --> 00:09:58,200
It's actually quite complex.

150
00:09:58,200 --> 00:10:02,440
This will slow down the parsing of correct programs because we need to keep enough state

151
00:10:02,440 --> 00:10:08,560
around that we can manage this search or the editing in the case that we actually do

152
00:10:08,560 --> 00:10:10,280
encounter an error.

153
00:10:10,280 --> 00:10:15,440
And of course, nearby is not really, it's not really all clear what that means.

154
00:10:15,440 --> 00:10:20,740
And various notions of nearby may or may not actually take us to a program that the

155
00:10:20,740 --> 00:10:23,800
programmer would actually be happy with.

156
00:10:23,799 --> 00:10:29,039
The best known example of error correction is the compiler PLC.

157
00:10:29,039 --> 00:10:31,759
This is a PL1 compiler, that's the PL part.

158
00:10:31,759 --> 00:10:38,479
And the C stands for either correction or Cornell, which is where the compiler was built.

159
00:10:38,479 --> 00:10:42,599
And PLC is well known for being willing to compile absolutely anything.

160
00:10:42,599 --> 00:10:44,639
You could give it the phone book.

161
00:10:44,639 --> 00:10:49,479
You can and people did give it things like the speech from Hamlet soliloquy.

162
00:10:49,480 --> 00:10:52,039
And it would print out a lot of error messages.

163
00:10:52,039 --> 00:10:54,560
Sometimes these error messages would be very funny to read.

164
00:10:54,560 --> 00:11:02,480
And it would in the end do correction and produce always a valid running PL1 program.

165
00:11:02,480 --> 00:11:04,759
And you might ask why do people bother with that?

166
00:11:04,759 --> 00:11:09,840
That doesn't seem, but that may not seem very compelling to us today.

167
00:11:09,840 --> 00:11:15,159
And you have to realize that when this work was done back in the 1970s, people lived in a

168
00:11:15,159 --> 00:11:16,159
very different world.

169
00:11:16,159 --> 00:11:18,840
There was a very slow recomplation cycle.

170
00:11:18,840 --> 00:11:23,600
You could take a whole day to get your program to compile and run.

171
00:11:23,600 --> 00:11:27,440
You would essentially submit your program in the morning and you might not get results

172
00:11:27,440 --> 00:11:29,399
back until the afternoon.

173
00:11:29,399 --> 00:11:34,720
And with that kind of turnaround cycle, even one syntax error in your program was devastated.

174
00:11:34,720 --> 00:11:38,200
You could lose a whole day because you mistyped a keyword.

175
00:11:38,200 --> 00:11:42,759
And having the compiler try to take a stab at finding a working program for you.

176
00:11:42,759 --> 00:11:47,040
If the correction was small and you saved an entire day, if it could fix that one small

177
00:11:47,039 --> 00:11:51,439
mistake you made and give you a valid run, that was actually a useful thing to do.

178
00:11:51,439 --> 00:11:55,519
And so the goal then was to find as many errors in one cycle as possible.

179
00:11:55,519 --> 00:12:00,799
They would try to find as many errors they try to recover, find as many errors as possible,

180
00:12:00,799 --> 00:12:04,839
give you as good feedback as possible so you could fix as many errors, avoid as many

181
00:12:04,839 --> 00:12:07,599
retry cycles as possible.

182
00:12:07,599 --> 00:12:12,839
And even possibly automatically correct the program so that you could see if the corrections

183
00:12:12,840 --> 00:12:18,360
were right and then possibly the results you got back were useful and able to do even

184
00:12:18,360 --> 00:12:21,080
more debugging before the next round.

185
00:12:21,080 --> 00:12:23,360
Now today we're in a completely different situation.

186
00:12:23,360 --> 00:12:28,040
We have a very fast, almost interactive recompliation cycle for many projects.

187
00:12:28,040 --> 00:12:31,440
And as a result, users generally aren't interested in finding many errors.

188
00:12:31,440 --> 00:12:34,879
They tend to correct only one error per cycle.

189
00:12:34,879 --> 00:12:36,480
Compiler still report many errors.

190
00:12:36,480 --> 00:12:38,080
They'll give you lots and lots of errors.

191
00:12:38,080 --> 00:12:42,560
But my observation, certainly my habit personally and what I see many other people do is

192
00:12:42,559 --> 00:12:47,279
it only fix the first one because it's the most reliable and the one that definitely

193
00:12:47,279 --> 00:12:50,519
needs to be fixed before you can try to compile again.

194
00:12:50,519 --> 00:12:55,359
If compilation is fast enough, that's probably the most productive thing to do.

195
00:12:55,359 --> 00:13:00,000
And as a result, complex error recovery today is just less compelling than it was a few

196
00:13:00,000 --> 00:13:00,679
decades ago.

