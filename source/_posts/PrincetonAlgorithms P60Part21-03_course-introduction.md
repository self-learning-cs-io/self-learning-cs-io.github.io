---
title: PrincetonAlgorithms P60Part21 03_course Introduction
---

1
00:00:00,000 --> 00:00:07,440
Welcome. I'm Bob Sedgwick, Professor of Computer Science at Princeton. This is our online

2
00:00:07,440 --> 00:00:12,519
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
00:00:34,240 --> 00:00:39,920
And our focus is going to be on two things, algorithms, which are methods for solving problems,

8
00:00:39,920 --> 00:00:45,439
and data structures which store the information associated with the problem, and go hands

9
00:00:45,439 --> 00:00:51,920
and hands with algorithms. These are the basic topics that we'll cover in part one and

10
00:00:51,920 --> 00:00:57,840
part two of the course. The first part is data types sorting and searching. We'll consider

11
00:00:57,840 --> 00:01:02,480
a number of data structures and algorithms that are basic to all the methods we consider,

12
00:01:02,480 --> 00:01:08,079
including stacks, queues, bags, and priority queues. Then we'll consider classic algorithms

13
00:01:08,079 --> 00:01:12,240
for sorting, putting things in order. That's quick sort, merge sort, heap sort, and radic

14
00:01:12,240 --> 00:01:18,000
sorts. And we'll consider classic methods for searching, including binary search trees,

15
00:01:18,000 --> 00:01:23,760
red-black binary search trees, and hash tables. The second part of the course is for more advanced

16
00:01:23,760 --> 00:01:29,359
algorithms, including graph algorithms, classic graph searching algorithms, minimum spanning

17
00:01:29,359 --> 00:01:35,680
tree and shortest paths algorithms. Algorithms for processing strings, including regular expressions

18
00:01:36,480 --> 00:01:42,800
and data compression. And then some advanced algorithms that make use of the basic algorithms

19
00:01:42,800 --> 00:01:50,160
that we developed earlier in the course. So why should one study algorithms? Well, their input

20
00:01:50,239 --> 00:01:56,959
impact is very broad and far-reaching. From the internet to biology to commercial computing,

21
00:01:56,959 --> 00:02:02,879
computer graphics, security, multimedia, social networks, and scientific applications,

22
00:02:02,879 --> 00:02:08,960
algorithms are all around us. They're used for movies and video games, for particle collision

23
00:02:08,960 --> 00:02:15,759
simulation. They're used to study the genome in all manner of other applications. So that's one

24
00:02:15,759 --> 00:02:19,759
important reason to study algorithms. Their impact is broad and far-reaching.

25
00:02:21,439 --> 00:02:27,759
Algorithms are also interesting to study because they have ancient roots. The first algorithm we

26
00:02:27,759 --> 00:02:34,719
study goes back to 300 BC, dating at least to Euclid. The concept of an algorithm was formalized,

27
00:02:34,719 --> 00:02:40,719
actually here at Princeton, by church and touring in the 1930s. But most algorithms that we consider

28
00:02:40,719 --> 00:02:45,439
were discovered in recent decades. In fact, some were discovered by undergraduates and a course

29
00:02:45,759 --> 00:02:50,159
like this. And there's plenty of other algorithms waiting to be discovered by students like you.

30
00:02:52,639 --> 00:02:58,079
The main reason that people study algorithms is to be able to solve problems that it could not

31
00:02:58,079 --> 00:03:03,120
otherwise be addressed. For example, in the first lecture, we're going to talk about the network

32
00:03:03,120 --> 00:03:09,919
connectivity problem, where the problem is, given a large set of items that are connected together,

33
00:03:09,919 --> 00:03:15,839
pairwise, is there a way to get from one to another with a path through the connections?

34
00:03:16,479 --> 00:03:21,119
As you can see from this example, it's not clear whether or not there's such a path. We need a

35
00:03:21,119 --> 00:03:28,079
computer program to do it. In fact, we need an efficient algorithm to do it. In this case, the

36
00:03:28,079 --> 00:03:34,879
answer is that there is such a path. Another reason to study algorithms is for intellectual stimulation.

37
00:03:35,039 --> 00:03:44,639
Algorithms are very interesting objects to study. Don Canouf, who wrote several books on algorithms and

38
00:03:44,639 --> 00:03:51,439
was a pioneer in the field, said that an algorithm must be seen to be believed. You can't just think

39
00:03:51,439 --> 00:03:56,719
about an algorithm, you have to work with it. Another quote from Francis Sullivan says the great

40
00:03:56,719 --> 00:04:03,039
algorithms are the poetry of computation. Just like verse, they can be terse, elusive, dense, and even

41
00:04:03,039 --> 00:04:09,039
mysterious. But once unlocked, they cast a brilliant new light on some aspect of computing.

42
00:04:09,759 --> 00:04:12,560
Algorithms are interesting for intellectual stimulation.

43
00:04:14,560 --> 00:04:20,159
Another reason many people study algorithms, and I suspect many of you, is it's necessary to

44
00:04:20,159 --> 00:04:25,360
understand good algorithms and efficient algorithms are good data structures in order to be a

45
00:04:25,360 --> 00:04:31,920
proficient programmer. Linus Torvall, who created Linux, says that the difference between a

