---
title: MIT6100 P7P07DecompositionAbstractionandFunctions
---

1
00:00:00,000 --> 00:00:17,920
Okay. So last lecture, we started talking about the idea of decomposition and abstraction,

2
00:00:17,920 --> 00:00:21,679
and we talked a little bit about what that means and how it ties into what we've already

3
00:00:21,679 --> 00:00:27,000
been doing. Today, we're going to do a real-world example of decomposition and abstraction, and

4
00:00:27,000 --> 00:00:32,520
then we'll see exactly how we can achieve this in programming. So let's start by talking

5
00:00:32,520 --> 00:00:41,079
about an example in the real world, the smartphone. So a lot of us have it, but for a lot of us,

6
00:00:41,079 --> 00:00:46,120
it's really just a black box, right? For me, I know it is. For most of the people in the

7
00:00:46,120 --> 00:00:52,560
world, the phone is a black box. We basically view the phone in terms of its inputs and in

8
00:00:52,560 --> 00:00:59,280
terms of its outputs, right? So the phone has some buttons, you can scroll, you can touch things,

9
00:01:00,000 --> 00:01:05,200
but we don't really know exactly how all of these buttons and scrolling and all these internal

10
00:01:05,200 --> 00:01:10,960
workings actually do their job. And in fact, we don't need to know how they do their job, right?

11
00:01:10,960 --> 00:01:17,359
To us as the user, all we really care about is the interface between us and what task we want to achieve.

12
00:01:17,840 --> 00:01:24,400
Okay? So what we need to know, that interface is basically the relationship between the input we

13
00:01:24,400 --> 00:01:31,359
give to the phone and the output we get. So when we push that button, the phone turns off. When

14
00:01:31,359 --> 00:01:38,400
we push this other button, the volume increases. Okay? And so that's the idea of abstraction, right?

15
00:01:38,400 --> 00:01:44,960
The phone is basically abstracted away all of those hardware details, all of those implementations

16
00:01:44,959 --> 00:01:50,239
that make it actually work for the user, right? So the user doesn't need to know how it works in

17
00:01:50,239 --> 00:01:58,239
order to use it. Now, abstraction actually enables decomposition. What does that mean? Well, once we

18
00:01:58,239 --> 00:02:07,039
abstract away details, we can have different manufacturers working on different components of the

19
00:02:07,039 --> 00:02:13,519
phone to build these different components. And if different manufacturers are working to build

20
00:02:13,520 --> 00:02:19,360
these hundreds of distinct parts within the phone separately, they need to have some way to put

21
00:02:19,360 --> 00:02:25,200
these parts back together. And when they're working on their on their pieces separately, that's the

22
00:02:25,200 --> 00:02:31,680
idea of decomposition. How do they know that what they're working on will actually fit in with the

23
00:02:31,680 --> 00:02:36,800
rest of the components? Well, they use the idea of decomposition. They're basically following a

24
00:02:36,800 --> 00:02:43,439
specification. They're following a set of inputs that may become into their component, and a set

25
00:02:43,439 --> 00:02:50,400
of outputs that maybe their component needs to give to other components. And all these different

26
00:02:50,400 --> 00:02:56,240
manufacturers that are building these different parts need to know is that interface bit. They

27
00:02:56,240 --> 00:03:01,680
don't need to know how other manufacturers build their components. All they need to know is what

28
00:03:01,680 --> 00:03:07,680
functionality those other components have. And so all of these different manufacturers can build

29
00:03:07,680 --> 00:03:12,560
all these different components. The interfaces are going to be sort of standardized, so to speak.

30
00:03:13,280 --> 00:03:19,520
And that's all that they care about. So once you know the interface, you can come together and

31
00:03:19,520 --> 00:03:24,960
put all these different components together to work towards a common goal as in to make a phone work.

32
00:03:26,480 --> 00:03:30,800
So this is true for hardware, as in the phone example, but it's also true for software. And that's

33
00:03:30,800 --> 00:03:36,560
exactly what we will be doing in this in this lecture on functions. We're going to achieve decomposition

34
00:03:36,560 --> 00:03:45,920
and abstraction in programming. So treating code as a black box and making a large program kind of

35
00:03:45,920 --> 00:03:52,960
splitting it up into these different self-contained parts. Okay, so in programming, we want to suppress

36
00:03:52,960 --> 00:03:58,400
details as well, right? Not just in hardware, like with the phone, we want to suppress details in

37
00:03:58,400 --> 00:04:06,719
programming as well. And we do this using this idea of abstraction. So we will be writing code,

38
00:04:06,719 --> 00:04:15,200
as we have already been doing, with the thought that the code we're writing will be written only once.

39
00:04:15,200 --> 00:04:20,560
We will have some functional piece of code that will do a very useful task. And then after we've

40
00:04:20,560 --> 00:04:25,120
written that code and debugged it and made sure it works well, we'll treat that code as a black box.

41
00:04:25,840 --> 00:04:30,720
So from there on out, as long as we know what inputs that piece of code needs and what outputs that

42
00:04:30,720 --> 00:04:36,079
piece of code gives back to somebody else or to us, we don't care exactly how it does it. We just

43
00:04:36,079 --> 00:04:42,800
care that it is there and it is available for use. Okay, so today's lecture, we're going to be seeing how

44
00:04:42,800 --> 00:04:48,879
we can actually create these little functional pieces of code. We can then give these pieces of code

45
00:04:48,879 --> 00:04:53,920
to ourselves. We can definitely use these functional pieces of code that we're written, or we can give

46
00:04:53,920 --> 00:05:01,280
them to other people so that they can use them as well. Okay, so we're going to write these functional

47
00:05:01,280 --> 00:05:10,400
pieces of code and we'll call them functions or procedures. And in fact, we've already been using

48
00:05:10,400 --> 00:05:17,680
functions, believe it or not. These three are examples of functions we've already been using in Python.

49
00:05:18,400 --> 00:05:24,800
So max is a function, so it's some useful piece of code that when we use it in this particular way,

50
00:05:25,600 --> 00:05:31,600
it says it's taking in two inputs and it gives me back the biggest of those two inputs.

51
00:05:32,720 --> 00:05:39,600
The middle one, ABS is the absolute value function and its input is one number, an integer,

52
00:05:40,240 --> 00:05:48,400
and it gives back to me the absolute value of that number. And LAN is also a really useful one that we've

53
00:05:48,400 --> 00:05:55,840
been using with strings and basically its input is a string and its output is going to be how many

54
00:05:55,840 --> 00:06:00,879
characters are in the string. Right, so we've already been using functions. The point of today's

