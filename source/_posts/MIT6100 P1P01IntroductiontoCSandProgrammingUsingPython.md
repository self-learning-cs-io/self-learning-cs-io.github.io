---
title: MIT6100 P1P01IntroductiontoCSandProgrammingUsingPython
---

1
00:00:00,000 --> 00:00:23,719
All right, so welcome to the first lecture of 600L. That's our new number. My name is

2
00:00:23,719 --> 00:00:29,239
Anna Bell. That's two separate names. First name, Anna, last name, Bell, super confusing. But I've

3
00:00:29,239 --> 00:00:34,359
been a lecturer here in the CS department for probably almost 10 years now. And I've been doing

4
00:00:34,359 --> 00:00:41,239
the intro course for a while. I'm really happy to be teaching this full semester version of 600A.

5
00:00:42,039 --> 00:00:48,599
So today, what we're going to do is go over a little bit of course administrative information. And

6
00:00:48,600 --> 00:00:53,960
then we'll dive right into just some thoughts about computers, high level, how they work, and then we'll

7
00:00:53,960 --> 00:01:00,760
start going into some Python basics. So we're going to get coding right away. So I highly encourage you,

8
00:01:00,760 --> 00:01:07,240
since you're in this class, to download the lecture slides beforehand, to take notes and run code when

9
00:01:07,240 --> 00:01:13,799
I do. Some of the lectures are interactive, so and we'll have breaks. So there'll be a place where you

10
00:01:13,799 --> 00:01:19,479
can take a break to actually do some coding. And that's important. I call them you try breaks. That's

11
00:01:19,479 --> 00:01:23,879
important to make sure that you're actually practicing what we are learning right at this time.

12
00:01:24,759 --> 00:01:29,879
The main idea for lectures is yes, I will do some teaching, but there will also be opportunities for

13
00:01:29,879 --> 00:01:36,120
questions and for you guys to try some programming right on the spot. Even if you don't finish writing

14
00:01:36,120 --> 00:01:41,239
a program that we start talking about, I will finish it and we can all kind of talk about it together

15
00:01:41,239 --> 00:01:47,719
and I'll kind of show you some pitfalls and things like that. There will be lots of opportunities to

16
00:01:47,719 --> 00:01:53,399
practice in this class through at various degrees of granularity. And then there's also lots of

17
00:01:53,399 --> 00:01:59,239
opportunities that I have in the handouts to do extra practice at home and through a bunch of

18
00:01:59,239 --> 00:02:07,159
different resources as well. The reason why I stress participation and practice is because part of

19
00:02:07,159 --> 00:02:12,039
the reason you're here is you want to learn how to program right. You don't know how to program yet.

20
00:02:12,039 --> 00:02:17,319
And programming is actually a skill right. It's like math or reading. It's something that you have to

21
00:02:17,319 --> 00:02:22,680
practice. You can't just watch me type in a bunch of lines of code and then when it comes time for

22
00:02:22,680 --> 00:02:29,400
to do the quiz you automatically know how to do it. You need to do it often more and more so that it

23
00:02:29,400 --> 00:02:35,560
becomes sort of second nature right. So the three big things you'll get out of this class are

24
00:02:35,560 --> 00:02:40,599
knowledge of concepts. Obviously we're going to learn some computer science ideas programming skill

25
00:02:41,319 --> 00:02:48,520
and problem solving. Problem solving skills. Lectures and exams basically help you with your

26
00:02:48,520 --> 00:02:53,879
knowledge of test your knowledge of concepts and help you get knowledge of concepts. Finger exercises

27
00:02:53,879 --> 00:03:00,599
get give you the programming skills and the problem sets help you with problem solving. Basically

28
00:03:00,599 --> 00:03:07,960
if you're given an English version of a problem in English how do you go from that to thinking

29
00:03:07,960 --> 00:03:13,799
about what computer science concepts can I apply and then after that how do I take those computer

30
00:03:13,799 --> 00:03:21,879
science concepts and actually do the programming. So what are some topics we'll be covering? We will be

31
00:03:21,879 --> 00:03:28,120
at the core of it learning computational thinking. So in the future when you encounter a problem you can

32
00:03:28,840 --> 00:03:34,039
your first thought shouldn't be how do I kind of mathematically solve this or how do I brute force

33
00:03:34,039 --> 00:03:39,879
manually solve this problem. How can I apply computation to help me solve this problem and throughout

34
00:03:39,879 --> 00:03:44,920
these lectures you're going to see some examples of us applying computation to a problem you might

35
00:03:44,920 --> 00:03:52,360
have already seen and maybe solved mathematically which is pretty cool. Obviously to get to that

36
00:03:52,360 --> 00:03:56,599
we're going to learn the Python programming language once we get the basics we're going to see how

37
00:03:56,599 --> 00:04:02,039
we can start to structure our code to look a little bit better so we don't just have a bunch of

38
00:04:02,039 --> 00:04:08,680
code dumped on in a file. We're going to start to organize our code and see how we can make a neat

39
00:04:08,680 --> 00:04:17,319
readable and modular and then towards the not in this lecture but in a couple lectures and as a

40
00:04:17,319 --> 00:04:22,680
theme throughout this this class we're going to look at some algorithms they're not super complicated

41
00:04:22,680 --> 00:04:27,879
but they're kind of the base algorithms for a bunch of algorithms you might see in the future if

42
00:04:27,879 --> 00:04:33,160
you decide to take more CS classes. Lastly towards the end of the class we're going to see algorithmic

43
00:04:33,160 --> 00:04:38,040
complexity which basically means we're going to start asking or trying to answer the question

44
00:04:38,759 --> 00:04:43,639
how do we know the programs we write are efficient right we can write programs but how do we know

45
00:04:43,639 --> 00:04:48,439
that they're fast and how do we know that they don't you know take up all the memory in the computer

46
00:04:48,439 --> 00:04:54,279
so things like that comparing different algorithms that do the same thing against each other.

47
00:04:55,719 --> 00:05:01,319
So if there's no questions again as I said a bunch of this information is already in the handout

48
00:05:01,319 --> 00:05:12,920
plus more we can begin. Okay so let's start by talking about knowledge. Declarative knowledge is

49
00:05:12,920 --> 00:05:18,600
a statement of fact and a lot of us probably in math and in the past have worked with declarative

50
00:05:18,600 --> 00:05:24,520
knowledge but this is not how computer science is not how this class works. In computer science what

51
00:05:24,520 --> 00:05:31,240
we do is we work with imperative knowledge which is basically a recipe how to do something and when

52
00:05:31,240 --> 00:05:36,439
we're programming all we're doing is writing a recipe for the computer to do something that's it.

53
00:05:36,439 --> 00:05:44,839
So here's a numerical example the first statement is a declarative statement right the square root

54
00:05:44,839 --> 00:05:50,279
of a number x is y such that y times y is equal to x there are many possible values for x and y that

55
00:05:50,279 --> 00:05:56,439
this statement can be true right but if we gave that statement to a computer it wouldn't know what

56
00:05:56,439 --> 00:06:03,560
to do with it what we need to do is tell the computer how to find the square root of a number and

57
00:06:03,560 --> 00:06:07,879
then tell us what the square root of that number is and so the computer that needs a recipe.

58
00:06:09,399 --> 00:06:14,600
So the recipe a really simple one for finding the square root of a number is steps 1, 2, 3.

59
00:06:15,560 --> 00:06:22,439
So what we do is let's say we want to find the square root of 16 we obviously know it's 4

60
00:06:22,439 --> 00:06:26,759
but the computer doesn't and so we give it an initial guess let's say the guess is 3.

61
00:06:27,719 --> 00:06:36,039
How do we go from there? So the steps we follow step 1 if 3 times 3, 9 is close enough to 16 we

62
00:06:36,039 --> 00:06:44,680
can stop it's not really close enough for me so let's keep going step 2 otherwise so we're going

63
00:06:44,680 --> 00:06:51,800
to make a new guess by averaging g which is our original guess 3 and x over g which is 16 over

64
00:06:51,800 --> 00:06:59,800
3 right 16 was the square we wanted to find so our next guess is 4.17 okay using the new guess

