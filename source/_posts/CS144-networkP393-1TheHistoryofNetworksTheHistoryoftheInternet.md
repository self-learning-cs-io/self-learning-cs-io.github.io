---
title: CS144 NetworkP393 1TheHistoryofNetworksTheHistoryoftheInternet
---

1
00:00:00,000 --> 00:00:08,000
You will have heard many times that the internet has transformed society in ways not seen since the invention of the printing press.

2
00:00:08,000 --> 00:00:16,000
In this video, I'm going to give you a brief background on the history of networking leading up to the invention of the internet in the 1960s.

3
00:00:16,000 --> 00:00:21,000
Let's start with a brief history of how messages were communicated over long distances.

4
00:00:22,000 --> 00:00:26,000
Well, today we think nothing of sending an email to the other side of the world.

5
00:00:26,000 --> 00:00:31,000
Three thousand years ago, it was very hard to communicate over long distances at all.

6
00:00:31,000 --> 00:00:39,000
The first recorded long distance communications are from about a thousand BC and were mostly put in place for military offense and defensive purposes.

7
00:00:39,000 --> 00:00:47,000
Firebeekens were used to signal the arrival of an enemy or to synchronize an attack. This is an example of a fire beacon in the south of England.

8
00:00:47,000 --> 00:00:54,000
Firebeekens carry information fast. They work particularly well at night when danger is greatest, but they carry very little information.

9
00:00:54,000 --> 00:00:59,000
Generally, they are on or off signaling danger.

10
00:00:59,000 --> 00:01:07,000
Carrier pigeons, human messengers and horse railer relays have been used around the world for thousands of years because they can carry more information.

11
00:01:07,000 --> 00:01:12,000
But the information travels more slowly than a fire beacon. The messengers are prone to interception along the way.

12
00:01:12,000 --> 00:01:16,000
The message could be read, tampered with, or blocked completely.

13
00:01:17,000 --> 00:01:23,000
The earliest recorded relay systems were horses in Egypt and China two or three thousand years ago. They were common throughout history.

14
00:01:23,000 --> 00:01:35,000
In the 13th century, Marco Polo described how the great Mongol ruler Kublai Khan used horse relays. His army had relay stations every 40 kilometers with 400 horses waiting for relay riders.

15
00:01:35,000 --> 00:01:43,000
Horse relays were used all the way up to the 19th century for male delivery and the famous Pony Express across the USA.

16
00:01:43,000 --> 00:01:50,000
These early systems were limited in the information they could carry or by the speed of delivery such as horses, humans and pigeons.

17
00:01:50,000 --> 00:02:02,000
Around 2000 years ago, optical methods started to be used such as flags and heliographs which encoded digital information such as letters, words and numbers.

18
00:02:02,000 --> 00:02:11,000
These systems transmit data at the speed of light over limited distances with limited information that basically simple encodings.

19
00:02:11,000 --> 00:02:25,000
But perhaps the biggest advances in optical communications happened in France around the time of the French Revolution in 1793 when Claude Chapp invented and started building a semaphore telegraph network.

20
00:02:27,000 --> 00:02:35,000
Claude Chapp built towers with a large horizontal beam called the regulator with two smaller arms called indicators.

21
00:02:35,000 --> 00:02:42,000
It looked like a human being giving different signals with their arms, the location of the arms indicated a symbol.

22
00:02:42,000 --> 00:02:51,000
In 1793, the French government built 15 stations to cover 190 kilometers or about 13 to 15 kilometers per station.

23
00:02:51,000 --> 00:02:59,000
By 1804, a 370 kilometer network stretched from Paris to Dijon.

24
00:02:59,000 --> 00:03:05,000
The system was used to send a variety of messages, including military information and fast-breaking news.

25
00:03:05,000 --> 00:03:10,000
Most went towards Paris to report information from the provinces.

26
00:03:10,000 --> 00:03:18,000
The operators became quite skilled, the fastest messages could be signaled by one station every 10 to 20 seconds and could cross France in less than 30 minutes.

27
00:03:18,000 --> 00:03:24,000
They could send about 3,000 signs per day corresponding to a few hundred messages.

28
00:03:24,000 --> 00:03:33,000
To make the network function properly, the optical telegraph systems in France and Sweden developed a number of concepts that are used in networks to this day.

29
00:03:33,000 --> 00:03:37,000
They needed to develop five concepts in particular.

30
00:03:37,000 --> 00:03:48,000
The first were codes. These are symbols to indicate characters and control signals like start of transmission, end of transmission, weight or conflict when two signals arrived at the same time.

31
00:03:48,000 --> 00:04:02,000
Error to cancel the last code, priority between conflicting messages, failure of a tower, an acknowledgement, and even rain or fog to say we couldn't even see the signal that you sent.

