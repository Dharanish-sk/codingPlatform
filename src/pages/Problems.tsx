import { useState } from 'react';
import { Problem } from '../types/problem';
import ProblemCard from '../components/ProblemCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

 const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    category: ['arrays', 'hash table'],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    starterCode: {
      javascript: 'function twoSum(nums, target) {\n  // Your code here\n}',
      python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}',
      rust: 'fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n    // Your code here\n}'
    },
    solutionCode: {
      javascript: '// Solution would be here',
      python: '# Solution would be here',
      java: '// Solution would be here',
      cpp: '// Solution would be here',
      rust: '// Solution would be here'
    },
    hints: ['A really efficient solution can be found using hash maps.'],
    timeLimit: 1000,
    memoryLimit: 128,
    likes: 345,
    submissions: 1028,
    successRate: 72,
    createdAt: '2023-04-01'
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'easy',
    category: ['strings', 'stack'],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\''],
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    starterCode: {
      javascript: 'function isValid(s) {\n  // Your code here\n}',
      python: 'def is_valid(s):\n    # Your code here\n    pass',
      java: 'class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n    }\n}',
      cpp: 'bool isValid(string s) {\n    // Your code here\n}',
      rust: 'fn is_valid(s: String) -> bool {\n    // Your code here\n}'
    },
    solutionCode: {
      javascript: '// Solution would be here',
      python: '# Solution would be here',
      java: '// Solution would be here',
      cpp: '// Solution would be here',
      rust: '// Solution would be here'
    },
    hints: ['Think about using a stack data structure.'],
    timeLimit: 1000,
    memoryLimit: 128,
    likes: 289,
    submissions: 987,
    successRate: 68,
    createdAt: '2023-04-02'
  },
  {
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
      }
    ],
    starterCode: {
      javascript: 'function lengthOfLongestSubstring(s) {\n  // Your code here\n}',
      python: 'def length_of_longest_substring(s):\n    # Your code here\n    pass',
      java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n    }\n}',
      cpp: 'int lengthOfLongestSubstring(string s) {\n    // Your code here\n}',
      rust: 'fn length_of_longest_substring(s: String) -> i32 {\n    // Your code here\n}'
    },
    solutionCode: {
      javascript: '// Solution would be here',
      python: '# Solution would be here',
      java: '// Solution would be here',
      cpp: '// Solution would be here',
      rust: '// Solution would be here'
    },
    hints: ['Try using the sliding window technique.'],
    timeLimit: 1500,
    memoryLimit: 256,
    likes: 476,
    submissions: 1563,
    successRate: 43,
    createdAt: '2023-04-03'
  },
  {
    id: '4',
    title: 'Merge K Sorted Lists',
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    difficulty: 'hard',
    category: ['linked list', 'divide and conquer', 'heap'],
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500'],
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation: 'The linked-lists are: [1->4->5, 1->3->4, 2->6], merging them into one sorted list: 1->1->2->3->4->4->5->6'
      }
    ],
    starterCode: {
      javascript: 'function mergeKLists(lists) {\n  // Your code here\n}',
      python: 'def merge_k_lists(lists):\n    # Your code here\n    pass',
      java: 'class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Your code here\n    }\n}',
      cpp: 'ListNode* mergeKLists(vector<ListNode*>& lists) {\n    // Your code here\n}',
      rust: 'fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {\n    // Your code here\n}'
    },
    solutionCode: {
      javascript: '// Solution would be here',
      python: '# Solution would be here',
      java: '// Solution would be here',
      cpp: '// Solution would be here',
      rust: '// Solution would be here'
    },
    hints: ['You can use a priority queue to efficiently merge the lists.'],
    timeLimit: 2000,
    memoryLimit: 512,
    likes: 623,
    submissions: 1105,
    successRate: 31,
    createdAt: '2023-04-04'
  },
  {
    id: '5',
    title: 'Minimum Window Substring',
    description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t is included in the window.',
    difficulty: 'expert',
    category: ['strings', 'sliding window', 'hash table'],
    constraints: ['1 <= s.length, t.length <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation: 'The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from t.'
      }
    ],
    starterCode: {
      javascript: 'function minWindow(s, t) {\n  // Your code here\n}',
      python: 'def min_window(s, t):\n    # Your code here\n    pass',
      java: 'class Solution {\n    public String minWindow(String s, String t) {\n        // Your code here\n    }\n}',
      cpp: 'string minWindow(string s, string t) {\n    // Your code here\n}',
      rust: 'fn min_window(s: String, t: String) -> String {\n    // Your code here\n}'
    },
    solutionCode: {
      javascript: '// Solution would be here',
      python: '# Solution would be here',
      java: '// Solution would be here',
      cpp: '// Solution would be here',
      rust: '// Solution would be here'
    },
    hints: ['Try using the sliding window technique with two pointers.'],
    timeLimit: 2500,
    memoryLimit: 512,
    likes: 789,
    submissions: 1345,
    successRate: 22,
    createdAt: '2023-04-05'
  }
];

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  const solvedProblems = new Set(['1']); // Mock data for solved problems
  
  // Filter problems based on search query and tab
  const filteredProblems = mockProblems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
                         
    if (currentTab === 'all') return matchesSearch;
    if (currentTab === 'solved') return matchesSearch && solvedProblems.has(problem.id);
    if (currentTab === 'unsolved') return matchesSearch && !solvedProblems.has(problem.id);
    
    return matchesSearch && problem.difficulty === currentTab;
  });

  return (
    <div className="min-h-screen pt-24 px-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
        <p className="text-muted-foreground">
          Sharpen your skills with our collection of coding challenges. Filter by difficulty or search for specific topics.
        </p>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search problems by title, description or tags..."
          className="pl-10 bg-card border-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-6">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
          <TabsTrigger value="expert">Expert</TabsTrigger>
          <TabsTrigger value="solved">Solved</TabsTrigger>
          <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredProblems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProblems.map((problem) => (
            <ProblemCard 
              key={problem.id} 
              problem={problem}
              isSolved={solvedProblems.has(problem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No problems found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Problems;
