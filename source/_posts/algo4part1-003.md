---
title: 算法 第一部分 003 快速查找
date: 2025-10-13 10:00:28
---

https://www.tongyi.com/creations/folders/1908053325178752000


发言人   00:02
Now we'll look at our first implementation of an algorithm for solving the dynamic connectivity problem called Quick Find. This is a so called eager algorithm for solving connectivity problem. The data structure that we're going to use to support the algorithm is simply an integer array index by object. The interpretation is the two objects p and q are connected if and only if their entries in the array are the same. So for example, in this example with our 10 objects, the idea array that describes the situation after seven connections is illustrated in the middle of the slide, so that after, at this .05, and 6 are all in the same connected component because they have the same ray entry, 0, 1, 2, and 7 all have entry 1 and 3, 4, 8, and 9 all have entry 8. So that representation is shows that they're connected. And clearly that's going to support a quick implementation of the fined operation. 
现在我们来看一下解决动态连接问题的第一个算法实现，称为快速查找。这是一个所谓的用于解决连接问题的热心算法。我们将用来支持算法的数据结构只是一个按对象索引的整数数组。解释是两个对象p和q连接，当且仅当它们在数组中的条目相同。因此，例如，在我们的10个对象的例子中，描述七个连接后情况的想法数组在幻灯片中间进行了说明，因此在此之后。05和6都在相同的连接分量中，因为它们具有相同的光线入口0、1、2和7都有条目1和3，4、8和9都有条目8。这样表示就表明它们是相连的。显然，这将支持快速实施罚款操作。

发言人   01:17
We just check the array entries to see if they're equal, check if p and q have the same ID. So 6 and 1 have different Id's, one has ID 1, 6 has ID 0. They're not in the same connected component. Union is more difficult in order to merge the components containing two given objects, we have to change all the entries whose ID is equal to one of them to the other one, and arbitrarily we choose to change the ones that are the same as p to the ones that are same as q. So if we're going to union 6 and 1, then we have to change entries 0, 5, and 6, everybody in the same connected component as 6 from 0 to 1. This is, as we'll see, this is a bit of a problem when we have a huge number of objects because there's a lot of values that can change, but still, it's easy to implement. So that'll be our starting point. 
我们只是检查数组条目以查看它们是否相等，检查p和q是否具有相同的账号。所以6和1有不同的账号，一个账号1，6账号0。它们不在同一个连接组件中。为了合并包含两个给定对象的组件，联合更加困难，我们必须将所有账号等于其中一个的条目更改为另一个，并且随意选择将与p相同的条目更改为与q相同的条目。因此，如果我们要合并6和1，那么我们必须更改条目0、5和6，与6处于相同连接组件中的每个人从0到1。正如我们将看到的那样，当我们有大量对象时，这是一个问题，因为有很多值可以更改，但仍然很容易实现。这将是我们的起点。

发言人   02:21
So we'll start with a demo of how this works. So initially, we set up the idea ray with each entry equal to its index. And so all that says is that all the objects are independent, they're in their own connected component. 
所以我们将从演示它的工作原理开始。所以最初，我们建立了想法射线，每个条目等于它的索引。因此，所有的对象都是独立的，它们都在自己的连接组件中。

发言人   02:41
Now, when we get a union operation, so say four is supposed to be union with 3, then we're going to change all entries whose ID is equal to the first ID to the second one. So in this case, we'll change the connect 3, and 4 means that we need it, changed the 4 to a three, and we'll continue to do a few more so you'll get an idea of how it works. 
现在，当我们得到一个联合操作时，所以假设4应该是3的联合，那么我们将把所有账号等于第一个账号的条目更改为第二个条目。因此，在这种情况下，我们将更改连接3，4意味着我们需要它，将4更改为3，我们将继续执行更多操作，以便您了解它的工作原理。

