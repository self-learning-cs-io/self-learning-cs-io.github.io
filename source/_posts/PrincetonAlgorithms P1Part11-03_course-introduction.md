---
title: PrincetonAlgorithms P1Part11 03_course Introduction
---

1
00:00:00,000 --> 00:00:07,400
Welcome. I'm Bob Sajwick, Professor of Computer Science at Princeton. This is our online

2
00:00:07,400 --> 00:00:12,519
course, Algorithms, developed by myself and Kevin Wayne here at Princeton. We're going

3
00:00:12,519 --> 00:00:18,240
to start with an overview, a discussion of why you might want to study algorithms, and

4
00:00:18,240 --> 00:00:23,199
then a little bit of discussion about the resources that you need to take this course.

5
00:00:23,199 --> 00:00:28,640
So what is this course? It's an intermediate level survey course on algorithms. We're going

6
00:00:28,640 --> 00:00:34,240
to concentrate on programming and problem solving in the context of real applications.

7
00:00:34,240 --> 00:00:39,880
And our focus is going to be on two things, algorithms, which are methods for solving problems,

8
00:00:39,880 --> 00:00:45,439
and data structures which store the information associated with the problem, and go hands

9
00:00:45,439 --> 00:00:51,920
and hands with algorithms. These are the basic topics that we'll cover in part one and

10
00:00:51,920 --> 00:00:57,799
part two of the course. The first part is data types sorting and searching. We'll consider

11
00:00:57,799 --> 00:01:02,640
a number of data structures and algorithms that are basic to all the methods we consider,

12
00:01:02,640 --> 00:01:08,039
including stacks, queues, bags, and priority queues. Then we'll consider classic algorithms

13
00:01:08,039 --> 00:01:12,200
for sorting, putting things in order. That's quick sort, merge sort, heap sort, and radic

14
00:01:12,200 --> 00:01:18,120
sorts. And we'll consider classic methods for searching, including binary search trees,

15
00:01:18,120 --> 00:01:23,120
red-black binary search trees, and hash tables. The second part of the course is for more

16
00:01:23,120 --> 00:01:28,800
advanced algorithms, including graph algorithms, classic graph searching algorithms, minimum

17
00:01:28,800 --> 00:01:34,520
spanning tree and shortest paths algorithms. Algorithms for processing strings, including

18
00:01:34,520 --> 00:01:41,200
regular expressions and data compression. And then some advanced algorithms that make

19
00:01:41,200 --> 00:01:46,439
use of the basic algorithms that we developed earlier in the course.

20
00:01:46,439 --> 00:01:53,040
So why should one study algorithms? Well, their input impact is very broad and far-reaching.

21
00:01:53,040 --> 00:01:59,360
From the internet to biology to commercial computing, computer graphics, security, multimedia,

22
00:01:59,360 --> 00:02:06,080
social networks, and scientific applications, algorithms are all around us. They're used

23
00:02:06,080 --> 00:02:12,000
for movies and video games, for particle collision simulation. They're used to study the genome

24
00:02:12,000 --> 00:02:17,920
in all manner of other applications. So that's one important reason to study algorithms. Their

25
00:02:17,919 --> 00:02:25,519
impact is broad and far-reaching. Algorithms are also interesting to study because they have

26
00:02:25,519 --> 00:02:31,039
ancient roots. The first algorithm we study goes back to 300 BC, dating at least to Euclid.

27
00:02:31,919 --> 00:02:36,399
The concept of an algorithm was formalized, actually here at Princeton by church and

28
00:02:36,399 --> 00:02:42,479
touring in the 1930s. But most algorithms that we consider were discovered in recent decades.

29
00:02:42,479 --> 00:02:47,199
In fact, some were discovered by undergraduates and a course like this. And there's plenty of

30
00:02:47,199 --> 00:02:53,919
other algorithms waiting to be discovered by students like you. The main reason that people

31
00:02:53,919 --> 00:02:59,359
study algorithms is to be able to solve problems that could not otherwise be addressed.

32
00:03:00,079 --> 00:03:04,719
For example, in the first lecture, we're going to talk about the network connectivity problem,

33
00:03:04,719 --> 00:03:10,560
where the problem is, given a large set of items that are connected together, pairwise,

34
00:03:12,079 --> 00:03:17,120
is there a way to get from one to another with a path through the connections? As you can see,

35
00:03:17,120 --> 00:03:21,920
from this example, it's not clear whether or not there's such a path. We need a computer program

36
00:03:21,920 --> 00:03:28,960
to do it. In fact, we need an efficient algorithm to do it. In this case, the answer is that there is

37
00:03:28,960 --> 00:03:36,800
such a path. Another reason to study algorithms is for intellectual stimulation. Algorithms are

38
00:03:37,599 --> 00:03:44,879
very interesting objects to study. Don Knuth, who wrote several books on algorithms and was a

39
00:03:44,879 --> 00:03:51,359
pioneer in the field, said that an algorithm must be seen to be believed. You can't just think

40
00:03:51,359 --> 00:03:56,639
about an algorithm. You have to work with it. Another quote from Francis Sullivan says the great

41
00:03:56,639 --> 00:04:02,319
algorithms are the poetry of computation. Just like verse, they can be terse, elusive,

42
00:04:02,319 --> 00:04:08,400
dense, and even mysterious. But once unlocked, they cast a brilliant new light on some aspect of

43
00:04:08,400 --> 00:04:16,160
computing. Algorithms are interesting for intellectual stimulation. Another reason many people study

44
00:04:16,160 --> 00:04:22,240
algorithms, and I suspect many of you, is it's necessary to understand good algorithms and

