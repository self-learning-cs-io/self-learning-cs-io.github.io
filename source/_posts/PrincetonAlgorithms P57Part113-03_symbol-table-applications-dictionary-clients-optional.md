---
title: PrincetonAlgorithms P57Part113 03_symbol Table Applications Dictionary Clients Optional
---

1
00:00:00,000 --> 00:00:08,000
Now let's look at a dictionary client, another very useful and common application of symbol tables.

2
00:00:08,000 --> 00:00:17,000
So in this case we're going to write a client called lookupcsv that is going to take three arguments.

3
00:00:17,000 --> 00:00:21,000
The first will be a file name, a so-called comma separated value file.

4
00:00:21,000 --> 00:00:29,000
And the next two arguments are integers which will tell us what to treat as keys and values in the file.

5
00:00:29,000 --> 00:00:36,000
In this example our CSV file relates URLs to IP addresses.

6
00:00:36,000 --> 00:00:41,000
So each line has a URL and an IP address and they're separated by commas.

7
00:00:41,000 --> 00:00:46,000
And in general a CSV file might have many fields separated by commas.

8
00:00:46,000 --> 00:00:50,000
So we number them 0, 1 and so forth starting from the left.

9
00:00:50,000 --> 00:00:58,000
So what we are going to do with this client is specify with integers which field is the key

10
00:00:58,000 --> 00:01:06,000
in which is the value. So if we call this client with the second argument 0 and third argument 1,

11
00:01:06,000 --> 00:01:11,000
that means we want to use the URL field 0 in the CSV file as the key.

12
00:01:11,000 --> 00:01:16,000
Now when we use the IP address that's field 1 in the CSV as the value.

13
00:01:16,000 --> 00:01:25,000
We want to associate keys with values. So the client will build a symbol table that makes those associations for every line in the file.

14
00:01:25,000 --> 00:01:33,000
So this could be a huge file. And then if we want to look up the IP address associated with a given URL,

15
00:01:33,000 --> 00:01:41,000
we can just type in URLs and the client will return the IP address. So do the look up.

16
00:01:41,000 --> 00:01:49,000
So Adobe.com has got this IP address as shown. It's this line here on the table and so forth.

17
00:01:49,000 --> 00:01:55,000
Princeton.edu as this and ebay.edu is not in the file.

18
00:01:55,000 --> 00:02:06,000
Now in the other hand, we could from this same file, we could build a symbol table where we treat the IP address as the key and the URL as the value.

19
00:02:06,000 --> 00:02:14,000
So in that case it will build a symbol table with IP addresses as keys and we can type in an IP address and get the associated URL.

20
00:02:14,000 --> 00:02:21,000
So with one client we can handle lookups of all kinds in CSV files.

21
00:02:21,000 --> 00:02:33,000
For example, here's another CSV file that from biology that deals with amino acids and codons and names.

22
00:02:34,000 --> 00:02:46,000
So in this case, the first field is three letters from DNA sequence which represents a codon and certain codons have the names.

23
00:02:46,000 --> 00:02:52,000
That's the amino acid. So TCC is called serine and so forth.

24
00:02:53,000 --> 00:03:08,000
And that's an association that's well known to biologists and then you can use this lookup CSV client to quickly get the name associated with any given codon.

25
00:03:08,000 --> 00:03:19,000
And that's just another simple example. This is a very general tool. Any CSV file, you can pick any field as the key and any other field as the value.

26
00:03:20,000 --> 00:03:34,000
So here's still another example where we might use for a class list which has the person's year of graduation, last name, first name, pre-sept name and log in name.

27
00:03:34,000 --> 00:03:42,000
And so in the first call over here we might use the log in name as the key and the first name as the values.

28
00:03:42,000 --> 00:03:46,000
We type in somebody's log in name, we get their first name.

29
00:03:46,000 --> 00:03:51,000
And we begin with the same client log in as key and get the section as the value.

30
00:03:51,000 --> 00:04:00,000
So all kinds of information processing that we might need to do for large amounts of data represented in comma, comma separated value files.

31
00:04:00,000 --> 00:04:06,000
This one client which is based on a symbol table will provide useful functionality.

32
00:04:06,000 --> 00:04:16,000
And here's the implementation, this very little to it given the symbol table API that we've articulated in the implementations that we have.

33
00:04:16,000 --> 00:04:29,000
So what do we do to get lookup CSV implemented? Well, first thing is to set up the input stream from the first arguments, so that's our input file.

34
00:04:29,000 --> 00:04:34,000
And then get the numbers of the fields of the key and the value.

35
00:04:34,000 --> 00:04:39,000
And now build a symbol table that associates strings with strings.

36
00:04:39,000 --> 00:04:47,000
Then there's a while loop where we just read a new line in dot read line, read line.

37
00:04:47,000 --> 00:04:52,000
And then split according to comma into tokens in an array.

38
00:04:52,000 --> 00:04:57,000
And then the index in the array is going to be the fields that we're going to use.

39
00:04:57,000 --> 00:05:06,000
So the key is the string in the key field entry of the array and the values the string in the valve field entry in the array.

40
00:05:06,000 --> 00:05:12,000
And we simply put that in the symbol table. So this while loop just builds the symbol table from the file.

41
00:05:12,000 --> 00:05:20,000
Then from standard input, we take queries, just read a string, check if the symbol table contains a string.

42
00:05:20,000 --> 00:05:27,000
If it doesn't print not found, and if it does print the value associated with the key.

43
00:05:27,000 --> 00:05:34,000
So a very small amount of code based on our symbol table implementation that gives us the dictionary functionality.

