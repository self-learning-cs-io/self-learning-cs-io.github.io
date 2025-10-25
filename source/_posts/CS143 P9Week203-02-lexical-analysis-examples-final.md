---
title: CS143 P9Week203 02 Lexical Analysis Examples Final
---

1
00:00:00,000 --> 00:00:06,000
Welcome back. In this video we're going to continue our lecture on lexical analysis

2
00:00:06,000 --> 00:00:12,000
with some examples from past programming languages where interesting lexical problems arose.

3
00:00:12,000 --> 00:00:20,000
So we've already talked a little bit about Fortran and one of the interesting lexical rules in Fortran

4
00:00:20,000 --> 00:00:27,000
is that white space is insignificant. So white space doesn't matter and something like VAR1,

5
00:00:27,000 --> 00:00:33,000
which could be a variable name VAR1, is exactly the same as VAS space R1.

6
00:00:33,000 --> 00:00:40,000
So these two program fragments have to mean exactly the same thing. And the idea in Fortran is that you can take your program

7
00:00:40,000 --> 00:00:45,000
and you can delete all the blanks from it and that shouldn't change what the program means at all.

8
00:00:49,000 --> 00:00:54,000
Now the Fortran white space rule turns out to be a really pretty bad idea.

9
00:00:54,000 --> 00:01:02,000
And here's an example that illustrates the problem. So here are two Fortran expressions and the only difference between...

10
00:01:03,000 --> 00:01:07,000
So you might wonder why Fortran has this funny rule about white space.

11
00:01:07,000 --> 00:01:12,000
It turns out that on punch card machines it was easy to add extra blanks by accident.

12
00:01:12,000 --> 00:01:19,000
And as a result they added this rule to the language so that punch card operators wouldn't have to redo their work all the time.

13
00:01:19,000 --> 00:01:24,000
Fortunately today we don't enter our programs anymore on punch cards.

14
00:01:25,000 --> 00:01:30,000
But this example does help us understand better what we're trying to do in lexical analysis.

15
00:01:30,000 --> 00:01:37,000
So as I said the goal is to partition the string. We're trying to buy the string up into the logical units of the language.

16
00:01:37,000 --> 00:01:46,000
And this is implemented by reading left to right. So we're doing a left to right scan over the input recognizing one token at a time.

17
00:01:46,000 --> 00:01:53,000
And because of that look ahead may be required to decide where one token ends and the next token begins.

18
00:01:53,000 --> 00:01:58,000
And again I want to stress that look ahead is always needed. But we would like to minimize the amount of look ahead.

19
00:01:58,000 --> 00:02:06,000
And in fact we'd like to bound it to some constant. Because that will simplify the implementation of lexical analyzer quite a bit.

20
00:02:07,000 --> 00:02:11,000
Now just to illustrate that look ahead is something that we always have to worry about.

21
00:02:12,000 --> 00:02:20,000
Let's consider this example which we've looked at before and just notice that when we're reading left to right let's look at this keyword else here.

22
00:02:20,000 --> 00:02:32,000
When we've read the E we have to decide is that a variable name or some symbol by itself or do we want to consider it together with the symbols that follow it.

23
00:02:32,000 --> 00:02:40,000
And so there's a look ahead issue here. When we after we scanned E we have to decide is that sit by itself or is it part of a larger lexical unit.

24
00:02:40,000 --> 00:02:48,000
And you know there are single character variable names in this example like i, j and z. And so it's not unreasonable that E could also be one.

25
00:02:48,000 --> 00:03:02,000
And another example is this double equals when we've read a single equal sign. How do we decide whether that's a single equals like these other assignments or that's really a double equals well in order to do that.

26
00:03:02,000 --> 00:03:16,000
If we're if our focus point is right here we have to look ahead and see that there's another equals coming up and that's how we know or how we will know that we want to combine the two into a single symbol instead of considering this equals by itself.

27
00:03:16,000 --> 00:03:22,000
Now another example from a language from long ago.

28
00:03:22,000 --> 00:03:36,000
The language from long ago, peel one is a interesting language it was designed by IBM and it stands for programming language.

29
00:03:36,000 --> 00:03:49,000
One. It was designed to be the programming language at least within IBM that would be used by everybody and it's supposed to encompass all the features that any programmer would ever need.

30
00:03:49,000 --> 00:04:05,000
And as such it was supposed to be very, very general and have very few restrictions. And so one of the features of peel one is that keywords are not reserved. So in peel one you can use a keyword both as a keyword and also as a variable.

