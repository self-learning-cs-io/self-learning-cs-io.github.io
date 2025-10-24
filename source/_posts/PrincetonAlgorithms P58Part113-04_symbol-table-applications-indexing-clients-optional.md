---
title: PrincetonAlgorithms P58Part113 04_symbol Table Applications Indexing Clients Optional
---

1
00:00:00,000 --> 00:00:06,520
Here's another simple client program for symbol tables related to indexing.

2
00:00:06,520 --> 00:00:10,960
Again, another common function that's easily handled by symbol tables.

3
00:00:10,960 --> 00:00:16,039
There's all kinds of cases where we just have a lot of information,

4
00:00:16,039 --> 00:00:19,160
maybe on our PC or all over the web.

5
00:00:19,160 --> 00:00:25,359
And we want to create an index that allows us to specify a search key

6
00:00:25,359 --> 00:00:27,960
and get all the associated information.

7
00:00:27,960 --> 00:00:34,560
And you've used programs like this on your computer in many instances most likely.

8
00:00:34,560 --> 00:00:37,719
So more generally, here's the goal.

9
00:00:37,719 --> 00:00:42,960
So we're going to have a list of files that are specified.

10
00:00:42,960 --> 00:00:48,960
And then maybe it's all files on the computer or maybe it's specified in some other way.

11
00:00:48,960 --> 00:00:55,520
And what we want to do is create an index so that we can efficiently find all the files

12
00:00:55,520 --> 00:00:58,640
that contain a given query string.

13
00:00:58,640 --> 00:01:04,040
So in this small example, so our client is going to be called file index.

14
00:01:04,040 --> 00:01:08,439
And in this small example, say we're going to have five text files.

15
00:01:08,439 --> 00:01:12,200
And these are just pieces of literature.

16
00:01:12,200 --> 00:01:19,520
And so what we want to do is build an index from that set of text files.

17
00:01:19,520 --> 00:01:24,760
And then given a key, a string key, we want it to print out the files

18
00:01:24,760 --> 00:01:26,840
that might contain that key.

19
00:01:26,840 --> 00:01:34,600
So for example, the word freedom appears in the Magna Carta and in Moby Dick and in Tale of Two Cities.

20
00:01:34,600 --> 00:01:41,000
All three of them, but not in Tom Sawyer and not in Esep's Fables.

21
00:01:41,000 --> 00:01:44,520
The word whale appears only in Moby Dick.

22
00:01:44,520 --> 00:01:48,560
The word lamb appears both in Tom Sawyer and Esep Fables and so forth.

23
00:01:48,560 --> 00:01:53,280
So we're looking for piece of information somewhere on computer and it'll give us the names

24
00:01:53,280 --> 00:01:56,359
of the files that contain that information.

25
00:01:56,359 --> 00:02:04,280
So with a more complex user interface, this is very much what the Spotlight

26
00:02:04,280 --> 00:02:07,359
or Find function on your computer is doing.

27
00:02:07,359 --> 00:02:15,599
In a program, we might use the same program to find places where certain programming terms

28
00:02:15,599 --> 00:02:18,400
are used in a bunch of programs.

29
00:02:18,400 --> 00:02:23,000
So normally we have a bunch of .java files when we're working on an application

30
00:02:23,039 --> 00:02:26,520
like these are all the ones associated with this lecture.

31
00:02:26,520 --> 00:02:30,759
So we might build an index from that set of files and then we might wonder,

32
00:02:30,759 --> 00:02:32,639
well, where do we use the import statement?

33
00:02:32,639 --> 00:02:36,840
So we just search for import and it'll tell us looking those three files.

34
00:02:36,840 --> 00:02:42,680
Or did we use comparators anywhere here and this index will tell us no?

35
00:02:42,680 --> 00:02:49,039
So again, a very general capability that's got lots and lots of applications

36
00:02:49,039 --> 00:02:53,919
and easy to implement with our symbol table API.

37
00:02:53,919 --> 00:02:59,159
And the idea is that what we're going to do is associate keys with values.

38
00:02:59,159 --> 00:03:02,239
Well, the key is the string we type, what's the value?

39
00:03:02,239 --> 00:03:06,079
Well, what we're going to use for value is a set of files,

40
00:03:06,079 --> 00:03:08,120
the files that contain the query string.

41
00:03:08,120 --> 00:03:13,000
So just given that high level description, then the implementation is pretty direct.

42
00:03:13,000 --> 00:03:18,199
Here's the implementation of file index using our symbol table implementation.

