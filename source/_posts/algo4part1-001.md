---
title: 算法 第一部分 001 概述
date: 2025-10-13 10:00:26
---

![](/images/algo4-p1-001.png)



发言人   00:02
Welcome I'm Bob Sedgwick, professor of computer science at Princeton. This is our online course algorithms developed by myself and Kevin Wayne here at Princeton. We're going to start with an overview, a discussion of why you might want to study algorithms, and then a little bit of discussion about the resources that you need to take this course. 
欢迎，我是普林斯顿大学计算机科学教授Bob Sedgwick。这是我和Kevin Wayne在普林斯顿开发的在线算法课程。我们将从概述开始，讨论为什么你可能想学习算法，然后稍微讨论一下你需要学习这门课程的资源。

发言人   00:22
So what is this course? It's an intermediate level survey course on algorithms. We're going to concentrate on programming and problem solving in the context of real applications, and our focus is going to be on two things, algorithms, which are methods for solving problems and data structures, which store the information associated with the problem and go hands in hand with algorithms. 
那么这门课程是什么？这是一门关于算法的中级调查课程。我们将专注于实际应用环境中的编程和问题解决，重点将放在两件事情上: 算法，即解决问题的方法和数据结构，它们存储与问题相关的信息，并与算法密切相关。


![](/images/algo4-p1-002.png)

发言人   00:49
These are the basic topics that we'll cover in part 1 and part two of the course. The first part is data types, sorting and searching. We'll consider a number of data structures and algorithms that are basic to all the methods we consider, including stacks, queues, bags, and priority queues. Then we'll consider classic algorithms for sorting, putting things in order that's quick, sort, merge sort, heap sort, and radix sorts. And we'll consider classic methods for searching, including binary search trees, red, black, binary search trees, and hash tables. The second part of the course is for more advanced algorithms, including graph algorithms, classic graph searching algorithms, minimum spanning tree, and shortest paths algorithms, algorithms for processing strings, including regular expressions and data compression, and then some advanced algorithms that make use of the basic algorithms that we developed earlier in the course. 
这些是我们将在课程的第一部分和第二部分中涵盖的基本主题。第一部分是数据类型、排序和搜索。我们将考虑许多数据结构和算法，它们是我们所考虑的所有方法的基础，包括堆栈、队列、包和优先级队列。然后，我们将考虑经典的排序算法，将事物按快速排序、合并排序、堆排序和基数排序。我们将考虑经典的搜索方法，包括二叉搜索树、红色、黑色、二叉搜索树和哈希表。课程的第二部分是更高级的算法，包括图形算法，经典图形搜索算法，最小生成树和最短路径算法，处理字符串的算法，包括正则表达式和数据压缩，然后是一些高级算法，这些算法利用了我们在课程早期开发的基本算法。


发言人   01:46
So why should one study algorithms? Well, their input impact is very broad and far reaching from the internet to biology to commercial computing, computer graphics, security, multimedia, social network networks, and scientific applications. Algorithms are all around us. They're used for movies and video games, for particle collision simulation. They're used to study the genome in all manner of other applications. So that's one important reason to study algorithms. Their impact is broad and far reaching. 
那么为什么要研究算法呢？它们的输入影响非常广泛和深远，从互联网到生物学，到商业计算、计算机图形学、安全、多媒体、社交网络和科学应用。算法就在我们身边。它们用于电影和视频游戏，用于粒子碰撞模拟。它们被用于在所有其他应用中研究基因组。所以这是研究算法的一个重要原因。其影响广泛而深远。

发言人   02:21
Algorithms are also interesting to study because they have ancient roots. The first algorithm we study goes back to 300 BC, dating at least to Euclid. The concept of an algorithm was formalized actually here at Princeton by church in Turing in the 1930s. But most algorithms that we consider were discovered in recent decades. In fact, some were discovered by undergraduates in a course course like this. And there's plenty of other algorithms waiting to be discovered by students like you. 
算法的研究也很有趣，因为它们有古老的根源。我们研究的第一个算法可以追溯到公元前300年，至少可以追溯到欧几里得。算法的概念实际上是在20世纪30年代由图灵的教堂在普林斯顿正式提出的。但我们认为的大多数算法都是在近几十年中发现的。事实上，有些是由本科生在这样的课程中发现的。还有很多其他的算法等待像你这样的学生去发现。

