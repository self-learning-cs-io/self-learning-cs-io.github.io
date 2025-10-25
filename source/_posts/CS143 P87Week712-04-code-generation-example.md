---
title: CS143 P87Week712 04 Code Generation Example
---

1
00:00:00,000 --> 00:00:07,000
In this video, we're going to generate code for a small example program.

2
00:00:07,000 --> 00:00:17,000
The program will take a look at, takes a positive integer x, and sums all the numbers from 0 up to x.

3
00:00:17,000 --> 00:00:26,000
So if x is 0, then the result is 0. Otherwise, it is x plus the sum of all the numbers up to x minus 1.

4
00:00:26,000 --> 00:00:37,000
So this isn't a very interesting program, but it does illustrate all of the features that we've discussed in the previous couple of videos.

5
00:00:37,000 --> 00:00:41,000
So let's dive right in and talk about how we're going to generate code for sum two.

6
00:00:41,000 --> 00:00:46,000
So we begin by giving it a label for the entry point to the function.

7
00:00:46,000 --> 00:00:51,000
So there'll be the sum two entry.

8
00:00:51,000 --> 00:00:58,000
All right, and now we have to generate code for the callers side, call call E side, excuse me, of the calling sequence.

9
00:00:58,000 --> 00:01:07,000
So what was that? So the first thing we have to do is we have to set up the frame pointer, which will just be the value of the stack pointer.

10
00:01:07,000 --> 00:01:11,000
So that's the frame pointer for this activation.

11
00:01:11,000 --> 00:01:19,000
And then we're going to have to store the return address at the current value of the stack pointer.

12
00:01:19,000 --> 00:01:29,000
And then we're going to move the stack pointer into positions where whenever we store something on the stack, we have to move the stack pointer to the next unused location.

13
00:01:29,000 --> 00:01:30,000
All right.

14
00:01:30,000 --> 00:01:31,000
Okay.

15
00:01:31,000 --> 00:01:35,000
And so now we have to generate code for this if then else.

16
00:01:35,000 --> 00:01:36,000
All right.

17
00:01:36,000 --> 00:01:44,000
And the very first thing if you go back and look at the code for if then else is a generate code for the first sub expression of the predicate.

18
00:01:44,000 --> 00:01:47,000
So we're going to generate code for X and that's really easy.

19
00:01:47,000 --> 00:01:54,000
Remember generating code for a variable just looks up the variable in the current position of the frame.

20
00:01:54,000 --> 00:01:59,000
Sorry, at the correct offset from the frame pointer.

21
00:01:59,000 --> 00:02:01,000
All right.

22
00:02:01,000 --> 00:02:02,000
All right.

23
00:02:02,000 --> 00:02:05,000
So once we do that, now we're generating code for the predicate.

24
00:02:05,000 --> 00:02:06,000
And how do we do that?

25
00:02:06,000 --> 00:02:08,000
Well, we've generated code for this for sub expression.

26
00:02:08,000 --> 00:02:15,000
And now we have to save that sub expression somewhere because we're going to generate code for another sub expression.

27
00:02:15,000 --> 00:02:17,000
So the equality there is binary operator.

28
00:02:17,000 --> 00:02:22,000
So we have to save the value we just computed somewhere on the stack.

29
00:02:22,000 --> 00:02:23,000
All right. So we'll do that.

30
00:02:23,000 --> 00:02:30,000
So we'll store the value of a zero on the stack.

31
00:02:30,000 --> 00:02:37,000
And that will involve as always moving the stack pointer.

32
00:02:37,000 --> 00:02:40,000
Okay.

33
00:02:40,000 --> 00:02:45,000
And now we generate code for the second sub expression of the predicate.

34
00:02:45,000 --> 00:02:48,000
All right. And that's also easy.

35
00:02:48,000 --> 00:02:53,000
That's just a load immediate of the immediate value into the accumulator.

36
00:02:53,000 --> 00:02:54,000
All right.

37
00:02:54,000 --> 00:03:03,000
And now we're going to load the value that we saved for the first argument of the predicate back into a temporary register and actually do the comparison.

38
00:03:03,000 --> 00:03:07,000
So this is more code that's actually part of the conditional.

39
00:03:07,000 --> 00:03:08,000
All right.

40
00:03:08,000 --> 00:03:16,000
So we do a load word into T1.

41
00:03:16,000 --> 00:03:20,000
Of the value that we saved before.

42
00:03:20,000 --> 00:03:21,000
Okay.

43
00:03:21,000 --> 00:03:26,000
And now we need to.

44
00:03:26,000 --> 00:03:28,000
We need to pop the stack.

45
00:03:28,000 --> 00:03:29,000
Okay.

46
00:03:29,000 --> 00:03:31,000
So we'll do that here.

47
00:03:31,000 --> 00:03:40,000
All right. Because we're done with that value. So we'll.

