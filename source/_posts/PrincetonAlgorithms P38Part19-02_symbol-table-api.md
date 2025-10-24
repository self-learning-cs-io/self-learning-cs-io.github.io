---
title: PrincetonAlgorithms P38Part19 02_symbol Table Api
---

1
00:00:00,000 --> 00:00:07,799
Welcome back. In this in the next few lectures, we're going to look at symbol tables, a fundamental

2
00:00:07,799 --> 00:00:14,599
and extremely important data type that have led to all kinds of fascinating implementations.

3
00:00:14,599 --> 00:00:19,719
And we're going to look at several of them in this course. To begin, we'll take a look

4
00:00:19,719 --> 00:00:25,280
at the API and some elementary implementations and various operations that people want to

5
00:00:25,280 --> 00:00:32,960
perform on symbol tables. Start with the API. The idea behind symbol tables is to implement

6
00:00:32,960 --> 00:00:40,880
the following abstraction. We're going to have keys like our keys in priority cues, but

7
00:00:40,880 --> 00:00:47,439
the whole idea is that we're going to want to associate values with each key. So the

8
00:00:47,439 --> 00:00:53,000
two operations that we're going to perform in symbol tables is the insert operation. We're

9
00:00:53,000 --> 00:00:59,079
really putting a key value pair into the symbol table, a value with a specified key. And then

10
00:00:59,079 --> 00:01:05,439
given a key, we want to search for the corresponding value. Those are the two basic operations. Now

11
00:01:05,439 --> 00:01:11,960
the keys in the values can interchange roles, and that's why we have the abstraction to separate them.

12
00:01:11,960 --> 00:01:21,280
So for example, a domain name server might have a look up where you've got a table that's got an

13
00:01:21,280 --> 00:01:30,200
IP address and a URL associated with that IP address. In different clients, we might want to use

14
00:01:30,200 --> 00:01:37,439
this data in different ways. One might want to use the URL as key, given the URL, give us the

15
00:01:37,439 --> 00:01:45,480
corresponding IP address. Another client might want to use the IP address as key, have an IP address,

16
00:01:45,480 --> 00:01:52,520
give me the corresponding client. So those are just a couple of examples. This is a very fundamental

17
00:01:52,520 --> 00:02:03,080
and basic abstraction. And the list of applications is huge. In fact, almost any computer application

18
00:02:03,080 --> 00:02:10,520
system is going to have a symbol table or multiple symbols tables at its core. All the way down to the

19
00:02:10,520 --> 00:02:20,600
basic memory system of the computer or the networking system that your computer access to information depends on.

20
00:02:20,600 --> 00:02:28,840
You can think of it intuitively as a like-addictionary. Well, there used to be books and people would open up

21
00:02:28,840 --> 00:02:35,560
those books to look for a word to find the definition. Nowadays, you're more likely to do that online.

22
00:02:35,960 --> 00:02:43,960
Or when you're trying to find a song to download, you provide the name of the song and then the value of

23
00:02:43,960 --> 00:02:49,960
tell you what computer go to to get that. Or in commercial computing, the key might be an account

24
00:02:49,960 --> 00:02:56,920
number and the value might be the transaction details for that account. Web search is something we

25
00:02:56,920 --> 00:03:02,840
all do multiple times every day and the key is a keyword or a list of keywords and the value is a

26
00:03:02,840 --> 00:03:09,159
list of places where that keyword is found. In this many, many other applications, including

27
00:03:09,159 --> 00:03:17,080
scientific applications where, say, in genomics, people use symbol tables to keep track of

28
00:03:18,680 --> 00:03:25,879
finding markers in a genome and, again, many other applications. So it's a very fundamental

29
00:03:25,879 --> 00:03:32,599
concept and we'll look at plenty of applications. But first, we want to look at some algorithms.

30
00:03:33,800 --> 00:03:40,280
So the way that it's convenient to set up a symbol table is to implement the so-called

31
00:03:40,280 --> 00:03:48,520
associative array abstraction. And the idea behind that is to think about just associating one

32
00:03:48,520 --> 00:03:58,680
value with each key. And well, it's like in a Java array of integers, say, we're only our keys in