46
00:04:31,920 --> 00:04:37,280
bad programmer and a good one is whether he considers his code or his data structure is more important.

47
00:04:37,840 --> 00:04:42,640
Bad programmers worry about the code, good programmers worry about data structures and their

48
00:04:42,640 --> 00:04:49,040
relationships, and I might add the algorithms that process them. Nicholas Wirt, another pioneer

49
00:04:49,040 --> 00:04:54,480
in computer science, wrote a famous book called Algorithms plus data structures equals programs.

50
00:04:54,480 --> 00:05:04,319
Another reason nowadays to study algorithms is that they have become a common language for

51
00:05:04,319 --> 00:05:11,759
understanding nature. Algorithms are computational models and algorithmic models are replacing

52
00:05:11,759 --> 00:05:19,280
mathematical models in scientific inquiry. In the 20th century, scientists develop mathematical

53
00:05:19,279 --> 00:05:26,399
models to try to understand natural phenomena. It soon became clear that those mathematical models

54
00:05:26,399 --> 00:05:32,719
were difficult to solve. It was difficult to create solutions to be able to test hypotheses

55
00:05:32,719 --> 00:05:39,679
against natural phenomena. So more and more and more nowadays, people are developing computational

56
00:05:39,679 --> 00:05:45,599
models where they attempt to simulate what might be happening in nature in order to try to better

57
00:05:45,600 --> 00:05:51,840
understand it. Algorithms play an extremely important role in this process, and we'll see some

58
00:05:51,840 --> 00:06:00,879
examples of this in this course. Another important reason is that if you know how to effectively use

59
00:06:00,879 --> 00:06:07,200
algorithms and data structures, you're going to have a much better chance at interviewing for a job

60
00:06:07,200 --> 00:06:15,200
in the technology industry than if you don't. So here's a bunch of reasons that I just went

61
00:06:15,599 --> 00:06:21,279
through for studying algorithms. Their impact is broad and far-reaching. They have old roots and

62
00:06:21,279 --> 00:06:26,639
present new opportunities. They allow us to solve problems that could not otherwise be addressed.

63
00:06:26,639 --> 00:06:31,599
You can use them for intellectual stimulation to become a proficient programmer. They might unlock

64
00:06:31,599 --> 00:06:37,279
the secrets of life in the universe and they're good for fun and profit. In fact, a programmer might

65
00:06:37,279 --> 00:06:42,560
ask why study anything else? Well, there's plenty of good reasons to study other things, but I'll

66
00:06:42,560 --> 00:06:52,399
submit there's no good reason not to study algorithms. So for this course, we have two resources that

67
00:06:52,399 --> 00:06:57,519
I want to talk about and make sure that people are familiar with before entering into the content.

68
00:06:58,800 --> 00:07:04,560
This is a publishing model that Kevin Wayne and I developed and have been using for many years,

69
00:07:04,560 --> 00:07:10,560
and we think it's a very effective way to support the kinds of lectures that we're going to be giving

70
00:07:10,560 --> 00:07:16,160
in this course. Down at the bottom, and it's optional for this course, we have a textbook. It's a

71
00:07:16,160 --> 00:07:21,759
traditional textbook that extensively covers the topics in the course. In fact, many more topics

72
00:07:21,759 --> 00:07:27,759
than we can present in lecture. And then supporting that textbook is free online material that we

73
00:07:27,759 --> 00:07:34,000
call the book site. You can go to the book site to see the lecture slides, but more important,

74
00:07:34,000 --> 00:07:40,240
there's code, there's exercises, there's a great deal of information there. In fact, maybe 10 times

75
00:07:40,319 --> 00:07:47,840
what's in the book, including a summary of the content. So during this course, you'll be referring

76
00:07:47,840 --> 00:07:57,840
to the book site frequently while working online. People often ask about prerequisites. We're

77
00:07:57,840 --> 00:08:03,280
assuming that people who take this course know how to program, know the basics of loops, arrays,

78
00:08:03,279 --> 00:08:11,039
functions. They have some exposure to object-oriented programming and recursion. We use the Java language,

79
00:08:11,039 --> 00:08:18,879
but we don't dwell on details of Java. We mostly use it as an expository language. We do some math,

80
00:08:18,879 --> 00:08:26,559
but not advanced math. If you want to review the material that we think is prerequisite to the

81
00:08:26,560 --> 00:08:33,519
material in this course, you can do a quick review by looking at sections 1.1 and 1.2 of the book,

82
00:08:34,480 --> 00:08:40,399
either at the book site or in the textbook. If you want an in-depth review, we have a full

83
00:08:40,399 --> 00:08:46,559
textbook called an introduction to programming in Java, an interdisciplinary approach. There's a

84
00:08:46,559 --> 00:08:52,879
book site and a textbook as well. But the bottom line is you should be able to program, and the

85
00:08:52,879 --> 00:08:59,279
quick exercise to get ready is to write a Java program on your computer, perhaps using our programming

86
00:08:59,279 --> 00:09:05,360
model as described on the book site. We'll provide much more detailed information on that as we get

87
00:09:05,360 --> 00:09:10,240
into the assignments. You can use your own programming environment if you're comfortable with one

88
00:09:10,240 --> 00:09:15,120
or you can download ours. We have instructions on the web about how to do that.