48
00:03:40,000 --> 00:03:41,000
All right.

49
00:03:41,000 --> 00:03:43,000
And now we can do the branch.

50
00:03:43,000 --> 00:03:47,000
So now we test whether.

51
00:03:47,000 --> 00:03:51,000
The two sub expressions of the predicate are equal or not.

52
00:03:51,000 --> 00:03:53,000
And if they are, then we jump to the true branch.

53
00:03:53,000 --> 00:03:58,000
And here I'm going to give the true branch a unique label because this might be part of a larger program where there are many if the analysis.

54
00:03:58,000 --> 00:04:04,000
And so I'm going to append some identifying number on the end instead of writing out true branch.

55
00:04:04,000 --> 00:04:06,000
I'll just call this true one.

56
00:04:06,000 --> 00:04:07,000
All right.

57
00:04:07,000 --> 00:04:08,000
Okay.

58
00:04:08,000 --> 00:04:10,000
And if we fall through.

59
00:04:10,000 --> 00:04:14,000
Then we're on the false branch. We'll call that false one.

60
00:04:14,000 --> 00:04:19,000
And now we're generating code for the false branch, which is this summation here.

61
00:04:19,000 --> 00:04:27,000
All right. And how are we going to do that? Well, this whole thing is a plus expression, which means we have to generate code first for the first sub expression, which is just X.

62
00:04:27,000 --> 00:04:31,000
All right. So what do we do? Well, we load.

63
00:04:31,000 --> 00:04:37,000
To generate code for X, we look up X at its current offset.

64
00:04:37,000 --> 00:04:42,000
And yet it's appropriate offset in the in the frame using the frame pointer case the only argument.

65
00:04:42,000 --> 00:04:45,000
And so it's at four from the frame pointer.

66
00:04:45,000 --> 00:04:47,000
I'm sorry, the only argument to the procedure.

67
00:04:47,000 --> 00:04:54,000
And so that's stored at the first position for arguments, which is always at four from the frame pointer and our scheme.

68
00:04:54,000 --> 00:04:59,000
All right. And now that we've loaded it, we have to save it because it's part of a binary operation.

69
00:04:59,000 --> 00:05:07,000
So we're going to save that value on the stack.

70
00:05:07,000 --> 00:05:17,000
Okay. And now we will adjust the stack where.

71
00:05:17,000 --> 00:05:19,000
Okay.

72
00:05:19,000 --> 00:05:22,000
And what are we going to do next?

73
00:05:22,000 --> 00:05:27,000
Well, now we've we've computed this sub expression, this X.

74
00:05:27,000 --> 00:05:32,000
All right. We can't do the plus yet until we compute the second sub expression, which is the function call.

75
00:05:32,000 --> 00:05:35,000
All right. So now we have to generate code for the function call.

76
00:05:35,000 --> 00:05:41,000
And I'm going to move up here to the other side of the screen here to show the rest of the code.

77
00:05:41,000 --> 00:05:51,000
Okay. And the first thing we do to generate code for the function call is to start setting up our activation record.

78
00:05:51,000 --> 00:05:56,000
This is the new activation record for the function call we're about to make.

79
00:05:56,000 --> 00:06:01,000
All right. So what do we do there? We store the frame pointer.

80
00:06:01,000 --> 00:06:04,000
We store our old frame pointer.

81
00:06:04,000 --> 00:06:13,000
At the stack. Okay. On the stack.

82
00:06:13,000 --> 00:06:18,000
All right. And now we have to compute the argument.

83
00:06:18,000 --> 00:06:25,000
We have to compute the X minus one. So that code gets inserted here in the template for a function call.

84
00:06:25,000 --> 00:06:28,000
So what's going to happen there? Well, we're computing a subtraction.

85
00:06:28,000 --> 00:06:35,000
So the template for subtraction is to first generate code for the first sub expression, then generate code for the second sub expression, and then subtract them.

86
00:06:35,000 --> 00:06:45,000
All right. So let's do that. So first we generate code for X again.

87
00:06:45,000 --> 00:06:54,000
Okay. And now since it's the first argument of a binary operation, we're going to save it on the stack.

88
00:06:54,000 --> 00:07:03,000
All right.

89
00:07:03,000 --> 00:07:09,000
All right. Now we generate code for the second argument of the subtraction.

90
00:07:09,000 --> 00:07:19,000
Okay. And now we perform the subtractions. We have to load the first argument back into a temporary register.

91
00:07:19,000 --> 00:07:28,000
We have to actually do the subtraction.

92
00:07:28,000 --> 00:07:31,000
Excuse me here.

93
00:07:31,000 --> 00:07:41,000
All right. And now we can pop the temporary value off the stack.

94
00:07:41,000 --> 00:07:53,000
Okay. So now we've actually done the subtraction. And let me see. That is everything from about here down to here is computing X minus one.

