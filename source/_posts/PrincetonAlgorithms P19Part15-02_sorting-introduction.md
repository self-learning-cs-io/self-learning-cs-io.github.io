---
title: PrincetonAlgorithms P19Part15 02_sorting Introduction
---

1
00:00:00,000 --> 00:00:03,000
Okay, what are the rules that we're going to follow?

2
00:00:03,000 --> 00:00:09,000
Well, let's start with looking at a typical basic sorting problem.

3
00:00:09,000 --> 00:00:12,000
Say a university has student records.

4
00:00:12,000 --> 00:00:15,000
And for every student, there's a certain amount of information.

5
00:00:15,000 --> 00:00:21,000
Maybe there's a class number, there's a grade, there's a phone number, maybe an address.

6
00:00:21,000 --> 00:00:28,000
So we refer to an item as a record or the information that we're going to sort.

7
00:00:28,000 --> 00:00:31,000
But in particular, there's a piece of a record called a key.

8
00:00:31,000 --> 00:00:36,000
And what we want to do is put the records into order according to the key.

9
00:00:36,000 --> 00:00:37,000
That's the sort problem.

10
00:00:37,000 --> 00:00:46,000
Rearrange an array of n items into ascending order, according to a defined key, which is part of the item.

11
00:00:46,000 --> 00:00:49,000
Now, our goal is to be able to sort any type of data.

12
00:00:49,000 --> 00:00:52,000
So let's look at a couple of client programs.

13
00:00:52,000 --> 00:00:58,000
First example is to just sort some random real numbers into ascending order.

14
00:00:58,000 --> 00:01:03,000
So here's a client that calls our insertion sort method.

15
00:01:03,000 --> 00:01:12,000
And all it does is read numbers from standard input, then into an array A, then calls insertion sort, and then prints them out.

16
00:01:12,000 --> 00:01:16,000
And you can see on the right that the numbers are printed out in sorted order.

17
00:01:16,000 --> 00:01:23,000
This seems like an artificial kind of input, but actually we'll look at an application even in this lecture.

18
00:01:23,000 --> 00:01:30,000
And in there are many applications where random inputs are a fine model.

19
00:01:30,000 --> 00:01:36,000
Here's maybe a more familiar sort client that sort strings.

20
00:01:36,000 --> 00:01:45,000
And in this case, it reads the strings from a file using our read strings method in our in class, which takes a file as argument.

21
00:01:45,000 --> 00:01:56,000
So we take the file name as the first command line argument, read in an array of strings from that file separated by blanks, call our insertion sort method again.

22
00:01:56,000 --> 00:02:08,000
So insertion.sort is a method that takes an array A as its parameter, and it as its first argument, and it rearranges the strings in that array to be in sorted order.

23
00:02:08,000 --> 00:02:25,000
So in this case, words 3.text has a certain number of three letter words, and this client program will result in those three letter words being rearranged into alphabetical order.

24
00:02:25,000 --> 00:02:34,000
Here's another client that we could use our sort program for if we achieve the goal of sorting any type of data.

25
00:02:34,000 --> 00:02:39,000
In this one, we're going to sort the file names in a given directory.

26
00:02:39,000 --> 00:02:57,000
So again, we use the file class from Java, and we use, we go and use the list files method from that class to get an array that contains all the file names in the given directory.

27
00:02:57,000 --> 00:03:16,000
That's an array with file names in it, and insertion sort takes that array as its first argument, and again, sort some, and then we go ahead and use, go through them one by one and print them out, and they come out in order of file name.

28
00:03:16,000 --> 00:03:21,000
So that's three different clients, three completely different types of data.

29
00:03:21,000 --> 00:03:34,000
And the first rule of the game that we have to think about is, how can we make it so that we can implement one sort program that can be used by these three different clients to implement three different types of data.

30
00:03:35,000 --> 00:03:39,000
And the way that that happens is a mechanism known as a callback.

31
00:03:39,000 --> 00:03:50,000
So that's our basic question, how can sort, now how to compare data of all these different types without being given any information about the type of an items key.

32
00:03:50,000 --> 00:04:13,000
And the answer is that what is, we set up a mechanism known as a callback or a reference to executable code, where the client by passing an array of objects to the sort function in Java, there's an implicit mechanism that says that any such array of objects is going to have a compare to method.

33
00:04:13,000 --> 00:04:23,000
And the sort function calls back the compare to method associated with the objects in the array, whenever it needs to compare to items.

34
00:04:23,000 --> 00:04:32,000
There's a lot of different ways to implement callbacks and that's programming language specific. Different languages have different mechanisms.

35
00:04:32,000 --> 00:04:55,000
It's all about the idea of passing functions as arguments to other functions, which is a deep area that gets us into functional programming and thinking all the way back to Turing and Church for Java, because of the desire to check types at compile time, the use of specific method called an interface.

36
00:04:55,000 --> 00:05:00,000
So look at the details of how to implement callbacks with Java interfaces now.

37
00:05:00,000 --> 00:05:12,000
It's a little bit of programming language detail, but it's really worthwhile because it allows us to use the sorts that we develop for any type of data in a type safe manner.

38
00:05:12,000 --> 00:05:22,000
So we already looked at some clients. This is the example of the client program that sorts the files in a given directory by file name.

39
00:05:22,000 --> 00:05:37,000
So it just calls our sort method with an array, some type of object as first argument. Now built into Java is the so-called comparable interface.

