---
title: PrincetonAlgorithms P91Part27 04_lsd Radix Sort
---

1
00:00:00,000 --> 00:00:06,960
Key Index County is a great algorithm, but that's not the end of the story.

2
00:00:06,960 --> 00:00:11,599
It's also useful for creating a more general purpose algorithm for strings.

3
00:00:11,599 --> 00:00:15,320
The first one we'll look at is called LSD Radix Sort.

4
00:00:15,320 --> 00:00:19,080
Least significant digit for string sorting.

5
00:00:19,080 --> 00:00:21,440
And the idea is a very simple one.

6
00:00:21,440 --> 00:00:27,879
We have strings, so we're going to consider now a small example where strings are all

7
00:00:27,879 --> 00:00:29,679
of the same length.

8
00:00:29,679 --> 00:00:37,200
And again, that's often true in practical applications, the count numbers and so forth.

9
00:00:37,200 --> 00:00:41,480
Strings that use a sort of keys may all be the same length.

10
00:00:41,480 --> 00:00:46,879
And what we're going to do is consider the character positions in the strings and move

11
00:00:46,879 --> 00:00:48,879
from right to left.

12
00:00:48,879 --> 00:00:57,519
The algorithm is to just stably sort using Key Index County on the depth character.

13
00:00:57,520 --> 00:01:01,640
The key goes from the right end and decreases.

14
00:01:01,640 --> 00:01:10,719
So this is a stable sort of those 12 keys sorting on the right most character, the bees

15
00:01:10,719 --> 00:01:14,520
go before the bees go before the bees.

16
00:01:14,520 --> 00:01:20,000
It's crucial that the sort be stable in this application.

17
00:01:20,000 --> 00:01:27,400
And that's why we checked with Key Index County to make sure that it was stable.

18
00:01:27,400 --> 00:01:31,880
So it's a stable sort on the right most character.

19
00:01:31,880 --> 00:01:36,960
And then all we do is move from right to left and do now the second character.

20
00:01:36,960 --> 00:01:42,600
And this now is a stable sort of those same keys on the second character.

21
00:01:42,600 --> 00:01:48,840
So now the ones with A and the second character come before the one with B and so forth.

22
00:01:48,840 --> 00:01:51,280
And not only that, it's stable.

23
00:01:51,280 --> 00:01:59,879
So their relative order is maintained, DAB, CAB, FAD, BAD and so forth.

24
00:01:59,879 --> 00:02:06,680
And then to finish this sort, now we do it on the first key.

25
00:02:06,680 --> 00:02:13,520
And the magic of LSD radix sorting is that once you do it on the first key, then the strings

26
00:02:13,520 --> 00:02:15,039
are all sorted.

27
00:02:15,039 --> 00:02:21,240
So that's three passes, one for each character in the string, each taking the linear time.

28
00:02:21,240 --> 00:02:25,560
We get a string sort, that's a LSD sort.

29
00:02:25,560 --> 00:02:30,560
Now we need to prove that and it works.

30
00:02:30,560 --> 00:02:35,800
And so this is a simple proof by induction that it works.

31
00:02:35,800 --> 00:02:43,520
After we've done eye passes, then we can assume by induction that the strings are sorted

32
00:02:43,520 --> 00:02:46,200
on the last eye characters.

33
00:02:46,359 --> 00:02:51,399
So we're just showing that for two after two passes.

34
00:02:51,399 --> 00:02:53,239
It's sorted on the last two characters.

35
00:02:53,239 --> 00:02:55,639
That's we're assuming by induction.

36
00:02:55,639 --> 00:02:59,359
So now what about the next character that we're sorting?

37
00:02:59,359 --> 00:03:02,399
Well, there's two things that can happen.

38
00:03:02,399 --> 00:03:09,399
If two strings are different on the first key, then this key index sound is going to do the job.

39
00:03:09,399 --> 00:03:14,039
A string that starts with B is going to come before one that starts with a D and so forth.

