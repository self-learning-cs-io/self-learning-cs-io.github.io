---
title: MIT6042J P77341GeneralizedCountingRulesVideo
---

1
00:00:00,000 --> 00:00:08,000
There are two generalizations of the bijection rule and the product rule that come up all the time and are a central,

2
00:00:08,000 --> 00:00:12,000
play an essential role in the repertoire of any counter. So let's look at those.

3
00:00:12,000 --> 00:00:19,000
The first of these is a generalization of the product rule and let's see an instance where it comes up.

4
00:00:19,000 --> 00:00:25,000
Suppose I wanted to count the number of lineups of five students in the class.

5
00:00:25,000 --> 00:00:32,000
So if I let S be the number of students and let's say for the afternoon session S is 91,

6
00:00:32,000 --> 00:00:38,000
then the number of lineups of five students, if I use the ordinary product rule, I would get...

7
00:00:38,000 --> 00:00:44,000
I'm talking about S to the fifth, that is, sequences of length five of elements of S.

8
00:00:44,000 --> 00:00:49,000
And so the product rule would say take 91 to the fifth as the number of lineups of five students.

9
00:00:49,000 --> 00:00:55,000
And now it would be correct if the same student could appear twice in line, but that of course is impossible with real students.

10
00:00:55,000 --> 00:01:04,000
So the lineups have no repeats and what we're really counting is the number of those sequences of length five of students with no repeats.

11
00:01:04,000 --> 00:01:09,000
And the generalize product rule tells you quite straightforwardly how to count those.

12
00:01:09,000 --> 00:01:14,000
Namely, there are 91 ways to choose the first student among the 91.

13
00:01:15,000 --> 00:01:21,000
And whichever first student you've chosen that leaves 90 other students that you could choose to be second.

14
00:01:21,000 --> 00:01:29,000
And once you've chosen the first two that leaves 89 students you could choose for the third and 88 for the fourth and 87 for the fifth.

15
00:01:29,000 --> 00:01:40,000
And the formula then is 91 times 90 times 89, 88, 87 for the number of sequences of distinct students of length five.

16
00:01:40,000 --> 00:01:50,000
Now, a nice way to express the 91 down to 87 in terms of factorials is it's 91 factorial, which is the product from 1 to 91,

17
00:01:50,000 --> 00:02:01,000
and divided by the product from 1 to 86, which cancels out the first 86 terms in 91 factorial, leaving you with exactly 87 through 91 product.

18
00:02:02,000 --> 00:02:14,000
So the second rule is a sort of obvious generalization of the bijectional, but I'm getting ahead of myself.

19
00:02:14,000 --> 00:02:17,000
Let's state the generalized product rule in general.

20
00:02:17,000 --> 00:02:22,000
So if we let Q be a set of length K sequences with the following property.

21
00:02:23,000 --> 00:02:28,000
There are n1 possible first elements among these length K sequences.

22
00:02:28,000 --> 00:02:41,000
And for every one of the first possible elements, if you look at the number of tuples with what the second possible coordinates are for a given first coordinate, it's always n2.

23
00:02:41,000 --> 00:02:51,000
And likewise, if you look at the number of possible third coordinates given the first two, it's n3 and it's uniform no matter what the first two are.

24
00:02:51,000 --> 00:03:07,000
Then if you have this kind of a set up, which is exactly what happens when you're picking one student after another and they can't repeat, you discover that the length K sequences with n1, first possible choices, n2, second possible choices, down through nK,

25
00:03:07,000 --> 00:03:11,000
nK, K's possible choices is n1 through nK.

26
00:03:11,000 --> 00:03:16,000
So that's the statement of the generalized product rule in the magenta box.

27
00:03:16,000 --> 00:03:21,000
Now we come to the generalized bijectural, which is called the division rule.

28
00:03:21,000 --> 00:03:29,000
A simple, memorable way to illustrate it is if you wanted to count the number of students in class, 6042, you could count the number of students' fingers and divide by 10.

29
00:03:29,000 --> 00:03:40,000
Now it's probably harder to count fingers than students, so this is not meant as a practical method, but it illustrates a basic and straightforward idea.

30
00:03:40,000 --> 00:03:49,000
Of course, it's implicitly assuming that we don't have any instances of amputations or polydactylism and that in fact every student has exactly 10 fingers.

31
00:03:49,000 --> 00:03:53,000
Okay, so in general the division rule can be stated this way.

32
00:03:53,000 --> 00:04:09,000
If I have a total function from a set A to a set B, called domain A, a domain A, code domain B, and this mapping is K to 1, then the cardinality of A is simply K times the cardinality of B.

33
00:04:09,000 --> 00:04:23,000
So K to 1 means that exactly K A elements hit each B element. The number way to say it is that there are exactly K arrows into every element of B.

34
00:04:23,000 --> 00:04:36,000
So then the number of arrows is simply K times B, and if you have a total function on A, the number of arrows is equal to the size of A, and that's where we get the formula.

35
00:04:36,000 --> 00:04:44,000
Okay, and that's the generalized botjects rule.

