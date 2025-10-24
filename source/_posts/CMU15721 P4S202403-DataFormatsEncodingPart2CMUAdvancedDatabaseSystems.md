---
title: CMU15721 P4S202403 DataFormatsEncodingPart2CMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Canneke Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio board.

3
00:00:09,000 --> 00:00:16,000
What's the starting?

4
00:00:16,000 --> 00:00:23,000
Thought the desk was good yesterday and then we'll finish up talking about the proposal presentations coming on this week on Wednesday.

5
00:00:23,000 --> 00:00:27,000
So let's hold off any questions until then.

6
00:00:27,000 --> 00:00:35,000
All right, so today we're going to pick off where we left last class talking about what data files actually look like, what actually data looks like.

7
00:00:35,000 --> 00:00:43,000
And so recall from last class we talked about what these different storage models you'd have NSM or Rostore's DSM column, like pure column store.

8
00:00:43,000 --> 00:00:45,000
And then as I said, everything is pretty much packed these days.

9
00:00:45,000 --> 00:00:51,000
You're going to divide your table up into horizontal partitions to row groups.

10
00:00:51,000 --> 00:00:59,000
And then within each row group you're going to lay all the bits or bytes for each column continuously before jumping to the next column.

11
00:00:59,000 --> 00:01:09,000
So you get the best both worlds. You get the column store, continues values, but also the spatial locality of a Rostore.

12
00:01:09,000 --> 00:01:19,000
We then talk about all right for the different file formats, what's actually inside of them, what additional things we're going to record beyond just the data itself.

13
00:01:19,000 --> 00:01:25,000
So we talk about the metadata keeping track of what's in the footer where they jumped off says in the row groups.

14
00:01:25,000 --> 00:01:33,000
The format layout specifying again, like is it Rostore comms store, what is the actual the nesting structure within that type system.

15
00:01:33,000 --> 00:01:42,000
We sort of gloss over quickly to say there's some primitive types, logical types coding schemes. We spend a lot of time on and we'll talk about mostly today different ways to encode the data.

16
00:01:42,000 --> 00:01:56,000
Now you block compression or general purpose compression is taking whatever you produce from the in your file from the lightweight encoding or the these schemes here and then throw snappy or Z standard or gzip at it.

17
00:01:56,000 --> 00:01:59,000
I actually never use gzip snappy or Z standard.

18
00:01:59,000 --> 00:02:13,000
So Matt Blume felt theirs and then we rushed through the shredding stuff. So I'm going to spend a little time beginning today going over that more detail because again I think this is a neat idea from the BigQuery Dremel stuff and we'll see this again later in the semester.

19
00:02:13,000 --> 00:02:17,000
And then we'll kick off the conversation about today's paper.

20
00:02:17,000 --> 00:02:24,000
So again, real world data sets, there's a lot of a lot of JSON up there and if you're a Google, a lot of protocol buffers.

21
00:02:24,000 --> 00:02:43,000
And if we just store the the JSON document as a varchar as a text or blob inside of a column, you know, yeah, we can run JSON functions on them to extract out the structure from it, but that's not going to lose all the advantages of having a column store with packs layout and be a re-de vectorized execution.

22
00:02:43,000 --> 00:02:54,000
So instead, what we want to do is split up or blow up the JSON document for every single two pull and store the paths within that document as separate columns.

23
00:02:54,000 --> 00:03:01,000
So, you know, the no-segal guys talk about, oh, this is this is a schema list databases, you can define your schema later.

24
00:03:01,000 --> 00:03:08,000
And that just means that you don't have to call create table and specify here's exactly the columns I have for different types. You just throw JSON on it.

25
00:03:08,000 --> 00:03:17,000
But inherently, there's always a schema, right, because it doesn't make sense to have like random applications writing random documents into a table, because then nobody can make it make sense of it.

26
00:03:17,000 --> 00:03:28,000
So the the documents may be putting in, maybe I have all the same fields, but at least there'll be enough overlap in the structure that we can break things up and then store it as columns.

27
00:03:28,000 --> 00:03:37,000
So again, I'm going to focus on the go through a walk through the record shredding from Dremel and then we can briefly talk about length and presence encoding.

28
00:03:37,000 --> 00:03:55,000
All right, so the basic idea of shredding is that we're going to store paths in our columns, or sorry, for each path, I'm going to store it as a separate column, and then we'll record how many steps deep we are into a given document for that, for that hierarchy.

29
00:03:55,000 --> 00:04:05,000
And unlike in length and presence, we'll see in the next slide, if something doesn't exist, doesn't mean we need to always record that it's actually there, where in length and presence you do.

30
00:04:05,000 --> 00:04:14,000
So there's going to be two additional columns we're going to find. I think that these are just going to be integer columns that we can then do all the encoding and pressing stuff we talked about before.

31
00:04:14,000 --> 00:04:26,000
So adding additional columns, yes, that's more data restoring per attribute within our JSON document, but like again, we can compress these things pretty well and avoid a lot of the bloat of the storage space.

32
00:04:27,000 --> 00:04:38,000
So the first one is going to include the definition level, and that's going to determine how many, or it's going to keep track of how many actual elements existed to get us to the current path we are in our hierarchy.

33
00:04:38,000 --> 00:04:48,000
And the repetition level is going to say if it's a repeated structure, like in our scheme up here, we have two repeated structures, we have the repeated group name and the repeated group language.

34
00:04:48,000 --> 00:04:53,000
So how many times have we seen those repeated groups at that given level repeat?

35
00:04:53,000 --> 00:05:03,000
So let's walk through the example, there's a simple document here again, this is roughly what protocol buffer looks like, or think of defining a schema on a JSON document for XML.

36
00:05:03,000 --> 00:05:15,000
So we're going to walk through this document here, and we're going to scan through as if we were loading it into our database system and show how it's going to generate the attributes across the different columns in our shredded model.

37
00:05:16,000 --> 00:05:27,000
So the very beginning, it's easy, we have a document ID, so we have a table that corresponds to the document ID path, that's at the top of the document, so then we just insert a new record there.

38
00:05:27,000 --> 00:05:40,000
But at this point here, there's no repeats before us, so the repetition value is zero, and there's no other things in the path before us, so the definition is zero.

39
00:05:40,000 --> 00:06:06,000
And now as we scan down, we hit the first nested structure, we have name, and within SyVat, we have a repeated group called language, so now we see our first entry for the code here, so we're going to create a new column for our shredded document, where we have the value that's being stored, the repetition value is set to zero, because we're the first language object or group that we've seen at this level in the hierarchy.

40
00:06:06,000 --> 00:06:11,000
So we set the definition to two, because we're two levels deep.

41
00:06:11,000 --> 00:06:25,000
Then we go down to the country, and now we see that we can create a new column, the value is US, that's easy, repetition is zero, because there's nothing before us, and then now we're sort of three elements into our path.

42
00:06:26,000 --> 00:06:48,000
Then we go to the next group for language, and so again, we see a code, we insert that here, where the second, we're getting starting at zero, but it's the second repeated group within this hierarchy, so we set that to one, and then our path to get here is two, just like it was here, because we had to go from name to language to code.

43
00:06:48,000 --> 00:07:08,000
Now we don't have a country, so in this case here, because we at least have something at the group level within the language, we have to put an entry here, again, same as before, we're one into the repetition, and then we have two elements to the path to get us here, but again, because there's no value here, we set it to two.

44
00:07:09,000 --> 00:07:28,000
Then we go down to the URL here, and again, repetition is zero, because with the first name in our group, just like we were in document, but then our depth is two, because it went from name and then to URL, just as we were over here.

45
00:07:29,000 --> 00:07:56,000
Then we down to this group, this is just name, nothing else, so we put, sorry, it's just a name with the URL, and no other attributes for the language, sorry, so we add our entry into here, repetition one, because we're the second element in the repeated group, and the path is two to get us there, but now we've got to put placeholders here to say that there wasn't anything within the repeated group for language.

46
00:07:56,000 --> 00:08:19,000
So we're repeated group one, because this is the second group within that level of the name, and then the definition is one to say the path is really one to get there, because the same as the path as, it's one down from name, so if you want to know how deep you actually are, as you fall along from this, you could then get that, and see that your actually three levels deep.

47
00:08:20,000 --> 00:08:21,000
Yes.

48
00:08:21,000 --> 00:08:33,000
So, I don't know if you have a definition level two, but I don't understand why country would have a definition of three when it would seem like, or if it's five, they would have a function.

49
00:08:33,000 --> 00:08:57,000
Yeah, his question is, why is code going back here? Why is the error doesn't, power point is being stupid? So in this case here, I add English US, the definition for the path is two, but then when I add the country, the definition is patch is three, as he said, the code is required, the country is optional.

50
00:08:58,000 --> 00:09:00,000
Other question, sorry. Yes.

51
00:09:00,000 --> 00:09:18,000
The question is, why is the definition two, it is taking place as the country?

52
00:09:18,000 --> 00:09:32,000
Because it doesn't exist, I think that's why. Right? You're not moving down even farther. Yes.

53
00:09:32,000 --> 00:09:44,000
The question is, is it determined in the point of reversal? Yeah, the definition is, how many steps are you down within the path that gets to where you're at?

54
00:09:44,000 --> 00:09:50,000
And so if it's not there, it doesn't count. It's my understanding of it. Yes.

55
00:09:50,000 --> 00:10:06,000
Is there any benefit of doing this, like, doing this story with all this point? Is there any advantage of doing this, storing the structure as columns versus storing pointers?

56
00:10:06,000 --> 00:10:24,000
No, no. So if we have this, like, the routine group of names, is this better than just storing some sort of a very small column that I'm going to, you know, missed a pointer to open next point?

57
00:10:24,000 --> 00:10:27,000
What are these pointers, sorry.

58
00:10:27,000 --> 00:10:37,000
I guess there's a similar, but, like, it's representing only as a...

59
00:10:37,000 --> 00:10:49,000
The idea is that, think of it, you have to query. The reason why we're storing this structure here is that we want to go through the column itself without having to go back to figure out how we actually got there when we do a select query.

60
00:10:49,000 --> 00:10:59,000
So I don't have a select query here, but think of like, select star from table where name.language.code equals eNUS.

61
00:10:59,000 --> 00:11:11,000
So I can just rip through this column here. I don't need to refer to any other ones. And when I find any matches, I can then use that to figure out where I need to go jump back in the offsets if I want to stitch things back together.

62
00:11:11,000 --> 00:11:19,000
So is there any overhead in my type, where we can just drop the document from the most speculative?

63
00:11:19,000 --> 00:11:27,000
It's a steady answer. Is there what, sorry? Is there significant overhead in kind of drawing all the columns up to the original column?

64
00:11:27,000 --> 00:11:47,000
The question is, is there a large overhead of, if I have to then reverse this shredding, taping it back together to go back to the original form? Absolutely, yes. But the advantage is that when we want to do lookups, it's already broken out in a form that we can find things very quickly.

65
00:11:47,000 --> 00:11:56,000
So you're going to be looking at these specific things. Why don't you just break up the column here first? Like, I can wait for the other stuff to go down here.

66
00:11:56,000 --> 00:12:01,000
Yeah, this one they're giving us. Some asshole developer says I'm going to give you JSON and we got to handle that.

67
00:12:01,000 --> 00:12:05,000
Right? We haven't even talked about how we're going to handle the type either.

68
00:12:05,000 --> 00:12:16,000
Right? And we'll see this in snowflakes. Note that we'll actually try to figure out, oh, I see these bunch of strings. I'll keep your original JSON, but I'll also make a synthesize a string column for you. A bar chart, better type is.

69
00:12:16,000 --> 00:12:21,000
So does SQL know about this? Is there something about the execution?

70
00:12:21,000 --> 00:12:37,000
It's questions is this SQL know about JSON? I mean, the SQL standard has JSON. Yeah. Has JSON constructs of data types. But again, that's the SQL is at the logical levels. The SQL is the programmer sees underneath the covers.

71
00:12:37,000 --> 00:12:49,000
Right? We the databases is free to store data anyway that it's once and Dremel made the decision to do it this way because they want to optimize for the common case of just doing lookups down paths.

72
00:12:49,000 --> 00:13:05,000
Right? She examples everything is jace everything's a blob. And then I have to parse it every single time run a query. This avoids all that you're basically materializing as if you parse it ahead of time.

73
00:13:05,000 --> 00:13:18,000
Okay. So in the sake of time, I don't want to spend too much on this, but like you kind of get the better general idea that we're breaking this up. We're generating columns. And we can use that to figure out the path as you know, as we just can't through.

