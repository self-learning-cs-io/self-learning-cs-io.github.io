---
title: 算法 第一部分 010 theory-of-algorithms
date: 2025-10-13 10:00:35
---

发言人   00:02
In fact, order of growth classifications are so important. They've led to an enormous amount of research in recent years. And I'll just talk briefly about that now. So there life is a. 
事实上，生长分类的顺序非常重要。近年来，它们引发了大量的研究。我现在将简要谈谈这个问题。所以生命是a。


发言人   00:15
Little bit more complicated than pointed out in the last example. One problem is that the inputs can cause the performance of algorithm to vary widely. So often we have to think about different ways of analyzing the algorithm depending on the input. So the running time is going to be somewhere between the best case and the worst case. Best case is a lower bound on costs. It provides something that the running time is going to be bigger than that always, or not less than that. And then there's the worst case, which is the most difficult input. If we analyze that, then we can guarantee that the running time of the algorithm not going to be bigger than that. 
比最后一个例子中指出的稍微复杂一些。一个问题是输入可能导致算法的性能差异很大。我们经常需要根据输入考虑不同的算法分析方式。因此，运行时间将介于最佳情况和最坏情况之间。最好的情况是成本的下限。它提供了一些运行时间将比总是更大的东西，或者不小于那个。然后是最坏的情况，也就是最困难的输入。如果我们分析它，那么我们可以保证算法的运行时间不会超过这个值。

发言人   01:03
And then in a lot of situations, we might consider our input to be random. 
然后在很多情况下，我们可能会认为我们的输入是随机的。

发言人   01:09
Well, we need to some way to model what we mean by random for the problem that we're solving. But there's a lot of situations where we can do that, and then we have a way to predict performance even when the input might vary widely. So for example, for threesome, it's kind of always the same with the tilde notation. The only variability in that algorithm is the number of times the counter is incremented. And that's in low order terms. So it doesn't even show up in our analysis. For binary search, you might find the thing right away, in which case it's constant time, and we can show that the average in the worst case are both log base 2 of n, and there's in other examples, there'd be much more variability even so. 
嗯，我们需要某种方法来模拟我们正在解决的问题的随机含义。但是在很多情况下我们可以做到这一点，即使输入可能变化很大，我们也有一种预测性能的方法。例如，对于 “三人行”，它总是与波浪符号相同。该算法中唯一的变化是计数器递增的次数。这是从低阶的角度来看的。所以它甚至没有出现在我们的分析中。对于二分搜索，您可能会立即找到这个东西，在这种情况下它是常数时间，我们可以证明在最坏情况下的平均值都是n的2的对数底，在其他例子中，即使这样，也会有更多的可变性。

发言人   02:14
We have these different types of analyses depending on the input. 
根据输入，我们有这些不同类型的分析。

发言人   02:19
But the question is, what about the actual problem that the client is trying to solve? So we have to understand that too, in order to be able to understand performance of the algorithms. And there's two approaches that are successful. In this one is to design. For the worst case, just make sure your algorithm always runs quickly, and that's definitely ideal. Another is to, if you can't do that, is to randomize and then depend on some kind of probabilistic guarantee. And we'll see examples of both of these as we go through the course. 
但问题是，客户试图解决的实际问题是什么？因此，我们也必须理解这一点，以便能够理解算法的性能。有两种方法是成功的。这其中一个是设计。在最坏的情况下，只需确保您的算法始终快速运行，这绝对是理想的。另一个方法是，如果你不能做到这一点，就是随机化，然后依赖某种概率保证。当我们完成课程时，我们将看到这两个例子。

发言人   02:58
Now, those kinds of considerations and the idea of order of growth leads to discussion of what's called, what I call the theory of algorithms. 
现在，这些考虑和增长顺序的想法导致了对所谓的算法理论的讨论。

发言人   03:10
And here our goals are we have a problem to solve, like solve the threesome problem, and we want to know how difficult it is. We want to find the best algorithm for solving that problem. The approach that computer scientists use for this is to try to suppress as many details as possible in the analysis. And so just analyze the running time to within a constant factor. That's what order of growth is getting at. And also, we want to not worry about the input model at all. And so we focus on worst case design. 
我们的目标是要解决一个问题，比如解决3P问题，我们想知道它有多难。我们想找到解决这个问题的最佳算法。计算机科学家用于此的方法是试图在分析中尽可能多地抑制细节。因此只需分析运行时间，使其保持在一个恒定因子内。这就是增长的顺序。而且，我们根本不希望担心输入模型。因此，我们专注于最坏情况设计。

发言人   03:48
Then we can talk about performance of algorithms just in terms of the order of growth. And it's actually possible to do that in a very rigorous way that it's us. 
那么我们就可以根据增长的顺序来谈论算法的性能。而且实际上可以以非常严格的方式做到这一点，这是我们自己的事情。

