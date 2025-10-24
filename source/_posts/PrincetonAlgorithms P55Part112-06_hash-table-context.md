---
title: PrincetonAlgorithms P55Part112 06_hash Table Context
---

1
00:00:00,000 --> 00:00:08,560
So let's just look at a little bit of the context of hashing and practical applications.

2
00:00:08,560 --> 00:00:10,880
As I mentioned, it's very widely used.

3
00:00:10,880 --> 00:00:13,919
So here's an example right from Java.

4
00:00:13,919 --> 00:00:22,140
The first implementation of Java 1.1, the designers found that the cost of computing the hash

5
00:00:22,140 --> 00:00:27,920
function for strings seemed to be excessive, particularly for long strings.

6
00:00:27,920 --> 00:00:34,380
And that was one of the main uses of hashing was just to be able to do searching with string

7
00:00:34,380 --> 00:00:35,480
keys.

8
00:00:35,480 --> 00:00:41,600
And so what they decided in the first implementation was let's just look at every 8th or 9th character.

9
00:00:41,600 --> 00:00:45,680
In that way, we don't have to spend a lot of time computing the hash function.

10
00:00:45,680 --> 00:00:50,480
So they had a hash function pretty much like the one that we use, except they'd compute

11
00:00:50,480 --> 00:00:55,320
a skip that would mean that they'd only look at about every 8th key and they wouldn't have

12
00:00:55,320 --> 00:00:59,399
to do quite so much work performing the hash function.

13
00:00:59,399 --> 00:01:04,599
And that's definitely one thing to consider when using hashing is that the cost of computing

14
00:01:04,599 --> 00:01:11,040
the hash function for a complicated key might exceed the cost of searching using a simpler

15
00:01:11,040 --> 00:01:14,120
structure like a binary search tree.

16
00:01:14,120 --> 00:01:22,659
And anyway, for Java 1.1, what happened was that there was a huge potential for really

17
00:01:22,659 --> 00:01:26,019
bad collision patterns on typical data.

18
00:01:26,019 --> 00:01:29,700
So here's an example of typical data, which is a URL.

19
00:01:29,700 --> 00:01:34,379
All of these keys, which are totally different, would wind up having the same collision.

20
00:01:34,379 --> 00:01:40,539
And so client programs and system programs in the Java system were having terrible performance

21
00:01:40,539 --> 00:01:45,140
on their symbol table because of this shortcut in hashing.

22
00:01:45,140 --> 00:01:52,659
So this well illustrates that you need to use all of the data in the hash function.

23
00:01:52,659 --> 00:01:57,980
And sometimes when you do a closer analysis, the cost of the computing the hash function

24
00:01:57,980 --> 00:02:04,099
can mean that something like red black trees will even outperform hashing even forages

25
00:02:04,099 --> 00:02:06,780
search and insert.

26
00:02:06,780 --> 00:02:15,099
So there's another thing about the uniform hashing assumption is that it is an assumption

27
00:02:15,099 --> 00:02:22,419
and if you're writing code where we have to have guaranteed performance like when your

28
00:02:22,419 --> 00:02:30,180
aircraft is landing or you're controlling a nuclear reactor or somebody's pacemaker,

29
00:02:30,180 --> 00:02:34,979
if that assumption doesn't hold and you get bad performance, you're going to have disastrous

30
00:02:34,979 --> 00:02:36,740
consequences.

31
00:02:36,740 --> 00:02:41,539
So that's another reason to think about maybe paying a little extra and using the guarantee

32
00:02:41,539 --> 00:02:47,819
that you get with red black search trees instead of hashing.

33
00:02:47,819 --> 00:02:52,739
And there's another surprising situation that happens in today's world.

34
00:02:52,739 --> 00:02:58,459
For example, Java publishes its hash functions.

35
00:02:58,459 --> 00:03:05,139
And so if you're trying to provide a service over the web, an adversary can learn your hash

36
00:03:05,139 --> 00:03:13,259
function and just send you data that causes a huge performance problem by just making

37
00:03:13,259 --> 00:03:17,699
all that data hash to one particular item.

38
00:03:17,699 --> 00:03:21,099
And that's definitely something to worry about.