74
00:13:18,000 --> 00:13:45,000
The question is the the great Britain one. So we're now here. Right? So we now have a new name. Right? There's a we have it's name is is is repeated group and we've really have the country. Now we have great Britain here. Our repetition is one. That might be wrong.

75
00:13:45,000 --> 00:13:59,000
Yeah. This is from the Dremel paper. I had to fix some of these things. Yeah. I think the. Yeah. Yeah.

76
00:13:59,000 --> 00:14:14,000
Yeah. Because it's a tradition. I will define as the. Yeah. All right. We'll fix that later. All right. So yeah.

77
00:14:14,000 --> 00:14:28,000
The type of here is that it's the number of times that the groups have repeated length at that level. Yeah. Again, low level details. Not the low level details.

78
00:14:28,000 --> 00:14:42,000
Maybe not entirely matter. It's the idea of like taking Jason taking something breaking up because we can do this at the physical level. And that'll make queries run faster later on and the application program doesn't know doesn't care.

79
00:14:42,000 --> 00:14:53,000
And in the second time, I'm going to skip past length of presence. Basically, the idea is that you're just storing.

80
00:14:53,000 --> 00:15:05,000
You know, walk down as if for each level, you're just going to record whether something is exists or not. Right?

81
00:15:05,000 --> 00:15:17,000
The Dremel paper already that are on there's specific experience. They show that the shredding one is better. Okay. So let's get back now talking about the will be left off last class.

82
00:15:17,000 --> 00:15:28,000
Talk of the big picture of these these parking or showing how they have different levels of sophistication and complexity in the in their implementation. So how they encode things.

83
00:15:28,000 --> 00:15:44,000
But the these file formats are really designed from a different harbor era, like 10 years ago, or you know, 12 years ago now, Parkes and or 2011 2012 back then the network was seen was always the slowest thing.

84
00:15:44,000 --> 00:16:04,000
And then disk was slow and then memory and everything and the CPU stuff all that's fast. So you want you they were making a trade off to to use heavyweight compression schemes like de standard like snappy because that would reduce the the size of the blocks they were fetching for data files.

85
00:16:04,000 --> 00:16:14,000
But now the harbor is shifted such that like network is actually really really fast. You get on Amazon, I think 100 gigabyte connections for instances, and this is not that much.

86
00:16:14,000 --> 00:16:28,000
So the trade offs and design decisions that parking or people made, you know, they're not wrong in like as if they were doing something stupid. It's just the harbor landscape is so much that we need to revisit what they were doing.

87
00:16:28,000 --> 00:16:36,000
So there's a couple other problems in these formats that are going to be problem for us when we want to start doing.

88
00:16:36,000 --> 00:16:40,000
You know, start vectorizing the operations on our.

89
00:16:40,000 --> 00:16:46,000
You know inside of our engine. So the first is that parking or going to generate variable size runs.

90
00:16:46,000 --> 00:16:53,000
Right. Like they're going to they're making decisions of how to encode different things at different parts within a column chunk.

91
00:16:53,000 --> 00:17:00,000
And that means as you're scanning along trying to decode it to find data you're looking for, you have to have these conditionals.

92
00:17:00,000 --> 00:17:07,000
I think it is my data this way or that way. And then sometimes it might be a certain size versus another size.

93
00:17:07,000 --> 00:17:12,000
Right. Well, that's bad for Cindy. So we're not. Cindy is I'm going to take in 14 16.

94
00:17:12,000 --> 00:17:19,000
Because who here doesn't know Cindy. Okay. In the paper. Okay.

95
00:17:19,000 --> 00:17:25,000
Let me give you a quick crash course. For this, everything you know.

96
00:17:25,000 --> 00:17:32,000
Single instruction multiple data says these class of it and see if you're instructions that you can get a modern processor is that allow you to do multiple things.

97
00:17:32,000 --> 00:17:40,000
Sorry. Do the same operation on multiple pieces of the data at the same time. Contrast this with with sissy in fling taxonomy single structure single piece of data.

98
00:17:40,000 --> 00:17:47,000
Like you know x equals one. That's a single instruction and take the value one put into a register of x. Right.

99
00:17:47,000 --> 00:17:54,000
So the say when you start doing things like a major major tradition. Right. x plus y equals z.

100
00:17:54,000 --> 00:18:01,000
So the way we're typically write this using sissy instructions. You would have a little for loop. We just iterate over all the elements of I.

101
00:18:01,000 --> 00:18:08,000
Sorry, elements of x assuming that x and y are the same same length. And then I'm just going to add them again and sort in Z.

102
00:18:08,000 --> 00:18:17,000
Right. So with sissy again, you're literally running through the for loop. And in each loop, you're you're adding one by one. Yeah, you can unroll it. That'll speed things up. Whatever.

103
00:18:17,000 --> 00:18:24,000
But it's still at the age to it's doing single instruction per each level within our vectors.

104
00:18:24,000 --> 00:18:36,000
So that is a simdi is that I can break out the pieces of data that I'm trying to operate on into chunks lanes that I can store in these sissy registers.

105
00:18:36,000 --> 00:18:45,000
So in this case here, really simple say I'm soaring 32 bit integers. And then I have a putting for for values in a single register. So I have 120 bit registers.

106
00:18:45,000 --> 00:18:57,000
Right. The current. The large register you get now is 512. The fast lanes paper talks about a hypothetical 1024. Simdi register. That doesn't exist. 512 is the state of the art and we'll cover that more later on.

107
00:18:57,000 --> 00:19:06,000
So now what I can do is that within the single instruction, I can just the the CPU will take this register in that register, add them up and then write it out to another register.

108
00:19:06,000 --> 00:19:11,000
And now that's one instruction to the same thing for the next the next block for the next portion of the data.

109
00:19:11,000 --> 00:19:23,000
Again, another simdi simdi instruction to go out of that. So what what what what was before this simdi just counting the number addition instructions eight instructions to add the X and Y together.

110
00:19:23,000 --> 00:19:35,000
I can now do this in two. I'm ignoring the cost of getting things into the register and out of the register and we'll see problems of a VX 512 where there are actually the CPU will slow itself down when you start using a VX 512 in some cases.

111
00:19:35,000 --> 00:19:42,000
Right. So it's not magically magically free. There is some work to actually do this. But that's the general idea of what simdi is.

112
00:19:42,000 --> 00:19:48,000
And we'll see more about this next week and then a few lectures after that as well.

113
00:19:48,000 --> 00:20:03,000
Okay. So. But as I said, these these registers are always going to be like 128 bit 256 512 and then it's going to have every element within within that I'm storing in the lane has to be the same size.

114
00:20:03,000 --> 00:20:13,000
So I have very little length encoding. I got to put everything now to the same length. The same size before I can load into the register and that that's expensive.

115
00:20:13,000 --> 00:20:28,000
The other problem with these formats is that as I said before they they want to eagerly decompress everything so that they don't expose to you the dictionary into the execution and under database system to allow you to start doing lookups on the dictionary itself.

116
00:20:28,000 --> 00:20:56,000
When you iterate over a column chunk in parking or they give you back the decompress values. Likewise, if you're using block compression like a naive scheme like Z standard or or snappy you can't see anything of the data system can't see anything inside of that compressed data because it's opaque to the database system because Z standard snappy to have the wrong encoding scheme and we can actually interpret any any any values within the within the compressed data.

117
00:20:56,000 --> 00:21:15,000
The other problems going to be in some encoding schemes like specifically delta encoding and run like encoding that there will be a dependencies between the Jason values in our column chunk and that means also we can't use SIMD because there's no way to pass data from one element to another element if they're in the same register.

118
00:21:15,000 --> 00:21:28,000
Delta coding is taking the difference between your neighbor the proceeding value in a column. So if you load that up in the SIMD register you can't do that delta addition very easily.

119
00:21:28,000 --> 00:21:57,000
The last one is going to be which not really that big of an issue for us at this point in the semester but the portability of the implementation because all there's a lot more hardware out there a lot more vendors between arm and risk five and GPUs and Zians that if we even actually within just neon arm and Zians themselves there's all these different versions of the ISA that have different features of SIMD.

120
00:21:58,000 --> 00:22:11,000
SIMD, SIMD capabilities and there's no guarantee that if you write low level and trends that code like the low level instructions to do SIMD that on one system is always going to work on another system.

121
00:22:11,000 --> 00:22:22,000
So ideally when I rely on compiler to figure out how to vectorize the stuff for us but parking or because the certain design says they made they can't do that.

122
00:22:22,000 --> 00:22:36,000
Yes. Is there some kind of library that which is what we can use like these agnostic functions that are representing SIMD capabilities and the library within dispatches like this ISA this ISA.

123
00:22:36,000 --> 00:22:51,000
His question is are there libraries like Libs in D. Yes. Are there libraries out there that can abstract away the low level details of certain operations and therefore if you write your code against that library then whatever I say you lane or whatever.

124
00:22:51,000 --> 00:22:59,000
Hardly you lane on they can do it for you. Yes, but I'm not aware of anybody actually using those these in databases.

125
00:22:59,000 --> 00:23:09,000
And we have friends on the inside I ask them whether they're using a transics or some kind of abstraction layer everybody's writing the transics.

126
00:23:09,000 --> 00:23:20,000
I don't know what ductyb does though. They are trying to be very portable so we could look at it see what they do. Yes.

127
00:23:20,000 --> 00:23:26,000
So his question is why it depends on the json values bad because think of like if I have.

128
00:23:26,000 --> 00:23:34,000
So it's actually go back to my simb example here.

129
00:23:34,000 --> 00:23:51,000
So go back here right say that these are the wrong coding on compress but say it was delta encoding right and so starting starting at the top right it's eight and then the next one is 15 right or because it's eight plus seven or something right.

130
00:23:51,000 --> 00:24:00,000
So if I can't load that in my register and have it do arithmetic right next to it the thing that's next to it you can get the copying to another register and start.

131
00:24:00,000 --> 00:24:10,000
Shifting things around. Yes we're getting there yes.

132
00:24:10,000 --> 00:24:17,000
You did the bad mood writer because like you basically give the end you know.

133
00:24:17,000 --> 00:24:25,000
Right so you're telling the ending of the story to the beginning. If I set the mood.

134
00:24:25,000 --> 00:24:29,000
Yes the answer is fast lanes did solve this particular problem.

135
00:24:29,000 --> 00:24:40,000
So I'm going to talk about three different schemes today and the better blocks and the fast lanes ones these are brand new these papers just come out in the last year.

136
00:24:40,000 --> 00:24:45,000
Bit leaving as an old idea from Jignesh Patel the other data is faster here that came out.

137
00:24:45,000 --> 00:24:53,000
I'm just 10 years ago but I still think these it's worth looking at because it's a completely different way thinking about how to store data so I want to cover that a bit.

138
00:24:53,000 --> 00:25:10,000
But the way they went is better blocks is going to be like par k plus plus right still going to be in the sort of the same overall flavor of par k just with better light weight encoding seems and they'll do nesting in a you know with a sort of recursive algorithm

139
00:25:10,000 --> 00:25:20,000
tries to figure out the best nesting scheme automatically fast lanes of the paper I got had you guys read again it's just a different way of thinking about actually how to store data in a way that people really haven't considered that much.

140
00:25:20,000 --> 00:25:27,000
The people have been sorting data all the time that's a new trick but like to purposely go out of your way to store it in a sort of.

141
00:25:27,000 --> 00:25:38,000
I'm just arbitrarily random order because that's the best way to then decode it at runtime again that that's a that's a far it's not a common way to think about how to build data systems.

142
00:25:38,000 --> 00:25:58,000
And again the main takeaway from all this is going to be the sequel layer this is the application program doesn't know what we're doing the covers right to get all the benefit things will be faster and cheaper and more efficient but they don't have to rewrite anything in their application code right because sequel is just going to run just fine the deities and all that for them.

143
00:25:58,000 --> 00:26:01,000
So we'll go through each of these one by one.

144
00:26:01,000 --> 00:26:12,000
So better blocks is a pack space file format out of T. U. Minic. We're going to be a lot of papers from from the guys at Munich they have a system called hyper and a new one called umbra.

145
00:26:12,000 --> 00:26:19,000
They have very good data professors there the one place from the best people in the world. So this paper came out came out of their group last year.

146
00:26:19,000 --> 00:26:31,000
And so the idea with better blocks is that it's going to do more aggressive nested encoding schemes than with park a and work park a only did dictionary coding for for strings.

