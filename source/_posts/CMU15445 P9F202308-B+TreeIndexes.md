---
title: CMU15445 P9F202308 B+TreeIndexes
---

1
00:00:00,000 --> 00:00:28,000
All right, let's give TGHPL a round of applause.

2
00:00:28,000 --> 00:00:35,000
How are you doing? How's your girlfriend?

3
00:00:35,000 --> 00:00:38,000
That was a PS for the season.

4
00:00:38,000 --> 00:00:42,000
GMAB? I mean, yeah, it's on board next week and so yeah, she's...

5
00:00:42,000 --> 00:00:44,000
You gotta fix that.

6
00:00:44,000 --> 00:00:47,000
Okay, all right, let's let's go today.

7
00:00:47,000 --> 00:00:49,000
So I'm gonna plow right through everything.

8
00:00:49,000 --> 00:00:53,000
So again, quick reminder of coming events to now correct dates.

9
00:00:53,000 --> 00:00:59,000
So today at 430 over Zoom, we're gonna have the curfonder of Postgres ML.

10
00:00:59,000 --> 00:01:04,000
Basically a modified version of Postgres or it's not modified.

11
00:01:04,000 --> 00:01:05,000
Postgres is modified there.

12
00:01:05,000 --> 00:01:14,000
Building off the extension system and API in Postgres to support machine learning frameworks and large language models directly inside of Postgres.

13
00:01:14,000 --> 00:01:16,000
She's gonna talk about the stuff that they've been building.

14
00:01:16,000 --> 00:01:21,000
Next week, we have probably the one of the bigger vector database companies come together to talk, weeveate.

15
00:01:21,000 --> 00:01:24,000
And then after that, it's gonna be feature form.

16
00:01:24,000 --> 00:01:28,000
And after feature form is feature base, right? Same name, different systems.

17
00:01:28,000 --> 00:01:32,000
Okay, and again, this is optional by all means attend if you want.

18
00:01:32,000 --> 00:01:40,000
And then as I post on Piazza, we'll sending out an email to the Davis friends, companies like these with everyone's CVs if you upload it yesterday.

19
00:01:40,000 --> 00:01:42,000
Okay? All right.

20
00:01:42,000 --> 00:01:45,000
So last class, we talked about hash tables.

21
00:01:45,000 --> 00:01:56,000
And we talked about how this important data structure that's gonna give us this nice 01 average time complexity to do lookups matching keys to values.

22
00:01:56,000 --> 00:02:02,000
And we spent time talking about how there was this different teaching between static and dynamic hashing schemes.

23
00:02:02,000 --> 00:02:05,000
Like static ones, you sort of fix size number slots.

24
00:02:05,000 --> 00:02:14,000
Whereas the extendable hashing, chain hashing, and linear hashing all had the ability to grow incrementally over time to accommodate more keys than you originally envisioned.

25
00:02:15,000 --> 00:02:20,000
So the main takeaway from last class should be we spent most of our time talking about how to deal with the complex.

26
00:02:20,000 --> 00:02:25,000
If two keys hash, two different keys hash to the same location, what do you do?

27
00:02:25,000 --> 00:02:35,000
And then we mostly talk about how these hash tables are primarily gonna be used in most systems for internal data structures, like your page table and project one.

28
00:02:35,000 --> 00:02:41,000
Or the page directory, or the other things keeping track of like what's the state of the database system itself while we're running?

29
00:02:41,000 --> 00:02:45,000
We'll see hash tables again when we talk about how to join sufficiently.

30
00:02:45,000 --> 00:02:49,000
But again, for the most part, these are primarily used for internal data structures.

31
00:02:49,000 --> 00:02:52,000
So today's class, and I'll talk about B plus trees.

32
00:02:52,000 --> 00:03:00,000
And these are gonna be primarily the default choice when you wanna have an index in a relational database system.

33
00:03:00,000 --> 00:03:07,000
So if you call create index, you know, 99% of the time in most systems, you'll be getting something that looks like a B plus stream.

34
00:03:08,000 --> 00:03:17,000
Then we'll talk about, so we'll first go over a high level overview of what a B plus tree looks like, what makes it, what's the plus and B plus tree versus regular B tree.

35
00:03:17,000 --> 00:03:21,000
And then we'll talk about some basic design choices, when we actually wanna build one.

36
00:03:21,000 --> 00:03:26,000
And then we'll finish up to the time we have, to the extent that we have time at the end,

37
00:03:26,000 --> 00:03:31,000
talk about all the different ways you can actually optimize and improve performance of these different systems.

38
00:03:31,000 --> 00:03:34,000
And the examples of real systems are actually doing today.

39
00:03:34,000 --> 00:03:36,000
Okay?

40
00:03:36,000 --> 00:03:40,000
So the first thing I've got to discuss is like, what is a B plus tree?

41
00:03:40,000 --> 00:03:45,000
And so the B plus tree is in a sort of category of data structures called B trees.

42
00:03:45,000 --> 00:03:53,000
And we're sort of confusing about this in the database literature, or different database systems, is that there's the class of the data structure called B trees.

43
00:03:53,000 --> 00:03:56,000
And then there's a specific data structure called a B tree.

44
00:03:56,000 --> 00:04:03,000
And then some database systems are actually using B plus trees, but they're gonna call themselves a B tree.

45
00:04:03,000 --> 00:04:07,000
So if you go look at the Postgres code, they're gonna refer to their data structure as a B tree.

46
00:04:07,000 --> 00:04:14,000
But as far as I can tell, it's a B plus tree with some modern techniques like from the B-link tree.

47
00:04:14,000 --> 00:04:20,000
So it's sort of this, when you say B plus tree, the tip of you're gonna mean a bunch of these other different things.

48
00:04:20,000 --> 00:04:30,000
So there is no original paper on the B plus tree, actually, well, the one that everyone cites is this one from 1979.

49
00:04:31,000 --> 00:04:36,000
By the guys at IBM talking about the, what they call the ubiquitous B tree.

50
00:04:36,000 --> 00:04:40,000
And in this, it is scribe, hey, there's this, the different variants.

51
00:04:40,000 --> 00:04:44,000
But the most common one that's gonna be used for our database systems is gonna be a B plus tree.

52
00:04:44,000 --> 00:04:49,000
And then they cite some kind of IBM tech report that I have not been able to find.

53
00:04:49,000 --> 00:04:53,000
I didn't look that hard, but it doesn't show up right away in Google.

54
00:04:53,000 --> 00:04:59,000
That's the one where they talk about the original B plus tree.

55
00:04:59,000 --> 00:05:12,000
The original authors of what the B plus tree work, this guy of Bayer and the Crayette, they never actually define what the B means in B plus tree.

56
00:05:12,000 --> 00:05:19,000
Typically, people say it's for balanced, broad, bushy, the guy's name is Bayer or B-A-E-Y-E-R.

57
00:05:19,000 --> 00:05:22,000
So it couldn't even have to have himself.

58
00:05:23,000 --> 00:05:29,000
This data structure actually developed at Boeing, like the airplane company, could have been Boeing tree.

59
00:05:29,000 --> 00:05:35,000
Nobody really knows, but typically people, when you say B tree, people typically mean balanced.

60
00:05:35,000 --> 00:05:38,000
There's another variant called B-Link tree.

61
00:05:38,000 --> 00:05:44,000
And as I said, there'll be the sort of classic B plus tree, but nobody implements exactly as it's defined there.

62
00:05:44,000 --> 00:05:46,000
People are gonna bar bits and pieces of it.

63
00:05:47,000 --> 00:05:54,000
So, in particular, what they're gonna borrow is some ideas from this B-Link tree paper that actually came from here at CMU in 1981, a certain guy by Phil Lehman,

64
00:05:54,000 --> 00:05:59,000
that dude still works in the Dean's office at CMU on the fifth floor.

65
00:05:59,000 --> 00:06:06,000
And if you go look at the Postgres source code in the directory where they talk about their B tree, notice they say B tree instead of B plus tree,

66
00:06:06,000 --> 00:06:12,000
and they say is it NB tree because it's a non-balanced B plus tree, but we'll get to that later.

67
00:06:12,000 --> 00:06:21,000
But yeah, right here in the circle, they say, oh yeah, this is a correct implementation, correct is always important, of leaving a Yow's paper from the B-Link tree from 1973.

68
00:06:21,000 --> 00:06:24,000
So that's kind of cool.

69
00:06:24,000 --> 00:06:26,000
But again, we're gonna focus primarily on this one.

70
00:06:26,000 --> 00:06:34,000
We'll see, if you have time, I'll talk about the B epsilon tree at the end, and then the B W tree is a thing that a Microsoft is a lock free version of a B plus tree.

71
00:06:34,000 --> 00:06:38,000
We actually implemented that here at CMU and was not easy.

72
00:06:38,000 --> 00:06:41,000
And we have an open source implementation of that.

73
00:06:41,000 --> 00:06:54,000
Okay. So the B plus tree is going to be a self-balanced order tree that's going to allow us to do searches and scrunch will access and insertions and solutions all in log n time, right?

74
00:06:54,000 --> 00:06:57,000
Because the log n is going to be the height of the tree.

75
00:06:58,000 --> 00:07:12,000
And so the difference between what we'll describe here to be plus tree versus a generic binary search tree is that the nodes in our data structure can have obviously more than two keys.

76
00:07:12,000 --> 00:07:18,000
And the reason why we're gonna want this is because, again, we want to convert, we want to minimize amount of random Iow we're doing.

77
00:07:18,000 --> 00:07:23,000
So we want to maximize amount of scrunch will Iow and the B plus tree is going to be perfect for us to do this.

78
00:07:23,000 --> 00:07:29,000
Because when we land and I know that's essentially fetching in a page, we're going to have as many keys as we can inside that.

79
00:07:29,000 --> 00:07:34,000
Before we have to move on to grab the next page from disk.

80
00:07:34,000 --> 00:07:45,000
Right? So, thinking back way back in the 1970s when harder was terrible, like you had a middle amount of RAM, but your disk was also super slow.

81
00:07:45,000 --> 00:07:53,000
So a B plus tree is going to allow you to convert when you do these lookups and from random Iow into sequential access.

82
00:07:53,000 --> 00:08:01,000
Right? Because we're still following the leaf nodes or sorry, follow the tree down to the leaf nodes and once you're down there, you never go back up.

