'use client'

import { api } from "@/convex/_generated/api"
import { generateFileUploadUrl } from "@/convex/musicFile"
import axios from "axios"
import { useMutation } from "convex/react"
import React, { ChangeEventHandler, useState } from "react"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export const ImageUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>('idle')
    const [progress, setProgress] = useState(0)

    const generateFileUploadUrl = useMutation(api.musicFile.generateFileUploadUrl)
    const sendFile = useMutation(api.musicFile.sendFile)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files) return
        setFile(files[0])

    }

    const handleFileUpload = async () => {
        if (!file) return
        setStatus('uploading')
        setProgress(0)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const postUrl = await generateFileUploadUrl()
            const result = await axios.post(postUrl, formData, {
                headers: {
                    'Content-Type': file.type
                },
                onUploadProgress: (progessEvent) => {
                    const progress = progessEvent.total 
                        ? Math.round((progessEvent.loaded * 100) / progessEvent.total)
                        : 0

                    setProgress(progress)
                }
            })

            const { storageId } = await result.data
            await sendFile({ artistName: "test", storageId })
            setStatus('success')
            setProgress(100)
        } catch (error) {
            setStatus('error')
            setProgress(0)
        }
    }


    return (
        <div className="space-y-2">
            <input type="file" onChange={handleFileChange} />

            {file && (
                <div className="mb-4 text-sm">
                    <p>File name: {file.name} </p>
                    <p>Size: {(file.size / 1024).toFixed(2)}kb </p>
                    <p>Type: {file.type} </p>
                </div>
            )}

            {status === "uploading" && (
                <div className="space-y-2">
                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                        <div 
                            className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        >   
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">
                        {progress}% uploaded
                    </p>
                </div>
            )}

            {file && status !== 'uploading' && (
                <button onClick={handleFileUpload}>Upload</button>
            )}

            {status === 'success' && (
                <p className="text-sm text-green-600">File uploaded successfully!</p>
            )}

            {status === 'error' && (
                <p className="text-sm text-red-600">Upload failed. Please try again.</p>
            )}
        </div>
    )
}