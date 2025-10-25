---
title: CS143 P43Week407 06 B+Shift Reduce+Parsing
---

1
00:00:00,000 --> 00:00:07,000
It turns out that this left string, the stuff to the left of the vertical bar, can be implemented by a stack.

2
00:00:07,000 --> 00:00:13,000
And that's because we only do reduce operations immediately to the left of the vertical bar.

3
00:00:13,000 --> 00:00:18,000
So it's always some suffix of the string to the left of the vertical bar where the reduction is happening.

4
00:00:18,000 --> 00:00:22,000
So what a shift move then does is to push a terminal onto the stack.

5
00:00:22,000 --> 00:00:25,000
It reads one token of input and pushes it on the stack.

6
00:00:25,000 --> 00:00:28,000
And then a reduce pops some number of symbols off of the stack.

7
00:00:28,000 --> 00:00:30,000
That's the production right hand side.

8
00:00:30,000 --> 00:00:33,000
And then it pushes one non-terminal onto the stack.

9
00:00:33,000 --> 00:00:38,000
That's the production left hand side.

10
00:00:38,000 --> 00:00:45,000
Now it can happen that in a given state that more than one action, shift or reduce may lead to a valid parse.

11
00:00:45,000 --> 00:00:52,000
So in particular, if it's legal to shift or reduce, if you could do either one of those things, then we say there is a shift-reduce conflict.

12
00:00:52,000 --> 00:00:59,000
The parser could either read one token of input and push it on the stack or it could perform a reduction.

13
00:00:59,000 --> 00:01:05,000
If it's legal to reduce by two different productions, then there is what is called a reduce-reduce conflict.

14
00:01:05,000 --> 00:01:10,000
So reduce-reduce conflicts are always bad or almost always bad.

15
00:01:10,000 --> 00:01:14,000
They indicate usually some kind of serious problem with the grammar.

16
00:01:14,000 --> 00:01:19,000
Shift-reduce conflicts are not good, but they're often easier to remove.

17
00:01:19,000 --> 00:01:26,000
So if you have reduce-reduce conflicts, particularly when you're building your grammar for cool, then you're doing something seriously wrong.

18
00:01:26,000 --> 00:01:36,000
If you have shift-reduce conflicts, then that's almost to be expected because you're probably going to need to use precedence declarations to remove them.

19
00:01:36,000 --> 00:01:40,000
And we'll talk about that some more in another video.

20
00:01:40,000 --> 00:01:48,000
But in general, if you have either one of these conflicts, it means that there's some state in which the parser doesn't know what to do.

21
00:01:48,000 --> 00:01:55,000
And you either need to rewrite the grammar or give it a hint as to what it should do in order to successfully parse your language.

