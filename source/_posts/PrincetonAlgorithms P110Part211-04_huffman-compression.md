---
title: PrincetonAlgorithms P110Part211 04_huffman Compression
---

1
00:00:00,000 --> 00:00:10,320
Next we'll look at huffman encoding. This is a classic algorithm that is still widely used

2
00:00:10,320 --> 00:00:16,179
and effectively used today. It's definitely on the list of algorithms that everyone should

3
00:00:16,179 --> 00:00:24,280
know because it's quite ingenious. So we start out with the idea of variable length codes.

4
00:00:24,280 --> 00:00:28,519
So far we've talked about codes where every character is represented with the same number

5
00:00:28,519 --> 00:00:35,840
of bits but there's no reason to do that. For example look at Morse code. The idea in a way

6
00:00:35,840 --> 00:00:42,359
that we assign dots and dashes to letters is that frequently used letters should have a smaller

7
00:00:42,359 --> 00:00:50,159
number of characters. So for example an E is only one dot and so forth and letters that are

8
00:00:50,159 --> 00:00:58,320
used less frequently like you are going to be longer, more dashes and more characters.

9
00:00:58,320 --> 00:01:09,960
So with this we can, it's an idea, compression idea of let's use fewer characters for fewer bits

10
00:01:09,960 --> 00:01:17,159
or fewer code characters for frequently used characters. Now there's an issue with this and that

11
00:01:17,159 --> 00:01:25,200
is that it can be ambiguous. So this message everybody knows looks like SOS 3 dots followed

12
00:01:25,200 --> 00:01:36,760
by 3 dashes followed by 3 dots but actually it could be any one of these others like v is dot dot

13
00:01:36,760 --> 00:01:46,240
dot dash. So that's good. And then 7 is dash dash dot dot dot so it could be v7 or it could be either

14
00:01:46,240 --> 00:01:51,719
of these two. There's lots of different things that this thing could be. So Morse code is actually

15
00:01:51,719 --> 00:02:00,599
it's not just dots and dashes. It actually has a little space between the code words to avoid this

16
00:02:00,599 --> 00:02:10,759
problem that there's ambiguity caused by the fact that one code word can be prefix of another and

17
00:02:10,759 --> 00:02:19,960
there's no way to tell it is not without separating the code words. So now that's the way it's solved in Morse code

18
00:02:19,960 --> 00:02:26,680
and that's not necessarily the most efficient way to solve it and that's what huffman code addresses. Also a

19
00:02:26,680 --> 00:02:32,800
problem with Morse code is don't be trying to transmit a lot of numbers with Morse code because the codes

20
00:02:32,800 --> 00:02:44,000
for those are pretty long and you'll have much longer representations for codes that involve message

21
00:02:44,000 --> 00:02:50,719
about a lot of numbers. But there's a really elegant way to avoid ambiguity and that is to just

22
00:02:50,719 --> 00:02:57,280
adopt the rule that no code word is going to be a prefix of another one. So fixed length codes do

23
00:02:57,280 --> 00:03:03,439
that. If every code is the same number of bits and every character code different bits then no

24
00:03:03,439 --> 00:03:09,759
code words are prefix of another they're just all different. Another thing you can do is have a special

25
00:03:09,759 --> 00:03:17,199
stop character like the space in Morse code to end to each code word that's really what it's doing. So the

26
00:03:17,199 --> 00:03:23,679
code words are all different and they end with a character that's special and so none can be a prefix of

27
00:03:23,679 --> 00:03:32,719
another one. But there's also just an easy way to just make sure that you use a code that has this

28
00:03:32,719 --> 00:03:42,319
prefix free property. So for example this code here no code word is a prefix of another and it means when

29
00:03:42,319 --> 00:03:50,960
you have bits this is a unique way to decode. So here the compressed bit string starts with zero the

30
00:03:50,960 --> 00:03:56,800
only way that can happen is just the first letter is a. Then when you're done with the a you've got four

31
00:03:56,800 --> 00:04:04,800
one and that leads it's got to be a B and then you get rid of the B and so forth and it's three ones

32
00:04:04,800 --> 00:04:12,960
and zero it's got to be an R and so forth. Since no code words are prefix of another you can just read off

33
00:04:12,960 --> 00:04:22,160
the code from the bit string without having any special stop character any efficiency clause by that.

34
00:04:23,120 --> 00:04:28,480
All we have is the bits and we're able to uniquely decode it and there's a numerous prefix free

35
00:04:28,480 --> 00:04:36,880
codes for example here's another prefix free code that for the same five characters and it actually

