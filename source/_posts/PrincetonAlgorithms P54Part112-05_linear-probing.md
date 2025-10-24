---
title: PrincetonAlgorithms P54Part112 05_linear Probing
---

1
00:00:00,000 --> 00:00:08,000
Another popular collision resolution method is known as linear probing.

2
00:00:08,000 --> 00:00:13,000
There's many different versions of hashing that are based on this idea.

3
00:00:13,000 --> 00:00:17,000
With linear probing, it's called open addressing.

4
00:00:17,000 --> 00:00:22,000
It's also around the same time in the 50s.

5
00:00:22,000 --> 00:00:29,000
The idea is to just use an array instead of using space for the length in a linked list.

6
00:00:29,000 --> 00:00:33,000
Use that same space and just allocate an array.

7
00:00:33,000 --> 00:00:40,000
In this case, the size of the array is going to have to be bigger than the number of keys that we expect.

8
00:00:40,000 --> 00:00:53,000
We use empty slots in the array to essentially terminate the length of the list that we have to search through when we're doing a insertion.

9
00:00:53,000 --> 00:00:56,000
Let's look at a demo of how it looks.

10
00:00:56,000 --> 00:00:59,000
To hash again, we do the same thing.

11
00:00:59,000 --> 00:01:02,000
We just map the key to an index.

12
00:01:02,000 --> 00:01:07,000
In linear probing, to its cert, what we do is we put it in position i.

13
00:01:07,000 --> 00:01:16,000
If that's free, if not, we just look at i plus one and i plus two and wrap around to the beginning if we reach the end.

14
00:01:16,000 --> 00:01:19,000
That's also very simple to implement.

15
00:01:19,000 --> 00:01:24,000
It works well as long as the size of the array is significantly bigger than the number of keys.

16
00:01:24,000 --> 00:01:28,000
Let's look at an demo.

17
00:01:28,000 --> 00:01:31,000
Start with an empty table and insert s.

18
00:01:31,000 --> 00:01:34,000
It's hash value is six. Six is empty.

19
00:01:34,000 --> 00:01:35,000
We put it there.

20
00:01:35,000 --> 00:01:39,000
Now we look at e. Hash of e is ten.

21
00:01:39,000 --> 00:01:42,000
We look at ten. It's empty. We put e there.

22
00:01:42,000 --> 00:01:45,000
At the beginning, we're going to be fine.

23
00:01:45,000 --> 00:01:49,000
A is four. Empty. Put it there.

24
00:01:49,000 --> 00:01:54,000
R is fourteen. Empty. Put it there.

25
00:01:54,000 --> 00:02:00,000
We're just essentially using the hash function as an array index.

26
00:02:00,000 --> 00:02:05,000
C is five. That's empty. And we put it there.

27
00:02:05,000 --> 00:02:09,000
H now. The hash value of h is four.

28
00:02:09,000 --> 00:02:12,000
Now we look at four and that's occupied.

29
00:02:12,000 --> 00:02:14,000
We can't put the h there.

30
00:02:14,000 --> 00:02:17,000
Then linear probing says just look at the next position.

31
00:02:17,000 --> 00:02:21,000
Look at five. That's still not empty.

32
00:02:21,000 --> 00:02:26,000
We look at six. We keep going until we find an empty place and then we put h there.

33
00:02:26,000 --> 00:02:29,000
When we search, we're going to have to do the same thing.

34
00:02:29,000 --> 00:02:33,000
We're going to have to look at all those positions to look at h.

35
00:02:33,000 --> 00:02:40,000
A group of four key contiguous keys in a table space there is called a cluster.

36
00:02:40,000 --> 00:02:44,000
Clearly we want to keep those clusters small.

37
00:02:44,000 --> 00:02:48,000
We do that by just not putting too many keys into the table.

38
00:02:48,000 --> 00:02:54,000
So x hashes to fifteen. That's empty. So we put it there.

39
00:02:54,000 --> 00:03:00,000
Em hashes to one. That's empty. And we put it there.

40
00:03:00,000 --> 00:03:03,000
P hashes to fourteen.

41
00:03:03,000 --> 00:03:06,000
Fourteen occupied.

42
00:03:06,000 --> 00:03:08,000
Fifteen is also occupied.

43
00:03:08,000 --> 00:03:11,000
Now we run off the end of the table and look at zero.

44
00:03:11,000 --> 00:03:15,000
And that's empty. So we put it there.

45
00:03:15,000 --> 00:03:19,000
L hashes to six. Six is occupied.

46
00:03:19,000 --> 00:03:26,000
We look at seven. Seven is occupied. We look at eight. And we put it there.

47
00:03:26,000 --> 00:03:32,000
And so that's an example of inserting keys into a hash table.

