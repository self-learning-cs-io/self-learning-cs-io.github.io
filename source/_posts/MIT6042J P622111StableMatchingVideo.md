---
title: MIT6042J P622111StableMatchingVideo
---

1
00:00:00,000 --> 00:00:11,000
We've seen graphs involving boys and girls and connections between them in the context of our sexual demographics calculation and study.

2
00:00:11,000 --> 00:00:25,000
A similar problem comes up in terms of what are called stable matching, which is again the issue of matching up boys and girls in a special way according to some constraints.

3
00:00:25,000 --> 00:00:30,000
It turns out to have a lot of applications which will discuss toward the end. Let's just look at what the problem is.

4
00:00:30,000 --> 00:00:38,000
The setup is that there's some number of boys in this case, 5, 1, 2, 5, and an equal number of girls labeled A through E.

5
00:00:38,000 --> 00:00:46,000
And each of the boys has a ranking of the girls, different rankings because different boys have different preferences.

6
00:00:46,000 --> 00:00:51,000
And likewise, the girls have rankings of the boys. Different girls have different preferences.

7
00:00:51,000 --> 00:01:01,000
So here, girl A likes boy 3 best and boy 5 second best and boy 1 likes girl C best and girl D least.

8
00:01:01,000 --> 00:01:06,000
So the problem basically is that we want to get all the boys married to all the girls.

9
00:01:06,000 --> 00:01:13,000
We want to form 5 monogamous bisexual marriages, a boy and a girl.

10
00:01:14,000 --> 00:01:22,000
And we'd like in some vague way to acknowledge these preferences and satisfy as many as we can.

11
00:01:22,000 --> 00:01:24,000
I'll be more specific about that in a minute.

12
00:01:24,000 --> 00:01:29,000
But let's just play with that idea of trying to accommodate people's preferences.

13
00:01:29,000 --> 00:01:34,000
So one way to do it is let's just decide, well, we'll favor the boys this time.

14
00:01:34,000 --> 00:01:38,000
Let's try our greedy strategy for the boys. Let's just look at the boy preferences.

15
00:01:38,000 --> 00:01:44,000
If a greedy strategy is I'm going to try to give each boy the best possible choice that he can make.

16
00:01:44,000 --> 00:01:50,000
So I'm going to start off by deciding that let's let boy 1 have his first choice, girl C.

17
00:01:50,000 --> 00:01:55,000
I'm going to marry them off. And once I've married them off, I'll just stop considering 1 and C.

18
00:01:55,000 --> 00:02:00,000
And now I have a reduced problem. I've have 4 remaining boys and 4 remaining girls.

19
00:02:00,000 --> 00:02:07,000
And proceeding in this way, greedy way for boys, I'm going to now give boy 2 his next choice that remains.

20
00:02:07,000 --> 00:02:14,000
Namely, girl A. And I'll marry them off. And again, now 2 and A, Nika can be eliminated from consideration.

21
00:02:14,000 --> 00:02:22,000
I continue in this way. And I wind up with this set of 5 marriages ending with boy 5 married to girl E.

22
00:02:22,000 --> 00:02:30,000
Okay. Now if we look at this set of marriages, there's a problem which motivates the whole stable marriage problem that we're going to be examining.

23
00:02:30,000 --> 00:02:37,000
Namely, we've married off boy 1 to his first choice, girl C. He should be happy. But she may not be.

24
00:02:37,000 --> 00:02:47,000
And we've also married off boy 4 to girl B. Now a difficulty here is that if you look at the preferences,

25
00:02:47,000 --> 00:02:55,000
girls C actually is more desirable to boy 4 than girl B.

26
00:02:55,000 --> 00:03:06,000
Girls C, a boy 4 like somebody else's wife better than his own. And what makes it really bad is that girls C, the other person's wife,

27
00:03:06,000 --> 00:03:12,000
likes boy 4 better than her husband. Each of them would be better off if they ran off together.

28
00:03:12,000 --> 00:03:19,000
They are whether they do or not. They certainly are under tremendous pressure. It makes the set of marriages unstable.