83
00:08:01,000 --> 00:08:04,000
Not entirely true, but for up purposes now, we'll assume that's the case.

84
00:08:04,000 --> 00:08:09,000
And then I can scan along the leaf nodes to find the data I'm looking for.

85
00:08:09,000 --> 00:08:11,000
Right?

86
00:08:12,000 --> 00:08:18,000
So more formally, we can say that a B plus tree is going to be M way search tree with the following properties.

87
00:08:18,000 --> 00:08:26,000
First is that it's going to be perfectly balanced, meaning that the every leaf node in our tree structure is going to have the same depth.

88
00:08:26,000 --> 00:08:31,000
It means the same number of levels down from the root to that leaf node.

89
00:08:31,000 --> 00:08:38,000
And again, post-gust is going to violate this little bit, some people do, but for the very beginning, assume that's the case.

90
00:08:39,000 --> 00:08:44,000
We also have a rule that every node other than the root has to be at least half full.

91
00:08:44,000 --> 00:08:56,000
So if I can have M keys in my inner node, I need to have at least half a number of nodes, half a number of keys as possible, up to the maximum number.

92
00:08:57,000 --> 00:09:03,000
If I go below that threshold, if I have the go below, being less than half full, then I have to do some merging.

93
00:09:03,000 --> 00:09:08,000
Again, we can tweak that requirement later on.

94
00:09:08,000 --> 00:09:12,000
And so then the root to be special case, we can ignore it for now.

95
00:09:12,000 --> 00:09:18,000
And then every inner node with at least keys, they can have at least K plus one non-nulled children.

96
00:09:18,000 --> 00:09:32,000
Meaning I could have some locations where I could or possible pointers to leaf nodes are nodes below me when I'm an inner node, but I don't have to have the max number.

97
00:09:32,000 --> 00:09:34,000
So this is all math. Let's look at example.

98
00:09:34,000 --> 00:09:41,000
So here's a really simple, like two way B plus three.

99
00:09:42,000 --> 00:09:52,000
And we can define the root node at the top, and then their inner nodes are just because we only have three levels, the inner nodes are just the ones in the middle, and then the leaf nodes are the things at the bottom.

100
00:09:52,000 --> 00:10:01,000
So within a node itself, we're going to have this sort of alternating pattern between a pointer to another node and then a key.

101
00:10:01,000 --> 00:10:09,000
And then in the leaf nodes, they'll be the value that we're trying to store for this for a given key.

102
00:10:09,000 --> 00:10:17,000
And for now, we're not going to find the value is, but you can think of it like potentially the record ID to point to the actual two pull is some page number, page number and offset.

103
00:10:17,000 --> 00:10:24,000
Or if it's a case of like my SQL or SQL light, it could actually be the two pull itself. But for now, we can ignore that.

104
00:10:24,000 --> 00:10:32,000
And so the way to think about these numbers here in the inner nodes and the root nodes, that these are essentially guide posts that tell you which path you want to go down.

105
00:10:32,000 --> 00:10:43,000
So at the root node here, we only have one key. It's 20. So if you're going to go left to it, it's any value that's going to any key value that's going to be less than 20. And then we're going to write for a greater than or equal to.

106
00:10:43,000 --> 00:10:53,000
Same thing. The next one, I have 10 here, less than 10 goes here, greater than equal to 10 goes on the other side.

107
00:10:53,000 --> 00:11:10,000
So what makes, so this is sort of what I'm describing so far, this is a basic B plus tree. But what I was saying before that they have this, or barring ideas from other papers like the B link tree is that the nodes are also have sibling pointers at every level.

108
00:11:10,000 --> 00:11:20,000
So I think the textbook, my only show them at the leaf nodes, Postgres puts them in the middle node, the internals as well. And I think the regional B link paper had the internals as well.

109
00:11:20,000 --> 00:11:36,000
And so the reason why this matters is again, if I'm doing research, like give me all the keys greater than equal to six, I could reverse down the, you know, this side of the tree, get to the bottom. And now I can rip through along the leaf nodes and never have to go go back up.

110
00:11:36,000 --> 00:11:45,000
We won't talk about multi threading just yet, but like the having to get parent lock or latches on your parents doing on the skin along, that's going to be expensive.

111
00:11:45,000 --> 00:11:50,000
So if I can just keep down the lowest level I need to go, then I can move more quickly.

112
00:11:50,000 --> 00:12:02,000
And again, if it's random IO, the sucks, but if I get down here, assuming all these pages are sequentially or contiguous on each other on disk, then that's all squintio the scan across. Yes.

113
00:12:02,000 --> 00:12:04,000
What's the point of having these in the internals?

114
00:12:04,000 --> 00:12:24,000
Yeah, it's what's the point of having these in the internals? It helps you when you do split the merges, right? If I know I have to, like if I want to steal something to say, like I, if I delete 10 say 10 that's deleted instead of having to reorganize the entire tree, I could follow the sibling pointer, maybe take a key from this guy and bring it over.

115
00:12:24,000 --> 00:12:25,000
Yes.

116
00:12:25,000 --> 00:12:38,000
What is the question? What is actually a node pointer? Yeah, like what like these red lines? No, not the sibling pointer, so the node pointer, like so.

117
00:12:38,000 --> 00:12:49,000
I'll show the next slide. You're not going to lay this out exactly. You wouldn't lay this out in the disk exactly. I'm describing, but the thing of it is, like I have the key here 20 is that's this part.

118
00:12:49,000 --> 00:12:57,000
And then the node pointer is saying, if you're looking for a key that's less than 20, follow this pointer and you go down here and find it.

119
00:12:57,000 --> 00:13:01,000
And in our world, in a database system that's on disk, it's just a page ID.

120
00:13:01,000 --> 00:13:04,000
We also have to store the pointer to the other side, right?

121
00:13:04,000 --> 00:13:05,000
Correct, yes.

122
00:13:05,000 --> 00:13:12,000
Yeah, so just trying, yeah, this is the visualization people usually show.

123
00:13:12,000 --> 00:13:18,000
Right, so the nodes themselves are going to be basically a raise of key value pairs.

124
00:13:18,000 --> 00:13:25,000
And again, the keys are going to be derived from whatever the attribute that the index is based on from the table.

125
00:13:25,000 --> 00:13:33,000
So I say I build an index on table food columns, ABC, the key itself will be copies of the values for every single table in ABC.

126
00:13:34,000 --> 00:13:39,000
So you can sort of think the index is like a replica of the table that you're trying to index.

127
00:13:39,000 --> 00:13:47,000
And it's organized in such a way in an ordered manner that allow you to do these efficient, efficient log-and-look ups.

128
00:13:47,000 --> 00:13:50,000
Right, in the relational model, the tables are could potentially be unsorted.

129
00:13:50,000 --> 00:13:54,000
We'll violate that in a few more slides, but like the table could be unsorted.

130
00:13:54,000 --> 00:13:58,000
And so this index is way to have the fast sort of access.

131
00:13:59,000 --> 00:14:05,000
And of course, now only the covers a database system and we'll see this later in the semester has to make sure that your index is in sync with the table.

132
00:14:05,000 --> 00:14:15,000
Right, meaning if I update or I insert a tuple into my table, I want to automatically update my indexes and the database system will do this for you and make sure everything is consistent in sync.

133
00:14:15,000 --> 00:14:19,000
Again, we won't focus on that in this class.

134
00:14:20,000 --> 00:14:29,000
The values can differ depending on where the internote or leaf node.

135
00:14:29,000 --> 00:14:33,000
If it's internote, the value is a pointer to some page below us.

136
00:14:33,000 --> 00:14:38,000
If it's the leaf node, then it's going to be either again the pointer to the tuple.

137
00:14:38,000 --> 00:14:46,000
I'm using the pointer not in the memory address term, I'm meaning like in page ID, all summer, the record ID, or it could be the actual tuple itself.

138
00:14:47,000 --> 00:14:52,000
The arrays within the nodes themselves are typically kept in sorted order, but they don't have to be.

139
00:14:52,000 --> 00:14:55,000
And then there's this issue of how do you deal with null keys.

140
00:14:55,000 --> 00:15:02,000
Right, because again, assume that if the index are trying to build the index are trying to build using B plus tree.

141
00:15:02,000 --> 00:15:06,000
If it's non-unique, there could be null values. We have to put the null somewhere.

142
00:15:06,000 --> 00:15:09,000
So typically you either put them all at the end or all at the beginning.

143
00:15:09,000 --> 00:15:14,000
And actually when you create indexes in some systems, you actually define where you want them to be first or after.

144
00:15:14,000 --> 00:15:19,000
Because depending on what your query is, you may want to not see the nulls first, to me when I see them at the end.

145
00:15:19,000 --> 00:15:21,000
And it depends on applications.

146
00:15:21,000 --> 00:15:28,000
Another important thing also too is that the going back here, there's only sibling pointers and pointers going down.

147
00:15:28,000 --> 00:15:31,000
There's no pointers going back up.

148
00:15:31,000 --> 00:15:42,000
And the reason is why we'll see this more in the next class is when we start taking latches on these nodes, we don't want to have one thread going this way from the top down, another thread going from the bottom top.

149
00:15:43,000 --> 00:15:46,000
Because that's going to have deadlocks. Now the sibling pointers are going to have this issue too.

150
00:15:46,000 --> 00:15:53,000
And we'll see how to handle that. But by avoiding having the pointers going in two directions between different levels, it's one less thing we have to worry about.

151
00:15:53,000 --> 00:16:00,000
Because we don't need the way we're going to do splits and merges. It's not like an AVL tree where you have to do rotations and all that.

152
00:16:00,000 --> 00:16:02,000
We're not going to do any of that.

153
00:16:02,000 --> 00:16:06,000
So I may say it's easier. Not really.

154
00:16:06,000 --> 00:16:08,000
But they both suck. Both hard.

155
00:16:09,000 --> 00:16:18,000
So here's what our node looks like. And somewhere in the, assuming this is a page, we're going to have this array of key value pointers, our keys and values.

156
00:16:18,000 --> 00:16:28,000
And then we'll have these pointers here that will be just a page ID to the previous one and to the next one along the R level.

157
00:16:29,000 --> 00:16:40,000
The key value pairs could either be sorted one after another. If it's a, if it's an inner node, then the values would just be pointers and record IDs.