32
00:04:02,000 --> 00:04:11,000
The second was flow control. This stops the sender from overwhelming the receiver. Basically, the receiver tells the sender to slow down because it can't keep up.

33
00:04:11,000 --> 00:04:19,000
Third was synchronization to tell when one symbol ended and the next one started. This helps delineate words made up of several symbols.

34
00:04:19,000 --> 00:04:29,000
The fourth concept was error correction and retransmission to tell the sender when symbols were misunderstood. This allows the sender to try sending the symbols again.

35
00:04:29,000 --> 00:04:38,000
Finally, they even used encryption so that messages could not be intercepted. They were particularly worried about news of the stock market beating the newspapers.

36
00:04:39,000 --> 00:04:47,000
By 1830, the shop optical telegraph network was very extensive covering most of France.

37
00:04:48,000 --> 00:04:55,000
We can characterize four main steps of invention in communication networks up until about the 1700s.

38
00:04:55,000 --> 00:05:03,000
First, from about 2000 BC, humans used systems to signal a small set of predefined messages, for example using firebeacons.

39
00:05:03,000 --> 00:05:10,000
Second, starting in the 1600s, people developed systems to transmit arbitrary messages by encoding the entire alphabet.

40
00:05:10,000 --> 00:05:21,000
By the early 1700s, numeric codes started to be used for common words and phrases. This was the earliest form of compression, because it required less information to be sent over the link.

41
00:05:21,000 --> 00:05:30,000
During the 1700s, codes were developed for control signals. They could communicate when to start and stop sending, when to slow down, how to retransmit and so on.

42
00:05:30,000 --> 00:05:38,000
This was the birth of what we call today protocols, the agreed upon rules governing how to or more parties communicate.

43
00:05:38,000 --> 00:05:48,000
By 1800, there were a number of different optical telegraph systems developed across and developed and deployed across Europe using a variety of different protocol signals such as these.

44
00:05:48,000 --> 00:05:56,000
Initialization to indicate we're about to start communicating, error control, arrays, resend, stop, wait, selective, repeat.

45
00:05:56,000 --> 00:06:03,000
These are used to retransmit data that is corrupted along the way, as you're already seen in videos about different retransmission strategies.

46
00:06:03,000 --> 00:06:09,000
And flow control, faster, slower, tell the sender we can or can't keep up.

47
00:06:09,000 --> 00:06:16,000
Clearly, there was an enormous step forward in communications when the telephone was invented at the end of the 19th century.

48
00:06:16,000 --> 00:06:24,000
For some time, there had been many attempts to increase the capacity of the electrical telegraph network that now connected many towns across the United States.

49
00:06:24,000 --> 00:06:35,000
Alexander Graham Bell, shown here, a Scottish-born inventor, transmitted the first voice call in 1876 in the very celebrated phone call to his colleague Thomas Watson.

50
00:06:35,000 --> 00:06:45,000
While his patent was challenged many times, most notably by fellow inventor Alicia Gray, the patents stood up to legal challenges and we generally attribute the invention the bell.

51
00:06:46,000 --> 00:06:57,000
Within 10 years, over 150,000 people owned telephones and by 1915, the first transcontinental phone call was made from New York to San Francisco.

52
00:06:57,000 --> 00:07:06,000
The series of events and inventions that eventually led to the internet started in earnest in about 1960.

53
00:07:07,000 --> 00:07:22,000
In 1962, JCR Licklider at MIT started to write memos and give talks about his concepts of an intergalactic network in which everyone on the globe is interconnected and can access programs and data at any site from anywhere.

54
00:07:22,000 --> 00:07:28,000
He talked of being able to communicate with his own intergalactic network of researchers across the country.

55
00:07:29,000 --> 00:07:38,000
This is widely thought to be the first recorded description of the social interactions that could be enabled by a large communication network, very much like the Internet of Today.

56
00:07:38,000 --> 00:07:47,000
Licklider became the first head of the computer research program at DARPA, the Defense Advanced Research Projects Agency from 1962.

57
00:07:47,000 --> 00:07:58,000
While at DARPA, he convinced Ivan Sutherland, Bob Taylor and MIT researcher Larry Roberts of the importance of his new networking concept and they took up the mantle when they succeeded him at DARPA.

58
00:07:58,000 --> 00:08:06,000
In 1964, researcher Paul Barron wrote what is now considered the first academic paper about large scale communication networks.

59
00:08:06,000 --> 00:08:10,000
The paper is entitled on data communication networks.

60
00:08:10,000 --> 00:08:21,000
At about the same time, Lena Kleinrocks thesis was published on queuing theory. Donald Davis was working on very similar ideas at the National Physical Laboratory in the UK.