发言人   02:52
The main reason that people study algorithms is to be able to solve problems that could not otherwise be addressed. For example, in the first lecture, we're going to talk about the network connectivity problem, where the problem is given a large set of items that are connected together pair wise, is there a way to get from one to another with a path through the connections? As you can see from this example, it's not clear whether or not there's such a path. We need a computer program to do it. In fact, we need an efficient algorithm to do it. In this case, the answer is that there is such a path, another reason to study algorithms is for intellectual stimulation. 
人们学习算法的主要原因是能够解决否则无法解决的问题。例如，在第一堂课中，我们将讨论网络连通性问题，其中问题是给定一组成对连接在一起的项目，是否有一种方法可以通过连接路径从一个连接到另一个？正如你从这个例子中看到的，并不清楚是否有这样的路径。我们需要一个计算机程序来做这件事。实际上，我们需要一种高效的算法来做到这一点。在这种情况下，答案是存在这样一条路径，研究算法的另一个原因是为了智力刺激。


![](/images/algo4-p1-003.png)


发言人   03:36
Algorithms are very interesting objects to study. Don Knuth, who wrote several books on algorithms and was a pioneer in the field, said that an algorithm must be seen to be believed. You can't just think about an algorithm, you have to work with it. Another quote from Francis Sullivan says the great algorithms are the poetry of computation, just like verse, they can be turfs, elusive, dense, and even mysterious. But once unlocked, they cast a brilliant new light on some aspect of computing. 
算法是非常有趣的研究对象。Don Knuth写了几本关于算法的书，是该领域的先驱，他说算法必须被视为可信。你不能只考虑算法，你必须使用它。弗朗西斯·沙利文的另一句名言说，伟大的算法是计算的诗歌，就像诗歌一样，它们可以草皮、难以捉摸、密集，甚至神秘。但一旦解锁，它们就为计算的某些方面带来了全新的光芒。

![](/images/algo4-p1-004.png)

![](/images/algo4-p1-005.png)


发言人   04:09
Algorithms are interesting for intellectual stimulation, another reason many people study algorithms, and I suspect many of you, is it's necessary to understand good algorithms and efficient algorithms and good data structures in order to be a proficient programmer. Lin torvosaurus Linux says that the difference between a bad programmer and a good one is whether he considers his code or his data structures more important. Bad programmers worry about the code. Good programmers worry about data structures and their relationships. And I might add, the algorithms that process them. Nicholas Werth, another pioneer in computer science, wrote a famous book called Algorithms Plus Data Structures Equals Programs. 
算法对于智力刺激来说很有趣，这是许多人学习算法的另一个原因，我怀疑你们中的许多人，就是为了成为一名熟练的程序员，有必要理解好的算法、高效的算法和良好的数据结构。Lintorvosaurus Linux说，一个好程序员和一个坏程序员之间的区别在于他是否认为他的代码或他的数据结构更重要。糟糕的程序员担心代码。优秀的程序员关心数据结构及其关系。我可以补充一下，处理它们的算法。计算机科学的另一位先驱尼古拉斯·沃斯写了一本名著《算法加数据结构等于程序》。


![](/images/algo4-p1-006.png)

![](/images/algo4-p1-007.png)

![](/images/algo4-p1-008.png)


发言人   04:57
Another reason nowadays to study algorithms is that they have become a common language for understanding nature. Algorithms are computational models, and algorithmic models are replacing mathematical models in scientific inquiry. In the 20th century, scientists developed mathematical models to try to understand natural phenomenon. It soon became clear that those mathematical models were difficult to solve. It was difficult to create solutions, to be able to test hypotheses against natural phenomena. So more and more and more nowadays, people are developing computational models where they attempt to simulate what might be happening in nature in order to try to better understand it. 
现在研究算法的另一个原因是它们已经成为理解自然的通用语言。算法是计算模型，而算法模型正在取代科学探究中的数学模型。在20世纪，科学家开发了数学模型来试图理解自然现象。很快就发现这些数学模型很难解决。很难创造解决方案，很难能够根据自然现象测试假设。因此，现在越来越多的人正在开发计算模型，试图模拟自然界中可能发生的事情，以便更好地理解它。

发言人   05:47
Algorithms play an extremely important role in this process, and we'll see some examples of this in this course. Another important reason is that if, you know affect how to effectively use algorithms and data structures, you're going to have a much better chance at interviewing for a job in the technology industry than if you don't. 
算法在这个过程中扮演着极其重要的角色，我们将在本课程中看到一些这样的例子。另一个重要的原因是，如果你知道如何有效地使用算法和数据结构，那么你在技术行业面试的机会要比没有知道的机会大得多。

