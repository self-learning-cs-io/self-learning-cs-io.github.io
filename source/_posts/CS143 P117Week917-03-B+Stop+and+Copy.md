---
title: CS143 P117Week917 03 B+Stop+and+Copy
---

1
00:00:00,000 --> 00:00:07,000
So just as was the case with Mark and Sweep, when we scan an object, we have to know how big it is,

2
00:00:07,000 --> 00:00:12,000
and we also need to know where the pointer is in the object R. So if we think about this for a minute,

3
00:00:12,000 --> 00:00:18,000
let's say we're scanning this object, so this is our scan pointer, and we want now to process all the pointers in it.

4
00:00:18,000 --> 00:00:22,000
Well, we have to know where the pointers are. So there's a pointer here, and there's a pointer here.

5
00:00:22,000 --> 00:00:28,000
We need to be able to find those pointers, and we don't want to confuse them with other fields of the object that might look like pointers.

6
00:00:28,000 --> 00:00:32,000
So I'm a bit patterned for an integer, could look and awful out like a pointer.

7
00:00:32,000 --> 00:00:37,000
Now this is not a big problem, because the compiler of course determines the layout of the objects in the heat,

8
00:00:37,000 --> 00:00:43,000
and it can store that information somewhere communicated to the garbage collector, so they will be able to find the pointers.

9
00:00:43,000 --> 00:00:52,000
And so you can imagine easily a little bit of information stored with the program, indicating for each type where the pointers are.

10
00:00:52,000 --> 00:00:58,000
And similarly, once we scan this object, we need to be able to advance our scan pointer,

11
00:00:58,000 --> 00:01:03,000
just pass the object so that we can find the beginning of the next object, and that's why we need to know this size.

12
00:01:03,000 --> 00:01:10,000
Okay, so we need to know that size, so that the scan pointer can be moved pass the object, and we can find the beginning of the next object.

13
00:01:10,000 --> 00:01:16,000
Another issue is that whenever we do a garbage collection, I haven't mentioned this up to this point, but it should be clear,

14
00:01:16,000 --> 00:01:21,000
we also have to scan and copy objects pointed to by the stack.

15
00:01:21,000 --> 00:01:29,000
And we also have to update pointers in the stack, and this can actually turn out to be kind of an expensive operation with stop and copy,

16
00:01:29,000 --> 00:01:39,000
because you still have to walk the entire stack each time you do a collection in order to make sure that you've copied all the objects pointed to by the stack.

17
00:01:40,000 --> 00:01:48,000
To conclude, a stop and copy, I think it's fair to say, is generally believed to be the fastest garbage collection technique.

18
00:01:48,000 --> 00:01:55,000
Certainly, I believe that variations on stop and copy are the most efficient approaches known to automatic memory management.

19
00:01:55,000 --> 00:02:04,000
Allocation is very cheap, right? So because all you have to do is increment the heat pointer, so you're just moving a single pointer forward to allocate space.

20
00:02:05,000 --> 00:02:14,000
There's no complicated free list to traverse or decisions to make about where to put the object, you know, you're just going to allocate directly at the allocation pointer.

21
00:02:14,000 --> 00:02:21,000
So this part of memory management is very inexpensive. And at the same time, collection is also relatively cheap.

22
00:02:21,000 --> 00:02:33,000
And interestingly, it's especially cheap if there is a lot of garbage because because we're making a copy of the reachable objects, stop and copy only touches the reachable objects.

23
00:02:33,000 --> 00:02:49,000
So if you think about that for a minute, that means that a garbage collection is in stop and copy is ordered the size of the live objects.

24
00:02:49,000 --> 00:02:56,000
So whatever the subgraph is that you're copying, that's the cost of a garbage collection.

25
00:02:56,000 --> 00:03:11,000
And that's in contrast to Mark and sweep, where the cost is proportional to all the memory that you're using because you have the sweep phase where you have to go through and touch every single object, whether it's live or garbage.

26
00:03:11,000 --> 00:03:20,000
And so if you have a relatively lot of garbage and a relatively small set of live objects, stop and copy is actually much, much faster than Mark and sweep.

27
00:03:20,000 --> 00:03:37,000
Now, of course, the downside of stopping copies that it moves the objects in some languages, in particular, CNC++, can't allow you to move objects because the address that an object lives is actually visible exposed in the program as part of the semantics of the object.

28
00:03:37,000 --> 00:03:44,000
And so there, you really have to use Mark and sweep because you're not allowed to move anything.

