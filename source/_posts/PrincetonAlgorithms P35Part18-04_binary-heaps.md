---
title: PrincetonAlgorithms P35Part18 04_binary Heaps
---

1
00:00:00,000 --> 00:00:06,000
Now we're going to look at binary heaps, which is an ingenious and very simple data structure

2
00:00:06,000 --> 00:00:10,000
that's going to help us implement all the priority queue operations quickly.

3
00:00:10,000 --> 00:00:17,000
So the idea of a binary heap is based on the idea of a complete binary tree.

4
00:00:17,000 --> 00:00:24,000
So a complete binary tree, well first of all a binary tree is either empty or it's a node with links to left and right binary tree.

5
00:00:24,000 --> 00:00:26,000
So that's an example of a binary tree.

6
00:00:27,000 --> 00:00:33,000
A complete binary tree is one that's perfectly balanced except possibly for the bottom level.

7
00:00:33,000 --> 00:00:42,000
So there might be a few nodes on the bottom level and one lower than the bottom level, but otherwise all the levels are full.

8
00:00:42,000 --> 00:00:45,000
We'll see how that looks in just a second.

9
00:00:45,000 --> 00:00:55,000
The property of a complete tree is that the height of a complete tree with n nodes is the biggest integer less than log base 2 of n.

10
00:00:55,000 --> 00:01:09,000
And that's really easy to convince yourself that that's true because the height, if we add nodes one at a time, going from left to right on the bottom level, say, the height only increases when n is a power of 2.

11
00:01:10,000 --> 00:01:13,000
A complete binary tree is actually happening in nature.

12
00:01:13,000 --> 00:01:22,000
Here's an example of one that goes one, two, three, four levels at least.

13
00:01:22,000 --> 00:01:26,000
So 16 bushes at the end there.

14
00:01:26,000 --> 00:01:37,000
All right, now the way we're going to use complete binary trees to implement priority cues is to first of all associate information with each node.

15
00:01:37,000 --> 00:01:39,000
We'll put our keys in the nodes.

16
00:01:39,000 --> 00:01:43,000
And also we're going to represent it with an array.

17
00:01:43,000 --> 00:01:51,000
So when we start putting the keys in the nodes, we're going to impose one more condition that's called heap ordering.

18
00:01:52,000 --> 00:02:01,000
And the idea is that the parent's key is going to be no smaller than its children's key for that's true for every node in the tree.

19
00:02:01,000 --> 00:02:06,000
The array representation, all we do is we put, we start with indices at one.

20
00:02:06,000 --> 00:02:11,000
It's a little less calculation that way we leave a of zero empty.

21
00:02:11,000 --> 00:02:13,000
And then we just take the nodes in level order.

22
00:02:13,000 --> 00:02:23,000
So first we put the root, then we put the two nodes on the first level going left from right, and then all the nodes on the third level going from left to right and so forth.

23
00:02:23,000 --> 00:02:30,000
This is interesting because we can draw the tree to get more intuition about what's happening.

24
00:02:30,000 --> 00:02:34,000
But in the actual data structure representation, we don't need any links at all.

25
00:02:34,000 --> 00:02:36,000
It's just an array.

26
00:02:36,000 --> 00:02:42,000
The way that we move around the tree is by doing arithmetic on the indices.

27
00:02:42,000 --> 00:02:45,000
So let's look at a few properties of binary heap.

28
00:02:45,000 --> 00:02:53,000
So that's complete binary trees represented in array with keys in the nodes satisfying the heap order property.

29
00:02:53,000 --> 00:02:58,000
Well, first thing is that a of one is the largest key.

30
00:02:58,000 --> 00:03:04,000
It's larger than the keys that is two children and they're larger than theirs and so forth.

31
00:03:04,000 --> 00:03:08,000
So it's the largest key in the data structure.

32
00:03:08,000 --> 00:03:14,000
The other thing is as I just mentioned, you can use the array in the seeds to move through the tree.

33
00:03:14,000 --> 00:03:23,000
For example, if the node is at position k, index k in the array, then its parent is at k over two.

34
00:03:23,000 --> 00:03:25,000
And that's integer divide.

35
00:03:25,000 --> 00:03:30,000
So the parents of say h and g are both n.

36
00:03:30,000 --> 00:03:33,000
10 g's at 11 ends at 5.