65
00:06:59,800 --> 00:07:04,840
repeat the process until we are close enough so we go back to step 1 that's the first part of

66
00:07:04,840 --> 00:07:12,120
the process we find guess squared 4.17 squared is 17.36 so now we say is that close enough?

67
00:07:13,560 --> 00:07:20,360
Not really it's not it's 17 it's not really even close 16 so let's do it again we make a new

68
00:07:20,360 --> 00:07:31,080
guess by averaging 4.17 and 16 divided by 4.17 right that gives us our new guess 4.305 okay next

69
00:07:31,080 --> 00:07:39,240
step right using the new guess we repeat the process so 4.305 squared is 16.277 0.277

70
00:07:40,040 --> 00:07:46,439
is that close enough to x? Yeah I could be happy with this I could stop there because we're within

71
00:07:46,439 --> 00:07:52,040
sort of plus minus 1 so I'm okay with that but if we wanted to be within plus or minus 1 times

72
00:07:52,040 --> 00:07:57,000
10 to the negative like 6 or 7 or something like that then we would continue the process

73
00:07:58,759 --> 00:08:04,839
so really what we had there is an algorithm right it's a sequence of steps step 1 step 2 step 3

74
00:08:04,839 --> 00:08:10,279
there's some sort of flow of control right we had a place where we said if this is you know

75
00:08:10,279 --> 00:08:16,040
if the guess is close enough then you know we can stop otherwise we do something else we had

76
00:08:16,040 --> 00:08:20,520
another flow of control where we said repeat this thing right so we're kind of not going

77
00:08:20,520 --> 00:08:26,200
linearly but we're changing the flow and then lastly is a way to stop right we don't want the

78
00:08:26,200 --> 00:08:31,320
algorithm to go on forever we would like to stop at some point and the stopping point I was kind

79
00:08:31,320 --> 00:08:37,960
of vague about it but it could be you know when we were within plus or minus 1 of the actual answer

80
00:08:38,600 --> 00:08:47,480
and so right recipes are basically algorithms right my grandmother was basically teaching algorithms

81
00:08:47,480 --> 00:08:54,519
when she would teach me to like to bake a cake right she didn't call it that but she was really

82
00:08:55,480 --> 00:09:00,680
and so even recipes have that same structure there's a sequence of steps there's a flow of control

83
00:09:00,680 --> 00:09:06,600
like if you don't have a user substitute or repeat this you know repeat sticking a toothpick to see

84
00:09:06,600 --> 00:09:12,200
if it comes out clean every minute or something like that and then there's a mean a way to stop right

85
00:09:12,200 --> 00:09:17,639
when the toothpick comes out clean you take it out of the oven and you eat it and so computers are

86
00:09:17,639 --> 00:09:24,200
machines that execute these algorithms they're actually dumb right computers are not very smart they

87
00:09:24,200 --> 00:09:29,639
don't make decisions on their own they just follow these sequences of steps that we told them to do

88
00:09:30,519 --> 00:09:36,200
computers are good at storing lots and lots of data right we can't really do that but

89
00:09:36,200 --> 00:09:42,360
the computers can store gigabytes of storage terabytes even and computers can do operations really

90
00:09:42,360 --> 00:09:47,080
really quickly which is something we can't do right they're good at those two things but they're not

91
00:09:47,080 --> 00:09:56,360
very smart they can't make decisions unless they're told to make the decisions so really the computer

92
00:09:56,360 --> 00:10:01,960
only does what you tell it to do and that's one of the big ideas that I want you to come away

93
00:10:02,920 --> 00:10:07,960
from this from this lecture with computer only does what you tell it to do right the sequences

94
00:10:07,960 --> 00:10:14,120
of steps that you tell it to do that's the only thing it follows so a little brief history just to

95
00:10:14,120 --> 00:10:19,639
kind of make you appreciate programming Python programming language before we actually get started

96
00:10:19,639 --> 00:10:27,639
with it is so before the 1940s we had these things called fixed program computers okay like a pocket

97
00:10:27,639 --> 00:10:34,120
calculator is an example of that every button was an operation you could you know in the

98
00:10:34,120 --> 00:10:38,439
little screen you could use parentheses to put a bunch of different operations together but there

99
00:10:38,439 --> 00:10:44,439
was no way to sort of store all these operations together to to you know later put in different

100
00:10:44,439 --> 00:10:49,159
inputs for that same sequence of operations you had to input it every single input those sequences

101
00:10:49,159 --> 00:10:57,240
of operations every single time after the 1940s stored programs computer computers came into play

102
00:10:58,120 --> 00:11:08,120
and they were able to store instructions to do things as data okay and there was a special program

103
00:11:08,120 --> 00:11:14,519
called an interpreter that executed these instructions it knew how to follow simple sequences of steps

104
00:11:14,519 --> 00:11:20,919
when the program told it to go to a different location it did so it was it was basically executing

105
00:11:20,919 --> 00:11:28,919
these instructions and the instructions that it it did were arithmetic and logical so

106
00:11:28,919 --> 00:11:34,279
addition subtraction things like that simple tests like checking for equality between two values

107
00:11:34,279 --> 00:11:39,879
and moving data so taking this value and putting it at a different memory location so I just

108
00:11:39,879 --> 00:11:45,000
wanted to give you a really brief overview and this is not super accurate but it gives you a sense of

109
00:11:45,000 --> 00:11:52,759
how exactly things happen low level in in the computer so the computer basically has memory where

110
00:11:52,759 --> 00:11:58,759
things are stored it has an arithmetic logic unit that does operations it knows how to add things

111
00:11:58,759 --> 00:12:04,440
subtract things multiply things compare things and then it has the control unit where this program

112
00:12:04,440 --> 00:12:11,639
counter is is set and this is where you put a program it so this works this is a program

113
00:12:12,519 --> 00:12:19,159
and up here is our memory so we have a bunch of memory locations 3 4 5 6 3 4 5 7 and at each of

114
00:12:19,159 --> 00:12:25,879
these memory locations we have some values stored pre you know pre-filled so when we first run

115
00:12:25,879 --> 00:12:32,120
this program what ends up happening is the um the interpreter sees the first instruction add the

116
00:12:32,120 --> 00:12:39,080
values at 3 4 5 6 and 3 4 5 7 together so it goes to these memory locations here grabs the 3 and the

117
00:12:39,080 --> 00:12:46,280
4 and sends them to the arithmetic logic unit the ALU knows how to do the addition so it adds 3 plus 4

118
00:12:46,280 --> 00:12:53,160
7 and sends the result back here now we never told it to store that result anywhere but the next

119
00:12:53,160 --> 00:12:59,879
instruction says store the value you just got back from the ALU at this memory location 3 4 5 8

120
00:12:59,879 --> 00:13:06,840
so the next step basically takes that 3 4 that 7 and stores it at memory location 3 4 5 8

121
00:13:06,840 --> 00:13:17,639
super tedious all we did was add 3 plus 4 we do that again we add 7 the values at 7 8 8 9 and 7 8 9

122
00:13:17,639 --> 00:13:25,800
now so it goes in the memory it grabs the 5 and the 2 sends it to the ALU the ALU calculates it as 7

123
00:13:25,800 --> 00:13:33,480
brings it back and then we store that in location 7 8 9 1 okay and then after that all we've done

124
00:13:33,480 --> 00:13:41,800
is 2 additions and then the next instruction says compare the values at memory locations 3 4 5 8 and 7 8 9 1

125
00:13:41,800 --> 00:13:50,120
so we're going to compare the 7 with the 7 the ALU again does this comparison and says all right well 7

126
00:13:50,120 --> 00:13:55,800
and 7 are equivalent so this is you know true or whatever it wants to give give back to the um to

127
00:13:55,800 --> 00:14:01,800
the interpreter and then the last instruction here we have is print the result of that comparison so

128
00:14:01,799 --> 00:14:07,319
we print true because they were equal right again super high level but it kind of gives you an

129
00:14:07,319 --> 00:14:13,479
appreciation for programming languages these days right this is very tedious to write if we had to

130
00:14:13,479 --> 00:14:19,079
write programs in in this manner um Alan Turing a long time ago showed that you can compute anything

