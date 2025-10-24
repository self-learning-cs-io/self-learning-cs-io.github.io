---
title: PrincetonAlgorithms P46Part110 05_b Trees Optional
---

1
00:00:00,000 --> 00:00:06,960
Okay, we're going to finish up by talking about some practical applications of red black

2
00:00:06,960 --> 00:00:13,519
trees and in particular, beet trees, which are a general, general version.

3
00:00:13,519 --> 00:00:22,440
So the idea behind beet trees is that often the data that we're trying to store is really

4
00:00:22,440 --> 00:00:23,440
huge.

5
00:00:23,440 --> 00:00:28,679
There's a large amount of data and we're going to look at a more general model for external

6
00:00:28,679 --> 00:00:37,439
storage where we work with contiguous blocks of data that are big, maybe 4K or bigger

7
00:00:37,439 --> 00:00:39,640
or maybe even a whole file.

8
00:00:39,640 --> 00:00:47,480
And all we want to count is the first time we access a page because the main cost is trying

9
00:00:47,480 --> 00:00:49,640
to find where the page is.

10
00:00:49,640 --> 00:00:53,439
Once it's right in, we get to read all the page for free pretty much.

11
00:00:53,439 --> 00:01:00,879
So the real property of external storage that not your local memory is that the time

12
00:01:00,879 --> 00:01:06,000
required to get to a page is way larger than the time to access data within a page.

13
00:01:06,000 --> 00:01:12,039
So what we want to do is try to access data that's out externally using a minimum number

14
00:01:12,039 --> 00:01:13,439
of probes.

15
00:01:13,439 --> 00:01:17,640
That's a model of a file system that is pretty workable.

16
00:01:17,640 --> 00:01:26,599
And so beet trees are a generalization of balance trees that allow for this.

17
00:01:26,599 --> 00:01:34,359
The idea is to allow not just two or three keys per node, but a large number, like the

18
00:01:34,359 --> 00:01:36,560
number that can fit in a page.

19
00:01:36,560 --> 00:01:42,879
So might be m equals 1,000, m equals 4,000.

20
00:01:42,879 --> 00:01:49,399
And we've got to have at least two keys at the root.

21
00:01:49,399 --> 00:01:55,560
And the only other restriction is that we don't want the nodes to get too empty.

22
00:01:55,560 --> 00:01:59,840
So we can have less than m, but we want to have at least m over 2.

23
00:01:59,840 --> 00:02:07,439
And as you'll see, this is a generalization of two three trees that allows us to build

24
00:02:07,439 --> 00:02:11,240
balance trees that are very, very shallow.

25
00:02:11,240 --> 00:02:17,520
Typically, these are set up so that all the data is in the external nodes.

26
00:02:17,520 --> 00:02:20,320
And so the external nodes have node links.

27
00:02:20,320 --> 00:02:23,080
They just have keys.

28
00:02:23,080 --> 00:02:27,280
And they're in kept in sorted order.

29
00:02:27,280 --> 00:02:31,600
So for example, this is an external m equals 6.

30
00:02:31,600 --> 00:02:34,320
This is an external 5 node.

31
00:02:34,320 --> 00:02:35,719
So it's got 5 keys.

32
00:02:35,719 --> 00:02:40,439
It's got room for one more temporary one.

33
00:02:40,439 --> 00:02:45,759
And then what will happen is when you insert into a full node, it'll split in the same

34
00:02:45,759 --> 00:02:46,759
as before.

35
00:02:46,759 --> 00:02:52,719
And then we'll pass the split up causing a split up higher.

36
00:02:52,719 --> 00:03:03,400
So the red keys and the internal nodes are copies of keys down below that direct the search.

37
00:03:03,400 --> 00:03:09,360
And that's a little extra detail that just makes the implementation a little bit easier.

38
00:03:09,360 --> 00:03:12,320
And that's the way that it's usually done.

39
00:03:12,320 --> 00:03:20,280
So for now, the main idea is that it's like a two three tree, except that we allow way more

40
00:03:20,280 --> 00:03:22,120
keys per node.

41
00:03:22,120 --> 00:03:25,440
And then when a node gets filled, it splits into two.

42
00:03:25,440 --> 00:03:27,840
So a node's always between half full and full.

43
00:03:27,840 --> 00:03:32,280
So m is 1,000, it splits into, and then each side has 500.

44
00:03:32,280 --> 00:03:38,920
And then we can use that property of the trees in the analysis to show that it's not going

45
00:03:38,919 --> 00:03:43,239
to be very many probes to get to any key.

46
00:03:43,239 --> 00:03:49,599
So the search is just the same as we've been doing, just generalized.

47
00:03:49,599 --> 00:03:52,959
There's a list of keys at every internal node.

48
00:03:52,959 --> 00:04:03,279
And that key tells you that then links for every key that give you a place where your key