37
00:03:33,000 --> 00:03:38,000
So both of those are 10 over 2, 11 over 2, integer divide is 5.

38
00:03:38,000 --> 00:03:45,000
And going the other way, it's easy to see that the children of the node at k are 2k and 2k plus 1.

39
00:03:45,000 --> 00:03:49,000
So we don't need explicit links at all to represent these data structures.

40
00:03:49,000 --> 00:03:53,000
We can just use array indices.

41
00:03:53,000 --> 00:03:59,000
So that's the basic setup of the invariant that we want to maintain in this data structure.

42
00:03:59,000 --> 00:04:11,000
And now what we're going to do is take a look at just a couple of different scenarios that we violate that invariant temporarily and then fix it.

43
00:04:11,000 --> 00:04:17,000
And that's going to give us the flexibility that we need to implement priority queue operations.

44
00:04:17,000 --> 00:04:26,000
So one scenario shown here is if for whatever reason a child's key becomes larger than its parent's key.

45
00:04:26,000 --> 00:04:37,000
So in this case, we have an example where t, the node t here is value changes and it becomes larger than its parent key piece.

46
00:04:37,000 --> 00:04:42,000
So the heap order condition is satisfied everywhere except at this node.

47
00:04:42,000 --> 00:04:45,000
Well, it's easy to fix this one.

48
00:04:45,000 --> 00:04:51,000
All we do is exchange the key in the child with the key in the parent.

49
00:04:51,000 --> 00:04:56,000
After that exchange, then that would have t up here and p down here.

50
00:04:56,000 --> 00:05:03,000
Then the heap order condition is satisfied at that node because the parent was smaller, so that one's smaller.

51
00:05:03,000 --> 00:05:09,000
And the southern is still smaller, so t is after its exchange, that here will be bigger than both its children.

52
00:05:09,000 --> 00:05:16,000
But the heap condition will be violated because t is still smaller than s, so we have to do it again, exchange it with s.

53
00:05:16,000 --> 00:05:26,000
So we move up the tree exchanging the larger key with its smaller parent until we get to a point where it's larger than both its children.

54
00:05:26,000 --> 00:05:33,000
That's restoring the heap order along a path from the place where it's violated to the root.

55
00:05:33,000 --> 00:05:45,000
You can think of that as kind of like the well-known Peter principle where a node gets promoted to a level where it finally can't be better than its boss.

56
00:05:45,000 --> 00:05:49,000
It's a level of its maximum incompetence.

57
00:05:49,000 --> 00:05:55,000
And implementing that in code is really easy. We call that the swim operation swims up to the top.

58
00:05:55,000 --> 00:06:16,000
And if we have a node at index k and we know the heap condition is violated there, as long as we're not at the root and k's parent k over 2 is less than a of k, then we just exchange it with its parent and move up.

59
00:06:16,000 --> 00:06:23,000
That's the swim operation to eliminate a violation when a key value increases.

60
00:06:23,000 --> 00:06:30,000
So for example, this gives us a way to insert a new element into a heap.

61
00:06:30,000 --> 00:06:40,000
What we do is we add a new node at the end of the heap. So that's one position over. The thing is, remember, represented in array, 1, 2, 3, and so forth.

62
00:06:40,000 --> 00:06:49,000
So the next empty position in the array, there's a place to put a new node. And then we just declare that that's part of the heap.

63
00:06:49,000 --> 00:07:03,000
And that node, well, if it's less than its parent, we're fine. But in general, we have to check whether the heap condition is violated and exchange it with its parent as long as it's smaller. And that's just perform the swim operation.

64
00:07:03,000 --> 00:07:14,000
So if the end is the number of items in the heap to find to be in the heap, we're going to increment it, store our new key there there and then perform the swim operation.

65
00:07:14,000 --> 00:07:27,000
So that's a quick implementation of the insert operation. And notice since it just going from bottom to top in the heap, it takes at most 1 plus log base 2 event compares.

66
00:07:27,000 --> 00:07:32,000
Now there's another scenario where a key becomes smaller.

67
00:07:32,000 --> 00:07:39,000
So for whatever reason a parent becomes a key decreases, it might become smaller than one or both of its children.

68
00:07:39,000 --> 00:07:51,000
In this case, the value at position 2 has changed to h for whatever reason. And that's smaller in this case than both its children.

69
00:07:51,000 --> 00:08:00,000
So how do we fix that violation? Well, that one's also easy. We figure out which of the children is larger, in this case it's the s.