95
00:07:53,000 --> 00:08:01,000
Okay. And this was computing X. And this was computing one. And then this whole thing is computing the subtraction.

96
00:08:01,000 --> 00:08:05,000
All right. So now we compute the argument.

97
00:08:05,000 --> 00:08:16,000
What are we going to do? Well, we save it on the stack. So now we save the result on the stack. We're saving it into the new activation record that we're building.

98
00:08:16,000 --> 00:08:26,000
All right. And then we have to advance or move the stack pointers always.

99
00:08:26,000 --> 00:08:36,000
And now we're ready to actually do the function calls. Now we do the jump in the link to the entry point of some two.

100
00:08:36,000 --> 00:08:43,000
Okay. And now when this returns, what's it going to return with? It's going to return with the result of computing some two in the accumulator.

101
00:08:43,000 --> 00:08:46,000
All right. And so then we're ready to perform the addition.

102
00:08:46,000 --> 00:09:01,000
Because now we've computed the second argument to the addition. And how do we do that? Well, look back at the template for addition. The next thing that happens is we reload the temporary value that we saved on the stack.

103
00:09:01,000 --> 00:09:14,000
All right. And now we can actually perform the addition.

104
00:09:14,000 --> 00:09:24,000
Okay. And then we can pop the temporary value of the stack.

105
00:09:24,000 --> 00:09:41,000
All right. And that actually ends the else branch, the false branch of the entire if then else. Okay. So now we branch around the rest of the if then else code.

106
00:09:41,000 --> 00:09:51,000
And we'll call that label and if one and now comes the code for the true branch.

107
00:09:51,000 --> 00:10:04,000
And what are we going to put there? Well, it's not very complicated because all we're doing on the true branch is loading or generating code for zero, which is just a single load immediate load immediate.

108
00:10:04,000 --> 00:10:14,000
All right. And that's the entire true branch. And so now we're at this. There should not be a call. And there excuse me. In fact, I can just erase that a little bit.

109
00:10:14,000 --> 00:10:29,000
All right. And now we're at and actually I see I wrote this in the wrong place. So let's fix that. So this is a branch at the end of the false branch at the end of the end of the else part of the if.

110
00:10:29,000 --> 00:10:34,000
And we're going to branch around the code for the true branch, which is only one instruction.

111
00:10:34,000 --> 00:10:42,000
And so the very next instruction is the label and if so now what's left to do we've to carry code for the whole if then else.

112
00:10:42,000 --> 00:10:52,000
And so now it goes here is the rest of the template for the function definition. So now we have to generate the code that returns back to the caller.

113
00:10:52,000 --> 00:11:01,000
We do that while we have to load the return address from the stack.

114
00:11:01,000 --> 00:11:15,000
Okay. And now we pop the stack. So we pop the entire activation record off the stack and how big is our activation record. Well, remember, there's always two words one for the return address and one for the frame pointer and then a number of words equals to the number of arguments was only one argument here.

115
00:11:15,000 --> 00:11:22,000
So we have three words such 12 bytes. So we increment the stack pointer by 12.

116
00:11:22,000 --> 00:11:33,000
And then we load the old frame pointer. We store the frame pointer.

117
00:11:33,000 --> 00:11:41,000
Okay. And then we return. So one more instruction. You do a jump register to the return address.

118
00:11:41,000 --> 00:11:57,000
And that is the entire code for this simple function sum to and as a couple things to point out. So first of all, the code is constructed as a bunch of templates, paste it together and I tried to point out as we go along how that works.

119
00:11:57,000 --> 00:12:11,000
But you do wind up with one linear sequence of code. All right. And if if you're at all confused, it's be worth it to go back and look at those templates and look at this example and understand how the code all fits together and how it works.

120
00:12:11,000 --> 00:12:22,000
And the other thing I would point out is just that this is extremely inefficient code. So like over here, where we were generating code to check whether X is equal to zero.

121
00:12:22,000 --> 00:12:36,000
Notice here that we load X. So this is a load of X. And then we immediately store the X again into the stacks. We just loaded it from the frame. Then we immediately store it back in the memory.

122
00:12:36,000 --> 00:12:47,000
And then we load an immediate value. And then we reload the value of X here. So moving the value of X, we all around. So we load it. We store it. We load it again.

123
00:12:47,000 --> 00:13:00,000
And so there's a lot of wasted motion here. And that's a result of this very simple code generation strategy where we want to compile to compose code together, but we'll be able to compose these templates in a way that will work properly.

124
00:13:00,000 --> 00:13:14,000
Code does not have to be this inefficient in the lot of the techniques that we'll discuss in subsequent lectures. We'll talk about smarter code generation techniques and also optimizations that can even improve the code further.

125
00:13:14,000 --> 00:13:16,000
Code further.

