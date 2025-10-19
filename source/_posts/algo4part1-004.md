---
title: 算法 第一部分 004 quick-union
date: 2025-10-13 10:00:29
---

https://lxblog.com/efficiency/U/yIUfFJJBHPqgAotad6PnPMRhevioM256


发言人   00:02
All right, so quick find is too slow for huge problems. So how are we going to do better? Our first attempt is an alternative called quick union. This is so called AED lazy approach to algorithm design, where we try to avoid doing work until we have to. It uses the same data structure or array ID with size n, but now it has a different interpretation. 
好的，快速发现对于大问题来说太慢了。那么我们该如何做得更好呢？我们的第一次尝试是称为快速联盟的替代方案。这就是所谓的AED懒惰算法设计，我们在必要时尽量避免工作。它使用大小为n的相同数据结构或数组账号，但现在有了不同的解释。

发言人   00:31
We're going to think of that array as representing a set of trees. It's called a forest, as depicted at right? So each entry in the array is going to contain reference to its parent in the tree. So for example, three's parent is 4, fourth parent is 9, so three's entry is 4, and four's entry is 9 in the array. 
我们会将该数组视为代表一组树。它被称为森林，正如所描述的那样？因此数组中的每个条目都将包含对树中它的父项的引用。例如，三的父项是4，第四个父项是9，所以在数组中，三的条目是4，而四的条目是9。

发言人   01:01
Now, each entry in the array has associated with it a root that's the root of its tree elements that are all by themselves, just in their own connected component point to themselves. So 1 points to itself, but also 9 points to itself. It's the root of the tree containing 2, 4, and 3. So from this data structure, we can associate with each item a root which is representative, say, of its connected component so. That's a root of 3. Is 9 going up that root. 
现在，数组中的每个条目都与一个根相关联，这个根是树元素的根，这些树元素都是独立的，只是在它们自己连接的组件点上。因此，1指向自身，但也有9个指向自身。它是包含2、4和3的树的根。因此，从这个数据结构中，我们可以为每个项目关联一个代表其连接组件的根。这是3的根。9是从那个根上去的。

发言人   01:43
Now, once we can calculate these routes, then we can implement the find operation just by checking whether the two items that were supposed to check, whether they're connected, where they have the same route, that's equivalent the same, are they in the same connected component? So that's some work going to find the roots of each item. 
现在，一旦我们可以计算这些路由，那么我们就可以通过检查应该检查的两个项目是否连接，它们是否具有相同的路由，等效相同，它们是否在相同的连接组件中实现查找操作？所以这是一些工作来找到每个项目的根。

发言人   02:06
But the union operation is very easy to merge components containing two different items, two items that are in different components. All we do is set the idea of p's root to the idea of Q's root, that's make Ps tree point to Q, so in this case, we would change the entry of 9 to be 6 to merge 3 and 5, the components containing 3 and 5. And with just changing one value in the array, we get the two large components emerge together. That's the quick union algorithm, because the union operation only involves changing one entry in the array, find operation requires a little more work, so let's look at the implementation, a demo of that one in operation first. 
但是联合操作非常容易合并包含两个不同项的组件，两个位于不同组件中的项。我们所做的就是将p的根的思想设置为Q的根的思想，即使Ps树指向Q，因此在这种情况下，我们会将9的条目更改为6，以合并3和5，即包含3和5的组件。只需更改数组中的一个值，我们就可以将两个大组件结合在一起。这就是快速联合算法，因为联合操作只涉及更改数组中的一个条目，查找操作需要更多的工作，所以让我们先看看实现，先在操作中演示。

发言人   02:59
So again, we start out the same way, but now the ID array entry really means that every one of these things is a little tree with one node each. Everyone pointing to itself is the root of its own tree. So now if we have to put four and 3 in the same component, then all we do is we take the root, the component containing the first item, and make that a child of the root component containing second item. In this case, we just make fourth parent 3, so now 3 and 8. So again, we take the first item and make it a child of the root of the tree containing the second item. So now 3, 4, and 8 are in the same component. 
所以，我们再次以相同的方式开始，但是现在账号数组条目实际上意味着这些东西中的每一个都是一个小树，每个节点。每个指向自己的人都是自己树的根。所以现在如果我们必须将四个和三个放在同一个组件中，那么我们所做的就是取根，即包含第一个项目的组件，并使其成为包含第二个项目的根组件的子组件。在这种情况下，我们只是使第四个父节点成为3，所以现在是3和8。所以，我们再次将第一个项目设为包含第二个项目的树根的子级。所以现在3、4和8在同一个分量中。