158
00:16:40,000 --> 00:16:50,000
We could also sort them separately. And this is probably this common approach. You would have the key sort of in one array and then the value sort is separately in another array.

159
00:16:50,000 --> 00:16:57,000
And then the whatever offset you are in the, in the, you know, in a key array that corresponds to some offset in the, in the value, right?

160
00:16:57,000 --> 00:17:02,000
It's almost like the column store stuff we said before. You can do simple arithmetic to decide how to jump around.

161
00:17:02,000 --> 00:17:07,000
VAR charts messed that up, but you also, you just maintain an offset table to keep track of these things.

162
00:17:07,000 --> 00:17:09,000
Right?

163
00:17:10,000 --> 00:17:18,000
And then there's additional meditating and keep track of like, here's a lot of slots I have left in my, in my page, by what level, you know, what level am I looking at?

164
00:17:18,000 --> 00:17:24,000
And that way, at your traversing down, you can just look in the page, say, okay, where am I in the tree?

165
00:17:24,000 --> 00:17:29,000
It's also useful for recovery as well.

166
00:17:29,000 --> 00:17:37,000
So I've already said this. I'm just repeating myself, but the, the, the, the leaf node values themselves could either be record IDs, which is page number and offset to some location.

167
00:17:37,000 --> 00:17:46,000
And then the org could be a tuple data as in the case of index organized storage when we talked about before, like SQLite and my SQL do this by default.

168
00:17:46,000 --> 00:17:51,000
But in like, SQL server and Oracle, you can say, create table and I wanted to be index organized.

169
00:17:51,000 --> 00:17:58,000
Right? And it'll, it'll make the, it'll make a B plus tree. And then the leaf nodes will be the actual just tuples themselves.

170
00:17:58,000 --> 00:18:05,000
Right? You get, for the number two, you only do this for the, the primary key index. Otherwise, you're duplicating data. You don't want to do that. Yes.

171
00:18:05,000 --> 00:18:07,000
I just want to declare a button terminal. Yes.

172
00:18:07,000 --> 00:18:10,000
If it's for record IDs, that's what they'll leave no more.

173
00:18:10,000 --> 00:18:15,000
It's a question. If it's storing record IDs, is it a leaf node or an internet? It's a leaf node.

174
00:18:15,000 --> 00:18:21,000
Because again, like, we'll bring up an example in a second, but like,

175
00:18:22,000 --> 00:18:31,000
come back here. The, the only really keys that exist that like, they're actually corresponded with it's actually in your table are found in the leaf nodes.

176
00:18:31,000 --> 00:18:35,000
So we'll see this in our demo when we like delete and insert keys.

177
00:18:35,000 --> 00:18:41,000
They, the, a key that was deleted may actually still exist in, in an inter node. Right?

178
00:18:41,000 --> 00:18:47,000
So you can't have it like, you couldn't have it be a record ID to point to something because there's that that record may not exist. Right?

179
00:18:47,000 --> 00:18:57,000
In this case here, I have in this inter node here, I have 35, but there's no 35 in the leaf node, meaning at some point this key got 35 inserted into it and then got deleted.

180
00:18:57,000 --> 00:19:03,000
But because the way it got organized and the algorithm to maintain the balance of the tree, I didn't end up removing 35.

181
00:19:03,000 --> 00:19:14,000
So it's still there. So the thing of like all the internoters, GuyPosts, you know, traffic signs or street signs to tell you how to get down to where you need to go in the leaves.

182
00:19:15,000 --> 00:19:16,000
Yes.

183
00:19:16,000 --> 00:19:23,000
I would say that every in the node only has one key, but every node has to have multiple key.

184
00:19:23,000 --> 00:19:29,000
His statement is, is it true to say that every inter node has one key, but every leaf node can have multiple keys.

185
00:19:29,000 --> 00:19:36,000
So this example here, I'm showing two keys per node because I got to make it fit on PowerPoint. Right?

186
00:19:36,000 --> 00:19:41,000
There's nothing about the B plus tree that says you can only have two keys. You can have multiple keys.

187
00:19:49,000 --> 00:19:58,000
In this example, in this example, yeah, that you only need one, but in a real B plus tree, you wouldn't have one key per index per node.

188
00:19:59,000 --> 00:20:00,000
Right?

189
00:20:00,000 --> 00:20:04,000
You can have a limited, right?

190
00:20:04,000 --> 00:20:11,000
And this action, and we'll get this in a second. The slower the disk, the bigger the node you want, because that's more squential I.O.

191
00:20:11,000 --> 00:20:13,000
So you get a hundreds of keys.

192
00:20:16,000 --> 00:20:21,000
There's a limitation on what I can show in PowerPoint, but we'll bring up the demo in a second.

193
00:20:22,000 --> 00:20:24,000
Other questions?

194
00:20:25,000 --> 00:20:30,000
Okay, so I made a big deal of like, okay, we're talking about B plus trees, not B trees.

195
00:20:31,000 --> 00:20:33,000
You may not know what a B tree is.

196
00:20:33,000 --> 00:20:42,000
So the original B tree from 1972 had all the keys and values stored all throughout the tree, sort of like a VL tree, for example.

197
00:20:43,000 --> 00:20:50,000
And it's more space efficient because you never have keys that are that don't correspond to actually think something in your data set.

198
00:20:51,000 --> 00:20:59,000
Like I said before, I could delete record 35, key 35, and I get it'll get removed from the leaf nodes, but it may end up in one of the guide posts.

199
00:21:00,000 --> 00:21:09,000
Or I could have multiple copies of the key going down my internodes to the leaf node, and that's potentially wasting data or wasting space.

200
00:21:10,000 --> 00:21:15,000
So in a B tree, a key only appears once anywhere in the entire tree.

201
00:21:16,000 --> 00:21:23,000
But the problem with that one is that the values, I mean, the record of these pointing to actual two bulls, they can be anywhere in the tree.

202
00:21:24,000 --> 00:21:32,000
And so now if I want to scan along sequentially to get all the keys I need in sort of order, I may have to traverse up and down because I'm basically going to have to do breath for search.

203
00:21:34,000 --> 00:21:39,000
And again, we're not going to talk about latching just yet, but think of like, I basically have to latch the entire tree as I'm going up and down.

204
00:21:40,000 --> 00:21:48,000
Whereas in a B plus tree, because the leaf nodes are only places where values actually are, right, considered like that's the exact copy of what's in the table.

205
00:21:49,000 --> 00:22:00,000
Once I get to the leaf nodes, I don't have to maintain any of the latches from up our parts in the tree, and I can just scan along the leaf leaves and let other threads do whatever they want at the top of a buck, long as it doesn't need for what I'm doing.

206
00:22:01,000 --> 00:22:15,000
Right? So the advantage for a B plus tree over a B tree is that we're going to have better concurrent access, and we're going to maximize or improve our amount of sequential IO we're doing over random IO.

207
00:22:17,000 --> 00:22:18,000
Yes.

208
00:22:18,000 --> 00:22:33,000
So the question is, if the, if the, if the, inner nodes only are only guideposts, why do we have, why do we have sibling pointers?

209
00:22:35,000 --> 00:22:42,000
Because when you're doing split merges, you may need to, do borrow things or merge with your neighbor.

210
00:22:43,000 --> 00:22:47,000
And they may, and they may be, you know, you have the same parent instead of going to a parent, you can go across and get them.

211
00:22:50,000 --> 00:22:52,000
You don't need it. It's just an optimization.

212
00:22:55,000 --> 00:22:57,000
Postgres does it. I actually don't know, I don't know whether my signal does.

213
00:22:58,000 --> 00:23:09,000
Okay. So let's see how we want to do our basic operations. So do an insert. We want to basically, the goal is to find the correct leaf node.

214
00:23:10,000 --> 00:23:17,000
So we're going to basically traverse down, falling of the guideposts get to some leaf node where our, where our keys should be.

215
00:23:18,000 --> 00:23:26,000
And if it has enough space, great. We insert it in sorted order in that leaf node and we're done. If there's not enough space, meaning the keys are going to be in the right place.

216
00:23:27,000 --> 00:23:39,000
And then I'm going to use the keys we have in its full and then node. Then we're going to have to split whatever the leaf node we're trying to insert into, into two nodes divided in half, but half the keys go on one side, half the keys go on the other side.

217
00:23:40,000 --> 00:23:45,000
And then you're going to copy up whatever the middle key is between in the, in the list of keys up to your parent.

218
00:23:46,000 --> 00:23:53,000
And then now you have a new new new guidepost and a new pointer down to the new, the new node you just created, a new leaf node.

219
00:23:53,000 --> 00:24:02,000
And of course this happens recursively, right? If I, if I promote up the middle key that I split on to the parent and that parent is full, well now I got to split the parent.

220
00:24:03,000 --> 00:24:05,000
And that can, that can cascade all the way to the top.

221
00:24:08,000 --> 00:24:20,000
So making, you know, making these slides show this in, in PowerPoint, it's kind of a pain. So I'm going to do, I'm going to bring up this visualization.

222
00:24:20,000 --> 00:24:24,000
So this is a, I think up here.

223
00:24:25,000 --> 00:24:31,000
Let's show you the size. Here we go. Right, so this is a website, the, the, again, the link on the, the link on the slides takes you to the wrong one.

224
00:24:32,000 --> 00:24:38,000
I'll, I'll update it, but look, it's, if you, if you search B plus tree visualization, you'll get this.

225
00:24:39,000 --> 00:24:47,000
So I'm going to do a, a demo of a B plus tree with degree two. So the maximum of the keys per node is two and maximum of our pointers is going to be three.

226
00:24:47,000 --> 00:24:59,000
So the first thing we'll do, we're going to insert two. That lands in our root node. Can I make that bigger? Let's try this height.

227
00:25:02,000 --> 00:25:15,000
200 and then now I can do this. Is that better? Okay. Right. So then we're going to insert six. Right. So again, our, our, this, we only have a root node.

228
00:25:15,000 --> 00:25:20,000
This, we only have a root node. It can hold two keys. So nothing changes here. So now we're going to insert four.

229
00:25:22,000 --> 00:25:30,000
So in this case here, we try to put three keys in our root. We can't do that. So it decides to split on four, makes two new, two new leaf nodes.

