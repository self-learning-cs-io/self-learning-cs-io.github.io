---
title: CS143 P86Week712 03 B+Code+Generation+II
---

1
00:00:00,000 --> 00:00:08,000
So to summarize the main points, one very important thing is that the activation record has to be designed together with the code generation.

2
00:00:08,000 --> 00:00:11,000
So you have to do these things at the same time.

3
00:00:11,000 --> 00:00:21,000
You can't just design the activation record without thinking about what code you're going to generate and you can't just think about generating code without making some decisions about where the data that is going to be lived.

4
00:00:21,000 --> 00:00:26,000
So the code and the data manipulates have to be designed simultaneously.

5
00:00:26,000 --> 00:00:48,000
Code generation can be done by a recursive traversal of the abstract syntax tree. So just like type checking code generation can be expressed as a recursive tree walk and that's a very handy way to think about code generation because it allows you to think about one case of the time without having to get mixed up thinking about all the different constructs at one time.

6
00:00:49,000 --> 00:00:55,000
And finally, I recommend that you use a stack machine for your compiler.

7
00:00:55,000 --> 00:01:05,000
So if you're implementing a course project, the stack machine is the simplest discipline and it gives you a nice framework for think for breaking up the problem into manageable pieces.

8
00:01:05,000 --> 00:01:13,000
And because of that simplicity, I think it's a really good way to learn about writing compilers.

9
00:01:13,000 --> 00:01:25,000
Now it is important to realize that production compilers do do some different things. They're not quite as simple as the stack machine code generation that we have outlined in the last few videos.

10
00:01:25,000 --> 00:01:41,000
So the main differences or the main difference is that the big emphasis in a production compiler is on keeping values and registers is much more efficient to do operations out of registers than to be saving and loading values from the stack.

11
00:01:41,000 --> 00:01:51,000
And so especially the values and the current activation record, a current stack frame, a production compiler would try to keep those in registers instead of on the stack.

12
00:01:51,000 --> 00:02:04,000
And also typically a production compiler to the extent that it has to use temporary in the activation record, these would be laid out directly in the activation record, not pushed and popped from the stack.

13
00:02:04,000 --> 00:02:14,000
That means they'd be assigned pre-assigned locations in the activation record, just like the function arguments in the simple language we looked at are assigned fixed positions in the activation record.

14
00:02:14,000 --> 00:02:23,000
So those temporary values would also be assigned fixed positions so you could save the trouble of manipulating the stack pointer.