70
00:08:00,000 --> 00:08:14,000
And we exchange that one with the one that's violating the condition. So that's moving the smaller key down. After that exchange, then s is in position 2 and it's bigger than both p and h.

71
00:08:14,000 --> 00:08:26,000
And the heap condition is only violated again where h is sitting. And again, we keep going until getting to the bottom or getting to a place where both children are smaller.

72
00:08:26,000 --> 00:08:41,000
And that's maybe a little bit what happens when a new boss is hired from the outside and then the two subordinates struggle to take over that position and then the boss would get the motive to its level of competence.

73
00:08:41,000 --> 00:08:54,000
And again, that level of flexibility. Here's the implementation of it. And again, it's quite straightforward using the index arithmetic to move around in the heap.

74
00:08:54,000 --> 00:09:06,000
If we're, and that's called the sync operation because we're going down in the heap for a position k, then what we need to worry about is the nodes at 2k and 2k plus 1.

75
00:09:06,000 --> 00:09:18,000
And the first thing to check is find out which one's bigger. It's either 2k or 2k plus 1. And so say j accordingly. So that's j now is after this statement is the larger the two children.

76
00:09:18,000 --> 00:09:30,000
Don't forget to check that we're going off the end of the heap. And then if the k is not less than either one of those, then we're done.

77
00:09:30,000 --> 00:09:44,000
If it is, then we exchange with the larger the two children and move down the heap. Again, just a few lines of code to eliminate the violation when a key value in a heap decreases.

78
00:09:44,000 --> 00:09:56,000
And that one we're going to use to implement delete the maximum in a heap. So delete the maximum we have to do two things. One thing is the size of the heap is going to go down by one.

79
00:09:56,000 --> 00:10:10,000
The other thing is return the maximum. While we know the one that we want to return is the one at the root. So we'll save that value away to return to the client.

80
00:10:10,000 --> 00:10:22,000
And then since it has to go down by one, the place to get the to remove the element from the heap is at the end of the array because it's now going to have to not occupy that position.

81
00:10:22,000 --> 00:10:33,000
So we take that element and replace the root with it. So move the H up and actually put the root value there just exchange them, but it's no longer in the heap.

82
00:10:33,000 --> 00:10:47,000
Now that element which went from the bottom to the top is most likely going to violate the heap order. It's going to be smaller than one of its both of its children. So we do a sink.

83
00:10:47,000 --> 00:11:02,000
Now in this case to implement the delete max, we save away that value at the root in max and we eliminate lortering by nulling out that vacated position, then return the max value.

84
00:11:02,000 --> 00:11:16,000
So that's an implement implementation of the delete max operation for a heap using sink where a key value that decreases go down goes down in the heat.

85
00:11:16,000 --> 00:11:31,000
So let's just take a look at what happens with a real heap with the demo when we do these things and you'll have a good feeling for how this data structure works.

86
00:11:31,000 --> 00:11:46,000
So we're starting at some point where we have these 10 keys in a heap and it's heap ordered. So we've drawn the data structure with the links. So we have an intuition for what's going on.

87
00:11:46,000 --> 00:11:55,000
But all the program sees is the array and gray at the bottom where it tees in position one, P and R, position two and three and so forth.

88
00:11:55,000 --> 00:12:02,000
So now suppose we're supposed to add s. So to add it to the heap, that's going to go in the position at the end.

89
00:12:02,000 --> 00:12:11,000
And then now we've added it to the heap by just incrementing n and putting it in there. But now we have to bring the heap order back into condition.

90
00:12:11,000 --> 00:12:21,000
And so that's going to, that key is larger than its parents. So we're going to swim it up, exchange it with its parent as long as it's smaller than its parent.

91
00:12:21,000 --> 00:12:28,000
So first thing it goes up, exchange with the s. It's still bigger than p. So we exchange it with the p.

92
00:12:28,000 --> 00:12:36,000
And now we're done because s is not bigger than t and the heap order condition is now satisfied everywhere in the heap.

93
00:12:36,000 --> 00:12:42,000
So with just two exchanges, we insert that new element into the heap in this case.

94
00:12:42,000 --> 00:12:54,000
And now suppose the next operation is remove the maximum. So we're going to take t and we're going to exchange it with the last element and then declare that to be no longer part of the heap.