230
00:25:31,000 --> 00:25:42,000
And then the middle key is four. So anything less than four goes on this side. Greater than you get a four goes on the other side. So twos on this node over here, this leaf node, and then the four and eight go on the other side.

231
00:25:42,000 --> 00:25:49,000
And in this implementation, they only have a sibling pointer going one direction. Some systems do that. Postgres does both directions.

232
00:25:50,000 --> 00:26:02,000
And it's not wrong. It's done differently. So now I insert five. Right. So I follow four. Four is less than five is greater than greater than you can four. So it would go down to the previous node.

233
00:26:02,000 --> 00:26:13,000
But then I have, I had two keys already in there. So I had to split that key and split that leaf node and made two nodes. And then I put five up there. Okay.

234
00:26:16,000 --> 00:26:19,000
So first, they're good. Okay.

235
00:26:22,000 --> 00:26:25,000
So delete is essentially the reverse of this.

236
00:26:25,000 --> 00:26:36,000
Where we started the route, go down to refine the leaf node where entry, the entry one or move. If it's not there, then we don't do anything. Right. Because you can't delete a key that doesn't exist.

237
00:26:37,000 --> 00:26:47,000
If it is there, then we go ahead and delete it. So if the leaf node we just modified is at least half full, then we're done. Right. We pop out and we don't do anything.

238
00:26:47,000 --> 00:27:08,000
But now if, but if the leaf node after deleting that key goes below our threshold, right. And I'm divided by two minus one, with M's number of keys per node, then we have to redistribute or sorry, the first thing we just tried to redistribute, meaning follow the sibling pointers, find a, another node at the same levels us and steal one of their keys.

239
00:27:08,000 --> 00:27:18,000
Like long as they don't become unbalanced, that's okay. We may have to tweak up above the parent node. Sorry, in the parent node, the, the, the guy post the split point.

240
00:27:19,000 --> 00:27:23,000
But again, that's not that expensive because we would already have the latch for it.

241
00:27:24,000 --> 00:27:34,000
So coming next time. If we can't redistribute, then we had to merge L with one of its siblings, combine those two keys, put it together and then update the parent accordingly. Right.

242
00:27:35,000 --> 00:27:48,000
And again, this is recursive. So if like, if I merge to two nodes together and then I delete a guy post key and my parent and now the parent is less than half full, then I, the, the merge will cascade up. Yes.

243
00:27:49,000 --> 00:27:59,000
What does it feel like if I, if I have two keys, you have one key and you're my sibling, I delete a key and I'm less than half full.

244
00:27:59,000 --> 00:28:13,000
Right. That's a bad example because there's say three keys, right. If you have two keys and I have two keys, I delete a key. I'm like, oh, I'm less than half full and I go try to steal one of your keys. But if you, if I do that to you, then you're less than half full. So I can't.

245
00:28:15,000 --> 00:28:27,000
All right. So let's go back to our demo. Right. So we can go ahead and delete. So let's go ahead and delete eight. Right. Eight at the far end here.

246
00:28:27,000 --> 00:28:56,000
Oh, it was six. Oh, yeah. Sorry. Six. Right. Those are here. Delete six. That's fine. We're still balanced. And it's two keys per two keys per node. And we delete half full. In this case is one. We can go to, we can go to degree four. That looked better. But now say I delete key four in the middle. Right. It basically propagates up and removes it from above.

247
00:28:57,000 --> 00:29:04,000
So let's go to degree four because then you can start seeing the stealing better. Let's do the same thing. So let's do insert one.

248
00:29:04,000 --> 00:29:25,000
So two. Four. Five. Throw split. Now we got there. Six. Eight. Right. And then we'll do nine.

249
00:29:25,000 --> 00:29:43,000
All right. So we're going to go ahead and delete five five in the middle here. And again, at this point here that this node is leap, it will become less than half full. So the first thing it's going to try to do is try to steal from from from one of siblings.

250
00:29:43,000 --> 00:30:12,000
So let's go ahead and delete five. Didn't do that. Why not? Yeah, this. What's that? Yeah, I think it's the four. So I delete four. See what it does. Yeah, guys, look at their steals. Yeah, so this animation doesn't follow the textbook exactly.

251
00:30:12,000 --> 00:30:24,000
But like it's not wrong. It's just like different ways to do things like, you know, how aggressive you want to be on certain optimizations. But as long as you get the highlight of idea that you could steal.

252
00:30:24,000 --> 00:30:29,000
But you still have to update the parent when you steal because that's going to change the boundary points. Yes.

253
00:30:29,000 --> 00:30:47,000
I'm seeing in this. In this. The relation that looks like there's only. Yes, as I said, like in this example here, they have sibling points going in one direction. Postgres and other systems go in both directions, doubly linked list. Yeah. Yes.

254
00:30:47,000 --> 00:31:10,000
So that's a question. I actually know that I don't have an example of that. I know I do. Like in the middle here.

255
00:31:10,000 --> 00:31:20,000
These guys. Yeah, so I think the leaf notes you definitely want pointers to your siblings along this because you want to be able to you need to go along the leaf notes.

256
00:31:20,000 --> 00:31:30,000
If this guy had like, you know, this thing got even bigger. Could you have two parents to two to two notes at the same level have pointers to each other. You know, you know, I'm the same parent.

257
00:31:30,000 --> 00:31:37,000
You could. I don't know actually don't I don't know what postgres does or other systems do.

258
00:31:37,000 --> 00:31:52,000
Yes. Really would have needed because you're like, I'm sorry. If you had the same parent or. If you have the same parents, sorry, you have different parents than you don't need to have a single point because you're always going to emerge.

259
00:31:52,000 --> 00:32:09,000
And everyone, everyone comes up to the root. Like, it may be a case you have to like reorganize everything. Right. See, that may help. But at that point, you're you're latching the whole trees who cares. Yes.

260
00:32:09,000 --> 00:32:14,000
So you don't show the parents. How do you send the data back to the.

261
00:32:14,000 --> 00:32:29,000
So question is if you don't sit sent. If you don't store a pointer to the parent, how do you send data to the parent? Well, we would discuss this next class because basically as you're going down, you keep track of the stack of the nodes you visit as you go down and you keep track of which ones you have the latch for.

262
00:32:29,000 --> 00:32:48,000
So I can go down like if I'm traversing down down here and say and this guy here, I have to I got a split. When I when I come down and get here, I would recognize, hey, I don't have to split. Don't release the latch my parent. So I still have a pointer. I still have it on my stack and get back to.

263
00:32:48,000 --> 00:32:54,000
So it's the internal bookkeeping with the worker as it goes down the threads or goes down the tree.

264
00:32:54,000 --> 00:33:15,000
Yes, again. And they so there will again, what's all that means to be safer is unsafe traversals like you know, like as you go down if you would know like I'm trying to delete something. So as I go down, if I know that no matter whether or not the key I need to need below me, whether it's there or not, I know that.

265
00:33:15,000 --> 00:33:30,000
So I won't have to do a merge or split on this node I'm at right now. So once I go past it, I don't I can release the latch on it because it's considered safe. It won't, no matter what happens below you, it'll never get reorganized. So you don't need to make any of the latch work. That will cover next class.

266
00:33:33,000 --> 00:33:35,000
Okay.

267
00:33:36,000 --> 00:33:52,000
So that's the basic operations for splits and merges. So the B plus three has to treat general B plus three from D plus in databases is going to have a bunch of do a bunch of other stuff we can we couldn't be able to we couldn't do with the hash table.

268
00:33:53,000 --> 00:34:03,000
So if we have in a hash table, the only operation we could do is something equals this key right is the hash key equal to my key I'm looking up on.

269
00:34:03,000 --> 00:34:12,000
You can't do less than we can do greater than we can't do any partial key look up so you have to have the entire key right so if I say I build it next on columns ABC.

270
00:34:12,000 --> 00:34:22,000
I if I only have columns a and b for my key I can't hash that and jump to anything meaningful right because the hash is completely completely random.

271
00:34:22,000 --> 00:34:38,000
But in B plus tree we can do a bunch of tricks where we can potentially only have or I'm not potentially can you can only have parts of the key or certain number of the attributes that your keys based on and still use it for queries.

272
00:34:38,000 --> 00:34:51,000
So again say the index on ABC so obviously I can do a equals one or B equals to and C equals three that's the same thing is the hash thing I have the quality matching for all of the keys that are in my that that index is based on.

273
00:34:51,000 --> 00:34:57,000
I also can do what's called a prefix search where I only have a and B and not see.

274
00:34:57,000 --> 00:35:03,000
Right and we can do the look up define all the matches were for based on the a and B without C.

275
00:35:03,000 --> 00:35:21,000
But we also not all systems do this because it's tricky to do we also can do a suffix look up where we don't have the prefix we have but we have the the suffix of the keys so I don't have a but I have B and C and I can potentially still use my index and do that look up.

276
00:35:21,000 --> 00:35:34,000
Very few systems do this this is hard postgres doesn't do this or cool and I think maybe SQL server can do this right and again for the hash index we have to have the entire key and we always have to be in a quality predicate.

277
00:35:34,000 --> 00:35:45,000
Yes it's hard to handle that yes yeah because you basically need to have like potentially multiple threads at the same time going down and everyone everyone coordinating.

278
00:35:45,000 --> 00:35:57,000
There might be a patent oracle and that person people doing this wouldn't surprise me I don't know they're called skip scans and oracle and that that might be why nobody does nobody else does this.

279
00:35:57,000 --> 00:36:23,000
So again say I have my index on a and B if I want to find key one and two again I use my guide post and bench essentially just looking at the keys the parts of the key in sort of sequential order so first I check is one lesson lesson equal to one and then I check the second part is two lesson equal to three and that tells me that I want to follow down this to this this note here and then I can find the entry I'm looking for.

280
00:36:23,000 --> 00:36:33,000
If I'm doing a prefix search meaning I have the first part of the key but not the remaining part so I have the key on a but not not B.

281
00:36:33,000 --> 00:36:52,000
The way that would work is you basically look at the part that you do have and say is one lesson equal to one yes follow down here and then now I scan along and keep keep evaluating my predicate against all the keys that are in the leaf notes until I have something that violates where I know that one is now is is less than two.

282
00:36:52,000 --> 00:37:09,000
I can't reverse here because it's so in order I know that we never never anything where you know with a key the first part a equals one and then something else for B at this point because they're sort of first on on the first part of the key.