147
00:26:31,000 --> 00:26:45,000
And it didn't try to do any additional optimizations for like the the the codes that came out of them or try to be more sophisticated and have these for integer columns try to figure out you know should I compress it this way versus that way but it was basically static heuristics.

148
00:26:45,000 --> 00:26:59,000
And so when better blocks what they're going to do is they have a more or less a greedy algorithm that's going to figure out for each column chunk what's the best encoding scheme by looking at a sample of the data and what's about how they do that generate that sample.

149
00:26:59,000 --> 00:27:14,000
And then then they apply that encoding scheme which may produce more columns and it longs there of a fundamental type you then go back and run the same algorithm to figure out what's the best encoding scheme for those derivative columns that came out of it.

150
00:27:14,000 --> 00:27:30,000
And so you're still going to be able to do the you basically get almost all the benefit of something like snappy and Z standard but you can you can still natively operate and decode the columns without having to decode decompress everything right.

151
00:27:30,000 --> 00:27:40,000
And so that means a purpose that cannot use snappy is the standard for this same thing with fast lense or not they're not going to touch that stuff because it's too slow and hides everything with the data system.

152
00:27:40,000 --> 00:27:54,000
Now interestingly better blocks makes the argument that they don't want to store the metadata the schema and information about what's in the file in the file itself and they said that's better left to some management service.

153
00:27:54,000 --> 00:28:03,000
But that breaks the portability capabilities we talked about before we just give someone a part of file and there's everything you need to decipher what's inside of it is in the file itself.

154
00:28:03,000 --> 00:28:10,000
I would talk this up to more philosophical design decision argument rather than like oh my gosh they're wrong or they're right.

155
00:28:10,000 --> 00:28:13,000
Some cases make sense in cases it doesn't.

156
00:28:13,000 --> 00:28:28,000
So statement is if the you're saying if it's embedded that you're safer or not.

157
00:28:28,000 --> 00:28:41,000
So the metadata gets corrupted.

158
00:28:41,000 --> 00:28:48,000
So the file gets corrupted in some way and it trashes the metadata because it's stored in the file you can't do anything.

159
00:28:48,000 --> 00:29:00,000
But the flips I would be if you're storing out your metadata separate files and some other service or you're more moving parts that could cause problems.

160
00:29:00,000 --> 00:29:09,000
Furthermore again we say we're storing an object store, Amazon's replicating all that stuff like I think three or four times or six times.

161
00:29:09,000 --> 00:29:19,000
So the likelihood in all honesty like the file is going to get truly corrupted and I have no and I can't recover.

162
00:29:19,000 --> 00:29:36,000
If it's mission critical then I have all site backups I'm doing you know if it's if my company fails my business fails because this like one file gets corrupted then like that's my fault for not like making sure that like you know it's written stone you know I mean so I think that would be the argument there.

163
00:29:36,000 --> 00:29:46,000
Yes.

164
00:29:46,000 --> 00:30:05,000
So she's correct the thing we the beginning of the last class was in or they had a bunch of different coding schemes and as you ran your you know as you're trying to decode things it's trying to figure out like on the fly which decoding seems to be used isn't that isn't going to start with the same problem.

165
00:30:05,000 --> 00:30:14,000
My understanding is though within the column chunk they're picking one encoding scheme whereas or is trying to be clever on smaller runs.

166
00:30:14,000 --> 00:30:28,000
And I will say they only compare against park a in this paper they don't compare against work and then we we didn't for our experiments and our paper we didn't we didn't compare against this but the that's an open question.

167
00:30:28,000 --> 00:30:41,000
Yes.

168
00:30:41,000 --> 00:31:10,000
So there's common is the argument that they're making this paper about why they want to store the metadata is a separate file is that it allows them to retrieve the file which is going to be much more than the actual data and then look at the zone maps and information for whether you need to look at the file but as we said last time like with s3 I can go get a range so whether the whether getting that metadata is the photo of the file or like the separate file from my perspective it's the same.

169
00:31:10,000 --> 00:31:25,000
Yeah yeah yeah yeah yeah. Okay so let's look at all the encoding schemes that they have a bunch of these we've already seen to these what will cover more detail so we've already know about run like encoding one values like the extreme example or like literally your column of 64,000.

170
00:31:25,000 --> 00:31:49,000
So you can see that the extreme case is RLE. Frequency encoding we didn't talk about but this comes from IBM's DB to blue system from a few years ago basically it's like you store the you look at your column figure out what's the most common value like what's the one value that appears most often.

171
00:31:49,000 --> 00:32:07,000
Or that's separately and then you have a bit map to say how many times it where it occurs in the column and then all the other values that are not not that top value you just store them in an uncompressed in an uncompressed way but then you feed that back into the encoding scheme and compress it further.

172
00:32:07,000 --> 00:32:17,000
So I think of like what's good example of this.

173
00:32:17,000 --> 00:32:35,000
You're at a you're at a everybody loves for like one person so you just store everyone loves to go yes store that they have a bit map where that occurs and then for the few people that don't like to just store that separately right the stupid example that's the basic idea.

174
00:32:35,000 --> 00:32:53,000
From a reference a bit packing we talk about last time again it's like delta encoding they're not going to do a delta coding this is the variant of it we just store what's the the min value of within a column chunk and then just store the delta from everyone that everyone's delta to that that that global value.

175
00:32:53,000 --> 00:33:14,000
Dictionary of the code covered pseudo decimals we I didn't really talk about fixed point decimals but the basic ideas that they're going to convert floating point numbers into to integers by just figuring out where the decimal point is and store the integer version of that and then what power of 10 you need to convert it back to a decimal right.

176
00:33:14,000 --> 00:33:35,000
But I'll briefly talk about these in a second but this is basically a FST comes from the Germans and the ducty people that allows you to do compression on strings but instead of doing dictionary coding where you have a code represents the entire value of that string you can do separate codes for individual bites.

177
00:33:35,000 --> 00:33:50,000
I think if you have a column of a bunch of URLs and all the year all start with HTTPS so I could store the separate code just for HTTPS and then additional codes for the other parts of the URLs right.

178
00:33:50,000 --> 00:34:11,000
So I'll talk about that in a second and then roaring bitmaps is a way to do basic compressed bitmaps but they're going to use these for nulls and exceptions like the the free-percent coding of I'm keeping track of like when you know what what locations is the most frequent value occurs I was sure that is a roaring bitmap and again we'll cover that in a second.

179
00:34:11,000 --> 00:34:18,000
So again no doubt on coding because it's not simply friendly but then again the fast lines people fix this.

180
00:34:18,000 --> 00:34:34,000
So the selection algorithm works like that so basically that you're going to collect some sample data from your column and recall in case of orc orc was using this run ahead buffer to look at the next 512 bytes to figure out okay or sorry by 12 values and look out figure out what's with the next encoding scheme I should use.

181
00:34:34,000 --> 00:34:45,000
What they're going to do is assuming you have the entire column chunk ahead of time and you're going to sample from that uniformly and then use that to determine what's the best encoding scheme for for this given column chunk.

182
00:34:45,000 --> 00:35:12,000
But you just can't do random sampling by just jumping different locations because that'll make run like encoding look look terrible right because you're going to miss that that continuity or repeated values in a sequence likewise if you just then grab the first you know 100 values then it's going to make other schemes look bad because again you may just hit a bunch of repeated values in the beginning and therefore run like the code and looks great but that's actually not the most optimal scheme.

183
00:35:12,000 --> 00:35:37,000
So what they're basically going to do is they're going to do they're going to jump to 10 different locations in a column chunk which is 64,000 values so basically 1% and then when they jump to that location they're going to then grab 64 values so that gives you sort of the the spatial randomness within the the column term itself but also the continuity of the particularness that you need to figure out whether early makes sense.

184
00:35:37,000 --> 00:35:50,000
So then you run the algorithm figure out what the best encoding scheme is and then as I said sometimes the encoding scheme is produce more outputs and then you can just feed those outputs back into the next encoding scheme.

185
00:35:50,000 --> 00:35:51,000
Yes.

186
00:35:51,000 --> 00:35:56,000
Is there something special about the greeting algorithm as opposed to what?

187
00:35:56,000 --> 00:35:59,000
I'm trying to be a professional.

188
00:35:59,000 --> 00:36:01,000
They're trying all of them.

189
00:36:01,000 --> 00:36:02,000
Or they're trying all of them.

190
00:36:02,000 --> 00:36:20,000
Yes so like so say my original data is this integer of this vector strings since common strings so this is the algorithm right it's an integer so they're literally going to try all of them on the sample and they say roughly it's the it's about 2% overhead of the compression cost.

191
00:36:20,000 --> 00:36:46,000
So his comment is basically what are we doing this it's when we're loading the data into the database right and so the encoding is an expensive cost because that we're willing to pay that cost upfront once because that's going to make the common case of running queries run faster absolutely yes.

192
00:36:46,000 --> 00:36:52,000
So they're saying the running is the algorithm is a 2% overhead and I think that's fair trade off.

193
00:36:52,000 --> 00:36:55,000
Right.

194
00:36:55,000 --> 00:37:10,000
So in this example here again they can just be raw uncompressed encoding there's open sort of invitations to do vectorize partial frame of reference then part of the packing one value talked about in the dictionary.

195
00:37:10,000 --> 00:37:24,000
So let's say this is my stupid example here it picks that run like the coding is the fastest but then again this is going to produce out two columns now one for the actual values and then the next next column is the actual.

196
00:37:24,000 --> 00:37:36,000
Right again though they'll recursively try three times or every single output as long as is it something that can be compressed again though they'll feed it back into the argument try again.

197
00:37:36,000 --> 00:37:44,000
Right up to three tries in the case of like you know if you land with like bit packing there's nothing you can do after that right so the algorithm terminates.

198
00:37:45,000 --> 00:37:54,000
So my example here is for for integers but then they have basically decision trees for for strings and doubles and that's good.

199
00:37:54,000 --> 00:37:59,000
There's the core data types that we care about in databases like yes.

200
00:37:59,000 --> 00:38:19,000
Is question is like do I ever they ever backtrack and say oh like I have to recursively applying it turns out that what I'm doing is is the optimal choice is actually another path down no.

201
00:38:19,000 --> 00:38:26,000
How do you know it's not representative.

202
00:38:26,000 --> 00:38:33,000
Oh yeah so like yeah I say it is basically if I started coding and I realized this kind of sucks this is not what it's working.

203
00:38:33,000 --> 00:38:42,000
It's not working out as well as I thought it was going to do they ever go back and try again I don't think they do but I don't know.

204
00:38:42,000 --> 00:38:43,000
That's the same.

205
00:38:43,000 --> 00:38:44,000
Okay.

206
00:38:44,000 --> 00:38:49,000
What is the cost savings of like only like 10% of the data.

207
00:38:49,000 --> 00:38:51,000
They're looking at one percent.

208
00:38:51,000 --> 00:38:58,000
So one down might be like one percent of the data we get the whole data set try all of them exhausted these off the search faces.

209
00:38:58,000 --> 00:39:00,000
Wait across the entire data set.

210
00:39:00,000 --> 00:39:01,000
Yeah.

211
00:39:01,000 --> 00:39:08,000
I mean I guess like one percent of the data is like 100 times slower.

212
00:39:08,000 --> 00:39:15,000
Wait I want to block a little one one terabyte of data you want to say one terabyte.

213
00:39:15,000 --> 00:39:17,000
No say one terabyte.

214
00:39:17,000 --> 00:39:19,000
No excuse one petabyte right.

215
00:39:19,000 --> 00:39:22,000
So yeah that's not feasible.

216
00:39:22,000 --> 00:39:23,000
Right.

217
00:39:23,000 --> 00:39:28,000
And also too someone's got to pay for the compute.

218
00:39:28,000 --> 00:39:29,000
Right.

219
00:39:29,000 --> 00:39:34,000
So I'm.

220
00:39:34,000 --> 00:39:37,000
Again it's a trade off.

221
00:39:37,000 --> 00:39:43,000
I'm going to pay this competition overhead two percent seems reasonable to me in order to make queries run faster.

222
00:39:43,000 --> 00:39:47,000
And so if you do the his example or your example like just try everything or backtrack.

223
00:39:47,000 --> 00:39:53,000
If I got to get another you know what what is going to be that that percentage improvement probably not worth it.

224
00:39:53,000 --> 00:39:54,000
Yes.

225
00:39:54,000 --> 00:39:55,000
Yes.

226
00:39:55,000 --> 00:39:57,000
So they are.

227
00:39:57,000 --> 00:40:00,000
They are all in one.

