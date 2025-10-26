---
title: MIT6042J P84411TreeModelVideo
---

1
00:00:00,000 --> 00:00:06,839
So now we start on a unit of about a half a dozen lectures on probability theory, which most

2
00:00:06,839 --> 00:00:11,560
students have been exposed to to some degree in high school. We'll be taking a more thorough

3
00:00:11,560 --> 00:00:18,699
and theoretical look at the subject in our six lectures. But before we begin, let's give

4
00:00:18,699 --> 00:00:23,600
a little pitch for the significance of it. There's been extensive debate among the faculty

5
00:00:23,600 --> 00:00:29,560
that probability theory belongs right up there with physics and chemistry and math as something

6
00:00:29,559 --> 00:00:34,280
that should be a fundamental requirement for all students to know. It plays an absolutely

7
00:00:34,280 --> 00:00:41,259
fundamental role in the hard sciences and the social sciences and engineering that pervades

8
00:00:41,259 --> 00:00:47,640
all those subjects. And it's hard to imagine somebody legitimately being called fully educated

9
00:00:47,640 --> 00:00:50,119
if they don't understand the basics of probability theory.

10
00:00:50,119 --> 00:00:55,519
Now, historically, probability theory starts off in a somewhat disreputable way in the

11
00:00:55,520 --> 00:01:03,920
16th and early 17th centuries or 17th and early 18th centuries with the analysis of gambling.

12
00:01:03,920 --> 00:01:10,079
But then it goes on to be the basis for the insurance industry and underwriting, predicting

13
00:01:10,079 --> 00:01:14,900
life expectancy so that you could understand what kind of premiums to charge. And then it

14
00:01:14,900 --> 00:01:21,560
goes on to allow the interpretation of noisy data with errors in it and the degree to which

15
00:01:21,560 --> 00:01:29,719
it confirms scientific and social science hypotheses. But true to the historical basis, let's begin

16
00:01:29,719 --> 00:01:36,400
with an example from gambling that illustrates the first idea of probability and then we're going

17
00:01:36,400 --> 00:01:42,680
to be working up to a methodology for inventing probability models called the tree model. So let's

18
00:01:42,680 --> 00:01:49,820
begin with an example from poker. And I'd like to ask a question if I deal a hand of five cards in

19
00:01:49,819 --> 00:01:56,779
poker, what's the probability of getting exactly two jacks? So there are 13 ranks and there are four

20
00:01:56,779 --> 00:02:02,139
kinds of jacks, space heart diamonds clubs. What's the probability that among my five cards I'm going to

21
00:02:02,139 --> 00:02:08,219
get two of them? Well, that's really a counting problem because I'm going to ask first of all, how

22
00:02:08,219 --> 00:02:13,979
many possible five card hands are? We can think of these as the outcomes of a random experiment of just

23
00:02:13,979 --> 00:02:21,819
picking five cards. And there are 52 choose five five card hands in a 52 card deck. Then there are

24
00:02:22,539 --> 00:02:29,419
four choose two ways of picking the suits for the two jacks that we have. And so the total number

25
00:02:29,419 --> 00:02:37,179
of hands that have two jacks is simply four choose two times 52 minus four, the remaining 48 cards

26
00:02:37,180 --> 00:02:43,659
choose the remaining three cards in the five card hand. And then what we would say is that the

27
00:02:43,659 --> 00:02:50,540
probability of two jacks is basically the number of hands with two jacks divided by the total number

28
00:02:50,540 --> 00:02:57,580
of hands. Turns out to be about point oh four. And under this interpretation, basically what we're

29
00:02:57,580 --> 00:03:04,540
thinking of probability is telling us is what fraction of the time do I get what I want? What's

30
00:03:04,539 --> 00:03:09,979
the fraction of the time that I quote, when if winning consists of getting a pair of jacks? And by

31
00:03:09,979 --> 00:03:17,500
symmetry and the fact that we think of one hand is likely to come up as another, this fraction

32
00:03:17,500 --> 00:03:23,419
of hands that equal two jacks, it makes sense to think of that as that's the probability that we'll

33
00:03:23,419 --> 00:03:28,620
get that hand. If we think of all the hands as being equally likely, we yank one out of the deck.