55
00:06:00,879 --> 00:06:07,360
lecture is you're going to start to write your own functions, hopefully useful ones.

56
00:06:09,360 --> 00:06:15,279
Okay, so the idea of a function is that we want to abstract away exactly how that function

57
00:06:15,279 --> 00:06:21,600
achieves something useful, right, some useful task. And so the way that we're going to tell other

58
00:06:21,600 --> 00:06:27,680
people how to use our function is using this idea of abstraction and we capture what the function

59
00:06:27,680 --> 00:06:34,240
does with these things called specifications. They're also called doc strings and the doc string

60
00:06:34,240 --> 00:06:39,280
is kind of like a contract between somebody who creates this useful function and somebody who wants

61
00:06:39,280 --> 00:06:44,240
to use the function. The person who uses the function might be you, the person who wrote it,

62
00:06:44,240 --> 00:06:49,759
or it might be somebody else. And in the contract, the things that we're going to mention are what are

63
00:06:49,839 --> 00:06:57,759
the inputs to the function. So in the length function, it needs a string. What is the function doing?

64
00:06:58,319 --> 00:07:04,159
And what is the output of the function? What is the function give back to somebody who uses this

65
00:07:04,159 --> 00:07:11,599
function? And we haven't actually done this explicitly but you've probably seen this as you type

66
00:07:11,599 --> 00:07:17,759
your code in. So here's an example of the absolute value function and it comes up with this little

67
00:07:17,759 --> 00:07:24,159
pop-up here whenever you type it in. So for example, ABS parenthesis, right here or if you hover

68
00:07:24,159 --> 00:07:30,000
over a function in your file editor, you'll see it pop up this little text box that says the

69
00:07:30,000 --> 00:07:35,439
specification or the doc string. And here you see exactly sort of the signature of the function.

70
00:07:35,439 --> 00:07:41,199
So it takes in one input, the x, the value you want to find the absolute value of, and then some

71
00:07:41,199 --> 00:07:47,039
text here which is what the function does. So the specification of the doc string is literally

72
00:07:47,040 --> 00:07:52,800
just a multi-line comment. There's nothing special about it. As long as you kind of hit those points,

73
00:07:52,800 --> 00:07:58,720
the inputs, what the function does, and what the function gives back to you, you've written a good

74
00:07:58,720 --> 00:08:07,840
specification. Okay. So I should mention that these contracts, even though I call them contract,

75
00:08:07,840 --> 00:08:14,160
they're not actually enforced by Python. So it's really just up to the person who writes the code to

76
00:08:14,160 --> 00:08:20,960
make sure that their specification is really detailed and your function does what you say you will.

77
00:08:20,960 --> 00:08:25,120
Right. So if your function can take in both positive and negative integers, for example,

78
00:08:25,120 --> 00:08:30,000
then you better make sure that the function itself doing whatever task it needs to do can handle

79
00:08:30,000 --> 00:08:37,680
both positive and negative integers. So once we write these functions, we now have these little

80
00:08:37,680 --> 00:08:43,840
bits of code that perform some useful task. Right. Given some input, it'll perform this task and

81
00:08:43,840 --> 00:08:50,720
give me back some output. And now that we have these different little pieces of functionality,

82
00:08:50,720 --> 00:08:58,480
we can go ahead and take this large file of code, which you might write from now on and kind of see

83
00:08:58,480 --> 00:09:04,240
exactly which pieces of code maybe are getting repeated. That's a clue that that's something that you

84
00:09:04,240 --> 00:09:10,320
can kind of abstract away into a little module, aka a function. And then you can just use these

85
00:09:10,320 --> 00:09:16,320
functions to break up the code, a very large piece of code into smaller little self-contained modules.

86
00:09:16,320 --> 00:09:20,960
And then maybe the bulk of the work that the code is doing is just saying, hey,

87
00:09:22,720 --> 00:09:27,120
this module, please give me this answer. And then this module gives me this answer. And then

88
00:09:27,120 --> 00:09:33,920
putting those values back together again. So these reusable pieces of code are called functions or

89
00:09:33,919 --> 00:09:40,639
procedures. We're basically going to try to capture some sort of computation, a very useful task

90
00:09:40,639 --> 00:09:47,599
that you'd want to do over and over again. And we're going to see some details about how to write

91
00:09:47,599 --> 00:09:53,360
functions, but essentially it's just going to be code that you've already been writing, just written

92
00:09:53,360 --> 00:10:01,199
in a special way that makes it reusable. So we're going to have to kind of switch the way we've

93
00:10:01,200 --> 00:10:05,360
been thinking about code for a bit. Now that we're introducing functions, because right now when we've

94
00:10:05,360 --> 00:10:12,000
been writing functions in a file, we basically write some code top to bottom. And then we think about

95
00:10:12,000 --> 00:10:19,360
that code as being executed line by line top to bottom. But now that we're creating these things

96
00:10:19,360 --> 00:10:24,720
called functions, little blocks of code that we can use many times in many different places in our

97
00:10:24,720 --> 00:10:29,920
code, we're actually going to introduce the idea of defining a function. So that means we're going

98
00:10:29,919 --> 00:10:36,559
to write a piece of code. And all that piece of code is going to do is tell Python that this is a

99
00:10:36,559 --> 00:10:45,039
modular function that exists in my program. All we're doing is defining the function. But we're not

100
00:10:45,039 --> 00:10:50,079
actually going to run the function when we define it. Okay, and that's kind of the difference that the

101
00:10:50,079 --> 00:10:55,120
way that we're going to have to shift our thinking here. So when you define a function, you just

102
00:10:55,120 --> 00:11:01,039
tell Python that here is some useful piece of code that exists that does something. But it doesn't

103
00:11:01,039 --> 00:11:07,360
actually run until you call the function. And the cool thing about writing a function is once you

104
00:11:07,360 --> 00:11:13,759
wrote it once, you can make a hundred different function calls to that one piece of code that you wrote

105
00:11:13,759 --> 00:11:18,960
later on in your program. So you can call the function many times with different inputs to give you

106
00:11:18,960 --> 00:11:24,560
different outputs, but you only had to write it one time. So I would compare this to when we write

107
00:11:24,559 --> 00:11:31,279
code in a file. When we write code in a file, yes, we can write a whole bunch of lines, but this code

108
00:11:31,279 --> 00:11:37,919
isn't running as we're writing it. We have to actually push the run button to run that file.

109
00:11:38,719 --> 00:11:42,719
So similarly, when we're telling Python that I'm going to create this function that does something

110
00:11:42,719 --> 00:11:50,000
useful, it's not actually running those lines. We have to tell Python that we want to run this function.

