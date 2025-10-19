---
title: 算法 第一部分 009 order-of-growth-classifications
date: 2025-10-13 10:00:34
---

发言人   00:03
Now, fortunately, when we analyze algorithms, actually not too many different functions arise. And actually, that property allows us to really classify algorithms according to their performance as the problem size grows. So that's what we'll talk about next. So the good news is there's only these few functions turn up about the algorithms that we're interested in. And we can craft things that have other functions. And there are counterexamples to that. But really, a great number of the algorithms that we consider are described by these few functions that are plotted here. 
现在，幸运的是，当我们分析算法时，实际上并没有出现太多不同的函数。实际上，该属性使我们能够根据问题规模的增长来对算法进行真正的分类。这就是我们接下来要谈论的内容。所以好消息是，我们感兴趣的算法只有这几个函数。我们可以制作具有其他功能的东西。这也有反例。但实际上，我们考虑的大量算法都是通过这里绘制的这几个函数来描述的。

发言人   00:49
When we're talking about order of growth, we're not talking about the leading constant. Normally, we'll say the running time of the algorithm is proportional to n log n, that means we think that our hypothesis is that the running time is tilde c log n, n log n, where c is some constant. And these plots, these are log log plots that really give a good idea of what's going on. 
当我们谈论增长的顺序时，我们不是在谈论前导常数。通常，我们会说算法的运行时间与n log n成正比，这意味着我们认为我们的假设是运行时间为tilde c log n，n log n，其中c是某个常数。而这些图，这些是对数图，它们真正给出了正在发生的事情的一个好主意。


发言人   01:16
If an order of growth is logarithmic or constant, it doesn't matter how big the thing is. It's going to be fast. If the running time is t for, say, 1000, then for half a million, it'll be pretty close to t, it's linear if it order of growth is proportional to n, then as the running time, as the size increases, the running time increases correspondingly. 
如果增长的顺序是对数或常数，那么它有多大并不重要。这将会很快。如果运行时间为t，比如说1000，那么对于五十万，它将非常接近t，如果它的增长顺序与n成正比，那么这是线性的，随着运行时间的增加，随着大小的增加，运行时间也相应地增加。




发言人   01:46
And the same is true almost if it's n log n, so those are the algorithms that we strive for. They scale with the input size. As the input grows, so grows the running time, that's a reasonable situation to be in, as we talked about and we talked about union, fine, if it's quadratic, the running time grows much faster than the input size, and it's not feasible to use such an algorithm for large inputs, and cubic is even worse. So what we find is for many algorithms, our first task is really simply make sure it's not quadratic or cubic. And these order growth classifications actually come from kind of simple patterns in terms of the code that we write. So if our code has no loops in it, then the order growth is going to be constant. 
几乎在n log n的情况下也是如此，因此这些就是我们努力追求的算法。它们随输入大小而缩放。随着输入的增长，运行时间也会增长，这是一个合理的情况，正如我们所谈论的，我们谈论联合，好的，如果它是二次方的，运行时间的增长速度比输入大小快得多。对于大型输入使用这种算法是不可行的，立方则更糟。所以我们发现，对于许多算法，我们的第一个任务就是确保它不是二次或三次。这些订单增长分类实际上来自于我们编写的代码的简单模式。因此，如果我们的代码中没有循环，那么订单增长将是恒定的。




发言人   02:45
If our code has some kind of loop where the input is divided in half. And so binary search algorithm is an example of that. Then our order growth will be logarithmic. And we'll take a look at that analysis. But if you do the doubling test, it grows almost linearly. If you have a huge input and you double the size, it's still going to be, I'm sorry, not linearly constant. Just like if it's constant, you'll hardly notice that log n? 
如果我们的代码有某种循环，其中输入被分成两半。二分查找算法就是一个例子。那么我们的订单增长将是对数的。我们来看看这个分析。但是如果你进行加倍测试，它几乎呈线性增长。如果你有一个巨大的输入，并且大小增加了一倍，那么它仍然不会是线性常数，对不起。就像它是常数一样，你几乎不会注意到log n？


发言人   03:19
If you have a loop where you touch everything in your input, then the running time is linear proportional to n, so a typical example of that would be find the maximum or count the number of zeros or 1 sum problem. A very interesting category is the so called AED n log n algorithms or linear rhythmic algorithms. And those are the ones that arise from a particular algorithm design technique called divide and conquer. And the merge sort algorithm, which we'll talk about in a couple of weeks, is a prime example of that. 
如果你有一个循环，你在输入中触摸所有东西，那么运行时间与n呈线性正比，所以一个典型的例子是找到最大值或计算零的数量或1和问题。一个非常有趣的类别是所谓的AED n log n算法或线性节奏算法。而这些是由一种称为分而治之的特定算法设计技术产生的。而我们将在几周后讨论的合并排序算法就是一个很好的例子。