34
00:03:28,700 --> 00:03:33,980
The fraction of time that we would expect to get to jacks is this number about point oh four.

35
00:03:36,060 --> 00:03:41,740
So the general setup of probability, the first idea based on this illustration with a pair of jacks

36
00:03:41,740 --> 00:03:46,379
is that we abstractly we have some set of, we have some random experiment that's capable of

37
00:03:46,379 --> 00:03:53,420
producing outcomes. These are mathematical black boxes called outcomes. Now a certain set of the

38
00:03:53,420 --> 00:03:57,900
outcomes we will think of as an event that we're interested in whether or not it happens. We could

39
00:03:57,900 --> 00:04:04,939
think of it as the event of getting to jacks or the event of winning some game. Then we define the

40
00:04:04,939 --> 00:04:12,379
probability of an event as simply the fraction of the outcomes in the event divided by the total

41
00:04:12,379 --> 00:04:17,980
number of outcomes. Among all the outcomes, what fraction of outcomes are in the event and we

42
00:04:17,980 --> 00:04:24,540
define that to be the probability of the event. That's the first naive idea about probability theory

43
00:04:24,540 --> 00:04:30,780
and it applies to a lot of cases but not always. So now let's begin with an example which illustrates

44
00:04:30,780 --> 00:04:36,060
why this first idea needs to be refined and it doesn't really give us the kind of theory of

45
00:04:36,060 --> 00:04:42,300
probability that we like. So let's turn to a game that was really famous in the 1970s. An

46
00:04:42,300 --> 00:04:49,020
enormously popular TV game hosted by a man named Monty Hall, the actual name of the TV show was

47
00:04:49,419 --> 00:04:55,819
Let's Make a Deal but we'll refer to it as the Monty Hall game. And the way that this Let's Make

48
00:04:55,819 --> 00:05:02,299
a Deal show worked was roughly that there were three doors. This is an actual picture of the stage

49
00:05:02,299 --> 00:05:10,779
set door one, door two, door three. And by the way, this game show still has a fan base. There's a

50
00:05:10,779 --> 00:05:16,779
website for it that you can look at and even 40 years later people are still caught up in the

51
00:05:16,779 --> 00:05:22,459
dynamics of the game. So there are these three doors and the idea is that behind the doors they're

52
00:05:22,459 --> 00:05:28,939
going to have a prize behind one of them and some kind of booby prize often a goat held by a beautiful

53
00:05:28,939 --> 00:05:33,979
woman holding a goat on a leash just to keep things visually interesting and that's what you got

54
00:05:33,979 --> 00:05:39,179
if you lost. And the contestants were going to somehow or other pick a door and hope that the

55
00:05:39,179 --> 00:05:45,019
prize was behind it. There's the picture of the staff, there's Monty Hall and his and the woman

56
00:05:45,019 --> 00:05:50,939
who was his assistant Carol Merrill her job was to pick doors to open and show them to contestants to

57
00:05:50,939 --> 00:05:57,099
see what was behind them. Okay, so here are the rules for the Monty Hall game. The actual quiz show

58
00:05:57,099 --> 00:06:03,500
had more flexible rules but for simplicity we're going to define a nice simple precise and fixed set

59
00:06:03,500 --> 00:06:09,180
of rules. The rules are that behind the three doors two of the doors are going to have goats

60
00:06:09,180 --> 00:06:14,139
and one of the doors is going to have a prize behind it often the prize is something like an automobile

61
00:06:14,139 --> 00:06:21,819
something really desirable. So we can assume that the the the staff on purpose will

62
00:06:22,219 --> 00:06:27,099
place the prize at random behind the three doors because they don't want anybody to have a guest

63
00:06:27,099 --> 00:06:32,219
that some doors are more likely than others to have the prize and they're not allowed to cheat.

64
00:06:32,219 --> 00:06:36,300
That is once they've decided which door is going to have the prize it's supposed to stay there

65
00:06:36,300 --> 00:06:42,139
throughout the game. They can't move it in response to the which door that the contestants picked that

66
00:06:42,139 --> 00:06:49,180
would be cheating. Okay, next the contestant has given opportunity to pick one of the doors.

