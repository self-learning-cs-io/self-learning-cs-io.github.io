---
title: PrincetonAlgorithms P59Part113 05_symbol Table Applications Sparse Vectors Optional
---

1
00:00:00,000 --> 00:00:05,299
As a final example of a cymbal table client, we'll take a look at a mathematical

2
00:00:05,299 --> 00:00:11,500
application where we want to implement sparse vectors and matrices. So this is

3
00:00:11,500 --> 00:00:19,660
standard matrix vector multiplication that you learn in math where we have a

4
00:00:19,660 --> 00:00:27,980
square matrix and a column vector and we want to do a dot product of first

5
00:00:27,980 --> 00:00:35,060
row with the column vector to get the first entry in the result. So in this

6
00:00:35,060 --> 00:00:41,340
case they're all 0 except for 0.04 times 0.9 which is 0.36 and then similarly

7
00:00:41,340 --> 00:00:49,100
dot product of this with that column is 0.297 and so forth. So standard

8
00:00:49,100 --> 00:00:56,260
implementation of this is quite easy. We have a two-dimensional matrix, one

9
00:00:56,259 --> 00:01:04,179
dimensional column vector for the multiple can in the result and then they

10
00:01:04,179 --> 00:01:09,980
get initialized in some way but the main computation is a pair of nested

11
00:01:09,980 --> 00:01:16,299
foreleabs. For each row in the matrix we have to go through each entry in the

12
00:01:16,299 --> 00:01:22,140
column vector and compute a running sum of for that row in the matrix that

13
00:01:22,140 --> 00:01:25,700
corresponding entry with the entry in the column and out and keep the running

14
00:01:25,700 --> 00:01:31,820
sum and then that's the result that we put in the result column vector for

15
00:01:31,820 --> 00:01:37,100
every value of i and the key thing about this standard implementation that it's

16
00:01:37,100 --> 00:01:43,060
two nested foreleabs that each run up to n so that's n squared or quadratic

17
00:01:43,060 --> 00:01:50,420
running time and that's fine in typical applications when the matrix is small

18
00:01:50,420 --> 00:01:55,379
or when there's lots of entries in the matrix but the fact is that in many

19
00:01:55,379 --> 00:02:00,019
practical applications matrices are what's called sparse. Most of the entries

20
00:02:00,019 --> 00:02:04,780
are zero and so symbol tables provide us with a way to provide a more efficient

21
00:02:04,780 --> 00:02:12,780
implementation of this process when we have lots of zero entries. So in a

22
00:02:12,780 --> 00:02:17,419
typical thing say maybe the matrix dimension would be 10,000 and maybe that

23
00:02:17,419 --> 00:02:22,819
only be 10 non-zero entries per row or even nowadays you might have matrices

24
00:02:22,819 --> 00:02:30,219
that are even bigger. 10,000 by 10,000 if it was full that it'd be a

25
00:02:30,219 --> 00:02:37,539
billion, a hundred million entries and so that's definitely going to be

26
00:02:37,539 --> 00:02:43,419
costly if you're doing this operation a lot and the idea is to cut down in that

27
00:02:43,419 --> 00:02:50,340
cost by taking advantage of the idea that there's a lot of zeros. So let's

28
00:02:50,340 --> 00:02:56,980
start by just looking at vectors. So the standard representation that we use

29
00:02:56,980 --> 00:03:01,819
for vector is to simply use a one-dimensional array. We have constant time

30
00:03:01,819 --> 00:03:07,259
access to every element but the space is proportional to n. So even if

31
00:03:07,259 --> 00:03:14,620
there's a lot of zeros we still have to take the space to store them all. Instead

32
00:03:14,620 --> 00:03:20,060
we're going to use a symbol table representation where our key is the index and

33
00:03:20,060 --> 00:03:26,500
the value is the entry and we just use that for every non-zero entry in the

34
00:03:26,500 --> 00:03:33,420
vector. So this has got the same amount of information. It says that index 1 has

35
00:03:33,420 --> 00:03:42,219
got 0.36, index 5 also has 0.36, index 14 has 0.18 and so forth but the space is

