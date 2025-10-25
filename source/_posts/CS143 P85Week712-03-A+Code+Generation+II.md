---
title: CS143 P85Week712 03 A+Code+Generation+II
---

1
00:00:00,000 --> 00:00:09,120
This video is a continuation of the previous video where we'll be finishing up code generation

2
00:00:09,120 --> 00:00:15,679
for the simple language, dealing with function calls, function definitions, and variable references.

3
00:00:15,679 --> 00:00:23,199
So just to remind you what we're working on, here's the simple language, and again we have

4
00:00:23,199 --> 00:00:28,760
a bunch of different kinds of expressions, and we dealt with all of these last time, except

5
00:00:28,760 --> 00:00:33,560
for variable references and function calls. And of course we also have function definitions.

6
00:00:33,560 --> 00:00:37,800
So as I said in the introduction, these are the three constructs we'll be looking at in

7
00:00:37,800 --> 00:00:45,000
this video. The main issue in designing the code generation for function calls and function

8
00:00:45,000 --> 00:00:50,600
definitions is that both of these will depend intimately on the layout of the activation record.

9
00:00:50,600 --> 00:00:54,680
So really, code generation for function calls, code generation for function definitions,

10
00:00:54,679 --> 00:01:00,119
and the layout of the activation record all need to be designed together. Now for this particular

11
00:01:00,119 --> 00:01:06,599
language, a very simple activation record will be sufficient. Because we're using a stack machine,

12
00:01:06,599 --> 00:01:11,560
we're modeling a stack machine in our code generation, the result of a function call will always

13
00:01:11,560 --> 00:01:16,439
be in the accumulator, and that means there's no need to store the result of the function call

14
00:01:16,439 --> 00:01:20,840
in the activation record. And furthermore, the activation record will hold the actual parameters.

15
00:01:20,840 --> 00:01:26,359
So when we go to compute a function call with arguments x1 through xn, we will push those

16
00:01:26,359 --> 00:01:30,680
arguments onto the stack. And as it happens, these are the only variables in this language,

17
00:01:30,680 --> 00:01:38,280
there are no local or global variables other than the arguments to a function call. And so those

18
00:01:38,280 --> 00:01:42,120
are the only variables that will need to be stored in the activation record.

19
00:01:44,600 --> 00:01:48,680
Now recall that the stack machine discipline guarantees that the stack pointer is preserved

20
00:01:48,680 --> 00:01:52,840
across function calls. So the stack pointer will be exactly the same when we exit from a function

21
00:01:52,840 --> 00:01:57,720
call as it was when we entered the function call. And this means we won't need a control link in

22
00:01:57,720 --> 00:02:02,280
our activation record. The point of a control link is to help us find the previous activation.

23
00:02:02,840 --> 00:02:07,719
And since the stack pointer is preserved, we'll have no trouble finding it when we return from a

24
00:02:07,719 --> 00:02:12,360
function call. And we will never need to look at another activation during a function call since there

25
00:02:12,360 --> 00:02:19,080
are no non-local variables in the language. We will, however, need the return address. And that

26
00:02:19,080 --> 00:02:25,000
will need to be stored somewhere in the activation record. And one more thing, it turns out that a

27
00:02:25,000 --> 00:02:29,960
pointer to the current activation will be useful. Now this is to the current activation, not to the

28
00:02:29,960 --> 00:02:37,000
previous activation. And this pointer will live in the register fp, which stands for frame pointer.

29
00:02:37,560 --> 00:02:43,800
This is a, this is a, this is the register name on the MIPS and the name is chosen to denote the

30
00:02:43,800 --> 00:02:48,680
frame pointer and by convention, the compilers put the frame pointer there. What the frame pointer is

31
00:02:48,680 --> 00:02:52,439
good for, well, it points to the current frame, so that's what the name comes from, but what is good

32
00:02:52,439 --> 00:03:00,199
for will see in a few minutes. All right, so to summarize, for this language, an activation record

