---
title: CS143 P75Week611 01 Runtime Organization
---

1
00:00:00,000 --> 00:00:07,000
In this video, we're going to begin our discussion of runtime systems.

2
00:00:07,000 --> 00:00:17,000
Now, at this point, we've actually covered the entire front end of the compiler,

3
00:00:17,000 --> 00:00:22,000
which consists of the three phases, lexical analysis, parsing, and semantic analysis.

4
00:00:22,000 --> 00:00:29,000
And these three phases together, their job is to really enforce the language

5
00:00:29,000 --> 00:00:34,000
semantics, or the language definition.

6
00:00:34,000 --> 00:00:42,000
So, we know, after these three phases are done, that if no errors have been generated

7
00:00:42,000 --> 00:00:46,000
by any one of those phases, then the program is actually a valid program

8
00:00:46,000 --> 00:00:50,000
in the programming language that we're compiling. And at this point, the compiler is

9
00:00:50,000 --> 00:00:55,000
going to be able to produce code, to produce a translation of the program that you can

10
00:00:55,000 --> 00:01:00,000
actually execute. And I should say that, of course, enforcing a language definition

11
00:01:00,000 --> 00:01:05,000
is just one purpose of the front end. The front end also builds the data structures

12
00:01:05,000 --> 00:01:10,000
that are needed to do code generation, as we've seen. But there is a real change

13
00:01:10,000 --> 00:01:14,000
that once we get through the front end, we're no longer looking for errors in the program,

14
00:01:14,000 --> 00:01:18,000
we're no longer trying to figure out whether it's a valid program. Now, we're really

15
00:01:18,000 --> 00:01:24,000
down to the point where we're going to generate code. And that is the job at the back end.

16
00:01:24,000 --> 00:01:28,000
So, code generation is certainly part of it. The other big part of the back end is

17
00:01:28,000 --> 00:01:33,000
a program optimization, so doing transformations to improve the program.

18
00:01:33,000 --> 00:01:37,000
But before, we can talk about either one of those things we need to talk about

19
00:01:37,000 --> 00:01:43,000
runtime organization. And why is that? Well, because we need to understand

20
00:01:43,000 --> 00:01:48,000
what it is we're trying to generate before we can talk about how we generate it

21
00:01:48,000 --> 00:01:51,000
and have that make sense. So, first, we're going to talk about what the

22
00:01:51,000 --> 00:01:55,000
translated program looks like and how it's organized. And then we'll talk about

23
00:01:55,000 --> 00:02:00,000
algorithms, code generation algorithms for actually producing those things. And this is a

24
00:02:00,000 --> 00:02:04,000
well-understood area, at least there are some very standard techniques that are widely used.

25
00:02:04,000 --> 00:02:10,000
And those are the ones we're going to cover and encourage you to use in your project.

26
00:02:10,000 --> 00:02:17,000
The main thing we're going to cover in this sequence of videos is the management of

27
00:02:17,000 --> 00:02:22,000
runtime resources. And in particular, I'm going to be stressing the correspondence

28
00:02:22,000 --> 00:02:28,000
and the distinction between static and dynamic structures. So, static structures are

29
00:02:28,000 --> 00:02:33,000
things that exist at compile time and dynamic structures are those are the things that exist

30
00:02:33,000 --> 00:02:41,000
or happen at runtime. And this is probably the most important distinction for you to

31
00:02:41,000 --> 00:02:45,000
try to understand if you really want to understand how a compiler works.

32
00:02:45,000 --> 00:02:50,000
What happens at compile time and what happens at runtime? And having a clear

33
00:02:50,000 --> 00:02:55,000
separation in your mind between what is done by the compiler and what is deferred to

34
00:02:55,000 --> 00:03:00,000
when the target program or the generated program actually runs, that is key to

35
00:03:00,000 --> 00:03:06,000
really understanding how compilers work. And we'll also be talking about storage

36
00:03:06,000 --> 00:03:11,000
organizations, so how memory is used to store the data structures of the executing

37
00:03:11,000 --> 00:03:19,000
program. So let's begin at the beginning. So initially, there is the operating system.