40
00:03:14,039 --> 00:03:18,840
So if they're different on the sort key, the key index sort puts them in order.

41
00:03:18,840 --> 00:03:23,719
If they're the same on the sort key, then stability does the job.

42
00:03:23,719 --> 00:03:28,919
So all the ones with F stay in order because we insisted on a stable sort.

43
00:03:28,919 --> 00:03:34,759
That's a simple proof by induction that LSD string sort, sorts fixed length strings in ascending

44
00:03:34,759 --> 00:03:35,759
order.

45
00:03:35,759 --> 00:03:38,319
And it's really easy to implement.

46
00:03:38,319 --> 00:03:44,680
This is a complete Java implementation of LSD string sort.

47
00:03:44,680 --> 00:03:50,879
So we're explicitly working with Radix R equals 256.

48
00:03:50,879 --> 00:03:57,280
And where the Radix comes in, the value of the Radix comes in is that's the size of the array

49
00:03:57,280 --> 00:04:01,560
that we use for the counts and the accumulates.

50
00:04:01,560 --> 00:04:03,759
We need one for each character.

51
00:04:03,759 --> 00:04:07,199
For each possible character value, we're going to index into that array.

52
00:04:07,199 --> 00:04:09,839
And that has to be that big.

53
00:04:09,839 --> 00:04:14,280
And all this is is the code for key index counting.

54
00:04:14,280 --> 00:04:25,599
And then all we do is take a variable T that goes down from this string of fixed width W.

55
00:04:25,599 --> 00:04:31,480
We start at the right most character and go down to the first character.

56
00:04:31,480 --> 00:04:38,960
And instead of dealing with our string A of I, we're just looking at the DEEF character,

57
00:04:38,960 --> 00:04:40,960
which is the character.

58
00:04:40,960 --> 00:04:46,960
Otherwise, just with that replacement, in that replacement, it's the same code as we looked

59
00:04:46,960 --> 00:04:48,640
at for key index counting.

60
00:04:48,640 --> 00:04:55,000
So it's due key index counting on the DEEF character going down from the width, from right

61
00:04:55,000 --> 00:04:56,600
to left.

62
00:04:56,600 --> 00:04:59,720
That's remarkably compact code.

63
00:04:59,720 --> 00:05:07,080
And that's going to be the method of choice for lots of situations with fixed length keys

64
00:05:07,080 --> 00:05:10,680
as the sort key.

65
00:05:10,680 --> 00:05:22,000
And it gives us another look at the performance of sorting algorithms that gives us another

66
00:05:22,000 --> 00:05:29,959
line in the table that we're requiring that they be fixed length keys as ways to work

67
00:05:29,959 --> 00:05:30,959
around that.

68
00:05:30,959 --> 00:05:36,240
And we'll consider another algorithm that deals with that in a minute.

69
00:05:36,240 --> 00:05:44,879
But again, it's often or typically the case that the width of the keys is not that long.

70
00:05:44,879 --> 00:05:46,879
It's a small constant.

71
00:05:46,879 --> 00:05:50,839
And therefore, we have a linear time algorithm.

72
00:05:50,839 --> 00:05:58,319
This even works if the keys are binary numbers represented in a binary word.

73
00:05:58,319 --> 00:06:02,560
We can break them up into groups of small number of bits.

74
00:06:02,560 --> 00:06:09,719
Say, 64 bit number could be broken up into 8-8 bit characters or 4-16 bit characters.

75
00:06:09,719 --> 00:06:13,079
4-16 bit characters, W would be 4.

76
00:06:13,079 --> 00:06:18,919
And you can get a huge array of that kind of number sorted in just four passes through

77
00:06:18,919 --> 00:06:19,919
the array.

78
00:06:20,920 --> 00:06:24,080
If they don't have the same length, we have to do some extra work.

79
00:06:24,080 --> 00:06:27,080
It's an interesting problem to think about.

80
00:06:27,080 --> 00:06:30,879
We're going to look at a different method in a minute.

