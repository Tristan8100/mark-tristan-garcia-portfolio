'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, X, Upload, ImageIcon, LinkIcon, FileText } from 'lucide-react';
import { Badge } from "./ui/badge";

interface Portfolio {
  id: number;
  title: string;
  rank?: string;
  description?: string;
  time_to_develop?: string;
  urls?: Record<string, string>;
  images?: string[];
  thumbnail?: string;
  stack?: string[];
}

interface EditPortfolioDialogProps {
  portfolio: Portfolio;
  onUpdated: () => void;
}

export default function EditPortfolioDialog({ portfolio, onUpdated }: EditPortfolioDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(portfolio.title || "");
  const [rank, setRank] = useState(portfolio.rank || "");
  const [description, setDescription] = useState(portfolio.description || "");
  const [timeToDevelop, setTimeToDevelop] = useState(portfolio.time_to_develop || "");
  const [urls, setUrls] = useState(portfolio.urls || {});
  const [images, setImages] = useState(portfolio.images || []);
  const [thumbnail, setThumbnail] = useState(portfolio.thumbnail || "");
  const [stack, setStack] = useState<string[]>(portfolio.stack || []);
  const [newStackItem, setNewStackItem] = useState("");

  // Upload file and return public URL
  const uploadFile = async (file: File): Promise<string> => {
    const filePath = `project/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("project-images").upload(filePath, file);
    if (error) throw error;
    const { data } = supabase.storage.from("project-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const changeThumbnail = async (file: File) => {
    setLoading(true);
    try {
      const url = await uploadFile(file);
      setThumbnail(url);
    } catch (error) {
      console.error(error);
      alert("Error uploading thumbnail");
    }
    setLoading(false);
  };

  const addImages = async (files: FileList) => {
    setLoading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        newUrls.push(url);
      }
      setImages([...images, ...newUrls]);
    } catch (error) {
      console.error(error);
      alert("Error uploading images");
    }
    setLoading(false);
  };

  const deleteImage = (url: string) => {
    setImages(images.filter((i) => i !== url));
  };

  // Stack management
  const addStackItem = () => {
    if (newStackItem.trim() && !stack.includes(newStackItem.trim())) {
      setStack([...stack, newStackItem.trim()]);
      setNewStackItem("");
    }
  };

  const removeStackItem = (item: string) => {
    setStack(stack.filter((s) => s !== item));
  };

  // Save all changes
  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("portfolio")
      .update({
        title,
        rank,
        description,
        time_to_develop: timeToDevelop,
        urls,
        images,
        thumbnail,
        stack,
      })
      .eq("id", portfolio.id);

    setLoading(false);

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      onUpdated();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit Project</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Edit Portfolio Item</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="details" className="h-full flex flex-col">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Details
                </TabsTrigger>
                <TabsTrigger value="links" className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Links
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Media
                </TabsTrigger>
                <TabsTrigger value="stack" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Stack
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 p-6">
              {/* DETAILS */}
              <TabsContent value="details" className="mt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input 
                      id="title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      placeholder="e.g. E-commerce Platform"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rank">Rank / Priority</Label>
                    <Input 
                      id="rank" 
                      value={rank} 
                      onChange={(e) => setRank(e.target.value)} 
                      placeholder="e.g. 1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Development Time</Label>
                  <Input
                    id="time"
                    value={timeToDevelop}
                    onChange={(e) => setTimeToDevelop(e.target.value)}
                    placeholder="e.g. 2 months"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[200px] resize-none"
                    placeholder="Describe the project..."
                  />
                </div>
              </TabsContent>

              {/* LINKS */}
              <TabsContent value="links" className="mt-0 space-y-4">
                <div className="grid gap-4">
                  {["frontend", "backend", "monolith", "live"].map((key) => (
                    <div key={key} className="space-y-2">
                      <Label className="capitalize flex items-center gap-2">{key} URL</Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          value={urls[key] || ""}
                          onChange={(e) =>
                            setUrls({ ...urls, [key]: e.target.value })
                          }
                          placeholder={`https://${key}.example.com`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* MEDIA */}
              <TabsContent value="media" className="mt-0 space-y-6">
                {/* ...thumbnail and images UI remains unchanged */}
              </TabsContent>

              {/* STACK */}
              <TabsContent value="stack" className="mt-0 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => removeStackItem(item)}
                    >
                      {item} <X className="w-3 h-3" />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newStackItem}
                    onChange={(e) => setNewStackItem(e.target.value)}
                    placeholder="Add tech stack (e.g. React)"
                  />
                  <Button onClick={addStackItem}>Add</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click a stack badge to remove it.
                </p>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-muted/20">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
