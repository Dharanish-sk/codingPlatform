
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Problem, SupportedLanguage } from '../types/problem';
import CodeEditor from '../components/CodeEditor';
import LanguageSelector from '../components/LanguageSelector';
import OutputBox from '../components/OutputBox';
import SubmitButton from '../components/SubmitButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, ThumbsUp, Timer, TrendingUp } from 'lucide-react';
import axios from 'axios';

// Mock problem data for demo
const mockProblem: Problem = {
  id: '3',
  title: 'Longest Substring Without Repeating Characters',
  description: 'Given a string s, find the length of the longest substring without repeating characters.',
  difficulty: 'medium',
  category: ['strings', 'sliding window', 'hash table'],
  constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
  examples: [
    {
      input: 's = "abcabcbb"',
      output: '3',
      explanation: 'The answer is "abc", with the length of 3.'
    },
    {
      input: 's = "bbbbb"',
      output: '1',
      explanation: 'The answer is "b", with the length of 1.'
    },
    {
      input: 's = "pwwkew"',
      output: '3',
      explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
    }
  ],
  starterCode: {
    javascript: 'function lengthOfLongestSubstring(s) {\n  // Your code here\n  \n}',
    python: 'def length_of_longest_substring(s):\n    # Your code here\n    pass',
    java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n        \n    }\n}',
    cpp: 'int lengthOfLongestSubstring(string s) {\n    // Your code here\n    \n}',
    rust: 'fn length_of_longest_substring(s: String) -> i32 {\n    // Your code here\n    \n}'
  },
  solutionCode: {
    javascript: '// Hidden solution',
    python: '# Hidden solution',
    java: '// Hidden solution',
    cpp: '// Hidden solution',
    rust: '// Hidden solution'
  },
  hints: [
    'Try using the sliding window technique with a hash set to keep track of characters in the current window.',
    'You can use two pointers to represent the left and right boundaries of the window.',
    'When you encounter a character that\'s already in your current window, move the left boundary past the previous occurrence.'
  ],
  timeLimit: 1500,
  memoryLimit: 256,
  likes: 476,
  submissions: 1563,
  successRate: 43,
  createdAt: '2023-04-03'
};

const ProblemDetail = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [executionTime, setExecutionTime] = useState<number | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();


 
  

  
  useEffect(() => {
    // In a real app, we would fetch the problem from the backend
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProblem(mockProblem);
      setCode(mockProblem.starterCode[language]);
      setLoading(false);
    }, 500);
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language]);
    }
  }, [language, problem]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
 
  const handleRun = async () => {
    setOutput('');
  setIsProcessing(true);

  try {
    const res = await axios.post('http://localhost:5000/api/run-code', {
      script: code,
      language, // like 'python', 'javascript'
      versionIndex: '', // not needed for RapidAPI
      stdin: '', // optional
    });

    setOutput(res.data.stdout || res.data.stderr || res.data.message);
  } catch (err) {
    console.error(err);
    setOutput('Error running code');
  } finally {
     setIsProcessing(false);
  }
  };
  


  const handleSubmit = async () => {
   const runCode = async () => {
  setOutput('');
  setIsProcessing(true);

  try {
    const res = await axios.post('http://localhost:5000/api/run-code', {
      script: code,
      language, // like 'python', 'javascript'
      versionIndex: '', // not needed for RapidAPI
      stdin: '', // optional
    });

    setOutput(res.data.stdout || res.data.stderr || res.data.message);
  } catch (err) {
    console.error(err);
    setOutput('Error running code');
  } finally {
    setIsProcessing(false);
  }
};

  };
  

  const handleToggleHint = () => {
    setShowHint(!showHint);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen pt-24 px-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Problem not found</h2>
        <p className="text-muted-foreground mb-6">
          The problem you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/problems">Back to Problems</a>
        </Button>
      </div>
    );
  }

  const difficultyColor = 
    problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
    problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
    problem.difficulty === 'hard' ? 'bg-red-500/20 text-red-500' :
    'bg-purple-500/20 text-purple-500';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Problem header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <a href="/problems" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </a>
              <div className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium", 
                difficultyColor
              )}>
                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Timer className="h-3 w-3" />
                  <span>{Math.round(problem.timeLimit / 1000)}s</span>
                </div>
                <div className="h-3 w-px bg-muted-foreground/30" />
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{problem.likes}</span>
                </div>
                <div className="h-3 w-px bg-muted-foreground/30" />
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{problem.successRate}%</span>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold">{problem.title}</h1>
          </div>
          
          <Button variant="outline" className="border-muted hover:border-primary/50">
            <ThumbsUp className="h-4 w-4 mr-2" />
            <span>Like</span>
          </Button>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem description panel */}
          <div className="bg-card rounded-xl border border-border p-6">
            <Tabs defaultValue="description">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="constraints">Constraints</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <p className="text-foreground">{problem.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {problem.category.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="mt-4 space-y-6">
                {problem.examples.map((example, index) => (
                  <div key={index} className="bg-muted/30 rounded-md p-4">
                    <div className="font-medium mb-2">Example {index + 1}:</div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-muted-foreground">Input:</span>
                        <pre className="bg-code p-2 rounded mt-1 text-sm font-mono overflow-x-auto">
                          {example.input}
                        </pre>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Output:</span>
                        <pre className="bg-code p-2 rounded mt-1 text-sm font-mono overflow-x-auto">
                          {example.output}
                        </pre>
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="text-muted-foreground">Explanation:</span>
                          <p className="text-sm mt-1">{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="constraints" className="mt-4">
                <ul className="list-disc list-inside space-y-2">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-sm font-mono">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="hints" className="mt-4">
                {problem.hints.map((hint, index) => (
                  <div key={index} className="mb-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-muted hover:border-primary/50"
                      onClick={handleToggleHint}
                    >
                      <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>Hint {index + 1}</span>
                      <ArrowRight className={`h-4 w-4 ml-auto transition-transform ${showHint ? 'rotate-90' : ''}`} />
                    </Button>
                    
                    {showHint && (
                      <div className="bg-muted/30 p-4 rounded-md mt-2">
                        <p>{hint}</p>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="text-center mt-8">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>View Solution</span>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Note: Viewing the solution before solving will mark this as not completed.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Code editor panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <LanguageSelector 
                selectedLanguage={language}
                onLanguageChange={setLanguage}
              />
              
              <Button variant="ghost" className="text-xs text-muted-foreground">
                Reset Code
              </Button>
            </div>
            
            <CodeEditor 
              initialCode={code}
              language={language}
              onChange={handleCodeChange}
            />
            
            <OutputBox 
              output={output}
              status={executionStatus}
              executionTime={executionTime}
              memoryUsed={executionTime ? Math.floor(executionTime / 10) : undefined}
            />
            
            <div className="flex justify-end">
              <SubmitButton 
                onRun={handleRun}
                onSubmit={handleSubmit}
                isLoading={isProcessing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
