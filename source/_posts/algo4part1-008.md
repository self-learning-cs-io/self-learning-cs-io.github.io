---
title: 算法 第一部分 008 mathematical-models
date: 2025-10-13 10:00:33
---

发言人   00:02
Observing what's happening, as we did in the last section, gives us a way to predict performance, but it really doesn't help us understand what the algorithm's doing. So next, we're going to look at mathematical model, a way to get a better concept of what's really happening. Again, this concept was really developed and popularized by Don KNU starting in the late 60s. At that time, computer systems were really becoming complicated. For the first time in computer scientists were concerned about whether we really were going to be able to understand what's going on. And Knuth was very direct in saying that this is something that we certainly can do. 
观察正在发生的事情，就像我们在上一节中所做的那样，为我们提供了一种预测性能的方法，但它实际上并不能帮助我们理解算法在做什么。接下来，我们将研究数学模型，这是一种更好地了解实际情况的方法。再一次，这个概念是从60年代末开始由Don KNU真正发展和普及的。在那个时候，计算机系统变得非常复杂。计算机科学家们第一次关心我们是否真的能够理解正在发生的事情。而Knuth非常直接地说这是我们当然可以做到的事情。


发言人   00:52
We can calculate the total running time of a program by identifying all the basic operations, figuring out the cost, figuring out the frequency of execution, and summing up the cost times frequency for all the operations. You have to analyze the program to determine what set of operations and the cost depends on the machine and the computer in the system is what we talked about before. The frequency leads us to mathematics because it depends on the algorithm and the input data. Knuth has written a series of books that give very detailed and exact analyses within a particular computer model for a wide range of algorithms. So from Knuth, we know that in principle we can get accurate mathematical models for the performance of algorithms or programs in operation. 
我们可以通过确定所有基本操作，计算成本，计算执行频率，并将所有操作的成本乘以频率相加来计算程序的总运行时间。你必须分析程序，以确定哪些操作和成本取决于系统中的机器和计算机，这就是我们之前讨论过的。频率将我们引向数学，因为它取决于算法和输入数据。Knuth写了一系列书籍，在特定的计算机模型中为各种算法提供非常详细和精确的分析。因此，从Knuth中，我们知道原则上我们可以获得算法或程序在运行中的性能的准确数学模型。

发言人   01:48
All right, so what does this process look like? Well, you can, if you want, run experiments. In ancient times, we would actually look at the computer manual, and every computer came with a manual that said precisely how long each instruction would take. Nowadays, it's a little more complicated, so we run experiments, and you can go ahead and do a billion ads and figure out that maybe in your computer, an ad takes 2.1 nanoseconds. Or you can do more complicated functions like computer sign or an arctangent, although that's already getting close to the analysis of algorithms. So there's some way to determine the cost of the basic operations. And so in most of the cases, we'll just postulate that it's some constant. And you can figure out what the constant is. 
好的，那么这个过程是什么样子的？嗯，如果你愿意，你可以进行实验。在古代，我们实际上会查看计算机手册，每台计算机都有一本手册，精确地说明了每个指令需要多长时间。现在，这有点复杂，所以我们进行实验，你可以继续做十亿个广告，并找出可能在你的电脑上，一个广告需要2.1纳秒。或者你可以做更复杂的函数，如计算机符号或反正切，尽管这已经接近算法分析了。因此，有一些方法可以确定基本操作的成本。因此，在大多数情况下，我们只假设它是一些常数。你可以弄清楚这个常数是什么。


发言人   02:43
Although when we're working with a collection of objects, of n objects, there's some things that take time proportional to n, like if you are going to allocate an array of size n, it takes time proportional to n, because in Java, default is that all the elements in the array are initialized to 0. In other operations, it depends on the system implementation. And an important one is string concatenation. If you concatenate two strings, the running time is proportional to the length of the string in many novices programming in Java make the mistake of assuming that that's a constant time operation when it's not. All right, so that's the cost of each operation. 
尽管当我们处理一个对象的集合时，有一些事情需要与n成比例的时间，比如如果你要分配一个大小为n的数组，它需要与n成比例的时间，因为在Java中，默认情况下，数组中的所有元素都被初始化为0。在其他操作中，这取决于系统的实现。另一个重要的是字符串并置。如果你连接两个字符串，运行时间与字符串长度成正比，在许多用Java编程的新手中，错误地假设这是一个常数时间操作，而事实并非如此。好的，这就是每次操作的成本。


发言人   03:35
More interesting is the frequency of operation, of execution of the operations. So this is a very simple variant of the three sum problem, that's the 1 sum problem, that's how many numbers are actually equal to 0, how many single numbers add up to 0. So that one is just one for loop. 
更有趣的是操作的频率，操作的执行频率。所以这是三个总和问题的一个非常简单的变体，即1和问题，即有多少个数字实际上等于0，有多少个数字加起来等于0。因此，这只是一个for循环。