131
00:14:19,079 --> 00:14:24,519
with actually a very an even more basic set of primitives not addition subtraction but instead

132
00:14:24,519 --> 00:14:30,279
with a tape you would actually have six primitives move the tape left move the tape right read the

133
00:14:30,279 --> 00:14:36,199
value at the tape put a value on the tape um erase the value from the tape and no operation

134
00:14:38,120 --> 00:14:44,679
and so since he showed this what the result of it actually was um is down here

135
00:14:46,759 --> 00:14:51,559
anything computable in one language is computable in any other programming language so if we had some

136
00:14:51,559 --> 00:14:57,959
you know some program written in Java that basically boils down to right something super long

137
00:14:58,040 --> 00:15:04,519
but something that is made up of these six primitives that means that if we boil down this program

138
00:15:04,519 --> 00:15:09,879
to these six primitives we can build back up the same program in a completely different language

139
00:15:10,440 --> 00:15:16,519
and that's really powerful that's a really cool statement now we're not going to be working with

140
00:15:16,519 --> 00:15:23,160
those primitives um we're going to be using the Python primitives which are more convenient

141
00:15:23,159 --> 00:15:28,439
and they allow us to do a lot more things in much less time i'm going to do a look comparison as we

142
00:15:28,439 --> 00:15:34,679
talk about the primitives of Python with English so in English some of the primitives might be

143
00:15:35,719 --> 00:15:41,879
words or even we can do letters or characters but you know we can say we can say its words um you know

144
00:15:41,879 --> 00:15:45,879
with characters we can build up words with words we can build up sentences with sentences we can

145
00:15:45,879 --> 00:15:51,319
build up stories with stories we can build up books and things like that in programming in programming

146
00:15:51,320 --> 00:16:00,680
languages the primitives are numbers sequences of characters operators like addition multiplication

147
00:16:00,680 --> 00:16:09,640
division checking free quality checking that something is greater than things like that so once we

148
00:16:09,640 --> 00:16:16,200
have these primitives in a language we can start to build up the syntax of the language so in

149
00:16:16,200 --> 00:16:22,920
English having something like noun and noun and noun doesn't make any sense right cat dog boy

150
00:16:22,920 --> 00:16:30,120
doesn't make much sense it's not syntactically valid but noun verb noun is syntactically valid right

151
00:16:31,160 --> 00:16:38,920
similarly in programming languages we can have two objects kind of side by side so here this is a

152
00:16:38,920 --> 00:16:44,360
sequence of characters h and i and this is the number five right beside that sequence of characters

153
00:16:45,320 --> 00:16:49,720
but that doesn't make any sense right what does it mean to have this sequence of characters in that

154
00:16:49,720 --> 00:16:55,240
number right beside it it has no meaning in Python instead what we have to do is we have to add

155
00:16:55,240 --> 00:17:00,200
an operator in between these two objects so here we add a little star operator in between the

156
00:17:00,200 --> 00:17:05,960
sequence of characters high and the number five and in Python the meaning to this is I want to

157
00:17:05,960 --> 00:17:11,880
repeat the sequence of characters high h i five times so this would basically give me high high high high

158
00:17:11,880 --> 00:17:21,240
so once we have sentences in English right and and expressions that are syntactically valid we can

159
00:17:21,240 --> 00:17:27,080
now talk about the static semantics of the language so in English saying something like I are hungry

160
00:17:27,080 --> 00:17:35,960
is syntactically correct but it's not syntact static it's not sorry it's not it doesn't have a good

161
00:17:35,960 --> 00:17:42,840
static semantics right there's no meaning there's no meaning to that because the r is for you

162
00:17:42,840 --> 00:17:48,600
know you are plural similarly in programming languages and this will differ depending on what

163
00:17:48,600 --> 00:17:54,120
programming language you use here you know in the previous slide we saw that you can use the star

164
00:17:54,120 --> 00:18:00,120
operator between the the the sequence of characters in the number and that meant repeat that that

165
00:18:00,119 --> 00:18:06,039
sequence many times but if we use a plus operator in between the sequence of characters and a number

166
00:18:06,679 --> 00:18:13,159
that doesn't have any meaning in Python so it has a static semantic error even though it's

167
00:18:13,159 --> 00:18:22,919
syntactically valid right we have operator sorry object operator object so so far we've been able

168
00:18:22,919 --> 00:18:28,039
to find really nice parallels with English right and the English language in the programming

169
00:18:28,039 --> 00:18:32,440
languages but this is kind of where things break down when we talk about the semantics of a

170
00:18:32,440 --> 00:18:39,000
language so in English you can have many different meanings right the chicken is ready to eat means

171
00:18:39,879 --> 00:18:45,240
let's eat this chicken or the chicken is ready to eat means the chicken wants to eat something

172
00:18:45,240 --> 00:18:51,720
right programming languages there is no multiple meanings to a program that you write because the

173
00:18:52,039 --> 00:18:58,360
because the computer the machine the language follows the set of instructions to a T there is

174
00:18:58,360 --> 00:19:04,360
no ambiguity about what it needs to do right it just follows the instructions and does what it needs

175
00:19:04,360 --> 00:19:11,720
to do to the end till it reaches you know the it terminates the program and so programs only have one

176
00:19:11,720 --> 00:19:15,400
meaning but the problem is it might not be the meaning that you intended it to have

177
00:19:15,400 --> 00:19:23,800
and that's when things start to go wrong we can have syntactic errors in our program spelling errors

178
00:19:23,800 --> 00:19:28,680
and indentation errors things like that and those are easy to catch static semantic errors are

179
00:19:29,320 --> 00:19:37,160
90% probably easy to catch but the problem comes in with the semantics right the meaning that you

180
00:19:37,160 --> 00:19:44,040
intended this program to have might not be what it's actually doing and that's where most of my errors

181
00:19:44,039 --> 00:19:48,359
happen and that's where I get super frustrated when I program and that's probably where you guys

182
00:19:48,359 --> 00:19:53,240
will get super frustrated too because you write a program that you think is doing one thing but

183
00:19:53,240 --> 00:19:59,480
instead either it crashes eat right away or runs forever and doesn't really stop or it terminates

184
00:19:59,480 --> 00:20:04,440
but it gives you an incorrect answer it's not what you were expecting and we'll talk about this

185
00:20:05,720 --> 00:20:11,879
in a few lectures so when we write programs we're basically writing sequences of definitions

186
00:20:12,520 --> 00:20:19,160
and commands and we're going to write these either in a file editor or in a shell the first

187
00:20:19,720 --> 00:20:25,160
today at least we're writing in the shell directly and half of tomorrow we'll write in the shell

188
00:20:26,520 --> 00:20:34,440
because we're not really writing any we're not really writing many lines of code we're just going

189
00:20:34,440 --> 00:20:41,000
to be I'm just going to be showing you some really quick quick things that we can do with the Python

190
00:20:41,000 --> 00:20:48,279
programming language so hopefully you all have installed the programming environment this is the

191
00:20:48,279 --> 00:20:53,960
code editor so tomorrow we'll start working in here but for today we're really just going to work

192
00:20:53,960 --> 00:20:59,720
on in the shell and even in the future you can still type commands in the shell I find the shell

193
00:20:59,720 --> 00:21:04,599
very useful if there's just something really quick that I want to check that I don't want to write

194
00:21:04,599 --> 00:21:08,759
you know write a program for and then run it's just like a simple command that I want to check to

195
00:21:08,759 --> 00:21:15,799
make sure it's doing what I think it's doing before I insert it in my code editor so here we have

196
00:21:17,879 --> 00:21:24,200
this right so mine is I guess I'm using the white thing just because I find it easier for you guys to

197
00:21:24,200 --> 00:21:31,559
see this is the file editor and this is just a bunch of expressions are yeah a bunch of code that

198
00:21:31,559 --> 00:21:36,519
we're going to type in today and we're going to type it in the shell today so the thing on the right

199
00:21:36,519 --> 00:21:47,720
hand side okay so what exactly do we do when we write a program at the base of it we are going to

200
00:21:47,720 --> 00:21:54,680
create objects inside our programs and we're going to manipulate them that's it that's what

