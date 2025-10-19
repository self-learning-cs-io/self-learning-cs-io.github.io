---
title: 算法 第一部分 007 observations
date: 2025-10-13 10:00:32
---

发言人   00:09
Okay, so the first step is to be able to make some observations about the running time of the programs. And for analysis of algorithms, that's easier than in a lot of scientific disciplines. As we'll see. 
好的，第一步是能够对程序的运行时间进行一些观察。对于算法分析，这比在许多科学学科中更容易。正如我们将看到的。

发言人   00:23
For an running example, we're going to use the so-called 3 sum problem. And it's an easy to state problem. If you've got n distinct integers, how many triples sum to exactly 0? For example, in this file, 8" dot text text, which has 8 integers in it, there's four triples that sum to 0, 30 -40, 1030 -20 -10, and so forth. And so our goal is to write a program that can compute this quantity for any input file, any set of n integers. This is actually an extremely important computation that's deeply related to many problems in computational geometry, which is a branch of computer science that covers the algorithms and underlying science related to graphics and movies and geometric models of all sort. So this is actually an important practical problem, but it's a simple one to write code for. 
对于一个运行的例子，我们将使用所谓的3和问题。这是一个容易陈述的问题。如果你有n个不同的整数，那么有多少个三元组的总和恰好为0？例如，在这个文件中，8英寸点文本文本中有8个整数，其中有四个三元组的总和为0，30-40，1030-20-10，依此类推。因此，我们的目标是编写一个程序，可以为任何输入文件，任何n个整数的集合计算这个数量。这实际上是一项非常重要的计算，与计算几何中的许多问题都密切相关，计算几何是计算机科学的一个分支，涵盖与图形、电影和各种几何模型相关的算法和基础科学。所以这实际上是一个重要的实际问题，但它是一个编写代码很简单的问题。

发言人   01:35
Any of you could write down this program without much effort. 
你们中的任何人都可以毫不费力地写下这个程序。

发言人   01:40
It's got a static method count that is going to go ahead and take an integer array as the argument n is. That's the number of integers, that's the length of the array. We'll start with a variable count equals 0, and then a triple for loop that checks each triple ij k, we go I from one to NJ from I plus one to n, and k from j plus one to n, so that we get each triple just once. And then if I plus J AI plus AJ plus aka equals 0, we increment the count. And after that triple for loop, we return the count. And then the main method in this simple class just reads in all the integers and prints out the count. So that's a brute force algorithm. That is a fine method for solving the three sum problem. 
它有一个静态方法计数，它将继续采用整数数组作为参数n。这是整数的数量，这是数组的长度。我们将从一个等于0的变量开始，然后是一个三元组循环，检查每个三元组ij k，我们从1到NJ，从I加一到n，从j加一到n，这样我们就可以得到每个三元组一次。然后，如果I加上J AI加上AJ加上aka等于0，我们就增加计数。在三重for循环之后，我们返回计数。然后这个简单类中的main方法只读取所有整数并打印出计数。所以这是一个蛮力算法。这是解决三和问题的好方法。



发言人   02:36
Now, what we're interested in is how much time does this take as a function of n? Well, one way to time a program is to just look at the watch if you have a stopwatch or look at the clock or your phone, whatever you might need, you can just go ahead and time it. Or we have Java has, as part of its standard library, a stopwatch class that will go ahead and compute elapsed time. 
现在，我们感兴趣的是，作为n的函数，这需要多长时间？给程序计时的一种方法是只看手表，如果你有秒表或手表或手机，无论你需要什么，你都可以继续计时。或者我们有Java作为其标准库的一部分，有一个秒表类，它将继续计算经过的时间。

