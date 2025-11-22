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
import { Badge } from "@/components/ui/badge";

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

  const [title, setTitle] = useState(portfolio?.title || "");
  const [rank, setRank] = useState(portfolio?.rank || "");
  const [description, setDescription] = useState(portfolio?.description || "");
  const [timeToDevelop, setTimeToDevelop] = useState(portfolio?.time_to_develop || "");
  const [urls, setUrls] = useState(portfolio?.urls || {});
  const [images, setImages] = useState(portfolio?.images || []);
  const [thumbnail, setThumbnail] = useState(portfolio?.thumbnail || "");
  const [stack, setStack] = useState<string[]>(portfolio?.stack || []);
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
                {/* Thumbnail */}
                <div className="space-y-3">
                  <Label>Thumbnail Image</Label>
                  <Card className="overflow-hidden border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {thumbnail ? (
                          <div className="relative w-40 h-24 rounded-md overflow-hidden border shrink-0">
                            <img
                              src={thumbnail}
                              alt="Thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-40 h-24 rounded-md bg-muted flex items-center justify-center shrink-0">
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Upload a cover image for your project card. Recommended ratio 16:9.
                          </p>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              className="max-w-xs"
                              onChange={(e) =>
                                e.target.files && changeThumbnail(e.target.files[0])
                              }
                              disabled={loading}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Gallery Images */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Project Gallery</Label>
                    <span className="text-xs text-muted-foreground">{images.length} images</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[350px]">
                    {images.map((url) => (
                      <div key={url} className="relative group aspect-video rounded-md overflow-hidden border bg-muted">
                        <img
                          src={url}
                          alt="Gallery"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8"
                            onClick={() => deleteImage(url)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <label className="flex flex-col items-center justify-center aspect-video rounded-md border border-dashed hover:bg-muted/50 cursor-pointer transition-colors">
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">Add Images</span>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && addImages(e.target.files)}
                        disabled={loading}
                      />
                    </label>
                  </div>
                </div>
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