111
00:11:50,240 --> 00:11:57,279
So the first thing we're going to do in this lecture is just actually create a function. I'm going to

112
00:11:57,279 --> 00:12:02,159
show you how to define a function. So tell Python that this function exists, and then we'll see how to

113
00:12:02,159 --> 00:12:08,320
actually run the function to give us some useful values. So the function characteristics are going to

114
00:12:08,320 --> 00:12:14,639
be, the function has to have a name. So just like when you create variables, that store some

115
00:12:14,639 --> 00:12:19,919
useful value like pi to 20 decimal digits that you want to reuse over and over again. We're going

116
00:12:19,919 --> 00:12:26,240
to create a function, and that name is kind of like a handle for us to refer to this large chunk of

117
00:12:26,240 --> 00:12:33,120
code that does something useful for us. A function has some inputs called parameters or arguments. It

118
00:12:33,120 --> 00:12:39,759
could have no inputs or more or one or more. And a function should have a doc string. So this is

119
00:12:39,759 --> 00:12:45,439
the specification. Again, just a multi-line comment that tells the user, the person who wants to use

120
00:12:45,439 --> 00:12:50,480
this function, the inputs, what the function does, and what the output or the return or whatever this

121
00:12:50,480 --> 00:12:58,159
function will do for you. And then the body of the function is just Python code, exactly the kind of

122
00:12:58,159 --> 00:13:03,039
code we've already been writing, except not wrapped in a function. So if you found yourself writing a

123
00:13:03,039 --> 00:13:08,559
piece of code that did something useful, you can totally wrap that in a function, and we'll see how

124
00:13:08,559 --> 00:13:14,479
to do that today. So the body of the function is just a bunch of lines of code that do this useful task.

125
00:13:15,039 --> 00:13:20,479
The only difference in the body is that at some point this function has to end. It has finished

126
00:13:20,479 --> 00:13:26,959
its task. It figured out a final value, this useful thing that's kind of the result of your task.

127
00:13:26,959 --> 00:13:33,279
And you want to give this value back to somebody who's using this function. And we do that using

128
00:13:33,279 --> 00:13:39,600
this return keyword, as we're going to see in the next slide. So here's an example of a really simple

129
00:13:39,600 --> 00:13:47,679
function. So it's just a definition. So again, these lines of code do not run. Here we're just

130
00:13:47,679 --> 00:13:54,639
telling Python that we're creating a function that does something. So we kick that off with a df

131
00:13:54,639 --> 00:13:58,959
defined keyword. So notice it's blue. If you type it in your code, you'll notice it changes color.

132
00:13:58,960 --> 00:14:05,759
So df tells Python we're defining a function. The next is the name of the function. So this should be

133
00:14:05,759 --> 00:14:10,800
something descriptive, usually an action word, right? Because a function does something. So you want kind of

134
00:14:10,800 --> 00:14:19,840
like an action type name for your function. Then we have parentheses. And inside the parentheses,

135
00:14:19,840 --> 00:14:25,280
you have any of the inputs, the parameters, the arguments to the function. Right? So what should the

136
00:14:25,279 --> 00:14:31,439
user give you as input to this function? And then of course, the colon. So in that line right there,

137
00:14:32,639 --> 00:14:37,679
the only thing that is sort of customizable, quote unquote, is the name of the function and the

138
00:14:37,679 --> 00:14:42,240
parameters. If there's zero parameters, you put nothing in there. If there's more than one, you

139
00:14:42,240 --> 00:14:49,759
separate them by commas. Everything else should be standard, the df, the parentheses, and the colon at

140
00:14:49,759 --> 00:14:56,799
the end. Since we have a colon at the end, then we, that means we have to indent the next bit of code.

141
00:14:58,000 --> 00:15:03,200
That the indentation will tell Python that the rest of this is part of the function. So everything

142
00:15:03,200 --> 00:15:09,439
from here on out is part of the function definition. So we have our doc string, of course. You start with

143
00:15:09,439 --> 00:15:14,080
triple quotes and you end it with triple quotes. And in it, you can write whatever you want. Just treat

144
00:15:14,080 --> 00:15:21,120
it like a comment that's on multiple lines. And you can see here, I've said that this function takes

145
00:15:21,120 --> 00:15:29,280
an input i, which I restrict to be a positive integer. And then I say what the input gives back to the

146
00:15:29,280 --> 00:15:36,800
user. So it will return true if i is an even number and it will turn false otherwise. So I've hit all

147
00:15:36,800 --> 00:15:42,160
the points. The inputs, what the function does, and what it gives back to whoever wants this function

148
00:15:42,159 --> 00:15:51,679
to run. Beyond that, we have the body of the function. So here, you notice, it's just lines of code that

149
00:15:51,679 --> 00:15:57,759
you would have written otherwise, right? If you were given the problem on a quiz that said given i,

150
00:15:57,759 --> 00:16:05,120
defined for you, write some code that prints true if the number is even in false if the number is

151
00:16:05,120 --> 00:16:10,480
odd. This is basically lines of code that you would type in. The only difference is this little return

152
00:16:11,120 --> 00:16:20,879
here. The function is sort of some lines of code that do a task. And that task, when it finishes,

153
00:16:20,879 --> 00:16:28,879
has to give something back. It can't just sit there, I guess. And the thing that it gives back to

154
00:16:28,879 --> 00:16:40,159
whoever wants this function to run is set up by this return statement here. So if the number is

155
00:16:40,159 --> 00:16:45,439
divisible by zero, we return true and else we return false. So one of these, either true or false

156
00:16:45,439 --> 00:16:50,240
values, will be returned by the function. So this is kind of you can think of it like the output

157
00:16:50,240 --> 00:17:00,240
of the function. Okay. Okay. Questions so far? Does this make sense? Again, this is just us

158
00:17:00,240 --> 00:17:06,240
creating this function inside the computer inside Python. We're not actually running these lines of

159
00:17:06,240 --> 00:17:16,880
code yet. Okay. So if you are given sort of a larger problem, I just want to take a couple slides

160
00:17:16,880 --> 00:17:23,279
to talk about how you think about writing the function. This was a really easy one. So, you know,

161
00:17:23,279 --> 00:17:29,599
obviously it's not that hard to write. But sort of what is the thought process if you were given

162
00:17:29,599 --> 00:17:34,640
a larger problem like in English or something like that and you wanted to translate this into

163
00:17:35,360 --> 00:17:41,520
a piece of code that does something functionally interesting. Okay. So you think about what the problem is.

164
00:17:41,520 --> 00:17:48,880
So our problem is given an integer figure out if it's even or odd. Okay. So given this statement,

