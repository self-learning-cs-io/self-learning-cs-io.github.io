---
title: PrincetonAlgorithms P94Part27 07_suffix Arrays
---

1
00:00:00,000 --> 00:00:08,000
Finally, we're going to look at suffix arrays and string processing using this data structure

2
00:00:08,000 --> 00:00:15,000
that has really played a very important role in string processing applications that would

3
00:00:15,000 --> 00:00:21,699
not otherwise be possible. To get a feeling for the idea, we're going to look at a really

4
00:00:21,699 --> 00:00:28,080
old idea that you're actually familiar with called keyword and context search. And the idea

5
00:00:28,079 --> 00:00:35,079
is that you're given a text, a huge text. And what you want to do is pre-process it to

6
00:00:35,079 --> 00:00:41,560
enable a fast substring search. That is, you want a client to be able to give a query

7
00:00:41,560 --> 00:00:50,679
string. And then you want to give all occurrences of that query string in context. So if you look

8
00:00:50,679 --> 00:00:56,519
for the word search, it'll give all the occurrences of where the word search occurs in context.

9
00:00:56,520 --> 00:01:05,520
And that's a very common operation of one. You're certainly familiar with it from web searching

10
00:01:05,520 --> 00:01:12,520
in your browser. And there's many other applications. This is a pretty old idea that dates back to

11
00:01:12,520 --> 00:01:21,520
the late 50s, early 60s. People have always wanted to do this. And there's an easy way to look at it

12
00:01:21,519 --> 00:01:30,519
called suffix sorting. The idea is you take your input string and then form the suffixes.

13
00:01:30,519 --> 00:01:36,519
Remember what I talked about at the beginning with Java's string data type. You can get this

14
00:01:36,519 --> 00:01:43,519
done in linear time because each suffix is basically a pointer back into the input string.

15
00:01:43,519 --> 00:01:52,519
So the suffix, remember, the I suffix, just start a character I and take the rest of the string.

16
00:01:52,519 --> 00:02:04,519
So what this does is it gives sort keys that contain kind of the pieces of the string itself in context.

17
00:02:04,519 --> 00:02:12,519
And all we do is just run a sort on that suffix. And what that sort does is it brings, if you do a search,

18
00:02:12,520 --> 00:02:21,520
it brings the things that you're searching for close together. And once you've done that suffix sort,

19
00:02:21,520 --> 00:02:33,520
you can use the binary search to find all occurrences of the string that are there. That's the basic idea of a keyword in context searching.

20
00:02:33,520 --> 00:02:44,520
You suffix sort the text, then do binary search to find the query that you're looking for. And then you can scan for the binary search and up.

21
00:02:44,520 --> 00:02:57,520
And so this is all the places where other word search occurs in the text of tale of two cities. And then you can use this index to print out the context whatever's needed.

22
00:02:57,520 --> 00:03:06,520
It's a fine and effective way for solving this important practical problem.

23
00:03:06,520 --> 00:03:15,520
And that's interesting, but I want to talk about another really important problem that has had hugely important applications.

24
00:03:15,520 --> 00:03:23,520
And this is the longest repeated substring problem. So you're given a string of characters, find the longest repeated substring.

25
00:03:23,520 --> 00:03:33,520
In this case, this is genomic data. And there's the example of the longest repeated substring.

26
00:03:33,520 --> 00:03:43,520
And now in scientific data, the long repeated substring is often something that scientists are looking for.

27
00:03:43,520 --> 00:04:01,520
And so these strings are huge. It might be billions of these characters. So it's really important not only to know that you can find long substrings efficiently, but also that you can do it for huge, huge strings.

28
00:04:01,520 --> 00:04:16,519
Another example is crypt analysis where a long repeat in a file that's supposed to be encrypted random file indicates that somebody did something wrong and might be the key to breaking the code.

29
00:04:16,519 --> 00:04:29,519
Another example is data compression. When you've got a file that's got a lot of repeated stuff in it, you might want to do this operation to take advantage of these long repeats.

