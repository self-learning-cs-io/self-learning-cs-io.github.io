---
title: 算法 第一部分 005 quick-union-improvements
date: 2025-10-13 10:00:30
---

发言人   00:03
Okay, so we've looked at the quick union and quick find algorithms, both of which are easy to implement, but simply can't support huge dynamic commatism problems. So how are we going to do better? That's what we'll look at next. 
好的，所以我们研究了快速联合和快速查找算法，这两种算法都很容易实现，但根本无法支持巨大的动态交换问题。那么我们该如何做得更好呢？这就是我们接下来要看的。


发言人   00:20
Very effective improvement. It's called weighting. And it might have occurred to you while we were looking at these algorithms. 
非常有效的改进。这叫做加权。当我们研究这些算法时，你可能会想到这一点。

发言人   00:26
The idea is to, when implementing the Quick Union algorithm, take steps to avoid having tall trees. If you've got a large tree in a small tree to combine together, what you want to try to do is avoid putting the large tree lower. That's going to lead to long, tall trees. And there's a relatively easy way to do that. What we'll do is we'll keep track of the number of objects in each tree, and then we'll maintain balance by always making sure that we link the root of the smaller tree to the root of the larger tree. So we avoid this first situation here where we put the larger tree lower. 
这个想法是，在实施快速联合算法时，采取措施避免拥有高大的树木。如果你有一棵大树和一棵小树需要组合在一起，你想要尝试做的是避免把大树放得更低。这将导致长而高的树木。有一种相对简单的方法可以做到这一点。我们要做的是跟踪每棵树中对象的数量，然后通过始终确保将较小树的根链接到较大树的根来保持平衡。因此，我们避免了第一种情况，即我们将较大的树放低处。


发言人   01:14
In the weighted algorithm, we always put the smaller tree lower. Let's see how we implement that. Let's see a demo first. 
在加权算法中，我们总是把较小的树放在较低的位置。让我们看看我们如何实现它。让我们先来看一个演示。


发言人   01:28
Okay, so again, we start out in our normal starting position where everybody's in their own tree. And when there's only two items to link, it works the same way as before. But now when we have 8 to merge with four and 3, we put the 8 as the child, no matter which order of the arguments came, because it's the smaller tree. So 6 and 5 doesn't matter. Whichever one goes down doesn't matter. Nine and 4. So now 9 is the small 1, 4 is the big one. So 9 is going to be the one that goes down below. 
好的，我们再一次从我们正常的起始位置开始，每个人都在自己的树上。当只有两个项目需要链接时，它的工作方式与以前相同。但是现在当我们有8个与4个和3个合并时，我们将8个作为孩子，无论参数的顺序如何，因为它是较小的树。所以6和5不重要。无论哪一个下降都不重要。9和4。现在9是小的1，4是大的1。因此，9将是下面下降的那个。


发言人   02:12
Two and 1. Five and 0. So now 5 and 0. 5 is in the bigger tree, so 0 goes below. Seven and 2. Twos in the bigger tree. So 7 goes below. Six and 1. They're in equal size trees. 
2和1。5和0。现在是5和0。5在更大的树上，所以0在下面。七个和两个。大树上的两颗。所以7就在下面。六个和1。它们是大小相等的树。

发言人   02:49
And 7 and 3 threes in the smaller tree. So it goes below. So the weighted algorithm always make sure that the smaller tree goes below. And again, we wind up with a single tree representing all the objects. But this time we have some guarantee that no item is too far from the root. And we'll talk about that explicitly in a second. 
在较小的树上有7和3个。所以它就在下面。因此，加权算法始终确保较小的树在下面。而且，我们最后用一棵树来代表所有的物体。但是这次我们有一些保证，确保没有任何一项离根太远。我们稍后会明确讨论这个问题。

发言人   03:22
So here's an example that shows the effect of doing the weighted quick union, where we always put the smaller tree down below for the same set of union commands. This is with 100 sites and 88 union operations. You can see in the top, the big tree has some trees, some nodes, a fair distance from the root in the bottom. For the weighted algorithm, all the nodes are within distance 4 from the average distance to the root is much, much lower. 
所以这里有一个例子，展示了进行加权快速联合的效果，我们总是将同一组联合命令的较小的树放在下面。这是100个站点和88个工会运营。你可以看到在顶部，这棵大树有一些树，一些节点，离底部的根有相当的距离。对于加权算法，所有节点都在距离4的范围内，到根的平均距离要低得多。



发言人   04:01
Let's look at the Java implementation, and then we'll look in more detail at that quantitative information. So we use the same data structure, except now we need an extra array that for each item, gives the number of objects in the tree rooted at that item that we'll maintain in the union operation. Find implementation is identical to for quick union. 
让我们看一下Java实现，然后我们将更详细地查看量化信息。所以我们使用相同的数据结构，除了现在我们需要一个额外的数组，对于每个项目，给出树中以该项目为根的对象数量，我们将在联合操作中维护这些对象。查找实现与快速联合相同。


