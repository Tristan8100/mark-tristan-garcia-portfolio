'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface URLs {
  frontend?: string;
  backend?: string;
  monolith?: string;
  live?: string;
}

export default function CreatePortfolio() {
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState("");
  const [description, setDescription] = useState("");
  const [timeToDevelop, setTimeToDevelop] = useState<number | "">("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<URLs>({});
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string>("");

  // Get the logged-in user ID
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error checking session:', error)
      } else if (session) {
        console.log('You are still logged in:', session)
        setUserId(session.user.id)
      } else {
        console.log('Not logged in')
      }
    };
    fetchUser();
  }, []);

  // Upload a single file to Supabase Storage and return public URL
  const uploadFile = async (file: File): Promise<string> => {
  const filePath = `${Date.now()}-${file.name}`;
  
  console.log("Uploading to:", filePath);
  
  const { data, error } = await supabase.storage
    .from("project-images")
    .upload(filePath, file);

  if (error) {
    console.error("Full error:", error); // Log the complete error
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);
  
  return urlData.publicUrl;
};

  const handleSubmit = async () => {
    if (!title || !thumbnailFile) {
      alert("Title and thumbnail are required.");
      return;
    }

    if (!userId) {
      alert("User not authenticated.");
      return;
    }

    try {
      setUploading(true);

      // 1️⃣ Upload thumbnail
      const thumbnailUrl = await uploadFile(thumbnailFile);

      // 2️⃣ Upload images
      const uploadedImages: string[] = [];
      for (const file of imageFiles) {
        const url = await uploadFile(file);
        uploadedImages.push(url);
      }

      // 3️⃣ Insert portfolio record including user_id
      const { data, error } = await supabase.from("portfolio").insert([
        {
          title,
          rank: rank || null,
          description: description || null,
          time_to_develop: timeToDevelop === "" ? null : timeToDevelop,
          thumbnail: thumbnailUrl,
          images: uploadedImages.length > 0 ? uploadedImages : null,
          urls: Object.keys(urls).length > 0 ? urls : null,
        }
      ]);

      if (error) {
        console.error("Insert error:", error);
        alert("Failed to create portfolio. Check RLS policy.");
      } else {
        alert("Portfolio created successfully!");
        // reset form
        setTitle("");
        setRank("");
        setDescription("");
        setTimeToDevelop("");
        setThumbnailFile(null);
        setImageFiles([]);
        setUrls({});
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Portfolio Record</h1>

      <input
        type="text"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Rank"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
        className="mb-2 w-full border p-2 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2 w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Time to Develop (months)"
        value={timeToDevelop}
        onChange={(e) => setTimeToDevelop(Number(e.target.value))}
        className="mb-2 w-full border p-2 rounded"
      />

      <div className="mb-2">
        <label className="font-bold">Thumbnail *</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setThumbnailFile(e.target.files[0])}
          className="mb-2 w-full border p-2 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="font-bold">Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))}
          className="mb-2 w-full border p-2 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="font-bold">URLs</label>
        <input
          type="text"
          placeholder="Frontend URL"
          value={urls.frontend || ""}
          onChange={(e) => setUrls({ ...urls, frontend: e.target.value })}
          className="mb-1 w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Backend URL"
          value={urls.backend || ""}
          onChange={(e) => setUrls({ ...urls, backend: e.target.value })}
          className="mb-1 w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Monolith URL"
          value={urls.monolith || ""}
          onChange={(e) => setUrls({ ...urls, monolith: e.target.value })}
          className="mb-1 w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Live URL"
          value={urls.live || ""}
          onChange={(e) => setUrls({ ...urls, live: e.target.value })}
          className="mb-1 w-full border p-2 rounded"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={uploading}
        className={`mt-4 p-2 rounded text-white ${uploading ? "bg-gray-400" : "bg-blue-600"}`}
      >
        {uploading ? "Uploading..." : "Create Portfolio"}
      </button>
    </div>
  );
}