165
00:17:48,880 --> 00:17:55,520
you could you could come up with the name of this piece of code that's functionally interesting.

166
00:17:55,520 --> 00:18:03,200
So is underscore even is a good name. And give and and we can also come up with the inputs

167
00:18:03,279 --> 00:18:08,640
for this function. Right. So I we are only given one number. So there's no need for this function to

168
00:18:08,640 --> 00:18:14,480
take in any other inputs. And then using that description, we can now start to fill in the

169
00:18:14,480 --> 00:18:19,920
dox string that says well, our input is going to be a positive integer. Right. We could use sort of

170
00:18:19,920 --> 00:18:24,480
math to figure out restrictions on the inputs. And then we can write the dot the rest of the dox

171
00:18:24,480 --> 00:18:31,440
string that tells us what to return and what. Right. What the function is doing. And once you have

172
00:18:31,440 --> 00:18:37,840
that, you can just solve the problem. So for us, we solve the problem by basically saying if

173
00:18:37,840 --> 00:18:43,039
the remainder when we divide i by 2 is zero, we return true. And otherwise we return false. Okay.

174
00:18:43,680 --> 00:18:48,799
So that's some that's code that you could have already written, right, without actually this

175
00:18:48,799 --> 00:18:54,000
function lecture. But now we're putting it in the context of a function definition. So we're going

176
00:18:54,000 --> 00:18:58,960
to be able to run this function with many different inputs to give us a bunch of different outputs,

177
00:18:58,960 --> 00:19:07,519
whether a bunch of these different numbers are, um, are even or not. Okay. So when we're writing the

178
00:19:07,519 --> 00:19:12,000
body of the code, the only difference is from what you've been doing is the return statement, right.

179
00:19:12,000 --> 00:19:18,240
Instead of printing something out to the console, we're going to return a value to somebody who wants

180
00:19:19,360 --> 00:19:25,120
to know whether the number i is even or odd. The function can also print stuff to the console,

181
00:19:25,119 --> 00:19:31,599
but the key thing here is you want to return a value to the user. And after you wrote code,

182
00:19:32,000 --> 00:19:36,239
you know, right off the bat and you tested and made sure it works, you can, uh, improve the code

183
00:19:36,239 --> 00:19:45,519
a little bit. So here we're improving it by noticing that i percent 2 equal equals zero here is actually

184
00:19:45,519 --> 00:19:53,199
already a Boolean, right. If i is even, 3 percent 2 equal equals zero is true. And otherwise it's

185
00:19:53,200 --> 00:19:59,279
already false. So this line, uh, these four lines of code basically say if true return true,

186
00:19:59,920 --> 00:20:07,759
else return false. So our improvement can just be to return whether i percent 2 equal equals zero

187
00:20:07,759 --> 00:20:15,039
right off the bat. Okay. So here we're going to return either true or return false based on what i is.

188
00:20:15,920 --> 00:20:23,759
So at this point, again, sorry, I'm stressing this enough, too much, but it's really important to

189
00:20:23,759 --> 00:20:29,200
understand that once we write these lines of code in the context of a function definition,

190
00:20:29,759 --> 00:20:39,519
these lines of code do not run. They basically just sit in Python saying that there are these lines

191
00:20:39,519 --> 00:20:45,680
of code that correspond to some function object whose name is is even. That's it.

192
00:20:47,599 --> 00:20:52,240
So what we need to do now is to actually tell Python to run these lines of code.

193
00:20:53,599 --> 00:20:58,960
To do that, we make a function call. And again, we've already been doing function calls just to

194
00:20:58,960 --> 00:21:05,599
functions that already exist in Python, right, just Python itself, max, absolute, lenn, all that stuff.

195
00:21:06,240 --> 00:21:12,319
But now we're making a function call to something that we wrote, right, this nice piece of code

196
00:21:12,319 --> 00:21:19,759
that tells us if a number the input is even or not. So here I've got an, uh, I'm going to invoke

197
00:21:20,480 --> 00:21:26,000
the name of my function. So I'm, okay, I'm going to call the name of my function. I'm basically just

198
00:21:26,000 --> 00:21:31,439
typing in the name of my function in the code, parentheses, and then the inputs the function expects.

199
00:21:31,519 --> 00:21:37,360
There's only one, right, the number I want to figure out if it's even or odd. And then that's it,

200
00:21:37,360 --> 00:21:42,559
right. So I've got the name of my function and then all the input, the parameters that this function

201
00:21:42,559 --> 00:21:51,440
expects. At this point, Python goes into the function body, it runs the function, and it returns

202
00:21:51,440 --> 00:21:58,960
back a value. So whatever the value is associated with the return is, that value will immediately

203
00:21:58,960 --> 00:22:06,319
be given back to whoever called it. What does that mean? Well, that return value will completely

204
00:22:06,319 --> 00:22:16,880
replace this function call. Okay. So let's think back to expressions. Do you remember when we were

205
00:22:16,880 --> 00:22:22,160
learning about Python expressions? And I said you have something like object operator object, like

206
00:22:22,160 --> 00:22:27,920
three plus two. That was an expression. And Python went in, evaluated that expression, and replaced

207
00:22:27,920 --> 00:22:35,440
that entire expression by the value. Five. This is exactly the same thing. In fact, functions are

208
00:22:35,440 --> 00:22:41,519
kind of like Python expressions. They do something useful, right? It's just that it's not math or

209
00:22:41,519 --> 00:22:45,840
something like that that gets evaluated. It's a bunch of lines of code that get evaluated.

210
00:22:46,880 --> 00:22:56,240
But in the end, that function returns back only one value. Okay. And that value replaces the entire

211
00:22:56,240 --> 00:23:02,400
function call. So this entire function call is going to be basically replaced by false, right?

212
00:23:02,400 --> 00:23:09,440
Because it's an odd number. And the next one is going to be replaced by true, right? The return from

213
00:23:09,440 --> 00:23:17,759
the function. So the way that the code looks, just this definition of is even, and then running a

214
00:23:17,759 --> 00:23:23,839
function call is this. This is all that we would have in our in our file, right? So here we have our

215
00:23:23,839 --> 00:23:29,599
function definition. And then at the same indentation level, we have a function call, right? Because it's

216
00:23:29,599 --> 00:23:34,559
not the call is not part of the function. The call is just making use of the function that we wrote.

217
00:23:36,480 --> 00:23:40,559
So what exactly happens? We'll do a little bit of step by step now going a little bit into more

218
00:23:40,559 --> 00:23:47,439
detail as to what exactly happens when we make the function call. So when we make the function call,

219
00:23:47,439 --> 00:23:53,679
so again, function definition, this just tells Python we have this function that does something