36
00:04:44,000 --> 00:04:50,000
Let's apply it in a crucial example that is absolutely basic and will be using repeatedly.

37
00:04:50,000 --> 00:04:57,000
Suppose that I want to know how many possible subsets of size 4 are there from the numbers 1 through 13.

38
00:04:57,000 --> 00:05:06,000
So I have 13 possible numbers that I can choose. I want to pick out any 4 of them, and I want to know how many ways are there to do that.

39
00:05:06,000 --> 00:05:14,000
And we'll do that by finding a mapping from things we know how to count to these particular subsets.

40
00:05:14,000 --> 00:05:33,000
So what we know how to count is if I let A be the set of all permutations of 1 through 13, then I know that the size of A is 13 factorial, because there's 13 choices for the first element of the permutation 12 for the second down to 1 for the 13th.

41
00:05:33,000 --> 00:05:52,000
And let's let B be this object that I want to count namely the set of size 4 subsets of 1 through 13, and I want to find a mapping from A that I know how to count to B that I don't yet know how to count, but in a way where I can figure out that it's K to 1 for a K that I can also count.

42
00:05:52,000 --> 00:05:54,000
How do I do that?

43
00:05:54,000 --> 00:06:03,000
Well, let's take an arbitrary permutation of A. That is to say a sequence of the elements of A in some order, call them A1A2 through A13.

44
00:06:03,000 --> 00:06:09,000
So these numbers A1 through A13 are this numbers 1 through 13 in some unknown order.

45
00:06:09,000 --> 00:06:22,000
And I'm going to map a permutation of A like this to its first 4 elements. Just take the first 4 elements of the permutation and map them to the set consisting of those 4 elements.

46
00:06:22,000 --> 00:06:31,000
This is a permutation, these elements are all different, so I really do get a set of 4 different things here A1, A2, A3, and A4 are supposed to be different.

47
00:06:31,000 --> 00:06:42,000
This gives me a very well-defined total function from a permutation of 13 numbers to a set of its first 4 elements.

48
00:06:42,000 --> 00:06:50,000
And now what we want to know is what kind of a mapping is this, and I'm going to argue that it's K to 1 for a K that's not very hard to count.

49
00:06:50,000 --> 00:07:01,000
So when I look at what other things map to the set A1, A2, A3, A4, we mapped a permutation to its first 4 elements.

50
00:07:01,000 --> 00:07:13,000
And if we got A1 through A4 as the set, what other things map to that set A1, A2, A3, A4? Well, the answer is any permutation with the same first 4 elements but possibly in a different order.

51
00:07:13,000 --> 00:07:23,000
Because we're just going to take the first 4 in sequence and map them to the set of those first 4, the order in which the first 4 doesn't matter.

52
00:07:23,000 --> 00:07:36,000
And likewise, the order of the remaining 9 elements, 5 through 13, also doesn't matter whatever they are if I have a given set of 4 elements to start.

53
00:07:36,000 --> 00:07:42,000
No matter what the remaining 9 are, they're going to map to the same subset of 4 elements.

54
00:07:42,000 --> 00:07:49,000
So there are 4 factorial possible ways that the first 4 elements can be permuted.

55
00:07:49,000 --> 00:07:54,000
And there are 9 factorial ways that the last 9 elements can be permuted.

56
00:07:54,000 --> 00:08:01,000
And every one of these goes to the same set of 4 elements, A1 through A4, and those are the only ones that go there.

57
00:08:02,000 --> 00:08:18,000
And so what we've figured out is that the mapping of these kind of sequences with the given 4 elements first in some order and the remaining 9 elements in some other order is 4 factorial times 9 factorial to 1.

58
00:08:18,000 --> 00:08:27,000
There are 4 factorial times 9 factorial permutations that map to any given set of 4 elements.

59
00:08:28,000 --> 00:08:46,000
And that means by applying the division rule, I've discovered that the size of A, which I know is 13 factorial, is equal to that K of the K to 1 of 4 factorial times 9 factorial times the size of B, B is the set of, as the subsets of size 4 that I'm trying to count.

60
00:08:46,000 --> 00:08:55,000
And so what I get is that the size of B is simply 13 factorial divided by that K for factorial, 9 factorial.

61
00:08:55,000 --> 00:09:09,000
13 factorial over 4 factorial, 9 factorial. And this number comes up so often that it has this special notation called binary a binomial coefficient notation, which we read as 13 choose 4.

62
00:09:10,000 --> 00:09:32,000
In general, if I have an an an element set and I'm going to choose a subset of M of them generalizing this argument because the the 4 and the 9 and the 13 were completely arbitrary and the argument works in general is that the number of ways to choose a set of M elements among N is M choose M.

63
00:09:33,000 --> 00:09:47,000
And the definition of N choose M is N factorial over the M factorial ways to permute the first M elements and the N minus M factorial ways to permute the remaining N minus M elements.

64
00:09:47,000 --> 00:10:03,000
And again, that notation, the binomial coefficient is called N over M is N choose M. And this is an absolutely fundamental formula that you need to remember because we will be using it constantly and repeatedly.

