---
title: CS143 P64Week509 08 B+Typing+Methods
---

1
00:00:00,000 --> 00:00:05,839
The method environment has to be added to all the other type rules in our system.

2
00:00:05,839 --> 00:00:10,800
This is really easy to do because only the dispatch rules actually care about what the methods

3
00:00:10,800 --> 00:00:11,800
are.

4
00:00:11,800 --> 00:00:14,560
All the rest of the rules just pass the method environment to log.

5
00:00:14,560 --> 00:00:15,640
So what do I mean by that?

6
00:00:15,640 --> 00:00:19,120
Well here's our rule for add with just the object environment.

7
00:00:19,120 --> 00:00:23,160
So now what we're going to do is we're going to add a method environment and the sub-expressions

8
00:00:23,160 --> 00:00:29,960
will be just type checked in exactly the same method environment as the entire expression.

9
00:00:29,960 --> 00:00:34,359
And all the other rules simply pass down the method environment from the root towards

10
00:00:34,359 --> 00:00:38,920
the leaves without changing it just as in this rule.

11
00:00:38,920 --> 00:00:44,000
Now it turns out that for some cases involving self-type we actually need one more thing in

12
00:00:44,000 --> 00:00:45,000
our environment.

13
00:00:45,000 --> 00:00:49,840
And so the actual full environment for cool type checking consists of three things.

14
00:00:49,840 --> 00:00:53,880
First of all there's the mapping O that gives types to object IDs.

15
00:00:53,880 --> 00:00:56,400
There's this mapping M that gives types to methods.

16
00:00:56,400 --> 00:00:59,280
And finally we just need to know the name of the current class.

17
00:00:59,280 --> 00:01:05,640
So whatever class the expression we're type checking actually sits in.

18
00:01:05,640 --> 00:01:10,079
So the full form of a sentence in the cool type checking logic looks like this.

19
00:01:10,079 --> 00:01:13,760
And as read as follows under the assumption that the object identifiers have the types given

20
00:01:13,760 --> 00:01:19,319
by O that the methods have the signatures given by M and that the expression sits in the

21
00:01:19,319 --> 00:01:25,879
class C then we can prove that the expression E has the type T.

22
00:01:25,879 --> 00:01:31,079
And here's an example the ad example the rule for addition again written out with the

23
00:01:31,079 --> 00:01:34,640
full environment.

24
00:01:34,640 --> 00:01:38,319
So the rules that I've given you for type checking here are cool specific and some other

25
00:01:38,319 --> 00:01:40,719
languages have very different rules.

26
00:01:40,719 --> 00:01:42,919
But there are some general themes of type checking.

27
00:01:42,919 --> 00:01:46,640
First of all type rules are defined on the structure of expressions.

28
00:01:46,640 --> 00:01:53,000
So they're typically done in this inductive fashion where the types of an expression depends

29
00:01:53,000 --> 00:01:55,640
on the types of its sub expressions.

30
00:01:55,640 --> 00:02:00,519
And also the types of variables and more generally any free names in an expression things like

31
00:02:00,519 --> 00:02:01,519
method names.

32
00:02:01,519 --> 00:02:03,760
They're going to be modeled by an environment.

33
00:02:03,760 --> 00:02:07,799
So we're going to have some mapping sitting around that tells us for any kind of free name

34
00:02:07,799 --> 00:02:13,680
in an expression what assumptions the type rules should make about the types of those

35
00:02:13,680 --> 00:02:15,240
names.

36
00:02:15,240 --> 00:02:18,960
And one thing you've probably noticed by now but it's worth saying explicitly is that type

37
00:02:18,960 --> 00:02:21,520
rules are really very compact.

38
00:02:21,520 --> 00:02:26,120
The notation is not complicated but there's actually a lot of information in these rules

39
00:02:26,120 --> 00:02:30,360
and you have to take some time to sit and read them carefully to really understand what

40
00:02:30,360 --> 00:02:30,879
they are saying.