36
00:04:36,880 --> 00:04:46,080
uses fewer bits. So the idea of Huffman and coding within these rules where we must have a prefix

37
00:04:46,560 --> 00:04:53,359
free code and we've got a particular message what's amazing about Huffman and coding is that it

38
00:04:53,359 --> 00:05:00,639
finds the code that uses the fewest bits for that message and that's why it's so effective.

39
00:05:01,680 --> 00:05:09,599
So the interesting thing or one interesting thing about prefix free codes is that they're really

40
00:05:09,600 --> 00:05:19,200
easy to represent with tries and the idea is very simple we put characters in the leaf and we

41
00:05:19,200 --> 00:05:25,120
imagine that every this is binary tries so we imagine that there's only two links for known

42
00:05:25,120 --> 00:05:29,920
and we imagine that every left link is labeled zero and every right link is labeled one

43
00:05:31,280 --> 00:05:39,280
and then just following the path from the root to a leaf so say we go right that's 1 0 0

44
00:05:39,760 --> 00:05:46,000
that's D those bits are not stored in the try we just keep we just implicitly keep track of them

45
00:05:46,000 --> 00:05:54,240
if we go left we keep 0 if we go right we keep 1 and so a try for prefix free code uniquely

46
00:05:55,040 --> 00:06:04,080
determines the code and that means that just working with the try we can decompress a bit string

47
00:06:04,080 --> 00:06:09,120
just by starting at the root reading the bits take them where they take us and when we get to a leaf

48
00:06:09,120 --> 00:06:14,639
we've got a character so that's the try corresponding to that code that's the try corresponding to

49
00:06:14,639 --> 00:06:20,800
that code this one starts out with 1 1 so starting at the root we go 1 1 in the first letters A

50
00:06:20,800 --> 00:06:30,639
and then the next letters are 0 0 and so we go 0 0 we come to B and so forth a simple representation

51
00:06:30,639 --> 00:06:38,800
of a prefix free code that is actually makes for easy decoding given the bit string in the

52
00:06:38,800 --> 00:06:47,120
try it's pretty easy to decode you could also keep a symbol table of pairs but

53
00:06:48,720 --> 00:06:55,360
sorry for compression how do we do compression that was expansion so for compression we could just

54
00:06:55,360 --> 00:07:03,199
keep a table and use it you could also use the try to figure out the code by following the path

55
00:07:03,199 --> 00:07:11,279
up to the root and for expansion as I just said you started to the root go left to 0 right of 1

56
00:07:11,759 --> 00:07:23,759
and it's very easy so for expansion so we'll look at the code for both of these and the question

57
00:07:23,759 --> 00:07:30,639
is how to construct the first question is how to construct the try so let's start with the data type

58
00:07:30,879 --> 00:07:41,199
so this is similar to other tree structures that we've built before where we have a character

59
00:07:42,719 --> 00:07:49,439
that we don't use for internal or just for leaves we've got the frequency that we use while

60
00:07:49,439 --> 00:07:56,159
we're building the try but not when we're expanding and then every node has a left and a right

61
00:07:57,120 --> 00:08:04,640
and this is the constructor to just fill in all the fields we need a method to tell us if

62
00:08:05,360 --> 00:08:12,879
current nodes are leaf and that's when so that's both its links are in all and we need a

63
00:08:12,879 --> 00:08:19,440
compared to to compare nodes by frequency and we'll see why that's needed later on so that's the

64
00:08:20,080 --> 00:08:25,840
data type for the nodes that we're going to use to build the tries and so now let's look at

65
00:08:25,839 --> 00:08:35,839
expansion so this is in code what I just talked about so we're going to have a method that reads in

66
00:08:35,839 --> 00:08:41,439
some of the bit string and converts it to a try now that's one clever part of the algorithm

67
00:08:42,480 --> 00:08:52,319
and then the first thing is the number of characters in the code in the message we also get that

68
00:08:52,320 --> 00:09:00,080
so we get to try and then we get the number of characters and then we simply for do a for-loop

69
00:09:00,080 --> 00:09:07,760
for the number of characters and start at the root if we're not at a leaf we read a bit and if it's

70
00:09:07,760 --> 00:09:18,960
zero we go left and it's one we go right and that's it if as soon as we get to a leaf we just

71
00:09:18,960 --> 00:09:24,400
write out the character that we get and then go back to the root and keep going we're not in leaf

72
00:09:24,400 --> 00:09:29,519
now if we read a bit with zero go they'll have to one go to the right when we get to a leaf we write

