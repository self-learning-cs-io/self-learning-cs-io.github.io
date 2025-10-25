---
title: CS143 P60Week509 06 B+Type+Environments
---

1
00:00:00,000 --> 00:00:07,200
To summarize this video, the type environment gives types to the free identifiers in the

2
00:00:07,200 --> 00:00:08,199
current scope.

3
00:00:08,199 --> 00:00:11,919
This is very important because it doesn't even make sense to talk about type checking

4
00:00:11,919 --> 00:00:16,800
and expression unless we have some information for the types of the free identifiers.

5
00:00:16,800 --> 00:00:21,839
The type environment is just a way of formalizing that, of giving a name to some set of assumptions

6
00:00:21,839 --> 00:00:25,800
about what the types of those free identifiers are.

7
00:00:25,800 --> 00:00:29,519
Notice that the type environment is passed down the abstract syntax tree from the root towards

8
00:00:29,519 --> 00:00:34,000
the leaves that is as we pass through definitions, the type environment is extended with new definitions,

9
00:00:34,000 --> 00:00:35,840
for example, in lead expressions.

10
00:00:35,840 --> 00:00:40,240
The type environment will grow as you pass from the root of the abstract syntax tree down

11
00:00:40,240 --> 00:00:43,280
towards the leaves of the abstract syntax tree.

12
00:00:43,280 --> 00:00:47,799
The types are computed up the abstract syntax tree from the leaves towards the root.

13
00:00:47,799 --> 00:00:52,239
We begin at the leaves get all the types of the leaf expressions, most of which are very

14
00:00:52,239 --> 00:00:56,359
easy, things like integers and string constants, have the obvious types, and we just look up

15
00:00:56,359 --> 00:00:59,359
the types of variables in the type environment.

16
00:00:59,359 --> 00:01:04,000
We compute the types for the more complicated expressions in a bottom-up fashion.

