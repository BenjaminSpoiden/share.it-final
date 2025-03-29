import { api } from "@/convex/_generated/api";
import { ImageUpload } from "./ImageUpload";
import { fetchQuery } from "convex/nextjs";

export const Files = async () => {
    const files = await fetchQuery(api.musicFile.files)
    return (
      <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-1/2">
             <ImageUpload />
            </div>
          </div>
          {files && (
            <ul>
              {files.map(file => (
                <li key={file._id}>
                  <p>{file.artistName}</p>
                  <p>{file._id}</p>
                  <p>{file.id}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }