---
title: CS143 P45Week408 01 B+Handles
---

1
00:00:00,000 --> 00:00:06,000
At this point, we know enough to state the second important fact about bottom-up parsing.

2
00:00:06,000 --> 00:00:11,000
In shift-reduced parsing, handles appear only at the top of the stack, never inside.

3
00:00:11,000 --> 00:00:16,000
This is what justifies using a stack, because that string to the left of our focus point,

4
00:00:16,000 --> 00:00:20,000
we know that all the action will take place immediately to the left of the focus point.

5
00:00:20,000 --> 00:00:27,000
We won't have to dive down to the string to look at its innards, and therefore a stack will be sufficient.

6
00:00:28,000 --> 00:00:35,000
Here's an informal proof that handles only appear at the top of the stack, and this is by induction on the number of reduced moves.

7
00:00:35,000 --> 00:00:44,000
This is true initially, because the stack is empty, and so the only possible reduction is at the top of the stack if there's an epsilon move to make.

8
00:00:45,000 --> 00:00:50,000
Immediately after we reduce, the rightmost non-terminal is going to be on top of the stack.

9
00:00:50,000 --> 00:01:01,000
So immediately after we perform a reduction, we have our stack, and then we have a non-terminal, and then our vertical bar, and this is the rightmost non-terminal.

10
00:01:02,000 --> 00:01:10,000
And since this is a rightmost derivation, that means that the next handle has to be somewhere to the right.

11
00:01:10,000 --> 00:01:27,000
The next handle has to include something, that it may possibly include some of this stuff, but it's either right here at the current focus point or it's to the right, because we can't be doing any reductions to the left of the rightmost non-terminal.

12
00:01:28,000 --> 00:01:31,000
And so it's going to require a sequence of shift moves to reach the next handle.

13
00:01:31,000 --> 00:01:39,000
So once we have this non-terminal on top of the stack, it is by definition the rightmost non-terminal, and so the next handle has to be somewhere to the right of that.

14
00:01:42,000 --> 00:01:45,000
Therefore, in shift-reduced parsing, handles always appear at the top of the stack.

15
00:01:45,000 --> 00:01:51,000
Handles are never to the left of the rightmost non-terminal, and this is why shift-in-reduce moves are sufficient.

16
00:01:52,000 --> 00:01:57,000
The shift move only moves the vertical bar right, because we never need to move it left.

17
00:01:57,000 --> 00:02:01,000
And bottom up parsing algorithms are based on recognizing handles.

18
00:02:01,000 --> 00:02:08,000
So as we saw on the example at the beginning of this video, just because you have a right hand side on top of the stack, that doesn't mean that it's a handle.

19
00:02:08,000 --> 00:02:12,000
And so we need to be smarter about where we perform our reductions.

