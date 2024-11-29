import React, { useState } from "react";

export default function SavePagePopup(data) {
    const [isSavePopupOpen, setIsSavePopupOpen] = useState(true);
    const [selectedFileType, setSelectedFileType] = useState("json");
    const downloadFile = (fileType) => {
        const blob = new Blob(
            [
                fileType === "json"
                    ? JSON.stringify(data.json, null, 2)
                    : data.xml,
            ],
            {
                type:
                    fileType === "json"
                        ? "application/json"
                        : "application/xml",
            }
        );

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `file.${fileType}`;
        a.click();
        URL.revokeObjectURL(url); // Clean up the URL
        setIsSavePopupOpen(false);
    };

    return (
        <div>
            <button onClick={() => setIsSavePopupOpen(true)}>Save</button>

            {isSavePopupOpen && (
                <div className="popup">
                    <h3>Choose File Type</h3>
                    <select
                        value={selectedFileType}
                        onChange={(e) => setSelectedFileType(e.target.value)} // Update selected type
                    >
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                    </select>
                    <button onClick={downloadFile}>Download</button>
                </div>
            )}
        </div>
    );
}
