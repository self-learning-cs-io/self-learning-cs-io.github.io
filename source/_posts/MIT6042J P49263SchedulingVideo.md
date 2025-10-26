---
title: MIT6042J P49263SchedulingVideo
---

1
00:00:00,000 --> 00:00:07,000
So we saw in the last video why if you represent a scheduling constraints among

2
00:00:07,000 --> 00:00:12,000
courses by a digraph that it's critical that that digraph in fact be a dig and

3
00:00:12,000 --> 00:00:17,000
let's now look at this scheduling issue represented by digs in more detail.

4
00:00:17,000 --> 00:00:24,000
So here's a chart of a selection of course six prerequisites, some of them

5
00:00:24,000 --> 00:00:29,000
obsolete but they serve the purposes of being an illustrative example and the

6
00:00:29,000 --> 00:00:33,000
little arrows here are indicating arrows in the digraph. So what this tells me is

7
00:00:33,000 --> 00:00:39,000
that 1801 is listed as an immediate prerequisite in the catalog for 6042.

8
00:00:39,000 --> 00:00:44,000
1801 is also an immediate prerequisite of 1802.

9
00:00:44,000 --> 00:00:58,000
6.001 is at 6.004, both prerequisites of 6033 and 6042 of 6046 and 6046 of 6.840.

10
00:00:58,000 --> 00:01:04,000
So we're seeing here this indirect prerequisite issue that I mentioned before which is that

11
00:01:04,000 --> 00:01:09,000
even though the only thing listed as a prerequisite for 6.840 in the catalog is 6046,

12
00:01:10,000 --> 00:01:14,000
as a matter of fact in order to take 6046 you have to have taken 6042.

13
00:01:14,000 --> 00:01:19,000
So 6042 is an indirect prerequisite of 6.840.

14
00:01:19,000 --> 00:01:27,000
So in terms of graph language and path language a subject you as an indirect prerequisite of V

15
00:01:27,000 --> 00:01:33,000
when there's a positive length path from U to V in the digraph that describes the

16
00:01:33,000 --> 00:01:38,000
prerequisite structure among the classes it simply means using our notation for

17
00:01:38,000 --> 00:01:43,000
R plus is the positive length path relation of a digraph, R, a binary relation,

18
00:01:43,000 --> 00:01:51,000
R it simply means U R plus V which is read as there is a positive length path from U to V.

19
00:01:51,000 --> 00:02:00,000
Now a key idea that we're going to be examining in learning how to do scheduling is the idea of a minimal subject.

20
00:02:00,000 --> 00:02:05,000
So the definition of a minimal subject is a subject that has no prerequisites,

21
00:02:05,000 --> 00:02:13,000
no arrows in a freshman subject. So nothing comes in, there are three examples of subjects with no prerequisites

22
00:02:13,000 --> 00:02:18,000
in the preceding chart namely 1802 and 6.001.

23
00:02:18,000 --> 00:02:22,000
Let me say a word about where this funny terminology minimal comes from.

24
00:02:22,000 --> 00:02:29,000
It's because another way to talk about digs is in terms of things that are like order relations

25
00:02:29,000 --> 00:02:34,000
called partial orders which we'll be looking at shortly.

26
00:02:34,000 --> 00:02:42,000
And so you think of the later subjects as being bigger than the earlier subjects.

27
00:02:42,000 --> 00:02:47,000
So a minimal subject is one where there's nothing less than it.

28
00:02:47,000 --> 00:02:52,000
Now there might be several minimal subjects because it might be that neither one of them is less than the other,

29
00:02:52,000 --> 00:02:59,000
but there's nothing less than 1801. There's no other subject that you have to take before 1801.

30
00:02:59,000 --> 00:03:03,000
So that's the definition of minimal, nothing smaller.

31
00:03:03,000 --> 00:03:07,000
Now you could ask about some minimum which you are maybe more familiar with.

32
00:03:07,000 --> 00:03:13,000
A minimum means that not only is there nothing before it but it comes before everything else.

33
00:03:13,000 --> 00:03:18,000
It would be the earliest of all possible subjects in the indirect prerequisite chain.

34
00:03:18,000 --> 00:03:23,000
There was none in this example but it actually used to be one at MIT.

35
00:03:23,000 --> 00:03:28,000
For a while we experimented with giving an orientation week summer assignment.

36
00:03:28,000 --> 00:03:33,000
That is an assignment over the summer for newly admitted students in order for them to take a subject

37
00:03:33,000 --> 00:03:39,000
during orientation week in which they discussed some book that they had all been assigned to read beforehand.

38
00:03:39,000 --> 00:03:44,000
It seemed like a great idea to kind of pull the freshman community together but it turned out to be unsustainable

39
00:03:44,000 --> 00:03:50,000
because they couldn't find enough faculty and others willing to conduct these seminars.

40
00:03:50,000 --> 00:03:56,000
So MIT stopped having a minimum subject.

41
00:03:56,000 --> 00:04:01,000
So let's look at the prerequisites again and discuss how to do a scheduling.