201
00:21:54,680 --> 00:22:04,759
programming is mostly about at its core now when we create objects it's important this is kind of

202
00:22:04,759 --> 00:22:08,920
something we're going to come back to again and again in a kind of more high level setting but

203
00:22:09,720 --> 00:22:15,240
right now what I want you to understand is that when we create an object an object has a type

204
00:22:16,119 --> 00:22:23,000
okay and the type that an object has tells Python the things you're allowed to do with that object

205
00:22:23,960 --> 00:22:31,559
so here are two examples the number 30 it's a number the type we'll talk about it in a bit the

206
00:22:31,559 --> 00:22:36,679
type is an integer it's a whole number but basically what are the things we can do with this integer

207
00:22:36,679 --> 00:22:41,559
with this number we can add it to another number we can subtract it to another number we can take

208
00:22:41,559 --> 00:22:48,440
it to another power we can take some other number to this power of 30 right a bunch of sort of

209
00:22:48,440 --> 00:22:55,000
mathematical operations as you would expect so that's pretty straightforward what about this one

210
00:22:55,400 --> 00:23:03,400
this quotation capital A lowercase and lowercase A quotation so this is something we'll talk about

211
00:23:03,400 --> 00:23:09,400
next lecture it's called a string and it's a sequence of characters the quotations tell Python

212
00:23:09,400 --> 00:23:14,359
it's a sequence of characters and the characters part of it are capital A lowercase and lowercase A

213
00:23:15,640 --> 00:23:21,160
the kinds of things I can do with this string are not the same kinds of things I'm allowed to do

214
00:23:21,160 --> 00:23:27,320
with a number right if I tried to take Anna and divided by the sequence of characters Bob

215
00:23:28,840 --> 00:23:33,640
Python would complain very much right because you can't divide a string by another string a sequence

216
00:23:33,640 --> 00:23:38,920
of characters doesn't make sense to divide it by another sequence of characters similarly I can't

217
00:23:38,920 --> 00:23:44,759
take Anna to some power right I can't multiply or I can't multiply by itself things like that

218
00:23:45,480 --> 00:23:49,560
but the kinds of things that I am allowed to do on a sequence of characters is different than the

219
00:23:49,559 --> 00:23:53,720
kinds of things I'm allowed to do on a number so the things I can do with the sequence of characters

220
00:23:53,720 --> 00:24:00,200
is I can say well what's the character at the first position what's the middle character how

221
00:24:00,200 --> 00:24:05,879
long is the sequence of characters right how many characters do I have and so now you can see that

222
00:24:05,879 --> 00:24:11,399
the the type of the object is actually really important Python uses it to to know the kinds of

223
00:24:11,399 --> 00:24:16,839
operations you're allowed to do with it and so there's actually scalar objects and these are

224
00:24:16,839 --> 00:24:23,959
Python's primitives numbers and truth values and there are non-scalar objects we're not talking

225
00:24:23,959 --> 00:24:28,679
about these yet we'll talk about these in a few lectures but these have some sort of structure so

226
00:24:28,679 --> 00:24:34,359
for example a list of numbers has a structure because there's a number at the beginning of the

227
00:24:34,359 --> 00:24:38,839
list there's a number at the end of the list things like that but a number itself doesn't have a

228
00:24:38,839 --> 00:24:45,559
structure it's just the number so what are the types of the scalar objects what are the types of

229
00:24:45,559 --> 00:24:54,440
the primitives in Python integers so number five zero negative a hundred a million float is another

230
00:24:54,440 --> 00:25:00,440
type it represents all the real numbers so three you know three point two seven two point zero is a

231
00:25:00,440 --> 00:25:05,879
float because it has a decimal number even though to us that just means two but to Python if you

232
00:25:05,879 --> 00:25:11,319
put in two point zero it says that's a type float negative three point one four one five nine things

233
00:25:11,319 --> 00:25:17,720
like that bull is a bullion it represents truth values and there's only two possible values that

234
00:25:17,720 --> 00:25:25,240
a bullion type has true and false and it has to be capital T true and capital T sorry capital F false

235
00:25:26,679 --> 00:25:35,480
and the last one is this non-type type it's literally called non-type and it has only one special

236
00:25:35,480 --> 00:25:41,720
value none we're not going to talk about it for a bit but we will sometime in the future so to

237
00:25:41,720 --> 00:25:47,799
figure out the type of an object when you create that object you you use the type command so we can

238
00:25:47,799 --> 00:25:53,799
say something like type parentheses and this is a command and inside the parentheses you say what

239
00:25:53,799 --> 00:25:59,880
do you want to find the type of so if we do type of seven it tells me it's an it and if you want to

240
00:25:59,880 --> 00:26:04,599
do the same command again I hit the up arrow and it automatically puts in what I wrote previously

241
00:26:04,599 --> 00:26:09,399
and then if I want to do type of 0.0 it's a float because there's a decimal point

242
00:26:12,919 --> 00:26:20,599
so this is basically what I said so we type this in the shell and the shell tells us what the output is

243
00:26:23,319 --> 00:26:30,439
so just to reiterate int float, bool and non-type are types of objects

244
00:26:30,920 --> 00:26:37,799
and there can be many different objects you can create of that type right so if you think about

245
00:26:37,799 --> 00:26:43,160
it in some floats we basically have an infinite number of objects we can create of those types

246
00:26:43,720 --> 00:26:49,720
right because we can have 0, 1, 2, 3, 100, 200, 300 a million right there's and all the negatives

247
00:26:49,720 --> 00:26:55,640
there's almost a you know infinite number of values uh object that we can create of type

248
00:26:55,720 --> 00:27:03,640
into float but bool there's only two the truth values true or false and the non-type there's only one

249
00:27:03,640 --> 00:27:09,080
this is not right so that's the type and these are the possible values possible objects we can create

250
00:27:11,240 --> 00:27:16,520
you try it so you can just yell out the answers there's nothing to type unless you want to check

251
00:27:16,519 --> 00:27:28,759
yourself so what is the type of 1234 int type of 8.99 float type of 9.0 float type of true

252
00:27:29,879 --> 00:27:36,359
bool and type of false bool perfect if you ever wonder what the type of something is you type it in

253
00:27:36,359 --> 00:27:44,440
here just you guys are doing well type is bool type of lowercase t true is an error just wanted to

254
00:27:44,440 --> 00:27:49,799
point that out just to reiterate the fact that capitalization matters in Python this is our first

255
00:27:49,799 --> 00:27:58,200
error by the way guys very exciting the error is a name error and this is the message associated with

256
00:27:58,200 --> 00:28:07,000
it you also know that it's something special in Python when you have color coded stuff so you see

257
00:28:07,000 --> 00:28:13,720
capital T true capital false are this dark blue here right whereas anything that's not

258
00:28:14,759 --> 00:28:21,000
special in Python is just black right so type is a special command right this is a float so you

259
00:28:21,000 --> 00:28:29,160
see their color coded okay so once we create objects one thing we can do with these objects is to

260
00:28:29,160 --> 00:28:37,240
cast them to different type now this is a little bit um maybe confusing because we're not actually

261
00:28:37,240 --> 00:28:44,120
changing the object once we've created it so once we create the integer three it's

262
00:28:44,119 --> 00:28:51,559
there in memory if we cast that integer to a float version of it we're creating a new object

263
00:28:51,559 --> 00:28:56,759
in memory we're not changing the three the three already exists we're just getting the float

264
00:28:56,759 --> 00:29:03,719
version of it and storing it as a new object in memory so when we do float three this is a command

265
00:29:03,719 --> 00:29:11,799
that gets for me the float version of the integer three okay so that will give me 3.0 so for example

266
00:29:12,680 --> 00:29:26,200
um right this is what I had float three right the output is 3.0 if I do int of 5.2 it truncates it

267
00:29:26,200 --> 00:29:33,799
and it gives me the integer portion of this float if I do int of 5.9 it still truncates it and

268
00:29:33,799 --> 00:29:39,000
gives me the integer version of this float it doesn't round right I'm just asking for the integer

269
00:29:39,000 --> 00:29:46,119
version of this of this of this float some operations like round is an operation we can do

