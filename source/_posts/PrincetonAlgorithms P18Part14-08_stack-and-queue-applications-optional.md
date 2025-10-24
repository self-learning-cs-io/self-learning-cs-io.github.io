---
title: PrincetonAlgorithms P18Part14 08_stack And Queue Applications Optional
---

1
00:00:00,000 --> 00:00:07,000
Okay, those are some basic data structures and implementations.

2
00:00:07,000 --> 00:00:16,000
And they seem quite elementary and simple, but actually right away we can get through some very sophisticated applications of these basic concepts.

3
00:00:16,000 --> 00:00:19,000
And that's what we're going to consider next.

4
00:00:19,000 --> 00:00:31,000
Now, first thing to mention is that often the kinds of data types and data structures that we implement are found in Java libraries.

5
00:00:31,000 --> 00:00:35,000
And that's true in many programming environments.

6
00:00:35,000 --> 00:00:42,000
So, for example, stacks and queues, you can find those words mentioned in the Java libraries.

7
00:00:42,000 --> 00:00:49,000
And there's a Java collection library in the so-called list interface, which is displayed here.

8
00:00:49,000 --> 00:00:53,000
So, Java has a general API for sequences of items.

9
00:00:53,000 --> 00:00:59,000
And it's got things like append at the end, removed from the beginning and so forth.

10
00:00:59,000 --> 00:01:05,000
And it uses a resizing array, so many of the principles that we consider.

11
00:01:05,000 --> 00:01:09,000
There's also a linked list interface.

12
00:01:09,000 --> 00:01:15,000
So, why not just use those, why use our own implementations?

13
00:01:15,000 --> 00:01:30,000
Well, the problem is often in such library code is kind of designed by committee phenomenon that more and more operations get added.

14
00:01:31,000 --> 00:01:35,000
And API becomes too broad or bloated.

15
00:01:35,000 --> 00:01:43,000
It's not a good idea to have lots and lots of operations in the same API.

16
00:01:43,000 --> 00:01:47,000
And we'll see an example in a second of the problem.

17
00:01:47,000 --> 00:01:55,000
The real problem is that when you do that, you can't know much about the performance.

18
00:01:55,000 --> 00:01:58,000
Or you can't assume much about the performance.

19
00:01:58,000 --> 00:02:08,000
And so, you can kind of immediately arrive at bad performance even for simple clients.

20
00:02:08,000 --> 00:02:13,000
So, our best practice that we recommend is so few of these basic data structures that we use.

21
00:02:13,000 --> 00:02:21,000
And they're so simple is to go ahead and use the implementations that we've just discussed for these fundamental data structures.

22
00:02:22,000 --> 00:02:37,000
Maybe later on, after an experienced programmer who knows what he or she is doing could use some of these library collections effectively but inexperienced programmers often have trouble with this.

23
00:02:37,000 --> 00:02:44,000
Here's a war story from student programming assignments not that long ago.

24
00:02:45,000 --> 00:02:52,000
We have an assignment where you need to generate random open sites in a percolation system.

25
00:02:52,000 --> 00:03:01,000
We have one student who was paying attention to what we're saying and uses an array and can pick the indices into that array at random.

26
00:03:01,000 --> 00:03:05,000
Check whether they're open and repeat.

27
00:03:05,000 --> 00:03:15,000
And so, the array is in by end. There's n squared things and it takes about n squared time, which is actually linear time for this application.

28
00:03:15,000 --> 00:03:28,000
But then we have another student who had some Java before coming to us and considered himself an expert and said, well, I'm going to use linked lists because I can use Java's library.

29
00:03:29,000 --> 00:03:32,000
And I don't have to worry about downloading your stupid code.

30
00:03:32,000 --> 00:03:37,000
And so, I'll just use that one and pick an index at random and delete.

31
00:03:37,000 --> 00:03:50,000
And that program took quadratic time and poor Kenny when trying to run his program for the huge instance that we asked found that it wasn't finishing.

32
00:03:50,000 --> 00:04:04,000
And the reason is that the Java linked list implementation takes linear time to find an item with a given index, not constant time like an array.

33
00:04:04,000 --> 00:04:13,000
And that's difficult for Kenny to think about and difficult to derive that information from the implementation.

