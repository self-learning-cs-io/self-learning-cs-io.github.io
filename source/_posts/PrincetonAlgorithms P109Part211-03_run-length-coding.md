---
title: PrincetonAlgorithms P109Part211 03_run Length Coding
---

1
00:00:00,000 --> 00:00:09,240
As a warm-up, we're going to look at run length encoding, which is actually an effective method

2
00:00:09,240 --> 00:00:11,000
in many applications.

3
00:00:11,000 --> 00:00:13,200
Simple method is very effective.

4
00:00:13,200 --> 00:00:18,780
It's based on the idea that it's very often the case in a bit string that you have long

5
00:00:18,780 --> 00:00:21,519
runs of repeated bits.

6
00:00:21,519 --> 00:00:27,519
So in this case, there's a long run of zeros followed by a medium length run of ones and

7
00:00:27,519 --> 00:00:30,559
a medium length run of zeros and then more ones.

8
00:00:30,559 --> 00:00:35,320
So there's 40 bits, but only switches from zero to one, three places.

9
00:00:35,320 --> 00:00:41,640
And so what you can do is rather than write out all the bits, we can write counts to represent

10
00:00:41,640 --> 00:00:44,120
alternating runs of zeros and ones.

11
00:00:44,120 --> 00:00:45,120
Very simple method.

12
00:00:45,120 --> 00:00:52,320
So in this case, there's 15, 0, 7, 1, 7, 0, and 11 ones.

13
00:00:52,320 --> 00:00:59,320
And with four bits to represent each one of these counts, we can just write 15, 7, 7,

14
00:00:59,320 --> 00:01:05,760
and 11 to get instead of 40 bits, get down to 16 bits.

15
00:01:05,760 --> 00:01:12,400
That's effective when there's long runs of zeros and ones in a bit string.

16
00:01:12,400 --> 00:01:17,599
Now I have to decide how many bits to use to store the counts.

17
00:01:17,599 --> 00:01:24,159
That's not necessarily a good idea to use say 32 bits and maybe 4 is too small.

18
00:01:24,159 --> 00:01:30,319
So in our code, we use 8 bits, so that'll handle runs up to 256 bits.

19
00:01:30,319 --> 00:01:35,199
We use four in the example above, but in a realistic thing, it's fine to use 8.

20
00:01:35,199 --> 00:01:39,359
And then if we have longer runs, then we have to figure out what to do.

21
00:01:39,359 --> 00:01:43,719
If the run length's bigger than the max count, well, we can just interspersed runs of

22
00:01:43,719 --> 00:01:45,959
length 0 and there's one way to handle it.

23
00:01:45,959 --> 00:01:48,039
There's other ways to handle it too.

24
00:01:48,039 --> 00:01:55,959
This is a very simple scheme that covers all the bases and can be very effective.

25
00:01:55,959 --> 00:02:03,960
And for example, consider a bitmap representation of this slide.

26
00:02:03,960 --> 00:02:09,039
There's huge long runs, say it was black and white.

27
00:02:09,039 --> 00:02:18,079
It's huge long runs of white that, depending on the resolution, might be hundreds or a thousand

28
00:02:18,079 --> 00:02:22,479
bits, but could be represented with just a few counts.

29
00:02:22,479 --> 00:02:27,359
And so many applications of a bitmaps of text and other things like that.

30
00:02:27,359 --> 00:02:32,919
This is very effective and it's used in all kinds of technologies like JPEG and Facts and

31
00:02:32,919 --> 00:02:33,919
others.

32
00:02:33,919 --> 00:02:36,159
And it's very simple to implement.

33
00:02:36,159 --> 00:02:43,280
This is our warm-up data compression algorithm that implements run length encoding.

34
00:02:43,280 --> 00:02:46,639
Actually, we left the compress for the book.

35
00:02:46,639 --> 00:02:48,960
This is just the expand.

36
00:02:48,960 --> 00:02:51,240
So I'm given a bunch of counts.

37
00:02:51,240 --> 00:02:58,079
How do I reproduce the original uncompressed text string?

38
00:02:58,079 --> 00:03:03,000
And so it's as simple as that.

39
00:03:03,000 --> 00:03:07,680
So logR is the number of bits per count.

40
00:03:07,680 --> 00:03:17,680
And so basically what we do is read logR bits at a time into an int, whatever the value

41
00:03:17,680 --> 00:03:18,680
is.

42
00:03:18,680 --> 00:03:19,680
And we put that in the int run.

43
00:03:19,680 --> 00:03:27,120
So that's a number between 0 and 256, which is the maximum you can get in 8 bits.

44
00:03:27,120 --> 00:03:32,639
And then we're starting with 0, the first count.

45
00:03:32,639 --> 00:03:34,119
That's the number of zeros we need to write.

46
00:03:34,119 --> 00:03:38,239
So we just write them out one bit at a time, zero of one bit at a time.

47
00:03:38,239 --> 00:03:43,719
And then we flip the bit to make it one and read the next count.

48
00:03:43,719 --> 00:03:48,279
And now we write out that many ones and so forth.

49
00:03:48,279 --> 00:03:55,439
So this is a 10 line program that does expansion for run length encoding.

50
00:03:55,439 --> 00:04:01,359
And you can think about or look at the book for how to do compression.

51
00:04:01,360 --> 00:04:04,480
It's just as simple.

52
00:04:04,480 --> 00:04:12,800
So this is just an example of the effectiveness of run length encoding for one letter, the

53
00:04:12,800 --> 00:04:17,120
letter Q in a typical black and white ski end image.

54
00:04:17,120 --> 00:04:24,280
Even for a single letter, there's lots of redundancy, lots of runs of zeros.

55
00:04:24,280 --> 00:04:31,280
So with a relatively small number of counts, we can represent a bitmap.

56
00:04:31,279 --> 00:04:33,519
And this is the hard case.

57
00:04:33,519 --> 00:04:38,679
Actually most of our printed pages, all this blank space, as I said.

58
00:04:38,679 --> 00:04:48,839
So typically if you just don't compress it all and you have an 8 and a half by 11 piece

59
00:04:48,839 --> 00:04:53,919
of paper with 300 pixels per inch, that'd be 8 million bits.

60
00:04:53,919 --> 00:04:55,599
But most of those are white.

61
00:04:55,600 --> 00:05:03,879
And typically with run length encoding, you can get some substantial savings simply by

62
00:05:03,879 --> 00:05:06,680
basically counting the white bits.

63
00:05:06,680 --> 00:05:10,000
And even when this letter's involved, you can get saving.

64
00:05:10,000 --> 00:05:13,360
Maybe there's only 3,000 characters.

65
00:05:13,360 --> 00:05:14,840
Now it's another example.

66
00:05:14,840 --> 00:05:24,000
If it's all text, then maybe the text itself is a great way to compress it.

67
00:05:24,000 --> 00:05:28,879
Or the program or the document processor that produced the text.

68
00:05:28,879 --> 00:05:32,439
But now we're starting to get into undecided ability issues.

69
00:05:32,439 --> 00:05:39,680
So let's think more in terms of a page that has an image of drawing in some text and so

70
00:05:39,680 --> 00:05:41,000
forth.

71
00:05:41,000 --> 00:05:46,680
So it makes sense to start with a bitmap and then use as few bits as possible and then

72
00:05:46,680 --> 00:05:49,800
run length encoding is going to be very effective.

73
00:05:49,800 --> 00:05:51,920
That's our warm up case for data compression.

