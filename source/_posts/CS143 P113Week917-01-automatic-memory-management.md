---
title: CS143 P113Week917 01 Automatic Memory Management
---

1
00:00:00,000 --> 00:00:09,000
In this video, we're going to start our discussion of garbage collection or automatic memory management.

2
00:00:09,000 --> 00:00:14,000
This will take us a few videos to get through, and this first video is just an overview of the problem,

3
00:00:14,000 --> 00:00:18,000
and then we'll talk about specific techniques in subsequent videos.

4
00:00:21,000 --> 00:00:25,000
To set the stage, let's first talk about the problem that we're trying to solve.

5
00:00:25,000 --> 00:00:32,000
If one has to manage memory manually, meaning you have to do all the allocation and deallocation explicitly yourself,

6
00:00:32,000 --> 00:00:39,000
that is a hard way to program and leads to certain kinds of bugs that are very difficult to eliminate from programs.

7
00:00:39,000 --> 00:00:44,000
In particular, these days, you see this primarily in C and C++ programs.

8
00:00:44,000 --> 00:00:48,000
Those are the main languages that are used that have manual memory management.

9
00:00:48,000 --> 00:00:55,000
The kind of storage bugs that you can get because it has manual memory management are things like forgetting to free unused memory,

10
00:00:55,000 --> 00:01:03,000
so that's a means of memory leak, dereferencing dangling pointers, overriding parts of a data structure unintentionally,

11
00:01:03,000 --> 00:01:08,000
and actually there's a few more things, although these are probably the three most common problems that people have.

12
00:01:08,000 --> 00:01:12,000
These bugs are really hard to find, and I want to emphasize that.

13
00:01:12,000 --> 00:01:19,000
These kinds of bugs are often some of the very, very last bugs to be found in complex systems.

14
00:01:19,000 --> 00:01:26,000
They often persist into production, and sometimes for a very long time after the code is in production use.

15
00:01:26,000 --> 00:01:35,000
And why is that? The reason is that these kinds of bugs, storage bugs, typically have effects that are far away in time and space from the source.

16
00:01:35,000 --> 00:01:46,000
So, how can that happen? Well, let's think about some object in memory, and now let's say, you know, that this thing might have some fields.

17
00:01:46,000 --> 00:01:50,000
Let's say it has a few fields, and I'm keeping some pointers to it.

18
00:01:50,000 --> 00:01:54,000
So somewhere in the program, there's a reference to this particular object.

19
00:01:54,000 --> 00:02:01,000
And now I come along and free it. So I'm doing manual memory management, so I free this object, but I forget that I had this pointer.

20
00:02:01,000 --> 00:02:08,000
And so now what's happened? Well, this storage has been freed. It's no longer really valid memory, but the pointer still exists to it.

21
00:02:08,000 --> 00:02:13,000
And then when I come along and allocate something else, it might allocate the same piece of memory.

22
00:02:13,000 --> 00:02:17,000
So this might now be a different kind of object.

23
00:02:17,000 --> 00:02:20,000
Okay, so I might have a different type here, even.

24
00:02:20,000 --> 00:02:27,000
This memory might be used for something completely different, and now I have a pointer that says it thinks it's a red object.

25
00:02:27,000 --> 00:02:33,000
It's pointing to a blue object. And when I come in and write stuff into this object, of course, I'm just writing nonsense.

26
00:02:33,000 --> 00:02:38,000
So this whatever piece of code holds this pointer thinks it's still the old kind of object.

27
00:02:38,000 --> 00:02:45,000
It'll write some bits in here. And when I go in some other part of the program, possibly quite far away, go out and read out.

28
00:02:45,000 --> 00:02:53,000
This is a blue object. I'll just get some random garbage, and that will probably cause my program to crash.

29
00:02:53,000 --> 00:03:01,000
So this is a very, very old problem. It's been studied since at least the 1950s. It was first thought about carefully in the list.

