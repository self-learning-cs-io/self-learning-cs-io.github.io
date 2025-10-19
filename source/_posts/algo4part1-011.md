---
title: 算法 第一部分 011 memory
date: 2025-10-13 10:00:36
---

发言人   00:01
So far, we've been talking about running time. Now we have to talk about the memory requirements of our programs as well. Well, the basics are we want to know how many bits the program used or bytes, 8 b at a time. And actually, we'll be talking in terms of billions of bits or billions of bits. And actually, surprisingly, there controversy about even these basic definitions. Computer scientists think of 1 million bits as two to the 20th, and 1 million is 2 to the 30th, because that's the number of possible things that you can fit into 30 b and everything is consistent with our calculations. Other scientists stick to 1 million and 1 billion for lots of reasons. We'll usually use two to the 20th to mean a megabyte. 
到目前为止，我们一直在谈论跑步时间。现在我们还必须讨论程序的内存需求。嗯，基本的是我们想知道程序使用了多少位或字节，一次8 b。实际上，我们将以数十亿位或数十亿位的方式进行讨论。实际上，令人惊讶的是，关于这些基本定义也存在争议。计算机科学家认为一百万比特是二的二十倍，一百万是二的三十倍，因为这是你可以放入30 b的可能事物的数量，一切都与我们的计算一致。其他科学家坚持100万和10亿有很多原因。我们通常会使用2到20th来表示1兆字节。



发言人   00:52
Now, on old computers, we used to for many years, use a 32 b machine so that pointers were 4 B. Just in recent years, we've mostly switched to a model where machines are 64 B and pointers are 8 B. That allows us to address much more memory, but pointers use much more space. And actually, this transition caused a lot of problems initially because programs were using way more space than people thought they should. You're not going to have to go through this kind of transition the way that we did, because 64 b is definitely enough to address anything that you might need to address. 
现在，在旧电脑上，我们使用32 b机器，因此指针是4 B。就在最近几年，我们大多切换到了机器是64 B，指针是8 B的模式。这允许我们寻址更多的内存，但指针使用更多的空间。实际上，这种转变最初引起了很多问题，因为程序使用的空间比人们认为的要多。你不必像我们那样经历这种转变，因为64 b绝对足以解决你可能需要解决的任何问题。

发言人   01:36
Two to the 64th is really a huge number. So in terms of bytes, we have to start out with typical memory usage. Now, again, this is very dependent on machine and implementation, but these numbers are reasonable and are found on typical implementations. So a Boolean, it would be nice if Boolean just took a bit because it's just true or false, but actually, usually we have to count for a bite for a Boolean, or a bite is a byte character. Nowadays, it's 2 B, 16 b characters. Not that long ago, we used 8 b for cares integer, regular int is 4 B, 32 b, and float is also 4 B, long int is 8, and a double is a, usually we use doubles for floating point in inch for integers, most applications, so that's for primitive types. And then for arrays, there's a certain amount of overhead for making an array, and then if there's n items, it's whatever the cost of the primitive type times n, so an array of doubles is, say 8 n plus 24 in 2000 dimen sional array, then well, we can go ahead and compute the exact thing, but now it's time to use the tilde notation. Even for raises, we could say a double is tilde 8 n for one dimensional for two dimensional, two dimensional array of doubles is tilde 8 MN, and there's extra terms for the overhead, but for large m and n that's going to be pretty accurate, so that's our basic usage for primitive types in arrays in a typical Java implementation. 
2到64号确实是一个巨大的数字。所以在字节方面，我们必须从典型的内存使用开始。现在，这非常依赖于机器和实现，但这些数字是合理的，并且可以在典型的实现中找到。所以布尔值，如果布尔值只占了一点，那就好了，因为它只是真的或假的，但实际上，通常我们必须计算布尔值的咬合，或者咬合是一个字节字符。现在，它有2个B、16个b字符。不久前，我们用8 b表示关心整数，常规int是4 B，32 b，float也是4 B，long int是8，double是a，通常我们用双精度整数表示以英寸为单位的浮点整数，大多数应用程序，所以这是针对原始类型的。然后，对于数组，创建数组需要一定的开销，如果有n个项目，则无论原始类型的成本乘以n，因此一个双精度数组是，例如8 n加上2000维数组中的24个，那么好吧，我们可以继续计算精确的东西，但现在是时候使用波浪符号了。即使是对于加薪，我们可以说double对于一维对于二维来说是tilde 8 n，二维的double数组是tilde 8 MN，并且还有额外的开销项，但是对于大的m和n，这将是相当准确的。这就是我们在典型的Java实现中对数组中基元类型的基本用法。