48
00:03:32,000 --> 00:03:35,000
And now for search we just do the same thing.

49
00:03:35,000 --> 00:03:40,000
We use the hash function to search for e.

50
00:03:40,000 --> 00:03:44,000
E's hash value is ten. So we look in ten and there it is.

51
00:03:44,000 --> 00:03:47,000
So that's a search it.

52
00:03:47,000 --> 00:03:52,000
If we're going to search for say L, L's hash value is six.

53
00:03:52,000 --> 00:03:55,000
So it's not there.

54
00:03:55,000 --> 00:04:00,000
So in order to look at every place in the table where L could be,

55
00:04:00,000 --> 00:04:06,000
we have to keep looking until we find an empty table position or we find L itself.

56
00:04:06,000 --> 00:04:10,000
So now we look at seven. L's not there. We look at eight. L is there.

57
00:04:10,000 --> 00:04:13,000
That's a search it.

58
00:04:13,000 --> 00:04:19,000
If we have a value that's not in the table like K, well, we'll hash.

59
00:04:19,000 --> 00:04:27,000
And is it in position five? No. Six, no. Seven, no. Eight, no.

60
00:04:27,000 --> 00:04:32,000
And we find an empty position. At that point we can conclude that K is not in the table.

61
00:04:32,000 --> 00:04:37,000
Because if K were in the table, it would be somewhere between its hash point five

62
00:04:37,000 --> 00:04:42,000
and that empty position nine. That's a search missing and we return null.

63
00:04:42,000 --> 00:04:47,000
So that's a short demo of linear probing hashing.

64
00:04:47,000 --> 00:04:52,000
So here's a summary of linear probing hashing.

65
00:04:52,000 --> 00:05:02,000
To get started, we map a key to an integer between zero and m minus one where m is the size of our array where we're storing the keys.

66
00:05:02,000 --> 00:05:11,000
To insert, we put the key value pair, use parallel arrays, the key and one array and a value and array with the same index.

67
00:05:11,000 --> 00:05:20,000
And we put the entry at table index a if it's free. If not, you try i plus one i plus two until getting to an empty position.

68
00:05:20,000 --> 00:05:31,000
And for search, you do the same thing. You hash to the table position and you look there and to the right to find the key and you stop when you find an empty table position.

69
00:05:31,000 --> 00:05:34,000
Find the key or find an empty table position.

70
00:05:34,000 --> 00:05:51,000
Now, it's essential that the array size is greater than the number of key value pairs and for linear probing hashing really the implementation needs to include arrays resizing whenever the hash table gets too full.

71
00:05:51,000 --> 00:05:59,000
Usually as we'll see, it's a good idea to make sure that it stays at least half empty.

72
00:05:59,000 --> 00:06:08,000
Here's the implementation and it's quite straightforward given the demo that we talked about. Use the same hash function.

73
00:06:08,000 --> 00:06:18,000
We use parallel arrays for the value and the keys and we have to use ugly cast because we can have a raise of generics.

74
00:06:18,000 --> 00:06:30,000
Then let's do the search. So we just have a for loop, starring at hash of key and going until we get to a position that's null.

75
00:06:30,000 --> 00:06:37,000
As long as it's not null, we stay in the loop and increment i mod m. So that's when I gets to the end.

76
00:06:37,000 --> 00:06:49,000
I said position m minus one, then it goes next increment goes back to zero to the left end of the table and we just test for all the non null keys.

77
00:06:49,000 --> 00:06:58,000
If it's equal and if it is, go ahead and return the associated value. And if you get to an empty position, then I return null.

78
00:06:58,000 --> 00:07:11,000
And the implementation of put is similar. Find a position if it's that's equal and then reset the key and the value.

79
00:07:11,000 --> 00:07:17,000
If the key is there, it just resets the value. If he's not there, it puts a new entry in.

80
00:07:17,000 --> 00:07:30,000
So again, that's a fairly little code to implement a fast symbol table and insert search and insert. But it's only going to be fast if the table size is set appropriately.

81
00:07:30,000 --> 00:07:42,000
In ancient times, memory was at quite a premium and so people were very concerned in making sure that the hash table never got too empty.

82
00:07:42,000 --> 00:07:50,000
Remember in the first computers, each bit was a physical thing, a magnetic core that somebody had to string a wire through.

83
00:07:50,000 --> 00:08:05,000
So the bits were really expensive and people wanted to make sure that they were making best use in the memory. And just leaving empty positions around in a hash table or using links in a link list did not seem like an appropriate use of space.

84
00:08:05,000 --> 00:08:18,000
So there was quite a bit of effort devoted to figuring it out how full we could get the hash table in linear probing and how close it could get to being full without sacrificing performance.