33
00:03:58,680 --> 00:04:05,400
that case are indices that are restricted to be between zero and the array size. But we're

34
00:04:05,400 --> 00:04:11,560
only associating one value with each index. We think of storing the value in the array position

35
00:04:11,560 --> 00:04:17,639
given by that index. And a good way to think of a symbol table is, as shown in the right here,

36
00:04:18,519 --> 00:04:26,920
when we put a key value pair onto the symbol table, think of that as using the key to index

37
00:04:26,920 --> 00:04:34,040
an array and storing the value there. Now, this isn't legal in Java if key is not an int and we're

38
00:04:34,040 --> 00:04:41,319
going to do this generic. It can be any type of data. But it's a good way to think about it. And then

39
00:04:41,319 --> 00:04:49,000
to retrieve it, you just give that same key and it'll return the value. So that's our two primary

40
00:04:49,000 --> 00:04:58,759
operations. Put a key value pair into the table. So that is associate the value with key and then

41
00:04:58,759 --> 00:05:04,600
get the value paired with the key. There's particular rules for null that I'll talk about in a second.

42
00:05:06,439 --> 00:05:14,199
Then to properly maintain a symbol table in a dynamic situation, in many clients you want to

43
00:05:14,199 --> 00:05:26,120
support a delete operation and contains a simpler operation than get convenient for many clients.

44
00:05:26,920 --> 00:05:33,480
It just tells us whether there's some value paired with that key in the table is empty and size.

45
00:05:34,279 --> 00:05:39,240
And then another thing that you might want to do is iterate through all the keys in the table.

46
00:05:40,199 --> 00:05:47,319
So those are the basic operations that we're going to want to implement to get the associate of

47
00:05:47,319 --> 00:05:54,360
array abstraction. And then there's many, many possibilities for clients and we'll look at some later on.

48
00:05:57,240 --> 00:06:04,360
Now there's a couple of conventions around null and these are not critical but they make it

49
00:06:04,360 --> 00:06:13,319
a bit more convenient for several implementations. So we're not going to allow null values. You

50
00:06:13,319 --> 00:06:20,680
can't associate null with any key and then we're going to adopt the convention that the get method

51
00:06:20,680 --> 00:06:28,520
returns null if the key is not present in the table. And also the associative array abstraction

52
00:06:28,519 --> 00:06:35,319
is the put method will overwrite an old value with a new value. So these are our consequences.

53
00:06:35,319 --> 00:06:42,519
So the contains implementation is the same for all our symbol table implementations.

54
00:06:43,560 --> 00:06:50,519
If get returns a non-null value then there's a value corresponding to the key in the table if it returns

55
00:06:50,519 --> 00:06:58,919
null it's not get returns couldn't null if keys not present. And the other thing that we can do is we

56
00:06:58,919 --> 00:07:07,639
can use null in some situations or temporary situations to implement a lazy version of the

57
00:07:07,639 --> 00:07:16,439
delete operation. We can associate the key with null internally and then applying one of the

58
00:07:16,439 --> 00:07:22,360
difference whether that's in there or not and some algorithms take advantage of the ability to

59
00:07:22,360 --> 00:07:27,879
use null in this way. These are just conventions and somewhat details but it's important to point

60
00:07:27,879 --> 00:07:34,839
them out at front. So now we're going to want the value to be any generic type at all but the key

61
00:07:34,839 --> 00:07:40,920
type we have to make some natural assumptions about them and actually there's different assumptions

62
00:07:40,920 --> 00:07:47,640
that we make in our implementations depending on the application. One of the most useful ones is

63
00:07:47,640 --> 00:07:55,240
to have comparable keys just as inserting algorithms will assume that the keys have values that come

64
00:07:55,240 --> 00:08:01,960
from a total order and we can use compare to to compare whether one key is less than or not.

65
00:08:02,840 --> 00:08:09,560
This is for two reasons. One is we can get more efficient implementations if we can use the

66
00:08:09,560 --> 00:08:15,959
ordering of the keys to help us find our way around the data structure. And the other reason is that

67
00:08:15,959 --> 00:08:23,560
we can support a broader set of simple table operations that are very convenient for many clients.