30
00:03:01,000 --> 00:03:08,000
And there are some well known techniques for completely automatic memory management. So you don't have to manage memory yourself.

31
00:03:08,000 --> 00:03:20,000
And this only became mainstream actually in the 1990s. So with the popularity of Java, prior to that time, there was really no mainstream language that used automatic memory management.

32
00:03:20,000 --> 00:03:32,000
So it's really just in the last now almost 20 years that that garbage collection and automatic memory management in general became a popular mainstream programming technique.

33
00:03:32,000 --> 00:03:43,000
So the basic strategy in automatic memory management is pretty simple. So when an object is created, when we allocate a new object, the system, the runtime system, we'll find some unused space for that object.

34
00:03:43,000 --> 00:03:57,000
And it will just allocate it. So whenever you say new of some class name in cool, some memory is automatically allocated by the system, some previously unused memory is automatically allocated by the system for that object.

35
00:03:57,000 --> 00:04:08,000
And if you keep doing this over and over again, and after a while, you're going to run out of space. So eventually, there is no more unused space left for additional objects.

36
00:04:08,000 --> 00:04:26,000
And at that point, you have to do something. You have to have to reclaim some of the space in order to allocate more objects. And the observation that garbage collection systems rely upon is that some of the space is being used is probably occupied by objects that will never be used again.

37
00:04:26,000 --> 00:04:42,000
So some of these objects are not going to be referred to again by the program. And if we can figure out which objects those are, which of which objects are not no longer going to be used, then we can deallocate them and reuse this space for new objects.

38
00:04:42,000 --> 00:05:01,000
So the big question is how can we know that an object will never be used again. And most of the garbage collection techniques that are out there today rely on the following observation, then that's that a program can only use the objects that they can find. And what do we mean by that? So I'm going to switch colors.

39
00:05:01,000 --> 00:05:08,000
So let's take a look at this piece of code. So what's going to happen? Well, when we execute this, the first thing that happens is we allocate an a object.

40
00:05:08,000 --> 00:05:29,000
And it's assigned X. So X will have a pointer to that object. And then in the body of this let what's going to happen, well, we're going to assign X of the value that Y points to. So Y is another variable. It points to some other object in memory.

41
00:05:29,000 --> 00:05:46,000
And what's going to happen when we execute this assignment is that we're going to remove the old value of X and X is now going to point to this object. Now observe that this object A is unreachable.

42
00:05:46,000 --> 00:06:01,000
Meaning it has no references to it. There are no longer any pointers to it. And how do I know that? Well, it was brand new here when it was created. I only created one pointer to it X. And then I immediately assigned X to something else. So I dropped the only pointer day.

43
00:06:01,000 --> 00:06:18,000
There's no reference to A anywhere in the program. And so the program will never be able to find it again. There's the program if no variable or data structure in the program has a pointer to A, then A can never be referred to by the program in the future.

44
00:06:18,000 --> 00:06:29,000
So I kind of subsequent execution program has no pointers to A. And therefore, we'll never use it again. And so the space for it could be reclaimed and used for another object.

45
00:06:29,000 --> 00:06:41,000
Now it turns out that we need a more general definition of object reachability than this example illustrates. So let's take a look at that. We're going to say that an object X is reachable if and only if one of the following two things is true.

46
00:06:41,000 --> 00:06:58,000
So either a register contains a pointer to X. So either the X is reachable immediately from some register. Remember that the registers contain things like the local variables in there and the intermediate expressions. And they're just, you know, the values that the program has immediate access to.

47
00:06:58,000 --> 00:07:11,000
Or another reachable object Y contains a pointer to X. And so what does this say? Well, this is you're going to start at the registers. So, you know, the program might be implemented using a few registers.

48
00:07:11,000 --> 00:07:23,000
And then you're going to look at all the things that those registers point to all the objects that they point to. And you will look at the pointers in those objects and everything they can point to.