228
00:40:00,000 --> 00:40:03,000
When I was running the call for some messages.

229
00:40:03,000 --> 00:40:04,000
For this.

230
00:40:04,000 --> 00:40:05,000
For this.

231
00:40:05,000 --> 00:40:06,000
More.

232
00:40:06,000 --> 00:40:07,000
The bigger size.

233
00:40:07,000 --> 00:40:09,000
For example, you should know that it's a very.

234
00:40:09,000 --> 00:40:10,000
Yes.

235
00:40:10,000 --> 00:40:12,000
So they are.

236
00:40:12,000 --> 00:40:17,000
So the statement is when he ran the code locally.

237
00:40:17,000 --> 00:40:22,000
Because I'm sorry that like they try and coding scheme and then they start encoding it like.

238
00:40:22,000 --> 00:40:29,000
Like how far into it will they go like before this.

239
00:40:29,000 --> 00:40:30,000
Yeah.

240
00:40:30,000 --> 00:40:31,000
Yeah.

241
00:40:31,000 --> 00:40:37,000
But it's so to you.

242
00:40:37,000 --> 00:40:40,000
If you say basically that you set set the recursion deaf.

243
00:40:40,000 --> 00:40:42,000
The the default is three.

244
00:40:42,000 --> 00:40:46,000
But then it's it's it's the based on the sample right.

245
00:40:46,000 --> 00:40:50,000
Not like he's saying if you scan the data and realize you got it wrong.

246
00:40:50,000 --> 00:40:53,000
Like the sample said one thing the real data looks something different.

247
00:40:53,000 --> 00:40:54,000
Do you then roll it back?

248
00:40:54,000 --> 00:40:55,000
They don't do that.

249
00:40:55,000 --> 00:40:59,000
You're basically saying on the sample itself they can roll back.

250
00:40:59,000 --> 00:41:00,000
Which is fine.

251
00:41:00,000 --> 00:41:04,000
But on the sample of the real data.

252
00:41:04,000 --> 00:41:05,000
Okay.

253
00:41:05,000 --> 00:41:07,000
They roll back the whole thing.

254
00:41:07,000 --> 00:41:08,000
Okay.

255
00:41:08,000 --> 00:41:12,000
Again, they're they're they're column size is 64 that.

256
00:41:12,000 --> 00:41:13,000
64,000 values.

257
00:41:13,000 --> 00:41:14,000
It's not that big.

258
00:41:14,000 --> 00:41:16,000
You do everything in in RAM.

259
00:41:16,000 --> 00:41:19,000
Okay.

260
00:41:19,000 --> 00:41:20,000
Okay.

261
00:41:20,000 --> 00:41:21,000
All right.

262
00:41:21,000 --> 00:41:24,000
So going back these are all the coding schemes that we had.

263
00:41:24,000 --> 00:41:29,000
I want to briefly talk about FSST because we'll see this when we talk about ductyb.

264
00:41:29,000 --> 00:41:35,000
And we'll see this in when we talk about how to like pass the pass

265
00:41:35,000 --> 00:41:37,000
Intermediate results from one operative the next.

266
00:41:37,000 --> 00:41:39,000
This will come up and then we're in bitmaps.

267
00:41:39,000 --> 00:41:44,000
This is just a better way to do bitmaps.

268
00:41:44,000 --> 00:41:45,000
All right.

269
00:41:45,000 --> 00:41:48,000
So FSST again comes from this 2020 paper.

270
00:41:48,000 --> 00:41:51,000
It's the it's the fastening guy Peter Bonds.

271
00:41:51,000 --> 00:41:54,000
It's Victor Lice from from but better blocks.

272
00:41:54,000 --> 00:41:58,000
And then Thomas Norman was probably the best data street research in the world.

273
00:41:58,000 --> 00:42:01,000
We'll read a lot of his papers.

274
00:42:01,000 --> 00:42:09,000
Those three got together and decided let's go build a compression scheme for strings that allow for fast random access.

275
00:42:09,000 --> 00:42:11,000
And again, think of like dictionary coding.

276
00:42:11,000 --> 00:42:15,000
You're taking the entire string and representing with a single code.

277
00:42:15,000 --> 00:42:20,000
But now you can't actually do partial lookups on that code to find you know,

278
00:42:20,000 --> 00:42:25,000
find prefixes and other things because you you have to go look at the entire string itself.

279
00:42:25,000 --> 00:42:32,000
So the idea here is that they're going to replace frequently couraged sub strings after eight bites with one bite codes.

280
00:42:32,000 --> 00:42:39,000
And so all the values once they're encoded in these these in the FSST symbols,

281
00:42:39,000 --> 00:42:41,000
they all going to still be the same length.

282
00:42:41,000 --> 00:42:47,000
And so you have to do you have to do some tricks to figure out that the record like this is the end of the string.

283
00:42:47,000 --> 00:42:51,000
Therefore, don't look at anymore more symbols.

284
00:42:51,000 --> 00:42:54,000
So the way they're going to generate the symbol tables actually kind of interesting, right?

285
00:42:54,000 --> 00:42:59,000
Because it's sort of an NP complete problem to figure out what's the optimal.

286
00:42:59,000 --> 00:43:06,000
The optimal set of symbols that will produce the smallest number of codes in the most compression of benefits.

287
00:43:06,000 --> 00:43:11,000
So rather than try to do like they mentioned, send you a dynamic programming or something more fancy,

288
00:43:11,000 --> 00:43:18,000
they just use what they call evolutionary algorithm that anytime you think you have a good symbol as you're constructing the symbol table,

289
00:43:18,000 --> 00:43:21,000
they'll just they'll put it in this hash table.

290
00:43:21,000 --> 00:43:25,000
If it entries already there, they they they kick it out.

291
00:43:25,000 --> 00:43:32,000
Right, so it's not like the linear scan or linear programming hash tables that we talked about before or the chain hash table,

292
00:43:32,000 --> 00:43:36,000
you can if someone's in your slot, you keep going until you find a free position,

293
00:43:36,000 --> 00:43:38,000
they immediately just kick out whatever's there.

294
00:43:38,000 --> 00:43:43,000
The idea is that as you're constructing the symbol table, if the things that actually really matter a lot,

295
00:43:43,000 --> 00:43:50,000
that the symbols that could provide a lot of benefit, if they keep getting kicked out, but then they're still used again, then they'll get added back.

296
00:43:50,000 --> 00:43:55,000
And then over time you end up sort of roughly with a reasonably set good set of symbols.

297
00:43:55,000 --> 00:43:56,000
Yes.

298
00:43:56,000 --> 00:43:57,000
Is the output fixed length?

299
00:43:57,000 --> 00:43:59,000
Is the output fixed length?

300
00:43:59,000 --> 00:44:08,000
For the yes, the byte codes have to be the codes are one byte, but the substring could be variable length up to eight bytes.

301
00:44:08,000 --> 00:44:11,000
Which is fine because again, the columns have to be fixed length.

302
00:44:11,000 --> 00:44:17,000
Right, so we know exactly the number, you know, and so the question is like, if what if you have a, you know,

303
00:44:17,000 --> 00:44:24,000
what if you have a symbol like HTTPS and so you have a bunch of URLs that use that same code, but then someone's got, somebody's got a weird URL that's just HTTPS,

304
00:44:24,000 --> 00:44:32,000
then you need to keep track of this thing is only, you need to wait to note that the string is actually terminated.

305
00:44:32,000 --> 00:44:37,000
So don't interpret any other bytes remaining in my fixed length portion of the value.

306
00:44:37,000 --> 00:44:44,000
Otherwise you could go look up and add, start adding more symbols that aren't actually in the original string.

307
00:44:45,000 --> 00:44:47,000
So again, this is a better way to do it.

308
00:44:47,000 --> 00:44:53,000
It's actually the, this is basically what Z standard is or LZ4 or snappy.

309
00:44:53,000 --> 00:44:57,000
They're basically doing the same thing inside of their, you know, in their compression scheme.

310
00:44:57,000 --> 00:44:59,000
But again, it's opaque to the database system.

311
00:44:59,000 --> 00:45:08,000
This is now an explicit scheme where we can expose the symbol table to the database system and we know exactly what the, how to match the codes to strings.

312
00:45:08,000 --> 00:45:16,000
So you can do all the same tricks, you can, you can do dictionary encoding to find prefixes and other stuff by just looking at the symbol table with actually looking at the real values.

313
00:45:16,000 --> 00:45:18,000
For some, some types of queries.

314
00:45:18,000 --> 00:45:19,000
Yes.

315
00:45:29,000 --> 00:45:34,000
Is the question, is, is it possible to have a code referred to another code?

316
00:45:35,000 --> 00:45:36,000
Yes.

317
00:45:40,000 --> 00:45:41,000
Oh, it's good. Yes.

318
00:45:41,000 --> 00:45:46,000
Questions. Could you have a situation where the inside the symbol table is another code.

319
00:45:46,000 --> 00:45:54,000
So don't interpret all of the bytes in the, in the original string as, as the string itself.

320
00:45:54,000 --> 00:45:57,000
Interpret some of them as action another code that I don't have a crystal look up.

321
00:45:57,000 --> 00:46:03,000
Then how do you record that you should go that portion of the string, you know, should be another look up?

322
00:46:04,000 --> 00:46:14,000
So a lot of the design suggestions they made for this is, is like, does the example of like, okay, you don't do the linear probing to find a free slot, you immediately kick out whatever's in there.

323
00:46:14,000 --> 00:46:17,000
They did this because you can, now you can do this all in SIMD.

324
00:46:17,000 --> 00:46:22,000
Because you can't have conditionals, you can't have loops in, in SIMD.

325
00:46:22,000 --> 00:46:26,000
Right? So by just doing everything like, okay, here's the exact instructions we're always going to do.

326
00:46:26,000 --> 00:46:29,000
If someone's there, kick it out, just overwrite them.

327
00:46:30,000 --> 00:46:32,000
Then like, you can, you can vector all of this.

328
00:46:32,000 --> 00:46:43,000
So in your thing, you would have to have some bits that somewhere that says, oh, by the way, at this offset for this string, don't interpret as a varchar, as an asking character, it's actually a code that you want to feed back into it.

329
00:46:43,000 --> 00:46:47,000
You wouldn't be able to do it with the SIMD.

330
00:46:47,000 --> 00:46:50,000
Okay, so again, I don't have a demonstration of what this looks like.

331
00:46:50,000 --> 00:46:55,000
I can post something on Slack from Peter gave it to me a few years ago.

332
00:46:55,000 --> 00:47:00,000
One thing that is cool, that does show up a lot in data systems now these days are called roaring bitmaps.

333
00:47:00,000 --> 00:47:03,000
Addicure acid, who here has heard of roaring bitmaps before?

334
00:47:03,000 --> 00:47:05,000
Very, very few.

335
00:47:05,000 --> 00:47:23,000
Basically, it's a way to store a bitmap index in a, with different data structures based on the, how often bits are being set to true within some portion of the range that we're trying to record.

336
00:47:23,000 --> 00:47:29,000
So again, a bitmap index can tell you something that just, at some position, is a bit set, yes or no?

337
00:47:29,000 --> 00:47:33,000
So you can use like a, like a bloom filter, like a for set membership and so forth.

338
00:47:33,000 --> 00:47:41,000
So the, the dense chunks, we're to store these as, on-couple-press bitmaps, because there really isn't any way to make that better.

339
00:47:41,000 --> 00:47:43,000
So literally just, just the bits.

340
00:47:43,000 --> 00:47:48,000
Well, you can then turn back and recompress it again with nested and coating with RLE.

341
00:47:48,000 --> 00:47:50,000
We'll ignore that for now.

342
00:47:50,000 --> 00:47:54,000
And then the sparse chunks will just store them as bit-packed arrays of 16 bit integers.

343
00:47:54,000 --> 00:47:58,000
So there's a lot of limitations of this and pick your favorite programming language.

344
00:47:58,000 --> 00:48:02,000
There's a lot of different data systems out there that are used this.

345
00:48:02,000 --> 00:48:06,000
Palosa is the open source version of a system called feature-based.

346
00:48:06,000 --> 00:48:11,000
And feature-based basically stores almost everything as, as, our lot of data is roaring bitmaps.

347
00:48:11,000 --> 00:48:14,000
Using, in the bite slicing techniques, we'll see in a second.

348
00:48:14,000 --> 00:48:16,000
But, here's the basic idea.

349
00:48:16,000 --> 00:48:21,000
So say again, we're going to split up the range of values that we're going to support.

350
00:48:21,000 --> 00:48:24,000
In this case here, I have four chunks.