68
00:08:23,560 --> 00:08:30,680
And it's very typical for keys to come from an ordered set for example in the dictionary application

69
00:08:30,680 --> 00:08:38,039
or if keys are strings or numbers or count numbers or many other situations. So if they're going to

70
00:08:38,039 --> 00:08:44,039
be comparable we might as well take advantage of it both to get more efficient algorithms and to be

71
00:08:44,039 --> 00:08:51,879
able to take advantage of a broader set of operations. Now in other situations maybe they're not comparable

72
00:08:52,759 --> 00:08:57,959
and all we are allowed to use is to use the equals operation that is everything

73
00:08:59,480 --> 00:09:04,679
every type of data and Java has to support it equals operation that we use that to test whether

74
00:09:04,679 --> 00:09:12,359
they're equal. And there's another family of methods where there's no ordering and there's a

75
00:09:12,359 --> 00:09:23,239
special method called hash code that helps us inject randomness into the process. That's built into

76
00:09:23,239 --> 00:09:30,519
Java and also some classic algorithms depend on that. We're going to start out with the comparable mostly.

77
00:09:30,519 --> 00:09:42,120
And again as with priority cues the best practice is to use immutable types and experience programmers know

78
00:09:42,120 --> 00:09:47,960
this and it's not difficult not to arrange for the natural types of data that people are going to use

79
00:09:47,960 --> 00:09:55,879
for simple table keys. Unreasonable to expect the implementation to work well if the client contain the

80
00:09:55,879 --> 00:10:02,439
valid can change the values of keys that are in the table. If you want that you have to provide that

81
00:10:03,320 --> 00:10:10,759
as a specific operation in a case of simple tables we're not going to do that you have to remove it and put

82
00:10:10,759 --> 00:10:18,439
it back in. All right so there's equality. Now equality again we're getting into programming language

83
00:10:18,439 --> 00:10:25,399
issue but still it's important to be explicit about what's going on with equality. How do we test

84
00:10:26,279 --> 00:10:38,200
if two objects are equal? So Java's got requirements as for compared to and here's the basic

85
00:10:38,200 --> 00:10:46,840
requirements about equals. There's a method that all Java classes in a here for equals but the

86
00:10:46,840 --> 00:10:53,159
default implementation is simply to test whether the references are equal. There's are those

87
00:10:53,159 --> 00:10:58,439
precisely the same objects are not. Usually in applications when we want to have something more

88
00:10:58,439 --> 00:11:04,519
general than that have a concept of a value or like a key in our case and then we want to know if two

89
00:11:04,519 --> 00:11:09,719
references refer to objects that have the same value and we want to call that equal. That's what

90
00:11:09,719 --> 00:11:17,319
equals is about. So anyway we're required to make sure that x is always equal to x and that x

91
00:11:17,320 --> 00:11:25,160
equals y is the same as y equals x and if x equals y y equals z then x equals z that means that

92
00:11:25,160 --> 00:11:34,040
mathematical terms equals is called an equivalence relation and also no object is equal to null.

93
00:11:34,760 --> 00:11:43,400
So those are absolute requirements for Java. And again the default implementation is to check

94
00:11:43,399 --> 00:11:49,480
whether they refer to the same object and that's rarely what we want. Java systems programs maybe

95
00:11:49,480 --> 00:11:58,439
want that. The client programs usually have customized implementations that are based on comparing

96
00:11:58,439 --> 00:12:03,799
some sort of value. In the standard built-in types of the Java language are going to have those

97
00:12:03,799 --> 00:12:09,399
customized implementations and we can rely on them doing what we expect. If we're going to

98
00:12:09,399 --> 00:12:17,000
implement our own types and then use those types as keys and symbol tables you have to exercise

99
00:12:17,000 --> 00:12:23,879
a little bit of care and we'll talk about that briefly. So say we have this simplified date

100
00:12:23,879 --> 00:12:30,120
implementation that we had talked about before. It's a mutable type and every date's got a month

101
00:12:30,120 --> 00:12:38,199
a day and a year. It seems like it should be easy to implement equals. Basically we're just going

102
00:12:38,200 --> 00:12:43,879
to check that all the significant fields are the same. Two dates should be equal if they have the

