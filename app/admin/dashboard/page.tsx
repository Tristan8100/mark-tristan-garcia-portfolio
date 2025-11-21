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
  const [stack, setStack] = useState<string[]>([]); // 👍 new jsonb field
  const [techInput, setTechInput] = useState(""); // for input
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string>("");

  // Get logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (session) setUserId(session.user.id);
    };
    fetchUser();
  }, []);

  // Upload a single file
  const uploadFile = async (file: File): Promise<string> => {
    const filePath = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("project-images").upload(filePath, file);
    if (error) throw error;
    const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(filePath);
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

      // upload files
      const thumbnailUrl = await uploadFile(thumbnailFile);
      const uploadedImages = [];
      for (const file of imageFiles) {
        uploadedImages.push(await uploadFile(file));
      }

      // ⬇️ INSERT WITH STACK
      const { error } = await supabase.from("portfolio").insert([
        {
          title,
          rank: rank || null,
          description: description || null,
          time_to_develop: timeToDevelop === "" ? null : timeToDevelop,
          thumbnail: thumbnailUrl,
          images: uploadedImages.length ? uploadedImages : null,
          urls: Object.keys(urls).length ? urls : null,
          stack: stack.length ? stack : null, // new
        }
      ]);

      if (error) {
        console.error("Insert error:", error);
        alert("Failed to create portfolio.");
      } else {
        alert("Portfolio created successfully!");
        setTitle(""); setRank(""); setDescription(""); setTimeToDevelop("");
        setThumbnailFile(null); setImageFiles([]); setUrls({}); setStack([]); setTechInput("");
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

      <input type="text" placeholder="Title *" value={title}
        onChange={(e) => setTitle(e.target.value)} className="mb-2 w-full border p-2 rounded" />
      <input type="text" placeholder="Rank" value={rank}
        onChange={(e) => setRank(e.target.value)} className="mb-2 w-full border p-2 rounded" />
      <textarea placeholder="Description" value={description}
        onChange={(e) => setDescription(e.target.value)} className="mb-2 w-full border p-2 rounded" />
      <input type="number" placeholder="Time to Develop (months)" value={timeToDevelop}
        onChange={(e) => setTimeToDevelop(Number(e.target.value))} className="mb-2 w-full border p-2 rounded" />


      <div className="mb-2">
        <label className="font-bold">Tech Stack (JSONB)</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add tech e.g. React JS"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="button"
            onClick={() => {
              if (techInput.trim() !== "") setStack([...stack, techInput.trim()]);
              setTechInput("");
            }}
            className="px-3 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>


        <div className="flex gap-2 flex-wrap mt-2">
          {stack.map((tech, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 text-sm rounded flex items-center gap-1">
              {tech}
              <button onClick={() => setStack(stack.filter((_, i) => i !== idx))}
                className="text-red-600 font-bold">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <label className="font-bold">Thumbnail *</label>
        <input type="file" accept="image/*"
          onChange={(e) => e.target.files && setThumbnailFile(e.target.files[0])}
          className="mb-2 w-full border p-2 rounded" />
      </div>

      <div className="mb-2">
        <label className="font-bold">Images</label>
        <input type="file" accept="image/*" multiple
          onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))}
          className="mb-2 w-full border p-2 rounded" />
      </div>

      <div className="mb-2">
        <label className="font-bold">URLs</label>
        <input type="text" placeholder="Frontend URL" value={urls.frontend || ""}
          onChange={(e) => setUrls({ ...urls, frontend: e.target.value })}
          className="mb-1 w-full border p-2 rounded" />
        <input type="text" placeholder="Backend URL" value={urls.backend || ""}
          onChange={(e) => setUrls({ ...urls, backend: e.target.value })}
          className="mb-1 w-full border p-2 rounded" />
        <input type="text" placeholder="Monolith URL" value={urls.monolith || ""}
          onChange={(e) => setUrls({ ...urls, monolith: e.target.value })}
          className="mb-1 w-full border p-2 rounded" />
        <input type="text" placeholder="Live URL" value={urls.live || ""}
          onChange={(e) => setUrls({ ...urls, live: e.target.value })}
          className="mb-1 w-full border p-2 rounded" />
      </div>

      <button type="button" onClick={handleSubmit} disabled={uploading}
        className={`mt-4 p-2 rounded text-white ${uploading ? "bg-gray-400" : "bg-blue-600"}`}>
        {uploading ? "Uploading..." : "Create Portfolio"}
      </button>
    </div>
  );
}