33
00:03:00,199 --> 00:03:05,479
that has the caller's frame pointer, the actual parameters and the return address will be sufficient.

34
00:03:05,479 --> 00:03:11,639
So let's consider the call to the function f and has two arguments x and y. Then at the time, the

35
00:03:11,639 --> 00:03:17,319
call is performed before we start executing the body of the function. This is what the activation

36
00:03:17,319 --> 00:03:21,799
record will look like. So we'll have the old frame pointer. So this is the frame pointer that

37
00:03:21,799 --> 00:03:27,879
points to the caller's frame, not to the frame of the function that we're executing. And the reason

38
00:03:27,879 --> 00:03:31,879
that it does that is that we have to save it somewhere because the frame pointer register will be

39
00:03:31,879 --> 00:03:36,280
overwritten with the frame pointer for the current activation. So we have to save the old one

40
00:03:36,840 --> 00:03:42,759
so that we can restart the caller when we return to it from the current function. And then there

41
00:03:42,759 --> 00:03:46,919
are the arguments of the function and notice that they're pushed on the stack in reverse order. So the

42
00:03:46,919 --> 00:03:52,280
last argument is pushed on first and the first argument is at the top of the stack. And the reason for

43
00:03:52,280 --> 00:03:57,000
doing it this way is it'll make the indexing to find the arguments a little bit easier, a little

44
00:03:57,000 --> 00:04:03,080
bit simpler. And then we have the stack pointer. So there's nothing here. And what we'll go here

45
00:04:03,080 --> 00:04:08,759
is at the call e, the function that we're calling, will push on the return address. So this is where

46
00:04:08,759 --> 00:04:15,319
the return address will go. And these elements, the caller's frame pointer, the arguments to the

47
00:04:15,319 --> 00:04:20,120
function and the return address of the called function, will make up the activation record of f.

48
00:04:21,079 --> 00:04:30,120
Now a bit of terminology, the calling sequence is the sequence of instructions of both the caller

49
00:04:30,120 --> 00:04:35,639
and the call e to set up a function invocation. Okay, so that's referred to in compiler lingo as the

50
00:04:35,639 --> 00:04:41,639
calling sequence. And we're going to need a new instruction to show the calling sequence for

51
00:04:41,639 --> 00:04:47,480
this, for a function calls. And that will be the jump and link instruction. So jump and link

52
00:04:48,439 --> 00:04:53,240
what it does is it jumps to the label that's given as an argument. And it saves the address of the

53
00:04:53,240 --> 00:04:59,240
next instruction after the jump and link in the register r a, which stands for return address.

54
00:04:59,240 --> 00:05:03,720
So what would happen in a jump and link instructions? If I have jump and link to label l,

55
00:05:04,280 --> 00:05:08,680
and then they're saying add instruction that comes next, I don't know what it is, it's the address

56
00:05:08,680 --> 00:05:15,480
of this instruction, the one after the jump and link that will be stored in the in the register r a.

57
00:05:16,360 --> 00:05:21,960
So this instruction will jump to l, it will store the address of this add instruction in r a,

58
00:05:21,960 --> 00:05:27,560
and it will execute whatever code is at l. And then the code that's at l can execute a jump back

59
00:05:27,560 --> 00:05:35,879
to the address in here to execute the return to the caller. So now we're ready to actually generate

60
00:05:35,879 --> 00:05:43,160
code for a function call expression. So let's say we have the call f of e1 to en, where of course e1

61
00:05:43,160 --> 00:05:48,600
through e1 are expressions and let me change colors here. So these are expressions here not values.

62
00:05:49,160 --> 00:05:53,720
So how are we going to do that? Well, the first thing we're going to do is we're going to start

63
00:05:53,720 --> 00:05:58,920
building the activation record. And so we save the current frame pointer. This is the frame pointer

64
00:05:58,920 --> 00:06:04,440
for the caller. Okay, so this is pointing to the caller's frame. Okay, and we store that at the stack

65
00:06:04,440 --> 00:06:12,520
pointer. We have to bump the stack pointer. And then we generate code for the last argument for