81
00:06:30,879 --> 00:06:39,400
So here's the type of question that somebody might get asked for a job interview.

82
00:06:39,400 --> 00:06:46,759
Actually a web services company every day might be in the position of needing to sort a

83
00:06:46,759 --> 00:06:52,399
million or a billion 32-bit or 64-bit integers.

84
00:06:52,399 --> 00:06:58,319
In an algorithm student interviewing might get asked what sort of method it is.

85
00:06:58,319 --> 00:07:10,039
Now, Senator, you're here at Google and I like to think of the presidency as a job interview.

86
00:07:10,039 --> 00:07:13,279
Now it's hard to get a job as president.

87
00:07:13,279 --> 00:07:14,279
And you're going to the figures.

88
00:07:14,279 --> 00:07:16,680
Now it's also hard to get a job at Google.

89
00:07:16,680 --> 00:07:22,680
We have questions and we ask our candidates questions.

90
00:07:22,680 --> 00:07:26,840
This one is from Larry Schwimmer.

91
00:07:26,840 --> 00:07:28,759
You guys think I'm kidding?

92
00:07:28,759 --> 00:07:31,280
It's right here.

93
00:07:31,280 --> 00:07:38,199
What is the most efficient way to sort a million 32-bit integers?

94
00:07:38,199 --> 00:07:41,199
Well, I'm sorry.

95
00:07:41,199 --> 00:07:43,000
Maybe you think you can do anything.

96
00:07:43,000 --> 00:07:46,639
I think the bubble sort would be the wrong way.

97
00:07:46,639 --> 00:07:50,479
The wrong way to go.

98
00:07:50,479 --> 00:07:51,479
Come on.

99
00:07:51,479 --> 00:07:52,479
Who told it this?

100
00:07:52,479 --> 00:07:53,479
Okay.

101
00:07:53,479 --> 00:07:57,199
I didn't see computer science.

102
00:07:57,199 --> 00:08:00,479
We've got our spies in there.

103
00:08:00,479 --> 00:08:01,479
Okay.

104
00:08:01,479 --> 00:08:05,599
Let's ask a different interview question.

105
00:08:05,599 --> 00:08:11,579
So the bottom line is if you want a good job, maybe you ought to know about LSD's drink

106
00:08:11,579 --> 00:08:13,579
sort.

107
00:08:13,579 --> 00:08:18,500
Actually, this method has been around for a really a long time.

108
00:08:18,500 --> 00:08:21,939
So we'll start with a little bit of a story.

109
00:08:21,939 --> 00:08:28,180
So what do people do in the 19th century when they want to take a census?

110
00:08:28,180 --> 00:08:35,620
And actually the story is that for the 1880 census, it was actually obsolete before it

111
00:08:35,620 --> 00:08:38,220
was completed.

112
00:08:38,220 --> 00:08:43,779
It took 1,500 people seven years to manually process the data.

113
00:08:43,779 --> 00:08:47,540
So during that time, there was room for some invention.

114
00:08:47,540 --> 00:08:55,460
And a man named Herman Holleriff developed an automated machine that could help do the

115
00:08:55,460 --> 00:08:58,100
census faster.

116
00:08:58,100 --> 00:09:06,220
So what his idea was to use punch cards to record data, the kind of data that was taken

117
00:09:06,220 --> 00:09:13,899
in the census, and then the machine could tabulate the data by sorting one column at

118
00:09:13,899 --> 00:09:15,700
a time.

119
00:09:15,700 --> 00:09:19,899
And we'll look a bit at how does that in just a minute.

120
00:09:19,899 --> 00:09:26,740
And the idea was that the result of that was that the next census finished really much

121
00:09:26,740 --> 00:09:33,100
earlier in under budget because this machine automated much of the process.

122
00:09:33,100 --> 00:09:40,899
But it had a really profound effect on the development of computing because punch cards

123
00:09:40,899 --> 00:09:47,860
turned out were useful not just for census, but for many other applications for accounting