发言人   04:00
And then if you have double 4 loops, like our 2 sum algorithm, that's going to be time proportional to n squared. As we saw, that's quadratic or triple for loop, like our 3 sum algorithm, that's going to be cubic, or time proportional to n cube For a quadratic algorithm or a cubic algorithm, the doubling factor is 4 or 8 as the input size double. For a cubic algorithm, the running time goes up by a factor of 8. And that's the kind of calculation you can do in your head while waiting for a program to finish. There's also a category of algorithms whose running time is exponential and those algorithms and doesn't get very large at all, and we'll talk about those at the end of part two of the course. So these are some practical implications of the order of growth. 
然后，如果你有两个4循环，就像我们的2和算法一样，那将是与n平方成正比的时间。正如我们所看到的，那是二次或三重for循环，就像我们的3和算法一样，它将是立方的，或者是与n个立方体成比例的时间，对于二次算法或立方算法，倍增因子是4或8作为输入大小加倍。对于立方体算法，运行时间增加了8倍。而这就是在等待程序完成时你可以在脑海中进行的计算。还有一类算法的运行时间是指数级的，而这些算法根本不会变得很大，我们将在课程第二部分结束时讨论这些算法。这些是增长顺序的一些实际含义。


发言人   04:54
And we won't really dwell on this too much, except to come back to the point that the algorithms that we're really interested in that can solve huge problems are the linear and n log n algorithms, because even now a quadratic algorithm on a typical fast computer could only solve problems in, say, in the tens of thousands, and a cubic algorithm only in the size of thousands. And nowadays, those are just not useful because the amount of data that we have is more like the millions, billions, or trillions that fact is becoming more and more evident as time wears on in ancient times. 
我们不会在这个问题上花太多时间，除了回到我们真正感兴趣的可以解决大问题的算法是线性和n log n算法，因为即使现在，典型快速计算机上的二次算法也只能解决例如以下问题:在成千上万的情况下，一个只有数千大小的立方体算法。而现在，这些并不有用，因为我们拥有的数据量更像是数百万、数十亿或数万亿，随着时间的推移，这个事实在古代变得越来越明显。


发言人   05:40
We'd have some discussion about whether a quadratic algorithm might be useful. But the situation gets worse as time gets on. So we need better algorithms. 
我们将讨论二次算法是否有用。但随着时间的推移，情况变得越来越糟糕。所以我们需要更好的算法。

发言人   05:50
To illustrate the process of developing a mathematical model for describing the performance of an algorithm, we'll look at a familiar algorithm called binary search. The goal is that you have a sorted array of integers, say, and you're given a key. And you want to know, is that key in the array? And if it is, what's its index on a fast algorithm for doing this? It is known as binary search, where we compare the key against the middle entry. 
为了说明开发用于描述算法性能的数学模型的过程，我们将介绍一种熟悉的称为二分搜索的算法。目标是你有一个有序的整数数组，比如说，给你一个键。你想知道，这个密钥在数组中吗？如果是，那么在执行此操作的快速算法上，它的索引是什么？这被称为二分搜索，我们将密钥与中间条目进行比较。


发言人   06:19
In this case, if we're looking for 33, we compare it against 53. If it's smaller, we know it's in the left half of the ray. If it's larger, we know it's in the right half of the ray. If it's equal, we found it, and then we apply the same algorithm recursively. 
在这种情况下，如果我们要寻找33，我们将其与53进行比较。如果它较小，我们知道它在射线的左半部分。如果它更大，我们知道它在射线的右半部分。如果它相等，我们就找到它，然后递归地应用相同的算法。

发言人   06:35
So let's quickly look at a demo. So we're looking for 33 in this array. Compare it against the middle entry in the array 53, and it's less. So we go left. So now we can concentrate just on the left half of the array. Now we look in the middle of this half, that's 25, 33 is bigger, So we go right now, we concentrate on the right half of the left half and we have a smaller subarray. Look at the middle 33 is left, so we go left, and now we have only the one element to look at and we found our key 33 in the array and we return that index for if we're looking for something that's not in the array, we do the same process. 
让我们快速看一下演示。所以我们要在这个数组中寻找33。将它与数组53中的中间条目进行比较，它会更少。所以我们向左走。所以现在我们可以专注于数组的左半部分。现在我们看一下这一半的中间部分，那是25，33更大，所以我们现在集中精力在左半部分的右半部分，我们有一个较小的子数组。看中间33左边，所以我们向左走，现在我们只有一个元素要看，我们在数组中找到了我们的键33，我们返回这个索引，因为如果我们要查找数组中没有的东西，我们会执行相同的过程。