103
00:12:43,879 --> 00:12:50,759
same day, month and year and if any one of those are not the same value then just return false.

104
00:12:51,640 --> 00:12:58,600
So that seems as if it should work but that doesn't have all the characteristics that we need in

105
00:12:58,600 --> 00:13:08,680
the Java implementation and so all of this code in red shows a model for what you might do if you're

106
00:13:08,680 --> 00:13:17,639
going to implement your own type of data equals for your own type of data. So it shouldn't use it in

107
00:13:17,639 --> 00:13:22,120
connection with inheritance so we're going to use inheritance that much so I won't talk about that.

108
00:13:22,440 --> 00:13:31,560
The type of the argument in the equals must be object. You think it should be date and experts debate

109
00:13:31,560 --> 00:13:39,960
about that and people are interested can look on the web for that kind of date. If it is the case that

110
00:13:39,960 --> 00:13:46,680
you happen to be testing two objects that are the same object for equality you might as well optimize

111
00:13:46,679 --> 00:13:53,399
everything and just test that. If y is a reference that's pointing to the same object as this object

112
00:13:53,399 --> 00:13:58,359
just return true because if you're going to test the values they're going to have the same values anyway

113
00:13:58,359 --> 00:14:04,759
and that's a good optimization for lots of situations. Y go through all that rest of that code if you

114
00:14:04,759 --> 00:14:12,599
know right away they're equal. There's this test for null that has to be there and if it's not there

115
00:14:12,600 --> 00:14:21,720
can lead to nefarious bugs and unusual problems so you're equals test you better test that the client

116
00:14:21,720 --> 00:14:29,240
didn't give you null. They have to be in the same class and well there's a couple of different ways

117
00:14:29,240 --> 00:14:34,920
to check about the same class and that's another religious debate that will ignore we'll use

118
00:14:35,879 --> 00:14:42,919
get class and that's something that's got to work or they'll get an exception in this later

119
00:14:44,120 --> 00:14:51,159
code because since y had to be an object now we have to cast it to a date and then better be

120
00:14:51,159 --> 00:14:59,240
the right class or they're not going to have these fields that we can test for. So details but

121
00:14:59,720 --> 00:15:07,560
anyway you can use this code as a model to implement equals for any data type that you might wind

122
00:15:07,560 --> 00:15:16,039
up using as a symbol table key. Okay so that's a standard this is just in words the standard

123
00:15:16,039 --> 00:15:23,240
repress a recipe for user type optimized for reference equality check against null. Make sure

124
00:15:23,240 --> 00:15:28,519
they're the same type and do the casting and then compare all the similar significant fields.

125
00:15:28,519 --> 00:15:33,639
It could be that if one of the fields is an object then you use that objects equals which

126
00:15:33,639 --> 00:15:44,519
replies the world be rule recursively. Then if you have a field that's an array you can go ahead

127
00:15:44,519 --> 00:15:51,879
and try applying it to each entry and there's implementations in Java you don't want to use a equals

128
00:15:51,879 --> 00:15:56,840
a dot equals b that checks if those arrays are the same objects and that's not what you want

129
00:15:56,840 --> 00:16:01,480
you want to check that all the values are the same. And if it's array of objects you can see that

130
00:16:01,480 --> 00:16:10,600
testing for equals can actually involve a lot of code and a lot of cost. All right so and certainly

131
00:16:10,600 --> 00:16:17,080
you want to follow some of these best practices so fields that are most likely to differ those

132
00:16:17,080 --> 00:16:24,040
the ones you might want to compare first and you're also going to want to make compare to consistent

133
00:16:24,039 --> 00:16:30,599
with the equals. Though we'll generally if we have comparable types we'll use compare to and if

134
00:16:30,599 --> 00:16:37,480
we don't have comparable types we'll use equals. Okay so now let's look at a couple of test clients

135
00:16:37,480 --> 00:16:46,120
before we look at any particular implementation. So this is a test client so symbol tables are

136
00:16:46,120 --> 00:16:56,519
ST is the type symbol table they're generic on key and value and so this

137
00:16:59,560 --> 00:17:06,039
statement builds a new symbol table with string keys and integer values so it's going to associate