40
00:05:37,000 --> 00:05:49,000
All the comparable interface is a specification that a type, a data type that implements comparable will have a compare to method.

41
00:05:49,000 --> 00:06:08,000
So it's generic will be compared to against a certain type of item. Now when we implement objects that are to be sorted, will implement the comparable method. That's up in the top class file implements comparable file.

42
00:06:08,000 --> 00:06:21,000
So the problem is an operation that's used in so many situations. Many of the standard Java types that you would expect to involve sorts will implement comparable.

43
00:06:21,000 --> 00:06:30,000
So all that means is that that data type has an instance method that will implement the compare to method.

44
00:06:30,000 --> 00:06:45,000
It'll compare this object against the object given as argument. And depending on some complicated test, it'll return minus one meaning less plus one meaning greater or zero meaning equal.

45
00:06:45,000 --> 00:07:04,000
Now that compare to method is really all that the sort implementation needs. First it says that it's going to take as argument or an array of type comparable. So that means the objects in the array are going to implement the comparable interface or that they'll have a compare to method.

46
00:07:04,000 --> 00:07:23,000
And then the sort code can just use that compare to method, invoked on instance of the object like an entry in the array and as argument another instance in the object like another entry in the array to test whether the first is less than the second as in this example.

47
00:07:23,000 --> 00:07:40,000
The key point is that the sort implementation has no dependence on the type of data. That's handled by the comparable interface and a different comparable array will be sorted in the same way.

48
00:07:40,000 --> 00:07:52,000
Eventually because of the interface mechanism, be a call back to the actual compare to code that goes with the type of object being sorted.

49
00:07:52,000 --> 00:08:04,000
Now there's a few rules in their natural rules, but they're worth talking about and paying attention to that the compare to method has to implement.

50
00:08:04,000 --> 00:08:18,000
And so called a total order and all that saying is really that it must be possible to put items in order in a sort. So there's three properties.

51
00:08:18,000 --> 00:08:29,000
The first one says that if v is less than or equal to w and w is less than or equal to v, then the only way for that to be true is if they're equal.

52
00:08:29,000 --> 00:08:44,000
And then there's transitivity. If v is less than w, w is less than x, then v must be less than or equal to x. And totality is that either v is less than or equal to w or w is less than or equal to v or both. They're equal.

53
00:08:44,000 --> 00:09:03,000
So there's plenty of natural total orders in the types of data that we normally want to consider for sort keys like integers or natural numbers or real numbers, alphabetical order for strings, chronological order for dates or times and so forth.

54
00:09:03,000 --> 00:09:19,000
And so the cartoon on the right shows that not all orders are necessarily total orders. So rock paper scissors is in transit if you know that these listen, w, w is less than v, you don't know that these less than or equal to v.

55
00:09:19,000 --> 00:09:28,000
I'm sorry, these less than w, w is less than or equal to x, then you don't necessarily know that these less or equal to x.

56
00:09:28,000 --> 00:09:43,000
So the comparable API, then by convention and Java, we always need to implement compared to such that v that compared to w is a total order.

57
00:09:43,000 --> 00:09:54,000
And also by convention, it returns a negative integer if it's less zero, if it's equal positive, if it's greater.

58
00:09:54,000 --> 00:09:58,000
This object is greater than the object given as argument.

59
00:09:58,000 --> 00:10:06,000
If the types are incompatible or if either one is null, compared to should throw an exception.

60
00:10:06,000 --> 00:10:17,000
And many of Java's standard types for numbers and dates and files and so forth implement compared to by convention.

61
00:10:17,000 --> 00:10:25,000
Now, if we're going to implement our own type, then we have to go ahead and implement the comparable interface according to these rules.

62
00:10:25,000 --> 00:10:28,000
And usually that's fairly straightforward.

63
00:10:28,000 --> 00:10:41,000
Here's an example. It's a simplified version of the date class that's implemented within Java just to show the idea of implementing comparable.

64
00:10:41,000 --> 00:10:45,000
So after the class declaration is sorted in false if it's not.

65
00:10:45,000 --> 00:10:54,000
And all it does is just go through the array from one to the length of the array and test if each item is less than the one before it.

66
00:10:54,000 --> 00:10:59,000
If you have an item that's less than the one before it, then it's not sorted return false.

67
00:10:59,000 --> 00:11:04,000
If you get all the way through the array without that happening, then you say the array is true.

68
00:11:04,000 --> 00:11:14,000
That's pretty simple code. The question is, if you have a sorting algorithm that passes that test, are you sure that it correctly sorted the array?

69
00:11:14,000 --> 00:11:26,000
Well, the answer to that question is yes, if you used only the less than exchange methods to implement to refer to data.

70
00:11:26,000 --> 00:11:36,000
Because then you know, because you use the exchange method that the data in the array after the sort is the same data as it was in the array before the sort.

71
00:11:36,000 --> 00:11:44,000
If you have a sort method that can store any values in an array, it could, for example, store zeros in every array entry.

72
00:11:44,000 --> 00:11:52,000
That method would pass this test, but it didn't really correctly sort the array because overwrote all the values.

73
00:11:52,000 --> 00:12:00,000
So we use less than exchange to be sure that we can test that our methods work with a method like this.

74
00:12:06,000 --> 00:12:09,000
You