38
00:03:19,000 --> 00:03:24,000
And the operating system is the only thing that is running on the machine. And when a

39
00:03:24,000 --> 00:03:28,000
program is invoked, when the user says he wants to run a program, what happens?

40
00:03:28,000 --> 00:03:33,000
Well, the operating system is going to allocate space for the program. The code for

41
00:03:33,000 --> 00:03:38,000
the program is going to be loaded into that space. And then the operating system is

42
00:03:38,000 --> 00:03:43,000
going to execute a jump to the entry point or the main function of the program.

43
00:03:43,000 --> 00:03:48,000
And then your program will be off and running.

44
00:03:48,000 --> 00:03:53,000
So let's take a look at what the organization of memory looks like very roughly when the

45
00:03:53,000 --> 00:03:59,000
operating system begins execution of a compiled program. So we're going to draw pictures

46
00:03:59,000 --> 00:04:04,000
of memory like this. There'll be just a big block and there'll be a starting address

47
00:04:04,000 --> 00:04:10,000
at the low address and a high address. And this is all the memory that is allocated to your

48
00:04:10,000 --> 00:04:16,000
program. Now into some portion of that space goes the code for the program. So the actual

49
00:04:16,000 --> 00:04:23,000
compiled code for the program is loaded usually at one end of the memory space allocated to the

50
00:04:23,000 --> 00:04:28,000
program. And then there's a bunch of other space that's going to be used for other

51
00:04:28,000 --> 00:04:35,000
things. And we'll talk about that in a minute. Before going on, I want to say a few words

52
00:04:35,000 --> 00:04:40,000
about these pictures of runtime organization because I'm going to be drawing a lot of them

53
00:04:40,000 --> 00:04:47,000
over the next few videos. So it's just traditional to have memory drawn as a rectangle with the

54
00:04:47,000 --> 00:04:52,000
low address at the top and the high address at the bottom. There's nothing magic about that.

55
00:04:52,000 --> 00:04:56,000
It's just a convention we could just as easily have reversed the order of the addresses.

56
00:04:56,000 --> 00:05:00,000
It's no big deal. And then we'll be drawing lines to

57
00:05:00,000 --> 00:05:06,000
delete different regions of this memory showing different kinds of data and how they're stored

58
00:05:06,000 --> 00:05:12,000
in the memory allocated to the program. And clearly these pictures are simplifications.

59
00:05:12,000 --> 00:05:18,000
If this is a virtual memory system, for example, there's no guarantee that this data is actually

60
00:05:18,000 --> 00:05:25,000
laid out continuously. But it helps to understand what the different kinds of data are and

61
00:05:25,000 --> 00:05:32,000
what the compiler needs to do with them to have simple pictures like this.

62
00:05:32,000 --> 00:05:39,000
So coming back to our picture of runtime organization, we have some block of memory and

63
00:05:39,000 --> 00:05:44,000
the first portion of that is occupied by the actual generated code for the program.

64
00:05:44,000 --> 00:05:49,000
And then there was this other space. And what goes in that space? Well, what goes in that space is the

65
00:05:49,000 --> 00:05:55,000
data for the program. So all the data is in the rest of this space.

66
00:05:55,000 --> 00:06:00,000
And the tricky thing about code generation is that the compiler is responsible for generating the

67
00:06:00,000 --> 00:06:06,000
code, but it's also responsible for orchestrating the data. So the compiler has to decide what the

68
00:06:06,000 --> 00:06:11,000
layout of the data is going to be and then generate code that correctly manipulates that data.

69
00:06:11,000 --> 00:06:17,000
So there are references, of course, in the code to the data. And the code and the data need to be

70
00:06:17,000 --> 00:06:23,000
designed, the code and the layout of the data, excuse me, need to be designed together so that the

71
00:06:23,000 --> 00:06:29,000
generator program will function correctly. Now it turns out that there's actually more than one

72
00:06:29,000 --> 00:06:35,000
kind of data that the compiler is going to be interested in. And what we'll be talking about in the

73
00:06:35,000 --> 00:06:41,000
next video is the different kinds of data and the different distinctions between kinds of data that go in this data

74
00:06:41,000 --> 00:06:44,000
area.