351
00:48:24,000 --> 00:48:29,000
So for every single key, I want to set to true or look up to see whether it's set to true.

352
00:48:29,000 --> 00:48:32,000
I'm just going to divide it by 2 to the 16.

353
00:48:32,000 --> 00:48:35,000
And that basically tells me what path I want to go down.

354
00:48:35,000 --> 00:48:39,000
And then within the container within that range, I'll just, you know, I can set something to true.

355
00:48:39,000 --> 00:48:42,000
Based on how it's actually being stored.

356
00:48:42,000 --> 00:48:49,000
So then what happens is in the default setting, if the number of values that have been set to true within that range is less than 4096,

357
00:48:49,000 --> 00:48:52,000
then you just store it as uncompressed array.

358
00:48:52,000 --> 00:48:54,000
Otherwise, then stored as a bitmap.

359
00:48:54,000 --> 00:48:57,000
So say I want to do set to key equals 1,000.

360
00:48:57,000 --> 00:48:59,000
I'm going to divide it by 2 to the 16.

361
00:48:59,000 --> 00:49:01,000
I land in this partition here.

362
00:49:01,000 --> 00:49:05,000
And then now I keep track of the number of bits that are set to true in this container.

363
00:49:05,000 --> 00:49:07,000
At this point, it's 0.

364
00:49:07,000 --> 00:49:15,000
So I'll just store the, you know, stored as a bitpact or a 16 bit integer with original value.

365
00:49:15,000 --> 00:49:18,000
Now I'll say I want to store this key here.

366
00:49:18,000 --> 00:49:20,000
I do the same thing, divide it by 2 to the 16.

367
00:49:20,000 --> 00:49:21,000
I land in partition 3.

368
00:49:21,000 --> 00:49:25,000
But now I see that this is being stored as a bitmap.

369
00:49:25,000 --> 00:49:32,000
So I just do the math and say, okay, what offset within that range should I set my bit to true?

370
00:49:32,000 --> 00:49:35,000
So in this case here, just doing the math like this.

371
00:49:35,000 --> 00:49:36,000
You get position 50.

372
00:49:36,000 --> 00:49:39,000
So you just go jump in here and set bit to 50.

373
00:49:39,000 --> 00:49:42,000
That's it.

374
00:49:42,000 --> 00:49:49,000
So as you delete and insert things, it'll just back and forth between what data structure you want to use.

375
00:49:49,000 --> 00:49:50,000
Yes?

376
00:49:50,000 --> 00:49:56,000
What is the overhead of the every unit?

377
00:49:56,000 --> 00:50:00,000
So what's the overhead of storing everything as a bitmap?

378
00:50:00,000 --> 00:50:04,000
So in this example here, what I have, 2 to the 16 different values.

379
00:50:04,000 --> 00:50:09,000
So I need a bit and need to store 2 to the 16 bits that I can set to true.

380
00:50:09,000 --> 00:50:12,000
That's expensive.

381
00:50:12,000 --> 00:50:16,000
That's expensive.

382
00:50:16,000 --> 00:50:18,000
So what's the name of this key?

383
00:50:18,000 --> 00:50:23,000
If I say I have 2 to the 16 and I now go beyond that, I'll just re-mail it.

384
00:50:23,000 --> 00:50:29,000
I'm going to start smaller.

385
00:50:29,000 --> 00:50:33,000
You could do that, sure, but then it's...

386
00:50:33,000 --> 00:50:40,000
Well, you could do that, but for some values, if you're treating everyone the same.

387
00:50:40,000 --> 00:50:44,000
And so maybe the case that your data structure is...

388
00:50:44,000 --> 00:50:47,000
Sorry, the domain range is wide.

389
00:50:47,000 --> 00:50:50,000
But within that, it's sparse.

390
00:50:50,000 --> 00:50:55,000
So now I'm jumping to different cache lines or different jump commemorations to go see what I've set to true.

391
00:50:55,000 --> 00:50:59,000
So there's a bit pack array, which I can then compress it again.

392
00:50:59,000 --> 00:51:03,000
This is better.

393
00:51:03,000 --> 00:51:06,000
Yes.

394
00:51:06,000 --> 00:51:09,000
No, this is from a French Canadian guy, Daniel Lamar.

395
00:51:09,000 --> 00:51:12,000
And it's been a lot of systems uses.

396
00:51:12,000 --> 00:51:17,000
For bitmaps.

397
00:51:17,000 --> 00:51:21,000
I got a bit.

398
00:51:21,000 --> 00:51:25,000
It actually takes inspiration from...

399
00:51:25,000 --> 00:51:28,000
A paper from the Germans called Art, which is not going to cover.

400
00:51:28,000 --> 00:51:33,000
It's basically Adaptive Red X Tri, where they can keep track of the population within some...

401
00:51:33,000 --> 00:51:35,000
So pack down into the tri...

402
00:51:35,000 --> 00:51:38,000
Or they'll change the size of the note.

403
00:51:38,000 --> 00:51:40,000
It's sort of the same idea.

404
00:51:40,000 --> 00:51:43,000
Someone tried to repeat this exact thing for a level down as well.

405
00:51:43,000 --> 00:51:45,000
So you have some parts that we have told.

406
00:51:45,000 --> 00:51:50,000
The question is, because anybody tried to do a hierarchal chunking?

407
00:51:50,000 --> 00:51:54,000
Yes. There is hierarchal bitmaps.

408
00:51:54,000 --> 00:51:56,000
You get screwed on super scaler CPUs.

409
00:51:56,000 --> 00:51:59,000
It's just too much in direction.

410
00:51:59,000 --> 00:52:02,000
I have a slide for that, but we're not covering that this semester.

411
00:52:02,000 --> 00:52:04,000
That's like an idea from the 1990s.

412
00:52:04,000 --> 00:52:06,000
No one does that anymore.

413
00:52:06,000 --> 00:52:10,000
In that case, also two, which you're proposing, why bother doing the extra level?

414
00:52:10,000 --> 00:52:14,000
Just make the top level larger.

415
00:52:14,000 --> 00:52:15,000
Yes.

416
00:52:15,000 --> 00:52:20,000
How do I interpret the bits?

417
00:52:20,000 --> 00:52:23,000
It's a bit mavenx, right?

418
00:52:23,000 --> 00:52:29,000
So you want to say, is 50 set to true?

419
00:52:29,000 --> 00:52:33,000
So after doing the division to figure out I'm going down this path,

420
00:52:33,000 --> 00:52:37,000
I know that whatever the position is, what bit position in this,

421
00:52:37,000 --> 00:52:47,000
is the offset to get the original key is this value plus the offset to reverse it back.

422
00:52:47,000 --> 00:52:51,000
Not the key, but the actual, the starting point of the range.

423
00:52:51,000 --> 00:52:55,000
So now within this, again, so say, I forgot how many things I have in here.

424
00:52:55,000 --> 00:53:00,000
But if I want to know, is position 50 set to true?

425
00:53:00,000 --> 00:53:04,000
Sorry, at position 50, I know that corresponds to my key here.

426
00:53:04,000 --> 00:53:08,000
I can then check whether that bit set to true or not.

427
00:53:08,000 --> 00:53:11,000
In this, I mean, it's a PowerPoint.

428
00:53:11,000 --> 00:53:13,000
I don't know.

429
00:53:13,000 --> 00:53:15,000
Yeah, but it's a bit mavenx.

430
00:53:15,000 --> 00:53:17,000
I think we covered it in the interclass.

431
00:53:17,000 --> 00:53:18,000
We're basically again.

432
00:53:18,000 --> 00:53:25,000
If I want to know if is the value at 2,5 set to something,

433
00:53:25,000 --> 00:53:27,000
ignoring how this actually is mapped to something,

434
00:53:27,000 --> 00:53:32,000
I can then look to see whether a bit that corresponds to position 5 is set to true.

435
00:53:32,000 --> 00:53:37,000
And then some higher level part of the system than interprets what does that mean.

436
00:53:37,000 --> 00:53:40,000
Is this like a rudimentary version of a bloom filter?

437
00:53:40,000 --> 00:53:43,000
Is this a rudimentary version of a bloom filter?

438
00:53:43,000 --> 00:53:46,000
A bloom filter is a more than one thing.

439
00:53:46,000 --> 00:53:50,000
So a bloom filter is a public data structure where you can get false positives.

440
00:53:50,000 --> 00:53:51,000
You don't get false positives.

441
00:53:51,000 --> 00:53:54,000
You want to know something's in there? This will tell you, yes or no?

442
00:53:54,000 --> 00:53:59,000
Could you have more than one data value that matters in index?

443
00:53:59,000 --> 00:54:00,000
No.

444
00:54:00,000 --> 00:54:04,000
Because we're dividing it by 2 to 16 to figure out what position we go to.

445
00:54:04,000 --> 00:54:07,000
And then we take the mod, which is basically the remainder of that,

446
00:54:07,000 --> 00:54:09,000
to figure out what bit it was in that.

447
00:54:09,000 --> 00:54:11,000
So you won't have any overlap.

448
00:54:11,000 --> 00:54:16,000
What if the line is going to be like, what if the same here again?

449
00:54:16,000 --> 00:54:18,000
What if the same here again?

450
00:54:18,000 --> 00:54:22,000
What if that, what do you try to do with it?

451
00:54:22,000 --> 00:54:27,000
Again, so the thing of like, if I'm storing the null bit map,

452
00:54:27,000 --> 00:54:37,000
I can store it as this, and then I'm not going to set the two pool at offset 50 null multiple times.

453
00:54:37,000 --> 00:54:38,000
It doesn't make sense.

454
00:54:38,000 --> 00:54:46,000
It's not accounting data structure. It's just a set membership.

455
00:54:46,000 --> 00:54:50,000
Okay.

456
00:54:50,000 --> 00:54:57,000
So, but better blocks, parkane, or generate variable length runs of values.

457
00:54:57,000 --> 00:55:00,000
Parkane, better blocks is less susceptible to this,

458
00:55:00,000 --> 00:55:05,000
but you could still have that within, you know, across the column chunks.

459
00:55:05,000 --> 00:55:10,000
And then better blocks explicitly avoided delta encoding.

460
00:55:10,000 --> 00:55:15,000
But again, you have this problem where the value of one given to pool would depend on the preceding value.

461
00:55:15,000 --> 00:55:19,000
And again, you can't use SIMD for that.

462
00:55:19,000 --> 00:55:24,000
So, in the case of better blocks, they're always going to use run length encoding the vectors.

463
00:55:24,000 --> 00:55:30,000
Even if the data is the, would you end up encoding a small than the number of lanes you have in the SIMD register?

464
00:55:30,000 --> 00:55:37,000
And so, the thing of like, if I, if I can, in my SIMD registers, I can put 16 values,

465
00:55:37,000 --> 00:55:40,000
but I only have 12 values.

466
00:55:40,000 --> 00:55:44,000
They're still going to use all 16 positions in the SIMD register,

467
00:55:44,000 --> 00:55:48,000
and then the last four just garbage, and they'll clean that up afterwards.

468
00:55:49,000 --> 00:55:57,000
And in the case of fast lines, we'll see in a second, they align things such a way that you're always guaranteed to always be doing useful work in your SIMD registers.

469
00:55:57,000 --> 00:56:02,000
So, fast lines is not a complete file format, no same way that, that better blocks is,

470
00:56:02,000 --> 00:56:10,000
it's just a, you know, a low-level coding scheme that is going to achieve better data parallelism through reordering the tuples in such a way that,

471
00:56:10,000 --> 00:56:18,000
can you always guaranteeing or always maximizing the amount of useful work you're doing in your, in your, in your SIMD, SIMD registers or SIMD instructions.

472
00:56:19,000 --> 00:56:25,000
So, the, they're going to have all the same encoding schemes as better blocks, but again, with the addition of, of delta encoding.

473
00:56:25,000 --> 00:56:37,000
And which really wild about this paper is that, as I said, they were rather than designing it for one, you know, instance or, or configuration of SIMD for one CPU vendor,

474
00:56:37,000 --> 00:56:44,000
they basically say, hey, we're going to make our own virtual ISA, and that's going to have 10, 10, 24 SIMD registers.

475
00:56:44,000 --> 00:56:53,000
Again, even though that hardware does not exist, well, they allude to, like, I think M1 has 10, 24 cache lines and so forth, right?

476
00:56:53,000 --> 00:57:01,000
It's a way to, you know, pretending or seeing, for seeing the, for shadowing the arrival of 10, 24 SIMD registers.