95
00:12:54,000 --> 00:13:03,000
So now we have to bring the heap order back because it might be violated at the root.

96
00:13:03,000 --> 00:13:12,000
So now we invoke the sink where we exchange that node with the larger of its two children until we find a place where it's larger than both its children.

97
00:13:12,000 --> 00:13:21,000
So s is the larger of the two children, R and S. And now h is still smaller than both its children. So we promote the larger which is p.

98
00:13:21,000 --> 00:13:28,000
Now h has no right child just a left child and it's larger than that one. So we're finished with that operation.

99
00:13:28,000 --> 00:13:38,000
We've removed the maximum and we still have our data structure heap ordered and our n keys stored in the first n positions in the array.

100
00:13:38,000 --> 00:13:49,000
Let's remove the maximum again. Again we take it out by exchanging this time g with the root and then decrease the size of the heap by one.

101
00:13:49,000 --> 00:13:59,000
Just take that out. Now the node at the root violates the heap order. So we have to exchange it with the largest of its two children. In this case that's R.

102
00:13:59,000 --> 00:14:10,000
Again g is not larger than its two children. So we have to exchange it with the larger of the two that's O. And now we're done. We've removed the largest again.

103
00:14:10,000 --> 00:14:29,000
Now suppose we insert S back into the heap. So that's adding it at the end violates the heap order. Exchange it with the parent who's smaller and keep doing until we get to a place where it's larger than its two children.

104
00:14:29,000 --> 00:14:47,000
In this case S goes all the way up to the root and it's all heap ordered again. So that's a little survey of some operations on a heap and you can see how every operation is done with just a few exchanges along the path from the bottom to the top or the top to the bottom.

105
00:14:47,000 --> 00:14:55,000
Okay, here's the complete Java implementation of a priority queue using the binary heap data structure.

106
00:14:55,000 --> 00:15:08,000
It's actually not so different from the elementary implementations that we looked at in the last section. Our representation is an array of keys and a size. That's the number of items in the heap.

107
00:15:08,000 --> 00:15:25,000
For simplicity, we'll show the code where the client gives the capacity of the heap. We can use resizing array in an industrial strength implementation. The same that we did for stacks and other data structures where we use arrays.

108
00:15:25,000 --> 00:15:42,000
So we'll build a new array of keys and we have to use an ugly ugly cast because we can't have generic arrays in Java. And that's so it's comparable and we need one more than the capacity to handle this thing where we don't use position zero.

109
00:15:42,000 --> 00:15:53,000
So the priority queue operations is being certain del max that we just showed in the previous slides is into is just checking whether n is equal to zero.

110
00:15:53,000 --> 00:16:06,000
We have the swim and sink functions that we showed earlier and then we have helper functions less in exchange that access the array directly so that the code doesn't have to accident directly.

111
00:16:06,000 --> 00:16:12,000
That's a complete implementation of priority cues in Java.

112
00:16:12,000 --> 00:16:21,000
And this is this implementation by itself is extremely significant because it's really very simple.

113
00:16:21,000 --> 00:16:37,000
The optimal representation of the data and only a little arithmetic with array indices. But as you can see by looking at this table, it gives us a way to implement priority cues where both operations are guaranteed to happen in log in time.

114
00:16:37,000 --> 00:16:57,000
Now experts have worked to come up with improvements on this and there are slight improvements possible. We can make the heap d way rather than just two way and depending on the frequency of execution of the insert and del max operations that might work out better.

115
00:16:57,000 --> 00:17:11,000
There's an advanced data structure called a Fibonacci heap where inserts are done in constant time and del max done in log in time on average over all the operations.

116
00:17:11,000 --> 00:17:23,000
That one's generally too complicated to use in practice. But still again using theory as a guide maybe there's a way to to decrease costs a little bit from binary heaps.

117
00:17:23,000 --> 00:17:36,000
And of course we cannot get down to having constant time for all operations. Why? Well we can sort with the heap by inserting all the elements and then deleting the maximum and getting a sort done.

118
00:17:36,000 --> 00:17:44,000
And that would be linear time if we had this kind of variation, if we had constant time operations for both in certain del max.

119
00:17:44,000 --> 00:17:54,000
And for certain applications we can get close to constant time for one of the other operations and that will be useful in different implementations.

120
00:17:54,000 --> 00:18:10,000
Now there's an important consideration that we have to bring up related to the programming language. And this is a more general consideration than usually we would bring into focus and algorithms.

