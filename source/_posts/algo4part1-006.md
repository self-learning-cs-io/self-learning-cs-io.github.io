---
title: 算法 第一部分 006 analysis-of-algorithms-introduction
date: 2025-10-13 10:00:31
---

发言人   00:02
Welcome back, today we're going to do some math and some science. Not a lot, but we need to have a scientific basis for understanding the performance of our algorithms to properly deploy them in practice. So today we're going to talk about how to observe performance characteristics of algorithms. We're going to look at how to make mathematical models and how to classify algorithms according to the order of growth of their running time. I'll talk a bit about the theory of algorithms and also how to analyze memory usage. 
欢迎回来，今天我们要做一些数学和科学。不是很多，但我们需要有科学基础来理解算法的性能，以便在实践中正确部署它们。所以今天我们将讨论如何观察算法的性能特征。我们将研究如何制作数学模型，以及如何根据算法运行时间的增长顺序对算法进行分类。我将谈论一些算法的理论，以及如何分析内存使用情况。



发言人   00:34
So to put this all in perspective, we're going to think about these issues from the point of view, different types of characters. So the first one is a programmer who needs to solve a problem and get it working and get it deployed. Second one is the client who wants to use whatever the program did to get the job done. Third one is the theory. That's somebody who really wants to understand what's going on. And the last one is kind of the team, this basic blocking and tackling sometimes necessary to get all these things done. 
因此，为了正确看待这一切，我们将从不同类型的角色的角度思考这些问题。因此，第一个是需要解决问题并使其工作和部署的程序员。第二个是客户想要使用程序所做的任何事情来完成工作。第三个是理论。这是一个真正想了解发生了什么事情的人。最后一个是团队，这种基本的拦截和攻关有时是完成所有这些事情所必需的。




发言人   01:14
So there's a little bit of each one of these in today's lecture. And actually, when you're a student, you have to think that you might be playing any or all of these roles someday. So it's pretty important to understand the different points of view. 
所以在今天的讲座中，每一种都有一点点。实际上，当你是一名学生时，你必须考虑到有一天你可能会扮演这些角色中的任何一个或所有角色。因此，理解不同的观点非常重要。

发言人   01:31
So the key that we'll focus on is running time and actually the idea of understanding the running time of computation goes way back even to Babbage and probably before. Here's a quote from Babbage. As soon as an analytic engine exists, it won't necessarily guide the future of the course of the science Whenever any result is sought by its aid, the question will arise by what course of calculation can these results we arrived at by the machine in the shortest time? If you look at Babbage's machine called the analytic engine, it's got a crank on it. And literally the concern that Babbage had in knowing how long computation would take is how many times do we have to turn the crank? It's not that different in today's world the crank may be something electronic that's happening a billion times a second, but still, we're looking for how many times does some discrete operation have to be performed in order to get a computation done? 
所以我们将关注的关键是运行时间，实际上理解计算运行时间的想法甚至可以追溯到巴贝奇甚至可能之前。这是巴贝奇的一句话。一旦分析引擎存在，无论何时寻求任何结果，它都不一定指导科学进程的未来，问题是机器可以在最短的时间内通过什么计算过程得出这些结果？如果你看看巴贝奇的分析机，它有一个曲柄。实际上，巴贝奇在知道计算需要多长时间时所关心的问题是，我们必须转动曲柄多少次？在当今世界，曲柄可能是每秒发生十亿次的电子东西，但我们仍然在寻找一些离散操作必须执行多少次才能完成计算？




发言人   02:38
So there's a lot of reasons to analyze algorithms in the context of this course. We're mainly interested in performance prediction, we also want to compare the performance of different algorithms for the same task and to be able to provide some guarantees on how well they perform. Along with this is understanding some theoretical basis for how algorithms perform, but primarily the practical reason that we want to be analyzing algorithms and understanding them is to avoid performance bugs. We want to have some confidence that our algorithm is going to complete the job in the amount of time that we think it will. And it's very, very frequent to see in today's computational infrastructure a situation where the client gets bad performance because the programmer did not understand the performance characteristics of the algorithm. And today's lecture is about trying to avoid that. 
因此，在本课程的背景下分析算法有很多理由。我们主要感兴趣的是性能预测，我们还希望比较同一任务不同算法的性能，并能够为它们的表现提供一些保证。伴随着这一点，我们需要理解算法执行的一些理论基础，但我们分析算法并理解它们的主要实际原因是为了避免性能错误。我们希望有一些信心，我们的算法将在我们认为的时间内完成工作。在当今的计算基础设施中，经常会出现这样的情况: 由于程序员不了解算法的性能特点，客户端的性能表现不佳。今天的讲座是关于试图避免这种情况。



发言人   03:39
Now we're going to focus on performance and comparing algorithms in this course. There's later courses in typical computer science curricula that have more information about the theoretical basis of algorithms. And I'll mention a little bit about that later on. But our focus is on being able to performance in comparing algorithms. 
现在我们将在本课程中重点介绍性能和比较算法。在典型的计算机科学课程中，后期课程有更多关于算法理论基础的信息。我稍后会稍微提到这个问题。但我们的重点是能够比较算法的性能。