477
00:57:01,000 --> 00:57:08,000
I remember seeing some talk from somebody at Intel saying, well, this is not happening anytime soon, but that was a few years ago, maybe things had changed.

478
00:57:08,000 --> 00:57:16,000
But, but again, the idea is that they're going to define all the operations on basic, basic constructs on these, this virtual ISA,

479
00:57:16,000 --> 00:57:25,000
and then they can show how you can then map that to either scalar, siste code, which apparently still runs really well, or an existing SIMD instructions app.

480
00:57:26,000 --> 00:57:31,000
So the key, key-coder thing that they're doing is with the xenophore transphotos layout.

481
00:57:31,000 --> 00:57:42,000
And again, the idea is that you're going to reorder the values in a column, the tuples in the column, in such a way that you can do as much work as you can entirely on SIMD.

482
00:57:42,000 --> 00:57:48,000
And the reason why we can get away with this, as I said before, is because we have this independence between the physical layer and the logical layer.

483
00:57:49,000 --> 00:57:53,000
The relational model is based on order sets.

484
00:57:53,000 --> 00:58:06,000
So you, as the application program, when you put data into a database, you should not expect that the data will be inserted in the same way that you, or the data will come back to you in your queries in the same way that you inserted it.

485
00:58:06,000 --> 00:58:13,000
Most of the time, as you actually, for some cases, you know, depending on the system, you'll usually get that.

486
00:58:14,000 --> 00:58:17,000
But in case of postgres, as soon as you run the auto vacuum, that's going to start moving tuples around.

487
00:58:17,000 --> 00:58:20,000
And there's no guarantee that you end up with the same ordering.

488
00:58:20,000 --> 00:58:26,000
If you cared about ordering, you would explicitly have an order by call.

489
00:58:26,000 --> 00:58:38,000
Because also, if you think about it too, what's the optimal ordering for a set of column, for one given column versus another, that could depend based on what the query actually wants to do.

490
00:58:39,000 --> 00:58:48,000
So instead, they're going to make the choices. We'll store this in the best way for us to process the data, and then let the query engine above it figure out how to do the stitch things back together.

491
00:58:48,000 --> 00:58:59,000
If you wanted to record the order that things were inserted, you could add a selection vector that basically keeps track of the position of tuples when they arrived, but you ever had that sort of negates any dependant that you're getting.

492
00:59:00,000 --> 00:59:08,000
So again, all the algorithms are going to define, we're going to be based on this virtual ISA, and then they just either emulate it on the AVX512 or scale instructions.

493
00:59:08,000 --> 00:59:20,000
So in the second time, I'm going to show one example of how this works using a column that we'll convert into run length encoding, and then we'll convert that to dictionary coding with deltas.

494
00:59:20,000 --> 00:59:25,000
And we'll see how to do everything in a vectorized way with the reordering.

495
00:59:26,000 --> 00:59:29,000
So say there's our original column, but we have a bunch of extreme characters here.

496
00:59:29,000 --> 00:59:32,000
And so we can first convert this to run length encoding.

497
00:59:32,000 --> 00:59:42,000
So we have our original dictionary values here, cvca, our bcba, and then for each of those, you specify the run length as separate integers.

498
00:59:42,000 --> 00:59:48,000
And the numbers on the bottom are just telling the positions within the vector where they correspond to.

499
00:59:49,000 --> 00:59:51,000
So for this one now, we knew delton coding.

500
00:59:51,000 --> 01:00:02,000
So we would have the starting base value here is 0, and then you could sort of read this as going across that we're just adding, taking the deltas, whatever the seating value for us was.

501
01:00:02,000 --> 01:00:17,000
And then the index vector then tells you how to take this materialization after you've done the reverse the delton coding to then tell you what the actual symbols that you want to get back.

502
01:00:17,000 --> 01:00:25,000
So they'll set things up like this, but then they go ahead and take this delta encoded vector because the index vector you don't actually use, you just materialize it.

503
01:00:25,000 --> 01:00:29,000
Sorry, you just materialize it and then do the delton coding on it.

504
01:00:29,000 --> 01:00:39,000
They then order things in such a way that the continuous values aren't going to be one after, sort of within the original data set, on going one after another.

505
01:00:39,000 --> 01:00:44,000
They're going to be in this example here, four elements away.

506
01:00:44,000 --> 01:00:55,000
So now when you want to decode this vector like this, because it's delton coding, we have the base vector is going to be now four elements instead of just one as before.

507
01:00:55,000 --> 01:00:58,000
So as I start off, I take these four elements.

508
01:00:58,000 --> 01:01:06,000
I do the SIMD edition now to apply it to this vector here, and then I produce the output here.

509
01:01:06,000 --> 01:01:17,000
And they're doing some extra steps to make sure that things are written out to the output and memory at these different locations because these correspond to the positions that they exist in the original index vector.

510
01:01:17,000 --> 01:01:28,000
Because if I just have them be, this is right next to this, right next to that, then that's going to screw up all my ordering that I need for the offsets to jump to other columns.

511
01:01:28,000 --> 01:01:39,000
So even though things are coming out incrementally in out of order, we want to space things out so that it goes back into the right order.

512
01:01:39,000 --> 01:01:44,000
And they talk about the bit shifting and other operations they do in SIMD to make this work.

513
01:01:44,000 --> 01:01:52,000
So now we slide over the window to look at the next operations. And then in this case here, we're taking the output of that was generated from this or these values here.

514
01:01:52,000 --> 01:02:00,000
And then now we do SIMD to apply it to this next one to produce the next set of outputs. And likewise, we do this going down the line like that.

515
01:02:00,000 --> 01:02:01,000
Yes.

516
01:02:01,000 --> 01:02:03,000
So on this we store that off, right?

517
01:02:03,000 --> 01:02:07,000
This question is, we store this top of the yellow one.

518
01:02:07,000 --> 01:02:09,000
So the only yellow one on the whole, you're not sure the whole thing.

519
01:02:09,000 --> 01:02:11,000
You're sort of the whole thing and then the yellow.

520
01:02:11,000 --> 01:02:12,000
And the yellow.

521
01:02:12,000 --> 01:02:13,000
Yes.

522
01:02:13,000 --> 01:02:20,000
Isn't that much worse than what we store for a next coding because it's like, you look at a next coding much smaller?

523
01:02:20,000 --> 01:02:27,000
So the statement is, isn't this much worse than running a coding because the size is smaller.

524
01:02:27,000 --> 01:02:30,000
Yes, but the decompression is bigger than the size.

525
01:02:30,000 --> 01:02:32,000
The decompoding is faster, yes.

526
01:02:32,000 --> 01:02:35,000
Again, classic computer science, computers are storage.

527
01:02:35,000 --> 01:02:47,000
So I can store less data, but it's going to make more work for me to decompress it.

528
01:02:47,000 --> 01:02:51,000
Again, nobody does this as far as there's no home source system that stores data like this.

529
01:02:51,000 --> 01:02:54,000
This is wild.

530
01:02:54,000 --> 01:02:59,000
And again, the paper type of other ways to handle this for other coding schemes.

531
01:02:59,000 --> 01:03:08,000
But again, the basic ideas that were sort of spraying bits out into these vectors so that when we go to decode them,

532
01:03:08,000 --> 01:03:12,000
they line up nicely into our SIMD registers.

533
01:03:12,000 --> 01:03:18,000
We don't have to do this scatter gather stuff to move things around to put it in the form that we actually need.

534
01:03:18,000 --> 01:03:22,000
So you can't actually decode this, the run-like encoding was SIMD, right?

535
01:03:22,000 --> 01:03:27,000
Because you basically need conditional loops now to say, okay, I look at the run-line tier at 7.

536
01:03:27,000 --> 01:03:30,000
Let me loop through and SIMD seven times.

537
01:03:30,000 --> 01:03:33,000
You can co-genit and do it, right?

538
01:03:33,000 --> 01:03:37,000
But we'll see this in a week or so.

539
01:03:37,000 --> 01:03:41,000
That co-genning brings a whole bunch of other problems that make lives harder.

540
01:03:41,000 --> 01:03:42,000
Yes?

541
01:03:42,000 --> 01:03:51,000
Can you also compress this?

542
01:03:51,000 --> 01:03:54,000
Can you also compress this?

543
01:03:55,000 --> 01:03:57,000
So better blocks would?

544
01:03:57,000 --> 01:03:59,000
I don't, these guys don't.

545
01:03:59,000 --> 01:04:09,000
Because if you do run the encoding on this, you're back to this problem.

546
01:04:09,000 --> 01:04:11,000
Okay?

547
01:04:11,000 --> 01:04:12,000
All right.

548
01:04:12,000 --> 01:04:15,000
I want to finish up talking about bits slicing that we can work with.

549
01:04:15,000 --> 01:04:18,000
So all of the schemes we've talked about so far,

550
01:04:19,000 --> 01:04:25,000
parking or better blocks, fast lanes, they are all about, you scan a column,

551
01:04:25,000 --> 01:04:32,000
you're looking at the entire value for each tuple in its entirety every single time.

552
01:04:35,000 --> 01:04:43,000
And that means that you can't, you can't short-circuit the scan of the filter.

553
01:04:44,000 --> 01:04:48,000
If you recognize early on that this data is never going to match.

554
01:04:48,000 --> 01:04:51,000
So I mean, you can do this for strings, the string is decoded.

555
01:04:51,000 --> 01:04:54,000
Like, if you ever look at the string-compare operation or ellipse,

556
01:04:54,000 --> 01:04:56,000
it's just a four-litre looks at everything element.

557
01:04:56,000 --> 01:05:00,000
And then if it doesn't match the thing you're looking for, then it breaks out of the loop.

558
01:05:00,000 --> 01:05:02,000
That's what short-circuiting is.

559
01:05:02,000 --> 01:05:09,000
But if we're comparing two integers, right, ignoring SIMD, it's a single instruction,

560
01:05:10,000 --> 01:05:12,000
is this equal to this?

561
01:05:12,000 --> 01:05:15,000
You're at the lowest level of the hardware, you're looking at these primitive data types.

562
01:05:15,000 --> 01:05:20,000
You can't do any tricks to say, oh, I recognize that the first bit of these two values

563
01:05:20,000 --> 01:05:21,000
are going to match.

564
01:05:21,000 --> 01:05:24,000
So why compare the other 31 bits?

565
01:05:24,000 --> 01:05:30,000
Because that's the interface that the hardware provides you.

566
01:05:30,000 --> 01:05:32,000
The API that hardware provides you.

567
01:05:32,000 --> 01:05:35,000
So, what we're data-see, we can do every one, right?

568
01:05:35,000 --> 01:05:37,000
So what if we could do this?

569
01:05:37,000 --> 01:05:44,000
Is there a way to be able to recognize that we can just look at a subset of a value

570
01:05:44,000 --> 01:05:49,000
and do comparisons based on that and only look at the rest of the data for that value

571
01:05:49,000 --> 01:05:54,000
if we think it's going to be meaningful or still match, if we need to.

572
01:05:54,000 --> 01:05:57,000
So this is what basic idea is called bit slicing.

573
01:05:57,000 --> 01:06:01,000
And this is an old idea from 1990s.

574
01:06:01,000 --> 01:06:03,000
There was a system called Sybase, or it goes to still-around.

575
01:06:03,000 --> 01:06:06,000
Sybase IQ that does this.

576
01:06:06,000 --> 01:06:09,000
The Palosa or feature-based system I mentioned does this now.

577
01:06:09,000 --> 01:06:13,000
The basic idea is that we're going to store, instead of storing the actual integers,

578
01:06:13,000 --> 01:06:17,000
all the bits contiguously, it's like an extreme case of the column store.

579
01:06:17,000 --> 01:06:20,000
So the column store was taking the rows, the rows breaking up to column store,

580
01:06:20,000 --> 01:06:21,000
all the columns contiguously.

581
01:06:21,000 --> 01:06:26,000
Now with bit slicing, we're going to take the bits within a column,

582
01:06:26,000 --> 01:06:29,000
store those things contiguously.

583
01:06:29,000 --> 01:06:34,000
So the first bit for every single value in for all tuples, store that contiguously,

584
01:06:34,000 --> 01:06:36,000
and so forth the other bits.

585
01:06:36,000 --> 01:06:37,000
So let's see an example here.

586
01:06:37,000 --> 01:06:39,000
So there's all places I lived in my life.

587
01:06:39,000 --> 01:06:41,000
I grew up in Maryland, 21042.

588
01:06:41,000 --> 01:06:45,000
It's Compton, it's Pittsburgh, it was constant in a bunch of places.