49
00:04:03,279 --> 00:04:05,319
would have to be.

50
00:04:05,319 --> 00:04:12,879
So this link is for all the keys in the B tree that are between this key and the next one.

51
00:04:12,879 --> 00:04:14,879
In every case, it's that way.

52
00:04:14,879 --> 00:04:19,600
So if we're looking for E and this B tree, we'll go down the left link.

53
00:04:19,600 --> 00:04:23,600
And then we'd go down the second length because E is between D and H. And that's just the

54
00:04:23,600 --> 00:04:24,839
way it organized.

55
00:04:24,839 --> 00:04:27,800
And then when you get to an external node, you just look for it.

56
00:04:27,800 --> 00:04:31,279
And so that's all search is terminated in external node.

57
00:04:31,279 --> 00:04:35,679
And otherwise, it's just a generalization of what we just did.

58
00:04:35,679 --> 00:04:38,719
And insertion works the same way.

59
00:04:38,719 --> 00:04:42,039
We get to the bottom and then we split.

60
00:04:42,039 --> 00:04:46,719
So let's look at just inserting A into this B tree.

61
00:04:46,719 --> 00:04:49,559
It comes into the node on the left.

62
00:04:49,559 --> 00:04:53,079
And then that makes that temporarily over full.

63
00:04:53,079 --> 00:04:54,599
It's got one too many.

64
00:04:54,599 --> 00:04:57,000
So we split it into two nodes.

65
00:04:57,000 --> 00:05:02,879
And that causes us to add a new entry into this internal node.

66
00:05:02,879 --> 00:05:06,759
In this case, it's a C, which is the smallest one in this new page.

67
00:05:06,759 --> 00:05:07,759
And that has to be added.

68
00:05:07,759 --> 00:05:09,560
And we can move all those over.

69
00:05:09,560 --> 00:05:12,240
There's plenty of time by the memory model.

70
00:05:12,240 --> 00:05:13,720
We're counting the number of times.

71
00:05:13,720 --> 00:05:14,720
We access the pages.

72
00:05:14,720 --> 00:05:17,040
We get to move things around for free.

73
00:05:17,040 --> 00:05:21,959
You could have some hybrid structure where you use something different from the internal

74
00:05:21,959 --> 00:05:22,959
model.

75
00:05:22,959 --> 00:05:25,279
But usually, it's fine just to do that.

76
00:05:25,279 --> 00:05:27,639
Now that one becomes over full.

77
00:05:27,639 --> 00:05:29,919
So it has to split.

78
00:05:29,919 --> 00:05:35,119
And we have to create a new root just in the same way as we've been doing.

79
00:05:35,119 --> 00:05:41,239
So without seeing all the details, you can understand that the same basic idea is going

80
00:05:41,239 --> 00:05:49,119
to work in this situation where we're dealing with much, much more memory.

81
00:05:49,120 --> 00:05:56,280
And so the end result is that a search or an insertion in a B tree of order M, that's

82
00:05:56,280 --> 00:06:03,319
where we're putting M keys per page, requires between log base M minus 1 M and log base

83
00:06:03,319 --> 00:06:05,959
M over 2 M probes.

84
00:06:05,959 --> 00:06:07,959
And that's going to be a really small number.

85
00:06:07,959 --> 00:06:14,600
So say M is 1,000, log base M over 2 is this log base 500.

86
00:06:14,600 --> 00:06:18,759
So what power do you have to raise 500 to get bigger than N?

87
00:06:18,759 --> 00:06:22,399
In practice, that's going to be like 4 or 5.

88
00:06:22,399 --> 00:06:30,560
And we can keep the root page in memory so that it means for any conceivable application,

89
00:06:30,560 --> 00:06:33,800
you can get to any piece of data.

90
00:06:33,800 --> 00:06:39,240
Even if it's trillions of pieces of data, it's huge, huge file.

91
00:06:39,240 --> 00:06:44,039
You can get to any one with only 5 or 6 probes.

92
00:06:44,039 --> 00:06:45,039
That's quite amazing.

93
00:06:45,040 --> 00:06:51,600
It's really a astounding example of algorithmic technology doing something that you wouldn't

94
00:06:51,600 --> 00:06:56,240
really necessarily think that you could do so easily.

95
00:06:56,240 --> 00:07:02,400
Maintain dynamic search symbol table with trillions of keys so that you can get to any key

96
00:07:02,400 --> 00:07:04,800
just by looking 5 or 6 places.

97
00:07:04,800 --> 00:07:09,160
But that's what B trees provide for us.

98
00:07:09,160 --> 00:07:15,240
This is a simulation that shows a growing B tree.

99
00:07:15,240 --> 00:07:19,439
So when a page at the top, there's just one page that fills up.

100
00:07:19,439 --> 00:07:22,000
When it fills up, it's red.