31
00:04:05,000 --> 00:04:13,000
So you can use keywords and other roles other than keywords and that means you can write interesting, interesting sentences or interesting programs like this.

32
00:04:13,000 --> 00:04:34,000
And then we just read this out loud because it sounds interesting. If else then then equals else else else else equals then. And the correct organization here of course is that this is a keyword. This is a keyword. And this is a keyword. And the other things switch colors here are all variables.

33
00:04:34,000 --> 00:04:55,000
These are all variable names. And as you can imagine this makes a electrical analysis somewhat difficult because when we're just scanning left to right like when we're coming through here when we say we're at this point, you know, how do we decide whether these things are going to be variable names or keywords without seeing what's going on in the rest of the expression.

34
00:04:55,000 --> 00:05:19,000
So electrical analysis in peel one was quite challenging. So here's another example from peel one. Here we have a program fragment. We have the word declare. And then an open parent and a closed parent encompassing a bunch of arguments. So I point out the balanced brands here and then just a list of n things inside the parents.

35
00:05:19,000 --> 00:05:39,000
And it turns out that depending on the larger context in which this whole expression sits, this could be either a keyword or it could be an array reference. I mean, when it I mean declare here could either be a keyword or it could be the name of an array and these could be the indices to the array.

36
00:05:39,000 --> 00:06:02,000
And as it happens, there is no way looking at just this much that we can decide this fragment is valid is a valid declaration and it's also a valid array reference. So it would depend on what came next. It might depend on, for example, whether there was an equal sign here in which cases would be interpreted as an assignment and declare would be the name of an array.

37
00:06:02,000 --> 00:06:16,000
And the interesting thing about this example is that because the number of arguments in here is unbounded, there could be n of them for any n. This requires unbounded look ahead.

38
00:06:17,000 --> 00:06:31,000
OK, so to implement this properly as you're scanning left to right to decide whether declare again is a keyword or an array reference, we would have to scan beyond this entire argument list to see what came next.

39
00:06:33,000 --> 00:06:44,000
Fortran and PL1 were designed in the 1950s and 1960s respectively. And those experiences taught us a lot about what not to do in the electrical design of programming languages.

40
00:06:44,000 --> 00:06:51,000
So things are a lot better today, but the problems have not gone away completely and I'll use an example from C++ to illustrate this.

41
00:06:51,000 --> 00:07:00,000
So here is an example of C++ template syntax, which you may be familiar with or you may have seen the similar syntax in Java.

42
00:07:00,000 --> 00:07:11,000
And C++ has another operator called stream input. So this operator here reads from an input stream and stores the result in a variable.

43
00:07:12,000 --> 00:07:29,000
And the problem is here that there's a conflict with nested templates. So for example, if I have a template operation that looks like this, OK, notice what happens here.

44
00:07:30,000 --> 00:07:39,000
So my intention here is to have nested application of templates, but I wind up with two greater than signs together at the end. And this looks just like the stream operator.

45
00:07:39,000 --> 00:07:52,000
And the question is what should the electrical analyzer do? Should it interpret this as two closed brackets for templates or should it interpret it as a two greater than signs stuck together as a stream operator?

46
00:07:53,000 --> 00:07:59,000
And it turns out that for a very long time, I think most C++ compilers have now fixed this.

47
00:07:59,000 --> 00:08:07,000
The C++ compiler in this situation would regard this as a stream operator and you would get a syntax error. And what do you think the solution was?

48
00:08:07,000 --> 00:08:17,000
It turns out that the only fix that you could really do to make this electrically analyze the correct way was to insert a blank. So you would have to write this.

49
00:08:17,000 --> 00:08:31,000
And you would have to remember to put the blank in there so that the two greater than signs were not together. And now that's kind of ugly that we have to put in white space to fix the electrical analysis of the program.

50
00:08:31,000 --> 00:08:40,000
So to summarize, the goal of the electrical analysis is to partition the input stream into Lexiim.

51
00:08:40,000 --> 00:08:48,000
So we're going to drop down dividing lines in the string to decide where the Lexiim is lie. And we want to identify the token of each Lexiim.

52
00:08:48,000 --> 00:08:58,000
And because, exactly because we're doing a left or right scan, sometimes we have to have look ahead. Sometimes we have to peek ahead in the input stream to figure out what the current string we're looking at.

53
00:08:58,000 --> 00:09:03,000
And we're looking at the current substring we're looking at what role it plays in the language.

