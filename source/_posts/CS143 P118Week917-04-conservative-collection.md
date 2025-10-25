---
title: CS143 P118Week917 04 Conservative Collection
---

1
00:00:00,000 --> 00:00:07,400
In this very short video, I'm going to say a few words about a technique called conservative

2
00:00:07,400 --> 00:00:14,000
garbage collection that can be used for languages like C and C++.

3
00:00:14,000 --> 00:00:20,160
To review automatic memory management relies on being able to find all the reachable objects,

4
00:00:20,160 --> 00:00:23,280
and it also needs to be able to find all the pointers in an object.

5
00:00:23,280 --> 00:00:27,960
Now the difficulty with doing garbage collection for a language like C or C++ is that it's

6
00:00:27,960 --> 00:00:35,160
very difficult or even impossible to identify the contents of objects in memory with 100% reliability.

7
00:00:35,160 --> 00:00:41,960
So if we see two words in memory, it might be a list cell that has a data and next field.

8
00:00:41,960 --> 00:00:47,960
So if we see just two words here and there are some bit patterns in here, zeros and ones.

9
00:00:47,960 --> 00:00:50,960
Okay, how do we know whether these are both pointers?

10
00:00:50,960 --> 00:00:54,960
I mean, it could be that one is a pointer and the other is not in the case of a list cell.

11
00:00:54,960 --> 00:00:58,960
So one of these fields is just data like an injure and another one is a pointer.

12
00:00:58,960 --> 00:01:03,960
Or it could be something like a binary tree node where both of these words are pointers.

13
00:01:03,960 --> 00:01:12,960
And because of this weakness really of the C and C++ type systems, we just can't guarantee that we know where all the pointers are.

14
00:01:12,960 --> 00:01:20,960
Now it turns out that it is possible to extend garbage collection techniques to work with languages like C and C++.

15
00:01:20,959 --> 00:01:25,959
And the basic idea or insight is that it's always okay to be conservative.

16
00:01:25,959 --> 00:01:30,959
And if we're not sure whether something might be used in the future, then we'll just keep it around.

17
00:01:30,959 --> 00:01:35,959
And remember that graph reachability is already a conservative technique.

18
00:01:35,959 --> 00:01:39,959
What we really want is to keep around the objects that will just be used in the future.

19
00:01:39,959 --> 00:01:43,959
But the reachability in the object graph is an approximation to that.

20
00:01:43,959 --> 00:01:45,959
So because reachable objects might be used.

21
00:01:45,959 --> 00:01:50,959
And now the problem with C and C++ is that we don't know where the pointers are.

22
00:01:50,959 --> 00:01:53,959
We don't have a guarantee from the type system about where the pointers are.

23
00:01:53,959 --> 00:01:58,959
And so the basic trick is that if something looks like a pointer, then we will treat it as a pointer.

24
00:01:58,959 --> 00:02:00,959
All we have to do is be conservative.

25
00:02:00,959 --> 00:02:08,959
And if we are not sure whether a given word of memory is a pointer, then we can just treat it as a pointer and keep whatever it points to around.

26
00:02:08,959 --> 00:02:13,959
If we and VLOG were not going to move it or change it, that will be okay.

27
00:02:13,960 --> 00:02:17,960
And so how do we decide whether a particular word of memory is a pointer?

28
00:02:17,960 --> 00:02:23,960
Well, it should be aligned, meaning it should end in some zeros to indicate that it was pointing.

29
00:02:23,960 --> 00:02:26,960
If it was a pointer, it was pointing to a word boundary.

30
00:02:26,960 --> 00:02:30,960
And then whatever a bit pattern it is, if we interpret it as an address, it has to be a valid address.

31
00:02:30,960 --> 00:02:32,960
So they should point into the data segment.

32
00:02:32,960 --> 00:02:38,960
And notice that these two conditions will rule out all kinds of data and memory.

33
00:02:38,960 --> 00:02:45,960
So for example, any small integer is probably not going to be interpretable as a valid address in the data segment.

34
00:02:45,960 --> 00:02:52,960
So most likely, only things that are pointers or very few things that are not pointers will be treated as pointers.

35
00:02:52,960 --> 00:03:00,960
And what we're going to do then is if it looks like a pointer, we're going to consider it to be a pointer, we'll follow it, and then we'll end up overestimating the sort of reachable objects.

36
00:03:00,960 --> 00:03:05,960
We may keep around some stuff that isn't reachable at all, but that's all right.

37
00:03:05,960 --> 00:03:09,960
It's always okay to keep around more stuff than necessary.

38
00:03:09,960 --> 00:03:13,960
Now, we still can't move the objects, because we can't update the pointer students.

39
00:03:13,960 --> 00:03:17,960
If we don't know that something is a pointer, we certainly don't want to change it.

40
00:03:17,960 --> 00:03:26,960
And so for example, if we thought something was a pointer and it was actually an account number, and then we updated the pointer, when we moved the object, we would just completely change what the program does.

41
00:03:26,960 --> 00:03:29,960
So this only really works with Mark and Sweet.