67
00:06:49,899 --> 00:06:54,379
They're all closed and it's hard to understand how the contestant would make a choice but if the

68
00:06:54,379 --> 00:07:00,860
contestant was worried about the the staff trying to out guess them on where to put the goat and where

69
00:07:00,860 --> 00:07:05,259
to put the prize the contestant should just pick all the doors with equally likely with equally

70
00:07:05,259 --> 00:07:10,300
likely hood then he can't be beaten by they're trying to out guess him he can only be beaten by if they

71
00:07:10,300 --> 00:07:14,060
cheated him by moving the goat after he picked or moving the prize after he picked.

72
00:07:16,620 --> 00:07:22,300
At this point once the contestant has picked the door let's say he picks door two then

73
00:07:22,300 --> 00:07:29,819
Monty instructs Carol to open a door with a goat behind it. So he's going to choose an unpicked door

74
00:07:29,819 --> 00:07:35,980
if the cut if the contestant has picked door two that means the door one and door three are

75
00:07:35,980 --> 00:07:45,740
unpicked doors and Monty tells Carol open either door one or door three whichever one or perhaps both

76
00:07:45,740 --> 00:07:51,420
have a goat behind them and so Carol is going to open one of those doors and show a goat and

77
00:07:51,420 --> 00:07:56,060
everybody knows that they're going to see a goat because that's the way the game works and then at

78
00:07:56,060 --> 00:08:01,580
this point in the contestant has seen that there's a door that has a goat behind it and they're

79
00:08:01,579 --> 00:08:09,419
sitting on an unpicked door and there's another unopened door that hasn't been picked the contestant's

80
00:08:09,419 --> 00:08:15,500
job is to decide whether to stick with the door that they originally picked or switch to the

81
00:08:15,500 --> 00:08:21,659
other unopened door so if they pick door two and Carol open door three they could stick with door two

82
00:08:21,659 --> 00:08:26,939
or they could switch to the closed door one and hope that maybe one has the prize behind it.

83
00:08:27,660 --> 00:08:35,019
Those are the rules of the game. Now the game got a lot of prominence in a magazine column

84
00:08:35,019 --> 00:08:41,659
written by woman named Marilyn Vosavant the name of the magazine column is called Ask Marilyn and

85
00:08:41,659 --> 00:08:49,259
she advertises herself as having the highest recorded IQ of all time some IQ of 200 and so she

86
00:08:50,220 --> 00:08:58,860
runs a popular science in math column with various kinds of puzzles and she took up the analysis

87
00:08:58,860 --> 00:09:05,819
of the Montyhole statistics and came to a conclusion and the conclusion caused a firestorm of response

88
00:09:05,819 --> 00:09:13,500
letters from all sorts of readers even quite sophisticated PhD mathematicians who were arguing with

89
00:09:14,059 --> 00:09:19,419
her conclusion about the way the game worked and the probability of winning according to how the

90
00:09:19,419 --> 00:09:25,820
contestant behaved that debate basically came down to these two positions. Position one said that

91
00:09:25,820 --> 00:09:31,179
sticking and switching were equally good it really didn't matter what the contestant did whether

92
00:09:31,179 --> 00:09:36,220
they stuck with the door that they originally picked or switched to the unpicked door after the

93
00:09:36,220 --> 00:09:40,860
third door had been opened and that their likelihood of finding the prize was the same

94
00:09:41,820 --> 00:09:47,899
and the other argument very emphatically said switching is much better you should really switch

95
00:09:48,379 --> 00:09:57,019
no matter what and how can we resolve this question. Well the general method that we're proposing

96
00:09:57,019 --> 00:10:01,820
for dealing with problems like this where we're really trying to figure out what is the proper

97
00:10:01,820 --> 00:10:11,660
probability model is to draw a tree that shows step by step the progress of the process or experiment

98
00:10:11,660 --> 00:10:18,379
that's going to yield a random output and try to assign probabilities to each of the branches of

99
00:10:18,379 --> 00:10:24,540
the tree as you go and use that as a guide for how to assign probabilities to outcomes. So let's

