---
title: CS143 P32Week306 04 1 Recursive Descent Limitations 04 1
---

1
00:00:00,000 --> 00:00:07,000
In this video, I'm going to cover a limitation of the recursive descent algorithm that I presented last time.

2
00:00:07,000 --> 00:00:19,000
Here's the grammar from our last presentation, and here's its implementation again as a set of mutually recursive functions that together implement a simple recursive descent strategy.

3
00:00:19,000 --> 00:00:28,000
Now let's think about what happens when we go to parse the input int, the simplest possible input string.

4
00:00:28,000 --> 00:00:38,000
Well, let's work through it. So remember, we start with the function that implements all the productions for the non-terminal E.

5
00:00:38,000 --> 00:00:43,000
And so what we're going to do here, we're going to call E, and that will try calling E1.

6
00:00:43,000 --> 00:00:51,000
And what is E1 going to do, E1 is going to call T, because of course the first production is E goes to T.

7
00:00:51,000 --> 00:00:58,000
So let's take a little bit with T does, T is going to try out the production T1.

8
00:00:58,000 --> 00:01:05,000
And what does T1 do? Well, T1 recognizes an int, so that's good.

9
00:01:05,000 --> 00:01:12,000
And it will match it and return, and then E will return, and we will succeed in parsing.

10
00:01:12,000 --> 00:01:19,000
And I forgot to mention it also in the process the input pointer will be moved across the int.

11
00:01:19,000 --> 00:01:31,000
And so when we're done, E will return, and we will have succeeded in parsing the string int, because E return true, the production for E return true, and we consumed all of the input.

12
00:01:31,000 --> 00:01:38,000
So now let's consider a slightly more complicated example.

13
00:01:38,000 --> 00:01:49,000
So let's try the input string int times int.

14
00:01:49,000 --> 00:01:58,000
So again we start with the production E. And the first thing we'll do is we'll try the production E1, the same thing we did last time.

15
00:01:58,000 --> 00:02:09,000
E1 is going to call the function T, and T is going to try the first production for T, which again is the production int.

16
00:02:09,000 --> 00:02:16,000
And the input pointer of course is here, and then it will try to match that against an int.

17
00:02:16,000 --> 00:02:23,000
It will match the first token in the input stream against the terminal int, and it will succeed.

18
00:02:23,000 --> 00:02:28,000
So the input pointer will be moved over, so T1 will return true.

19
00:02:28,000 --> 00:02:39,000
And as a result, this right hand side here of the function T will also succeed, because T1 returns true, so T will return true.

20
00:02:39,000 --> 00:02:45,000
Therefore, E1 will return true, and E1 returning true will cause E to return true.

21
00:02:45,000 --> 00:02:48,000
And in fact that will be the end of the execution of the program.

22
00:02:48,000 --> 00:02:56,000
And we'll terminate, E will return true, and the input pointer will only have advanced as far as int, and so we will reject the parse.

23
00:02:56,000 --> 00:02:59,000
This is actually ends up getting rejected.

24
00:02:59,000 --> 00:03:05,000
And the question of course is, what happened?

25
00:03:05,000 --> 00:03:13,000
Why didn't we succeed in parsing this input, which is clearly in the language of this grammar?

26
00:03:13,000 --> 00:03:16,000
Well the story here is actually a little bit interesting.

27
00:03:16,000 --> 00:03:27,000
What happened is down here, when we discovered that int matched the first production for T, we said that T was done.

28
00:03:27,000 --> 00:03:31,000
That T had succeeded and had matched its input.

29
00:03:31,000 --> 00:03:42,000
And then when E ultimately returns, and the whole parse fails because we haven't consumed the input, we don't have a way to backtrack and try another alternative for T.

30
00:03:42,000 --> 00:03:57,000
If we were going to succeed, we would have to say, oh, well even though we found a production for T that matched part of the input, since the overall parse failed, that must not have been the right production to choose for T.

31
00:03:57,000 --> 00:04:00,000
Maybe we should try some other productions for T.

32
00:04:00,000 --> 00:04:09,000
And in fact, if we had tried the second production for T, T2, we would have matched int times T, and then we probably would have succeeded.

33
00:04:09,000 --> 00:04:12,000
We would have been able to match int times int.

34
00:04:12,000 --> 00:04:21,000
And so the problem here is that even though there is backtracking within a production, while we're trying to find a production that works for a given non-terminal.

35
00:04:21,000 --> 00:04:34,000
So while there is backtracking for a non-terminal during the time that we're trying to find a production that works for that non-terminal, there is no backtracking once we have found a production that succeeds for a non-terminal.

36
00:04:34,000 --> 00:04:49,000
So once a non-terminal commits and returns and says I have found a way to parse part of the input using one of my productions, there is no way in this particular structure, this particular algorithm to go back and revisit that decision and try a different production.

37
00:04:50,000 --> 00:04:58,000
So the problem is that if a production for non-terminal exceeds, there is no way to backtrack to try a different production for X later.

38
00:04:58,000 --> 00:05:03,000
So once the function for X has returned, we're really committed to that production.

39
00:05:03,000 --> 00:05:11,000
Now that means that the particular recursive descent algorithm that I showed in the last video is not completely general.

40
00:05:12,000 --> 00:05:31,000
And recursive descent is a general technique. There are algorithms for recursive descent parsing that can parse any grammar that can implement the full language of any grammar, and they have more sophisticated backtracking than what I showed in the algorithm that I presented last time.

41
00:05:32,000 --> 00:05:51,000
Now, the reason for showing this particular algorithm is that it's easy to implement by hand. So this is actually an algorithm or an approach to recursive descent that while it has this limitation, as you can see, it's very mechanical and very straightforward to design a parser for a given grammar.

42
00:05:52,000 --> 00:06:02,000
And it will work for a rather large class of grammar. So in particular, it will work for any grammar where for any non-terminal, at most, one production can succeed.

43
00:06:02,000 --> 00:06:20,000
So if you know from the way that you've built your grammar, that in any situation that that grammar can get into or the recursive descent algorithm can get into during parsing, that at most, one production can succeed, then this parsing strategy will be sufficient because they'll never be, when you find a production that succeeds.

44
00:06:21,000 --> 00:06:29,000
There will never be a need to go back and revisit that decision because it must be the case that none of the other productions could have succeeded.

45
00:06:29,000 --> 00:06:39,000
And it turns out that the example grammar that we're working with in the last couple of videos could actually be written to work with this algorithm.

46
00:06:39,000 --> 00:06:49,000
And we would have to left factor the grammar, but actually there's more than one way to rewrite the grammar to work with this recursive descent algorithm, but one way to do it is to left factor it.

47
00:06:49,000 --> 00:06:56,000
I'm not going to say any more about left factoring in this video because that's going to be a topic of a video that's coming up shortly.