220
00:23:53,680 --> 00:24:02,480
in our program. And then here we have the function call. When as soon as Python sees the function call,

221
00:24:02,480 --> 00:24:07,600
that's when it starts doing something useful. Up here, it just sort of stores this in memory.

222
00:24:08,400 --> 00:24:13,920
So as soon as it sees the function call is even three, it looks at the input parameter to the

223
00:24:13,920 --> 00:24:21,600
function call. And here you see we have a value, right? It's an actual tangible object. It's not

224
00:24:21,599 --> 00:24:29,039
a some random variable. It's not something abstract. It's a number three. The i up here from our

225
00:24:29,039 --> 00:24:34,480
function definition is called a formal parameter. It's abstract, right? We wrote the body of the

226
00:24:34,480 --> 00:24:39,919
function assuming the user will eventually give us a value for i. But in the actual body of the

227
00:24:39,919 --> 00:24:45,599
function, i is just a variable we're using, kind of like in the quizzes, right? For now, I've been,

228
00:24:45,599 --> 00:24:50,799
I've been saying, you know, assume you're given some number n that's defined for you, write the code

229
00:24:50,799 --> 00:24:55,279
assuming you know this number. It's the exact same thing. We write the code of the body of the

230
00:24:55,279 --> 00:25:02,480
function assuming we know a value for i. So when Python sees this function call with three,

231
00:25:02,480 --> 00:25:07,519
it goes into the body of the function and says, all right, what are my parameters? There's only one,

232
00:25:07,519 --> 00:25:13,919
it's i. And it's going to map them one by one to all the actual parameters given in the function

233
00:25:13,920 --> 00:25:20,640
call. So basically just maps i to three. And then it executes the body of the function. So

234
00:25:20,640 --> 00:25:25,920
replaces everywhere you see i. So it might have a longer bit of code here, but here we just have

235
00:25:25,920 --> 00:25:34,320
one line. It replaces i with three. So we have 3% to equal equals zero. Now we have a tangible value,

236
00:25:34,320 --> 00:25:42,800
right? False. So this expression is replaced with false. And so this line of code here will return

237
00:25:42,799 --> 00:25:49,279
false. And as soon as Python sees that return value, it immediately exits the function and gives

238
00:25:49,279 --> 00:25:56,319
back the value that you're returning to whoever called it. So this entire function call here will

239
00:25:56,319 --> 00:26:08,319
be replaced by false. Okay, that was very step by step, but does it make sense? Okay, so this is

240
00:26:08,319 --> 00:26:14,079
a program that doesn't do anything, right? If somebody were to write this program and run it,

241
00:26:14,079 --> 00:26:21,279
it doesn't actually show anything to the user. That's because in our program, it's like we had just

242
00:26:21,279 --> 00:26:29,279
written a line of code that said false. Does I get printed to the output? No, right? What we need to do

243
00:26:29,279 --> 00:26:36,799
is do something useful now that we have the result of a function call. So one useful thing we can do

244
00:26:36,799 --> 00:26:44,079
is to actually print the result of the function call. Right? So here we have print. And then I have my

245
00:26:44,079 --> 00:26:49,519
function call I had up here. I'm just sticking it inside the print statement. And Python will,

246
00:26:49,519 --> 00:26:55,200
as before, evaluate is even three. This is replaced with false. And this line essentially becomes print

247
00:26:55,200 --> 00:27:08,799
false. And so the way this looks in our actual code is this, right? So here I have this is even function,

248
00:27:08,799 --> 00:27:15,600
the inefficient way of writing it. I've got two function calls here, but if I run the code, it

249
00:27:15,600 --> 00:27:21,519
doesn't print anything, right? I need to do something useful with them and one useful thing we can do

250
00:27:21,519 --> 00:27:26,079
is to print the result of these function calls. So now that I've wrapped these calls inside a print

251
00:27:26,079 --> 00:27:35,359
statement, I see the output in my console. Okay, so we're writing, so we're kind of separating ourselves,

252
00:27:35,359 --> 00:27:40,319
right, when we're writing code now. One, we're defining a function, some code that does something

253
00:27:40,319 --> 00:27:48,720
useful. And then two, we're using this function that we wrote to make function calls. And the beauty

254
00:27:48,720 --> 00:27:54,559
about writing the function is we only write it once and debug it once, but now we can run it as many

255
00:27:54,559 --> 00:28:00,960
times as we'd like. Without functions, we'd find ourselves copying and pasting, right, that piece of

256
00:28:00,960 --> 00:28:05,920
code that does something useful in many places in our code, which could lead to errors. The code is

257
00:28:05,920 --> 00:28:14,319
hard to modify. It's hard to debug. You might, oh, that's tough. Okay, I'll give you a chance to try

258
00:28:14,319 --> 00:28:18,960
this out for about a minute. So let's have you write this code. So here I'm giving you the function

259
00:28:18,960 --> 00:28:23,919
specification. Most of the time I'll give it to you even in quizzes. I want you to write for me a

260
00:28:23,919 --> 00:28:32,639
function called div underscore by. This one takes in two parameters. Both integers greater than zero

261
00:28:32,639 --> 00:28:40,720
and d. And this function will return true if d divides n evenly and false if it does not divide

262
00:28:41,440 --> 00:28:48,720
and evenly. So if you test it out with those two values, the first one should give us false and

263
00:28:48,720 --> 00:28:55,839
the second one should give us true. So as usual, this is down in the Python file. So we have

264
00:28:55,839 --> 00:29:04,799
around line 28 is where you should start typing in your code. Does anyone have a start for me?

265
00:29:04,799 --> 00:29:15,919
It should be very similar to what we just, yeah. E percent and like doubly blue zero then create true.

266
00:29:15,920 --> 00:29:39,039
Else print false. Okay. So let's run the function. Let's just do it with one. So the first one I'm

267
00:29:39,039 --> 00:29:49,039
expecting to print false. It does print false but it also prints this weird none right after it.

268
00:29:49,039 --> 00:29:55,519
Actually this is something we're going to talk about next lecture. But does anyone know an improvement we

269
00:29:55,519 --> 00:30:06,159
can make to the code? Yes. Yes, actually. You're right. So instead of printing true, right? Remember it's a

270
00:30:06,160 --> 00:30:13,840
function. We want it to give us back the value true, right? So instead of printing, we'll do a return

271
00:30:14,480 --> 00:30:20,320
true and we don't need the parentheses in this case. And then we'll do a return false.

272
00:30:27,759 --> 00:30:32,400
Right. So now we don't have that weird none right after it. That's something I want. I was going

