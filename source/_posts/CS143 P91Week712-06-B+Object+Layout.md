---
title: CS143 P91Week712 06 B+Object+Layout
---

1
00:00:00,000 --> 00:00:03,760
Now that we've dealt with the layout of an object's attributes,

2
00:00:03,760 --> 00:00:09,759
we can switch gears and talk about how we layout its methods and how we implement dynamic dispatch.

3
00:00:09,759 --> 00:00:19,120
So let's consider a dispatch call e.g where e here, let's say, is of class b.

4
00:00:19,120 --> 00:00:21,760
Okay, and so what do we want to have happen?

5
00:00:21,760 --> 00:00:26,719
Well, we want to invoke the g method here in class b.

6
00:00:26,719 --> 00:00:28,719
Okay, so that seems pretty straightforward.

7
00:00:28,719 --> 00:00:32,000
So now let's consider a slightly more complicated example.

8
00:00:32,000 --> 00:00:35,839
What if we're invoking e.f, what if we're calling the f method?

9
00:00:35,839 --> 00:00:43,679
Well, if we have a b object, then we are going to want to invoke this method,

10
00:00:43,679 --> 00:00:48,159
this f method, okay, which is the f method defined in b.

11
00:00:49,039 --> 00:00:53,679
But if we have an a object, we want to be sure that we invoke this method,

12
00:00:53,679 --> 00:00:55,679
okay, this version of f.

13
00:00:55,839 --> 00:00:58,719
All right, so this f down here is said to be over ridden.

14
00:01:00,880 --> 00:01:11,200
Okay, so we have redefined method f in class b, and this definition replaces the method definition

15
00:01:11,200 --> 00:01:14,159
that b would otherwise have inherited from a.

16
00:01:14,159 --> 00:01:20,640
So in particular in class c, class c also has an f method, okay, and if we invoke the f method,

17
00:01:21,280 --> 00:01:26,000
if it turns out that e here is of type c, then which method should get invoked?

18
00:01:26,000 --> 00:01:29,519
Well, it would be this one, it would be the one defined in class a.

19
00:01:29,519 --> 00:01:32,640
So all three of these classes have an f method.

20
00:01:33,680 --> 00:01:41,439
If we do a dynamic dispatch on either a c or an a object, we'll execute the one defined in class a.

21
00:01:42,159 --> 00:01:48,879
If we do the dispatch on a b object, we will execute the method defined in class b.

22
00:01:51,359 --> 00:01:55,920
Now every class has a fixed set of methods, including the inherited methods.

23
00:01:55,920 --> 00:02:03,519
So if you look, if I tell you the name of a class, then you know exactly which methods it has.

24
00:02:04,319 --> 00:02:10,719
Those methods never change at runtime, okay, so don't be confused here because overriding is

25
00:02:10,719 --> 00:02:15,840
something that's done at compile time. It's basically a static property. So the compiler can figure

26
00:02:15,840 --> 00:02:21,599
out even though you can redefine methods in some classes, the compiler can figure out a compile time,

27
00:02:21,599 --> 00:02:27,120
all the methods of a particular class methods are never changed while the program is executing.

28
00:02:27,840 --> 00:02:33,120
All right, and so a dispatch table or just a table of some sort is used to index these methods.

29
00:02:33,120 --> 00:02:37,840
And this is just an array of method entry points. So essentially for every method of the class,

30
00:02:38,560 --> 00:02:44,640
there's an entry in the array for that method. And just like with attributes, a method f is going to

31
00:02:44,639 --> 00:02:52,719
live at a fixed offset in the dispatch table for a class and all of its subclasses. So once we

32
00:02:52,719 --> 00:02:58,799
determine the position that a method lives in, it lives in its dispatch table, it will stay there

33
00:02:59,519 --> 00:03:07,759
for any subclasses of that class. So let's take a look at our example again and just a reminder of

34
00:03:07,759 --> 00:03:12,959
the structure of the example. We had class a and now we only really care about the method. So

35
00:03:13,599 --> 00:03:20,000
a class a defined an f method. And then we had class b which inherits from a.

36
00:03:22,879 --> 00:03:30,319
And that defined a g method. And then there was the class c which also inherits from a,

37
00:03:31,520 --> 00:03:39,200
which defined an h method. All right, so those three classes and these three methods.

38
00:03:39,759 --> 00:03:48,799
Okay. And so the dispatch table for class a only has one method in it. So it offsets zero.

39
00:03:49,359 --> 00:03:56,959
We store a pointer to the code for the f method defined in a. Okay. So this is actually

40
00:03:56,959 --> 00:04:03,759
literally just a pointer to the first instruction of the code that will run method a. So this is a

41
00:04:03,759 --> 00:04:09,840
pointer to the caller side of the calling sequence or to the label, labeled instruction.

42
00:04:09,840 --> 00:04:17,680
That's the entry point for the method. Now what about let's take a look next actually at class c.

43
00:04:18,319 --> 00:04:24,480
Okay. So class c inherits from a. So it's going to have all the methods of a and they're going to be

44
00:04:24,480 --> 00:04:31,920
at the same offsets. So in particular, the f method will appear at offset zero in class c. And

45
00:04:31,920 --> 00:04:36,800
this points to the same method as the one in a. Okay. Since it inherits that method from a.

46
00:04:37,360 --> 00:04:44,480
And then class c defines its own method h. And so in the next position of the table goes the