283
00:37:10,000 --> 00:37:27,000
Again the last one for the skip scans basically what happens is you at every single node you evaluate okay what part of the key do I have and then determine what portion of the trees below you have to look at and this example here since I don't have the first part of the key I sent you have to look at everything.

284
00:37:27,000 --> 00:37:35,000
And again in I think in Oracle they can have multiple threads in parallel go down different parts of the tree and then they combine the result together at the end.

285
00:37:36,000 --> 00:38:02,000
It's almost like doing a wildcard search and so we'll see this a little bit in the demo at the end there's this trade off between in the Davis is going to make that like it could say all right well I know something about the statistics of the keys that my index is based on so it probably still is worth me to go look look in the key look in the index but it may decide okay well I don't know anything about what you're trying to ask me to do so I'm not the index is not going to help me I'm just going to do a squandered scan across the entire table.

286
00:38:02,000 --> 00:38:08,000
And that actually may be faster than trying to do multiple probes down the index and combine results together.

287
00:38:08,000 --> 00:38:15,000
Again it's not something the programmer has to deal with this is something we take the SQL query and try to figure this out on our own.

288
00:38:15,000 --> 00:38:20,000
Again we'll cover this after the term.

289
00:38:22,000 --> 00:38:23,000
Yes.

290
00:38:23,000 --> 00:38:42,000
So this question is what is it up to the program inside what index is the make most systems yes so this is a this is an old problem in databases right we I talk about how great the extraction is relational model that like you don't have to worry about how things are actually

291
00:38:42,000 --> 00:38:56,000
stored and all that but the end of the day someone's got to decide what index is you actually need and so there's a long line of research myself here at CMU but like going back to the 1970s and people trying to figure out automatically what index is you need.

292
00:38:56,000 --> 00:39:03,000
And so the commercial systems have built in tools that can help you figure this out my SQL and process do not have that.

293
00:39:03,000 --> 00:39:08,000
Pro scouts will build whatever index you tell you want it will do it for you.

294
00:39:08,000 --> 00:39:12,000
So you want to if you tell one thousand indexes it'll do it.

295
00:39:12,000 --> 00:39:29,000
In SQL server on Azure what they will actually do is they'll spin up a separate instance for your database system try out basically some kind of machine learn to figure out what indexes you actually need and then suggest them to you.

296
00:39:29,000 --> 00:39:47,000
Right. SQL server does all the other interesting things too although in the query optimizer which we'll talk about after midterm your query shows up it starts planning it based on whatever indexes you have but at some point you can also say man I'd be really great if I had to find the index on this tree on this table right now.

297
00:39:47,000 --> 00:39:58,000
It doesn't can build it for you if you potentially but instead of saying it can potentially build it for you just for that query but it also come back and tell you hey by the way if you gave me this index I'd run a lot faster.

298
00:39:58,000 --> 00:40:10,000
So the reason why you may necessarily you know you could build it just for the query and then throw it away because that will only affect that query you may not want to build it and then keep it around because as I said you got to maintain it and you got to keep it in sync with the table.

299
00:40:10,000 --> 00:40:16,000
So you don't want your data is starting like a ton of indexes and now it's going to all my insert updates and leads go slower.

300
00:40:16,000 --> 00:40:22,000
Also to like you know they take storage space take memory space of like there's a cost physical hardware as well.

301
00:40:22,000 --> 00:40:29,000
That's a whole another horn it's nuts we can get into.

302
00:40:29,000 --> 00:40:32,000
Okay.

303
00:40:32,000 --> 00:40:45,000
So the next thing we got to deal with is so we know how to insert updates, deletes or sorry we know to insert and deletes we know how to do basic lookups to find the keys are working where with a prefix searches full key searches or the skip scans.

304
00:40:45,000 --> 00:40:50,000
The next challenge we got to deal with is how do we handle duplicate keys.

305
00:40:50,000 --> 00:40:54,000
So there's two approaches to do this.

306
00:40:54,000 --> 00:41:05,000
Again the issue is going to be like since I want to be able to have everything always and log in right how do I actually want to handle the the applicability of inserting keys.

307
00:41:05,000 --> 00:41:10,000
The duplicates open over again and not violate that that requirement.

308
00:41:10,000 --> 00:41:21,000
So the most common approach is to to maintain sort of a hidden column or hidden attribute in the key with the record ID of the two bold that it's pointing to.

309
00:41:21,000 --> 00:41:33,000
And then that guarantees that every key ends up being unique right if you have a key on four and I've key on four but you have a separate two point I've a separate two point we put our our basic record ID as part of the key.

310
00:41:33,000 --> 00:41:38,000
In addition to the common word based on their index then your form I for end up being unique.

311
00:41:38,000 --> 00:41:49,000
And because I can do that prefix search right don't have to have all the elements of the key to do lookups then this this scheme still works.

312
00:41:49,000 --> 00:42:01,000
The other approach is do overload overflow leaf nodes and basic ideas that the leaf knows themselves if I if I get too full but I know I'm inserting the same key then I just potentially keep building a link list.

313
00:42:01,000 --> 00:42:08,000
And I sort of go down in the depth of the tree again but that violates our log and approach.

314
00:42:08,000 --> 00:42:11,000
Our log log and guarantee.

315
00:42:11,000 --> 00:42:22,000
So here's how we do the the record right so the key now isn't just number one it's one and then followed by the record ID which is the page number and offset.

316
00:42:22,000 --> 00:42:36,000
So now if I want to insert six and six already exists well any time you know even though you might call in SQL insert six but the database says what's going to do is convert that to insert six followed by the page number and slot number.

317
00:42:36,000 --> 00:42:47,000
So now when I get down here since this guy is full I'll just do a split things slide over and then oops sorry.

318
00:42:47,000 --> 00:43:02,000
Yeah so I do things slide over and then now I can insert six right here right again superficially looks like it's just like a keys but again the actual bits themselves are unique.

319
00:43:02,000 --> 00:43:16,000
So of course now if I want to do a delete on six again I would have been you know internally the data system is going to know okay well they don't six followed by this record ID and offset or the page number and offset yes.

320
00:43:16,000 --> 00:43:26,000
What happens when the key is not like the number questions what happens the key is not a number what do you mean because you're inserting six the actual record or.

321
00:43:26,000 --> 00:43:36,000
So yeah so six is the key.

322
00:43:36,000 --> 00:43:55,000
Because I insert into a table right and the table has a has an index on column through column A and the two on the certain for that attribute says the value six right but instead of just putting six in is going to say all right I've already inserted to the table now I have a record ID so when I

323
00:43:55,000 --> 00:44:16,000
insert into the index it's the six and pen it by the bits for the record ID and that guarantees that no many times I insert six it's unique right now if if it's a unique index I like a primary key index or I can declare that it's unique index then I don't want to do this but the still the mechanism still works.

324
00:44:16,000 --> 00:44:25,000
Yes.

325
00:44:25,000 --> 00:44:38,000
The statement is correct this is just essentially a hidden attribute the guarantees that that duplicate keys are are physically unique right because it's the record ID yes that's the trick.

326
00:44:38,000 --> 00:44:59,000
So the overflow notes overflow note leaf notes look like this I insert six I recognize it's full in my leaf node but I also recognize that the thing you're trying to insert already exists in here and therefore it's a duplicate so I just make this overflow page and insert it down here.

327
00:44:59,000 --> 00:45:06,000
Right and I can keep at inserting new things and I keep at pending it along like this.

328
00:45:06,000 --> 00:45:28,000
So this looks sort of similar to the chain hash table before right that like instead of having a hash function tell me what where I landed the start of my linked list I have a tree structure in front of it essentially doing the same thing because now again the you know this violates the log N we have the deal with like okay what if we actually want to split and merge what do we move things.

329
00:45:28,000 --> 00:45:37,000
This makes things way more complicated than the record ID approach and very I don't think any real system actually does this yes.

330
00:45:37,000 --> 00:45:48,000
The question why what's the benefit of this approach now I don't need to store the record ID right do forget you know with the store to part in every single key.

331
00:45:48,000 --> 00:46:02,000
It's potentially easier engineering actually not really makes it harder this is this is bad idea don't do this you could and so you have things back.

332
00:46:02,000 --> 00:46:08,000
Right I think I'm going to talk about cluster indexes these aren't.

333
00:46:08,000 --> 00:46:31,000
I mean it's good for you guys to know this and this exists but I don't spend too much time on it the basic idea is that there's some database systems like let you define what are called cluster indexes on tables where you can allow a the actual table itself the actual tuples themselves even though the racial models on sorted you can say I want the physical tuples on this to be sorted based on the sort of defined by some index.

334
00:46:31,000 --> 00:46:47,000
And in this case here if I if I have a true cluster index that no matter where I insert a new record the the actual heap files themselves will be guaranteed to be in that sort of order.

335
00:46:47,000 --> 00:46:54,000
You sort of think of this again the my sequel sequel light approach where the leaf knows are actually store in the tuples that's automatically cluster index.

336
00:46:54,000 --> 00:47:04,000
But in some database systems where it isn't an in the organized table you can have the sort of being forced by by this kind of index.

337
00:47:04,000 --> 00:47:23,000
Right and so the the advantage of this is that when I start doing when I want to start doing scans assuming I'm not doing index organized storage when I scan along the leaf notes the final two was I'm looking for then I'm guaranteed to get the pages in sort of order basis the final.

338
00:47:23,000 --> 00:47:37,000
The key order right so again as I as I scan this going across I get I get all my entries and I get all my pages and I just read through that squenchly and things go fast.

339
00:47:37,000 --> 00:47:52,000
If you don't have a cluster index then you end up sometimes with a bunch of random I owe the again the the leaf those that could be stores quenchly on disk but when I start doing look ups to get the actual data that the leaf notes are pointing to that could end up being.

340
00:47:52,000 --> 00:48:20,000
And so if I do something really stupid like say I have one free frame of my buffer pool and if I scan along in the order if I fetch the page in the order that they come out of the index I may end up doing a bunch of the redundant I owe were like I fetch a page in process on it because that's the key i'm looking at right now or that I pointed to and then I throw it away get the next page but then a few few more keys later I go fetch the same page I did before.

