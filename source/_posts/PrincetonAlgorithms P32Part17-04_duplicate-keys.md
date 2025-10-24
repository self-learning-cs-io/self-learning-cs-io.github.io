---
title: PrincetonAlgorithms P32Part17 04_duplicate Keys
---

1
00:00:00,000 --> 00:00:07,440
Now we're going to take a look at what happens when we have significant numbers of duplicate

2
00:00:07,440 --> 00:00:13,120
keys, which is not at all unusual in practical applications.

3
00:00:13,120 --> 00:00:18,760
So in fact, often the purpose of a sort is to bring items with equal keys together.

4
00:00:18,760 --> 00:00:22,640
Like the example that I gave where we had cities and times.

5
00:00:22,640 --> 00:00:28,039
There's a lot of detailed data in the times, but maybe the whole goal of the sort is to

6
00:00:28,039 --> 00:00:34,679
group them by cities so we can ship out the data for each city to each city.

7
00:00:34,679 --> 00:00:40,439
On this plenty of other examples like that in data processing where we find maybe removed

8
00:00:40,439 --> 00:00:46,239
duplicates from a mailing list or all the job applicants that we get, we might want to

9
00:00:46,239 --> 00:00:48,280
sort them by the college attended.

10
00:00:48,280 --> 00:00:53,920
So the sort, there's huge files with huge numbers of duplicate keys.

11
00:00:53,920 --> 00:00:59,960
So it's worthwhile to take a careful look at what the implication of that is.

12
00:00:59,960 --> 00:01:03,920
So again, typical characteristics, we have a huge file, but small.