发言人   07:21
So say we're looking for 34, it's going to be the same look in the left half, look in the right half, look to the left of the 43, now there's only one key to look at it's not 34, so we say it's not there, so that's binary search, So here's the code for binary search, Actually binary search, although it's a simple algorithm, it's notoriously tricky to get every detail right. In fact, one paper claimed that the first bug freeee binary research wasn't published until 1960, and even in 2006 bug was found in Java's implementation of binary search just an indication of the care that we have to take in developing algorithms, especially for libraries that are going to be used by millions of people. 
所以假设我们要寻找34，它的左半部分将是相同的外观，在右半部分看，在43的左侧看，现在只有一个键可以看它不是34，所以我们说它不在那里。这就是二进制搜索，这里是二分查找的代码，实际上是二分查找，虽然它是一个简单的算法，但是要得到每一个细节是出了名的棘手。事实上，有一篇论文声称，第一个bug freeee二进制研究直到1960年才发表，甚至在2006年，在Java的二进制搜索实现中发现了bug，这表明我们在开发算法时必须小心谨慎。特别是那些将被数百万人使用的图书馆。


发言人   08:16
So here's an implementation. It's not recursive, although often we can implement this recursively, and it's just reflects in code what I described in words if we have to find. 
这是一个实现。它不是递归的，尽管我们通常可以递归地实现它，并且如果我们必须找到的话，它只是在代码中反映了我用语言描述的内容。


发言人   08:36
Key Weather Keys In an array, we use two pointers. Low and high indicate the part of the array that we're interested in. As long as low is less than or equal to high, we compute the middle, and then we compare our key against the middle. Actually, it's a three way compare, it's either less or it's greater, or if it's equal, we return that mid index. If it's less, we reset the high pointer. If it's greater, we reset the low pointer, and we keep going until the pointers are equal, equal, and we haven't found it, then we return -1. And it's easy to persuade ourselves that this program works as advertised by thinking about this invariant. If the key is in the array, then it's between low and high in the array. 
关键的天气键在一个数组中，我们使用两个指针。低和高表示数组中我们感兴趣的部分。只要低小于或等于高，我们就计算中间值，然后将我们的键与中间值进行比较。实际上，这是一个三方比较，要么更少，要么更大，或者如果相等，我们返回中间索引。如果它更少，我们重置高点指针。如果它更大，我们重置低位指针，并继续前进，直到指针相等，相等，并且我们没有找到它，然后我们返回-1。通过考虑这个不变量，我们很容易说服自己这个程序像宣传的那样工作。如果键在数组中，则它在数组中的低和高之间。


发言人   09:25
All right, so that's a program that you're probably familiar with. Let's look at the mathematical analysis of that program. And this is a theorem that we're going to prove. 
好的，所以这是一个你可能很熟悉的程序。让我们来看一下该程序的数学分析。这是我们要证明的定理。


发言人   09:36
We usually, we won't do a lot of proofs, but this one's worth doing, so it says that binary search uses at most one plus log base 2 of n compares to complete a search in a sorted array of size n, so we do that, set up the problem by defining a variable t of n, which is the number of compares that binary search is going need, first array of size n, and then we write down a recurrence relation that is reflects the code. And what the code does is it divides the problem size in half, so that t of n is less than or equal to t of n over 2 plus depending on how you count what the compare is think of it as really a two way compare so divided in half by doing one compare, and that's true as long as n's bigger than one. If n is equal to one, the solution is one. So it's a recurrence relation describing the computation. And so we can go ahead and solve this recurrence by applying the recurrence itself to the first term on the right. That's called telescoping. So if this is true, then we can apply the same thing to t of n over 2 and throw out another one. And if this is true, and apply the same thing, n over 4, and throw out another one, and so forth until we get down to just one, in which case we have log n ones left. 
通常，我们不会做很多证明，但这个是值得做的，所以它说，二进制搜索最多使用1加log base 2的n比较在大小为n的有序数组中完成搜索，所以我们这样做，通过定义n的变量t来设置问题，n是二进制搜索所需的比较次数，第一个大小为n的数组，然后我们写下一个反映代码的递归关系。而代码的作用是将问题大小分成两半，使得n的t小于或等于n的t超过2加，这取决于你如何计算比较实际上是双向比较，因此通过进行一次比较将其分成两半。只要n大于1，那就是正确的。如果n等于1，则解是1。所以它是一个描述计算的递归关系。因此，我们可以通过将递归本身应用于右侧的第一项来解决这种递归。这叫做伸缩。所以如果这是真的，那么我们可以将同样的方法应用于2以上的n的t，并抛出另一个。如果这是真的，应用同样的东西，n超过4，然后扔掉另一个，依此类推，直到我们只剩下一个，在这种情况下，我们还有log n个。