发言人   04:03
Now, there's a long list of success stories in designing algorithms with better performance in enabling the solution of problems that would otherwise not be solved. And I'll just give a couple of examples. 
现在，在设计具有更好性能的算法来解决原本无法解决的问题方面，有一长串成功案例。我只举几个例子。


发言人   04:19
One of the first and most famous is the so called AED FFT algorithm. That's an algorithm for breaking down the waveform of n samples of a signal into periodic components, and that's at the basis for Dvd's and Jpegs and many other applications. There's an easy way to do it that takes time proportional to n squared, but the FFT algorithm takes only n log n steps. And the difference between n log n and n squared is the difference between being able to solve a large problem and not being able to solve it a lot of the digital technology, digital media technology that we have today is enabled by that fast algorithm. Another example was actually developed by Andrew Appel, who's now the chair of Computer science here at Princeton. And it was developed when he was an undergraduate for his senior thesis. It's a fast algorithm for the N body simulation problem. The easy algorithm takes time proportional to n squared, but a pells algorithm was an n log n algorithm that again, meant that scientists can do n-body simulation for huge values of n, and that enables new research. 
第一个也是最著名的算法之一是所谓的AED FFT算法。这是一种将信号的n个样本的波形分解为周期分量的算法，这也是Dvd、jpeg和许多其他应用的基础。有一种简单的方法可以做到这一点，它需要与n平方成比例的时间，但FFT算法只需要n log n步。n log n和n平方之间的差异就是能够解决一个大问题和不能解决这个问题之间的差异，我们今天拥有的许多数字技术，数字媒体技术都是通过这种快速算法实现的。另一个例子实际上是由安德鲁·Appel开发的，他现在是普林斯顿大学计算机科学的主席。它是在他还是一名毕业论文本科生时开发的。它是N体模拟问题的快速算法。简单算法需要的时间与n的平方成正比，但佩尔斯算法是一种n log n算法，这意味着科学家可以对巨大的n值进行n体模拟，这使得新的研究成为可能。


发言人   05:38
So the challenge is that. 
所以挑战在于。


发言人   05:42
We usually face is, will my program be able to solve a large practical input? Actually, the working programmer is actually faced with that all the time. Why is my program running so slowly? Why does it run out of memory? And that's faced programmers for a really a long time. And the insight to address this due to knufns in the 1970s was that we really can use the scientific method to understand the performance of algorithms in the operation. 
我们通常面临的是，我的程序能否解决大量的实际输入？实际上，工作的程序员实际上一直面临着这个问题。为什么我的程序运行得这么慢？为什么内存不足？长期以来，程序员一直面临着这样的问题。而由于1970年代的knufns，我们真正可以使用科学的方法来理解算法在操作中的性能，从而解决这个问题。


发言人   06:15
Maybe we're not unlocking new secrets of the universe, but we can use the scientific method and treat the computer as something to be studied in that way and come to an understanding of how our programs are going to perform. And let's take a look at that in more detail. 
也许我们没有解开宇宙的新秘密，但我们可以使用科学方法，将计算机视为需要以这种方式进行研究的东西，并了解我们的程序将如何执行。让我们更详细地看看这个。

发言人   06:35
So this is just a quick summary of what we mean by the scientific method, which has been successful for a couple of centuries now. So what we're going to do is observe from some feature of the natural world. In this case, it's going to be the running time of our program on a computer. Then we're going to develop hypothesis, some model that's consistent with the observations. And we're going to hope that that hypothesis is good enough that it'll allow us to predict something, usually predict the running time. For larger problem size. We're on a different computer. And then we'll verify the predictions by making more observations and validate until we're comfortable that our model hypothesis and observations all agree that's a way to get comfort that we understand the performance of our programs. 
所以这只是对我们所说的科学方法的简要总结，这种方法已经成功了几个世纪。所以我们要做的是从自然界的某些特征来观察。在这种情况下，它将是我们程序在计算机上的运行时间。然后我们将提出假设，一些与观察结果一致的模型。我们希望这个假设足够好，能够让我们预测一些事情，通常是预测运行时间。对于更大的问题规模。我们在另一台电脑上。然后，我们将通过进行更多的观察和验证来验证预测，直到我们确信我们的模型假设和观察都一致，这是一种让我们确信我们理解程序性能的方式。


发言人   07:24
Now, within the scientific method, there's some basic principles. And the first is that if you're going to run experiments, you should expect that somebody else should be able to run experiments and get the same result. And also the hypotheses have to have a specific property that the experiment can show the hypothesis to be wrong. So it has to be carefully crafted. And we'll be sure to try to do that. So, and again, the feature of the natural world that we're studying is some particular computer that exists in the natural world. It changes the algorithm from an abstraction to some kind of actual physical thing happening, like electrons racing around inside the computer. 
现在，在科学方法中，有一些基本原则。第一个是如果你要进行实验，你应该期望其他人能够进行实验并得到相同的结果。而且假设必须具有特定的性质，实验可以证明假设是错误的。所以它必须经过精心设计。我们一定会努力做到这一点。所以，再次强调，我们正在研究的自然世界的特征是存在于自然世界中的某种特定计算机。它将算法从抽象变成了某种实际的物理现象，比如计算机内的电子赛车。