39
00:03:21,099 --> 00:03:29,500
And in the real world, you can nowadays find on the web particular sequences of keys that

40
00:03:29,500 --> 00:03:33,859
will cause particular services to crash.

41
00:03:33,860 --> 00:03:39,180
And again, that's a little harder to do with something like a red black tree where we

42
00:03:39,180 --> 00:03:41,740
have performance guarantees.

43
00:03:41,740 --> 00:03:45,340
When you make an assumption, you better be sure and you're depending on that assumption,

44
00:03:45,340 --> 00:03:48,380
you better be sure that it holds somehow.

45
00:03:48,380 --> 00:03:54,060
And this is different than, for example, for a quicksort when our assumption was we're

46
00:03:54,060 --> 00:03:58,500
going to create randomness and we're going to depend on that randomness.

47
00:03:58,500 --> 00:04:04,860
In this case, we're kind of hoping for randomness and maybe that doesn't really always hold.

48
00:04:04,860 --> 00:04:10,460
So that's certainly something to be aware of when using hashing in practice.

49
00:04:10,460 --> 00:04:15,740
So here's just a simple example on hashing in Java.

50
00:04:15,740 --> 00:04:20,660
So what we can do is it's pretty easy to find a family of strings that have the same

51
00:04:20,660 --> 00:04:21,939
hash code.

52
00:04:21,939 --> 00:04:25,420
For example, with just a little fooling around or nowadays you can just look it up on the

53
00:04:25,420 --> 00:04:26,259
web.

54
00:04:26,259 --> 00:04:34,139
You can see that these two character keys both have the same hash code because it just

55
00:04:34,139 --> 00:04:38,779
do the math and that base 31 hash code will tell you that answer.

56
00:04:38,779 --> 00:04:44,860
Well what that means is that actually just like working in binary, you can combine those

57
00:04:44,860 --> 00:04:51,699
things in all possible ways and you can get two to the end strings for any end of length

58
00:04:51,699 --> 00:04:55,579
two end that all hash to the same value.

59
00:04:55,579 --> 00:05:05,939
Somebody's implemented a service in Java that uses a symbol table that takes string keys.

60
00:05:05,939 --> 00:05:09,180
You can cause that to crash in this way.

61
00:05:09,180 --> 00:05:12,099
A little bit scary for some systems designers.

62
00:05:12,099 --> 00:05:16,899
At least a reason for pause in using hashing.

63
00:05:16,899 --> 00:05:27,899
Now hashing also has an extremely important application in today's internet commerce.

64
00:05:27,899 --> 00:05:38,500
So it's the concept of so-called one-way hash functions which means that we use it for

65
00:05:38,500 --> 00:05:45,379
secure to try to have some secure fingerprints for use on the web.

66
00:05:45,379 --> 00:05:52,500
And there's been a lot of research done to develop functions that take keys as input

67
00:05:52,500 --> 00:05:59,459
and then produce values that look random in such a way that it's hard for someone else

68
00:05:59,459 --> 00:06:02,300
to find another key that collides with that.

69
00:06:02,300 --> 00:06:07,899
This technology is useful for storing passwords and digital fingerprints and things but it's

70
00:06:07,899 --> 00:06:12,300
too expensive for use in a symbol table.

71
00:06:12,300 --> 00:06:19,860
So the bottom line is separate chaining versus linear probing as collision resolution message

72
00:06:19,860 --> 00:06:20,860
methods.

73
00:06:20,860 --> 00:06:25,460
There's a number of considerations to take into account.

74
00:06:25,460 --> 00:06:29,819
Separation is really easy to implement both in certain delete.

75
00:06:29,819 --> 00:06:34,379
If performance degrades it does so gracefully.

76
00:06:34,379 --> 00:06:41,019
In the clustering is maybe less of a problem if you have a bad hash function.

77
00:06:41,019 --> 00:06:47,419
Your probing tends to make better use of space and also it will perform better for huge

78
00:06:47,419 --> 00:06:50,259
tables where it's caching is involved.

79
00:06:50,259 --> 00:06:57,299
And if in classic algorithm or computer science problems for people to think about is what

80
00:06:57,299 --> 00:07:01,859
do we do to delete in these two situations and exactly how do we resize.