73
00:09:29,519 --> 00:09:37,120
out the character extremely compact code for expanding given a bit string first thing is the

74
00:09:37,120 --> 00:09:42,720
try we have to talk about how to get the try in from a bit string number of characters and then this

75
00:09:42,720 --> 00:09:50,800
simple loop that expands according to the try representation so that's that works for any

76
00:09:50,800 --> 00:09:59,440
prefix-free code not just the cuff and hoof and code in the running time is obviously linear

77
00:09:59,440 --> 00:10:05,519
in the number of bits because for it's just a loop that choose up a bit every time in the loop

78
00:10:06,000 --> 00:10:17,199
okay so so again for any prefix-free code how are we going to actually write the try well

79
00:10:17,199 --> 00:10:24,879
that it's a little little clever but not by this time you should be ready for this kind of algorithm

80
00:10:25,039 --> 00:10:39,200
what you can do is traverse the try in pre-order and when you come to an internal node you write a zero

81
00:10:40,000 --> 00:10:45,279
when you come to a leaf you write a one followed by the 8-bit character at that leaf

82
00:10:46,000 --> 00:10:58,000
so it's a simple pre-order traversal if this is recursive program not to write out any try if

83
00:10:58,000 --> 00:11:03,439
you're out of leaf I write a one followed by the 8-bit characters at the leaf and you're done

84
00:11:04,639 --> 00:11:12,959
and if you're not at a leaf you simply write a zero and then recursively do the two sub-tries

85
00:11:13,920 --> 00:11:21,360
and that gives a unique representation of the try that can be used to construct a try from that

86
00:11:21,840 --> 00:11:33,120
bit string so and ideas that typically we're talking about a very long message that try itself

87
00:11:33,920 --> 00:11:41,600
is just basically encodings of all the possible characters in a message that's going to tend to be small

88
00:11:42,240 --> 00:11:49,440
compared to the length of the message so for say a genomic sequence there will be only four characters

89
00:11:50,399 --> 00:11:55,440
and the ones that use most frequently hopefully would be encoded with not that many bits

90
00:11:56,800 --> 00:12:02,639
of course but anyway the size of the try itself is going to be much smaller than the length of the message

91
00:12:04,480 --> 00:12:09,120
so reading in the try and there's requires a little bit of thought but

92
00:12:09,759 --> 00:12:14,560
and we see the code the code is extremely simple we just reconstructed from

93
00:12:15,679 --> 00:12:21,360
the pre-order traversal of the try so this is the read try method that we needed that reads bits

94
00:12:21,360 --> 00:12:30,960
from binary standard in and produces a try and it's also recursive and if the bit that you read is

95
00:12:31,840 --> 00:12:39,759
zero that sorry if the bit that you read is one that means you have to create a leaf

96
00:12:41,600 --> 00:12:50,000
otherwise you recursively read the left and read the right and make a new note that

97
00:12:52,400 --> 00:12:57,120
has a sub-tries that the two notes to the left and the right and it doesn't

98
00:12:57,440 --> 00:13:03,440
doesn't use the character in the second one the frequency we initialize to zero

99
00:13:04,639 --> 00:13:10,159
so internal nodes we don't use the character so if you look at what would this

100
00:13:11,200 --> 00:13:22,159
code do for this bit string so the first bit is zero so it's going to recursively call itself to

101
00:13:22,240 --> 00:13:31,199
read a try on the left and so the next bit is a one so it's going to read the next eight bits to

102
00:13:31,199 --> 00:13:40,000
get the A and it's going to return a new node with that character and that's a leaf so that's

103
00:13:40,000 --> 00:13:46,879
going to be the left sub-tree of the initial try the first recursive call and then it'll read

104
00:13:46,960 --> 00:13:52,000
the rights of tree which is an internal node another internal node it takes a little thinking

105
00:13:52,000 --> 00:14:00,000
to convince yourself this works but it does and it's very compact and easy code and it again

106
00:14:00,000 --> 00:14:06,879
works for any prefix code you encode the try with prefix traversal and with a very small amount

107
00:14:06,879 --> 00:14:13,600
of code you can reconstruct the try and transmit a bit string so this is a compression of a

108
00:14:13,680 --> 00:14:20,240
tristructure so now the question is how do we there's a lot of prefix-free codes how do we find

109
00:14:20,240 --> 00:14:25,759
the best one well and there's an idea called the shenan fanno algorithm which says