61
00:08:21,000 --> 00:08:36,000
In 1965, working with Thomas Merrill, Larry Roberts connected the TX2 computer and Massachusetts to the Q32 in California with a low-speed dial-up telephone line creating the first wide-area computer network ever built.

62
00:08:36,000 --> 00:08:43,000
Larry Roberts joined DARPA in 1966 to help develop the first ARPANET plans which were published in 1967.

63
00:08:43,000 --> 00:08:54,000
In 1969, the first four nodes were installed at UCLA, SRI, UCSB and University of Utah and the very first messages sent over the ARPANET.

64
00:08:54,000 --> 00:09:03,000
This is what the Internet looked like in 1969. It was called the ARPANET and was a single, closed, proprietary network.

65
00:09:04,000 --> 00:09:09,000
By the early 1970s, a number of different packets switched data networks started to appear.

66
00:09:09,000 --> 00:09:17,000
In 1971, the first packet radio network was built between the Hawaiian Islands and it was called Aloha Net.

67
00:09:17,000 --> 00:09:24,000
The mechanisms developed for the Aloha Protocol have influenced pretty much every wireless network ever since.

68
00:09:24,000 --> 00:09:36,000
Also, in 1971, the SIGLADES Research Network was built in France. It was the first to give the end-hosts the responsibility for reliable communications and heavily influenced the design of the Internet.

69
00:09:36,000 --> 00:09:44,000
In 1974, IBM introduced an entire data network stack called SNA which stands for Systems Network Architecture.

70
00:09:44,000 --> 00:09:53,000
Its goal was to reduce the cost of building large time-shared computers with many teletide terminals rather than batch processing with punch cards.

71
00:09:54,000 --> 00:10:02,000
DARPA, sponsored work on Interneting, to create the first network of networks to connect together networks around the world.

72
00:10:02,000 --> 00:10:15,000
The protocols needed for Interneting were first described by Vint Cerf from Stanford and Bob Khan from DARPA in a now famous paper in 1974 with a title, A Protocol for Packet Network in Communication.

73
00:10:16,000 --> 00:10:24,000
TCP called for reliable, in-sequence delivery of data and included much of what we call today the network wire as well.

74
00:10:24,000 --> 00:10:29,000
In the early days, there was no notion of congestion control. It was added to the Internet about 15 years later.

75
00:10:29,000 --> 00:10:39,000
By the end of the 1970s, TCP and IP were separated, making room for UDP to be added as an unreliable transport service as well, originally for packetized voice.

76
00:10:39,000 --> 00:10:43,000
At the time, Vint Cerf was an assistant professor here at Stanford.

77
00:10:44,000 --> 00:10:50,000
In fact, the paper that they wrote was written at the Cabania Hotel on El Camino in Palo Alto.

78
00:10:50,000 --> 00:10:56,000
He moved to DARPA in 1976 to help shepherd the new Internet project. He's now the Chief Internet Evangelist at Google.

79
00:10:56,000 --> 00:11:02,000
Bob Khan was already at DARPA when the paper was written, together they considered the fathers of modern Internet.

80
00:11:03,000 --> 00:11:13,000
In 1983, TCP and IP was first deployed across the Internet in a flag day, which means when everyone upgraded to use the new protocols at the same time.

81
00:11:13,000 --> 00:11:26,000
By 1986, NSFNet was created by the US National Science Foundation to interconnect supercomputers at universities across the US using links running at a leasing speed of 56 kilobits per second.

82
00:11:26,000 --> 00:11:30,000
Other small networks started to pop up all over the place connecting to the Internet.

83
00:11:31,000 --> 00:11:36,000
By the end of the 1980s, they were about 100,000 connected hosts.

84
00:11:41,000 --> 00:11:53,000
And then, around 1990, Tim Berners-Lietzson invented the World Wide Web, with the first browsers appearing in 1993, most notably the Mosaic browser written by Mark Andreessen.

85
00:11:54,000 --> 00:12:01,000
I can still remember the day I first saw a web browser in 1993 when I was a graduate student. We knew immediately it would change everything.

86
00:12:01,000 --> 00:12:08,000
But we didn't realize how huge that change would be. For many people, this is the dawning of the Internet.

87
00:12:08,000 --> 00:12:12,000
Although, of course, we all know it goes back much further than that than the World Wide Web.

88
00:12:12,000 --> 00:12:17,000
But within a year, over a million people around the world were using the web.

89
00:12:17,000 --> 00:12:24,000
And before the end of the 1990s, Yahoo Google, Amazon, eBay were all household names.

90
00:12:26,000 --> 00:12:33,000
If you'd like to learn more about the early days of networking in the Internet, here are three excellent references that I really enjoy.

91
00:12:33,000 --> 00:12:40,000
I'd highly recommend you read them to learn more about what led to an amazing transformation of modern society.