发言人   03:29
Now, a lot of our programs use objects like linked lists and so forth, so we have to also factor in object overhead, cost of our reference, and also there's padding built in typical implementations to make it so that each object has to use a multiple of 8 B. So for example, if you had a date object that had three int instance variables, then that object would take a total of 32 B each intakes 4 B object overhead is 16 B. I need 4 B for padding, so it's a total of 32 B. So, and the other one that often comes up as a string, and a string is a little bit more complicated then an array. But the typical implementation of a string in Java has a reference out to an array of characters. And then it's got int values for offset count and a hash value, and then some padding. And adding it all together, the cost of a string is about 2 n plus 64 B. So these are the basics that we need to analyze the memory usage for a typical Java program. 
现在，我们的许多程序都使用链表等对象，因此我们还必须考虑对象开销、引用成本以及典型实现中内置的填充，以使每个对象必须使用8 B的倍数。因此，例如，如果您有一个具有三个int实例变量的日期对象，那么该对象将总共需要32 B，每个摄入量4 B对象开销为16 B。我需要4 B来填充，所以总共有32 B。所以，另一个经常以字符串形式出现，字符串比数组稍微复杂一些。但是在Java中字符串的典型实现有一个对字符数组的引用。然后它有偏移量计数的int值和一个哈希值，然后有一些填充。把它们加在一起，一个字符串的成本大约是2 n加64 b。这些是我们分析典型Java程序内存使用情况所需的基础知识。




发言人   04:57
So Pri for data type value, if it's a primitive type, it's 4 for an eight for a double, and so forth. If it's a reference, it's going to be 8 B. That's what a pointer takes, array 24 B plus the memory for each entry, and an object 16 B plus the memory for the instance variable plus. If there's an inner class, it's another 8 B, as we talked about with nodes for linkless. And then there's the padding. So then we have to think about who's responsible for referenced objects in some cases, and we'll take care of that when we get to these situations. 
因此，对于数据类型值而言，如果它是基元类型，则对于双精度值而言，它是4的8，依此类推。如果它是一个参考，它将是8 B。这就是指针所需要的，数组24 B加上每个条目的内存，对象16 B加上实例变量的内存。如果有一个内部类，它是另一个8 B，正如我们所讨论的无链接节点。然后是填充物。所以我们必须考虑在某些情况下谁负责引用对象，当我们遇到这些情况时，我们会处理这个问题。


发言人   05:41
So as an example, a simple example of memory use analysis, let's take a look at how much memory our weighted quick union Uf function from few lectures ago uses as a function of n, and there's only a couple of memory elements, and each one of them are easily analyzed using the basics that we just gave. It's an object, so there's 16 B of object overhead, There's two int arrays. Each one of them have array overhead of 24 plus, and then 4 n for the n entries. Each end of the n entries takes 4 B, and then there's 4 B for the count, there's 4 B for the padding, and if you add it all together, it's 8 n plus 88, which is tilde 8 n, And again, all that's saying is when n is large, all we are going to care about in terms of analyzing the memory is that we've got. Two n integers, two arrays of size n, each one of which takes 4 B for a grand total of 8 n bytes. 
所以举个例子，一个简单的内存使用分析的例子，让我们来看看我们的加权快速联合函数从几次讲座前使用多少内存作为n的函数，而且只有几个内存元素，它们中的每一个都很容易使用我们刚刚给出的基础知识进行分析。它是一个对象，所以有16 b的对象开销，有两个int数组。它们中的每一个都有24加上的数组开销，然后n个条目为4 n。每个n个条目的结尾都需要4 B，然后计数为4 B，填充为4 B，如果你把它们加在一起，它是8 n加88，这是波浪号8 n，再一次，这就是说，当n很大时，在分析记忆方面，我们所关心的只是我们已经拥有了。两个n个整数，两个大小为n的数组，每个数组占用4 B，总计8 n个字节。

发言人   06:57
Okay, so in summary, we really can figure out how many times we have to turn the crank on modern computers. We can do it with empirical analysis, where we actually execute the program to do experiments and use, assume a power law, formulate hypothesis, and make predictions. But we can do more. We can do mathematical analysis where we can identify the most costly operations, analyze the frequency of execution of those operations, and using the tilde notation to simplify analysis, we can actually explain the behavior, not just predict it. And this is a fine example of the use of the scientific method to understand the artifacts that we're studying. The algorithms are mathematical. Models are usually independent of a particular computer system and even applied to machines that are not yet built. But we always validate our mathematical models by running experiments on real machines so that we can be confident when we're making predictions in analyzing algorithms. 
好的，总之，我们真的可以计算出我们需要在现代计算机上转动多少次。我们可以通过经验分析来做到这一点，在经验分析中，我们实际执行程序进行实验和使用，假设幂定律，提出假设，并做出预测。但是我们可以做得更多。我们可以进行数学分析，识别最昂贵的操作，分析这些操作的执行频率，并使用波浪符号来简化分析，我们可以实际解释行为，而不仅仅是预测它。这是使用科学方法来理解我们正在研究的文物的一个很好的例子。算法是数学的。模型通常独立于特定的计算机系统，甚至适用于尚未建造的机器。但是我们总是通过在真实机器上运行实验来验证我们的数学模型，以便我们在分析算法时做出预测时充满信心。

