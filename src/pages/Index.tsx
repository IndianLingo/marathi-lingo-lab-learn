
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Volume2, Mic, Square, Play, RotateCcw, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

// Marathi course data
const courseData = {
  "course": "Marathi Language Learning",
  "level": "Beginner",
  "lessons": [
    {
      "lesson": 1,
      "title": "Greetings & Introductions",
      "phrases": [
        {
          "marathi": "नमस्कार",
          "english": "Hello / Greetings",
          "hindi": "नमस्ते",
          "id": "L01_P01"
        },
        {
          "marathi": "तू कसा आहेस? / तू कशी आहेस?",
          "english": "How are you?",
          "hindi": "तुम कैसे हो? / तुम कैसी हो?",
          "id": "L01_P02"
        },
        {
          "marathi": "मी ठीक आहे.",
          "english": "I am fine.",
          "hindi": "मैं ठीक हूँ।",
          "id": "L01_P03"
        },
        {
          "marathi": "तुझे नाव काय आहे?",
          "english": "What is your name?",
          "hindi": "तुम्हारा नाम क्या है?",
          "id": "L01_P04"
        },
        {
          "marathi": "माझं नाव _____ आहे.",
          "english": "My name is _____.",
          "hindi": "मेरा नाम _____ है।",
          "id": "L01_P05"
        },
        {
          "marathi": "भेटून आनंद झाला.",
          "english": "Nice to meet you.",
          "hindi": "आपसे मिलकर अच्छा लगा।",
          "id": "L01_P06"
        }
      ],
      "culture_tip": "Namaskar is a respectful greeting used throughout Maharashtra and suits formal or informal settings."
    },
    {
      "lesson": 2,
      "title": "Daily Politeness",
      "phrases": [
        {
          "marathi": "धन्यवाद / आभार",
          "english": "Thank you",
          "hindi": "धन्यवाद",
          "id": "L02_P01"
        },
        {
          "marathi": "कृपया",
          "english": "Please",
          "hindi": "कृपया",
          "id": "L02_P02"
        },
        {
          "marathi": "माफ करा",
          "english": "Sorry / Excuse me",
          "hindi": "माफ कीजिए",
          "id": "L02_P03"
        },
        {
          "marathi": "काही हरकत नाही",
          "english": "No problem",
          "hindi": "कोई बात नहीं",
          "id": "L02_P04"
        },
        {
          "marathi": "हो / नाही",
          "english": "Yes / No",
          "hindi": "हाँ / नहीं",
          "id": "L02_P05"
        }
      ]
    },
    {
      "lesson": 3,
      "title": "Home & Family",
      "phrases": [
        {
          "marathi": "हे माझे घर आहे.",
          "english": "This is my house.",
          "hindi": "यह मेरा घर है।",
          "id": "L03_P01"
        },
        {
          "marathi": "माझे वडील",
          "english": "My father",
          "hindi": "मेरे पिताजी",
          "id": "L03_P02"
        },
        {
          "marathi": "माझी आई",
          "english": "My mother",
          "hindi": "मेरी माँ",
          "id": "L03_P03"
        },
        {
          "marathi": "माझा भाऊ / माझी बहीण",
          "english": "My brother / sister",
          "hindi": "मेरा भाई / मेरी बहन",
          "id": "L03_P04"
        },
        {
          "marathi": "तू कुठे राहतोस?",
          "english": "Where do you live?",
          "hindi": "तुम कहाँ रहते हो?",
          "id": "L03_P05"
        }
      ]
    },
    {
      "lesson": 4,
      "title": "Food & Eating",
      "phrases": [
        {
          "marathi": "मला भूक लागली आहे.",
          "english": "I am hungry.",
          "hindi": "मुझे भूख लगी है।",
          "id": "L04_P01"
        },
        {
          "marathi": "जेवण तयार आहे.",
          "english": "Food is ready.",
          "hindi": "खाना तैयार है।",
          "id": "L04_P02"
        },
        {
          "marathi": "मला पाणी पाहिजे.",
          "english": "I want water.",
          "hindi": "मुझे पानी चाहिए।",
          "id": "L04_P03"
        },
        {
          "marathi": "हे खूप चविष्ट आहे.",
          "english": "This is very tasty.",
          "hindi": "यह बहुत स्वादिष्ट है।",
          "id": "L04_P04"
        },
        {
          "marathi": "आणखी थोडं द्या.",
          "english": "Give me a little more.",
          "hindi": "थोड़ा और दीजिए।",
          "id": "L04_P05"
        }
      ]
    },
    {
      "lesson": 5,
      "title": "Numbers & Counting",
      "phrases": [
        {
          "marathi": "एक, दोन, तीन",
          "english": "1, 2, 3",
          "hindi": "एक, दो, तीन",
          "id": "L05_P01"
        },
        {
          "marathi": "चार, पाच, सहा",
          "english": "4, 5, 6",
          "hindi": "चार, पाँच, छह",
          "id": "L05_P02"
        },
        {
          "marathi": "सात, आठ, नऊ",
          "english": "7, 8, 9",
          "hindi": "सात, आठ, नौ",
          "id": "L05_P03"
        },
        {
          "marathi": "दहा",
          "english": "10",
          "hindi": "दस",
          "id": "L05_P04"
        },
        {
          "marathi": "किती वाजले?",
          "english": "What time is it?",
          "hindi": "कितना समय हुआ है?",
          "id": "L05_P05"
        }
      ]
    },
    {
      "lesson": 6,
      "title": "Travel & Directions",
      "phrases": [
        {
          "marathi": "मला स्टेशनवर जायचं आहे.",
          "english": "I want to go to the station.",
          "hindi": "मुझे स्टेशन जाना है।",
          "id": "L06_P01"
        },
        {
          "marathi": "रस्ता कुठे आहे?",
          "english": "Where is the road?",
          "hindi": "रास्ता कहाँ है?",
          "id": "L06_P02"
        },
        {
          "marathi": "उजवीकडे वळा",
          "english": "Turn right",
          "hindi": "दाएँ मुड़िए",
          "id": "L06_P03"
        },
        {
          "marathi": "डावीकडे वळा",
          "english": "Turn left",
          "hindi": "बाएँ मुड़िए",
          "id": "L06_P04"
        },
        {
          "marathi": "थांबा / थोडं थांबा",
          "english": "Stop / Wait a little",
          "hindi": "रुको / थोड़ा रुको",
          "id": "L06_P05"
        }
      ]
    },
    {
      "lesson": 7,
      "title": "Shopping & Money",
      "phrases": [
        {
          "marathi": "हे किती आहे?",
          "english": "How much is this?",
          "hindi": "यह कितने का है?",
          "id": "L07_P01"
        },
        {
          "marathi": "मला हे पाहिजे.",
          "english": "I want this.",
          "hindi": "मुझे यह चाहिए।",
          "id": "L07_P02"
        },
        {
          "marathi": "पैसे कमी करा.",
          "english": "Reduce the price.",
          "hindi": "दाम कम कीजिए।",
          "id": "L07_P03"
        },
        {
          "marathi": "खूप महाग आहे.",
          "english": "This is too expensive.",
          "hindi": "यह बहुत महंगा है।",
          "id": "L07_P04"
        },
        {
          "marathi": "परतावा आहे का?",
          "english": "Is there a return?",
          "hindi": "वापसी है क्या?",
          "id": "L07_P05"
        }
      ]
    },
    {
      "lesson": 8,
      "title": "Basic Emotions",
      "phrases": [
        {
          "marathi": "मला आनंद झाला.",
          "english": "I am happy.",
          "hindi": "मुझे खुशी हुई।",
          "id": "L08_P01"
        },
        {
          "marathi": "मला राग आला आहे.",
          "english": "I am angry.",
          "hindi": "मुझे गुस्सा आया है।",
          "id": "L08_P02"
        },
        {
          "marathi": "मला भीती वाटते.",
          "english": "I am scared.",
          "hindi": "मुझे डर लग रहा है।",
          "id": "L08_P03"
        },
        {
          "marathi": "मला त्रास होतोय.",
          "english": "I am annoyed.",
          "hindi": "मुझे परेशानी हो रही है।",
          "id": "L08_P04"
        },
        {
          "marathi": "सगळं ठीक आहे.",
          "english": "Everything is fine.",
          "hindi": "सब ठीक है।",
          "id": "L08_P05"
        }
      ]
    },
    {
      "lesson": 9,
      "title": "At Work / Office",
      "phrases": [
        {
          "marathi": "मी काम करतो/करते.",
          "english": "I work. (m/f)",
          "hindi": "मैं काम करता/करती हूँ।",
          "id": "L09_P01"
        },
        {
          "marathi": "मी ऑफिसला चाललो आहे.",
          "english": "I'm going to office.",
          "hindi": "मैं ऑफिस जा रहा हूँ।",
          "id": "L09_P02"
        },
        {
          "marathi": "बैठक किती वाजता आहे?",
          "english": "What time is the meeting?",
          "hindi": "मीटिंग कितने बजे है?",
          "id": "L09_P03"
        },
        {
          "marathi": "मला सुट्टी हवी आहे.",
          "english": "I want a leave.",
          "hindi": "मुझे छुट्टी चाहिए।",
          "id": "L09_P04"
        },
        {
          "marathi": "कृपया मेल करा.",
          "english": "Please send an email.",
          "hindi": "कृपया ईमेल कीजिए।",
          "id": "L09_P05"
        }
      ]
    },
    {
      "lesson": 10,
      "title": "Basic Conversations",
      "phrases": [
        {
          "marathi": "तू मराठी शिकतो आहेस का?",
          "english": "Are you learning Marathi?",
          "hindi": "क्या तुम मराठी सीख रहे हो?",
          "id": "L10_P01"
        },
        {
          "marathi": "हो, मी शिकतो आहे.",
          "english": "Yes, I'm learning.",
          "hindi": "हाँ, मैं सीख रहा हूँ।",
          "id": "L10_P02"
        },
        {
          "marathi": "मला मराठी आवडते.",
          "english": "I like Marathi.",
          "hindi": "मुझे मराठी पसंद है।",
          "id": "L10_P03"
        },
        {
          "marathi": "पुन्हा भेटूया.",
          "english": "Let's meet again.",
          "hindi": "फिर मिलेंगे।",
          "id": "L10_P04"
        },
        {
          "marathi": "धन्यवाद! अभ्यास चालू ठेवा.",
          "english": "Thank you! Keep learning.",
          "hindi": "धन्यवाद! सीखते रहिए।",
          "id": "L10_P05"
        }
      ]
    }
  ]
};