100
00:10:24,539 --> 00:10:31,740
begin first of all by finding out what the outcomes are. So and we're going to be analyzing

101
00:10:32,299 --> 00:10:39,419
the switch strategy so just for definiteness let's suppose that the contestant adopts the strategy

102
00:10:39,419 --> 00:10:45,259
that they pick a door, Carol opens a door then shows a goad and they're going to switch to the

103
00:10:45,899 --> 00:10:51,099
non-goat closed door that they did not originally pick. They're going to switch to the other door

104
00:10:51,100 --> 00:10:56,379
that they can switch to and we're going to ask about what are the outcomes and consequences of

105
00:10:56,379 --> 00:11:03,899
winning or losing if you adopt that strategy. Well the tree of possibilities goes like this the first

106
00:11:03,899 --> 00:11:09,340
step in this process that we've described is that the staff picks a prize location to a door to put

107
00:11:09,340 --> 00:11:15,740
the prize behind and so there are three possibilities they could put the prize behind door one, door two and

108
00:11:15,740 --> 00:11:22,299
door three. Okay well let's examine the possibility that they put the prize behind door one. So the

109
00:11:22,299 --> 00:11:30,460
next stage is they pick a door and if they pick if the prize is behind one and they pick a door

110
00:11:30,460 --> 00:11:37,340
again there are three possible doors that the contestant might pick contestant has no idea where the

111
00:11:37,340 --> 00:11:44,860
prize is and so the contestant can choose either door one or door two or door three. At that point the

112
00:11:44,860 --> 00:11:54,460
third event in this random process or experiment is that Carol opens a door that has a goad behind it.

113
00:11:55,180 --> 00:12:03,019
So let's examine those possibilities. So one possibility is that the prize is behind one and the

114
00:12:03,019 --> 00:12:11,899
contestant picks door one initially. Well that means that Carol can open either door two or door three

115
00:12:11,899 --> 00:12:17,259
in that circumstance because both of them have goats behind them. On the other hand if the

116
00:12:17,259 --> 00:12:24,860
prize is at one and the contestant picks door two then Carol the two closed doors have one has the

117
00:12:24,860 --> 00:12:30,139
prize one and the other doesn't have the prize three. Carol has to open door three. Likewise if the

118
00:12:30,139 --> 00:12:36,779
contestant picks door three when the prize is behind door one Carol has to open door two. So these

119
00:12:37,740 --> 00:12:44,139
here she's got a two-way branch she can choose to open either of the two goat doors two or three.

120
00:12:44,139 --> 00:12:49,740
Here there's only one on open door with a goat she's got to open three there two. Okay and that

121
00:12:49,740 --> 00:12:54,299
describes the outcomes of the experiment. That's the the process of the experiment and these

122
00:12:54,299 --> 00:12:59,579
nodes at the end these leaves of the tree describe the final outcomes on this branch.

123
00:13:00,860 --> 00:13:05,819
Now if you look at the classification of these outcomes according to winning and losing

124
00:13:05,820 --> 00:13:11,980
well we're looking at the switch strategy. So if the prize was behind one and the contestant

125
00:13:11,980 --> 00:13:18,700
picked door one initially then their strategy is to switch and they're going to switch away from

126
00:13:19,420 --> 00:13:26,140
the prize door. So whichever door Carol opened to reveal the goat two or three the contestant is

127
00:13:26,140 --> 00:13:31,820
going to switch to the other one and they're going to lose. So both of these outcomes count as losses

128
00:13:31,820 --> 00:13:37,500
for the contestant. On the other hand if the contestant picked if the prize was behind door one and

129
00:13:37,500 --> 00:13:45,100
the contestant picked door two then Carol opens the non-priced door three and the contestant switches

130
00:13:45,100 --> 00:13:51,580
from two the only choice they have is to switch to one the prize door they win and this other case

131
00:13:51,580 --> 00:13:56,780
is symmetric and that summarizes the wins and losses in this branch of the tree. Now of course

132
00:13:56,780 --> 00:14:01,420
the rest of the tree is symmetric and so we don't need to talk it through again this is just simply

133
00:14:01,419 --> 00:14:06,699
the case where the prize is behind two the contestant has the same choices and Marilyn has the same

