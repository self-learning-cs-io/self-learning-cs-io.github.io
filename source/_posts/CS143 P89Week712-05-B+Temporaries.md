---
title: CS143 P89Week712 05 B+Temporaries
---

1
00:00:00,000 --> 00:00:03,000
Now that we know how many

2
00:00:03,000 --> 00:00:07,000
temporaries or intermediate values we need to evaluate a function,

3
00:00:07,000 --> 00:00:12,000
and we also know where those intermediate values are going to be stored in the activation record,

4
00:00:12,000 --> 00:00:16,000
the last thing we need to know in order to do code generation is how many

5
00:00:16,000 --> 00:00:20,000
temporaries are in use at each point in the program.

6
00:00:20,000 --> 00:00:26,000
Let me change colors here. And so the way we're going to do that is we're going to add a new argument to code generation,

7
00:00:26,000 --> 00:00:32,000
which is the position of the next available temporary. So as temporaries get used up,

8
00:00:32,000 --> 00:00:38,000
this argument to code generation will change and allow other expressions to save their values and safe places

9
00:00:38,000 --> 00:00:43,000
without stepping on temporaries that are already have been saved by other expressions.

10
00:00:43,000 --> 00:00:47,000
And as you'll see in a moment here when we do an example,

11
00:00:47,000 --> 00:00:53,000
the temporary area of the activation record is going to be used like a small fixed size stack.

12
00:00:53,000 --> 00:00:56,000
Essentially we're going to have the same stack discipline that we had before,

13
00:00:56,000 --> 00:01:05,000
only all the computation on the stack pointer, all the discussion, all the computation of what offsets to use has already been done by the compiler.

14
00:01:05,000 --> 00:01:10,000
So what we used to do by pushing and popping elements from the stack in the generated code,

15
00:01:10,000 --> 00:01:14,000
a lot of that computation has been moved into the compiler,

16
00:01:14,000 --> 00:01:21,000
and all that happens now is a bunch of stores and loads to fixed offsets from the frame pointer.

17
00:01:21,000 --> 00:01:27,000
So let's take a look at how this works. Here's the code that we had for E1 plus E2 under the old scheme,

18
00:01:27,000 --> 00:01:31,000
where we didn't have a separate area in the activation records for temporaries.

19
00:01:31,000 --> 00:01:36,000
So we would generate code for E1, and then we would save the result of E1 on the stack,

20
00:01:36,000 --> 00:01:40,000
and that would be done by saving the value of the accumulator under the stack,

21
00:01:40,000 --> 00:01:45,000
and then we would have to adjust the stack pointer. And then after we had evaluated E2,

22
00:01:45,000 --> 00:01:51,000
then we would load the result of E1 back into a temporary register.

23
00:01:51,000 --> 00:01:58,000
We could do the add, and then we could pop the value off of the stack, the intermediate value off of the stack.

24
00:01:58,000 --> 00:02:02,000
Now under the new scheme, code generation is going to take a second argument,

25
00:02:02,000 --> 00:02:06,000
saying what is the position of the next available temporary?

26
00:02:06,000 --> 00:02:11,000
So what is the position of the next unused temporary inside of the activation record?

27
00:02:11,000 --> 00:02:16,000
And so now we generate code for E1, and we pass along the argument,

28
00:02:16,000 --> 00:02:21,000
because E1 may itself have some temporaries that it needs to store.

29
00:02:21,000 --> 00:02:29,000
And then after E1 is done evaluating, now we just do a direct store into the activation record

30
00:02:29,000 --> 00:02:33,000
at offset int from the frame pointer. And so now as we have to do the store,

31
00:02:33,000 --> 00:02:38,000
we have to save E1 in the activation record, so we have it for later on,

32
00:02:38,000 --> 00:02:44,000
but we don't have to do any manipulation of the stack, so we replace two instructions here by one.

33
00:02:44,000 --> 00:02:53,000
And then we generate code for E2, but now we just save a temporary value at position at offset int from the frame pointer,

34
00:02:53,000 --> 00:03:00,000
so the next available temporary will be an address, int, or an offset, excuse me, int plus four.

35
00:03:00,000 --> 00:03:07,000
And then after E2 is done evaluating, now we have to load the value of E1 back into a temporary,

36
00:03:07,000 --> 00:03:13,000
and again that was at offset int from the frame pointer of the current activation record,

37
00:03:13,000 --> 00:03:18,000
and then we can do the add. And once again we save the manipulation of the stack pointer.

38
00:03:18,000 --> 00:03:23,000
So this code sequence here is two instructions shorter than the one we had before,

39
00:03:23,000 --> 00:03:27,000
and is actually substantially more efficient.

40
00:03:28,000 --> 00:03:35,000
So now we have to do the same thing, and then we have to do the same thing,

41
00:03:35,000 --> 00:03:42,000
and then we have to do the same thing, and then we have to do the same thing,

42
00:03:42,000 --> 00:03:48,000
and then we have to do the same thing, and then we have to do the same thing,

43
00:03:48,000 --> 00:03:54,000
and then we have to do the same thing, and then we have to do the same thing,