36
00:03:42,219 --> 00:03:46,659
proportional instead of to n it's just proportional to the number of non-zero

37
00:03:46,659 --> 00:03:52,699
entries which again in typical applications may be way, way less. And so now

38
00:03:52,699 --> 00:03:57,139
just we know we have a symbol table implementation that has a

39
00:03:57,139 --> 00:04:02,340
efficient iterator and also access is not bad. It's just that we're able to do

40
00:04:02,340 --> 00:04:08,180
it with a way less space. So here's what the implementation of a sparse vector

41
00:04:08,180 --> 00:04:14,180
might look like. So first thing is the representation is going to be a symbol

42
00:04:14,180 --> 00:04:19,180
table and in this case we might as well use a hash table because the order in

43
00:04:19,180 --> 00:04:27,340
which we process things is not important. We just want to get at all the non-zero

44
00:04:27,340 --> 00:04:38,420
entries. So the constructor is going to create in this symbol table just a new

45
00:04:38,420 --> 00:04:44,860
symbol table that associates integer indices with double values. So the put which

46
00:04:44,860 --> 00:04:51,100
is to store a value associated with an index i is just put into that hash table

47
00:04:51,100 --> 00:04:58,860
associate key i with value x associated integer with a double and get while

48
00:04:58,860 --> 00:05:06,020
return 0 if the index key is not in the symbol table we didn't have the whole

49
00:05:06,019 --> 00:05:12,579
point was we don't represent zeros otherwise it returns the value associated

50
00:05:12,579 --> 00:05:19,740
with the index. And the interval just returns all the key to iterate and the

51
00:05:19,740 --> 00:05:25,939
most important thing is that if we want to do a dot product with a vector say

52
00:05:25,939 --> 00:05:31,579
then the time that it takes is only proportional to the number of non-zero

53
00:05:31,579 --> 00:05:36,740
keys. The zero keys are going to be zero in the dot product so all we want to do

54
00:05:36,740 --> 00:05:43,219
is take the i-th entry of the vector and multiply it by whatever value we get for

55
00:05:43,219 --> 00:05:48,899
the non-zero entries. So it's a dot product that takes time proportional to the

56
00:05:48,899 --> 00:05:56,060
number of non-zero entries in the vector and that's going to be important in

57
00:05:56,060 --> 00:06:01,180
the use of a matrix. So instead of using the standard matrix representation

58
00:06:01,180 --> 00:06:05,980
where every row of a matrix is an array that's what a two-dimensional array is

59
00:06:05,980 --> 00:06:11,459
and the space is proportional to n squared. Now we're going to use a sparse

60
00:06:11,459 --> 00:06:17,340
matrix representation where each row of the matrix is a sparse vector. We can

61
00:06:17,340 --> 00:06:21,779
iterate through the elements in constant time and with the hash table even get

62
00:06:21,779 --> 00:06:27,659
at them in near constant time and then constant time in the average but the

63
00:06:27,659 --> 00:06:34,859
space is only proportional to the number of non-zero elements plus in for the

64
00:06:34,859 --> 00:06:41,139
extra symbol table overhead. So those are independent symbol table objects but

65
00:06:41,139 --> 00:06:47,099
they allow us to have a much more efficient matrix multiplication method. So now

66
00:06:47,100 --> 00:06:53,780
if we have a sparse matrix times a vector a running time is going to be

67
00:06:53,780 --> 00:06:58,700
constant for each row or proportional to the number of non-zero entries for each

68
00:06:58,700 --> 00:07:05,140
row which means that the running time is going to be linear for a sparse

69
00:07:05,140 --> 00:07:10,180
matrix just by the use of a symbol table and this clearly can make the

70
00:07:10,180 --> 00:07:14,939
difference between being able to address a huge problem if we have a 10,000 by

71
00:07:14,939 --> 00:07:24,060
10,000 matrix we can get it done nearly instantly linear time versus 10,000

72
00:07:24,060 --> 00:07:28,300
squared. If we don't run out of space we might run out of time but with the

73
00:07:28,300 --> 00:07:36,379
symbol table implementation we can efficiently process huge sparse matrices.