42
00:04:01,000 --> 00:04:05,000
The first thing we're going to do in the schedule is identify the minimal elements.

43
00:04:05,000 --> 00:04:08,000
There are the three of them that we mentioned.

44
00:04:08,000 --> 00:04:14,000
We're going to start by deciding that we'll take those three in the first term.

45
00:04:14,000 --> 00:04:18,000
We're going to be operating basically what's called a greedy strategy.

46
00:04:18,000 --> 00:04:23,000
We're going to take as many things as we possibly can take at any term given the constraint.

47
00:04:23,000 --> 00:04:27,000
So we can take all the freshman subjects in our first term because they have no prerequisites.

48
00:04:27,000 --> 00:04:31,000
The next step then is just get rid of them because they're scheduled already.

49
00:04:31,000 --> 00:04:36,000
So we can get rid of all those occurrences of 1801, 802 and 611.

50
00:04:36,000 --> 00:04:43,000
Not only there are other occurrences as well here where 1801 is a prerequisite for things.

51
00:04:43,000 --> 00:04:48,000
So they're all gone and we get a simplified diagram where we've removed the minimal elements.

52
00:04:48,000 --> 00:04:55,000
Now in the new diagram there are now things that didn't used to be minimal before but are minimal now.

53
00:04:55,000 --> 00:04:58,000
These are the new minimal elements and we can identify those.

54
00:04:58,000 --> 00:05:03,000
Here are five subjects for here and one there that now have no more prerequisites.

55
00:05:03,000 --> 00:05:09,000
These are kind of the second level minimal elements and we're going to schedule them next.

56
00:05:09,000 --> 00:05:16,000
So those are all the subjects that we can possibly take after we've taken the first set of minimal subjects

57
00:05:16,000 --> 00:05:18,000
to the second level, Minimals.

58
00:05:18,000 --> 00:05:20,000
And we'll schedule them in the next term.

59
00:05:20,000 --> 00:05:24,000
This is our five subject second term schedule.

60
00:05:25,000 --> 00:05:33,000
Likewise, you delete these guys and then you discover that 6046 and 60404 are the resulting minimal ones which is now possible to take.

61
00:05:33,000 --> 00:05:35,000
Because all their prerequisites have been satisfied.

62
00:05:35,000 --> 00:05:43,000
So we schedule them in the third term, 6840 and 6033 by the same reasoning in the fourth term and 6857.

63
00:05:43,000 --> 00:05:49,000
In the fifth term, there is our complete term schedule obtained in this particular way.

64
00:05:49,000 --> 00:05:55,000
There's of course many other ways to schedule it but this is a particular orderly way where the strategy again is greedy.

65
00:05:55,000 --> 00:05:59,000
You take as many things as you possibly can take in a given term.

66
00:05:59,000 --> 00:06:04,000
Now there are some concepts that come up when you're talking about schedules that are worth introducing.

67
00:06:04,000 --> 00:06:07,000
So one of them is an anti-chain.

68
00:06:07,000 --> 00:06:14,000
An anti-chain is in this particular example means a set of subjects where there are no indirect prerequisites among them.

69
00:06:15,000 --> 00:06:24,000
They can be taken in any order because it doesn't matter whether you've taken one or not when you're thinking about taking the others.

70
00:06:24,000 --> 00:06:34,000
In technical language, again, motivated by the idea of thinking of there being a path as though it was less than or equal to something.

71
00:06:34,000 --> 00:06:36,000
These are elements that are incomparable.

72
00:06:36,000 --> 00:06:38,000
Neither one is less than or equal to another.

73
00:06:39,000 --> 00:06:50,000
In terms of the path relation, you is incomparable to V if and only if there's no path from U to V of positive length and there's no positive length path from V to U.

74
00:06:50,000 --> 00:06:52,000
Let's look at some anti-chains.

75
00:06:52,000 --> 00:06:59,000
Part of the point of defining it is we have chosen anti-chains as our schedule for each term.

76
00:07:00,000 --> 00:07:06,000
The freshman subjects with no prerequisites clearly there's no path among them because there's no path to them at all.

77
00:07:06,000 --> 00:07:08,000
So they are an anti-chain.

78
00:07:08,000 --> 00:07:21,000
The next level we chose were the second level minimal elements which only had as prerequisites the original minimal elements and so certainly none of them was a prerequisite of the others.

79
00:07:22,000 --> 00:07:27,000
So that's another example of an anti-chain.

80
00:07:27,000 --> 00:07:34,000
And of course the third level and the fourth level and the fifth level are anti-chains but not all anti-chains are there in our schedule.

81
00:07:34,000 --> 00:07:43,000
So for example here is a diagonal lying anti-chain 6846004 and 6034 have no paths between them.

82
00:07:43,000 --> 00:07:51,000
In fact it's possible to take them simultaneously because you could have taken all their prerequisites in the upper left here and then take the three of them.

83
00:07:51,000 --> 00:07:54,000
So that's what an anti-chain means here.