341
00:48:20,000 --> 00:48:49,000
So I really some optimization to do this is that you don't actually you don't retrieve the tuples as you scan along the leaf nodes as you find them you first do the scan the leaf notes first get your list of all your pages then sort them in by pace based on page ID and then go retrieve them based on this now you should do the bookkeeping to make sure that you you're following along the tuples in the order defined by the index.

342
00:48:49,000 --> 00:49:05,000
That's what you care about but again this is a way to get more squatch IO and reduce the amount of random access yes.

343
00:49:05,000 --> 00:49:25,000
So his statement is why can't just keep track of what I've already fetched in page I don't fetch it again I was giving like a toy example where like I only have one frame so like I can only fetch one page I throw it out and get the next page in this in this toy example right but but thinking a real system you don't think of like one page like I can have maybe.

344
00:49:25,000 --> 00:49:35,000
So I can only get 10 gigabytes of space but my database is one terabyte the table is one terabyte and then you're running that space.

345
00:49:36,000 --> 00:49:51,000
You want to sort them you want to give them page you want to access them in the order that they exist physically on desk and then still do a bookkeeping to make sure that the order of the results are generating match the sort of of the of the index.

346
00:49:51,000 --> 00:49:58,000
Again to reduce amount of wasted IO.

347
00:49:58,000 --> 00:50:15,000
Okay so I want to quickly go through some design choices here how to handle certain things and so a lot of these ideas come from this book which is considered the Bible of bee plusries from this guy girth graphy he's a bunch of the various techniques that we'll discuss this semester.

348
00:50:15,000 --> 00:50:20,000
And again he's called modern be tree techniques and again he's a lot bee plusries but he calls it a be tree.

349
00:50:20,000 --> 00:50:30,000
And actually if you just Google this name of this book it's came out in 2010 it's a great book comes with a lot of these techniques and even more if you just Google you'll find the PDF.

350
00:50:30,000 --> 00:50:37,000
If you like this kind of stuff it's a good read again because it's not like theory it's like here's actually how to implement it in a real system.

351
00:50:38,000 --> 00:50:50,000
Alright the first question is what's going to be the node size. So you can assume in all our diagrams here one node corresponds to one page in our database files in our buffer pool.

352
00:50:50,000 --> 00:51:00,000
But in some systems like an IBM DB to you can actually modify you configure the size of a database page for different tables and different indexes.

353
00:51:01,000 --> 00:51:08,000
And so depending on what your hardware is you may want to set the size the page size of your bee plusries nodes differently.

354
00:51:08,000 --> 00:51:16,000
And so again the slow your disk typically the larger the page you want because again it's going to be better for maximizing swancho IO.

355
00:51:16,000 --> 00:51:21,000
So if you're an old spitting discharge drive you want to page size of like one megabyte.

356
00:51:21,000 --> 00:51:26,000
Now the number of keys that you can fit in a one megabyte page will be defined on size your keys are.

357
00:51:26,000 --> 00:51:30,000
If they're all 8 bit integers then you can store a lot of them.

358
00:51:30,000 --> 00:51:33,000
But more than you actually can have.

359
00:51:33,000 --> 00:51:39,000
But for a net fastest D roughly 8 to 10 kilobytes is considered to be the right size.

360
00:51:39,000 --> 00:51:47,000
And then if you're in memory 512 bytes is considered the right size is within a cache line you keep things very efficient.

361
00:51:47,000 --> 00:52:02,000
If we talked about that that that some systems can actually violate that requirement that every node has to be half full obviously you can't go to more than you can have more keys than you actually store because you run out of space.

362
00:52:02,000 --> 00:52:09,000
But the you can recognize that like okay well most the maybe I don't want to split or so.

363
00:52:09,000 --> 00:52:12,000
Yeah I may want to merge my new it's all the time.

364
00:52:12,000 --> 00:52:26,000
And I can go below that threshold temporarily to see whether something's going to get inserted to then put me above that threshold and avoid having to do this prematurely.

365
00:52:26,000 --> 00:52:34,000
Again this is why posters are going to call their balance they call their B plus tree as a non balanced B plus tree.

366
00:52:34,000 --> 00:52:39,000
And they can violate this requirement.

367
00:52:39,000 --> 00:52:45,000
Next question is how do you want to handle very length keys I think somebody brought this up so the.

368
00:52:45,000 --> 00:52:51,000
We could sort of try to approach it like a calm store we want everything to be fixed length.

369
00:52:51,000 --> 00:52:59,000
So one way to do that is actually don't store the keys themselves in every node you just store pointer to the key like the record ID.

370
00:52:59,000 --> 00:53:03,000
Because that's always going to be the 30 to bits are 64 bits.

371
00:53:03,000 --> 00:53:13,000
And actually this little say space to because you know my keys are all really big I'm not going to store them you know make because again the B plus tree is a copy of what's in the table.

372
00:53:13,000 --> 00:53:19,000
I only have the store to just the pointer to the record ID in the in the notes.

373
00:53:19,000 --> 00:53:24,000
Is that a good idea or bad idea.

374
00:53:24,000 --> 00:53:33,000
This is a good idea because it's caused a lot of non-spongebob.

375
00:53:33,000 --> 00:53:38,000
So I think I like as I'm traversing down my my notes and I got to figure out where I'm going left and right.

376
00:53:38,000 --> 00:53:46,000
I don't have those guide posts in my node I got to go follow the pointer to go get that tuple in that page then do the look up to find what I'm need.

377
00:53:46,000 --> 00:53:51,000
And again while I'm doing this I'm holding latches in my data structure and that's going to be really slow.

378
00:53:51,000 --> 00:53:58,000
Yeah so nobody does this in a dis based system the variant of this of a B plus tree is called T trees.

379
00:53:58,000 --> 00:54:03,000
I figured out the T stands for I think it stands for the dude's name.

380
00:54:03,000 --> 00:54:10,000
In the in the diagrams the nose look like T's but then I think the email he said oh yes the guy's name but whatever.

381
00:54:10,000 --> 00:54:17,000
In memory databases did this in the 80s because they wanted to save space you want to have to duplicate keys in your B plus tree because they didn't have a lot of memory.

382
00:54:17,000 --> 00:54:24,000
And nobody does this now in a real system because it's so expensive to do that other look up it's easier to just copy the key.

383
00:54:24,000 --> 00:54:37,000
You could support very very length nodes where the size of the node can vary within the index and you have to do this because you don't know the size of the you want to have the same potential

384
00:54:37,000 --> 00:54:46,000
keys in every single node but nobody has you may not have enough space to store all those keys within that node.

385
00:54:46,000 --> 00:54:51,000
As far as you know only academic systems do this nobody does this in the real world.

386
00:54:51,000 --> 00:54:56,000
Padding's another approach to handle this was we talked before in in column stores.

387
00:54:56,000 --> 00:54:58,000
Again I think this is rare.

388
00:54:58,000 --> 00:55:19,000
So what you do is that they have a essentially a lot of array a lot of page approach like we saw in table or table pages where you just had this array of pointers within either offsets within the page you're looking at or to another overflow page.

389
00:55:19,000 --> 00:55:30,000
Again it's just like the overflow values we saw before where you just you know that they think I'm looking for is not my page I got to go somewhere else and go get it.

390
00:55:30,000 --> 00:55:42,000
Now I've got to talk about how we actually want to go find the keys once once we land on the node we bring it into memory and we're looking for a key to decide to go left or right or whether we have the match we're looking for in our leaf node.

391
00:55:42,000 --> 00:55:45,000
And then I decide how we're going to do that match.

392
00:55:45,000 --> 00:55:57,000
So the easiest approach is just do a linear scan right just think of like an array doesn't matter if it's sort of the not I just started beginning and I scan along to I find nothing I'm looking for this case here I'm looking for key eight.

393
00:55:57,000 --> 00:56:01,000
It's simple it's dumb it works right.

394
00:56:01,000 --> 00:56:07,000
We can do a little better though with SIMD actually I don't here is taking 418 618.

395
00:56:07,000 --> 00:56:12,000
Nobody okay here doesn't know what SIMD is.

396
00:56:12,000 --> 00:56:33,000
Okay SIMD stands for single instruction multiple data it's a class of instructions you can have on modern CPUs that allow you to basically have like a vector register you put a bunch of values in it and then there's a single instruction to do like do something on it like you can put a bunch of numbers in one vector a bunch of numbers another vector and do add them together and the apple goes into another vector.

397
00:56:33,000 --> 00:56:42,000
We'll cover this when we talk about quick execution but there's a very common technique used in modern systems this is what made snowflake special 10 years ago.

398
00:56:42,000 --> 00:57:02,000
So what I can do is instead of doing looking at every single key one after another to try to find eight I can instead use a SIMD in transit in this case here this is for x86 to do a value of 30 bit integers on and 120 bit registers.

399
00:57:02,000 --> 00:57:20,000
So I just started I'm looking for eight I store eight copies of eight and my SIMD register has four lanes and then now in the single instruction I can do an evaluation of those eight or four eights with the keys in my array and then I'll get a bit mass that says zeros if there's no match one if there's a match.

400
00:57:20,000 --> 00:57:42,000
So in this case here now it's a single instruction to do that evaluation and I can do that way more efficiently than going one after another in this case and then for this one I don't have a match so I got a slide it over do do look at the next one I have to recognize that I only have three keys and not four so I got to play a little tricks and make sure like I don't end up with a false positive but in this case here now I have eight equals eight in that first lane and I have a match.

401
00:57:43,000 --> 00:57:49,000
So I can do this more efficiently than doing this it is still linear but I'm doing batches and the harbor can support that.

402
00:57:52,000 --> 00:58:10,000
Next approach is obviously do binary search assuming it's sorted this is easy you jump in the middle my value is greater than one of the key I land on it's greater less than the one I'm looking for I jump to the next side so far than to I find my match then I'm done this is what most systems will do yes it depends on the heart.

403
00:58:10,000 --> 00:58:19,000
So in postgres there be a kill lights right but again the number of keys you can store in that note it's going to depend on the key with the type of the key is.

404
00:58:23,000 --> 00:58:39,000
So binary search is the most common one the you could do this I don't think any can outside of equity and nobody does this you can do interpolation search and this works if you know there's no gaps in your keys and they're always in monotonically increasing order like if you have a match.

405
00:58:40,000 --> 00:59:01,000
So I have a primary key that's a like an auto increment value like plus one plus one plus one plus one and again I assume I don't have any gaps then it's just simple math to figure out exactly within my array I know the low point I know the main value the max value I know I know number of keys that I have and I can do a simple formula like this to jump exactly to the offset that I need.