138
00:17:06,039 --> 00:17:13,079
integers with strings and so that what the test client's going to do is going to just

139
00:17:13,079 --> 00:17:21,000
go in the loop as long as standard in is not empty and it's going to read strings read a string

140
00:17:21,000 --> 00:17:27,159
off standard input and then put it in the symbol table associated with the value i where it

141
00:17:27,159 --> 00:17:35,480
appear in the input. So this is an indexing client where we associate each string with its position

142
00:17:35,640 --> 00:17:43,640
most recent position in the input and notice it's an associative array implementation so for

143
00:17:43,640 --> 00:17:51,720
example we have two E's and at the end E is associated value 12 the place where it most recently appeared

144
00:17:52,440 --> 00:18:01,079
we could also keep these things in a bag and do a client that gives all the positions that appear

145
00:18:01,079 --> 00:18:04,919
this is a simple indexing client that we use for our traces.

146
00:18:09,720 --> 00:18:14,839
For analysis for bigger problems we'll use a client called a frequency counter client

147
00:18:16,039 --> 00:18:22,119
and so that one is going to read a sequence of strings from standard input and print out the one

148
00:18:22,119 --> 00:18:30,439
that occurs with highest frequency. So for this small data from the beginning of

149
00:18:31,079 --> 00:18:38,199
Dickens' tale of two cities if we run a frequency counter the frequency counter client

150
00:18:39,559 --> 00:18:47,480
and this first argument is just ignore words a fewer than this many letters it'll say that the

151
00:18:47,480 --> 00:18:54,039
most frequent word where there's no word that appears more frequently than it which appears ten times

152
00:18:55,000 --> 00:19:03,799
and we'll want this client to work well for huge data sets so Leapsig is a data set from the web of

153
00:19:03,799 --> 00:19:12,279
20 million words about half a million distinct ones and in that corpus the word government

154
00:19:12,279 --> 00:19:21,960
appears about 25,000 times. So if you have a quadratic time algorithm for implementing

155
00:19:22,920 --> 00:19:29,079
symbol tables or linear time for each operation you're not going to be able to run this client in

156
00:19:29,079 --> 00:19:34,840
a reasonable amount of time for a big amount of data so that's the client that we're going to use for

157
00:19:34,840 --> 00:19:42,759
analysis. Here's the code for that frequency counter client. Again it's similar to the other one

158
00:19:42,759 --> 00:19:49,000
we're creating a symbol table that associates strings with integers. We take that command line

159
00:19:49,000 --> 00:19:55,319
argument which is the minimum length that we care about. We'll read a new word and we'll ignore

160
00:19:55,319 --> 00:20:02,200
the short strings just trap out if the word length is too small and now the integer that we're

161
00:20:02,200 --> 00:20:10,519
going to associate with each word is the frequency of occurrence of that word in the symbol table.

162
00:20:10,519 --> 00:20:15,480
So if the word's not in the symbol table we'll put it there with a frequency of occurrence of

163
00:20:15,480 --> 00:20:21,160
one that's the first time we saw the word. If it is in the symbol table we'll just overwrite

164
00:20:21,160 --> 00:20:28,680
the old value which is stget word with the new value stget word plus one. So increment the frequency

165
00:20:28,680 --> 00:20:35,880
in the symbol table. So this loop reads in all the data and associates each word with its frequency

166
00:20:35,880 --> 00:20:42,039
of occurrence and then we'll have a client that uses the iterator going through all the keys in

167
00:20:42,039 --> 00:20:49,720
the symbol table. It'll get the value associated with each key and if that's bigger than the

168
00:20:49,720 --> 00:20:59,000
maximum found so far we'll save that away and then print out the word that occurs the most often

169
00:20:59,000 --> 00:21:06,599
along with its frequency. So this is a useful and non-trivial client that's enabled by symbol table

170
00:21:07,559 --> 00:21:13,159
but it won't work well unless we have an efficient symbol table operation and we'll use this

171
00:21:13,159 --> 00:21:22,199
client to compare different symbol table implementations. So that's the symbol table API and next we'll

172
00:21:22,200 --> 00:21:24,200
take a look at implementations.

