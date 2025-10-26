---
title: MIT6042J P75331SumAndProductRulesVideo
---

1
00:00:00,000 --> 00:00:10,000
The topic of counting or combinatorics is an important one in a number of different disciplines and notably in computer science.

2
00:00:10,000 --> 00:00:29,000
So the origins of the combinatorics and counting are a little bit disreputable. They come out of historically out of people studying gambling and trying to calculate odds and the fraction of times that various events occur to know what kind of bets to make on the world.

3
00:00:29,000 --> 00:00:46,000
So a typical kind of question would be if you know how poker works, there are various classifications of five card hands in poker and you might ask what fraction of all possible five card poker hands translate into being a pair of jacks.

4
00:00:46,000 --> 00:01:04,000
And basically this fraction of total poker hands which fit into the category of pair of jacks is the probability of a pair of jacks. So counting and gambling is one fundamental place where it really comes up and historically that's where a lot of combinatorics begins.

5
00:01:04,000 --> 00:01:14,000
Related to that is counting in games when you're trying to write for example a computer programming, a computer program to play chess or checkers or so on.

6
00:01:14,000 --> 00:01:31,000
One of the aspects of it is getting a sense of how much searching you have to do in order to look ahead to find good moves and you wind up counting from a given chess position, how many possible further positions can you get to in a given number of moves.

7
00:01:31,000 --> 00:01:43,000
A puzzle kind of question in solving the Rubik's pro cube toy is how many different positions are there and how many different positions can you get to from a given position.

8
00:01:43,000 --> 00:01:57,000
Concretely in computer science it comes up in algorithms. It's often the case that a central question is how many operations does it take to do a manipulation on a data structure and to update it from one to another.

9
00:01:57,000 --> 00:02:12,000
For example how many comparisons does it take to sort in numerical items and there's a typically the count is in log in proved as a number of operations that are both achievable and lower bound.

10
00:02:12,000 --> 00:02:24,000
One that we've seen when we looked at fast exponentiation is a question like if you're trying to compute the the nth power of a number D how many multiplications does it take.

11
00:02:24,000 --> 00:02:40,000
It's roughly log in by using the iterated squaring method and we want to be able to count that number of multiplications that a particular program uses to compute D to the n and the largest and the smallest number of multiplications you can get away with.

12
00:02:40,000 --> 00:03:09,000
And a place where again we're counting and combinatorics becomes critical is in for security in the issue of cryptography. If you're going to have security from passwords there needs to be two largest space of passwords for an adversary to search through exhaustively and check them likewise for the if you're doing encryption with some kind of secret key that enables you to read messages you want to be sure that the space of possible keys is a little bit more important.

13
00:03:09,000 --> 00:03:16,000
So the possible keys is also way too large to search exhaustively to see what keys work.

14
00:03:16,000 --> 00:03:29,000
So let's talk briefly now about the very basic counting methods and two rules for accounting things the most rudimentary of them but in fact we get some mileage out of them.

15
00:03:29,000 --> 00:03:45,000
The first rule is called the sum rule and it's completely straightforward and obvious which is that if I have two sets a and b that do not overlap then the number of elements in a union b is simply the number of elements in a plus the number of elements in b.

16
00:03:45,000 --> 00:04:05,000
And there's no issue proving that it's self-evident but let's do an example. The supposed class has 43 women and 54 men. How many people are in it? 43 plus 54 equals 97. This is implicitly assuming that there's no one who's sex is ambiguous and that there's no third sex.

17
00:04:05,000 --> 00:04:12,000
So that men and women are disjoint the total number of students is the sum of the number of men and women.

18
00:04:12,000 --> 00:04:29,000
Another one is there are 26 lower case Roman letters and 26 upper case Roman letters and 10 digits and so there are 26 plus 26 plus 10 equals 62 characters in that repertoire of symbols.

19
00:04:29,000 --> 00:04:43,000
The second rule is called the product rule and it's just about as obvious. Suppose I have four boys and three girls. How many boy girl couples can I assemble out of four boys and three girls?

20
00:04:43,000 --> 00:04:58,000
And the answer is there are four ways to choose a boy followed by and for each of them there are three ways to choose a girl. So there's four times three or 12 possible boy girl couples in this setting.

21
00:04:58,000 --> 00:05:11,000
More generally if I have a set a of size m and a set b of size n then a cross b remember that's the set of ordered pairs where the first element is from a and the second element is from b.

22
00:05:11,000 --> 00:05:32,000
The size of a cross b is the vertical bars remember mean size is equal to m times n. So let's just do an example that illustrates it. Suppose that a is the set of four elements little a, b, c, and d and b is the set of three numbers, one, two, and three.

23
00:05:32,000 --> 00:05:47,000
Then I can list a cross b in a nice orderly way as a four by three matrix. But this is really meant to be just the list of elements but I'm organizing this way so the pattern is more apparent.

24
00:05:47,000 --> 00:06:11,000
And for each boy a or each element little a I can pair it with each of the three elements in b and for the second element little b in a I can pair it with this three digits in a and c I can pair with three and d I can pair with three and that's where the four times three comes from and more generally the m times n comes from.

25
00:06:12,000 --> 00:06:35,000
A useful immediate application of this is how many binary strings are there how many strings of zeros and ones are there of length four. Well, the string the length for binary strings it can be explained as as the product of b times b times b times b we're not writing parentheses here it's b times b cross b.

26
00:06:36,000 --> 00:06:47,000
So I'm thinking of a quadruple like this as being a pair consider whose first element is triple and a triple is a pair whose first element is a pair.

27
00:06:48,000 --> 00:07:04,000
And given that it doesn't really matter how you break it up we just typically write it as b cross b cross b and even abbreviate that as b to the fourth where b is zero one and the rule the product will says that the size of this is the size of b times

28
00:07:05,000 --> 00:07:24,000
the size of b times the size of b times the size of b or two to the fourth. So in general if I look at strings of length n whose elements are from an alphabet of size m the total number of such strings is m to the n.