273
00:30:32,400 --> 00:30:40,640
to talk about next lecture. But basically when we had prints here, what did the function return? Did it have

274
00:30:40,640 --> 00:30:48,400
any return statement inside it? No, right? And so if there's no return statement inside the function, Python

275
00:30:48,400 --> 00:30:54,000
automatically returns this special none. Okay. This is something we'll talk about next lecture more in detail.

276
00:30:54,000 --> 00:30:58,480
But yeah, the return true return false is correct here. Yes.

277
00:30:58,480 --> 00:31:00,880
Did you see the difference in else?

278
00:31:00,880 --> 00:31:13,200
Yes. You don't need the return the if else just like before so we can just do return this directly, right?

279
00:31:15,680 --> 00:31:17,200
And we can run it with the other one.

280
00:31:17,200 --> 00:31:27,759
So the second one should actually return true. But it returned false. Does anyone know the problem? Yeah.

281
00:31:27,759 --> 00:31:43,200
Yes, exactly. So actually we want the remainder when we divide n by d, right? So this is just flipped around and percent d equals zero. Yeah.

282
00:31:43,200 --> 00:31:53,759
So it's a good thing we had two test cases to test for that and you don't have to test them with such big numbers. You could obviously test them with some smaller numbers as well.

283
00:31:53,759 --> 00:31:59,200
So let's zoom out a little bit and talk about how exactly functions are stored in memory, right?

284
00:31:59,200 --> 00:32:12,160
Because I mentioned this thing about defining a function and that just doesn't do anything really that we can see. But what exactly happens in memory? Well, let's think about what happens when we create variables.

285
00:32:12,160 --> 00:32:21,519
So when we create a is equal to three inside memory or the program scope or again we'll talk about this next lecture.

286
00:32:21,519 --> 00:32:27,120
But you can think of this as the memory. What happens is a is becomes a variable that's bound to value three.

287
00:32:27,120 --> 00:32:32,560
B equals four is a variable B bound to value four and C is going to be bound to value seven.

288
00:32:32,560 --> 00:32:35,600
Clear, right? We already know this.

289
00:32:35,679 --> 00:32:41,599
What happens when we create a function? So again, this is something I might write in a code file.

290
00:32:41,599 --> 00:32:58,000
The top bit is my function definition. So as soon as Python sees this df keyword, everything that's indented, that's part of the function definition and the body is essentially just some code, right?

291
00:32:58,000 --> 00:33:04,720
To Python, it does not care at this point what that code is or what that code does.

292
00:33:04,720 --> 00:33:11,119
All it knows is that there is a function object and functions are actually objects in Python.

293
00:33:11,119 --> 00:33:21,039
There is a function object whose name is is even. That is all it knows when we get to this point here in the code right after we define a function, right?

294
00:33:21,039 --> 00:33:36,639
Before equals. So we think about the function as kind of like a variable, quote unquote, it's not actually variable, but it's like a variable whose name is is even and it points to its bound to some code in memory.

295
00:33:36,639 --> 00:33:40,399
And we don't care what that code is right now because we might never use it.

296
00:33:40,399 --> 00:33:44,480
We only care what the code is when we make function calls.

297
00:33:44,559 --> 00:33:53,200
So down here is where the action actually happens when we make our function calls. I have a is going to be as usual a variable, right?

298
00:33:54,240 --> 00:33:56,240
That's going to be bound to some value.

299
00:33:58,559 --> 00:34:02,079
So the function definition is kind of just like a black box, right?

300
00:34:02,319 --> 00:34:08,559
Once you wrote it once and you know it works, you don't care anymore how it actually achieves its task.

301
00:34:08,559 --> 00:34:15,199
All you care is that it takes in a number and tells you whether that number is even or odd via true false.

302
00:34:16,719 --> 00:34:21,039
So down here where we make our function calls, we're just using our black box.

303
00:34:22,880 --> 00:34:31,599
And we're using the black box by making function calls. So a is going to be a variable that's bound to the value returned by is even.

304
00:34:32,400 --> 00:34:35,679
So it's going to be based on the function call false.

305
00:34:36,960 --> 00:34:41,679
And then here I have another function call. I'm using this useful piece of code that I wrote up here.

306
00:34:42,319 --> 00:34:49,679
And B is going to be a variable that's bound to true and C is going to be a variable that's bound to true, right?

307
00:34:52,239 --> 00:34:58,719
Does that make sense? It's kind of separating the code we write, which doesn't run until we actually make function calls.

308
00:34:59,519 --> 00:35:05,519
That's the thing about functions and that's how it helps us write more robust code.

309
00:35:08,079 --> 00:35:14,480
So now here we can have a more complex piece of code where we're using the function that we wrote.

310
00:35:15,599 --> 00:35:23,279
Not just making a function call and printing the result, but we're actually using it inside a more interesting program.

311
00:35:23,360 --> 00:35:30,080
So here I've got a program that will print for me the numbers between one and ten and it'll print whether that number is odd or even.

312
00:35:30,960 --> 00:35:39,440
So if you were just to read this code, it's pretty easy to read, right? We have a loop that goes through the numbers one to ten, not including ten.

313
00:35:40,240 --> 00:35:42,560
And then I have this if is even.

314
00:35:45,040 --> 00:35:51,680
Well that's cool. Here I'm using the function that I wrote kind of just in the middle of another piece of code.

315
00:35:54,000 --> 00:36:01,600
Which is fine because as I said a few slides ago, function calls are basically just expressions.

316
00:36:02,560 --> 00:36:09,040
They get run, they get evaluated, you get one value back out of them, and then that value replaces the function call.

317
00:36:09,760 --> 00:36:16,800
So that's fine. Let's use the is even result, the return from the is even method inside a conditional.

318
00:36:17,519 --> 00:36:29,360
If I, if calling is even with I returns true, that means if the number is even, we print that value comma even else we print that value comma odd.

319
00:36:30,240 --> 00:36:37,280
So here I'm not defining a function. Notice it's not wrapped in the DF or anything like that. I'm just using a function that I already wrote.

320
00:36:38,320 --> 00:36:42,080
So inside here, just comment that out.

321
00:36:42,319 --> 00:36:48,799
This is the code we just had on the slide. So again, notice it's not with it. It's not wrapped within a function.

322
00:36:48,799 --> 00:36:56,000
It's just a loop that tells me the numbers one at a time whether they're odd or even, right? So prints one comma, yeah.

323
00:36:57,360 --> 00:36:59,759
What are you doing and you select the like everything that common?

324
00:36:59,759 --> 00:37:09,279
Oh, when I select everything, I just use spiders like ability to, so I do control one or command one probably on a Mac.

