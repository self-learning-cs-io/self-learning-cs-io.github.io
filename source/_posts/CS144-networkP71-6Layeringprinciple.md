---
title: CS144 NetworkP71 6Layeringprinciple
---

1
00:00:00,000 --> 00:00:06,400
In the last few videos, you see many references to layering, particularly in the video describing the four-layer internet model.

2
00:00:06,400 --> 00:00:12,800
Layering is very, very widely used principle and has been used in networking for decades, predating the internet.

3
00:00:12,800 --> 00:00:17,600
In fact, layering is a design principle used widely outside networking as well.

4
00:00:17,600 --> 00:00:21,800
It's commonly used as a design principle in many, many types of computer system.

5
00:00:21,800 --> 00:00:27,199
There are lots of reasons for layering and we'll explore some of them in this video.

6
00:00:27,199 --> 00:00:33,000
We'll explore what layering is, we'll look at some of the simple examples of layering in communication and computer systems,

7
00:00:33,000 --> 00:00:40,000
and we'll explain why so many systems are layered either by natural happenstance or deliberately by design.

8
00:00:40,000 --> 00:00:43,200
Let's start with a definition of layering.

9
00:00:43,200 --> 00:00:51,000
Layering is the name we give to the organization of a system into a number of separate functional components or layers.

10
00:00:51,000 --> 00:00:55,200
The layers are hierarchical and they communicate sequentially.

11
00:00:55,200 --> 00:01:01,000
In other words, each layer has an interface only to the layer directly above and below.

12
00:01:01,000 --> 00:01:11,200
Each layer provides a well-defined service to the layer above using the services provided by layers below and its own private processing.

13
00:01:11,200 --> 00:01:18,600
There are many examples of layering in everyday life, particularly when one service is deliberately or naturally layered on top of another.

14
00:01:18,599 --> 00:01:26,599
For example, if you're looking for airplane tickets, you might visit a brokerage website such as Google Flites, Hipmunk or Kayak.

15
00:01:26,599 --> 00:01:32,599
These websites let you find tickets across a wide range of airlines by communicating with a single service.

16
00:01:32,599 --> 00:01:37,599
You could instead go to the website of every airline to query what tickets they have available.

17
00:01:37,599 --> 00:01:45,599
The brokerage website is providing you a service layer on top of each airline, abstracting away the details of each airline's website for you.

18
00:01:45,599 --> 00:01:51,199
Now, if we look under the covers of each airline, they fly different types of airplane over different routes.

19
00:01:51,199 --> 00:01:59,599
The airplane takes care of the details of providing the service and offers you the simple abstraction of a ticket valid for a particular flight to take you between two airports.

20
00:01:59,599 --> 00:02:04,599
They're hiding many other details, too, such as how they provide the awful food they serve.

21
00:02:04,599 --> 00:02:09,599
In many cases, they have a number of suppliers to provide meals, drinks, fuel and so on.

22
00:02:09,599 --> 00:02:13,599
Each of those are naturally hidden from us, the consumer.

23
00:02:13,599 --> 00:02:25,599
This separation of concerns allows each layer in the hierarchy to focus on doing its job well and provide a well-defined service to the layer above.

24
00:02:25,599 --> 00:02:32,599
Another well-known example of layering closer to the internet is the postal service.

25
00:02:32,599 --> 00:02:37,599
Imagine that I have a book that I want to send to fill.

26
00:02:37,599 --> 00:02:45,599
At least the book in an envelope, add fills address and mine and then hand it over to Olive to take to the mailbox.

27
00:02:45,599 --> 00:02:57,599
The postal service sorts the mail, then sends it by a variety of different means, airplanes, mail trucks, trains, etc. until it reaches a sorting office near fill.

28
00:02:57,599 --> 00:03:05,599
The mail man delivers the letter to fill who opens it and finds the book inside.

29
00:03:05,599 --> 00:03:15,599
The service is clearly layered. At the top, I don't care how the letters get from me to fill, whether they go by airplane, truck or hovercraft.

