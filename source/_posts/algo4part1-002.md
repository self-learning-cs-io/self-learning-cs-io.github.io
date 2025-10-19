---
title: 算法 第一部分 002 动态连接 dynamic connectivity
date: 2025-10-13 10:00:27
---

发言人   00:00
Welcome back to algorithms. Today we're going to talk about the union find problem, a set of algorithms for solving the socalled dynamic connectivity problem. We look at 2 classic algorithms, quick find and quick union, and some applications and improvements of those algorithms. 
欢迎回到算法。今天我们将讨论联合精细问题，这是一组解决所谓的动态连接问题的算法。我们将介绍两种经典算法，快速查找和快速联合，以及这些算法的一些应用和改进。

发言人   00:20
The subtext of today's lecture really is to go through the steps that we'll follow over and over again to develop a useful algorithm. The first step is to model the problem, try to understand basically what are the main elements of the problem that needs to be solved. Then we'll find some algorithm to solve the problem. In many cases, the first algorithm we come up with would be fast enough, maybe fits in memory, and we go ahead and use it and be off and running. But in many other cases, maybe it's not fast enough or there's not enough memory. So what we do is try to figure out why, find a way to address whatever's causing that problem, find a new algorithm, and iterate until we're satisfied. 
今天讲座的潜义实际上是通过我们将一遍又一遍地遵循的步骤来开发一个有用的算法。第一步是对问题进行建模，尝试基本理解需要解决的问题的主要元素是什么。然后我们会找到一些算法来解决这个问题。在许多情况下，我们提出的第一个算法足够快，可能适合内存，然后我们继续使用它并运行。但在许多其他情况下，可能速度不够快，或者没有足够的内存。所以我们要做的是尝试找出原因，找到一种方法来解决导致该问题的原因，找到一种新的算法，并迭代直到我们满意。


发言人   01:04
This is a scientific approach to designing and analyzing algorithms, where we build mathematical models to try to understand what's going on. And then we do experiments to validate those models and help us improve things. 
这是一种设计和分析算法的科学方法，我们建立数学模型来试图理解发生了什么。然后我们进行实验来验证这些模型并帮助我们改进事物。

发言人   01:19
So first, we'll talk about the dynamic connectivity problem, the model of the problem for union find. So here's the idea. They're going to have a set of n objects. It doesn't really matter what they are. We're going to use the numbers 0 through n to model our objects. And then we have the idea of a connection between two objects, and we'll postulate that there's going to be a command that says connect two objects, given two objects, provide a connection between them. 
所以首先，我们将讨论动态连接问题，即联合发现问题的模型。所以想法是这样的。他们将拥有一组n个对象。它们是什么并不重要。我们将使用数字0到n来建模我们的对象。然后我们有了两个对象之间连接的想法，我们假设会有一个命令说连接两个对象，给定两个对象，提供它们之间的连接。


发言人   01:50
And then the key part of the problem is the find query or the connected query, which just to ask, is there a path connecting the two objects? So for example, in this set of 10 objects, we've performed already a bunch of union commands connecting four and 3 and 3 and 8 and 6 and 5, 9 and 4 and 2, and 1. And now we might have a connected query that says, is 0 connected to 7? Well, in this case, there's no connection, so we say no. But if we ask, is 8 connected to 9, we're going to say yes, even though we don't have a direct connection between 8 and 9, there's a path from 8 to 3 to 4 to 9. So that's our problem, to be able to efficiently support these two commands for a given set of objects. 
然后问题的关键部分是查找查询或连接查询，这只是为了问，是否有连接两个对象的路径？例如，在这一组10个对象中，我们已经执行了一堆联合命令，连接4和3和8和6和5，9和4和2和1。现在我们可能有一个连接的查询，它说，0连接到7吗？好吧，在这种情况下，没有联系，所以我们说不。但是如果我们问，8连接到9，我们会说是，即使我们在8和9之间没有直接连接，也有从8到3到4到9的路径。所以这就是我们的问题，能够有效地支持一组给定对象的这两个命令。


