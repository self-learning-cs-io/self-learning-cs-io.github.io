---
title: CS143 P8Week203 01 B+Lexical+Analysis
---

1
00:00:00,000 --> 00:00:05,000
To summarize, electrical analysis implementation has to do two things.

2
00:00:05,000 --> 00:00:11,000
The first job is to recognize the substrings in the input that correspond to tokens.

3
00:00:11,000 --> 00:00:16,000
And here's a little bit of compiler lingo. These substrings are called the Lex seams.

4
00:00:16,000 --> 00:00:20,000
So the words of the program are called the Lex seams.

5
00:00:20,000 --> 00:00:25,000
And then the second job is that for each Lex seam we have to identify its token class.

6
00:00:25,000 --> 00:00:35,000
And then the output of the Lexical analyzer is a series of pairs, which are the token class and Lex seam.

7
00:00:35,000 --> 00:00:42,000
And this whole thing, one of these pairs is called a token.