47
00:04:44,480 --> 00:04:51,680
pointer to the code for for h. And you know, if there had been more methods defined in these classes,

48
00:04:51,680 --> 00:04:59,200
then they would have appeared laid out in textual order just like for the attributes. So if there

49
00:04:59,199 --> 00:05:05,599
had been say two methods defined in a, then there would be two entries here for the first method.

50
00:05:05,599 --> 00:05:10,399
And the second method defined in a. And then if c defines say three methods, then there would be

51
00:05:10,399 --> 00:05:19,279
three more entries in the table and so on. Okay. Now the interesting case is what happens in class b.

52
00:05:20,159 --> 00:05:25,919
So in class b, the f method is redefined. And I forgot to indicate that. So let me just indicate

53
00:05:25,920 --> 00:05:33,120
that up here. So the f method, we have a new definition of the f method in class b. Okay. So the

54
00:05:33,120 --> 00:05:39,520
important thing to see here is that the pointer to the code for the f method lives in the same position.

55
00:05:39,520 --> 00:05:46,000
It's still the first entry in the table. Okay. So the position of the f method in the dispatch table

56
00:05:46,000 --> 00:05:51,759
for class b is exactly the same. That never changes. What's different is just the contents of that

57
00:05:51,759 --> 00:05:57,120
location. The first entry in the table here points to a different function. It points to the

58
00:05:57,120 --> 00:06:03,519
method that was defined in b instead of the one that was defined in a. And then since b defines

59
00:06:04,079 --> 00:06:11,279
some additional methods or one additional method that gets laid out after the methods for a.

60
00:06:14,000 --> 00:06:18,800
Okay. You may recall a while ago that we talked about the object header and we mentioned

61
00:06:18,800 --> 00:06:22,720
this thing called the dispatch pointer. So let's just remind ourselves what goes in the object

62
00:06:22,720 --> 00:06:29,040
header. There's a tag and then there's a size. And then there was a dispatch pointer. So

63
00:06:32,960 --> 00:06:37,199
and then following the dispatch pointer, we're all the attributes of the class.

64
00:06:37,920 --> 00:06:44,720
And now this dispatch pointer is just a pointer to the table of methods for that class.

65
00:06:45,520 --> 00:06:52,800
Okay. So this would be a pointer to the table that contains all the entries for the methods,

66
00:06:52,800 --> 00:06:58,640
all the entry points of the methods for that class. And the reason for using this level of

67
00:06:58,640 --> 00:07:04,640
indirection. Okay. So why do we have this pointer to a separate table? Okay. Why are the methods laid

68
00:07:04,640 --> 00:07:08,960
out like that when all the attributes are just embedded directly in the class? And we could,

69
00:07:09,039 --> 00:07:16,079
if we wanted to, just embed all the functions directly inside the object and you know,

70
00:07:16,079 --> 00:07:21,519
just put this whole table inside the object and and not have this extra pointer that we have to,

71
00:07:21,519 --> 00:07:27,279
we have to maintain and follow. And then the reason for this is that the attributes can be updated.

72
00:07:27,279 --> 00:07:33,599
Okay. So the attributes for an object can be unique to that object. Every object can have its own

73
00:07:33,600 --> 00:07:40,160
set of attributes, all right. But the functions, the methods for an object never change. And so the

74
00:07:40,160 --> 00:07:45,360
same object table can be shared between all the objects of a given class. So if I have

75
00:07:46,160 --> 00:07:51,840
100 A objects, well, then I might have 100 different versions of the attributes. And so each

76
00:07:52,800 --> 00:07:57,200
A object has to have its own copy of the attributes. But all those 100 A objects will have the same

77
00:07:57,200 --> 00:08:02,960
methods. And I can save a lot of space by having them share a common table of the methods.

78
00:08:04,000 --> 00:08:11,360
And again, every method of the class or of any of every class is assigned an offset. And we'll

79
00:08:11,360 --> 00:08:17,439
call that osf in the dispatch table at compile time. So it's the job of the compiler to figure out

80
00:08:17,439 --> 00:08:22,240
all the methods in the class and then assign each of those methods a fixed position, a fixed

81
00:08:22,240 --> 00:08:30,879
offset in that dispatch table. So to wrap up, how do we implement dynamic dispatch? So let's say we

82
00:08:30,879 --> 00:08:39,120
have a dispatch to an expression e and we're calling the f method. So here's a slightly simplified

83
00:08:39,120 --> 00:08:43,840
version of the sequence of steps. So first we evaluate the expression e and that's going to give

84
00:08:43,840 --> 00:08:51,120
us back an object x, okay. And then we're going to get the dispatch table for x. Where does that come

85
00:08:51,120 --> 00:08:56,080
from? Well, it's in the header of x. So we can just take the object x itself and we know that in

86
00:08:56,080 --> 00:09:03,440
every object at the in the third word, there is a dispatch pointer for the that's appropriate to

87
00:09:03,440 --> 00:09:10,080
the class of x. So we take that table and then we look up the entry point of f at the offset

88
00:09:10,879 --> 00:09:16,960
for f in that dispatch table. Okay, and then we jump to that to that address. Okay, that's the entry

89
00:09:16,960 --> 00:09:24,480
point of the function. And when we do that, we bind self to x. So the the self parameter inside of

90
00:09:24,480 --> 00:09:35,200
the f method will be the x object.