发言人   03:59
A lot about the difficulty of solving problems. Our goal is to find an optimal algorithm where we can guarantee within a constant factor certain performance for any input because we discovered worst case, but we also can have a proof that no algorithm can provide a better performance guarantee. 
很多关于解决问题的难度。我们的目标是找到一种最佳算法，在这种算法中，我们可以保证任何输入在常数因子范围内的某些性能，因为我们发现了最坏的情况，但我们也可以证明没有任何算法可以提供更好的性能保证。

发言人   04:22
I'll give a couple of easy examples of this. Now, in order to do this, there are these commonly used notations called the big theta, big O, and big omeda notations. So, and those definitions are given here. So the big theta notation is just a way to describe the order of growth. 
我会举几个简单的例子。现在，为了做到这一点，有这些常用的符号，称为大theta，大O和大omeda符号。所以，这里给出了这些定义。所以大theta符号只是描述增长顺序的一种方式。


发言人   04:48
Theta of n squared is kind of shorthand for anything times n squared. It's bounded above and below by constant times n squared. And that's what we really use to classify algorithms. And then there's big O notation, which is upper bounds on performance When we say big O of n squared, we mean that it's less than some constant times n squared as n grows. And big omeda is used for lower bounds, which means it greater than some constant times n squared as n grows. 
n的平方的 θ 是任何乘以n的平方的缩写。它的上下边界是常数乘以n的平方。这就是我们真正用来分类算法的东西。然后还有大O符号，当我们说到n的平方的大O时，这是性能的上限，我们的意思是随着n的增长，它小于某个常数乘以n的平方。大omeda用于下限，这意味着它大于某个常数乘以n的平方，随着n的增长。


发言人   05:20
So those three notations we're able to use to classify algorithms, and I'll show in the following. So the examples from our 1 sum, two sum, and 3 sum are easy to articulate. So our goals are to establish the difficulty of the problem and develop an optimal algorithm. 
因此，我们可以使用这三个符号来分类算法，我将在下面展示。因此，我们的1和、2和和3和的例子很容易表达清楚。因此，我们的目标是确定问题的难度并开发最优算法。

发言人   05:42
So the one, some problem, is there a 0 in the array? Well, an upper bound on the difficulty of the problem is some specific algorithm. So for example, the brute force algorithm that looks at every array entry is a specific algorithm means that, and that takes O of n time. You have to look at it's less than a constant times n for some constant. So the running time of the optimal algorithm has to be O of n, that is, that specific algorithm provides an upper bound on the running time of the optimal algorithm. But in this case, it's also easy to develop a lower bound. That's a proof that no algorithm can do better. 
那么问题来了，数组中有0吗？嗯，问题难度的上限是一些特定的算法。因此，例如，查看每个数组条目的暴力算法是一种特定的算法，这意味着需要花费n次时间。你必须看到对于某个常数，它小于一个常数乘以n。因此，最优算法的运行时间必须是n的O，也就是说，该特定算法提供了最优算法的运行时间的上限。但在这种情况下，制定一个下限也很容易。这证明没有任何算法可以做得更好。

发言人   06:27
Well, for 1 sum, you have to examine all entries in the array. If you miss 1, then that one might be 0. So that means that the optimal algorithm has to have a running time, at least some constant times n, or we say the running time is omeda of n, now in this case, the upper bound, in the lower bound match, so to within a constant factor. So that's a proof that the brute force algorithm for 1 sun is optimal. It's running time, it's theta of n, it's both omeda and n o of n that for that simple problem, it was OK to get the optimal algorithm for more complicated problems, it's going to be more difficult to get upper bounds and lower bounds, and particularly upper bounds and lower bounds that match. 
对于一个总和，你必须检查数组中的所有条目。如果你错过了1，那么那个可能是0。这意味着最优算法必须有一个运行时间，至少是某个常数乘以n，或者我们说运行时间是n的omeda，现在在这种情况下，上限在下限匹配中，因此在一个常数因子内。这证明了1 sun的蛮力算法是最优的。这是运行时间，它是n的theta，它是omeda和n的o，对于这个简单的问题，得到更复杂问题的最优算法是可以的，得到上界和下界将更加困难，特别是匹配的上限和下限。