84
00:07:54,000 --> 00:08:09,000
So the technical definition is no path between any two of them but in terms of the scheduling of course it means it's possible to take them in the same term if you've satisfied all their prerequisites which it is possible to do.

85
00:08:10,000 --> 00:08:17,000
So let's ask about the various patterns of scheduling that are possible.

86
00:08:17,000 --> 00:08:26,000
We've discovered this particular greeny one where we take as many things as we can each term but suppose that I was constrained to only take one subject per term.

87
00:08:26,000 --> 00:08:34,000
I was going to have an outside job, I'm too busy to take more than one class of term and if MIT will let me do it all so long that's what I'd like to do.

88
00:08:34,000 --> 00:08:46,000
So can I do this? Yeah well sure just schedule all the minimal elements first in any order, one two three and then schedule the five second level minimal elements next and the third level and so on.

89
00:08:46,000 --> 00:09:02,000
And it's perfectly possible then to modify the schedule that we found into a schedule in which you only take one subject per term and of course you only take a subject after you've taken all of its indirect and direct prerequisites.

90
00:09:02,000 --> 00:09:17,000
This is called a topological sort. Again the sorting word comes from the motivation of thinking of there being a path as like a less than or equal to a relation so we're sorting things in order of increasing size.

91
00:09:17,000 --> 00:09:25,000
1801 would be in this case a smallest element in 6857 a biggest in this list of elements.

92
00:09:25,000 --> 00:09:36,000
A chain is kind of technically literally a thing called the dual of an anti chain. A chain is a sequence of subjects that must be taken in order.

93
00:09:36,000 --> 00:09:45,000
That is these are subjects where for any two of them you know which one has to come first that is for between any two of them there is a path in one way or the other.

94
00:09:45,000 --> 00:09:55,000
Now of course it's a day so they can't be pants in both directions. So a chain is simply a set of comparable elements which implies that there's an order in which they have to be taken.

95
00:09:55,000 --> 00:10:06,000
So here are some chains. This one was shown pictorially as a vertical chain with five courses in it. Here's a vertical chain of four and not all of them are vertical.

96
00:10:06,000 --> 00:10:16,000
Here's a chain where you have to take 1801 before you take 1803 before you take six 004 so they form a chain.

97
00:10:16,000 --> 00:10:25,000
It's important to realize that this is a chain with five subjects in it but a chain doesn't have to have every possible element that could be in it.

98
00:10:25,000 --> 00:10:35,000
It's still a chain even if it's only got these three subjects because there's a path from 802 to 6.004 and a path from 6.004 to 6.857.

99
00:10:35,000 --> 00:10:47,000
But maximum length chains, chains that are as full as possible are important theoretically. And so this in particular is a maximum length chain.

100
00:10:47,000 --> 00:10:59,000
The longest chain here is of length five. Now it's not the only one. There's another chain of length five here if you look for it. But no chain is of length longer than five and there is one of length five.

101
00:10:59,000 --> 00:11:11,000
And that leads us to the question of how many terms is it necessarily going to take to graduate? Well we saw that you can graduate in five.

102
00:11:11,000 --> 00:11:24,000
And but given that there's a maximum chain of length five it means that you can't do it in fewer because those five courses have to be taken consecutively.

103
00:11:24,000 --> 00:11:42,000
So the third has to be taken in a term after the first two have been taken, the second has to be taken after the first. If you have a chain of any size actually the number of terms to graduate has to be at least as big as that chain which means it has to be at least as many terms as a maximum size chain.

104
00:11:42,000 --> 00:11:53,000
So five terms are necessary and we saw using our minimal strategy of being greedy that you can always do it in maximum chain length. So five are also sufficient.

105
00:11:53,000 --> 00:12:03,000
And this is providing that you can take an unlimited number of subjects per term. Remember our strategy to graduate in five terms was to take as many subjects as we possibly could each term.

106
00:12:03,000 --> 00:12:16,000
So there's the sufficient way to take subjects to graduate in five terms. And of course one consequence is that in my second term freshman year I was taking five subjects because it was possible.

107
00:12:16,000 --> 00:12:25,000
But that leaves me with a kind of heavily loaded term compared to here's a term with two subjects and there's a term with only one subject in the at the very end.

108
00:12:25,000 --> 00:12:42,000
So it's possible in fact to somewhat adjust the term load. Let's just shift taking 1802 to the third term. That's perfectly feasible to do that because I will have satisfied all the prerequisites of 1802 after the first term.

109
00:12:42,000 --> 00:12:49,000
So I have to take it in the second term. Let's shift it off. So now I've lightened the load in the second term to four subjects.

110
00:12:49,000 --> 00:12:58,000
Someone increasing the load had to do it somewhere in the third term to three subjects. So now I have to take no more than four subjects a term.

111
00:12:58,000 --> 00:13:09,000
And as a matter of fact, if you fiddle you can actually find a graduating schedule in which you can only take three subjects per term.

112
00:13:09,000 --> 00:13:16,000
And we will examine what's the minimum number of subjects per term in the next segment.

