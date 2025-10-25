---
title: CS143 P96Week713 04 B+Cool+Semantics+II
---

1
00:00:00,000 --> 00:00:06,960
To summarize our discussion of dynamic dispatch, the body of a method is invoked with an environment

2
00:00:06,960 --> 00:00:16,000
E that has definitions for the formal arguments and the attributes of the self object and a store

3
00:00:16,000 --> 00:00:24,000
that's just like the caller store except that it also has the actual arguments bound to the locations allocated for the formal parameters.

4
00:00:24,000 --> 00:00:32,000
Notice in the rules that the notion of a frame or activation record is implicit. We don't actually build a data structure

5
00:00:32,000 --> 00:00:40,000
that contains all of the values, all of the arguments and the return address and all that stuff together.

6
00:00:40,000 --> 00:00:46,000
That information is not gathered together in one place. It's a little more abstract. We don't actually have to say

7
00:00:46,000 --> 00:00:53,000
whether things are allocated on the stack or on the heap. And that's a good feature. That allows us to potentially have a range of implementations

8
00:00:53,000 --> 00:01:01,000
that can all implement the semantics correctly. Now, we didn't do the semantics or static dispatch, but it's extremely similar.

9
00:01:01,000 --> 00:01:13,000
The only difference is in how the class that we are going to be dispatching to is looked up. So in a static dispatch, you might be able to name the class that you want to dispatch to.

10
00:01:13,000 --> 00:01:23,000
So there's one extra line to decide what class is being dispatched to in the formal rule. And you can look in the manual to see how that works.

11
00:01:23,000 --> 00:01:32,000
So it's worth pointing out that while the operational rules are very detailed, they intentionally omit some cases that you might think they should cover.

12
00:01:32,000 --> 00:01:36,000
So let's take a look at our dispatch example again.

13
00:01:36,000 --> 00:01:53,000
So here, notice that we look up the class of V0. So V0 is an object and we check what its class tag is. And then we look up in that class, the name of the method that we're dispatching to.

14
00:01:53,000 --> 00:02:01,000
And we get out the definition of the method or enough of the definition of the method that we can write the rest of the rule.

15
00:02:02,000 --> 00:02:14,000
Now, what would happen if there was no such method F in the class X? I mean, this rule just assumes that method F is in fact defined in class X.

16
00:02:14,000 --> 00:02:22,000
And the rule doesn't say anything about what to do if it turns out that this class X doesn't have any method F.

17
00:02:23,000 --> 00:02:33,000
Well, that actually can't happen. So type checking has already guaranteed that when we go to look up method F in class X, it will exist.

18
00:02:33,000 --> 00:02:42,000
That was one of the points of the type checking rules was that no dynamic dispatch could ever dispatch to a method that wasn't defined.

19
00:02:42,000 --> 00:02:55,000
So the fact of the type checking has already been done is what allows us to omit some cases. Some of there are some checks that we don't have to do because we know that the type system has already effectively done them.

20
00:02:55,000 --> 00:03:09,000
And the rules would only be more complicated if we didn't have type checking and we needed to actually say what would happen in all the cases where type checking where things were not type correct.

21
00:03:09,000 --> 00:03:16,000
Now, there are some runtime errors that the type checker doesn't prevent, however, and in cool, there are four.

22
00:03:16,000 --> 00:03:28,000
One is a dispatch devoid division by zero. You have a substring index as out of range or you could run out of memory. You could try to allocate a new object and not have enough space for that.

23
00:03:28,000 --> 00:03:37,000
And in such cases, the execution has to abort gracefully, and that means with an error message, not just with a segmentation fault or some other kind of hard crash.

24
00:03:37,000 --> 00:03:47,000
And in the manual, there are some guidelines as to what a correct cool implementation should do in these four situations.

25
00:03:47,000 --> 00:03:55,000
To summarize the material in the last couple of videos, the operational semantics rules are really very precise and detailed.

26
00:03:55,000 --> 00:04:03,000
If you understand them, then you really understand how to implement a correct cool compiler.

27
00:04:03,000 --> 00:04:12,000
So the rules are complete enough and give you enough detail that they really can't go wrong if you just implement what the rules tell you to do.

28
00:04:12,000 --> 00:04:23,000
So you need to read the rules very carefully. Now, I'll emphasize that because it's actually quite a lot going on in the rules. They're written in a certain way and to achieve a certain effect.

29
00:04:23,000 --> 00:04:34,000
And I pointed out a couple of subtle things in the rules. And so, you know, you have to really actually study the rules in order to internalize what they mean and be able to implement them correctly.

30
00:04:34,000 --> 00:04:53,000
It's also a great way to understand these rules in detail. It's actually a great way to learn quite a bit about the kind of formal thinking that goes into the design of programming languages and what it means for a programming language to have a semantics and for implementation of something to be correct.

31
00:04:53,000 --> 00:04:53,040
Now, having said all that, I should say that most languages do not have a well-s

32
00:04:53,040 --> 00:05:08,000
specified operational semantics. There are some substantial languages and fairly realistic languages that do have a formal semantics, but most of the languages that you're familiar with do not.

33
00:05:08,000 --> 00:05:18,000
Finally, just as a comment, you know, when portability is important when you really want software that you're right to behave exactly the same in different environments.

34
00:05:18,000 --> 00:05:43,000
So, you know, if I take the same program and I move it to a different machine or a different operating system, I still want to have some kind of guarantee that this offer will behave as it is the same on both the old machine or the both in the old environment and the new environment, then I really need some independent definition of what it means or what the behavior of these programs should be.

35
00:05:43,000 --> 00:05:48,000
And that's where a formal semantics becomes really critical.