325
00:37:09,280 --> 00:37:12,320
And it just comments and uncomments things in batch.

326
00:37:13,200 --> 00:37:14,400
Yeah, very useful. Yeah.

327
00:37:16,000 --> 00:37:24,560
And so this code is now very easy to modify, right? I can just choose 100 and then I can run it again and it gives me the numbers one through 100 odd or even.

328
00:37:24,560 --> 00:37:27,760
And you can imagine using your is even function in a more complex setting.

329
00:37:29,280 --> 00:37:35,440
And is even is a really simple function to write, but again, you can imagine writing a more complex function.

330
00:37:35,440 --> 00:37:42,320
And then that complex function isn't a whole chunk of code that just gets stuck into this program, this loop.

331
00:37:42,320 --> 00:37:52,159
It's going to be a function that you call that you can just easily read the specification for and you don't need to completely understand how it works in order to use it.

332
00:37:56,960 --> 00:38:02,480
Okay. So we're going to go through one other example to write a little function.

333
00:38:03,280 --> 00:38:12,079
And this will also showcase kind of the best practices for writing a function and writing code, especially maybe in a quiz situation or something like that.

334
00:38:12,079 --> 00:38:16,400
How to write incremental code, how to test it a little bit at a time, and so on.

335
00:38:16,400 --> 00:38:24,159
So the last example I want to go through is I want to write some code that adds all the odd integers between and including a and b.

336
00:38:25,519 --> 00:38:27,280
Might be something you're asked on a quiz.

337
00:38:27,920 --> 00:38:36,160
What the first thing you do when you're faced with such a task is to think about a nice name for the function.

338
00:38:36,160 --> 00:38:39,360
So some odd or some odds is a reasonable name.

339
00:38:39,360 --> 00:38:42,080
The inputs to the function, well, I've got two endpoints.

340
00:38:42,080 --> 00:38:43,680
I want to sum odd numbers in between.

341
00:38:43,680 --> 00:38:46,560
So the inputs might well be my two endpoints.

342
00:38:47,519 --> 00:38:50,800
And then what is the thing you function achieves?

343
00:38:50,800 --> 00:38:53,040
Right? Well, in the end, it's going to give me some sum.

344
00:38:53,759 --> 00:38:59,679
So let's call that some a variable, some underscore of underscore odds, and we'll return it at the end of our function.

345
00:39:02,320 --> 00:39:04,480
And in between, we're going to have some code.

346
00:39:07,279 --> 00:39:13,279
So first thing to do is to not write code right away when you're faced with a task, again, on a quiz or something like that.

347
00:39:13,279 --> 00:39:21,840
It's best to take a piece of paper, write a little bit, one example, and try to think about how you'd solve it, not like a human would.

348
00:39:21,840 --> 00:39:25,039
Because for us, we would immediately know the sum.

349
00:39:25,039 --> 00:39:29,120
Right? It's very easy for humans to identify solutions to these problems.

350
00:39:29,120 --> 00:39:33,920
But try to think about how you would write, what kind of a recipe would work for this?

351
00:39:33,920 --> 00:39:36,400
Would you loop? Would you have a conditional?

352
00:39:36,400 --> 00:39:38,079
Would you use a for loop or a while loop?

353
00:39:38,079 --> 00:39:43,519
And a bunch of other concepts that we'll learn about in the following lectures.

354
00:39:43,519 --> 00:39:46,160
But the key thing is to just not write code right away.

355
00:39:46,960 --> 00:39:53,839
So if we start with a really simple example on paper, we can say, let's choose end points, a is 2 and b is 4.

356
00:39:55,920 --> 00:39:59,359
On paper, I would probably write out 2, 3, 4 in a row.

357
00:39:59,359 --> 00:40:02,159
So I know the numbers I need to look at.

358
00:40:02,159 --> 00:40:06,960
I would say 2 is my a, 4 is my b, I need to look at every one of these numbers one at a time.

359
00:40:08,719 --> 00:40:11,519
Reasonable? I can do another example.

360
00:40:11,519 --> 00:40:13,920
Sorry. And I know what the answer should be.

361
00:40:13,920 --> 00:40:18,800
So I figure out what the answer should be so that when I write my code, I actually know what I'm looking for.

362
00:40:19,519 --> 00:40:24,480
I look at another example. Let's say a little bit more complicated, a bigger range, a is 2b is 7.

363
00:40:24,480 --> 00:40:27,920
I try to use the same strategy I used, same recipe.

364
00:40:27,920 --> 00:40:31,119
I used to solve that simpler example in this harder one.

365
00:40:31,119 --> 00:40:34,800
So again, I'm going to write out all the numbers between 2 and 7, inclusive.

366
00:40:34,800 --> 00:40:36,880
This is my first, this is my last.

367
00:40:37,440 --> 00:40:40,720
And my strategy was to go through one at a time.

368
00:40:40,799 --> 00:40:44,959
And if it's odd, I take it to my running sum and add it to my running sum.

369
00:40:44,959 --> 00:40:46,719
And if it's even I don't, I ignore it.

370
00:40:48,159 --> 00:40:50,239
And again, I know the answer for this should be 50.

371
00:40:51,279 --> 00:40:54,000
So with these two examples in mine, I can start writing code.

372
00:40:54,879 --> 00:41:00,799
But instead of writing code for the big problem, that might include some nuances or some edge cases,

373
00:41:00,799 --> 00:41:02,799
I can actually try to solve a similar problem.

374
00:41:03,439 --> 00:41:09,759
So instead of summing all the odd numbers between a and b, let's just sum all the numbers between a and b.

375
00:41:09,760 --> 00:41:12,160
And see if we can get code right working for that.

376
00:41:12,160 --> 00:41:16,400
Once we do, figuring out the odd ones should be a small tweak to our code.

377
00:41:18,400 --> 00:41:22,640
So if we start with figuring out the sum of all the odd numbers between an including a and b,

378
00:41:23,360 --> 00:41:26,960
that sounds like a loop because I knew when I wrote my example on paper,

379
00:41:26,960 --> 00:41:29,680
I'd have to touch each number between an including a and b.

380
00:41:30,960 --> 00:41:34,480
So I know I need to loop through every one of these values.

381
00:41:34,719 --> 00:41:40,880
While or a for loop, your choice in the slides, I'll do both, just to see what it looks like.

382
00:41:41,599 --> 00:41:43,119
So with a for loop, it's easy.

383
00:41:43,119 --> 00:41:44,639
It's just for i and rnjb.

384
00:41:44,639 --> 00:41:49,760
But with a while loop, remember, we have to initialize our loop variable if we have one.