134
00:14:06,699 --> 00:14:13,740
choices of which on open door to choose and likewise if the prize is behind three. So if we look at this

135
00:14:13,740 --> 00:14:20,059
tree the tree is telling us that this is an experiment which we think of as having 12 outcomes

136
00:14:20,059 --> 00:14:25,899
three in each of these may afford in each of these major branches. So there are 12 outcomes of this

137
00:14:25,899 --> 00:14:35,819
random experiment of which on six are losses and six are wins for the contestant and so we discover

138
00:14:35,819 --> 00:14:42,939
that there's six wins and six losses. Now the way that this game works if you think about it if the

139
00:14:43,740 --> 00:14:52,539
switching strategy wins that means that the sticking strategy would have lost because if switching

140
00:14:52,539 --> 00:14:59,259
wins it meant that you switched to the door that had the prize and so if you hadn't switched you

141
00:14:59,259 --> 00:15:07,339
must have been in a door that didn't have the prize and likewise if switching loses then you must have

142
00:15:07,339 --> 00:15:12,219
switched from the door with the prize to a door that didn't have the prize switching and that means

143
00:15:12,219 --> 00:15:17,259
if you'd stock you would have won. So what we can say is that really analyzing the switch strategy

144
00:15:17,259 --> 00:15:22,379
enables us to analyze the stick strategy simultaneously because you win by sticking if and only if

145
00:15:22,379 --> 00:15:26,700
you lose by switching. Now this simplification doesn't hold when there's more than three doors

146
00:15:27,340 --> 00:15:33,179
and that's another exercise but for now it's telling us that if we analyze the switch strategy we

147
00:15:33,179 --> 00:15:39,899
also understand the stick the stick strategy and of course that means that if you use the stick

148
00:15:39,899 --> 00:15:47,419
strategy then the six wins become losses and the six losses become wins and again there are six

149
00:15:47,419 --> 00:15:54,299
ways to lose and six ways to win. So the first false conclusion from this is by reasoning about it as

150
00:15:54,299 --> 00:16:00,860
though they were poker hands and the false conclusion says look sticking and switching win with the same

151
00:16:00,860 --> 00:16:05,659
number of outcomes and lose with the same outcome number of outcomes so it really doesn't matter whether

152
00:16:05,659 --> 00:16:11,659
you stick or switch because the probability of winning in both cases is half the outcome six out of

153
00:16:11,659 --> 00:16:16,860
twelve the probability doesn't matter there makes no difference whether you stick or switch and

154
00:16:16,860 --> 00:16:31,819
that's wrong and we will see why. So the other false argument is that we think about what happens

155
00:16:31,819 --> 00:16:39,899
after Carol has opened a door so where are we? The contestant has picked a door has no idea where the

156
00:16:39,899 --> 00:16:47,419
go to the prize is. Carol opens a door and shows the contestant a go to what's left? Well there's two

157
00:16:47,419 --> 00:16:53,579
closed doors left one is the door with the prize and the other is the door without the prize that has a

158
00:16:53,579 --> 00:17:01,340
go behind it and there's by symmetry of the doors the contestant has no idea what's behind the door

159
00:17:01,340 --> 00:17:07,259
that he picked or the remaining on open door they're equally likely to contain the prize and so

160
00:17:07,900 --> 00:17:14,460
the argument is again that whether you stick or switch between those two doors that haven't yet been

161
00:17:14,460 --> 00:17:20,379
opened it doesn't really matter and so again the stick strategy and the switch strategy each win with

162
00:17:20,379 --> 00:17:29,259
the same 50-50 probability and that's wrong too. What's wrong? Well let's go back and look at this tree

163
00:17:29,259 --> 00:17:34,940
a little bit more carefully to understand what's going on and the first thing to notice about the tree

164
00:17:34,940 --> 00:17:42,620
is that it's not all that the structure of the tree leading to the leaves is not the same. Here's a

165
00:17:42,620 --> 00:17:50,059
leaf that has degree one. So here's a leaf that has degree two one way to get in and only one

166
00:17:50,059 --> 00:17:55,500
way out and here's a leaf that has degree three one way in and two ways out if we think of going