406
00:59:01,000 --> 00:59:10,000
So this is the fastest approach faster than binary search faster than Cindy but again you have you can't have gaps to do this so it's rare.

407
00:59:13,000 --> 00:59:25,000
Alright we have 20 minutes left to get through all these optimizations let's see how far we can go okay somebody's pretty obvious the the the pointers ways and the book and the buffer updates those are those are probably most important.

408
00:59:25,000 --> 00:59:54,000
So just like in a column store we should recognize that the keys that are going to be in our in our B plus tree they're going to be in the same value domain because they're all coming from the same same attributes furthermore they're sorted which is even better for compression right so there's a bunch of things we can take advantage of recognizing that the values are going to be very similar to to produce the size of our of the keys we actually have this.

409
00:59:55,000 --> 01:00:19,000
So in this case here we can do what's called prefix compression and we can identify that we're going to have a bunch of keys that are very close to each other in electrical ordering and they're going to have overlapping portions of data so instead of storing complete copies of the keys we just store the common prefix in this case here Rob and then we destroy the remaining suffix that's unique right that's pretty easy that's nice.

410
01:00:19,000 --> 01:00:48,000
Next technique is to do de duplication and the idea here is that we're going to have a bunch of keys that are end up with the same value open over again in the in the in the same notes again ignoring the prefix or putting the putting the record at the end because that one the system knows that it's doing that it can pull that piece piece out but I'm going to do that.

411
01:00:49,000 --> 01:01:18,000
I have a bunch of non unique keys that are going to end up in the same node it's just like prefix sorting or prefix compression I just store the duplicate key once then have a posting list of all the values that correspond to that key and now I'm only starting one copy that key right post this out of this in I think in in post this 15 I think you might less here and it's pretty significant drop in size your your your.

412
01:01:19,000 --> 01:01:40,000
Yes. How do we know how do we know that we should interpret what this is like that these are values not keys this is just a mock up you would actually store it you wouldn't start exactly the page like this you would have obviously length of the number elements your story.

413
01:01:40,000 --> 01:01:45,000
I'm not showing that you have additional metadata to know what the offsets are.

414
01:01:45,000 --> 01:02:06,000
We can also do suffix truncation and again because the in notes don't have to be the exact copies of the keys because those keys might not exist in the leaf notes we maybe don't have to store the entire key we just need enough of the of the key keys prefix to discriminate whether we need to go left or right.

415
01:02:07,000 --> 01:02:20,000
So in this case here I have keys ABC up to K and then element O up to up to V the only thing that that really matters is in this case here is say just the first three characters of both of these two strings.

416
01:02:21,000 --> 01:02:27,000
So my inner knows only needed store store the minimum prefix that we need to decide whether go left or right.

417
01:02:27,000 --> 01:02:41,000
Of course now the challenge is like if I insert a key that could it could be in between them maybe I got to go back and get the regional keys to decide what the predict should be.

418
01:02:42,000 --> 01:02:45,000
But in some environments this might be the right thing.

419
01:02:45,000 --> 01:02:58,000
So pointers whizzling is a comment technique that's going to allow us to minimize the amount of lookups we have to do in our buffer pulls page two.

420
01:02:59,000 --> 01:03:08,000
Because again when we are traversing the nodes of trusting the tree structure the what I keep calling our point is pointers they're really page IDs.

421
01:03:08,000 --> 01:03:15,000
So I got to go to the page table say okay well if this page exists give me the pointer to it right.

422
01:03:15,000 --> 01:03:26,000
So if I want to say find keys greater than three I started my root node here and I look at the keys and decide whether I want to go left or right in this case here I want to go left.

423
01:03:26,000 --> 01:03:32,000
But then the value in this node here is going to be the page numbers of page two.

424
01:03:32,000 --> 01:03:37,000
So now I got to go down my buffer pull and say okay give me the pointer to page two.

425
01:03:37,000 --> 01:03:44,000
And likewise when I'm on the bottom here I want to scan along the sibling nodes I go from page two to page three I got to go back to the buffer pull.

426
01:03:45,000 --> 01:03:54,000
So the idea of pointer swizzling is that if you pin the page in the buffer pull say this page cannot be evicted.

427
01:03:55,000 --> 01:04:05,000
Then any page that points to that page you pin you have to be pinned to you replace its contents with the actual pointer in memory.

428
01:04:07,000 --> 01:04:15,000
And so now when I'm scanning when I'm traversing my tree I'm not going to the buffer pull say go do look up for me for this page I had the thing exactly what I'm looking for.

429
01:04:16,000 --> 01:04:23,000
So thing like the root node everyone's always going to that in your B plus tree and say and then they're always going to go down to the next level.

430
01:04:23,000 --> 01:04:30,000
So instead of having to do page page look ups in the buffer pull would get down the next level I have the pointer do you know where where to go directly.

431
01:04:32,000 --> 01:04:40,000
And obviously you don't want to store this pointer on disk you know if the page gets flush because now you load it back in you have this pointer that goes nowhere and that would be bad.

432
01:04:40,000 --> 01:04:47,000
So there's bookkeeping you have to do to make sure okay like you're going to disk. I mean undo this swizzle what got swizzled.

433
01:04:48,000 --> 01:04:51,000
To make sure that nobody points to it and then also to like.

434
01:04:54,000 --> 01:05:09,000
You don't want you know you don't want this page you get evicted this thing have a swizzle pointer and now it's pointing to some other page that got swapped in that frame and does it and it's not part of the plus tree and then you have a second ball because it starts interpreting bites that it should start interpreting bites in a way that it shouldn't.

435
01:05:10,000 --> 01:05:33,000
So the reason why I talk about this for the B plus tree and not for the hash table stuff or not for the regular heap stuff is because we already have this hierarchy in our tree structure here we would know that if we swizzle anything below us we want to make sure that this thing doesn't get unpinned sorry that this thing doesn't get unpinned before it's children get unpinned and that way the pointers are always valid.

436
01:05:33,000 --> 01:05:48,000
Right just thing again when you're building project one this thing all the work you have to go do to go go look up the page you will find the thing you're looking for the frames not there and then go fix something right you skip all of that.

437
01:05:49,000 --> 01:05:53,000
You know update the L.R.U.K. stuff right you skip all of that by just going directly through the pointers.

438
01:05:53,000 --> 01:06:04,000
But of course you lose the metadata of the access patterns for for how these page pages are being used but again if it's important off to pin it and swizzle it then you probably should stay in memory.

439
01:06:07,000 --> 01:06:16,000
All right to do and search quickly the most common trick is just pre-sort everything which we'll cover in the next week.

440
01:06:16,000 --> 01:06:39,000
You sort out your keys and just lay them out as leaf nodes right with your sibling pointers and then build the data structure from the bottom to the top right and this is different than if I just do if I just insert the keys one after another I would start from the top and go down and start how to do the splits and so forth I skip all of that by just pre-sort things and then build a scaffolding on top of that.

441
01:06:40,000 --> 01:06:44,000
Right and this technique is very common as well.

442
01:06:47,000 --> 01:07:09,000
All right so the last optimization I want to talk about is you know we make a big deal about how the nice thing about the B plus tree is that it's balanced everything's always log in and our lookups can be really fast because again it's going to run everything's log in to get the leaf node and then we can try to get as much to access as much as we can.

443
01:07:09,000 --> 01:07:26,000
But of course the challenge is that updates are going to be expensive for us because we have to maintain this balance this balance property anytime a thread comes along and inserts or deletes they may draw the short straw and be responsible for reorganizing the entire data structure.

444
01:07:26,000 --> 01:07:55,000
And so ideally what we want is a way to delay the updates to the data structure in such a way that we can accumulate them and then at some later point we have enough we say okay let me go ahead and apply all my changes in a batch and then yes I may have to reorganize things but I'm doing it all once I can amortize the cost of making those changes and now your rights can potentially be faster because you don't you don't have to worry about looking on the split and you don't have to worry about looking on the split.

445
01:07:56,000 --> 01:08:06,000
So every time I insert something new. So there's a line of work on what is called right optimized B trees or B plus trees.

446
01:08:06,000 --> 01:08:13,000
These have sometimes also called B epsilon trees you'll see it with the little little epsilon symbol.

447
01:08:13,000 --> 01:08:21,000
There's a commercial variant from the Toku Tech guys called fractal trees but it's basically branding it's the same idea.

448
01:08:21,000 --> 01:08:31,000
And the idea is basically now every single root node and inter node I'm going to have a mod log just like my Seagal had for their pages when they were doing compression.

449
01:08:31,000 --> 01:08:47,000
And any time a new update comes along instead of propagating those changes all the way down to the leaf nodes I'm going to violate the property we talked about in the B plus tree where the leaf nodes have to be where the actual values are and I can insert my entries into the mod log.

450
01:08:47,000 --> 01:08:54,000
So I want to insert seven again instead of having to verse down and figure out where seven should go I just put it in the root.

451
01:08:54,000 --> 01:09:07,000
Same thing I want to delete delete 10 instead of putting it into the going down and deleting it and then essentially doing a merge auto put it in the mod log.

452
01:09:08,000 --> 01:09:17,000
So now if a query comes up almost to find 10 well as I traverse down I look in the mod log is the thing I'm looking for here.

453
01:09:17,000 --> 01:09:32,000
So in this case here I deleted 10 it's in my mod log so when I do my look up I would find the entry here and I'm done I don't need to go to the bottom and to actually see the change.

454
01:09:33,000 --> 01:09:37,000
So what's the obvious problem with this.

455
01:09:37,000 --> 01:09:39,000
The buffer is a full right.

456
01:09:39,000 --> 01:09:56,000
So when that happens then you got to pass cascade down the changes and put the ideas here you're doing this incrementally and in batches and you basically you don't have to apply any modifications until you get to the structure of the data structure until you get to the to the leaf notes.

457
01:09:56,000 --> 01:10:16,000
So if I insert 40 I just move my previous changes insert seven insert 10 here and I leave I put insert 40 there and at some point if I keep going this thing this thing cascades down and this thing is full then then I go ahead and apply my changes.

458
01:10:16,000 --> 01:10:17,000
Yes.

459
01:10:17,000 --> 01:10:30,000
So this potentially makes really slow because as I'm scanning along here I potentially have to do.