34
00:04:13,000 --> 00:04:16,000
So, the program is just too slow.

35
00:04:16,000 --> 00:04:30,000
And with the Swiss knife implementation with so many operations, it's hard to know whether or not the particular set of operations that your client needs is efficiently implemented.

36
00:04:31,000 --> 00:04:42,000
So, our insistence in this course is that students should not use a library until we've been five goes to the value stack.

37
00:04:42,000 --> 00:04:48,000
Now we've got a lot of stuff on the stacks and we got three right parentheses and that's going to finish up the computation.

38
00:04:48,000 --> 00:04:57,000
Take the top two items off the stack and the top operator off the operator stack, perform the operation, put the result back on the value stack.

39
00:04:57,000 --> 00:05:04,000
Another right parentheses take the top two values off, perform the operation, put the value onto the value stack.

40
00:05:04,000 --> 00:05:17,000
And finally, the last right parentheses take the two operators off the value stack, operate on the value stack and operator off the operator stack, perform the operation, put the result back on the value stack.

41
00:05:17,000 --> 00:05:22,000
And we're at the end of the computation and that's the result.

42
00:05:22,000 --> 00:05:28,000
And the value of that arithmetic expression is 101.

43
00:05:28,000 --> 00:05:30,000
Okay.

44
00:05:30,000 --> 00:05:37,000
Yep.

45
00:05:37,000 --> 00:05:43,000
Here's the code that implements the extra two stack algorithm.

46
00:05:43,000 --> 00:05:54,000
We have two different stacks. The operator stack is string, it could be characters, which is just our operator.

47
00:05:54,000 --> 00:06:04,000
Then our value stack is doubles. So that's the same stack code, but with generics, we're using two different types of data.

48
00:06:04,000 --> 00:06:07,000
And then simply perform dikes to his algorithm.

49
00:06:07,000 --> 00:06:12,000
If we have a left parentheses, we read a new string, if we have a left parentheses, do nothing.

50
00:06:12,000 --> 00:06:29,000
If we have plus or times, push it, we have a right parentheses, then go ahead and pop the operator in if it's plus add the result of the two values at the top of the value stack.

51
00:06:29,000 --> 00:06:37,000
And if it's a star, multiply the two values at the top of the stack and then push the result.

52
00:06:37,000 --> 00:06:44,000
So, and then when you done, then simply print out the value on the stack.

53
00:06:44,000 --> 00:06:50,000
And that's a fine and elegant implementation using stacks for any arithmetic expression.

54
00:06:50,000 --> 00:06:56,000
And it's easy to extend that to handle other types of things.

55
00:06:56,000 --> 00:07:24,000
So, why does this work? Well, when the algorithm encounters an operator, say in the inside, with you got parenthesis, operand, operator, operand, parenthesis, it's easy to see that what it's going to do inside there is put the at the top of the stack, whatever it is, is to put the two and three on the top of the value stack.

56
00:07:24,000 --> 00:07:31,000
And the plus on the top of the operand stack, and then when it hits that right parenthesis, it's going to perform the operation.

57
00:07:31,000 --> 00:07:38,000
And it's going to proceed then exactly as if the original input were that with the value replaced.

58
00:07:38,000 --> 00:07:48,000
So, just going from the inside out for every operation and close within parentheses like that, it's just repeat the argument.

59
00:07:48,000 --> 00:07:53,000
It's exactly as if the original expression were 1 plus 5 times 20.

60
00:07:53,000 --> 00:08:00,000
And then again, replacing that 1, 1 plus 101. That's why Dexter's algorithm works.

61
00:08:00,000 --> 00:08:05,000
Actually fairly easy to understand why it works.

62
00:08:05,000 --> 00:08:20,000
And you can go ahead and extend this algorithm to add functions like logs and signs or other operators and have precedence among operators, have them associate multiple operations and so forth.

63
00:08:20,000 --> 00:08:34,000
And actually that's on the road to developing a compiler or a way to translate a program from a programming language to a computation.

64
00:08:34,000 --> 00:08:44,000
So Dexter's algorithm that uses stack is one way for entering an understanding of the basis of computation.