167
00:17:55,500 --> 00:18:01,180
from the root to the leaf and so it's not clear that these branches these leaves should be treated

168
00:18:01,180 --> 00:18:05,980
the same way. Well let's think about it more carefully about how are we going to assign

169
00:18:05,980 --> 00:18:12,860
probabilities to the various steps of the experiment. Well what we're going to assume for simplicity is

170
00:18:12,860 --> 00:18:21,019
that the staph chooses a door at random to place the prize so that means that each of these branches

171
00:18:21,019 --> 00:18:26,220
occurs with probability one-third. A third of the time they put the prize behind door one, a third behind

172
00:18:26,220 --> 00:18:31,980
door two and a third behind door three. Okay let's continue exploring the branch where they put the

173
00:18:31,980 --> 00:18:37,819
prize behind door one. At that point the contestant is going to pick a door and they can pick either

174
00:18:37,819 --> 00:18:45,420
door one, two or three and absent any knowledge and also to be sure that they can't be outgassed by

175
00:18:45,420 --> 00:18:51,420
the staph realizing that they mostly prefer door one so they so if they're going to switch they'll

176
00:18:51,420 --> 00:18:58,380
put the prize behind door one to fully contest it. The contestant's protection is pick a door at random

177
00:18:58,380 --> 00:19:04,460
to have choose a door one-third of the time and door two a third of the time and door three at a

178
00:19:04,460 --> 00:19:10,620
third time in a completely unpredictable way and so the contestant is going to choose each of those

179
00:19:10,620 --> 00:19:18,700
possible doors as their first choice with probability a third. Now what happens next? Well the next thing

180
00:19:18,700 --> 00:19:23,580
that happens is that Carol opens a door. Now this is the case where Carol has a choice. The prize is

181
00:19:23,580 --> 00:19:28,700
behind one and the contestant happened to pick door one. That means doors two and three both have

182
00:19:28,700 --> 00:19:35,180
goats and again for simplicity let's assume that Carol when she has a choice she can open either door

183
00:19:35,180 --> 00:19:40,299
two or door three here does them with equal probability so we're going to assign probability a half to

184
00:19:40,299 --> 00:19:46,460
her opening door two when she has the choice between two or three and probability a half that she'll

185
00:19:46,460 --> 00:19:52,940
open door three and by the way we saw that those were losing outcomes for the contestant but here

186
00:19:52,940 --> 00:19:59,100
things are a little different if the contestant has chose if the prize is behind door one and the contestant

187
00:19:59,100 --> 00:20:07,340
has chosen door two Carol has no choice but to open the only other unchosen door with the goat behind

188
00:20:07,339 --> 00:20:19,019
it namely door three so we could say that this choice really is probability one and I got a

189
00:20:19,019 --> 00:20:23,819
little bit ahead of myself here but having filled in the probabilities on these edges what we figured

190
00:20:23,819 --> 00:20:29,659
out is that the probability of this topmost branch of losing is we said well a third of the time you

191
00:20:29,660 --> 00:20:39,420
go here and a third of that third you go here and half of that time you go to this vertex so it's

192
00:20:39,420 --> 00:20:46,620
a third of a third of a half of that or a weight of one 18th and by symmetry this gets weight one 18th

193
00:20:46,620 --> 00:20:51,980
but this way a third of the time the prize is behind door one a third of the time the contestant

194
00:20:51,980 --> 00:20:59,019
picks door two and after that Carol is forced to open door three so this branch occurs with

195
00:20:59,019 --> 00:21:05,259
certainty it's with probability one which means that we wind up at this leaf a third of a third

196
00:21:05,259 --> 00:21:14,299
of the time for sure and its weight is one ninth and of course by symmetry the similar weights get

197
00:21:14,299 --> 00:21:20,139
assigned to the winning and the losing so what we've concluded is that although there are six

198
00:21:20,140 --> 00:21:28,460
wins the weight of the wins is six ninths because their ether were worth one ninth of the time

199
00:21:28,460 --> 00:21:33,980
and that winning will occur two thirds of the time likewise there are six losses but they're