460
01:10:30,000 --> 01:10:50,000
So I do some of the things I'm looking for is in there yes but then like these different system these different locations of BF's entries will have like bloom filters in front of these things to say is the key I'm looking for actually even in my mod log if yes then go look for.

461
01:10:50,000 --> 01:10:55,000
And bloom filters are cheap to maintain and they're not very big.

462
01:10:55,000 --> 01:11:03,000
So this is an old idea that I would old 2003 old BF's trees 1972 so maybe that's not that old.

463
01:11:03,000 --> 01:11:18,000
So there's an old idea this what does this look also look like before we talk about for log structure storage right same idea that we can append these log log entries and then bash them up and then apply them at some later point.

464
01:11:18,000 --> 01:11:32,000
So I said you guys we've seen this idea over and over again so to protect they rebranded their implementation of a BF's long tree as fractal trees and then they had a storage end for my sequel that I got a gap.

465
01:11:32,000 --> 01:11:47,000
Got bought by percona and I think I got deprecated last year so they had probably the most robust implementation from a few years ago that's dead splinter DB is a key value store and better key value store from VMware.

466
01:11:47,000 --> 01:12:16,000
Written actually somebody here that he's a researcher at VMware but he was getting his his MBA here at Tepper at CMU and the other guy working in the C's Napa Fresc at Cornell but like this is basically a sort of a super optimized version of this and then relational AI is a relational knowledge based sort of graph veneer on top of relational database system that is a key value store.

467
01:12:16,000 --> 01:12:29,000
So this is not that common but this is something I suspect we'll see more and more of in the future.

468
01:12:29,000 --> 01:12:39,000
I mean rocks DB doesn't need this because rock DB already is a log structure nursery and you're you're essentially getting this the same idea the same the same properties.

469
01:12:39,000 --> 01:12:52,000
Alright so we have six minutes left so let's pop up and postgres and do a quick demo.

470
01:12:52,000 --> 01:12:59,000
So here I'm going to demonstrate the difference between my sequel.

471
01:12:59,000 --> 01:13:11,000
Nope, sorry, it's not that I'll have to be worse. There we go. Sorry, I had to write the first time.

472
01:13:11,000 --> 01:13:26,000
So I want to demonstrate the difference between a hash index and a B plus tree on data and then we can see what the data system is going to choose to use to run queries.

473
01:13:26,000 --> 01:13:45,000
So the data set I'm going to use is going to be I think it's 21 million email addresses from a few years ago right because it's all on.

474
01:13:45,000 --> 01:13:57,000
So 27 27 million email addresses right and so I'm not going to run this in real time but I've basically I've created two indexes.

475
01:13:57,000 --> 01:14:00,000
I created one here on a B plus tree on the emails.

476
01:14:00,000 --> 01:14:02,000
Sorry.

477
01:14:02,000 --> 01:14:12,000
And the way it works is like in postgres you say create index with the name of the index on this table and then using and then you specify what data structure you want.

478
01:14:12,000 --> 01:14:21,000
So by default if you don't have the using clause in postgres you you you get a B plus tree but here I'm explicitly telling I want to be a plus tree and the index already exists.

479
01:14:21,000 --> 01:14:28,000
So I don't need to do that and then I have the build the same thing on the same column.

480
01:14:28,000 --> 01:14:33,000
I'll better on a using hash table and I just say using hash and again I already have that.

481
01:14:33,000 --> 01:14:42,000
So let me turn off a bunch of other optimizations in postgres that we don't need to worry about just yet right so I can do queries like this right selects.

482
01:14:42,000 --> 01:14:48,000
I get some random thing like this but again if I put the explain keyword in front of it.

483
01:14:48,000 --> 01:15:00,000
Postgres will tell me what the query plan is right so here it's going to tell me I'm going to index only scan using the B plus tree and it's obviously what the conditional conditional is.

484
01:15:00,000 --> 01:15:11,000
So we didn't talk about index only scan sometimes cover scans or covering indexes basically postgres recognizes that all the data or all the columns I need to answer this query can be found in the index.

485
01:15:11,000 --> 01:15:19,000
So even though they're storing the record IDs in the leaf nodes I don't need to actually follow those record IDs to get the data for the actual tuple.

486
01:15:19,000 --> 01:15:38,000
All everything I need for this query can be answered from the index right because again going back to my query it was just select the men email from from the email address and the index is on email so once I go all the way to the right side of the tree or yeah left side of the tree that has all the data looking for.

487
01:15:38,000 --> 01:15:46,000
So that's why it can tell me you can do an index only scan so that's fine so let's see now if you want to do something like this we want to say.

488
01:15:46,000 --> 01:15:54,000
Give me give me all the emails where the first letter is a but I'm doing a limit one and you get somebody like this.

489
01:15:54,000 --> 01:16:07,000
And I do explain to see what it actually tells me what to do so in this case here postgres says even though I haven't I have that B plus tree index that is sorted on emails postgres decides I want to do a

490
01:16:07,000 --> 01:16:23,000
squintral scan because it recognize that the thing I'm looking for you know I'm looking for all all emails that start with a that's at some middle point in the tree and since it's unbounded I'm not specifying like

491
01:16:23,000 --> 01:16:40,000
the end marker it would say okay you got a scan to the entire end now it's not smart after recognize I have a limit one there right so what it really should have done is just probe down the index find the first thing and then popped out and done but in this case here postgres wasn't smart enough to figure that out.

492
01:16:40,000 --> 01:16:49,000
Right and I can't pick pick the hash index because again I'm doing like a wild card search I don't have the actual full key.

493
01:16:50,000 --> 01:16:51,000
Right.

494
01:16:52,000 --> 01:17:06,000
So you can see this in other ways right so so in this case here I want to find all emails where it's greater than Andy again relies to decide to do a squintral scan but now if I do something like this final emails where

495
01:17:06,000 --> 01:17:25,000
the first letter sorry the string starts with ZZZ now I'm on the right side of the tree and postgres recognizes based on the distribution okay well you're far enough long the tree where I'm going to scan along so it's okay for me to do the index scan because that's still going to be less data than doing a complete scontrol scan.

496
01:17:26,000 --> 01:17:34,000
Right and at no point did postgres decide to use the hash index because again I'm doing like less than greater than a wild card matches.

497
01:17:34,000 --> 01:17:49,000
So we can do something like this where now we can say for you know find emails where there's exact quality matches using the in clause and now you see postgres decides to use the hash index here right.

498
01:17:50,000 --> 01:17:55,000
The bitmap index scan I'll explain that is it's not what you're not a real bitmap index.

499
01:17:55,000 --> 01:18:15,000
You actually you can see it better with instead of using in you can use a bunch of ores right and now what you see is that postgres has multiple entries where it's for the index scan where for each of the each of the email addresses I had in that my where clause like you know something

500
01:18:15,000 --> 01:18:36,000
equals something or something equals something each of those are going to be separate probe into the hash index and then they maintain a bitmap of the I think it's actual two-pole IDs the two offsets not the not the pages they maintain a bitmap of the matching values for each of those index probes and then they or them up together and then that produces the exact two pulls they actually you actually you actually would need.

501
01:18:37,000 --> 01:18:51,000
This is sort of similar to what I was saying before you you figure out what the pages you need from the from the index first then go actually go get them so they're doing that here they're doing much of probes and index don't actually get the real data from the two the tables.

502
01:18:52,000 --> 01:18:57,000
Do the order on the bitmaps then you have the list of the indexes you are less of the records you actually need to go get.

503
01:18:58,000 --> 01:18:59,000
Right.

504
01:19:00,000 --> 01:19:19,000
Okay so the next thing I want to do is how about clustering tables so postgres doesn't act to postgres supports the cluster command but it doesn't actually and it will sort your table but it doesn't actually maintain the sorting because it's not going to be organized it's not index organized so you with the cluster command

505
01:19:19,000 --> 01:19:48,000
and the first thing you do is you start modifying the table it can get out of sort of order so I'm not going to do this live because it would take too long and I realize we're a little over time but like the command would be basically like this right you would say cluster the table you want to cluster and then what the index you want to have a be cluster don't so I just take about a minute to run so I've already run it before class so I'm not going to do that but we can go look at like what's in the first the first page.

506
01:19:49,000 --> 01:20:00,000
So again the CTID is the record of the offset and postgres so you do that that is not looks well that's actually that's the unsorted one so that looks all random but if I change the name of the table to clustered

507
01:20:07,000 --> 01:20:09,000
because of that sorry.

508
01:20:09,000 --> 01:20:35,000
Right now you see that in the first page or the first offsets the two blows are actually sorted in that order right based on the index so if I go ahead and delete one of these entries I delete the very first person and they're fake email address and I go back and do the same scan on the table right

509
01:20:35,000 --> 01:21:04,000
Postgres didn't fill in that that first slot right it's empty but now if I insert this fake person back in and do the same scan right there's still not in that first page right so to go find them we do select star select CTID from emails clustered where email equals

510
01:21:06,000 --> 01:21:19,000
this right now they're in page 299 I don't know where that is some random thing but it's again it's not sorted order because again postgres can't maintain the sort of because it doesn't have true clustered indexes.

511
01:21:19,000 --> 01:21:33,000
Okay so B plus trees are important probably the best choice for your database system tries are pretty good you have B plus trees of tries as I said before

512
01:21:33,000 --> 01:21:47,000
but B plus tree is a bunch of ways of opening faster so next class we talk about how do you actually make your B plus tree thread safe by traversing down and even when you're doing splits and merges okay hit it

513
01:22:03,000 --> 01:22:20,000
yeah I'm the poppy with the mother fucking 28 a gram dependent on if it's the pop you ain't hit them all yet still got your sugar I smack you with the bottom of the clip to tell you look up show me what it's a set for blow your face back I got a block on taps the feds can't trace that

514
01:22:20,000 --> 01:22:27,720
style is like 10 for proof you can't lace that the Dominican or you could call me Dominican black Skelly black leather black sweat

515
01:22:27,720 --> 01:22:36,760
Timberlands my old black 38 send you to the perigates you get a zombie trying to skate and that's your first mistake I ain't lying for that cake your family see your way my

516
01:22:36,760 --> 01:22:41,360
grand's is happy wait the Randall we stay when he actually how I'm living tell him I'm living great