发言人   04:25
You're just checking whether the roots are equal. For the union implementation, we're going to modify the code to check the sizes and link the root of the smaller tree to the root of the larger tree in each case. Then after changing the ID link, we also change the size array. If we make IA child of J, then we have to increment the j's tree by the size of i's tree. Or if we do the other way around, then we have to increment the size of ice tree by the size of j's tree. That's the full code in white for implementing quick union. So not very much code, but much, much better performance. 
你只是在检查两个根是否相等。对于联合实现，我们将修改代码以检查大小，并在每种情况下将较小树的根链接到较大树的根。然后在更改账号链接后，我们还更改了大小数组。如果我们使J成为一个孩子，那么我们必须将j的树增加到i的树的大小。或者如果我们这样做，那么我们必须通过j树的大小来增加冰树的大小。这是用于实现快速联盟的白色完整代码。所以没有太多的代码，但性能要好得多。

发言人   05:10
In fact, we can analyze the running time mathematically and show that the fined operation, it takes time proportional to how far down the trees are in the node. 
实际上，我们可以对运行时间进行数学分析，并表明精细操作所需的时间与树在节点中的距离成正比。


发言人   05:24
The nodes are in the tree, but we can show that. It's guaranteed that the depth of any node in the tree is at most the logarithm to the base 2 of n, we use the notation LG always for logarithm to the base 2. And so for if n is 1000, that's going to be 10. If n is a million, that's 20. If n is a billion, that's 30. It's a very small number compared to n, so let's look at the proof of that. We do some mathematical proofs in this, of course, when they're critical, such as this one. 
节点在树中，但我们可以展示出来。它保证树中任何节点的深度至多是n的底数2的对数，我们总是使用LG的表示法来表示底数2的对数。所以如果n是1000，那就是10。如果n是一百万，那就是20。如果n是十亿，那就是30。与n相比，它是一个非常小的数字，所以让我们来看一下证明。当然，当它们至关重要时，我们会在这里进行一些数学证明，比如这个。

发言人   06:03
And why is it true that the depth of any node x is at most log base 2 of n? 
为什么任何节点x的深度最多为n的对数底2？


发言人   06:08
Well, the key to understanding that is to take a look at exactly when does the depth of any node increase? When does it go down further in the tree? Well, the x's depth will increase by one when it's tree t 1 in this diagram is merged into some other tree t 2 in this diagram. Well, at that point, we said we would only do that if the size of T 2 was bigger than or equal to the size of T 1. So when the depth of x increases, the size of its tree at least doubles. So that's the key, because that means that the size of the tree containing can double at most log n times. Because if you start with one and double log n times, you get n, and there's only n nodes in the tree. So that's a sketch of a proof that the depth of any node x is at most log base 2 of n, and that has profound impact on the performance of this algorithm. 
理解这一点的关键是要准确地了解任何节点的深度何时增加？它什么时候在树上往下走呢？当这个图中的树t 1与这个图中的其他树t 2合并时，x的深度将增加一。在这一点上，我们说只有当t2的大小大于或等于t1的大小时才会这样做。当x的深度增加时，树的大小至少会翻倍。这就是关键，因为这意味着包含的树的大小最多可以加倍log n次。因为如果你从单双log n次开始，你会得到n，树中只有n个节点。所以这是一个证明的纲要，证明任何节点x的深度最多为n的对数底2，这对该算法的性能有深远影响。



发言人   07:16
Now, instead of the initialization always takes time proportional to n, but now both the union and the connected or fined operation takes time proportional to log base 2 of n, and that is an algorithm that scales if n grows from a million to a billion, that cost goes from 20 to 30, which is quite acceptable. 
现在，初始化总是需要与n成比例的时间，但现在联合和连接或罚款操作都需要与n的对数基数2成比例的时间，这是一种算法，如果n从一百万增长到十亿，则成本从20增长到30。这是完全可以接受的。


发言人   07:43
Now, this was very easy to implement, and we could stop, but usually what happens in the design of algorithms is now that we understand what it is that gains performance, we take a look and see, well, could we improve it even further? And in this case, it's very easy to improve it much, much more. 
现在，这很容易实现，我们可以停下来，但通常在算法设计中发生的事情是，现在我们理解了什么可以提高性能，我们来看看，好吧，我们可以进一步改进吗？在这种情况下，很容易对其进行更多的改进。

发言人   08:05
And that's the idea of path compression. And this idea is that, well, when we're trying to find the root of the tree containing a given node, we're touching all the node on the path from that node to the root. While we're doing that, we might as well make each one of those just point to the root. There's no reason not to. So when we're looking, we're trying to find the root of p, after we find it, we might as well just go back and make every node on that path just point to the root. That's going to be a constant extra cost. 
这就是路径压缩的想法。这个想法是，当我们试图找到包含给定节点的树的根时，我们会接触从该节点到根路径上的所有节点。当我们这样做的时候，我们不妨让每一个都指向根。没有理由不这样做。因此，当我们查找时，我们试图找到p的根，找到后，我们不妨返回并使该路径上的每个节点都指向根。这将是一个不断的额外成本。