发言人   11:15
Now, this is a proof sketch. You might have noticed that this proof actually only holds if n is a power of two, because we didn't really specify in its recurrence what we mean if n is odd. But it's possible to go ahead and, sorry, possible to go ahead and take care of that detail as well and show that binary search running time is logarithmic always. 
现在，这是一个证明草图。你可能已经注意到，这个证明实际上只有当n是2的幂时才成立，因为我们并没有在它的递归中具体说明如果n是奇数时我们的意思。但是可以继续进行，抱歉，也可以继续处理该细节，并显示二进制搜索运行时间始终是对数的。


发言人   11:49
All right, so given that fact, we can develop a faster algorithm for threesome. It's a sorting based algorithm. And so what we're going to do is we're going to take the numbers that we have as input and sort them. We'll talk about sorting algorithms next week, and we can get that done in time proportional to n log n, but that's not the main part of the computation. The main part of the computation is. 
好的，因此鉴于这个事实，我们可以为三人行开发一种更快的算法。这是一种基于排序的算法。所以我们要做的是将我们拥有的数字作为输入并对它们进行排序。下周我们将讨论排序算法，我们可以在与n log n成比例的时间内完成，但这不是计算的主要部分。计算的主要部分是。

发言人   12:19
After the numbers are sorted, we'll go through and for each pair of numbers AI and AJ, we'll do a binary search for minus AI plus Ij. If we find it, then we have three numbers. That's sum to 0. 
数字排序后，我们将遍历每对数字AI和AJ，我们将对负AI加Ij进行二进制搜索。如果我们找到它，那么我们就有三个数字。总和为0。

发言人   12:42
Sort our numbers and then go through. For each pair, do a binary search to see if it's there. So -40, minus that is 40. We do a binary there, that's in there. So we have one solution to the three sum problem and do that for all of numbers. Then a quick analysis says the order of growth of the running time is going to be n squared log n, you don't even need a good sort. Well, you could use the elementary insertion sort, the first one we talk about, but the running time of the binary search for each of the pairs, each of the n squared pairs, or n squared over two pairs, we're going to do a binary search. So we get an n squared log n running time. 
将我们的数字排序，然后浏览。对于每对，进行二分搜索以查看它是否存在。所以-40减去那个就是40。我们在那里做二进制，就在那里。所以我们有一个解决三个和问题的方案，并对所有数字都这样做。然后快速分析一下，运行时间的增长顺序将是n平方log n，你甚至不需要一个好的排序。好的，你可以使用基本插入排序，这是我们讨论的第一个方法，但是对于每对二进制搜索的运行时间，每个n平方对，或者两个对的n平方，我们将进行二进制搜索。所以我们得到一个n平方log n运行时间。


发言人   13:29
That's a quick example of how we can improve the performance. We can find an improved algorithm to solve a problem n squared log n is much less than n cubed for large n, and so we're implicitly making the hypothesis that if we do this do this sort based thing and use binary search, we're going to have a faster program. And sure enough, we can go ahead and run some experiments and find that where it took us 50 seconds to solve the problem for 8000 numbers before it's taking less than a second. Now in 50 seconds, we can solve up to 64000. So typically, we expect that better order of growth means faster in practice. But when it comes to examining the alms in detail, we can go ahead and do the tests and figure out which algorithm is faster. And certainly going from n cubed to n squared log n, we, we're going to have a much better algorithm. 
这是我们如何提高性能的一个快速示例。我们可以找到一种改进的算法来解决一个问题，对于较大的n，log n的大小远小于n的立方，因此我们隐式地假设，如果我们这样做，基于排序并使用二分查找，我们将会有一个更快的程序。果然，我们可以继续进行一些实验，发现在解决8000个数字问题之前，我们花了50秒的时间不到一秒钟。现在在50秒内，我们可以解决高达64000的问题。因此，通常情况下，我们期望更好的增长顺序意味着更快的实践。但是当涉及到详细检查施舍时，我们可以继续进行测试并找出哪种算法更快。当然，从n个立方到n个平方的对数n，我们将会有一个更好的算法。