29
00:03:19,000 --> 00:03:29,000
So they're called a rogue couple. When you have in a set of marriages a boy and a girl who prefer each other over their current spouses,

30
00:03:29,000 --> 00:03:35,000
they are said to be a rogue couple and a source of instability.

31
00:03:35,000 --> 00:03:43,000
So the stable marriage problem is let's see if we can get everybody married off and have no rogue couples.

32
00:03:43,000 --> 00:03:53,000
It'll be a stable set of marriages. Now people may not be happy, but it doesn't matter because they'll never find anybody else that is unhappy in the same way

33
00:03:53,000 --> 00:03:59,000
that would be willing to run off with them and make them happier. So it's stable.

34
00:03:59,000 --> 00:04:08,000
And it turns out that there always is a way to find a stable set of marriages a couple of ways. But why don't we just play with the idea?

35
00:04:08,000 --> 00:04:22,000
Here is a display of those preferences again. And you can stop the video and fiddle with a piece of paper and see if you can come up with a stable set of marriages between the boys and the girls.

36
00:04:22,000 --> 00:04:32,000
We used to do this in class in real time. We would give five different boys a chart of preferences of girls and we'd give the five different girls a chart of preferences of boys.

37
00:04:32,000 --> 00:04:39,000
They were not supposed to tell each other what their preferences were, but the girls were supposed to be interviewing the boys and the boys interviewing the girls,

38
00:04:39,000 --> 00:04:47,000
but simultaneously in a parallel and try to agree to get married and see whether the set of marriages that they wound up with were stable.

39
00:04:47,000 --> 00:04:53,000
Most of the time they actually did wind up with a stable set of marriages, but not always, just an amusing exercise.

40
00:04:53,000 --> 00:05:03,000
And it does illustrate something about the fact that the procedures that we're going to be going through to find stable marriages work very nicely if you choose to do them in parallel.

41
00:05:03,000 --> 00:05:11,000
Anyway, there are, it turns out, two sets of stable marriages that we can find in this particular set of preferences.

42
00:05:11,000 --> 00:05:21,000
The simplest one to understand is all the girls get their first choice. It so happens if you look at that chart, all of the girls have different first choice boys.

43
00:05:21,000 --> 00:05:29,000
If we simply give them their first choice, no girl is going to be tempted to be part of a rogue couple because she's got her first choice. It's absolutely stable.

44
00:05:29,000 --> 00:05:35,000
But of course, that's a very special circumstance. It would be unusual that all the girls first choices were different or likewise.

45
00:05:35,000 --> 00:05:42,000
It would be unusual if all the boys first choices were different, but if they were, then you instantly get a stable set of marriages.

46
00:05:42,000 --> 00:05:51,000
There's another stable set that's not quite so obvious, and you can check that all of these pairs have no instability.

47
00:05:51,000 --> 00:05:55,000
There's no rogue couples in here when I marry five to A and one to E.

48
00:05:55,000 --> 00:06:10,000
This is a so-called boy optimal set of marriages. It turns out that in this set of marriages, every boy gets the best possible spouse that he could possibly get in any set of stable marriages.

49
00:06:10,000 --> 00:06:20,000
There's no set of stable marriages in which boy five gets a more desirable girl than A. There's no set of stable marriages in which boy one gets a girl that's more desirable to him than girl E.

50
00:06:20,000 --> 00:06:30,000
The sad news is that it's simultaneously pestilmal for the girls. That is, each girl is getting their worst possible spouse among all sets of stable marriages.

51
00:06:30,000 --> 00:06:38,000
We'll examine that further in a minute. But let me just point out that this is more than a puzzle. I mean, it's fun, and it's a nice puzzle, but it's more than a puzzle.

52
00:06:38,000 --> 00:06:45,000
The original case where it was studied or published first was in a paper by Gail and Shapley in 1962.

53
00:06:45,000 --> 00:06:53,000
You remember the name David Gail from the subset game that we played early in the term when we were practicing with set relations.

