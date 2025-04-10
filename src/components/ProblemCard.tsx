
import { Link } from 'react-router-dom';
import { Problem } from '../types/problem';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, ThumbsUp, Timer, TrendingUp } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  isSolved?: boolean;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, isSolved }) => {
  const difficultyColor = 
    problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
    problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
    problem.difficulty === 'hard' ? 'bg-red-500/20 text-red-500' :
    'bg-purple-500/20 text-purple-500';
  
  return (
    <Link to={`/problem/${problem.id}`}>
      <div className={cn(
        "border border-border rounded-lg p-4 hover:border-primary/50 transition-all hover:shadow-md hover:shadow-primary/5 bg-card",
        isSolved && "border-l-4 border-l-accent"
      )}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {problem.title}
          </h3>
          {isSolved && (
            <span className="bg-accent/20 text-accent p-1 rounded-full">
              <Check className="h-4 w-4" />
            </span>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {problem.description}
        </p>
        
        <div className="flex gap-2 flex-wrap mb-3">
          {problem.category.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {problem.category.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{problem.category.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            <span>{Math.round(problem.timeLimit / 1000)}s</span>
          </div>
          
          <div className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium", 
            difficultyColor
          )}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{problem.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{problem.successRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProblemCard;