66
00:06:12,519 --> 00:06:19,399
en. And so that code gets inserted here. And then we push it on the stack. So we store the

67
00:06:19,399 --> 00:06:25,240
result of en, which will be in the accumulator a zero on the stack. And then we bump the stack pointer.

68
00:06:26,599 --> 00:06:31,799
Okay, and then we'll do that for all the arguments finishing up with e1. So we generate code for e1.

69
00:06:32,439 --> 00:06:36,599
And we push it onto the stack. Okay, so now all the arguments are on the stack.

70
00:06:37,560 --> 00:06:43,000
Okay, and now we just do the jump in link. So we've done as much of the work and much of the

71
00:06:43,000 --> 00:06:49,160
calling sequences we can do on the caller side. So this code is executing in the function in the caller.

72
00:06:51,080 --> 00:06:57,640
Okay, so this is the caller side of the calling sequence. And it builds up as much of the activation

73
00:06:57,640 --> 00:07:02,439
record as it can. In particular, it's evaluating the actual parameters and pushing them onto the

74
00:07:02,439 --> 00:07:07,399
stack to form part of the activation record for the called function. And then we do the jump in

75
00:07:07,399 --> 00:07:11,879
link and we jump to the entry point of the function that we're calling. So we're calling, this is a

76
00:07:11,879 --> 00:07:20,519
call to f. And so we jump to f's entry point. So a few more things to note. First of all, as we

77
00:07:20,519 --> 00:07:25,399
discussed on the previous slide, when we execute the jump in link instruction, that is going to save

78
00:07:25,399 --> 00:07:31,079
the return address in the register RA. And that address will be this address here. The one that comes

79
00:07:31,079 --> 00:07:37,240
after the address of the next instruction after the jump in link instruction. And then notice also

80
00:07:37,240 --> 00:07:43,719
that the activation record we've built so far is four times n plus four bytes. So this is where n

81
00:07:43,719 --> 00:07:48,680
here is the number of arguments. Each argument takes up four bytes and then four bytes for the old

82
00:07:48,680 --> 00:07:54,680
frame pointer. Now, we're ready to talk about the call aside of the calling sequence. And we're

83
00:07:54,680 --> 00:07:59,560
going to need one new instruction for that. The JR instruction stands for jump register. And it

84
00:07:59,560 --> 00:08:07,160
just jumps to the address in its register argument. So now the call aside is the code for the function

85
00:08:07,160 --> 00:08:13,000
definition. Okay, so this is the code that actually executes the body of the function. And how do we

86
00:08:13,000 --> 00:08:18,199
generate code for that? Well, let's take a look. Now, actually, the very first thing that should be

87
00:08:18,199 --> 00:08:25,480
here is that this first instruction of the call aside is the entry point. So we're missing the label

88
00:08:25,800 --> 00:08:32,120
here. So this would be labeled F entry. Okay, so this is the target of the jump in link instruction.

89
00:08:32,120 --> 00:08:37,560
And then the very first thing we do is we set up the frame pointer. So we copy the current value

90
00:08:37,560 --> 00:08:43,159
of the stack pointer into the frame pointer. That's that points to the end of the frame for the

91
00:08:43,159 --> 00:08:49,159
call E for the new function that's being executed. We also save the return address at the current

92
00:08:49,159 --> 00:08:53,720
position on the stacks. Remember, there was one more thing to do. One thing that was missing on

93
00:08:53,720 --> 00:08:58,040
the caller side of the calling sequence, which is the return address. We don't know the return

94
00:08:58,040 --> 00:09:04,519
address until after the jump in link instruction executes. And so the call E is the one that has to

95
00:09:04,519 --> 00:09:10,759
save that value. Okay, so after the jump in link, the R a register contains the return address,

96
00:09:10,759 --> 00:09:16,840
and now we save it into the frame. And then we push the stack pointer. Okay,

97
00:09:18,440 --> 00:09:22,680
and now we just generate code for the body of the function. So now that at this point,

