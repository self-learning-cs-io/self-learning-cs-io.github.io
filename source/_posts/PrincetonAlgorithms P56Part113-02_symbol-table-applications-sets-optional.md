---
title: PrincetonAlgorithms P56Part113 02_symbol Table Applications Sets Optional
---

1
00:00:00,000 --> 00:00:06,160
Welcome back. Today we're going to look at some symbol table applications to give you some idea of how

2
00:00:06,160 --> 00:00:11,919
symbol tables might be used by client programs for practical problems. First one we'll look at

3
00:00:11,919 --> 00:00:19,320
seems even simpler than regular symbol tables and that's about sets. So a mathematical set is just a

4
00:00:19,320 --> 00:00:25,879
collection of distinct keys. And so there's plenty of applications where we want to just be able to

5
00:00:25,879 --> 00:00:33,200
implement this really simple API. I want to be able to create an empty set. We want methods to add a

6
00:00:33,200 --> 00:00:41,000
key to the set and to check whether a given key is in the set or not to remove a key and maybe return the

7
00:00:41,000 --> 00:00:46,280
number of keys in the set and also have an iterator to iterate through keys in the set. This is

8
00:00:46,280 --> 00:00:52,519
simpler than symbol tables because it's got no associated value. That's a very simple API but of

9
00:00:52,520 --> 00:00:58,760
course we want to be able to do these operations efficiently. How would we go ahead and implement that? Well if you

10
00:00:58,760 --> 00:01:04,800
think about it for just a minute you see that what you need to do is just remove all references to value from any of the

11
00:01:04,800 --> 00:01:10,480
symbol table implementations that we look at. The implementation is easy. Take one of our symbol table

12
00:01:10,480 --> 00:01:17,840
implementations and get rid of the code that refers to values. Okay so let's look at a couple of

13
00:01:17,840 --> 00:01:26,480
applications where this set API might be useful in client programs. One thing that is very common is the

14
00:01:26,480 --> 00:01:32,960
idea of an exception filter. So the way we'll set that up is to think about having a list of

15
00:01:32,960 --> 00:01:41,400
files, a list of words in a file that are exceptional in some way. In this case we'll have the word file list.text

16
00:01:41,640 --> 00:01:47,440
that has these four words in it was it the enough. So this two

17
00:01:48,440 --> 00:01:55,240
complementary ways to look at this one is so called white listing where we want to take the words in that file

18
00:01:55,240 --> 00:02:00,980
and then we have some other much bigger file and what we want to do is print out all the

19
00:02:00,980 --> 00:02:07,360
occurrences of our exceptional words in our given file. Those are the ones that we care about that we want to get through.

20
00:02:07,679 --> 00:02:15,080
So in this case tiny tail.text the first couple of words from tail of two cities and these words appear

21
00:02:15,080 --> 00:02:23,479
often it was the of it was the of another complementary approach is to think of these words as words that we don't want to

22
00:02:23,479 --> 00:02:32,319
ever see. They're black lists and we want to take them out of our source file. So a black list client would print out all the words in

23
00:02:32,319 --> 00:02:42,479
our source file tiny tail.text except was it the enough in this case best times worst times and so forth. So that's an exception filter and that's

24
00:02:42,479 --> 00:02:51,280
useful in lots of applications such as the ones listed here. For example you might have a spell checker where you want to identify

25
00:02:51,639 --> 00:03:01,719
misspelled words. So then your key would be a word or string and in your exceptional list would be words that are in the dictionary and you'd want to print out all the words

26
00:03:01,719 --> 00:03:15,719
that are not in the dictionary. That's an example of an exception filter or in a browser you might want to mark your visited pages or block sites and so forth or like the one at the bottom

27
00:03:16,079 --> 00:03:30,560
credit cards. Maybe you run a credit card company and you want to check for stolen cards. Then your keys would be numbers and in your list might be kind of short which would be the stolen cards that you know

28
00:03:30,560 --> 00:03:59,280
about and you'd want to run a a white list filter for those cards and print out in your long list of transactions whichever transactions have that stolen cards. So that's just a couple of examples of exception filters. What's the implementation of an exception filter. Here's a simple one using the set API that we just articulated. So we start by creating an empty set of strings.

29
00:03:59,280 --> 00:04:15,280
And again, since we don't have associated values, we just have the one generic for strings and then create a new input stream from from the first argument. So that's the name of the file that contains the exceptional words.

30
00:04:15,280 --> 00:04:26,279
And so this just reads those strings while the input string is not empty and then adds them to the set. So then now we have our set of exceptional words.

31
00:04:26,279 --> 00:04:40,279
And now from standard input, we read words as long as our set contains the word we printed out. If it doesn't contain it, we don't print it out. So that's example of a white list filter and to implement black list.

32
00:04:40,279 --> 00:04:58,279
We just this call to contains, we just change that to a not if it's not in the exceptional list, then we printed out. So that's a simple example of a filter using sets.