发言人   03:07
So 3 and 8 now. So to connect 3 and 8, now 3 and 4 have to be connected to 8. So both of those entries have to change to 8. Okay, so now what about 6 and 5? So again, we change the first one to match the second one. So to connect 6 and 5, we change the 6 to a 5. What about 9 and 4? So now we have to change the to connect 9 and 4. We have to change nines entry to be the same as 4. So now we have 3, 4, 8, and 9, all have entries 8, They're all in the same connected component. 
现在是3和8。所以要连接3和8，现在3和4必须连接到8。所以这两个条目都必须更改为8。好的，那么现在6和5呢？所以，我们再次更改第一个以匹配第二个。为了连接6和5，我们将6更改为5。9和4怎么样？所以现在我们必须将更改为连接9和4。我们必须将nines条目更改为与4相同。现在我们有3、4、8和9，它们都有条目8，它们都在同一个连接的组件中。

发言人   03:51
Two and one means that we connect 2 and 1 by changing the two to a one. Eight and 9 are already connected. They have the same entries in the idea rate. So that connected query, that fine says true. They're already connected in 5 and 0 have different entries, they're not connected, so would return false in that case, not connected. And then if we want to connect 5 and 0, then as usual, we'll connect the entry corresponding to both five and 6 to 0. 
2和1意味着我们通过将2和1更改为1来连接2和1。8和9已经连接。他们在创意率方面有相同的条目。所以，连接查询，很好说是真的。它们已经在5中连接，并且0具有不同的条目，它们没有连接，因此在这种情况下会返回false，没有连接。然后，如果我们想要连接5和0，那么像往常一样，我们将对应于5和6的条目连接到0。

发言人   04:37
Seven and 2, union, 7 and 2. That's an easy one in union 6 and 1. So now is three entries that have to get changed. All those zeros have to get changed to ones. So that's a quick demo of Quick Find. Now, next, we'll look at the code for implementing that. 
7和2，联合，7和2。在联盟6和1中，这是一个简单的问题。现在有三个条目需要更改。所有这些零必须更改为1。这是快速查找的快速演示。现在，接下来，我们将看一下实现它的代码。

发言人   05:03
OK, with this concrete demo in mind, then moving to coding up, this algorithm is pretty straightforward, although it's an interesting programming exercise that a lot of us would get wrong the first time. 
好的，考虑到这个具体的演示，然后开始编码，这个算法非常简单，尽管这是一个有趣的编程练习，我们很多人第一次都会出错。

发言人   05:19
So let's start with the constructor. Well, we have a private integer array. That's our ID array. That's the data structure that's going to support this implementation. The constructor has to create the array and then go through and set the value corresponding to each index I to I, that's straightforward defined operation or connected operation, that's the easy one. This is the quick find algorithm, so it simply takes his two arguments, p and q, and checks whether their ID entries are equal returns that value. If they're equal, it returns true. If they're not equal, it returns false. 
所以让我们从构造函数开始。好的，我们有一个私有整数数组。这就是我们的账号阵列。这就是将支持此实现的数据结构。构造函数必须创建数组，然后遍历并设置对应于每个索引I到I的值，这是简单的定义操作或连接操作，这很容易。这是快速查找算法，因此它只需要他的两个参数p和q，并检查它们的账号条目是否相等，然后返回该值。如果它们相等，则返回true。如果它们不相等，则返回false。

发言人   06:05
The more complicated operation implement is union, and there we find first the ID corresponding with the first argument, and then the ID corresponding to the second argument, and then we go through the whole array and looking for the entries whose Id's are equal to the idea of the first argument and set those to the idea of the second argument. That's a pretty straightforward implementation. And I mentioned that a lot of us would get us wrong. The mistake we might make is to put ID of p here rather than first picking out that value. And you can think about the implications of that. That's an insidious bug. So that's a fine implementation of Quick Find. 
更复杂的操作实现是联合，在那里我们首先找到与第一个参数对应的账号，然后找到与第二个参数对应的账号，然后我们浏览整个数组，寻找Id等于第一个参数思想的条目，并将这些条目设置为第二个参数的思想。这是一个相当简单的实现。我提到我们很多人会把我们搞错。我们可能犯的错误是把p的账号放在这里，而不是先挑出那个值。你可以考虑一下这个问题的含义。这是一个阴险的bug。这是快速查找的一个很好的实现。