589
01:06:45,000 --> 01:06:49,000
So we're going to take say 21042, convert it to its binary form,

590
01:06:49,000 --> 01:06:56,000
and then now we're going to store a separate column of bits for every single one of those,

591
01:06:56,000 --> 01:06:58,000
every single one of these positions.

592
01:06:58,000 --> 01:07:02,000
Now these are 30 jubit integers, I'm showing the 17 bits because it has to fit on PowerPoint,

593
01:07:02,000 --> 01:07:07,000
so then we always have a null bitmap, but then we just can scan along,

594
01:07:07,000 --> 01:07:11,000
look at all the bits, and now store them across in separate vectors.

595
01:07:11,000 --> 01:07:15,000
And we'll do the same thing for all the other ones, like this.

596
01:07:15,000 --> 01:07:19,000
Again, think of these as again, these are contiguously bitmaps.

597
01:07:19,000 --> 01:07:22,000
Again, I can use voting bitmaps now to represent this.

598
01:07:22,000 --> 01:07:26,000
In some cases, make the least significant bits, maybe those are not,

599
01:07:26,000 --> 01:07:29,000
those are spars, but the most significant bits are dense.

600
01:07:29,000 --> 01:07:34,000
So now I want to look up queries.

601
01:07:34,000 --> 01:07:41,000
Select star from a customer table where zip code is less than 15, 15, 21, 7.

602
01:07:41,000 --> 01:07:47,000
I can now walk across each slice and construct a result bitmap to see what tuples

603
01:07:47,000 --> 01:07:52,000
that different offsets at the bit level are matching my predicate,

604
01:07:52,000 --> 01:07:58,000
and then I can determine if I don't see any more matches as I'm going along, I stop.

605
01:07:59,000 --> 01:08:04,000
So this is the bit representation for 15, 21, 7.

606
01:08:04,000 --> 01:08:08,000
So say some simplicity, maybe I just look at the first three bits,

607
01:08:08,000 --> 01:08:09,000
because these are all zeros.

608
01:08:09,000 --> 01:08:16,000
So that means that if there's any tuple that has a bit set in these first three vectors,

609
01:08:16,000 --> 01:08:21,000
then I know I can't match my tuple, because it's going to be greater than 15, 15, 15, 21, 7.

610
01:08:21,000 --> 01:08:27,000
So I know I don't need to look at that position anymore.

611
01:08:28,000 --> 01:08:30,000
That's the basic idea of bit slicing.

612
01:08:30,000 --> 01:08:34,000
The original algorithm was all scale instructions, we'll see bit weaving in a second

613
01:08:34,000 --> 01:08:36,000
that can do this in Cindy.

614
01:08:36,000 --> 01:08:40,000
But bit slicing can do some other interesting things, like some queries,

615
01:08:40,000 --> 01:08:45,000
like aggregate queries, there's actually really simple operations to compute these things quickly.

616
01:08:45,000 --> 01:08:49,000
So if you want to compute the sum of integers,

617
01:08:49,000 --> 01:08:54,000
well I could use the hammy weight or the hammy count for just counting the number of bits

618
01:08:55,000 --> 01:08:58,000
that are set to one in a column.

619
01:08:58,000 --> 01:09:01,000
And Intel and Cindy, they're sorry,

620
01:09:01,000 --> 01:09:05,000
the Intel-Prized Instructions that do this very quickly using pop count.

621
01:09:05,000 --> 01:09:10,000
So there's one instruction to go compute the number of bits that are set within some vector.

622
01:09:10,000 --> 01:09:13,000
So now I just count all the bits in the first slice,

623
01:09:13,000 --> 01:09:15,000
and then multiply that by two to the 17,

624
01:09:15,000 --> 01:09:17,000
go to the next slice, count all the bits,

625
01:09:17,000 --> 01:09:20,000
multiply that by two to the 16, and two go all the way down,

626
01:09:20,000 --> 01:09:27,000
and then I end up with the aggregation for all my columns,

627
01:09:27,000 --> 01:09:30,000
for my column here.

628
01:09:30,000 --> 01:09:37,000
Again, that's way faster than just doing integer instructions to add the sum together.

629
01:09:40,000 --> 01:09:44,000
So bit slicing extent, there was original ideas from 1990s,

630
01:09:44,000 --> 01:09:47,000
Jignesh was exploring this topic in the previous decade,

631
01:09:48,000 --> 01:09:51,000
and I think he's looking at it again now, of this technique called bit weaving.

632
01:09:51,000 --> 01:09:55,000
The idea here is that it's an alternative coding scheme for column databases

633
01:09:55,000 --> 01:09:58,000
that's going to be predicated on this idea of bit slicing,

634
01:09:58,000 --> 01:10:04,000
but you're going to do it in such a way that you can maximize the amount of Cindy prospects

635
01:10:04,000 --> 01:10:06,000
or opportunities that you actually have.

636
01:10:06,000 --> 01:10:09,000
What's wild is that he did this work in 2013,

637
01:10:09,000 --> 01:10:12,000
when Cindy was the ADX2,

638
01:10:12,000 --> 01:10:15,000
didn't have all the scattergather features

639
01:10:15,000 --> 01:10:19,000
or the ADX512 stuff we'll see in two weeks.

640
01:10:19,000 --> 01:10:24,000
So the horizontal bit weaving approach we'll see is highly scalar,

641
01:10:24,000 --> 01:10:26,000
but then for the vertical one,

642
01:10:26,000 --> 01:10:28,000
it's basically same as bit slicing,

643
01:10:28,000 --> 01:10:31,000
but it shows you how you can use Cindy for this.

644
01:10:31,000 --> 01:10:32,000
Even though back in the day,

645
01:10:32,000 --> 01:10:35,000
they didn't have all the Cindy capabilities that we have now.

646
01:10:35,000 --> 01:10:38,000
So Jignesh was building this in a project called QuickStep.

647
01:10:38,000 --> 01:10:41,000
Think of this as like ductive E for ductive E,

648
01:10:41,000 --> 01:10:43,000
like it was an embedded OLAP engine,

649
01:10:43,000 --> 01:10:45,000
but it didn't have a SQL front end.

650
01:10:45,000 --> 01:10:47,000
It was just like a storage manager,

651
01:10:47,000 --> 01:10:48,000
it could run OLAP queries,

652
01:10:48,000 --> 01:10:50,000
and store things as column or data.

653
01:10:50,000 --> 01:10:53,000
So I think it almost rocks DB, but for OLAP queries.

654
01:10:53,000 --> 01:10:56,000
And so he spun a lot as an Apache project,

655
01:10:56,000 --> 01:10:58,000
but then he could dive in 2018.

656
01:10:58,000 --> 01:10:59,000
The code is still there.

657
01:10:59,000 --> 01:11:01,000
I think he's still working on it, roughly I think, right?

658
01:11:01,000 --> 01:11:02,000
Somebody's working on it.

659
01:11:02,000 --> 01:11:05,000
But I don't think the bit weaving stuff is actually in any of this,

660
01:11:05,000 --> 01:11:08,000
but the open source version did not have it.

661
01:11:08,000 --> 01:11:09,000
The academic version did.

662
01:11:09,000 --> 01:11:12,000
But as far as I know, no other system implements this.

663
01:11:13,000 --> 01:11:14,000
All right, so the two ways,

664
01:11:14,000 --> 01:11:16,000
the two are encoding schemes that they propose.

665
01:11:16,000 --> 01:11:18,000
The horizontal one is basically a row storage at the bit level,

666
01:11:18,000 --> 01:11:20,000
and the vertical one is going to be like bit slicing,

667
01:11:20,000 --> 01:11:23,000
but you'll do this in such a way for,

668
01:11:23,000 --> 01:11:26,000
that you can be clever about how to get better parallelism

669
01:11:26,000 --> 01:11:28,000
through vectorization.

670
01:11:28,000 --> 01:11:29,000
So I'm going to kind of rush into this,

671
01:11:29,000 --> 01:11:31,000
but I just want to keep the flavor of what's going on.

672
01:11:31,000 --> 01:11:32,000
So with horizontal storage,

673
01:11:32,000 --> 01:11:34,000
the idea is that here's all our troopers who want to store,

674
01:11:34,000 --> 01:11:36,000
and here's the bit representation of the values,

675
01:11:36,000 --> 01:11:38,000
and the red is their values.

676
01:11:38,000 --> 01:11:40,000
So we're going to break this up into segments.

677
01:11:41,000 --> 01:11:48,000
And think of this as like a row group within our data file.

678
01:11:48,000 --> 01:11:50,000
And then within a segment,

679
01:11:50,000 --> 01:11:55,000
we're going to store the data in order going from the top to the bottom.

680
01:11:55,000 --> 01:11:57,000
So this is in the first vector,

681
01:11:57,000 --> 01:11:58,000
we'll have t0.

682
01:11:58,000 --> 01:12:00,000
Second vector, the starting point is t1,

683
01:12:00,000 --> 01:12:03,000
2, 3, and then wrap around in four.

684
01:12:03,000 --> 01:12:07,000
And then we have the same thing for the other segment,

685
01:12:07,000 --> 01:12:09,000
but because we don't have additional entries,

686
01:12:09,000 --> 01:12:12,000
we don't need to store other vectors.

687
01:12:12,000 --> 01:12:14,000
And so in my demonstration here,

688
01:12:14,000 --> 01:12:16,000
I'm showing these are eight bit vectors,

689
01:12:16,000 --> 01:12:18,000
but this would be like a processor word,

690
01:12:18,000 --> 01:12:22,000
which I think for x86 is 16 bits,

691
01:12:22,000 --> 01:12:23,000
because it's from the 80s,

692
01:12:23,000 --> 01:12:25,000
but arm is 32 bits.

693
01:12:25,000 --> 01:12:30,000
Basically, this is the large representation

694
01:12:30,000 --> 01:12:33,000
that the processor can operate on.

695
01:12:33,000 --> 01:12:36,000
So then you know, in addition to destroying the values

696
01:12:36,000 --> 01:12:39,000
as three bits, there's going to be this padding value here

697
01:12:39,000 --> 01:12:42,000
that's going to use as a place to record

698
01:12:42,000 --> 01:12:46,000
for a given operation, was it true or false?

699
01:12:46,000 --> 01:12:49,000
So when you store things in this bit-leading approach,

700
01:12:49,000 --> 01:12:51,000
you always have to have this extra space.

701
01:12:51,000 --> 01:12:54,000
So you're paying a one bit penalty per tuple

702
01:12:54,000 --> 01:12:57,000
to store it in this manner.

703
01:12:57,000 --> 01:12:59,000
But if that's going to allow us to do Cindy operations

704
01:12:59,000 --> 01:13:03,000
or do operations where we just store what happened to our,

705
01:13:04,000 --> 01:13:06,000
whether again, the filter or whatever

706
01:13:06,000 --> 01:13:08,000
we're trying to do, if it applies to true,

707
01:13:08,000 --> 01:13:12,000
we'll store it here rather than some other location in memory.

708
01:13:12,000 --> 01:13:14,000
So let's see an example here.

709
01:13:14,000 --> 01:13:16,000
We have a query, we want to find on our table,

710
01:13:16,000 --> 01:13:18,000
find all the values less than five.

711
01:13:18,000 --> 01:13:22,000
So say we'll just start with the first vector,

712
01:13:22,000 --> 01:13:25,000
so that's going to have t0 and t4.

713
01:13:25,000 --> 01:13:30,000
And then we have now our encoding for the value five,

714
01:13:30,000 --> 01:13:32,000
is this one zero one.

715
01:13:32,000 --> 01:13:34,000
We'll have repeated versions of that,

716
01:13:34,000 --> 01:13:37,000
repeated values for instances of those bits,

717
01:13:37,000 --> 01:13:40,000
corresponding to all the lanes above for the tuples

718
01:13:40,000 --> 01:13:42,000
are trying to compare against.

719
01:13:42,000 --> 01:13:46,000
And then there's some mass vector where they define formulas

720
01:13:46,000 --> 01:13:48,000
that specify how to actually do this arithmetic,

721
01:13:48,000 --> 01:13:51,000
just using bit operations, bit level operations.

722
01:13:51,000 --> 01:13:53,000
So I guess to do addition,

723
01:13:53,000 --> 01:13:56,000
so whatever this formula is here, so it says all ones.

724
01:13:56,000 --> 01:13:58,000
So then now I can just do,

725
01:13:58,000 --> 01:14:01,000
I do the operation, produces the selection vector