270
00:29:47,000 --> 00:29:54,599
has an implicit cast in it so if I round 5.9 it's actually going to round it to 6.0 and then cast

271
00:29:54,599 --> 00:30:00,519
it to an integer so notice it doesn't give me as an output 6.0 it then rounds it to just 6

272
00:30:00,519 --> 00:30:09,480
okay so that's basically what I said in the example so let's have you try this

273
00:30:10,920 --> 00:30:15,879
what are the types of the following I don't need the values but the types so if I get type

274
00:30:16,359 --> 00:30:28,759
of float of 123 what is the type of that float yeah exactly yep I'm yep what if I round 7.9

275
00:30:28,759 --> 00:30:38,200
what's the type of the result int yep what if I create a float of the round of 7.2 yes good float would

276
00:30:38,200 --> 00:30:50,599
be 7.0 and the int of 7.2 int yes exactly I want the type not the value and the int of 7.9 is an int

277
00:30:50,599 --> 00:30:58,200
exactly awesome good okay so we've created a bunch of objects right we know that we can create a

278
00:30:58,200 --> 00:31:04,680
bunch of objects in our programs what do we do with them well we can combine them into expressions

279
00:31:05,559 --> 00:31:13,559
so let's say we have 3 plus 2 I've got object operator object cool syntactically valid in python

280
00:31:13,559 --> 00:31:21,960
and has no static semantic error so if I do that in python it's going to be okay 3 plus 2

281
00:31:22,759 --> 00:31:33,400
5 and the type of 3 plus 2 is an integer right so basically what I've done here I've put an

282
00:31:33,400 --> 00:31:41,720
expression within this type command and that's okay that's in fact encouraged in python you don't

283
00:31:41,720 --> 00:31:46,519
just want to calculate and then stick in that would be very very tedious so you can insert

284
00:31:46,519 --> 00:31:54,039
expressions in many many different places right so here we have 3 plus 2 5 divided by 3 again we've

285
00:31:54,039 --> 00:32:00,039
got you know 5 divided by 3 has this decimal value and the result has a float has of type is of type

286
00:32:00,039 --> 00:32:07,960
float so the important thing to remember when we're doing expressions is python reads the expression

287
00:32:08,599 --> 00:32:15,079
but it does not store the expression in memory okay what it does is it reads the expression

288
00:32:15,079 --> 00:32:22,599
evaluates it to one single value and then it stores the result value in memory so it never

289
00:32:22,599 --> 00:32:28,359
stores the expression it evaluates the expression and then stores the value okay and so this is

290
00:32:28,359 --> 00:32:35,079
this syntax for an expression object operator object as we just just saw and that's really and the

291
00:32:35,079 --> 00:32:42,439
idea I said before right where python stores values of expressions not the expressions themselves

292
00:32:42,519 --> 00:32:49,720
is really really important right so this is my first big idea slide I decided to insert these

293
00:32:49,720 --> 00:32:54,360
because I think they kind of stress the importance of several concepts so I hope this is one

294
00:32:55,320 --> 00:33:00,360
so you know we're taking expressions they can be as complex as you'd like we can use parentheses

295
00:33:00,360 --> 00:33:06,039
you know a bunch of it can doesn't just have to be operator object operator object it can be more

296
00:33:06,039 --> 00:33:13,000
complex than that but basically however complex that expression is we evaluate it and we replace

297
00:33:13,000 --> 00:33:19,399
it with one value and the expression can be something like this it doesn't just have to be something

298
00:33:19,399 --> 00:33:24,839
that's mathematical right this was a mathematical expression but this is also an expression and it

299
00:33:24,839 --> 00:33:32,200
evaluates so this entire thing evaluates to this word you know this word which represents the type

300
00:33:32,200 --> 00:33:41,480
integer so here's some more examples three plus two again we got we've got these examples with

301
00:33:41,480 --> 00:33:46,840
the parentheses four plus two times six minus one obviously gives us the number 35 and then we

302
00:33:46,840 --> 00:33:52,759
can insert expressions wherever we'd like so here I'm inserting that specific expression in the

303
00:33:52,759 --> 00:34:01,799
type command and this is also an expression like I just said and its result is int okay and similarly

304
00:34:01,799 --> 00:34:08,199
we can also insert that expression here and then we can wrap that around cast and it gives us a

305
00:34:08,199 --> 00:34:29,480
flow yes when you're inserting when you're inserting what oh I see

306
00:34:30,440 --> 00:34:40,840
yeah that's a good that's a good question so in this particular case the type and the float are not

307
00:34:42,039 --> 00:34:47,320
there's no operator I guess in this particular case it's more like a command that gives us an

308
00:34:47,320 --> 00:34:54,840
output but there is still some there is there is still an output that that it gives us so we can

309
00:34:54,840 --> 00:35:03,160
then take the result of this and save it somewhere else sorry yeah I guess the example I gave on

310
00:35:03,160 --> 00:35:08,280
the previous slide was just an example of an expression where we could you object operator object

311
00:35:15,240 --> 00:35:21,160
when we have these I guess it works for mathematical expressions mathematical expressions work left

312
00:35:21,159 --> 00:35:32,039
to right just like in math parentheses can override certain precedents if we have commands that have

313
00:35:32,039 --> 00:35:37,960
computations then we have this command with the parentheses and we evaluate what's inside the

314
00:35:37,960 --> 00:35:46,440
parentheses first so we work our way in to out in that particular case so here's some examples

315
00:35:46,440 --> 00:35:52,440
let's have you try these so we can type these in our console what are the values of the following

316
00:35:52,440 --> 00:36:04,440
expressions so 13 minus 4 divided by 12 times 12 so we can try that I don't know off the top of my

317
00:36:04,440 --> 00:36:12,200
head so I'll have to type it in 0.0625 okay so the value of that expression is a float right 0.0625

318
00:36:12,199 --> 00:36:15,559
what's the value of the expression type 4 times 3

319
00:36:18,519 --> 00:36:27,719
in to what about the type of the expression 4.0 times 3 yes exactly that's very good so type of

320
00:36:27,719 --> 00:36:36,919
4 times 3 is in to but 4.0 times 3 is a float good and then what about in to of a half or of 1 over 2

321
00:36:42,519 --> 00:36:51,799
yeah exactly it's 0 yep because it's 0.5 and we trunkate to 0 the reason I had this here is because

322
00:36:51,799 --> 00:36:58,359
it leads nicely into this slide you don't have to memorize these rules you can always check it out

323
00:36:58,359 --> 00:37:04,679
in the console but there are some rules for the resulting types when we do operations so when

324
00:37:04,679 --> 00:37:13,319
we do operations with numbers addition subtraction and multiplication always yield an integer if both

325
00:37:13,319 --> 00:37:18,279
of the operators are integers if one is a float or both are floats then it gives me a float

326
00:37:19,399 --> 00:37:24,440
division is different no matter what types you divide you'll always get a float

327
00:37:27,079 --> 00:37:32,279
now what about this slash slash and this percent these are actually useful operations

328
00:37:32,360 --> 00:37:39,320
they kind of go hand in hand with division so when I do 5 divided by 3 it's this 1.667

329
00:37:41,720 --> 00:37:50,280
slash slash is basically a floor or you know getting the integer portion of the division so 5 slash

330
00:37:50,280 --> 00:37:59,640
slash 3 gives me 1 right it truncates the fraction the percent gives me the remainder

331
00:37:59,639 --> 00:38:07,559
so 5% 3 gives me the remainder when I divide 5 by 3 so it's going to give me give it to me in a

332
00:38:07,559 --> 00:38:13,400
whole number right so that's going to be 2 because there's 2 left over when I divide 5 by 3

333
00:38:15,319 --> 00:38:21,159
so these are pretty useful operations the the slash slash and the percent when when we do

334
00:38:21,159 --> 00:38:27,799
sort of mathematical programs the last thing is the star star is how we denote power

335
00:38:27,800 --> 00:38:34,760
exponentiation kind of different than then you might be used to in math so 2 to the power of 3

336
00:38:35,480 --> 00:38:43,560
8 right 2 to the power of 3.0 8.0 and the rules for integer integer division

337
00:38:44,360 --> 00:38:50,680
percent and exponentiation are just like addition subtraction multiplication if one is a float