发言人   03:55
And we go through and we tested the number is 0 and increment or count. And by analyzing that code, you can see that I and count have to be declared and they have to be assigned to 0. There's compares of I against n and there's n plus one of them, there's compares of a of I against 0. There's n of those n array axis. And the number increment number of times is an increment is variable. I is incremented n times, but count could be incremented any number from 0 to n times. And so that frequency is dependent on the input data. We might need a model for describing that. 
我们仔细检查并测试了数字是0和递增或计数。通过分析该代码，您可以看到必须声明I和count，并且必须将它们分配给0。有I与n的比较，有n加一，有I与0的比较。这些n个数组轴中有n个。并且数字增量次数是增量是可变的。I增加了n倍，但count可以增加从0到n倍的任何数字。因此，频率取决于输入数据。我们可能需要一个模型来描述这一点。

发言人   04:39
Or maybe there's other operations that are more expensive, and we won't need to worry about that. 
或者可能还有其他更昂贵的操作，我们不需要担心这个。

发言人   04:46
So let's look at next more complicated problem is, what about the frequency of execution of instructions in this program, which is the two sum problem? How many pairs of integers sum to 0? Well, in this case, you have to do a little bit of math to see that when when I goes from 0 to n and j goes from I plus one to n, the number of compares that we do, or let's say array AES that we do is two for each time the If statement is executed for AI and AJ, and that thing is executed n -1 times the first time through the loop and n -2 the second, and so forth, it's the sum of the integers from 0 up to n -1, which is simple discrete sum one half n times n -1. And since we're doing it twice the number of array axis is n n -1. So we can go ahead and get these actual exact counts. 
那么让我们来看下一个更复杂的问题，这个程序中指令的执行频率是多少，也就是两个总和问题？多少对整数的总和为0？在这种情况下，你需要做一点数学计算，看看当I从0变成n，j从I加一变成n时，我们进行的比较次数，或者假设我们每次为AI和AJ执行If语句时所做的数组AES是两个，并且通过循环第一次执行n -1次，第二次执行n -2次，依此类推，它是从0到n -1的整数的和，这是一个简单的离散和半个n乘以n -1。由于我们这样做，数组轴的数量是nn-1的两倍。所以我们可以继续获取这些实际的精确计数。


发言人   05:52
But already it's getting a little bit tedious to do that. And as far back as touring, who also knew that as well as Babbage did, that we want to have a measure of the amount of work involved in the process, He recognized that you didn't want to necessarily go through and do it in full detail. It's still helpful to have a crude estimate so you could count up the number of times that every operation is applied, give it weights, and count the abstract and so forth. But maybe we should just count the ones that are most expensive. That's what Turing said in 1947, and realistically that's what we do nowadays. So rather than going in and counting every little detail, we take some basic operation that's maybe the most expensive or and or the one that's executed the most often, the one that cost time frequency is the highest and use that as a proxy for the running time, essentially making the hypothesis that the running time is going to grow like a constant times that. So in this case, we're going to pick array axis. So that's the first simplification. 
但这样做已经有点乏味了。早在巡回演出时，他也和巴贝奇一样知道，我们想要测量这个过程中涉及的工作量，他认识到你不一定要经历并详细地做。粗略估计仍然很有帮助，这样您就可以计算每个操作的应用次数，赋予其权重，并计算摘要等。但也许我们应该只计算最贵的那些。这就是图灵在1947年所说的，实际上这也是我们现在所做的。因此，我们不是深入计算每一个细节，而是采用一些可能是最昂贵或最常执行的基本操作，花费时间频率最高的操作，并将其用作运行时间的代理。基本上是假设运行时间将像常数一样增长。在这种情况下，我们将选择数组轴。所以这是第一个简化。



发言人   07:15
And the second simplification is that we're they ignore low order terms in the formulas that we derive and there's an easy way to do that it's called the tilde notation, and the idea is when n is large in a formula like this the n cube term is much, much higher than the n term or 16, in fact, so much so that we wouldn't even hardly notice these low order terms. So all of these formulas are tilde one 6th n cubed, and that's a fine representative or proximate approximation to these quantities, and it greatly simplifies the calculations to throw away the low order terms like this. So by focusing on one operation and throwing away the tilde is the low order terms, and this is the technical definition of tilde, it just f of n tilde g of n means the limit as fn or GN equals 1, and you can check that that's going to hold in these kinds of situations. So that greatly simplifies the frequency counts. 
第二个简化是我们在推导的公式中忽略低阶项，有一个简单的方法可以做到这一点，它被称为代号符号，这个想法是当n在这样的公式中大时，n个立方体项就很多了。实际上，比n项或16项高得多，以至于我们几乎不会注意到这些低阶项。因此，所有这些公式都是一个6次方的立方，这是这些量的一个很好的代表性或近似，并且它大大简化了计算，丢弃了这样的低阶项。因此，通过专注于一个操作并丢弃波浪号是低阶项，这是波浪号的技术定义，它只是n的波浪号g的f表示极限为fn或GN等于1，你可以检查这在这些情况下是否适用。这大大简化了频率计数。