101
00:07:22,000 --> 00:07:24,520
And that splits into two half pages.

102
00:07:24,520 --> 00:07:28,000
And then keys get added on one side or the other.

103
00:07:28,000 --> 00:07:34,160
So each line in this table, some page is getting a new key.

104
00:07:34,160 --> 00:07:37,080
And eventually one of them fills up and splits.

105
00:07:37,079 --> 00:07:39,000
Now we have three pages.

106
00:07:39,000 --> 00:07:42,560
And we keep going eventually one of them fills up and splits.

107
00:07:42,560 --> 00:07:43,560
Now we have four pages.

108
00:07:43,560 --> 00:07:48,079
And now this time the first one fills up and splits and so forth.

109
00:07:48,079 --> 00:07:51,680
So the black is the occupied part of the page.

110
00:07:51,680 --> 00:07:54,479
The white is the unoccupied part.

111
00:07:54,479 --> 00:07:58,000
And full the page about to split then right below there's two pages.

112
00:07:58,000 --> 00:08:04,799
So this shows the process of building a large B tree.

113
00:08:04,800 --> 00:08:08,120
And you can see the amount of black.

114
00:08:08,120 --> 00:08:10,240
It's kind of half empty.

115
00:08:10,240 --> 00:08:13,759
It's a little more than half empty, usually analysis shows.

116
00:08:13,759 --> 00:08:18,160
And people have variance in these algorithms that keep it

117
00:08:18,160 --> 00:08:24,639
much more than half empty if that kind of space is a consideration.

118
00:08:24,639 --> 00:08:29,240
So as I've mentioned, red black trees and beet trees

119
00:08:29,240 --> 00:08:32,919
are widely used as system symbol tables.

120
00:08:32,919 --> 00:08:37,120
The Java implementation of tree map and tree set is red black trees.

121
00:08:37,120 --> 00:08:42,719
C++ standard template library uses red black trees.

122
00:08:42,719 --> 00:08:48,719
And it's also used in the Linux kernel and in many other systems.

123
00:08:48,719 --> 00:08:50,839
B trees, there's many different variants

124
00:08:50,839 --> 00:08:56,199
that give different characteristics of space usage

125
00:08:56,199 --> 00:09:00,079
and other characteristics.

126
00:09:00,080 --> 00:09:07,639
And most databases nowadays that you might use SQL or Oracle's database

127
00:09:07,639 --> 00:09:12,560
and others are based on some variant of B trees

128
00:09:12,560 --> 00:09:15,759
because they're so, so effective.

129
00:09:15,759 --> 00:09:19,120
But you really know that your data structure algorithm

130
00:09:19,120 --> 00:09:23,400
is used by a lot of people when it appears in the popular culture.

131
00:09:23,400 --> 00:09:27,200
My friend, Philippe Flajolet, who recently

132
00:09:27,200 --> 00:09:32,520
died, was a famous French mathematician, sent me an email.

133
00:09:32,520 --> 00:09:35,120
Late one night, he was quite excited because he

134
00:09:35,120 --> 00:09:43,520
was watching a rerun of an English, actually, Canadian TV show on French TV.

135
00:09:43,520 --> 00:09:45,400
I didn't know he spent his time doing that,

136
00:09:45,400 --> 00:09:48,920
but he was very excited because he saw this clip.

137
00:09:48,920 --> 00:09:50,000
It was the red door again.

138
00:09:50,000 --> 00:09:51,840
I thought the red door was a storage container.

139
00:09:51,840 --> 00:09:53,440
But it wasn't red anymore with black.

140
00:09:53,440 --> 00:09:55,040
So red turns into black means what?

141
00:09:55,039 --> 00:09:57,719
The budget deficits are red ink, black ink.

142
00:09:57,719 --> 00:09:59,959
It could be from a binary search tree.

143
00:09:59,959 --> 00:10:03,360
The red black tree tracks every simple path from a node to a descent

144
00:10:03,360 --> 00:10:05,519
of leaf that has the same number of black nodes.

145
00:10:05,519 --> 00:10:08,039
Does that help you with the ladies?

146
00:10:08,039 --> 00:10:11,240
So not only is there some excitement in that dialogue,

147
00:10:11,240 --> 00:10:14,240
but it's also technically correct, which you don't often find

148
00:10:14,240 --> 00:10:17,719
with math and popular culture or computer science.

149
00:10:17,719 --> 00:10:20,639
Red black tree tracks every simple path from a node

150
00:10:20,639 --> 00:10:23,959
to a descendant leaf with the same number of black nodes.

151
00:10:23,960 --> 00:10:25,519
They got that right.

152
00:10:25,519 --> 00:10:27,280
And that's also true of B-trees.

153
00:10:27,280 --> 00:10:31,200
And both of these methods are very effective and widely used.