30
00:04:29,519 --> 00:04:50,519
And that keep multiple copies of them. Here's another example. This is for studying or visualizing repetitions in music. In this example, every time there's a repeat of the notes, then there's an art drawn to visualize the repeat.

31
00:04:50,519 --> 00:05:04,519
And it's the darkest thick if the number of repeats is long and it's high if the repeats are far away. In this tells is an interesting way to analyze that repetitions in music.

32
00:05:04,519 --> 00:05:12,519
So how are we going to solve this problem? It's very simple to state problem. Given the sequence of end characters, find the longest repeated substring.

33
00:05:12,519 --> 00:05:25,519
As with many problems, there's an easy brute force algorithm that at least gives us an idea of what the computation is like, but it's not going to be useful for huge strings.

34
00:05:25,519 --> 00:05:36,519
And that's you try all possibilities, all pairs of indices, i and j, and then just compute the longest common prefix for each pair.

35
00:05:36,519 --> 00:05:53,519
The problem with that is that if n is the length of the string, you've got n squared over two pairs. And for every one of those pairs, you might have to match them up to length d.

36
00:05:53,519 --> 00:06:06,519
It's definitely quadratic time, more than quadratic time in the length of the string. And can't be using that for, you know, not going to be able to use that for strings that are billions of characters long.

37
00:06:06,519 --> 00:06:17,519
Another way to look at one way to solve the longest repeated substring is to use a suffix sort. In fact, just what we talked about before.

38
00:06:17,519 --> 00:06:28,519
So we take our input string, reform the suffixes, and then sort the suffixes, and that brings the long repeated substrings together.

39
00:06:28,519 --> 00:06:40,519
So that's a quite elegant and efficient solution to this problem. Just build the suffix array. That's a linear time process. Do the sort.

40
00:06:40,519 --> 00:06:53,519
We just saw we can do that with n log n character compare, and then go through and find repeated substrings.

41
00:06:53,519 --> 00:07:03,519
So it's just one pass through to check for JSON substrings to see which one is the longest.

42
00:07:03,519 --> 00:07:23,519
And this is very easy to code up. Here's the Java code for computing the longest repeated substring. We get the length of our string out. We build our suffix array. Remember, that's linear time and space because of Java string implementation allows us to do substring at constant time.

43
00:07:23,519 --> 00:07:37,519
Then we go ahead and sort the suffixes and then find the least common prefix between the JSON suffixes and sorted order. Just keep track of the max.

44
00:07:37,519 --> 00:07:55,519
So that's the longest repeated substring. And so for example, this sentence about such a funny, sporty game, you just did jockey, hooky, hooky lad is the longest repeated substring in the text of Melville's Moby Dick.

45
00:07:55,519 --> 00:08:06,519
And we run that one to prove that we've got a linear arithmetic algorithm because there's a lot of characters in that and you're not going to find this without a good algorithm.

46
00:08:06,519 --> 00:08:27,519
And this is just a humorous approach to what we've talked about today. If you have five scientists that are looking for long substring in a genome, they might encounter this problem with a billion nucleotides.

47
00:08:27,519 --> 00:08:43,519
And there are plenty of scientists that are not aware of important algorithms, like the ones we're talking about. And the one that uses the good algorithm is definitely more likely to find a cure for cancer.

48
00:08:43,519 --> 00:09:00,519
There is a flaw even in this that computer scientists discovered as they got into every more complex algorithms for problems like this. And that is if the longest repeated substring is long, there's a problem.

49
00:09:00,519 --> 00:09:17,519
So this is just some experiments for finding the longest repeated substring in various files from just a program to the text of Moby Dick or a chromosome with 7.1 million characters.

50
00:09:17,519 --> 00:09:36,519
And using the brute force method, you get stuck in too slow, very soon. But using a suffix sort, you can get these jobs done even for huge files like the first 10 million digits of pi.