338
00:38:50,679 --> 00:39:02,039
then the result will be a float as well okay yeah okay and we talked about type of output

339
00:39:04,039 --> 00:39:09,879
so I think I briefly mentioned this the operator precedence is exponentiation and then multiplication

340
00:39:09,879 --> 00:39:15,639
division percent or remainder at the next level and then addition subtraction at the bottom but

341
00:39:15,639 --> 00:39:25,079
you can always override these using parentheses okay question so far before we move on yes

342
00:39:25,960 --> 00:39:32,359
so why is division of y is always result of like 9 by 3 and that's why does it stay in the same

343
00:39:32,359 --> 00:39:38,839
yeah so the question is why does it always result in a float if it didn't I think it would the

344
00:39:38,839 --> 00:39:44,359
operation itself would have to do extra work to figure out whether it's a whole number or not

345
00:39:44,360 --> 00:39:52,120
so I think it's just easier that it gives us always a float I guess previous versions of Python the

346
00:39:52,120 --> 00:39:59,000
slash was actually I think integer division which is super counterintuitive because you would use

347
00:39:59,000 --> 00:40:02,760
that in your program and then you would basically enter your divide and things would go wrong

348
00:40:03,400 --> 00:40:09,640
but again I just a design choice on behalf of the programmers yeah other questions so far

349
00:40:10,599 --> 00:40:19,559
okay so we have a lot of objects right objects have different types again floats integers booleans

350
00:40:20,279 --> 00:40:25,799
what can we do with them right so far they're kind of just sitting in there and we can get properties

351
00:40:25,799 --> 00:40:30,759
about them but what we'd like to do is write programs basically trying to automate some things about

352
00:40:30,759 --> 00:40:37,079
these objects manipulate them to help us achieve you know a more complicated and interesting program

353
00:40:37,400 --> 00:40:46,759
so what we can do to get to that to that end is to start assigning names to some of these objects

354
00:40:47,639 --> 00:40:56,360
okay if I create an object for pie right in my program to 20 decimal places somehow and I have

355
00:40:56,360 --> 00:41:01,960
that number in my program that float in my program if I want to use that number in many different

356
00:41:01,960 --> 00:41:07,320
places in my program I'd have to copy and paste it a whole bunch of times right so far

357
00:41:08,760 --> 00:41:14,679
which is very tedious lots of errors will happen right I don't want to do that so instead what I can

358
00:41:14,679 --> 00:41:21,639
do is I can give a name to this ridiculously long value of pi called pi right and then I can

359
00:41:21,639 --> 00:41:27,000
just use this name anywhere I want to grab that ridiculously long value for pi in my program

360
00:41:27,639 --> 00:41:33,719
it's a lot easier to read right it's a lot easier for me to write this program and you know it

361
00:41:34,679 --> 00:41:41,800
it leads to a really nice and neat program so what we can do is we can start saying that you know

362
00:41:41,800 --> 00:41:49,719
the float point 001 will be referenced by the name small or you know the the 100.4 will be

363
00:41:49,719 --> 00:41:56,519
referenced by the name temp so what we want to do is create these things called variables and a

364
00:41:56,519 --> 00:42:03,000
variable is different in computer science from a mathematical variable or variables that you've

365
00:42:03,000 --> 00:42:07,879
known so far in math so math variables come back to the idea of declarative knowledge right a

366
00:42:07,879 --> 00:42:14,039
declarative statement you can have something like a plus b is equal to b minus 1 in math right or

367
00:42:14,039 --> 00:42:20,599
x is equal to x or x times x is equal to y and that's perfectly okay right in math we basically say

368
00:42:20,599 --> 00:42:27,239
that variable x represents all the square roots of y that's not going to fly in computer science

369
00:42:27,960 --> 00:42:33,320
computer science we don't have right we don't do declarative knowledge we do imperative knowledge

370
00:42:33,320 --> 00:42:40,519
and so what we're working with in computer science is a bunch of assignment statements so what we

371
00:42:40,519 --> 00:42:48,199
can do in computer science is we're going to basically bind a value to a variable so I'm going to

372
00:42:48,199 --> 00:42:53,000
say this variable name is bound to this value every time I want to grab this value I'm going to

373
00:42:53,000 --> 00:43:00,440
invoke this variable name so here are some examples I've got a is equal to b plus 1 the thing on

374
00:43:00,440 --> 00:43:06,920
the right hand side will evaluate to some value as long as I have something that be you know b

375
00:43:07,639 --> 00:43:15,960
as a value for I've got here m is equal to 10 right so m is a variable its value is 10 I've got f is

376
00:43:15,960 --> 00:43:23,159
equal to m times 9.98 so again I have an expression on the right hand side and that's okay I'm going

377
00:43:23,159 --> 00:43:32,599
to use the value of 10 so f's value will be 99.8 yeah I'm going to put it so that like for f is

378
00:43:32,599 --> 00:43:37,400
it like this one value of m or can you have it so it's going to do whatever m x and you use it

379
00:43:38,599 --> 00:43:44,360
yeah the question is can you have m whatever it recently is so in this particular case I just have

380
00:43:44,360 --> 00:43:50,599
these two lines and m will be whatever 10 is but we'll see in a couple lectures that we can write

381
00:43:50,599 --> 00:43:57,400
like a loop where you change m and then every time you change m you read immediately calculate f

382
00:43:58,200 --> 00:44:03,320
and then it'll calculate f based on the new value of m but if we just have these two lines

383
00:44:03,320 --> 00:44:13,240
that's that's all there is it just uses 10 was there another question okay so in computer science

384
00:44:13,240 --> 00:44:18,599
variable you have only one variable to the left of this equal sign called the assignment operator

385
00:44:18,599 --> 00:44:24,599
and you have a value to the right hand side of the equal sign the assignment operator okay so one

386
00:44:24,599 --> 00:44:34,199
variable basically maps to or binds to one value so the equal sign is an assignment statement

387
00:44:34,199 --> 00:44:39,880
it's not equality it's not a solve for x type of situation it's just an assignment it binds this

388
00:44:39,880 --> 00:44:48,199
name to this value so the way that we figure out the name with the value is well if we have this

389
00:44:48,199 --> 00:44:53,000
assignment statement here we first look at the right hand side so we always start with the right

390
00:44:53,000 --> 00:44:59,480
hand side and we evaluate it remember we have an expression on the right we have to evaluate it

391
00:44:59,480 --> 00:45:08,519
to one value so this will be 3.14 whatever it is 1.159 and then we take that value and bind it to

392
00:45:08,519 --> 00:45:15,639
the name pi so anytime I type in p i pi in my program from now on Python will automatically grab

393
00:45:15,639 --> 00:45:24,039
3.14159 from memory right so it's bound to that value now okay there are some rules that I have

394
00:45:24,039 --> 00:45:33,239
them on the previous one yes there are some rules to variable names but we'll talk about that in

395
00:45:33,239 --> 00:45:39,400
a bit for now I want you to tell me if any of the following are allowed if I do x is equal to 6 is

396
00:45:39,400 --> 00:45:45,320
that allowed in Python yes it is good because I have one variable name bound to one value 6 what

397
00:45:45,320 --> 00:45:55,079
about 6 equals x it's just backward okay good 6 equals x is bad syntax error how about x times y

398
00:45:55,079 --> 00:46:01,720
equals 3 plus 4 nope exactly because the thing on the left has an operator in it and operators are

399
00:46:01,719 --> 00:46:07,719
special right so it can't have you can't have a variable with that star as a name how about x

400
00:46:07,719 --> 00:46:15,000
y equals 3 plus 4 allowed yes exactly I was hoping to get you guys with that but I didn't x y equals

401
00:46:15,000 --> 00:46:22,199
3 plus 4 is okay there was no error and then I can invoke the name of the variable I just created

402
00:46:22,199 --> 00:46:29,399
simply by typing it in so if I type in x y it gives me 7 right and then I can do operations with it x

403
00:46:29,400 --> 00:46:41,400
y plus 1 is 8 right yeah so those are strings right sequences of characters here these are

404
00:46:41,400 --> 00:46:48,920
variables so these are names that I I am giving to as a variable yeah that's a great question so