110
00:14:28,480 --> 00:14:35,440
the key idea is that you've got characters that appear with different frequency and you want to

111
00:14:35,440 --> 00:14:43,120
get the ones that appear very frequent to use fewer bits and so it's of interest to find the ones

112
00:14:43,120 --> 00:14:50,240
that are very frequent and so the shenan fanno algorithm says just divide all the symbols

113
00:14:50,240 --> 00:14:57,600
into two roughly equal frequency and start the ones in the first one with zero and the ones in

114
00:14:57,600 --> 00:15:08,320
the second one with one it's kind of a balanced code and then kind of recur so if you have A appearing

115
00:15:08,320 --> 00:15:13,760
five times and see it during one time that's six for those and then you get six for all the

116
00:15:13,760 --> 00:15:23,680
others and then you try to encode those with you try to use zeros for roughly half the character

117
00:15:23,680 --> 00:15:30,560
in one for roughly half the character so in order to deal with that you have to figure out how to

118
00:15:30,560 --> 00:15:36,000
divide up the symbols and you can imagine an algorithm for doing that but the real problem with

119
00:15:36,000 --> 00:15:43,519
this method is that it's not optimal and so that's the kind of situation that

120
00:15:44,879 --> 00:15:50,559
Huffman was faced with that way back when coming up with the algorithm and the best way to explain

121
00:15:50,559 --> 00:15:57,200
the Huffman algorithm is through a demo and so that's what we'll do next here's a demo of the Huffman

122
00:15:57,200 --> 00:16:03,120
algorithm so the first thing that we do is count the frequency of each character in the input

123
00:16:03,919 --> 00:16:10,799
and so that's what the algorithm is based on so in this case there's five A's two B's one C1D and so

124
00:16:10,799 --> 00:16:22,399
forth so our goal is to use fewer bits to encode A and more bits to include CD and exclamation point

125
00:16:22,399 --> 00:16:32,240
for example and we want a prefix-free code so it's a kind of a bottom-up method so what we do is we

126
00:16:33,200 --> 00:16:41,840
build one node for each character and we keep in the node corresponding to each character

127
00:16:41,840 --> 00:16:49,759
a weight that's equal to the frequency and then we imagine keeping them in sorted order so that's

128
00:16:49,759 --> 00:16:56,240
how the method starts out and remember our node representation had an instance variable that

129
00:16:56,879 --> 00:17:04,799
allowed for storing these frequencies and then the idea is to given these are sub-trives of size

130
00:17:04,799 --> 00:17:11,920
one the idea is to combine two of them and merge into a single tri with a cumulative weight

131
00:17:12,640 --> 00:17:17,200
and so we're going to find the ones that are the two that have the smallest weight

132
00:17:18,559 --> 00:17:25,920
and create a new internal node for them in the way to that node is going to be the sum

133
00:17:26,240 --> 00:17:34,240
of the two weights so that's the frequency of all the code characters below it and then I just

134
00:17:34,240 --> 00:17:45,759
put that into the mix so now we have five sub-trives to deal with and that's the algorithm select the

135
00:17:45,759 --> 00:17:52,880
two tries with minimum weight in this case since we're keeping them sorted it's always going to be the

136
00:17:52,880 --> 00:18:00,080
ones on the left combine them and add their two weights so make a parent node it doesn't matter

137
00:18:00,080 --> 00:18:06,160
which goes on the left which goes right really and then add the weights to get the frequency of

138
00:18:06,160 --> 00:18:15,920
the parent node and then put it into the list now if you look up at the table at the right what we're

139
00:18:15,920 --> 00:18:22,720
doing when we're doing this combination is building up the code corresponding to the characters

140
00:18:24,000 --> 00:18:30,640
moving from left to right so so far we know that the code for d is going to end in zero

141
00:18:31,120 --> 00:18:37,200
and the code for c is going to end in one one and code for exclamation point is going to end in one zero

142
00:18:38,160 --> 00:18:48,720
so now continue the rule now to be an argic combined and again we're figuring out how those code

143
00:18:48,720 --> 00:18:55,600
works end and so now we have just three to choose from now we're going to combine the two big ones

144
00:18:57,120 --> 00:19:05,440
and now we have new prefix bits for all of them and notice that our letter that appears with

145
00:19:05,440 --> 00:19:12,960
highest frequency gets added in late which means it's going to be near the root so now we have just the two

146
00:19:14,960 --> 00:19:19,200
and we finish the algorithm there's only two left now so we combine them