43
00:03:18,199 --> 00:03:25,679
So now we're going to build a symbol table that associates string keys with sets of files.

44
00:03:25,679 --> 00:03:31,679
So this creates a new symbol table associating string keys with sets of files.

45
00:03:31,679 --> 00:03:35,799
So first thing we do as before is build the index.

46
00:03:35,799 --> 00:03:40,479
So we're going to take this time, we're going to take the list of file names

47
00:03:40,479 --> 00:03:42,839
from the command line.

48
00:03:42,839 --> 00:03:47,679
And for each file, we're going to create an input stream.

49
00:03:47,680 --> 00:03:50,840
So we're going to read every word in the file.

50
00:03:50,840 --> 00:03:55,599
If the symbol table does not contain the word,

51
00:03:55,599 --> 00:04:01,520
we'll create a new set for that word and put that into the symbol table.

52
00:04:01,520 --> 00:04:10,960
And then we simply get the set associated with the key and add the new word to that set,

53
00:04:10,960 --> 00:04:13,319
the new file name to that set.

54
00:04:13,319 --> 00:04:21,560
So this one, for each word in the file, it'll add that file name to the corresponding set for that word.

55
00:04:21,560 --> 00:04:26,199
That's building a symbol table associating keys with sets of files.

56
00:04:26,199 --> 00:04:29,159
And then processing queries is the same as before.

57
00:04:29,159 --> 00:04:36,120
As long as standard in is not empty, we take a query and then simply print out the set of strings

58
00:04:36,120 --> 00:04:40,839
associated with that word, which is a list of file names.

59
00:04:40,839 --> 00:04:47,719
So again, our symbol table API gives a very easy way to implement this file indexing function,

60
00:04:47,719 --> 00:04:50,279
which is very widely useful.

61
00:04:50,279 --> 00:04:57,959
And similarly, maybe we want to build a book index, maybe for a real book or maybe for an ebook.

62
00:04:57,959 --> 00:05:04,959
Or more generally, people want to often process, pre-process text,

63
00:05:04,959 --> 00:05:10,359
maybe a huge amount of text to support so-called concordance queries.

64
00:05:10,360 --> 00:05:17,800
So what you want to do is, given a word, you want to find all occurrences of that word along with the immediate context.

65
00:05:17,800 --> 00:05:22,600
And context just means a few words before and a few words after.

66
00:05:22,600 --> 00:05:33,400
So for example, in tale of two cities, the word cities actually only appears in this one place.

67
00:05:33,399 --> 00:05:43,879
And this is the context that it appears with the four words tongues of the two before and that were blended in after.

68
00:05:43,879 --> 00:05:49,159
The word majesty appears in three places and there's the context.

69
00:05:49,159 --> 00:05:54,919
And well, this is a very special case of what you're very familiar with in web searches.

70
00:05:54,919 --> 00:06:01,560
You type in a word and then you get places where that word appears in context.

71
00:06:01,560 --> 00:06:07,399
Again, our symbol table API provides for an easy way to implement this.

72
00:06:07,399 --> 00:06:14,120
This is a concordance client that does the job.

73
00:06:14,120 --> 00:06:20,040
Now, what we want to do is read text and we want to build an index for each word.

74
00:06:20,040 --> 00:06:31,160
So this is a Java construct for reading all the strings on an input stream.

75
00:06:31,160 --> 00:06:36,439
Unstandard input and splitting them by blank space and putting them into array.

76
00:06:36,439 --> 00:06:40,680
So now all the words are in an array.

77
00:06:40,680 --> 00:06:41,800
Unstandard input.

78
00:06:41,800 --> 00:06:51,000
And then we're going to create a new symbol table that associates strings with sets of integers.

79
00:06:51,000 --> 00:07:00,920
And again, the string is the key and the sets of integers are going to be the places in the array where the given word appears.

80
00:07:00,920 --> 00:07:06,120
So we go through all the words and pick out our key S.

81
00:07:06,120 --> 00:07:12,759
And again, if it's not there yet, we create a new set associated with that S.

82
00:07:12,759 --> 00:07:20,439
And then afterwards, we go ahead and get that set and put the new index on that set.

83
00:07:20,439 --> 00:07:30,280
And then that allows us to process queries where we take a query and then get the set of indices associated with that query.

84
00:07:30,279 --> 00:07:38,119
And then we've left out the code where you print out the nine words that you want, the four to the left and the four to the right.

85
00:07:38,119 --> 00:07:46,919
Again, quite useful and familiar functionality and very easy to implement with our symbol table client.