200
00:21:33,980 --> 00:21:42,940
each only work occur an 18th of a time and so we lose one third of the time by the switch strategy

201
00:21:42,940 --> 00:21:49,980
the summary then is that the probability of winning if you switch is two thirds and

202
00:21:49,980 --> 00:21:56,620
by the remark that you win with switching if and only if you lose with sticking it follows

203
00:21:56,620 --> 00:22:03,339
that you lose by sticking two thirds of the time and so sticking is really a bad strategy and

204
00:22:03,339 --> 00:22:10,299
switching is the dominant way to go now we've in class we back up this theoretical analysis it's

205
00:22:10,299 --> 00:22:16,620
very logical but the question is isn't true and you can do statistical experiments and have

206
00:22:16,619 --> 00:22:22,539
students pick doors and goats and prizes and sure enough it turns out that roughly two thirds

207
00:22:22,539 --> 00:22:27,500
of the time and closer and closer to two thirds the more times you play the game the switching

208
00:22:27,500 --> 00:22:36,779
strategy wins two thirds of the time so the second key idea and probability theory is that the outcomes

209
00:22:36,779 --> 00:22:42,219
may have differing probabilities they may have differing weights unlike the poker hand case

210
00:22:42,299 --> 00:22:49,420
when we look more closely at an experiment with different outcomes we will agree that for various

211
00:22:49,420 --> 00:22:54,220
kinds of reasons of symmetry or logic and so on that it makes sense to assign different

212
00:22:54,220 --> 00:22:59,180
probability weights to the different outcomes it's not the case that the outcomes have uniform

213
00:22:59,180 --> 00:23:08,700
probability that they're all equally likely so to summarize um uh what happens especially

214
00:23:09,100 --> 00:23:13,819
well this example illustrates the confusion about a probability theory that was engendered even

215
00:23:13,819 --> 00:23:20,700
some serious experts but in general intuition is very important as in any subject but it's also

216
00:23:20,700 --> 00:23:26,860
dangerous in probability theory particularly for beginners who aren't experienced about some of

217
00:23:26,860 --> 00:23:32,620
these traps that you can fall into and so our proposal is that you be very wary of intuitive

218
00:23:32,620 --> 00:23:37,900
arguments they're valuable but you need another disciplined way to check them and we propose that

219
00:23:37,900 --> 00:23:44,540
you stick with what we call the four-part method when you're trying to devise a probability model

220
00:23:44,540 --> 00:23:52,140
for some random experiment so the the steps are first that you try to identify the outcomes

221
00:23:52,140 --> 00:23:58,460
of the random experiment and this is where the tree structure comes up if you try to model a step by

222
00:23:58,460 --> 00:24:04,540
step at each stage of the tree what the possible sub-steps are in the overall process that yields

223
00:24:04,539 --> 00:24:08,940
the random outcome that's where the tree comes in as we illustrate it with Monty Hall

224
00:24:10,059 --> 00:24:15,659
the next thing to do is among the outcomes identify the ones that you consider to be

225
00:24:15,659 --> 00:24:23,180
the winning events or the winning outcomes or the outcomes in the event that you are concerned about

226
00:24:23,180 --> 00:24:29,740
whether or not it happens getting to jacks uh picking the door with the prize so you I need to

227
00:24:29,740 --> 00:24:34,539
identify the target event whose probability you're interested in we could call it the winning

228
00:24:34,539 --> 00:24:40,620
event the probability of winning the third key step is to try to use the tree and logic of it to

229
00:24:40,620 --> 00:24:46,700
assign probabilities to the outcomes and the fourth step then is simply to compute the probability of

230
00:24:46,700 --> 00:24:52,460
the event which you do in a very straightforward way by basically adding up the probabilities of

231
00:24:52,460 --> 00:25:00,299
each of the outcomes in the event that is the fourth step method now this Monty Hall tree that we

232
00:25:00,299 --> 00:25:09,019
came up with was um very literal and uh wildly unnecessarily complicated so let's take another

233
00:25:09,019 --> 00:25:14,380
look at that and a simpler argument that will lead us to the same conclusion about how the Monty

234
00:25:14,380 --> 00:25:18,700
Hall game works and we'll do that in the next video