49
00:07:23,000 --> 00:07:33,000
Okay. And some of these things might overlap. I mean, some of these there might be multiple things which are reachable by more than one past starting at the registers.

50
00:07:33,000 --> 00:07:47,000
But the complete set of things that you can reach beginning at the registers and following all possible pointers. Those are all the reachable objects. And then the complement of that set and unreachable object is one that isn't reachable.

51
00:07:47,000 --> 00:08:00,000
So all the other objects, the ones that you were not able to reach by recursively starting at registers and following pointers as far as you could. Those objects can never be used because clearly the implementation can only access things through registers.

52
00:08:00,000 --> 00:08:14,000
And, and then only find additional things by, you know, loading pointers out of objects that you can reach from the registers. So anything that it can't reach by some sequence of sub steps will never be used again and is garbage.

53
00:08:14,000 --> 00:08:24,000
So let's take a look at another example that illustrates some interesting aspects of reachability and its use in automatic memory management.

54
00:08:24,000 --> 00:08:32,000
So what does this example do? The first thing it does, it allocates an a object on the heap and assigns that to the variable X.

55
00:08:32,000 --> 00:08:37,000
So X as a pointer to that object. And then it allocates a b object.

56
00:08:37,000 --> 00:08:46,000
And Y will point to that object. And then it assigns the value of Y to X.

57
00:08:46,000 --> 00:08:55,000
Alright, so we have this configuration. And now let's draw a line here.

58
00:08:55,000 --> 00:09:00,000
Okay, and we'll come back and remember this point in time. What things look like at this point in time.

59
00:09:00,000 --> 00:09:06,000
And then we're going to go off and we're going to execute this conditional. And notice what this conditional is going to do.

60
00:09:06,000 --> 00:09:14,000
It's going to always be true. Alright, so the predicate will always be true. So it'll never take the false branch. All it's going to ever do is take the true branch. And what's it going to do there?

61
00:09:14,000 --> 00:09:21,000
It's immediately going to override X. And so X is going to wind up pointing at some other new object. Doesn't matter what it is.

62
00:09:21,000 --> 00:09:33,000
And now let's say that at this point right here is where we try to do a garbage collection. So, you know, for some reason, this is the point where the program stops and tries to collect unused memory.

63
00:09:33,000 --> 00:09:39,000
And what can it collect? Well, just like before, because example up to this point is essentially the same.

64
00:09:39,000 --> 00:09:48,000
We can see that this object is unreachable. Okay, so the first A object becomes unreachable at that point. And it can be collected.

65
00:09:48,000 --> 00:09:58,000
Now what about the second object? Well, it is reachable. It's clearly reachable. It's reachable through X. Okay, at that point. And it's also reachable as it happens through Y.

66
00:09:58,000 --> 00:10:11,000
And so it's not garbage. And it's not going to be collected. But notice that the X value is always going to be overwritten. Okay, so the program, the compiler doesn't know that this branch is always going to be true.

67
00:10:11,000 --> 00:10:21,000
So it doesn't realize that the value that X has at this point won't ever be used again. But that value is immediately going to be overwritten every time we take this conditional.

68
00:10:21,000 --> 00:10:28,000
And furthermore, if Y is not used any place else in the program, if Y is dead at this point, let's say that Y is dead here.

69
00:10:28,000 --> 00:10:37,000
Then neither one of these references to be is ever going to be touched again. So in fact, the B value will never be used again, even though it is reachable.

70
00:10:37,000 --> 00:10:44,000
And so what this tells you is that reachability is an approximation.

71
00:10:44,000 --> 00:10:56,000
And by that I mean it's an approximation for the objects that will never be used again. What we're really interested in when we do garbage collection is collecting objects that will never be used in the future execution of the program.

72
00:10:56,000 --> 00:11:03,000
Because obviously that space is wasted and could be put to some other use that might be better. And reachability approximates that.