发言人   08:52
We went up the path once to find the route. Now we'll go up again to just flatten the tree out. And the reason would be no reason not to do that. We had one line of code to flatten the tree, amazingly, actually to make a one line of code, we use a simple variant where we make every other node in the path point to its grandparent on the way up the tree. That's not quite as good as totally flattening, actually. In practice, it actually is just about as good. So with one line of code, we can keep the trees almost completely flat. 
我们沿着小路走了一次，找到了路线。现在我们将再次上去把树压扁。原因是没有理由不这样做。我们有一行代码来扁平化树，令人惊讶的是，实际上为了制作一行代码，我们使用了一个简单的变体，使路径中的每个其他节点都指向树上游的祖父节点。实际上，这并不像完全扁平化那么好。在实践中，它实际上差不多一样好。因此，只需一行代码，我们就可以使树几乎完全保持平坦。



发言人   09:32
Now, this algorithm people discovered rather early on after figuring out the weighting. And it turns out to be fascinating to analyze quite beyond our scope. 
现在，人们在计算出权重后很早就发现了这种算法。事实证明，分析超出我们的范围是令人着迷的。


发言人   09:49
But mention this example to illustrate how even a simple algorithm can have interesting and complex analysis in what was proved by an omen and tarjan was that if you have n objects, any sequence of m union and find operations will touch the array. At most, a constant of m plus m log star n times and a log star n, it's kind of a funny function. It's the number of times you have to take the log of n to get one in the, it's called the iterated log function, and in the real world, it's best to think of that as a number less than 5, because log star of two to the 6, 5 5 3 6 power is 5. So that means that the running time of weighted quick union with path compression is going to be linear in the real world and actually can be improved to even a more interesting function called the Ackerman function, which is even more slowly growing than log star. And another point about this is it seemed this is so close to being linear that it's time proportional to n instead of time proportional to n times a slowly growing function in n, is there a simple algorithm that is linear? 
但是提到这个例子是为了说明即使是一个简单的算法也可以进行有趣和复杂的分析，这是由预兆和tarjan所证明的，如果你有n个对象，任何m联合和查找操作序列都将接触到数组。最多是一个常数m加上m个对数星号n次和一个对数星号n，这是一个有点有趣的函数。这是你必须获取n的对数才能在其中得到一个的次数，这被称为迭代对数函数，在现实中世界上最好把它想象成一个小于5的数字，因为2的对数星星等于6、5、3、6的幂。五。这意味着在现实世界中，加权快速联合和路径压缩的运行时间将是线性的，实际上可以改进为一个更有趣的函数，称为Ackerman函数，它的增长速度甚至比log star还要慢。关于这个问题的另一个问题是，它似乎非常接近于线性，以至于它的时间与n成正比，而不是与n乘以一个缓慢增长的函数，是否有一个简单的线性算法？




发言人   11:17
And people look for a long time for that? And actually, it works out to be the case that we can prove that there is no such algorithm. So there's a lot of theory that goes behind the algorithms that we use. And it's important for us to know that theory. And that'll help us decide how to choose which algorithms we're going to use in practice. And we're to concentrate our effort in trying to find better algorithms. 
人们长期以来一直在寻找这个？实际上，我们可以证明不存在这样的算法。因此，我们使用的算法背后有很多理论。了解这个理论对我们来说很重要。这将帮助我们决定如何选择我们将在实践中使用哪些算法。我们将集中精力寻找更好的算法。

发言人   11:44
It's an amazing fact that was eventually proved by fredman and Sachs that there is no linear time algorithm for it. Union fine problem, but way to quick reunion with path compression in practice is close enough that it's going to enable the solution of huge problems. So that's our summary for algorithms for solving the dynamic connectivity problems with using way quick union. 
这是一个惊人的事实，最终由fredman和Sachs证明，它没有线性时间算法。联合罚款问题，但是在实践中使用路径压缩快速团聚的方法足够接近，这将使大问题的解决成为可能。这就是我们对使用方式快速联合解决动态连接问题的算法的总结。

发言人   12:14
And with path compression, we can solve problems that could not otherwise be addressed. For example, if you have a billion operations on a billion objects, I said before, it might take 30 years. We can do it in 6 seconds. And what's most important to recognize about this is that it's the algorithm design that enables the solution of the problem faster. Computer wouldn't help much. You could spend millions on a supercomputer, and maybe you could get it done in six years instead of 30 or in two months. But with a fast algorithm, you can do it in seconds on your own PC. 
通过路径压缩，我们可以解决否则无法解决的问题。例如，如果你对十亿个对象进行十亿次操作，我之前说过，可能需要30年。我们可以在6秒内完成。而最重要的是要认识到，正是算法设计使问题的解决速度更快。电脑帮不了多少忙。你可以在超级计算机上花费数百万美元，也许你可以在六年内完成它，而不是30或两个月。但是使用快速算法，您可以在自己的电脑上在几秒钟内完成。