85
00:08:18,000 --> 00:08:28,000
And one way to think about what goes on is to just watch what happens when a hash table fills up.

86
00:08:28,000 --> 00:08:46,000
So here we're just as it goes up, we're showing each key getting inserted and the number of probes of the table that are needed for the insertion. So J has to the same position at A and it had to look for a while.

87
00:08:46,000 --> 00:08:56,000
And one thing to notice as the table gets full is that first of all you have these clusters of these chains building.

88
00:08:56,000 --> 00:09:15,000
So what's clear about that is that it means that the new hash is likely to hash into a big cluster. And not only that, once you have a big cluster and you hash into the middle of it, you've got a good chance that that cluster is going to get longer or worse that it's even going to merge.

89
00:09:15,000 --> 00:09:28,000
And so that's the situation as the table fills up. You get long clusters and they're likely to get longer in the math bears that out.

90
00:09:28,000 --> 00:09:41,000
Now this was studied in detail by Knuth in the 1960s and actually this problem Knuth says was really the origin of analysis of algorithms.

91
00:09:41,000 --> 00:09:53,000
Mathematicians were trying hard to understand this problem and were ready to give up and he realized that you could use classical balls and bins type probabilistic analysis.

92
00:09:53,000 --> 00:10:10,000
Not an easy analysis, but we actually could make and precise accurate statements about the performance of this algorithm. And those statements could be born out in practice because the hash functions approximate random, the math assumes random.

93
00:10:10,000 --> 00:10:23,000
And the formulas predict what actually happened in practice. The way Knuth formulated the problem is a so called parking problem. So what happens here to one way street and you're looking for a parking place.

94
00:10:23,000 --> 00:10:36,000
And it's the ideas you start looking for parking place at a particular time say, okay, now we need a parking place. And what you're doing is linear probing hashing.

95
00:10:36,000 --> 00:10:52,000
If the current space is taken, you try the next space and the one after and so forth. And the question is, if every car starts looking for a place at a random time that models the hash function, then how far do they have to go?

96
00:10:52,000 --> 00:11:14,000
Look for a place. That's Knuth's parking problem. And he was able to show and we'll talk just a little bit about this that if there's only half of the parking spaces are occupied, then on average, half the people find it after one place and the other half have to look one extra.

97
00:11:14,000 --> 00:11:31,000
So that's the kind of performance that we want. But as it gets full, the displacement gets up to square root of pi m over 8, which is obviously much higher than we want. We don't want our searches to take that long.

98
00:11:31,000 --> 00:11:43,000
And that actually the analysis is an amazing function that goes back to the famous Ramanujan and other classical results from a common tutorial analysis.

99
00:11:43,000 --> 00:12:04,000
What Knuth's theorem says is that under the uniform hashing assumption, the number of probes in the linear hash table of size m that is alpha percent full. So the number of keys is a fraction of m is for a search miss half one plus one over alpha.

100
00:12:04,000 --> 00:12:21,000
One minus alpha squared one minus alpha for the hit one minus alpha squared for the insert. Now as alpha gets close to one, you can see these things are going to grow. And particularly the search miss is going to grow quite a bit.

101
00:12:21,000 --> 00:12:48,000
If it's nine tenths full one over one minus alpha squared is one over a hundred. So it means it's going to be 50 probes for a search miss if it's nine tenths full. And that's independent of n and m. Whereas if it's half full, then we get the nice numbers of only three halves for a hit and only five halves for a miss.

102
00:12:48,000 --> 00:13:08,000
And again, these formulas are a nice approximate formulas. But Knuth once he figured this out in 1963 tells the story is at that time he decided to write his famous series of books on algorithms.

103
00:13:08,000 --> 00:13:19,000
And now there's four volumes out and more planned. And this is where all computer scientists go for detailed information on the performance of algorithms.

104
00:13:19,000 --> 00:13:36,000
So in summary, you can't have m to large. What we want to use is in nowadays is array resizing to make sure that the array is always about half time half full.

105
00:13:36,000 --> 00:13:47,000
And if we can keep the array about half full, then we get constant time performance for search hit and search miss and linear probing is very attractive in this case.

106
00:13:47,000 --> 00:14:05,000
There's other things that we can do algorithmically to bring down the search time a little bit like using another hash function rather than looking at the next entry use another hash function to determine the stride that we're going to use. And that brings it down somewhat and allows us to keep the tables more full.

107
00:14:05,000 --> 00:14:25,000
But the bottom line is that now we have two methods that under the uniform hashing assumption can give us constant time search search hit insert and delete for symbol table implementations where we don't need ordering and we've got a reasonable hash function.

108
00:14:25,000 --> 00:14:32,000
So that's a summary of linear probing our second hash collision avoidance strategy.