const Index = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [referenceLanguage, setReferenceLanguage] = useState<'english' | 'hindi'>('english');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentLessonData = courseData.lessons[currentLesson];
  const currentPhraseData = currentLessonData.phrases[currentPhrase];

  // Text-to-Speech functionality
  const speakText = (text: string, lang: string = 'hi-IN') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      toast.success("Playing audio");
    } else {
      toast.error("Text-to-speech not supported in this browser");
    }
  };

  // Speech-to-Text functionality
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'mr-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Listening... Speak in Marathi");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        toast.success(`You said: "${transcript}"`);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        toast.error(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast.error("Speech recognition not supported in this browser");
    }
  };

  // Audio recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        setRecordedAudio(audioUrl);
        toast.success("Recording saved!");
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      toast.info("Recording started...");
    } catch (error) {
      toast.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
      toast.success("Recording stopped");
    }
  };

  const playRecording = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      audio.play();
    }
  };

  const nextPhrase = () => {
    if (currentPhrase < currentLessonData.phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
    } else if (currentLesson < courseData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setCurrentPhrase(0);
    }
    updateProgress();
  };

  const prevPhrase = () => {
    if (currentPhrase > 0) {
      setCurrentPhrase(currentPhrase - 1);
    } else if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setCurrentPhrase(courseData.lessons[currentLesson - 1].phrases.length - 1);
    }
    updateProgress();
  };

  const updateProgress = () => {
    const totalPhrases = courseData.lessons.reduce((total, lesson) => total + lesson.phrases.length, 0);
    const completedPhrases = courseData.lessons.slice(0, currentLesson).reduce((total, lesson) => total + lesson.phrases.length, 0) + currentPhrase;
    setProgress((completedPhrases / totalPhrases) * 100);
  };

  useEffect(() => {
    updateProgress();
  }, [currentLesson, currentPhrase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="h-8 w-8 text-orange-600" />
            <h1 className="text-4xl font-bold text-orange-800">मराठी शिका</h1>
          </div>
          <p className="text-lg text-muted-foreground">Learn Marathi with Interactive Quiz</p>
          <Progress value={progress} className="w-full max-w-md mx-auto" />
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center">
          <Tabs value={referenceLanguage} onValueChange={(value) => setReferenceLanguage(value as 'english' | 'hindi')}>
            <TabsList>
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="hindi">हिंदी</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Lesson Info */}
        <Card className="border-orange-200">
          <CardHeader className="bg-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-orange-800">Lesson {currentLessonData.lesson}: {currentLessonData.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Phrase {currentPhrase + 1} of {currentLessonData.phrases.length}
                </p>
              </div>
              <Badge variant="outline" className="bg-orange-50">
                {courseData.level}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Main Learning Card */}
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardContent className="p-8 space-y-6">
            {/* Marathi Text */}
            <div className="text-center space-y-4">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold text-orange-800 mb-2">मराठी</h2>
                <p className="text-2xl font-semibold text-gray-800">{currentPhraseData.marathi}</p>
                <Button
                  onClick={() => speakText(currentPhraseData.marathi, 'hi-IN')}
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  Listen
                </Button>
              </div>

              {/* Reference Translation */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {referenceLanguage === 'english' ? 'English' : 'हिंदी'}
                </h3>
                <p className="text-lg text-gray-700">
                  {referenceLanguage === 'english' ? currentPhraseData.english : currentPhraseData.hindi}
                </p>
                <Button
                  onClick={() => speakText(
                    referenceLanguage === 'english' ? currentPhraseData.english : currentPhraseData.hindi,
                    referenceLanguage === 'english' ? 'en-US' : 'hi-IN'
                  )}
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  Listen
                </Button>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Speech Recognition */}
              <Button
                onClick={startListening}
                disabled={isListening}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
                {isListening ? 'Listening...' : 'Practice Speaking'}
              </Button>

              {/* Recording */}
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                variant="outline"
                className={`flex items-center gap-2 ${isRecording ? 'bg-red-50 border-red-200' : ''}`}
              >
                {isRecording ? (
                  <>
                    <Square className="h-4 w-4 text-red-500" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Record Yourself
                  </>
                )}
              </Button>

              {/* Play Recording */}
              {recordedAudio && (
                <Button
                  onClick={playRecording}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Play Recording
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={prevPhrase}
            disabled={currentLesson === 0 && currentPhrase === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setRecordedAudio(null);
                toast.info("Practice this phrase again!");
              }}
              variant="ghost"
              size="sm"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          </div>

          <Button
            onClick={nextPhrase}
            disabled={currentLesson === courseData.lessons.length - 1 && currentPhrase === currentLessonData.phrases.length - 1}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Culture Tip */}
        {currentLessonData.culture_tip && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-800 mb-2">💡 Cultural Tip</h4>
              <p className="text-green-700">{currentLessonData.culture_tip}</p>
            </CardContent>
          </Card>
        )}

        {/* Lesson List */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">All Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {courseData.lessons.map((lesson, index) => (
                <Button
                  key={lesson.lesson}
                  onClick={() => {
                    setCurrentLesson(index);
                    setCurrentPhrase(0);
                  }}
                  variant={index === currentLesson ? "default" : "ghost"}
                  className="text-left justify-start h-auto p-3"
                >
                  <div>
                    <div className="font-semibold">Lesson {lesson.lesson}</div>
                    <div className="text-sm text-muted-foreground">{lesson.title}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