发言人   02:43
Now, let's say we add a union 5, 0, so that creates a connection between 5 and 0, 7 and 2 creates a connection between 7 and 2 and 6, and one between 6 and 1. So now if we ask or zero connected that 7, well, one and 0, we can do that too. And that's a redundant connection. And now if we ask is 0 connected to 7, we're going to answer yes. So that's our problem, intermix union commands and connected queries, and we need to be able to efficiently support those commands for a large number of objects. 
现在，假设我们添加一个联合5，0，以便在5和0之间创建一个连接，在7和2之间创建一个连接，在6和1之间创建一个连接。所以现在如果我们询问或零连接7，那么，1和0，我们也可以这样做。这是一个冗余连接。现在，如果我们问是0连接到7，我们将回答是。这就是我们的问题，混合联合命令和连接的查询，我们需要能够有效地支持大量对象的这些命令。


发言人   03:21
So here's a much bigger example. And you can see that we're going to need efficient algorithms for this. First of all, you can see we're going to need a computer for this would take quite some time for a human to figure out whether there's a connection. In this case, there is a connection. Now, the algorithms that we're looking at today are not going to actually give the path connecting the two objects. It's just going to be able to answer the question, is there a path? 
这里有一个更大的例子。你可以看到，我们需要有效的算法来实现这一点。首先，你可以看到我们需要一台计算机，因为这需要相当长的时间才能让人类弄清楚是否存在连接。在这种情况下，有一个连接。现在，我们今天看到的算法并不会真正给出连接两个对象的路径。它只是能够回答这个问题，有没有路径？

发言人   03:48
In part two of the course, we'll consider algorithms that explicitly find paths. They're not as efficient as union fine because they have more work to do. 
在本课程的第二部分中，我们将考虑显式查找路径的算法。他们不如工会罚款高效，因为他们有更多的工作要做。

发言人   04:00
Applications of these algorithms involve objects of all types. These are used for digital photos where the objects are pixels. They're used for networks where the objects are computers, social networks, where it's people, or computer chips, where it's circuit elements, or abstract things like variable names in a program or elements in a mathematical set, or physical things like metallic sites in a composite system. So all different types of objects. But for programming, we're going to associate each object with the name, and we'll just name the objects with the number integers from 0 to n -1. That's a very convenient initial starting point for our programs because we can use integers as an index into an array then, and then quickly access information relevant to each object. It also just suppresses a lot of details that are not relevant to union find. In fact, to make this mapping from an object name to the integer 0 through n -1 is a fine application of a symbol table or a searching al, which is one of the things that we'll be studying later in this course. 
这些算法的应用涉及所有类型的对象。这些用于数码照片，其中对象是像素。它们被用于网络，其中对象是计算机，社交网络，其中对象是人，或计算机芯片，其中对象是电路元件，或抽象事物，如程序中的变量名称或数学集合中的元素，或物理事物，如复合系统中的金属站点。所以所有不同类型的物体。但是对于编程，我们将把每个对象与名称相关联，并且我们只会用从0到n -1的整数命名这些对象。这是我们程序的一个非常方便的初始起点，因为我们可以使用整数作为数组的索引，然后快速访问与每个对象相关的信息。它还会抑制许多与联合查找无关的细节。实际上，将这个从对象名称映射到整数0到n -1是符号表或搜索的一个很好的应用，这是我们将在本课程后面学习的事情之一。

发言人   05:18
Algorithms and data structures, not for solving that problem. 
算法和数据结构，不是为了解决那个问题。

发言人   05:23
Now the connections, well, we need a few abstract properties that these connections have to satisfy, and they're all quite natural and intuitive. So we assume that is connected to is an equivalence relation. That is, every object is connected to itself. It's symmetric. If p is connected to Q, then Q is connected to P, and it's transitive. If p is connected to q and q is connected to R, then P is connected to R? Now, these properties are very intuitive, but it's worthwhile to state them explicitly and make sure that our algorithms maintain them. 
现在的连接，我们需要一些抽象的属性来满足这些连接，它们都非常自然和直观。因此，我们假设所连接的是一个等价关系。也就是说，每个物体都与其自身相连。它是对称的。如果p连接到Q，则Q连接到P，并且它是可传递的。如果p连接到q，q连接到R，那么P连接到R？现在，这些属性非常直观，但是明确说明它们并确保我们的算法维护它们是值得的。