385
00:41:49,760 --> 00:41:50,639
i equals a.

386
00:41:50,639 --> 00:41:54,159
Our loop condition is while i is less than or equal to b.

387
00:41:54,159 --> 00:41:59,039
Right? So we're going to loop through while I'm looking at all these values up to an including b.

388
00:41:59,760 --> 00:42:03,199
And I need to remember to increment my loop variable within the loop.

389
00:42:04,159 --> 00:42:05,759
By one each time in this case.

390
00:42:08,239 --> 00:42:08,719
Okay.

391
00:42:08,719 --> 00:42:10,719
And then what do I do within my loop?

392
00:42:10,719 --> 00:42:13,359
Well, I'm going to remember we're solving a similar problem.

393
00:42:13,359 --> 00:42:15,119
I'm going to keep a running sum.

394
00:42:15,119 --> 00:42:18,000
So as soon as I see a new i, I'm going to add it to my sum.

395
00:42:20,319 --> 00:42:23,919
I realize here, probably my IDE would show me that there's an error.

396
00:42:23,919 --> 00:42:25,279
I didn't initialize some of odd.

397
00:42:25,279 --> 00:42:27,839
So I remember to initialize some of odd's right before the loop.

398
00:42:28,399 --> 00:42:31,439
And then this is a good place to test the code for a little bit.

399
00:42:31,440 --> 00:42:34,159
So we'll test it with a really simple example, 2, 4.

400
00:42:35,840 --> 00:42:42,079
Okay. If we test it with 2, 4, the for loop gives me a 5, but the while loop gives me a 9.

401
00:42:43,039 --> 00:42:45,360
So you guys might have noticed what the problem is.

402
00:42:46,240 --> 00:42:50,159
My for loop goes through up to, but not including the end variable, right?

403
00:42:50,159 --> 00:42:50,480
The b.

404
00:42:51,760 --> 00:42:56,240
So we can add a print statement in case you didn't figure that out.

405
00:42:56,240 --> 00:42:58,720
And the print statement would actually tell us, right?

406
00:42:58,720 --> 00:43:00,639
It tells us what we're incrementing.

407
00:43:00,639 --> 00:43:03,599
First it's 2, then it's 3, but I never hit the 4.

408
00:43:05,440 --> 00:43:08,799
So the fix is to just change my end range to bb plus 1.

409
00:43:09,920 --> 00:43:12,079
And then we run it again and we see the answers match.

410
00:43:13,679 --> 00:43:16,719
Okay. And this solves the bigger problem.

411
00:43:16,719 --> 00:43:22,319
So now all we need to do is adding the nuance, the piece where we just grab the odd numbers.

412
00:43:23,119 --> 00:43:25,920
And here we say, well, if I'm just grabbing the odd numbers,

413
00:43:25,920 --> 00:43:32,079
I only want to add i to my sum of odds when I see an odd number.

414
00:43:32,079 --> 00:43:35,519
So here I could use my is even function that I already wrote.

415
00:43:35,519 --> 00:43:39,680
I would say if not is even, or I can just do it all over again.

416
00:43:39,680 --> 00:43:42,400
If I percent 2 equal 1, then we do this.

417
00:43:43,519 --> 00:43:46,079
Right. And now we can run it again.

418
00:43:46,079 --> 00:43:50,320
And hopefully this now matches with example I had on paper and it does.

419
00:43:51,119 --> 00:43:54,720
Okay. So the idea here is to try to solve a simpler problem first.

420
00:43:54,719 --> 00:43:57,199
And then as you see more nuances to the problem,

421
00:43:57,199 --> 00:43:59,439
add in the functionality just a little bit at a time.

422
00:43:59,439 --> 00:44:02,399
So you don't actually get bogged down by a whole bunch of problems,

423
00:44:03,599 --> 00:44:06,239
issues that might come up when you wrote a whole bunch of code.

424
00:44:07,919 --> 00:44:10,399
The last step is just to test it on the other example,

425
00:44:10,399 --> 00:44:12,879
just to make sure that it still works, right?

426
00:44:12,879 --> 00:44:15,599
And so if we print some of odds between 2 and 7,

427
00:44:15,599 --> 00:44:18,079
again this matches what I had written down on paper.

428
00:44:19,039 --> 00:44:21,919
Okay. If you don't want to use print statements,

429
00:44:21,920 --> 00:44:24,639
the Python tutors also a great debugging tool.

430
00:44:26,480 --> 00:44:28,880
So testing code often, very useful.

431
00:44:28,880 --> 00:44:31,200
I think I've stressed this in previous lectures as well.

432
00:44:31,200 --> 00:44:34,800
Using prints or the Python tutor did debug, it's also very useful.

433
00:44:35,599 --> 00:44:38,480
I don't actually intend to go through this you try it,

434
00:44:38,480 --> 00:44:42,320
but this along with a bunch of other examples

435
00:44:43,039 --> 00:44:46,400
or things to try at home are in the Python file.

436
00:44:46,400 --> 00:44:50,159
So just functions you can write is palindrome,

437
00:44:50,159 --> 00:44:52,559
this keep consonants, this first elastif.

438
00:44:52,559 --> 00:44:55,519
Read the function specification and try to write code

439
00:44:55,519 --> 00:44:58,159
that matches the specification.

440
00:44:58,159 --> 00:45:00,799
And as usual the answers are in the Python file,

441
00:45:00,799 --> 00:45:03,119
but please, please try to do them on your own first

442
00:45:03,119 --> 00:45:04,639
before looking at the answers.

443
00:45:06,399 --> 00:45:08,799
Okay. A quick summary.

444
00:45:10,319 --> 00:45:14,399
Functions are very useful, allows us to abstract certain useful tasks,

445
00:45:14,399 --> 00:45:16,879
right? Basically, I've tracked away functionality

446
00:45:16,879 --> 00:45:19,199
that we might reuse many times in our program.

447
00:45:19,839 --> 00:45:23,599
Functions take an input, they have something to return.

448
00:45:23,599 --> 00:45:26,399
We're going to see next time what happens when we don't return anything.

449
00:45:28,719 --> 00:45:32,239
Creating a function is different than running the function, right?

450
00:45:32,239 --> 00:45:36,399
So you create the function once, but you can run it many, many times.

451
00:45:36,399 --> 00:45:38,639
And that's what makes functions useful.

452
00:45:38,639 --> 00:45:41,599
It makes code easy to write, read, debug, modify,

453
00:45:42,559 --> 00:45:44,719
leads to very nice robust code.

454
00:45:44,719 --> 00:45:45,519
Okay.

455
00:45:49,199 --> 00:45:59,159
You