121
00:18:10,000 --> 00:18:19,000
But it's worthwhile mentioning we're assuming that the client doesn't get to change the keys while they're on the prior to queue.

122
00:18:19,000 --> 00:18:28,000
And it's better not to assume that it's better to arrange for that in our implementations by using keys that are immutable whose values don't change.

123
00:18:28,000 --> 00:18:40,000
There's many reason that immutable keys are that programming languages provide the capability to build immutable keys. And this is a fine example of one.

124
00:18:40,000 --> 00:18:54,000
So and we'll talk more about that in a minute. The other things that we didn't talk about the implementation should throw an exception if the client tries to delete from an empty priority queue.

125
00:18:54,000 --> 00:19:08,000
And we should have a no argument constructor and use a resizing array to account for gradual growth and shrinkage in an industrial strength implementation.

126
00:19:08,000 --> 00:19:19,000
Usually we provide two implementations, one that's max oriented, one that's min oriented so that nobody gets confused and they're the same except less and greater switched.

127
00:19:19,000 --> 00:19:38,000
And we'll see later on there's times when we want to expand the API and provide other operations like removing an arbitrary item from the priority queue or give the client in the API the capability of changing the priority of an item.

128
00:19:38,000 --> 00:19:50,000
Our sync and swim methods are good for making this happen but we'll delay these implementations until we need them in a more complicated algorithm.

129
00:19:50,000 --> 00:20:00,000
So what about immutability? So in every thing in Java is implemented as a data type, a set of values and operations on those values.

130
00:20:00,000 --> 00:20:14,000
And the idea of immutable data type is you can't change the value once it's created. So that's kind of like when you create a literal value to be assigned to an integer, it has that value.

131
00:20:14,000 --> 00:20:33,000
So here's an example, say using the data type for vectors might be a way to implement vectors. So we put the word final to means that instance methods can't be overridden.

132
00:20:33,000 --> 00:20:50,000
And not only that instance variables are private, they can't be seen from the outside and they don't change. And so a constructor for an immutable vector data type, it might take an array as its argument.

133
00:20:50,000 --> 00:21:08,000
And that array has got value stored in it, say, of bubbles and those can change. But what immutable implementation would do would be to copy those values into the local data array instance variable.

134
00:21:08,000 --> 00:21:19,000
And then those values are not going to change and the instance methods won't change them and the client can't change them. So that value stays the same.

135
00:21:19,000 --> 00:21:31,000
Lots of implementations, data type implementations in Java are immutable, like strings immutable when you create a string that value doesn't change.

136
00:21:31,000 --> 00:21:43,000
If you want a new string, you have to create a new string using concatenation or some other operation. And the same with the wrapper types like integer and double or color and lots of things.

137
00:21:43,000 --> 00:21:56,000
Whereas on the other hand, sometimes the whole purpose of a data type is to maintain a changing value, like a good example as a counter or a stack.

138
00:21:56,000 --> 00:22:04,000
So you wouldn't put those things on a priority queue because the value is changing. But the other ones you would.

139
00:22:04,000 --> 00:22:17,000
So the advantages of immutability, and again, maybe this isn't the place to really sell those advantages more for a programming language course, is that it really simplifies debugging.

140
00:22:17,000 --> 00:22:28,000
We can be, have more confidence that our priority queue operations are going to work correctly if we know that the type of data that's on the priority queue is immutable.

141
00:22:28,000 --> 00:22:40,000
If the client can change the values, how do we know that the heap order operation is preserved? If we want the client to be able to change the values, we're going to provide methods for that purpose, as I just mentioned.

142
00:22:40,000 --> 00:22:52,000
And there's many other reasons that people use immutable data types. There is a disadvantage that you have to create a new object for every data type value.

143
00:22:52,000 --> 00:22:59,000
But for a lot of applications that disadvantage is not viewed to be significant compared to the advantages.

144
00:22:59,000 --> 00:23:10,000
Here's a quote from one of Java's architect, Josh Block. Classes should be immutable unless there's a very good reason to make them mutable.

145
00:23:10,000 --> 00:23:21,000
If a class cannot be made immutable, you should still limit its mutability as much as possible. In many programmers, live by that kind of preset.

146
00:23:21,000 --> 00:23:31,000
So that's a basic implementation of priority queues using the heap data structure represented as an array.