45
00:04:22,240 --> 00:04:28,800
efficient algorithms are good data structures in order to be a proficient programmer. Linus Torvals,

46
00:04:28,800 --> 00:04:34,399
who created Linux, says that the difference between a bad programmer and a good one is whether he

47
00:04:34,399 --> 00:04:40,079
considers his code or his data structure is more important. Bad programmers worry about the code,

48
00:04:40,079 --> 00:04:45,279
good programmers worry about data structures and their relationships, and I might add the algorithms

49
00:04:45,279 --> 00:04:51,359
that process them. Nicholas Wirt, another pioneer in computer science, wrote a famous book called

50
00:04:51,359 --> 00:04:59,759
Algorithms plus data structures equals programs. Another reason nowadays to study algorithms

51
00:05:00,719 --> 00:05:08,639
is that they have become a common language for understanding nature. Algorithms are computational

52
00:05:08,639 --> 00:05:15,439
models and algorithmic models are replacing mathematical models in scientific inquiry. In the 20th

53
00:05:15,439 --> 00:05:22,560
century, scientists develop mathematical models to try to understand natural phenomenon.

54
00:05:23,519 --> 00:05:28,560
It soon became clear that those mathematical models were difficult to solve. It was difficult to

55
00:05:28,560 --> 00:05:36,720
create solutions to be able to test hypotheses against natural phenomena. So more and more and

56
00:05:36,720 --> 00:05:43,280
more nowadays, people are developing computational models where they attempt to simulate what might

57
00:05:43,280 --> 00:05:49,360
be happening in nature in order to try to better understand it. Algorithms play an extremely important

58
00:05:49,360 --> 00:05:56,959
role in this process, and we'll see some examples of this in this course. Another important reason is that

59
00:05:57,599 --> 00:06:04,639
if you know how to effectively use algorithms and data structures, you're going to have a much better

60
00:06:04,639 --> 00:06:09,680
chance at interviewing for a job in the technology industry than if you don't.

61
00:06:11,759 --> 00:06:18,399
So here's a bunch of reasons that I just went through for studying algorithms. Their impacts

62
00:06:18,399 --> 00:06:24,079
brought in far-reaching. They have old roots and present new opportunities. They allow us to solve

63
00:06:24,079 --> 00:06:28,879
problems that could not otherwise be addressed. You can use them for intellectual stimulation to

64
00:06:28,879 --> 00:06:33,759
become a proficient programmer. They might unlock the secrets of life in the universe and they're

65
00:06:33,759 --> 00:06:40,240
good for fun and profit. In fact, a programmer might ask why study anything else. Well, this

66
00:06:40,240 --> 00:06:45,279
plenty of good reasons to study other things, but I'll submit there's no good reason not to study algorithms.

67
00:06:45,679 --> 00:06:54,799
So for this course, we have two resources that I want to talk about and make sure that people are

68
00:06:54,799 --> 00:07:01,759
familiar with before entering into the content. This is a publishing model that Kevin Wayne and I

69
00:07:01,759 --> 00:07:08,319
developed and have been using for many years, and we think it's a very effective way to support the

70
00:07:08,319 --> 00:07:14,399
kinds of lectures that we're going to be giving in this course. Down at the bottom, and it's optional for

71
00:07:14,399 --> 00:07:20,000
this course, we have a textbook. It's a traditional textbook that extensively covers the topics in

72
00:07:20,000 --> 00:07:25,199
the course. In fact, many more topics than we can present in lecture. And then supporting that

73
00:07:25,199 --> 00:07:31,120
textbook is free online material that we call a book site. You can go to books, the book site,

74
00:07:31,120 --> 00:07:37,519
to see the lecture slides, but more important, there's code, there's exercises, there's a great

75
00:07:37,519 --> 00:07:43,279
deal of information there. In fact, maybe 10 times what's in the book, including a summary of the

76
00:07:43,279 --> 00:07:51,039
content. So during this course, you'll be referring to the book site frequently while working online.

77
00:07:54,159 --> 00:08:00,399
People often ask about prerequisites. We're assuming that people who take this course know how to

78
00:08:00,399 --> 00:08:07,199
program, know the basics of loops, arrays, functions. They have some exposure to object-oriented

79
00:08:07,199 --> 00:08:14,479
programming and recursion. We use the Java language, but we don't dwell on details of Java. We

80
00:08:14,479 --> 00:08:22,800
mostly use it as an expository language. We do some math, but not advanced math. If you want to

81
00:08:22,800 --> 00:08:28,959
review the material that we think is prerequisite to the material in this course, you can do a quick

82
00:08:28,959 --> 00:08:37,120
review by looking at sections 1.1 and 1.2 of the book either at the book site or in the textbook.

83
00:08:37,759 --> 00:08:43,439
If you want an in-depth review, we have a full textbook called an introduction to programming in Java,

84
00:08:43,439 --> 00:08:51,199
an interdisciplinary approach. There's a book site and a textbook as well. But the bottom line is

85
00:08:51,199 --> 00:08:56,240
you should be able to program. And the quick exercise to get ready is to write a Java program on

86
00:08:56,240 --> 00:09:02,560
your computer, perhaps using our programming model as described on the book site. We'll provide

87
00:09:02,560 --> 00:09:08,480
much more detailed information on that as we get into the assignments. You can use your own programming

88
00:09:08,480 --> 00:09:13,519
environment if you're comfortable with one or you can download ours. We have instructions on the web

89
00:09:13,519 --> 00:09:15,200
about how to do that.