54
00:06:53,000 --> 00:07:06,000
What they were dealing with was the problem of college admissions where students have rankings of colleges that they've applied to and their preferences and colleges have rankings of students that have applied to them.

55
00:07:06,000 --> 00:07:13,000
We're trying to get matching up between college offers and student preferences.

56
00:07:13,000 --> 00:07:28,000
In a circumstance where a collegemate in law for a student sort of accepted, but then later the student got another offer from a place they preferred more and they were changing their mind and withdrawing with acceptances and so on.

57
00:07:28,000 --> 00:07:38,000
It was making everybody crazy. The administrators and the students themselves and the desire was let's get some stable set of offers on the table.

58
00:07:38,000 --> 00:07:45,000
Gail and Shapley proposed a protocol to get stable marriages that would apply to college admissions.

59
00:07:45,000 --> 00:07:55,000
It turns out interestingly enough that although Gail and Shapley are credited with the stable marriage solution that we're going to discuss, they did that because they were the first to publish it.

60
00:07:55,000 --> 00:08:23,000
In fact, it had been discovered and put into practice at least 20 years earlier by a national board whose job was to match interns and hospitals without graduating medical students who were about to start their further clinical training as interns, now called residents in modern language, had to be matched up with hospitals and the residents had preferred hospitals that they'd like to go to and the hospitals had rankings of residents that met their criteria.

61
00:08:23,000 --> 00:08:41,000
Again, the issue was how do you assign residents to hospitals in a stable way. Before they had discovered this stability algorithm, it was a mess again. There's a wonderful story in the book by Gus Field and Irving that is an entire book about the stable marriage problem published by MIT Press, I think in 89.

62
00:08:41,000 --> 00:08:49,000
As a matter of fact, I was the editor of the series in which it appears. This stable marriage problem turns out to have a lot of structure.

63
00:08:49,000 --> 00:09:03,000
They describe a wonderful anecdote in their preface about the problems that were happening between the hospitals and the residents and the measures that were taken to try to achieve stability before they discovered this algorithm.

64
00:09:03,000 --> 00:09:25,000
Another genuine computer science application is one that was described by Tom Layton, who was a co-author of the text and now the CEO of Akamai, an internet infrastructure plumbing company that has some large number of servers, I think 65,000 servers in 2010 around the world.

65
00:09:25,000 --> 00:09:42,000
It basically is providing cashed web pages so that they can respond more quickly to local calls. They have a problem that they get something like 62,000 servers and they get I think 200 billion web requests a day.

66
00:09:42,000 --> 00:09:53,000
The web requests are kind of acting like the boys and the servers are kind of acting like the girls or the hospitals and the residents.

67
00:09:53,000 --> 00:10:05,000
The web requests have preferences based on proximity and speed of server and the servers have preferences based on where they're located and the magnitude of the web request that they're coming to.

68
00:10:05,000 --> 00:10:14,000
The question is how do you assign web requests to servers so that things get done expeditiously?

69
00:10:14,000 --> 00:10:22,000
It turns out that the stable marriage method gave a satisfactory way to accomplish that kind of matching.

70
00:10:22,000 --> 00:10:33,000
There are so many large numbers involved that the stable marriage ritual described shortly is very amenable to being run in parallel.

71
00:10:33,000 --> 00:10:36,000
Another application that turns out to come up was in matching dance partners.

72
00:10:36,000 --> 00:10:47,000
When I was teaching this course 10 years ago with a co-instructor who was a member of the Indian dance team, she said we could use this because it turns out that again, their boy and girl partners in the dance,

73
00:10:47,000 --> 00:11:00,000
and it was constantly the case that one boy would like another boy's partner better and vice versa and they would start pairing up and leaving the other people hanging and the bad feelings and it was a disruptive,

74
00:11:00,000 --> 00:11:03,000
source of disruption in the society.

75
00:11:03,000 --> 00:11:05,000
There's a picture of that Indian dance group.

76
00:11:05,000 --> 00:11:14,000
My co-instructor is not actually there but it gives you some sense of the reality of the problem here at MIT.

77
00:11:14,000 --> 00:11:18,000
She told me that it was actually being used by that group.