30
00:03:15,599 --> 00:03:21,599
And I don't care about the route that the book takes, or how many sorting offices it passes through along the way.

31
00:03:21,599 --> 00:03:28,599
I don't mind whether Olive walks, skips, bicycles or runs to the mailbox. I don't care which mailbox she posts the lettering.

32
00:03:28,599 --> 00:03:35,599
I want the lower layers to abstract away the details for me, providing me with a simple service model.

33
00:03:35,599 --> 00:03:39,599
I put the book in an envelope and the layers below deliver it to fill.

34
00:03:39,599 --> 00:03:46,599
In turn, Olive doesn't need to know how the postal service delivers the letter. She simply communicates with the layer below by posting the letter.

35
00:03:46,599 --> 00:03:49,599
Fill just wants the book.

36
00:03:49,599 --> 00:03:54,599
Notice that each layer communicates only with the layers above and below.

37
00:03:54,599 --> 00:04:01,599
If the postal service deploys new trains, or starts using a different airline freight service, fill and I don't need to know about it.

38
00:04:01,599 --> 00:04:10,599
In other words, because communication is simply up and down with a well-defined interface between layers, we can improve each layer independently over time.

39
00:04:10,599 --> 00:04:17,600
For example, if I want faster guarantee delivery, I could handle the envelope to a carrier such as DHL or FedEx.

40
00:04:17,600 --> 00:04:22,600
The interface is almost the same. I simply give them an envelope and money.

41
00:04:22,600 --> 00:04:29,600
Layering is deliberately designed into many computer systems. When we write programs, this is TY editing a program.

42
00:04:29,600 --> 00:04:37,600
We create source code using a language that abstracts away the details of the operating system, have virtual memory works and have a low-level details of the hardware.

43
00:04:37,600 --> 00:04:46,600
Okay, so C isn't great at hiding the details, but many other languages such as Java and Python deliberately shield us from how the lower layers work.

44
00:04:46,600 --> 00:04:51,600
As a programmer, we communicate with the layer below the compiler by handing it our source code.

45
00:04:51,600 --> 00:05:05,600
The compiler is a self-contained functional component that was responsible for several tasks such as lexical analysis, parsing our code, pre-processing declarations, and code generation is optimization.

46
00:05:05,600 --> 00:05:11,600
The compiler generates object code, which then passes to the linker.

47
00:05:11,600 --> 00:05:17,600
The linker links together the compiled object files and libraries. It generates an executable file.

48
00:05:17,600 --> 00:05:22,600
The CPU, real or virtual, then executes the code.

49
00:05:22,600 --> 00:05:27,600
If you have experienced writing computer programs, the benefits of layering are fairly clear in this example.

50
00:05:27,600 --> 00:05:40,600
Layering breaks down the overall problem of writing programs that execute on hardware into modules or functional components, each with a well-defined role and providing a well-defined service to the layer above.

51
00:05:41,600 --> 00:05:45,600
It also provides a clear separation of concerns.

52
00:05:45,600 --> 00:05:52,600
The compiler can focus on lexical analysis, parsing, and so on. The linker can focus on efficiently piecing objects together.

53
00:05:52,600 --> 00:06:00,600
Neither has to worry about the job of the other, and each can be improved, upgraded and replaced over time as technology and know-how progresses.

54
00:06:01,600 --> 00:06:10,600
For example, we might swap out a commercial C compiler with GCC or vice versa without needing to change the linker or the language we use.

55
00:06:13,600 --> 00:06:27,600
When Nick first drafted the slides, I was excited that he put compilers in as an example of layering, like a great example of both the benefits of layering, as well as how sometimes you need to break layering despite the very negative consequences.

56
00:06:28,600 --> 00:06:34,600
So let's take the C programming language as an example. Generally speaking, a piece of C code can be compiled for almost any processor.

57
00:06:34,600 --> 00:06:45,600
We can take C code like the statement i++ and compile it for an ARM processor and a phone, an x864 processor and a laptop, or a microcontroller and an ultra-modern dishwasher.

58
00:06:45,600 --> 00:06:50,600
In this way, the C code is hardware independent and so it keeps the layer in here.