81
00:07:01,859 --> 00:07:06,579
And those are all at the level of exercises in the context of the kinds of algorithms

82
00:07:06,579 --> 00:07:08,979
that we've seen.

83
00:07:08,980 --> 00:07:13,860
And as I mentioned there's been many, many improved versions of hashing that have been studied.

84
00:07:13,860 --> 00:07:19,100
I mentioned the two probe or double hashing version.

85
00:07:19,100 --> 00:07:23,740
Another way to use two hash functions is just to hash the two positions and put the key

86
00:07:23,740 --> 00:07:26,819
in the shorter of the two chains.

87
00:07:26,819 --> 00:07:31,620
In that case then the expected length of the longest chain will be log log n which is

88
00:07:31,620 --> 00:07:32,620
quite an improvement.

89
00:07:32,620 --> 00:07:38,140
You get constant time expected and log log n worst case.

90
00:07:38,139 --> 00:07:43,339
Double hashing is the variant of linear probing where you just skip a variable amount not

91
00:07:43,339 --> 00:07:47,579
one each time and that pretty much wipes out clustering.

92
00:07:47,579 --> 00:07:51,819
But it is more difficult to implement delete for that one.

93
00:07:51,819 --> 00:07:57,139
In a new method called relatively new method called cuckoo hashing is another variant of

94
00:07:57,139 --> 00:08:03,339
linear probing where we hash a key to two positions and insert the key in either one.

95
00:08:03,339 --> 00:08:09,060
If occupied you re insert the displaced key into its alternative.

96
00:08:09,060 --> 00:08:11,500
It was in one each one can go to two.

97
00:08:11,500 --> 00:08:16,699
And that one actually gives constant worst case time for search.

98
00:08:16,699 --> 00:08:18,899
That's another variation on the theme.

99
00:08:18,899 --> 00:08:23,659
And all of these things allow us to make better use of the memory, allow the table to become

100
00:08:23,659 --> 00:08:24,659
nearly full.

101
00:08:24,659 --> 00:08:31,019
It would have been very exciting to the researchers in the 1950s who cared so much about memory.

102
00:08:31,019 --> 00:08:35,460
Nowadays a little extra memory is not something that people care about so much and most people

103
00:08:35,460 --> 00:08:42,419
just go with the easy algorithm except for really performance critical applications.

104
00:08:42,419 --> 00:08:46,179
What about hash tables versus balanced search trees?

105
00:08:46,179 --> 00:08:54,579
Well hash tables are really simple to code usually if you don't have to do the hash function.

106
00:08:54,580 --> 00:09:01,300
And if you don't have order in the keys at all then you need the compared to to implement

107
00:09:01,300 --> 00:09:02,379
balanced search trees.

108
00:09:02,379 --> 00:09:06,100
So you have to use hashing if you don't have to compare.

109
00:09:06,100 --> 00:09:09,540
And it will probably be faster for simple keys to use hashing.

110
00:09:09,540 --> 00:09:14,700
It's a few arithmetic operations to do the hash versus log in compares for the balanced

111
00:09:14,700 --> 00:09:16,420
tree.

112
00:09:16,420 --> 00:09:21,700
And there's some better system support in Java for strings that cache hash code means

113
00:09:21,700 --> 00:09:27,259
that you don't even have to compete the hash if your symbol table for strings is in an

114
00:09:27,259 --> 00:09:28,259
interlude.

115
00:09:28,259 --> 00:09:33,379
On the other hand, balanced search trees have a much stronger performance guarantee.

116
00:09:33,379 --> 00:09:35,820
You don't have to assume anything.

117
00:09:35,820 --> 00:09:38,220
It's going to be less than log in compares.

118
00:09:38,220 --> 00:09:41,860
And it's got support for all those ordered ST operations.

119
00:09:41,860 --> 00:09:46,379
And compared to is a pretty easy and natural function to implement.

120
00:09:46,379 --> 00:09:50,300
So it's more flexible and more broadly useful.

121
00:09:50,299 --> 00:09:56,579
And actually the Java system and other systems include both so that programmers can take

122
00:09:56,579 --> 00:10:01,579
make use of either one in different situations.

123
00:10:01,579 --> 00:10:04,139
That's our context for hashing algorithms.