98
00:09:22,679 --> 00:09:27,479
the activation record is completely set up. And now we can just generate code for the function

99
00:09:27,479 --> 00:09:31,799
body. And after the function body executes, of course, the stack pointer will be preserved.

100
00:09:32,839 --> 00:09:40,439
And that means that the return address will be at four offset from the stack pointer. So we can

101
00:09:40,439 --> 00:09:46,599
load the return address back into the return address register. All right, and then we can pop the

102
00:09:46,599 --> 00:09:52,279
stack. So here we're going to pop off the current frame from the stack. And that's going to be some

103
00:09:52,279 --> 00:09:58,679
size z, which we, I haven't shown you what it is yet, but we'll calculate the size of z in

104
00:09:58,679 --> 00:10:02,279
just a minute. This is going to be an immediate value. So that's a constant that we plug in there.

105
00:10:03,480 --> 00:10:09,559
And then we load the old frame pointer. Okay, so once we've incremented the stack,

106
00:10:09,559 --> 00:10:16,199
why we've popped off the existing frame. And so now we're pointing at the frame pointer,

107
00:10:16,199 --> 00:10:21,480
the first, we're pointing at the first thing beyond the previous stack frame. And what was that?

108
00:10:21,480 --> 00:10:26,039
Well, that was the first thing that we saved in the stack frame for f. And that's the old frame

109
00:10:26,039 --> 00:10:30,680
pointers. Now we restore the old frame pointer so that the call, that function that called us,

110
00:10:30,680 --> 00:10:37,800
will have its frame pointer back. And then now we're ready to return and resume execution of the

111
00:10:38,360 --> 00:10:42,840
calling function. We just do that by a jump register to the return address.

112
00:10:44,440 --> 00:10:49,159
All right, so note here that the frame pointer points to the top of the frame, not the bottom of

113
00:10:49,159 --> 00:10:52,759
the frame. Okay, so that will actually be important when we talk about how we use the frame pointer

114
00:10:52,759 --> 00:11:00,439
when we get to talking about the variable references next. And the call E pops the return address

115
00:11:00,439 --> 00:11:04,439
and the actual arguments and the saved value of the frame pointer from the stack. So the call E pops

116
00:11:04,439 --> 00:11:10,839
off the entire activation record and also restores the caller's frame pointer. And what's the value

117
00:11:10,839 --> 00:11:15,959
of z? Well, there are n arguments each of which take up four bytes. So there's, so the size of

118
00:11:15,960 --> 00:11:21,800
the activation record is four times n plus there are two other values in the activation record. One is

119
00:11:21,800 --> 00:11:30,040
the return address. And the other one is the old frame pointer. Okay, in the space for two more

120
00:11:30,040 --> 00:11:34,920
words is eight bytes. So that's the size of the activation record. So that's how much we have to

121
00:11:34,920 --> 00:11:42,120
add to the stack pointer to pop the activation record for f off of the stack. Just to give you a sketch

122
00:11:42,519 --> 00:11:48,200
of what this looks like before the call. We have the frame pointer for the caller and we have the

123
00:11:48,200 --> 00:11:55,320
the current value of the stack pointer. And on entry to the function, okay, after the calling

124
00:11:55,320 --> 00:12:01,080
after the calling functions side of the calling sequence has completed, what's on the stack? Well,

125
00:12:01,080 --> 00:12:05,720
we have the old frame pointer and the two arguments. And then the stack pointer points to the next

126
00:12:05,720 --> 00:12:11,320
unused location, which is where the return address will go. All right, then we do the jump in link.

127
00:12:11,320 --> 00:12:17,000
We jump over and the return address gets pushed onto the stack and the frame pointer gets moved

128
00:12:17,000 --> 00:12:23,640
to point to the current value of the frame. Okay, you get to point to the top of the frame, okay. And then

129
00:12:23,640 --> 00:12:27,640
after the call, what has happened? Well, we've popped everything off the stack. We've popped the entire