726
01:14:01,000 --> 01:14:07,000
that determines whether the predicated value of the true,

727
01:14:07,000 --> 01:14:10,000
if the padding bit is set to zero one.

728
01:14:10,000 --> 01:14:12,000
So in this case, t0 is what?

729
01:14:12,000 --> 01:14:15,000
Is one, so that's less than five, that's set to true,

730
01:14:15,000 --> 01:14:18,000
and then t4 was, what is that?

731
01:14:18,000 --> 01:14:22,000
Seven, so that's set to, that's greater than five,

732
01:14:22,000 --> 01:14:24,000
so that's set to zero.

733
01:14:24,000 --> 01:14:25,000
Right?

734
01:14:25,000 --> 01:14:27,000
Six, sorry.

735
01:14:27,000 --> 01:14:32,000
Right, yeah.

736
01:14:32,000 --> 01:14:36,000
So what's nice about this is that it only requires three instructions

737
01:14:36,000 --> 01:14:38,000
to evaluate a single word.

738
01:14:38,000 --> 01:14:41,000
So I can compare two values within a single instruction,

739
01:14:41,000 --> 01:14:44,000
whereas if I'm just running this in a columnar data,

740
01:14:44,000 --> 01:14:47,000
ignoring compression and all that other stuff and coding seems,

741
01:14:47,000 --> 01:14:51,000
I would basically say, okay, is one less than the five,

742
01:14:51,000 --> 01:14:54,000
true of false, it's five less than six, true of false.

743
01:14:54,000 --> 01:14:56,000
But even without, I can send you,

744
01:14:56,000 --> 01:14:58,000
you can vectorize that, make that run fast,

745
01:14:58,000 --> 01:15:02,000
but even without send if I store the data in this bit-read pattern,

746
01:15:02,000 --> 01:15:10,000
I can just use regular, sistine instructions to get the same kind of data parallelism we would get otherwise.

747
01:15:10,000 --> 01:15:13,000
So now we got to, though, you know, if you apply to all our vectors,

748
01:15:13,000 --> 01:15:16,000
we're going to end up with a bunch of these different,

749
01:15:16,000 --> 01:15:18,000
these selection vectors, right?

750
01:15:18,000 --> 01:15:23,000
But now we got to put this back together to get back the offsets of our tuples,

751
01:15:23,000 --> 01:15:26,000
in our column, that actually were set to true,

752
01:15:26,000 --> 01:15:28,000
or were satisfied our predicate.

753
01:15:28,000 --> 01:15:33,000
So to do this, all you need to do is just bit shifting to sliding everything over,

754
01:15:33,000 --> 01:15:39,000
so many steps, and then I can then collapse it with an OR operation

755
01:15:39,000 --> 01:15:44,000
to generate the selection vector that corresponds to, you know,

756
01:15:44,000 --> 01:15:47,000
whether the tuple match had a given offset.

757
01:15:47,000 --> 01:15:50,000
And then if I need to go back to the original value,

758
01:15:50,000 --> 01:15:55,000
I can use that to figure out, I'll go get the original tuple.

759
01:15:55,000 --> 01:15:59,000
The problem with the selection vector is that it's just bits, right?

760
01:15:59,000 --> 01:16:02,000
We need a way to reverse that and say, you know,

761
01:16:02,000 --> 01:16:04,000
what position is the bit set to true?

762
01:16:04,000 --> 01:16:07,000
To know, again, what offset in our, in our, in our original vector,

763
01:16:07,000 --> 01:16:09,000
match the true.

764
01:16:09,000 --> 01:16:12,000
So the easiest thing to do is just iterate like a simple for loop, right?

765
01:16:12,000 --> 01:16:16,000
If the selection vector is set to true, then add it to an output buffer.

766
01:16:16,000 --> 01:16:19,000
But that sucks, right? That's a for loop.

767
01:16:19,000 --> 01:16:23,000
That's slow, again, just convert bit offsets into values.

768
01:16:23,000 --> 01:16:26,000
As far as I know, there isn't a SIMD instruction.

769
01:16:26,000 --> 01:16:29,000
There isn't a CPU instruction to do this for us.

770
01:16:29,000 --> 01:16:32,000
So the alternative is to use a trick called,

771
01:16:32,000 --> 01:16:35,000
came from the vector wise paper from Peter Bonson,

772
01:16:35,000 --> 01:16:37,000
the paper you guys read next Monday.

773
01:16:37,000 --> 01:16:41,000
We pre-compute all the positions,

774
01:16:41,000 --> 01:16:44,000
so you pre-compute all the selection vectors ahead of time.

775
01:16:44,000 --> 01:16:47,000
And then now you just have a simple array that says,

776
01:16:47,000 --> 01:16:51,000
OK, well, if I take this binary encoding and convert it to the actual number,

777
01:16:51,000 --> 01:16:55,000
in this case it's 150, I jump into my array at offset 150,

778
01:16:55,000 --> 01:16:58,000
and then now I'm storing my selection vector.

779
01:16:58,000 --> 01:17:01,000
They tell you what position is set to true.

780
01:17:01,000 --> 01:17:03,000
And again, in my simple example here,

781
01:17:03,000 --> 01:17:06,000
the size selection vector is a bit.

782
01:17:06,000 --> 01:17:08,000
So with 2 to the 8 possible values,

783
01:17:08,000 --> 01:17:11,000
like this thing is easily sitting in L2 cache.

784
01:17:11,000 --> 01:17:15,000
So it's not, it's not, you know, this big chunk of memory I got to maintain

785
01:17:15,000 --> 01:17:19,000
just to convert bit maps into values.

786
01:17:19,000 --> 01:17:25,000
All right, last one, bit leaving vertical.

787
01:17:25,000 --> 01:17:31,000
So for this one, we're going to store the bits that are all within some offset,

788
01:17:31,000 --> 01:17:33,000
continuously.

789
01:17:33,000 --> 01:17:36,000
So we're going to have one vector for all the bits at position 0,

790
01:17:36,000 --> 01:17:39,000
next vector of position 1, 2, and so forth.

791
01:17:39,000 --> 01:17:41,000
And then now we can down this other segment here,

792
01:17:41,000 --> 01:17:43,000
because only has two values, we still have to put,

793
01:17:43,000 --> 01:17:45,000
we still have to record the entire vector,

794
01:17:45,000 --> 01:17:47,000
but we just have bunch of zeros in there.

795
01:17:47,000 --> 01:17:49,000
So it's wasted space, it's going to waste instructions,

796
01:17:49,000 --> 01:17:51,000
the way that the fastening guys don't like,

797
01:17:51,000 --> 01:17:55,000
but it makes our life easier when we want to do the calculations.

798
01:17:55,000 --> 01:17:57,000
All right, so this is vector here, and so forth.

799
01:17:57,000 --> 01:17:59,000
And again, same thing as a processor word.

800
01:17:59,000 --> 01:18:01,000
But now we don't have this padding bit anymore,

801
01:18:01,000 --> 01:18:03,000
right, to be able to record things.

802
01:18:03,000 --> 01:18:05,000
We can do everything here in Cindy.

803
01:18:05,000 --> 01:18:07,000
So I want to look up and say,

804
01:18:07,000 --> 01:18:09,000
find me all the two boos we're value equals 2.

805
01:18:09,000 --> 01:18:12,000
Again, 2 is just that bit, not like that.

806
01:18:12,000 --> 01:18:16,000
I take the first vector, I generate a mass vector,

807
01:18:16,000 --> 01:18:18,000
that I'm going to use for my comparison,

808
01:18:18,000 --> 01:18:22,000
because these are all zeros, I want to see whether these are

809
01:18:22,000 --> 01:18:26,000
sets of true across this, and I get my selected vector like this.

810
01:18:26,000 --> 01:18:28,000
And then now I run pop count and say,

811
01:18:28,000 --> 01:18:30,000
is there at least one bit set to 1,

812
01:18:30,000 --> 01:18:32,000
if yes, then I keep going.

813
01:18:32,000 --> 01:18:35,000
If there's no bit set to 0, then I short circuit, I terminate.

814
01:18:35,000 --> 01:18:37,000
Now I have to look at the other vectors.

815
01:18:37,000 --> 01:18:41,000
So I only need to look at the subset of the data within a given

816
01:18:42,000 --> 01:18:44,000
value at the bit level.

817
01:18:44,000 --> 01:18:46,000
In this case here, there's some bits set to 1.

818
01:18:46,000 --> 01:18:48,000
So I go down to the next vector.

819
01:18:48,000 --> 01:18:50,000
Now I do comparison with my mass, that says,

820
01:18:50,000 --> 01:18:53,000
find me all the values that are equal to 1 at different positions.

821
01:18:53,000 --> 01:18:55,000
Now my selection vector is all zeros.

822
01:18:55,000 --> 01:18:58,000
So I know there's nothing else that could ever match my predicate,

823
01:18:58,000 --> 01:19:00,000
and I stop.

824
01:19:00,000 --> 01:19:01,000
Right?

825
01:19:01,000 --> 01:19:04,000
So in this stupid example here, I have three bit values.

826
01:19:04,000 --> 01:19:09,000
If I had 64 bit values, or 30 bit values, I could stop early.

827
01:19:10,000 --> 01:19:15,000
And comparing multiple, again, within these structures that I'm doing

828
01:19:15,000 --> 01:19:18,000
simddy, I'm looking at way more values than I would otherwise,

829
01:19:18,000 --> 01:19:23,000
if I were looking at the entire values of the integers.

830
01:19:23,000 --> 01:19:25,000
So we do all the early printing.

831
01:19:25,000 --> 01:19:27,000
We do like a bit slicing.

832
01:19:27,000 --> 01:19:32,000
Again, skip last vector if all the bits are pretty 0.

833
01:19:32,000 --> 01:19:34,000
And then the algorithm has a bunch of,

834
01:19:34,000 --> 01:19:36,000
the paper has a bunch of algorithms to handle all the other operations

835
01:19:36,000 --> 01:19:37,000
you want to do.

836
01:19:37,000 --> 01:19:43,000
I kind of rush this, but we're not going to see this technique used in other papers,

837
01:19:43,000 --> 01:19:46,000
but it's a different way to think about how to store data in database.

838
01:19:46,000 --> 01:19:48,000
Which I like.

839
01:19:48,000 --> 01:19:51,000
All right, so I said this multiple times about today's lecture.

840
01:19:51,000 --> 01:19:57,000
This is really showing you that the logical and physical data in penance is super important.

841
01:19:57,000 --> 01:20:00,000
He was starting to say things like, oh, what do you have pointers to data?

842
01:20:00,000 --> 01:20:03,000
And that, like, as someone who's like,

843
01:20:03,000 --> 01:20:05,000
it hears the relational model, that gives me nightmares.

844
01:20:05,000 --> 01:20:07,000
Like pointers to what? Why?

845
01:20:07,000 --> 01:20:08,000
That's a bad idea.

846
01:20:08,000 --> 01:20:11,000
We want to be able to use just fixed length all sets and do anything we want on the

847
01:20:11,000 --> 01:20:15,000
covers and not worry about, you know,

848
01:20:15,000 --> 01:20:20,000
be able to not worry about explicit pointers or different things,

849
01:20:20,000 --> 01:20:24,000
and not worry about how programmers actually see those pointers.

850
01:20:24,000 --> 01:20:26,000
Everything's done on the cover.

851
01:20:26,000 --> 01:20:28,000
And that way they can do his right sequel, right,

852
01:20:28,000 --> 01:20:30,000
whatever Python code that they want,

853
01:20:30,000 --> 01:20:33,000
operates on our system, and nothing changes.

854
01:20:33,000 --> 01:20:36,000
And then the data parallelism through Symbi is going to be really important tool.

855
01:20:36,000 --> 01:20:38,000
We'll see throughout the entire semester, right?

856
01:20:38,000 --> 01:20:43,000
The paper on Monday next week will be the precursor to using Symbi for stuff.

857
01:20:43,000 --> 01:20:46,000
It was written in 2006 or 2007.

858
01:20:46,000 --> 01:20:51,000
So Symbi wasn't as useful for database as it is now,

859
01:20:51,000 --> 01:20:58,000
but it's designing the query processing model for the database system in such a way that you can vectorize a bunch of stuff.

860
01:20:58,000 --> 01:20:59,000
Okay?

861
01:20:59,000 --> 01:21:01,000
But we'll see algorithms how to do joins,

862
01:21:01,000 --> 01:21:04,000
filters and other things using Symbi going forward.

863
01:21:31,000 --> 01:21:32,000
You can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say, you can't just say

