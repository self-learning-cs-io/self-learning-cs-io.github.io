---
title: CS143 P7Week203 01 A+Lexical+Analysis
---

1
00:00:00,000 --> 00:00:07,000
Welcome back. This is the first video in our long series on the implementation of compilers.

2
00:00:07,000 --> 00:00:16,000
Recall from last time that a compiler has five phases. We're going to begin by talking about lexical analysis.

3
00:00:16,000 --> 00:00:23,000
And this will probably take us three or four videos to get through at least, and then we'll be moving on in order to the other phases.

4
00:00:23,000 --> 00:00:33,000
Let's start by looking at a small code fragment. The goal of lexical analysis is to divide this piece of code up into its lexical unit.

5
00:00:33,000 --> 00:00:42,000
So things like the keyword if the variable names i and j and the relational operator double equals and so on.

6
00:00:42,000 --> 00:00:54,000
Now, as a human being, this is as we discussed last time. This is a very easy thing to do because there's all kinds of visual clues about where the units lie, where the boundaries between the different units lie.

7
00:00:54,000 --> 00:01:05,000
But a program, a lexical analyzer, doesn't have that kind of luxury. In fact, what the lexical analyzer will see is something that looks more like this.

8
00:01:05,000 --> 00:01:18,000
So here I've written the code out just as a string with all the white space symbols included. And it's from this representation. This is a linear string. You can think of this as bytes in a file that the lexical analyzer has to work.

9
00:01:18,000 --> 00:01:34,000
And it's going to march through placing dividers between the different units. So it'll recognize that there's a division there between the white space and the keyword and a division after the keyword, and thus more white space, the open parent, the i and other white space, double equals.

10
00:01:34,000 --> 00:01:46,000
And so on. And it goes through drawing these lines dividing up the string into its lexical units. And I won't finish the whole thing, but you should get the idea.

11
00:01:46,000 --> 00:02:01,000
Now, it doesn't just place these dividers in the string, however. It doesn't just recognize these substrings. It also needs to classify the different elements of the string, according to their role.

12
00:02:01,000 --> 00:02:17,000
And we call these token classes, or sometimes I'll just call it the class of the token. And in English, these roles are things like noun verb adjective.

13
00:02:17,000 --> 00:02:39,000
Okay, and there's there are many more or no lease or some more. And in a programming language, the classes, the token classes would be things like identifiers keywords.

14
00:02:39,000 --> 00:02:49,000
And then individual pieces of syntax, like an open parent or a closed parent, those would be classes by themselves.

15
00:02:49,000 --> 00:02:53,000
Numbers.

16
00:02:53,000 --> 00:03:07,000
And again, there are more classes, but there's a fix set of classes and each one of these corresponds to some set of strings that could appear in a program.

17
00:03:07,000 --> 00:03:26,000
And then classes correspond to sets of strings. And and these sets of strings can be described relatively straightforwardly. So for example, the token class of identifiers in most programming languages might be something like strings of letters or digits starting with a letter.

18
00:03:26,000 --> 00:03:45,000
For example, a variable name or identifier could be something like a one or it could be foo or it could be b 17. All of those would be valid identifiers and often often there'll be additional characters that are allowed identifiers, but that's the basic idea very, very often.

19
00:03:45,000 --> 00:03:50,000
The main restriction identifiers that they have to start with a letter.

20
00:03:50,000 --> 00:04:04,000
An integer in typical definition of integers and non empty string of digits. So something like zero or 12. Okay, one followed by two, I should say is actually a string, not a number in this case.

21
00:04:04,000 --> 00:04:20,000
And and you know, this actually would admit some numbers you might not think of things like zero zero one would be a valid representation of a number or even zero zero could be a valid integer according to this definition.

22
00:04:20,000 --> 00:04:29,000
Key words are typically just a fix set of reserved words. And so here I've listed a few else if begin and so on.

23
00:04:29,000 --> 00:04:47,000
And then white space is itself a token class. So we actually have to say in that string, which is the representation of the program, what every character in that string, what token or what token class, it's a part of what every sub string is a part of. And that includes the white space.

24
00:04:47,000 --> 00:05:03,000
So for example, if we have a series of three blanks, if I say if and then open parent and I have three blanks in here, these three blanks would be grouped together as white space.

25
00:05:03,000 --> 00:05:11,000
So the goal of lexical analysis is to classify substrings of the program according to their role. This is the token class.

26
00:05:11,000 --> 00:05:23,000
Okay, is it a keyword, a variable identifier. And then to communicate these tokens to the parser. So drawing a picture here. Let's switch colors.

27
00:05:23,000 --> 00:05:32,000
The lexical analyzer communicates with the parser.

28
00:05:32,000 --> 00:05:38,000
Okay, and the functionality here is that the lexical analyzer takes in a string.

29
00:05:38,000 --> 00:05:50,000
Typically stored in a file, so just a sequence of bytes. And then when it sends to the parser is a sequence of pairs, which are the token class.

30
00:05:51,000 --> 00:06:05,000
And substring, which I just say string here, that that of, which is a, so it sends a string, which is a part of the input along with the class, the role that it plays in the, in the language.

31
00:06:05,000 --> 00:06:10,000
And this pair together is called a token.