147
00:19:20,799 --> 00:19:28,000
I merge into a single try and that corresponds to preventing a one to the codes for all the other

148
00:19:28,000 --> 00:19:33,200
letters and just having a one bit code for a and that winds up with a single try

149
00:19:34,160 --> 00:19:42,400
that's a demo of huffman's algorithm in operation so the huffman code is the answer to the question

150
00:19:42,400 --> 00:19:49,039
of how to find the best prefix code that's really very simple to describe count of frequency

151
00:19:49,840 --> 00:19:55,920
for each character in the input you start with one node corresponding to each character with weight

152
00:19:55,920 --> 00:20:02,720
given by its frequency and just until you have a single try you select the two with the minimum weight

153
00:20:02,720 --> 00:20:08,720
and merge them into a single try by creating a new node with the weight sequel to some of the frequencies

154
00:20:10,079 --> 00:20:18,160
this algorithm is used in many different and familiar compression applications from pdf to gzp

155
00:20:18,160 --> 00:20:27,759
to np3 to jpeg in it's pretty simple to code up in Java given the tools that algorithmic tools

156
00:20:27,759 --> 00:20:36,000
that we've built up so what we're going to do is this is after the frequencies have been computed

157
00:20:36,000 --> 00:20:41,839
we're going to build a try given the frequencies and we're going to use a priority queue

158
00:20:42,640 --> 00:20:47,839
in our generic priority queue we might as well put nodes on it we implemented a compare to method

159
00:20:48,640 --> 00:20:55,279
all we need is the compare to to be able to build a priority queue from data of that type

160
00:20:55,519 --> 00:21:02,799
so we have a priority queue of nodes and for all the possible character values if they appear in the

161
00:21:02,799 --> 00:21:10,079
message they have a non-zero frequency I will just put a new node with the given frequency that's a

162
00:21:10,079 --> 00:21:17,680
leaf onto the priority queue and then the huffman algorithm is just as long as there's more than one

163
00:21:17,680 --> 00:21:25,680
node in the priority queue we pull off the smallest two nodes we create a new node that's apparent

164
00:21:26,240 --> 00:21:32,880
as character values not used we compute the total frequency of the sum of the two children

165
00:21:33,680 --> 00:21:39,200
and we make those children of that node and then we put that back on the priority queue that's it

166
00:21:39,200 --> 00:21:45,519
take two off foot one on it reduces in size by one so this while loops eventually going to terminate

167
00:21:46,240 --> 00:21:51,839
when it's done there's only one node on the priority queue and that's the root of the try

168
00:21:52,960 --> 00:21:59,039
extremely simple implementation of huffman's algorithm using our generic priority queue

169
00:22:00,160 --> 00:22:08,559
you can also implement it by pre-sorting the nodes as well but this is a particularly nice way to do

170
00:22:09,519 --> 00:22:19,599
now you do have to prove that it produces an optimal code that's in the sense that no code produces

171
00:22:19,599 --> 00:22:27,200
uses fewer bits and that proof is in the book it's not terribly difficult but we're not going to

172
00:22:27,200 --> 00:22:33,599
do it in lecture and that's the huffman proved that in the 1950s so there's no point in looking for

173
00:22:33,599 --> 00:22:40,480
a better prefix-free code and prefix-free codes are so convenient because you don't need to worry

174
00:22:40,480 --> 00:22:53,039
about the ambiguity it's a fine method that's pretty easy to do so now what we have to do when

175
00:22:53,039 --> 00:22:57,519
disadvantage of huffman that some of the methods don't have is we have to have two passes through

176
00:22:57,519 --> 00:23:03,119
the data we have to go through and read all the character frequencies and then build a try

177
00:23:04,000 --> 00:23:10,000
and then we have to go back through the data and encode the file either traversing the try

178
00:23:10,000 --> 00:23:18,240
from bottom up or using just a symbol table to look up the code for each symbol in the message

179
00:23:19,519 --> 00:23:29,359
and the running time is pretty clear from the use of the try the try number characters and the

180
00:23:30,319 --> 00:23:36,639
number of nodes in the try that's just the alphabet size and so it's going to be alphabet size log

181
00:23:36,639 --> 00:23:44,079
r because each try operation might involve depth of log for use of heap implementation and then

182
00:23:44,559 --> 00:23:56,240
have to have the for each character you have to do some kind of look up to a code and actually

183
00:23:56,240 --> 00:24:02,960
the question is can we do better in terms of running time and well stay tuned we'll look at a different

184
00:24:02,960 --> 00:24:07,759
method that's huffman compression

