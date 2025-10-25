---
title: CS143 P1Week101 01 Introduction Redo Correction
---

1
00:00:00,000 --> 00:00:09,000
Welcome to this course on Compilers. My name is Alex Aiken. I'm a professor here at Stanford University,

2
00:00:09,000 --> 00:00:18,000
and we're going to be talking about the implementation of programming languages.

3
00:00:18,000 --> 00:00:23,000
There are two major approaches to implementing programming languages, compilers and interpreters.

4
00:00:23,000 --> 00:00:31,000
This class is mostly about compilers, but I do want to say a few words about interpreters here in the first lecture.

5
00:00:31,000 --> 00:00:42,000
What does an interpreter do? Well, I'm going to draw a picture here. This box is the interpreter, and it takes, let me label it, with a big i,

6
00:00:42,000 --> 00:00:52,000
it takes as input your program that you wrote, and whatever data that you want to run the program on,

7
00:00:52,000 --> 00:01:02,000
and it produces the output directly, meaning that it doesn't do any processing of the program before it executes it on the input.

8
00:01:02,000 --> 00:01:09,000
So you just write the program, and you invoke the interpreter on the data, and the program immediately begins running.

9
00:01:09,000 --> 00:01:18,000
So we can say that an interpreter is online, meaning the work that it does is all part of running your program.

10
00:01:18,000 --> 00:01:28,000
Now a compiler is structured differently. So we can draw a picture here, which will label with a big c for the compiler,

11
00:01:28,000 --> 00:01:39,000
and the compiler takes as input just your program, and then it produces an executable.

12
00:01:39,000 --> 00:01:49,000
And this executable is another program, might be assembly language, it might be byte code, it could be in any number of different implementation languages.

13
00:01:49,000 --> 00:02:01,000
Now this can be run separately on your data, and that will produce the output.

14
00:02:01,000 --> 00:02:12,000
So in this structure, the compiler is offline, meaning that we pre-process the program first.

15
00:02:12,000 --> 00:02:29,000
The compiler is essentially a pre-processing step that produces the executable, and then we can run that same executable on many, many different inputs on many different data sets without having to recompile or do any other processing of the program.

16
00:02:29,000 --> 00:02:34,000
I think it's helpful to give a little bit of history about how compilers and interpreters were first developed.

17
00:02:34,000 --> 00:02:41,000
So the story begins in the 1950s, and in particular with a machine called the 704, built by IBM.

18
00:02:41,000 --> 00:02:47,000
This was their first commercially successful machine, although there had been some earlier machines that they had tried out.

19
00:02:47,000 --> 00:03:02,000
But anyway, the interesting thing about the 704, once customers started buying it and using it, is that they found that the software costs exceeded the hardware costs, and not just by a little bit, but by a lot.

20
00:03:02,000 --> 00:03:08,000
This is important because the hardware in those days was extremely expensive.

21
00:03:08,000 --> 00:03:22,000
And even then, when hardware costs the most in absolute and relative terms, more than would ever cost again, already the software was the dominant expense in making good use out of computers.

22
00:03:22,000 --> 00:03:34,000
And this led a number of people to think about how they could do a better job of writing software, how they could make programming more productive.

23
00:03:34,000 --> 00:03:43,000
One of the earliest efforts to improve the productivity of programming was called speedcoding, developed in 1953 by John Beckis.

24
00:03:43,000 --> 00:03:52,000
Speedcoding is what we would call today an early example of an interpreter. And like all interpreters, it had some advantages and disadvantages.

25
00:03:52,000 --> 00:04:00,000
The primary advantage was that it was much faster to develop the programs, so in that sense the programmer was much more productive.

26
00:04:00,000 --> 00:04:09,000
But among its disadvantages, code-written speedcode programs were 10 to 20 times slower than handwritten programs.

27
00:04:09,000 --> 00:04:19,000
And that's also true of interpreted programs today. So if you have an implementation that uses an interpreter, typically would be much slower than either a compiler or writing code by hand.

28
00:04:19,000 --> 00:04:31,000
And also the speedcode interpreter took up 300 bytes of memory. And that doesn't seem like very much. In fact, 300 bytes today would seem like an incredibly tiny program.

29
00:04:31,000 --> 00:04:46,000
But in those days you had to keep in mind that this was 30% of the memory on the machine. So this was 30% of the entire memory of the 704. And so the amount of space that the interpreter took up was itself a concern.

30
00:04:46,000 --> 00:04:53,000
Now speedcoding did not become popular, but John Beckis thought it was promising, and it gave him an idea for another project.

31
00:04:53,000 --> 00:05:04,000
The most important applications in those days were scientific computations. And programmers thought in terms of writing down formulas in a form that the machine could execute.

32
00:05:05,000 --> 00:05:26,000
John thought that the problem with speedcoding was that the formulas were in fact interpreted. And he thought if first the formulas were translated into a form that the machine could execute directly, that the code would be faster, and while still allowing the programmer to write the programs at a high level.

33
00:05:26,000 --> 00:05:33,000
And thus was the formula translation project or Fortran project born.

34
00:05:33,000 --> 00:05:50,000
Now Fortran ran from 1954 to 1957. And interestingly, they thought it would only take them one year to build the compiler, but it wound up taking three. So just like today, they weren't very good at predicting how long software projects would take.

35
00:05:50,000 --> 00:06:02,000
But it was a very successful project. By 1958, over 50% of all code was written in Fortran. So 50% of programs were in Fortran.

36
00:06:02,000 --> 00:06:23,000
And that is very rapid adoption of a new technology. We would be happy with that kind of success today. And of course, at that time, they were ecstatic. And everybody thought that Fortran both raised a level of abstraction, improved program productivity, and allowed everyone to make much better use of these machines.

37
00:06:23,000 --> 00:06:41,000
So Fortran one was the first successful high level language and had a huge impact on computer science. In particular, it led to an enormous body of theoretical work. And one of the interesting things about programming languages actually is the combination of theory and practice.

38
00:06:41,000 --> 00:07:00,000
Because it's not really possible in programming languages to do a good job without having both a very good grasp of fairly deep theory and also good engineering skills. There's a lot of very good systems building material in programming languages and typically involves a very subtle and fruitful interaction with theory.

39
00:07:00,000 --> 00:07:06,000
And this is one of the things I think that's most attractive about the areas of subject of study in computer science.

40
00:07:06,000 --> 00:07:24,000
And the impact of Fortran was not just on computer science research, of course, but also on the development of practical compilers. And in fact, its influence was so profound that today, modern compilers still preserve the outlines of Fortran one.

41
00:07:25,000 --> 00:07:53,000
So what was the structure of Fortran one? Well, it consists of five phases, lexical analysis and parsing, which together take care of these syntactic aspects of the language, semantic analysis, which of course takes care of more semantic aspects, things like types and scope rules, optimization, which is a collection of transformations on the program to either make it run faster or use less memory.

42
00:07:54,000 --> 00:08:11,000
And finally, code generation, which actually does the translation to another language. And depending on our goals, that translation might be to machine code, it might be to a byte code for a virtual machine, or it might even be to another high level programming language.

43
00:08:11,000 --> 00:08:20,000
Well, that's it for this lecture. And next time we'll pick up here and talk about these five phases in more detail.