32
00:06:11,000 --> 00:06:19,000
Alright, and so for example, if my string is that food equals 42.

33
00:06:19,000 --> 00:06:24,000
Alright, then that will go through lexical analyzer and out will come.

34
00:06:24,000 --> 00:06:33,000
I'll write down here three tokens. And these would be identifier.

35
00:06:33,000 --> 00:06:43,000
Food operator say equals.

36
00:06:43,000 --> 00:06:48,000
And integer.

37
00:06:48,000 --> 00:06:52,000
Excuse me, 42.

38
00:06:52,000 --> 00:06:59,000
And here I've just left these things as strings to emphasize that these are strings. So this is not the number 42 at this point in time.

39
00:06:59,000 --> 00:07:04,000
It's the string 42, which is a, plays an integer role in the programming language.

40
00:07:04,000 --> 00:07:24,000
And then these, and what the parser takes as input is this sequence of pairs. So the lexical analyzer essentially runs over the input string and chunks it up into the sequence of pairs where each pair is a token class and a substring of the original input.

41
00:07:24,000 --> 00:07:29,000
Let's return to the example from the beginning of the video. Here it is written out as a string.

42
00:07:29,000 --> 00:07:40,000
And our goal now is to lexically analyze this fragment of code. We want to go through and identify the substrings that are tokens and also their token classes.

43
00:07:40,000 --> 00:07:46,000
So to do this, we're going to need some token classes. So let's give ourselves some of those to work with.

44
00:07:46,000 --> 00:07:51,000
We'll need white space.

45
00:07:51,000 --> 00:08:00,000
And so this is sequences of blanks, new lines, tabs, things like that. We'll need keywords.

46
00:08:00,000 --> 00:08:10,000
And we'll need variables, which we'll call identifiers.

47
00:08:10,000 --> 00:08:17,000
And we'll need integers. And I'll call those numbers here.

48
00:08:17,000 --> 00:08:28,000
And then we're going to have some other operations, sorts of other classes, things like open, parent, close, parent, and semicolon.

49
00:08:28,000 --> 00:08:36,000
And these are interesting. These three are interesting because they're single character token classes. That is, it's a set of strings.

50
00:08:36,000 --> 00:08:49,000
But there's only one string in the set. So the open parent corresponds to exactly as it strings that contain only open parent. So often the punctuation marks of the language are in token classes all by themselves.

51
00:08:49,000 --> 00:08:58,000
Another piece of punctuation that we'll add here is assignments that'll be in a token class by itself because it's such an important operation.

52
00:08:58,000 --> 00:09:07,000
But the double equals will class as a relational operator. We'll just class it as an operator, put it up here.

53
00:09:07,000 --> 00:09:17,000
All right. So now what we're going to do is we're going to go through and tokenize this string. And I'm going to write down for each substring.

54
00:09:17,000 --> 00:09:28,000
What class it is in. And I'm just going to use the first letter here of the class to indicate it's just a save time. So I don't have to write everything out.

55
00:09:28,000 --> 00:09:32,000
And we change colors so we can do this in a different color.

56
00:09:32,000 --> 00:09:42,000
So the first token here is white space token. And then that followed by the if keyword. So OK.

57
00:09:42,000 --> 00:09:54,000
And then we have a blank here, which is another white space. And then the open parent, which is its own token class. So I'll just leave it to identify itself there. And then we have an identifier.

58
00:09:54,000 --> 00:09:56,000
OK.

59
00:09:56,000 --> 00:10:03,000
White space. And then an operator, the double equals.

60
00:10:03,000 --> 00:10:13,000
So that's blank. So that's white space followed by another identifier followed by closed print. So again, a punctuation mark, you know, token class by itself.

61
00:10:13,000 --> 00:10:20,000
And then we have three white space characters. So those are grouped together as a white space token.

62
00:10:20,000 --> 00:10:26,000
Follow by another identifier and more white space.

63
00:10:26,000 --> 00:10:30,000
And another single character token, the assignment operator.

64
00:10:30,000 --> 00:10:32,000
White space.

65
00:10:32,000 --> 00:10:34,000
And a number.

66
00:10:34,000 --> 00:10:39,000
And then semi colon again, a punctuation mark in a token class by itself.

67
00:10:39,000 --> 00:10:42,000
Two white space characters get grouped together.

68
00:10:42,000 --> 00:10:49,000
What follows in is a keyword. So I guess classified as a in the keyword token class.

69
00:10:49,000 --> 00:10:52,000
And then another one of the other.

70
00:10:52,000 --> 00:10:55,000
Run of white space characters.

71
00:10:55,000 --> 00:10:59,000
And then another identifier.

72
00:10:59,000 --> 00:11:04,000
There's actually a blank there that we almost covered it up with our marks.

73
00:11:04,000 --> 00:11:09,000
The assignment operator by itself in a token class.

74
00:11:09,000 --> 00:11:10,000
White space.

75
00:11:10,000 --> 00:11:15,000
A number. And finally, the semi colon by itself.

76
00:11:15,000 --> 00:11:18,000
And then another one of the other two.

77
00:11:18,000 --> 00:11:25,000
We've identified the substrings and we've also labeled each one with its token class.