发言人   03:48
Six and 5. Six goes below 5, 9, and 4. So now 4 is the root of the tree containing 4 is 8, and the root of tree containing 9 is 9. And so we make 9 a child of 8. 
六个和五个。六低于5、9和4。所以现在4是包含4的树的根是8，包含9的树的根是9。因此，我们让9成为8岁的孩子。


发言人   04:10
Two and 1. That's an easy one. Now, if we get our 8 and 9 connected, we just checked that they have the same route and they both have the same route 8. And so they're connected 5 and 4. Four's root is 8, five's root is 5. They're different, they're not connected. Five and 0. 5 goes to be a child of 0. Seven and 2, Seven goes to be a child of two's root, which is one. Six and 1 six's root is 0. One's its own root. Zero becomes a child of one. 
2和1。很简单。现在，如果我们连接了8和9，我们只是检查了它们是否具有相同的路由，并且它们都具有相同的路由8。所以它们是连接5和4的。4的根是8，5的根是5。它们是不同的，它们没有联系。5和0。5将是0的孩子。七个和两个，七个是两个根的孩子，这个根是一个。6和1的根是0。一个是自己的根。零成为一的孩子。



发言人   04:59
Each one of these union operations just involves changing one entry in the array. And finally, 7 and 3. So seven's root is one, three's root is 8. One becomes a child of 8. 
这些联合操作中的每一个只涉及更改数组中的一个条目。最后是7和3。所以七的根是一，三的根是八。一个变成了8岁的孩子。

发言人   05:18
Okay, and now we have one connected component with all the items together. All right, so now let's look at the code for implementing Quick union. The constructor is the same as the other one. 
好的，现在我们有一个连接的组件，所有项目都在一起。好的，现在让我们来看看实现快速联合的代码。该构造函数与另一个构造函数相同。



发言人   05:34
We create the array and then set each element to be its own root. Now we have a private method that implements this process of finding the route by chasing parent pointers until we get to the point where I is equal to ID of I, and if it's not equal, we just move I up one level in the tree, set I equals ID of I in return it. So starting at any node, you just follow ID equals ID of I until they're equal, and then you're at a root. And that's a private method that we can use to implement the find operation or the connected operation. You just find the root of p and the root of q, and you check if they're equal. And then the union operation simply find the two routes and then set the ID of the first one to be the second one. 
我们创建数组，然后将每个元素设置为自己的根元素。现在我们有一个私有方法，它通过追逐父指针来实现查找路由的过程，直到我们到达I等于I的账号点，如果它不相等，我们只将I在树中上移一层，设置I等于I的账号作为回报。所以从任何一个节点开始，你只需跟随I的账号账号，直到它们相等，然后你就在根处。这是一种私有方法，我们可以用来实现查找操作或连接操作。你只需要找到p的根和q的根，然后检查它们是否相等。然后联合操作只需找到两条路由，然后将第一个路由的账号设置为第二个路由。

发言人   06:25
Actually less code than for quick find no for loops. There's this one while loop that we have to worry about a little bit, but that's a quick and elegant implementation of code to solve the dynamic connectivity problem called quick union. 
实际上，代码比快速查找循环的代码要少。有一个while循环我们必须稍微担心一下，但这是一个快速而优雅的代码实现，用于解决称为快速联合的动态连接问题。

发言人   06:45
So now we're going to have to look at, can this code be effective for large problems? Well, unfortunately, quick union is faster, but it's also too slow. And it's a little different, kind of too slow than for quick find. There's times when it could be fast, but there's also times when it could be too slow. And the defect for quick union is that the trees can get too tall, which would mean that the fined operation would be too expensive. You could wind up with a long, skinny tree of each object just pointing to a next. And then to do a find operation for object at the bottom would involve going all the way through the tree costing involving n array axis just to do the find operation. And that's going to be too slow if you have a lot of operations. 
所以现在我们要看看，这段代码对大型问题是否有效？好吧，不幸的是，快速联盟更快，但它也太慢了。它有点不同，有点比快速找到慢。有时它可能很快，但有时它可能太慢。而快速结合的缺陷是树木可能变得太高，这意味着罚款手术将过于昂贵。你可以最后找到一棵长长的、瘦削的树，将每个物体指向下一个物体。然后对底部的对象执行查找操作将涉及一直到涉及n个数组轴的树成本，以执行查找操作。如果你有很多操作，那就太慢了。