59
00:06:51,600 --> 00:06:57,600
But sometimes, we need our C code to do something special that only our processor can do.

60
00:06:57,600 --> 00:07:03,600
For example, an x864 processor has all kinds of special instructions that a microcontroller doesn't.

61
00:07:03,600 --> 00:07:08,600
C allows you to include an assembly code directly.

62
00:07:08,600 --> 00:07:14,600
Software like operating system kernels such as linux and windows uses for some of those lowest level implementations.

63
00:07:14,600 --> 00:07:21,600
So layering that C provides hides this detail so it doesn't let you do so directly, but you have to do so to achieve recall.

64
00:07:21,600 --> 00:07:24,600
So OS kernels include assembly code.

65
00:07:24,600 --> 00:07:28,600
Doing so, this means that the code is no longer layer independent.

66
00:07:28,600 --> 00:07:33,600
The linux context switch assembly written for ARM only works for ARM.

67
00:07:33,600 --> 00:07:36,600
So you have to write a version of this code for each layer.

68
00:07:36,600 --> 00:07:42,600
If linux wants to run on a new processor, developers need to write new assembly code for that processor.

69
00:07:43,600 --> 00:07:51,600
So this is a great example because it shows the benefits of layers that separate concerns and simplifiers system, just as programming C is easier than assembly.

70
00:07:51,600 --> 00:07:55,600
But sometimes you have to break the layer boundaries.

71
00:07:55,600 --> 00:07:57,600
Doing so has a huge cost.

72
00:07:57,600 --> 00:08:01,600
Suddenly, you are no longer independent of the lower layer, greatly limiting flexibility.

73
00:08:01,600 --> 00:08:07,600
So sometimes you have to do it, but do so only when you really, really have to.

74
00:08:07,600 --> 00:08:17,600
As we will see, a lot of the practical operational challenges in the internet today result from people breaking layering and assuming things above and below their service interface.

75
00:08:17,600 --> 00:08:25,600
There is a continual tension to improve the internet by making cross layer optimizations and the resulting loss of flexibility.

76
00:08:25,600 --> 00:08:32,600
We will see one really telling example of this with something called NATS or network address translators.

77
00:08:32,600 --> 00:08:39,600
Tremendously useful devices that have unfortunately made it almost impossible to add new transfer per cost to the internet.

78
00:08:39,600 --> 00:08:45,600
So in summary, there are five main reasons we use layering in computer systems.

79
00:08:45,600 --> 00:08:46,600
Modularity.

80
00:08:46,600 --> 00:08:51,600
It breaks down the system into smaller, more manageable modules.

81
00:08:51,600 --> 00:08:56,600
The well-defined service. Each layer provides a well-defined service to the layer above.

82
00:08:56,600 --> 00:08:58,600
Third, reuse.

83
00:08:58,600 --> 00:09:03,600
A layer above can rely on all the hard work put in by others to implement the layers below.

84
00:09:03,600 --> 00:09:07,600
It saves us the time to write each layer whenever we build a new system.

85
00:09:07,600 --> 00:09:09,600
Fourth, separation of concerns.

86
00:09:09,600 --> 00:09:15,600
Each layer can focus on its own job without having to worry about how other layers do theirs.

87
00:09:15,600 --> 00:09:25,600
The only communication is up and down the layers, so it helps keep one layer processing and data local and internal where possible, minimizing the complex interactions between layers.

88
00:09:25,600 --> 00:09:30,600
Fifth, it allows continuous improvement of each function.

89
00:09:30,600 --> 00:09:36,600
A sixth benefit is specific to layered communication systems such as the internet.

90
00:09:36,600 --> 00:09:39,600
That is, peer-to-peer communications.

91
00:09:39,600 --> 00:09:48,600
In the four-layer internet model, we saw how each layer communicates with its peer on another system using the delivery service provided by the layers below.

92
00:09:48,600 --> 00:09:58,600
Similarly, in the male example, Phil and I were communicating with each other as users without worrying about how the communication service works.

