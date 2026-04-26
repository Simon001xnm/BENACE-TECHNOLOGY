'use client';
import { useState } from 'react';
import {
  aiLaptopRecommendations,
  type AiLaptopRecommendationsOutput,
} from '@/ai/flows/ai-laptop-recommendations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Bot, User } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function AiRecommender() {
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] =
    useState<AiLaptopRecommendationsOutput['recommendedLaptops'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences.trim()) return;

    setLoading(true);
    setRecommendations(null);
    setError(null);

    try {
      const result = await aiLaptopRecommendations({
        preferences,
        browsingHistory: ['MacBook Pro 14', 'Dell XPS 15'], // Hardcoded for demo
      });
      setRecommendations(result.recommendedLaptops);
    } catch (err) {
      console.error(err);
      setError('Sorry, something went wrong while getting recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <User className="h-6 w-6 text-muted-foreground" />
            <Textarea
              value={preferences}
              onChange={e => setPreferences(e.target.value)}
              placeholder="e.g., 'I need a lightweight laptop for college with a long battery life and good for coding.'"
              className="flex-grow resize-none"
              rows={3}
            />
          </div>
          <Button type="submit" disabled={loading || !preferences.trim()}>
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? 'Finding Laptops...' : 'Get Recommendations'}
          </Button>
        </form>

        {(loading || recommendations || error) && (
            <div className="mt-6 flex items-start gap-3">
                <Bot className="h-6 w-6 flex-shrink-0 text-primary" />
                <div className="w-full space-y-4 rounded-md border bg-primary/5 p-4">
                {loading && (
                    <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="space-y-2 pt-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    </div>
                )}
                {error && <p className="text-destructive">{error}</p>}
                {recommendations && (
                    <div className="space-y-6">
                    {recommendations.map((laptop, index) => (
                        <div key={index}>
                        <h3 className="font-bold text-primary">
                            {laptop.name} ({laptop.brand}) - {laptop.price}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">
                            {laptop.specifications}
                        </p>
                        <p className="mt-1 text-sm">{laptop.reason}</p>
                        </div>
                    ))}
                    </div>
                )}
                </div>
          </div>
        )}
      </Card>
    </div>
  );
}