发言人   06:51
Now the next thing is to decide how effective or efficient that algorithm is going to be, and we'll talk in some detail about how to do that, but for this, it's sufficient to just think about the number of times the code has to access the array. As we saw, when doing the implementation, both the initialize and the union operations involve the for loop that go through the entire array. So they have to touch a constant proportional to n times they have to touch an array entry, find operation is quick, it just has to constant number of times, check array entries, And this is problematic because the union operation is too expensive. In particular, if you just have n union commands on n objects, which is not unreasonable, they're either connected or not, then that'll take quadratic time, n squared time, and one of the themes that we'll go through over and over in this course is that quadratic time is much too slow, and we can't accept quadratic time algorithms for large problems. 
现在下一件事是决定算法的有效性或高效性，我们将详细讨论如何做到这一点，但为此，只需考虑代码访问数组的次数就足够了。正如我们所看到的，在实现时，初始化和联合操作都涉及穿过整个数组的for循环。所以他们必须触摸一个与n次成比例的常数，他们必须触摸一个数组条目，查找操作很快，它只需要常数次，检查数组条目，这是有问题的，因为联合操作太昂贵了。特别是，如果你只在n个对象上有n个联合命令，这不是不合理的，它们要么连接要么不连接，那么这将需要二次时间，n平方时间。在这门课程中，我们将反复讨论的一个主题是二次时间太慢，对于大型问题，我们不能接受二次时间算法。

发言人   08:08
The reason is they don't scale as computers get faster and bigger quadratic algorithms actually get slower, and let's just talk roughly about what? I mean by that a very rough standard say for now is that people have computers that can run billions of operations per second, and they have millions of entries in main memory. So that means that you could touch everything in the main memory in about a second. It's kind of an amazing fact that this rough standard is really held for 50 or 60 years. The computers get bigger, but they get faster, So to touch everything in the memory, it's going to take a few seconds, and that was true when computers only have a few thousand words of memory. And it's true now that they have billions or more. So let's accept that as what computers are like. Now that means is that with that huge memory, we can address huge problems, so we could have billions of objects and hope to do billions of union commands on them, but the problem with that quick find algorithm is that that would take 10 to the 18th operations or say array axis or touching memory. 
原因是它们不能随着计算机变得更快而扩展，而二次算法实际上变得更慢，让我们粗略地谈谈什么？我的意思是，目前一个非常粗略的标准是，人们拥有每秒可以运行数十亿次操作的计算机，并且在主内存中有数百万个条目。这意味着你可以在大约一秒钟内触摸主存储器中的所有内容。这个粗略的标准能够持续50或60年，这是一个令人惊讶的事实。计算机变得越来越大，但速度也越来越快，因此要触摸内存中的所有内容，需要几秒钟的时间，当计算机只有几千字的内存时，情况就是如此。现在他们确实拥有数十亿甚至更多。因此，让我们接受计算机的样子。现在这意味着有了这么大的内存，我们可以解决巨大的问题，因此我们可能拥有数十亿个对象，并希望在它们上执行数十亿个联合命令。但是快速查找算法的问题在于，这将需要10到18次操作，或者说数组轴或触摸内存。

发言人   09:31
And if you do the math, that works out to 30 some years of computer time. 
如果你算一下，可以计算出大约30年的计算机时间。

发言人   09:37
Obviously not practical to address such a problem on today's computer. And the reason is, and the problem is that quadratic algorithms don't scale with technology, you might have a new computer that's 10 times as fast, but you can address a problem that's 10 times as big. And with the quadratic algorithm, when you do that, it's going to be 10 times as slow. That's the kind of situation we're going to try to avoid by developing more efficient algorithms for solving problems like this. 
在今天的计算机上解决这样的问题显然是不实际的。原因是，问题是二次算法不能随着技术的发展而扩展，你可能有一台速度是其10倍的新计算机，但你可以解决其10倍的问题。使用二次算法，当你这样做时，速度将会慢10倍。这就是我们将通过开发更有效的算法来解决此类问题来试图避免的情况。