发言人   08:28
And if we're only picking one thing, we're just talking about tilde n squared, maybe another tilde n squared for the increment, the two sum problem say. So again, when n is large, the terms are negligible. When n is really small, they're not negligible, but we don't really care because we're trying to estimate running times for large n, and running times for small n are going to be small, no matter. All right, so now we're using both the cost model and the tilde notation. And then we can simply say that this program uses tilde n squared array axis and have implicit the hypothesis that we think the running time is going to be tilde a constant times n squared. 
如果我们只选择一件事，我们只是在谈论递增的tilde n平方，也许是另一个tilde n平方，即两个总和问题。所以，当n很大时，这些项可以忽略不计。当n非常小时，它们是不可忽略的，但我们并不关心，因为我们试图估计大的n的运行时间，而小的n的运行时间将会很小，无论如何。好的，现在我们同时使用了成本模型和波浪符号。然后我们可以简单地说这个程序使用波浪号n平方数组轴，并隐含着我们认为运行时间将是一个常数乘以n平方的波浪号的假设。

发言人   09:17
Okay, well now we're about 3 sum. Let's do our real problem. So now we have the triple loop, and then we have to do a more complicated combinatorial problem. And it's not that big a deal, really, we're looking at the distinct number of ways you can choose 3 things out of n, and that's the binomial coefficient. And again, doing the math and using the tilde, it's just tilde 1 6 n cubed 3 ray axis for each triple. So we can say half n cubed. So computing and summing the costs of all operations, that's too much work. We're picking the most expensive in terms of cost times frequency and approximating that and trying to get a good model for the running time. 
好的，现在我们大约有3个总和。让我们解决真正的问题。现在我们有了三重循环，然后我们必须做一个更复杂的组合问题。这并不是什么大不了的事情，真的，我们正在研究可以从n个事物中选择3个事物的不同方式，那就是二项式系数。再次进行数学计算并使用波浪号，对于每个三倍，它只是波浪号1 6 n立方3射线轴。所以我们可以说半个n的立方。所以计算和总结所有操作的成本，这是太多的工作。我们正在选择成本与频率最昂贵的，并进行近似，试图获得一个好的运行时间模型。



发言人   10:15
So now most, we're not going to do a full discrete mathematics in this course, but there's some basic things that we will want to use and are not that difficult to understand. So a lot of times we find out that we need to come up with an estimate of a discrete sum, like we did for one plus 2 up to n, whereas some of the squares or other things like the threesome triple loop. And so actually, if you've had basic calculus, one way to think of it is to just replace the sum with an integral integral that usually works. Or we can do the math and use the so-called or level maccharles summation formula to get it true approximation. But if you think of it this way, you'll believe us when we say that that thing is still the half n squared, or sum of one plus 1/2 plus one third up to one over n, that's like integral from x equals one to n 1 over x, and that's natural log of n, even the threesome triple loop kind of, if you're used to multiple integrals, will quickly give you the one 6th n cubed. There's many more and other techniques that we can use for this and we're not going to teach all that, but we'll sometimes refer to results of this type. 
所以现在大多数情况下，我们在这门课程中不打算做完整的离散数学，但是有一些基本的东西我们想要使用，并且不是那么难理解。所以很多时候，我们发现我们需要估计一个离散和，就像我们为1 + 2到n所做的那样，而一些平方或其他东西，比如三元组循环。因此，实际上，如果你有基本的微积分，一种想法是用一个通常有效的积分来代替和。或者我们可以进行数学计算，使用所谓的或水平的maccharles求和公式来得到真正的近似。但是如果你这样想，当我们说这个东西仍然是n的平方的一半，或者1加1/2加三分之一到1对n的总和时，你会相信我们，这就像从x积分等于1到n 1对x，这就是n的自然对数。即使是三合一循环，如果你习惯了多重积分，也会很快给你一个6的n的立方。我们可以使用更多或其他技术，我们不会教授所有这些，但我们有时会提到这种类型的结果。


发言人   11:39
All right? So in principle, KNU tells us that accurate mathematical models are available in practice, we can get really complicated formulas. We also might need some advanced mathematics theoretician will revel in, but that maybe people learning algorithms for the first time might not be expected to know. So in the end, careful exact models are best left for experts. 
一切正常吗？因此，原则上，KNU告诉我们，在实践中可以使用准确的数学模型，我们可以得到非常复杂的公式。我们可能还需要一些高级数学理论家，但也许第一次学习算法的人可能不会知道。因此，最后，仔细的精确模型最好留给专家。


发言人   12:13
There's really a lot of things that can go on. On the other hand, approximate models are definitely worthwhile for all the algorithms that we consider, we'll try to communicate a reasonable approximate model that can be used to describe the running time. Sometimes we'll give the mathematical proofs, and other times we'll have to just cite the work of some expert. 
确实有很多事情可以继续下去。另一方面，近似模型对于我们考虑的所有算法都是值得的，我们将尝试传达一个合理的近似模型，可以用来描述运行时间。有时我们会给出数学证明，有时我们只能引用一些专家的工作。