51
00:09:36,519 --> 00:09:50,519
By the way, if there was a really long repeated substring in the first, in the digits of pi, that would be news. Maybe it would help us understand more about this number.

52
00:09:50,519 --> 00:10:03,519
So lots of people write programs of this sort. But the big problem is if you have a really long repeated substring, then suffix sort's not going to work.

53
00:10:03,519 --> 00:10:15,519
Our fast algorithm doesn't complete. So what's going on? In the explanation is really simple.

54
00:10:15,519 --> 00:10:31,519
For example, you have two copies of something. When you form the suffix array, what happens is if you have the longest repeat, but you also have every version of that repeat appears.

55
00:10:31,519 --> 00:10:53,519
So if you have to look for those when checking for the longest repeated substring, so if D is the length of the longest match, then just to check for the longest common prefix, you got to do at least one plus two plus three plus four up to D character compares, which means it's going to be quadratic.

56
00:10:53,519 --> 00:11:05,519
So if you have a long repeated substring, then just to check for checking for the longest common prefix of adjacent elements in this algorithm, it's also a problem for the sort.

57
00:11:05,519 --> 00:11:22,519
So if you have very long repeats, we still don't have an algorithm. So the question is that was confronting computer scientists in the late 80s, early 90s is how can we get this done? What's the best algorithm for this problem?

58
00:11:22,519 --> 00:11:40,519
And there was a great algorithm called the Mambra Myers algorithm. I'll talk about in just a minute that got the job done in linear rhythmic time. And actually there's a clever old algorithm that uses a data structure called suffix trees.

59
00:11:40,519 --> 00:11:59,519
But it was really the Mambra Myers algorithm that got people excited about this area. And so I want to describe that briefly. Actually, these two computer scientists, one of them went on to become chief scientist of an internet company.

60
00:11:59,519 --> 00:12:15,519
The other one went on to become chief scientist of a company that won the race in sequencing the genome. In both cases, good algorithms for processing long strings are very important. And this is a great algorithm.

61
00:12:15,519 --> 00:12:24,519
Now it's a little too complex to give all the details in a lecture, but I can give a pretty good idea of how it works.

62
00:12:24,519 --> 00:12:38,519
So the overview is that it's kind of like an MSD sort, but what it manages to do is double the number of characters that it looks at in each pass through the array.

63
00:12:38,519 --> 00:12:56,519
And the idea is that since you're doubling the number of characters that you look at each time, it finishes in a log n time. That's the size of the suffix array. If you double until you get to n, it's log n.

64
00:12:56,519 --> 00:13:14,519
And it turns out what's really ingenious about the algorithm is that you can do it, do each phase in linear time. So this is an example of how it works. So it's going to do a suffix sort. And then I'll talk about the least kind of prefix as well.

65
00:13:14,519 --> 00:13:26,519
So sort of the first character, well, we just use key, key index counting or something like that. So we know how to do that in linear time.

66
00:13:26,519 --> 00:13:34,519
And then the idea is given that it's sorted on the first character, we can sort of easily sort of the first two. Well, again, we could use key index counting.

67
00:13:34,519 --> 00:13:48,519
So now what we can do is double the number of characters that we involve each time. So the next phase of the Mayr-Miers algorithm now gets it sorted on four characters.

68
00:13:48,519 --> 00:14:01,519
And of course, as we more characters, we have sorted on at the leading part, the smaller the subfiles in the trading and the trailing part. So that's certainly a feature.

69
00:14:01,519 --> 00:14:11,519
And then in this case, after we get to eight characters, then all our subfiles are of size one and we're done with the sort.

70
00:14:11,519 --> 00:14:31,519
Now the key to the algorithm is the idea that once it's going, it uses what's called an index sort, which essentially means that it can do compares in constant time in the middle of the algorithm.

71
00:14:31,519 --> 00:14:44,519
And let's just take a look at how that works. So let's look at trying to compare string zero with string nine.