124
00:09:47,860 --> 00:09:51,540
and for many other business processes.

125
00:09:51,540 --> 00:09:58,860
And for many decades, punch cards were the primary medium that was used to store, enter

126
00:09:58,860 --> 00:10:01,660
and process data.

127
00:10:01,659 --> 00:10:07,740
And Holleriff's company for building his machine later emerged with a bunch of other companies.

128
00:10:07,740 --> 00:10:12,500
And then in 1924, that company became known as IBM.

129
00:10:12,500 --> 00:10:21,539
And actually, punch cards were used up into the 70s and even the 80s in some places.

130
00:10:21,539 --> 00:10:28,459
So it's important, let's take a little break and talk about the role of LSD's drink

131
00:10:28,460 --> 00:10:37,019
or for a couple of decades, people who wrote programs were working with punch cards.

132
00:10:37,019 --> 00:10:45,940
And of course, as a university, if you want to write a program, you wrote it by putting

133
00:10:45,940 --> 00:10:49,420
one line on each punch card.

134
00:10:49,420 --> 00:10:53,060
And your program, therefore, was a deck, a long deck of punch cards.

135
00:10:53,060 --> 00:10:57,180
You had a thousand line program, you had a thousand punch cards.

136
00:10:57,179 --> 00:11:02,979
They came in boxes that held 2000 and people would carry around these boxes of punch cards

137
00:11:02,979 --> 00:11:05,539
that were their programs.

138
00:11:05,539 --> 00:11:10,139
To enter the program, there was a thing called a card punch which had a keyboard, kind

139
00:11:10,139 --> 00:11:12,099
of like a typewriter.

140
00:11:12,099 --> 00:11:15,699
But all it did, you could see the cards that it actually punch holes in the cards with

141
00:11:15,699 --> 00:11:17,339
what you typed.

142
00:11:17,339 --> 00:11:23,500
Now there was a huge, so then your program was punched cards and there was a machine called

143
00:11:23,580 --> 00:11:30,220
a card reader which would take the cards in and convert those punches back into binary

144
00:11:30,220 --> 00:11:35,740
and characters that again could be processed on the computer.

145
00:11:35,740 --> 00:11:39,860
And then you get your results printed out on paper and a line printer.

146
00:11:39,860 --> 00:11:45,460
So for many, many years, people programmed by making decks of punch cards, handing them

147
00:11:45,460 --> 00:11:50,899
to an operator or put them on a card reader and then waiting for the printed output to

148
00:11:50,899 --> 00:11:51,899
come out.

149
00:11:51,899 --> 00:11:58,899
And then you had to go through the cards and find the first line and then find the second

150
00:11:58,899 --> 00:11:59,899
line.

151
00:11:59,899 --> 00:12:06,899
Well, people figured out a workaround for this really almost right from the beginning.

152
00:12:06,899 --> 00:12:11,899
So the first line was a lot of the things that were going to be printed out on paper.

153
00:12:11,899 --> 00:12:16,899
So you had to go through the cards and find the first line and then find the second line.

154
00:12:16,899 --> 00:12:21,779
Well, people figured out a workaround for this really almost right from the beginning

155
00:12:21,779 --> 00:12:26,699
because this is clearly an intolerable situation.

156
00:12:26,699 --> 00:12:34,340
And along with in the same room with the card punch, there was a thing called a card

157
00:12:34,340 --> 00:12:36,139
sorter.

158
00:12:36,139 --> 00:12:39,379
And the card punch did one of the thing automatically.

159
00:12:39,379 --> 00:12:45,299
Every time you punched a card, it would go to the last six columns of the card and it

160
00:12:45,299 --> 00:12:48,539
would put in a number.

161
00:12:48,539 --> 00:12:49,779
Actually they skipped by ten.

162
00:12:49,779 --> 00:12:54,179
So it would be the first card, it would be card ten, then twenty, thirty.