405
00:46:48,920 --> 00:46:53,639
this is going to be a string and you notice it it changed color right it has some meaning in

406
00:46:53,639 --> 00:47:08,039
Python but x y is a variable that I I create yeah okay so why do we want to give names to variables

407
00:47:08,039 --> 00:47:14,519
because as I showed you with the pi example it's a lot easier to write code write readable code

408
00:47:14,519 --> 00:47:22,199
if you have variable names within within your programs so when you grab when you write programs

409
00:47:22,199 --> 00:47:27,879
it's important to choose variable names wisely you don't want to use just single letters you don't

410
00:47:27,879 --> 00:47:31,480
want to name it something that doesn't have something to do with the program you're writing

411
00:47:32,359 --> 00:47:37,559
because you're going to want to reread these programs sometime in the future or others might

412
00:47:37,559 --> 00:47:43,799
want to read your programs sometime in the future so here's an example of a nice program it's just

413
00:47:43,799 --> 00:47:50,039
basically for assignment statements that do some calculations the first line of the program is not

414
00:47:50,039 --> 00:47:55,400
really a line it's called a comment you can have as many of these as you'd like they start with a

415
00:47:55,400 --> 00:48:02,599
hash it's a line that starts with a hash and it's basically a text that you write that helps you

416
00:48:03,400 --> 00:48:09,239
or others figure out what the code is supposed to do and usually we comment sort of large chunks of

417
00:48:09,239 --> 00:48:18,440
code at a time not line by line then we have these four equal for assignment statements so here I'm

418
00:48:18,440 --> 00:48:26,119
defining variable named pi bound to the value here so not the division but 3.14159 variable named

419
00:48:26,119 --> 00:48:32,280
radius bound to this float 2.2 and then I have a variable named area which is bound to the result

420
00:48:32,280 --> 00:48:40,519
of this expression okay so when Python sees my pi and my radius it grabs them from memory replaces

421
00:48:40,519 --> 00:48:48,759
them with the values evaluates the expression grabs that one value that we evaluated to 15.0

422
00:48:48,759 --> 00:48:55,400
something whatever this is and binds the 15.0 something to the name area same with circumference

423
00:48:59,719 --> 00:49:03,719
code style is something that we're actually going to look at in your problem sets so I just wanted

424
00:49:03,719 --> 00:49:10,279
to quickly talk about that here is a program that has really bad style actually that shouldn't be

425
00:49:10,279 --> 00:49:15,879
it should be you know terrible or something like that but it's in case you haven't noticed it's the

426
00:49:15,879 --> 00:49:21,159
same program as on the previous slide but if I gave you this program straight off the bat you probably

427
00:49:21,159 --> 00:49:29,159
wouldn't know what it's doing it's reusing 355 over 1 1 3 twice here it's using just a and c as

428
00:49:29,159 --> 00:49:37,159
variable names it's description is due calculations so pretty bad this is a little bit better I've

429
00:49:37,159 --> 00:49:45,960
recognized that 355 over 1 1 3 is being used twice so I'm saving it as a variable but my variables

430
00:49:45,960 --> 00:49:53,879
are still single characters and my comments are pretty bad I'm basically saying what the code is

431
00:49:53,880 --> 00:50:01,880
doing please don't do that we can see that a equals p times r times r right I see that I'm

432
00:50:01,880 --> 00:50:08,519
multiplying p with r squared I don't need to read that in English right what I would like to see

433
00:50:08,519 --> 00:50:15,880
is a comment like this here I'm commenting you know a chunk of code and someone who doesn't want to

434
00:50:15,880 --> 00:50:20,360
read this chunk of code just reads the comment and I already know that I'm calculating the area

435
00:50:20,360 --> 00:50:27,320
and circumference using an approximation for pi that's a pretty nice comment there and good

436
00:50:27,320 --> 00:50:36,120
descriptive names and all that so we can actually once we create an object a variable sorry once we

437
00:50:36,120 --> 00:50:42,840
create an object and bind it to a variable we can change the bindings so we can take that variable

438
00:50:43,400 --> 00:50:50,200
and bind it to a completely different value this might not be sort of useful right now but it

439
00:50:50,200 --> 00:50:58,360
will be useful when we introduce control flow in our programs so to rebind a variable what that

440
00:50:58,360 --> 00:51:03,880
means is we're going to take the name we're going to lose the binding to the previous value and

441
00:51:03,880 --> 00:51:09,000
we're going to rebind it to a new value so I'm going to show you how this looks like in memory I'm

442
00:51:09,000 --> 00:51:15,400
going to use this sort of cloud picture to represent what happens behind the scenes whenever we write

443
00:51:15,400 --> 00:51:20,119
programs and it's like a little animation to help you understand line by line what's going on

444
00:51:20,920 --> 00:51:29,000
so here we have pi equals 3.14 so the green 3.14 is my value in memory cloud is memory that's my

445
00:51:29,000 --> 00:51:36,519
value in memory and it's bound to this name pi so this is my variable name the next line radius

446
00:51:36,519 --> 00:51:43,239
equals 2.2 same thing I've got 2.2 as my value in memory my object and radius is the name for that

447
00:51:43,239 --> 00:51:50,440
object area equals pi times radius squared so what happens behind the scenes is it calculates this

448
00:51:50,440 --> 00:51:55,719
value right it doesn't store the expression it stores the value resulting from the calculation

449
00:51:55,719 --> 00:52:03,559
and then it saves it it or binds it to the name area okay everything okay so far we've seen this

450
00:52:03,559 --> 00:52:10,519
code before cool so now what happens when we do this radius equals radius plus one in math

451
00:52:12,599 --> 00:52:18,199
that would say zero equals one but we're not in math here right we're in computer science and

452
00:52:18,199 --> 00:52:25,960
this is perfectly valid we're following the rule right when we have an assignment that says look

453
00:52:25,960 --> 00:52:33,159
at the right hand side first and evaluate it and then bind it to the left hand side so if we look

454
00:52:33,159 --> 00:52:41,559
at the right hand side first right we see radius well what's the value 2.2 we see add one to it

455
00:52:42,519 --> 00:52:49,879
3.2 save that in memory and then we see the assignment now save it with the name radius

456
00:52:51,799 --> 00:52:59,000
okay so we can only have one variable assigned to one value at a time right this is not

457
00:52:59,000 --> 00:53:04,119
math this computer science so you can only have radius point two one thing at a time

458
00:53:05,480 --> 00:53:12,039
with this line of code radius equals radius plus one we've lost the binding to 2.2 this object in

459
00:53:12,039 --> 00:53:20,519
memory and we've rebounded it to the value 3.2 okay and that's perfectly fine 2.2 is now just

460
00:53:20,519 --> 00:53:26,440
sitting in memory we can't get back to it unless we say maybe radius equals 2.2 it just sits in memory

461
00:53:26,440 --> 00:53:31,400
and then you know might be collected later on by or reclaimed by garbage collection or something

462
00:53:31,400 --> 00:53:38,039
like that but for now we can't get back to it now what's the value for area at the end of these lines

463
00:53:39,800 --> 00:53:46,119
well according to this it's 15.1976 so it's using the old 2.2 value for radius

464
00:53:47,800 --> 00:53:55,880
and that's okay because the program never told uh never had a line that said recalculate area

465
00:53:55,880 --> 00:54:04,119
after we change the radius right it's just following dumb line by line right it doesn't know that

466
00:54:04,119 --> 00:54:09,960
hey if I change the radius the user might want the area changed right it doesn't make those connections

467
00:54:09,960 --> 00:54:15,800
it's just following instructions and that's okay if we wanted to change the area we would have to

468
00:54:15,800 --> 00:54:21,880
copy this line and paste it after we've changed the radius and then the area would change as well

469
00:54:21,880 --> 00:54:29,079
okay does that make sense that's kind of an important part of this lecture okay cool

470
00:54:30,519 --> 00:54:35,480
so big idea here is our lines are evaluated one after the other we're not skipping we're not

471
00:54:35,480 --> 00:54:40,440
repeating things that's something we're going to learn about later um but for now line by line