发言人   06:07
When you have an equivalence relation, a set of objects and connections divide into subsets called connected components. Connected component is a maximal set of objects that's mutually connected. For example, in this small example here, there's three connected components, 1 consisting of just object 0, second one, objects 1, 4, and 5, and third one, the other four objects. And these components have the property that if any two objects in them are connected, and there's no object outside that's connected to those objects, connected components, our algorithms will gain efficiency by maintaining connected components and using that knowledge to efficiently answer the query that they're presented with. 
当你有一个等价关系时，一组对象和连接分成称为连接组件的子集。连通分量是相互连接的对象的极大集合。例如，在这个小例子中，有三个连接的组件，1个仅由对象0组成，第二个由对象1、4和5组成，第三个由其他四个对象组成。这些组件具有这样的性质，即如果其中任何两个对象是连接的，并且没有任何外部对象连接到这些对象，连接组件，我们的算法将通过维护连接组件并利用该知识高效地回答它们所呈现的查询来提高效率。

发言人   07:03
Okay, so to implement the operations, we have the fine query and the union command. And so we're going to maintain the connected components. The find is going to have to check if two objects are in the same component, and the union command is going to have to replace components containing two objects with their union. So for example, if we have these components and we get the command to connect 2 and 5, essentially we need to merge the connected components, the one containing two, with the one containing 5 to get a big connected components. And now we have only two connected components. 
好的，为了实现这些操作，我们有精细查询和联合命令。因此，我们将维护连接的组件。查找必须检查两个对象是否在同一组件中，并且联合命令必须将包含两个对象的组件替换为它们的并集。因此，例如，如果我们有这些组件，并且我们得到连接2和5的命令，基本上我们需要合并连接的组件，一个包含2，一个包含5，以获得一个大的连接组件。现在我们只有两个相连的组件。


发言人   07:46
All of that leads up to, in a programming world, to specifying a data type, which is simply a specification of the methods that we're going to want to implement in order to solve this problem. So in our typical Java model, what we'll do is create a class called Uf that contains two methods, 1 to implement union, the other one to implement connected, which returns a Boolean. The constructor takes as argument the number of objects so that it can build data structures based on that number of objects. And we have to bear in mind as we're building our algorithms, that both the number of objects can be huge, but also the number of operations we can have a very large number of union and operations. And our algorithms are going to have to be efficient under those conditions. 
在编程世界中，所有这些都会导致指定数据类型，这只是我们想要实现的方法的规范，以解决这个问题。因此，在我们典型的Java模型中，我们将要做的是创建一个名为Uf的类，其中包含两个方法，一个用于实现联合，另一个用于实现连接，这将返回一个布尔值。构造函数将对象的数量作为参数，以便可以基于该数量的对象构建数据结构。当我们构建算法时，我们必须记住，对象的数量可能是巨大的，但操作的数量也可能是非常多的联合和操作。在这些条件下，我们的算法必须高效。



发言人   08:49
One of the practices that we will follow often in this course is to check our API design before getting too far into dealing with the problem by building a client that is going to use the data type that we develop. 
在本课程中，我们将经常遵循的一种做法是，在过于深入处理问题之前，通过构建一个使用我们开发的数据类型的客户端来检查我们的API设计。

发言人   09:07
So for this example, we've got a client that will read information from standard input first, an integer, which is the number of objects that are going to be processed, and then a series of pairs of object names. And what the client does is it'll first, it'll read the integer from standard input and create a Uf object. And then as long as standard input is not empty, it's going to read two integers from the input. And if they're not connected, then it'll connect them and print them out. If they are connected, it'll ignore them. So that's our test client. And that's a fine test client to make sure that any implement does what we expect that it will. So that's the setup we've described the operations we want to implement all the way down to code, and we have client code that we're going to have to be able to service with our implementations. 
因此，在这个例子中，我们有一个客户端，它将首先从标准输入中读取信息，第一个是一个整数，它是将要处理的对象数量，然后是一系列对对象名称。而客户端所做的是首先从标准输入中读取整数并创建一个Uf对象。然后只要标准输入不为空，它就会从输入中读取两个整数。如果它们没有连接，那么它会连接它们并打印出来。如果它们连接在一起，它会忽略它们。这就是我们的测试客户端。这是一个很好的测试客户端，可以确保任何实现我们期望的那样。所以这就是我们描述的设置，我们想要实现的操作一直到代码，我们有客户端代码，我们必须能够与我们的实现一起服务。

