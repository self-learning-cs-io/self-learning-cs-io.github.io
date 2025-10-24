---
title: PrincetonAlgorithms P98Part29 02_introduction To Substring Search
---

1
00:00:00,000 --> 00:00:07,000
Today we're going to look at substring search algorithms.

2
00:00:07,000 --> 00:00:10,000
This is a really fascinating family of algorithms.

3
00:00:10,000 --> 00:00:14,000
The problem is very simple to state, and the algorithms we're going to look at are among the most

4
00:00:14,000 --> 00:00:17,000
ingenious that we've seen so far.

5
00:00:17,000 --> 00:00:22,000
As usual, we introduce the problem, very simple to state problem.

6
00:00:22,000 --> 00:00:28,000
We have two strings. One we call the pattern, and the other we call the text.

7
00:00:28,000 --> 00:00:36,000
Usually it's good to think of the pattern as relatively small, and the text as relatively long.

8
00:00:36,000 --> 00:00:42,000
In fact, usually we want to think of the text of unlimited length coming in on an input stream.

9
00:00:42,000 --> 00:00:49,000
We have a small pattern, we're trying to find out if the patterns occurs in the text.

10
00:00:49,000 --> 00:00:57,000
So you're doing this all the time when you do a simple search on your computer or on the web.

11
00:00:57,000 --> 00:01:16,000
And there's practical applications where for various reasons people want to search the entire contents of the memory or disk for a particular pattern to make sure to check for whether there's something on the computer that's of interest.

12
00:01:16,000 --> 00:01:23,000
And again, you've got such an application, you've got a small pattern, and maybe a huge text.

13
00:01:23,000 --> 00:01:30,000
Or maybe you're looking through your email, which you can think of as a continuous stream of stuff coming in nowadays.

14
00:01:30,000 --> 00:01:34,000
And you want to look for patterns that might indicate that there's spam.

15
00:01:34,000 --> 00:01:39,000
And certainly you're all familiar with these types of patterns.

16
00:01:39,000 --> 00:01:48,000
So what we want is to be able to identify the pattern quickly and efficiently in a huge text file.

17
00:01:48,000 --> 00:01:54,000
That's one of the most important indicators that skip spam, I guess.

18
00:01:54,000 --> 00:01:58,000
Okay, so we'll try to set this up.

19
00:01:58,000 --> 00:02:04,000
So this isn't really a real situation, but it's not too far, actually.

20
00:02:04,000 --> 00:02:12,000
And so we have these characters to try to point out the kinds of issues that might be involved.

21
00:02:12,000 --> 00:02:22,000
So imagine an Internet surveillance situation where there's a need to monitor what's on the Internet for reasons of security.

22
00:02:22,000 --> 00:02:28,000
But there might be a judge saying, wait a minute, you can't be looking at all Internet traffic.

23
00:02:28,000 --> 00:02:37,000
That's private information, particularly among private individuals in the US, for example.

24
00:02:37,000 --> 00:02:50,000
Well, so what about if we just look for this one pattern that we really need to know about, and that really shouldn't violate anybody's privacy, like a tank at dawn.

25
00:02:50,000 --> 00:02:56,000
And the judge can say, okay, how about a few build a machine that just looks for that.

26
00:02:56,000 --> 00:03:09,000
And that's what we're going to talk about today, actually, one of the techniques that we look at is perfect for actually building hardware that can be put on a stream of data passing by.

27
00:03:09,000 --> 00:03:14,000
And just light the light if that particular pattern is seen.

28
00:03:14,000 --> 00:03:22,000
So you attach one of those machines all over the web, and if a packet doing happens, then you find it.

29
00:03:22,000 --> 00:03:29,000
That's the, say, a simplified explanation of what it is that we're going to try to do.

30
00:03:29,000 --> 00:03:35,000
Here's another kind of application, this is called screen scraping.

31
00:03:35,000 --> 00:03:46,000
So we might want to, and you can do this, write programs to do this for extracting relevant data from a web page.

32
00:03:46,000 --> 00:03:57,000
And the idea is that there's different institutions out there that are committed to providing information on the web.

33
00:03:57,000 --> 00:04:05,000
And they'll promise to, for example, this is Yahoo's page that gives the stock price of Google.

34
00:04:05,000 --> 00:04:08,000
When you look at the page, it says last trade.

35
00:04:08,000 --> 00:04:15,000
But if you write a program to look at the code that produces the page, it also says last trade.

36
00:04:15,000 --> 00:04:22,000
And since this HTML code is produced by a program, it's always going to have the same structure.

37
00:04:22,000 --> 00:04:39,000
So if we want to find, write a program to find Google's stock price at any time, what we can do is take this page, put it on an input stream, and search for the pattern last trade.

38
00:04:39,000 --> 00:04:43,000
And then just after last trade, there's the price in bold.

39
00:04:43,000 --> 00:04:53,000
So what we really want is the string between B and backslash B, which the limit's bold, after the first occurrence of the pattern last trade.

40
00:04:53,000 --> 00:04:58,000
And it's simple to write a Java program that implements this.

41
00:04:59,000 --> 00:05:15,000
This is the program. And the key is, while number one, our input, standard in, input stream methods allow a web page as argument.

42
00:05:15,000 --> 00:05:22,000
So in this case, we provide a command line argument, which is whatever company you want to quote for.

43
00:05:23,000 --> 00:05:31,000
And I was simply reading the whole web page. So now you have the web page in a long string.

44
00:05:31,000 --> 00:05:42,000
And then Java has a, with index of method for every string, and it tells you where that particular string occurs.

45
00:05:43,000 --> 00:05:56,000
And so we'll start at index of last trade. And then what we want to do is find the first B in brackets after that position.

46
00:05:56,000 --> 00:06:09,000
And the first B in close, with backslash B in brackets, starting from that position, and skipping over the angle bracket B, close bracket, you get the price, and you can print it out.

47
00:06:09,000 --> 00:06:15,000
And now this is a little utility that screen scripts from Yahoo's website.

48
00:06:15,000 --> 00:06:26,000
So substring searching is quite useful in its built-in as a method in Java's string data type.

49
00:06:26,000 --> 00:06:35,000
So it's practically useful. That's an introduction. So now let's look at algorithms for implementing the string searching.

50
00:06:40,000 --> 00:06:47,000
And then we'll look at the first B in a long string data type.

51
00:06:47,000 --> 00:06:54,000
And then we'll look at the first B in a long string data type.

52
00:06:54,000 --> 00:07:02,000
And then we'll look at the first B in a long string data type.