![](/images/algo4-p1-009.png)


发言人   06:11
So here's a bunch of reasons that I just went through for studying algorithms that impacts broad and far reaching. They have old roots and present new opportunities. They allow us to solve problems that could not otherwise be addressed. You can use them for intellectual stimulation to become a proficient programmer. They might unlock the secrets of life in the universe, and they're good for fun and profit. In fact, a programmer might ask, why study anything else? Well, there's plenty of good reasons to study other things, but I'll submit there's no good reason not to study algorithms. 
所以，我刚刚经历了一堆原因来研究影响广泛而深远的算法。他们有着古老的根源，同时也带来了新的机会。它们使我们能够解决否则无法解决的问题。你可以用它们来刺激智力，成为一名熟练的程序员。它们可能会揭开宇宙中生命的秘密，而且它们既有趣又有利可图。事实上，程序员可能会问，为什么还要学习其他东西呢？有很多很好的理由去研究其他的事情，但我认为没有很好的理由不去研究算法。

发言人   06:48
So for this course, we have two resources that I want to talk about and make sure that people are familiar with before entering into the content. This is a publishing model that Kevin Wayne and I developed and have been using for many years. And we think it's a very effective way to support the kinds of lectures that we're going to be giving in this course down at the bottom. 
因此，对于本课程，我想谈论两个资源，并确保在进入内容之前人们熟悉它们。这是我和Kevin Wayne开发并使用多年的一种出版模式。我们认为这是一种非常有效的方式，可以支持我们将在本课程底部进行的各种讲座。

发言人   07:13
And it's optional for this course, we have a textbook. It's a traditional textbook that extensively covers the topics in the course. In fact, many more topics than we can present in lecture. And then supporting that textbook is free online material that we call the site. You can go to the book site to see the lecture slides. But more important, there's code, there's exercises, there's a great deal of information there. In fact, maybe 10 times what's in the book, including a summary of the content. So during this course, you'll be referring to the book site frequently while working online. 
这门课程是可选的，我们有一本教科书。这是一本传统教科书，广泛涵盖了课程中的主题。事实上，比我们在讲座中展示的主题要多得多。然后，支持该教科书的是我们称之为网站的免费在线材料。你可以去读书网站查看演讲幻灯片。但更重要的是，有代码，有练习，那里有大量的信息。实际上，可能是书中的10倍，包括内容摘要。因此，在本课程中，您将在在线工作时经常参考书籍网站。

发言人   07:54
People often ask about prerequisites. We're assuming that people who take this course know how to program. They know the basics of loops, arrays, functions. They have some exposure to object oriented programming and recursion. We use the Java language, but we don't dwell on details of Java, we mostly use it as an expository language. We do some math, but not advanced math. 
人们经常询问先决条件。我们假设参加这门课程的人知道如何编程。他们知道循环、数组和函数的基础知识。他们接触过面向对象编程和递归。我们使用Java语言，但我们不会详细讨论Java的细节，我们主要将其用作说明性语言。我们做一些数学，但不是高等数学。

发言人   08:21
If you want to review the material that we think is prerequisite to the material in this course, you can do a quick review by looking at sections 1.1 and 1.2 of the book, either at the book site or in the textbook. If you want an in depth review, we have a full textbook called an Introduction to Programming in Java, an interdisciplinary Pliny approach. There's a book site and a textbook as well. But the bottom line is you should be able to program. And a quick exercise to get ready is to write a Java program on your computer, perhaps using our programming model as described on the book site. We'll provide much more detailed information on that as we get into the assignments. You can use your own programming environment if you're comfortable with one, or you can download ours. We have instructions on the web about how to do that. 
如果你想复习我们认为是本课程材料的先决条件的材料，你可以通过查看书籍网站或教科书的1.1和1.2节来快速复习。如果你想要深入评论，我们有一本完整的教科书，叫做Java编程入门，这是一种跨学科的方法。有一个图书网站和一本教科书。但底线是你应该能够编程。一个快速准备练习是在你的计算机上编写一个Java程序，可能使用我们在书网站上描述的编程模型。当我们完成作业时，我们将提供更详细的信息。如果您对编程环境感到满意，可以使用自己的编程环境，也可以下载我们的。我们在网上有关于如何做到这一点的说明。
