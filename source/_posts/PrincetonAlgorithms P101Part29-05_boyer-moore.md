---
title: PrincetonAlgorithms P101Part29 05_boyer Moore
---

1
00:00:00,000 --> 00:00:09,740
So Knuth Morris Pratt is a linear time algorithm. Surely we can't do better than that, can

2
00:00:09,740 --> 00:00:16,140
we? Well, it's not the end of the story. Now we're going to look at the boy or more algorithm.

3
00:00:16,140 --> 00:00:24,900
And it's also a very simple idea that's extremely effective in practice. So here's the idea.

4
00:00:24,899 --> 00:00:32,899
Instead of matching the pattern against the text, moving from left to right in both pattern and text,

5
00:00:32,899 --> 00:00:40,899
Borer Moore said, what if we try to scan the characters in the pattern from right to left?

6
00:00:40,899 --> 00:00:51,899
So when then when we find a mismatch, we can skip, we know all the characters in the pattern.

7
00:00:51,899 --> 00:00:58,899
So for example, if we're looking for needle and a haystack, if we first look at the last character in the pattern, which is an E,

8
00:00:58,899 --> 00:01:07,900
and we find that N in the text, then it's clear that the next possible match is when the N's lined up.

9
00:01:07,900 --> 00:01:12,900
Because if there's any other line up, it'd be all these characters that we know are not N compared against N,

10
00:01:12,900 --> 00:01:19,900
so when I was just moving to the N's are lined up. And that's good, but that's not as good as the next case.

11
00:01:19,900 --> 00:01:27,900
If we happen to run into a character that's not in the pattern, then we can just skip all the way over.

12
00:01:27,900 --> 00:01:35,900
We don't have to compare any of our pattern characters against that one. So we can just add M if we have M pattern characters.

13
00:01:35,900 --> 00:01:42,900
And so then in this case, we have a more complicated situation.

14
00:01:42,900 --> 00:01:53,900
We match the E and we have a bunch of E's, and so part of the algorithm is to figure out when you do match a character that's in the pattern, now what do you do?

15
00:01:53,900 --> 00:02:00,900
But the intuition is it's fast because you're often going to have this kind of case where you find a mismatch.

16
00:02:00,900 --> 00:02:11,900
And since you're going from right to left, you know that if there's a character in the text that's not in the pattern at all, you can shift over M characters at a time.

17
00:02:11,900 --> 00:02:16,900
And that's a huge win in a lot of practical situations.

18
00:02:16,900 --> 00:02:23,900
So how much do we skip? So the first case is clear.

19
00:02:23,900 --> 00:02:39,900
If you run into a text character that's not in the pattern, then you just move I from wherever it was to one character beyond the current one that you're looking at.

20
00:02:39,900 --> 00:02:50,900
So and that's an easy, easy calculation. It's just the anchor in a pie the number of pattern characters that you've not looked at.

21
00:02:50,900 --> 00:03:04,900
Now, but if you have a character in the pattern, then you want to align the text and in this case with the right most pattern and that's pretty good.

22
00:03:04,900 --> 00:03:20,900
But you don't always want to do that. If you, for example, we have a mismatch on E. If you were to say, oh, let's line up on the right most E in the pattern, that would involve backup.

23
00:03:20,900 --> 00:03:25,900
So you don't want to do backup in that case. You just move on by one.

24
00:03:25,900 --> 00:03:34,900
So there are times when the heuristic is no help. So what you really want to do is just increment by one in that case.

25
00:03:34,900 --> 00:03:50,900
So just given those basic preliminaries, it's clear that it's actually easy to go ahead and pre-compute how much you might want to skip.

26
00:03:51,900 --> 00:04:07,900
So you start out with with minus once this is the amount that you're going to increment the text pointer.

27
00:04:07,900 --> 00:04:14,900
And minus one means you just, if you're not in the patterns, you're just going to move on one.

28
00:04:14,900 --> 00:04:22,899
And so all you do is go through the pattern.

29
00:04:22,899 --> 00:04:34,899
So let's start with n. So we want to fill in this table for n. And it says, so if we are going to find an n in the text, what do we want to do?

30
00:04:34,899 --> 00:04:45,899
Well, we want to move to the next text character. Sorry, we want to compare the next text character against this one, which is zero.

31
00:04:45,899 --> 00:04:52,899
And so right of pat dot krat j equals j, I'm just going to fill in that zero.

32
00:04:52,899 --> 00:05:13,899
And then we go to j equals one for the EEDL. It's the same. So for what happens is for if you do that for every letter in the pattern, if you have a letter that appears more often, it gets overwritten until the right most occurance is the one that's there.

33
00:05:13,899 --> 00:05:34,899
So that pre computation is just one pass through the pattern. And then given that pre computation, then again, we're going to implement this is an implementation of more for using for loop incrementing the text character.

34
00:05:34,899 --> 00:05:51,899
And so we are going to have the text pointer i. And in the course of the algorithm, we're going to compute a value skip, which is the amount that we're going to move the text character.

35
00:05:51,899 --> 00:06:04,899
So we go all the way through the pattern from right to left. If we get all the way through the pattern, and we find a match, and we don't change the value of skip, then we found a match.

36
00:06:04,899 --> 00:06:12,899
Sorry, if we get all the way through the pattern, we don't find a mismatch. It's all matches. We don't change the value of skip, and we found a match.

37
00:06:12,899 --> 00:06:24,899
If we do find a mismatch, then we're going to compute the value that we skip, which is where we are, minus that table, that thing that we computed.

38
00:06:24,899 --> 00:06:37,899
And that's the amount that we're going to add to the text character to take care of the mismatch for the right to left mismatch.

39
00:06:37,899 --> 00:06:57,899
And if it's always going to be at least one, but if this thing is negative, we're not going to back up. That's it. So it's a very simple implementation based on this idea of moving from right to left and skipping over the whole thing if we find a mismatch.

40
00:06:57,899 --> 00:07:15,899
And the key thing about Boy or More, you can start an implementation and figure it out easily. But the key thing is that this mismatch character, heuristic, takes time proportional to n over m. That's kind of amazing. We had started out with a brute force, which was n times m.

41
00:07:15,899 --> 00:07:32,899
And then we got a linear time. We're happy with n. But actually, there's a lot of practical situations where you can do the search in n over m. The longer the pattern gets, the faster the search gets. It's not only sublinear, it gets better. That's kind of amazing.

42
00:07:32,899 --> 00:07:41,899
Now, there's a caveat there because there is a worst case that could be as bad as the brute force.

43
00:07:41,899 --> 00:07:55,899
So this is just the example of the worst case where you go from right to left and always get to the first character before finding a mismatch. And you can't do anything better than move over one.

44
00:07:55,899 --> 00:08:08,899
But actually, what you can do is build something kind of like Knuth-Morris Pratt to make sure that you don't do something like this with a repetitive pattern.

45
00:08:08,899 --> 00:08:18,899
And you can get the worst case to the linear. But it's really of importance for intermediate-length patterns.

46
00:08:18,899 --> 00:08:28,899
Because you're so often going to be able to get this n over m performance, and that's a widely used algorithm, the Boyer-Morra algorithm.

