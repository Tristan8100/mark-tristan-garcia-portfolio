"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditPortfolioDialog from "@/components/edit-dialoge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Trash2, ExternalLink, LayoutGrid, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("rank");

    if (!error) setPortfolios(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const deletePortfolio = async (portfolio: {
    id: number;
    images?: string[];
    thumbnail?: string;
  }) => {
    try {
      // 1. Delete images from Supabase Storage
      const storage = supabase.storage.from("project-images");

      // Delete images array
      if (portfolio.images && portfolio.images.length > 0) {
        const imagePaths = portfolio.images.map((url) =>
          url.split("/").pop() // extract file name from URL
        );
        const { error: imageError } = await storage.remove(imagePaths as string[]);
        if (imageError) console.warn("Failed to delete some images:", imageError);
      }

      // Delete thumbnail
      if (portfolio.thumbnail) {
        const thumbPath = portfolio.thumbnail.split("/").pop();
        const { error: thumbError } = await storage.remove([thumbPath as string]);
        if (thumbError) console.warn("Failed to delete thumbnail:", thumbError);
      }

      // 2. Delete portfolio row from DB
      const { error } = await supabase
        .from("portfolio")
        .delete()
        .eq("id", portfolio.id);

      if (error) alert("Delete failed");
      else load();
    } catch (err) {
      console.error("Delete portfolio error:", err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Portfolio Dashboard</h1>
          </div>
          <Button onClick={load} variant="outline" size="sm">
            Refresh Data
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {portfolios.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground">Your portfolio is currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {portfolios.map((item) => (
              <Card key={item.id} className="group overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                {/* Thumbnail Section */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      No Thumbnail
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">
                      Rank: {item.rank || "N/A"}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-xl line-clamp-1" title={item.title}>
                      {item.title}
                    </CardTitle>
                  </div>
                  {item.time_to_develop && (
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.time_to_develop}</span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex-1 pb-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description || "No description provided."}
                  </p>
                  
                  {item.images && item.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-medium mb-2 text-muted-foreground">Gallery Preview</p>
                      <div className="flex gap-2 overflow-hidden">
                        {item.images.slice(0, 3).map((img: string, i: number) => (
                          <div key={i} className="h-12 w-12 rounded border overflow-hidden shrink-0">
                            <img src={img || "/placeholder.svg"} className="h-full w-full object-cover" alt="" />
                          </div>
                        ))}
                        {item.images.length > 3 && (
                          <div className="h-12 w-12 rounded border bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
                            +{item.images.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>

                <Separator />

                <CardFooter className="pt-3 flex justify-between gap-2 bg-muted/10">
                  <EditPortfolioDialog portfolio={item} onUpdated={load} />
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Project?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete 
                          <span className="font-medium text-foreground"> "{item.title}" </span>
                          and remove all associated images.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline">Cancel</Button>
                        <Button
                          variant="destructive"
                          onClick={() => deletePortfolio(item)}
                        >
                          Confirm Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