472
00:54:41,800 --> 00:54:47,559
so here's a little you try it um these three lines are executed in order what are the values

473
00:54:47,559 --> 00:54:53,480
for meters and feet variables at each line so how about at the first line what's the value for

474
00:54:53,480 --> 00:55:03,880
meters after we execute the first line 100 what about feet so feet at at the end of the first

475
00:55:03,880 --> 00:55:10,599
line there is no value for feet yet how about after the second line 328.8 right how about the

476
00:55:10,599 --> 00:55:21,000
value for meters 100 still and what about after the third line I'm changing meters to 200 exactly

477
00:55:21,000 --> 00:55:29,960
yeah meters is 200 but feet is still 328.08 and this is something I want to show you guys today

478
00:55:29,960 --> 00:55:36,759
and we're going to use this Python tutor a lot more in the future Python tutor is a nice website

479
00:55:36,760 --> 00:55:44,520
that allows you to step in your code step through your code step by step so at each line that you

480
00:55:44,520 --> 00:55:49,720
execute you get to see the values of all the variables in the code it very useful debugging tool I

481
00:55:49,720 --> 00:55:54,840
hope you'll try it out today and uh on Monday maybe for the finger exercises if you're if you're

482
00:55:54,840 --> 00:56:00,280
having trouble and you know you can use it for quizzes uh to help you debug but we can I can just

483
00:56:00,280 --> 00:56:06,520
show you it's pretty simple uh here because it's just a step by step so we step through so the red

484
00:56:06,519 --> 00:56:11,559
says the line I'm going to execute green is the line I just executed so I just executed meters

485
00:56:11,559 --> 00:56:18,039
a hundred so here I have my meters variable with the value 100 step through next so I just

486
00:56:18,039 --> 00:56:26,759
executed feet equals this so I now have a variable named feet within a value 328.08 meters still 100

487
00:56:26,759 --> 00:56:35,800
and then meters 200 feet remained 328.08 okay so obviously this is a pretty simple program to

488
00:56:35,800 --> 00:56:45,160
run the Python tutor on but you can imagine using it in uh in more complex settings how about one

489
00:56:45,160 --> 00:56:51,880
more and this is my last example I want you to try to write a program that swaps the values of x and y

490
00:56:51,880 --> 00:56:58,920
so originally and I'll draw this the memory diagram real quick so we have this is our memory we have

491
00:56:58,920 --> 00:57:08,760
x is bound to one y is bound to two and what I want to do without saying x equals two y equals one

492
00:57:08,760 --> 00:57:14,920
what I want to do is swap the values I want x to be associated with two and y to be associated with one

493
00:57:14,920 --> 00:57:24,200
but only using commands like this right and so the code here is buggy that means it's wrong it has

494
00:57:24,199 --> 00:57:30,919
an error in it because well let's step through let's step through a little bit at a time y equals x

495
00:57:32,119 --> 00:57:44,039
what do I do when y equals x here yeah exactly why is going to move from two to one now what happens

496
00:57:44,039 --> 00:57:52,919
when I do x equals y yes x stays the same my first line y equals x lost the binding to two

497
00:57:53,720 --> 00:58:00,599
right and now it's almost up because I can't get it back so instead so if you didn't understand

498
00:58:00,599 --> 00:58:06,200
this you can click Python tutor and just kind of step through step by step on your own but how can

499
00:58:06,200 --> 00:58:14,920
we fix this create a third variable yeah that's a great idea yeah we can create a third variable so

500
00:58:14,920 --> 00:58:20,280
x is one y is one uh y is two so we can create a third variable what do you want to make the variable

501
00:58:20,280 --> 00:58:31,800
equal to x or y yeah either one um I made it y so let's do y um so here I've got a temporary

502
00:58:31,800 --> 00:58:43,320
variable called temp and I made it equal to two and now what can I do which one can I reassign now

503
00:58:43,320 --> 00:58:51,480
x equals y or y equals x exactly y equals if I do x equals y I lose my binding to one and I'm

504
00:58:52,440 --> 00:58:57,400
I messed up again so y equals x is okay to do so I'm going to lose the binding from y

505
00:58:58,519 --> 00:59:07,080
from two and bind it up to one and now what do I do yeah now I can safely reassign x to

506
00:59:07,079 --> 00:59:17,079
temp right so I can say x is equal to temp because temp points to two and I want to make x point to two as

507
00:59:17,079 --> 00:59:24,679
well so in terms of code so that's sort of the diagram but um you know we can write the code so you

508
00:59:24,679 --> 00:59:31,960
don't uh let's see um we don't write it in here but you know on on your own or uh you can write it

509
00:59:31,960 --> 00:59:39,159
in here if you like or we can do it together so x is equal oops x equals one y equals two right um

510
00:59:39,159 --> 00:59:46,440
and then we can have we had temp we wanted to assign it to whatever y was right so we say temp is equal to y

511
00:59:48,280 --> 00:59:53,480
and if you want to check the values of the variables you can just invoke the names right so x is one

512
00:59:53,480 --> 01:00:04,840
y is two and temp should be whatever y is two okay good so far so now I'm at the step

513
01:00:05,960 --> 01:00:11,400
here I think right I've just created this and then the last thing I need to do is lose the binding

514
01:00:12,039 --> 01:00:19,320
from x to whatever temp is right so I want to do this operation here which means I want to

515
01:00:19,320 --> 01:00:34,920
assign x to be equal to temp right so now x is two y is what what did I do yeah let's so this

516
01:00:34,920 --> 01:00:44,760
happens sometimes we can just start all over right so y equals temp or sorry sorry temp equals y

517
01:00:49,480 --> 01:01:02,920
y equals x y is one x is one and then x equals temp y is one x is two okay so it's okay if things go wrong

518
01:01:04,519 --> 01:01:09,800
they will go wrong we can just start all over in this particular case by redefining our variables

519
01:01:09,800 --> 01:01:14,200
and just trying it out all over again so that's kind of what the shell is for that's what I use

520
01:01:14,199 --> 01:01:19,000
it for that's what we're going to use it for in the future just to do quick things like this

521
01:01:20,039 --> 01:01:25,799
you know and also things like checking the types and and other commands we've done earlier

522
01:01:27,639 --> 01:01:33,719
okay so any questions before we do the summary was this all right pace or was it too fast or

523
01:01:34,359 --> 01:01:42,039
okay go okay good thumbs up is good so let's do a quick summary we saw that we can create

524
01:01:42,759 --> 01:01:48,759
programs by manipulating objects we created objects in python and we saw that objects have a

525
01:01:48,759 --> 01:01:54,759
particular type the type that the object has tells python the things that you can do with that object

526
01:01:55,559 --> 01:02:04,360
right we can combine objects in expressions and these expressions evaluate or boil down to one

527
01:02:04,360 --> 01:02:11,480
particular value objects or values can be stored in variables and these variables allow us to

528
01:02:11,480 --> 01:02:17,559
access these values with nicer names later on in our program and and then we're able to write

529
01:02:17,559 --> 01:02:23,960
meter more legible programs as well right so the equal sign I showed you a couple of differences

530
01:02:23,960 --> 01:02:30,519
between math and computer science the equal sign was one notable difference right the equal sign

531
01:02:30,519 --> 01:02:35,320
in math is declarative and the equal sign in computer science is an assignment you're basically

532
01:02:35,320 --> 01:02:41,800
saying this is associated with this right and we're not doing any sort of equality in computer science

533
01:02:44,360 --> 01:02:51,880
and yes computers do what you tell them to do that's kind of the big the big thing here right line by

534
01:02:51,880 --> 01:02:58,199
line it executes starting from the top goes line by line so far we haven't seen any places where we

535
01:02:58,679 --> 01:03:04,279
where the computer makes a decision but next lecture we will see how we can insert decision points

536
01:03:04,279 --> 01:03:11,159
in our programs for for the computer to you know either execute one set of code or another set of

537
01:03:11,159 --> 01:03:17,319
code right so that's the end of today's lecture thank you all for joining I will see you on Monday

538
01:03:28,199 --> 01:03:28,699
okay

539
01:03:35,739 --> 01:03:36,319
alright

540
01:03:42,779 --> 01:03:43,819
okay