72
00:14:44,519 --> 00:14:51,519
And we know that we've already got the thing sorted on four characters and we want to sort it on eight.

73
00:14:51,519 --> 00:14:58,519
So zero and nine are equal on the first four characters are in the same subfiles. So we're going to get us sorted on the others.

74
00:14:58,519 --> 00:15:11,519
But the thing is if we add four to our given indices, so we're at zero and we add four that gets us to four and we're at nine and we add four that gets us to 13.

75
00:15:11,519 --> 00:15:26,519
We already know that the thing is sorted on those characters and we know that 13 appears before four in this sorted list that's already sorted.

76
00:15:26,519 --> 00:15:35,519
And we can keep track of that by using an inverse array, which says for every index where it appears in the sorted order.

77
00:15:35,519 --> 00:15:43,519
So this says that 13 appears at position six and four appears at position seven. That is 13 appears before four.

78
00:15:43,519 --> 00:15:56,519
So when we're trying to compare this string here, that's the zero suffix with the nice suffix.

79
00:15:56,519 --> 00:16:07,519
So we can go in and again add four to get four, add four to get 13, go into the index array and see which one's less and the one that appears first is going to be less.

80
00:16:07,519 --> 00:16:10,519
So that's a constant time comparison.

81
00:16:10,519 --> 00:16:19,519
13 is less than or equal four because the inverse of 13 is less than inverse four, which means that suffix is of nine.

82
00:16:19,519 --> 00:16:28,519
If you take eight characters out of nine and eight characters out of zero, it's less. It's a really simple and of course easy to implement operation.

83
00:16:28,519 --> 00:16:34,519
So maintaining the inverse, I can get constant time string compare.

84
00:16:34,519 --> 00:16:39,519
So what does that imply for the whole suffix sort?

85
00:16:40,519 --> 00:16:52,519
Well, with a constant time compare, then I can get, at a minimum, I can get an analog and sort just by using quicksword or merge sort.

86
00:16:52,519 --> 00:17:00,519
And then I get much faster than quadratic performance no matter what the strings are. That's a big key to the success of this algorithm.

87
00:17:00,519 --> 00:17:12,519
And actually, if you use version of the three way quicksword, it's been proven that it even gets down to linear time for the sort, no matter what the input is.

88
00:17:12,519 --> 00:17:28,519
That's one thing. And then the other thing is when you need to do the longest comma prefix to look for the longest match after the array sort of, you can also do this constant time for string compare and get the job done.

89
00:17:29,519 --> 00:17:43,519
So this is really an ingenious algorithm that can get suffix sorting done very fast, even in the presence of a huge repeat.

90
00:17:43,519 --> 00:17:53,519
And I think really underscores the importance of careful algorithmic thinking in addressing new computational challenges.

91
00:17:53,519 --> 00:18:04,519
So string sorting just to summarize is a really interesting area of inquiry. For one thing, we can develop linear time sorts for many, many applications.

92
00:18:04,519 --> 00:18:12,519
We thought we were doing well when we had analog and sorts, but actually we can do much better for many applications.

93
00:18:12,519 --> 00:18:27,519
In fact, we can even get to sub linear where we don't even have to examine all the data in today's world when we have huge amounts of data to be able to get it sort of without even looking at it all is really quite a miracle.

94
00:18:28,519 --> 00:18:36,519
Three way string quicksort, you can't do better than that in terms of the number of characters that you have to examine.

95
00:18:36,519 --> 00:18:41,519
And there's a lot of deep mathematical analysis behind that result.

96
00:18:41,519 --> 00:18:55,519
But I think the other lesson to learn is that algorithms like three way string quicksort and in member mayors should show that we really have a lot to learn still in string processing.

97
00:18:56,519 --> 00:19:05,519
And they're not really random. In fact, a lot of times we're looking for non-randomness and we might want to use specialized algorithms.

98
00:19:05,519 --> 00:19:15,519
So string process, this is our introduction to string processing. We're going to look at many other string processing examples in the coming lectures.

