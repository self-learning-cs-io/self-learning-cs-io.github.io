---
title: CS143 P83Week712 02 A+Code+Generation+I
---

1
00:00:00,000 --> 00:00:07,600
In the next two videos, we're going to be looking at code generation for a language that's

2
00:00:07,600 --> 00:00:17,000
higher level than the simple stack machine language we've been talking about so far.

3
00:00:17,000 --> 00:00:22,240
So here's a language with integers and integer operations, and this is the grammar.

4
00:00:22,240 --> 00:00:26,080
So a program consists of a list of declarations.

5
00:00:26,079 --> 00:00:27,079
And what's a declaration?

6
00:00:27,079 --> 00:00:29,879
A declaration is a function definition, so it has a function name.

7
00:00:29,879 --> 00:00:34,960
The function takes a list of arguments, which are just identifiers, and the function has

8
00:00:34,960 --> 00:00:38,000
an expression, which is the body of the function.

9
00:00:38,000 --> 00:00:40,000
And what can function bodies look like?

10
00:00:40,000 --> 00:00:46,159
Well, like the expressions can be integers, identifiers, if then else, and the only predicate

11
00:00:46,159 --> 00:00:51,719
that we're going to allow is an equality test between integers, and then sums of expressions,

12
00:00:51,719 --> 00:00:56,000
differences of expressions, and function calls.

13
00:00:57,000 --> 00:01:01,039
Now, we'll just say that the first function definition in the list is the entry point.

14
00:01:01,039 --> 00:01:05,120
This will be the main routine or the function that gets run when the program starts.

15
00:01:05,120 --> 00:01:10,239
And this language is expressive enough to write a Fibonacci function, and here it is.

16
00:01:10,239 --> 00:01:14,920
And it's just a standard definition, if x is 1, then the result is 0, if x is 2, the result

17
00:01:14,920 --> 00:01:15,920
is 1.

18
00:01:15,920 --> 00:01:22,760
Otherwise, it's the sum of fib of x minus 1, and fib of x minus 2.

19
00:01:22,760 --> 00:01:27,840
Now, to do code generation for this language, we need to generate code for each expression

20
00:01:27,840 --> 00:01:33,080
e. We need to produce MIPS code for each expression e that accomplishes two things.

21
00:01:33,080 --> 00:01:37,520
First of all, that code is going to compute the value of e and leave it in the accumulator

22
00:01:37,520 --> 00:01:38,520
a0.

23
00:01:38,520 --> 00:01:39,520
Right?

24
00:01:39,520 --> 00:01:45,480
So when the code for e is done, the value of e will be stored in the accumulator.

25
00:01:45,480 --> 00:01:49,160
And furthermore, e is going to be code for e.

26
00:01:49,159 --> 00:01:54,319
It's going to preserve the stack pointer and the contents of the stack.

27
00:01:54,319 --> 00:02:00,399
That means whatever the stack is when we started executing e or the code for e, the stack

28
00:02:00,399 --> 00:02:06,079
will be exactly the same after we're done executing the code for e.

29
00:02:06,079 --> 00:02:11,599
And we're going to write a code generation function, CGen of e that produces code.

30
00:02:11,599 --> 00:02:16,680
So CGen of e is something that produces a program, it produces code that will accomplish

31
00:02:16,680 --> 00:02:17,680
these two things.

32
00:02:18,680 --> 00:02:23,760
Now, our code generation function, now you have e1 back into a temporary register.

33
00:02:23,760 --> 00:02:25,480
Now we can do the add, okay?

34
00:02:25,480 --> 00:02:31,040
So we add t1 and a0 together and store that back in the accumulator.

35
00:02:31,040 --> 00:02:33,360
And now we have to pop the stack.

36
00:02:33,360 --> 00:02:37,719
And now notice that this is all the code here for e1 plus e2.

37
00:02:37,719 --> 00:02:40,960
And when we're done, we've established our two invariants.

38
00:02:40,960 --> 00:02:44,319
The value of e1 plus e2 is in the accumulator.

39
00:02:44,319 --> 00:02:46,560
That was established by this instruction.

40
00:02:46,560 --> 00:02:49,159
And this pop here, restores the state of the stacks.