发言人   03:11
So, or anytime you run a program, if it's set up to easily take input of different sizes, a natural thing to do is just run it for bigger sizes. So for 8", this program takes not too much time. For 1000", it takes half a second, for 2000 takes more time. That's 3.7 seconds. I run it again. Still takes 3.7 seconds for 4000. So each time we're doubling the size of the input, and it's definitely taking more time each time. 
因此，无论何时运行程序，如果设置为轻松获取不同大小的输入，自然的做法就是以更大的大小运行它。所以对于8 "，这个程序不需要太多时间。对于1000英寸来说，需要半秒，对于2000英寸来说需要更多的时间。这是3.7秒。我会再次运行它。对于4000，仍然需要3.7秒。所以每次我们都会将输入大小加倍，而且每次肯定会花费更多的时间。


发言人   03:54
And actually, as we'll see, if programmers who get in the habit of testing the running time of their program in this way can get so that you can actually pretty easily and quickly evaluate when it's going to finish. In fact, while you're waiting for it to finish, you can often figure it out. So that one took 30 seconds for 4K. And definitely we could figure out how long it's going to take for 8K before it finishes. And you'll see how in just a second. I'm not going to wait right now. You can think about what you think. 
实际上，正如我们将看到的那样，如果程序员养成以这种方式测试程序运行时间的习惯，那么你就可以相当容易和快速地评估程序何时完成。事实上，当你在等待完成时，你通常可以理解出来。所以一个花了30秒的时间进行4K。我们肯定可以算出8K需要多长时间才能完成。你会在一秒钟内看到。我现在不打算等。你可以思考你的想法。

发言人   04:38
Okay, so that's empirical analysis. Run it for various input sizes and measure the running time. 
好的，这是实证分析。针对各种输入大小运行它并测量运行时间。

发言人   04:47
Now, if this were some scientific problem where we were counting something that happened in the natural world, the number of ants on an ant taille or whatever, then we'd have only a few data points and we would try to understand what's going on by doing a plot of our running time quantity we're interested in on the y axis and the problem size. On the x axis, we get a curve like this. And actually what scientists usually do, because so many problems fall into this class is do the plot as a log log plot. If you do it as a log log plot. Very often you'll get a straight line in the slope of the straight line is the key to what's going on. In this case, the slope of the straight line is 3. And so you can run what's called a regression to fiddle it, the straight line through the data points. 
现在，如果这是一些科学问题，我们要计算自然界中发生的事情，比如蚂蚁尾巴上的蚂蚁数量或其他数量，那么我们只有几个数据点，我们会尝试通过在y轴上绘制我们感兴趣的运行时间数量和问题大小来理解发生了什么。在x轴上，我们得到这样的曲线。实际上科学家通常做的是，因为很多问题都属于这个类别，就是将绘图作为对数绘图。如果您将其作为日志对数绘图。经常你会得到一条直线，直线的斜率是发生情况的关键。在这种情况下，直线的斜率为3。因此，您可以运行所谓的回归来摆弄它，即通过数据点的直线。

发言人   05:47
And then it's not difficult to show, to do the math, to show that if you get a straight line and the slope is b, then your function is proportional to a n to the b, that's called a power law. And that's true of many, many scientific problems, including most algorithms. So here's a little bit of the math for that. So the straight line means that since we did a log log plot with powers of 2, that log base 2 of t of n equals z log of n plus c, and we have our empirical values of b and c, and then if you raise both sides of the equation to 2 to that power, then you get t of n equals a constant times n to the b, so right away, just from observation, we have a pretty good model for the running time of our program. 
然后，不难证明，进行数学计算，证明如果你得到一条直线，斜率是b，那么你的函数与a n与b成正比，这就是所谓的幂定律。许多科学问题都是如此，包括大多数算法。所以这里有一些数学计算。因此直线意味着，由于我们做了一个2幂的对数绘图，因此t的对数底2等于n的z对数加c，并且我们有b和c的经验值，然后，如果你将方程的两边都提高到2的幂，那么你会得到t的n等于一个常数乘以n到b，所以根据观察，我们立即对我们程序的运行时间有一个相当好的模型。