130
00:12:27,640 --> 00:12:33,800
activation record for the call function off of the stack. And so now notice that we're back in

131
00:12:33,800 --> 00:12:39,880
the same state. So again, function calls have to preserve the invariant that the stack is preserved

132
00:12:39,879 --> 00:12:45,159
across the call. So the stack should be exactly the same after the call as it was on entry to the call.

133
00:12:47,799 --> 00:12:52,039
So we're almost done with code generation for the simple language. The last construct we need to

134
00:12:52,039 --> 00:12:58,360
talk about is how we generate code for variable references. Now, the variables of a function, again,

135
00:12:58,360 --> 00:13:03,240
are just its arguments, just the parameters to the function. There are no other kinds of variables

136
00:13:03,240 --> 00:13:07,320
in this simple language. And these variables are all in the activation record. So really, all we

137
00:13:07,320 --> 00:13:12,600
have to be able to do is generate code to look up a variable and its appropriate place in the activation

138
00:13:12,600 --> 00:13:20,440
record. But there is one problem. And that's that the stack does grow and shrink with intermediate values.

139
00:13:20,440 --> 00:13:26,600
So when you call a function and you begin executing its body, values will be popped and pushed onto the

140
00:13:26,600 --> 00:13:33,240
stack. Besides the activation record. So think back to the code generation for plus and minus. And if

141
00:13:33,240 --> 00:13:38,120
then else, intermediate values were being pushed and popped from the stack. And so what this means

142
00:13:38,120 --> 00:13:42,759
is that these variables that are in the activation record are not at a fixed offset

143
00:13:43,560 --> 00:13:49,799
from the stack pointer. So we can't use the stack pointer very easily to decide or define those

144
00:13:49,799 --> 00:13:57,639
variables. So the solution is to use the frame pointer. The frame pointer always points to the

145
00:13:57,639 --> 00:14:02,680
return address in the activation record. And because it doesn't move during the execution of the

146
00:14:02,679 --> 00:14:07,559
function body, we can always find the variables at the same place relative to the frame pointer.

147
00:14:08,279 --> 00:14:15,719
So how do we do that? Well, let's consider the i th argument x sub i. And just the i th argument

148
00:14:15,719 --> 00:14:23,079
to the to the function. So where is that going to be relative to the frame pointer? That will be at

149
00:14:23,079 --> 00:14:29,879
offset z from the frame pointer. And z is just four times i. And this is actually the reason here

150
00:14:30,679 --> 00:14:35,879
for generating, for pushing the arguments on the stack in in reverse order, starting with the last

151
00:14:35,879 --> 00:14:39,879
argument to the function, because it just makes this index calculation simple. It wouldn't be that

152
00:14:39,879 --> 00:14:44,600
much more complicated. If we push the arguments in the other order, it just makes it a little easier

153
00:14:44,600 --> 00:14:50,840
to see how the indexing works. And anyway, this index, this offset is being calculated at compile time.

154
00:14:50,840 --> 00:14:55,399
So I was at this number, this four times i is something that the compiler knows. What we're putting

155
00:14:55,399 --> 00:15:00,439
into the code here is just a fixed offset. So we're not actually doing that multiplication at runtime.

156
00:15:00,439 --> 00:15:08,199
The z here is just a number that's computed statically by the compiler. So anyway, we just load at offset z,

157
00:15:08,199 --> 00:15:16,519
which is the four times i, where i is the index, the position of the variable in the list of parameters.

158
00:15:17,480 --> 00:15:21,720
At that offset from the frame pointer, that's where x i is stored in the activation record, and we

159
00:15:21,720 --> 00:15:27,000
just load it into the accumulator. So that is the entire code generation for a variable reference.

160
00:15:30,200 --> 00:15:35,720
Here's a little example. So for the function, the hypothetical function that we've been looking at

161
00:15:35,720 --> 00:15:41,960
with two parameters x and y, x is going to be at the frame pointer plus four, and y will be at the

162
00:15:41,960 --> 00:15:51,960
frame pointer plus eight.

