---
title: CS143 P29Week306 02 Abstract Syntax Trees
---

1
00:00:00,000 --> 00:00:10,000
In this video, we're going to talk about a core data structure used in compilers, the abstracts and text tree.

2
00:00:10,000 --> 00:00:22,000
To briefly review, a parser traces the derivation of a sequence of tokens, but this by itself is not all that useful to a compiler.

3
00:00:22,000 --> 00:00:32,000
The rest of the compiler needs some representation of the program and needs an actual data structure that tells what the operations are in the program and how they're put together.

4
00:00:32,000 --> 00:00:40,000
We know one such data structure is called a parse tree, but it turns out that a parse tree really isn't what we want to work on.

5
00:00:40,000 --> 00:00:44,000
Instead, we want to work on something called an abstracts and text tree.

6
00:00:44,000 --> 00:00:54,000
The abstracts and text tree is really just the parse tree, but with some details ignored, we have abstracted away from some of the details of the parse tree.

7
00:00:54,000 --> 00:01:02,000
Here's an abbreviation that you'll see, ASTs stand for abstracts and text tree.

8
00:01:02,000 --> 00:01:10,000
Let's look at a grammar. Here's the grammar for plus expressions over the integers and we also have parenthesis expressions.

9
00:01:10,000 --> 00:01:22,000
Here's a string. After a liked colonel says, what do we have? Well, we've got a sequence of tokens, again, with their associated lexemes telling us what the actual strings were.

10
00:01:22,000 --> 00:01:26,000
That gets passed into the parser and then we build a parse tree.

11
00:01:26,000 --> 00:01:36,000
Here's a parse tree for that expression. Now, I should stress that this representation, the parse tree, is actually perfectly adequate for compilation.

12
00:01:36,000 --> 00:01:42,000
We could do our compiler using the parse tree. This is a faithful representation of the program.

13
00:01:42,000 --> 00:01:48,000
The problem is that it would be quite inconvenient to do that and to see this, let me point out some features of the parse tree.

14
00:01:48,000 --> 00:01:58,000
First of all, you can see that the parse tree is quite verbose. For example, we have here a node E and it has only one child.

15
00:01:58,000 --> 00:02:12,000
When there's only one successor of the node, what is that really doing for us? Well, we don't really need the E at all. We could just put the five right here and make the tree smaller and similarly for the other single successor nodes.

16
00:02:12,000 --> 00:02:23,000
Furthermore, these parentheses here, well, these are very important in parsing because they show the association of these arguments with respect to these two plus operations.

17
00:02:23,000 --> 00:02:29,000
It shows that this plus is nested. This plus down here is nested inside of this plus up here.

18
00:02:29,000 --> 00:02:35,000
But once we've done the parsing, the tree structure shows us the same thing. We don't need to know that these were inside of parentheses.

19
00:02:35,000 --> 00:02:41,000
The fact that these two expressions are the argument to this plus already tells us all we need to know.

20
00:02:41,000 --> 00:02:48,000
All of these nodes in here are also in a sense redundant. We don't really need that information anymore.

21
00:02:48,000 --> 00:02:56,000
What we prefer to do is to use something called an abstract syntax tree that just compresses out all the junk in the parse tree.

22
00:02:56,000 --> 00:03:05,000
So here is an abstract syntax tree or a hypothetical abstract syntax tree that would represent the same thing as the parse tree on the previous slide.

23
00:03:05,000 --> 00:03:13,000
You can see here we've really just cut it down to the essential items. We have the two plus nodes. We have the three arguments.

24
00:03:13,000 --> 00:03:21,000
The association is just shown by which plus node is nested inside the other. We don't have any of the extraneous non-terminals. We don't have the parentheses.

25
00:03:21,000 --> 00:03:34,000
Everything is much simpler and you can imagine that it will be easier to write algorithms that walk over a structure like this rather than the rather elaborate structure we had on the previous slide.

26
00:03:34,000 --> 00:03:41,000
So this is a very complex plan. Of course, again, it is called an abstract syntax tree because it abstracts away from the concrete syntax.

27
00:03:41,000 --> 00:03:48,000
We suppress details of the concrete syntax and just keep enough information to be able to faithfully represent the program and compile it.