73
00:11:03,000 --> 00:11:12,000
So if an object is unreachable, it definitely won't be used again. However, just because an object is reachable, it's not a guarantee that it will be used again.

74
00:11:12,000 --> 00:11:24,000
So now let's talk about how we do garbage collection in cool C. So cool C has a fairly simple structure. It uses an accumulator, which of course points to an object and that object may point to other objects and so on.

75
00:11:24,000 --> 00:11:41,000
So we can trace all the objects reachable from the accumulator, but we also have to worry about the stack pointer. So there's also stuff reachable from the stack and each stack frame course may contain pointers like and for example, the method parameters that are stored on the stack.

76
00:11:41,000 --> 00:11:52,000
Each stack frame may also contain some non pointers. So if I think about the layout of each activation record, there would be some mix of pointers and non pointers things like the return address.

77
00:11:52,000 --> 00:12:02,000
So if I know the layout of the frame, but if we do know the layout, and of course the compiler is deciding on the layout, so it naturally does know the layout, it can find all the pointers in the frame.

78
00:12:02,000 --> 00:12:11,000
So essentially the compiler has to keep a record for each kind of activation record it builds for each methods of an activation record for a method foo.

79
00:12:11,000 --> 00:12:24,000
So if that activation record has four slots, then the compiler would need to keep track of which one of these were pointers to object and perhaps a second and the fourth element of the frame are always pointers to objects and the other two are always non pointers.

80
00:12:24,000 --> 00:12:39,000
So the somewhere the compiler has to keep track of this information so that the garbage collector will know at runtime when it's looking at an activation record for foo, where the pointers that it needs to follow are.

81
00:12:39,000 --> 00:12:52,000
So in cool see we start tracing from the accumulator and the stack of these are called the roots, okay, so in garbage collector terminology, the roots are the registers from which you begin tracing out all the reachable objects.

82
00:12:52,000 --> 00:12:58,000
And if we do that here, what we can do is you see here we have our object here we have our accumulator, excuse me, and our stack pointer.

83
00:12:58,000 --> 00:13:12,000
And so we can just walk through this little diagram of memory and find all the reachable objects. So the accumulator points to object a, so we'll mark that as reachable a points to see so we'll mark it as reachable c points to e, so we'll mark it as reachable.

84
00:13:12,000 --> 00:13:24,000
The stack pointer has a couple of frames on it. The first frame has no pointers. The second frame points to e, you've already touched that one, it's already marked, so we can mark it again, but it doesn't matter as long as it gets marked by somebody.

85
00:13:24,000 --> 00:13:33,000
And now everything that is not marked is unreachable. And so what objects didn't we touch in our traversal of the reachable objects, well those are objects B and D.

86
00:13:33,000 --> 00:13:47,000
And so those are unreachable objects and they can be reclaimed and we can reuse their storage. Now one interesting thing to note here is that just because an object has pointers to it does not mean it is reachable.

87
00:13:47,000 --> 00:13:59,000
So notice here object D object D actually has a pointer to it. And yet object D is unreachable. And why is that? Well, because the only pointers to it are from other unreachable objects.

88
00:13:59,000 --> 00:14:14,000
So it's important here, just to understand that it's not the case that every unreachable object has no pointers to it. There will be some unreachable objects where there may be some unreachable objects that actually do have pointers to it to them, but they will only come from other unreachable objects.

89
00:14:15,000 --> 00:14:31,000
So our garb selection scheme has the following steps. We're going to allocate space as needed for new objects. We just go ahead and allocate new space as long as we have space. So whenever we need it and when space runs out, we need to compute what objects might be used again.

90
00:14:31,000 --> 00:14:43,000
Generally that's done by tracing objects reachable from a set of root registers. And then we're going to free the complement of that set. We're going to free the space used by the objects not found in part A.

91
00:14:43,000 --> 00:14:52,000
And well to say that some strategies do perform garbage collection before the space actually runs out and we'll actually look at one of those in a future video.