163
00:12:54,179 --> 00:12:57,620
And your cards would be numbered up to six digits.

164
00:12:57,620 --> 00:13:00,620
So you could have thousands of cards sequentially.

165
00:13:00,620 --> 00:13:05,219
So when you typed in your program, you get the cards numbered in order.

166
00:13:05,219 --> 00:13:09,500
If you wanted to add a few lines to a program, you had room to add a couple of numbers and

167
00:13:09,500 --> 00:13:11,299
repunch the numbers.

168
00:13:11,299 --> 00:13:17,339
But the whole point was that all the time when you're holding on to a card deck, the cards

169
00:13:17,339 --> 00:13:21,779
are in order by number on the right hand column.

170
00:13:21,779 --> 00:13:25,139
And if you dropped it, all you needed to do was sort it.

171
00:13:25,139 --> 00:13:29,419
Or if the machine operator dropped it and it was not viewed as a big deal for your cards

172
00:13:29,419 --> 00:13:35,139
to get out of order because there was this machine that could sort cards.

173
00:13:35,139 --> 00:13:39,460
And the way that it worked was LSD radix sort.

174
00:13:39,460 --> 00:13:45,899
LSD string sort on those characters that are the numbers that keep the card in order.

175
00:13:45,899 --> 00:13:48,500
It would start on the right column.

176
00:13:48,500 --> 00:13:52,500
And there was a physical thing, it sat to what column it was going to sort on.

177
00:13:52,500 --> 00:13:58,340
You put the deck in and it would distribute the ones with zero in the first bin or ones

178
00:13:58,340 --> 00:14:01,379
with one in the second bin all the way up.

179
00:14:01,379 --> 00:14:04,500
And all the cards would start with zero would come in.

180
00:14:04,500 --> 00:14:05,500
And it was stable.

181
00:14:05,500 --> 00:14:09,259
Whatever order the cards were in, that's the order that appear in the pile.

182
00:14:09,259 --> 00:14:12,700
And then you pick them up and you'd have a new deck and it would be all sorted on the

183
00:14:12,700 --> 00:14:14,340
right most column.

184
00:14:14,340 --> 00:14:20,899
Then you move over one position from right to left and run the cards through again.

185
00:14:20,899 --> 00:14:26,220
So with running the cards through the cards order six times, you could get your deck sorted.

186
00:14:26,220 --> 00:14:32,940
So every programmer knew LSD radix sort for decades.

187
00:14:32,940 --> 00:14:38,379
It was not something that was difficult to teach 40 years ago.

188
00:14:38,379 --> 00:14:45,980
And this equipment is now all pretty much gone, but LSD radix sort is still a good algorithm

189
00:14:45,980 --> 00:14:49,740
to know.

190
00:14:49,740 --> 00:14:50,740
Not related.

191
00:14:50,740 --> 00:14:54,060
It is something else that was going on with those initials at that time.

192
00:14:56,220 --> 00:15:00,220
So, you can get your deck sorted.

193
00:15:00,220 --> 00:15:02,220
So, you can get your deck sorted.

194
00:15:02,220 --> 00:15:04,220
And then you can get your deck sorted.

195
00:15:04,220 --> 00:15:06,220
And then you can get your deck sorted.

196
00:15:06,220 --> 00:15:08,220
And then you can get your deck sorted.

197
00:15:08,220 --> 00:15:10,220
And then you can get your deck sorted.

198
00:15:10,220 --> 00:15:12,220
And then you can get your deck sorted.

199
00:15:12,220 --> 00:15:14,220
And then you can get your deck sorted.

200
00:15:14,220 --> 00:15:16,220
And then you can get your deck sorted.

201
00:15:16,220 --> 00:15:18,220
And then you can get your deck sorted.

202
00:15:18,220 --> 00:15:20,220
And then you can get your deck sorted.

203
00:15:20,220 --> 00:15:22,220
And then you can get your deck sorted.

204
00:15:22,220 --> 00:15:24,220
And then you can get your deck sorted.

