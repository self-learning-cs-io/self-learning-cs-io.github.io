---
title: CS143 P62Week509 07 B+Subtyping
---

1
00:00:00,000 --> 00:00:04,000
Now we can give a type checking rule for if-then-else.

2
00:00:04,000 --> 00:00:09,000
So the first thing to notice about if-then-else expressions is that they do not affect the environment.

3
00:00:09,000 --> 00:00:14,000
And if-then-else neither introduces nor removes any variables from the environment.

4
00:00:14,000 --> 00:00:20,000
So all the sub-expressions are typed in the same environment as the entire expression.

5
00:00:20,000 --> 00:00:25,000
Now the predicate of the if-then-else is zero, well that should have type-bool because that's our decision.

6
00:00:25,000 --> 00:00:27,000
Whether we're going to take the true branch or the false branch.

7
00:00:27,000 --> 00:00:30,000
But then the two branches can have different types.

8
00:00:30,000 --> 00:00:34,000
E1 just has to have some type T1 and E2 just has to have some type T2.

9
00:00:34,000 --> 00:00:36,000
So notice again what this is saying.

10
00:00:36,000 --> 00:00:40,000
This is just saying that E1 and E2 do have a type check. They have to be type correct.

11
00:00:40,000 --> 00:00:43,000
But we don't care what the type is. The type can be anything.

12
00:00:43,000 --> 00:00:48,000
And then the type of the entire expression is just going to be the least upper bound of T1 and T2

13
00:00:48,000 --> 00:00:53,000
because that's going to be the best estimate we can give to the final type of the expression

14
00:00:53,000 --> 00:00:58,000
given that the true branch might return T1 as something of type T1

15
00:00:58,000 --> 00:01:02,000
and the false branch might return something of type T2.

16
00:01:04,000 --> 00:01:08,000
The rule for case expressions is the most complex one we've seen so far.

17
00:01:08,000 --> 00:01:12,000
But really it's just a glorified if-then-else.

18
00:01:12,000 --> 00:01:15,000
And it's relatively easy to understand if we just pull it apart.

19
00:01:15,000 --> 00:01:19,000
So let's begin by reminding ourselves of what case does.

20
00:01:19,000 --> 00:01:26,000
First of all it looks at E0. It evaluates E0 and then it looks at the runtime type of E0.

21
00:01:26,000 --> 00:01:32,000
So it takes the dynamic class of E0 and then it looks at the first branch.

22
00:01:32,000 --> 00:01:39,000
And what is it going to do is it's going to compare the type of E0 at runtime to the type T1.

23
00:01:39,000 --> 00:01:47,000
And if T1 is a super type of the runtime type of E0 and in fact it is the smallest of all the possible branches.

24
00:01:47,000 --> 00:01:52,000
Then it's going to pick this branch. It's going to bind X1 to the value.

25
00:01:52,000 --> 00:01:57,000
It's going to give it the type T1. It's going to bind X1 to the value of E0.

26
00:01:57,000 --> 00:02:02,000
It's going to retype it as type T1 and it's going to evaluate E1.

27
00:02:02,000 --> 00:02:06,000
So you can see in what sense it's a glorified if-then-else.

28
00:02:06,000 --> 00:02:11,000
We're just picking the best matching branch, the one that's whose type declared type,

29
00:02:11,000 --> 00:02:16,000
the most closely matches, the runtime type of E0.

30
00:02:16,000 --> 00:02:21,000
And then we're going to execute that branch with the variable that's named in that branch,

31
00:02:21,000 --> 00:02:26,000
bound to the type of E0. So let's see how the typing works out.

32
00:02:26,000 --> 00:02:29,000
So first we type check E0 and we get some type T0.

33
00:02:29,000 --> 00:02:35,000
And now what's going to happen? Well if we select the branch, the first branch,

34
00:02:35,000 --> 00:02:41,000
well then we're going to take the environment and we're going to extend it with the new variable X1,

35
00:02:41,000 --> 00:02:43,000
which is going to have type T1.

36
00:02:43,000 --> 00:02:49,000
And so we only take this branch, remember, if a runtime type of E0 matches T1,

37
00:02:49,000 --> 00:02:55,000
most closely among all the branches. But if we do take it, then we're going to execute E1 in this environment

38
00:02:55,000 --> 00:02:59,000
and we'll get back something of some type T1 prime.

39
00:02:59,000 --> 00:03:03,000
And similarly for all the other branches, until finally the last branch,

40
00:03:03,000 --> 00:03:08,000
which is exactly the same as the first one, just with the letter N replacing the number 1.

41
00:03:08,000 --> 00:03:12,000
And so since we don't know which branch is going to match at runtime,

42
00:03:12,000 --> 00:03:15,000
it could be any of the branches that actually executes.

43
00:03:15,000 --> 00:03:19,000
And therefore the type of the entire expression is just going to be the least upper bound

44
00:03:19,000 --> 00:03:23,000
over all of the types of the various branches.

45
00:03:23,000 --> 00:03:29,000
And here I've just extended least upper bound from a binary operation to an n-area operation.

46
00:03:29,000 --> 00:03:34,000
That should be clear enough. We're just going to take the least upper bound over all of these types.