发言人   06:49
We can figure due to math and figure out that it seems as though the running time is about 10 to the -10 times n cubed seconds. And we can use that hypothesis to go ahead and make predictions just plug in for different values of n, it says it ought take 400 seconds for 16000. And 400 seconds is plenty of time. But now we can go ahead and invest in running that experiment. And sure enough, we're pretty close to that 400 in 8 seconds when we run it. And now we can make a prediction for 32000 or or for whatever else we might be interested in. 
我们可以通过数学计算得出，运行时间似乎大约是10的-10乘以n立方秒。我们可以使用这个假设继续进行预测，只需插入不同的n值，它说16000应该需要400秒。400秒是足够的时间。但现在我们可以继续投资于运行这个实验。果然，当我们运行它时，我们在8秒内就非常接近400。现在我们可以对32000或其他我们可能感兴趣的东西进行预测。


发言人   07:29
The model helps us do predictions without investing the expense to run the experiments. 
该模型帮助我们进行预测，而无需投入运行实验的费用。

发言人   07:35
In fact, in this situation, if there is a power law, and again, in very great majority of computer algorithm running times, it's going to be a power law. What we can do is just double the size of the input each time the way we were, and then take the ratio of the running times for n and 2 n. And if you do that, that ratio is going to converge to a constant. And in fact, the log of the ratio is going to converge to that constant, which is the exponent of n in the running time. And just need a little math to check that one. But that's a very easy and natural way to go ahead and predict running times. So that's what I said before is so we have this quick way to estimate B in the power law relationship. 
实际上，在这种情况下，如果存在幂律，那么在绝大多数计算机算法运行时，它将是幂律。我们能做的就是每次将输入大小加倍，然后计算n和2 n运行时间的比率。如果你这样做，这个比率将收敛为一个常数。实际上，比率的对数将收敛到该常数，即运行时间内n的指数。只需要一点数学来检查那个。但这是预测运行时间的一种非常简单而自然的方法。这就是我之前说的，所以我们有了这种快速的方法来估计幂律关系中的B。

发言人   08:27
How do we estimate A, well, we can just run it and solve for A, so once we've decided that that exponent is 3, let's run it for some big n, and we get pretty close model to the one we had from plotting things. So it's almost identical hypothesis, and we just got it by running the program, doubling in each time. 
我们如何估计A，我们可以运行它并求解A，所以一旦我们决定该指数为3，让我们运行一些大的n，我们就可以得到非常接近我们通过绘图得到的模型。所以这是几乎相同的假设，我们只是通过运行程序，每次翻倍得到它。

发言人   08:53
Okay, so there's a. Lot of effects in trying to understand the running time of a program on your machine. So key effects are independent of what computer it is. And that's the algorithm you're using and what's the data. And that's going to really determine the exponent in the power law. 
好的，所以有一个。尝试了解计算机上程序的运行时间时会产生很多影响。因此键效应与计算机无关。这就是你正在使用的算法和数据。这将真正决定幂定律中的指数。


发言人   09:19
And then there's a lot of system dependent effects. What kind of hardware do you have? Do you have a fast computer or a slow one? What kind of software, what's going on in your computer? All of those things really determine the constant A in the power law. So in modern systems, there's so much going on in the hardware and software, it's sometimes difficult to get really precise measurements, but on the other hand, we don't have to sacrifice animals or fly to another planet the way they do in other sciences. We can just run a huge number of experiments and usually take care of understanding these kinds of effects. 
然后有许多依赖于系统的效应。你们有什么样的硬件？你有快速电脑还是慢速电脑？你的电脑里有什么软件和功能？所有这些都真正决定了幂定律中的常数A。因此，在现代系统中，有很多硬件和软件在进行，有时很难获得真正精确的测量结果，但另一方面，我们不必像在其他科学中那样牺牲动物或飞往另一个星球。我们只需进行大量的实验，通常就能理解这些效应。