41
00:02:49,159 --> 00:02:54,599
Now the state of the stack here is exactly what it was when we entered this block of code

42
00:02:54,599 --> 00:02:58,719
up here.

43
00:02:58,719 --> 00:03:03,680
Now to be completely precise, I really should write this code generation function out a slightly

44
00:03:03,680 --> 00:03:05,599
different way.

45
00:03:05,599 --> 00:03:07,840
And that would be like this.

46
00:03:07,840 --> 00:03:11,719
So what we're really doing here is we're generating code for e1 and then we're printing

47
00:03:11,719 --> 00:03:19,759
out into a file or something like that, the code to do the push, okay?

48
00:03:19,759 --> 00:03:22,520
And then we generate the code for e2.

49
00:03:22,520 --> 00:03:27,120
And now these calls to code generation are also printing into the same file, okay?

50
00:03:27,120 --> 00:03:30,800
So here, you know, this have printed out the instructions, whatever the instructions are

51
00:03:30,800 --> 00:03:32,199
at execute e1.

52
00:03:32,199 --> 00:03:35,479
This is printing out the code to do the push.

53
00:03:35,479 --> 00:03:37,560
We print out the code to do e2.

54
00:03:37,560 --> 00:03:41,680
And then we print out the code to do the add and the pop.

55
00:03:41,680 --> 00:03:45,319
Yes, the add and the pop.

56
00:03:45,319 --> 00:03:48,840
And this is just, you know, this is much more verbose over here.

57
00:03:48,840 --> 00:03:53,000
And so I'm trying to go into leave out the prints and just indicate in blue the instructions

58
00:03:53,000 --> 00:03:54,000
that are deferred.

59
00:03:54,000 --> 00:03:55,520
But I hope you understand what this means.

60
00:03:55,520 --> 00:03:58,240
Everything in red here, of course, is being done in compile time.

61
00:03:58,240 --> 00:04:01,439
So we're calling these code generation functions in compile time.

62
00:04:01,439 --> 00:04:04,719
The print statements are being executed in compile time.

63
00:04:04,719 --> 00:04:09,240
And then we're accumulating somewhere in some data structure or in a file.

64
00:04:09,240 --> 00:04:15,439
And we're calling all the instructions that will be executed at runtime.

65
00:04:15,439 --> 00:04:19,360
So let's think about a possible optimization to this code.

66
00:04:19,360 --> 00:04:23,920
Instead of pushing the result of e1 on the stack, what if we stored the result of e1 in

67
00:04:23,920 --> 00:04:26,000
a temporary register, t1?

68
00:04:26,000 --> 00:04:28,319
What would the code for that look like?

69
00:04:28,319 --> 00:04:34,120
Well, in that world, the generate code for e1 plus e2, what would we do?

70
00:04:34,120 --> 00:04:36,400
We generate code for e1.

71
00:04:36,399 --> 00:04:40,399
And that would be followed now by instead of pushing the result on the stack, we would

72
00:04:40,399 --> 00:04:45,239
take the result of e1, which of course is in the accumulator a0 and we would store it in

73
00:04:45,239 --> 00:04:48,120
a temporary register.

74
00:04:48,120 --> 00:04:53,479
And then we would generate code for e2, and then we followed by the code for e2.

75
00:04:53,479 --> 00:04:54,759
And then we could just do the add.

76
00:04:54,759 --> 00:05:00,399
We would take the result of e2, which is in the accumulator a0, add it to the contents of

77
00:05:00,399 --> 00:05:04,079
t1 and store that into the accumulator a0.

78
00:05:04,079 --> 00:05:07,560
And of course, there's no pushing a popping from the stack here, so this code preserves the

79
00:05:07,560 --> 00:05:08,560
stack.

80
00:05:08,560 --> 00:05:15,279
And it looks like anyway that it actually puts the value of e1 plus e2 into the accumulator.

81
00:05:15,279 --> 00:05:19,199
Unfortunately, this code is incorrect, so this is actually wrong.

82
00:05:19,199 --> 00:05:22,039
And you don't want it to do this.

83
00:05:22,040 --> 00:05:29,040
So, we're going to do a subtraction right here where we do a subtraction instead of an add.