发言人   07:20
For example, let's look at 3 sum. So upper bound for 3 sum, say our first brute force algorithm said that the was approved that the running time, the optimal algorithm is o of n cubed, but we found a better improved algorithm whose running time is O of n squared log n, so that's a better upper bound. Lower bound, well, we have to examine all entries because again, we might miss 1 that makes three sum equals 0. And that's a proof that the running time of the optimal algorithm is omeg of n, but nobody higher lower bound for three sum. So there's a gap between the upper bound and the lower bound in open problems. 
例如，让我们看一下3个总和。所以3和的上限，假设我们的第一个蛮力算法说运行时间被认可，最优算法是n立方的o，但是我们发现了一个更好的改进算法，其运行时间是n平方log n的O，所以这是一个更好的上限。下限，我们必须检查所有条目，因为再次，我们可能会错过1，这使得三个和等于0。这证明了最优算法的运行时间是n的一部分，但对于三个和没有更高的下界。因此，在开放问题中上限和下限之间存在差距。




发言人   08:10
Is there an optimal algorithm for threesome? We don't know what it is. We don't even know if there's a algorithm whose running time is less than o of n squared, or we don't know higher lower bound than linear. So that's an example of an open problem in the theory of algorithms, we don't know how difficult it is to solve the three sum problem. 
三人行有最优算法吗？我们不知道它是什么。我们甚至不知道是否有一个算法的运行时间小于n的平方，或者我们不知道比线性更高的下界。所以这是算法理论中一个开放问题的例子，我们不知道解决三和问题有多难。


发言人   08:34
Now, this point of view has been extremely successful in recent decades. We have a new problem developed, some algorithm, proved some lower bound. If there's a gap, we look for a new algorithm that will lower the upper bound, or we try to find a way to raise the lower bound. Usually it's very difficult to prove non-trivial lower bounds, trivial lower bound at every input item. That's not so hard. Non-trivial over bounds. Like for example, the proof that we talked about for the union fine problem are much more difficult. And in the last several decades, people have learned about the computational difficulty of problems by examining steadily decreasing upper bounds so algorithms with better, worst case running times for lots and lots of important problems, and plenty of optimal algorithms and plenty of gaps still remain. 
现在，这种观点在最近几十年中非常成功。我们开发了一个新问题，证明了一些算法和下限。如果存在差距，我们会寻找一种新的算法来降低上限，或者尝试找到一种方法来提高下限。通常，在每个输入项上证明非平凡的下限和平凡的下限是非常困难的。这并不难。非平凡越界。例如，我们谈论的工会罚款问题的证明要困难得多。在过去的几十年里，人们通过研究稳定下降的上界来了解问题的计算难度，因此对于许多重要问题具有更好的最坏情况运行时间的算法，仍然存在许多优化算法和空白。

发言人   09:36
It's a fascinating field of research that many people are engaged in. 
这是一个引人入胜的研究领域，很多人都在从事。

发言人   09:41
Now, there's a couple of caveats on this in the context of this course, and the first one is maybe it's overly pessimistic to be focusing on the worst case. We've got data out there, we've got problems. Maybe it's not worst case data in lots of fields of engineering and science, we don't focus on the worst case. The worst case for this course would be for lightning to strike and it would be over, so we don't plan for that, and similar is true for algorithms, maybe we should be focusing on understanding properties of the input and finding algorithms that are efficient for that input. And the other thing is, in order to really predict performance and compare algorithms, we need to do a closer analysis than to within a constant factor. So we talked about the tilde notation in the big theta, big O and big omena omena that are used in the theory of algorithms. Really, there's so much published research in the theory of algorithms. 
现在，在这门课程的背景下，有几个警告，第一个是专注于最坏情况可能过于悲观。我们有数据，我们有问题。也许在许多工程和科学领域中，这不是最坏情况的数据，我们不会关注最坏情况。本课程最糟糕的情况是雷击结束，所以我们不打算这样做，算法也是如此，也许我们应该专注于理解输入的属性，并找到对该输入有效的算法。另一件事是，为了真正预测性能和比较算法，我们需要进行更仔细的分析，而不是在一个恒定因素内进行分析。所以我们讨论了算法理论中使用的大theta、大O和大omena中的波浪符号。真的，算法理论方面已经有很多已发表的研究。


发言人   10:49
A lot of people make the mistake of interpreting the big O results that are supposed to give improved upper bounds on the difficulty of the problem as approximate models for the running time. And that's really a mistake. So in this course, we're going to focus on approximate models by making sure that we use the tilde notation. And we'll try to give specific results for certain quantities of interest in the constant. Any unspecified constant in the running time will have to do with properties of the machine in the system so that we'll be able to use these results to predict performance and to compare algorithms. 
很多人错误地将big O结果解释为运行时的近似模型，这些结果应该给出问题难度的改进上限。这真的是个错误。因此，在本课程中，我们将通过确保使用波浪符号来专注于近似模型。我们将尝试给出常数中某些感兴趣量的具体结果。运行时间中任何未指定的常数都与系统中机器的属性有关，以便我们能够使用这些结果来预测性能和比较算法。
